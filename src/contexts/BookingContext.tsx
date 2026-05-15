import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";

export interface BookingInfo {
  service: string;
  package: string;
  price: number;
  hours?: number;
  format?: string;
}

/**
 * Phase 5.1B.6B — Frontend booking state machine.
 *
 * Mirrors the deterministic backend lifecycle:
 *   collecting -> awaiting_confirmation -> finalized
 *
 * Authority rules (do NOT collapse these in components):
 *   - Only prepareConfirmation may transition collecting -> awaiting_confirmation.
 *   - Only finalizeBooking may transition awaiting_confirmation -> finalized.
 *   - confirmationSnapshot is frozen at prepareConfirmation time and is the
 *     immutable source of truth for the confirmation + finalized phases.
 *   - finalized is terminal; finalizeBooking() is idempotent and returns the
 *     existing snapshot. resetBookingPhase() is the only escape hatch.
 */
export type BookingPhase = "collecting" | "awaiting_confirmation" | "finalized";

export interface ConfirmationSnapshot {
  bookingInfo: BookingInfo;
  selectedAddOns: string[];
  location: string;
  mapsLink: string;
  date: string | null; // ISO
  time: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  subtotal: number;
  vat: number;
  total: number;
  refNumber: string;
  preparedAt: number;
  finalizedAt: number | null;
}

export type SnapshotDraft = Omit<ConfirmationSnapshot, "preparedAt" | "finalizedAt">;

interface BookingContextValue {
  isOpen: boolean;
  bookingInfo: BookingInfo | null;
  bookingPhase: BookingPhase;
  confirmationSnapshot: ConfirmationSnapshot | null;
  openBooking: (info: BookingInfo) => void;
  closeBooking: () => void;
  prepareConfirmation: (draft: SnapshotDraft) => ConfirmationSnapshot | null;
  finalizeBooking: () => ConfirmationSnapshot | null;
  resetBookingPhase: () => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export const useBooking = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
};

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [bookingInfo, setBookingInfo] = useState<BookingInfo | null>(null);
  const [bookingPhase, setBookingPhase] = useState<BookingPhase>("collecting");
  const [confirmationSnapshot, setConfirmationSnapshot] =
    useState<ConfirmationSnapshot | null>(null);

  // Phase guard ref — synchronous read avoids races with setState batching.
  const phaseRef = useRef<BookingPhase>("collecting");
  const snapshotRef = useRef<ConfirmationSnapshot | null>(null);

  const setPhase = (next: BookingPhase) => {
    phaseRef.current = next;
    setBookingPhase(next);
  };

  const setSnapshot = (snap: ConfirmationSnapshot | null) => {
    snapshotRef.current = snap;
    setConfirmationSnapshot(snap);
  };

  const resetBookingPhase = useCallback(() => {
    setSnapshot(null);
    setPhase("collecting");
  }, []);

  const openBooking = (info: BookingInfo) => {
    setBookingInfo(info);
    resetBookingPhase();
    setIsOpen(true);
  };

  const closeBooking = () => {
    setIsOpen(false);
    setTimeout(() => {
      setBookingInfo(null);
      resetBookingPhase();
    }, 300);
  };

  const prepareConfirmation = useCallback(
    (draft: SnapshotDraft): ConfirmationSnapshot | null => {
      // Guard: only collecting -> awaiting_confirmation. Re-preparing after
      // finalize is forbidden; re-preparing while already awaiting just
      // refreshes the frozen snapshot with the latest draft.
      if (phaseRef.current === "finalized") {
        return snapshotRef.current;
      }
      const snapshot: ConfirmationSnapshot = Object.freeze({
        ...draft,
        selectedAddOns: Object.freeze([...draft.selectedAddOns]) as string[],
        preparedAt: Date.now(),
        finalizedAt: null,
      });
      setSnapshot(snapshot);
      setPhase("awaiting_confirmation");
      return snapshot;
    },
    []
  );

  const finalizeBooking = useCallback((): ConfirmationSnapshot | null => {
    // Idempotent: returns existing snapshot if already finalized.
    if (phaseRef.current === "finalized") {
      return snapshotRef.current;
    }
    if (phaseRef.current !== "awaiting_confirmation" || !snapshotRef.current) {
      return null;
    }
    const finalized: ConfirmationSnapshot = Object.freeze({
      ...snapshotRef.current,
      finalizedAt: Date.now(),
    });
    setSnapshot(finalized);
    setPhase("finalized");
    return finalized;
  }, []);

  return (
    <BookingContext.Provider
      value={{
        isOpen,
        bookingInfo,
        bookingPhase,
        confirmationSnapshot,
        openBooking,
        closeBooking,
        prepareConfirmation,
        finalizeBooking,
        resetBookingPhase,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

import { createContext, useContext, useState, type ReactNode } from "react";

export interface BookingInfo {
  serviceName: string;
  packageName: string;
  mediaType: "photography" | "videography" | "combo" | "none";
  basePrice: number;
  hours?: number;
  eventType?: string;
}

interface BookingContextValue {
  isOpen: boolean;
  bookingInfo: BookingInfo | null;
  openBooking: (info: BookingInfo) => void;
  closeBooking: () => void;
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

  const openBooking = (info: BookingInfo) => {
    setBookingInfo(info);
    setIsOpen(true);
  };

  const closeBooking = () => {
    setIsOpen(false);
    setTimeout(() => setBookingInfo(null), 300);
  };

  return (
    <BookingContext.Provider value={{ isOpen, bookingInfo, openBooking, closeBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

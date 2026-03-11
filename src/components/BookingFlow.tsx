import { useState, useRef, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  CalendarIcon, ArrowRight, ArrowLeft, CheckCircle, Download, MessageCircle,
  MapPin, Navigation, Package, Clock
} from "lucide-react";
import jsPDF from "jspdf";
import { useBooking } from "@/contexts/BookingContext";

const addOns = [
  { id: "rush", name: "Rush Delivery (48h)", price: 500 },
  { id: "raw-files", name: "Raw Files Included", price: 400 },
  { id: "social-edit", name: "Social Media Edits", price: 600 },
  { id: "drone", name: "Drone Footage", price: 1500 },
  { id: "extra-revisions", name: "Extra Revisions (3)", price: 300 },
  { id: "extra-hours", name: "Extra Coverage Hours", price: 800 },
  { id: "extra-camera", name: "Additional Camera Operator", price: 1200 },
  { id: "editing-upgrade", name: "Premium Editing Package", price: 1000 },
];

const VAT_RATE = 0.15;
const WHATSAPP_NUMBER = "27659704101";

const formatZAR = (amount: number) =>
  new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(amount);

const generateRef = () =>
  `KMP-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

// Time picker wheel component
const TimeScrollPicker = ({
  value,
  onChange,
  items,
  label,
}: {
  value: number;
  onChange: (v: number) => void;
  items: number[];
  label: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemHeight = 40;

  useEffect(() => {
    if (containerRef.current) {
      const idx = items.indexOf(value);
      containerRef.current.scrollTop = idx * itemHeight;
    }
  }, []);

  const handleScroll = () => {
    if (containerRef.current) {
      const idx = Math.round(containerRef.current.scrollTop / itemHeight);
      const clamped = Math.min(Math.max(idx, 0), items.length - 1);
      if (items[clamped] !== value) onChange(items[clamped]);
    }
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</span>
      <div className="relative h-[120px] w-16 overflow-hidden rounded-xl border border-border bg-muted/50">
        <div className="absolute inset-x-0 top-[40px] h-[40px] border-y border-primary/30 bg-primary/5 z-10 pointer-events-none rounded-sm" />
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="h-full overflow-y-auto scrollbar-hide snap-y snap-mandatory"
          style={{ scrollSnapType: "y mandatory", paddingTop: 40, paddingBottom: 40 }}
        >
          {items.map((item) => (
            <div
              key={item}
              className={cn(
                "h-[40px] flex items-center justify-center text-lg font-bold snap-center cursor-pointer transition-all",
                item === value ? "text-primary scale-110" : "text-muted-foreground/50 scale-90"
              )}
              onClick={() => {
                onChange(item);
                if (containerRef.current) {
                  const idx = items.indexOf(item);
                  containerRef.current.scrollTo({ top: idx * itemHeight, behavior: "smooth" });
                }
              }}
            >
              {String(item).padStart(2, "0")}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const hours = Array.from({ length: 24 }, (_, i) => i);
const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

const BookingFlow = () => {
  const { isOpen, bookingInfo, closeBooking } = useBooking();

  const [step, setStep] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [mapsLink, setMapsLink] = useState("");
  const [date, setDate] = useState<Date>();
  const [hour, setHour] = useState(10);
  const [minute, setMinute] = useState(0);
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [refNumber, setRefNumber] = useState("");
  const [locatingUser, setLocatingUser] = useState(false);

  const resetState = () => {
    setStep(1);
    setSelectedAddOns([]);
    setLocation("");
    setMapsLink("");
    setDate(undefined);
    setHour(10);
    setMinute(0);
    setClientName("");
    setClientPhone("");
    setClientEmail("");
    setNotes("");
    setConfirmed(false);
    setRefNumber("");
  };

  const handleClose = () => {
    closeBooking();
    setTimeout(resetState, 300);
  };

  const basePrice = bookingInfo?.basePrice || 0;
  const addOnTotal = addOns.filter((a) => selectedAddOns.includes(a.id)).reduce((s, a) => s + a.price, 0);
  const subtotal = basePrice + addOnTotal;
  const vat = subtotal * VAT_RATE;
  const total = subtotal + vat;

  const mediaLabel =
    bookingInfo?.mediaType === "combo"
      ? "Photo + Video"
      : bookingInfo?.mediaType === "photography"
      ? "Photography"
      : bookingInfo?.mediaType === "videography"
      ? "Videography"
      : "";

  const eventType = bookingInfo?.eventType || bookingInfo?.serviceName || "";
  const timeString = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;

  const canNextStep3 = location || mapsLink;
  const canNextStep4 = !!date;
  const canNextStep5 = clientName && clientPhone;

  const toggleAddOn = (id: string) =>
    setSelectedAddOns((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const useMyLocation = () => {
    if (!navigator.geolocation) return;
    setLocatingUser(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setMapsLink(`https://www.google.com/maps?q=${latitude},${longitude}`);
        setLocation(`Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`);
        setLocatingUser(false);
      },
      () => setLocatingUser(false),
      { enableHighAccuracy: true }
    );
  };

  const locationDisplay = location || (mapsLink ? "Google Maps link provided" : "");

  const buildWhatsAppMsg = (ref: string) => {
    const dateStr = date ? format(date, "PPP") : "";
    return `Hi KMP! I'd like to confirm my booking:\n\nRef: ${ref}\nService: ${eventType}\nPackage: ${bookingInfo?.packageName}${mediaLabel ? ` (${mediaLabel})` : ""}\nDate: ${dateStr} at ${timeString}\nLocation: ${locationDisplay}\nTotal: ${formatZAR(total)}\n\nName: ${clientName}\nPhone: ${clientPhone}${clientEmail ? `\nEmail: ${clientEmail}` : ""}${notes ? `\nNotes: ${notes}` : ""}`;
  };

  const handleConfirm = () => {
    const ref = generateRef();
    setRefNumber(ref);
    setConfirmed(true);
    setStep(7);
  };

  const openWhatsApp = () => {
    const msg = encodeURIComponent(buildWhatsAppMsg(refNumber));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Header
    doc.setFillColor(220, 38, 38);
    doc.rect(0, 0, pageWidth, 45, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("KASILAM MEDIA PRODUCTION", 20, 22);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Professional Media Production Services", 20, 32);

    // Quote info
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("QUOTATION", 20, 60);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text(`Reference: ${refNumber}`, 20, 68);
    doc.text(`Date: ${new Date().toLocaleDateString("en-ZA")}`, 20, 74);

    // Client details
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text("Bill To:", pageWidth - 80, 60);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    doc.text(clientName, pageWidth - 80, 68);
    doc.text(clientPhone, pageWidth - 80, 74);
    if (clientEmail) doc.text(clientEmail, pageWidth - 80, 80);

    // Line
    doc.setDrawColor(220, 38, 38);
    doc.setLineWidth(0.5);
    doc.line(20, 88, pageWidth - 20, 88);

    // Service details table header
    let y = 98;
    doc.setFillColor(245, 245, 245);
    doc.rect(20, y - 6, pageWidth - 40, 14, "F");
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text("Description", 25, y + 2);
    doc.text("Amount", pageWidth - 45, y + 2, { align: "right" });
    y += 16;

    // Service line
    doc.setFont("helvetica", "normal");
    doc.setTextColor(40, 40, 40);
    doc.text(`${eventType} — ${bookingInfo?.packageName}${mediaLabel ? ` (${mediaLabel})` : ""}`, 25, y);
    doc.text(formatZAR(basePrice), pageWidth - 45, y, { align: "right" });
    y += 10;

    // Add-ons
    if (selectedAddOns.length > 0) {
      selectedAddOns.forEach((id) => {
        const a = addOns.find((x) => x.id === id)!;
        doc.text(`  + ${a.name}`, 25, y);
        doc.text(formatZAR(a.price), pageWidth - 45, y, { align: "right" });
        y += 8;
      });
    }

    // Event details
    y += 5;
    doc.setDrawColor(200, 200, 200);
    doc.line(20, y, pageWidth - 20, y);
    y += 12;
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(`Event: ${eventType}`, 25, y);
    y += 7;
    doc.text(`Location: ${locationDisplay}`, 25, y);
    y += 7;
    doc.text(`Date & Time: ${date ? format(date, "PPP") : ""} at ${timeString}`, 25, y);
    if (notes) { y += 7; doc.text(`Notes: ${notes}`, 25, y); }

    // Totals
    y += 15;
    doc.line(20, y, pageWidth - 20, y);
    y += 10;
    doc.setTextColor(60, 60, 60);
    doc.text("Subtotal:", pageWidth - 90, y);
    doc.text(formatZAR(subtotal), pageWidth - 45, y, { align: "right" });
    y += 8;
    doc.text("VAT (15%):", pageWidth - 90, y);
    doc.text(formatZAR(vat), pageWidth - 45, y, { align: "right" });
    y += 10;
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(220, 38, 38);
    doc.text("Total:", pageWidth - 90, y);
    doc.text(formatZAR(total), pageWidth - 45, y, { align: "right" });

    // Banking details
    y += 20;
    doc.setDrawColor(220, 38, 38);
    doc.setLineWidth(0.5);
    doc.line(20, y, pageWidth - 20, y);
    y += 12;
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text("Banking Details", 25, y);
    y += 8;
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    doc.text("Bank: Capitec Bank", 25, y);
    y += 6;
    doc.text("Account Name: Kasilam Media Production", 25, y);
    y += 6;
    doc.text(`Reference: ${refNumber}`, 25, y);

    // Footer
    doc.setFontSize(7);
    doc.setTextColor(150, 150, 150);
    doc.text("Kasilam Media Production | Professional Media Services | Gqeberha, South Africa", pageWidth / 2, 285, { align: "center" });

    doc.save(`KMP-Quote-${refNumber}.pdf`);
  };

  const stepLabels = ["Package", "Add-ons", "Location", "Date & Time", "Details", "Summary"];

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto bg-background border-border">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-xl font-black tracking-tight">
            {confirmed ? "Booking Confirmed!" : "Complete Your Booking"}
          </SheetTitle>
          <SheetDescription className="text-sm">
            {confirmed
              ? `Reference: ${refNumber}`
              : `${eventType} — ${bookingInfo?.packageName}${mediaLabel ? ` (${mediaLabel})` : ""}`}
          </SheetDescription>
        </SheetHeader>

        {/* Progress */}
        {!confirmed && (
          <div className="mb-6">
            <div className="flex gap-1 mb-2">
              {stepLabels.map((_, i) => (
                <div key={i} className={cn("h-1 flex-1 rounded-full transition-all duration-500", i + 1 <= step ? "bg-primary" : "bg-muted")} />
              ))}
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Step {step} of 6 — {stepLabels[step - 1]}
            </p>
          </div>
        )}

        {/* Step 1: Service Package */}
        {step === 1 && !confirmed && (
          <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
            <div className="flex items-center gap-3 mb-2">
              <Package className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-bold">Selected Package</h3>
            </div>
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-5 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-base">{bookingInfo?.packageName}</p>
                  <p className="text-sm text-muted-foreground">{eventType}</p>
                  {mediaLabel && (
                    <span className="inline-block mt-2 rounded-full bg-primary/10 border border-primary/20 px-3 py-0.5 text-xs font-bold text-primary">
                      {mediaLabel}
                    </span>
                  )}
                </div>
                <p className="text-2xl font-black text-primary">{formatZAR(basePrice)}</p>
              </div>
              {bookingInfo?.hours && (
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5" /> {bookingInfo.hours} hours coverage
                </p>
              )}
            </div>
            <div className="flex justify-end pt-4">
              <Button onClick={() => setStep(2)} className="gap-2">
                Continue <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Add-Ons */}
        {step === 2 && !confirmed && (
          <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
            <h3 className="text-lg font-bold">Optional Add-Ons</h3>
            <div className="space-y-2">
              {addOns.map((a) => (
                <label
                  key={a.id}
                  className={cn(
                    "flex items-center justify-between rounded-xl border p-4 cursor-pointer transition-all hover:border-primary/50",
                    selectedAddOns.includes(a.id) ? "border-primary bg-primary/5" : "border-border"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={selectedAddOns.includes(a.id)}
                      onCheckedChange={() => toggleAddOn(a.id)}
                    />
                    <span className="text-sm font-medium">{a.name}</span>
                  </div>
                  <span className="text-sm font-bold text-primary">{formatZAR(a.price)}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep(1)} className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              <div className="flex gap-2">
                <Button variant="ghost" onClick={() => { setSelectedAddOns([]); setStep(3); }}>Skip</Button>
                <Button onClick={() => setStep(3)} className="gap-2">
                  Next <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Location */}
        {step === 3 && !confirmed && (
          <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
            <div className="flex items-center gap-3 mb-2">
              <MapPin className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-bold">Event Location</h3>
            </div>
            <div className="space-y-3">
              <div>
                <Label htmlFor="location">Address</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. 123 Main Street, Gqeberha"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="mapsLink">Or paste Google Maps link</Label>
                <Input
                  id="mapsLink"
                  value={mapsLink}
                  onChange={(e) => setMapsLink(e.target.value)}
                  placeholder="https://maps.google.com/..."
                  className="mt-1"
                />
              </div>
              <Button
                variant="outline"
                onClick={useMyLocation}
                disabled={locatingUser}
                className="w-full gap-2"
              >
                <Navigation className="h-4 w-4" />
                {locatingUser ? "Locating..." : "Use My Location"}
              </Button>
            </div>
            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep(2)} className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              <Button onClick={() => setStep(4)} disabled={!canNextStep3} className="gap-2">
                Next <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Date & Time */}
        {step === 4 && !confirmed && (
          <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
            <div className="flex items-center gap-3 mb-2">
              <CalendarIcon className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-bold">Date & Time</h3>
            </div>
            <div>
              <Label>Event Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full mt-1 justify-start text-left font-normal", !date && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(d) => d < new Date()}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label className="mb-3 block">Event Time</Label>
              <div className="flex items-center justify-center gap-4 py-4 rounded-xl border border-border bg-muted/30">
                <TimeScrollPicker value={hour} onChange={setHour} items={hours} label="Hour" />
                <span className="text-3xl font-black text-primary mt-5">:</span>
                <TimeScrollPicker value={minute} onChange={setMinute} items={minutes} label="Min" />
              </div>
              <p className="text-center text-sm text-muted-foreground mt-2 font-medium">
                Selected: <span className="text-primary font-bold">{timeString}</span>
              </p>
            </div>
            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep(3)} className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              <Button onClick={() => setStep(5)} disabled={!canNextStep4} className="gap-2">
                Next <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 5: Client Details */}
        {step === 5 && !confirmed && (
          <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
            <h3 className="text-lg font-bold">Your Details</h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="clientName">Full Name *</Label>
                <Input id="clientName" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="John Doe" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="clientPhone">Phone Number *</Label>
                <Input id="clientPhone" type="tel" value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} placeholder="082 123 4567" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="clientEmail">Email (optional)</Label>
                <Input id="clientEmail" type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} placeholder="john@example.com" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="notes">Additional Notes (optional)</Label>
                <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any special requests or details..." className="mt-1" rows={3} />
              </div>
            </div>
            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep(4)} className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              <Button onClick={() => setStep(6)} disabled={!canNextStep5} className="gap-2">
                Next <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 6: Summary */}
        {step === 6 && !confirmed && (
          <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
            <h3 className="text-lg font-bold">Booking Summary</h3>

            {/* Price breakdown */}
            <div className="rounded-xl border border-border p-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="font-medium">{bookingInfo?.packageName}{mediaLabel ? ` (${mediaLabel})` : ""}</span>
                <span className="font-bold">{formatZAR(basePrice)}</span>
              </div>
              {selectedAddOns.map((id) => {
                const a = addOns.find((x) => x.id === id)!;
                return (
                  <div key={id} className="flex justify-between text-muted-foreground">
                    <span>+ {a.name}</span>
                    <span>{formatZAR(a.price)}</span>
                  </div>
                );
              })}
              <div className="border-t border-border pt-3 flex justify-between">
                <span>Subtotal</span><span>{formatZAR(subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>VAT (15%)</span><span>{formatZAR(vat)}</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between font-bold text-lg">
                <span>Total</span><span className="text-primary">{formatZAR(total)}</span>
              </div>
            </div>

            {/* Event details */}
            <div className="rounded-xl border border-border p-4 space-y-2 text-sm">
              <p><span className="text-muted-foreground">Service:</span> {eventType}</p>
              <p><span className="text-muted-foreground">Location:</span> {locationDisplay}</p>
              <p><span className="text-muted-foreground">Date:</span> {date ? format(date, "PPP") : ""} at {timeString}</p>
              <p><span className="text-muted-foreground">Name:</span> {clientName}</p>
              <p><span className="text-muted-foreground">Phone:</span> {clientPhone}</p>
              {clientEmail && <p><span className="text-muted-foreground">Email:</span> {clientEmail}</p>}
              {notes && <p><span className="text-muted-foreground">Notes:</span> {notes}</p>}
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep(5)} className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              <Button onClick={handleConfirm} className="gap-2">
                <CheckCircle className="h-4 w-4" /> Confirm Booking
              </Button>
            </div>
          </div>
        )}

        {/* Step 7: Confirmation */}
        {confirmed && (
          <div className="space-y-6 text-center py-8 animate-in zoom-in-95 duration-500">
            <div className="inline-flex rounded-full bg-primary/10 p-6 mx-auto">
              <CheckCircle className="h-12 w-12 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-black">Booking Confirmed!</h3>
              <p className="text-muted-foreground mt-1">Reference: <span className="font-bold text-primary">{refNumber}</span></p>
            </div>
            <div className="rounded-xl border border-border p-4 space-y-2 text-sm text-left">
              <div className="flex justify-between font-bold">
                <span>{bookingInfo?.packageName}{mediaLabel ? ` (${mediaLabel})` : ""}</span>
                <span className="text-primary">{formatZAR(total)}</span>
              </div>
              <p className="text-muted-foreground">{eventType} • {locationDisplay}</p>
              <p className="text-muted-foreground">{date ? format(date, "PPP") : ""} at {timeString}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Button onClick={openWhatsApp} className="w-full gap-2">
                <MessageCircle className="h-4 w-4" /> Send via WhatsApp
              </Button>
              <Button variant="outline" onClick={downloadPDF} className="w-full gap-2">
                <Download className="h-4 w-4" /> Download PDF Quote
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default BookingFlow;

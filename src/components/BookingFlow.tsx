import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, ArrowRight, ArrowLeft, CheckCircle, Download, MessageCircle } from "lucide-react";
import jsPDF from "jspdf";
import { useBooking } from "@/contexts/BookingContext";

const addOns = [
  { id: "rush", name: "Rush Delivery (48h)", price: 500 },
  { id: "raw-files", name: "Raw Files Included", price: 400 },
  { id: "social-edit", name: "Social Media Edits", price: 600 },
  { id: "drone", name: "Drone Footage", price: 1500 },
  { id: "extra-revisions", name: "Extra Revisions (3)", price: 300 },
];

const timeSlots = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

const VAT_RATE = 0.15;

const formatZAR = (amount: number) =>
  new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(amount);

const generateRef = () =>
  `KMP-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

const WHATSAPP_NUMBER = "27000000000";

const BookingFlow = () => {
  const { isOpen, bookingInfo, closeBooking } = useBooking();

  const [step, setStep] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [eventType, setEventType] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientWhatsApp, setClientWhatsApp] = useState("");
  const [notes, setNotes] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [refNumber, setRefNumber] = useState("");

  const resetState = () => {
    setStep(1);
    setSelectedAddOns([]);
    setEventType("");
    setLocation("");
    setDate(undefined);
    setTime("");
    setClientName("");
    setClientWhatsApp("");
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

  const canNextStep2 = eventType && location && date && time && clientName && clientWhatsApp;

  const toggleAddOn = (id: string) =>
    setSelectedAddOns((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const buildWhatsAppMsg = (ref: string) => {
    const dateStr = date ? format(date, "PPP") : "";
    return `Hi KMP! I'd like to confirm my booking:\n\nRef: ${ref}\nService: ${bookingInfo?.serviceName}\nPackage: ${bookingInfo?.packageName}${mediaLabel ? ` (${mediaLabel})` : ""}\nDate: ${dateStr} at ${time}\nLocation: ${location}\nTotal: ${formatZAR(total)}\n\nName: ${clientName}\nWhatsApp: ${clientWhatsApp}${notes ? `\nNotes: ${notes}` : ""}`;
  };

  const handleConfirm = () => {
    const ref = generateRef();
    setRefNumber(ref);
    setConfirmed(true);
    setStep(4);
  };

  const openWhatsApp = () => {
    const msg = encodeURIComponent(buildWhatsAppMsg(refNumber));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("KMP - Quotation", 20, 25);
    doc.setFontSize(10);
    doc.text(`Reference: ${refNumber}`, 20, 35);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 42);
    doc.line(20, 47, 190, 47);

    doc.setFontSize(12);
    doc.text("Client Details", 20, 57);
    doc.setFontSize(10);
    doc.text(`Name: ${clientName}`, 20, 65);
    doc.text(`WhatsApp: ${clientWhatsApp}`, 20, 72);

    doc.setFontSize(12);
    doc.text("Booking Details", 20, 88);
    doc.setFontSize(10);
    doc.text(`Service: ${bookingInfo?.serviceName}`, 20, 96);
    doc.text(`Package: ${bookingInfo?.packageName}${mediaLabel ? ` (${mediaLabel})` : ""}`, 20, 103);
    doc.text(`Base Price: ${formatZAR(basePrice)}`, 20, 110);

    let y = 118;
    if (selectedAddOns.length > 0) {
      doc.text("Add-ons:", 20, y);
      y += 7;
      selectedAddOns.forEach((id) => {
        const a = addOns.find((x) => x.id === id)!;
        doc.text(`  - ${a.name}: ${formatZAR(a.price)}`, 20, y);
        y += 7;
      });
    }

    doc.text(`Event: ${eventType}`, 20, y + 5);
    doc.text(`Location: ${location}`, 20, y + 12);
    doc.text(`Date & Time: ${date ? format(date, "PPP") : ""} at ${time}`, 20, y + 19);
    if (notes) doc.text(`Notes: ${notes}`, 20, y + 26);

    const yFinal = y + (notes ? 36 : 29);
    doc.line(20, yFinal, 190, yFinal);
    doc.setFontSize(10);
    doc.text(`Subtotal: ${formatZAR(subtotal)}`, 20, yFinal + 8);
    doc.text(`VAT (15%): ${formatZAR(vat)}`, 20, yFinal + 15);
    doc.setFontSize(14);
    doc.text(`Total: ${formatZAR(total)}`, 20, yFinal + 25);

    doc.setFontSize(8);
    doc.text("Kasilam Media Productions | www.kmp.co.za", 20, 285);
    doc.save(`KMP-Quote-${refNumber}.pdf`);
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-xl font-black">
            {confirmed ? "Booking Confirmed!" : "Complete Your Booking"}
          </SheetTitle>
          <SheetDescription>
            {confirmed
              ? `Reference: ${refNumber}`
              : `${bookingInfo?.serviceName} — ${bookingInfo?.packageName}${mediaLabel ? ` (${mediaLabel})` : ""}`}
          </SheetDescription>
        </SheetHeader>

        {/* Progress */}
        {!confirmed && (
          <div className="flex gap-1 mb-6">
            {[1, 2, 3].map((s) => (
              <div key={s} className={cn("h-1.5 flex-1 rounded-full transition-colors", s <= step ? "bg-primary" : "bg-muted")} />
            ))}
          </div>
        )}

        {/* Step 1: Add-Ons */}
        {step === 1 && !confirmed && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Optional Add-Ons</h3>
            <div className="space-y-3">
              {addOns.map((a) => (
                <label
                  key={a.id}
                  className={cn(
                    "flex items-center justify-between rounded-lg border p-4 cursor-pointer transition-all hover:border-primary/50",
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
                  <span className="text-sm font-semibold text-primary">{formatZAR(a.price)}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-between pt-4">
              <Button variant="ghost" onClick={() => { setSelectedAddOns([]); setStep(2); }}>
                Skip
              </Button>
              <Button onClick={() => setStep(2)} className="gap-2">
                Next <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Event Details */}
        {step === 2 && !confirmed && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Event Details</h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="eventType">Event Type</Label>
                <Input id="eventType" value={eventType} onChange={(e) => setEventType(e.target.value)} placeholder="e.g. Wedding, Birthday, Corporate" />
              </div>
              <div>
                <Label htmlFor="location">Event Location</Label>
                <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Port Elizabeth" />
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
                <Label>Event Time</Label>
                <div className="grid grid-cols-5 gap-2 mt-1">
                  {timeSlots.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTime(t)}
                      className={cn(
                        "rounded-md border px-2 py-2 text-xs transition-colors hover:border-primary/50",
                        time === t ? "border-primary bg-primary/10 text-primary" : "border-border"
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="clientName">Your Name</Label>
                <Input id="clientName" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="John Doe" />
              </div>
              <div>
                <Label htmlFor="clientWA">WhatsApp Number</Label>
                <Input id="clientWA" type="tel" value={clientWhatsApp} onChange={(e) => setClientWhatsApp(e.target.value)} placeholder="082 123 4567" />
              </div>
              <div>
                <Label htmlFor="notes">Additional Notes (optional)</Label>
                <Input id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any special requests..." />
              </div>
            </div>
            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep(1)} className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              <Button onClick={() => setStep(3)} disabled={!canNextStep2} className="gap-2">
                Next <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Price Summary */}
        {step === 3 && !confirmed && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Price Summary</h3>
            <div className="rounded-lg border border-border p-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span>{bookingInfo?.packageName}{mediaLabel ? ` (${mediaLabel})` : ""}</span>
                <span className="font-semibold">{formatZAR(basePrice)}</span>
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
                <span>Subtotal</span>
                <span>{formatZAR(subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>VAT (15%)</span>
                <span>{formatZAR(vat)}</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between font-bold text-base">
                <span>Total</span>
                <span className="text-primary">{formatZAR(total)}</span>
              </div>
            </div>

            <div className="rounded-lg border border-border p-4 space-y-2 text-sm">
              <p><span className="text-muted-foreground">Event:</span> {eventType}</p>
              <p><span className="text-muted-foreground">Location:</span> {location}</p>
              <p><span className="text-muted-foreground">Date:</span> {date ? format(date, "PPP") : ""} at {time}</p>
              <p><span className="text-muted-foreground">Name:</span> {clientName}</p>
              <p><span className="text-muted-foreground">WhatsApp:</span> {clientWhatsApp}</p>
              {notes && <p><span className="text-muted-foreground">Notes:</span> {notes}</p>}
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep(2)} className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              <Button onClick={handleConfirm} className="gap-2">
                <CheckCircle className="h-4 w-4" /> Confirm Booking
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {confirmed && (
          <div className="space-y-6 text-center py-8">
            <div className="inline-flex rounded-full bg-primary/10 p-6 mx-auto">
              <CheckCircle className="h-12 w-12 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Booking Confirmed!</h3>
              <p className="text-muted-foreground mt-1">Reference: <span className="font-bold text-primary">{refNumber}</span></p>
            </div>
            <div className="rounded-lg border border-border p-4 space-y-2 text-sm text-left">
              <div className="flex justify-between font-semibold">
                <span>{bookingInfo?.packageName}{mediaLabel ? ` (${mediaLabel})` : ""}</span>
                <span className="text-primary">{formatZAR(total)}</span>
              </div>
              <p className="text-muted-foreground">{eventType} • {location}</p>
              <p className="text-muted-foreground">{date ? format(date, "PPP") : ""} at {time}</p>
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

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
import { format, addDays } from "date-fns";
import { CalendarIcon, ArrowRight, ArrowLeft, CheckCircle, Download, MessageCircle, MapPin, Navigation, Package, Clock } from "lucide-react";
import jsPDF from "jspdf";
import { useBooking } from "@/contexts/BookingContext";
import logo from "@/images/kmp.svg";

const serviceAddOns = {
  audio: [
    { id: "extra-hour", name: "Extra Recording Hour", price: 350 },
    { id: "mixing", name: "Mixing", price: 600 },
    { id: "mastering", name: "Mastering", price: 400 },
    { id: "podcast-edit", name: "Podcast Editing", price: 500 },
  ],
  visual: [
    { id: "extra-camera", name: "Extra Camera", price: 1000 },
    { id: "drone", name: "Drone Footage", price: 1500 },
    { id: "photography", name: "Photography Coverage", price: 800 },
    { id: "extended-edit", name: "Extended Editing", price: 1200 },
  ],
  digital: [
    { id: "add-platform", name: "Additional Social Platform", price: 1000 },
    { id: "extra-posts", name: "Extra Content Posts", price: 500 },
    { id: "ads-mgmt", name: "Paid Advertising Management", price: 1500 },
    { id: "analytics", name: "Analytics Reporting", price: 800 },
  ],
};

const timeSlots = [
  "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"
];

const VAT_RATE = 0.15;
const WHATSAPP_NUMBER = "27659704101";

const formatZAR = (amount: number) =>
  new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(amount);

const generateRef = () =>
  `KMP-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

const getServiceCategory = (service: string): "audio" | "visual" | "digital" => {
  const s = (service || "").toLowerCase();
  if (s.includes("wedding") || s.includes("funeral") || s.includes("event") || s.includes("visual") || s.includes("photography") || s.includes("video") || s.includes("creator") || s.includes("artist") || s.includes("corporate") || s.includes("production")) return "visual";
  if (s.includes("audio") || s.includes("recording") || s.includes("podcast") || s.includes("voice") || s.includes("mix") || s.includes("mastering") || s.includes("music") || s.includes("studio")) return "audio";
  if (s.includes("digital") || s.includes("social") || s.includes("web") || s.includes("marketing") || s.includes("analytics") || s.includes("content creation") || s.includes("advertising") || s.includes("ads")) return "digital";
  return "visual"; 
};

const BookingFlow = () => {
  const { isOpen, bookingInfo, closeBooking } = useBooking();

  const [step, setStep] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [mapsLink, setMapsLink] = useState("");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [refNumber, setRefNumber] = useState("");
  const [locatingUser, setLocatingUser] = useState(false);

  const resetState = () => {
    setStep(1);
    setSelectedAddOns([]);
    setLocation("");
    setMapsLink("");
    setDate(undefined);
    setTime("");
    setClientName("");
    setClientPhone("");
    setClientEmail("");
    setConfirmed(false);
    setRefNumber("");
  };

  const handleClose = () => {
    closeBooking();
    setTimeout(resetState, 300);
  };

  const category = getServiceCategory(bookingInfo?.service || "");
  const currentAddOns = serviceAddOns[category];
  
  const basePrice = bookingInfo?.price || 0;
  const addOnTotal = currentAddOns
    .filter((a) => selectedAddOns.includes(a.id))
    .reduce((s, a) => s + a.price, 0);
  const subtotal = basePrice + addOnTotal;
  const vat = subtotal * VAT_RATE;
  const total = subtotal + vat;

  const toggleAddOn = (id: string) =>
    setSelectedAddOns((prev) => 
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

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

  const buildWhatsAppMsg = (ref: string) => {
    const dateStr = date ? format(date, "PPP") : "";
    let msg = `Hi KMP! I'd like to confirm my booking:\n\nRef: ${ref}\nService: ${bookingInfo?.service}\nPackage: ${bookingInfo?.package}\nDate: ${dateStr} at ${time}\nLocation: ${location}\nTotal: ${formatZAR(total)}\n\nName: ${clientName}\nPhone: ${clientPhone}`;
    if (bookingInfo?.format) msg += `\nFormat: ${bookingInfo.format}`;
    if (bookingInfo?.hours) msg += `\nDuration: ${bookingInfo.hours} Hours`;
    if (clientEmail) msg += `\nEmail: ${clientEmail}`;
    return msg;
  };

  const handleConfirm = () => {
    const ref = generateRef();
    setRefNumber(ref);
    setConfirmed(true);
    setStep(6);
  };

  const getPDFBlob = async (): Promise<Blob> => {
    const doc = new jsPDF();
    return new Promise((resolve) => {
      const img = new Image();
      img.src = logo;
      const canvas = document.createElement("canvas");
      canvas.width = 300;
      canvas.height = 200;
      const ctx = canvas.getContext("2d");

      img.onload = () => {
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, 300, 200);
          const logoData = canvas.toDataURL("image/png");
          doc.addImage(logoData, "PNG", 20, 10, 40, 25);
          doc.setFontSize(24);
          doc.setTextColor(0);
          doc.text("KMP - QUOTATION", 70, 28);
          doc.setFontSize(10);
          doc.setTextColor(100);
          doc.text(`Reference: ${refNumber}`, 70, 38);
          doc.text(`Generated: ${new Date().toLocaleDateString()}`, 70, 44);
          doc.line(20, 52, 190, 52);

          doc.setFontSize(14);
          doc.setTextColor(0);
          doc.text("CLIENT INFORMATION", 20, 65);
          doc.setFontSize(11);
          doc.text(`Name: ${clientName}`, 20, 75);
          doc.text(`Phone: ${clientPhone}`, 20, 82);
          if (clientEmail) doc.text(`Email: ${clientEmail}`, 20, 89);

          doc.setFontSize(14);
          doc.text("BOOKING DETAILS", 20, 105);
          doc.setFontSize(11);
          doc.text(`Service: ${bookingInfo?.service}`, 20, 115);
          doc.text(`Package: ${bookingInfo?.package}`, 20, 122);
          if (bookingInfo?.format) doc.text(`Format: ${bookingInfo.format}`, 20, 129);
          if (bookingInfo?.hours) doc.text(`Duration: ${bookingInfo.hours} Hours`, 20, 136);
          doc.text(`Location: ${location}`, 20, 143);
          doc.text(`Date & Time: ${date ? format(date, "PPP") : ""} at ${time}`, 20, 150);

          doc.setFontSize(14);
          doc.text("INVESTMENT SUMMARY", 20, 175);
          doc.setFontSize(11);
          doc.text(`${bookingInfo?.package} Base:`, 20, 185);
          doc.text(`${formatZAR(basePrice)}`, 150, 185);

          let yPosition = 192;
          if (selectedAddOns.length > 0) {
            selectedAddOns.forEach((id) => {
              const a = currentAddOns.find((x) => x.id === id)!;
              doc.text(`+ ${a.name}:`, 20, yPosition);
              doc.text(`${formatZAR(a.price)}`, 150, yPosition);
              yPosition += 7;
            });
          }

          doc.line(20, yPosition + 5, 190, yPosition + 5);
          doc.text("Subtotal:", 20, yPosition + 15);
          doc.text(`${formatZAR(subtotal)}`, 150, yPosition + 15);
          doc.text("VAT (15%):", 20, yPosition + 22);
          doc.text(`${formatZAR(vat)}`, 150, yPosition + 22);
          doc.setFontSize(16);
          doc.text("TOTAL INVESTMENT:", 20, yPosition + 35);
          doc.text(`${formatZAR(total)}`, 150, yPosition + 35);

          const bankY = yPosition + 55;
          doc.setFontSize(12);
          doc.text("PAYMENT DETAILS (BANKING)", 20, bankY);
          doc.setFontSize(10);
          doc.text("Bank Name: Capitec Bank", 20, bankY + 10);
          doc.text("Account Holder: Sindiso Sophazi", 20, bankY + 17);
          doc.text("Account Number: 2512337916", 20, bankY + 24);
          doc.text("Branch Code: 470010", 20, bankY + 31);
          doc.text("Account Type: Entrepreneur", 20, bankY + 38);

          doc.setFontSize(8);
          doc.setTextColor(150);
          doc.text("Kasilam Media Production | 6034 NTONGELA STREET, KWAZAKHELE, PORT ELIZABETH, 6205", 105, 285, { align: "center" });
          doc.text("Contact: 065 970 4101 | Ref: " + refNumber, 105, 290, { align: "center" });
          resolve(doc.output("blob"));
        }
      };
      if (img.complete) img.onload(new Event('load'));
    });
  };

  const openWhatsApp = async () => {
    const msgText = buildWhatsAppMsg(refNumber);
    const blob = await getPDFBlob();
    const file = new File([blob], `KMP-Quotation-${refNumber}.pdf`, { type: "application/pdf" });

    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: `KMP Quotation - ${refNumber}`,
          text: msgText,
        });
      } catch (err) {
        console.error("Share failed", err);
        const msg = encodeURIComponent(msgText);
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
      }
    } else {
      const msg = encodeURIComponent(msgText);
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    }
  };

  const downloadPDF = async () => {
    const blob = await getPDFBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `KMP-Quotation-${refNumber}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent className="w-full sm:max-w-[450px] bg-background border-foreground/5 p-0 overflow-y-auto scrollbar-hide">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-8 pb-4 space-y-4">
            <SheetHeader className="text-left">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-8 bg-red-600 rounded-full" />
                    <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.3em]">Official Booking</span>
                  </div>
                  <SheetTitle className="text-3xl font-black text-foreground uppercase tracking-tighter dark:text-white">
                    {confirmed ? "Booking Confirmed" : `Step ${step} of 6`}
                  </SheetTitle>
                </div>
                {!confirmed && (
                  <div className="bg-foreground/5 rounded-full px-3 py-1 border border-foreground/10 uppercase text-[9px] font-bold text-foreground/40 tracking-widest dark:bg-white/5 dark:border-white/10 dark:text-white/40">
                    {category} Production
                  </div>
                )}
              </div>
              {!confirmed && (
                <SheetDescription className="text-foreground/40 text-xs font-bold uppercase tracking-widest pt-2 dark:text-white/40">
                  Kasilam Media Production Standard Flow
                </SheetDescription>
              )}
            </SheetHeader>

            {/* Progress Bar */}
            {!confirmed && (
              <div className="grid grid-cols-6 gap-2 pt-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className={cn("h-1 rounded-full transition-all duration-500", i <= step ? "bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]" : "bg-foreground/10 dark:bg-white/10")} />
                ))}
              </div>
            )}
          </div>

          <div className="flex-1 px-8 pb-8">
            {/* Step 1: Service Confirmation */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground dark:text-white">Confirm Service</h3>
                  <p className="text-foreground/50 text-sm font-medium dark:text-white/50">Please review the selected production service and starting investment.</p>
                </div>
                <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6 space-y-4 dark:border-white/10 dark:bg-white/[0.02]">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] font-black text-foreground/30 uppercase tracking-widest mb-1 dark:text-white/30">Production Package</p>
                      <p className="text-lg font-black text-foreground uppercase leading-tight dark:text-white">{bookingInfo?.package}</p>
                      <p className="text-xs font-bold text-red-500 uppercase mt-1">{bookingInfo?.service}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-foreground/30 uppercase tracking-widest mb-1 dark:text-white/30">Starting From</p>
                      <p className="text-xl font-black text-foreground dark:text-white">{formatZAR(basePrice)}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-foreground/5 dark:border-white/5">
                    <div className="flex items-center gap-3 text-foreground/40 text-[10px] font-bold uppercase tracking-widest dark:text-white/40">
                      <div className="p-2 rounded-lg bg-foreground/5 dark:bg-white/5"><CheckCircle className="h-3 w-3 text-red-600" /></div>
                      Standard Production Quality Guaranteed
                    </div>
                  </div>
                </div>
                <Button variant="red" onClick={() => setStep(2)} className="w-full h-14 font-black uppercase tracking-widest text-xs group">
                  EXPLORE ADD-ONS <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            )}

            {/* Step 2: Add-ons */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground dark:text-white">Production Add-ons</h3>
                  <p className="text-foreground/50 text-sm font-medium dark:text-white/50">Enhance your production with these optional extras.</p>
                </div>
                <div className="grid gap-3">
                  {currentAddOns.map((addon) => (
                    <div 
                      key={addon.id}
                      onClick={() => toggleAddOn(addon.id)}
                      className={cn(
                        "p-4 rounded-xl border transition-all duration-300 cursor-pointer flex justify-between items-center group",
                        selectedAddOns.includes(addon.id) ? "bg-red-600/10 border-red-600 shadow-[0_0_15px_rgba(220,38,38,0.1)]" : "bg-foreground/[0.02] border-foreground/5 hover:border-foreground/20 dark:bg-white/[0.02] dark:border-white/5 dark:hover:border-white/20"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn("h-5 w-5 rounded-md border flex items-center justify-center transition-colors", selectedAddOns.includes(addon.id) ? "bg-red-600 border-red-600" : "border-foreground/20 bg-foreground/5 dark:border-white/20 dark:bg-black/40")}>
                          {selectedAddOns.includes(addon.id) && <CheckCircle className="h-3 w-3 text-white" />}
                        </div>
                        <div>
                          <p className="text-xs font-black text-foreground uppercase tracking-wider dark:text-white">{addon.name}</p>
                          <p className="text-[10px] font-bold text-foreground/30 uppercase mt-0.5 dark:text-white/30">{formatZAR(addon.price)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-3 pt-4">
                  <Button variant="red" onClick={() => setStep(3)} className="w-full h-14 font-black uppercase tracking-widest text-xs group">
                    SET LOCATION <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button variant="ghost" onClick={() => setStep(1)} className="w-full text-foreground/40 hover:text-foreground hover:bg-foreground/5 font-black uppercase tracking-widest text-[10px] dark:text-white/40 dark:hover:text-white dark:hover:bg-white/5">
                    BACK TO SERVICE
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Location */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground dark:text-white">Production Location</h3>
                  <p className="text-foreground/50 text-sm font-medium dark:text-white/50">Where will the production take place?</p>
                </div>
                <div className="space-y-4">
                  <div 
                    onClick={() => setLocation("KMP Studio - Gqeberha")}
                    className={cn(
                      "p-5 rounded-2xl border transition-all duration-300 cursor-pointer group",
                      location === "KMP Studio - Gqeberha" ? "bg-red-600/10 border-red-600 shadow-[0_0_15px_rgba(220,38,38,0.1)]" : "bg-foreground/[0.02] border-foreground/5 hover:border-foreground/20 dark:bg-white/[0.02] dark:border-white/5 dark:hover:border-white/20"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-foreground/5 dark:bg-white/5">
                        <MapPin className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-foreground uppercase tracking-wider text-left dark:text-white">KMP Studio - Gqeberha</p>
                        <p className="text-[10px] font-bold text-foreground/30 uppercase mt-0.5 text-left text-wrap dark:text-white/30">6034 NTONGELA STREET, KWAZAKHELE, PORT ELIZABETH</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <Label className="text-foreground/40 uppercase tracking-widest text-[10px] font-black dark:text-white/40">Mobile Production Site</Label>
                    <div className="relative group">
                      <Input 
                        value={location === "KMP Studio - Gqeberha" ? "" : location} 
                        onChange={(e) => setLocation(e.target.value)} 
                        placeholder="Enter full address or site name" 
                        className="h-14 bg-foreground/[0.02] border-foreground/10 text-foreground placeholder:text-foreground/20 rounded-xl pr-12 focus:border-red-600/50 dark:bg-white/[0.02] dark:border-white/10 dark:text-white dark:placeholder:text-white/20"
                      />
                      <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/20 group-focus-within:text-red-600 transition-colors dark:text-white/20" />
                    </div>
                    <Button 
                      variant="black" 
                      onClick={useMyLocation} 
                      disabled={locatingUser}
                      className="w-full h-12 flex items-center justify-center gap-2"
                    >
                      <Navigation className={cn("h-3 w-3", locatingUser && "animate-pulse")} />
                      {locatingUser ? "LOCATING..." : "USE CURRENT DEVICE LOCATION"}
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col gap-3 pt-4">
                  <Button variant="red" onClick={() => setStep(4)} disabled={!location} className="w-full h-14 font-black uppercase tracking-widest text-xs group disabled:opacity-20">
                    SELECT DATE & TIME <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button variant="ghost" onClick={() => setStep(2)} className="w-full text-foreground/40 hover:text-foreground hover:bg-foreground/5 font-black uppercase tracking-widest text-[10px] dark:text-white/40 dark:hover:text-white dark:hover:bg-white/5">
                    BACK TO ADD-ONS
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Date & Time */}
            {step === 4 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="space-y-2 text-center pb-2">
                  <h3 className="text-xl font-bold text-foreground dark:text-white">Production Schedule</h3>
                  <p className="text-foreground/50 text-sm font-medium dark:text-white/50">Standard 48-hour lead time enforced.</p>
                </div>
                <div className="space-y-4">
                  <div className="bg-foreground/5 rounded-2xl p-4 border border-foreground/5 flex flex-col items-center dark:bg-white/5 dark:border-white/5">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(d) => d < addDays(new Date(), 2)}
                      className="mx-auto"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-foreground/40 uppercase tracking-widest text-[10px] font-black text-center block dark:text-white/40">Select Time Slot</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {timeSlots.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setTime(t)}
                          className={cn(
                            "h-10 rounded-lg border text-[10px] font-black uppercase tracking-tighter transition-all duration-300",
                            time === t 
                              ? "bg-red-600 border-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.3)]" 
                              : "bg-foreground/[0.02] border-foreground/5 text-foreground/40 hover:border-foreground/20 dark:bg-white/[0.02] dark:border-white/5 dark:text-white/40 dark:hover:border-white/20"
                          )}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3 pt-4">
                  <Button variant="red" onClick={() => setStep(5)} disabled={!date || !time} className="w-full h-14 font-black uppercase tracking-widest text-xs group disabled:opacity-20">
                    CONTINUE TO DETAILS <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button variant="ghost" onClick={() => setStep(3)} className="w-full text-foreground/40 hover:text-foreground hover:bg-foreground/5 font-black uppercase tracking-widest text-[10px] dark:text-white/40 dark:hover:text-white dark:hover:bg-white/5">
                    BACK TO LOCATION
                  </Button>
                </div>
              </div>
            )}

            {/* Step 5: Client Details */}
            {step === 5 && !confirmed && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground dark:text-white">Client Information</h3>
                  <p className="text-foreground/50 text-sm font-medium dark:text-white/50">How should we contact you about your production?</p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="clientName" className="text-foreground/40 uppercase tracking-widest text-[10px] font-black dark:text-white/40">Full Name</Label>
                    <Input 
                      id="clientName" 
                      value={clientName} 
                      onChange={(e) => setClientName(e.target.value)} 
                      placeholder="John Doe" 
                      className="h-14 bg-foreground/[0.02] border-foreground/10 text-foreground placeholder:text-foreground/20 rounded-xl dark:bg-white/[0.02] dark:border-white/10 dark:text-white dark:placeholder:text-white/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="clientPhone" className="text-foreground/40 uppercase tracking-widest text-[10px] font-black dark:text-white/40">Phone Number / WhatsApp</Label>
                    <Input 
                      id="clientPhone" 
                      type="tel"
                      value={clientPhone} 
                      onChange={(e) => setClientPhone(e.target.value)} 
                      placeholder="065 970 4101" 
                      className="h-14 bg-foreground/[0.02] border-foreground/10 text-foreground placeholder:text-foreground/20 rounded-xl dark:bg-white/[0.02] dark:border-white/10 dark:text-white dark:placeholder:text-white/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="clientEmail" className="text-foreground/40 uppercase tracking-widest text-[10px] font-black dark:text-white/40">Email Address (Optional)</Label>
                    <Input 
                      id="clientEmail" 
                      type="email"
                      value={clientEmail} 
                      onChange={(e) => setClientEmail(e.target.value)} 
                      placeholder="john@example.com" 
                      className="h-14 bg-foreground/[0.02] border-foreground/10 text-foreground placeholder:text-foreground/20 rounded-xl dark:bg-white/[0.02] dark:border-white/10 dark:text-white dark:placeholder:text-white/20"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-3 pt-4">
                  <Button variant="red" onClick={() => setStep(6)} disabled={!clientName || !clientPhone} className="w-full h-14 font-black uppercase tracking-widest text-xs group disabled:opacity-20">
                    REVIEW SUMMARY <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button variant="ghost" onClick={() => setStep(4)} className="w-full text-foreground/40 hover:text-foreground hover:bg-foreground/5 font-black uppercase tracking-widest text-[10px] dark:text-white/40 dark:hover:text-white dark:hover:bg-white/5">
                    BACK TO SCHEDULE
                  </Button>
                </div>
              </div>
            )}

            {/* Step 6: Summary */}
            {step === 6 && !confirmed && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 pb-10">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground dark:text-white">Booking Summary</h3>
                  <p className="text-foreground/50 text-sm font-medium dark:text-white/50">Review your production details before final confirmation.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] overflow-hidden dark:border-white/10 dark:bg-white/[0.02]">
                    <div className="p-5 border-b border-foreground/5 bg-foreground/5 flex justify-between items-center dark:border-white/5 dark:bg-white/5">
                      <span className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.2em] dark:text-white/40">Investment Details</span>
                      <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Pricing Summary</span>
                    </div>
                    <div className="p-5 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-black text-foreground uppercase dark:text-white">{bookingInfo?.package}</p>
                          <p className="text-[10px] font-bold text-foreground/30 uppercase mt-0.5 dark:text-white/30">{bookingInfo?.service}</p>
                        </div>
                        <span className="text-sm font-black text-foreground dark:text-white">{formatZAR(basePrice)}</span>
                      </div>
                      {selectedAddOns.map((id) => {
                        const a = currentAddOns.find((x) => x.id === id)!;
                        return (
                          <div key={id} className="flex justify-between items-start">
                            <p className="text-[11px] font-bold text-foreground/50 uppercase dark:text-white/50">+ {a.name}</p>
                            <span className="text-[11px] font-bold text-foreground/50 dark:text-white/50">{formatZAR(a.price)}</span>
                          </div>
                        );
                      })}
                      <div className="pt-4 border-t border-foreground/5 dark:border-white/5 space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-foreground/30 uppercase dark:text-white/30">Subtotal</span>
                          <span className="font-bold text-foreground/60 dark:text-white/60">{formatZAR(subtotal)}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-foreground/30 uppercase dark:text-white/30">VAT (15%)</span>
                          <span className="font-bold text-foreground/60 dark:text-white/60">{formatZAR(vat)}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                          <span className="text-xs font-black text-foreground uppercase tracking-widest dark:text-white">Total Investment</span>
                          <span className="text-xl font-black text-red-600">{formatZAR(total)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-5 space-y-3 dark:border-white/10 dark:bg-white/[0.02]">
                    <div className="flex gap-4">
                      <div className="h-4 w-4 text-red-500 mt-1"><CheckCircle className="h-full w-full" /></div>
                      <div>
                        <p className="text-[10px] font-black text-foreground/30 uppercase tracking-widest underline dark:text-white/30">Location</p>
                        <p className="text-sm font-bold text-foreground uppercase text-left dark:text-white">{location}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="h-4 w-4 text-red-500 mt-1"><CheckCircle className="h-full w-full" /></div>
                      <div>
                        <p className="text-[10px] font-black text-foreground/30 uppercase tracking-widest underline dark:text-white/30">Schedule</p>
                        <p className="text-sm font-bold text-foreground uppercase text-left dark:text-white">{date ? format(date, "PPP") : ""} AT {time}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-red-600/5 border border-red-600/10 p-5 rounded-2xl text-center space-y-3">
                  <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em]">Trust Statement</p>
                  <p className="text-xs font-bold text-foreground leading-relaxed dark:text-white">
                    Trusted by artists, weddings, and corporate clients across the Eastern Cape.
                  </p>
                </div>

                <div className="flex flex-col gap-3 pt-4">
                  <Button variant="red" onClick={handleConfirm} className="w-full h-16 uppercase tracking-[0.2em] text-xs shadow-[0_0_30px_rgba(220,38,38,0.3)] hover:scale-[1.02] transition-all">
                    CONFIRM PRODUCTION BOOKING
                  </Button>
                  <Button variant="ghost" onClick={() => setStep(5)} className="w-full text-foreground/40 hover:text-foreground hover:bg-foreground/5 font-black uppercase tracking-widest text-[10px] dark:text-white/40 dark:hover:text-white dark:hover:bg-white/5">
                    BACK TO DETAILS
                  </Button>
                </div>
              </div>
            )}

            {/* Confirmation Success */}
            {confirmed && (
              <div className="space-y-8 text-center py-12 animate-in zoom-in-95 duration-700">
                <div className="relative mx-auto h-24 w-24">
                  <div className="absolute inset-0 animate-ping rounded-full bg-red-600/20" />
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-red-600 shadow-[0_0_40px_rgba(220,38,38,0.4)]">
                    <CheckCircle className="h-12 w-12 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-black text-foreground uppercase tracking-tighter dark:text-white">Production Reserved</h3>
                  <p className="text-foreground/50 text-sm font-bold mt-2 uppercase tracking-widest dark:text-white/50">Reference No: <span className="text-red-500">{refNumber}</span></p>
                </div>
                
                <div className="bg-foreground/[0.02] border border-foreground/5 rounded-2xl p-6 space-y-4 text-left dark:bg-white/[0.02] dark:border-white/5">
                  <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-foreground/30 border-b border-foreground/5 pb-4 dark:text-white/30 dark:border-white/5">
                    <span>Summary</span>
                    <span>Investment</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-black text-foreground uppercase dark:text-white">{bookingInfo?.package}</p>
                        <p className="text-[10px] font-bold text-foreground/40 uppercase dark:text-white/40">{bookingInfo?.service}</p>
                      </div>
                      <span className="text-lg font-black text-red-600">{formatZAR(total)}</span>
                    </div>
                    <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-tighter leading-relaxed dark:text-white/30">
                      Scheduled for {date ? format(date, "PPP") : ""} at {time}.<br />
                      Location: {location}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Button onClick={openWhatsApp} className="w-full h-16 bg-[#25D366] hover:bg-[#128C7E] text-white font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3">
                    <MessageCircle className="h-5 w-5" /> SEND TO WHATSAPP
                  </Button>
                  <Button variant="black" onClick={downloadPDF} className="w-full h-16 flex items-center justify-center gap-3">
                    <Download className="h-5 w-5" /> DOWNLOAD QUOTATION
                  </Button>
                  <p className="text-[9px] font-bold text-foreground/30 uppercase tracking-[0.3em] pt-4 dark:text-white/30">
                    A representative will contact you shortly to finalize technical requirements.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BookingFlow;

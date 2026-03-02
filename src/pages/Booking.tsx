import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, ArrowRight, ArrowLeft, CheckCircle, Download, MessageCircle, Mic, Camera, Globe } from "lucide-react";
import jsPDF from "jspdf";

// --- Data ---
const serviceCategories = [
  { id: "audio", label: "Audio Production", icon: Mic },
  { id: "visual", label: "Visual Production", icon: Camera },
  { id: "digital", label: "Digital Media Solutions", icon: Globe },
] as const;

type ServiceId = (typeof serviceCategories)[number]["id"];

const packages: Record<ServiceId, { id: string; name: string; price: number; desc: string }[]> = {
  audio: [
    { id: "audio-basic", name: "Basic Recording", price: 1500, desc: "2-hour studio session, basic mix" },
    { id: "audio-standard", name: "Standard Package", price: 3500, desc: "Full day session, mixing & mastering" },
    { id: "audio-premium", name: "Premium Package", price: 7000, desc: "Multi-day session, full production" },
  ],
  visual: [
    { id: "visual-basic", name: "Basic Shoot", price: 2000, desc: "2-hour photo/video session" },
    { id: "visual-standard", name: "Standard Package", price: 5000, desc: "Half-day shoot with editing" },
    { id: "visual-premium", name: "Premium Package", price: 12000, desc: "Full-day cinematic production" },
  ],
  digital: [
    { id: "digital-basic", name: "Starter Website", price: 3000, desc: "Single-page responsive website" },
    { id: "digital-standard", name: "Business Package", price: 8000, desc: "Multi-page site with CMS" },
    { id: "digital-premium", name: "Full Digital Suite", price: 15000, desc: "Website + marketing + branding" },
  ],
};

const addOns = [
  { id: "rush", name: "Rush Delivery (48h)", price: 500 },
  { id: "extra-revisions", name: "Extra Revisions (3)", price: 300 },
  { id: "raw-files", name: "Raw Files Included", price: 400 },
  { id: "social-edit", name: "Social Media Edits", price: 600 },
  { id: "drone", name: "Drone Footage Add-on", price: 1500 },
];

const TRAVEL_RATE = 8; // ZAR per km after 30km
const TRAVEL_FREE_KM = 30;

const formatZAR = (amount: number) =>
  new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(amount);

const generateRef = () => `KMP-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

const timeSlots = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

// --- Component ---
const Booking = () => {
  const [step, setStep] = useState(1);
  const [service, setService] = useState<ServiceId | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [distance, setDistance] = useState<number>(0);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>("");
  const [client, setClient] = useState({ name: "", email: "", phone: "" });
  const [confirmed, setConfirmed] = useState(false);
  const [refNumber, setRefNumber] = useState("");

  const packageData = service ? packages[service].find((p) => p.id === selectedPackage) : null;
  const addOnTotal = addOns.filter((a) => selectedAddOns.includes(a.id)).reduce((s, a) => s + a.price, 0);
  const travelCost = distance > TRAVEL_FREE_KM ? (distance - TRAVEL_FREE_KM) * TRAVEL_RATE : 0;
  const total = (packageData?.price || 0) + addOnTotal + travelCost;

  const canNext = useMemo(() => {
    switch (step) {
      case 1: return !!service;
      case 2: return !!selectedPackage;
      case 3: return true;
      case 4: return true;
      case 5: return !!date && !!time;
      case 6: return client.name && client.email && client.phone;
      default: return false;
    }
  }, [step, service, selectedPackage, date, time, client]);

  const handleConfirm = () => {
    const ref = generateRef();
    setRefNumber(ref);
    setConfirmed(true);

    // Auto open WhatsApp
    const msg = encodeURIComponent(
      `Hi KMP! I'd like to confirm my booking:\n\nRef: ${ref}\nService: ${serviceCategories.find((s) => s.id === service)?.label}\nPackage: ${packageData?.name}\nDate: ${date ? format(date, "PPP") : ""} at ${time}\nTotal: ${formatZAR(total)}\n\nName: ${client.name}\nEmail: ${client.email}\nPhone: ${client.phone}`
    );
    setTimeout(() => {
      window.open(`https://wa.me/27000000000?text=${msg}`, "_blank");
    }, 1000);
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
    doc.text(`Name: ${client.name}`, 20, 65);
    doc.text(`Email: ${client.email}`, 20, 72);
    doc.text(`Phone: ${client.phone}`, 20, 79);

    doc.setFontSize(12);
    doc.text("Booking Details", 20, 95);
    doc.setFontSize(10);
    doc.text(`Service: ${serviceCategories.find((s) => s.id === service)?.label}`, 20, 103);
    doc.text(`Package: ${packageData?.name} — ${formatZAR(packageData?.price || 0)}`, 20, 110);

    if (selectedAddOns.length > 0) {
      doc.text("Add-ons:", 20, 120);
      selectedAddOns.forEach((id, i) => {
        const a = addOns.find((x) => x.id === id)!;
        doc.text(`  - ${a.name}: ${formatZAR(a.price)}`, 20, 128 + i * 7);
      });
    }

    const yOff = 128 + selectedAddOns.length * 7 + 5;
    if (travelCost > 0) doc.text(`Travel (${distance}km): ${formatZAR(travelCost)}`, 20, yOff);
    doc.text(`Date & Time: ${date ? format(date, "PPP") : ""} at ${time}`, 20, yOff + 10);

    doc.line(20, yOff + 18, 190, yOff + 18);
    doc.setFontSize(14);
    doc.text(`Total: ${formatZAR(total)}`, 20, yOff + 28);

    doc.setFontSize(8);
    doc.text("Kasilam Media Productions | www.kmp.co.za", 20, 285);

    doc.save(`KMP-Quote-${refNumber}.pdf`);
  };

  // --- Summary Panel ---
  const Summary = () => (
    <Card className="border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Booking Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        {service && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Service</span>
            <span>{serviceCategories.find((s) => s.id === service)?.label}</span>
          </div>
        )}
        {packageData && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Package</span>
            <span>{packageData.name} — {formatZAR(packageData.price)}</span>
          </div>
        )}
        {selectedAddOns.length > 0 && (
          <div>
            <span className="text-muted-foreground">Add-ons</span>
            {selectedAddOns.map((id) => {
              const a = addOns.find((x) => x.id === id)!;
              return (
                <div key={id} className="flex justify-between pl-2">
                  <span className="text-xs">{a.name}</span>
                  <span className="text-xs">{formatZAR(a.price)}</span>
                </div>
              );
            })}
          </div>
        )}
        {travelCost > 0 && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Travel ({distance}km)</span>
            <span>{formatZAR(travelCost)}</span>
          </div>
        )}
        {date && time && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Date</span>
            <span>{format(date, "PPP")} {time}</span>
          </div>
        )}
        <div className="border-t border-border pt-3 flex justify-between font-semibold text-base">
          <span>Total</span>
          <span className="text-primary">{formatZAR(total)}</span>
        </div>
      </CardContent>
    </Card>
  );

  if (confirmed) {
    return (
      <div>
        <section className="py-20">
          <div className="container mx-auto max-w-2xl px-4 text-center">
            <div className="mb-6 inline-flex rounded-full bg-primary/10 p-6">
              <CheckCircle className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Booking Confirmed!</h1>
            <p className="mt-2 text-muted-foreground">Your reference number:</p>
            <p className="mt-1 text-2xl font-black text-primary">{refNumber}</p>
            <p className="mt-4 text-sm text-muted-foreground">
              A WhatsApp message has been prepared with your booking details. Download your quotation below.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button onClick={downloadPDF} size="lg" className="gap-2">
                <Download className="h-4 w-4" /> Download PDF Quote
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="gap-2"
              >
                <a
                  href={`https://wa.me/27000000000?text=${encodeURIComponent(`Hi KMP! Ref: ${refNumber}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              </Button>
            </div>
            <div className="mt-10">
              <Summary />
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-card py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="animate-fade-in text-4xl font-black md:text-5xl">
            Book a <span className="text-primary">Session</span>
          </h1>
          <p className="mt-3 text-muted-foreground">Step {step} of 6</p>
          {/* Progress bar */}
          <div className="mx-auto mt-4 flex max-w-md gap-1">
            {[1, 2, 3, 4, 5, 6].map((s) => (
              <div key={s} className={cn("h-1.5 flex-1 rounded-full transition-colors", s <= step ? "bg-primary" : "bg-muted")} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Form */}
            <div className="lg:col-span-2">
              {/* Step 1: Service */}
              {step === 1 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Select a Service</h2>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {serviceCategories.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => { setService(s.id); setSelectedPackage(null); }}
                        className={cn(
                          "flex flex-col items-center gap-3 rounded-lg border p-6 text-center transition-all hover:border-primary/50",
                          service === s.id ? "border-primary bg-primary/5" : "border-border"
                        )}
                      >
                        <s.icon className={cn("h-8 w-8", service === s.id ? "text-primary" : "text-muted-foreground")} />
                        <span className="font-medium">{s.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Package */}
              {step === 2 && service && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Choose a Package</h2>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {packages[service].map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setSelectedPackage(p.id)}
                        className={cn(
                          "flex flex-col rounded-lg border p-5 text-left transition-all hover:border-primary/50",
                          selectedPackage === p.id ? "border-primary bg-primary/5" : "border-border"
                        )}
                      >
                        <span className="font-semibold">{p.name}</span>
                        <span className="mt-1 text-2xl font-black text-primary">{formatZAR(p.price)}</span>
                        <span className="mt-2 text-xs text-muted-foreground">{p.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Add-ons */}
              {step === 3 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Add-ons (Optional)</h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {addOns.map((a) => (
                      <button
                        key={a.id}
                        onClick={() =>
                          setSelectedAddOns((prev) =>
                            prev.includes(a.id) ? prev.filter((x) => x !== a.id) : [...prev, a.id]
                          )
                        }
                        className={cn(
                          "flex items-center justify-between rounded-lg border p-4 transition-all hover:border-primary/50",
                          selectedAddOns.includes(a.id) ? "border-primary bg-primary/5" : "border-border"
                        )}
                      >
                        <span className="text-sm font-medium">{a.name}</span>
                        <span className="text-sm font-semibold text-primary">{formatZAR(a.price)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Travel */}
              {step === 4 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Travel Distance</h2>
                  <p className="text-sm text-muted-foreground">
                    First {TRAVEL_FREE_KM}km included. Beyond that, {formatZAR(TRAVEL_RATE)}/km applies.
                  </p>
                  <div className="max-w-xs">
                    <Label htmlFor="distance">Distance (km)</Label>
                    <Input
                      id="distance"
                      type="number"
                      min={0}
                      value={distance || ""}
                      onChange={(e) => setDistance(Number(e.target.value))}
                      placeholder="e.g. 45"
                    />
                    {travelCost > 0 && (
                      <p className="mt-2 text-sm text-primary font-medium">
                        Travel surcharge: {formatZAR(travelCost)}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 5: Date & Time */}
              {step === 5 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Select Date & Time</h2>
                  <div className="flex flex-wrap gap-6">
                    <div>
                      <Label>Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className={cn("mt-1 w-[240px] justify-start text-left font-normal", !date && "text-muted-foreground")}>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            disabled={(d) => d < new Date()}
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <Label>Time</Label>
                      <div className="mt-1 grid grid-cols-5 gap-2">
                        {timeSlots.map((t) => (
                          <button
                            key={t}
                            onClick={() => setTime(t)}
                            className={cn(
                              "rounded-md border px-3 py-2 text-sm transition-colors hover:border-primary/50",
                              time === t ? "border-primary bg-primary/10 text-primary" : "border-border"
                            )}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 6: Client */}
              {step === 6 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Your Details</h2>
                  <div className="max-w-md space-y-4">
                    <div>
                      <Label htmlFor="cname">Full Name</Label>
                      <Input id="cname" value={client.name} onChange={(e) => setClient({ ...client, name: e.target.value })} placeholder="John Doe" required />
                    </div>
                    <div>
                      <Label htmlFor="cemail">Email</Label>
                      <Input id="cemail" type="email" value={client.email} onChange={(e) => setClient({ ...client, email: e.target.value })} placeholder="john@example.com" required />
                    </div>
                    <div>
                      <Label htmlFor="cphone">Phone</Label>
                      <Input id="cphone" type="tel" value={client.phone} onChange={(e) => setClient({ ...client, phone: e.target.value })} placeholder="082 123 4567" required />
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="mt-8 flex justify-between">
                {step > 1 ? (
                  <Button variant="outline" onClick={() => setStep(step - 1)} className="gap-2">
                    <ArrowLeft className="h-4 w-4" /> Back
                  </Button>
                ) : <div />}
                {step < 6 ? (
                  <Button onClick={() => setStep(step + 1)} disabled={!canNext} className="gap-2">
                    Next <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={handleConfirm} disabled={!canNext} className="gap-2">
                    <CheckCircle className="h-4 w-4" /> Confirm Booking
                  </Button>
                )}
              </div>
            </div>

            {/* Sidebar Summary */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <Summary />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;

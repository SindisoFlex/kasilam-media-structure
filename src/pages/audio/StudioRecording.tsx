import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, ArrowRight, CheckCircle, ArrowLeft } from "lucide-react";

const sessionIncludes = [
  "Professional microphone setup",
  "Optimized audio levels",
  "Multiple recording takes",
  "Recording guidance when needed",
  "Preparation for mixing and production",
];

const idealFor = [
  "Musicians",
  "Podcasters",
  "Voice-over artists",
  "Businesses recording ads",
  "Content creators",
];

const pricingTiers = [
  {
    name: "Starter Recording",
    price: "R____",
    features: ["2-hour recording session", "Basic audio cleanup", "MP3 delivery"],
    highlighted: false,
  },
  {
    name: "Professional Recording",
    price: "R____",
    features: ["4-hour recording session", "Session guidance", "WAV + MP3 files"],
    highlighted: true,
  },
  {
    name: "Full-Day Recording",
    price: "R____",
    features: ["Full-day session", "Multi-take recording", "Complete file delivery", "Priority booking"],
    highlighted: false,
  },
];

const StudioRecording = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-background py-28 md:py-36">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Link
              to="/services/audio-production"
              className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" /> Audio Production
            </Link>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Mic className="h-4 w-4" />
              Studio Recording
            </div>
            <h1 className="animate-fade-in text-4xl font-black leading-tight md:text-5xl lg:text-6xl">
              Professional <span className="text-primary">Studio Recording</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl animate-fade-in text-lg text-muted-foreground" style={{ animationDelay: "100ms" }}>
              Capture clean, powerful vocals and instruments in a focused recording environment designed for professional sound.
            </p>
            <Button asChild size="lg" className="mt-8 gap-2 animate-fade-in" style={{ animationDelay: "200ms" }}>
              <Link to="/booking">
                Book Recording Session <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              About This <span className="text-primary">Service</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Great audio starts with a great recording environment. Our studio recording service provides artists, musicians, and creators with a professional space to capture high-quality audio.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Whether you're recording vocals, spoken content, or instruments, we ensure your sound is recorded clearly and accurately. We focus on creating a comfortable creative environment so you can focus on performance while we handle the technical side.
            </p>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="bg-card py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            What Your Session <span className="text-primary">Includes</span>
          </h2>
          <div className="mx-auto mt-12 max-w-2xl space-y-4">
            {sessionIncludes.map((item, i) => (
              <div
                key={item}
                className="animate-fade-in flex items-center gap-4 rounded-lg border border-border bg-muted p-4"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <CheckCircle className="h-5 w-5 shrink-0 text-primary" />
                <span className="font-medium text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            Perfect <span className="text-primary">For</span>
          </h2>
          <div className="mx-auto mt-12 flex max-w-2xl flex-wrap justify-center gap-3">
            {idealFor.map((item, i) => (
              <span
                key={item}
                className="animate-fade-in rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-sm font-medium text-primary"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-card py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            Studio Recording <span className="text-primary">Packages</span>
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {pricingTiers.map((tier, i) => (
              <Card
                key={tier.name}
                className={`animate-fade-in shadow-lg ${tier.highlighted ? "border-2 border-primary" : "border-primary/20"}`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <CardHeader className="text-center">
                  {tier.highlighted && (
                    <span className="mx-auto mb-2 inline-block rounded-full bg-primary px-3 py-0.5 text-xs font-bold text-primary-foreground">
                      Most Popular
                    </span>
                  )}
                  <CardTitle className="text-xl">{tier.name}</CardTitle>
                  <p className="mt-2 text-3xl font-black text-primary">{tier.price}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-sm">
                        <CheckCircle className="h-4 w-4 shrink-0 text-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button asChild size="lg" className="mt-6 w-full" variant={tier.highlighted ? "default" : "outline"}>
                    <Link to="/booking">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Book Your <span className="text-primary">Studio Recording Session</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Step into a professional recording environment and capture your best sound.
          </p>
          <Button asChild size="lg" className="mt-8 gap-2">
            <Link to="/booking">
              Book Now <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default StudioRecording;

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mic, CheckCircle, ArrowRight } from "lucide-react";
import { FadeInSection, HeroSection, StaggerContainer, StaggerItem, StaggerScaleItem } from "@/components/animations";
import { useBooking } from "@/contexts/BookingContext";

const StudioRecording = () => {
  const { openBooking } = useBooking();

  const tiers = [
    { name: "Starter Recording", price: 350, desc: "Perfect for artists who already have their song ready.", features: ["Studio recording session", "Professional mic setup", "Basic vocal guidance", "Raw audio files"], priceLabel: "R350 / hour" },
    { name: "Professional Recording", price: 900, desc: "3-hour session. Best for singles and demos.", highlighted: true, features: ["3 hours studio recording", "Vocal direction", "Basic editing and cleanup", "Rough mix preview"], priceLabel: "R900" },
    { name: "Full Song Production", price: 2500, desc: "Perfect for artists releasing music.", features: ["Full vocal recording", "Vocal editing & tuning", "Mixing", "Mastering", "Final ready-to-release track"], priceLabel: "R2500 per song" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container relative mx-auto px-4 text-center">
          <HeroSection>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Mic className="h-4 w-4" />
              Studio Recording
            </div>
          </HeroSection>
          <HeroSection delay={0.1}>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Professional <span className="text-primary">Studio Recording</span>
            </h1>
          </HeroSection>
          <HeroSection delay={0.2}>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Capture clean, powerful vocals and instruments in a focused recording environment designed for professional sound.
            </p>
          </HeroSection>
        </div>
      </section>

      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <FadeInSection className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">About This Service</h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed text-center">
              <p>Great audio starts with a great recording environment.</p>
              <p>Our studio recording service provides artists, musicians, and creators with a professional space to capture high-quality audio.</p>
              <p>We focus on creating a comfortable creative environment so you can focus on performance while we handle the technical side.</p>
            </div>
          </FadeInSection>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="text-center text-3xl font-bold mb-12">What Your Session Includes</h2>
          </FadeInSection>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto text-center">
            {["Studio recording session", "Professional microphone setup", "Basic vocal guidance", "Raw audio files", "Comfortable creative environment"].map((item, i) => (
              <StaggerItem key={i} className="flex flex-col items-center gap-3 p-6 rounded-xl border border-primary/10 bg-card">
                <CheckCircle className="h-8 w-8 text-primary mb-2" />
                <p className="font-semibold text-lg">{item}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4 text-center">
          <FadeInSection>
            <h2 className="text-3xl font-bold mb-12">Studio Recording <span className="text-primary">Packages</span></h2>
          </FadeInSection>
          <StaggerContainer className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {tiers.map((tier, i) => (
              <StaggerScaleItem key={i}>
                <div className={`p-8 rounded-2xl border flex flex-col h-full ${tier.highlighted ? 'border-primary bg-primary/5 shadow-xl scale-105' : 'border-border bg-background'}`}>
                  <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                  <p className="text-2xl font-black text-primary mb-4">{tier.priceLabel}</p>
                  <p className="text-sm text-muted-foreground mb-6">{tier.desc}</p>
                  <ul className="text-left space-y-3 mb-8 flex-1">
                    {tier.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => openBooking({
                      serviceName: "Studio Recording",
                      packageName: tier.name,
                      mediaType: "none",
                      basePrice: tier.price,
                      eventType: "Studio Recording",
                    })}
                    variant={tier.highlighted ? "default" : "outline"}
                    className="w-full"
                  >
                    Book Now
                  </Button>
                </div>
              </StaggerScaleItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-24 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Record Your Next Hit?</h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Don't compromise on sound quality. Start your professional audio journey with KMP today.
            </p>
            <Button asChild size="lg" className="gap-2">
              <Link to="/contact">
                Get in Touch <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
};

export default StudioRecording;

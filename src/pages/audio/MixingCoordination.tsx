import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Headphones, ArrowRight, CheckCircle, ArrowLeft } from "lucide-react";
import { FadeInSection, HeroSection, StaggerContainer, StaggerItem, StaggerScaleItem } from "@/components/animations";
import { useBooking } from "@/contexts/BookingContext";

const whatWeCoordinate = [
  "Vocal and instrumental balance",
  "Sound clarity and enhancement",
  "Final mastering for distribution",
  "Export-ready audio formats",
  "Quality control and review",
];

const perfectFor = ["Recording artists", "Music producers", "Podcast creators", "Brands with audio content", "Independent musicians"];

const pricingTiers = [
  { name: "Basic Mix", price: 900, priceLabel: "R900", features: ["Single track mix", "1 revision", "MP3 delivery"], highlighted: false },
  { name: "Full Mix & Master", price: 1800, priceLabel: "R1,800", features: ["Multi-track mixing", "Mastering coordination", "3 revisions", "WAV + MP3 delivery"], highlighted: true },
  { name: "Album Package", price: 8000, priceLabel: "R8,000", features: ["Up to 10 tracks", "Full mixing & mastering", "Unlimited revisions", "Priority delivery"], highlighted: false },
];

const MixingCoordination = () => {
  const { openBooking } = useBooking();

  return (
    <div>
      <section className="relative overflow-hidden bg-background py-28 md:py-36">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Link to="/services/audio-production" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
              <ArrowLeft className="h-4 w-4" /> Audio Production
            </Link>
            <HeroSection>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <Headphones className="h-4 w-4" />
                Mixing & Mastering
              </div>
            </HeroSection>
            <HeroSection delay={0.1}>
              <h1 className="text-4xl font-black leading-tight md:text-5xl lg:text-6xl">
                Professional Mixing & <span className="text-primary">Mastering Coordination</span>
              </h1>
            </HeroSection>
            <HeroSection delay={0.2}>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                Refine and balance your audio to achieve a polished, professional sound.
              </p>
            </HeroSection>
            <HeroSection delay={0.3}>
              <Button onClick={() => openBooking({ serviceName: "Mixing Coordination", packageName: "Mixing Session", mediaType: "none", basePrice: 900, eventType: "Mixing & Mastering" })} size="lg" className="mt-8 gap-2">
                Start Your Mixing Process <ArrowRight className="h-4 w-4" />
              </Button>
            </HeroSection>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <FadeInSection className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">About This <span className="text-primary">Service</span></h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Mixing and mastering are essential steps in professional audio production. Instead of limiting you to one engineer, we collaborate with trusted mixing and mastering specialists to ensure your project receives the right treatment.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Our role is to coordinate the process, communicate your creative vision, and ensure the final sound meets professional standards.
            </p>
          </FadeInSection>
        </div>
      </section>

      <section className="bg-card py-20">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="text-center text-3xl font-bold md:text-4xl">What We <span className="text-primary">Coordinate</span></h2>
          </FadeInSection>
          <StaggerContainer className="mx-auto mt-12 max-w-2xl space-y-4">
            {whatWeCoordinate.map((item) => (
              <StaggerItem key={item} className="flex items-center gap-4 rounded-lg border border-border bg-muted p-4">
                <CheckCircle className="h-5 w-5 shrink-0 text-primary" />
                <span className="font-medium text-foreground">{item}</span>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="text-center text-3xl font-bold md:text-4xl">Perfect <span className="text-primary">For</span></h2>
          </FadeInSection>
          <StaggerContainer className="mx-auto mt-12 flex max-w-2xl flex-wrap justify-center gap-3">
            {perfectFor.map((item) => (
              <StaggerItem key={item}>
                <span className="rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-sm font-medium text-primary inline-block">{item}</span>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="bg-card py-20">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="text-center text-3xl font-bold md:text-4xl">Mixing & Mastering <span className="text-primary">Packages</span></h2>
          </FadeInSection>
          <StaggerContainer className="mt-12 grid gap-8 md:grid-cols-3">
            {pricingTiers.map((tier) => (
              <StaggerScaleItem key={tier.name}>
                <Card className={`shadow-lg h-full flex flex-col ${tier.highlighted ? "border-2 border-primary" : "border-primary/20"}`}>
                  <CardHeader className="text-center">
                    {tier.highlighted && (
                      <span className="mx-auto mb-2 inline-block rounded-full bg-primary px-3 py-0.5 text-xs font-bold text-primary-foreground">Most Popular</span>
                    )}
                    <CardTitle className="text-xl">{tier.name}</CardTitle>
                    <p className="mt-2 text-3xl font-black text-primary">{tier.priceLabel}</p>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <ul className="space-y-3 mb-6 flex-1">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-center gap-3 text-sm">
                          <CheckCircle className="h-4 w-4 shrink-0 text-primary" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Button
                      size="lg"
                      className="w-full"
                      variant={tier.highlighted ? "default" : "outline"}
                      onClick={() => openBooking({ serviceName: "Mixing Coordination", packageName: tier.name, mediaType: "none", basePrice: tier.price, eventType: "Mixing & Mastering" })}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </StaggerScaleItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <FadeInSection>
            <h2 className="text-3xl font-bold md:text-4xl">Start Your <span className="text-primary">Mixing Process</span></h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Let us coordinate with the right engineers to make your audio sound its best.
            </p>
            <Button onClick={() => openBooking({ serviceName: "Mixing Coordination", packageName: "Mixing Session", mediaType: "none", basePrice: 900, eventType: "Mixing & Mastering" })} size="lg" className="mt-8 gap-2">
              Book Now <ArrowRight className="h-4 w-4" />
            </Button>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
};

export default MixingCoordination;

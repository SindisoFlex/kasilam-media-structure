import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, ArrowRight, CheckCircle, ArrowLeft } from "lucide-react";
import { FadeInSection, HeroSection, StaggerContainer, StaggerItem, StaggerScaleItem } from "@/components/animations";

const whatWeDo = [
  "Beat sourcing from producers",
  "Production coordination",
  "Negotiation with beat makers",
  "Artist-producer collaboration",
  "Project workflow management",
];

const perfectFor = [
  "Recording artists",
  "Independent musicians",
  "Music labels",
  "Content creators",
  "Brands needing original music",
];

const pricingTiers = [
  { name: "Single Track", price: "R____", features: ["Beat sourcing", "1 producer connection", "Basic coordination"], highlighted: false },
  { name: "EP Package", price: "R____", features: ["Up to 5 tracks", "Multiple producer sourcing", "Full coordination", "Project management"], highlighted: true },
  { name: "Album Production", price: "R____", features: ["Up to 12 tracks", "Full beat sourcing", "Producer negotiations", "Complete workflow management", "Priority support"], highlighted: false },
];

const ProductionManagement = () => {
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
                <Music className="h-4 w-4" />
                Music Production Management
              </div>
            </HeroSection>
            <HeroSection delay={0.1}>
              <h1 className="text-4xl font-black leading-tight md:text-5xl lg:text-6xl">
                Music Production <span className="text-primary">Management</span>
              </h1>
            </HeroSection>
            <HeroSection delay={0.2}>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                We help artists find the right beats, producers, and production workflow for their projects.
              </p>
            </HeroSection>
            <HeroSection delay={0.3}>
              <Button asChild size="lg" className="mt-8 gap-2">
                <Link to="/booking">Start Your Music Production Project <ArrowRight className="h-4 w-4" /></Link>
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
              Not every artist works with the same producer or sound style. Our music production management service helps connect artists with the right producers and beats for their project.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Instead of limiting you to one sound, we source beats from trusted producers, present the best options to you, and coordinate the production process.
            </p>
          </FadeInSection>
        </div>
      </section>

      <section className="bg-card py-20">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="text-center text-3xl font-bold md:text-4xl">What We <span className="text-primary">Do</span></h2>
          </FadeInSection>
          <StaggerContainer className="mx-auto mt-12 max-w-2xl space-y-4">
            {whatWeDo.map((item) => (
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
            <h2 className="text-center text-3xl font-bold md:text-4xl">Production Management <span className="text-primary">Packages</span></h2>
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
                    <p className="mt-2 text-3xl font-black text-primary">{tier.price}</p>
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
                    <Button asChild size="lg" className="w-full" variant={tier.highlighted ? "default" : "outline"}>
                      <Link to="/booking">Get Started</Link>
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
            <h2 className="text-3xl font-bold md:text-4xl">Start Your Music <span className="text-primary">Production Project</span></h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Let us connect you with the right producers and manage the entire production workflow.
            </p>
            <Button asChild size="lg" className="mt-8 gap-2">
              <Link to="/booking">Book Now <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
};

export default ProductionManagement;

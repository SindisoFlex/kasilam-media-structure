import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HeroSection, FadeInSection, StaggerContainer, StaggerItem } from "@/components/animations";
import { useBooking } from "@/contexts/BookingContext";
import { Link } from "react-router-dom";
import {
  Globe, TrendingUp, Shield, CalendarCheck, MapPin,
  CheckCircle, MessageCircle, ArrowRight
} from "lucide-react";

const WebDevelopment = () => {
  const { openBooking } = useBooking();

  const whyInvest = [
    { icon: Shield, text: "Build trust with serious clients" },
    { icon: TrendingUp, text: "Generate consistent inquiries" },
    { icon: Globe, text: "Showcase services professionally" },
    { icon: CalendarCheck, text: "Automate bookings and processes" },
    { icon: MapPin, text: "Expand beyond physical location" },
  ];

  const devPackages = [
    {
      title: "Landing Page",
      subtitle: "Startup Entrance",
      price: "R4,500",
      priceNote: "once-off",
      altPrice: "or R180/month for 36 months",
      features: [
        "1 professional landing page",
        "Mobile responsive design",
        "Contact form integration",
        "Basic SEO setup",
        "Fast loading optimization",
      ],
      cta: "Get Started",
      highlighted: false,
      booking: { service: "Web Development", package: "Landing Page", price: 4500 },
    },
    {
      title: "Business Website",
      subtitle: "Most Popular",
      price: "R12,000",
      priceNote: "once-off",
      altPrice: "or R400/month for 36 months",
      features: [
        "5–10 pages",
        "Full business structure",
        "Contact forms",
        "SEO setup",
        "Google Analytics integration",
      ],
      cta: "Get Started",
      highlighted: true,
      booking: { service: "Web Development", package: "Business Website", price: 12000 },
    },
    {
      title: "Custom / Web App",
      subtitle: "Advanced Solutions",
      price: "R25,000+",
      priceNote: "",
      altPrice: "",
      features: [
        "Booking systems",
        "Client portals",
        "Dashboards",
        "Custom web applications",
      ],
      cta: "Inquire Project",
      highlighted: false,
      booking: { service: "Web Development", package: "Custom / Web App", price: 25000 },
    },
  ];

  const hostingPlans = [
    {
      title: "Starter",
      price: "R99",
      features: ["Secure hosting", "Basic performance", "Limited support"],
      highlighted: false,
      badge: "",
    },
    {
      title: "Business",
      badge: "Recommended",
      price: "R199",
      features: ["Faster hosting", "Daily backups", "WhatsApp support"],
      highlighted: true,
    },
    {
      title: "Premium",
      price: "R299 – R499",
      features: ["Priority performance", "Ongoing support", "Minor updates included"],
      highlighted: false,
      badge: "",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <div className="container mx-auto px-4 relative z-10">
          <HeroSection className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Build a Website That Works for Your Business
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4">
              We design, build, and manage high-performance websites that generate real clients — not just look good.
            </p>
            <p className="text-muted-foreground mb-8">
              From development to hosting and ongoing support, everything is handled in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="red"
                size="lg"
                onClick={() => openBooking({ service: "Web Development", package: "Website Project", price: 4500 })}
              >
                Start Your Project <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outlineBlack" size="lg" asChild>
                <a href="https://wa.me/27659704101" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" /> Talk on WhatsApp
                </a>
              </Button>
            </div>
          </HeroSection>
        </div>
      </section>

      {/* WHY BUSINESSES INVEST */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <FadeInSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Why Businesses Invest in Professional Websites</h2>
          </FadeInSection>
          <StaggerContainer className="max-w-2xl mx-auto space-y-4">
            {whyInvest.map((item, i) => (
              <StaggerItem key={i}>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border">
                  <item.icon className="h-6 w-6 text-primary shrink-0" />
                  <span className="text-lg font-medium">{item.text}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* DEVELOPMENT PACKAGES */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <FadeInSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Development Packages</h2>
          </FadeInSection>
          <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {devPackages.map((pkg, i) => (
              <StaggerItem key={i}>
                <Card className={`relative transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${pkg.highlighted ? "border-primary border-2 shadow-lg" : ""}`}>
                  {pkg.highlighted && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">{pkg.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{pkg.subtitle}</p>
                    <div className="mt-4">
                      <span className="text-3xl font-bold">{pkg.price}</span>
                      {pkg.priceNote && <span className="text-muted-foreground ml-2 text-sm">{pkg.priceNote}</span>}
                    </div>
                    {pkg.altPrice && <p className="text-sm text-muted-foreground mt-1">{pkg.altPrice}</p>}
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {pkg.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-primary mt-1 shrink-0" />
                          <span className="text-sm">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant={pkg.highlighted ? "red" : "outlineRed"}
                      className="w-full"
                      onClick={() => openBooking(pkg.booking)}
                    >
                      {pkg.cta}
                    </Button>
                  </CardFooter>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* HOSTING & ONGOING SUPPORT */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <FadeInSection className="text-center mb-4">
            <h2 className="text-3xl md:text-4xl font-bold">Hosting & Ongoing Support</h2>
          </FadeInSection>
          <FadeInSection className="text-center mb-12 max-w-2xl mx-auto">
            <p className="text-muted-foreground">
              Your website is not just built — it needs to stay fast, secure, and online at all times.
              We handle everything for you.
            </p>
          </FadeInSection>
          <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {hostingPlans.map((plan, i) => (
              <StaggerItem key={i}>
                <Card className={`relative text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${plan.highlighted ? "border-primary border-2 shadow-lg" : ""}`}>
                  {plan.badge && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                      {plan.badge}
                    </Badge>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl">{plan.title}</CardTitle>
                    <div className="mt-4">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground ml-1 text-sm">/ month</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((f, j) => (
                        <li key={j} className="flex items-center justify-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                          <span className="text-sm">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <FadeInSection className="text-center mt-8">
            <p className="text-sm text-muted-foreground italic">
              All websites require hosting to stay online. We manage everything so you don't have to.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* POSITIONING BLOCK */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <FadeInSection className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              We don't just build websites — we manage your entire digital presence.
            </h2>
            <p className="text-lg text-muted-foreground">
              From development to hosting and ongoing support, everything is handled under one system.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <FadeInSection className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Your Website Project</h2>
            <p className="text-muted-foreground mb-8">
              Let's build a website that actually works for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="red"
                size="lg"
                onClick={() => openBooking({ service: "Web Development", package: "Website Project", price: 4500 })}
              >
                Start Your Project <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outlineBlack" size="lg" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
};

export default WebDevelopment;

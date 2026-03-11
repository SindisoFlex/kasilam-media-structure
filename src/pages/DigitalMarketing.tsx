import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Globe, BarChart3, Megaphone, PenTool, Target, CheckCircle, ArrowRight,
  MessageSquare, Search, Send, Share2,
} from "lucide-react";
import { FadeInSection, HeroSection, StaggerContainer, StaggerItem } from "@/components/animations";
import { useBooking } from "@/contexts/BookingContext";

const processSteps = [
  { icon: Search, title: "Discovery & Audit", desc: "We analyze your current digital presence, audience, and competitors to identify opportunities." },
  { icon: Target, title: "Strategy & Roadmap", desc: "A tailored digital plan with clear goals, timelines, and measurable KPIs." },
  { icon: PenTool, title: "Content & Execution", desc: "We create and deploy content, campaigns, and assets across your chosen platforms." },
  { icon: BarChart3, title: "Reporting & Optimization", desc: "Monthly performance reports with data-driven adjustments to maximize your results." },
];

const services = [
  { icon: Share2, title: "Social Media Management", desc: "Grow your audience with strategic content and consistent engagement.", link: "/services/social-media-management" },
  { icon: Megaphone, title: "Paid Advertising", desc: "Target the right audience and drive measurable results with smart campaigns.", link: "/services/paid-advertising" },
  { icon: PenTool, title: "Content Creation", desc: "Professional graphics, copywriting, and video content designed for engagement.", link: "/services/content-creation" },
  { icon: Globe, title: "Website & Web App Design", desc: "Modern websites and web applications built for performance and scalability.", link: "/services/web-app-development" },
  { icon: BarChart3, title: "Analytics & Reporting", desc: "Clear insights and data tracking to guide smarter marketing decisions.", link: "/services/analytics-reporting" },
];

const authorityPoints = ["Strategy-driven marketing", "Creative content production", "Data-driven campaigns", "Full digital ecosystem support"];

const DigitalMarketing = () => {
  const { openBooking } = useBooking();

  const handleBook = () => openBooking({
    serviceName: "Digital Media Solutions",
    packageName: "Digital Strategy",
    mediaType: "none",
    basePrice: 0,
    eventType: "Digital Marketing Consultation",
  });

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-background py-28 md:py-36">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <HeroSection>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <Globe className="h-4 w-4" />
                Digital Media Solutions
              </div>
            </HeroSection>
            <HeroSection delay={0.1}>
              <h1 className="text-4xl font-black leading-tight md:text-5xl lg:text-6xl">
                Digital Strategy That Grows Your <span className="text-primary">Brand Online</span>
              </h1>
            </HeroSection>
            <HeroSection delay={0.2}>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                We build and manage your digital presence with purposeful content, targeted campaigns, and clear reporting — so you see real results.
              </p>
            </HeroSection>
            <HeroSection delay={0.3}>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button onClick={handleBook} size="lg" className="gap-2">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
                <Button asChild size="lg" variant="outline" className="gap-2">
                  <a href="#packages">View Plans</a>
                </Button>
              </div>
            </HeroSection>
          </div>
        </div>
      </section>

      {/* Authority Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <FadeInSection className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="max-w-md">
              <h2 className="text-3xl font-bold md:text-4xl text-white">Why Businesses Work With <span className="text-primary">KMP</span></h2>
              <p className="mt-4 text-muted-foreground">We are more than just a service provider; we are your strategic digital partner.</p>
            </div>
            <div className="grid w-full max-w-xl gap-4 sm:grid-cols-2">
              {authorityPoints.map((point) => (
                <div key={point} className="flex items-center gap-3 rounded-lg border border-primary/10 bg-background/50 p-4">
                  <CheckCircle className="h-5 w-5 shrink-0 text-primary" />
                  <span className="font-medium text-white">{point}</span>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <FadeInSection className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl text-white">Your Digital <span className="text-primary">Growth Partner</span></h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              We don't just post content — we build digital ecosystems that work for your brand. From social media strategy to paid advertising and website management, we coordinate every piece of your online presence.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Our Process */}
      <section className="bg-card py-20">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="text-center text-3xl font-bold md:text-4xl">How We <span className="text-primary">Work</span></h2>
          </FadeInSection>
          <StaggerContainer className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <StaggerItem key={step.title} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="mb-2 block text-sm font-bold text-primary">Step {i + 1}</span>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <FadeInSection className="mb-12 text-center">
            <h2 className="text-3xl font-bold md:text-4xl text-white">Our Digital <span className="text-primary">Services</span></h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Explore our specialized digital solutions designed to scale your brand.</p>
          </FadeInSection>
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <StaggerItem key={s.title}>
                <Card className="group relative overflow-hidden border-border bg-muted transition-all hover:border-primary/50 hover:shadow-2xl">
                  <Link to={s.link} className="absolute inset-0 z-10" />
                  <CardContent className="p-8">
                    <div className="mb-6 inline-flex rounded-full bg-primary/10 p-4 transition-colors group-hover:bg-primary/20">
                      <s.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-white transition-colors group-hover:text-primary">{s.title}</h3>
                    <p className="mt-3 text-muted-foreground">{s.desc}</p>
                    <div className="mt-6 flex items-center gap-2 font-bold text-primary opacity-0 transition-all group-hover:opacity-100">
                      View Service <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-card py-20">
        <div className="container mx-auto px-4 text-center">
          <FadeInSection>
            <h2 className="text-3xl font-bold md:text-4xl">Ready to Take Your Brand <span className="text-primary">Digital?</span></h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Let's build a digital strategy that drives real engagement, growth, and results for your business.
            </p>
            <Button onClick={handleBook} size="lg" className="mt-8 gap-2">
              Start Your Digital Journey <ArrowRight className="h-4 w-4" />
            </Button>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
};

export default DigitalMarketing;

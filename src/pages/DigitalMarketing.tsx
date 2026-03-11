import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Globe,
  BarChart3,
  Megaphone,
  PenTool,
  Target,
  CheckCircle,
  ArrowRight,
  MessageSquare,
  Search,
  Share2,
} from "lucide-react";
import { useBooking } from "@/contexts/BookingContext";
import { FadeInSection, HeroSection, StaggerContainer, StaggerItem } from "@/components/animations";

const processSteps = [
  {
    icon: Search,
    title: "Discovery & Audit",
    desc: "We analyze your current digital presence, audience, and competitors to identify opportunities.",
  },
  {
    icon: Target,
    title: "Strategy & Roadmap",
    desc: "A tailored digital plan with clear goals, timelines, and measurable KPIs.",
  },
  {
    icon: PenTool,
    title: "Content & Execution",
    desc: "We create and deploy content, campaigns, and assets across your chosen platforms.",
  },
  {
    icon: BarChart3,
    title: "Reporting & Optimization",
    desc: "Monthly performance reports with data-driven adjustments to maximize your results.",
  },
];

const services = [
  {
    icon: Share2,
    title: "Social Media Management",
    desc: "Grow your audience with strategic content and consistent engagement.",
    link: "/services/social-media-management"
  },
  {
    icon: Megaphone,
    title: "Paid Advertising",
    desc: "Target the right audience and drive measurable results with smart campaigns.",
    link: "/services/paid-advertising"
  },
  {
    icon: PenTool,
    title: "Content Creation",
    desc: "Professional graphics, copywriting, and video content designed for engagement.",
    link: "/services/content-creation"
  },
  {
    icon: Globe,
    title: "Website & Web App Design",
    desc: "Modern websites and web applications built for performance and scalability.",
    link: "/services/web-app-development"
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    desc: "Clear insights and data tracking to guide smarter marketing decisions.",
    link: "/services/analytics-reporting"
  },
];

const authorityPoints = [
  "Strategy-driven marketing",
  "Creative content production",
  "Data-driven campaigns",
  "Full digital ecosystem support",
];

const DigitalMarketing = () => {
  const { openBooking } = useBooking();
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden section-padding pb-32">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background z-10" />
          <div className="absolute inset-0 mesh-bg opacity-20 dark:opacity-40" />
        </div>
        
        <div className="content-width relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <HeroSection>
              <div className="mb-10 inline-flex items-center gap-3 rounded-full border border-red-600/30 bg-red-600/10 px-6 py-2 text-xs font-black uppercase tracking-[0.3em] text-red-600 animate-pulse">
                <Globe className="h-4 w-4" /> Digital Media Solutions
              </div>
            </HeroSection>
            <HeroSection delay={0.1}>
              <h1 className="text-5xl font-black leading-[0.85] md:text-8xl lg:text-9xl text-foreground tracking-[-0.06em] mb-12">
                Digital Strategy <span className="text-gradient">For Growth</span>
              </h1>
            </HeroSection>
            <HeroSection delay={0.2}>
              <p className="mt-8 text-xl md:text-2xl text-foreground/50 font-bold uppercase tracking-widest leading-relaxed max-w-3xl mx-auto">
                We build and manage your digital presence with purposeful content, targeted campaigns, and clear reporting.
              </p>
            </HeroSection>
            <HeroSection delay={0.3}>
              <div className="flex flex-wrap justify-center gap-6 mt-16">
                <Button
                  onClick={() => openBooking({
                    service: "Digital Marketing",
                    package: "Digital Inquiry",
                    price: 0
                  })}
                  size="lg"
                  className="h-20 px-16 text-xs font-black rounded-full uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95 red-glow cursor-pointer btn-primary"
                >
                  Start Your Journey <ArrowRight className="h-4 w-4 ml-4" />
                </Button>
                <Button asChild className="h-20 px-16 text-xs font-black rounded-full uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95 cursor-pointer btn-secondary">
                  <a href="#packages">View Services</a>
                </Button>
              </div>
            </HeroSection>
          </div>
        </div>
      </section>

      {/* Authority Section */}
      <section className="section-padding bg-alternate border-y border-foreground/5 relative overflow-hidden">
        <div className="content-width">
          <FadeInSection className="flex flex-col items-center justify-between gap-12 lg:flex-row">
            <div className="max-w-xl">
              <h2 className="mb-8 text-gradient">Why Elite Brands Work With KMP</h2>
              <p className="text-xl text-foreground/50 font-medium leading-relaxed">
                We are more than just a service provider; we are your strategic digital partner, ensuring your ecosystem is optimized for conversion.
              </p>
            </div>
            <div className="grid w-full max-w-2xl gap-6 sm:grid-cols-2">
              {authorityPoints.map((point) => (
                <div key={point} className="flex items-center gap-4 p-6 rounded-2xl bg-background border border-foreground/5 group hover:border-red-600/30 transition-colors">
                  <div className="bg-red-600/10 p-2 rounded-lg group-hover:scale-110 transition-transform">
                    <CheckCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <span className="text-foreground font-black uppercase tracking-tight text-sm">{point}</span>
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
            <h2 className="text-3xl font-bold md:text-4xl text-white">
              Your Digital <span className="text-primary">Growth Partner</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              We don't just post content — we build digital ecosystems that work
              for your brand. From social media strategy to paid advertising and
              website management, we coordinate every piece of your online
              presence so it's consistent, measurable, and effective.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Our Process */}
      <section className="section-padding bg-alternate border-y border-foreground/5">
        <div className="content-width">
          <FadeInSection className="max-w-4xl mx-auto text-center mb-32">
            <h2 className="mb-8 text-gradient">Our Strategic Process</h2>
            <p className="text-xl font-bold uppercase tracking-widest text-foreground/50">Engineered for absolute growth and consistency.</p>
          </FadeInSection>
          <StaggerContainer className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <StaggerItem key={step.title} className="text-center group">
                <div className="mx-auto mb-10 flex h-20 w-20 items-center justify-center rounded-[2.5rem] bg-foreground/5 border border-foreground/5 group-hover:border-red-600/30 group-hover:-rotate-12 transition-all duration-700 dark:bg-white/5 dark:border-white/5">
                  <step.icon className="h-8 w-8 text-red-600" />
                </div>
                <div className="mb-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600">Step 0{i + 1}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 uppercase tracking-tighter">{step.title}</h3>
                <p className="text-base text-foreground/40 leading-relaxed font-medium">{step.desc}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Our Services */}
      <section id="packages" className="section-padding bg-background">
        <div className="content-width">
          <FadeInSection className="mb-24 text-center">
            <h2 className="mb-10 text-gradient leading-[0.85] tracking-[-0.06em]">
              Our Digital Ecosystem
            </h2>
            <p className="mx-auto text-xl md:text-2xl text-foreground/50 font-bold uppercase tracking-widest leading-relaxed max-w-3xl">
              Explore specialized solutions designed to scale your brand effectively.
            </p>
          </FadeInSection>

          <div className="mb-12 text-center md:hidden">
            <p className="text-xs font-black uppercase tracking-widest text-red-600 animate-pulse">
              Swipe to view services
            </p>
          </div>
          <div className="mb-12 text-center hidden md:block">
            <p className="text-xs font-black uppercase tracking-widest text-foreground/30">
              Click/Tap on a service card to learn more
            </p>
          </div>

          <StaggerContainer className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <StaggerItem key={s.title}>
                <div className="premium-card group relative overflow-hidden bg-background cursor-pointer hover:-translate-y-2 transition-all duration-500">
                  <Link to={s.link} className="absolute inset-0 z-10" />
                  <div className="p-10">
                    <div className="mb-10 inline-flex rounded-3xl bg-foreground/5 p-6 transition-colors group-hover:bg-red-600 group-hover:text-white">
                      <s.icon className="h-10 w-10 text-red-600 transition-colors group-hover:text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-foreground transition-colors group-hover:text-red-600 uppercase tracking-tighter mb-4">{s.title}</h3>
                    <p className="text-base text-foreground/40 font-medium leading-relaxed uppercase tracking-tight">{s.desc}</p>
                    <div className="mt-10 flex items-center gap-3 font-black text-[10px] uppercase tracking-[0.3em] text-red-600 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-2">
                      View Service <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>



      {/* Final CTA */}
      <section className="section-padding relative overflow-hidden bg-background text-center border-t border-foreground/5">
        <div className="absolute inset-0 mesh-bg opacity-10 dark:opacity-30" />
        <div className="content-width relative z-10">
          <HeroSection>
            <h2 className="text-5xl md:text-8xl lg:text-9xl font-black mb-12 text-gradient leading-[0.85] tracking-[-0.06em]">
              Ready to Take Your<br />Brand Digital?
            </h2>
          </HeroSection>
          <FadeInSection delay={0.2}>
            <p className="mx-auto max-w-4xl text-xl md:text-2xl text-foreground/50 mb-20 font-bold uppercase tracking-[0.2em] leading-relaxed">
              Let's build a digital strategy that drives real engagement, growth, and results for your business.
            </p>
          </FadeInSection>
          <FadeInSection delay={0.3}>
            <div className="flex flex-wrap justify-center gap-8">
              <Button
                onClick={() => openBooking({
                  service: "Digital Marketing",
                  package: "Strategic Consultation",
                  price: 0
                })}
                size="lg"
                className="h-20 px-16 text-xs font-black rounded-full uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95 red-glow cursor-pointer btn-primary"
              >
                Start Your Digital Journey <ArrowRight className="h-4 w-4 ml-4" />
              </Button>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
};

export default DigitalMarketing;

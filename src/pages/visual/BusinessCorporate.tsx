import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Video, Camera, TrendingUp, Check, Zap, Award, Users, BarChart3 } from "lucide-react";
import { FadeInSection, HeroSection, StaggerContainer, StaggerItem } from "@/components/animations";
import { useBooking } from "@/contexts/BookingContext";

const BusinessCorporate = () => {
  const { openBooking } = useBooking();

  const services = [
    { id: "promotional-video", title: "Promotional Video Production", description: "Compelling branded videos for marketing and campaigns", icon: Video, details: ["Scriptwriting and storyboarding", "Professional cinematography", "On-location and studio filming"], pricing: "Custom Quote", price: 5000 },
    { id: "product-photography", title: "Product Photography", description: "Professional product shots for e-commerce and marketing", icon: Camera, details: ["Studio lighting setup", "360° product views", "Lifestyle shots"], pricing: "From R 2,000 per product", price: 2000 },
    { id: "brand-story", title: "Brand Story Videos", description: "Narrative-driven content that tells your company's story", icon: TrendingUp, details: ["Brand messaging consultation", "Interview filming", "Documentary-style production"], pricing: "Custom Quote", price: 8000 },
    { id: "corporate-events", title: "Corporate Event Coverage", description: "Professional documentation of conferences, launches, and celebrations", icon: Users, details: ["Multi-camera setup", "Live event coverage", "Post-event highlights"], pricing: "From R 5,000/day", price: 5000 },
    { id: "marketing-content", title: "Marketing Content Creation", description: "Diverse visual content for social media, ads, and campaigns", icon: BarChart3, details: ["Strategic content planning", "Multi-format production", "Platform optimization"], pricing: "Monthly Packages", price: 8000 },
  ];

  const packages = [
    { name: "Starter Package", desc: "Perfect for small businesses", price: 8000, period: "/month", features: ["20 content pieces monthly", "Video + Photography mix", "Social media optimization", "Basic consultation"] },
    { name: "Professional Package", desc: "For growing businesses", price: 15000, period: "/month", features: ["35 content pieces monthly", "Custom content strategy", "Advanced editing", "Weekly strategy calls", "Performance reporting"] },
    { name: "Enterprise Package", desc: "Full marketing production", price: 25000, period: "Quote", features: ["Unlimited content creation", "Dedicated team", "Strategic planning", "Campaign management", "Priority delivery", "Quarterly reviews"] },
  ];

  const processSteps = [
    { step: 1, title: "Consultation", desc: "We discuss your business goals, target audience, and creative vision" },
    { step: 2, title: "Strategy", desc: "Development of content strategy aligned with your marketing objectives" },
    { step: 3, title: "Production", desc: "Professional filming, photography, and creative direction" },
    { step: 4, title: "Delivery", desc: "Edited content optimized for all platforms and ready to publish" },
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Reliable Delivery",
      desc: "A professional production workflow with clear timelines and dependable results for business clients.",
    },
    {
      icon: Award,
      title: "Brand-First Storytelling",
      desc: "We translate your brand messaging into premium visuals trusted by entrepreneurs, startups, and local companies.",
    },
    {
      icon: TrendingUp,
      title: "Marketing-Focused Content",
      desc: "Content crafted for campaigns, growth, and performance across modern marketing platforms.",
    },
  ];

  return (
    <div className="bg-background text-foreground min-h-screen">
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2000&auto=format&fit=crop"
            alt="African business professionals in a modern office discussing strategy and shaking hands"
            className="h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-background" />
          <div className="absolute inset-0 bg-red-900/10 mix-blend-overlay" />
        </div>
        <div className="content-width relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <HeroSection className="mb-8 flex justify-center">
              <div className="px-6 py-2 rounded-full bg-foreground/5 border border-foreground/10 red-glow backdrop-blur-xl dark:bg-white/5 dark:border-white/10">
                <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.4em]">Business & Corporate</span>
              </div>
            </HeroSection>
            <HeroSection delay={0.1}>
              <h1 className="text-5xl md:text-6xl font-black mb-6 text-gradient">Business & Corporate Visual Production</h1>
            </HeroSection>
            <HeroSection delay={0.2}>
              <p className="text-xl text-foreground/80 font-medium leading-relaxed dark:text-white/80">
                Professional promotional videos, product photography, and corporate event coverage for businesses in Port Elizabeth, Eastern Cape.
              </p>
              <p className="mt-4 text-sm md:text-base text-foreground/60 font-semibold uppercase tracking-[0.2em] dark:text-white/60">
                Helping South African businesses grow through powerful visual storytelling and strategic content creation.
              </p>
            </HeroSection>
            <HeroSection delay={0.3} className="mt-10">
              <p className="text-sm md:text-base text-foreground/70 font-medium leading-relaxed dark:text-white/70">
                Kasilam Media Productions provides professional corporate video production, product photography, and marketing content creation for businesses in Port Elizabeth (Gqeberha), the Eastern Cape, and across South Africa. We support corporate video production Port Elizabeth teams, business video production Gqeberha campaigns, product photography Eastern Cape launches, and marketing video production South Africa strategies with content built for modern platforms.
              </p>
            </HeroSection>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="content-width">
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service) => (
              <StaggerItem key={service.id}>
                <div className="premium-card group h-full border-foreground/10 dark:border-white/5">
                  <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-xl bg-foreground/5 border border-foreground/5 group-hover:border-red-600/30 group-hover:scale-110 transition-all dark:bg-white/5 dark:border-white/5">
                    <service.icon className="h-7 w-7 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3 uppercase tracking-tight dark:text-white">{service.title}</h3>
                  <p className="text-sm text-foreground/60 mb-6 font-medium dark:text-white/60">{service.description}</p>
                  <div className="space-y-3 mb-8 flex-grow pb-8 border-b border-foreground/10 dark:border-white/10">
                    {service.details.map((detail) => (
                      <div key={detail} className="flex items-start gap-2">
                        <Check className="h-3.5 w-3.5 text-red-600 shrink-0 mt-1" />
                        <span className="text-xs text-foreground/70 font-medium dark:text-white/70">{detail}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-2xl font-black text-red-600 mb-6">{service.pricing}</div>
                  <Button
                    onClick={() => openBooking({
                      service: "Business & Corporate",
                      package: service.title,
                      price: service.price,
                    })}
                    variant="red"
                    className="w-full h-12 font-black rounded-lg uppercase tracking-widest text-[10px]"
                  >
                    Request Quote <ArrowRight className="h-3 w-3 ml-2" />
                  </Button>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="section-padding bg-card/40 border-y border-foreground/5 dark:bg-zinc-950 dark:border-white/5">
        <div className="content-width">
          <FadeInSection className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-4xl font-black mb-6 text-gradient">Monthly Content Packages</h2>
            <p className="text-lg text-foreground/60 font-medium dark:text-white/60">Consistent, professional visual content to fuel your marketing engine</p>
          </FadeInSection>
          <StaggerContainer className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg) => (
              <StaggerItem key={pkg.name}>
                <div className="premium-card border-foreground/10 hover:border-red-600/50 h-full flex flex-col dark:border-white/5">
                  <h3 className="text-2xl font-black text-foreground mb-2 uppercase tracking-tighter dark:text-white">{pkg.name}</h3>
                  <p className="text-sm text-foreground/60 mb-6 font-medium dark:text-white/60">{pkg.desc}</p>
                  <div className="mb-8 pb-8 border-b border-foreground/10 dark:border-white/10">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-red-600">R {pkg.price.toLocaleString()}</span>
                      <span className="text-sm text-foreground/50 font-medium dark:text-white/50">{pkg.period}</span>
                    </div>
                  </div>
                  <ul className="space-y-4 mb-12 flex-grow">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground/80 font-medium dark:text-white/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => openBooking({
                      service: "Business & Corporate",
                      package: pkg.name,
                      price: pkg.price,
                    })}
                    variant="black"
                    className="w-full h-12 font-black rounded-lg uppercase tracking-widest text-[10px]"
                  >
                    Get Started
                  </Button>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="section-padding">
        <div className="content-width">
          <FadeInSection>
            <h2 className="text-center mb-20 text-4xl font-black text-gradient">Our Production Process</h2>
          </FadeInSection>
          <StaggerContainer className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {processSteps.map((p) => (
              <StaggerItem key={p.step} className="text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-foreground/5 border border-foreground/10 mx-auto dark:bg-white/5 dark:border-white/10">
                  <span className="text-2xl font-black text-red-600">{p.step}</span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3 uppercase tracking-tight dark:text-white">{p.title}</h3>
                <p className="text-sm text-foreground/60 font-medium dark:text-white/60">{p.desc}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="section-padding bg-card/40 border-y border-foreground/5 dark:bg-zinc-950 dark:border-white/5">
        <div className="content-width">
          <FadeInSection>
            <h2 className="text-center mb-20 text-4xl font-black text-gradient">Why Partner With Us?</h2>
          </FadeInSection>
          <StaggerContainer className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            {benefits.map((benefit) => (
              <StaggerItem key={benefit.title}>
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-foreground/5 border border-foreground/5 mx-auto dark:bg-white/5 dark:border-white/5">
                  <benefit.icon className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3 text-center uppercase tracking-tight dark:text-white">{benefit.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed font-medium text-center dark:text-white/60">{benefit.desc}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="section-padding">
        <div className="content-width text-center max-w-4xl mx-auto">
          <FadeInSection>
            <h2 className="text-4xl md:text-5xl font-black mb-8 text-gradient">Ready to Elevate Your Brand?</h2>
            <p className="text-lg text-foreground/60 mb-12 font-medium dark:text-white/60">Let&apos;s discuss your project and create a custom solution that drives results.</p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button asChild variant="red" className="h-14 px-12 font-black rounded-full uppercase tracking-widest text-[10px]">
                <Link to="/contact">Get Your Quote</Link>
              </Button>
              <Button asChild variant="black" className="h-14 px-12 font-black rounded-full uppercase tracking-widest text-[10px]">
                <Link to="/services/visual-production">Back to Visual Production</Link>
              </Button>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
};

export default BusinessCorporate;

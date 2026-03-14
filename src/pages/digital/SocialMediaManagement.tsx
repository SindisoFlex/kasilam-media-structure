import { Button } from "@/components/ui/button";
import { Share2, CheckCircle, ArrowRight, Zap, Facebook, Instagram, Linkedin, BarChart } from "lucide-react";
import { useBooking } from "@/contexts/BookingContext";
import { FadeInSection, HeroSection, StaggerContainer, StaggerItem } from "@/components/animations";

const SocialMediaManagement = () => {
  const { openBooking } = useBooking();
  const whatWeDo = ["Content strategy and planning", "Graphic design and captions", "Content scheduling and publishing", "Audience engagement monitoring", "Performance analytics and reporting"];

  const TikTokIcon = ({ className }: { className?: string }) => (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M16.5 3.5c-1.4 0-2.6-.5-3.6-1.3v10.2c0 2-1.5 3.6-3.4 3.6-1.8 0-3.3-1.5-3.3-3.3 0-1.9 1.5-3.4 3.4-3.4.3 0 .6 0 .9.1V6.5c-.3 0-.6-.1-.9-.1C5.1 6.4 3 8.6 3 11.2c0 2.9 2.4 5.3 5.3 5.3 3 0 5.4-2.4 5.4-5.4V8.7c1 .7 2.2 1.1 3.5 1.1V6.3c-.4.1-.7.2-1.2.2z" />
    </svg>
  );

  const platforms = ["Facebook", "Instagram", "LinkedIn", "TikTok", "YouTube Shorts"];

  const facebookTiers = [
    {
      name: "Facebook Starter",
      price: "R1200",
      period: "per month",
      description: "Perfect for small businesses that want to stay active and visible on Facebook.",
      features: ["6 posts per month", "Basic graphic design", "Caption writing", "Post scheduling", "Monthly activity check"],
    },
    {
      name: "Facebook Growth",
      price: "R1300",
      period: "per month",
      description: "Ideal for businesses that want stronger consistency and engagement.",
      features: ["8 posts per month", "Custom graphics", "Caption writing", "Post scheduling", "Page activity monitoring", "Monthly performance report"],
    },
    {
      name: "Facebook Pro",
      price: "R1600",
      period: "per month",
      description: "For businesses that want a stronger and more active Facebook presence.",
      features: ["12 posts per month", "Custom branded graphics", "Caption writing and hashtags", "Content scheduling", "Page engagement monitoring", "Monthly performance insights"],
    },
  ];

  const processSteps = [
    { 
      step: "1", 
      title: "Brand & Audience Review", 
      desc: "Understanding your business, audience, and brand voice.",
      icon: <Facebook className="h-4 w-4 text-red-600/60" />
    },
    { 
      step: "2", 
      title: "Content Planning", 
      desc: "Building a structured content calendar aligned with your goals.",
      icon: <Instagram className="h-4 w-4 text-red-600/60" />
    },
    { 
      step: "3", 
      title: "Content Creation", 
      desc: "Designing visuals, captions, and posts.",
      icon: <Linkedin className="h-4 w-4 text-red-600/60" />
    },
    { 
      step: "4", 
      title: "Publishing & Engagement", 
      desc: "Scheduling posts and monitoring audience interaction.",
      icon: <TikTokIcon className="h-4 w-4 text-red-600/60" />
    },
    { 
      step: "5", 
      title: "Reporting & Optimization", 
      desc: "Tracking performance and improving results each month.",
      icon: <BarChart className="h-4 w-4 text-red-600/60" />
    },
  ];

  const whoThisIsFor = [
    "Small businesses building online visibility",
    "Personal brands and professionals",
    "Growing startups and entrepreneurs",
    "Artists and creators",
    "Local businesses wanting consistent online presence",
  ];

  const pricing = [
    { name: "Starter Plan", price: "R2000", period: "per month", features: ["Social media management (2 platforms)", "8 posts per month", "Basic graphic design", "Monthly performance report"], highlighted: false },
    { name: "Growth Plan", price: "R4200", period: "per month", features: ["Social media management (3 platforms)", "16 posts per month", "Content calendar", "Engagement monitoring", "Bi-weekly reports"], highlighted: true },
    { name: "Premium Plan", price: "R7000", period: "per month", features: ["Unlimited platforms", "20+ posts", "Advanced strategy", "Paid ad support", "Weekly reporting"], highlighted: false },
  ];

  return (
    <div className="pt-20">
      <section className="relative overflow-hidden min-h-[90vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background z-10" />
          <img 
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=2400" 
            alt="Futuristic social media management workspace with analytics dashboards"
            className="h-full w-full object-cover opacity-45 grayscale"
          />
          <div className="absolute inset-0 mesh-bg opacity-30 z-5" />
        </div>
        
        <div className="content-width relative z-20">
          <div className="mx-auto max-w-5xl text-center">
            <HeroSection>
              <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-red-600/30 bg-red-600/10 px-6 py-2 text-xs font-black uppercase tracking-[0.3em] text-red-600">
                <Share2 className="h-4 w-4" /> Elite Brand Visibility
              </div>
            </HeroSection>
            <HeroSection delay={0.1}>
              <h1 className="text-5xl font-black leading-[0.85] md:text-8xl lg:text-9xl text-foreground tracking-[-0.06em] mb-10">
                Social Media <span className="text-gradient">Management</span>
              </h1>
            </HeroSection>
            <HeroSection delay={0.2}>
              <p className="text-xl md:text-3xl text-foreground font-black uppercase tracking-tight leading-tight max-w-4xl mx-auto mb-6">
                Professional social media strategy and management for businesses in Port Elizabeth, Eastern Cape, and across South Africa.
              </p>
              <p className="text-lg md:text-xl text-foreground/50 font-medium tracking-wide leading-relaxed max-w-3xl mx-auto mb-12">
                Helping brands grow visibility, engagement, and customer trust through structured content and strategic platform management.
              </p>
            </HeroSection>
            <HeroSection delay={0.3}>
              <div className="flex flex-wrap justify-center gap-6">
                <Button
                  onClick={() => openBooking({
                    service: "Social Media Management",
                    package: "General Inquiry",
                    price: 0
                  })}
                  variant="red"
                  size="lg"
                  className="h-20 px-16 text-xs font-black rounded-full uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95 shadow-xl shadow-red-600/20"
                >
                  Start Your Growth <ArrowRight className="h-4 w-4 ml-4" />
                </Button>
              </div>
            </HeroSection>
          </div>
        </div>
      </section>

      <section className="section-padding bg-alternate border-y border-foreground/5 relative overflow-hidden">
        <div className="content-width">
          <FadeInSection className="max-w-4xl mx-auto text-center">
            <h2 className="mb-12 text-gradient">The Performance Gap</h2>
            <div className="premium-card p-12 text-center group bg-background/50 border-foreground/10 hover:border-red-600/50">
              <div className="flex justify-center mb-10">
                <div className="flex h-20 w-20 items-center justify-center rounded-[2rem] bg-red-600/10 text-red-600 group-hover:rotate-12 transition-transform duration-500"><Zap className="h-10 w-10" /></div>
              </div>
              <p className="text-2xl text-foreground font-medium leading-relaxed italic">
                "Many businesses struggle with inconsistent posting and stagnant engagement. Without a structured content strategy, social media becomes a burden rather than a growth engine."
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="content-width">
          <FadeInSection className="max-w-4xl mx-auto text-center mb-24">
            <h2 className="mb-8 text-gradient">Comprehensive Solutions</h2>
            <p className="text-xl font-bold uppercase tracking-widest text-foreground/50">
              End-to-end management for total brand control with social media management Port Elizabeth expertise.
            </p>
          </FadeInSection>
          <StaggerContainer className="mx-auto max-w-3xl grid gap-4">
            {whatWeDo.map((item) => (
              <StaggerItem key={item} className="flex items-center gap-6 p-6 rounded-2xl bg-alternate border border-foreground/5 group hover:border-red-600/30 transition-colors">
                <div className="bg-red-600/10 p-3 rounded-xl group-hover:scale-110 transition-transform">
                  <CheckCircle className="h-6 w-6 text-red-600 shrink-0" />
                </div>
                <span className="text-foreground text-xl font-bold tracking-tight">{item}</span>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="content-width">
          <FadeInSection className="max-w-4xl mx-auto text-center mb-24">
            <h2 className="mb-8 text-gradient uppercase tracking-tighter">Facebook Page Management South Africa</h2>
            <p className="text-xl font-bold uppercase tracking-widest text-foreground/50">Dedicated support for the world's largest platform.</p>
          </FadeInSection>
          
          <div className="mb-12 text-center md:hidden">
            <p className="text-xs font-black uppercase tracking-widest text-red-600 animate-pulse">
              Swipe to view packages
            </p>
          </div>
          <div className="mb-12 text-center hidden md:block">
            <p className="text-xs font-black uppercase tracking-widest text-foreground/30">
              Click/Tap on a package card to start booking
            </p>
          </div>

          <StaggerContainer className="grid gap-8 md:grid-cols-3">
            {facebookTiers.map((tier) => (
              <StaggerItem key={tier.name}>
                <div 
                  onClick={() => openBooking({
                    service: "Social Media Management",
                    package: tier.name,
                    price: parseInt(tier.price.replace(/[^\d]/g, "")) || 0
                  })}
                  className="premium-card p-10 flex flex-col items-center text-center cursor-pointer group hover:-translate-y-2 border-foreground/5 hover:border-red-600/30"
                >
                  <h3 className="text-2xl font-black text-foreground mb-6 uppercase tracking-tighter">{tier.name}</h3>
                  <div className="mb-8 flex flex-col items-center p-6 bg-foreground/5 rounded-3xl w-full group-hover:bg-red-600/5 transition-colors">
                    <span className="text-4xl font-black text-red-600">{tier.price}</span>
                    <span className="text-xs font-black text-foreground/40 mt-1 uppercase tracking-widest">{tier.period}</span>
                  </div>
                  <p className="mb-8 text-sm text-foreground/50 font-medium leading-relaxed uppercase tracking-tight">
                    {tier.description}
                  </p>
                  <ul className="mb-10 space-y-4 text-left w-full border-t border-foreground/5 pt-8">
                    {tier.features.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-xs font-bold text-foreground/70 uppercase tracking-tight">
                        <CheckCircle className="h-4 w-4 shrink-0 text-red-600" /> {item}
                      </li>
                    ))}
                  </ul>
                  <Button variant="black" className="mt-auto w-full h-14 font-black uppercase tracking-[0.2em] group-hover:bg-red-600 transition-colors">
                    Get Started
                  </Button>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="section-padding bg-alternate border-y border-foreground/5 relative">
        <div className="content-width">
          <FadeInSection className="max-w-4xl mx-auto text-center">
            <h2 className="mb-12 text-gradient">Platforms We Manage</h2>
          </FadeInSection>
          <StaggerContainer className="mt-12 flex flex-wrap justify-center gap-6">
            {platforms.map((platform) => (
              <StaggerItem key={platform}>
                <div className="rounded-full border border-foreground/10 bg-background px-10 py-4 text-sm font-black uppercase tracking-[0.3em] text-foreground hover:border-red-600 group transition-all cursor-default">
                  <span className="group-hover:text-red-600 transition-colors">{platform}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <FadeInSection delay={0.1}>
            <p className="mt-16 text-center text-lg text-foreground/40 font-medium uppercase tracking-widest max-w-2xl mx-auto">
              We build professional visibility where your audience already spends their time.
            </p>
          </FadeInSection>
        </div>
      </section>

      <section className="section-padding bg-background border-b border-foreground/5">
        <div className="content-width">
          <FadeInSection className="max-w-4xl mx-auto text-center mb-32">
            <h2 className="mb-8 text-gradient">Our Strategic Process</h2>
            <p className="text-xl font-bold uppercase tracking-widest text-foreground/50">Engineered for absolute growth and consistency.</p>
          </FadeInSection>
          <StaggerContainer className="grid gap-12 md:grid-cols-5">
            {processSteps.map((step) => (
              <StaggerItem key={step.step} className="relative text-center group">
                <div className="mb-4 text-4xl font-black text-foreground/5 group-hover:text-red-600/10 transition-colors">{step.step}</div>
                <h3 className="text-xl font-black text-foreground mb-4 uppercase tracking-tighter flex items-center justify-center gap-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-foreground/5">
                    {step.icon}
                  </span>
                  <span>{step.title}</span>
                </h3>
                <p className="text-sm font-medium text-foreground/40 leading-relaxed uppercase tracking-tight">{step.desc}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="section-padding bg-alternate">
        <div className="content-width text-center">
          <FadeInSection className="max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-foreground uppercase tracking-tight mb-6">
              Who This Service Is <span className="text-red-600">For</span>
            </h2>
            <p className="text-lg text-foreground/50 font-medium uppercase tracking-widest">
              Our social media marketing services Port Elizabeth are designed for growth with a social media manager Eastern Cape focus.
            </p>
          </FadeInSection>
          <StaggerContainer className="flex flex-wrap justify-center gap-6">
            {whoThisIsFor.map((item) => (
              <StaggerItem key={item}>
                <div className="rounded-2xl border border-foreground/10 bg-background px-8 py-6 text-sm font-black uppercase tracking-[0.2em] text-foreground hover:border-red-600 transition-all shadow-sm">
                  {item}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="section-padding bg-background relative overflow-hidden">
        <div className="content-width">
          <FadeInSection className="max-w-5xl mx-auto text-center mb-24">
            <h2 className="mb-8 text-gradient">Elite Scaling Packages</h2>
            <p className="text-xl font-bold uppercase tracking-widest text-foreground/50">Multi-platform management for maximum impact.</p>
          </FadeInSection>

          <StaggerContainer className="grid gap-10 md:grid-cols-3">
            {pricing.map((tier) => (
              <StaggerItem key={tier.name}>
                <div
                  onClick={() => openBooking({
                    service: "Social Media Management",
                    package: tier.name,
                    price: parseInt(tier.price.replace(/[^\d]/g, "")) || 0
                  })}
                  className={`premium-card p-12 flex flex-col items-center text-center cursor-pointer group hover:-translate-y-2 relative transition-all duration-500 ${
                    tier.highlighted ? "border-red-600 border-2" : "border-foreground/5"
                  }`}
                >
                  {tier.highlighted && (
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                      <span className="bg-red-600 text-white px-8 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.4em] shadow-xl">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <h3 className="text-3xl font-black text-foreground mb-8 uppercase tracking-tighter">{tier.name}</h3>
                  <div className={`mb-10 flex flex-col items-center p-8 rounded-[2.5rem] w-full transition-colors ${
                    tier.highlighted ? "bg-red-600/10" : "bg-foreground/5 group-hover:bg-red-600/5"
                  }`}>
                    <span className="text-5xl font-black text-red-600">{tier.price}</span>
                    <span className="text-xs font-black text-foreground/40 mt-1 uppercase tracking-widest">{tier.period}</span>
                  </div>
                  <ul className="mb-12 space-y-5 text-left w-full border-t border-foreground/5 pt-10">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-center gap-4 text-xs font-black text-foreground/80 uppercase tracking-tight">
                        <CheckCircle className="h-5 w-5 shrink-0 text-red-600" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant={tier.highlighted ? "red" : "black"}
                    className={`mt-auto w-full h-16 transition-all font-black uppercase tracking-[0.3em] ${
                      tier.highlighted ? "red-glow" : "group-hover:bg-red-600"
                    }`}
                  >
                    Get Started
                  </Button>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="section-padding bg-alternate border-y border-foreground/5">
        <div className="content-width">
          <FadeInSection className="text-center mb-16">
            <h2 className="text-3xl font-black md:text-5xl text-foreground uppercase tracking-tight mb-6">
              What Makes Our <span className="text-red-600">Approach Different</span>
            </h2>
            <p className="text-xl font-bold uppercase tracking-widest text-foreground/30">Social Media Manager Eastern Cape Expertise.</p>
          </FadeInSection>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeInSection delay={0.1}>
              <div className="space-y-6">
                <p className="text-xl text-foreground/70 leading-relaxed font-medium">
                  Many businesses post on social media without a clear strategy. At KMP, our social media marketing Gqeberha approach is built for conversion.
                </p>
                <p className="text-xl text-foreground/70 leading-relaxed font-medium">
                  Our approach combines creative content, structured planning, and performance insights to ensure your social media presence supports real business growth.
                </p>
              </div>
            </FadeInSection>
            <StaggerContainer className="grid gap-4">
              {[
                "consistent professional content",
                "strategic audience engagement",
                "measurable brand visibility",
              ].map((item) => (
                <StaggerItem key={item} className="flex items-center gap-6 p-6 rounded-2xl bg-background border border-foreground/5 shadow-sm">
                  <div className="bg-red-600/10 p-2 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-red-600 shrink-0" />
                  </div>
                  <span className="text-lg font-black text-foreground uppercase tracking-wider">{item}</span>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      <section className="section-padding relative overflow-hidden bg-background text-center">
        <div className="absolute inset-0 mesh-bg opacity-10 dark:opacity-30" />
        <div className="content-width relative z-10">
          <HeroSection>
            <h2 className="text-5xl md:text-8xl lg:text-9xl font-black mb-12 text-gradient leading-[0.85] tracking-[-0.06em]">
              Ready to Build<br />Your Presence?
            </h2>
          </HeroSection>
          <FadeInSection delay={0.2}>
            <p className="mx-auto max-w-4xl text-xl md:text-2xl text-foreground/50 mb-12 font-bold uppercase tracking-[0.2em] leading-relaxed">
              Let&apos;s turn your social media into a powerful tool for visibility, engagement, and brand growth.
            </p>
            <p className="mb-16 text-xs font-black uppercase tracking-[0.4em] text-red-600">
              Elite social media management Port Elizabeth.
            </p>
          </FadeInSection>
          <FadeInSection delay={0.3}>
            <div className="flex flex-wrap justify-center gap-8">
              <Button
                onClick={() => openBooking({
                  service: "Social Media Management",
                  package: "General Inquiry",
                  price: 0
                })}
                variant="red"
                size="lg"
                className="h-20 px-16 text-xs font-black rounded-full uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95 red-glow cursor-pointer"
              >
                Launch Your Strategy <ArrowRight className="h-4 w-4 ml-4" />
              </Button>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
};

export default SocialMediaManagement;

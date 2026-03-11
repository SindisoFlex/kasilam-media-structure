import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Megaphone, CheckCircle, ArrowRight, Target, Search, Zap, BarChart, MousePointer2, PieChart } from "lucide-react";
import { FadeInSection, HeroSection, StaggerContainer, StaggerItem, StaggerScaleItem } from "@/components/animations";
import { useBooking } from "@/contexts/BookingContext";

const PaidAdvertising = () => {
  const { openBooking } = useBooking();
  const problems = ["Wasting budget on the wrong audience", "Low click-through rates (CTR)", "Ads not converting into customers", "Difficulty tracking ROI"];
  const services = [
    { icon: Target, title: "Audience Targeting", desc: "Finding the people most likely to buy from your business." },
    { icon: Megaphone, title: "Campaign Management", desc: "Professional setup, monitoring, and optimization of advertising campaigns." },
    { icon: MousePointer2, title: "Ad Creative", desc: "High-converting visuals and persuasive ad copy." },
    { icon: Search, title: "Keyword Research", desc: "Identifying high-value search terms to compete on Google." },
    { icon: BarChart, title: "A/B Testing", desc: "Testing multiple variations to identify the best-performing ads." },
    { icon: PieChart, title: "Detailed Reporting", desc: "Clear insights into campaign performance and cost per acquisition." },
  ];
  const process = [
    { step: "1", title: "Audience & Market Research", desc: "Identifying your ideal customers and their behaviors." },
    { step: "2", title: "Ad Strategy & Design", desc: "Creating the campaign structure and creative assets." },
    { step: "3", title: "Launch & Monitoring", desc: "Launching campaigns and monitoring performance." },
    { step: "4", title: "Scale & Optimize", desc: "Improving campaigns to reduce cost per acquisition and increase return." },
  ];
  const pricing = [
    {
      name: "Starter Ads",
      price: "R1500",
      period: "/ month + ad spend",
      features: [
        "1 advertising platform (Meta or Google)",
        "Campaign setup",
        "Basic ad creative",
        "Audience targeting",
        "Monthly performance report",
      ],
      highlighted: false,
    },
    {
      name: "Multi-Channel",
      price: "R3500",
      period: "/ month + ad spend",
      features: [
        "2 advertising platforms",
        "A/B testing campaigns",
        "Retargeting ads",
        "Weekly campaign optimization",
        "Bi-weekly reports",
      ],
      highlighted: true,
    },
    {
      name: "Scale Plan",
      price: "R6000+",
      period: "/ month + ad spend",
      features: [
        "Unlimited platforms",
        "Advanced conversion tracking",
        "Creative production support",
        "Dedicated campaign management",
        "Weekly reporting",
      ],
      highlighted: false,
    },
  ];
  const targetAudience = [
    "E-commerce stores needing more sales",
    "Local businesses wanting leads",
    "Service providers booking appointments",
    "Events looking for attendees",
    "Apps seeking more downloads",
  ];

  return (
    <div className="pt-20">
      <section className="relative overflow-hidden section-padding pb-32">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background z-10" />
          <div className="absolute inset-0 mesh-bg opacity-20 dark:opacity-40" />
        </div>
        
        <div className="content-width relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <HeroSection>
              <div className="mb-10 inline-flex items-center gap-3 rounded-full border border-red-600/30 bg-red-600/10 px-6 py-2 text-xs font-black uppercase tracking-[0.3em] text-red-600 animate-pulse">
                <Megaphone className="h-4 w-4" /> Paid Advertising
              </div>
            </HeroSection>
            <HeroSection delay={0.1}>
              <h1 className="text-5xl font-black leading-[0.85] md:text-8xl lg:text-9xl text-foreground tracking-[-0.06em] mb-12 uppercase">
                Turn Clicks <span className="text-gradient">Into Customers</span>
              </h1>
            </HeroSection>
            <HeroSection delay={0.2}>
              <p className="mt-8 text-xl md:text-2xl text-foreground/50 font-bold uppercase tracking-widest leading-relaxed max-w-3xl mx-auto">
                Strategic performance advertising designed to generate leads, sales, and measurable growth.
              </p>
            </HeroSection>
            <HeroSection delay={0.3}>
              <div className="flex flex-wrap justify-center gap-6 mt-16">
                <Button
                  onClick={() => openBooking({
                    service: "Paid Advertising",
                    package: "General Inquiry",
                    price: 0
                  })}
                  size="lg"
                  className="h-20 px-16 text-xs font-black rounded-full uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95 red-glow cursor-pointer btn-primary"
                >
                  Start Your Campaign <ArrowRight className="h-4 w-4 ml-4" />
                </Button>
              </div>
            </HeroSection>
          </div>
        </div>
      </section>

      <section className="section-padding bg-alternate border-y border-foreground/5">
        <div className="content-width">
          <FadeInSection className="max-w-4xl mx-auto text-center mb-24">
            <h2 className="mb-8 text-gradient">The Common Hurdles</h2>
            <p className="text-xl font-bold uppercase tracking-widest text-foreground/50">Most businesses waste 40% of their ad spend on the wrong targets.</p>
          </FadeInSection>
          <StaggerContainer className="grid gap-8 sm:grid-cols-2">
            {problems.map((p) => (
              <StaggerItem key={p}>
                <div className="flex items-center gap-6 p-8 rounded-2xl bg-background border border-foreground/5 group hover:border-red-600/30 transition-all">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-600/10 text-red-600 group-hover:scale-110 transition-transform">
                    <Zap className="h-6 w-6" />
                  </div>
                  <p className="text-base font-black uppercase tracking-tight text-foreground/80">{p}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <FadeInSection delay={0.2} className="mt-20 text-center">
            <p className="text-lg font-black text-red-600 uppercase tracking-[0.3em]">
              We turn ad spend into a predictable growth engine.
            </p>
          </FadeInSection>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="content-width">
          <FadeInSection className="max-w-4xl mx-auto text-center mb-24">
            <h2 className="mb-8 text-gradient">Performance Services</h2>
          </FadeInSection>
          <StaggerContainer className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <StaggerItem key={s.title} className="text-center group">
                <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-foreground/5 border border-foreground/5 group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
                  <s.icon className="h-8 w-8 text-red-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-black text-foreground mb-4 uppercase tracking-tighter">{s.title}</h3>
                <p className="text-sm text-foreground/50 font-medium uppercase tracking-tight leading-relaxed">{s.desc}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="bg-card py-20">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="text-center text-3xl font-bold md:text-4xl text-white mb-8">
              Platforms We <span className="text-primary">Advertise On</span>
            </h2>
          </FadeInSection>
          <StaggerContainer className="mt-6 flex flex-wrap justify-center gap-4">
            {[
              "Facebook & Instagram Ads",
              "Google Search Ads",
              "Google Display Ads",
              "YouTube Ads",
              "Retargeting Campaigns",
            ].map((platform) => (
              <StaggerItem key={platform}>
                <div className="rounded-full border border-primary/20 bg-primary/5 px-6 py-2 text-sm font-medium text-white">
                  {platform}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="bg-card py-20">
        <div className="container mx-auto px-4">
          <FadeInSection><h2 className="text-center text-3xl font-bold md:text-4xl text-white mb-16">Our <span className="text-primary">Process</span></h2></FadeInSection>
          <StaggerContainer className="grid gap-8 md:grid-cols-4">
            {process.map((p) => (
              <StaggerItem key={p.step} className="relative text-center">
                <div className="mb-4 text-6xl font-black text-primary/10">{p.step}</div>
                <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <FadeInSection><h2 className="text-3xl font-bold md:text-4xl text-white">Who This Service Is <span className="text-primary">For</span></h2></FadeInSection>
          <StaggerContainer className="mt-12 flex flex-wrap justify-center gap-4">
            {targetAudience.map((item) => (
              <StaggerItem key={item}>
                <div className="rounded-full border border-primary/20 bg-primary/5 px-6 py-2 text-sm font-medium text-white">{item}</div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section id="packages" className="section-padding bg-alternate border-y border-foreground/5">
        <div className="content-width">
          <FadeInSection className="max-w-4xl mx-auto text-center mb-24">
            <h2 className="mb-8 text-gradient leading-[0.85] tracking-[-0.06em]">
              Performance Plans
            </h2>
            <p className="text-xl font-bold uppercase tracking-widest text-foreground/50">Engineered for absolute scale and efficiency.</p>
          </FadeInSection>

          <div className="mb-12 text-center md:hidden">
            <p className="text-xs font-black uppercase tracking-widest text-red-600 animate-pulse">
              Swipe to view plans
            </p>
          </div>
          <div className="mb-12 text-center hidden md:block">
            <p className="text-xs font-black uppercase tracking-widest text-foreground/30">
              Click/Tap on a plan card to select
            </p>
          </div>

          <StaggerContainer className="grid gap-8 md:grid-cols-3">
            {pricing.map((tier) => (
              <StaggerItem key={tier.name}>
                <div
                  onClick={() => openBooking({
                    service: "Paid Advertising",
                    package: tier.name,
                    price: parseInt(tier.price.replace(/[^\d]/g, "")) || 0
                  })}
                  className={`premium-card p-10 flex flex-col items-center text-center cursor-pointer group hover:-translate-y-2 relative transition-all duration-500 bg-background ${
                    tier.highlighted ? "border-red-600 border-2" : ""
                  }`}
                >
                  {tier.highlighted && (
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                      <span className="bg-red-600 text-white px-8 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.4em] shadow-xl">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <h3 className="text-2xl font-black text-foreground mb-4 uppercase tracking-tighter">{tier.name}</h3>
                  <div className="mb-10 flex items-baseline gap-2">
                    <span className="text-5xl font-black text-red-600">{tier.price}</span>
                    <span className="text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em]">{tier.period}</span>
                  </div>

                  <ul className="mb-10 space-y-5 text-left w-full border-t border-foreground/5 pt-10">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-center gap-4 text-xs font-black text-foreground/80 uppercase tracking-tight">
                        <CheckCircle className="h-5 w-5 shrink-0 text-red-600" /> {f}
                      </li>
                    ))}
                  </ul>

                  <Button className={`mt-auto w-full h-16 transition-all font-black uppercase tracking-[0.3em] ${
                    tier.highlighted ? "btn-primary red-glow" : "btn-secondary group-hover:bg-red-600"
                  }`}>
                    Select Plan
                  </Button>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <FadeInSection delay={0.2} className="mt-12 text-center">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-foreground/30">
              * Advertising budget is paid directly to the platform.
            </p>
          </FadeInSection>
        </div>
      </section>

      <section className="section-padding relative overflow-hidden bg-background text-center border-t border-foreground/5">
        <div className="absolute inset-0 mesh-bg opacity-10 dark:opacity-30" />
        <div className="content-width relative z-10">
          <HeroSection>
            <h2 className="text-5xl md:text-8xl lg:text-9xl font-black mb-12 text-gradient leading-[0.85] tracking-[-0.06em]">
              Scale Your<br />Acquisition
            </h2>
          </HeroSection>
          <FadeInSection delay={0.2}>
            <p className="mx-auto max-w-4xl text-xl md:text-2xl text-foreground/50 mb-20 font-bold uppercase tracking-[0.2em] leading-relaxed">
              Let's build a campaign that reaches your ideal audience and turns clicks into loyal customers.
            </p>
          </FadeInSection>
          <FadeInSection delay={0.3}>
            <div className="flex flex-wrap justify-center gap-8">
              <Button
                onClick={() => openBooking({
                  service: "Paid Advertising",
                  package: "Strategy Session",
                  price: 0
                })}
                size="lg"
                className="h-20 px-16 text-xs font-black rounded-full uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95 red-glow cursor-pointer btn-primary"
              >
                Book Strategy Session <ArrowRight className="h-4 w-4 ml-4" />
              </Button>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
};

export default PaidAdvertising;

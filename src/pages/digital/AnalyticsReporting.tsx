import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart3, CheckCircle, ArrowRight, LineChart, PieChart, Search, Trophy, Settings, FileText, Zap, MousePointerClick } from "lucide-react";
import { FadeInSection, HeroSection, StaggerContainer, StaggerItem, StaggerScaleItem } from "@/components/animations";
import { useBooking } from "@/contexts/BookingContext";

const AnalyticsReporting = () => {
  const { openBooking } = useBooking();
  const problems = [
    "Not knowing which marketing channels are actually generating results",
    "Being overwhelmed by dashboards and reports that provide little direction",
    "Difficulty measuring the true return on advertising spend",
    "Lack of clear tracking across the full customer journey",
  ];
  const services = [
    { icon: Settings, title: "Tracking Setup", desc: "Professional implementation of analytics tools such as Google Analytics, Meta Pixel, and event tracking systems." },
    { icon: MousePointerClick, title: "Conversion Tracking", desc: "Tracking every meaningful action including leads, purchases, bookings, and key interactions." },
    { icon: LineChart, title: "Performance Dashboards", desc: "Custom dashboards designed to show your most important KPIs in a clear and simple way." },
    { icon: Search, title: "SEO Audits", desc: "Technical and performance analysis to identify opportunities to improve search visibility." },
    { icon: FileText, title: "Monthly Reports", desc: "Clear, actionable summaries explaining what happened, why it happened, and what to do next." },
    { icon: Trophy, title: "Competitor Analysis", desc: "Understanding how your digital performance compares to others in your industry." },
  ];
  const learnings = [
    "Which marketing channels generate the highest return on investment",
    "Which pages and campaigns convert the most customers",
    "Where potential customers drop off in the sales journey",
    "Which marketing strategies should be scaled or stopped",
  ];
  const process = [
    { step: "01", title: "Audit & Infrastructure", desc: "We review your existing analytics setup and identify tracking gaps." },
    { step: "02", title: "Goal Identification", desc: "We define what success looks like based on your business objectives." },
    { step: "03", title: "Data Implementation", desc: "We configure the tools and tracking systems needed to capture every important interaction." },
    { step: "04", title: "Insight & Strategy", desc: "We translate data into clear recommendations for growth and performance improvement." },
  ];
  const pricing = [
    {
      name: "Basic Setup",
      price: "R1200",
      period: " (one-time)",
      features: ["Google Analytics setup", "Meta Pixel integration", "basic conversion tracking", "standard dashboard"],
      highlighted: false,
    },
    {
      name: "Growth Analytics",
      price: "R2500",
      period: "/ month",
      features: ["advanced event tracking", "custom ROI dashboards", "monthly strategy deep-dive", "competitor performance tracking"],
      highlighted: true,
    },
    {
      name: "Enterprise Data",
      price: "R5000+",
      period: "/ month",
      features: ["full funnel performance analysis", "multi-channel attribution tracking", "custom data integrations", "weekly reporting and strategy calls"],
      highlighted: false,
    },
  ];
  const targetAudience = [
    "Businesses increasing their advertising investment",
    "Data-driven marketers who need clearer insights",
    "E-commerce businesses tracking CAC and LTV",
    "Local companies wanting to understand their digital performance",
    "B2B companies focused on improving lead quality",
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
                <BarChart3 className="h-4 w-4" /> Analytics & Reporting
              </div>
            </HeroSection>
            <HeroSection delay={0.1}>
              <h1 className="text-5xl font-black leading-[0.85] md:text-8xl lg:text-9xl text-foreground tracking-[-0.06em] mb-12 uppercase">
                Data That <span className="text-gradient">Drives Growth</span>
              </h1>
            </HeroSection>
            <HeroSection delay={0.2}>
              <p className="mt-8 text-xl md:text-2xl text-foreground/50 font-bold uppercase tracking-widest leading-relaxed max-w-3xl mx-auto">
                We transform complex analytics into clear insights that help you improve marketing performance and increase conversions.
              </p>
            </HeroSection>
            <HeroSection delay={0.3}>
              <div className="flex flex-wrap justify-center gap-6 mt-16">
                <Button
                  onClick={() => openBooking({
                    service: "Analytics & Reporting",
                    package: "Data Audit",
                    price: 0
                  })}
                  size="lg"
                  className="h-20 px-16 text-xs font-black rounded-full uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95 red-glow cursor-pointer btn-primary"
                >
                  Book Data Audit <ArrowRight className="h-4 w-4 ml-4" />
                </Button>
              </div>
            </HeroSection>
          </div>
        </div>
      </section>

      <section className="section-padding bg-alternate border-y border-foreground/5">
        <div className="content-width">
          <FadeInSection className="max-w-4xl mx-auto text-center mb-24">
            <h2 className="mb-8 text-gradient">The Clarity Problem</h2>
            <p className="text-xl font-bold uppercase tracking-widest text-foreground/50">Most businesses stay surrounded by data but lack the clarity to use it effectively.</p>
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
              We help you cut through the noise and focus on growth metrics.
            </p>
          </FadeInSection>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="content-width">
          <FadeInSection className="max-w-4xl mx-auto text-center mb-24">
            <h2 className="mb-8 text-gradient">Data Services</h2>
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

      <section className="bg-background py-20">
        <div className="container mx-auto px-4 text-center">
          <FadeInSection>
            <h2 className="text-3xl font-bold md:text-4xl text-white mb-6">From Data to <span className="text-primary">Decisions</span></h2>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
              Our analytics services focus on answering the questions that matter most to businesses:
            </p>
          </FadeInSection>
          <StaggerContainer className="mx-auto mt-12 max-w-3xl">
            <div className="grid gap-4">
              {learnings.map((item) => (
                <StaggerItem key={item} className="flex items-center gap-4 p-4 rounded-xl bg-muted border border-border text-left">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-white font-medium">{item}</span>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
          <FadeInSection delay={0.2}>
            <p className="mx-auto mt-10 max-w-3xl text-lg text-muted-foreground">
              Instead of overwhelming you with numbers, we focus on delivering insights that help guide smarter decisions.
            </p>
          </FadeInSection>
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
              <StaggerItem key={item}><div className="rounded-full border border-primary/20 bg-primary/5 px-6 py-2 text-sm font-medium text-white">{item}</div></StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section id="packages" className="section-padding bg-alternate border-y border-foreground/5">
        <div className="content-width">
          <FadeInSection className="max-w-4xl mx-auto text-center mb-24">
            <h2 className="mb-8 text-gradient leading-[0.85] tracking-[-0.06em]">
              Insight Plans
            </h2>
            <p className="text-xl font-bold uppercase tracking-widest text-foreground/50">Engineered for clarity and performance scaling.</p>
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
                    service: "Analytics & Reporting",
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
        </div>
      </section>

      <section className="py-20 bg-card text-center">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="text-3xl font-bold md:text-4xl text-white mb-6">Insights That Lead to Better <span className="text-primary">Growth Decisions</span></h2>
            <p className="mx-auto mb-8 max-w-3xl text-lg text-muted-foreground">
              When businesses understand their data clearly, they gain a powerful competitive advantage.
            </p>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
              Our goal is not simply to deliver reports — it is to provide clarity that helps you invest your time, budget, and marketing efforts where they matter most.
              <br />
              Better insights lead to better strategies.
            </p>
          </FadeInSection>
        </div>
      </section>

      <section className="section-padding relative overflow-hidden bg-background text-center border-t border-foreground/5">
        <div className="absolute inset-0 mesh-bg opacity-10 dark:opacity-30" />
        <div className="content-width relative z-10">
          <HeroSection>
            <h2 className="text-5xl md:text-8xl lg:text-9xl font-black mb-12 text-gradient leading-[0.85] tracking-[-0.06em]">
              Audit Your<br />Performance
            </h2>
          </HeroSection>
          <FadeInSection delay={0.2}>
            <p className="mx-auto max-w-4xl text-xl md:text-2xl text-foreground/50 mb-20 font-bold uppercase tracking-[0.2em] leading-relaxed">
              Let's build the analytics infrastructure and reporting systems you need to grow with confidence.
            </p>
          </FadeInSection>
          <FadeInSection delay={0.3}>
            <div className="flex flex-wrap justify-center gap-8">
              <Button
                onClick={() => openBooking({
                  service: "Analytics & Reporting",
                  package: "General Audit",
                  price: 0
                })}
                size="lg"
                className="h-20 px-16 text-xs font-black rounded-full uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95 red-glow cursor-pointer btn-primary"
              >
                Book Data Audit <ArrowRight className="h-4 w-4 ml-4" />
              </Button>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
};

export default AnalyticsReporting;

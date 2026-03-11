import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart3, CheckCircle, ArrowRight, LineChart, PieChart, Search, Trophy, Settings, FileText, Zap, MousePointerClick } from "lucide-react";
import { FadeInSection, HeroSection, StaggerContainer, StaggerItem, StaggerScaleItem } from "@/components/animations";

const AnalyticsReporting = () => {
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
      <section className="relative overflow-hidden bg-background py-20 md:py-28">
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <HeroSection>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <BarChart3 className="h-4 w-4" /> Analytics & Reporting
              </div>
            </HeroSection>
            <HeroSection delay={0.1}>
              <h1 className="text-4xl font-black leading-tight md:text-5xl lg:text-6xl text-white">
                Data Insights That Drive <span className="text-primary">Better Decisions</span>
              </h1>
            </HeroSection>
            <HeroSection delay={0.2}>
              <p className="mt-6 text-lg text-muted-foreground">
                Most businesses collect data, but very few truly understand it.
                <br />
                We transform complex analytics into clear insights that help you improve marketing performance, increase conversions, and make smarter business decisions.
              </p>
            </HeroSection>
            <HeroSection delay={0.3}>
              <Button asChild size="lg" className="mt-8 gap-2"><Link to="/booking">Get Your Data Audit <ArrowRight className="h-4 w-4" /></Link></Button>
            </HeroSection>
          </div>
        </div>
      </section>

      <section className="bg-muted py-20">
        <div className="container mx-auto px-4 text-center">
          <FadeInSection>
            <h2 className="text-3xl font-bold md:text-4xl text-white">The <span className="text-primary">Problem</span></h2>
            <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
              Most businesses today are surrounded by data but lack the clarity needed to use it effectively.
            </p>
          </FadeInSection>
          <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2">
            {problems.map((p) => (
              <StaggerItem key={p} className="flex items-center gap-4 rounded-lg bg-background p-6 text-left border border-border">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"><Zap className="h-5 w-5" /></div>
                <p className="font-medium text-white">{p}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <FadeInSection delay={0.15}>
            <p className="mx-auto mt-10 max-w-3xl text-lg text-muted-foreground">
              Without the right analytics infrastructure, businesses end up making decisions based on assumptions instead of evidence.
            </p>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <p className="mt-6 text-lg font-medium text-primary uppercase tracking-wider">
              We help you cut through the noise and focus on the metrics that truly drive growth.
            </p>
          </FadeInSection>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <FadeInSection><h2 className="text-center text-3xl font-bold md:text-4xl text-white">What <span className="text-primary">We Do</span></h2></FadeInSection>
          <StaggerContainer className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <StaggerItem key={s.title} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10"><s.icon className="h-7 w-7 text-primary" /></div>
                <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                <p className="text-muted-foreground">{s.desc}</p>
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

      <section className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="text-center text-3xl font-bold md:text-4xl text-white mb-4">Flexible <span className="text-primary">Pricing</span></h2>
            <p className="mx-auto mb-12 max-w-3xl text-center text-muted-foreground">
              Analytics services designed for businesses at different stages of growth.
            </p>
          </FadeInSection>
          <StaggerContainer className="grid gap-8 md:grid-cols-3">
            {pricing.map((tier) => (
              <StaggerScaleItem key={tier.name}>
                <Card className={`relative flex flex-col items-center p-8 text-center h-full ${tier.highlighted ? "border-primary border-2" : "border-border"}`}>
                  {tier.highlighted && (<span className="absolute -top-4 rounded-full bg-primary px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">Most Popular</span>)}
                  <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                  <div className="mb-6 flex items-baseline"><span className="text-4xl font-black text-primary">{tier.price}</span><span className="ml-1 text-muted-foreground">{tier.period}</span></div>
                  <ul className="mb-8 space-y-4 text-left w-full">
                    {tier.features.map((f) => (<li key={f} className="flex items-center gap-3 text-sm text-muted-foreground"><CheckCircle className="h-4 w-4 shrink-0 text-primary" />{f}</li>))}
                  </ul>
                  <Button className="mt-auto w-full" variant={tier.highlighted ? "default" : "outline"} asChild><Link to="/booking">Choose Plan</Link></Button>
                </Card>
              </StaggerScaleItem>
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

      <section className="py-20 bg-background text-center">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="text-3xl font-bold md:text-4xl text-white mb-6">Ready to See the Full Picture?</h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
              Stop guessing which strategies are working.
              <br />
              Let&apos;s build the analytics infrastructure and reporting systems you need to grow with confidence.
            </p>
            <Button asChild size="lg" className="px-10 h-14 text-lg"><Link to="/booking">Book a Data Audit</Link></Button>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
};

export default AnalyticsReporting;

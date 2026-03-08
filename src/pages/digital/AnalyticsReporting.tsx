import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart3, CheckCircle, ArrowRight, LineChart, PieChart, Search, Trophy, Settings, FileText, Zap, MousePointerClick } from "lucide-react";
import { FadeInSection, HeroSection, StaggerContainer, StaggerItem, StaggerScaleItem } from "@/components/animations";

const AnalyticsReporting = () => {
  const problems = ["Not knowing which marketing channels are working", "Flooded with data but lacking clear insights", "Difficulty measuring the true ROI of digital spend", "No clear tracking of customer journeys and conversions"];
  const services = [
    { icon: Settings, title: "Tracking Setup", desc: "Correct implementation of Google Analytics, Meta Pixel, and more." },
    { icon: MousePointerClick, title: "Conversion Tracking", desc: "Measuring every lead, sale, and important action on your site." },
    { icon: LineChart, title: "Performance Dashboards", desc: "Custom, easy-to-read views of your most important business KPIs." },
    { icon: Search, title: "SEO Audits", desc: "Deep dives into your search rankings and technical health." },
    { icon: FileText, title: "Monthly Reports", desc: "Clear, jargon-free summaries of what happened and what's next." },
    { icon: Trophy, title: "Competitor Analysis", desc: "Tracking how you stack up against others in your industry." },
  ];
  const process = [
    { step: "1", title: "Audit & Infrastructure", desc: "Checking your current tracking and fixing any gaps." },
    { step: "2", title: "Goal Identification", desc: "Defining exactly what success looks like for your business." },
    { step: "3", title: "Data Implementation", desc: "Setting up the tools to capture every meaningful interaction." },
    { step: "4", title: "Insight & Strategy", desc: "Turning the data into actionable steps for growth." },
  ];
  const pricing = [
    { name: "Basic Setup", price: "R1,200", period: " (one-time)", features: ["Google Analytics setup", "Meta Pixel integration", "Basic conversion tracking", "Standard dashboard"], highlighted: false },
    { name: "Growth Analytics", price: "R2,500", period: "/ month", features: ["Advanced event tracking", "Custom ROI dashboards", "Monthly strategy deep-dive", "Competitor tracking"], highlighted: true },
    { name: "Enterprise Data", price: "R5,000+", period: "/ month", features: ["Full funnel analysis", "Multi-channel attribution", "Custom data integrations", "Weekly reporting & calls"], highlighted: false },
  ];
  const targetAudience = ["Businesses scaling their ad spend", "Data-driven marketers needing clarity", "E-commerce owners tracking CAC & LTV", "Local companies wanting to see what works", "B2B firms measuring lead quality"];

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
              <p className="mt-6 text-lg text-muted-foreground">Stop guessing and start knowing. We provide clear, actionable data insights.</p>
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
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Most businesses have plenty of data, but very little clarity.</p>
          </FadeInSection>
          <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2">
            {problems.map((p) => (
              <StaggerItem key={p} className="flex items-center gap-4 rounded-lg bg-background p-6 text-left border border-border">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"><Zap className="h-5 w-5" /></div>
                <p className="font-medium text-white">{p}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <FadeInSection delay={0.2}>
            <p className="mt-10 text-lg font-medium text-primary uppercase tracking-wider">We help you cut through the noise and focus on the metrics that matter.</p>
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
          <FadeInSection><h2 className="text-center text-3xl font-bold md:text-4xl text-white mb-12">Flexible <span className="text-primary">Pricing</span></h2></FadeInSection>
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

      <section className="py-20 bg-background text-center">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="text-3xl font-bold md:text-4xl text-white mb-6">Ready to See the Full Picture?</h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">Let's set up the tracking and insights you need to scale with confidence.</p>
            <Button asChild size="lg" className="px-10 h-14 text-lg"><Link to="/booking">Book a Data Audit</Link></Button>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
};

export default AnalyticsReporting;

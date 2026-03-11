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
      <section className="relative overflow-hidden bg-background py-20 md:py-28">
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <HeroSection>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <Megaphone className="h-4 w-4" /> Paid Advertising
              </div>
            </HeroSection>
            <HeroSection delay={0.1}>
              <h1 className="text-4xl font-black leading-tight md:text-5xl lg:text-6xl text-white">
                Performance Advertising That <span className="text-primary">Turns Clicks Into Customers</span>
              </h1>
            </HeroSection>
            <HeroSection delay={0.2}>
              <p className="mt-6 text-lg text-muted-foreground">
                Strategic paid advertising campaigns designed to generate leads, sales, and measurable growth for businesses.
              </p>
            </HeroSection>
            <HeroSection delay={0.3}>
              <Button 
                onClick={() => openBooking({
                  service: "Paid Advertising",
                  package: "General Inquiry",
                  price: 0
                })}
                size="lg" 
                className="mt-8 gap-2 cursor-pointer"
              >
                Start Your Campaign <ArrowRight className="h-4 w-4" />
              </Button>
            </HeroSection>
          </div>
        </div>
      </section>

      <section className="bg-muted py-20">
        <div className="container mx-auto px-4 text-center">
          <FadeInSection>
            <h2 className="text-3xl font-bold md:text-4xl text-white">The <span className="text-primary">Problem</span></h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Many businesses find paid ads confusing or expensive because campaigns are poorly targeted or not optimized.
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
          <FadeInSection delay={0.2}>
            <p className="mt-10 text-lg font-medium text-primary uppercase tracking-wider">
              We help businesses turn advertising spend into a predictable growth engine.
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
                  <Button 
                    onClick={() => openBooking({
                      service: "Paid Advertising",
                      package: tier.name,
                      price: parseInt(tier.price.replace(/[^\d]/g, "")) || 0
                    })}
                    className="mt-auto w-full cursor-pointer" 
                    variant={tier.highlighted ? "default" : "outline"}
                  >
                    Choose Plan
                  </Button>
                </Card>
              </StaggerScaleItem>
            ))}
          </StaggerContainer>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Advertising budget is paid directly to the advertising platform.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background text-center">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="text-3xl font-bold md:text-4xl text-white mb-6">Ready to Drive Measurable Results?</h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
              Let&apos;s build a campaign that reaches your ideal audience and turns clicks into customers.
            </p>
            <Button 
              onClick={() => openBooking({
                service: "Paid Advertising",
                package: "Ad Strategy Session",
                price: 0
              })}
              size="lg" 
              className="px-10 h-14 text-lg cursor-pointer"
            >
              Book an Ad Strategy Session
            </Button>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
};

export default PaidAdvertising;

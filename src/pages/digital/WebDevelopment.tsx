import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, CheckCircle, ArrowRight, Code, MousePointer2, Layout, Zap, Smartphone, Search, LineChart, Server, ShieldCheck } from "lucide-react";
import { FadeInSection, HeroSection, StaggerContainer, StaggerItem, StaggerScaleItem } from "@/components/animations";

const WebDevelopment = () => {
  const startupFeatures = ["1 professional landing page", "mobile responsive design", "contact form integration", "basic SEO setup", "fast loading optimization"];
  const businessFeatures = ["5–10 pages", "responsive design", "contact forms", "SEO setup", "Google Analytics integration"];
  const appExamples = ["booking systems", "client portals", "dashboards", "custom web applications"];
  const whyInvest = [
    "build trust with potential clients",
    "generate leads and inquiries",
    "showcase products and services professionally",
    "automate bookings and business processes",
    "expand their reach beyond physical locations",
  ];
  const technologies = [
    "React & modern front-end frameworks",
    "responsive mobile-first design",
    "SEO optimized structure",
    "secure and scalable architecture",
  ];
  const developmentProcess = [
    { step: "01", title: "Discovery & Planning", desc: "Understanding your business, audience, and project goals." },
    { step: "02", title: "Design & User Experience", desc: "Creating intuitive layouts and user-focused design." },
    { step: "03", title: "Development", desc: "Building the website or application with modern technologies." },
    { step: "04", title: "Testing & Optimization", desc: "Ensuring performance, speed, and compatibility." },
    { step: "05", title: "Launch & Support", desc: "Deploying your project and providing ongoing support if needed." },
  ];
  const hostingPackages = [
    { name: "Basic Hosting", price: "R300", desc: "Perfect for starting fresh.", features: ["Hosting", "1 email account", "Daily backups"], icon: Server },
    { name: "Standard Hosting", price: "R550", desc: "The standard for growing SMEs.", features: ["Hosting", "5 email accounts", "Daily backups", "SSL Certificate"], icon: ShieldCheck, highlighted: true },
    { name: "Premium Hosting", price: "R1200", desc: "Maximum performance & security.", features: ["Hosting", "10 email accounts", "SSL + Security monitoring", "Monthly optimization"], icon: Zap },
  ];

  return (
    <div className="pt-20">
      <section className="relative overflow-hidden bg-background py-20 md:py-28">
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <HeroSection>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <Globe className="h-4 w-4" /> Website & Web Application Development
              </div>
            </HeroSection>
            <HeroSection delay={0.1}>
              <h1 className="text-4xl font-black leading-tight md:text-5xl lg:text-6xl text-white">
                Modern Websites & Web Applications Built for <span className="text-primary">Business Growth</span>
              </h1>
            </HeroSection>
            <HeroSection delay={0.2}>
              <p className="mt-6 text-lg text-muted-foreground">
                We design and develop high-performance websites and web applications that help startups, SMEs, and growing businesses build credibility, generate leads, and scale their digital presence.
              </p>
            </HeroSection>
            <HeroSection delay={0.3}>
              <Button asChild size="lg" className="mt-8 gap-2"><Link to="/booking">Discuss Your Project <ArrowRight className="h-4 w-4" /></Link></Button>
            </HeroSection>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <FadeInSection className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl text-white mb-6">
              Why Businesses Invest in <span className="text-primary">Professional Websites</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              A professional website is more than just an online presence. It is a digital asset that helps businesses:
            </p>
          </FadeInSection>
          <StaggerContainer className="mx-auto mt-12 max-w-3xl">
            <div className="grid gap-4">
              {whyInvest.map((item) => (
                <StaggerItem key={item} className="flex items-center gap-4 p-4 rounded-xl bg-muted border border-border">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-white font-medium">{item}</span>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
          <FadeInSection delay={0.2} className="mx-auto mt-10 max-w-3xl text-center">
            <p className="text-lg text-muted-foreground">
              Our goal is to create websites and applications that support real business growth.
            </p>
          </FadeInSection>
        </div>
      </section>

      <section className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <FadeInSection><h2 className="text-center text-3xl font-bold md:text-4xl text-white mb-16">Development <span className="text-primary">Packages</span></h2></FadeInSection>
          <StaggerContainer className="grid gap-8 lg:grid-cols-3">
            <StaggerScaleItem>
              <Card className="flex flex-col border-border bg-background transition-all hover:border-primary/50 h-full">
                <CardHeader className="text-center p-8">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary"><Smartphone className="h-6 w-6" /></div>
                  <CardTitle className="text-2xl font-bold text-white mb-2">Landing Page</CardTitle>
                  <p className="text-sm text-muted-foreground uppercase font-bold tracking-wider">(Startup Entrance)</p>
                </CardHeader>
                <CardContent className="px-8 pb-8 flex-1">
                  <div className="mb-8 text-center p-6 rounded-2xl bg-muted/50 border border-primary/10">
                    <div className="mb-2 text-sm text-muted-foreground uppercase font-bold">Full Price</div>
                    <div className="text-3xl font-black text-primary mb-4">R4500 <span className="text-sm text-muted-foreground">once-off</span></div>
                    <div className="h-px bg-border my-4" />
                    <div className="mb-2 text-sm text-muted-foreground uppercase font-bold">Monthly Option</div>
                    <div className="text-xl font-bold text-white">R180 <span className="text-sm text-muted-foreground">/ month</span></div>
                    <div className="text-[10px] text-muted-foreground mt-1">for 36 months</div>
                  </div>
                  <ul className="mb-8 space-y-4 text-left">
                    {startupFeatures.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground font-medium uppercase tracking-tight">
                        <CheckCircle className="h-4 w-4 shrink-0 text-primary mt-0.5" />{f}
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-auto w-full h-12" asChild><Link to="/booking">Get Started</Link></Button>
                </CardContent>
              </Card>
            </StaggerScaleItem>

            <StaggerScaleItem>
              <Card className="flex flex-col border-primary border-2 bg-background relative shadow-2xl transition-all hover:shadow-primary/10 h-full">
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">SME Essential</span>
                <CardHeader className="text-center p-8">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary"><Layout className="h-6 w-6" /></div>
                  <CardTitle className="text-2xl font-bold text-white mb-2">Small Business Website</CardTitle>
                  <p className="text-sm text-muted-foreground uppercase font-bold tracking-wider">Growth Focus</p>
                </CardHeader>
                <CardContent className="px-8 pb-8 flex-1">
                  <div className="mb-8 text-center p-6 rounded-2xl bg-primary/5 border border-primary/20">
                    <div className="mb-2 text-sm text-muted-foreground uppercase font-bold">Full Price</div>
                    <div className="text-3xl font-black text-primary mb-4">R12000 <span className="text-sm text-muted-foreground">once-off</span></div>
                    <div className="h-px bg-border my-4" />
                    <div className="mb-2 text-sm text-muted-foreground uppercase font-bold">Monthly Option</div>
                    <div className="text-xl font-bold text-white">R400 <span className="text-sm text-muted-foreground">/ month</span></div>
                    <div className="text-[10px] text-muted-foreground mt-1">for 36 months</div>
                  </div>
                  <ul className="mb-8 space-y-4 text-left">
                    {businessFeatures.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground font-medium uppercase tracking-tight">
                        <CheckCircle className="h-4 w-4 shrink-0 text-primary mt-0.5" />{f}
                      </li>
                    ))}
                  </ul>
                  <p className="mb-8 text-xs text-muted-foreground italic leading-relaxed">
                    Optional Hosting &amp; Maintenance add-on available.
                  </p>
                  <Button className="mt-auto w-full h-12" asChild><Link to="/booking">Get Started</Link></Button>
                </CardContent>
              </Card>
            </StaggerScaleItem>

            <StaggerScaleItem>
              <Card className="flex flex-col border-border bg-background transition-all hover:border-primary/50 h-full">
                <CardHeader className="text-center p-8">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary"><Code className="h-6 w-6" /></div>
                  <CardTitle className="text-2xl font-bold text-white mb-2">Custom / Web App</CardTitle>
                  <p className="text-sm text-muted-foreground uppercase font-bold tracking-wider">Advanced Solutions</p>
                </CardHeader>
                <CardContent className="px-8 pb-8 flex-1">
                  <div className="mb-8 text-center p-6 rounded-2xl bg-muted/50 border border-primary/10">
                    <div className="mb-2 text-sm text-muted-foreground uppercase font-bold">Starting Price</div>
                    <div className="text-3xl font-black text-primary mb-2">R25000+</div>
                    <p className="text-xs text-muted-foreground font-medium">Quote Based on Complexity</p>
                  </div>
                  <div className="mb-6">
                    <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-4 flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-primary" />Bespoke Systems</h4>
                    <ul className="space-y-3">
                      {appExamples.map((ex, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground font-bold uppercase tracking-tight">
                          <ArrowRight className="h-3 w-3 text-primary" />{ex}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="mb-8 text-xs text-muted-foreground italic leading-relaxed">* Pricing depends on project complexity.</p>
                  <Button className="mt-auto w-full h-12" variant="outline" asChild><Link to="/booking">Inquire Custom Project</Link></Button>
                </CardContent>
              </Card>
            </StaggerScaleItem>
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <FadeInSection className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold md:text-4xl text-white mb-6">
              Technologies <span className="text-primary">We Use</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Our projects are built using modern and scalable technologies.
            </p>
          </FadeInSection>
          <StaggerContainer className="mx-auto max-w-3xl">
            <div className="grid gap-4">
              {technologies.map((item) => (
                <StaggerItem key={item} className="flex items-center gap-4 p-4 rounded-xl bg-muted border border-border">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-white font-medium">{item}</span>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
          <FadeInSection delay={0.2} className="mx-auto mt-10 max-w-3xl text-center">
            <p className="text-lg text-muted-foreground">
              Our focus is building fast, reliable, and future-ready digital products.
            </p>
          </FadeInSection>
        </div>
      </section>

      <section className="bg-card py-20">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="text-center text-3xl font-bold md:text-4xl text-white mb-16">
              Our <span className="text-primary">Development Process</span>
            </h2>
          </FadeInSection>
          <StaggerContainer className="grid gap-8 md:grid-cols-5">
            {developmentProcess.map((p) => (
              <StaggerItem key={p.step} className="relative text-center">
                <div className="mb-4 text-6xl font-black text-primary/10">{p.step}</div>
                <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <FadeInSection className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold md:text-5xl text-white mb-6">Website Hosting & <span className="text-primary">Maintenance</span></h2>
            <p className="text-lg text-muted-foreground">
              Reliable hosting and ongoing support for businesses that want a hands-off experience.
            </p>
          </FadeInSection>
          <StaggerContainer className="grid gap-8 md:grid-cols-3">
            {hostingPackages.map((pkg) => (
              <StaggerScaleItem key={pkg.name}>
                <Card className={`p-8 bg-muted/30 border-2 transition-all hover:scale-[1.02] h-full ${pkg.highlighted ? "border-primary shadow-lg shadow-primary/5" : "border-border"}`}>
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"><pkg.icon className="h-7 w-7" /></div>
                  <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                  <p className="text-sm text-muted-foreground mb-6 h-10">{pkg.desc}</p>
                  <div className="mb-8"><span className="text-4xl font-black text-white">{pkg.price}</span><span className="text-muted-foreground ml-2">/ month</span></div>
                  <ul className="space-y-4 mb-10">
                    {pkg.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm text-white/80 font-medium"><CheckCircle className="h-4 w-4 text-primary shrink-0" />{f}</li>
                    ))}
                  </ul>
                  <Button variant={pkg.highlighted ? "default" : "outline"} className="w-full" asChild><Link to="/booking">Select Plan</Link></Button>
                </Card>
              </StaggerScaleItem>
            ))}
          </StaggerContainer>
          <FadeInSection delay={0.2} className="mt-12 text-center p-6 rounded-2xl bg-primary/5 border border-primary/10 max-w-2xl mx-auto">
            <p className="text-sm text-muted-foreground"><Zap className="inline-block h-4 w-4 text-primary mr-2 mb-1" /><strong>Tip:</strong> Clients who already have hosting can skip this option.</p>
          </FadeInSection>
        </div>
      </section>

      <section className="py-20 bg-muted text-center">
        <div className="container mx-auto px-4">
          <FadeInSection><h2 className="text-3xl font-bold md:text-4xl text-white mb-12">Built for <span className="text-primary">Performance</span></h2></FadeInSection>
          <StaggerContainer className="grid gap-8 md:grid-cols-4">
            {[
              { icon: Zap, title: "Scalable Architecture", desc: "Optimized for speed and SEO." },
              { icon: Search, title: "SEO Integrated", desc: "Structured data and search optimization included." },
              { icon: MousePointer2, title: "Modern UI/UX", desc: "Professional designs focused on usability." },
              { icon: LineChart, title: "Growth Ready", desc: "Built to support business expansion." }
            ].map((item) => (
              <StaggerItem key={item.title} className="space-y-3">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-primary border border-primary/10"><item.icon className="h-6 w-6" /></div>
                <h4 className="text-white font-bold">{item.title}</h4>
                <p className="text-xs text-muted-foreground font-medium">{item.desc}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 bg-primary text-white text-center rounded-t-[3rem] mt-20">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="text-3xl font-bold md:text-5xl text-white mb-6">Let&apos;s Build Your Digital Asset</h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg opacity-90 font-medium">
              Whether you need a professional website or a custom web application, we help businesses turn ideas into powerful digital platforms.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="px-10 h-16 text-lg bg-white text-primary hover:bg-zinc-100 font-black uppercase tracking-widest shadow-2xl"><Link to="/booking">Start Your Project</Link></Button>
              <Button asChild variant="outline" size="lg" className="px-10 h-16 text-lg border-white text-white hover:bg-white/10 font-bold uppercase tracking-widest"><Link to="/contact">Contact Support</Link></Button>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
};

export default WebDevelopment;

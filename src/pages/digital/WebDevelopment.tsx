import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, CheckCircle, ArrowRight, Code, MousePointer2, Layout, Zap, Smartphone, Search, LineChart, Server, ShieldCheck } from "lucide-react";
import { useBooking } from "@/contexts/BookingContext";
import { FadeInSection, HeroSection, StaggerContainer, StaggerItem, StaggerScaleItem } from "@/components/animations";

const WebDevelopment = () => {
  const { openBooking } = useBooking();
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
      <section className="relative overflow-hidden section-padding pb-32">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background z-10" />
          <div className="absolute inset-0 mesh-bg opacity-20 dark:opacity-40" />
        </div>
        
        <div className="content-width relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <HeroSection>
              <div className="mb-10 inline-flex items-center gap-3 rounded-full border border-red-600/30 bg-red-600/10 px-6 py-2 text-xs font-black uppercase tracking-[0.3em] text-red-600 animate-pulse">
                <Globe className="h-4 w-4" /> Web Development & Engineering
              </div>
            </HeroSection>
            <HeroSection delay={0.1}>
              <h1 className="text-5xl font-black leading-[0.85] md:text-8xl lg:text-9xl text-foreground tracking-[-0.06em] mb-12">
                Build Your Elite <span className="text-gradient">Digital Asset</span>
              </h1>
            </HeroSection>
            <HeroSection delay={0.2}>
              <p className="mt-8 text-xl md:text-2xl text-foreground/50 font-bold uppercase tracking-widest leading-relaxed max-w-3xl mx-auto">
                We design and develop high-performance websites and web applications built to scale your business.
              </p>
            </HeroSection>
            <HeroSection delay={0.3}>
              <div className="flex flex-wrap justify-center gap-6 mt-16">
                <Button
                  onClick={() => openBooking({
                    service: "Web Development",
                    package: "General Project",
                    price: 0
                  })}
                  size="lg"
                  className="h-20 px-16 text-xs font-black rounded-full uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95 red-glow cursor-pointer btn-primary"
                >
                  Discuss Your Project <ArrowRight className="h-4 w-4 ml-4" />
                </Button>
              </div>
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

      <section className="section-padding bg-alternate border-y border-foreground/5">
        <div className="content-width">
          <FadeInSection className="max-w-4xl mx-auto text-center mb-24">
            <h2 className="mb-8 text-gradient">Development Packages</h2>
            <p className="text-xl font-bold uppercase tracking-widest text-foreground/50">Engineered for high-performance and business growth.</p>
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

          <StaggerContainer className="grid gap-8 lg:grid-cols-3">
            {[
              {
                title: "Landing Page",
                subtitle: "(Startup Entrance)",
                price: "R4500",
                monthly: "R180",
                features: startupFeatures,
                icon: Smartphone,
              },
              {
                title: "Small Business Website",
                subtitle: "Growth Focus",
                price: "R12000",
                monthly: "R400",
                features: businessFeatures,
                icon: Layout,
                highlighted: true,
              },
              {
                title: "Custom / Web App",
                subtitle: "Advanced Solutions",
                price: "R25000+",
                features: appExamples,
                icon: Code,
                isCustom: true,
              }
            ].map((pkg) => (
              <StaggerItem key={pkg.title}>
                <div
                  onClick={() => openBooking({
                    service: "Web Development",
                    package: pkg.title,
                    price: pkg.isCustom ? 25000 : parseInt(pkg.price.replace(/[^\d]/g, "")) || 0
                  })}
                  className={`premium-card p-10 flex flex-col items-center text-center cursor-pointer group hover:-translate-y-2 relative transition-all duration-500 bg-background ${
                    pkg.highlighted ? "border-red-600 border-2" : ""
                  }`}
                >
                  {pkg.highlighted && (
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                      <span className="bg-red-600 text-white px-8 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.4em] shadow-xl">
                        SME Essential
                      </span>
                    </div>
                  )}
                  <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-foreground/5 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all">
                    <pkg.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-black text-foreground mb-2 uppercase tracking-tighter">{pkg.title}</h3>
                  <p className="text-[10px] font-black tracking-widest text-foreground/30 uppercase mb-8">{pkg.subtitle}</p>
                  
                  <div className={`mb-10 flex flex-col items-center p-8 rounded-[2rem] w-full transition-colors ${
                    pkg.highlighted ? "bg-red-600/10" : "bg-foreground/5 group-hover:bg-red-600/5"
                  }`}>
                    <span className="text-4xl font-black text-red-600">{pkg.price}</span>
                    {pkg.monthly && (
                      <div className="mt-4 pt-4 border-t border-foreground/10 w-full">
                        <span className="text-lg font-black text-foreground">{pkg.monthly} <span className="text-[10px] uppercase tracking-widest opacity-50">/ mo</span></span>
                        <p className="text-[8px] font-black uppercase tracking-widest opacity-30 mt-1">for 36 months</p>
                      </div>
                    )}
                  </div>

                  <ul className="mb-10 space-y-4 text-left w-full border-t border-foreground/5 pt-8">
                    {pkg.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-4 text-xs font-bold text-foreground/80 uppercase tracking-tight">
                        <CheckCircle className="h-4 w-4 shrink-0 text-red-600" /> {f}
                      </li>
                    ))}
                  </ul>

                  <Button className={`mt-auto w-full h-14 font-black uppercase tracking-[0.2em] transition-all ${
                    pkg.highlighted ? "btn-primary red-glow" : "btn-secondary group-hover:bg-red-600"
                  }`}>
                    {pkg.isCustom ? "Inquire Project" : "Get Started"}
                  </Button>
                </div>
              </StaggerItem>
            ))}
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

      <section className="section-padding bg-background border-y border-foreground/5">
        <div className="content-width">
          <FadeInSection className="max-w-4xl mx-auto text-center mb-24">
            <h2 className="mb-8 text-gradient">Elite Hosting Infrastructure</h2>
            <p className="text-xl font-bold uppercase tracking-widest text-foreground/50">Reliable performance and absolute security.</p>
          </FadeInSection>

          <StaggerContainer className="grid gap-10 md:grid-cols-3">
            {hostingPackages.map((pkg) => (
              <StaggerItem key={pkg.name}>
                <div
                  onClick={() => openBooking({
                    service: "Web Hosting",
                    package: pkg.name,
                    price: parseInt(pkg.price.replace(/[^\d]/g, "")) || 0
                  })}
                  className={`premium-card p-12 flex flex-col items-center text-center cursor-pointer group hover:-translate-y-2 relative transition-all duration-500 ${
                    pkg.highlighted ? "border-red-600 border-2" : ""
                  }`}
                >
                  <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-foreground/5 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all">
                    <pkg.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-black text-foreground mb-4 uppercase tracking-tighter">{pkg.name}</h3>
                  <p className="text-xs font-medium text-foreground/40 mb-8 uppercase tracking-widest h-8">{pkg.desc}</p>
                  
                  <div className="mb-10 flex items-baseline gap-2">
                    <span className="text-5xl font-black text-red-600">{pkg.price}</span>
                    <span className="text-xs font-black text-foreground/30 uppercase tracking-[0.2em]">/ mo</span>
                  </div>

                  <ul className="mb-12 space-y-5 text-left w-full border-t border-foreground/5 pt-10">
                    {pkg.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-4 text-xs font-black text-foreground/80 uppercase tracking-tight">
                        <CheckCircle className="h-5 w-5 shrink-0 text-red-600" /> {f}
                      </li>
                    ))}
                  </ul>

                  <Button className={`mt-auto w-full h-16 transition-all font-black uppercase tracking-[0.3em] ${
                    pkg.highlighted ? "btn-primary red-glow" : "btn-secondary group-hover:bg-red-600"
                  }`}>
                    Select Plan
                  </Button>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
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

      <section className="section-padding relative overflow-hidden bg-background text-center border-t border-foreground/5">
        <div className="absolute inset-0 mesh-bg opacity-10 dark:opacity-30" />
        <div className="content-width relative z-10">
          <HeroSection>
            <h2 className="text-5xl md:text-8xl lg:text-9xl font-black mb-12 text-gradient leading-[0.85] tracking-[-0.06em]">
              Build Your<br />Digital Asset
            </h2>
          </HeroSection>
          <FadeInSection delay={0.2}>
            <p className="mx-auto max-w-4xl text-xl md:text-2xl text-foreground/50 mb-20 font-bold uppercase tracking-[0.2em] leading-relaxed">
              Whether you need a professional website or a custom web application, we help businesses turn ideas into powerful digital platforms.
            </p>
          </FadeInSection>
          <FadeInSection delay={0.3}>
            <div className="flex flex-wrap justify-center gap-8">
              <Button
                onClick={() => openBooking({
                  service: "Web Development",
                  package: "General Project",
                  price: 0
                })}
                size="lg"
                className="h-20 px-16 text-xs font-black rounded-full uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95 red-glow cursor-pointer btn-primary"
              >
                Start Your Project <ArrowRight className="h-4 w-4 ml-4" />
              </Button>
              <Button asChild className="h-20 px-16 text-xs font-black rounded-full uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95 cursor-pointer btn-secondary">
                <Link to="/contact">Contact Support</Link>
              </Button>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
};

export default WebDevelopment;

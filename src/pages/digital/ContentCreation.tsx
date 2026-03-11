import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PenTool, CheckCircle, ArrowRight, Camera, Video, Type, Palette, Lightbulb, Zap, Image as ImageIcon } from "lucide-react";
import { FadeInSection, HeroSection, StaggerContainer, StaggerItem, StaggerScaleItem } from "@/components/animations";
import { useBooking } from "@/contexts/BookingContext";

const ContentCreation = () => {
  const { openBooking } = useBooking();
  const problems = [
    "Content that looks unprofessional or inconsistent",
    "Running out of ideas for posts and videos",
    "Brand messaging that feels unclear",
    "High effort with low engagement",
  ];
  const services = [
    { icon: Palette, title: "Graphic Design", desc: "Professional visuals for social media, ads, and web." },
    { icon: Type, title: "Copywriting", desc: "Captions and messaging designed to drive engagement." },
    { icon: Video, title: "Short-Form Video", desc: "Reels, TikTok videos, and Shorts designed to capture attention." },
    { icon: Lightbulb, title: "Content Strategy", desc: "Ideas and planning that align with your business goals." },
    { icon: Camera, title: "Photography", desc: "High-quality brand and product photography." },
    { icon: ImageIcon, title: "Visual Branding", desc: "Consistent look and feel across all digital touchpoints." },
  ];
  const contentWeProduce = [
    "social media graphics",
    "Instagram Reels and TikTok videos",
    "promotional brand videos",
    "product photography",
    "YouTube Shorts",
    "website banners and visuals",
    "advertising creatives",
  ];
  const process = [
    { step: "01", title: "Brand Discovery", desc: "Understanding your voice, brand identity, and audience." },
    { step: "02", title: "Creative Concepting", desc: "Developing visual themes and storytelling ideas." },
    { step: "03", title: "Production & Design", desc: "Creating graphics, videos, and written content." },
    { step: "04", title: "Review & Refine", desc: "Ensuring every piece of content meets professional standards." },
  ];
  const pricing = [
    {
      name: "Basic Creative",
      price: "R1800",
      period: "/ month",
      features: ["8 graphic posts", "basic copywriting", "1 revision per post", "brand style alignment"],
      highlighted: false,
    },
    {
      name: "Multimedia",
      price: "R4500",
      period: "/ month",
      features: ["12 graphic posts", "4 short-form videos", "premium copywriting", "content strategy", "unlimited revisions"],
      highlighted: true,
    },
    {
      name: "Full Studio",
      price: "R8500+",
      period: "/ month",
      features: ["unlimited graphics", "8+ videos", "product photography session", "full brand guide", "priority support"],
      highlighted: false,
    },
  ];
  const targetAudience = ["Brands needing a professional visual upgrade", "Creators wanting high-end video content", "E-commerce businesses with products to showcase", "Service providers building authority", "Marketing teams needing external creative support"];

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
                <PenTool className="h-4 w-4" /> Content Creation
              </div>
            </HeroSection>
            <HeroSection delay={0.1}>
              <h1 className="text-5xl font-black leading-[0.85] md:text-8xl lg:text-9xl text-foreground tracking-[-0.06em] mb-12 uppercase">
                Design That <span className="text-gradient">Engages</span>
              </h1>
            </HeroSection>
            <HeroSection delay={0.2}>
              <p className="mt-8 text-xl md:text-2xl text-foreground/50 font-bold uppercase tracking-widest leading-relaxed max-w-3xl mx-auto">
                We create the graphics, videos, and copy that help your brand stand out and connect with your audience.
              </p>
            </HeroSection>
            <HeroSection delay={0.3}>
              <div className="flex flex-wrap justify-center gap-6 mt-16">
                <Button
                  onClick={() => openBooking({
                    service: "Content Creation",
                    package: "General Inquiry",
                    price: 0
                  })}
                  size="lg"
                  className="h-20 px-16 text-xs font-black rounded-full uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95 red-glow cursor-pointer btn-primary"
                >
                  Start Creating <ArrowRight className="h-4 w-4 ml-4" />
                </Button>
              </div>
            </HeroSection>
          </div>
        </div>
      </section>

      <section className="section-padding bg-alternate border-y border-foreground/5">
        <div className="content-width">
          <FadeInSection className="max-w-4xl mx-auto text-center mb-24">
            <h2 className="mb-8 text-gradient">The Quality Gap</h2>
            <p className="text-xl font-bold uppercase tracking-widest text-foreground/50">In a visual-first world, poor quality content reflects directly on your business credibility.</p>
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
              We help you present yourself as professionally as the services you provide.
            </p>
          </FadeInSection>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="content-width">
          <FadeInSection className="max-w-4xl mx-auto text-center mb-24">
            <h2 className="mb-8 text-gradient">Creative Capabilities</h2>
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
        <div className="container mx-auto px-4 text-center">
          <FadeInSection>
            <h2 className="text-3xl font-bold md:text-4xl text-white">Content We <span className="text-primary">Produce</span></h2>
          </FadeInSection>
          <StaggerContainer className="mt-12 flex flex-wrap justify-center gap-4">
            {contentWeProduce.map((item) => (
              <StaggerItem key={item}>
                <div className="rounded-full border border-primary/20 bg-primary/5 px-6 py-2 text-sm font-medium text-white">
                  {item}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <FadeInSection delay={0.2}>
            <p className="mt-8 text-sm text-muted-foreground">
              Content optimized for the platforms where your audience spends time.
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

      <section className="bg-background py-20">
        <div className="container mx-auto px-4 text-center">
          <FadeInSection>
            <h2 className="text-3xl font-bold md:text-4xl text-white mb-6">Content That <span className="text-primary">Drives Results</span></h2>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
              Great content does more than look good — it helps your brand connect with the right audience and grow its visibility online.
            </p>
          </FadeInSection>
          <FadeInSection delay={0.1} className="mx-auto mt-10 max-w-3xl">
            <p className="text-sm text-muted-foreground mb-6">Our content strategies focus on creating visuals and messaging that attract attention and encourage engagement.</p>
            <StaggerContainer className="mt-6 flex flex-wrap justify-center gap-4">
              {[
                "stronger brand recognition",
                "increased social media engagement",
                "more consistent brand identity",
                "higher quality perception from customers",
              ].map((item) => (
                <StaggerItem key={item}>
                  <div className="rounded-full border border-primary/20 bg-primary/5 px-6 py-2 text-sm font-medium text-white">
                    {item}
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <p className="mx-auto mt-10 max-w-3xl text-lg text-muted-foreground">
              Professional content helps position your business as credible, trustworthy, and worth paying attention to.
            </p>
          </FadeInSection>
        </div>
      </section>

      <section id="packages" className="section-padding bg-alternate border-y border-foreground/5">
        <div className="content-width">
          <FadeInSection className="max-w-4xl mx-auto text-center mb-24">
            <h2 className="mb-8 text-gradient leading-[0.85] tracking-[-0.06em]">
              Creative Subscriptions
            </h2>
            <p className="text-xl font-bold uppercase tracking-widest text-foreground/50">High-volume production for high-growth brands.</p>
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
                    service: "Content Creation",
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
            <h2 className="text-3xl font-bold md:text-4xl text-white mb-6">Recent <span className="text-primary">Creative Work</span></h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
              Explore examples of graphics, videos, and visual content created for brands, creators, and businesses.
            </p>
            <div className="mx-auto mb-10 max-w-3xl">
              <ul className="grid gap-3 text-left sm:grid-cols-2">
                {[
                  "Instagram graphics and social media posts",
                  "short-form video content for Reels and TikTok",
                  "product photography",
                  "promotional brand visuals",
                  "marketing campaign creatives",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 shrink-0 text-primary" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <Button asChild size="lg" className="px-10 h-14 text-lg" variant="outline">
              <Link to="/portfolio">View Full Portfolio</Link>
            </Button>
          </FadeInSection>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="text-center text-3xl font-bold md:text-4xl text-white mb-12">
              Trusted by <span className="text-primary">Growing Brands</span>
            </h2>
          </FadeInSection>
          <StaggerContainer className="grid gap-8 md:grid-cols-3">
            {[
              "“Kasilam Media completely transformed our online presence. Our content now looks professional and our engagement has improved significantly.”",
              "“The team understands branding and storytelling. The visuals they created elevated the way our brand is perceived.”",
              "“Working with Kasilam Media helped us maintain consistent and professional content across our platforms.”",
            ].map((quote) => (
              <StaggerScaleItem key={quote}>
                <Card className="h-full border-border bg-muted p-8">
                  <p className="text-sm text-muted-foreground leading-relaxed">{quote}</p>
                </Card>
              </StaggerScaleItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <FadeInSection className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl text-white mb-6">
              Our <span className="text-primary">Commitment</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              At Kasilam Media Productions, we believe every brand deserves content that reflects its true value.
            </p>
          </FadeInSection>
          <StaggerContainer className="mx-auto mt-12 max-w-3xl">
            <div className="grid gap-4">
              {[
                "deliver professional visual quality",
                "maintain consistent brand identity",
                "create content that captures attention",
                "support businesses as they grow",
              ].map((item) => (
                <StaggerItem key={item} className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-white font-medium">{item}</span>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
          <FadeInSection delay={0.2} className="mx-auto mt-10 max-w-3xl text-center">
            <p className="text-lg text-muted-foreground">
              We approach every project with creativity, care, and a focus on long-term brand impact.
            </p>
          </FadeInSection>
        </div>
      </section>

      <section className="section-padding relative overflow-hidden bg-background text-center border-t border-foreground/5">
        <div className="absolute inset-0 mesh-bg opacity-10 dark:opacity-30" />
        <div className="content-width relative z-10">
          <HeroSection>
            <h2 className="text-5xl md:text-8xl lg:text-9xl font-black mb-12 text-gradient leading-[0.85] tracking-[-0.06em]">
              Elevate Your<br />Content Now
            </h2>
          </HeroSection>
          <FadeInSection delay={0.2}>
            <p className="mx-auto max-w-4xl text-xl md:text-2xl text-foreground/50 mb-20 font-bold uppercase tracking-[0.2em] leading-relaxed">
              Great content does more than look good — it helps your brand connect with the right audience and grow its visibility online.
            </p>
          </FadeInSection>
          <FadeInSection delay={0.3}>
            <div className="flex flex-wrap justify-center gap-8">
              <Button
                onClick={() => openBooking({
                  service: "Content Creation",
                  package: "General Project",
                  price: 0
                })}
                size="lg"
                className="h-20 px-16 text-xs font-black rounded-full uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95 red-glow cursor-pointer btn-primary"
              >
                Request A Quote <ArrowRight className="h-4 w-4 ml-4" />
              </Button>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
};

export default ContentCreation;

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
      <section className="relative overflow-hidden bg-background py-20 md:py-28">
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <HeroSection>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <PenTool className="h-4 w-4" /> Content Creation
              </div>
            </HeroSection>
            <HeroSection delay={0.1}>
              <h1 className="text-4xl font-black leading-tight md:text-5xl lg:text-6xl text-white">
                Professional Content Designed To <span className="text-primary">Engage</span>
              </h1>
            </HeroSection>
            <HeroSection delay={0.2}>
              <p className="mt-6 text-lg text-muted-foreground">
                We create the graphics, videos, and copy that help your brand stand out and connect with your audience.
              </p>
            </HeroSection>
            <HeroSection delay={0.3}>
              <Button 
                onClick={() => openBooking({
                  service: "Content Creation",
                  package: "General Inquiry",
                  price: 0
                })}
                size="lg" 
                className="mt-8 gap-2 cursor-pointer"
              >
                Start Creating <ArrowRight className="h-4 w-4" />
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
              In a visual-first world, poor quality content reflects directly on how customers perceive your business.
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
              We help businesses present themselves as professionally as the services they provide.
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

      <section className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="text-center text-3xl font-bold md:text-4xl text-white mb-4">Flexible <span className="text-primary">Pricing</span></h2>
            <p className="mx-auto mb-12 max-w-3xl text-center text-muted-foreground">
              Monthly creative production packages designed for growing brands.
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
                  <Button 
                    onClick={() => openBooking({
                      service: "Content Creation",
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

      <section className="py-20 bg-background text-center">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="text-3xl font-bold md:text-4xl text-white mb-6">Ready to Elevate Your Content?</h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
              Professional content is one of the most powerful investments a brand can make.
              <br />
              Let&apos;s create visuals, videos, and messaging that truly represent your business and connect with your audience.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                onClick={() => openBooking({
                  service: "Content Creation",
                  package: "Quote Request",
                  price: 0
                })}
                size="lg" 
                className="px-10 h-14 text-lg cursor-pointer"
              >
                Request a Quote
              </Button>
              <Button 
                onClick={() => openBooking({
                  service: "Content Creation",
                  package: "Project Kickoff",
                  price: 0
                })}
                size="lg" 
                className="px-10 h-14 text-lg cursor-pointer" 
                variant="outline"
              >
                Start Your Project
              </Button>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
};

export default ContentCreation;

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Camera,
  Video,
  CheckCircle,
  ArrowRight,
  Heart,
  Users,
  Award,
  Clock,
  Zap,
  MessageSquare,
  Clapperboard,
  Palette,
  Briefcase,
  Music2,
  Users2,
} from "lucide-react";
import { useBooking } from "@/contexts/BookingContext";
import heroImage from "@/images/hero-bg.png";
import { FadeInSection, HeroSection, StaggerContainer, StaggerItem, ScaleIn } from "@/components/animations";
import { useEffect, useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

const photographyServices = [
  "Weddings & Traditional Ceremonies",
  "Funerals & Memorial Services",
  "Graduation Ceremonies",
  "Birthday & Family Celebrations",
  "Baby Showers & Unveilings",
  "Community & Religious Events",
  "Corporate & Business Events",
  "Brand & Product Photography",
];

const videographyServices = [
  "Full Event Coverage",
  "Cinematic Wedding Films",
  "Funeral & Memorial Documentation",
  "Graduation Highlights",
  "Community Storytelling",
  "Promotional & Brand Videos",
  "Music Videos",
  "Social Media Content Creation",
];

const StudioVisuals = () => {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <div ref={ref} className="absolute inset-0 z-0 overflow-hidden bg-[#050505]">
      {/* Cinematic Background Image with Parallax */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0 opacity-40 scale-110"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=1920&q=80')`,
          }}
        />
      </motion.div>
      
      {/* Cinematic Overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/10 via-background/70 to-background" />
      
      {/* Studio Lighting Highlights (Neon & Warm) */}
      <div className="absolute inset-0 z-11">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_15%_25%,rgba(220,38,38,0.12),transparent_40%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_85%_15%,rgba(30,64,175,0.1),transparent_45%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_40%,rgba(251,191,36,0.03),transparent_50%)]" />
      </div>
      
      {/* Subtle Floating Particles */}
      <div className="absolute inset-0 z-12 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] bg-white/30 rounded-full"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: 0
            }}
            animate={{
              y: ["0%", "-20%"],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10
            }}
          />
        ))}
      </div>

      {/* Dynamic Lighting Glow */}
      <motion.div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-600/5 blur-[150px] rounded-full z-11"
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

const productionTypes = [
  {
    title: "Community Events",
    desc: "Photography and videography for life's important moments.",
    icon: Users2,
    includes: [
      "Weddings",
      "Funerals & Memorials",
      "Graduations",
      "Birthday Parties",
      "Baby Showers",
      "Traditional Ceremonies",
      "Family Gatherings",
    ],
    buttonText: "View Event Packages",
    link: "/services/visual-production/community-events",
  },
  {
    title: "Creators & Artists",
    desc: "Visual production for musicians, influencers, and content creators.",
    icon: Music2,
    includes: [
      "Music Videos",
      "YouTube & Podcast Content",
      "Social Media Content",
      "Creative Photoshoots",
      "Artist Visual Campaigns",
    ],
    buttonText: "Start a Creative Project",
    link: "/services/visual-production/creators-artists",
  },
  {
    title: "Business & Corporate",
    desc: "Professional visual content designed for companies and brands.",
    icon: Briefcase,
    includes: [
      "Corporate Events",
      "Promotional Videos",
      "Brand Storytelling",
      "Product Photography",
      "Marketing Content",
    ],
    buttonText: "Request Business Production",
    link: "/services/visual-production/business-corporate",
  },
];

const packages = [
  {
    time: "2-Hour Coverage",
    ideal: "Ideal for small celebrations and short events.",
    features: [
      "Professional photographer or videographer",
      "Coverage of key moments",
      "Selected edited highlights",
      "Digital delivery",
    ],
  },
  {
    time: "4-Hour Coverage",
    ideal: "Suitable for medium-sized gatherings such as graduations and traditional ceremonies.",
    features: [
      "Comprehensive event coverage",
      "Multiple creative angles",
      "Professionally edited gallery or video",
      "Color grading",
    ],
  },
  {
    time: "6-Hour Coverage",
    ideal: "Designed for larger events requiring extended documentation.",
    features: [
      "Extended event coverage",
      "Cinematic storytelling approach",
      "Priority editing and delivery",
      "45-minute grace period",
    ],
  },
];

const processSteps = [
  {
    icon: MessageSquare,
    title: "Concept",
    desc: "We discuss your vision, goals, and event details to create a clear creative direction.",
  },
  {
    icon: Camera,
    title: "Planning",
    desc: "We organize logistics including location planning, scheduling, and production preparation.",
  },
  {
    icon: Clapperboard,
    title: "Production",
    desc: "Professional filming or photography using industry-grade equipment and creative direction.",
  },
  {
    icon: Palette,
    title: "Post-Production",
    desc: "Professional editing, color grading, and final delivery of high-quality visual content.",
  },
];

const VisualProduction = () => {
  const { openBooking } = useBooking();

  useEffect(() => {
    document.title = "KMP | Professional Visual Production in Port Elizabeth | Videography & Photography";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Kasilam Media Productions (KMP) provides professional videography and photography in Port Elizabeth (Gqeberha), Eastern Cape. Cinematic event coverage, corporate video production, and wedding documentation across South Africa.");
    }
  }, []);

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
        <StudioVisuals />

        <div className="content-width relative z-20 text-center">
          <HeroSection className="mb-10 flex justify-center">
            <div className="px-6 py-2 rounded-full bg-foreground/5 border border-foreground/10 red-glow backdrop-blur-xl dark:bg-white/5 dark:border-white/10">
              <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.4em]">
                KMP Visual Production
              </span>
            </div>
          </HeroSection>
          <HeroSection delay={0.1}>
            <h1 className="mb-8 text-gradient">
              KMP Visual Production<br />
              <span className="text-primary italic">For Port Elizabeth's Moments.</span>
            </h1>
          </HeroSection>
          <HeroSection delay={0.2}>
            <p className="mx-auto mt-8 max-w-3xl text-lg md:text-2xl font-semibold uppercase tracking-[0.2em] text-foreground/60 leading-relaxed">
              Capturing the heart of Gqeberha and South Africa with Kasilam Media Productions (KMP) — from cinematic videography and event coverage to professional photography and storytelling.
            </p>
          </HeroSection>
          <HeroSection delay={0.35}>
            <div className="mt-16 flex flex-wrap justify-center gap-6">
              <Button
                onClick={() => openBooking({
                  service: "Visual Production",
                  package: "General Shoot",
                  price: 1500
                })}
                variant="red"
                size="lg"
                className="h-20 px-16 text-xs font-black rounded-full uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                Book a Shoot <ArrowRight className="h-4 w-4 ml-4" />
              </Button>
              <Button asChild variant="black" size="lg" className="h-20 px-16 text-xs font-black rounded-full uppercase tracking-[0.4em] transition-all">
                <a href="#production-types">View Packages</a>
              </Button>
            </div>
          </HeroSection>
        </div>
      </section>

      {/* Local Context Section */}
      <section className="py-12 bg-background relative overflow-hidden border-b border-foreground/5">
        <div className="content-width">
          <p className="text-center text-foreground/40 text-sm font-medium leading-relaxed max-w-4xl mx-auto">
            Kasilam Media Productions is a leading choice for <strong>videography Port Elizabeth</strong> and <strong>video production Eastern Cape</strong>. We specialize in <strong>corporate video South Africa</strong> and <strong>event videography Gqeberha</strong>, ensuring every project meets global standards while serving our local community.
          </p>
        </div>
      </section>

      {/* 2. Choose Your Production Type */}
      <section id="production-types" className="section-padding relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="content-width">
          <FadeInSection className="max-w-4xl mx-auto text-center mb-32">
            <h2 className="mb-8 text-gradient">Choose Your Production Type</h2>
            <p className="text-xl font-medium uppercase tracking-widest text-foreground/50">Select the service that best fits your vision.</p>
          </FadeInSection>
          <StaggerContainer className="grid md:grid-cols-3 gap-10">
            {productionTypes.map((type) => (
              <StaggerItem key={type.title}>
                <div className="premium-card group h-full">
                  <div className="mb-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-foreground/5 border border-foreground/5 group-hover:border-red-600/30 group-hover:scale-110 transition-all duration-700 dark:bg-white/5 dark:border-white/5">
                    <type.icon className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-3xl font-bold mb-6 uppercase tracking-tight">{type.title}</h3>
                  <p className="text-lg text-foreground/50 mb-10 font-medium leading-relaxed">{type.desc}</p>
                  <div className="space-y-4 mb-12 flex-grow">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600 mb-6 font-primary">Includes:</p>
                    {type.includes.map((item) => (
                      <div key={item} className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-foreground/80">
                        <div className="h-1.5 w-1.5 rounded-full bg-red-600 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <Button asChild variant="black" className="w-full h-14 font-black transition-all uppercase tracking-widest text-[10px] rounded-full">
                    <Link to={type.link}>{type.buttonText}</Link>
                  </Button>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 3. Photography Services */}
      <section className="section-padding bg-zinc-950 relative overflow-hidden">
        <div className="content-width">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <FadeInSection className="space-y-12">
              <div className="flex items-center gap-6">
                <div className="h-16 w-1 bg-red-600 rounded-full red-glow" />
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-foreground/80">Photography</h2>
              </div>
              <p className="text-xl text-foreground/50 leading-relaxed font-medium">
                Capturing moments with absolute clarity, dignity, and professional precision.
              </p>
              <div className="space-y-6">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600 mb-6">Available Services:</p>
                <StaggerContainer className="grid sm:grid-cols-2 gap-6">
                  {photographyServices.map((service) => (
                    <StaggerItem key={service}>
                      <div className="flex items-center gap-4 p-5 rounded-2xl bg-foreground/5 border border-foreground/5 group hover:border-red-600/30 transition-all dark:bg-white/5 dark:border-white/5">
                        <CheckCircle className="h-4 w-4 text-red-600 shrink-0" />
                        <span className="text-[11px] font-black uppercase tracking-widest text-foreground/80">{service}</span>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </FadeInSection>
            <FadeInSection delay={0.2} className="aspect-square bg-foreground/5 rounded-[3rem] border border-foreground/5 overflow-hidden flex items-center justify-center relative group dark:bg-white/5 dark:border-white/5">
              <Camera className="h-32 w-32 text-foreground/5 group-hover:text-red-600/10 transition-all duration-1000 scale-90 group-hover:scale-110 dark:text-white/5" />
              <div className="absolute inset-0 bg-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* 4. Videography Services */}
      <section className="section-padding bg-background relative border-b border-foreground/5">
        <div className="content-width">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <FadeInSection delay={0.1} className="order-2 lg:order-1 aspect-video bg-foreground/5 rounded-[3rem] border border-foreground/5 overflow-hidden flex items-center justify-center relative group dark:bg-white/5 dark:border-white/5">
              <Video className="h-32 w-32 text-foreground/5 group-hover:text-red-600/10 transition-all duration-1000 scale-90 group-hover:scale-110 dark:text-white/5" />
              <div className="absolute inset-0 bg-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            </FadeInSection>
            <FadeInSection className="space-y-12 order-1 lg:order-2">
              <div className="flex items-center gap-6">
                <div className="h-16 w-1 bg-red-600 rounded-full red-glow" />
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-foreground/80">Videography</h2>
              </div>
              <p className="text-xl text-foreground/50 leading-relaxed font-medium">
                Cinematic documentation that preserves your story forever. We bring Hollywood-grade precision to community and corporate events.
              </p>
              <div className="space-y-6">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600 mb-6">Available Services:</p>
                <StaggerContainer className="space-y-5">
                  {videographyServices.map((service) => (
                    <StaggerItem key={service}>
                      <div className="flex items-center gap-5 p-5 rounded-2xl bg-foreground/5 border border-foreground/5 group hover:bg-foreground/[0.08] transition-all dark:bg-white/[0.03] dark:border-white/5">
                        <div className="h-2 w-2 rounded-full bg-red-600 group-hover:scale-150 transition-all duration-500 red-glow" />
                        <span className="text-[11px] font-black uppercase tracking-widest text-foreground/90">{service}</span>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* 5. Combo Coverage - Cinematic Re-design */}
      <section className="py-40 bg-alternate relative overflow-hidden border-b border-foreground/5">
        <div className="absolute inset-0 mesh-bg opacity-10 dark:opacity-20" />
        <div className="content-width relative z-10 text-center">
          <FadeInSection>
            <div className="inline-block px-8 py-3 rounded-full bg-red-600/10 border border-red-600/20 mb-12">
              <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.5em]">The Ultimate Standard</span>
            </div>
          </FadeInSection>
          <HeroSection delay={0.1}>
            <h2 className="text-5xl md:text-8xl font-black mb-12 text-gradient tracking-tight leading-[0.9]">
              Photo + Video<br />Combo Coverage.
            </h2>
          </HeroSection>
          <FadeInSection delay={0.2}>
            <p className="max-w-4xl mx-auto text-xl md:text-2xl font-semibold text-foreground/50 leading-relaxed uppercase tracking-[0.1em]">
              Ideal for weddings, funerals, and corporate events. Complete visual storytelling with dual-media documentation.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* 6. Creative Process */}
      <section className="section-padding bg-background">
        <div className="content-width">
          <FadeInSection className="max-w-4xl mx-auto text-center mb-32">
            <h2 className="mb-8 text-gradient">Our Creative Process</h2>
            <p className="text-xl font-medium uppercase tracking-widest text-foreground/50">Structured for elite results and absolute reliability.</p>
          </FadeInSection>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {processSteps.map((step) => (
              <StaggerItem key={step.title} className="text-center group">
                <div className="mx-auto mb-10 flex h-20 w-20 items-center justify-center rounded-[2.5rem] bg-foreground/5 border border-foreground/5 group-hover:border-red-600/30 group-hover:-rotate-12 transition-all duration-700 dark:bg-white/5 dark:border-white/5">
                  <step.icon className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 uppercase tracking-tighter">{step.title}</h3>
                <p className="text-base text-foreground/40 leading-relaxed font-medium">{step.desc}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 7. Coverage Packages */}
      <section id="packages" className="section-padding bg-alternate border-y border-foreground/5">
        <div className="content-width">
          <FadeInSection className="max-w-4xl mx-auto text-center mb-32">
            <h2 className="mb-8 text-gradient">Coverage Packages</h2>
            <p className="text-xl font-medium uppercase tracking-widest text-foreground/50">Time-based documentation for private and community events.</p>
          </FadeInSection>
          <StaggerContainer className="grid md:grid-cols-3 gap-10 mb-20">
            {packages.map((pkg) => (
              <StaggerItem key={pkg.time}>
                <div className="premium-card group h-full">
                  <h3 className="text-2xl font-black text-red-600 mb-6 uppercase tracking-tight">{pkg.time}</h3>
                  <p className="text-base text-foreground/50 mb-12 font-medium leading-relaxed">{pkg.ideal}</p>
                  <div className="space-y-6 mb-16 flex-grow">
                    {pkg.features.map(f => (
                      <div key={f} className="flex items-center gap-5 text-[11px] font-black uppercase tracking-widest text-foreground/80">
                        <CheckCircle className="h-4 w-4 text-red-600 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => openBooking({
                      service: "Visual Production",
                      package: pkg.time,
                      price: pkg.time.includes("2") ? 1500 : pkg.time.includes("4") ? 2800 : 4000
                    })}
                    variant="black"
                    className="w-full h-14 font-black transition-all uppercase tracking-widest text-[10px] rounded-full cursor-pointer"
                  >
                    Inquire Now
                  </Button>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          
          <div className="text-center">
            <p className="hidden md:block text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40 mt-12 mb-8">
              Click on a package card to start your booking process.
            </p>
            <p className="md:hidden text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40 mt-12 mb-8">
              Tap a package card to start your booking process.
            </p>
          </div>
        </div>
      </section>

      {/* 8. Portfolio Preview */}
      <section className="section-padding bg-background">
        <div className="content-width">
          <FadeInSection className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-10">
            <div className="max-w-2xl mx-auto md:mx-0">
              <h2 className="text-gradient">Selected Work</h2>
              <p className="text-xl text-foreground/50 font-medium mt-6">Moments captured and stories told with cinematic precision.</p>
            </div>
            <Button asChild variant="link" className="h-auto p-0 text-red-600 font-black uppercase tracking-[0.3em] text-[10px] group transition-all mx-auto md:mx-0">
              <Link to="/portfolio" className="flex items-center gap-4">
                Full Portfolio <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-3" />
              </Link>
            </Button>
          </FadeInSection>
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <StaggerItem key={i}>
                <div className="premium-card p-0 aspect-[4/3] flex items-center justify-center group overflow-hidden relative border-foreground/5 hover:border-red-600/50">
                  <Camera className="h-12 w-12 text-foreground/10 group-hover:text-red-600/30 transition-all duration-1000 scale-90 group-hover:scale-125 dark:text-white/10" />
                  <div className="absolute inset-0 bg-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 9. Why Document With Us? */}
      <section className="section-padding bg-background border-t border-foreground/5">
        <div className="content-width">
          <FadeInSection>
            <h2 className="text-center mb-32 text-gradient">Why Document With Us?</h2>
          </FadeInSection>
          <StaggerContainer className="grid gap-16 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Zap, title: "Reliable Coverage", desc: "A professional and dependable presence ensuring important moments are never missed." },
              { icon: Award, title: "Premium Production", desc: "High-quality photo and video production using professional equipment and techniques." },
              { icon: Heart, title: "Respectful Storytelling", desc: "A human-centered approach to documenting meaningful life events." },
              { icon: Users, title: "Local Connection", desc: "Deep understanding of community traditions and cultural events in Gqeberha." },
              { icon: Clock, title: "Efficient Delivery", desc: "Clear communication and structured timelines from booking to delivery." },
              { icon: CheckCircle, title: "Corporate Standard", desc: "Capable of serving both community events and professional business productions." },
            ].map((reason) => (
              <StaggerItem key={reason.title} className="flex gap-8 group">
                <div className="h-16 w-16 rounded-[2rem] bg-foreground/5 border border-foreground/5 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-700 dark:bg-white/5 dark:border-white/5">
                  <reason.icon className="h-7 w-7 text-red-600 group-hover:text-white transition-colors" />
                </div>
                <div className="space-y-3">
                  <h4 className="font-bold text-2xl uppercase tracking-tighter">{reason.title}</h4>
                  <p className="text-base text-foreground/40 leading-relaxed font-medium">{reason.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 10. Final CTA */}
      <section className="section-padding relative overflow-hidden bg-background text-center border-t border-foreground/5">
        <div className="absolute inset-0 mesh-bg opacity-10 dark:opacity-30" />
        <div className="content-width relative z-10">
          <HeroSection>
            <h2 className="text-5xl md:text-8xl lg:text-9xl font-black mb-12 text-gradient leading-[0.85] tracking-[-0.06em]">
              Let's Capture<br />Your Story.
            </h2>
          </HeroSection>
          <FadeInSection delay={0.2}>
            <p className="mx-auto max-w-4xl text-xl md:text-2xl text-foreground/50 mb-20 font-semibold uppercase tracking-[0.2em] leading-relaxed">
              Ready to document your next milestone or create elite visual content?
            </p>
          </FadeInSection>
          <FadeInSection delay={0.3}>
            <div className="flex flex-wrap justify-center gap-8">
              <Button
                onClick={() => openBooking({
                  service: "Visual Production",
                  package: "General Inquiry",
                  price: 0
                })}
                variant="red"
                size="lg"
                className="h-20 px-16 text-xs font-black rounded-full uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                Book a Shoot
              </Button>
              <Button asChild variant="black" size="lg" className="h-20 px-16 text-xs font-black rounded-full uppercase tracking-[0.4em] transition-all">
                <Link to="/contact">Request Consultation</Link>
              </Button>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
};

export default VisualProduction;

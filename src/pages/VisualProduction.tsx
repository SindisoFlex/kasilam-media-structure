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
import heroImage from "@/images/hero-bg.png";

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

const productionTypes = [
  {
    title: "Community Events",
    desc: "Photography and videography for life’s important moments.",
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
  return (
    <div className="bg-background text-white min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0 scale-105 animate-subtle-zoom opacity-30"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 z-10 bg-background/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 z-11 mesh-bg opacity-40" />

        <div className="content-width relative z-20 text-center">
          <div className="mb-10 flex justify-center animate-fade-in">
            <div className="px-6 py-2 rounded-full bg-white/5 border border-white/10 red-glow backdrop-blur-xl">
              <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.4em]">
                Visual Production
              </span>
            </div>
          </div>
          <h1 className="animate-fade-in mb-8 text-gradient">
            Professional Visual Production<br />
            <span className="text-primary italic">For Gqeberha's Moments.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-3xl animate-fade-in text-lg md:text-2xl font-semibold uppercase tracking-[0.2em] text-white/50 leading-relaxed" style={{ animationDelay: "150ms" }}>
            Capturing the heart of our community — from weddings and graduations to respectful funeral coverage and local celebrations.
          </p>
          <div className="mt-16 flex animate-fade-in flex-wrap justify-center gap-6" style={{ animationDelay: "300ms" }}>
            <Button asChild size="lg" className="h-20 px-16 text-xs font-black bg-red-600 hover:bg-red-700 text-white border-0 rounded-full uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95 red-glow">
              <Link to="/booking">
                Book a Shoot <ArrowRight className="h-4 w-4 ml-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-20 px-16 text-xs font-black bg-white/5 backdrop-blur-md border-white/10 text-white rounded-full uppercase tracking-[0.4em] hover:bg-white/10 hover:border-red-600/50">
              <a href="#production-types">View Packages</a>
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Choose Your Production Type */}
      <section id="production-types" className="section-padding relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="content-width">
          <div className="max-w-4xl mx-auto text-center mb-32">
            <h2 className="mb-8 text-gradient">Choose Your Production Type</h2>
            <p className="text-xl font-medium uppercase tracking-widest opacity-50">Select the service that best fits your vision.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {productionTypes.map((type) => (
              <div key={type.title} className="premium-card group h-full">
                <div className="mb-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/5 group-hover:border-red-600/30 group-hover:scale-110 transition-all duration-700">
                  <type.icon className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-6 uppercase tracking-tight">{type.title}</h3>
                <p className="text-lg text-white/50 mb-10 font-medium leading-relaxed">{type.desc}</p>
                <div className="space-y-4 mb-12 flex-grow">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600 mb-6">Includes:</p>
                  {type.includes.map((item) => (
                    <div key={item} className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-white/80">
                      <div className="h-1.5 w-1.5 rounded-full bg-red-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <Button asChild className="w-full h-14 bg-white/5 hover:bg-red-600 text-white font-black border border-white/10 hover:border-red-600 transition-all uppercase tracking-widest text-[10px] rounded-full">
                  <Link to={type.link}>{type.buttonText}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Photography Services */}
      <section className="section-padding bg-zinc-950 relative overflow-hidden">
        <div className="content-width">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div className="flex items-center gap-6">
                <div className="h-16 w-1 bg-red-600 rounded-full red-glow" />
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white">Photography</h2>
              </div>
              <p className="text-xl text-white/50 leading-relaxed font-medium">
                Capturing moments with absolute clarity, dignity, and professional precision.
              </p>
              <div className="space-y-6">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600 mb-6">Available Services:</p>
                <div className="grid sm:grid-cols-2 gap-6">
                  {photographyServices.map((service) => (
                    <div key={service} className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/5 group hover:border-red-600/30 transition-all">
                      <CheckCircle className="h-4 w-4 text-red-600 shrink-0" />
                      <span className="text-[11px] font-black uppercase tracking-widest text-white/80">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="aspect-square bg-white/5 rounded-[3rem] border border-white/5 overflow-hidden flex items-center justify-center relative group">
              <Camera className="h-32 w-32 text-white/5 group-hover:text-red-600/10 transition-all duration-1000 scale-90 group-hover:scale-110" />
              <div className="absolute inset-0 bg-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Videography Services */}
      <section className="section-padding bg-background relative">
        <div className="content-width">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 aspect-video bg-white/5 rounded-[3rem] border border-white/5 overflow-hidden flex items-center justify-center relative group">
              <Video className="h-32 w-32 text-white/5 group-hover:text-red-600/10 transition-all duration-1000 scale-90 group-hover:scale-110" />
              <div className="absolute inset-0 bg-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            </div>
            <div className="space-y-12 order-1 lg:order-2">
              <div className="flex items-center gap-6">
                <div className="h-16 w-1 bg-red-600 rounded-full red-glow" />
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white">Videography</h2>
              </div>
              <p className="text-xl text-white/50 leading-relaxed font-medium">
                Cinematic documentation that preserves your story forever. We bring Hollywood-grade precision to community and corporate events.
              </p>
              <div className="space-y-6">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600 mb-6">Available Services:</p>
                <div className="space-y-5">
                  {videographyServices.map((service) => (
                    <div key={service} className="flex items-center gap-5 p-5 rounded-2xl bg-white/[0.03] border border-white/5 group hover:bg-white/[0.05] transition-all">
                      <div className="h-2 w-2 rounded-full bg-red-600 group-hover:scale-150 transition-all duration-500 red-glow" />
                      <span className="text-[11px] font-black uppercase tracking-widest text-white/90">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Combo Coverage - Cinematic Re-design */}
      <section className="py-40 bg-zinc-950 relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg opacity-20" />
        <div className="content-width relative z-10 text-center">
          <div className="inline-block px-8 py-3 rounded-full bg-red-600/10 border border-red-600/20 mb-12">
            <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.5em]">The Ultimate Standard</span>
          </div>
          <h2 className="text-5xl md:text-8xl font-black mb-12 text-gradient tracking-tight leading-[0.9]">
            Photo + Video<br />Combo Coverage.
          </h2>
          <p className="max-w-4xl mx-auto text-xl md:text-2xl font-semibold text-white/50 leading-relaxed uppercase tracking-[0.1em]">
            Ideal for weddings, funerals, and corporate events. Complete visual storytelling with dual-media documentation.
          </p>
        </div>
      </section>

      {/* 6. Creative Process */}
      <section className="section-padding bg-background">
        <div className="content-width">
          <div className="max-w-4xl mx-auto text-center mb-32">
            <h2 className="mb-8 text-gradient">Our Creative Process</h2>
            <p className="text-xl font-medium uppercase tracking-widest opacity-50">Structured for elite results and absolute reliability.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {processSteps.map((step, i) => (
              <div key={step.title} className="text-center group">
                <div className="mx-auto mb-10 flex h-20 w-20 items-center justify-center rounded-[2rem] bg-white/5 border border-white/5 group-hover:border-red-600/30 group-hover:-rotate-12 transition-all duration-700">
                  <step.icon className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-tighter">{step.title}</h3>
                <p className="text-base text-white/40 leading-relaxed font-medium">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Coverage Packages */}
      <section id="packages" className="section-padding bg-zinc-950 border-y border-white/5">
        <div className="content-width">
          <div className="max-w-4xl mx-auto text-center mb-32">
            <h2 className="mb-8 text-gradient">Coverage Packages</h2>
            <p className="text-xl font-medium uppercase tracking-widest opacity-50">Time-based documentation for private and community events.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {packages.map((pkg) => (
              <div key={pkg.time} className="premium-card group h-full border-white/5 hover:border-red-600/50">
                <h3 className="text-2xl font-black text-red-600 mb-6 uppercase tracking-tight">{pkg.time}</h3>
                <p className="text-base text-white/50 mb-12 font-medium leading-relaxed">{pkg.ideal}</p>
                <div className="space-y-6 mb-16 flex-grow">
                  {pkg.features.map(f => (
                    <div key={f} className="flex items-center gap-5 text-[11px] font-black uppercase tracking-widest text-white/80">
                      <CheckCircle className="h-4 w-4 text-red-600 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <Button asChild variant="outline" className="w-full h-14 bg-white/5 border-white/10 hover:border-red-600 text-white font-black transition-all uppercase tracking-widest text-[10px] rounded-full">
                  <Link to="/booking">Inquire Now</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Portfolio Preview */}
      <section className="section-padding bg-background">
        <div className="content-width">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-10">
            <div className="max-w-2xl mx-auto md:mx-0">
              <h2 className="text-gradient">Selected Work</h2>
              <p className="text-xl text-white/50 font-medium mt-6">Moments captured and stories told with cinematic precision.</p>
            </div>
            <Button asChild variant="link" className="h-auto p-0 text-red-600 font-black uppercase tracking-[0.3em] text-[10px] group transition-all mx-auto md:mx-0">
              <Link to="/portfolio" className="flex items-center gap-4">
                Full Portfolio <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-3" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="premium-card p-0 aspect-[4/3] flex items-center justify-center group overflow-hidden relative border-white/5 hover:border-red-600/50">
                <Camera className="h-12 w-12 text-white/10 group-hover:text-red-600/30 transition-all duration-1000 scale-90 group-hover:scale-125" />
                <div className="absolute inset-0 bg-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Why Document With Us? */}
      <section className="section-padding bg-zinc-950">
        <div className="content-width">
          <h2 className="text-center mb-32 text-gradient">Why Document With Us?</h2>
          <div className="grid gap-16 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Zap, title: "Reliable Coverage", desc: "A professional and dependable presence ensuring important moments are never missed." },
              { icon: Award, title: "Premium Production", desc: "High-quality photo and video production using professional equipment and techniques." },
              { icon: Heart, title: "Respectful Storytelling", desc: "A human-centered approach to documenting meaningful life events." },
              { icon: Users, title: "Local Connection", desc: "Deep understanding of community traditions and cultural events in Gqeberha." },
              { icon: Clock, title: "Efficient Delivery", desc: "Clear communication and structured timelines from booking to delivery." },
              { icon: CheckCircle, title: "Corporate Standard", desc: "Capable of serving both community events and professional business productions." },
            ].map((reason) => (
              <div key={reason.title} className="flex gap-8 group">
                <div className="h-16 w-16 rounded-[2rem] bg-white/5 border border-white/5 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-700">
                  <reason.icon className="h-7 w-7 text-red-600 group-hover:text-white transition-colors" />
                </div>
                <div className="space-y-3">
                  <h4 className="text-white font-bold text-2xl uppercase tracking-tighter">{reason.title}</h4>
                  <p className="text-base text-white/40 leading-relaxed font-medium">{reason.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Final CTA */}
      <section className="section-padding relative overflow-hidden bg-background text-center">
        <div className="absolute inset-0 mesh-bg opacity-30" />
        <div className="content-width relative z-10">
          <h2 className="text-5xl md:text-8xl lg:text-9xl font-black mb-12 text-gradient leading-[0.85] tracking-[-0.06em]">
            Let’s Capture<br />Your Story.
          </h2>
          <p className="mx-auto max-w-4xl text-xl md:text-2xl text-white/50 mb-20 font-semibold uppercase tracking-[0.2em] leading-relaxed">
            Ready to document your next milestone or create elite visual content?
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <Button asChild size="lg" className="h-20 px-16 text-xs font-black bg-red-600 hover:bg-red-700 text-white border-0 rounded-full uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95 red-glow">
              <Link to="/booking">Book a Shoot</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-20 px-16 text-xs font-black bg-white/5 backdrop-blur-md border-white/10 text-white rounded-full uppercase tracking-[0.4em] hover:bg-white/10 hover:border-red-600/50">
              <Link to="/contact">Request Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VisualProduction;



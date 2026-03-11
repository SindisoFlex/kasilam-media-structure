import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mic, Camera, Globe, Zap, Users, Award, Clock, ArrowRight } from "lucide-react";
import heroBg from "@/images/hero-bg.png";

const steps = [
  { num: "01", title: "Consult", desc: "We understand your goals, vision, and expectations." },
  { num: "02", title: "Plan", desc: "We design a structured creative and digital strategy." },
  { num: "03", title: "Create", desc: "We produce high-quality media with precision and professionalism." },
  { num: "04", title: "Deliver", desc: "We deliver work that reflects excellence, intention, and impact." },
];

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 1. Hero Section - Cinematic & Professional */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0 scale-105 animate-subtle-zoom opacity-20"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 z-10 bg-background/40 backdrop-blur-[2px]" />
        <div className="absolute inset-0 z-11 mesh-bg opacity-50" />

        <div className="content-width relative z-20 text-center">
          <h1 className="animate-fade-in mb-8 text-gradient">
            Creative Media Studio for Modern Brands, Artists,
            <br />
            <span className="text-primary italic">and Life&apos;s Biggest Moments.</span>
          </h1>
          <p
            className="mx-auto mt-8 max-w-3xl animate-fade-in text-lg md:text-2xl font-semibold uppercase tracking-[0.2em] text-white/60"
            style={{ animationDelay: "150ms" }}
          >
            Professional media that makes brands look world-class. Powerful visuals, cinematic storytelling, and digital
            innovation designed to elevate growing businesses and bold creators.
          </p>
          <div className="mt-16 flex animate-fade-in flex-wrap justify-center gap-6" style={{ animationDelay: "300ms" }}>
            <Button
              asChild
              size="lg"
              className="h-16 px-12 text-[11px] font-black uppercase tracking-[0.3em] bg-red-600 hover:bg-red-700 text-white rounded-full transition-all hover:scale-105 active:scale-95 red-glow"
            >
              <Link to="/booking">
                Start Your Project <ArrowRight className="h-4 w-4 ml-3" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-16 px-12 text-[11px] font-black uppercase tracking-[0.3em] bg-white/5 backdrop-blur-md border-white/10 text-white rounded-full hover:bg-white/10 hover:border-red-600/50"
            >
              <Link to="/services">View Our Work</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Who We Help - Futuristic Grid */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="content-width">
          <div className="max-w-4xl mx-auto text-center mb-32">
            <h2 className="mb-8 text-gradient">Who We Work With</h2>
            <p className="text-xl font-medium uppercase tracking-widest opacity-50">
              Strategic creative services for leaders, creators, and communities.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="premium-card group">
              <div className="mb-8 h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-6">Businesses</h3>
              <p className="text-base mb-10 text-white/50 font-medium leading-relaxed">
                For entrepreneurs, startups, and growing businesses ready to build credibility and stand out in the digital world.
              </p>
              <div className="space-y-5 mb-12 flex-grow">
                {["Business websites", "Corporate photography", "Promotional videos", "Digital brand support"].map((item) => (
                  <div key={item} className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-white/80">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p className="font-black text-[10px] uppercase tracking-[0.4em] text-primary">Visibility & Trust</p>
            </div>

            <div className="premium-card group border-primary/20 bg-white/[0.03] scale-105 shadow-[0_0_100px_-20px_rgba(220,38,38,0.1)]">
              <div className="mb-8 h-12 w-12 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 red-glow">
                <Mic className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-6">Artists</h3>
              <p className="text-base mb-10 text-white/50 font-medium leading-relaxed">
                Helping musicians and creators produce professional sound and visuals that compete on a global stage.
              </p>
              <div className="space-y-5 mb-12 flex-grow">
                {["Music recording", "Voiceovers", "Music videos", "Audio editing & mixing"].map((item) => (
                  <div key={item} className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-white/80">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p className="font-black text-[10px] uppercase tracking-[0.4em] text-primary">Creativity & Impact</p>
            </div>

            <div className="premium-card group">
              <div className="mb-8 h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <Camera className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-6">Community</h3>
              <p className="text-base mb-10 text-white/50 font-medium leading-relaxed">
                For families preserving life&apos;s most important milestones with professionalism, respect, and care.
              </p>
              <div className="space-y-5 mb-12 flex-grow">
                {["Weddings", "Graduations", "Funerals & memorials", "Celebrations & events"].map((item) => (
                  <div key={item} className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-white/80">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p className="font-black text-[10px] uppercase tracking-[0.4em] text-primary">Preservation & Care</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Services Architecture */}
      <section className="section-padding bg-zinc-950 relative">
        <div className="content-width">
          <div className="max-w-4xl mx-auto text-center mb-32">
            <h2 className="mb-8 text-gradient">Services Architecture</h2>
            <p className="text-xl font-medium uppercase tracking-widest opacity-50">Bridging the gap between media and technology.</p>
          </div>
          <div className="grid gap-20 lg:grid-cols-2">
            <div className="space-y-16">
              <div className="flex items-center gap-6 mb-16">
                <div className="h-14 w-1 bg-red-600 rounded-full red-glow" />
                <h3 className="text-3xl font-black uppercase tracking-[0.3em] text-white">Core Identity</h3>
              </div>
              <div className="space-y-16 pl-8 border-l border-white/5">
                {[
                  { icon: Camera, title: "Photography", desc: "Events, weddings, graduations, lifestyle, and corporate photography." },
                  { icon: Mic, title: "Audio Production", desc: "Professional music recording, voiceovers, podcast production, and audio mixing." },
                  { icon: ArrowRight, title: "Videography", desc: "Event coverage, promotional videos, music videos, and cinematic storytelling." },
                ].map((s) => (
                  <div key={s.title} className="group transition-all">
                    <h4 className="text-2xl font-bold flex items-center gap-6 mb-4 group-hover:text-red-500 transition-colors">
                      <div className="rounded-2xl bg-white/5 p-4 border border-white/5 group-hover:border-red-600/30 transition-all">
                        <s.icon className="h-6 w-6 text-red-600" />
                      </div>
                      {s.title}
                    </h4>
                    <p className="text-lg text-white/50 leading-relaxed font-medium">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-16">
              <div className="flex items-center gap-6 mb-16">
                <div className="h-14 w-1 bg-white/20 rounded-full" />
                <h3 className="text-3xl font-black uppercase tracking-[0.3em] text-white/60">Growth Services</h3>
              </div>
              <div className="space-y-16 pl-8 border-l border-white/5">
                {[
                  { icon: Globe, title: "Web Development", desc: "Modern business, portfolio, and startup websites with full maintenance support." },
                  { icon: Zap, title: "Digital Marketing", desc: "Brand visibility strategies, social media content creation, and online presence optimization." },
                  { icon: Award, title: "AI & Automation", desc: "AI-assisted content creation and smart digital workflows that help businesses operate faster and more efficiently." },
                ].map((s) => (
                  <div key={s.title} className="group transition-all">
                    <h4 className="text-2xl font-bold flex items-center gap-6 mb-4 group-hover:text-red-500 transition-colors">
                      <div className="rounded-2xl bg-white/5 p-4 border border-white/5 group-hover:border-red-600/30 transition-all">
                        <s.icon className="h-6 w-6 text-red-600" />
                      </div>
                      {s.title}
                    </h4>
                    <p className="text-lg text-white/50 leading-relaxed font-medium">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Our Process - Methodical Layout */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="content-width">
          <div className="max-w-4xl mx-auto text-center mb-32">
            <h2 className="mb-8 text-gradient">The KMP Methodology</h2>
            <p className="text-xl font-medium uppercase tracking-widest opacity-50">Structured planning for elite results.</p>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.num} className="premium-card group h-full">
                <div className="flex items-center justify-between mb-12">
                  <span className="text-7xl font-black text-white/5 group-hover:text-red-600/10 transition-colors leading-none">{s.num}</span>
                </div>
                <h3 className="text-2xl font-bold mb-5 uppercase tracking-tight">{s.title}</h3>
                <p className="text-base leading-relaxed text-white/50 font-medium">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-24 text-center">
            <div className="inline-block px-10 py-5 rounded-full bg-white/5 border border-white/10 tech-border">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-red-600">Clear. Efficient. Professional.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Why Work With Us */}
      <section className="section-padding bg-zinc-950">
        <div className="content-width text-center">
          <h2 className="mb-32 text-gradient">Why Choose Our Studio?</h2>
          <div className="grid gap-20 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Award, title: "Strategic Thinking", desc: "Every project is designed with long-term brand growth in mind." },
              { icon: Users, title: "Inclusive Access", desc: "High-quality media production accessible to startups, artists, and corporate clients." },
              { icon: Zap, title: "Modern Technology", desc: "We integrate modern digital tools, AI, and creative innovation into every workflow." },
              { icon: Clock, title: "Reliable Delivery", desc: "Clear timelines, transparent communication, and professional results you can trust." },
            ].map((r) => (
              <div key={r.title} className="flex flex-col items-center group">
                <div className="mb-10 rounded-[2.5rem] bg-white/5 p-8 border border-white/5 group-hover:border-red-600/30 group-hover:-rotate-12 transition-all duration-700">
                  <r.icon className="h-8 w-8 text-red-600" />
                </div>
                <h4 className="font-bold text-2xl mb-6 uppercase tracking-tight tracking-[-0.03em]">{r.title}</h4>
                <p className="text-base text-white/40 leading-relaxed max-w-[260px] font-medium">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Portfolio Preview */}
      <section className="section-padding bg-background border-t border-white/5">
        <div className="content-width">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-10">
            <div className="max-w-2xl">
              <h2 className="mb-8 text-gradient">Selected Projects</h2>
              <p className="text-xl text-white/50 font-medium">
                Real stories captured through powerful visuals, cinematic video, and professional sound.
              </p>
            </div>
            <Button asChild variant="link" className="h-auto p-0 text-red-600 font-black uppercase tracking-[0.3em] text-[10px] group transition-all">
              <Link to="/portfolio" className="flex items-center gap-4">
                View Full Portfolio <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-3" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="premium-card p-0 aspect-video flex items-center justify-center group overflow-hidden relative border-white/5 hover:border-red-600/50">
                <Camera className="h-10 w-10 text-white/10 group-hover:text-red-600/30 transition-all duration-700 z-10 scale-90 group-hover:scale-125" />
                <div className="absolute inset-0 bg-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Commitment Section */}
      <section className="section-padding bg-background border-t border-white/5">
        <div className="content-width">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-8 text-gradient">Our Commitment</h2>
            <p className="text-xl text-white/50 font-medium leading-relaxed">
              At Kasilam Media Productions, every project is handled with professionalism, creativity, and attention to
              detail. We work closely with our clients to ensure every visual, sound, and digital experience reflects
              their vision and tells their story in a powerful and authentic way.
            </p>
          </div>
        </div>
      </section>

      {/* 8. Final CTA Section - Cinematic & Minimal */}
      <section className="section-padding relative overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 mesh-bg opacity-30" />
        <div className="content-width relative z-10 text-center">
          <h2 className="text-5xl md:text-8xl lg:text-9xl font-black mb-12 text-gradient leading-[0.85] tracking-[-0.06em]">
            Let&apos;s Bring Your
            <br />
            Vision to Life.
          </h2>
          <p className="mx-auto max-w-4xl text-xl md:text-2xl text-white/50 mb-20 font-semibold uppercase tracking-[0.2em] leading-relaxed">
            Creative media solutions for bold brands, growing businesses, and unforgettable moments.
          </p>
          <div className="flex justify-center flex-wrap gap-8">
            <Button
              asChild
              size="lg"
              className="h-20 px-16 text-xs font-black bg-red-600 hover:bg-red-700 text-white border-0 rounded-full uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95 red-glow"
            >
              <Link to="/booking">Start Your Project</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-20 px-16 text-xs font-black bg-white/5 backdrop-blur-md border-white/10 text-white rounded-full uppercase tracking-[0.4em] hover:bg-white/10 hover:border-red-600/50"
            >
              <Link to="/contact">Request Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

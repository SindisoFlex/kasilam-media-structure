import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, Camera, Globe, Zap, Users, Award, Clock, ArrowRight, CheckCircle } from "lucide-react";
import logo from "@/images/kmp.svg";
import heroBg from "@/images/hero-bg.png";

const pillars = [
  { icon: Camera, title: "Photography", desc: "Professional event and corporate photography tailored to represent you properly." },
  { icon: Mic, title: "Audio Production", desc: "Voiceovers, podcast production, music recording, and professional audio editing." },
  { icon: Globe, title: "Web Development", desc: "Modern business websites designed to build visibility and credibility." },
];

const reasons = [
  { icon: Award, title: "Strategic Thinking", desc: "We approach every project with long-term visibility and growth in mind." },
  { icon: Users, title: "Professional Execution", desc: "Every detail matters. Quality and presentation are priorities." },
  { icon: Zap, title: "Reliable Delivery", desc: "Clear communication and dependable turnaround times." },
  { icon: Clock, title: "Community Rooted", desc: "Built from local experience, working with individuals and businesses from all backgrounds." },
];

const steps = [
  { num: "01", title: "Consult", desc: "We understand your goals, vision, and expectations." },
  { num: "02", title: "Plan", desc: "We design a structured creative and digital strategy." },
  { num: "03", title: "Create", desc: "We execute with precision and professionalism." },
  { num: "04", title: "Deliver", desc: "We present work that reflects quality and intention." },
];

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section - Corporate & Confident */}
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-background">
        <div
          className="absolute inset-0 z-0 scale-105 animate-subtle-zoom opacity-40 dark:opacity-30"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 z-10 bg-background/30 backdrop-blur-[1px] transition-colors duration-500" />
        <div className="absolute inset-0 z-11 bg-gradient-to-t from-background via-background/10 to-transparent" />

        <div className="content-width relative z-20 text-center">
          <div className="flex justify-center mb-10 animate-fade-in">
            <img src={logo} alt="KMP Logo" className="h-20 w-auto md:h-24 drop-shadow-2xl" />
          </div>
          <h1 className="animate-fade-in text-balance mb-6">
            Professional Media for<br />
            <span className="text-primary">Growing Businesses.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl animate-fade-in text-lg font-medium text-balance md:text-xl text-muted-foreground" style={{ animationDelay: "150ms" }}>
            “We help people and businesses tell their stories through powerful visuals, sound, and digital innovation.”
          </p>
          <div className="mt-12 flex animate-fade-in flex-wrap justify-center gap-5" style={{ animationDelay: "300ms" }}>
            <Button asChild size="lg" className="h-14 px-10 text-base font-bold shadow-2xl hover:translate-y-[-2px] transition-transform">
              <Link to="/booking">
                Request a Consultation <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 px-10 text-base font-bold bg-background/20 backdrop-blur-md shadow-lg border-primary/20 hover:bg-background/40">
              <Link to="/services">View Our Work</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Who We Help - Refined Grid (3 Columns) */}
      <section className="section-padding bg-muted/30">
        <div className="content-width">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="mb-4">Who We Work With</h2>
            <p className="text-lg text-muted-foreground">Strategic creative services for the community, artists, and growing businesses.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Column 1: Small & Startup Businesses */}
            <div className="premium-card flex flex-col h-full bg-background/50 hover:border-primary/30 transition-all group">
              <h3 className="text-xl font-bold text-primary mb-6">Businesses & Entrepreneurs</h3>
              <p className="text-sm mb-8 text-muted-foreground">For startups and township entrepreneurs looking to present themselves professionally and build credibility.</p>
              <div className="space-y-4 mb-10 flex-grow">
                {["Business websites", "Corporate photography", "Promotional videos", "Digital brand support"].map(item => (
                  <div key={item} className="flex items-center gap-3 py-2 border-b border-border/50 last:border-0 text-sm font-medium">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p className="font-bold text-xs uppercase tracking-widest text-primary/80">Visibility & Trust</p>
            </div>

            {/* Column 2: Local Artists & Creatives */}
            <div className="premium-card flex flex-col h-full bg-background/50 border-primary/20 shadow-xl scale-105 group">
              <h3 className="text-xl font-bold text-primary mb-6">Artists & Creatives</h3>
              <p className="text-sm mb-8 text-muted-foreground">Helping musicians, content creators, and independent artists look and sound professional in a competitive world.</p>
              <div className="space-y-4 mb-10 flex-grow">
                {["Music recording", "Voiceovers", "Music videos", "Audio editing & mixing"].map(item => (
                  <div key={item} className="flex items-center gap-3 py-2 border-b border-border/50 last:border-0 text-sm font-medium">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p className="font-bold text-xs uppercase tracking-widest text-primary/80">Creativity & Impact</p>
            </div>

            {/* Column 3: Community Individuals & Families */}
            <div className="premium-card flex flex-col h-full bg-background/50 hover:border-primary/30 transition-all group">
              <h3 className="text-xl font-bold text-primary mb-6">Community & Life Milestones</h3>
              <p className="text-sm mb-8 text-muted-foreground">For families and individuals preserving meaningful moments — from weddings to graduations — with professional care.</p>
              <div className="space-y-4 mb-10 flex-grow">
                {["Weddings", "Graduations", "Funerals & memorials", "Celebrations & events"].map(item => (
                  <div key={item} className="flex items-center gap-3 py-2 border-b border-border/50 last:border-0 text-sm font-medium">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p className="font-bold text-xs uppercase tracking-widest text-primary/80">Preservation & Care</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Services - Primary & Secondary Structure */}
      <section className="section-padding">
        <div className="content-width">
          <div className="max-w-3xl mx-auto text-center mb-24">
            <h2 className="mb-4">Services Architecture</h2>
            <p className="text-lg text-muted-foreground">Bridging the gap between traditional media production and modern digital growth.</p>
          </div>
          <div className="grid gap-16 md:grid-cols-2">
            {/* Primary Creative Services */}
            <div className="space-y-12">
              <div className="flex items-center gap-6 mb-12">
                <div className="h-12 w-1.5 bg-primary rounded-full" />
                <h3 className="text-2xl font-black uppercase tracking-widest text-primary">Core Identity</h3>
              </div>
              <div className="space-y-12 pl-6 border-l border-border/60">
                {[
                  { icon: Camera, title: "Photography", desc: "Events, Weddings, Graduations, and Corporate Lifestyle shoots." },
                  { icon: Mic, title: "Audio Production", desc: "Professional music recording, voiceovers, podcasting, and audio mixing." },
                  { icon: ArrowRight, title: "Videography", desc: "Event coverage, promo videos, music videos, and cinematic storytelling." }
                ].map((s) => (
                  <div key={s.title} className="group">
                    <h4 className="text-xl font-bold flex items-center gap-4 mb-3 group-hover:text-primary transition-colors">
                      <div className="rounded-lg bg-primary/5 p-2 group-hover:bg-primary/10 transition-colors">
                        <s.icon className="h-5 w-5 text-primary" />
                      </div>
                      {s.title}
                    </h4>
                    <p className="text-base text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Secondary Digital Solutions */}
            <div className="space-y-12">
              <div className="flex items-center gap-6 mb-12">
                <div className="h-12 w-1.5 bg-primary rounded-full opacity-60" />
                <h3 className="text-2xl font-black uppercase tracking-widest text-primary/70">Growth Services</h3>
              </div>
              <div className="space-y-12 pl-6 border-l border-border/60">
                {[
                  { icon: Globe, title: "Web Development", desc: "Modern business, portfolio, and startup websites with full maintenance support." },
                  { icon: Zap, title: "Digital Marketing", desc: "Brand visibility strategies, social media content, and presence optimization." },
                  { icon: Award, title: "AI & Automation Solutions", desc: "AI-assisted content creation and automated digital workflows for business efficiency." }
                ].map((s) => (
                  <div key={s.title} className="group">
                    <h4 className="text-xl font-bold flex items-center gap-4 mb-3 group-hover:text-primary transition-colors">
                      <div className="rounded-lg bg-primary/5 p-2 group-hover:bg-primary/10 transition-colors">
                        <s.icon className="h-5 w-5 text-primary" />
                      </div>
                      {s.title}
                    </h4>
                    <p className="text-base text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Our Process - Methodical Layout */}
      <section className="section-padding bg-muted/20">
        <div className="content-width">
          <div className="max-w-3xl mx-auto text-center mb-24">
            <h2 className="mb-4">The KMP Methodology</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">Structured planning for reliable creative results.</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, idx) => (
              <div key={s.num} className="premium-card group hover:bg-background h-full transition-all border border-border/30">
                <div className="flex items-center justify-between mb-10">
                  <span className="text-6xl font-black text-primary/5 group-hover:text-primary/10 transition-colors leading-none">{s.num}</span>
                  {idx < steps.length - 1 && <ArrowRight className="hidden lg:block h-6 w-6 text-border opacity-50" />}
                </div>
                <h3 className="text-xl font-bold mb-4">{s.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-20 text-center">
            <span className="px-8 py-3 rounded-xl bg-primary/5 text-primary text-xs font-black uppercase tracking-[0.3em] border border-primary/20">Clear. Efficient. Professional.</span>
          </div>
        </div>
      </section>

      {/* 5. Why Work With Us - Trust & Reliability */}
      <section className="section-padding">
        <div className="content-width text-center">
          <h2 className="mb-24">Why Choose Our Studio?</h2>
          <div className="grid gap-16 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Award, title: "Strategic Thinking", desc: "Every project is built with long-term brand visibility and positioning in mind." },
              { icon: Users, title: "Inclusive Access", desc: "Premium media production for everyone, from township startups to corporate firms." },
              { icon: Zap, title: "Modern Tech", desc: "Integrating AI and digital innovations into traditional creative workflows." },
              { icon: Clock, title: "Proven Delivery", desc: "Dependable timelines and professional execution you can count on." }
            ].map((r) => (
              <div key={r.title} className="flex flex-col items-center group">
                <div className="mb-8 rounded-[2rem] bg-primary/5 p-7 group-hover:bg-primary/10 transition-all border border-primary/10 group-hover:border-primary/30 group-hover:rotate-6">
                  <r.icon className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-bold text-xl mb-4">{r.title}</h4>
                <p className="text-base text-muted-foreground leading-relaxed max-w-[240px]">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Portfolio Preview - Clean Grid */}
      <section className="section-padding bg-muted/30 border-t border-border/40">
        <div className="content-width">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-xl">
              <h2 className="mb-6">Selected Projects</h2>
              <p className="text-lg text-muted-foreground">“We help people and businesses tell their stories through powerful visuals and sound.”</p>
            </div>
            <Button asChild variant="link" className="text-primary font-black uppercase tracking-widest text-xs group">
              <Link to="/services" className="flex items-center gap-3">
                Browse Full Portfolio <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-10">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-muted rounded-2xl bg-gradient-to-br from-card to-border/20 border border-border/40 flex items-center justify-center group overflow-hidden relative shadow-sm hover:shadow-xl transition-all hover:translate-y-[-4px]">
                <Camera className="h-10 w-10 text-muted-foreground/20 group-hover:text-primary/40 transition-all duration-500 z-10 scale-90 group-hover:scale-110" />
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. About Preview Section - Authority */}
      <section className="section-padding border-t border-border/40">
        <div className="content-width max-w-4xl mx-auto text-center">
          <h2 className="mb-14 text-balance leading-tight">Bridging the Gap Between Creativity and Opportunity.</h2>
          <div className="space-y-12 text-lg font-medium text-balance opacity-90 mx-auto max-w-3xl">
            <p className="leading-relaxed">
              We stand at the intersection of <span className="text-foreground font-bold">Creativity</span>, <span className="text-foreground font-bold">Technology</span>, and <span className="text-foreground font-bold">Community Empowerment</span>.
            </p>
            <div className="pt-16 border-t border-border/60 mt-20 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-background px-6">
                <span className="uppercase tracking-[0.4em] font-black text-primary text-[10px]">Mission</span>
              </div>
              <p className="text-2xl md:text-4xl font-black text-foreground leading-[1.3] tracking-tight">
                To provide high-quality services that help individuals and businesses grow their brands and preserve meaningful moments.
              </p>
            </div>
          </div>
          <div className="mt-20">
            <Button asChild variant="outline" size="lg" className="h-14 px-12 group border-primary/20 hover:border-primary/50 hover:bg-primary/5 font-bold">
              <Link to="/about" className="flex items-center gap-3">
                Learn More About Our Roots <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 8. Final CTA Section - High Impact */}
      <section className="py-32 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.06)_0%,transparent_60%)]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 blur-3xl rounded-full translate-x-1/ format-1/2" />

        <div className="content-width relative z-10 text-center">
          <h2 className="text-4xl md:text-7xl font-black mb-10 text-balance text-primary-foreground leading-[1.1] tracking-tighter">
            Let’s Capture<br />Your Real Story.
          </h2>
          <p className="mx-auto max-w-3xl text-xl md:text-2xl opacity-90 mb-16 font-semibold text-balance leading-relaxed">
            “Creative solutions for real people, real stories, and growing businesses.”
          </p>
          <Button asChild size="lg" variant="secondary" className="h-16 px-16 text-lg font-black shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 transition-all text-primary bg-white border-0 uppercase tracking-widest">
            <Link to="/booking">
              Start Your Project
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;

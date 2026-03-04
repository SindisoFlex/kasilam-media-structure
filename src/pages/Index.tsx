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
          <p className="mx-auto mt-6 max-w-2xl animate-fade-in text-lg font-medium text-balance md:text-xl" style={{ animationDelay: "150ms" }}>
            We help brands and communities build professional visibility through photography, digital production, and modern digital solutions.
          </p>
          <div className="mt-12 flex animate-fade-in flex-wrap justify-center gap-5" style={{ animationDelay: "300ms" }}>
            <Button asChild size="lg" className="h-14 px-8 text-base shadow-xl hover:translate-y-[-2px] transition-transform">
              <Link to="/booking">
                Request a Consultation <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 px-8 text-base bg-background/20 backdrop-blur-md shadow-lg border-primary/20 hover:bg-background/40">
              <Link to="/services">View Our Work</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Who We Help - Refined Grid */}
      <section className="section-padding bg-muted/30">
        <div className="content-width">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="mb-4">Who We Work With</h2>
            <p className="text-lg">Strategic media solutions for businesses and life's meaningful milestones.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="premium-card flex flex-col h-full bg-background/50">
              <h3 className="text-2xl font-bold text-primary mb-6">Growing Businesses</h3>
              <p className="mb-8">For startups, entrepreneurs, and established businesses looking to present themselves professionally.</p>
              <div className="space-y-4 mb-10 flex-grow">
                {["Business websites", "Corporate photography", "Promotional videos", "Digital brand support"].map(item => (
                  <div key={item} className="flex items-center gap-3 py-2 border-b border-border/50 last:border-0 text-sm font-medium">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p className="font-semibold italic text-primary/80">We help you build trust, visibility, and credibility.</p>
            </div>
            <div className="premium-card flex flex-col h-full bg-background/50">
              <h3 className="text-2xl font-bold text-primary mb-6">Life’s Important Moments</h3>
              <p className="mb-8">For families and individuals preserving meaningful milestones with professional care.</p>
              <div className="space-y-4 mb-10 flex-grow">
                {["Weddings", "Funerals & memorials", "Graduations", "Celebrations & private events"].map(item => (
                  <div key={item} className="flex items-center gap-3 py-2 border-b border-border/50 last:border-0 text-sm font-medium">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p className="font-semibold italic text-primary/80">Every important moment deserves to be documented professionally.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Services - Logical hierarchy */}
      <section className="section-padding">
        <div className="content-width">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="mb-4">Our Services</h2>
            <p className="text-lg">A multidisciplinary approach to modern storytelling and digital growth.</p>
          </div>
          <div className="grid gap-16 md:grid-cols-2">
            <div className="space-y-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-10 w-1 bg-primary rounded-full" />
                <h3 className="text-2xl font-black uppercase tracking-widest text-primary/80">Creative Production</h3>
              </div>
              <div className="space-y-10 pl-5 border-l border-border">
                {[
                  { icon: Camera, title: "Photography", desc: "Professional event and corporate photography tailored to represent you properly." },
                  { icon: ArrowRight, title: "Videography", desc: "Event coverage, promotional visuals, and storytelling content for businesses and individuals." },
                  { icon: Mic, title: "Audio Production", desc: "Voiceovers, podcast production, music recording, and professional audio editing." }
                ].map((s) => (
                  <div key={s.title} className="group">
                    <h4 className="text-lg font-bold flex items-center gap-3 mb-2 group-hover:text-primary transition-colors">
                      <s.icon className="h-5 w-5 text-primary/70" /> {s.title}
                    </h4>
                    <p className="text-sm leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-10 w-1 bg-primary rounded-full" />
                <h3 className="text-2xl font-black uppercase tracking-widest text-primary/80">Digital Growth Solutions</h3>
              </div>
              <div className="space-y-10 pl-5 border-l border-border">
                {[
                  { icon: Globe, title: "Web Development", desc: "Modern business websites designed to build visibility and credibility." },
                  { icon: Zap, title: "Digital Strategy", desc: "Support with improving online presence and brand positioning." },
                  { icon: Award, title: "AI & Automation Solutions", desc: "Smart workflow systems that improve efficiency and productivity." }
                ].map((s) => (
                  <div key={s.title} className="group">
                    <h4 className="text-lg font-bold flex items-center gap-3 mb-2 group-hover:text-primary transition-colors">
                      <s.icon className="h-5 w-5 text-primary/70" /> {s.title}
                    </h4>
                    <p className="text-sm leading-relaxed">{s.desc}</p>
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
            <h2 className="mb-4">Our Process</h2>
            <p className="text-lg">Structured. Transparent. Effective.</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, idx) => (
              <div key={s.num} className="premium-card group hover:bg-background h-full transition-all">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-5xl font-black text-primary/5 group-hover:text-primary/10 transition-colors">{s.num}</span>
                  {idx < steps.length - 1 && <ArrowRight className="hidden lg:block h-6 w-6 text-border opacity-50" />}
                </div>
                <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                <p className="text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <span className="px-6 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-widest border border-primary/20">Clear. Efficient. Professional.</span>
          </div>
        </div>
      </section>

      {/* 5. Why Work With Us - Trust & Reliability */}
      <section className="section-padding">
        <div className="content-width text-center">
          <h2 className="mb-20">Why Work With Us</h2>
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r) => (
              <div key={r.title} className="flex flex-col items-center group">
                <div className="mb-6 rounded-2xl bg-primary/5 p-6 group-hover:bg-primary/10 transition-colors border border-primary/5 group-hover:border-primary/20">
                  <r.icon className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-bold text-lg mb-4">{r.title}</h4>
                <p className="text-sm leading-relaxed max-w-[240px]">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Portfolio Preview - Clean Grid */}
      <section className="section-padding bg-muted/30">
        <div className="content-width">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="mb-4">Selected Work</h2>
              <p className="text-lg">A preview of recent photography, media production, and digital projects.</p>
            </div>
            <Button asChild variant="link" className="text-primary font-bold group">
              <Link to="/services" className="flex items-center gap-2">
                Browse Full Portfolio <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-[4/3] bg-muted rounded-xl bg-gradient-to-br from-card to-border/40 border border-border flex items-center justify-center group overflow-hidden relative">
                <Camera className="h-10 w-10 text-muted-foreground/30 group-hover:text-primary/50 transition-colors duration-500 z-10" />
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. About Preview Section - Authority */}
      <section className="section-padding">
        <div className="content-width max-w-4xl mx-auto text-center">
          <h2 className="mb-10 text-balance leading-[1.1]">Built to Bridge Creativity and Opportunity</h2>
          <div className="space-y-8 text-lg font-medium text-balance opacity-90">
            <p>
              Kasilam Media Production was created from a desire to close the gap between talent and professional access.
            </p>
            <p>
              What started as a passion for music and storytelling evolved into a multidisciplinary creative studio serving businesses, entrepreneurs, and communities.
            </p>
            <div className="pt-10 border-t border-border mt-10">
              <p className="uppercase tracking-[0.2em] font-black text-primary text-sm mb-6">Our mission is simple</p>
              <p className="text-2xl md:text-3xl font-bold text-foreground">
                To make professional creative and digital services accessible to growing brands and meaningful moments alike.
              </p>
            </div>
          </div>
          <div className="mt-16">
            <Button asChild variant="outline" size="lg" className="h-14 px-10 group border-primary/20 hover:border-primary/50 hover:bg-primary/5">
              <Link to="/about" className="flex items-center gap-2">
                Learn More About Our Story <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 8. Final CTA Section - High Impact */}
      <section className="py-32 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.05)_0%,transparent_50%)]" />
        <div className="content-width relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 text-balance text-primary-foreground leading-tight">
            Let’s Build Something That Represents You Properly.
          </h2>
          <p className="mx-auto max-w-2xl text-xl md:text-2xl opacity-90 mb-14 font-medium text-balance leading-relaxed">
            Whether you're launching a business or preserving an important moment, we’re ready to work with you.
          </p>
          <Button asChild size="lg" variant="secondary" className="h-16 px-12 text-lg font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all text-primary bg-white border-0">
            <Link to="/booking">
              Request a Consultation
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;

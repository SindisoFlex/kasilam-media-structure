import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, Palette, Handshake, Lightbulb, Shield, TrendingUp, ArrowRight } from "lucide-react";
const timeline = [
  { year: "2015", title: "Filmmaking Studies", desc: "Formal study in filmmaking to master visual storytelling and technical discipline." },
  { year: "2016", title: "First Studio", desc: "Investment in professional recording equipment and collaboration with local artists." },
  { year: "2020", title: "Recalibration", desc: "Business setbacks during the pandemic led to a deep reflection and recalibration of the vision." },
  { year: "2023", title: "Creative Tech", desc: "Studied front-end development to merge creative artistry with modern technology and AI solutions." },
  { year: "2025", title: "Strategic Restructuring", desc: "A long-held vision underwent a strategic restructuring to better serve the community." },
  { year: "2026", title: "Launch of KMP", desc: "Official company registration and studio launch — built from experience, structured for growth." },
];

const principles = [
  { icon: Lightbulb, title: "Strategic Creativity", desc: "Creativity applied with intention and measurable purpose to solve brand challenges." },
  { icon: Shield, title: "Professional Execution", desc: "Disciplined delivery, clear communication, and consistent quality across every project." },
  { icon: Handshake, title: "Community Commitment", desc: "Rooted in local culture while operating at high-level international professional standards." },
  { icon: TrendingUp, title: "Growth & Innovation", desc: "Merging storytelling with digital technology and AI to create modern, scalable solutions." },
];

const About = () => {
  return (
    <div className="flex flex-col min-h-screen pt-20">
      {/* 1. Hero Section - Brand Story */}
      <section className="relative py-24 md:py-32 flex items-center justify-center overflow-hidden bg-background">
        <div className="content-width relative z-20 text-center">
          <h1 className="animate-fade-in text-balance mb-10 relative inline-block">
            Built From Experience.<br />
            <span className="text-primary">Structured for Growth.</span>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-primary rounded-full opacity-80" />
          </h1>
          <div className="max-w-4xl mx-auto space-y-10">
            <p className="animate-fade-in text-xl md:text-2xl font-semibold text-balance leading-relaxed" style={{ animationDelay: "150ms" }}>
              Kasilam Media Production is a multidisciplinary creative studio operating at the intersection of media, technology, and strategic brand visibility.
            </p>
            <p className="animate-fade-in text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto" style={{ animationDelay: "300ms" }}>
              Built from lived experience — from understanding what it means to have talent and ambition, but limited access to professional tools and visibility. Today, that gap is the problem we solve.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Why We Exist */}
      <section className="section-padding bg-muted/20 border-y border-border/40">
        <div className="content-width">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="border-l-4 border-primary pl-6">Why We Exist</h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Too many entrepreneurs, creatives, and growing businesses struggle not because they lack ability — but because they lack professional presentation and digital presence.
                </p>
                <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {["Creativity", "Technology", "Community"].map((item) => (
                    <div key={item} className="flex flex-col items-center p-6 premium-card bg-background text-center group hover:border-primary/40 transition-all">
                      <span className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-2">Pillar</span>
                      <span className="text-foreground font-bold">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="premium-card bg-primary text-primary-foreground border-0 shadow-2xl p-10 md:p-14">
              <p className="text-xs font-black uppercase tracking-[0.3em] mb-6 opacity-80">Our Core Belief</p>
              <h3 className="text-4xl font-black mb-8 text-primary-foreground leading-tight">Professional visibility creates opportunity.</h3>
              <p className="text-xl opacity-90 leading-relaxed font-bold italic">
                “Creative solutions for real people, real stories, and growing businesses.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section className="section-padding">
        <div className="content-width">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6 p-10 rounded-3xl border border-border/40 hover:border-primary/20 transition-colors bg-card/50">
              <h3 className="text-2xl font-black text-primary uppercase tracking-wider">Mission</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To provide high-quality, accessible creative and digital services that empower businesses and individuals to express themselves professionally, grow their brands, and preserve meaningful moments.
              </p>
            </div>
            <div className="space-y-6 p-10 rounded-3xl border border-border/40 hover:border-primary/20 transition-colors bg-card/50">
              <h3 className="text-2xl font-black text-primary uppercase tracking-wider">Vision</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To build a sustainable creative company that develops talent, creates opportunity, and becomes a trusted creative partner locally and internationally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Founder Journey - The Background */}
      <section className="section-padding bg-card border-t border-border/40">
        <div className="content-width">
          <div className="max-w-3xl mx-auto mb-20 text-center">
            <h2 className="mb-6">The Journey Behind the Vision</h2>
            <p className="text-lg text-muted-foreground">Evolving Hip-Hop roots into a multidisciplinary creative business model.</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {timeline.map((t, i) => (
              <div key={t.year} className="relative group p-8 premium-card hover:bg-muted/30 transition-all">
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-sm font-black uppercase tracking-[0.3em] text-primary">{t.year}</span>
                  <div className="h-px flex-grow ml-4 bg-border/60 group-hover:bg-primary/20" />
                </div>
                <h3 className="text-xl font-bold mb-4">{t.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Our Principles */}
      <section className="section-padding overflow-hidden">
        <div className="content-width">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="mb-4">Our Principles</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">Merging storytelling with technology to deliver professional results.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="premium-card flex flex-col group hover:bg-muted/20">
                <div className="mb-6 rounded-2xl bg-primary/5 p-4 w-fit group-hover:bg-primary/10 transition-colors border border-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-xl font-bold mb-4">{title}</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5.5 Our Position - New Section */}
      <section className="section-padding bg-muted/20 border-t border-border/40">
        <div className="content-width text-center">
          <h2 className="mb-14">Our Position</h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {["Growing businesses", "Emerging entrepreneurs", "Artists and creators", "Community professionals", "Corporate clients"].map((p) => (
              <span key={p} className="px-6 py-3 rounded-full bg-background border border-border/60 text-sm font-bold shadow-sm">{p}</span>
            ))}
          </div>
          <p className="mt-12 text-lg text-muted-foreground italic mx-auto max-w-2xl">
            “We serve township entrepreneurs and corporate teams with the same standard of professionalism.”
          </p>
        </div>
      </section>

      {/* 6. Final CTA */}
      <section className="section-padding bg-card border-t border-border/40 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(234,51,35,0.05)_0%,transparent_50%)]" />
        <div className="content-width text-center relative z-10">
          <h2 className="mb-8">Build Your Presence Properly.</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-12">
            “Kasilam Media Production was built with a long-term mindset. The goal is not only to create content — but to build presence.”
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button asChild size="lg" className="h-14 px-12 text-base font-bold shadow-2xl hover:translate-y-[-2px] transition-transform">
              <Link to="/booking">Start Your Project</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 px-12 text-base font-bold border-primary/20">
              <Link to="/services">View Our Work</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

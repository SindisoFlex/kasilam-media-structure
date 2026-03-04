import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Target, Eye, Shield, ArrowRight } from "lucide-react";

const timeline = [
  { year: "2018", title: "The Spark", desc: "A passion for storytelling through sound and image begins." },
  { year: "2019", title: "First Studio", desc: "Built a home studio and started producing for local artists." },
  { year: "2020", title: "Going Digital", desc: "Expanded into web development and digital marketing." },
  { year: "2022", title: "KMP Founded", desc: "Kasilam Media Productions officially launched as a full-service media house." },
  { year: "2024", title: "Growing Impact", desc: "Serving clients across South Africa with premium media solutions." },
];

const values = [
  { icon: Heart, title: "Passion", desc: "Every project is fueled by genuine love for the craft." },
  { icon: Target, title: "Precision", desc: "Attention to detail in every frame, note, and pixel." },
  { icon: Eye, title: "Vision", desc: "We see beyond the brief to create something extraordinary." },
  { icon: Shield, title: "Integrity", desc: "Honest pricing, transparent processes, quality guaranteed." },
];

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section - Minimal & Strong */}
      <section className="relative section-padding flex items-center justify-center overflow-hidden bg-background">
        <div className="content-width relative z-20 text-center pt-12 md:pt-20">
          <h1 className="animate-fade-in text-balance mb-6 relative inline-block">
            About Kasilam Media Production
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-primary rounded-full opacity-80" />
          </h1>
          <p className="mx-auto mt-10 max-w-2xl animate-fade-in text-lg font-medium text-balance md:text-xl text-muted-foreground" style={{ animationDelay: "150ms" }}>
            A multidisciplinary creative studio rooted in community and driven by professional precision.
          </p>
        </div>
      </section>

      {/* 2. Who We Are - Structured & Authoritative */}
      <section className="section-padding bg-muted/20 border-y border-border/40">
        <div className="content-width">
          <div className="max-w-3xl mx-auto">
            <h2 className="mb-10 text-left border-l-4 border-primary pl-6">Who We Are</h2>
            <div className="space-y-8 text-lg leading-relaxed text-muted-foreground">
              <p>
                KMP was born from a simple belief: <span className="text-foreground font-semibold">great media should be accessible to everyone.</span> We combine technical expertise with creative vision to deliver audio, visual, and digital solutions that don't just meet expectations — they exceed them.
              </p>
              <p>
                Based in South Africa, we serve artists, businesses, and brands who demand premium quality without the premium attitude. Our foundation is built on trust, visibility, and the relentless pursuit of excellence in every frame and every line of code.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Purpose - Intentional Emphasis */}
      <section className="section-padding">
        <div className="content-width">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="premium-card bg-primary text-primary-foreground border-0 shadow-2xl">
              <h3 className="text-3xl font-black mb-6 text-primary-foreground">Our Mission</h3>
              <p className="text-lg opacity-90 leading-relaxed font-medium italic">
                "To empower individuals and businesses through premium, accessible media production — bridging the gap between vision and reality with every project we deliver."
              </p>
            </div>
            <div className="space-y-8">
              <h2 className="text-3xl font-bold">Our Vision</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To be the leading media house in South Africa known for <span className="text-foreground font-bold">cinematic quality</span>, community impact, and innovative digital solutions that set new industry standards.
              </p>
              <div className="h-1 w-20 bg-primary/20 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Founder Journey / Timeline - Evolved & Minimal */}
      <section className="section-padding bg-card border-t border-border/40">
        <div className="content-width">
          <div className="max-w-3xl mx-auto mb-20 text-center">
            <h2 className="mb-4">Our Evolution</h2>
            <p className="text-lg">A journey from local storytelling to a multidisciplinary media house.</p>
          </div>
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {timeline.map((t, i) => (
                <div key={t.year} className="relative group">
                  <div className="mb-4 flex items-center gap-4">
                    <span className="text-xs font-black uppercase tracking-[0.3em] text-primary">{t.year}</span>
                    <div className="h-px flex-grow bg-border group-hover:bg-primary/30 transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{t.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Core Values - Modern Grid Layout */}
      <section className="section-padding">
        <div className="content-width">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="mb-4">Core Principles</h2>
            <p className="text-lg">Structured. Professional. Balanced.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
            {values.map((v) => (
              <div key={v.title} className="premium-card flex flex-col items-center text-center group bg-muted/20">
                <div className="mb-6 rounded-2xl bg-primary/5 p-5 group-hover:bg-primary/10 transition-colors border border-primary/5 group-hover:border-primary/20">
                  <v.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{v.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground max-w-[280px]">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Final CTA - Professional Directives */}
      <section className="section-padding bg-muted/30 border-t border-border/40">
        <div className="content-width text-center">
          <h2 className="mb-6">Let's Build Something Meaningful</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground mb-12">
            Whether you're launching a business or preserving a moment, we're ready to bring professional precision to your vision.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button asChild size="lg" className="h-14 px-10 text-base shadow-xl hover:translate-y-[-2px] transition-transform">
              <Link to="/booking">
                Start a Conversation <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 px-10 text-base border-primary/20 hover:bg-primary/5">
              <Link to="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

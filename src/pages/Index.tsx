import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, Camera, Globe, Zap, Users, Award, Clock, ArrowRight, CheckCircle } from "lucide-react";
import logo from "@/images/kmp.svg";

const pillars = [
  { icon: Mic, title: "Audio Production", desc: "Professional recording, mixing, mastering, and sound design for any project." },
  { icon: Camera, title: "Visual Production", desc: "Cinematic photography and videography that tells your story with impact." },
  { icon: Globe, title: "Digital Media", desc: "Web development, digital marketing, and AI-powered solutions for growth." },
];

const reasons = [
  { icon: Award, title: "Premium Quality", desc: "Industry-standard equipment and techniques." },
  { icon: Users, title: "Client-Focused", desc: "Your vision drives every decision we make." },
  { icon: Zap, title: "Fast Turnaround", desc: "Professional results delivered on time." },
  { icon: Clock, title: "End-to-End", desc: "From concept to final delivery, we handle it all." },
];

const steps = [
  { num: "01", title: "Consult", desc: "We discuss your vision and goals." },
  { num: "02", title: "Plan", desc: "We craft a tailored production strategy." },
  { num: "03", title: "Create", desc: "We bring your project to life." },
  { num: "04", title: "Deliver", desc: "Polished, professional final product." },
];

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="flex justify-center mb-8 animate-fade-in">
            <img src={logo} alt="KMP Logo" className="h-24 w-auto md:h-32" />
          </div>
          <h1 className="animate-fade-in text-5xl font-black leading-tight tracking-tight md:text-7xl">
            We Create
            <span className="block text-primary">Media That Moves</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl animate-fade-in text-lg text-muted-foreground" style={{ animationDelay: "150ms" }}>
            Kasilam Media Productions — where sound, vision, and digital innovation converge to tell stories that resonate.
          </p>
          <div className="mt-8 flex animate-fade-in flex-wrap justify-center gap-4" style={{ animationDelay: "300ms" }}>
            <Button asChild size="lg" className="gap-2 text-base">
              <Link to="/booking">
                Book Now <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base">
              <Link to="/services">Our Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="bg-card py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Who Is <span className="text-primary">KMP</span>?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            We are a community-rooted media house delivering premium audio, visual, and digital media solutions. From studio sessions to full-scale digital campaigns — we bring your story to life.
          </p>
          <Button asChild variant="link" className="mt-6 gap-1">
            <Link to="/about">
              Learn More <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* 3 Media Pillars */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold md:text-4xl">Our Core Pillars</h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
            Three disciplines. One unified creative vision.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pillars.map((p) => (
              <Card key={p.title} className="group border-border transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                <CardContent className="flex flex-col items-center p-8 text-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-4 transition-colors group-hover:bg-primary/20">
                    <p.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-card py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold md:text-4xl">Why Choose Us</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r) => (
              <div key={r.title} className="flex flex-col items-center text-center">
                <div className="mb-3 rounded-full bg-primary/10 p-3">
                  <r.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">{r.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Step Process */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold md:text-4xl">Our Process</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.num} className="relative rounded-lg border border-border bg-card p-6">
                <span className="text-4xl font-black text-primary/20">{s.num}</span>
                <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Ready to Create Something Amazing?</h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
            Let's bring your vision to life. Get in touch or book your session today.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className="gap-2 text-base">
              <Link to="/booking">
                <CheckCircle className="h-4 w-4" /> Book a Session
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

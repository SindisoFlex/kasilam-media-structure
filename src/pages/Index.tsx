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
    <div>
      {/* 1. Hero Section */}
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-background">
        <div
          className="absolute inset-0 z-0 scale-105 animate-subtle-zoom"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 z-10 bg-background/50 backdrop-blur-[1px] transition-colors duration-500" />
        <div className="absolute inset-0 z-11 bg-gradient-to-t from-background via-background/20 to-transparent" />

        <div className="container relative z-20 mx-auto px-4 text-center">
          <div className="flex justify-center mb-8 animate-fade-in">
            <img src={logo} alt="KMP Logo" className="h-24 w-auto md:h-32 drop-shadow-2xl" />
          </div>
          <h1 className="animate-fade-in text-5xl font-black leading-tight tracking-tight md:text-7xl text-foreground">
            Professional Media for
            <span className="block text-primary drop-shadow-sm">Growing Businesses.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl animate-fade-in text-lg text-muted-foreground font-medium" style={{ animationDelay: "150ms" }}>
            We help brands and communities build professional visibility through photography, digital production, and modern digital solutions.
          </p>
          <div className="mt-10 flex animate-fade-in flex-wrap justify-center gap-4" style={{ animationDelay: "300ms" }}>
            <Button asChild size="lg" className="gap-2 text-base shadow-xl">
              <Link to="/booking">
                Request a Consultation <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base bg-background/50 backdrop-blur-sm shadow-lg">
              <Link to="/services">View Our Work</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Who We Help */}
      <section className="bg-card py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold md:text-5xl mb-16">Who We Work With</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-background p-8 rounded-2xl border border-border shadow-sm">
              <h3 className="text-2xl font-bold text-primary mb-4">Growing Businesses</h3>
              <p className="text-muted-foreground mb-6">For startups, entrepreneurs, and established businesses looking to present themselves professionally.</p>
              <ul className="space-y-3 mb-8">
                {["Business websites", "Corporate photography", "Promotional videos", "Digital brand support"].map(item => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="font-semibold italic">We help you build trust, visibility, and credibility.</p>
            </div>
            <div className="bg-background p-8 rounded-2xl border border-border shadow-sm">
              <h3 className="text-2xl font-bold text-primary mb-4">Life’s Important Moments</h3>
              <p className="text-muted-foreground mb-6">For families and individuals preserving meaningful milestones.</p>
              <ul className="space-y-3 mb-8">
                {["Weddings", "Funerals & memorials", "Graduations", "Celebrations & private events"].map(item => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="font-semibold italic">Every important moment deserves to be documented professionally.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Services */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold md:text-5xl mb-4">Our Services</h2>
          <div className="mt-16 grid gap-12 md:grid-cols-2">
            <div>
              <h3 className="text-2xl font-bold mb-8 border-l-4 border-primary pl-4">Creative Production</h3>
              <div className="space-y-8">
                <div>
                  <h4 className="text-lg font-bold flex items-center gap-2"><Camera className="h-5 w-5 text-primary" /> Photography</h4>
                  <p className="text-muted-foreground mt-1">Professional event and corporate photography tailored to represent you properly.</p>
                </div>
                <div>
                  <h4 className="text-lg font-bold flex items-center gap-2"><ArrowRight className="h-5 w-5 text-primary" /> Videography</h4>
                  <p className="text-muted-foreground mt-1">Event coverage, promotional visuals, and storytelling content for businesses and individuals.</p>
                </div>
                <div>
                  <h4 className="text-lg font-bold flex items-center gap-2"><Mic className="h-5 w-5 text-primary" /> Audio Production</h4>
                  <p className="text-muted-foreground mt-1">Voiceovers, podcast production, music recording, and professional audio editing.</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-8 border-l-4 border-primary pl-4">Digital Growth Solutions</h3>
              <div className="space-y-8">
                <div>
                  <h4 className="text-lg font-bold flex items-center gap-2"><Globe className="h-5 w-5 text-primary" /> Web Development</h4>
                  <p className="text-muted-foreground mt-1">Modern business websites designed to build visibility and credibility.</p>
                </div>
                <div>
                  <h4 className="text-lg font-bold flex items-center gap-2"><Zap className="h-5 w-5 text-primary" /> Digital Strategy</h4>
                  <p className="text-muted-foreground mt-1">Support with improving online presence and brand positioning.</p>
                </div>
                <div>
                  <h4 className="text-lg font-bold flex items-center gap-2"><Award className="h-5 w-5 text-primary" /> AI & Automation Solutions</h4>
                  <p className="text-muted-foreground mt-1">Smart workflow systems that improve efficiency and productivity.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Our Process */}
      <section className="bg-card py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold md:text-5xl mb-16">Our Process</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.num} className="relative rounded-2xl border border-border bg-background p-8 transition-all hover:border-primary/50">
                <span className="text-4xl font-black text-primary/10 mb-4 block">{s.num}</span>
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-12 text-xl font-bold text-primary">Clear. Efficient. Professional.</p>
        </div>
      </section>

      {/* 5. Why Work With Us */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold md:text-5xl mb-16">Why Work With Us</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r) => (
              <div key={r.title} className="flex flex-col items-center text-center p-6">
                <div className="mb-4 rounded-full bg-primary/10 p-5">
                  <r.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">{r.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Portfolio Preview */}
      <section className="bg-card py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold md:text-5xl mb-4">Selected Work</h2>
          <p className="text-center text-muted-foreground mb-16">A preview of recent photography, media production, and digital projects.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-video bg-muted rounded-xl animate-pulse overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-muted to-border flex items-center justify-center">
                  <Camera className="h-8 w-8 text-muted-foreground/50" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. About Preview Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold md:text-5xl mb-8">Built to Bridge Creativity and Opportunity</h2>
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-muted-foreground">
            <p>
              Kasilam Media Production was created from a desire to close the gap between talent and professional access.
            </p>
            <p>
              What started as a passion for music and storytelling evolved into a multidisciplinary creative studio serving businesses, entrepreneurs, and communities.
            </p>
            <div className="pt-4">
              <p className="font-bold text-foreground text-xl mb-4 text-primary">Our mission is simple:</p>
              <p className="text-foreground font-medium italic">
                To make professional creative and digital services accessible to growing brands and meaningful moments alike.
              </p>
            </div>
          </div>
          <Button asChild variant="outline" size="lg" className="mt-12 group">
            <Link to="/about" className="flex items-center gap-2">
              Learn More About Our Story <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>

      {/* 8. Final CTA Section */}
      <section className="bg-primary py-24 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h2 className="text-4xl font-black md:text-6xl mb-6">Let’s Build Something That Represents You Properly.</h2>
          <p className="mx-auto max-w-2xl text-xl opacity-90 mb-10">
            Whether you're launching a business or preserving an important moment, we’re ready to work with you.
          </p>
          <Button asChild size="lg" variant="secondary" className="gap-2 text-lg h-14 px-8 shadow-2xl">
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

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, Palette, Handshake, Lightbulb, Shield, TrendingUp, ArrowRight } from "lucide-react";
const timeline = [
  { year: "2014", title: "A Turning Point", desc: "Becoming a father reshaped my path, requiring stability but never silencing the creative drive." },
  { year: "2015", title: "Filmmaking Studies", desc: "Formally studied filmmaking via a short film course to master visual storytelling." },
  { year: "2016", title: "First Studio", desc: "Bought my first microphone and began recording and collaborating with local artists." },
  { year: "2020", title: "Reflection & Rebuilding", desc: "Navigated pandemic setbacks, using the time to reflect and rebuild the vision for KMP." },
  { year: "2023", title: "Creative Tech", desc: "Studied front-end development to merge creative arts with modern technology/AI solutions." },
  { year: "2026", title: "Launch of KMP", desc: "Officially registered and launched Kasilam Media Production as a full-scale creative studio." },
];

const values = [
  { icon: Users, title: "Community First", desc: "We serve people from all walks of life, ensuring professional services are accessible to everyone." },
  { icon: Palette, title: "Creativity with Purpose", desc: "Every project tells a story. We use creativity intentionally to create meaningful impact." },
  { icon: Handshake, title: "Collaboration", desc: "We grow together by working alongside artists, entrepreneurs, and local businesses." },
  { icon: Lightbulb, title: "Innovation", desc: "We combine traditional creative arts with modern digital solutions and AI technology." },
  { icon: Shield, title: "Professionalism", desc: "Every client receives quality and dedication, regardless of project size or scope." },
  { icon: TrendingUp, title: "Growth & Empowerment", desc: "We aim to uplift young creatives and support small businesses in becoming visible." },
];

const About = () => {
  return (
    <div className="flex flex-col min-h-screen pt-20">
      {/* 1. Hero Section - Brand Story */}
      <section className="relative py-24 md:py-32 flex items-center justify-center overflow-hidden bg-background">
        <div className="content-width relative z-20 text-center">
          <h1 className="animate-fade-in text-balance mb-10 relative inline-block">
            Our Story
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-primary rounded-full opacity-80" />
          </h1>
          <div className="max-w-4xl mx-auto space-y-10">
            <p className="animate-fade-in text-xl md:text-2xl font-semibold text-balance leading-relaxed" style={{ animationDelay: "150ms" }}>
              Kasilam Media Production was created from a deep understanding of what it means to be an artist without access — without equipment, visibility, or opportunity.
            </p>
            <p className="animate-fade-in text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto" style={{ animationDelay: "300ms" }}>
              Born from the creative culture of Port Elizabeth, we exist to bridge the gap between creativity and opportunity, helping individuals, artists, and businesses tell their stories through sound, visuals, and digital technology.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Brand Identity - The Intersection */}
      <section className="section-padding bg-muted/20 border-y border-border/40">
        <div className="content-width">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="border-l-4 border-primary pl-6">More Than a Service Provider</h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  We are a creative partner helpings people look professional, sound professional, and exist confidently in the digital world.
                </p>
                <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {["Creativity", "Technology", "Community"].map((item) => (
                    <div key={item} className="flex flex-col items-center p-6 premium-card bg-background text-center group hover:border-primary/40 transition-all">
                      <span className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-2">Focused on</span>
                      <span className="text-foreground font-bold">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="premium-card bg-primary text-primary-foreground border-0 shadow-2xl p-10 md:p-14">
              <h3 className="text-3xl font-black mb-8 text-primary-foreground">Our Purpose</h3>
              <p className="text-xl opacity-90 leading-relaxed font-bold italic">
                "Make professional creative services accessible to everyone — from township entrepreneurs to corporate clients."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section className="section-padding">
        <div className="content-width">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6 p-8 rounded-3xl border border-border/40 hover:border-primary/20 transition-colors">
              <h3 className="text-2xl font-black text-primary uppercase tracking-wider">Mission</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To provide accessible, high-quality creative and digital services that empower individuals, artists, and businesses to express themselves, grow their brands, and preserve meaningful moments through photography, audio production, and digital innovation.
              </p>
            </div>
            <div className="space-y-6 p-8 rounded-3xl border border-border/40 hover:border-primary/20 transition-colors">
              <h3 className="text-2xl font-black text-primary uppercase tracking-wider">Vision</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To build a sustainable creative company that nurtures talent, creates opportunities for young creatives, and becomes a trusted creative partner locally and internationally — connecting communities through storytelling, technology, and innovation.
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

      {/* 5. Core Values - The Commitment */}
      <section className="section-padding overflow-hidden">
        <div className="content-width">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="mb-4">Brand Values</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">The principles that guide every frame, every recording, and every line of code.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="premium-card flex flex-col group hover:bg-muted/20">
                <div className="mb-6 rounded-2xl bg-primary/5 p-4 w-fit group-hover:bg-primary/10 transition-colors border border-primary/10">
                  <v.icon className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-xl font-bold mb-4">{v.title}</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Final CTA */}
      <section className="section-padding bg-muted/30 border-t border-border/40">
        <div className="content-width text-center">
          <h2 className="mb-8">Ready to Tell Your Story?</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-12">
            “We help people and businesses tell their stories through powerful visuals, sound, and digital innovation.”
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button asChild size="lg" className="h-14 px-12 text-base font-bold shadow-2xl hover:translate-y-[-2px] transition-transform">
              <Link to="/booking">Request a Consultation</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 px-12 text-base font-bold border-primary/20">
              <Link to="/services">View Our Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

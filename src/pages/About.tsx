import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Handshake, Lightbulb, Shield, TrendingUp } from "lucide-react";
import { useBooking } from "@/contexts/BookingContext";
import AboutHero from "@/components/AboutHero";

const timeline = [
  { year: "2015", title: "Formal Filmmaking Studies", desc: "Establishing a technical foundation in visual storytelling and disciplined production." },
  { year: "2016", title: "Infrastructure Investment", desc: "Direct investment in recording infrastructure and strategic collaboration with emerging artists." },
  { year: "2020", title: "Industry Recalibration", desc: "Identifying and navigating structural shifts during global disruption to refine the business model." },
  { year: "2023", title: "Technological Integration", desc: "Front-end development studies to integrate modern technology and AI with media production." },
  { year: "2025", title: "Strategic Restructuring", desc: "Complete vision restructuring and business alignment for long-term positioning." },
  { year: "2026", title: "Official Launch", desc: "Company registration and studio launch - delivering structured creative solutions for growth." },
];

const principles = [
  { icon: Lightbulb, title: "Strategic Creativity", desc: "Creativity applied with intention and measurable purpose to solve brand challenges." },
  { icon: Shield, title: "Professional Execution", desc: "Disciplined delivery, clear communication, and consistent quality across every project." },
  { icon: Handshake, title: "Community Commitment", desc: "Rooted in local culture while operating at high-level international professional standards." },
  { icon: TrendingUp, title: "Growth & Innovation", desc: "Merging storytelling with digital technology and AI to create modern, scalable solutions." },
];

const About = () => {
  const { openBooking } = useBooking();
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section - Brand Story */}
      <AboutHero />

      {/* 2. Why We Exist */}
      <section className="section-padding bg-muted/20 border-y border-border/40">
        <div className="content-width">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="border-l-4 border-primary pl-6">Why We Exist</h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Too many entrepreneurs, creatives, and growing businesses in Port Elizabeth (Gqeberha) and the Eastern Cape struggle not because they lack ability - but because they lack professional presentation and digital presence.
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
                "Creative solutions for real people, real stories, and growing businesses."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5 Founder Section */}
      <section className="section-padding">
        <div className="content-width">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div className="space-y-6">
              <p className="text-xs font-black uppercase tracking-[0.35em] text-primary">Founder & Creative Director</p>
              <h2 className="text-3xl md:text-4xl font-black text-foreground uppercase tracking-tight">
                Sindiso Sophazi
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Sindiso Sophazi founded Kasilam Media Production through direct experience within the creative industry in Port Elizabeth (Gqeberha), Eastern Cape. The business was built to address the lack of professional creative infrastructure and digital visibility for entrepreneurs, artists, and businesses across South Africa.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                The result is a studio that combines disciplined production standards with practical strategy - giving clients the tools, presence, and confidence to grow.
              </p>
            </div>
            <div className="premium-card p-6 bg-background">
              <div className="overflow-hidden rounded-2xl border border-border/40 bg-muted/30">
                <img
                  src="/founder-portrait.svg"
                  alt="Portrait of Sindiso Sophazi, Founder and Creative Director"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="mt-4 text-sm font-semibold text-muted-foreground">
                Founder & Creative Director
              </div>
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

      {/* 4. Founder Journey - The Strategic Narrative */}
      <section className="section-padding bg-card border-t border-border/40">
        <div className="content-width">
          <div className="max-w-4xl mx-auto mb-24 text-center">
            <h2 className="mb-8">The Journey Behind the Vision</h2>
            <div className="space-y-8 text-lg text-muted-foreground leading-relaxed italic mx-auto max-w-3xl">
              <p>
                Kasilam Media Production was shaped through Sindiso Sophazi's direct experience with structural limitations within the creative industry in Port Elizabeth (Gqeberha).
              </p>
              <p>
                Access to professional studios, technical infrastructure, and meaningful visibility was limited. That reality exposed a deeper issue - talent exists everywhere, but opportunity does not.
              </p>
            </div>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 mb-24">
            {timeline.map((t, i) => (
              <div key={t.year} className="relative group p-10 premium-card hover:bg-muted/30 transition-all border-border/40">
                <div className="mb-8 flex items-center justify-between">
                  <span className="text-sm font-black uppercase tracking-[0.4em] text-primary">{t.year}</span>
                  <div className="h-px flex-grow ml-6 bg-border/40 group-hover:bg-primary/30 transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-4">{t.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground/90">{t.desc}</p>
              </div>
            ))}
          </div>
          <div className="max-w-3xl mx-auto text-center space-y-10 border-t border-border/40 pt-24">
            <p className="text-lg text-muted-foreground italic">
              "Each stage was intentional. The company was built not on momentum, but on discipline, systems thinking, and long-term positioning."
            </p>
            <p className="text-xl md:text-2xl font-black text-foreground leading-[1.4]">
              Today, Kasilam Media Production exists to eliminate barriers of access, visibility, and professional infrastructure - delivering structured creative solutions for brands and individuals ready to operate at a higher level across the Eastern Cape and South Africa.
            </p>
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

      {/* 5.5 Who We Work With */}
      <section className="section-padding bg-muted/20 border-t border-border/40">
        <div className="content-width text-center">
          <h2 className="mb-8">Who We Work With</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We support entrepreneurs, growing businesses, artists and creators, community professionals, and corporate teams throughout Port Elizabeth (Gqeberha), the Eastern Cape, and South Africa. Every client receives the same professional standard, regardless of size.
          </p>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {["Entrepreneurs", "Growing businesses", "Artists and creators", "Community professionals", "Corporate teams"].map((p) => (
              <span key={p} className="px-6 py-3 rounded-full bg-background border border-border/60 text-sm font-bold shadow-sm">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Final CTA */}
      <section className="section-padding bg-card border-t border-border/40 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(234,51,35,0.05)_0%,transparent_50%)]" />
        <div className="content-width text-center relative z-10">
          <h2 className="mb-8">Build Your Presence Properly.</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-12">
            "Kasilam Media Production was built with a long-term mindset. The goal is not only to create content - but to build presence."
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button 
              onClick={() => openBooking({
                service: "Creative Production",
                package: "General Inquiry",
                price: 0
              })}
              variant="red"
              size="lg" 
              className="h-14 px-12 text-base font-bold shadow-2xl hover:translate-y-[-2px] transition-transform cursor-pointer"
            >
              Start Your Project
            </Button>
            <Button asChild variant="black" size="lg" className="h-14 px-12 text-base font-bold">
              <Link to="/services">View Our Work</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;


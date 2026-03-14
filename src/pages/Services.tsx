import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, Camera, Globe, ArrowRight, Zap, Sparkles, Layers } from "lucide-react";
import { useBooking } from "@/contexts/BookingContext";
import { FadeInSection, HeroSection, StaggerContainer, StaggerItem } from "@/components/animations";

const services = [
  {
    icon: Mic,
    title: "Audio Production",
    desc: "From studio recording to final master — we deliver professional sound that hits different.",
    link: "/services/audio-production",
    label: "Audio Suite",
  },
  {
    icon: Camera,
    title: "Visual Production",
    desc: "Cinematic photography and videography that captures moments and tells stories with impact.",
    link: "/services/visual-production",
    label: "Visual Studio",
  },
  {
    icon: Globe,
    title: "Digital Media Solutions",
    desc: "Modern digital solutions to grow your brand, reach your audience, and streamline your business.",
    link: "/services/digital-marketing",
    label: "Growth Labs",
  },
];

const Services = () => {
  const { openBooking } = useBooking();
  return (
    <div className="bg-background text-foreground min-h-screen">
      <section className="relative section-padding pb-32 overflow-hidden border-b border-foreground/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background z-10" />
          <div className="absolute inset-0 mesh-bg opacity-20 dark:opacity-40" />
        </div>
        
        <div className="content-width relative z-10 text-center">
          <HeroSection>
            <div className="mb-10 inline-flex items-center gap-3 rounded-full border border-red-600/30 bg-red-600/10 px-6 py-2 text-xs font-black uppercase tracking-[0.4em] text-red-600 animate-pulse backdrop-blur-md">
              Our Disciplines
            </div>
          </HeroSection>
          <HeroSection delay={0.1}>
            <h1 className="text-5xl font-black leading-[0.85] md:text-8xl lg:text-9xl text-foreground tracking-[-0.06em] mb-12">
              Strategic Creative &<br />
              <span className="text-gradient">Digital Architecture.</span>
            </h1>
          </HeroSection>
          <HeroSection delay={0.2}>
            <p className="mx-auto max-w-3xl text-xl md:text-2xl text-foreground/50 font-bold uppercase tracking-widest leading-relaxed">
              Three core disciplines. One standard — excellence. We bridge the gap between creative vision and professional execution.
            </p>
          </HeroSection>
        </div>
      </section>

      <section className="section-padding bg-alternate">
        <div className="content-width">
          <div className="grid gap-8 md:grid-cols-3">
            {services.map((s, i) => (
              <div
                key={s.title}
                className="premium-card bg-background shadow-2xl border-foreground/5 flex flex-col h-full group hover:border-red-600/40 relative overflow-hidden transition-all duration-500"
              >
                <div className="p-10 flex flex-col h-full">
                  <div className="mb-10 flex items-center justify-between">
                    <div className="h-16 w-16 rounded-[2rem] bg-foreground/5 dark:bg-white/5 border border-foreground/5 flex items-center justify-center group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700">
                      <s.icon className="h-8 w-8 text-red-600" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/30 group-hover:text-red-600 transition-colors">{s.label}</span>
                  </div>
                  <h2 className="text-3xl font-black text-foreground mb-6 group-hover:text-red-600 transition-colors uppercase tracking-tighter">{s.title}</h2>
                  <p className="text-foreground/50 leading-relaxed font-bold uppercase tracking-tight text-sm flex-1 mb-10">{s.desc}</p>
                  <Button asChild variant="black" className="w-full h-16 font-black uppercase tracking-[0.3em] transition-all">
                    <Link to={s.link} className="flex items-center justify-center gap-4 group/btn">
                      Explore Service <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-3" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section-padding bg-background border-t border-foreground/5">
        <div className="content-width">
          <div className="grid lg:grid-cols-3 gap-16 items-center">
            <div className="lg:col-span-1">
              <h2 className="text-foreground leading-[0.85] tracking-[-0.06em] text-5xl md:text-7xl font-black mb-8">
                Structured For<br /><span className="text-gradient">Reliability.</span>
              </h2>
            </div>
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-12">
              {[
                { icon: Zap, title: "Modern Technology", desc: "Integrating AI and top-tier digital tools into traditional creative workflows." },
                { icon: Sparkles, title: "Creative Depth", desc: "Every project starts with a strategic narrative, not just a recording button." },
                { icon: Layers, title: "Multi-Disciplinary", desc: "Our team handles sound, visuals, and marketing under one unified vision." },
                { icon: ArrowRight, title: "Community First", desc: "Accessible premium production for township startups and corporate firms alike." },
              ].map((item) => (
                <div key={item.title} className="space-y-6 group">
                  <h4 className="text-foreground font-black uppercase tracking-[0.2em] text-xs flex items-center gap-4">
                    <span className="h-2 w-2 rounded-full bg-red-600 group-hover:scale-150 transition-transform" />
                    {item.title}
                  </h4>
                  <p className="text-base text-foreground/50 font-bold uppercase tracking-tight leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative overflow-hidden bg-background text-center border-t border-foreground/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-red-600 opacity-[0.03] dark:opacity-[0.07]" />
          <div className="absolute inset-0 mesh-bg opacity-10" />
        </div>
        
        <div className="content-width relative z-10">
          <HeroSection>
            <h2 className="text-5xl md:text-8xl lg:text-9xl font-black mb-12 text-gradient leading-[0.85] tracking-[-0.06em]">
              Ready to Start<br />A Project?
            </h2>
          </HeroSection>
          <FadeInSection delay={0.2}>
            <p className="mx-auto max-w-4xl text-xl md:text-2xl text-foreground/50 mb-20 font-bold uppercase tracking-[0.2em] leading-relaxed">
              Whether it's a single session or a full brand transformation, we're ready to produce and scale your vision.
            </p>
          </FadeInSection>
          <FadeInSection delay={0.3}>
            <div className="flex flex-wrap justify-center gap-8">
              <Button
                onClick={() => openBooking({
                  service: "Strategy Call",
                  package: "Initial Consultation",
                  price: 0
                })}
                variant="red"
                size="lg"
                className="h-20 px-16 text-xs font-black rounded-full uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                Book a Strategy Call <ArrowRight className="h-4 w-4 ml-4" />
              </Button>
              <Button asChild variant="black" className="h-20 px-16 text-xs font-black rounded-full uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95 cursor-pointer">
                <Link to="/contact">Contact Support</Link>
              </Button>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
};

export default Services;


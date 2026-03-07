import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, Camera, Globe, ArrowRight, Zap, Sparkles, Layers } from "lucide-react";

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
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero */}
      <section className="relative py-32 md:py-48 flex items-center justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0 opacity-20 mesh-bg" />
        <div className="content-width relative z-10 text-center">
          <div className="mb-6 flex justify-center">
            <span className="px-4 py-1.5 rounded-full bg-red-600/10 border border-red-600/30 text-red-500 text-[10px] font-black uppercase tracking-[0.4em] backdrop-blur-md">
              Our Disciplines
            </span>
          </div>
          <h1 className="text-white text-gradient mb-8">
            Strategic Creative &<br />
            <span className="text-red-600">Digital Architecture.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-white/60 text-lg md:text-xl leading-relaxed">
            Three core disciplines. One standard — excellence. We bridge the gap between creative vision and professional execution.
          </p>
        </div>
      </section>

      {/* Service Grid */}
      <section className="section-padding bg-zinc-950">
        <div className="content-width">
          <div className="grid gap-8 md:grid-cols-3">
            {services.map((s, i) => (
              <div
                key={s.title}
                className="premium-card bg-black shadow-2xl border-white/5 flex flex-col h-full group hover:border-red-600/40"
              >
                <div className="mb-8 flex items-center justify-between">
                  <div className="h-14 w-14 rounded-2xl bg-red-600/10 border border-red-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <s.icon className="h-7 w-7 text-red-600" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 group-hover:text-red-500 transition-colors">{s.label}</span>
                </div>
                <h2 className="text-2xl font-black text-white mb-4 group-hover:text-red-600 transition-colors">{s.title}</h2>
                <p className="text-white/50 leading-relaxed font-medium flex-1 pb-10">{s.desc}</p>
                <Button asChild size="lg" className="w-full h-14 bg-white/5 hover:bg-red-600 text-white font-bold border-white/10 group/btn transition-all">
                  <Link to={s.link} className="flex items-center justify-center gap-3">
                    Explore Service <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-2" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section-padding bg-black border-t border-white/5">
        <div className="content-width">
          <div className="grid lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-1">
              <h2 className="text-white leading-tight">Structured For<br /><span className="text-red-600">Reliability.</span></h2>
            </div>
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-8">
              {[
                { icon: Zap, title: "Modern Technology", desc: "Integrating AI and top-tier digital tools into traditional creative workflows." },
                { icon: Sparkles, title: "Creative Depth", desc: "Every project starts with a strategic narrative, not just a recording button." },
                { icon: Layers, title: "Multi-Disciplinary", desc: "Our team handles sound, visuals, and marketing under one unified vision." },
                { icon: ArrowRight, title: "Community First", desc: "Accessible premium production for township startups and corporate firms alike." },
              ].map((item) => (
                <div key={item.title} className="space-y-3">
                  <h4 className="text-white font-black uppercase tracking-widest text-xs flex items-center gap-3">
                    <span className="h-1 w-1 rounded-full bg-red-600" />
                    {item.title}
                  </h4>
                  <p className="text-sm text-white/50 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-red-600 text-white relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.1)_0%,transparent_60%)]" />
        <div className="content-width relative z-10">
          <h2 className="text-white mb-8 text-4xl md:text-6xl font-black leading-none">Ready to Start a Project?</h2>
          <p className="mx-auto max-w-2xl text-xl opacity-90 mb-12 font-medium">
            Whether it's a single session or a full brand transformation, we're ready to produce.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button asChild size="lg" className="h-16 px-12 bg-white text-red-600 hover:bg-zinc-100 font-black uppercase tracking-widest text-sm shadow-2xl transition-all hover:scale-105">
              <Link to="/booking">Book a Strategy Call</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-16 px-12 border-white/40 text-white hover:bg-white/10 font-black uppercase tracking-widest text-sm transition-all">
              <Link to="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;


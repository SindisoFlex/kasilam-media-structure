import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mic, Camera, Globe, Zap, Users, Award, Clock, ArrowRight, MapPin, LineChart } from "lucide-react";
import { useBooking } from "@/contexts/BookingContext";
import heroBg from "@/images/hero-bg.png";
import { useEffect } from "react";

const steps = [
  { num: "01", title: "Consult", desc: "We understand your goals, vision, and expectations." },
  { num: "02", title: "Plan", desc: "We design a structured creative and digital strategy." },
  { num: "03", title: "Create", desc: "We produce high-quality media with precision and professionalism." },
  { num: "04", title: "Deliver", desc: "We deliver work that reflects excellence, intention, and impact." },
];

const Index = () => {
  const { openBooking } = useBooking();

  useEffect(() => {
    document.title = "KMP | Kasilam Media Productions – Photography, Video, Audio & Web Design in Port Elizabeth";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Kasilam Media Productions (KMP) is a creative production company in Port Elizabeth (Gqeberha), Eastern Cape providing photography, videography, audio production, and website development services for businesses and creators across South Africa.");
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 1. Hero Section - Cinematic & Professional */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
        <div
          className="absolute inset-0 z-0 scale-105 animate-subtle-zoom opacity-70"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 z-10 bg-background/50 backdrop-blur-[1px]" />
        <div className="absolute inset-0 z-11 mesh-bg opacity-20" />

        <div className="content-width relative z-20 text-center py-20">
          <h1 className="animate-fade-in mb-8 text-gradient">
            Creative Media Studio for Modern Brands, Artists,
            <br />
            <span className="text-primary italic">and Life&apos;s Biggest Moments.</span>
          </h1>
          <p
            className="mx-auto mt-8 max-w-3xl animate-fade-in text-lg md:text-2xl font-semibold uppercase tracking-[0.2em] text-foreground/80"
            style={{ animationDelay: "150ms" }}
          >
            Kasilam Media Productions (KMP) is a creative media production company based in Port Elizabeth (Gqeberha), Eastern Cape, offering professional photography, videography, audio production, and digital media services for clients across South Africa.
          </p>
          <div className="mt-8 animate-fade-in text-xs font-black uppercase tracking-[0.4em] text-primary/60" style={{ animationDelay: "200ms" }}>
            KMP | Kasilam Media Productions - Port Elizabeth, Eastern Cape & South Africa
          </div>
          <div className="mt-16 flex animate-fade-in flex-wrap justify-center gap-6" style={{ animationDelay: "300ms" }}>
            <Button
              onClick={() => openBooking({
                service: "General Inquiry",
                package: "Project Kickoff",
                price: 0
              })}
              variant="red"
              size="lg"
              className="h-16 px-12 text-[11px] font-black uppercase tracking-[0.3em] rounded-full transition-all hover:scale-105 active:scale-95 pointer-events-auto cursor-pointer"
            >
              Start Your Project <ArrowRight className="h-4 w-4 ml-3" />
            </Button>
            <Button
              asChild
              variant="black"
              size="lg"
              className="h-16 px-12 text-[11px] font-black uppercase tracking-[0.3em] rounded-full transition-all hover:scale-105 active:scale-95"
            >
              <Link to="/services">View Our Work</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Proven Creative & Digital Solutions */}
      <section className="section-padding bg-background border-b border-foreground/5">
        <div className="content-width">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="mb-6 text-gradient">Proven Creative &amp; Digital Solutions</h2>
            <p className="text-lg text-foreground/60 font-medium leading-relaxed">
              We build professional websites, create powerful visual content, and develop digital systems that help businesses grow, attract customers, and present themselves with confidence.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {[
              {
                icon: Globe,
                title: "Web Development",
                desc: "Professional websites and digital platforms designed for performance and business growth.",
                items: ["business websites", "service company websites", "portfolio websites", "custom web applications"],
              },
              {
                icon: Camera,
                title: "Content & Media Production",
                desc: "Professional visual content designed to strengthen brand identity and engagement.",
                items: ["brand videos", "social media visuals", "product photography", "short-form video content"],
              },
              {
                icon: LineChart,
                title: "Digital Growth Solutions",
                desc: "Tools and services that help businesses improve visibility and attract clients online.",
                items: ["social media management", "brand identity design", "SEO-ready website development", "marketing visuals"],
              },
            ].map((item) => (
              <div key={item.title} className="premium-card p-8 h-full">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-foreground/5 border border-foreground/10">
                  <item.icon className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-black text-foreground mb-3 uppercase tracking-tight">{item.title}</h3>
                <p className="text-sm text-foreground/60 font-medium leading-relaxed mb-6">{item.desc}</p>
                <ul className="space-y-3">
                  {item.items.map((entry) => (
                    <li key={entry} className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-foreground/70">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
                      {entry}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local SEO Section */}
      <section className="py-24 bg-background relative overflow-hidden border-b border-foreground/5">
        <div className="content-width">
          <div className="flex flex-col md:flex-row items-center gap-12 bg-foreground/5 dark:bg-white/5 p-12 rounded-[3rem] border border-foreground/10">
            <div className="h-20 w-20 rounded-3xl bg-primary/10 flex items-center justify-center shrink-0">
              <MapPin className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h2 className="text-3xl font-black mb-6 uppercase tracking-tight">Serving Port Elizabeth, Eastern Cape & South Africa</h2>
              <p className="text-xl text-foreground/60 leading-relaxed font-medium">
                Kasilam Media Productions (KMP) is proudly based in Port Elizabeth (Gqeberha) in the Eastern Cape. We collaborate with artists, businesses, and organizations across South Africa to produce professional photography, video, audio, and digital media content.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Who We Help - Futuristic Grid */}
      <section className="section-padding relative overflow-hidden bg-alternate/50">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
        <div className="content-width">
          <div className="max-w-4xl mx-auto text-center mb-32">
            <h2 className="mb-8 text-gradient">Who We Work With</h2>
            <p className="text-xl font-medium uppercase tracking-widest text-foreground/50">
              Strategic creative services for leaders, creators, and communities.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="premium-card group">
              <div className="mb-8 h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-6">Businesses</h3>
              <p className="text-base mb-10 text-foreground/60 font-medium leading-relaxed">
                For entrepreneurs, startups, and growing businesses ready to build credibility and stand out in the digital world.
              </p>
              <div className="space-y-5 mb-12 flex-grow">
                {["Business websites", "Corporate photography", "Promotional videos", "Digital brand support"].map((item) => (
                  <div key={item} className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-foreground/80">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p className="font-black text-[10px] uppercase tracking-[0.4em] text-primary">Visibility & Trust</p>
            </div>

            <div className="premium-card group border-primary/20 bg-background/50 scale-105 shadow-[0_20px_40px_-10px_rgba(220,38,38,0.1)] dark:shadow-[0_0_100px_-20px_rgba(220,38,38,0.1)]">
              <div className="mb-8 h-12 w-12 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 red-glow">
                <Mic className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-6">Artists</h3>
              <p className="text-base mb-10 text-foreground/60 font-medium leading-relaxed">
                Helping musicians and creators produce professional sound and visuals that compete on a global stage.
              </p>
              <div className="space-y-5 mb-12 flex-grow">
                {["Music recording", "Voiceovers", "Music videos", "Audio editing & mixing"].map((item) => (
                  <div key={item} className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-foreground/80">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p className="font-black text-[10px] uppercase tracking-[0.4em] text-primary">Creativity & Impact</p>
            </div>

            <div className="premium-card group">
              <div className="mb-8 h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <Camera className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-6">Community</h3>
              <p className="text-base mb-10 text-foreground/60 font-medium leading-relaxed">
                For families preserving life&apos;s most important milestones with professionalism, respect, and care.
              </p>
              <div className="space-y-5 mb-12 flex-grow">
                {["Weddings", "Graduations", "Funerals & memorials", "Celebrations & events"].map((item) => (
                  <div key={item} className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-foreground/80">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p className="font-black text-[10px] uppercase tracking-[0.4em] text-primary">Preservation & Care</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Services Architecture */}
      <section className="section-padding bg-background relative border-y border-foreground/5">
        <div className="content-width">
          <div className="max-w-4xl mx-auto text-center mb-32">
            <h2 className="mb-8 text-gradient">Services Architecture</h2>
            <p className="text-xl font-medium uppercase tracking-widest text-foreground/40">Bridging the gap between media and technology.</p>
          </div>
          <div className="grid gap-20 lg:grid-cols-2">
            <div className="space-y-16">
              <div className="flex items-center gap-6 mb-16">
                <div className="h-14 w-1 bg-red-600 rounded-full red-glow" />
                <h3 className="text-3xl font-black uppercase tracking-[0.3em] text-foreground/80">Core Identity</h3>
              </div>
              <div className="space-y-16 pl-8 border-l border-foreground/5 dark:border-white/5">
                {[
                  { icon: Camera, title: "Photography", desc: "Events, weddings, graduations, lifestyle, and corporate photography." },
                  { icon: Mic, title: "Audio Production", desc: "Professional music recording, voiceovers, podcast production, and audio mixing." },
                  { icon: ArrowRight, title: "Videography", desc: "Event coverage, promotional videos, music videos, and cinematic storytelling." },
                ].map((s) => (
                  <div key={s.title} className="group transition-all">
                    <h4 className="text-2xl font-bold flex items-center gap-6 mb-4 group-hover:text-red-500 transition-colors">
                      <div className="rounded-2xl bg-foreground/5 p-4 border border-foreground/5 group-hover:border-red-600/30 transition-all dark:bg-white/5 dark:border-white/5">
                        <s.icon className="h-6 w-6 text-red-600" />
                      </div>
                      {s.title}
                    </h4>
                    <p className="text-lg text-foreground/50 leading-relaxed font-medium">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-16">
              <div className="flex items-center gap-6 mb-16">
                <div className="h-14 w-1 bg-foreground/20 rounded-full dark:bg-white/20" />
                <h3 className="text-3xl font-black uppercase tracking-[0.3em] text-foreground/40 dark:text-white/60">Growth Services</h3>
              </div>
              <div className="space-y-16 pl-8 border-l border-foreground/5 dark:border-white/5">
                {[
                  { icon: Globe, title: "Web Development", desc: "Modern business, portfolio, and startup websites with full maintenance support." },
                  { icon: Zap, title: "Digital Marketing", desc: "Brand visibility strategies, social media content creation, and online presence optimization." },
                  { icon: Award, title: "AI & Automation", desc: "AI-assisted content creation and smart digital workflows that help businesses operate faster and more efficiently." },
                ].map((s) => (
                  <div key={s.title} className="group transition-all">
                    <h4 className="text-2xl font-bold flex items-center gap-6 mb-4 group-hover:text-red-500 transition-colors">
                      <div className="rounded-2xl bg-foreground/5 p-4 border border-foreground/5 group-hover:border-red-600/30 transition-all dark:bg-white/5 dark:border-white/5">
                        <s.icon className="h-6 w-6 text-red-600" />
                      </div>
                      {s.title}
                    </h4>
                    <p className="text-lg text-foreground/50 leading-relaxed font-medium">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Our Process - Methodical Layout */}
      <section className="section-padding bg-alternate relative overflow-hidden">
        <div className="content-width">
          <div className="max-w-4xl mx-auto text-center mb-32">
            <h2 className="mb-8 text-gradient">The KMP Methodology</h2>
            <p className="text-xl font-medium uppercase tracking-widest text-foreground/40">Structured planning for elite results.</p>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 mb-20">
            {steps.map((s) => (
              <div key={s.num} className="premium-card group h-full">
                <div className="flex items-center justify-between mb-12">
                  <span className="text-7xl font-black text-foreground/5 dark:text-white/5 group-hover:text-red-600/10 transition-colors leading-none">{s.num}</span>
                </div>
                <h3 className="text-2xl font-bold mb-5 uppercase tracking-tight">{s.title}</h3>
                <p className="text-base leading-relaxed text-foreground/50 font-medium">{s.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mb-24">
            <p className="hidden md:block text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40">
              Click on a service card to explore the package details.
            </p>
            <p className="md:hidden text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40">
              Tap a service card to explore the package details.
            </p>
          </div>

          <div className="text-center">
            <div className="inline-block px-10 py-5 rounded-full bg-foreground/5 border border-foreground/10 tech-border dark:bg-white/5 dark:border-white/10">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-red-600">Clear. Efficient. Professional.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Why Work With Us */}
      <section className="section-padding bg-background">
        <div className="content-width text-center">
          <h2 className="mb-32 text-gradient">Why Choose Our Studio?</h2>
          <div className="grid gap-20 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Award, title: "Strategic Thinking", desc: "Every project is designed with long-term brand growth in mind." },
              { icon: Users, title: "Inclusive Access", desc: "High-quality media production accessible to startups, artists, and corporate clients." },
              { icon: Zap, title: "Modern Technology", desc: "We integrate modern digital tools, AI, and creative innovation into every workflow." },
              { icon: Clock, title: "Reliable Delivery", desc: "Clear timelines, transparent communication, and professional results you can trust." },
            ].map((r) => (
              <div key={r.title} className="flex flex-col items-center group">
                <div className="mb-10 rounded-[2.5rem] bg-foreground/5 p-8 border border-foreground/5 group-hover:border-red-600/30 group-hover:-rotate-12 transition-all duration-700 dark:bg-white/5 dark:border-white/5">
                  <r.icon className="h-8 w-8 text-red-600" />
                </div>
                <h4 className="font-bold text-2xl mb-6 uppercase tracking-tight tracking-[-0.03em]">{r.title}</h4>
                <p className="text-base text-foreground/40 leading-relaxed max-w-[260px] font-medium">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Portfolio Preview */}
      <section className="section-padding bg-alternate border-y border-foreground/5">
        <div className="content-width">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-10">
            <div className="max-w-2xl">
              <h2 className="mb-8 text-gradient">Selected Projects</h2>
              <p className="text-xl text-foreground/50 font-medium">
                Real stories captured through powerful visuals, cinematic video, and professional sound.
              </p>
            </div>
            <Button asChild variant="link" className="h-auto p-0 text-red-600 font-black uppercase tracking-[0.3em] text-[10px] group transition-all">
              <Link to="/portfolio" className="flex items-center gap-4">
                View Full Portfolio <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-3" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="premium-card p-0 aspect-video flex items-center justify-center group overflow-hidden relative border-foreground/5 hover:border-red-600/50">
                <Camera className="h-10 w-10 text-foreground/10 group-hover:text-red-600/30 transition-all duration-700 z-10 scale-90 group-hover:scale-125 dark:text-white/10" />
                <div className="absolute inset-0 bg-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Commitment Section */}
      <section className="section-padding bg-background">
        <div className="content-width">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-8 text-gradient">Our Commitment</h2>
            <p className="text-xl text-foreground/50 font-medium leading-relaxed">
              At Kasilam Media Productions, every project is handled with professionalism, creativity, and attention to
              detail. We work closely with our clients to ensure every visual, sound, and digital experience reflects
              their vision and tells their story in a powerful and authentic way.
            </p>
          </div>
        </div>
      </section>

      {/* SEO FAQ Section */}
      <section className="section-padding bg-alternate/30 border-y border-foreground/5">
        <div className="content-width">
          <div className="max-w-4xl mx-auto text-center mb-24">
            <h2 className="mb-8 text-gradient">Frequently Asked Questions</h2>
            <p className="text-xl font-medium uppercase tracking-widest text-foreground/50">Learn more about our services and coverage.</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-8">
            {[
              {
                q: "What is KMP Media?",
                a: "KMP Media refers to Kasilam Media Productions (KMP), a creative media production company based in Port Elizabeth offering photography, videography, audio production, and web development services."
              },
              {
                q: "Where is KMP based?",
                a: "Kasilam Media Productions (KMP) is based in Port Elizabeth (Gqeberha) in the Eastern Cape and works with clients across South Africa."
              },
              {
                q: "Can clients from outside the Eastern Cape work with KMP?",
                a: "Yes. Kasilam Media Productions (KMP) collaborates with artists, creators, and businesses across South Africa."
              }
            ].map((faq, i) => (
              <div key={i} className="premium-card p-8 group">
                <h3 className="text-xl font-black mb-4 uppercase tracking-tight text-foreground/80 group-hover:text-primary transition-colors">
                  {faq.q}
                </h3>
                <p className="text-base text-foreground/50 leading-relaxed font-medium">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Final CTA Section - Cinematic & Minimal */}
      <section className="section-padding relative overflow-hidden bg-alternate border-t border-foreground/5">
        <div className="absolute inset-0 mesh-bg opacity-10 dark:opacity-30" />
        <div className="content-width relative z-10 text-center">
          <h2 className="text-5xl md:text-8xl lg:text-9xl font-black mb-12 text-gradient leading-[0.85] tracking-[-0.06em]">
            Let&apos;s Bring Your
            <br />
            Vision to Life.
          </h2>
          <p className="mx-auto max-w-4xl text-xl md:text-2xl text-foreground/50 mb-20 font-semibold uppercase tracking-[0.2em] leading-relaxed">
            Creative media solutions for bold brands, growing businesses, and unforgettable moments.
          </p>
          <div className="flex justify-center flex-wrap gap-8">
            <Button
              onClick={() => openBooking({
                service: "General Inquiry",
                package: "Project Kickoff",
                price: 0
              })}
              variant="red"
              size="lg"
              className="h-20 px-16 text-xs font-black rounded-full uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95 pointer-events-auto cursor-pointer"
            >
              Start Your Project
            </Button>
            <Button
              asChild
              variant="black"
              size="lg"
              className="h-20 px-16 text-xs font-black rounded-full uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95"
            >
              <Link to="/contact">Request Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

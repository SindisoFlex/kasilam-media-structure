import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, Users, Award, Clock, ArrowRight, MapPin } from "lucide-react";
import { useBooking } from "@/contexts/BookingContext";
import heroBg from "@/images/hero-bg.png";
import { useEffect } from "react";

const steps = [
  { num: "01", title: "Discovery", desc: "We clarify your goals, audience, and success metrics." },
  { num: "02", title: "Planning", desc: "We shape the strategy, scope, and production roadmap." },
  { num: "03", title: "Production", desc: "We execute with professional media, design, and technical rigor." },
  { num: "04", title: "Delivery", desc: "We launch, hand over, and support the final outcome." },
];

const Index = () => {
  const { openBooking } = useBooking();

  useEffect(() => {
    document.title = "KMP | Kasilam Media Productions - Photography, Video & Digital Services in Port Elizabeth";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Kasilam Media Productions (KMP) delivers professional photography, videography, website development, and digital marketing in Port Elizabeth (Gqeberha), Eastern Cape, serving businesses across South Africa."
      );
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
            Technology &amp; Media Studio
            <br />
            <span className="text-primary italic">for Modern Brands.</span>
          </h1>
          <p
            className="mx-auto mt-6 max-w-3xl animate-fade-in text-lg md:text-2xl font-semibold text-foreground/80 leading-relaxed"
            style={{ animationDelay: "150ms" }}
          >
            We combine visual production, web development, and digital strategy to help businesses and creators build powerful digital presence across South Africa.
          </p>
          <p
            className="mt-6 animate-fade-in text-sm md:text-base font-bold uppercase tracking-[0.2em] text-primary/70"
            style={{ animationDelay: "200ms" }}
          >
            Serving creators, entrepreneurs, and businesses across Gqeberha, the Eastern Cape, and South Africa.
          </p>
          <div className="mt-14 flex animate-fade-in flex-wrap justify-center gap-6" style={{ animationDelay: "300ms" }}>
            <Button
              asChild
              variant="black"
              size="lg"
              className="h-16 px-12 text-[11px] font-black uppercase tracking-[0.3em] rounded-full transition-all hover:scale-105 active:scale-95"
            >
              <Link to="/services">View Services</Link>
            </Button>
            <Button
              asChild
              variant="outlineBlack"
              size="lg"
              className="h-16 px-12 text-[11px] font-black uppercase tracking-[0.3em] rounded-full transition-all hover:scale-105 active:scale-95"
            >
              <Link to="/portfolio">View Portfolio</Link>
            </Button>
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
              Start a Project <ArrowRight className="h-4 w-4 ml-3" />
            </Button>
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

      {/* 2. Client Types */}
      <section className="section-padding relative overflow-hidden bg-alternate/50">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
        <div className="content-width">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h2 className="mb-8 text-gradient">Who We Work With</h2>
            <p className="text-xl font-medium text-foreground/60">
              Entrepreneurs, small businesses, growing brands, creators, and organizations - all supported with the same professional standard.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { title: "Entrepreneurs", desc: "Launch-ready brand and digital foundations." },
              { title: "Small Businesses", desc: "Professional content and websites that convert." },
              { title: "Growing Brands", desc: "Scalable media and marketing execution." },
              { title: "Creators", desc: "High-end visual and video storytelling." },
              { title: "Organizations", desc: "Reliable production for teams and campaigns." },
            ].map((item) => (
              <div key={item.title} className="premium-card p-6 text-left bg-background">
                <h3 className="text-lg font-black mb-3">{item.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Services Overview */}
      <section className="section-padding bg-background relative border-y border-foreground/5">
        <div className="content-width">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h2 className="mb-8 text-gradient">Services Overview</h2>
            <p className="text-xl font-medium text-foreground/60">
              Integrated creative and digital services built for clarity, growth, and consistency.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {[
              {
                title: "Creative Production",
                desc: "Photography, videography, and event production.",
                link: "/services/visual-production",
              },
              {
                title: "Digital Services",
                desc: "Website development, content creation, and SEO optimization.",
                link: "/services/web-development",
              },
              {
                title: "Marketing Support",
                desc: "Social media content, brand promotion, and analytics reporting.",
                link: "/services/digital-marketing",
              },
            ].map((service) => (
              <div key={service.title} className="premium-card p-8 bg-background flex flex-col justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.35em] text-primary mb-3">Service</p>
                  <h3 className="text-2xl font-black mb-4">{service.title}</h3>
                  <p className="text-base text-foreground/60 leading-relaxed">{service.desc}</p>
                </div>
                <Button
                  asChild
                  variant="link"
                  className="mt-8 h-auto p-0 text-red-600 font-black uppercase tracking-[0.3em] text-[10px]"
                >
                  <Link to={service.link} className="flex items-center gap-3">
                    Explore Service <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Process */}
      <section className="section-padding bg-alternate relative overflow-hidden">
        <div className="content-width">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h2 className="mb-8 text-gradient">Project Workflow</h2>
            <p className="text-xl font-medium text-foreground/60">A simple, reliable process from idea to delivery.</p>
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
          
          <div className="text-center">
            <div className="inline-block px-10 py-5 rounded-full bg-foreground/5 border border-foreground/10 tech-border dark:bg-white/5 dark:border-white/10">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-red-600">Clear. Efficient. Professional.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Why Businesses Work With Us */}
      <section className="section-padding bg-background">
        <div className="content-width text-center">
          <h2 className="mb-20 text-gradient">Why Businesses Work With Us</h2>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Award, title: "Production Quality", desc: "Professional visuals, audio, and digital execution across every deliverable." },
              { icon: Zap, title: "Strategic Creativity", desc: "Creative thinking aligned to brand goals, growth, and ROI." },
              { icon: Clock, title: "Reliable Execution", desc: "Clear timelines, structured workflows, and consistent delivery." },
              { icon: Users, title: "Local Insight", desc: "Deep understanding of Port Elizabeth (Gqeberha) business realities and audience culture." },
            ].map((r) => (
              <div key={r.title} className="flex flex-col items-center group">
                <div className="mb-8 rounded-[2.5rem] bg-foreground/5 p-6 border border-foreground/5 group-hover:border-red-600/30 transition-all duration-700 dark:bg-white/5 dark:border-white/5">
                  <r.icon className="h-7 w-7 text-red-600" />
                </div>
                <h4 className="font-bold text-xl mb-4 uppercase tracking-tight tracking-[-0.03em]">{r.title}</h4>
                <p className="text-base text-foreground/50 leading-relaxed max-w-[260px] font-medium">{r.desc}</p>
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
              <h2 className="mb-8 text-gradient">Portfolio Highlights</h2>
              <p className="text-xl text-foreground/50 font-medium">
                Photography, video production, and digital projects that reflect real outcomes.
              </p>
            </div>
            <Button asChild variant="link" className="h-auto p-0 text-red-600 font-black uppercase tracking-[0.3em] text-[10px] group transition-all">
              <Link to="/portfolio" className="flex items-center gap-4">
                View Full Portfolio <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-3" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Photography",
                desc: "Portraits, events, and brand imagery captured with precision.",
                link: "/portfolio/photography",
              },
              {
                title: "Video Production",
                desc: "Cinematic storytelling, promotional video, and coverage.",
                link: "/portfolio/videography",
              },
              {
                title: "Digital Projects",
                desc: "Business websites and brand-ready digital experiences.",
                link: "/portfolio/restaurant-demo",
              },
            ].map((item) => (
              <Link
                key={item.title}
                to={item.link}
                className="premium-card p-8 bg-background group border-foreground/10 hover:border-red-600/40 transition-all"
              >
                <div className="mb-6 h-40 rounded-2xl bg-gradient-to-br from-foreground/10 via-background to-foreground/5 border border-foreground/10 group-hover:border-red-600/40 transition-colors" />
                <h3 className="text-2xl font-black mb-3">{item.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">{item.desc}</p>
                <div className="mt-6 text-[10px] font-black uppercase tracking-[0.3em] text-red-600">
                  View Work
                </div>
              </Link>
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

      {/* 8. Final CTA Section */}
      <section className="section-padding relative overflow-hidden bg-alternate border-t border-foreground/5">
        <div className="absolute inset-0 mesh-bg opacity-10 dark:opacity-30" />
        <div className="content-width relative z-10 text-center">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-10 text-gradient leading-[0.9] tracking-[-0.05em]">
            Let&apos;s Build Something
            <br />
            Powerful Together.
          </h2>
          <p className="mx-auto max-w-4xl text-xl md:text-2xl text-foreground/60 mb-16 font-semibold leading-relaxed">
            Share your project ideas and explore how KMP can bring them to life with professional media and digital execution.
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
              Start a Project
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

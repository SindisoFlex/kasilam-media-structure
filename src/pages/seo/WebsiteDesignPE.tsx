import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Globe, ArrowRight, MapPin, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { FadeInSection, HeroSection } from "@/components/animations";

const WebsiteDesignPE = () => {
  useEffect(() => {
    document.title = "Website Design Port Elizabeth | Professional Web Development | KMP";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Looking for professional website design in Port Elizabeth? Kasilam Media Productions (KMP) provides high-end web development and digital solutions for businesses in Gqeberha and across South Africa.");
    }
  }, []);

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 z-10 bg-background/80 backdrop-blur-sm" />
        <div className="content-width relative z-20 text-center">
          <HeroSection>
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 backdrop-blur-md dark:bg-white/5 dark:border-white/10">
              <Globe className="h-4 w-4 text-green-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground dark:text-white">
                Digital Innovation
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[0.9] tracking-tight text-gradient">
              Website Design <br />
              <span className="italic text-green-500 text-4xl md:text-6xl lg:text-7xl">Port Elizabeth.</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/50 font-medium max-w-2xl mx-auto leading-relaxed dark:text-white/50">
              Premium web development by Kasilam Media Productions (KMP). Modern digital solutions in Gqeberha and across South Africa.
            </p>
          </HeroSection>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-background">
        <div className="content-width">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <FadeInSection>
              <h2 className="text-4xl md:text-6xl font-black mb-8 text-gradient">Digital Presence.</h2>
              <p className="text-lg text-foreground/60 leading-relaxed mb-8 dark:text-white/60">
                Kasilam Media Productions (KMP) is a creative media production company based in Port Elizabeth (Gqeberha), Eastern Cape. We build and manage high-performance websites and web applications for businesses, brands, and organizations. From minimalist business sites to complex digital platforms, our team ensures your online presence is modern, measurable, and effective.
              </p>
              <div className="flex items-center gap-4 text-green-500 font-black uppercase tracking-widest text-xs">
                <MapPin className="h-5 w-5" />
                <span>Serving PE, Eastern Cape & South Africa</span>
              </div>
            </FadeInSection>
            <FadeInSection delay={0.2} className="relative aspect-square rounded-[3rem] overflow-hidden border border-foreground/10 dark:border-white/10">
              <img src="https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1000&q=80" alt="Web Design PE" className="h-full w-full object-cover" />
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-card/30">
        <div className="content-width">
          <FadeInSection className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6 text-foreground">Our Web Process</h2>
            <p className="text-foreground/40 uppercase tracking-[0.3em] font-black text-xs dark:text-white/40">Digital ecosystems built for growth</p>
          </FadeInSection>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Strategy & UX", desc: "We discuss your brand goals and plan the digital journey for your users in Port Elizabeth." },
              { title: "Development", desc: "Our KMP team builds your website with modern technology and professional design standards." },
              { title: "Launch & Optimize", desc: "We deploy your project and ensure it's optimized for search engines and real results." }
            ].map((step, i) => (
              <FadeInSection key={i} delay={i * 0.1} className="premium-card p-8 border-foreground/10 dark:border-white/5">
                <div className="text-green-500 text-4xl font-black mb-6">0{i + 1}</div>
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter text-foreground dark:text-white">{step.title}</h3>
                <p className="text-foreground/50 leading-relaxed dark:text-white/50">{step.desc}</p>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding text-center">
        <div className="content-width">
          <FadeInSection>
            <h2 className="text-5xl md:text-8xl font-black mb-12 text-gradient tracking-tight">Ready to Build Your Site?</h2>
            <p className="text-xl text-foreground/50 mb-16 uppercase tracking-widest font-bold dark:text-white/50">Start your Port Elizabeth website design project today.</p>
            <Button asChild variant="red" size="lg" className="h-20 px-16 text-xs font-black rounded-full uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95">
              <Link to="/contact">Inquire Now <ArrowRight className="h-4 w-4 ml-4" /></Link>
            </Button>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
};

export default WebsiteDesignPE;

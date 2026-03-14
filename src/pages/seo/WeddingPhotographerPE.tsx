import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Camera, ArrowRight, CheckCircle, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { FadeInSection, HeroSection } from "@/components/animations";

const WeddingPhotographerPE = () => {
  useEffect(() => {
    document.title = "Wedding Photographer Port Elizabeth | Cinematic Wedding Photography | KMP";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Looking for a professional wedding photographer in Port Elizabeth? Kasilam Media Productions (KMP) provides cinematic wedding photography for traditional and white weddings across the Eastern Cape.");
    }
  }, []);

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 z-10 bg-background/80 backdrop-blur-sm" />
        <div className="content-width relative z-20 text-center">
          <HeroSection>
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 backdrop-blur-md dark:bg-white/5 dark:border-white/10">
              <Camera className="h-4 w-4 text-red-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground dark:text-white">
                Specialized Service
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[0.9] tracking-tight text-gradient">
              Wedding Photographer <br />
              <span className="italic text-primary text-4xl md:text-6xl lg:text-7xl">Port Elizabeth.</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/50 font-medium max-w-2xl mx-auto leading-relaxed dark:text-white/50">
              Professional wedding photography by Kasilam Media Productions (KMP). Capturing your love story in Gqeberha and across South Africa.
            </p>
          </HeroSection>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-background">
        <div className="content-width">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <FadeInSection>
              <h2 className="text-4xl md:text-6xl font-black mb-8 text-gradient">Capturing Forever.</h2>
              <p className="text-lg text-foreground/60 leading-relaxed mb-8 dark:text-white/60">
                Kasilam Media Productions (KMP) is a creative media production company based in Port Elizabeth (Gqeberha), Eastern Cape. We specialize in high-end wedding photography that blends cinematic artistry with authentic storytelling. Whether it&apos;s a traditional ceremony or a modern white wedding, we ensure your special day is documented with absolute precision and elegance.
              </p>
              <div className="flex items-center gap-4 text-primary font-black uppercase tracking-widest text-xs">
                <MapPin className="h-5 w-5" />
                <span>Serving PE, Eastern Cape & South Africa</span>
              </div>
            </FadeInSection>
            <FadeInSection delay={0.2} className="relative aspect-square rounded-[3rem] overflow-hidden border border-foreground/10 dark:border-white/10">
              <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=80" alt="Wedding Photography PE" className="h-full w-full object-cover" />
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-card/30">
        <div className="content-width">
          <FadeInSection className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6 text-foreground">Our Wedding Process</h2>
            <p className="text-foreground/40 uppercase tracking-[0.3em] font-black text-xs dark:text-white/40">How we document your big day</p>
          </FadeInSection>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Consultation", desc: "We meet in Port Elizabeth or via video call to discuss your wedding timeline and vision." },
              { title: "The Big Day", desc: "Our KMP team captures every detail, from the intimate preparations to the vibrant celebration." },
              { title: "Premium Delivery", desc: "We deliver a professionally edited gallery of your memories, ready for your family legacy." }
            ].map((step, i) => (
              <FadeInSection key={i} delay={i * 0.1} className="premium-card p-8 border-foreground/10 dark:border-white/5">
                <div className="text-red-600 text-4xl font-black mb-6">0{i + 1}</div>
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
            <h2 className="text-5xl md:text-8xl font-black mb-12 text-gradient tracking-tight">Let&apos;s Talk Weddings.</h2>
            <p className="text-xl text-foreground/50 mb-16 uppercase tracking-widest font-bold dark:text-white/50">Book your Port Elizabeth wedding photographer today.</p>
            <Button asChild variant="red" size="lg" className="h-20 px-16 text-xs font-black rounded-full uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95">
              <Link to="/contact">Inquire Now <ArrowRight className="h-4 w-4 ml-4" /></Link>
            </Button>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
};

export default WeddingPhotographerPE;

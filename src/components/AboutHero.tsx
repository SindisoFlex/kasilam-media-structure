import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const AboutHero = () => {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden pt-20 bg-background" aria-labelledby="about-hero-title">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
        <div className="absolute inset-0">
          <img
            src="/about-hero.svg"
            alt="Creative production workspace with editing tools and media equipment"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background" />
        <div className="absolute inset-0 mesh-bg opacity-10 dark:opacity-20" />
      </div>

      {/* 2. Content Section - Centered and High Contrast */}
      <div className="content-width relative z-10 text-center py-20">
        <div className="max-w-4xl mx-auto">
          <h1 id="about-hero-title" className="animate-fade-in mb-8 text-gradient tracking-tight leading-[1.1]">
            Built From Experience.
            <br />
            <span className="text-primary italic">Structured for Growth.</span>
          </h1>
          
          <div className="space-y-8">
            <p className="animate-fade-in text-lg md:text-2xl font-semibold text-foreground/80 leading-relaxed max-w-3xl mx-auto" style={{ animationDelay: "150ms" }}>
              Kasilam Media Production is a multidisciplinary creative studio in Port Elizabeth (Gqeberha), Eastern Cape, operating at the intersection of media, technology, and strategic brand visibility.
            </p>
            
            <p className="animate-fade-in text-base md:text-lg text-foreground/60 leading-relaxed max-w-2xl mx-auto font-medium" style={{ animationDelay: "300ms" }}>
              We bridge the gap between talent and visibility for brands, creators, and businesses across South Africa.
            </p>
          </div>

          <div className="mt-12 flex animate-fade-in flex-wrap justify-center gap-6" style={{ animationDelay: "450ms" }}>
            <Button asChild variant="red" size="lg" className="h-16 px-12 text-[11px] font-black uppercase tracking-[0.3em] rounded-full transition-all hover:scale-105 active:scale-95 shadow-xl shadow-red-600/10">
              <Link to="/contact">Work With Us <ArrowRight className="h-4 w-4 ml-3" /></Link>
            </Button>
            <Button asChild variant="black" size="lg" className="h-16 px-12 text-[11px] font-black uppercase tracking-[0.3em] rounded-full transition-all hover:scale-105 active:scale-95">
              <Link to="/services">View Our Work</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* 3. Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default AboutHero;

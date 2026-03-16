import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight, Camera } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";

const FuneralPhotographyPage = () => {
  useEffect(() => {
    document.title = "Funeral Photography | Respectful Memorial Coverage";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Dignified and respectful funeral photography coverage to honor your loved ones.");
    }
  }, []);

  return (
    <div className="bg-background text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <div className="content-width relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <Heart className="h-4 w-4 text-amber-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">
                Funeral Photography
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[0.9] tracking-tight text-gradient">
              Funeral Photography in <br />
              <span className="italic text-amber-500">Gqeberha & Eastern Cape.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/50 font-medium max-w-2xl leading-relaxed">
              Respectful and dignified memorial photography capturing love, remembrance, and legacy for families across the Eastern Cape.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Access Section */}
      <section className="pb-32">
        <div className="content-width">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.02] p-8 transition-all duration-500 hover:border-amber-500/50"
            >
              <div className="aspect-square mb-8 overflow-hidden rounded-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1516589174184-c685266d4303?auto=format&fit=crop&w=800&q=80" 
                  alt="Funeral Gallery"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              <div className="text-center">
                <h3 className="text-2xl font-black mb-3 text-white">Funeral Gallery</h3>
                <p className="text-white/60 mb-8 font-medium">
                  Browse our collection of respectful memorial service coverage and remembrance photography.
                </p>
                <Button asChild className="w-full h-14 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] bg-amber-500 text-black hover:bg-amber-600 transition-all duration-300">
                  <Link to="/portfolio/photography/funeral/gallery" className="flex items-center justify-center gap-3">
                    Open Gallery
                    <Camera className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section-padding border-t border-white/5 bg-white/[0.01]">
        <div className="content-width text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-500 mb-6">Our Philosophy</p>
          <h2 className="text-4xl md:text-6xl font-black mb-8">Dignity in Every Detail.</h2>
          <div className="grid md:grid-cols-3 gap-12 text-left mt-20">
            <div>
              <h4 className="text-amber-500 font-black uppercase tracking-wider mb-4">Discreet Presence</h4>
              <p className="text-white/50 leading-relaxed">Our photographers blend into the background, ensuring the focus remains on the ceremony and the family.</p>
            </div>
            <div>
              <h4 className="text-amber-500 font-black uppercase tracking-wider mb-4">Emotional Intelligence</h4>
              <p className="text-white/50 leading-relaxed">We understand the gravity of these moments and capture them with the sensitivity they deserve.</p>
            </div>
            <div>
              <h4 className="text-amber-500 font-black uppercase tracking-wider mb-4">Lasting Legacy</h4>
              <p className="text-white/50 leading-relaxed">Creating a visual record that honors the departed and provides comfort to the living for generations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Arrange Coverage CTA */}
      <section className="section-padding border-t border-white/5 bg-gradient-to-b from-background via-amber-900/5 to-background">
        <div className="content-width text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-6">Arrange Memorial Coverage</h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto mb-10">
            If you need respectful and professional funeral photography, our team is available to document memorial services with care and discretion.
          </p>
          <div className="flex justify-center flex-wrap gap-6">
            <Button asChild size="lg" className="h-16 px-10 text-xs font-black uppercase tracking-[0.3em] bg-amber-500 text-black hover:bg-amber-600 transition-all">
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-16 px-10 text-xs font-black uppercase tracking-[0.3em] border-white/10 hover:bg-white/5">
              <a href="https://wa.me/27732238078" target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FuneralPhotographyPage;

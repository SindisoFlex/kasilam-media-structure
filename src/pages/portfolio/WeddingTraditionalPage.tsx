import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Camera, Home, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";

const WeddingTraditionalPage = () => {
  useEffect(() => {
    document.title = "Traditional Wedding Gallery | Kasilam Media Productions";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Browse our traditional wedding photography gallery. Celebrating cultural heritage and vibrant unions.");
    }
  }, []);

  return (
    <div className="bg-[#0b0b0b] text-white min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0b0b]/90 backdrop-blur-md">
        <div className="content-width flex items-center justify-between py-6">
          <div className="flex items-center gap-4">
            <Link to="/portfolio/photography/wedding" className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <ChevronLeft className="h-5 w-5 text-red-500" />
            </Link>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500">Wedding Portfolio</p>
              <h1 className="text-xl font-black">Traditional Wedding</h1>
            </div>
          </div>
          <Button asChild variant="outline" className="h-12 px-6 text-[10px] font-black uppercase tracking-[0.3em] border-white/10 hover:bg-white/5">
            <Link to="/portfolio/photography" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Portfolio Hub
            </Link>
          </Button>
        </div>
      </header>

      {/* Gallery Section */}
      <section className="section-padding pt-12">
        <div className="content-width">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p className="text-sm text-white/50 font-medium mb-4">Capturing the rich cultural heritage and vibrant celebrations.</p>
            <h2 className="text-3xl md:text-5xl font-black text-gradient">Traditional Unions.</h2>
          </motion.div>

          {/* Placeholder Gallery */}
          <div className="grid gap-8 md:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: item * 0.1 }}
                className="aspect-square relative overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] flex items-center justify-center group"
              >
                <div className="text-center p-8 transition-transform duration-500 group-hover:scale-110">
                  <Camera className="h-12 w-12 text-red-500/20 mx-auto mb-4" />
                  <p className="text-white/20 text-xs font-black uppercase tracking-widest">Gallery Placeholder {item}</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>

          {/* Coming Soon Message */}
          <div className="mt-20 text-center py-20 rounded-[3rem] border border-dashed border-white/10 bg-white/[0.01]">
            <Sparkles className="h-12 w-12 text-red-500 mx-auto mb-6 opacity-50" />
            <h3 className="text-2xl font-black mb-4">Gallery Update in Progress</h3>
            <p className="text-white/40 max-w-lg mx-auto leading-relaxed">
              We are currently curating our finest traditional wedding coverage. Check back soon for the full high-resolution gallery.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WeddingTraditionalPage;

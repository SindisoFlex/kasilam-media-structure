import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Video, Home, Play, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";

const VideographyPage = () => {
  useEffect(() => {
    document.title = "Videography Portfolio | Coming Soon | Kasilam Media Productions";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Our videography portfolio is coming soon. Stay tuned for elite cinematic productions and storytelling.");
    }
  }, []);

  return (
    <div className="bg-background text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute inset-0 z-0 opacity-20 mesh-bg" />
        <div className="content-width relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <Video className="h-5 w-5 text-red-600 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.4em] text-white">
                Videography Portfolio
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-12 leading-[0.85] tracking-tight text-gradient">
              Coming <br />
              <span className="italic text-primary">Soon.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/50 font-medium max-w-2xl mx-auto leading-relaxed mb-12">
              Our elite videography showcase is currently under production. We are curating our best cinematic work for you.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <Button asChild size="lg" className="h-20 px-12 rounded-full text-xs font-black uppercase tracking-[0.3em] bg-white text-black hover:bg-red-600 hover:text-white transition-all duration-300">
                <Link to="/portfolio" className="flex items-center gap-3">
                  <Home className="h-4 w-4" />
                  Back to Portfolio
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-20 px-12 rounded-full text-xs font-black uppercase tracking-[0.3em] border-white/10 hover:bg-white/5 transition-all duration-300">
                <Link to="/contact" className="flex items-center gap-3">
                  Inquire Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Placeholder Content */}
      <section className="section-padding border-t border-white/5 bg-white/[0.01]">
        <div className="content-width">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Music Videos", icon: Play },
              { title: "Corporate Films", icon: Video },
              { title: "Event Aftermovies", icon: Sparkles }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-10 rounded-[2.5rem] border border-white/10 bg-white/[0.02] text-center group hover:border-red-600/50 transition-colors duration-500"
              >
                <div className="mb-6 inline-flex p-5 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-red-600 group-hover:text-white transition-colors duration-500">
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-black mb-2">{item.title}</h3>
                <p className="text-white/40 text-sm font-medium">Coming to our portfolio soon.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default VideographyPage;

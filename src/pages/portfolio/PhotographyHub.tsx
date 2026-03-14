import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Camera, Heart, Users, Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";

const categories = [
  {
    title: "Funeral Photography",
    description: "Respectful memorial photography and remembrance coverage.",
    icon: Heart,
    image: "https://images.unsplash.com/photo-1516589174184-c685266d4303?auto=format&fit=crop&w=800&q=80",
    button: "View Funeral Gallery",
    to: "/portfolio/photography/funeral",
    color: "text-amber-500",
    hoverColor: "hover:border-amber-500/50",
  },
  {
    title: "Wedding Photography",
    description: "Elegant coverage for both traditional and white weddings.",
    icon: Users,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    button: "View Wedding Categories",
    to: "/portfolio/photography/wedding",
    color: "text-red-500",
    hoverColor: "hover:border-red-500/50",
  },
  {
    title: "Event Photography",
    description: "Birthdays, graduations, and community celebrations.",
    icon: Calendar,
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
    button: "View Event Categories",
    to: "/portfolio/photography/events",
    color: "text-blue-500",
    hoverColor: "hover:border-blue-500/50",
  },
];

const PhotographyHub = () => {
  useEffect(() => {
    document.title = "KMP | Professional Photographer in Port Elizabeth | Kasilam Media Productions";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Looking for a professional photographer in Port Elizabeth? Kasilam Media Productions (KMP) offers wedding, funeral, and event photography across the Eastern Cape and South Africa.");
    }
  }, []);

  return (
    <div className="bg-background text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 mesh-bg" />
        <div className="content-width relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <Camera className="h-4 w-4 text-red-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">
                KMP Photography Portfolio
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[0.9] tracking-tight text-gradient">
              KMP Capturing <br />
              <span className="italic text-primary">Life's Moments.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/50 font-medium max-w-2xl leading-relaxed">
              Professional photography services by Kasilam Media Productions (KMP) in Port Elizabeth, Eastern Cape, and across South Africa. From respectful remembrance to joyous celebrations, we document your most important stories with artistic excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="pb-32">
        <div className="content-width">
          <div className="grid gap-8 md:grid-cols-3">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.02] transition-all duration-500 ${category.hoverColor}`}
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-8 pt-0">
                  <div className={`mb-4 inline-flex p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md ${category.color}`}>
                    <category.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-black mb-3 text-white">{category.title}</h3>
                  <p className="text-white/60 mb-8 font-medium line-clamp-2">
                    {category.description}
                  </p>
                  <Button asChild className="w-full h-14 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] bg-white text-black hover:bg-red-600 hover:text-white transition-all duration-300">
                    <Link to={category.to} className="flex items-center justify-center gap-3">
                      {category.button}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section-padding border-t border-white/5 bg-white/[0.01]">
        <div className="content-width">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600 mb-6">Our Approach</p>
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Every Frame <br />Tells a Story.</h2>
              <p className="text-lg text-white/50 font-medium leading-relaxed mb-8">
                We believe photography is more than just clicking a shutter. It's about anticipation, understanding the emotional weight of a moment, and technical mastery.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-white font-black uppercase tracking-wider mb-2">Artistic Direction</h4>
                  <p className="text-sm text-white/40">Cinematic composition and professional color grading.</p>
                </div>
                <div>
                  <h4 className="text-white font-black uppercase tracking-wider mb-2">Premium Gear</h4>
                  <p className="text-sm text-white/40">High-resolution full-frame equipment for ultimate clarity.</p>
                </div>
              </div>
            </div>
            <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1000&q=80" 
                alt="Photography gear"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-red-600/10 mix-blend-overlay" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PhotographyHub;

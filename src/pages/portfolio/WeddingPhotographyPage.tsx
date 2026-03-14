import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, Heart, ArrowRight, Camera } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";

const categories = [
  {
    title: "Traditional Wedding",
    description: "Capturing the rich cultural heritage and vibrant celebrations of traditional unions.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
    to: "/portfolio/photography/wedding/traditional",
    button: "View Traditional Gallery",
  },
  {
    title: "White Wedding",
    description: "Elegant and timeless coverage of contemporary white wedding ceremonies.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    to: "/portfolio/photography/wedding/white",
    button: "View White Wedding Gallery",
  },
];

const WeddingPhotographyPage = () => {
  useEffect(() => {
    document.title = "Wedding Photography | Kasilam Media Productions";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Elegant wedding photography for traditional and white weddings. Capturing your special moments with style.");
    }
  }, []);

  return (
    <div className="bg-background text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <div className="content-width relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <Users className="h-4 w-4 text-red-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">
                Wedding Photography
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[0.9] tracking-tight text-gradient">
              Celebrating <br />
              <span className="italic text-red-500">Your Union.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/50 font-medium max-w-2xl leading-relaxed">
              Timeless and elegant coverage for every kind of wedding, documenting the beginning of your forever.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sub-Categories Grid */}
      <section className="pb-32">
        <div className="content-width">
          <div className="grid gap-12 md:grid-cols-2 max-w-5xl mx-auto">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.02] p-8 transition-all duration-500 hover:border-red-500/50"
              >
                <div className="aspect-[16/10] mb-8 overflow-hidden rounded-2xl">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                <div className="text-center">
                  <h3 className="text-2xl font-black mb-3 text-white">{category.title}</h3>
                  <p className="text-white/60 mb-8 font-medium">
                    {category.description}
                  </p>
                  <Button asChild className="w-full h-14 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] bg-red-600 text-white hover:bg-red-700 transition-all duration-300">
                    <Link to={category.to} className="flex items-center justify-center gap-3">
                      {category.button}
                      <Camera className="h-4 w-4" />
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
        <div className="content-width text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600 mb-6">Our Promise</p>
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Every Union <br />is Unique.</h2>
          <div className="grid md:grid-cols-3 gap-12 text-left mt-20">
            <div>
              <h4 className="text-red-500 font-black uppercase tracking-wider mb-4">Cultural Respect</h4>
              <p className="text-white/50 leading-relaxed">Deeply understanding and respecting the traditions and protocols of every cultural union we cover.</p>
            </div>
            <div>
              <h4 className="text-red-500 font-black uppercase tracking-wider mb-4">Cinematic Style</h4>
              <p className="text-white/50 leading-relaxed">Using professional lighting and composition techniques to create high-end, cinematic imagery.</p>
            </div>
            <div>
              <h4 className="text-red-500 font-black uppercase tracking-wider mb-4">Storytelling Focus</h4>
              <p className="text-white/50 leading-relaxed">Focusing on the candid emotions and narrative that make your wedding day special.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WeddingPhotographyPage;

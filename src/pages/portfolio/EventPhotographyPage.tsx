import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, PartyPopper, GraduationCap, Users, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";

const categories = [
  {
    title: "Birthdays",
    description: "Joyful coverage of birthday celebrations, from milestones to intimate gatherings.",
    icon: PartyPopper,
    image: "https://images.unsplash.com/photo-1464349172904-ab768297771c?auto=format&fit=crop&w=800&q=80",
    to: "/portfolio/photography/events/birthdays",
    button: "View Birthday Gallery",
    color: "text-purple-500",
  },
  {
    title: "Graduations",
    description: "Celebrating academic achievements and new beginnings with professional portraits.",
    icon: GraduationCap,
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
    to: "/portfolio/photography/events/graduations",
    button: "View Graduation Gallery",
    color: "text-blue-500",
  },
  {
    title: "Community / Traditional Events",
    description: "Documenting cultural gatherings and local community celebrations.",
    icon: Users,
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80",
    to: "/portfolio/photography/events/community",
    button: "View Community Gallery",
    color: "text-green-500",
  },
];

const EventPhotographyPage = () => {
  useEffect(() => {
    document.title = "Event Photography | Kasilam Media Productions";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Professional event photography for birthdays, graduations, and community events. Capturing the energy of your celebrations.");
    }
  }, []);

  return (
    <div className="bg-background text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <div className="content-width relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <Calendar className="h-4 w-4 text-blue-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">
                Event Photography
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[0.9] tracking-tight text-gradient">
              Capturing <br />
              <span className="italic text-blue-500">Celebrations.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/50 font-medium max-w-2xl leading-relaxed">
              From personal milestones to community gatherings, we document the joy and energy of every event.
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
                className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.02] transition-all duration-500 hover:border-blue-500/50"
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
                  <Button asChild className="w-full h-14 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300">
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
    </div>
  );
};

export default EventPhotographyPage;

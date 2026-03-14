import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Flower, Check } from "lucide-react";
import { FadeInSection, HeroSection, StaggerContainer, StaggerItem } from "@/components/animations";
import { useBooking } from "@/contexts/BookingContext";
import { motion, useScroll, useTransform } from "framer-motion";

const FuneralCoverage = () => {
  const { openBooking } = useBooking();
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  useEffect(() => {
    document.title = "Funeral Coverage | Port Elizabeth (Gqeberha) | Kasilam Media";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Respectful funeral photography and memorial videography in Port Elizabeth (Gqeberha), Eastern Cape, South Africa. Kasilam Media Productions documents memorial services with dignity and care.");
    }
  }, []);

  const packages = [
    { name: "Basic Memorial Coverage", hours: 3, description: "Essential ceremony documentation", includes: ["Ceremony coverage", "Photography OR Videography option", "Edited final media", "USB delivery"], pricing: { photography: 1500, videography: 2000, combo: 3500 } },
    { name: "Standard Memorial Coverage", hours: 5, description: "Comprehensive memorial documentation", includes: ["Ceremony coverage", "Selected family moments", "Photography OR Videography option", "Edited final media", "USB delivery"], pricing: { photography: 2200, videography: 2800, combo: 4200 }, recommended: true },
    { name: "Complete Memorial Coverage", hours: 7, description: "Full memorial service coverage", includes: ["Full memorial coverage", "Family moments and gathering highlights", "Photography OR Videography option", "Edited final media", "USB delivery"], pricing: { photography: 3000, videography: 3500, combo: 5200 } },
  ];

  const handleBook = (pkg: typeof packages[0], mediaType: "photography" | "videography" | "combo") => {
    openBooking({
      service: "Funeral Coverage",
      package: pkg.name,
      price: pkg.pricing[mediaType],
      format: mediaType.charAt(0).toUpperCase() + mediaType.slice(1),
      hours: pkg.hours,
    });
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Parallax Background Composition */}
        <div ref={ref} className="absolute inset-0 z-0 bg-[#050505]">
          <motion.div 
            style={{ y }}
            className="absolute inset-0 opacity-50"
          >
            <img 
              src="https://images.unsplash.com/photo-1516589174184-c685266d4303?auto=format&fit=crop&w=1920&q=80" 
              alt="Dignified funeral service in Port Elizabeth with African mourners in traditional black attire gathered around a gravesite as a casket is respectfully lowered, with a tombstone visible in the foreground."
              className="w-full h-full object-cover"
              loading="eager"
            />
          </motion.div>
          
          {/* Emotional Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-background" />
          <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply" /> {/* Subtle cool tone for solemnity */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_70%)]" />
        </div>

        <div className="content-width relative z-10 text-center pt-20">
          <HeroSection>
            <div className="mb-8 flex justify-center">
              <div className="px-6 py-2 rounded-full bg-foreground/5 border border-foreground/10 backdrop-blur-xl dark:bg-white/5 dark:border-white/10">
                <span className="text-amber-500 text-[10px] font-black uppercase tracking-[0.4em]">Dignity & Reverence</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 text-gradient tracking-tight">
              Funeral Coverage <br />
              <span className="italic text-foreground/90 text-4xl md:text-6xl lg:text-7xl dark:text-white/90">Honoring Legacies.</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 font-medium leading-relaxed max-w-3xl mx-auto drop-shadow-2xl dark:text-white/80">
              Professional and emotionally respectful photography and videography for funeral services in Port Elizabeth, Eastern Cape.
            </p>
            <p className="mt-8 text-sm font-bold uppercase tracking-[0.3em] text-foreground/40 dark:text-white/40">
              Preserving memories with trust, reverence, and cultural sensitivity.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-6">
              <Button asChild variant="black" size="lg" className="h-16 px-10 font-black rounded-full uppercase tracking-widest text-[10px]">
                <Link to="/contact">Inquire Respectfully</Link>
              </Button>
              <Button asChild variant="outlineBlack" size="lg" className="h-16 px-10 font-black rounded-full uppercase tracking-widest text-[10px]">
                <a href="#packages">View Coverage</a>
              </Button>
            </div>
          </HeroSection>
        </div>
      </section>

      <section id="about" className="section-padding bg-card/40 border-y border-foreground/5 dark:bg-zinc-950 dark:border-white/5">
        <div className="content-width">
          <FadeInSection className="max-w-3xl mx-auto text-center">
            <div className="mb-8 flex justify-center"><Flower className="h-12 w-12 text-red-600" /></div>
            <h2 className="text-4xl font-black mb-8 text-gradient">Preserving Precious Memories</h2>
            <p className="text-lg text-foreground/70 leading-relaxed mb-6 font-medium dark:text-white/70">
              Funerals are deeply emotional moments where families gather to celebrate the life of someone they love. Our role is to gently preserve these memories with compassion, dignity, and care.
            </p>
            <p className="text-base text-foreground/60 leading-relaxed font-medium dark:text-white/60">
              Kasilam Media Productions provides respectful funeral photography and videography services in Port Elizabeth (Gqeberha), supporting families across the Eastern Cape. Our goal is to preserve meaningful moments of remembrance with dignity, care, and professionalism. Families looking for funeral photography Port Elizabeth, memorial videography Eastern Cape, funeral coverage Gqeberha, or memorial service photography South Africa can rely on our discreet, professional approach.
            </p>
          </FadeInSection>
        </div>
      </section>

      <section className="section-padding">
        <div className="content-width">
          <FadeInSection className="mb-16 text-center">
            <h2 className="text-4xl font-black mb-6 text-gradient">Funeral Coverage Packages</h2>
            <p className="text-lg text-foreground/60 font-medium dark:text-white/60">Choose the coverage duration that honors your loved one.</p>
          </FadeInSection>

          <StaggerContainer className="grid md:grid-cols-3 gap-8 mb-20">
            {packages.map((pkg, index) => (
              <StaggerItem key={index}>
                <div className={`premium-card group h-full flex flex-col border-foreground/10 dark:border-white/5 ${pkg.recommended ? "md:scale-105 md:z-10 border-red-600/50" : "hover:border-red-600/50"}`}>
                  {pkg.recommended && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-red-600 text-[10px] font-black uppercase tracking-[0.2em] text-white">Recommended</div>
                  )}
                  <div className="mb-8">
                    <h3 className="text-2xl font-black text-red-600 mb-2 uppercase tracking-tight">{pkg.name}</h3>
                    <p className="text-4xl font-black text-foreground mb-3 dark:text-white">Up to {pkg.hours} Hours</p>
                    <p className="text-sm text-foreground/60 font-medium dark:text-white/60">{pkg.description}</p>
                  </div>
                  <div className="space-y-3 mb-10 flex-grow pb-10 border-b border-foreground/10 dark:border-white/10">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600">Includes:</p>
                    {pkg.includes.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <Check className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                        <span className="text-xs text-foreground/70 font-medium dark:text-white/70">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600 mb-4">Select Format:</p>
                    <Button onClick={() => handleBook(pkg, "photography")} variant="ghost" className="w-full justify-between p-3 h-auto rounded bg-foreground/5 hover:bg-red-600/20 border-0 dark:bg-white/5">
                      <span className="text-sm font-medium flex items-center gap-2"><span className="text-lg">📸</span> Photography</span>
                      <span className="text-red-600 font-black">R {pkg.pricing.photography.toLocaleString()}</span>
                    </Button>
                    <Button onClick={() => handleBook(pkg, "videography")} variant="ghost" className="w-full justify-between p-3 h-auto rounded bg-foreground/5 hover:bg-red-600/20 border-0 dark:bg-white/5">
                      <span className="text-sm font-medium flex items-center gap-2"><span className="text-lg">🎥</span> Videography</span>
                      <span className="text-red-600 font-black">R {pkg.pricing.videography.toLocaleString()}</span>
                    </Button>
                    <Button onClick={() => handleBook(pkg, "combo")} variant="ghost" className="w-full justify-between p-3 h-auto rounded bg-foreground/5 hover:bg-red-600/20 border border-red-600/30 dark:bg-white/5">
                      <span className="text-sm font-medium flex items-center gap-2"><span className="text-lg">✨</span> Combo</span>
                      <span className="text-red-600 font-black">R {pkg.pricing.combo.toLocaleString()}</span>
                    </Button>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="section-padding bg-card/40 border-y border-foreground/5 dark:bg-zinc-950 dark:border-white/5">
        <div className="content-width max-w-3xl mx-auto">
          <FadeInSection className="bg-foreground/[0.02] border border-foreground/5 rounded-2xl p-10 dark:bg-white/[0.02] dark:border-white/5">
            <h3 className="text-2xl font-black mb-6 text-foreground dark:text-white">Our Approach</h3>
            <div className="space-y-6">
              {[
                { title: "Discreet Presence", desc: "We work quietly during emotional moments, documenting with care and without intrusion." },
                { title: "Cultural Sensitivity", desc: "We honor traditions and family customs with respect and understanding." },
                { title: "Professional Editing", desc: "All media is carefully edited and color-corrected to preserve a dignified, timeless record." },
                { title: "Secure Delivery", desc: "Your memories are delivered securely with backups to ensure nothing is ever lost." },
              ].map((item) => (
                <div key={item.title}>
                  <h4 className="text-sm font-black text-red-600 uppercase tracking-[0.3em] mb-2">{item.title}</h4>
                  <p className="text-foreground/60 text-sm font-medium dark:text-white/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      <section className="section-padding">
        <div className="content-width text-center max-w-4xl mx-auto">
          <FadeInSection>
            <h2 className="text-4xl md:text-5xl font-black mb-8 text-gradient">Let Us Help Preserve These Memories</h2>
            <p className="text-xl text-foreground/60 mb-12 font-medium dark:text-white/60">
              Contact us to discuss your needs and learn how we can respectfully document your loved one&apos;s memorial service.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button asChild variant="red" className="h-14 px-12 font-black rounded-full uppercase tracking-widest text-[10px]">
                <Link to="/contact">Contact Us</Link>
              </Button>
              <Button asChild variant="black" className="h-14 px-12 font-black rounded-full uppercase tracking-widest text-[10px]">
                <Link to="/services/visual-production/community-events">Back to Community Events</Link>
              </Button>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
};

export default FuneralCoverage;

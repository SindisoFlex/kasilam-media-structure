import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Check, Sparkles } from "lucide-react";
import { FadeInSection, HeroSection, StaggerContainer, StaggerItem } from "@/components/animations";
import { useBooking } from "@/contexts/BookingContext";
import { useEffect } from "react";

const WeddingProduction = () => {
  const { openBooking } = useBooking();

  useEffect(() => {
    document.title = "Wedding Production | Port Elizabeth | Kasilam Media";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Cinematic wedding photography and videography in Port Elizabeth (Gqeberha). Professional coverage for traditional and white weddings across the Eastern Cape.");
    }
  }, []);

  const packages = [
    {
      name: "Essential Coverage", hours: 4, gracePeriod: 45,
      description: "Perfect for intimate ceremonies and key moments",
      includes: ["Ceremony coverage", "Family portraits", "Reception highlights", "Edited final media", "Digital Delivery"],
      pricing: { photography: 4500, videography: 5000, combo: 7500 },
    },
    {
      name: "Classic Coverage", hours: 6, gracePeriod: 60,
      description: "Comprehensive coverage of your special day",
      includes: ["Pre-ceremony preparation", "Ceremony coverage", "Family & bridal party portraits", "Reception coverage", "First dance & cake cutting", "Edited final media", "Digital Delivery"],
      pricing: { photography: 6500, videography: 7500, combo: 12000 },
      recommended: true,
    },
    {
      name: "Full Day Coverage", hours: 9, gracePeriod: 90,
      description: "Complete wedding day documentation",
      includes: ["Early morning preparation", "Ceremony coverage", "Full portrait session", "Complete reception coverage", "Speeches & special moments", "Departure coverage", "Edited final media", "Digital Delivery"],
      pricing: { photography: 9000, videography: 10500, combo: 16500 },
    },
  ];

  const whyChooseUs = [
    { title: "Authentic Moments", desc: "We capture genuine emotions and unscripted moments that tell your unique story" },
    { title: "Professional Equipment", desc: "State-of-the-art cameras and lighting ensure stunning results in any lighting condition" },
    { title: "Experienced Team", desc: "Years of wedding experience means we anticipate and capture the moments that matter" },
    { title: "Timeless Quality", desc: "Professional editing and color grading create memories you'll treasure for generations" },
  ];

  const handleBook = (pkg: typeof packages[0], mediaType: "photography" | "videography" | "combo") => {
    openBooking({
      service: "Wedding Production",
      package: pkg.name,
      price: pkg.pricing[mediaType],
      format: mediaType.charAt(0).toUpperCase() + mediaType.slice(1),
      hours: pkg.hours,
    });
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 mesh-bg opacity-20" />
        <div className="content-width relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <HeroSection className="mb-8 flex justify-center">
              <div className="px-6 py-2 rounded-full bg-foreground/5 border border-foreground/10 red-glow backdrop-blur-xl dark:bg-white/5 dark:border-white/10">
                <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.4em]">Wedding Production</span>
              </div>
            </HeroSection>
            <HeroSection delay={0.1}>
              <h1 className="text-5xl md:text-6xl font-black mb-8 text-gradient">Your Love Story, Beautifully Captured</h1>
            </HeroSection>
            <HeroSection delay={0.2}>
              <p className="text-xl text-foreground/70 font-medium leading-relaxed dark:text-white/70">
                Professional wedding photography and videography in Port Elizabeth and the Eastern Cape. We capture your story from beginning to end—the moments of joy, cultural traditions, and the love that surrounds your special day.
              </p>
            </HeroSection>
          </div>
        </div>
      </section>

      <section className="section-padding bg-card/40 border-y border-foreground/5 dark:bg-zinc-950 dark:border-white/5">
        <div className="content-width">
          <FadeInSection className="max-w-3xl mx-auto text-center">
            <div className="mb-8 flex justify-center">
              <Heart className="h-12 w-12 text-red-600" />
            </div>
            <h2 className="text-4xl font-black mb-8 text-gradient">Preserving Your Legacy in Gqeberha</h2>
            <p className="text-lg text-foreground/70 leading-relaxed mb-8 font-medium dark:text-white/70">
              We believe weddings are more than just events — they are powerful stories of love, family, and legacy. Whether it&apos;s a traditional ceremony in the Eastern Cape or a classic white wedding in PE, your day is filled with genuine emotions and connections that deserve to be preserved forever.
            </p>
            <p className="text-lg text-foreground/70 leading-relaxed mb-8 font-medium dark:text-white/70">
              Our goal is to capture authentic moments that allow you to relive the start of your journey together for generations to come.
            </p>
            <p className="text-lg text-foreground/60 leading-relaxed font-medium dark:text-white/60">
              When you look back at your wedding memories, you won&apos;t just remember the day—you&apos;ll feel the emotions all over again.
            </p>
          </FadeInSection>
        </div>
      </section>

      <section className="section-padding">
        <div className="content-width">
          <FadeInSection className="mb-16 text-center">
            <h2 className="text-4xl font-black mb-6 text-gradient">Wedding Coverage Packages</h2>
            <p className="text-lg text-foreground/60 font-medium dark:text-white/60">Choose the perfect coverage time for your celebration.</p>
          </FadeInSection>

          <StaggerContainer className="grid md:grid-cols-3 gap-8 mb-24">
            {packages.map((pkg, index) => (
              <StaggerItem key={index}>
                <div className={`premium-card group h-full flex flex-col border-foreground/10 dark:border-white/5 ${pkg.recommended ? "md:scale-105 md:z-10 border-red-600/50" : "hover:border-red-600/50"}`}>
                  {pkg.recommended && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-red-600 text-[10px] font-black uppercase tracking-[0.2em] text-white">Recommended</div>
                  )}
                  <div className="mb-8">
                    <h3 className="text-2xl font-black text-red-600 mb-2 uppercase tracking-tight">{pkg.name}</h3>
                    <p className="text-4xl font-black text-foreground mb-3 dark:text-white">{pkg.hours} Hours</p>
                    <p className="text-sm text-foreground/60 mb-2 font-medium dark:text-white/60">{pkg.description}</p>
                    <p className="text-xs text-foreground/50 font-medium dark:text-white/50">+{pkg.gracePeriod} min grace period</p>
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
        <div className="content-width">
          <FadeInSection>
            <h2 className="text-center mb-16 text-4xl font-black text-gradient">Why Choose Us for Your Wedding?</h2>
          </FadeInSection>
          <StaggerContainer className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {whyChooseUs.map((item, index) => (
              <StaggerItem key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-red-600/20 border border-red-600/30">
                    <Sparkles className="h-6 w-6 text-red-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-black text-foreground mb-2 uppercase tracking-tight dark:text-white">{item.title}</h3>
                  <p className="text-foreground/60 text-sm leading-relaxed font-medium dark:text-white/60">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="section-padding">
        <div className="content-width text-center max-w-4xl mx-auto">
          <FadeInSection>
            <h2 className="text-4xl md:text-5xl font-black mb-8 text-gradient">Let&apos;s Secure Your Date.</h2>
            <p className="text-xl text-foreground/60 mb-12 font-medium dark:text-white/60">
              Dates fill up quickly. Contact us to discuss your vision and reserve your professional wedding coverage in Port Elizabeth and surrounds.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button asChild variant="red" className="h-14 px-12 font-black rounded-full uppercase tracking-widest text-[10px]">
                <Link to="/contact">Inquire Now</Link>
              </Button>
              <Button asChild variant="black" className="h-14 px-12 font-black rounded-full uppercase tracking-widest text-[10px]">
                <Link to="/services/visual-production/community-events">Back to Events</Link>
              </Button>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
};

export default WeddingProduction;

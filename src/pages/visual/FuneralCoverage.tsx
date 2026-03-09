import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Flower, Check } from "lucide-react";
import { FadeInSection, HeroSection, StaggerContainer, StaggerItem } from "@/components/animations";
import { useBooking } from "@/contexts/BookingContext";

const FuneralCoverage = () => {
  const { openBooking } = useBooking();

  const packages = [
    { name: "Basic Memorial Coverage", hours: 3, description: "Essential ceremony documentation", includes: ["Ceremony coverage", "Photography OR Videography option", "Edited final media", "USB delivery"], pricing: { photography: 1500, videography: 2000, combo: 3500 } },
    { name: "Standard Memorial Coverage", hours: 5, description: "Comprehensive memorial documentation", includes: ["Ceremony coverage", "Selected family moments", "Photography OR Videography option", "Edited final media", "USB delivery"], pricing: { photography: 2200, videography: 2800, combo: 4200 }, recommended: true },
    { name: "Complete Memorial Coverage", hours: 7, description: "Full memorial service coverage", includes: ["Full memorial coverage", "Family moments and gathering highlights", "Photography OR Videography option", "Edited final media", "USB delivery"], pricing: { photography: 3000, videography: 3500, combo: 5200 } },
  ];

  const handleBook = (pkg: typeof packages[0], mediaType: "photography" | "videography" | "combo") => {
    openBooking({
      serviceName: "Funeral Coverage",
      packageName: pkg.name,
      mediaType,
      basePrice: pkg.pricing[mediaType],
      hours: pkg.hours,
    });
  };

  return (
    <div className="bg-background text-white min-h-screen">
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 mesh-bg opacity-20" />
        <div className="content-width relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <HeroSection className="mb-8 flex justify-center">
              <div className="px-6 py-2 rounded-full bg-white/5 border border-white/10 red-glow backdrop-blur-xl">
                <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.4em]">Funeral Coverage</span>
              </div>
            </HeroSection>
            <HeroSection delay={0.1}>
              <h1 className="text-5xl md:text-6xl font-black mb-8 text-gradient">Funeral Coverage</h1>
            </HeroSection>
            <HeroSection delay={0.2}>
              <p className="text-xl text-white/70 font-medium leading-relaxed">
                Respectful photography and videography to preserve memories and honor loved ones.
              </p>
            </HeroSection>
          </div>
        </div>
      </section>

      <section className="section-padding bg-zinc-950">
        <div className="content-width">
          <FadeInSection className="max-w-3xl mx-auto text-center">
            <div className="mb-8 flex justify-center"><Flower className="h-12 w-12 text-red-600" /></div>
            <h2 className="text-4xl font-black mb-8 text-gradient">Preserving Precious Memories</h2>
            <p className="text-lg text-white/70 leading-relaxed mb-8 font-medium">
              Funerals are deeply emotional moments where families gather to celebrate the life of someone they love. Our role is to respectfully capture these memories so they can be shared with family members and future generations.
            </p>
          </FadeInSection>
        </div>
      </section>

      <section className="section-padding">
        <div className="content-width">
          <FadeInSection className="mb-16 text-center">
            <h2 className="text-4xl font-black mb-6 text-gradient">Funeral Coverage Packages</h2>
            <p className="text-lg text-white/60 font-medium">Choose the coverage duration that honors your loved one.</p>
          </FadeInSection>

          <StaggerContainer className="grid md:grid-cols-3 gap-8 mb-20">
            {packages.map((pkg, index) => (
              <StaggerItem key={index}>
                <div className={`premium-card group h-full flex flex-col border-white/5 ${pkg.recommended ? "md:scale-105 md:z-10 border-red-600/50" : "hover:border-red-600/50"}`}>
                  {pkg.recommended && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-red-600 text-[10px] font-black uppercase tracking-[0.2em] text-white">Recommended</div>
                  )}
                  <div className="mb-8">
                    <h3 className="text-2xl font-black text-red-600 mb-2 uppercase tracking-tight">{pkg.name}</h3>
                    <p className="text-4xl font-black text-white mb-3">Up to {pkg.hours} Hours</p>
                    <p className="text-sm text-white/60 font-medium">{pkg.description}</p>
                  </div>
                  <div className="space-y-3 mb-10 flex-grow pb-10 border-b border-white/10">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600">Includes:</p>
                    {pkg.includes.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <Check className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                        <span className="text-xs text-white/70 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600 mb-4">Select Format:</p>
                    <Button onClick={() => handleBook(pkg, "photography")} variant="ghost" className="w-full justify-between p-3 h-auto rounded bg-white/5 hover:bg-red-600/20 border-0">
                      <span className="text-sm font-medium flex items-center gap-2"><span className="text-lg">📸</span> Photography</span>
                      <span className="text-red-600 font-black">R {pkg.pricing.photography.toLocaleString()}</span>
                    </Button>
                    <Button onClick={() => handleBook(pkg, "videography")} variant="ghost" className="w-full justify-between p-3 h-auto rounded bg-white/5 hover:bg-red-600/20 border-0">
                      <span className="text-sm font-medium flex items-center gap-2"><span className="text-lg">🎥</span> Videography</span>
                      <span className="text-red-600 font-black">R {pkg.pricing.videography.toLocaleString()}</span>
                    </Button>
                    <Button onClick={() => handleBook(pkg, "combo")} variant="ghost" className="w-full justify-between p-3 h-auto rounded bg-white/5 hover:bg-red-600/20 border border-red-600/30">
                      <span className="text-sm font-medium flex items-center gap-2"><span className="text-lg">✨</span> Combo</span>
                      <span className="text-red-600 font-black">R {pkg.pricing.combo.toLocaleString()}</span>
                    </Button>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

      <section className="section-padding bg-zinc-950">
        <div className="content-width max-w-3xl mx-auto">
          <FadeInSection className="bg-white/[0.02] border border-white/5 rounded-2xl p-10">
            <h3 className="text-2xl font-black mb-6 text-white">Our Approach</h3>
            <div className="space-y-6">
              {[
                { title: "Respectful Documentation", desc: "We work discreetly during the service, ensuring our presence does not intrude on this important time." },
                { title: "Professional Quality", desc: "All media is professionally edited and color-corrected to create lasting, beautiful memories." },
                { title: "Secure Delivery", desc: "Your memories are delivered on USB drive with backup copies to ensure nothing is ever lost." },
                { title: "Family-Focused", desc: "We understand this is a sensitive time and tailor our service to your family's specific needs and wishes." },
              ].map((item) => (
                <div key={item.title}>
                  <h4 className="text-sm font-black text-red-600 uppercase tracking-[0.3em] mb-2">{item.title}</h4>
                  <p className="text-white/60 text-sm font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>
        </div>
      </section>

      <section className="section-padding">
        <div className="content-width text-center max-w-4xl mx-auto">
          <FadeInSection>
            <h2 className="text-4xl md:text-5xl font-black mb-8 text-gradient">Let Us Help Preserve These Memories</h2>
            <p className="text-xl text-white/60 mb-12 font-medium">
              Contact us to discuss your needs and learn how we can respectfully document your loved one's memorial service.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button asChild className="h-14 px-12 bg-red-600 hover:bg-red-700 text-white font-black rounded-full uppercase tracking-widest text-[10px]">
                <Link to="/contact">Contact Us</Link>
              </Button>
              <Button asChild variant="outline" className="h-14 px-12 border-white/10 text-white hover:bg-white/5 font-black rounded-full uppercase tracking-widest text-[10px]">
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

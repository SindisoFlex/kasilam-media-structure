import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Flower, Check, Heart } from "lucide-react";

const FuneralCoverage = () => {
  const packages = [
    {
      name: "Basic Memorial Coverage",
      description: "Essential ceremony documentation",
      duration: "Up to 4 hours",
      includes: [
        "Single format selection (Photography OR Videography)",
        "Essential ceremony coverage",
        "Key moments captured",
        "Professionally edited media",
        "USB delivery",
      ],
      pricing: {
        photography: 2500,
        videography: 3000,
      },
    },
    {
      name: "Standard Memorial Coverage",
      description: "Comprehensive event documentation",
      duration: "Up to 6 hours",
      includes: [
        "Single format selection (Photography OR Videography)",
        "Extended ceremony coverage",
        "Family moments",
        "Tribute moments",
        "Professionally edited media",
        "USB delivery",
      ],
      pricing: {
        photography: 4000,
        videography: 5000,
      },
      recommended: true,
    },
    {
      name: "Complete Memorial Coverage",
      description: "Full event with both photo and video",
      duration: "Full event duration",
      includes: [
        "Photography + Videography combo",
        "Full event coverage",
        "Pre-service moments",
        "Complete ceremony documentation",
        "Family & tribute moments",
        "High-quality edited media",
        "USB delivery",
      ],
      pricing: {
        combo: 8000,
      },
    },
  ];

  const whyChooseUs = [
    {
      title: "Respectful & Professional",
      desc: "We approach every service with the utmost respect and sensitivity to your family's needs",
    },
    {
      title: "Preserve Memories",
      desc: "Capture moments to honor your loved one and share with family members who couldn't attend",
    },
    {
      title: "Compassionate Team",
      desc: "Our experienced team understands the emotional significance of memorial services",
    },
    {
      title: "Lasting Legacy",
      desc: "Create a visual record that celebrates the life and impact of your loved one",
    },
  ];

  return (
    <div className="bg-background text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 mesh-bg opacity-20" />
        <div className="content-width relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8 flex justify-center">
              <div className="px-6 py-2 rounded-full bg-white/5 border border-white/10 red-glow backdrop-blur-xl">
                <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.4em]">
                  Funeral Coverage
                </span>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-8 text-gradient">
              Honoring Your Loved One
            </h1>
            <p className="text-xl text-white/70 font-medium leading-relaxed">
              Respectful and professional coverage to preserve the memory of loved ones and honor their life with dignity and compassion.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-zinc-950">
        <div className="content-width">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-8 flex justify-center">
              <Flower className="h-12 w-12 text-red-600" />
            </div>
            <h2 className="text-4xl font-black mb-8 text-gradient">Preserving Precious Memories</h2>
            <p className="text-lg text-white/70 leading-relaxed mb-8 font-medium">
              During times of loss, every moment shared with loved ones becomes precious. Not everyone can attend a memorial service, and distance, circumstance, or health can keep family members away during these important gatherings.
            </p>
            <p className="text-lg text-white/70 leading-relaxed mb-8 font-medium">
              Professional funeral coverage ensures that family members near and far can share in honoring your loved one. It captures the strength of family bonds, the love that remains, and the collective tribute to a life well-lived.
            </p>
            <p className="text-lg text-white/60 leading-relaxed font-medium">
              We provide this service with the utmost respect and sensitivity, understanding that these are meaningful moments that deserve to be preserved with dignity and care. Your memories of this day will become treasured for years to come.
            </p>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="section-padding">
        <div className="content-width">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-black mb-6 text-gradient">Memorial Coverage Packages</h2>
            <p className="text-lg text-white/60 font-medium">
              Choose the coverage option that best honors your loved one. All packages include professionally edited media delivered on USB.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`premium-card group h-full flex flex-col border-white/5 ${
                  pkg.recommended ? "md:scale-105 md:z-10 border-red-600/50" : "hover:border-red-600/50"
                }`}
              >
                {pkg.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-red-600 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                    Most Selected
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-2xl font-black text-red-600 mb-2 uppercase tracking-tight">{pkg.name}</h3>
                  <p className="text-sm text-white/60 mb-4 font-medium">{pkg.description}</p>
                  <p className="text-xs text-white/50 font-medium">{pkg.duration}</p>
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

                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600 mb-4">Pricing:</p>
                  {pkg.pricing.photography && (
                    <div className="flex justify-between items-center p-2 rounded bg-white/5">
                      <span className="text-sm font-medium">Photography</span>
                      <span className="text-red-600 font-black">R {pkg.pricing.photography}</span>
                    </div>
                  )}
                  {pkg.pricing.videography && (
                    <div className="flex justify-between items-center p-2 rounded bg-white/5">
                      <span className="text-sm font-medium">Videography</span>
                      <span className="text-red-600 font-black">R {pkg.pricing.videography}</span>
                    </div>
                  )}
                  {pkg.pricing.combo && (
                    <div className="flex justify-between items-center p-2 rounded bg-white/5 border border-red-600/30">
                      <span className="text-sm font-medium">Photo + Video</span>
                      <span className="text-red-600 font-black">R {pkg.pricing.combo}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Format Info */}
          <div className="max-w-3xl mx-auto bg-white/[0.02] border border-white/5 rounded-2xl p-8">
            <h3 className="text-xl font-black mb-6 text-white uppercase tracking-tight">Choosing Your Format</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="text-3xl">📸</div>
                <div>
                  <h4 className="font-black text-white mb-1">Photography</h4>
                  <p className="text-sm text-white/60 font-medium">Still photographs capture moments with clarity and detail, perfect for printed memories and sharing with family.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-3xl">🎥</div>
                <div>
                  <h4 className="font-black text-white mb-1">Videography</h4>
                  <p className="text-sm text-white/60 font-medium">Video captures the complete experience—speeches, music, and the flow of the service—allowing relatives to feel fully present.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-3xl">✨</div>
                <div>
                  <h4 className="font-black text-white mb-1">Photo + Video Combo</h4>
                  <p className="text-sm text-white/60 font-medium">The complete package combines both formats to create a comprehensive record and multiple ways to remember and share.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-zinc-950">
        <div className="content-width">
          <h2 className="text-center mb-16 text-4xl font-black text-gradient">Why Choose Us?</h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-red-600/20 border border-red-600/30">
                    <Heart className="h-6 w-6 text-red-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-black text-white mb-2 uppercase tracking-tight">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="section-padding">
        <div className="content-width max-w-3xl mx-auto">
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-10">
            <h3 className="text-2xl font-black mb-6 text-white">How It Works</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-black text-red-600 uppercase tracking-[0.3em] mb-2">1. Contact Us</h4>
                <p className="text-white/60 text-sm font-medium">Reach out to us with information about the service date, time, and location. We'll discuss your needs and answer any questions.</p>
              </div>
              <div>
                <h4 className="text-sm font-black text-red-600 uppercase tracking-[0.3em] mb-2">2. Select Your Package</h4>
                <p className="text-white/60 text-sm font-medium">Choose the coverage duration and format (Photography, Videography, or Combo) that best suits your family's needs.</p>
              </div>
              <div>
                <h4 className="text-sm font-black text-red-600 uppercase tracking-[0.3em] mb-2">3. Professional Documentation</h4>
                <p className="text-white/60 text-sm font-medium">Our respectful and experienced team will capture the service with sensitivity and professionalism.</p>
              </div>
              <div>
                <h4 className="text-sm font-black text-red-600 uppercase tracking-[0.3em] mb-2">4. Edited & Delivered</h4>
                <p className="text-white/60 text-sm font-medium">Your professionally edited media is delivered on USB, ready to share with family and preserve as a lasting memory.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-zinc-950">
        <div className="content-width text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-8 text-gradient">Let Us Help Preserve These Memories</h2>
          <p className="text-xl text-white/60 mb-12 font-medium">
            Our compassionate team is here to support your family during this important time.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button asChild className="h-14 px-12 bg-red-600 hover:bg-red-700 text-white font-black rounded-full uppercase tracking-widest text-[10px]">
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button asChild variant="outline" className="h-14 px-12 border-white/10 text-white hover:bg-white/5 font-black rounded-full uppercase tracking-widest text-[10px]">
              <Link to="/services/visual-production/community-events">Back to Events</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FuneralCoverage;

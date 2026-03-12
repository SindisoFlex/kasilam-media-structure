import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const FuneralPhotographer = () => {
  useEffect(() => {
    document.title = "Funeral Photographer | Kasilam Media Production";
    const description =
      "Professional funeral photography services capturing memorials and remembrance ceremonies with dignity and respect.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);
  }, []);

  const features = [
    "Discreet professional presence",
    "Respectful ceremony coverage",
    "High-quality edited images",
    "Fast and reliable delivery",
  ];

  const coverage = [
    "Memorial services",
    "Burial ceremonies",
    "Family remembrance gatherings",
    "Religious services",
  ];

  const images = [
    "/images/funeral-photography/funeral-1.jpg",
    "/images/funeral-photography/funeral-2.jpg",
    "/images/funeral-photography/funeral-3.jpg",
    "/images/funeral-photography/funeral-4.jpg",
    "/images/funeral-photography/funeral-5.jpg",
    "/images/funeral-photography/funeral-6.jpg",
  ];

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <section className="relative overflow-hidden pt-28 pb-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black" />
        <div className="content-width relative z-10">
          <p className="text-xs font-black uppercase tracking-[0.4em] text-[#caa75a]">Professional Funeral Photographer</p>
          <h1 className="mt-6 text-4xl md:text-6xl font-black leading-[1.05]">Professional Funeral Photographer</h1>
          <p className="mt-6 max-w-2xl text-base md:text-lg text-white/70">
            Respectful photography services capturing important moments of remembrance with dignity and care.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild className="h-12 px-8 text-xs font-black uppercase tracking-[0.3em] bg-[#caa75a] text-black hover:bg-[#b8964f]">
              <Link to="/portfolio/funeral-photography">View Portfolio</Link>
            </Button>
            <Button asChild variant="outline" className="h-12 px-8 text-xs font-black uppercase tracking-[0.3em] border-white/40 text-white hover:bg-white/10">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#111111]">
        <div className="content-width">
          <div className="mb-12 text-center">
            <p className="text-xs font-black uppercase tracking-[0.4em] text-[#caa75a]">Why Families Choose Us</p>
            <h2 className="mt-4 text-3xl md:text-5xl font-black">Supportive, professional, and discreet.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {features.map((feature) => (
              <div key={feature} className="flex items-start gap-4 rounded-3xl border border-white/10 bg-black/40 p-6">
                <CheckCircle className="h-5 w-5 text-[#caa75a]" />
                <p className="text-sm text-white/70">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#0b0b0b]">
        <div className="content-width">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.4em] text-[#caa75a]">Featured Photos</p>
              <h2 className="mt-4 text-3xl md:text-5xl font-black">A respectful portfolio.</h2>
            </div>
            <Button asChild className="h-11 px-6 text-xs font-black uppercase tracking-[0.3em] bg-[#caa75a] text-black hover:bg-[#b8964f]">
              <Link to="/portfolio/funeral-photography">View Full Gallery</Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((src, index) => (
              <div key={src} className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                <img
                  src={src}
                  alt={`Funeral photography ${index + 1}`}
                  loading="lazy"
                  className="h-56 w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#111111]">
        <div className="content-width">
          <div className="mb-10 text-center">
            <p className="text-xs font-black uppercase tracking-[0.4em] text-[#caa75a]">Service Coverage</p>
            <h2 className="mt-4 text-3xl md:text-5xl font-black">Coverage tailored to your ceremony.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {coverage.map((item) => (
              <div key={item} className="rounded-3xl border border-white/10 bg-black/40 p-6">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/70">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#0b0b0b]">
        <div className="content-width rounded-3xl border border-[#caa75a]/40 bg-[#121212] p-10 text-center">
          <p className="text-xs font-black uppercase tracking-[0.4em] text-[#caa75a]">Book Funeral Photography</p>
          <h2 className="mt-4 text-3xl md:text-5xl font-black">Book Funeral Photography</h2>
          <p className="mt-4 text-white/60">
            Contact Kasilam Media Production to discuss respectful funeral photography coverage.
          </p>
          <Button asChild className="mt-8 h-12 px-8 text-xs font-black uppercase tracking-[0.3em] bg-[#caa75a] text-black hover:bg-[#b8964f]">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FuneralPhotographer;
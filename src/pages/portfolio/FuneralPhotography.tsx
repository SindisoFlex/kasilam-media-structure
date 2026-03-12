import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";

const FuneralPhotography = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"next" | "prev">("next");
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const images = useMemo(
    () =>
      [
        "funeral-1.jpg",
        "funeral-2.jpg",
        "funeral-3.jpg",
        "funeral-4.jpg",
        "funeral-5.jpg",
        "funeral-6.jpg",
        "funeral-7.jpg",
        "funeral-8.jpg",
      ].map((file) => `/images/funeral-photography/${file}`),
    []
  );

  const layoutForIndex = (index: number) => {
    const groupIndex = index % 6;
    const isLarge = groupIndex === 0 || groupIndex === 5;
    return isLarge
      ? "md:col-span-2 md:row-span-2"
      : "md:col-span-1 md:row-span-1";
  };

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const showNext = useCallback(() => {
    setSlideDirection("next");
    setActiveIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const showPrev = useCallback(() => {
    setSlideDirection("prev");
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!isLightboxOpen) {
      document.body.style.overflow = "";
      return undefined;
    }

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
      }
      if (event.key === "ArrowRight") {
        showNext();
      }
      if (event.key === "ArrowLeft") {
        showPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isLightboxOpen, showNext, showPrev]);

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">
      <style>{`
        @keyframes slideNext {
          from { opacity: 0; transform: translateX(24px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slidePrev {
          from { opacity: 0; transform: translateX(-24px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .slide-next { animation: slideNext 0.3s ease; }
        .slide-prev { animation: slidePrev 0.3s ease; }
      `}</style>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0b0b]/90 backdrop-blur">
        <div className="content-width flex items-center justify-between py-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.4em] text-[#caa75a]">Funeral Photography</p>
            <p className="text-sm text-white/60">Kasilam Media Productions</p>
          </div>
          <nav className="hidden items-center gap-6 text-xs font-black uppercase tracking-[0.3em] text-white/70 md:flex">
            <a href="#gallery" className="hover:text-[#caa75a]">Gallery</a>
            <a href="#services" className="hover:text-[#caa75a]">Services</a>
            <a href="#contact" className="hover:text-[#caa75a]">Contact</a>
            <Link to="/services/web-development" className="hover:text-[#caa75a]">Back to KMP</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button asChild className="hidden h-10 px-5 text-[10px] font-black uppercase tracking-[0.3em] bg-[#caa75a] text-black hover:bg-[#b8964f] md:inline-flex">
              <Link to="/services/web-development">Back to KMP</Link>
            </Button>
            <button
              type="button"
              aria-label="Toggle navigation"
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="border-t border-white/10 bg-[#0b0b0b] md:hidden">
            <nav className="content-width flex flex-col gap-4 py-4 text-xs font-black uppercase tracking-[0.3em] text-white/70">
              {[
                { href: "#gallery", label: "Gallery" },
                { href: "#services", label: "Services" },
                { href: "#contact", label: "Contact" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-[#caa75a]"
                >
                  {item.label}
                </a>
              ))}
              <Link
                to="/services/web-development"
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#caa75a]"
              >
                Back to KMP
              </Link>
            </nav>
          </div>
        )}
      </header>

      <section className="border-b border-white/10 bg-[#111111]">
        <div className="content-width flex flex-col gap-4 py-4 text-sm md:flex-row md:items-center md:justify-between">
          <p className="font-black uppercase tracking-[0.2em] text-[#caa75a]">
            This is a demo website created by Kasilam Media Productions.
          </p>
          <Button asChild className="h-10 px-5 text-[10px] font-black uppercase tracking-[0.3em] bg-[#caa75a] text-black hover:bg-[#b8964f]">
            <Link to="/services/web-development">Back to KMP Web Development</Link>
          </Button>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black" />
        <div className="content-width relative z-10 py-28">
          <p className="text-xs font-black uppercase tracking-[0.4em] text-[#caa75a]">Funeral Photography</p>
          <h1 className="mt-6 text-4xl md:text-6xl font-black leading-[1.05]">Capturing moments of remembrance with dignity and respect.</h1>
          <p className="mt-6 max-w-2xl text-base md:text-lg text-white/70">
            A premium photography portfolio dedicated to honoring life and preserving memories with care, discretion, and artistry.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild className="h-12 px-8 text-xs font-black uppercase tracking-[0.3em] bg-[#caa75a] text-black hover:bg-[#b8964f]">
              <a href="#gallery">View Gallery</a>
            </Button>
            <Button asChild variant="outline" className="h-12 px-8 text-xs font-black uppercase tracking-[0.3em] border-white/40 text-white hover:bg-white/10">
              <a href="#contact">Book Photography</a>
            </Button>
          </div>
        </div>
      </section>

      <section id="gallery" className="section-padding bg-[#0b0b0b] scroll-mt-24">
        <div className="content-width">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.4em] text-[#caa75a]">Gallery</p>
              <h2 className="mt-4 text-3xl md:text-5xl font-black">Stories of remembrance.</h2>
            </div>
            <p className="text-sm text-white/60">A curated selection of respectful coverage.</p>
          </div>
          <div className="mt-10 grid auto-rows-[160px] gap-4 sm:auto-rows-[200px] md:grid-cols-3 md:auto-rows-[220px]">
            {images.map((src, index) => (
              <button
                key={src}
                type="button"
                onClick={() => openLightbox(index)}
                className={`relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 ${layoutForIndex(index)}`}
              >
                <img
                  src={src}
                  alt={`Funeral photography ${index + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="section-padding bg-[#111111] scroll-mt-24">
        <div className="content-width">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.4em] text-[#caa75a]">Services</p>
              <h2 className="mt-4 text-3xl md:text-5xl font-black">Professional funeral photography.</h2>
            </div>
            <p className="text-sm text-white/60">Discreet coverage for memorial services and family gatherings.</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { title: "Memorial Coverage", description: "Quiet, respectful documentation of memorial services." },
              { title: "Family Remembrance", description: "Portraits and group images for family archives." },
              { title: "Legacy Albums", description: "Curated keepsake albums for future generations." },
            ].map((service) => (
              <div key={service.title} className="rounded-3xl border border-white/10 bg-black/40 p-6">
                <h3 className="text-lg font-black">{service.title}</h3>
                <p className="mt-3 text-sm text-white/60">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#0b0b0b]">
        <div className="content-width rounded-3xl border border-[#caa75a]/40 bg-[#121212] p-10 text-center">
          <p className="text-xs font-black uppercase tracking-[0.4em] text-[#caa75a]">Professional Funeral Photography</p>
          <h2 className="mt-4 text-3xl md:text-5xl font-black">Respectful coverage, preserved with care.</h2>
          <p className="mt-4 text-white/60">
            Respectful and discreet photography coverage for memorial services, burials, and family remembrance gatherings.
          </p>
          <Button asChild className="mt-8 h-12 px-8 text-xs font-black uppercase tracking-[0.3em] bg-[#caa75a] text-black hover:bg-[#b8964f]">
            <a href="#contact">Book Photography</a>
          </Button>
        </div>
      </section>

      <section id="contact" className="section-padding bg-[#111111] scroll-mt-24">
        <div className="content-width grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <p className="text-xs font-black uppercase tracking-[0.4em] text-[#caa75a]">Contact</p>
            <h2 className="text-3xl md:text-5xl font-black">We handle every detail with care.</h2>
            <p className="text-sm text-white/60">Share the date and location and we will follow up within 24 hours.</p>
          </div>
          <form className="grid gap-4 rounded-3xl border border-white/10 bg-black/40 p-6">
            <input
              className="h-12 rounded-xl border border-transparent bg-white/5 px-4 text-sm text-white shadow-sm outline-none focus:border-[#caa75a]/40"
              placeholder="Full name"
            />
            <input
              className="h-12 rounded-xl border border-transparent bg-white/5 px-4 text-sm text-white shadow-sm outline-none focus:border-[#caa75a]/40"
              placeholder="Email address"
              type="email"
            />
            <textarea
              className="min-h-[140px] rounded-xl border border-transparent bg-white/5 px-4 py-3 text-sm text-white shadow-sm outline-none focus:border-[#caa75a]/40"
              placeholder="Tell us about the service"
            />
            <Button className="h-12 text-xs font-black uppercase tracking-[0.3em] bg-[#caa75a] text-black hover:bg-[#b8964f]">Send Inquiry</Button>
          </form>
        </div>
      </section>

      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
          onClick={closeLightbox}
        >
          <div
            className="relative flex w-full max-w-5xl items-center justify-center px-4"
            onClick={(event) => event.stopPropagation()}
            onTouchStart={(event) => setTouchStartX(event.touches[0].clientX)}
            onTouchEnd={(event) => {
              if (touchStartX === null) return;
              const delta = event.changedTouches[0].clientX - touchStartX;
              if (delta > 50) {
                showPrev();
              } else if (delta < -50) {
                showNext();
              }
              setTouchStartX(null);
            }}
          >
            <button
              type="button"
              aria-label="Previous image"
              onClick={showPrev}
              className="hidden h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white md:flex"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="mx-4 flex-1 overflow-hidden rounded-2xl border border-white/10 bg-black">
              <img
                key={activeIndex}
                src={images[activeIndex]}
                alt={`Funeral photography ${activeIndex + 1}`}
                className={`h-[70vh] w-full object-contain ${slideDirection === "next" ? "slide-next" : "slide-prev"}`}
              />
            </div>
            <button
              type="button"
              aria-label="Next image"
              onClick={showNext}
              className="hidden h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white md:flex"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Close"
              onClick={closeLightbox}
              className="absolute -top-12 right-4 h-10 w-10 rounded-full border border-white/20 bg-black/50 text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default FuneralPhotography;

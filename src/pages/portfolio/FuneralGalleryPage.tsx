import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, Camera, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FuneralGalleryPage = () => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"next" | "prev">("next");

  const images = [
    "/images/portfolio/funeral/optimized/funeral-1.jpg",
    "/images/portfolio/funeral/optimized/funeral-2.jpg",
    "/images/portfolio/funeral/optimized/funeral-3.jpg",
    "/images/portfolio/funeral/optimized/funeral-4.jpg",
    "/images/portfolio/funeral/optimized/funeral-5.jpg",
    "/images/portfolio/funeral/optimized/funeral-6.jpg",
    "/images/portfolio/funeral/optimized/funeral-9.jpg",
    "/images/portfolio/funeral/optimized/funeral-10.jpg",
    "/images/portfolio/funeral/optimized/funeral-11.jpg",
    "/images/portfolio/funeral/optimized/funeral-12.jpg",
    "/images/portfolio/funeral/optimized/funeral-13.jpg",
    "/images/portfolio/funeral/optimized/funeral-14.jpg",
    "/images/portfolio/funeral/optimized/funeral-photography-gqeberha-13.jpg",
  ];

  useEffect(() => {
    document.title = "Funeral Photography Gallery | Kasilam Media Productions";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "View our gallery of respectful memorial service photography and remembrance coverage.");
    }
  }, []);

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
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowRight") showNext();
      if (event.key === "ArrowLeft") showPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isLightboxOpen, showNext, showPrev]);

  return (
    <div className="bg-[#0b0b0b] text-white min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0b0b]/90 backdrop-blur-md">
        <div className="content-width flex items-center justify-between py-6">
          <div className="flex items-center gap-4">
            <Link to="/portfolio/photography/funeral" className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <ChevronLeft className="h-5 w-5 text-amber-500" />
            </Link>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-500">Gallery</p>
              <h1 className="text-xl font-black">Funeral Photography</h1>
            </div>
          </div>
          <Button asChild variant="outline" className="h-12 px-6 text-[10px] font-black uppercase tracking-[0.3em] border-white/10 hover:bg-white/5">
            <Link to="/portfolio/photography" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Portfolio Hub
            </Link>
          </Button>
        </div>
      </header>

      {/* Gallery Section */}
      <section className="section-padding pt-12">
        <div className="content-width">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p className="text-sm text-white/50 font-medium mb-4">A curated collection of respectful memorial service coverage.</p>
            <h2 className="text-3xl md:text-5xl font-black text-gradient">Stories of Remembrance.</h2>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {images.map((src, index) => (
              <motion.button
                key={src}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                type="button"
                onClick={() => openLightbox(index)}
                className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]"
              >
                <img
                  src={src}
                  alt={`Funeral memorial photography ${index + 1}`}
                  className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="p-4 rounded-full bg-amber-500 text-black">
                    <Camera className="h-6 w-6" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl"
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-8 right-8 z-[110] p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            <button
              type="button"
              onClick={showPrev}
              className="absolute left-8 z-[110] p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>

            <button
              type="button"
              onClick={showNext}
              className="absolute right-8 z-[110] p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="h-8 w-8" />
            </button>

            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: slideDirection === "next" ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: slideDirection === "next" ? -50 : 50 }}
              transition={{ duration: 0.3 }}
              className="relative max-h-[80vh] max-w-[90vw]"
            >
              <img
                src={images[activeIndex]}
                alt={`Funeral memorial photography ${activeIndex + 1}`}
                className="h-full w-full object-contain rounded-2xl shadow-2xl"
              />
              <div className="absolute bottom-[-60px] left-0 right-0 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-500 mb-2">Image {activeIndex + 1} of {images.length}</p>
                <p className="text-white/40 text-xs">Respectful Remembrance Coverage</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FuneralGalleryPage;

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const AboutHero = () => {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden pt-20 bg-background" aria-labelledby="about-hero-title">
      {/* 1. Background Illustrations - Inline SVG for Performance */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
        {/* Mesh Background Effect */}
        <div className="absolute inset-0 mesh-bg opacity-10 dark:opacity-20" />
        
        {/* Partnership Icon (Hands Shaking) - Left Side */}
        <svg
          className="absolute left-[5%] top-[20%] w-[150px] md:w-[250px] lg:w-[350px] opacity-10 dark:opacity-20 transition-opacity duration-500"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Stylized handshake illustration representing partnership"
        >
          <style>
            {`
              @keyframes shake {
                0%, 100% { transform: rotate(0deg); }
                25% { transform: rotate(-3deg); }
                75% { transform: rotate(3deg); }
              }
              @keyframes slide-left {
                0% { transform: translateX(-20px); opacity: 0; }
                100% { transform: translateX(0); opacity: 1; }
              }
              @keyframes slide-right {
                0% { transform: translateX(20px); opacity: 0; }
                100% { transform: translateX(0); opacity: 1; }
              }
              /* Default states for fallback */
              .hand-left, .hand-right { opacity: 1; transform: translateX(0); }
              
              /* Only apply animation if supported */
              @supports (animation: shake 1s) {
                .hand-left { animation: slide-left 1s ease-out forwards; opacity: 0; }
                .hand-right { animation: slide-right 1s ease-out forwards; opacity: 0; }
                .handshake-group { 
                  animation: shake 3s ease-in-out infinite; 
                  transform-origin: center;
                }
              }
              @media (prefers-reduced-motion: reduce) {
                .handshake-group, .hand-left, .hand-right { animation: none !important; opacity: 1 !important; transform: none !important; }
              }
            `}
          </style>
          <g className="handshake-group">
            {/* Left Hand */}
            <path
              className="hand-left"
              d="M40 100C40 100 60 80 80 85C100 90 110 105 110 105L100 125L60 120L40 100Z"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            />
            {/* Right Hand */}
            <path
              className="hand-right"
              d="M160 100C160 100 140 80 120 85C100 90 90 105 90 105L100 125L140 120L160 100Z"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-foreground"
            />
            {/* Grip Detail */}
            <path
              d="M100 105L110 115M110 105L100 115"
              stroke="currentColor"
              strokeWidth="2"
              opacity="0.5"
            />
          </g>
        </svg>

        {/* Growth Icon (Bar Graph) - Right Side */}
        <svg
          className="absolute right-[5%] bottom-[20%] w-[150px] md:w-[250px] lg:w-[350px] opacity-10 dark:opacity-20 transition-opacity duration-500"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Animated bar graph illustration representing business growth"
        >
          <style>
            {`
              @keyframes grow-up {
                0% { transform: scaleY(0); }
                100% { transform: scaleY(1); }
              }
              .bar { 
                transform-origin: bottom;
                /* Default state is visible for fallback */
                transform: scaleY(1);
              }
              /* Only apply animation if supported */
              @supports (animation: grow-up 1s) {
                .bar { animation: grow-up 1.5s cubic-bezier(0.17, 0.67, 0.83, 0.67) forwards; }
                .bar-1 { animation-delay: 0.2s; transform: scaleY(0); }
                .bar-2 { animation-delay: 0.5s; transform: scaleY(0); }
                .bar-3 { animation-delay: 0.8s; transform: scaleY(0); }
              }
              @media (prefers-reduced-motion: reduce) {
                .bar { animation: none !important; transform: scaleY(1) !important; }
              }
            `}
          </style>
          {/* Axis */}
          <path d="M40 160H160" stroke="currentColor" strokeWidth="2" opacity="0.3" />
          <path d="M40 40V160" stroke="currentColor" strokeWidth="2" opacity="0.3" />
          
          {/* Bars */}
          <rect className="bar bar-1 text-primary/40" x="55" y="100" width="20" height="60" fill="currentColor" rx="4" />
          <rect className="bar bar-2 text-primary/70" x="90" y="70" width="20" height="90" fill="currentColor" rx="4" />
          <rect className="bar bar-3 text-primary" x="125" y="40" width="20" height="120" fill="currentColor" rx="4" />
        </svg>
      </div>

      {/* 2. Content Section - Centered and High Contrast */}
      <div className="content-width relative z-10 text-center py-20">
        <div className="max-w-4xl mx-auto">
          <h1 id="about-hero-title" className="animate-fade-in mb-8 text-gradient tracking-tight leading-[1.1]">
            Built From Experience.
            <br />
            <span className="text-primary italic">Structured for Growth.</span>
          </h1>
          
          <div className="space-y-8">
            <p className="animate-fade-in text-lg md:text-2xl font-semibold text-foreground/80 leading-relaxed max-w-3xl mx-auto" style={{ animationDelay: "150ms" }}>
              Kasilam Media Production is a multidisciplinary creative studio operating at the intersection of media, technology, and strategic brand visibility.
            </p>
            
            <p className="animate-fade-in text-base md:text-lg text-foreground/60 leading-relaxed max-w-2xl mx-auto font-medium" style={{ animationDelay: "300ms" }}>
              We bridge the gap between talent and visibility, providing professional tools for those ready to scale their impact.
            </p>
          </div>

          <div className="mt-12 flex animate-fade-in flex-wrap justify-center gap-6" style={{ animationDelay: "450ms" }}>
            <Button asChild variant="red" size="lg" className="h-16 px-12 text-[11px] font-black uppercase tracking-[0.3em] rounded-full transition-all hover:scale-105 active:scale-95 shadow-xl shadow-red-600/10">
              <Link to="/contact">Work With Us <ArrowRight className="h-4 w-4 ml-3" /></Link>
            </Button>
            <Button asChild variant="black" size="lg" className="h-16 px-12 text-[11px] font-black uppercase tracking-[0.3em] rounded-full transition-all hover:scale-105 active:scale-95">
              <Link to="/services">View Our Work</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* 3. Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default AboutHero;

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Globe,
  BarChart3,
  Megaphone,
  PenTool,
  Target,
  CheckCircle,
  ArrowRight,
  MessageSquare,
  Search,
  Share2,
} from "lucide-react";
import { useBooking } from "@/contexts/BookingContext";
import { FadeInSection, HeroSection, StaggerContainer, StaggerItem } from "@/components/animations";
import { useEffect } from "react";

const processSteps = [
  {
    icon: Search,
    title: "Discovery & Audit",
    desc: "We analyze your current digital presence, audience, and competitors to identify opportunities.",
  },
  {
    icon: Target,
    title: "Strategy & Roadmap",
    desc: "A tailored digital plan with clear goals, timelines, and measurable KPIs.",
  },
  {
    icon: PenTool,
    title: "Content & Execution",
    desc: "We create and deploy content, campaigns, and assets across your chosen platforms.",
  },
  {
    icon: BarChart3,
    title: "Reporting & Optimization",
    desc: "Monthly performance reports with data-driven adjustments to maximize your results.",
  },
];

const services = [
  {
    icon: Share2,
    title: "Social Media Management",
    desc: "Grow your audience with strategic content and consistent engagement.",
    link: "/services/social-media-management"
  },
  {
    icon: Megaphone,
    title: "Paid Advertising",
    desc: "Target the right audience and drive measurable results with smart campaigns.",
    link: "/services/paid-advertising"
  },
  {
    icon: PenTool,
    title: "Content Creation",
    desc: "Professional graphics, copywriting, and video content designed for engagement.",
    link: "/services/content-creation"
  },
  {
    icon: Globe,
    title: "Website & Web App Design",
    desc: "Modern websites and web applications built for performance and scalability.",
    link: "/services/web-app-development"
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    desc: "Clear insights and data tracking to guide smarter marketing decisions.",
    link: "/services/analytics-reporting"
  },
];

const authorityPoints = [
  "Strategy-driven marketing",
  "Creative content production",
  "Data-driven campaigns",
  "Full digital ecosystem support",
];

const DigitalMarketing = () => {
  const { openBooking } = useBooking();

  useEffect(() => {
    document.title = "KMP | Professional Website Design & Digital Media in Port Elizabeth";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Kasilam Media Productions (KMP) provides professional website development in Port Elizabeth, business website design Eastern Cape, and digital media solutions across South Africa.");
    }
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden section-padding pb-32">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background z-10" />
          {/* Futuristic Circuit Network Background */}
          <svg
            className="absolute inset-0 w-full h-full opacity-15 dark:opacity-30"
            viewBox="0 0 1200 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <style>
              {`
                @keyframes circuit-pulse {
                  0%, 100% { opacity: 0.3; r: 3; }
                  50% { opacity: 1; r: 6; }
                }
                @keyframes circuit-flow {
                  0% { stroke-dashoffset: 40; }
                  100% { stroke-dashoffset: 0; }
                }
                @keyframes node-glow {
                  0%, 100% { opacity: 0.2; }
                  50% { opacity: 0.8; }
                }
                @keyframes hex-drift {
                  0% { transform: translateY(0) rotate(0deg); }
                  50% { transform: translateY(-15px) rotate(5deg); }
                  100% { transform: translateY(0) rotate(0deg); }
                }
                @keyframes hex-drift-alt {
                  0% { transform: translateY(0) rotate(0deg); }
                  50% { transform: translateY(10px) rotate(-3deg); }
                  100% { transform: translateY(0) rotate(0deg); }
                }
                .circuit-node { animation: circuit-pulse 3s ease-in-out infinite; }
                .circuit-node-2 { animation: circuit-pulse 3s ease-in-out infinite 0.5s; }
                .circuit-node-3 { animation: circuit-pulse 3s ease-in-out infinite 1s; }
                .circuit-node-4 { animation: circuit-pulse 3s ease-in-out infinite 1.5s; }
                .circuit-node-5 { animation: circuit-pulse 3s ease-in-out infinite 2s; }
                .circuit-line { stroke-dasharray: 20 20; animation: circuit-flow 2s linear infinite; }
                .circuit-line-2 { stroke-dasharray: 15 25; animation: circuit-flow 3s linear infinite; }
                .node-outer { animation: node-glow 4s ease-in-out infinite; }
                .node-outer-2 { animation: node-glow 4s ease-in-out infinite 1s; }
                .node-outer-3 { animation: node-glow 4s ease-in-out infinite 2s; }
                .hex-float { animation: hex-drift 8s ease-in-out infinite; transform-origin: center; }
                .hex-float-2 { animation: hex-drift-alt 10s ease-in-out infinite; transform-origin: center; }
                .hex-float-3 { animation: hex-drift 12s ease-in-out infinite 2s; transform-origin: center; }
                @media (prefers-reduced-motion: reduce) {
                  .circuit-node, .circuit-node-2, .circuit-node-3, .circuit-node-4, .circuit-node-5,
                  .circuit-line, .circuit-line-2, .node-outer, .node-outer-2, .node-outer-3,
                  .hex-float, .hex-float-2, .hex-float-3 {
                    animation: none !important;
                  }
                }
              `}
            </style>

            {/* Grid Lines */}
            <g stroke="hsl(0 0% 50%)" strokeWidth="0.5" opacity="0.15">
              <line x1="0" y1="200" x2="1200" y2="200" />
              <line x1="0" y1="400" x2="1200" y2="400" />
              <line x1="0" y1="600" x2="1200" y2="600" />
              <line x1="300" y1="0" x2="300" y2="800" />
              <line x1="600" y1="0" x2="600" y2="800" />
              <line x1="900" y1="0" x2="900" y2="800" />
            </g>

            {/* Circuit Connection Lines with Flow Animation */}
            <g strokeWidth="1.5">
              <path className="circuit-line" d="M150 200 L300 200 L450 350 L600 350" stroke="hsl(0 72% 51%)" opacity="0.4" />
              <path className="circuit-line-2" d="M600 350 L750 200 L900 200 L1050 350" stroke="hsl(0 72% 51%)" opacity="0.3" />
              <path className="circuit-line" d="M300 600 L450 450 L600 450 L750 600" stroke="hsl(0 72% 51%)" opacity="0.35" />
              <path className="circuit-line-2" d="M100 500 L250 350 L400 350" stroke="hsl(0 72% 51%)" opacity="0.25" />
              <path className="circuit-line" d="M800 500 L950 350 L1100 350 L1150 400" stroke="hsl(0 72% 51%)" opacity="0.3" />
            </g>

            {/* Glowing Nodes at Intersections */}
            <g>
              <circle className="node-outer" cx="300" cy="200" r="20" fill="hsl(0 72% 51%)" opacity="0.1" />
              <circle className="circuit-node" cx="300" cy="200" r="4" fill="hsl(0 72% 51%)" />
              
              <circle className="node-outer-2" cx="600" cy="350" r="25" fill="hsl(0 72% 51%)" opacity="0.1" />
              <circle className="circuit-node-2" cx="600" cy="350" r="5" fill="hsl(0 72% 51%)" />
              
              <circle className="node-outer-3" cx="900" cy="200" r="18" fill="hsl(0 72% 51%)" opacity="0.1" />
              <circle className="circuit-node-3" cx="900" cy="200" r="4" fill="hsl(0 72% 51%)" />
              
              <circle className="node-outer" cx="450" cy="450" r="15" fill="hsl(0 72% 51%)" opacity="0.08" />
              <circle className="circuit-node-4" cx="450" cy="450" r="3" fill="hsl(0 72% 51%)" />
              
              <circle className="node-outer-2" cx="750" cy="600" r="22" fill="hsl(0 72% 51%)" opacity="0.1" />
              <circle className="circuit-node-5" cx="750" cy="600" r="4" fill="hsl(0 72% 51%)" />

              <circle className="node-outer-3" cx="150" cy="200" r="12" fill="hsl(0 72% 51%)" opacity="0.08" />
              <circle className="circuit-node" cx="150" cy="200" r="3" fill="hsl(0 72% 51%)" />

              <circle className="node-outer" cx="1050" cy="350" r="16" fill="hsl(0 72% 51%)" opacity="0.08" />
              <circle className="circuit-node-3" cx="1050" cy="350" r="3" fill="hsl(0 72% 51%)" />
            </g>

            {/* Floating Hexagons */}
            <g stroke="hsl(0 72% 51%)" strokeWidth="1" fill="none">
              <polygon className="hex-float" points="200,100 220,88 240,100 240,124 220,136 200,124" opacity="0.3" />
              <polygon className="hex-float-2" points="850,500 875,486 900,500 900,528 875,542 850,528" opacity="0.25" />
              <polygon className="hex-float-3" points="1000,150 1020,138 1040,150 1040,174 1020,186 1000,174" opacity="0.2" />
            </g>

            {/* Floating Circles */}
            <g stroke="hsl(0 0% 50%)" strokeWidth="0.8" fill="none">
              <circle className="hex-float-2" cx="500" cy="150" r="30" opacity="0.15" />
              <circle className="hex-float" cx="100" cy="650" r="25" opacity="0.1" />
              <circle className="hex-float-3" cx="1100" cy="600" r="35" opacity="0.12" />
            </g>

            {/* Data Flow Dots */}
            <g fill="hsl(0 72% 51%)">
              <circle className="circuit-node-2" cx="375" cy="275" r="2" opacity="0.5" />
              <circle className="circuit-node-4" cx="525" cy="350" r="2" opacity="0.4" />
              <circle className="circuit-node" cx="675" cy="275" r="2" opacity="0.5" />
              <circle className="circuit-node-3" cx="825" cy="200" r="2" opacity="0.4" />
              <circle className="circuit-node-5" cx="375" cy="425" r="2" opacity="0.3" />
              <circle className="circuit-node-2" cx="525" cy="450" r="2" opacity="0.4" />
            </g>
          </svg>
        </div>
        
        <div className="content-width relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <HeroSection>
              <div className="mb-10 inline-flex items-center gap-3 rounded-full border border-red-600/30 bg-red-600/10 px-6 py-2 text-xs font-black uppercase tracking-[0.3em] text-red-600 animate-pulse">
                <Globe className="h-4 w-4" /> KMP Digital Media Solutions
              </div>
            </HeroSection>
            <HeroSection delay={0.1}>
              <h1 className="text-5xl font-black leading-[0.85] md:text-8xl lg:text-9xl text-foreground tracking-[-0.06em] mb-12">
                KMP Digital <span className="text-gradient">For Growth</span>
              </h1>
            </HeroSection>
            <HeroSection delay={0.2}>
              <p className="mt-8 text-xl md:text-2xl text-foreground/50 font-bold uppercase tracking-widest leading-relaxed max-w-3xl mx-auto">
                Kasilam Media Productions (KMP) builds and manages your digital presence with purposeful content, targeted campaigns, and clear reporting in Port Elizabeth and across South Africa.
              </p>
            </HeroSection>
            <HeroSection delay={0.3}>
              <div className="flex flex-wrap justify-center gap-6 mt-16">
                <Button
                  onClick={() => openBooking({
                    service: "Digital Marketing",
                    package: "Digital Inquiry",
                    price: 0
                  })}
                  variant="red"
                  size="lg"
                  className="h-20 px-16 text-xs font-black rounded-full uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  Start Your Journey <ArrowRight className="h-4 w-4 ml-4" />
                </Button>
                <Button asChild variant="black" className="h-20 px-16 text-xs font-black rounded-full uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95 cursor-pointer">
                  <a href="#packages">View Services</a>
                </Button>
              </div>
            </HeroSection>
          </div>
        </div>
      </section>

      {/* Local SEO Context */}
      <section className="py-12 bg-background border-b border-foreground/5">
        <div className="content-width">
          <p className="text-center text-foreground/40 text-sm font-medium leading-relaxed max-w-4xl mx-auto uppercase tracking-wider">
            Kasilam Media Productions is your partner for <strong>website development Port Elizabeth</strong> and <strong>business website design Eastern Cape</strong>. We provide <strong>professional websites South Africa</strong> wide, helping local businesses compete on a national stage.
          </p>
        </div>
      </section>

      {/* Authority Section */}
      <section className="section-padding bg-alternate border-y border-foreground/5 relative overflow-hidden">
        <div className="content-width">
          <FadeInSection className="flex flex-col items-center justify-between gap-12 lg:flex-row">
            <div className="max-w-xl">
              <h2 className="mb-8 text-gradient">Why Elite Brands Work With KMP</h2>
              <p className="text-xl text-foreground/50 font-medium leading-relaxed">
                We are more than just a service provider; we are your strategic digital partner, ensuring your ecosystem is optimized for conversion.
              </p>
            </div>
            <div className="grid w-full max-w-2xl gap-6 sm:grid-cols-2">
              {authorityPoints.map((point) => (
                <div key={point} className="flex items-center gap-4 p-6 rounded-2xl bg-background border border-foreground/5 group hover:border-red-600/30 transition-colors">
                  <div className="bg-red-600/10 p-2 rounded-lg group-hover:scale-110 transition-transform">
                    <CheckCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <span className="text-foreground font-black uppercase tracking-tight text-sm">{point}</span>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <FadeInSection className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl text-foreground">
              Your Digital <span className="text-primary">Growth Partner</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              We don't just post content — we build digital ecosystems that work
              for your brand. From social media strategy to paid advertising and
              website management, we coordinate every piece of your online
              presence so it's consistent, measurable, and effective.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Our Process */}
      <section className="section-padding bg-alternate border-y border-foreground/5">
        <div className="content-width">
          <FadeInSection className="max-w-4xl mx-auto text-center mb-32">
            <h2 className="mb-8 text-gradient">Our Strategic Process</h2>
            <p className="text-xl font-bold uppercase tracking-widest text-foreground/50">Engineered for absolute growth and consistency.</p>
          </FadeInSection>
          <StaggerContainer className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <StaggerItem key={step.title} className="text-center group">
                <div className="mx-auto mb-10 flex h-20 w-20 items-center justify-center rounded-[2.5rem] bg-foreground/5 border border-foreground/5 group-hover:border-red-600/30 group-hover:-rotate-12 transition-all duration-700 dark:bg-white/5 dark:border-white/5">
                  <step.icon className="h-8 w-8 text-red-600" />
                </div>
                <div className="mb-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600">Step 0{i + 1}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 uppercase tracking-tighter">{step.title}</h3>
                <p className="text-base text-foreground/40 leading-relaxed font-medium">{step.desc}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Our Services */}
      <section id="packages" className="section-padding bg-background">
        <div className="content-width">
          <FadeInSection className="mb-24 text-center">
            <h2 className="mb-10 text-gradient leading-[0.85] tracking-[-0.06em]">
              Our Digital Ecosystem
            </h2>
            <p className="mx-auto text-xl md:text-2xl text-foreground/50 font-bold uppercase tracking-widest leading-relaxed max-w-3xl">
              Explore specialized solutions designed to scale your brand effectively.
            </p>
          </FadeInSection>

          <div className="mb-12 text-center md:hidden">
            <p className="text-xs font-black uppercase tracking-widest text-red-600 animate-pulse">
              Swipe to view services
            </p>
          </div>
          <div className="mb-12 text-center hidden md:block">
            <p className="text-xs font-black uppercase tracking-widest text-foreground/30">
              Click/Tap on a service card to learn more
            </p>
          </div>

          <StaggerContainer className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <StaggerItem key={s.title}>
                <div className="premium-card group relative overflow-hidden bg-background cursor-pointer hover:-translate-y-2 transition-all duration-500">
                  <Link to={s.link} className="absolute inset-0 z-10" />
                  <div className="p-10">
                    <div className="mb-10 inline-flex rounded-3xl bg-foreground/5 p-6 transition-colors group-hover:bg-red-600 group-hover:text-white">
                      <s.icon className="h-10 w-10 text-red-600 transition-colors group-hover:text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-foreground transition-colors group-hover:text-red-600 uppercase tracking-tighter mb-4">{s.title}</h3>
                    <p className="text-base text-foreground/40 font-medium leading-relaxed uppercase tracking-tight">{s.desc}</p>
                    <div className="mt-10 flex items-center gap-3 font-black text-[10px] uppercase tracking-[0.3em] text-red-600 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-2">
                      View Service <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>



      {/* Final CTA */}
      <section className="section-padding relative overflow-hidden bg-background text-center border-t border-foreground/5">
        <div className="absolute inset-0 mesh-bg opacity-10 dark:opacity-30" />
        <div className="content-width relative z-10">
          <HeroSection>
            <h2 className="text-5xl md:text-8xl lg:text-9xl font-black mb-12 text-gradient leading-[0.85] tracking-[-0.06em]">
              Ready to Take Your<br />Brand Digital?
            </h2>
          </HeroSection>
          <FadeInSection delay={0.2}>
            <p className="mx-auto max-w-4xl text-xl md:text-2xl text-foreground/50 mb-20 font-bold uppercase tracking-[0.2em] leading-relaxed">
              Let's build a digital strategy that drives real engagement, growth, and results for your business.
            </p>
          </FadeInSection>
          <FadeInSection delay={0.3}>
            <div className="flex flex-wrap justify-center gap-8">
              <Button
                onClick={() => openBooking({
                  service: "Digital Marketing",
                  package: "Strategic Consultation",
                  price: 0
                })}
                variant="red"
                size="lg"
                className="h-20 px-16 text-xs font-black rounded-full uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                Start Your Digital Journey <ArrowRight className="h-4 w-4 ml-4" />
              </Button>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
};

export default DigitalMarketing;

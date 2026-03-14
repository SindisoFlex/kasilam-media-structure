import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Music2, Instagram, Camera, Check, Zap, Award, Users,
  Mic, Headphones, AudioWaveform, Play, Share2, Video, 
  Image as ImageIcon, Aperture, Frame, Clapperboard
} from "lucide-react";
import { FadeInSection, HeroSection, StaggerContainer, StaggerItem } from "@/components/animations";
import { useBooking } from "@/contexts/BookingContext";
import { useEffect } from "react";

// Lightweight CSS-based animations for floating icons
const animationStyles = `
  @keyframes float-slow {
    0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.05; }
    50% { transform: translateY(-20px) rotate(5deg); opacity: 0.1; }
  }
  @keyframes float-medium {
    0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.03; }
    50% { transform: translateY(-15px) rotate(-5deg); opacity: 0.08; }
  }
  .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
  .animate-float-medium { animation: float-medium 6s ease-in-out infinite; }
`;

const BackgroundIcons = ({ type }: { type: "music" | "social" | "photo" }) => {
  const icons = {
    music: [
      { Icon: Music2, className: "top-0 left-[5%] h-32 w-32 animate-float-slow" },
      { Icon: Mic, className: "top-20 right-[10%] h-40 w-40 animate-float-medium delay-700" },
      { Icon: AudioWaveform, className: "bottom-10 left-[15%] h-48 w-48 animate-float-slow delay-1000" },
      { Icon: Headphones, className: "bottom-20 right-[5%] h-24 w-24 animate-float-medium delay-300" },
    ],
    social: [
      { Icon: Instagram, className: "top-10 left-[10%] h-24 w-24 animate-float-slow" },
      { Icon: Play, className: "top-0 right-[20%] h-32 w-32 animate-float-medium delay-500" },
      { Icon: Share2, className: "bottom-20 left-[5%] h-28 w-28 animate-float-slow delay-200" },
      { Icon: Video, className: "bottom-0 right-[10%] h-40 w-40 animate-float-medium delay-1000" },
    ],
    photo: [
      { Icon: Camera, className: "top-10 right-[5%] h-32 w-32 animate-float-slow" },
      { Icon: Aperture, className: "top-32 left-[10%] h-24 w-24 animate-float-medium delay-700" },
      { Icon: ImageIcon, className: "bottom-10 right-[15%] h-40 w-40 animate-float-slow delay-300" },
      { Icon: Frame, className: "bottom-20 left-[5%] h-20 w-20 animate-float-medium delay-1000" },
    ]
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {icons[type].map(({ Icon, className }, index) => (
        <div key={index} className={`absolute text-white ${className} opacity-5`}>
          <Icon className="w-full h-full" strokeWidth={1} />
        </div>
      ))}
    </div>
  );
};

const CreatorsArtists = () => {
  const { openBooking } = useBooking();

  useEffect(() => {
    document.title = "Creators & Artists Production | Music Videos & Content | Port Elizabeth";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Professional music video production, social media content creation, and artist photoshoots in Port Elizabeth (Gqeberha). We help musicians and influencers in the Eastern Cape create powerful visual stories.");
    }
  }, []);

  const services = [
    {
      id: "music-video", 
      iconType: "music" as const,
      title: "Music Video Production", 
      description: "Professional cinematic music videos for your tracks. We specialize in music video filming in Gqeberha and music video production across Port Elizabeth.", 
      icon: Music2,
      details: ["Concept development & storyboarding", "Multi-location filming", "Cinematic color grading", "Sync sound and music timing", "4K/UHD delivery options", "Social media formats included"],
      packages: [
        { tier: "Essential", hours: "1-2 days", price: 8000, features: ["Single location shoot", "Basic lighting setup", "Edited highlights", "2K resolution"] },
        { tier: "Professional", hours: "2-3 days", price: 15000, features: ["Multi-location shoot", "Advanced cinematography", "Professional color grading", "4K resolution", "Social format variations"] },
        { tier: "Elite", hours: "Custom", price: 25000, features: ["Full production scope", "Drone footage", "Special effects", "4K/UHD delivery", "Unlimited revisions", "Fast turnaround"] },
      ],
    },
    {
      id: "social-content", 
      iconType: "social" as const,
      title: "Social Media Content Creation", 
      description: "Engaging content for Instagram, TikTok, YouTube, and more. Perfect for content creator videography in the Eastern Cape and influencer brand growth.", 
      icon: Instagram,
      details: ["Short-form video content", "Trending format optimization", "Captions and graphics", "Multi-platform posting", "Engagement-focused editing", "Upload-ready files"],
      packages: [
        { tier: "Starter", hours: "1 day", price: 3000, features: ["5 short-form videos", "Up to 60 seconds each", "Basic editing", "Platform optimization"] },
        { tier: "Growth", hours: "2-3 days", price: 6000, features: ["15 short-form videos", "Varied content types", "Trend-focused content", "Captions and overlays", "SEO optimization"] },
        { tier: "Influencer", hours: "Weekly", price: 12000, features: ["25+ monthly videos", "Content calendar planning", "Trending audio/music", "Analytics reporting", "Community engagement tips"] },
      ],
    },
    {
      id: "creative-shoot", 
      iconType: "photo" as const,
      title: "Creative Photoshoots", 
      description: "Professional artist photoshoots in South Africa. High-end editorial looks for album art, promotion, and brand building.", 
      icon: Camera,
      details: ["Creative concept development", "Professional styling consultation", "Multiple outfit changes", "Studio and location shoots", "Advanced lighting techniques", "High-resolution digital gallery"],
      packages: [
        { tier: "Creative", hours: "4 hours", price: 3500, features: ["50-100 photos", "One concept theme", "Basic editing", "Digital gallery access"] },
        { tier: "Premium", hours: "Full day", price: 7500, features: ["200+ photos", "3 concept themes", "Advanced editing", "High-resolution prints available", "Professional retouching"] },
        { tier: "Signature", hours: "Multi-day", price: 15000, features: ["Unlimited photos", "Custom concepts", "Studio + location shoots", "Premium retouching", "Album art optimization", "Marketing package included"] },
      ],
    },
  ];

  const benefits = [
    { icon: Zap, title: "Fast Turnaround", desc: "Quick editing and delivery to keep your content fresh and trending" },
    { icon: Award, title: "Professional Quality", desc: "Studio-grade production that elevates your creative work" },
    { icon: Users, title: "Audience Focus", desc: "Content optimized for engagement and platform algorithms" },
  ];

  return (
    <div className="bg-background text-foreground min-h-screen">
      <style>{animationStyles}</style>

      {/* Hero Section Redesign */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Cinematic Creative Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-black/20 z-20" />
          <div className="absolute inset-0 bg-red-900/10 mix-blend-overlay z-20" />
          <img 
            src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2000&auto=format&fit=crop" 
            alt="Cinematic music video production studio in Port Elizabeth with neon lighting" 
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>

        <div className="content-width relative z-30 text-center pt-20">
          <HeroSection>
            <div className="mb-8 flex justify-center">
              <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-foreground/10 border border-foreground/10 backdrop-blur-md dark:bg-black/60 dark:border-white/10">
                <Clapperboard className="h-4 w-4 text-red-500" />
                <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.4em]">Creative Studio</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 text-foreground tracking-tight leading-none drop-shadow-2xl dark:text-white">
              Creators & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Artists Production</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/90 font-medium leading-relaxed max-w-3xl mx-auto drop-shadow-lg mb-4 dark:text-white/90">
              Professional music video production, social media content creation, and creative photoshoots for artists and influencers in Port Elizabeth, Eastern Cape.
            </p>
            <p className="text-sm md:text-base text-foreground/60 font-medium uppercase tracking-[0.2em] dark:text-white/60">
              Helping musicians, influencers, and digital creators turn their ideas into powerful visual stories.
            </p>
          </HeroSection>
        </div>
      </section>

      {/* Services Section with Floating Icons */}
      <section className="section-padding overflow-hidden">
        <div className="content-width">
          {services.map((service, index) => (
            <FadeInSection key={service.id} delay={index * 0.1} className={`relative mb-32 ${index !== services.length - 1 ? "pb-32 border-b border-foreground/5 dark:border-white/5" : ""}`}>
              {/* Animated Background Icons */}
              <BackgroundIcons type={service.iconType} />

              <div className="relative z-10 max-w-5xl mx-auto">
                <div className="mb-20">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-10">
                    <div className="h-24 w-24 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center shrink-0 shadow-[0_0_30px_-10px_rgba(220,38,38,0.3)] dark:bg-white/5 dark:border-white/10">
                      <service.icon className="h-10 w-10 text-red-600" />
                    </div>
                    <div>
                      <h2 className="text-4xl md:text-5xl font-black text-foreground uppercase tracking-tight mb-4 dark:text-white">{service.title}</h2>
                      <p className="text-xl text-foreground/70 font-medium leading-relaxed max-w-2xl dark:text-white/70">{service.description}</p>
                    </div>
                  </div>
                  
                  <div className="bg-foreground/[0.03] backdrop-blur-sm border border-foreground/5 rounded-2xl p-8 mb-12 dark:bg-zinc-900/50 dark:border-white/5">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600 mb-6">Production Includes:</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {service.details.map((detail) => (
                        <div key={detail} className="flex items-center gap-3">
                          <Check className="h-4 w-4 text-red-600 shrink-0" />
                          <span className="text-sm text-foreground/80 font-medium dark:text-white/80">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-2xl font-black mb-10 uppercase tracking-tight pl-2 border-l-4 border-red-600">Available Packages</h3>
                  <StaggerContainer className="grid md:grid-cols-3 gap-8">
                    {service.packages.map((pkg) => (
                      <StaggerItem key={pkg.tier}>
                        <div className="premium-card group bg-foreground/[0.02] backdrop-blur-md border-foreground/10 hover:border-red-600/50 transition-all duration-300 dark:bg-black/40 dark:border-white/10">
                          <h4 className="text-2xl font-black text-red-600 mb-2 uppercase tracking-tight">{pkg.tier}</h4>
                          <p className="text-sm text-foreground/50 mb-6 font-medium bg-foreground/5 inline-block px-3 py-1 rounded-full dark:text-white/50 dark:bg-white/5">{pkg.hours}</p>
                          <p className="text-3xl font-black text-foreground mb-8 dark:text-white">R {pkg.price.toLocaleString()}</p>
                          <ul className="space-y-4 mb-12 flex-grow">
                            {pkg.features.map((feature) => (
                              <li key={feature} className="flex items-start gap-3 text-sm">
                                <div className="h-1.5 w-1.5 rounded-full bg-red-600 shrink-0 mt-1.5" />
                                <span className="text-foreground/80 leading-relaxed dark:text-white/80">{feature}</span>
                              </li>
                            ))}
                          </ul>
                          <Button
                            onClick={() => openBooking({
                              service: service.title,
                              package: pkg.tier,
                              price: pkg.price,
                            })}
                            className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-black rounded-lg uppercase tracking-widest text-[10px]"
                          >
                            Book Package
                          </Button>
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      <section className="section-padding bg-card/40 border-t border-foreground/5 dark:bg-zinc-950 dark:border-white/5">
        <div className="content-width">
          <FadeInSection>
            <h2 className="text-center mb-24 text-gradient text-4xl">Why Creators Choose Us</h2>
          </FadeInSection>
          <StaggerContainer className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            {benefits.map((benefit) => (
              <StaggerItem key={benefit.title} className="text-center group">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-foreground/5 border border-foreground/5 group-hover:border-red-600/50 group-hover:scale-110 transition-all duration-500 shadow-[0_0_20px_-5px_rgba(0,0,0,0.5)] dark:bg-white/5 dark:border-white/5">
                  <benefit.icon className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 uppercase tracking-tight dark:text-white">{benefit.title}</h3>
                <p className="text-foreground/60 text-sm leading-relaxed font-medium px-4 dark:text-white/60">{benefit.desc}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-red-900/5 z-0" />
        <div className="content-width relative z-10">
          <FadeInSection className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-5xl font-black mb-8 text-gradient tracking-tight">Your Visual Story Starts Here</h2>
            <p className="text-xl text-foreground/60 font-medium mb-12 max-w-2xl mx-auto dark:text-white/60">
              Ready to elevate your personal brand or music career? Let&apos;s create compelling visual content that showcases your talent to the world.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button asChild variant="red" className="h-16 px-12 font-black rounded-full uppercase tracking-widest text-[10px] transition-all">
                <Link to="/contact">Start Your Project</Link>
              </Button>
              <Button asChild variant="black" className="h-16 px-12 font-black rounded-full uppercase tracking-widest text-[10px] transition-all">
                <Link to="/services/visual-production">Back to Visual Production</Link>
              </Button>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
};

export default CreatorsArtists;

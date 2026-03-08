import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Music2, Instagram, Camera, Check, Zap, Award, Users } from "lucide-react";
import { FadeInSection, HeroSection, StaggerContainer, StaggerItem } from "@/components/animations";

const CreatorsArtists = () => {
  const services = [
    {
      id: "music-video", title: "Music Video Production", description: "Professional cinematic music videos for your tracks", icon: Music2,
      details: ["Concept development & storyboarding", "Multi-location filming", "Cinematic color grading", "Sync sound and music timing", "4K/UHD delivery options", "Social media formats included"],
      packages: [
        { tier: "Essential", hours: "1-2 days", price: 8000, features: ["Single location shoot", "Basic lighting setup", "Edited highlights", "2K resolution"] },
        { tier: "Professional", hours: "2-3 days", price: 15000, features: ["Multi-location shoot", "Advanced cinematography", "Professional color grading", "4K resolution", "Social format variations"] },
        { tier: "Elite", hours: "Custom", price: 25000, features: ["Full production scope", "Drone footage", "Special effects", "4K/UHD delivery", "Unlimited revisions", "Fast turnaround"] },
      ],
    },
    {
      id: "social-content", title: "Social Media Content Creation", description: "Engaging content for Instagram, TikTok, YouTube, and more", icon: Instagram,
      details: ["Short-form video content", "Trending format optimization", "Captions and graphics", "Multi-platform posting", "Engagement-focused editing", "Upload-ready files"],
      packages: [
        { tier: "Starter", hours: "1 day", price: 3000, features: ["5 short-form videos", "Up to 60 seconds each", "Basic editing", "Platform optimization"] },
        { tier: "Growth", hours: "2-3 days", price: 6000, features: ["15 short-form videos", "Varied content types", "Trend-focused content", "Captions and overlays", "SEO optimization"] },
        { tier: "Influencer", hours: "Weekly", price: 12000, features: ["25+ monthly videos", "Content calendar planning", "Trending audio/music", "Analytics reporting", "Community engagement tips"] },
      ],
    },
    {
      id: "creative-shoot", title: "Creative Photoshoots", description: "Professional photoshoots for album art, promotion, and brand building", icon: Camera,
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
    <div className="bg-background text-white min-h-screen">
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 mesh-bg opacity-20" />
        <div className="content-width relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <HeroSection className="mb-8 flex justify-center">
              <div className="px-6 py-2 rounded-full bg-white/5 border border-white/10 red-glow backdrop-blur-xl">
                <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.4em]">Creators & Artists</span>
              </div>
            </HeroSection>
            <HeroSection delay={0.1}>
              <h1 className="text-5xl md:text-6xl font-black mb-8 text-gradient">Elevate Your Creative Vision</h1>
            </HeroSection>
            <HeroSection delay={0.2}>
              <p className="text-xl text-white/70 font-medium leading-relaxed">
                Professional visual production for musicians, influencers, and digital creators.
              </p>
            </HeroSection>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="content-width">
          {services.map((service, index) => (
            <FadeInSection key={service.id} delay={index * 0.1} className={`mb-32 ${index !== services.length - 1 ? "pb-32 border-b border-white/10" : ""}`}>
              <div className="max-w-4xl mx-auto">
                <div className="mb-16">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="h-20 w-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <service.icon className="h-10 w-10 text-red-600" />
                    </div>
                    <div>
                      <h2 className="text-4xl font-black text-white uppercase tracking-tight mb-2">{service.title}</h2>
                      <p className="text-lg text-white/60 font-medium">{service.description}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600 mb-6">Included:</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {service.details.map((detail) => (
                        <div key={detail} className="flex items-center gap-3">
                          <Check className="h-4 w-4 text-red-600 shrink-0" />
                          <span className="text-sm text-white/80 font-medium">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-16">
                  <h3 className="text-2xl font-black mb-10 uppercase tracking-tight">Available Packages</h3>
                  <StaggerContainer className="grid md:grid-cols-3 gap-8">
                    {service.packages.map((pkg) => (
                      <StaggerItem key={pkg.tier}>
                        <div className="premium-card group border-white/5 hover:border-red-600/50">
                          <h4 className="text-2xl font-black text-red-600 mb-2 uppercase tracking-tight">{pkg.tier}</h4>
                          <p className="text-sm text-white/50 mb-4 font-medium">{pkg.hours}</p>
                          <p className="text-3xl font-black text-white mb-8">R {pkg.price}</p>
                          <ul className="space-y-3 mb-12 flex-grow">
                            {pkg.features.map((feature) => (
                              <li key={feature} className="flex items-start gap-3 text-sm">
                                <div className="h-1.5 w-1.5 rounded-full bg-red-600 shrink-0 mt-1" />
                                <span className="text-white/80">{feature}</span>
                              </li>
                            ))}
                          </ul>
                          <Button asChild className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-black rounded-lg uppercase tracking-widest text-[10px]">
                            <Link to={`/booking?service=visual&category=${service.id}&package=${pkg.tier}`}>Select Package</Link>
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

      <section className="section-padding bg-zinc-950">
        <div className="content-width">
          <FadeInSection>
            <h2 className="text-center mb-24 text-gradient text-4xl">Why Work With Us?</h2>
          </FadeInSection>
          <StaggerContainer className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            {benefits.map((benefit) => (
              <StaggerItem key={benefit.title} className="text-center group">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/5 group-hover:border-red-600/30 group-hover:scale-110 transition-all">
                  <benefit.icon className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-tight">{benefit.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed font-medium">{benefit.desc}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="section-padding">
        <div className="content-width">
          <FadeInSection className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-black mb-6 text-gradient">Your Visual Story Starts Here</h2>
            <p className="text-xl text-white/60 font-medium mb-12">Let's create compelling visual content that showcases your talent.</p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button asChild className="h-14 px-12 bg-red-600 hover:bg-red-700 text-white font-black rounded-full uppercase tracking-widest text-[10px]">
                <Link to="/contact">Start Your Project</Link>
              </Button>
              <Button asChild variant="outline" className="h-14 px-12 border-white/10 text-white hover:bg-white/5 font-black rounded-full uppercase tracking-widest text-[10px]">
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

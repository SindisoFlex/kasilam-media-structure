﻿import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Home, Flower, Check } from "lucide-react";
import { FadeInSection, HeroSection, StaggerContainer, StaggerItem } from "@/components/animations";
import { useBooking } from "@/contexts/BookingContext";
import { motion, useScroll, useTransform } from "framer-motion";
import communityHero from "@/images/community-hero.svg";

const CommunityEvents = () => {
  const { openBooking } = useBooking();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showPackages, setShowPackages] = useState(false);
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  useEffect(() => {
    document.title = "Community Events Production | Port Elizabeth | Kasilam Media";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Professional photography and videography for community events, family milestones, and cultural gatherings in Port Elizabeth (Gqeberha), Eastern Cape, South Africa."
      );
    }
  }, []);

  const services = [
    {
      id: "wedding",
      title: "Wedding Production",
      description: "Cinematic, heartfelt coverage that honors every moment of your wedding day",
      icon: Heart,
      details: [
        "Pre-ceremony prep & details",
        "Ceremony vows & key moments",
        "Reception highlights & speeches",
        "Couple + family portraits",
        "Guest moments & dance floor energy",
      ],
      link: "/services/visual-production/wedding-production",
    },
    {
      id: "funeral",
      title: "Funeral Coverage",
      description: "Respectful documentation of memorial services",
      icon: Flower,
      details: [
        "Service coverage",
        "Family moments",
        "Tribute documentation",
        "Professional presence",
        "Sensitive approach",
      ],
      link: "/services/visual-production/funeral-coverage",
    },
    {
      id: "family",
      title: "Family & Social Events",
      description: "Personal celebrations and gatherings",
      icon: Home,
      details: [
        "Birthdays",
        "Baby Showers",
        "Graduations",
        "Traditional Ceremonies",
        "Family Gatherings",
        "Private Celebrations",
      ],
    },
  ];

  const coverageTiers = [
    {
      tier: 1,
      hours: 2,
      pricingPhoto: 1800,
      pricingVideo: 2000,
      pricingCombo: 2500,
      deliverables: [
        "Professional coverage of key moments",
        "Selected highlights edited",
        "Color corrected gallery/video",
        "Digital delivery (web + USB)",
        "Same-day previews via WhatsApp",
      ],
    },
    {
      tier: 2,
      hours: 4,
      pricingPhoto: 3500,
      pricingVideo: 4000,
      pricingCombo: 5000,
      deliverables: [
        "Extended comprehensive coverage",
        "Multiple creative angles",
        "Full edited gallery or video",
        "Advanced color grading",
        "Priority delivery within 10 days",
        "Mobile preview gallery",
      ],
    },
    {
      tier: 3,
      hours: 6,
      pricingPhoto: 5500,
      pricingVideo: 6500,
      pricingCombo: 7500,
      deliverables: [
        "Complete extended coverage",
        "Cinematic storytelling approach",
        "Priority editing and delivery",
        "45-minute grace period",
        "Expedited delivery within 5 days",
        "Backup equipment on standby",
        "Highlight reel included",
      ],
    },
  ];

  const handleServiceSelect = (serviceId: string, link?: string) => {
    if (serviceId === "family") {
      setSelectedService(serviceId);
      setShowPackages(true);
      return;
    }
    if (link) {
      window.location.href = link;
    }
  };

  const handleTierBook = (tier: (typeof coverageTiers)[0], mediaType: "photography" | "videography" | "combo") => {
    const price =
      mediaType === "photography"
        ? tier.pricingPhoto
        : mediaType === "videography"
          ? tier.pricingVideo
          : tier.pricingCombo;

    openBooking({
      service: "Family & Social Events",
      package: `Tier ${tier.tier} Coverage`,
      price,
      format: mediaType.charAt(0).toUpperCase() + mediaType.slice(1),
      hours: tier.hours,
    });
  };

  if (showPackages && selectedService === "family") {
    return (
      <div className="bg-background text-foreground min-h-screen">
        {/* 1. Hero Section */}
        <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black/50 z-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-background z-20" />
            <img
              src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop"
              alt="Happy family celebration and gathering in Port Elizabeth"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="content-width relative z-30 text-center pt-20">
            <HeroSection>
              <div className="mb-6 flex justify-center">
                <div className="px-6 py-2 rounded-full bg-foreground/10 border border-foreground/20 backdrop-blur-md dark:bg-white/10 dark:border-white/20">
                  <span className="text-amber-500 text-[10px] font-black uppercase tracking-[0.4em]">Joyful Celebrations</span>
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-6 text-gradient tracking-tight">Family & Social Events</h1>
              <p className="text-xl md:text-2xl text-foreground/90 font-medium leading-relaxed max-w-3xl mx-auto drop-shadow-2xl dark:text-white/90">
                Professional photography and videography for birthdays, graduations, baby showers, and family celebrations in Port Elizabeth and the Eastern Cape.
              </p>
            </HeroSection>
          </div>
        </section>

        {/* 2. Story / Introduction Section */}
        <section className="section-padding bg-card/50">
          <div className="content-width max-w-4xl mx-auto text-center">
            <FadeInSection>
              <h2 className="text-3xl md:text-4xl font-black mb-8 text-foreground">
                Capturing Life&apos;s <span className="text-red-600">Milestones</span>
              </h2>
              <p className="text-lg text-foreground/70 leading-relaxed font-medium mb-6">
                Family celebrations bring people together to mark important milestones in life. From birthdays and graduations to baby showers and traditional ceremonies, these moments deserve to be captured and preserved for future generations.
              </p>
              <p className="text-base text-foreground/60 leading-relaxed">
                Whether you are looking for a birthday photographer in Gqeberha or event videography in the Eastern Cape, we ensure that the spirit of your celebration is documented with warmth and authenticity.
              </p>
            </FadeInSection>
          </div>
        </section>

        {/* 3. Event Coverage Description & 4. Event Types */}
        <section className="section-padding bg-background">
          <div className="content-width">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <FadeInSection>
                <h3 className="text-3xl font-bold mb-6">What We Cover</h3>
                <p className="text-white/60 mb-8 font-medium">
                  We specialize in family celebration photography across South Africa, focusing on:
                </p>
                <ul className="grid gap-4">
                  {[
                    "Birthdays",
                    "Baby Showers",
                    "Graduations",
                    "Traditional Ceremonies",
                    "Family Gatherings",
                    "Private Celebrations",
                  ].map((type) => (
                    <li key={type} className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-red-600" />
                      <span className="text-lg font-bold text-white/90">{type}</span>
                    </li>
                  ))}
                </ul>
              </FadeInSection>

              <FadeInSection delay={0.2} className="bg-zinc-900/50 p-10 rounded-3xl border border-white/5">
                <h3 className="text-2xl font-bold mb-6 text-red-600">Our Approach</h3>
                <ul className="space-y-6">
                  {[
                    "Candid moments of guests and family",
                    "Key highlights of the celebration",
                    "Professional lighting and composition",
                    "Edited photos and/or video highlights",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <Check className="h-5 w-5 text-red-600 shrink-0 mt-1" />
                      <span className="text-white/80 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </FadeInSection>
            </div>
          </div>
        </section>

        {/* 5. Pricing / Packages Section */}
        <section className="section-padding bg-zinc-950">
          <div className="content-width">
            <FadeInSection className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-black mb-6 text-gradient">Coverage Packages</h2>
                <p className="text-white/60 font-medium">Transparent pricing for family event photography in Port Elizabeth.</p>
              </div>
              <StaggerContainer className="grid md:grid-cols-3 gap-8">
                {coverageTiers.map((tier) => (
                  <StaggerItem key={tier.tier}>
                    <div className="premium-card group h-full flex flex-col border-foreground/5 hover:border-red-600/50">
                      <div className="mb-6">
                        <h3 className="text-2xl font-black text-red-600 mb-2 uppercase tracking-tight">Tier {tier.tier}</h3>
                        <p className="text-4xl font-black text-foreground mb-2 dark:text-white">{tier.hours} Hours</p>
                        <p className="text-sm text-foreground/50 dark:text-white/50">
                          Perfect for {tier.hours === 2 ? "intimate gatherings" : tier.hours === 4 ? "medium-sized events" : "extensive celebrations"}
                        </p>
                      </div>
                      <div className="space-y-4 mb-8 flex-grow">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600">Deliverables:</p>
                        {tier.deliverables.map((d) => (
                          <div key={d} className="flex items-start gap-3">
                            <Check className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                            <span className="text-xs text-foreground/70 font-medium dark:text-white/70">{d.replace("Digital delivery (web + USB)", "Digital Delivery")}</span>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600 mb-3">Select Format:</p>
                        <Button
                          onClick={() => handleTierBook(tier, "photography")}
                          variant="ghost"
                          className="w-full justify-between p-3 h-auto rounded bg-foreground/5 hover:bg-red-600/20 border-0 dark:bg-white/5"
                        >
                          <span className="text-sm font-medium">Photography</span>
                          <span className="text-red-600 font-black">R {tier.pricingPhoto.toLocaleString()}</span>
                        </Button>
                        <Button
                          onClick={() => handleTierBook(tier, "videography")}
                          variant="ghost"
                          className="w-full justify-between p-3 h-auto rounded bg-foreground/5 hover:bg-red-600/20 border-0 dark:bg-white/5"
                        >
                          <span className="text-sm font-medium">Videography</span>
                          <span className="text-red-600 font-black">R {tier.pricingVideo.toLocaleString()}</span>
                        </Button>
                        <Button
                          onClick={() => handleTierBook(tier, "combo")}
                          variant="ghost"
                          className="w-full justify-between p-3 h-auto rounded bg-foreground/5 hover:bg-red-600/20 border border-red-600/30 dark:bg-white/5"
                        >
                          <span className="text-sm font-medium">Combo</span>
                          <span className="text-red-600 font-black">R {tier.pricingCombo.toLocaleString()}</span>
                        </Button>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </FadeInSection>
          </div>
        </section>

        {/* 6. Why Coverage Matters */}
        <section className="section-padding bg-background">
          <div className="content-width max-w-5xl mx-auto">
            <FadeInSection className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-6">Why Document Your Celebration?</h2>
            </FadeInSection>
            <div className="grid md:grid-cols-2 gap-10">
              {[
                {
                  title: "Preserving Memories",
                  desc: "Memories fade, but professional photos and videos last forever, allowing you to relive the joy.",
                },
                {
                  title: "Genuine Interactions",
                  desc: "We capture the laughter, hugs, and unscripted moments that make family gatherings special.",
                },
                {
                  title: "Professional Quality",
                  desc: "High-resolution imagery and crisp audio that phone cameras simply cannot match.",
                },
                {
                  title: "Visual Storytelling",
                  desc: "We weave together the details of the day into a beautiful narrative of your family&apos;s legacy.",
                },
              ].map((reason, idx) => (
                <FadeInSection key={idx} delay={idx * 0.1} className="flex gap-4">
                  <div className="h-12 w-12 rounded-full bg-red-600/10 flex items-center justify-center shrink-0">
                    <Heart className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2 text-foreground dark:text-white">{reason.title}</h4>
                    <p className="text-foreground/60 text-sm font-medium dark:text-white/60">{reason.desc}</p>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Call To Action */}
        <section className="py-20 bg-zinc-950 border-t border-white/5">
          <div className="content-width text-center">
            <FadeInSection>
              <h2 className="text-4xl md:text-5xl font-black mb-8 text-gradient">Let&apos;s Celebrate Together</h2>
              <p className="text-xl text-foreground/60 mb-12 font-medium max-w-2xl mx-auto dark:text-white/60">
                Ready to book your family event photography in Port Elizabeth? Contact us to discuss your date and requirements.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Button asChild variant="red" className="h-14 px-12 font-black rounded-full uppercase tracking-widest text-[10px]">
                  <Link to="/contact">Book Now</Link>
                </Button>
                <Button
                  variant="black"
                  onClick={() => setShowPackages(false)}
                  className="h-14 px-12 font-black rounded-full uppercase tracking-widest text-[10px]"
                >
                  Back to Services
                </Button>
              </div>
            </FadeInSection>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <div ref={ref} className="absolute inset-0 z-0 bg-[#050505]">
          <motion.div style={{ y }} className="absolute inset-0 opacity-60">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${communityHero})`,
              }}
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-background" />
          {/* Warm Overlay for Community Feel */}
          <div className="absolute inset-0 bg-orange-900/10 mix-blend-overlay" />
        </div>

        <div className="content-width relative z-10 text-center pt-20">
          <HeroSection>
            <div className="mb-8 flex justify-center">
              <div className="px-6 py-2 rounded-full bg-foreground/5 border border-foreground/10 red-glow backdrop-blur-xl dark:bg-white/5 dark:border-white/10">
                <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.4em]">Community Events Production</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-8 text-gradient tracking-tight">Community Events Production</h1>
            <p className="text-xl md:text-2xl text-foreground/80 font-medium leading-relaxed max-w-3xl mx-auto drop-shadow-lg">
              Professional photography and videography coverage for community celebrations, family milestones, and cultural gatherings in Port Elizabeth, Eastern Cape.
            </p>
            <p className="mt-6 text-foreground/60 font-medium uppercase tracking-[0.1em] text-sm">
              Capturing the spirit of Ubuntu - unity, culture, and shared celebration across Gqeberha and South Africa.
            </p>
          </HeroSection>
        </div>
      </section>

      <section className="section-padding">
        <div className="content-width">
          <StaggerContainer className="grid md:grid-cols-3 gap-10">
            {services.map((service) => (
              <StaggerItem key={service.id}>
                <div className="premium-card group h-full">
                  <div className="mb-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-foreground/5 border border-foreground/5 group-hover:border-red-600/30 group-hover:scale-110 transition-all duration-700 dark:bg-white/5 dark:border-white/5">
                    <service.icon className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-4 uppercase tracking-tight dark:text-white">{service.title}</h3>
                  <p className="text-lg text-foreground/50 mb-8 font-medium dark:text-white/50">{service.description}</p>
                  <div className="space-y-3 mb-12 flex-grow">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600 mb-4">Includes:</p>
                    {service.details.map((detail) => (
                      <div key={detail} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-foreground/80 dark:text-white/80">
                        <div className="h-1.5 w-1.5 rounded-full bg-red-600 shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => handleServiceSelect(service.id, service.link)}
                    variant="black"
                    className="w-full h-14 font-black transition-all uppercase tracking-widest text-[10px] rounded-full"
                  >
                    {service.id === "family" ? "View Packages" : "View Options"} <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="section-padding bg-zinc-950">
        <div className="content-width">
          <FadeInSection>
            <h2 className="text-center mb-24 text-gradient text-4xl">Why Videography & Photography Coverage?</h2>
          </FadeInSection>
          <StaggerContainer className="grid md:grid-cols-2 gap-16 max-w-4xl mx-auto">
            <StaggerItem className="space-y-6">
              <h3 className="text-2xl font-bold text-red-600 uppercase">For Celebrations</h3>
              <ul className="space-y-4">
                {[
                  "Capture unscripted moments and genuine emotions",
                  "Professional lighting and composition",
                  "Multiple creative angles and perspectives",
                  "Preserves memories for generations",
                  "Professional editing and color grading",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                    <span className="text-white/80 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </StaggerItem>
            <StaggerItem className="space-y-6">
              <h3 className="text-2xl font-bold text-red-600 uppercase">Our Approach</h3>
              <ul className="space-y-4">
                {[
                  "Respectful and discreet documentation",
                  "Understanding of cultural traditions",
                  "Flexible scheduling for your needs",
                  "Professional equipment on standby",
                  "Quick turnaround for edited content",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                    <span className="text-white/80 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="content-width text-center max-w-4xl mx-auto">
          <FadeInSection>
            <h2 className="text-4xl md:text-5xl font-black mb-8 text-gradient">Ready to Document Your Celebration?</h2>
            <p className="text-xl text-foreground/60 mb-12 font-medium dark:text-white/60">Let&apos;s discuss your vision and create a custom package.</p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button asChild variant="red" className="h-14 px-12 font-black rounded-full uppercase tracking-widest text-[10px]">
                <Link to="/contact">Get in Touch</Link>
              </Button>
              <Button asChild variant="black" className="h-14 px-12 font-black rounded-full uppercase tracking-widest text-[10px]">
                <Link to="/services/visual-production">Back to Visual Production</Link>
              </Button>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
};

export default CommunityEvents;

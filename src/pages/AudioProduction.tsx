import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Mic,
  Headphones,
  Radio,
  Music,
  AudioWaveform,
  CheckCircle,
  ArrowRight,
  MessageSquare,
  Sliders,
  Send,
} from "lucide-react";
import { useBooking } from "@/contexts/BookingContext";
import { FadeInSection, HeroSection, StaggerContainer, StaggerItem, StaggerScaleItem } from "@/components/animations";

const processSteps = [
  {
    icon: MessageSquare,
    title: "Consultation & Planning",
    desc: "We understand your project goals and plan the session.",
  },
  {
    icon: Mic,
    title: "Recording Session",
    desc: "Professional recording setup in a focused creative environment.",
  },
  {
    icon: Sliders,
    title: "Collaboration & Enhancement",
    desc: "We work with trusted sound engineers and producers to refine your sound.",
  },
  {
    icon: Send,
    title: "Final Mix & Delivery",
    desc: "You receive a clean, balanced, professional final output ready for release.",
  },
];

const services = [
  { icon: Mic, title: "Studio Recording", desc: "Professional vocal and instrument recording in a controlled studio environment." },
  { icon: Radio, title: "Podcast Recording", desc: "Crisp, broadcast-quality podcast recording and editing." },
  { icon: AudioWaveform, title: "Voice-over Production", desc: "Clean voice-over recording for commercials, narration, and more." },
  { icon: Headphones, title: "Mixing & Mastering Coordination", desc: "We coordinate with experienced engineers to mix and master your tracks." },
  { icon: Music, title: "Beat Sourcing & Production Management", desc: "We source beats and manage the production pipeline for your project." },
];

const pricingTiers = [
  {
    name: "Starter Session",
    price: "R____",
    features: [
      "2-hour recording session",
      "Basic mix",
      "1 revision",
      "Final MP3 delivery",
    ],
    highlighted: false,
  },
  {
    name: "Professional Package",
    price: "R____",
    features: [
      "Up to 4-hour session",
      "Multi-track mix coordination",
      "3 revisions",
      "WAV + MP3 delivery",
    ],
    highlighted: true,
  },
  {
    name: "Full Production",
    price: "R____",
    features: [
      "Full-day session",
      "Beat sourcing & coordination",
      "Mixing & mastering",
      "Unlimited revisions",
      "Priority booking",
    ],
    highlighted: false,
  },
];

const AudioProduction = () => {
  const { openBooking } = useBooking();
  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-red-600/20 via-background to-background opacity-70" />
        <div className="absolute inset-0 z-10 bg-background/50 backdrop-blur-[1px]" />
        <div className="absolute inset-0 z-11 mesh-bg opacity-20" />

        <div className="content-width relative z-20 text-center">
          <HeroSection>
            <div className="mb-8 flex justify-center">
              <div className="px-6 py-2 rounded-full bg-foreground/5 border border-foreground/10 red-glow backdrop-blur-xl dark:bg-white/5 dark:border-white/10">
                <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.4em]">
                  Audio Production
                </span>
              </div>
            </div>
          </HeroSection>
          <HeroSection delay={0.1}>
            <h1 className="mb-8 text-gradient">
              Professional Audio Production<br />
              <span className="text-primary italic">Music, Podcasts & Voice.</span>
            </h1>
          </HeroSection>
          <HeroSection delay={0.2}>
            <p className="mx-auto mt-8 max-w-3xl text-lg md:text-2xl font-semibold uppercase tracking-[0.2em] text-foreground/60 leading-relaxed">
              From studio recording to final delivery, we coordinate every step of your audio production for an elite sound.
            </p>
          </HeroSection>
          <HeroSection delay={0.35}>
            <div className="mt-16 flex flex-wrap justify-center gap-6">
              <Button
                onClick={() => openBooking({
                  service: "Audio Production",
                  package: "General Session",
                  price: 350
                })}
                size="lg"
                className="h-20 px-16 text-xs font-black rounded-full uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95 red-glow cursor-pointer btn-primary"
              >
                Book a Session <ArrowRight className="h-4 w-4 ml-4" />
              </Button>
              <Button asChild variant="outline" size="lg" className="h-20 px-16 text-xs font-black rounded-full uppercase tracking-[0.4em] transition-all btn-secondary border-0">
                <a href="#services">Explore Services</a>
              </Button>
            </div>
          </HeroSection>
        </div>
      </section>

      {/* Your Creative Production Partner */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
        <div className="content-width">
          <FadeInSection className="mx-auto max-w-4xl text-center">
            <h2 className="mb-12 text-gradient">
              Your Creative Production Partner
            </h2>
            <div className="space-y-8 text-xl leading-relaxed text-foreground/60 font-medium">
              <p>
                At Kasilam Media Production, we help artists, businesses, and content creators produce high-quality audio projects from start to finish.
              </p>
              <p>
                Whether you're recording a song, launching a podcast, or producing a voice-over, we coordinate the right recording environment, technical expertise, and creative collaboration to deliver a professional result.
              </p>
              <p>
                Instead of limiting you to one production style, we work with a network of trusted sound engineers, producers, and creatives to bring your project to life.
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-alternate border-y border-foreground/5">
        <div className="content-width">
          <FadeInSection className="max-w-4xl mx-auto text-center mb-32">
            <h2 className="mb-8 text-gradient">How It Works</h2>
            <p className="text-xl font-medium uppercase tracking-widest text-foreground/50">Structured for elite results and absolute reliability.</p>
          </FadeInSection>
          <StaggerContainer className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: MessageSquare,
                title: "Consultation & Project Planning",
                desc: "We start by understanding your project goals, creative direction, and technical requirements.",
              },
              {
                icon: Mic,
                title: "Recording Session",
                desc: "Your audio is captured in a focused recording environment using professional equipment.",
              },
              {
                icon: Sliders,
                title: "Production & Collaboration",
                desc: "We coordinate with experienced sound engineers and producers to refine and enhance your audio.",
              },
              {
                icon: CheckCircle,
                title: "Final Mix & Delivery",
                desc: "You receive clean, balanced, professional audio files ready for release or distribution.",
              },
            ].map((step, i) => (
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

      {/* Services Included */}
      <section id="services" className="section-padding bg-alternate">
        <div className="content-width">
          <FadeInSection className="max-w-4xl mx-auto text-center mb-32">
            <h2 className="mb-8 text-gradient">Services Included</h2>
            <p className="text-xl font-medium uppercase tracking-widest text-foreground/50">Comprehensive audio solutions for every creative need.</p>
          </FadeInSection>
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Mic, title: "Studio Recording", desc: "Professional vocal and instrument recording in a controlled studio environment designed for high-quality sound capture.", link: "/services/audio-production/studio-recording" },
              { icon: Radio, title: "Podcast Recording", desc: "Professional podcast recording setup that ensures clear, broadcast-quality sound for interviews and conversations.", link: "/services/audio-production/podcast-recording" },
              { icon: AudioWaveform, title: "Voice-over Production", desc: "Clean voice-over recording for commercials, narration, corporate videos, and digital media.", link: "/services/audio-production/voiceover-production" },
              { icon: Headphones, title: "Mixing", desc: "Professional mix balancing, EQ, compression, and effects to bring your sound to life.", link: "/services/audio-production/mixing-coordination" },
              { icon: AudioWaveform, title: "Mastering", desc: "Loudness optimization and final polish to ensure your tracks are streaming-ready.", link: "/services/audio-production/mixing-coordination" },
              { icon: Music, title: "Beat Sourcing & Production Management", desc: "We source beats, connect with producers, and manage the production workflow specifically for your project.", link: "/services/audio-production/production-management" },
            ].map((s) => (
              <StaggerItem key={s.title}>
                <Link to={s.link}>
                  <div className="premium-card group h-full">
                    <div className="mb-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-foreground/5 border border-foreground/10 group-hover:border-red-600/30 group-hover:scale-110 transition-all duration-700 dark:bg-white/5 dark:border-white/10">
                      <s.icon className="h-8 w-8 text-red-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 uppercase tracking-tighter flex items-center justify-between">
                      {s.title} <ArrowRight className="h-5 w-5 text-red-600 transition-transform group-hover:translate-x-2" />
                    </h3>
                    <p className="text-base text-foreground/50 leading-relaxed font-medium">{s.desc}</p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Extra Services (Upsells) */}
      <section className="section-padding bg-alternate border-y border-foreground/5">
        <div className="content-width">
          <FadeInSection className="max-w-4xl mx-auto text-center mb-32">
            <h2 className="mb-8 text-gradient">Extra Services</h2>
            <p className="text-xl font-medium uppercase tracking-widest text-foreground/50">Add-ons to elevate your production quality.</p>
          </FadeInSection>
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            {[
              { title: "Extra studio hour", price: "R300" },
              { title: "Vocal tuning", price: "R250" },
              { title: "Express delivery (48h)", price: "R500" },
              { title: "Extra revisions", price: "R150" },
            ].map((item, i) => (
              <StaggerItem key={i}>
                <div className="premium-card text-center group">
                  <h3 className="font-bold text-lg mb-4 uppercase tracking-tight">{item.title}</h3>
                  <p className="text-3xl font-black text-red-600 transition-transform group-hover:scale-110">{item.price}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Audio Production Packages */}
      <section id="packages" className="section-padding bg-background">
        <div className="content-width">
          <FadeInSection className="max-w-4xl mx-auto text-center mb-32">
            <h2 className="mb-8 text-gradient">Production Packages</h2>
            <p className="text-xl font-medium uppercase tracking-widest text-foreground/50">Structured tiers for every stage of your project.</p>
          </FadeInSection>
          <StaggerContainer className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 mb-20">
            {[
              {
                name: "Starter Recording",
                price: "R350 / hour",
                features: [
                  "Studio recording session",
                  "Professional mic setup",
                  "Basic vocal guidance",
                  "Raw audio files",
                ],
                highlighted: false,
              },
              {
                name: "Professional Package",
                price: "R900",
                features: [
                  "3-hour recording session",
                  "Vocal direction",
                  "Basic editing & cleanup",
                  "Rough mix preview",
                ],
                highlighted: true,
              },
              {
                name: "Full Song Production",
                price: "R2500 / song",
                features: [
                  "Full vocal recording",
                  "Vocal editing & tuning",
                  "Professional Mixing",
                  "Mastering Coordination",
                  "Ready-to-release track",
                ],
                highlighted: false,
              },
              {
                name: "Artist Development",
                price: "R5000",
                features: [
                  "3 songs (Recording+Mix+Master)",
                  "Creative production direction",
                  "Cover art guidance",
                  "Distribution guidance",
                  "Priority scheduling",
                ],
                highlighted: false,
              },
            ].map((tier) => (
              <StaggerItem key={tier.name}>
                <div className={`premium-card h-full flex flex-col ${tier.highlighted ? 'border-red-600/50 relative' : ''}`}>
                  {tier.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-red-600 rounded-full">
                      <span className="text-[8px] font-black uppercase tracking-widest text-white">Most Popular</span>
                    </div>
                  )}
                  <h3 className="text-2xl font-black text-foreground mb-4 uppercase tracking-tight">{tier.name}</h3>
                  <p className="text-4xl font-black text-red-600 mb-10">{tier.price}</p>
                  <div className="space-y-6 mb-16 flex-grow">
                    {tier.features.map(f => (
                      <div key={f} className="flex items-center gap-5 text-[11px] font-black uppercase tracking-widest text-foreground/80">
                        <CheckCircle className="h-4 w-4 text-red-600 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => openBooking({
                      service: "Audio Production",
                      package: tier.name,
                      price: parseInt(tier.price.replace(/[^\d]/g, "")) || 350
                    })}
                    className="w-full h-14 btn-secondary font-black transition-all uppercase tracking-widest text-[10px] rounded-full cursor-pointer border-0"
                  >
                    Book Your Session
                  </Button>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="text-center">
            <p className="hidden md:block text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40 mt-12">
              Click on a package card to start your booking process.
            </p>
            <p className="md:hidden text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40 mt-12">
              Tap a package card to start your booking process.
            </p>
          </div>
        </div>
      </section>


      {/* Final CTA */}
      <section className="section-padding relative overflow-hidden bg-background text-center border-t border-foreground/5">
        <div className="absolute inset-0 mesh-bg opacity-10 dark:opacity-30" />
        <div className="content-width relative z-10">
          <HeroSection>
            <h2 className="text-5xl md:text-8xl lg:text-9xl font-black mb-12 text-gradient leading-[0.85] tracking-[-0.06em]">
              Ready to Create<br />Elite Audio?
            </h2>
          </HeroSection>
          <FadeInSection delay={0.2}>
            <p className="mx-auto max-w-4xl text-xl md:text-2xl text-foreground/50 mb-20 font-semibold uppercase tracking-[0.2em] leading-relaxed">
              Book your session and let us manage the recording and production process from start to finish.
            </p>
          </FadeInSection>
          <FadeInSection delay={0.3}>
            <div className="flex flex-wrap justify-center gap-8">
              <Button
                onClick={() => openBooking({
                  service: "Audio Production",
                  package: "General Inquiry",
                  price: 0
                })}
                size="lg"
                className="h-20 px-16 text-xs font-black rounded-full uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95 red-glow cursor-pointer btn-primary"
              >
                Book Your Session <ArrowRight className="h-4 w-4 ml-4" />
              </Button>
            </div>
          </FadeInSection>
        </div>
      </section>

    </div>
  );
};

export default AudioProduction;

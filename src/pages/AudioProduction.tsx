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
import { motion } from "framer-motion";
import { useEffect, Component, ErrorInfo, ReactNode } from "react";

const AudioVisualizer = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#05000a]">
      {/* Cinematic Studio Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-black opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(120,0,255,0.15),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,120,255,0.1),transparent_50%)]" />
      
      {/* Animated Waveform */}
      <svg className="absolute bottom-0 left-0 w-full h-64 opacity-20" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <motion.path
          animate={{
            d: [
              "M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              "M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,186.7C672,203,768,181,864,160C960,139,1056,117,1152,128C1248,139,1344,181,1392,202.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              "M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          fill="#8b5cf6"
          fillOpacity="1"
        />
      </svg>

      {/* Equalizer Bars */}
      <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end justify-center gap-1 px-4 opacity-30">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1 md:w-2 bg-gradient-to-t from-purple-600 to-blue-400 rounded-t-full"
            animate={{
              height: [
                `${Math.random() * 40 + 10}%`,
                `${Math.random() * 80 + 20}%`,
                `${Math.random() * 40 + 10}%`
              ]
            }}
            transition={{
              duration: Math.random() * 0.5 + 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.05
            }}
          />
        ))}
      </div>

      {/* Studio Mic Silhouette (Subtle) */}
      <div className="absolute right-10 bottom-20 opacity-10 hidden lg:block">
        <Mic className="w-96 h-96 text-white stroke-[0.5]" />
      </div>

      {/* Glowing Sound Lines */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px w-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
            style={{ top: `${20 + i * 15}%` }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scaleX: [0.8, 1.1, 0.8],
              x: i % 2 === 0 ? [-50, 50, -50] : [50, -50, 50]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
    </div>
  );
};

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

  useEffect(() => {
    document.title = "KMP | Professional Audio Production in Port Elizabeth | Recording Studio Eastern Cape";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Kasilam Media Productions (KMP) provides professional audio production services in Port Elizabeth (Gqeberha), Eastern Cape. Studio recording, podcast production, and voice-overs across South Africa.");
    }
  }, []);

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <AudioVisualizer />
        
        <div className="content-width relative z-20 text-center">
          <HeroSection>
            <div className="mb-8 flex justify-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="px-6 py-2 rounded-full bg-foreground/5 border border-foreground/10 red-glow backdrop-blur-xl dark:bg-white/5 dark:border-white/10">
                <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.4em]">
                  KMP Audio Production
                </span>
              </motion.div>
            </div>
          </HeroSection>
          <HeroSection delay={0.1}>
            <div className="relative inline-block">
              <motion.div
                className="absolute inset-0 blur-3xl bg-purple-600/20"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <h1 className="mb-8 text-foreground text-5xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tight relative">
                KMP Audio <br />
                <span className="text-primary italic">Production.</span>
              </h1>
            </div>
          </HeroSection>
          <HeroSection delay={0.2}>
            <div className="space-y-6">
              <p className="mx-auto max-w-2xl text-xl md:text-3xl font-black uppercase tracking-tighter text-foreground/90">
                Professional Audio Production for <br />
                <span className="text-purple-400">Music, Podcasts & Voice in Port Elizabeth, Eastern Cape.</span>
              </p>
              <p className="mx-auto max-w-3xl text-base md:text-lg font-medium text-foreground/50 leading-relaxed">
                Kasilam Media Productions (KMP) provides professional audio production services in Port Elizabeth (Gqeberha), serving artists, podcasters, brands, and content creators across the Eastern Cape and South Africa. From studio recording and podcast production to voice-over recording, mixing, and mastering, we coordinate every stage of the audio production process to deliver clean, professional sound.
              </p>
            </div>
          </HeroSection>
        <HeroSection delay={0.35}>
          <div className="mt-16 flex flex-wrap justify-center gap-6">
            <Button
              onClick={() => openBooking({
                service: "Audio Production",
                package: "General Session",
                price: 350
              })}
              variant="red"
              size="lg"
              className="h-20 px-16 text-xs font-black rounded-full uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              Book a Session <ArrowRight className="h-4 w-4 ml-4" />
            </Button>
            <Button asChild variant="black" size="lg" className="h-20 px-16 text-xs font-black rounded-full uppercase tracking-[0.4em] transition-all">
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
            { icon: Mic, title: "Studio Recording", desc: "Our recording studio in Gqeberha provides professional vocal and instrument recording in a controlled environment designed for high-quality sound capture.", link: "/services/audio-production/studio-recording" },
            { icon: Radio, title: "Podcast Recording", desc: "Professional podcast recording Eastern Cape setup that ensures clear, broadcast-quality sound for interviews and conversations.", link: "/services/audio-production/podcast-recording" },
            { icon: AudioWaveform, title: "Voice-over Production", desc: "Clean voice-over production South Africa for commercials, narration, corporate videos, and digital media.", link: "/services/audio-production/voiceover-production" },
            { icon: Headphones, title: "Mixing", desc: "Professional mix balancing, EQ, compression, and effects to bring your audio production in Port Elizabeth projects to life.", link: "/services/audio-production/mixing-coordination" },
            { icon: AudioWaveform, title: "Mastering", desc: "Loudness optimization and final polish for music recording services Eastern Cape, ensuring your tracks are streaming-ready.", link: "/services/audio-production/mixing-coordination" },
            { icon: Music, title: "Beat Sourcing & Production Management", desc: "We source beats, connect with producers, and manage the production workflow specifically for your project across South Africa.", link: "/services/audio-production/production-management" },
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
                  variant="black"
                  className="w-full h-14 font-black transition-all uppercase tracking-widest text-[10px] rounded-full cursor-pointer"
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


    {/* SEO FAQ Section */}
    <section className="section-padding bg-alternate border-y border-foreground/5">
      <div className="content-width">
        <FadeInSection className="max-w-4xl mx-auto text-center mb-24">
          <h2 className="mb-8 text-gradient">Audio Production Questions</h2>
          <p className="text-xl font-medium uppercase tracking-widest text-foreground/50">Everything you need to know about our studio and services.</p>
        </FadeInSection>
        <div className="max-w-3xl mx-auto space-y-8">
          {[
            {
              q: "Do you offer audio production services in Port Elizabeth?",
              a: "Yes. Kasilam Media Productions offers professional audio recording, podcast production, and voice-over services in Port Elizabeth (Gqeberha) and across the Eastern Cape."
            },
            {
              q: "Can artists from other cities in South Africa book sessions?",
              a: "Yes. Artists, podcasters, and creators from across South Africa can work with us. We coordinate recording sessions and production support for projects nationwide."
            },
            {
              q: "What types of audio projects do you produce?",
              a: "We produce music recordings, podcast episodes, voice-over recordings, commercial audio, and creative audio content for artists, brands, and content creators."
            },
            {
              q: "Do you provide mixing and mastering services?",
              a: "Yes. We coordinate professional mixing and mastering to ensure your audio is balanced, polished, and ready for streaming or distribution."
            }
          ].map((faq, i) => (
            <FadeInSection key={i} delay={i * 0.1}>
              <div className="premium-card p-8 group">
                <h3 className="text-xl font-black mb-4 uppercase tracking-tight text-white group-hover:text-red-600 transition-colors">
                  {faq.q}
                </h3>
                <p className="text-base text-white/50 leading-relaxed font-medium">
                  {faq.a}
                </p>
              </div>
            </FadeInSection>
          ))}
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
              variant="red"
              size="lg"
              className="h-20 px-16 text-xs font-black rounded-full uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95 cursor-pointer"
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

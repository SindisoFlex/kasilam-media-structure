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
      <section className="relative overflow-hidden bg-background py-28 md:py-36">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <HeroSection>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <Mic className="h-4 w-4" />
                Audio Production
              </div>
            </HeroSection>
            <HeroSection delay={0.1}>
              <h1 className="text-4xl font-black leading-tight md:text-5xl lg:text-6xl">
                Professional Audio Production for{" "}
                <span className="text-primary">Music, Podcasts & Voice</span>
              </h1>
            </HeroSection>
            <HeroSection delay={0.2}>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                From studio recording to final delivery, we coordinate every step of your audio production to ensure your project sounds clean, polished, and ready for release.
              </p>
            </HeroSection>
            <HeroSection delay={0.3}>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button
                  onClick={() => openBooking({
                    service: "Audio Production",
                    package: "General Session",
                    price: 350
                  })}
                  size="lg"
                  className="gap-2 cursor-pointer"
                >
                  Book a Recording Session <ArrowRight className="h-4 w-4" />
                </Button>
                <Button asChild size="lg" variant="outline" className="gap-2">
                  <a href="#services">Explore Services</a>
                </Button>
              </div>
            </HeroSection>
          </div>
        </div>
      </section>

      {/* Your Creative Production Partner */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <FadeInSection className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl mb-6">
              Your Creative <span className="text-primary">Production Partner</span>
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
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
      <section className="bg-card py-20">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="text-center text-3xl font-bold md:text-4xl">
              How It <span className="text-primary">Works</span>
            </h2>
          </FadeInSection>
          <StaggerContainer className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
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
              <StaggerItem key={step.title} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="mb-2 block text-sm font-bold text-primary">
                  Step {i + 1}
                </span>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Services Included */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="text-center text-3xl font-bold md:text-4xl">
              Services <span className="text-primary">Included</span>
            </h2>
          </FadeInSection>
          <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                  <Card className="border-border bg-muted hover:border-primary/50 transition-colors h-full">
                    <CardContent className="p-6">
                      <div className="mb-4 inline-flex rounded-full bg-primary/10 p-3">
                        <s.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        {s.title} <ArrowRight className="h-4 w-4 text-primary" />
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                    </CardContent>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Extra Services (Upsells) */}
      <section className="bg-muted/30 py-20 border-y border-border">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="text-center text-3xl font-bold md:text-4xl mb-12">
              Extra <span className="text-primary">Services</span>
            </h2>
          </FadeInSection>
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            {[
              { title: "Extra studio hour", price: "R300" },
              { title: "Vocal tuning", price: "R250" },
              { title: "Express delivery (48h)", price: "R500" },
              { title: "Extra revisions", price: "R150" },
            ].map((item, i) => (
              <StaggerScaleItem key={i}>
                <Card className="bg-card/50 border-primary/10">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-2xl font-black text-primary mt-2">{item.price}</p>
                  </CardContent>
                </Card>
              </StaggerScaleItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Audio Production Packages */}
      <section id="packages" className="py-20">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="text-center text-3xl font-bold md:text-4xl">
              Production <span className="text-primary">Packages</span>
            </h2>
          </FadeInSection>
          <StaggerContainer className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
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
                price: "R5000 - R8000",
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
              <StaggerScaleItem key={tier.name}>
                <Card
                  className={`flex flex-col h-full shadow-lg ${tier.highlighted
                    ? "border-2 border-primary"
                    : "border-primary/20"
                    }`}
                >
                  <CardHeader className="text-center">
                    {tier.highlighted && (
                      <span className="mx-auto mb-2 inline-block rounded-full bg-primary px-3 py-0.5 text-xs font-bold text-primary-foreground">
                        Most Popular
                      </span>
                    )}
                    <CardTitle className="text-xl">{tier.name}</CardTitle>
                    <p className="mt-2 text-3xl font-black text-primary">
                      {tier.price}
                    </p>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <ul className="space-y-3 mb-8">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-center gap-3 text-sm">
                          <CheckCircle className="h-4 w-4 shrink-0 text-primary" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Button
                      onClick={() => openBooking({
                        service: "Audio Production",
                        package: tier.name,
                        price: parseInt(tier.price.replace(/[^\d]/g, "")) || 350
                      })}
                      size="lg"
                      className="mt-auto w-full cursor-pointer"
                      variant={tier.highlighted ? "default" : "outline"}
                    >
                      Book Your Session
                    </Button>
                  </CardContent>
                </Card>
              </StaggerScaleItem>
            ))}
          </StaggerContainer>
        </div>
      </section>


      {/* Final CTA */}
      <section className="bg-card py-20">
        <div className="container mx-auto px-4 text-center">
          <FadeInSection>
            <h2 className="text-3xl font-bold md:text-4xl">
              Ready to Create Professional{" "}
              <span className="text-primary">Audio?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Book your session and let us manage the recording and production process from start to finish.
            </p>
            <Button
              onClick={() => openBooking({
                service: "Audio Production",
                package: "General Inquiry",
                price: 0
              })}
              size="lg"
              className="mt-8 gap-2 cursor-pointer"
            >
              Book Your Session <ArrowRight className="h-4 w-4" />
            </Button>
          </FadeInSection>
        </div>
      </section>

    </div>
  );
};

export default AudioProduction;

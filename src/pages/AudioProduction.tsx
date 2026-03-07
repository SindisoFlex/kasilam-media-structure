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
  Shield,
  Users,
  Sparkles,
  HandshakeIcon,
  FileAudio,
} from "lucide-react";

const processSteps = [
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
    icon: Send,
    title: "Final Mix & Delivery",
    desc: "You receive clean, balanced, professional audio files ready for release or distribution.",
  },
];

const services = [
  {
    icon: Mic,
    title: "Studio Recording",
    desc: "Professional vocal and instrument recording in a controlled studio environment designed for high-quality sound capture.",
    link: "/services/audio-production/studio-recording",
  },
  {
    icon: Radio,
    title: "Podcast Recording",
    desc: "Professional podcast recording setup that ensures clear, broadcast-quality sound for interviews and conversations.",
    link: "/services/audio-production/podcast-recording",
  },
  {
    icon: AudioWaveform,
    title: "Voice-over Production",
    desc: "Clean voice-over recording for commercials, narration, corporate videos, and digital media.",
    link: "/services/audio-production/voiceover-production",
  },
  {
    icon: Headphones,
    title: "Mixing & Mastering Coordination",
    desc: "We collaborate with trusted audio engineers to refine, balance, and finalize your audio.",
    link: "/services/audio-production/mixing-coordination",
  },
  {
    icon: Music,
    title: "Music Production Management",
    desc: "We source beats, connect with producers, and manage the production workflow to help you find the right sound for your project.",
    link: "/services/audio-production/production-management",
  },
];

const whyWorkWithUs = [
  { icon: Shield, text: "Professional recording environment" },
  { icon: Users, text: "Network of trusted producers and engineers" },
  { icon: Sparkles, text: "Flexible production packages" },
  { icon: HandshakeIcon, text: "Creative collaboration" },
  { icon: FileAudio, text: "Clean, high-quality audio delivery" },
];

const pricingTiers = [
  {
    name: "Starter Session",
    price: "R____",
    features: [
      "2-hour recording session",
      "Basic mix coordination",
      "1 revision",
      "Final MP3 delivery",
    ],
    highlighted: false,
  },
  {
    name: "Professional Package",
    price: "R____",
    features: [
      "Up to 4-hour recording session",
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
      "Full-day recording session",
      "Beat sourcing & production coordination",
      "Mixing & mastering coordination",
      "Unlimited revisions",
      "Priority booking",
    ],
    highlighted: false,
  },
];

const AudioProduction = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-background py-28 md:py-36">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Mic className="h-4 w-4" />
              Audio Production
            </div>
            <h1 className="animate-fade-in text-4xl font-black leading-tight md:text-5xl lg:text-6xl">
              Professional Audio Production for Music, Podcasts{" "}
              <span className="text-primary">& Voice</span>
            </h1>
            <p
              className="mx-auto mt-6 max-w-2xl animate-fade-in text-lg text-muted-foreground"
              style={{ animationDelay: "100ms" }}
            >
              From studio recording to final delivery, we coordinate every step
              of your audio production to ensure your project sounds clean,
              polished, and ready for release.
            </p>
            <div
              className="mt-8 flex animate-fade-in flex-col items-center gap-4 sm:flex-row sm:justify-center"
              style={{ animationDelay: "200ms" }}
            >
              <Button asChild size="lg" className="gap-2">
                <Link to="/booking">
                  Book a Recording Session <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2">
                <a href="#services">Explore Services</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Your Creative Production Partner */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Your Creative <span className="text-primary">Production Partner</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              At Kasilam Media Production, we help artists, businesses, and
              content creators produce high-quality audio projects from start to
              finish.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Whether you're recording a song, launching a podcast, or producing
              a voice-over, we coordinate the right recording environment,
              technical expertise, and creative collaboration to deliver a
              professional result.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Instead of limiting you to one production style, we work with a
              network of trusted sound engineers, producers, and creatives to
              bring your project to life.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-card py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            How It <span className="text-primary">Works</span>
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <div
                key={step.title}
                className="animate-fade-in text-center"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="mb-2 block text-sm font-bold text-primary">
                  Step {i + 1}
                </span>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Included */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            Services <span className="text-primary">Included</span>
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Link to={s.link} key={s.title} className="group">
                <Card
                  className="animate-fade-in border-border bg-muted transition-all hover:border-primary/30 hover:shadow-lg"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="mb-4 inline-flex rounded-full bg-primary/10 p-3">
                      <s.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      Learn more <ArrowRight className="h-3 w-3" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="bg-card py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            Why Work <span className="text-primary">With Us</span>
          </h2>
          <div className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
            {whyWorkWithUs.map((item, i) => (
              <div
                key={item.text}
                className="animate-fade-in flex items-center gap-4 rounded-lg border border-border bg-muted p-4"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="font-medium text-foreground">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section id="packages" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            Audio Production <span className="text-primary">Packages</span>
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {pricingTiers.map((tier, i) => (
              <Card
                key={tier.name}
                className={`animate-fade-in shadow-lg ${
                  tier.highlighted
                    ? "border-2 border-primary"
                    : "border-primary/20"
                }`}
                style={{ animationDelay: `${i * 100}ms` }}
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
                <CardContent>
                  <ul className="space-y-3">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-sm">
                        <CheckCircle className="h-4 w-4 shrink-0 text-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    size="lg"
                    className="mt-6 w-full"
                    variant={tier.highlighted ? "default" : "outline"}
                  >
                    <Link to="/booking">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-card py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Ready to Create{" "}
            <span className="text-primary">Professional Audio?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Book your session and let us manage the recording and production
            process from start to finish.
          </p>
          <Button asChild size="lg" className="mt-8 gap-2">
            <Link to="/booking">
              Book Your Session <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AudioProduction;

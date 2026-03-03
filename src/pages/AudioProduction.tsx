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
              Professional Audio Production That Brings Your{" "}
              <span className="text-primary">Sound to Life</span>
            </h1>
            <p
              className="mx-auto mt-6 max-w-2xl animate-fade-in text-lg text-muted-foreground"
              style={{ animationDelay: "100ms" }}
            >
              From recording to final delivery, we manage your entire audio
              production process professionally and efficiently.
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
                <a href="#packages">View Packages</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Your Creative <span className="text-primary">Production Partner</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              We collaborate with experienced engineers, beat makers, and
              creatives to deliver polished audio projects. Whether you're
              recording music, podcasts, or voice-over work, we coordinate the
              entire workflow so you get a professional final result without
              stress.
            </p>
          </div>
        </div>
      </section>

      {/* Our Process */}
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
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            Services <span className="text-primary">Included</span>
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Card
                key={s.title}
                className="animate-fade-in border-border bg-muted"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex rounded-full bg-primary/10 p-3">
                    <s.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section id="packages" className="bg-card py-20">
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
            Ready to Record Something That Sounds{" "}
            <span className="text-primary">Professional?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Let's bring your audio vision to life with a clean, professional process from start to finish.
          </p>
          <Button asChild size="lg" className="mt-8 gap-2">
            <Link to="/booking">
              Book Your Session Today <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AudioProduction;

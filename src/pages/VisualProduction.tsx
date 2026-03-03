import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Camera,
  Video,
  Film,
  Clapperboard,
  MonitorPlay,
  CheckCircle,
  ArrowRight,
  MessageSquare,
  Palette,
  Send,
  Image,
} from "lucide-react";

const processSteps = [
  {
    icon: MessageSquare,
    title: "Creative Brief & Concept",
    desc: "We align on your vision, audience, and goals to craft a clear creative direction.",
  },
  {
    icon: Camera,
    title: "Pre-Production & Planning",
    desc: "Location scouting, storyboarding, scheduling, and crew coordination handled for you.",
  },
  {
    icon: Clapperboard,
    title: "Production Day",
    desc: "Professional shoot with proper lighting, framing, and direction for impactful visuals.",
  },
  {
    icon: Palette,
    title: "Post-Production & Delivery",
    desc: "Editing, color grading, motion graphics, and final export in your required formats.",
  },
];

const services = [
  { icon: Video, title: "Music Video Production", desc: "Concept-driven music videos with professional cinematography and storytelling." },
  { icon: Camera, title: "Event Videography", desc: "Full coverage of corporate events, launches, and live performances." },
  { icon: Image, title: "Professional Photography", desc: "High-quality portrait, product, and event photography with expert retouching." },
  { icon: MonitorPlay, title: "Social Media Content", desc: "Short-form video and visual content optimized for Instagram, TikTok, and YouTube." },
  { icon: Film, title: "Brand & Promo Videos", desc: "Compelling brand stories and promotional content that connect with your audience." },
];

const pricingTiers = [
  {
    name: "Essentials Shoot",
    price: "R____",
    features: [
      "2-hour shoot (photo or video)",
      "1 location",
      "Basic editing & color correction",
      "5 edited photos or 1-min video",
      "Digital delivery",
    ],
    highlighted: false,
  },
  {
    name: "Creative Package",
    price: "R____",
    features: [
      "Half-day shoot",
      "Up to 2 locations",
      "Full editing & color grading",
      "15 edited photos or 3-min video",
      "2 revisions",
      "Social media cuts included",
    ],
    highlighted: true,
  },
  {
    name: "Full Production",
    price: "R____",
    features: [
      "Full-day shoot with crew",
      "Multiple locations",
      "Storyboarding & creative direction",
      "Full post-production suite",
      "Unlimited revisions",
      "Priority scheduling",
    ],
    highlighted: false,
  },
];

const VisualProduction = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-background py-28 md:py-36">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Camera className="h-4 w-4" />
              Visual Production
            </div>
            <h1 className="animate-fade-in text-4xl font-black leading-tight md:text-5xl lg:text-6xl">
              Visuals That Capture Attention and{" "}
              <span className="text-primary">Tell Your Story</span>
            </h1>
            <p
              className="mx-auto mt-6 max-w-2xl animate-fade-in text-lg text-muted-foreground"
              style={{ animationDelay: "100ms" }}
            >
              From concept to final cut, we produce stunning photo and video
              content that elevates your brand and leaves a lasting impression.
            </p>
            <div
              className="mt-8 flex animate-fade-in flex-col items-center gap-4 sm:flex-row sm:justify-center"
              style={{ animationDelay: "200ms" }}
            >
              <Button asChild size="lg" className="gap-2">
                <Link to="/booking">
                  Book a Shoot <ArrowRight className="h-4 w-4" />
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
              Your Visual <span className="text-primary">Creative Team</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              We bring together talented cinematographers, photographers,
              editors, and motion designers to deliver visual content that
              stands out. Whether it's a music video, a brand campaign, or
              event coverage, we handle the creative and logistical details so
              you can focus on what matters.
            </p>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="bg-card py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            Our Creative <span className="text-primary">Process</span>
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
            What We <span className="text-primary">Offer</span>
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
            Visual Production <span className="text-primary">Packages</span>
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
            Ready to Create Visuals That{" "}
            <span className="text-primary">Stand Out?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Let's bring your creative vision to life with professional photo and video production from start to finish.
          </p>
          <Button asChild size="lg" className="mt-8 gap-2">
            <Link to="/booking">
              Book Your Shoot Today <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default VisualProduction;

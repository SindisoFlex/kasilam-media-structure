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
  Send,
  Share2,
} from "lucide-react";

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
  { icon: Share2, title: "Social Media Management", desc: "Consistent, on-brand content planning and publishing across all major platforms." },
  { icon: Megaphone, title: "Paid Advertising", desc: "Strategic ad campaigns on Meta, Google, and TikTok to reach the right audience." },
  { icon: PenTool, title: "Content Creation", desc: "Copywriting, graphic design, and short-form video tailored to your brand voice." },
  { icon: Globe, title: "Website Design & Management", desc: "Modern, responsive websites built for conversions and maintained for performance." },
  { icon: BarChart3, title: "Analytics & Reporting", desc: "Clear monthly insights so you always know what's working and what to improve." },
];

const pricingTiers = [
  {
    name: "Starter Plan",
    price: "R____/mo",
    features: [
      "Social media management (2 platforms)",
      "8 posts per month",
      "Basic graphic design",
      "Monthly performance summary",
    ],
    highlighted: false,
  },
  {
    name: "Growth Plan",
    price: "R____/mo",
    features: [
      "Social media management (3 platforms)",
      "16 posts per month",
      "Paid ad campaign management",
      "Content calendar & strategy",
      "Bi-weekly performance reports",
    ],
    highlighted: true,
  },
  {
    name: "Premium Plan",
    price: "R____/mo",
    features: [
      "Full digital marketing suite",
      "Unlimited platforms",
      "Ad spend management & optimization",
      "Website updates & SEO",
      "Dedicated account manager",
      "Weekly reporting & strategy calls",
    ],
    highlighted: false,
  },
];

const DigitalMarketing = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-background py-28 md:py-36">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Globe className="h-4 w-4" />
              Digital Media Solutions
            </div>
            <h1 className="animate-fade-in text-4xl font-black leading-tight md:text-5xl lg:text-6xl">
              Digital Strategy That Grows Your{" "}
              <span className="text-primary">Brand Online</span>
            </h1>
            <p
              className="mx-auto mt-6 max-w-2xl animate-fade-in text-lg text-muted-foreground"
              style={{ animationDelay: "100ms" }}
            >
              We build and manage your digital presence with purposeful content,
              targeted campaigns, and clear reporting — so you see real results.
            </p>
            <div
              className="mt-8 flex animate-fade-in flex-col items-center gap-4 sm:flex-row sm:justify-center"
              style={{ animationDelay: "200ms" }}
            >
              <Button asChild size="lg" className="gap-2">
                <Link to="/booking">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2">
                <a href="#packages">View Plans</a>
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
              Your Digital <span className="text-primary">Growth Partner</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              We don't just post content — we build digital ecosystems that work
              for your brand. From social media strategy to paid advertising and
              website management, we coordinate every piece of your online
              presence so it's consistent, measurable, and effective.
            </p>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="bg-card py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            How We <span className="text-primary">Work</span>
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
            What's <span className="text-primary">Included</span>
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
            Digital Marketing <span className="text-primary">Plans</span>
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
            Ready to Take Your Brand{" "}
            <span className="text-primary">Digital?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Let's build a digital strategy that drives real engagement, growth, and results for your business.
          </p>
          <Button asChild size="lg" className="mt-8 gap-2">
            <Link to="/booking">
              Start Your Digital Journey <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default DigitalMarketing;

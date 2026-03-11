import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Share2, CheckCircle, ArrowRight, MessageSquare, Zap } from "lucide-react";
import { FadeInSection, HeroSection, StaggerContainer, StaggerItem, StaggerScaleItem } from "@/components/animations";

const SocialMediaManagement = () => {
  const whatWeDo = ["Content strategy and planning", "Graphic design and captions", "Content scheduling and publishing", "Audience engagement monitoring", "Performance analytics and reporting"];

  const platforms = ["Facebook", "Instagram", "LinkedIn", "TikTok", "YouTube Shorts"];

  const facebookTiers = [
    {
      name: "Facebook Starter",
      price: "R1200",
      period: "per month",
      description: "Perfect for small businesses that want to stay active and visible on Facebook.",
      features: ["6 posts per month", "Basic graphic design", "Caption writing", "Post scheduling", "Monthly activity check"],
    },
    {
      name: "Facebook Growth",
      price: "R1300",
      period: "per month",
      description: "Ideal for businesses that want stronger consistency and engagement.",
      features: ["8 posts per month", "Custom graphics", "Caption writing", "Post scheduling", "Page activity monitoring", "Monthly performance report"],
    },
    {
      name: "Facebook Pro",
      price: "R1600",
      period: "per month",
      description: "For businesses that want a stronger and more active Facebook presence.",
      features: ["12 posts per month", "Custom branded graphics", "Caption writing and hashtags", "Content scheduling", "Page engagement monitoring", "Monthly performance insights"],
    },
  ];

  const processSteps = [
    { step: "1", title: "Brand & Audience Review", desc: "Understanding your business, audience, and brand voice." },
    { step: "2", title: "Content Planning", desc: "Building a structured content calendar aligned with your goals." },
    { step: "3", title: "Content Creation", desc: "Designing visuals, captions, and posts." },
    { step: "4", title: "Publishing & Engagement", desc: "Scheduling posts and monitoring audience interaction." },
    { step: "5", title: "Reporting & Optimization", desc: "Tracking performance and improving results each month." },
  ];

  const whoThisIsFor = [
    "Small businesses building online visibility",
    "Personal brands and professionals",
    "Growing startups and entrepreneurs",
    "Artists and creators",
    "Local businesses wanting consistent online presence",
  ];

  const pricing = [
    { name: "Starter Plan", price: "R2000", period: "per month", features: ["Social media management (2 platforms)", "8 posts per month", "Basic graphic design", "Monthly performance report"], highlighted: false },
    { name: "Growth Plan", price: "R4200", period: "per month", features: ["Social media management (3 platforms)", "16 posts per month", "Content calendar", "Engagement monitoring", "Bi-weekly reports"], highlighted: true },
    { name: "Premium Plan", price: "R7000", period: "per month", features: ["Unlimited platforms", "20+ posts", "Advanced strategy", "Paid ad support", "Weekly reporting"], highlighted: false },
  ];

  return (
    <div className="pt-20">
      <section className="relative overflow-hidden bg-background py-20 md:py-28">
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <HeroSection>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <Share2 className="h-4 w-4" /> Social Media Management
              </div>
            </HeroSection>
            <HeroSection delay={0.1}>
              <h1 className="text-4xl font-black leading-tight md:text-5xl lg:text-6xl text-white">
                Professional <span className="text-primary">Social Media Management</span> for Growing Brands
              </h1>
            </HeroSection>
            <HeroSection delay={0.2}>
              <p className="mt-6 text-lg text-muted-foreground">
                We help businesses build a strong and consistent social media presence through strategy, content creation, and audience engagement.
              </p>
            </HeroSection>
            <HeroSection delay={0.3}>
              <Button asChild size="lg" className="mt-8 gap-2">
                <Link to="/booking">Get Started <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </HeroSection>
          </div>
        </div>
      </section>

      <section className="bg-muted py-20">
        <div className="container mx-auto px-4 text-center">
          <FadeInSection>
            <h2 className="text-3xl font-bold md:text-4xl text-white">The <span className="text-primary">Problem</span></h2>
            <div className="mx-auto mt-8 max-w-3xl rounded-2xl bg-background p-8 border border-border">
              <div className="flex justify-center mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary"><Zap className="h-6 w-6" /></div>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Many businesses struggle with inconsistent posting, low engagement, and unclear content strategy. Without a structured approach, social media becomes time-consuming and ineffective.
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="text-center text-3xl font-bold md:text-4xl text-white mb-12">What <span className="text-primary">We Do</span></h2>
          </FadeInSection>
          <StaggerContainer className="mx-auto max-w-2xl">
            <div className="grid gap-4">
              {whatWeDo.map((item) => (
                <StaggerItem key={item} className="flex items-center gap-4 p-4 rounded-xl bg-muted border border-border">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-white font-medium">{item}</span>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      <section className="bg-card py-20">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="text-center text-3xl font-bold md:text-4xl text-white mb-6">
              Platforms We <span className="text-primary">Manage</span>
            </h2>
          </FadeInSection>
          <StaggerContainer className="mt-6 flex flex-wrap justify-center gap-4">
            {platforms.map((platform) => (
              <StaggerItem key={platform}>
                <div className="rounded-full border border-primary/20 bg-primary/5 px-6 py-2 text-sm font-medium text-white">
                  {platform}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <FadeInSection delay={0.1}>
            <p className="mt-8 text-center text-sm text-muted-foreground">
              We help businesses build consistent and professional visibility across the platforms where their audience already spends time.
            </p>
          </FadeInSection>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="text-center text-3xl font-bold md:text-4xl text-white mb-4">
              Facebook <span className="text-primary">Page Management</span>
            </h2>
            <p className="mx-auto mb-12 max-w-3xl text-lg text-muted-foreground text-center">
              Some businesses only need support with one platform. Our Facebook management services help businesses maintain a professional, consistent, and engaging presence on Facebook.
            </p>
          </FadeInSection>
          <StaggerContainer className="grid gap-8 md:grid-cols-3">
            {facebookTiers.map((tier) => (
              <StaggerScaleItem key={tier.name}>
                <Card className="flex flex-col items-center p-8 text-center bg-muted border-border h-full">
                  <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                  <div className="mb-4 flex flex-col items-center">
                    <span className="text-3xl font-black text-primary">{tier.price}</span>
                    <span className="text-sm text-muted-foreground">{tier.period}</span>
                  </div>
                  <p className="mb-6 text-sm text-muted-foreground">
                    {tier.description}
                  </p>
                  <ul className="mb-8 space-y-3 text-left w-full">
                    {tier.features.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 shrink-0 text-primary" /> {item}
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-auto w-full" asChild>
                    <Link to="/booking">Get Started</Link>
                  </Button>
                </Card>
              </StaggerScaleItem>
            ))}
          </StaggerContainer>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Ideal for businesses that want focused support on a single platform.
          </p>
        </div>
      </section>

      <section className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="text-center text-3xl font-bold md:text-4xl text-white mb-16">
              Our <span className="text-primary">Social Media Process</span>
            </h2>
          </FadeInSection>
          <StaggerContainer className="grid gap-8 md:grid-cols-5">
            {processSteps.map((step) => (
              <StaggerItem key={step.step} className="relative text-center">
                <div className="mb-4 text-4xl font-black text-primary/10">{step.step}</div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <FadeInSection>
            <h2 className="text-3xl font-bold md:text-4xl text-white">
              Who This Service Is <span className="text-primary">For</span>
            </h2>
          </FadeInSection>
          <StaggerContainer className="mt-12 flex flex-wrap justify-center gap-4">
            {whoThisIsFor.map((item) => (
              <StaggerItem key={item}>
                <div className="rounded-full border border-primary/20 bg-primary/5 px-6 py-2 text-sm font-medium text-white">
                  {item}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="text-center text-3xl font-bold md:text-4xl text-white mb-12">
              Flexible <span className="text-primary">Social Media Packages</span>
            </h2>
          </FadeInSection>
          <StaggerContainer className="grid gap-8 md:grid-cols-3">
            {pricing.map((tier) => (
              <StaggerScaleItem key={tier.name}>
                <Card
                  className={`relative flex flex-col items-center p-8 text-center bg-background h-full ${
                    tier.highlighted ? "border-primary border-2" : "border-border"
                  }`}
                >
                  {tier.highlighted && (
                    <span className="absolute -top-4 rounded-full bg-primary px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                  <div className="mb-6 flex flex-col items-center">
                    <span className="text-4xl font-black text-primary">{tier.price}</span>
                    <span className="text-sm text-muted-foreground">{tier.period}</span>
                  </div>
                  <ul className="mb-8 space-y-4 text-left w-full">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 shrink-0 text-primary" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-auto w-full" variant={tier.highlighted ? "default" : "outline"} asChild>
                    <Link to="/booking">Get Started</Link>
                  </Button>
                </Card>
              </StaggerScaleItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="bg-card py-20">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="text-center text-3xl font-bold md:text-4xl text-white mb-6">
              What Makes Our <span className="text-primary">Approach Different</span>
            </h2>
          </FadeInSection>
          <FadeInSection delay={0.1}>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground text-center mb-6">
              Many businesses post on social media without a clear strategy.
            </p>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground text-center mb-8">
              Our approach combines creative content, structured planning, and performance insights to ensure your social media presence supports real business growth.
            </p>
          </FadeInSection>
          <StaggerContainer className="mx-auto max-w-xl">
            <div className="space-y-4">
              {[
                "consistent professional content",
                "strategic audience engagement",
                "measurable brand visibility",
              ].map((item) => (
                <StaggerItem key={item} className="flex items-center gap-3 rounded-xl bg-muted/40 px-4 py-3 border border-border">
                  <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-sm font-medium text-white capitalize">{item}</span>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 bg-background text-center">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="text-3xl font-bold md:text-4xl text-white mb-6">Ready to Build Your Presence?</h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
              Let&apos;s turn your social media into a powerful tool for visibility, engagement, and brand growth.
            </p>
            <Button asChild size="lg" className="px-10 h-14 text-lg">
              <Link to="/booking">Get Started</Link>
            </Button>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
};

export default SocialMediaManagement;

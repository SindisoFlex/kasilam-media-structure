import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Briefcase,
  Video,
  Camera,
  TrendingUp,
  Check,
  Zap,
  Award,
  Users,
  BarChart3,
} from "lucide-react";

const BusinessCorporate = () => {
  const services = [
    {
      id: "promotional-video",
      title: "Promotional Video Production",
      description: "Compelling branded videos for marketing and campaigns",
      icon: Video,
      details: [
        "Scriptwriting and storyboarding",
        "Professional cinematography",
        "On-location and studio filming",
        "Advanced color grading",
        "Sound design and music integration",
        "Multiple delivery formats",
      ],
      pricing: "Custom Quote",
      basePrice: 12000,
      includes: [
        "Concept consultation",
        "Multi-location shooting",
        "Professional editing",
        "Unlimited revisions",
      ],
    },
    {
      id: "product-photography",
      title: "Product Photography",
      description: "Professional product shots for e-commerce and marketing",
      icon: Camera,
      details: [
        "Studio lighting setup",
        "360° product views",
        "Lifestyle shots",
        "Batch processing discount",
        "High-resolution files",
        "E-commerce optimization",
      ],
      pricing: "From R 2,000 per product",
      basePrice: 2000,
      includes: [
        "Professional lighting",
        "Multiple angles",
        "Basic editing",
        "Web-ready files",
      ],
    },
    {
      id: "brand-story",
      title: "Brand Story Videos",
      description: "Narrative-driven content that tells your company's story",
      icon: TrendingUp,
      details: [
        "Brand messaging consultation",
        "Interview filming",
        "Documentary-style production",
        "B-roll cinematography",
        "Professional voice-over",
        "Comprehensive editing",
      ],
      pricing: "Custom Quote",
      basePrice: 15000,
      includes: [
        "Full production scope",
        "Interviews and testimonials",
        "Professional editing",
        "Multiple versions for platforms",
      ],
    },
    {
      id: "corporate-events",
      title: "Corporate Event Coverage",
      description: "Professional documentation of conferences, launches, and celebrations",
      icon: Users,
      details: [
        "Multi-camera setup",
        "Live event coverage",
        "Post-event highlights",
        "Interview capture",
        "Professional editing",
        "Quick delivery",
      ],
      pricing: "From R 5,000/day",
      basePrice: 5000,
      includes: [
        "Full day coverage",
        "Edited highlights",
        "Multiple camera angles",
        "Professional audio",
      ],
    },
    {
      id: "marketing-content",
      title: "Marketing Content Creation",
      description: "Diverse visual content for social media, ads, and campaigns",
      icon: BarChart3,
      details: [
        "Strategic content planning",
        "Multi-format production",
        "Platform optimization",
        "Analytics-driven approach",
        "Trending format awareness",
        "Batch workflow",
      ],
      pricing: "Monthly Packages",
      basePrice: 8000,
      includes: [
        "20+ pieces monthly",
        "All formats included",
        "Platform optimization",
        "Performance insights",
      ],
    },
  ];

  const packages = [
    {
      name: "Starter Package",
      desc: "Perfect for small businesses",
      price: "R 8,000",
      period: "/month",
      features: [
        "20 content pieces monthly",
        "Video + Photography mix",
        "Social media optimization",
        "Basic consultation",
      ],
    },
    {
      name: "Professional Package",
      desc: "For growing businesses",
      price: "R 15,000",
      period: "/month",
      features: [
        "35 content pieces monthly",
        "Custom content strategy",
        "Advanced editing",
        "Weekly strategy calls",
        "Performance reporting",
      ],
    },
    {
      name: "Enterprise Package",
      desc: "Full marketing production",
      price: "Custom",
      period: "Quote",
      features: [
        "Unlimited content creation",
        "Dedicated team",
        "Strategic planning",
        "Campaign management",
        "Priority delivery",
        "Quarterly reviews",
      ],
    },
  ];

  const processSteps = [
    {
      step: 1,
      title: "Consultation",
      desc: "We discuss your business goals, target audience, and creative vision",
    },
    {
      step: 2,
      title: "Strategy",
      desc: "Development of content strategy aligned with your marketing objectives",
    },
    {
      step: 3,
      title: "Production",
      desc: "Professional filming, photography, and creative direction",
    },
    {
      step: 4,
      title: "Delivery",
      desc: "Edited content optimized for all platforms and ready to publish",
    },
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Quick Turnaround",
      desc: "Fast production and delivery without compromising quality",
    },
    {
      icon: Award,
      title: "Professional Excellence",
      desc: "Industry-standard equipment and experienced production teams",
    },
    {
      icon: TrendingUp,
      title: "Marketing ROI",
      desc: "Content designed to drive engagement and conversions",
    },
  ];

  return (
    <div className="bg-background text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 mesh-bg opacity-20" />
        <div className="content-width relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8 flex justify-center">
              <div className="px-6 py-2 rounded-full bg-white/5 border border-white/10 red-glow backdrop-blur-xl">
                <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.4em]">
                  Business & Corporate
                </span>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-8 text-gradient">
              Professional Visual Solutions for Your Business
            </h1>
            <p className="text-xl text-white/70 font-medium leading-relaxed">
              From promotional videos to corporate events, we deliver professional visual content that strengthens your brand, engages your audience, and drives business results.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="content-width">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service) => (
              <div key={service.id} className="premium-card group h-full">
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 border border-white/5 group-hover:border-red-600/30 group-hover:scale-110 transition-all">
                  <service.icon className="h-7 w-7 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 uppercase tracking-tight">{service.title}</h3>
                <p className="text-sm text-white/60 mb-6 font-medium">{service.description}</p>

                <div className="space-y-3 mb-8 flex-grow pb-8 border-b border-white/10">
                  {service.details.slice(0, 3).map((detail) => (
                    <div key={detail} className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-red-600 shrink-0 mt-1" />
                      <span className="text-xs text-white/70 font-medium">{detail}</span>
                    </div>
                  ))}
                </div>

                <div className="text-2xl font-black text-red-600 mb-6">{service.pricing}</div>

                <Button asChild className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-black rounded-lg uppercase tracking-widest text-[10px]">
                  <Link to={`/booking?service=visual&category=${service.id}`}>
                    Request Quote <ArrowRight className="h-3 w-3 ml-2" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Packages */}
      <section className="section-padding bg-zinc-950">
        <div className="content-width">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-4xl font-black mb-6 text-gradient">Monthly Content Packages</h2>
            <p className="text-lg text-white/60 font-medium">
              Consistent, professional visual content to fuel your marketing engine
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg) => (
              <div key={pkg.name} className="premium-card border-white/5 hover:border-red-600/50 h-full flex flex-col">
                <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">{pkg.name}</h3>
                <p className="text-sm text-white/60 mb-6 font-medium">{pkg.desc}</p>

                <div className="mb-8 pb-8 border-b border-white/10">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-red-600">{pkg.price}</span>
                    <span className="text-sm text-white/50 font-medium">{pkg.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-12 flex-grow">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                      <span className="text-sm text-white/80 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button asChild className="w-full h-12 bg-white/5 hover:bg-red-600 text-white font-black border border-white/10 hover:border-red-600 rounded-lg uppercase tracking-widest text-[10px]">
                  <Link to="/contact">Get Started</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding">
        <div className="content-width">
          <h2 className="text-center mb-20 text-4xl font-black text-gradient">Our Production Process</h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {processSteps.map((p) => (
              <div key={p.step} className="text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/5 border border-white/10 mx-auto">
                  <span className="text-2xl font-black text-red-600">{p.step}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-tight">{p.title}</h3>
                <p className="text-sm text-white/60 font-medium">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-zinc-950">
        <div className="content-width">
          <h2 className="text-center mb-20 text-4xl font-black text-gradient">Why Partner With Us?</h2>
          <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            {benefits.map((benefit) => (
              <div key={benefit.title}>
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/5 mx-auto">
                  <benefit.icon className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 text-center uppercase tracking-tight">{benefit.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed font-medium text-center">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="content-width text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-8 text-gradient">Ready to Elevate Your Brand?</h2>
          <p className="text-lg text-white/60 mb-12 font-medium">
            Let's discuss your project and create a custom solution that drives results for your business.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button asChild className="h-14 px-12 bg-red-600 hover:bg-red-700 text-white font-black rounded-full uppercase tracking-widest text-[10px]">
              <Link to="/contact">Get Your Quote</Link>
            </Button>
            <Button asChild variant="outline" className="h-14 px-12 border-white/10 text-white hover:bg-white/5 font-black rounded-full uppercase tracking-widest text-[10px]">
              <Link to="/services/visual-production">Back to Visual Production</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessCorporate;

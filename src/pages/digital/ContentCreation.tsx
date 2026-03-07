import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    PenTool,
    CheckCircle,
    ArrowRight,
    Camera,
    Video,
    Type,
    Palette,
    Lightbulb,
    Zap,
    Image as ImageIcon
} from "lucide-react";

const ContentCreation = () => {
    const problems = [
        "Content that looks unprofessional or cheap",
        "Running out of ideas for posts and videos",
        "Brand messaging that is confused and inconsistent",
        "High effort for low engagement and reach",
    ];

    const services = [
        { icon: Palette, title: "Graphic Design", desc: "Professional visuals for social media, ads, and web." },
        { icon: Type, title: "Copywriting", desc: "Compelling captions and headlines that drive action." },
        { icon: Video, title: "Short-Form Video", desc: "Engaging Reels and TikToks that capture attention." },
        { icon: Lightbulb, title: "Content Strategy", desc: "Ideas and planning that align with your business goals." },
        { icon: Camera, title: "Photography", desc: "High-quality brand and product photography." },
        { icon: ImageIcon, title: "Visual Branding", desc: "Consistent look and feel across all digital touchpoints." },
    ];

    const process = [
        { step: "1", title: "Brand Discovery", desc: "Learning your voice, style, and unique value proposition." },
        { step: "2", title: "Creative Concepting", desc: "Developing the themes and visual styles for your content." },
        { step: "3", title: "Production & Design", desc: "Bringing the ideas to life with professional execution." },
        { step: "4", title: "Review & Refine", desc: "Ensuring every piece of content meets your standards." },
    ];

    const pricing = [
        {
            name: "Basic Creative",
            price: "R1,800",
            period: "/ month",
            features: ["8 Graphic posts", "Basic copywriting", "1 Revision per post", "Brand style alignment"],
            highlighted: false,
        },
        {
            name: "Multimedia",
            price: "R4,500",
            period: "/ month",
            features: ["12 Graphic posts", "4 Short-form videos", "Premium copywriting", "Content strategy", "Unlimited revisions"],
            highlighted: true,
        },
        {
            name: "Full Studio",
            price: "R8,500+",
            period: "/ month",
            features: ["Unlimited graphics", "8+ Videos", "Product photography session", "Full brand guide", "Priority support"],
            highlighted: false,
        },
    ];

    const targetAudience = [
        "Brands needing a professional visual upgrade",
        "Creators wanting high-end video content",
        "E-commerce businesses with products to showcase",
        "Service providers building authority",
        "Marketing teams needing external creative support",
    ];

    return (
        <div className="pt-20">
            {/* Hero */}
            <section className="relative overflow-hidden bg-background py-20 md:py-28">
                <div className="container relative mx-auto px-4">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                            <PenTool className="h-4 w-4" />
                            Content Creation
                        </div>
                        <h1 className="text-4xl font-black leading-tight md:text-5xl lg:text-6xl text-white">
                            Professional Content Designed To <span className="text-primary">Engage</span>
                        </h1>
                        <p className="mt-6 text-lg text-muted-foreground">
                            We create the graphics, videos, and copy that make your brand stand out in a crowded digital world.
                        </p>
                        <Button asChild size="lg" className="mt-8 gap-2">
                            <Link to="/booking">
                                Start Creating <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* The Problem */}
            <section className="bg-muted py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold md:text-4xl text-white">The <span className="text-primary">Problem</span></h2>
                    <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                        In a visual-first world, poor quality content is a direct reflection of your business quality.
                    </p>
                    <div className="mt-12 grid gap-6 sm:grid-cols-2">
                        {problems.map((p, i) => (
                            <div key={i} className="flex items-center gap-4 rounded-lg bg-background p-6 text-left border border-border">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <Zap className="h-5 w-5" />
                                </div>
                                <p className="font-medium text-white">{p}</p>
                            </div>
                        ))}
                    </div>
                    <p className="mt-10 text-lg font-medium text-primary uppercase tracking-wider">
                        We help you look as professional as the services you provide.
                    </p>
                </div>
            </section>

            {/* What We Do */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-center text-3xl font-bold md:text-4xl text-white">What <span className="text-primary">We Do</span></h2>
                    <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {services.map((s, i) => (
                            <div key={i} className="text-center">
                                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                                    <s.icon className="h-7 w-7 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                                <p className="text-muted-foreground">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Process */}
            <section className="bg-card py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-center text-3xl font-bold md:text-4xl text-white mb-16">Our <span className="text-primary">Process</span></h2>
                    <div className="grid gap-8 md:grid-cols-4">
                        {process.map((p, i) => (
                            <div key={i} className="relative text-center">
                                <div className="mb-4 text-6xl font-black text-primary/10">{p.step}</div>
                                <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                                <p className="text-sm text-muted-foreground">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Who This Is For */}
            <section className="py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold md:text-4xl text-white">Who This Service Is <span className="text-primary">For</span></h2>
                    <div className="mt-12 flex flex-wrap justify-center gap-4">
                        {targetAudience.map((item, i) => (
                            <div key={i} className="rounded-full border border-primary/20 bg-primary/5 px-6 py-2 text-sm font-medium text-white">
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section className="bg-muted py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-center text-3xl font-bold md:text-4xl text-white mb-12">Flexible <span className="text-primary">Pricing</span></h2>
                    <div className="grid gap-8 md:grid-cols-3">
                        {pricing.map((tier, i) => (
                            <Card key={i} className={`relative flex flex-col items-center p-8 text-center ${tier.highlighted ? "border-primary border-2" : "border-border"}`}>
                                {tier.highlighted && (
                                    <span className="absolute -top-4 rounded-full bg-primary px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
                                        Most Popular
                                    </span>
                                )}
                                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                                <div className="mb-6 flex items-baseline">
                                    <span className="text-4xl font-black text-primary">{tier.price}</span>
                                    <span className="ml-1 text-muted-foreground">{tier.period}</span>
                                </div>
                                <ul className="mb-8 space-y-4 text-left w-full">
                                    {tier.features.map((f, j) => (
                                        <li key={j} className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <CheckCircle className="h-4 w-4 shrink-0 text-primary" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <Button className="mt-auto w-full" variant={tier.highlighted ? "default" : "outline"} asChild>
                                    <Link to="/booking">Choose Plan</Link>
                                </Button>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-background text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold md:text-4xl text-white mb-6">
                        Ready to Stand Out?
                    </h2>
                    <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
                        Let's create content that captures attention and tells your story effectively.
                    </p>
                    <Button asChild size="lg" className="px-10 h-14 text-lg">
                        <Link to="/booking">Request a Quote</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default ContentCreation;

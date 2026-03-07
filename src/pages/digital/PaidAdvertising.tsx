import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Megaphone,
    CheckCircle,
    ArrowRight,
    Target,
    Search,
    Zap,
    BarChart,
    MousePointer2,
    PieChart,
    UserCheck
} from "lucide-react";

const PaidAdvertising = () => {
    const problems = [
        "Wasting budget on the wrong audience",
        "Low click-through rates (CTR)",
        "Ads not converting into customers",
        "Difficulty tracking ROI on spend",
    ];

    const services = [
        { icon: Target, title: "Audience Targeting", desc: "Finding the people most likely to buy from you." },
        { icon: Megaphone, title: "Campaign Management", desc: "Expert setup and monitoring of your ad spend." },
        { icon: MousePointer2, title: "Ad Creative", desc: "High-converting visuals and copy for your ads." },
        { icon: Search, title: "Keyword Research", desc: "Finding the right terms to win on Google Search." },
        { icon: BarChart, title: "A/B Testing", desc: "Scaling what works and cutting what doesn't." },
        { icon: PieChart, title: "Detailed Reporting", desc: "Clear insights into your cost per acquisition." },
    ];

    const process = [
        { step: "1", title: "Audience & Market Research", desc: "Identifying your ideal customers and their behaviors." },
        { step: "2", title: "Ad Strategy & Design", desc: "Creating the campaigns and creative assets." },
        { step: "3", title: "Launch & Monitoring", desc: "Going live and watching the data closely." },
        { step: "4", title: "Scale & Optimize", desc: "Improving performance to lower your acquisition cost." },
    ];

    const pricing = [
        {
            name: "Starter Ads",
            price: "R1,500",
            period: "/ month + ad spend",
            features: ["1 platform (Meta or Google)", "Basic ad creative", "Campaign setup", "Monthly report"],
            highlighted: false,
        },
        {
            name: "Multi-Channel",
            price: "R3,500",
            period: "/ month + ad spend",
            features: ["2 platforms", "A/B testing", "Retargeting campaigns", "Weekly optimizations", "Bi-weekly reports"],
            highlighted: true,
        },
        {
            name: "Scale Plan",
            price: "R6,000+",
            period: "/ month + ad spend",
            features: ["Unlimited platforms", "Advanced conversion tracking", "Creative production", "Dedicated ad manager", "Weekly reports"],
            highlighted: false,
        },
    ];

    const targetAudience = [
        "E-commerce stores needing sales",
        "Local businesses wanting leads",
        "Service providers booking appointments",
        "Events looking for attendees",
        "Apps seeking more downloads",
    ];

    return (
        <div className="pt-20">
            {/* Hero */}
            <section className="relative overflow-hidden bg-background py-20 md:py-28">
                <div className="container relative mx-auto px-4">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                            <Megaphone className="h-4 w-4" />
                            Paid Advertising
                        </div>
                        <h1 className="text-4xl font-black leading-tight md:text-5xl lg:text-6xl text-white">
                            Target The Right Audience & <span className="text-primary">Drive Results</span>
                        </h1>
                        <p className="mt-6 text-lg text-muted-foreground">
                            Don't just spend money on ads — invest in campaigns that convert. We build data-driven advertising that grows your bottom line.
                        </p>
                        <Button asChild size="lg" className="mt-8 gap-2">
                            <Link to="/booking">
                                Start Your Campaign <ArrowRight className="h-4 w-4" />
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
                        Many businesses find paid ads confusing or expensive because they aren't optimized.
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
                        We help businesses turn ad spend into a predictable revenue generator.
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
                        Ready to Drive Measurable Results?
                    </h2>
                    <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
                        Let's build a campaign that reaches your ideal customers and grows your revenue.
                    </p>
                    <Button asChild size="lg" className="px-10 h-14 text-lg">
                        <Link to="/booking">Book an Ad Strategy Session</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default PaidAdvertising;

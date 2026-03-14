﻿import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Camera, Video, Globe, ExternalLink, MapPin } from "lucide-react";
import { useEffect } from "react";

const categories = [
    {
        title: "Web Development",
        description: "Industry demos and real web projects built to convert.",
        icon: Globe,
        to: "#web-development",
        button: "View Demos",
    },
    {
        title: "Photography",
        description: "Real client photography with premium presentation.",
        icon: Camera,
        to: "/portfolio/photography",
        button: "View Portfolio",
    },
    {
        title: "Videography",
        description: "Videography portfolio featuring corporate, brand, and event storytelling. Coming soon.",
        icon: Video,
        to: "/portfolio/videography",
        button: "Coming Soon",
        disabled: true,
    },
];

const demoProjects = [
    {
        title: "Funeral Parlour Website Demo",
        description: "Client type: funeral parlour. Purpose: guide families with service information and support resources. Outcome: clearer service visibility and stronger community trust.",
        to: "/portfolio/funeral-home-demo",
    },
    {
        title: "School Website Demo",
        description: "Client type: school. Purpose: highlight programs, admissions, and school updates. Outcome: improved communication for parents and learners.",
        to: "/portfolio/school-demo",
    },
    {
        title: "Restaurant Website Demo",
        description: "Client type: restaurant. Purpose: showcase menu highlights and streamline reservations. Outcome: increased brand credibility and customer inquiries.",
        to: "/portfolio/restaurant-demo",
    },
    {
        title: "Construction Company Website Demo",
        description: "Client type: construction company. Purpose: present services and completed projects. Outcome: stronger trust for procurement and private clients.",
        to: "/portfolio/construction-demo",
    },
];

const Portfolio = () => {
    useEffect(() => {
        document.title = "KMP | Our Portfolio | Creative Media Projects in Port Elizabeth";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute("content", "Explore the Kasilam Media Productions (KMP) portfolio. Featuring creative media projects produced in Port Elizabeth (Gqeberha), Eastern Cape, and across South Africa.");
        }
    }, []);

    return (
        <div className="bg-background text-foreground min-h-screen">
            {/* Hero */}
            <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20 mesh-bg" />
                <div className="content-width relative z-10 text-center">
                    <div className="mb-10 flex justify-center animate-fade-in">
                        <div className="px-6 py-2 rounded-full bg-foreground/5 border border-foreground/10 red-glow backdrop-blur-xl dark:bg-white/5 dark:border-white/10">
                            <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.4em]">
                                Our KMP Portfolio
                            </span>
                        </div>
                    </div>
                    <h1 className="text-foreground text-gradient mb-10 leading-[0.85] tracking-[-0.04em]">
                        KMP Selected<br />
                        <span className="text-primary italic">Production Highlights.</span>
                    </h1>
                    <p className="mx-auto max-w-3xl text-foreground/50 text-xl md:text-2xl font-semibold uppercase tracking-[0.2em] leading-relaxed">
                        Kasilam Media Productions showcases real work delivered for businesses, creators, and entrepreneurs in Port Elizabeth, the Eastern Cape, and across South Africa.
                    </p>
                </div>
            </section>

            {/* Local Context Bar */}
            <div className="bg-red-600/5 border-y border-red-600/10 py-6">
                <div className="content-width flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-red-600/60">
                    <MapPin className="h-4 w-4" />
                    <span>KMP: Proudly based in the Eastern Cape, serving Port Elizabeth (Gqeberha) and clients across South Africa</span>
                </div>
            </div>

            <section className="section-padding bg-background relative">
                <div className="content-width">
                    <div className="mb-12 text-center">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600 mb-4">Portfolio Categories</p>
                        <h2 className="text-4xl md:text-6xl font-black text-foreground">Explore Our Work</h2>
                        <p className="mt-4 text-foreground/50 text-lg font-semibold">Web development, photography, and upcoming videography work across the Eastern Cape.</p>
                        <p className="mt-3 text-foreground/50 text-sm font-semibold uppercase tracking-[0.2em]">
                            Explore selected projects created for businesses, artists, and organizations across South Africa.
                        </p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-3">
                        {categories.map((category) => (
                            <div key={category.title} className="rounded-3xl border border-foreground/10 bg-foreground/[0.03] p-6 flex flex-col gap-4 group hover:border-red-600/30 transition-all duration-500 dark:border-white/10 dark:bg-white/[0.03]">
                                <div className="flex items-center gap-3">
                                    <category.icon className="h-5 w-5 text-red-600" />
                                    <h3 className="text-lg font-black text-foreground">{category.title}</h3>
                                </div>
                                <p className="text-sm text-foreground/50">{category.description}</p>
                                {category.disabled ? (
                                    <Button disabled className="mt-auto h-12 text-xs font-black uppercase tracking-[0.3em] btn-secondary opacity-50">
                                        {category.button}
                                    </Button>
                                ) : (
                                    <Button asChild className="mt-auto h-12 text-xs font-black uppercase tracking-[0.3em] btn-secondary">
                                        {category.to.startsWith("#") ? (
                                            <a href={category.to}>{category.button}</a>
                                        ) : (
                                            <Link to={category.to}>{category.button}</Link>
                                        )}
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section-padding bg-card/40 border-y border-foreground/5">
                <div className="content-width">
                    <div className="mb-12 text-center">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600 mb-4">Real Client Work</p>
                        <h2 className="text-4xl md:text-6xl font-black text-foreground">Websites We've Built</h2>
                        <p className="mt-4 text-foreground/50 text-lg font-semibold">Live projects delivered for real businesses across South Africa.</p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <div className="rounded-3xl border border-foreground/10 bg-foreground/[0.03] p-6 flex flex-col gap-4 dark:border-white/10 dark:bg-white/[0.03]">
                            <div>
                                <h3 className="text-lg font-black text-foreground">Mpongoshe Security Services</h3>
                                <p className="text-sm text-foreground/50 mt-3">Professional security company website built to boost online visibility, communicate services clearly, and generate client inquiries across the Eastern Cape and South Africa.</p>
                                <p className="text-[10px] font-bold text-red-600/40 uppercase tracking-widest mt-4">Location: Port Elizabeth, South Africa</p>
                            </div>
                            <Button asChild className="mt-auto h-12 text-xs font-black uppercase tracking-[0.3em] btn-secondary">
                                <a href="https://mpongoshe-security-services.vercel.app/" target="_blank" rel="noreferrer">
                                    <ExternalLink className="h-3.5 w-3.5 mr-3" />
                                    Visit Website
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <section id="web-development" className="section-padding bg-card/40 border-y border-foreground/5 scroll-mt-24">
                <div className="content-width">
                    <div className="mb-12 text-center">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600 mb-4">Web Development</p>
                        <h2 className="text-4xl md:text-6xl font-black text-foreground">Website Demo Projects</h2>
                        <p className="mt-4 text-foreground/50 text-lg font-semibold">Explore sample client websites built for different industries across South Africa.</p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {demoProjects.map((demo) => (
                            <div key={demo.title} className="rounded-3xl border border-foreground/10 bg-foreground/[0.03] p-6 flex flex-col gap-4 dark:border-white/10 dark:bg-white/[0.03]">
                                <div>
                                    <h3 className="text-lg font-black text-foreground">{demo.title}</h3>
                                    <p className="text-sm text-foreground/50 mt-3">{demo.description}</p>
                                    <p className="text-[9px] font-bold text-foreground/20 uppercase tracking-widest mt-4 italic dark:text-white/20">Produced by Kasilam Media Productions in Port Elizabeth (Gqeberha), serving businesses across the Eastern Cape and South Africa.</p>
                                </div>
                                <Button asChild className="mt-auto h-12 text-xs font-black uppercase tracking-[0.3em] btn-secondary">
                                    <Link to={demo.to}>View Demo</Link>
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="section-padding relative overflow-hidden bg-background text-center">
                <div className="absolute inset-0 mesh-bg opacity-30" />
                <div className="content-width relative z-10">
                    <h2 className="text-5xl md:text-8xl lg:text-9xl font-black mb-12 text-gradient leading-[0.85] tracking-[-0.06em]">Your Story<br />is Next.</h2>
                    <p className="mx-auto max-w-4xl text-xl md:text-2xl text-foreground/50 mb-10 font-semibold uppercase tracking-[0.2em] leading-relaxed">
                        If you&apos;re ready to build your brand, launch your website, or produce professional media content, let&apos;s discuss your project.
                    </p>
                    <div className="flex justify-center flex-wrap gap-8">
                        <Button asChild size="lg" className="h-20 px-16 text-xs font-black bg-red-600 hover:bg-red-700 text-white border-0 rounded-full uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95 red-glow cursor-pointer">
                            <Link to="/contact">Start Your Project</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="h-20 px-16 text-xs font-black bg-foreground/5 backdrop-blur-md border-foreground/10 text-foreground rounded-full uppercase tracking-[0.4em] hover:bg-foreground/10 hover:border-red-600/50 dark:bg-white/5 dark:border-white/10 dark:text-white">
                            <Link to="/contact">Let&apos;s Talk</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Portfolio;

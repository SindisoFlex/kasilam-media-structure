import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Camera, Video, Globe, ExternalLink } from "lucide-react";
import { useBooking } from "@/contexts/BookingContext";

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
        to: "/portfolio/funeral-photography",
        button: "View Portfolio",
    },
    {
        title: "Videography",
        description: "Coming soon.",
        icon: Video,
        to: "",
        button: "Coming Soon",
        disabled: true,
    },
];

const demoProjects = [
    {
        title: "Funeral Parlour Website Demo",
        description: "A respectful, calm site with service details and family support focus.",
        to: "/portfolio/funeral-home-demo",
    },
    {
        title: "School Website Demo",
        description: "Community-focused education site with programs, admissions, and updates.",
        to: "/portfolio/school-demo",
    },
    {
        title: "Restaurant Website Demo",
        description: "Minimalist dining brand with menu highlights and reservations.",
        to: "/portfolio/restaurant-demo",
    },
    {
        title: "Construction Company Website Demo",
        description: "Strong, reliable contractor site with services and project highlights.",
        to: "/portfolio/construction-demo",
    },
];

const Portfolio = () => {
    const { openBooking } = useBooking();
    return (
        <div className="bg-background text-white min-h-screen">
            {/* Hero */}
            <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20 mesh-bg" />
                <div className="content-width relative z-10 text-center">
                    <div className="mb-10 flex justify-center animate-fade-in">
                        <div className="px-6 py-2 rounded-full bg-white/5 border border-white/10 red-glow backdrop-blur-xl">
                            <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.4em]">
                                Our Portfolio
                            </span>
                        </div>
                    </div>
                    <h1 className="text-white text-gradient mb-10 leading-[0.85] tracking-[-0.04em]">
                        Selected<br />
                        <span className="text-primary italic">Production Highlights.</span>
                    </h1>
                    <p className="mx-auto max-w-3xl text-white/50 text-xl md:text-2xl font-semibold uppercase tracking-[0.2em] leading-relaxed">
                        A showcase of moments captured, stories told, and brands built.
                    </p>
                </div>
            </section>

            <section className="section-padding bg-background relative">
                <div className="content-width">
                    <div className="mb-12 text-center">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600 mb-4">Portfolio Categories</p>
                        <h2 className="text-4xl md:text-6xl font-black text-white">Explore Our Work</h2>
                        <p className="mt-4 text-white/50 text-lg font-semibold">Web development, photography, and upcoming videography work.</p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-3">
                        {categories.map((category) => (
                            <div key={category.title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    <category.icon className="h-5 w-5 text-red-600" />
                                    <h3 className="text-lg font-black text-white">{category.title}</h3>
                                </div>
                                <p className="text-sm text-white/50">{category.description}</p>
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

            <section className="section-padding bg-card/40 border-y border-white/5">
                <div className="content-width">
                    <div className="mb-12 text-center">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600 mb-4">Real Client Work</p>
                        <h2 className="text-4xl md:text-6xl font-black text-white">Websites We’ve Built</h2>
                        <p className="mt-4 text-white/50 text-lg font-semibold">Live projects delivered for real businesses.</p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 flex flex-col gap-4">
                            <div>
                                <h3 className="text-lg font-black text-white">Mpongoshe Security Services</h3>
                                <p className="text-sm text-white/50 mt-3">Professional security company website designed for service visibility and lead generation.</p>
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

            <section id="web-development" className="section-padding bg-card/40 border-y border-white/5 scroll-mt-24">
                <div className="content-width">
                    <div className="mb-12 text-center">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600 mb-4">Web Development</p>
                        <h2 className="text-4xl md:text-6xl font-black text-white">Website Demo Projects</h2>
                        <p className="mt-4 text-white/50 text-lg font-semibold">Explore sample client websites built for different industries.</p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {demoProjects.map((demo) => (
                            <div key={demo.title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 flex flex-col gap-4">
                                <div>
                                    <h3 className="text-lg font-black text-white">{demo.title}</h3>
                                    <p className="text-sm text-white/50 mt-3">{demo.description}</p>
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
            <section className="section-padding relative overflow-hidden bg-zinc-950 text-center">
                <div className="absolute inset-0 mesh-bg opacity-30" />
                <div className="content-width relative z-10">
                    <h2 className="text-5xl md:text-8xl lg:text-9xl font-black mb-12 text-gradient leading-[0.85] tracking-[-0.06em]">Your Story<br />is Next.</h2>
                    <p className="mx-auto max-w-4xl text-xl md:text-2xl text-white/50 mb-20 font-semibold uppercase tracking-[0.2em] leading-relaxed">Ready to produce elite visuals or build your digital legacy?</p>
                    <div className="flex justify-center flex-wrap gap-8">
                        <Button
                            onClick={() => openBooking({
                                service: "Portfolio Strategy",
                                package: "General Inquiry",
                                price: 0
                            })}
                            size="lg"
                            className="h-20 px-16 text-xs font-black bg-red-600 hover:bg-red-700 text-white border-0 rounded-full uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95 red-glow cursor-pointer"
                        >
                            Start Your Project
                        </Button>
                        <Button asChild variant="outline" size="lg" className="h-20 px-16 text-xs font-black bg-white/5 backdrop-blur-md border-white/10 text-white rounded-full uppercase tracking-[0.4em] hover:bg-white/10 hover:border-red-600/50">
                            <Link to="/contact">Let's Talk</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Portfolio;
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Camera, Video, Globe, ArrowRight, Play, ExternalLink } from "lucide-react";
import { useBooking } from "@/contexts/BookingContext";

const portfolioItems = [
    { id: 1, title: "Lakeside Wedding", type: "Photography", category: "Community", image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80" },
    { id: 2, title: "Urban Beats MV", type: "Videography", category: "Music", image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80" },
    { id: 3, title: "Fintech Rebrand", type: "Digital", category: "Corporate", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80" },
    { id: 4, title: "Heritage Festival", type: "Photography", category: "Event", image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80" },
    { id: 5, title: "Corporate Gala", type: "Videography", category: "Corporate", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80" },
    { id: 6, title: "E-Commerce Suite", type: "Digital", category: "Startup", image: "https://images.unsplash.com/photo-1523474253046-2cd2c78b6814?auto=format&fit=crop&q=80" },
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

            {/* Filter / Category Navigation - Minimal */}
            <section className="py-16 bg-zinc-950/50 backdrop-blur-md border-y border-white/5 sticky top-[72px] z-40">
                <div className="content-width flex flex-wrap justify-center gap-6">
                    {["All Work", "Photography", "Videography", "Digital Solutions"].map((cat) => (
                        <button key={cat} className="px-8 py-3 rounded-full border border-white/5 hover:border-red-600 transition-all text-[10px] font-black uppercase tracking-[0.3em] bg-white/5 backdrop-blur-xl hover:bg-white/10 active:scale-95">
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* Grid */}
            <section className="section-padding bg-background relative">
                <div className="content-width">
                    <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
                        {portfolioItems.map((item) => (
                            <div key={item.id} className="group relative overflow-hidden rounded-[2.5rem] aspect-[4/5] bg-zinc-900 border border-white/5 hover:border-red-600/30 transition-all duration-700">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-40 group-hover:opacity-60"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-90" />

                                <div className="absolute bottom-0 left-0 w-full p-10 translate-y-6 group-hover:translate-y-0 transition-all duration-700">
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600 mb-4 block">{item.type} • {item.category}</span>
                                    <h3 className="text-3xl font-black text-white mb-10 leading-none tracking-tighter uppercase">{item.title}</h3>
                                    <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                                        <Button variant="outline" size="sm" className="h-12 px-8 rounded-full border-white/10 bg-white/5 backdrop-blur-xl text-white hover:bg-red-600 hover:border-red-600 transition-all text-[10px] font-black uppercase tracking-widest">
                                            {item.type === "Videography" ? <Play className="h-3.5 w-3.5 mr-3 fill-current" /> : <ExternalLink className="h-3.5 w-3.5 mr-3" />}
                                            View Project
                                        </Button>
                                    </div>
                                </div>
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

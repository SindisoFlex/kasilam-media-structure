import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AudioWaveform, CheckCircle, ArrowRight } from "lucide-react";

const VoiceOverProduction = () => {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero */}
            <section className="relative py-24 md:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
                <div className="container relative mx-auto px-4 text-center">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                        <AudioWaveform className="h-4 w-4" />
                        Voice-Over Production
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-6">
                        Professional <span className="text-primary">Voice-Over Production</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                        Clear, professional voice recordings for brands, media, and storytelling.
                    </p>
                    <Button asChild size="lg" className="px-8">
                        <Link to="/booking">Record Voice-Over</Link>
                    </Button>
                </div>
            </section>

            {/* About Service */}
            <section className="py-20 bg-card/50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-8 text-center">About This Service</h2>
                        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed text-center">
                            <p>
                                Voice-over audio is used in commercials, corporate videos, social media ads, and digital media.
                            </p>
                            <p>
                                Our voice-over production service ensures your voice recordings sound clear, polished, and ready for professional use. We provide a focused recording environment and technical setup designed to capture voice audio with clarity and consistency.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section className="py-20 bg-card/50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-12">Voice-Over <span className="text-primary">Packages</span></h2>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
                        {[
                            {
                                name: "Voiceover Recording",
                                price: "R400 / hour",
                                desc: "Ads, Radio promos, YouTube & Documentary narration.",
                                features: ["Recording session", "Clean audio export"]
                            },
                            {
                                name: "Full Voiceover Production",
                                price: "R1200 / project",
                                highlighted: true,
                                features: ["Recording", "Audio cleaning", "Compression & EQ", "Final mastered audio"]
                            }
                        ].map((tier, i) => (
                            <div key={i} className={`p-8 rounded-2xl border flex flex-col ${tier.highlighted ? 'border-primary bg-primary/5 shadow-xl' : 'border-border bg-background'}`}>
                                <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                                <p className="text-2xl font-black text-primary mb-4">{tier.price}</p>
                                {tier.desc && <p className="text-sm text-muted-foreground mb-6">{tier.desc}</p>}
                                <ul className="space-y-3 mb-8 flex-1">
                                    {tier.features.map(f => (
                                        <li key={f} className="flex items-center gap-2 text-sm">
                                            <CheckCircle className="h-4 w-4 text-primary" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <Button variant={tier.highlighted ? "default" : "outline"} asChild className="w-full">
                                    <Link to="/booking">Book Now</Link>
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* CTA */}
            <section className="py-24 border-t border-border">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Give Your Project a Voice?</h2>
                    <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                        Capture professional narration or commercial voice-overs with ease.
                    </p>
                    <Button asChild size="lg" className="gap-2">
                        <Link to="/booking">
                            Record Your Voice-Over <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default VoiceOverProduction;

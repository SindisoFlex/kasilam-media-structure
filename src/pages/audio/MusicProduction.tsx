import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Music, CheckCircle, ArrowRight } from "lucide-react";

const MusicProduction = () => {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero */}
            <section className="relative py-24 md:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
                <div className="container relative mx-auto px-4 text-center">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                        <Music className="h-4 w-4" />
                        Music Production Management
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-6">
                        Music <span className="text-primary">Production Management</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                        We help artists find the right beats, producers, and production workflow for their projects.
                    </p>
                    <Button asChild size="lg" className="px-8">
                        <Link to="/booking">Start Your Project</Link>
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
                                Not every artist works with the same producer or sound style. Our music production management service helps connect artists with the right producers and beats for their project.
                            </p>
                            <p>
                                Instead of limiting you to one sound, we source beats from trusted producers, present the best options to you, and coordinate the production process. This approach ensures you find the sound that truly fits your music while keeping the process smooth and professional.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section className="py-20 bg-card/50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-12">Management <span className="text-primary">Pricing</span></h2>
                    <div className="max-w-2xl mx-auto p-8 rounded-3xl border border-primary bg-primary/5 shadow-xl">
                        <h3 className="text-xl font-bold mb-2">Beat Sourcing & Production Management</h3>
                        <p className="text-3xl font-black text-primary mb-6">R800 – R2000 per project</p>
                        <ul className="text-left space-y-4 mb-8">
                            {[
                                "Finding the right producer for your style",
                                "Negotiating beat licenses and agreements",
                                "Managing artist-producer collaboration",
                                "Project workflow and timeline management",
                                "Final beat delivery and file organization"
                            ].map(f => (
                                <li key={f} className="flex items-center gap-3 text-lg">
                                    <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                                    {f}
                                </li>
                            ))}
                        </ul>
                        <Button size="lg" asChild className="w-full">
                            <Link to="/booking">Inquire About Management</Link>
                        </Button>
                    </div>
                </div>
            </section>


            {/* CTA */}
            <section className="py-24 border-t border-border">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Build Your Sound?</h2>
                    <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                        Let us manage the production ecosystem while you focus on the music.
                    </p>
                    <Button asChild size="lg" className="gap-2">
                        <Link to="/booking">
                            Start Your Music Production Project <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default MusicProduction;

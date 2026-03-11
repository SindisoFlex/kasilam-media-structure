import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Headphones, CheckCircle, ArrowRight } from "lucide-react";
import { useBooking } from "@/contexts/BookingContext";
import { FadeInSection, HeroSection, StaggerContainer, StaggerScaleItem } from "@/components/animations";

const MixingMastering = () => {
    const { openBooking } = useBooking();
    return (
        <div className="min-h-screen bg-background">
            <section className="relative py-24 md:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
                <div className="container relative mx-auto px-4 text-center">
                    <HeroSection>
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                            <Headphones className="h-4 w-4" />
                            Mixing & Mastering Coordination
                        </div>
                    </HeroSection>
                    <HeroSection delay={0.1}>
                        <h1 className="text-4xl md:text-6xl font-black mb-6">
                            Professional <span className="text-primary">Mixing & Mastering</span>
                        </h1>
                    </HeroSection>
                    <HeroSection delay={0.2}>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                            Refine and balance your audio to achieve a polished, professional sound.
                        </p>
                    </HeroSection>
                    <HeroSection delay={0.3}>
                        <Button
                            onClick={() => openBooking({
                                service: "Mixing & Mastering",
                                package: "General Inquiry",
                                price: 0
                            })}
                            size="lg"
                            className="px-8 cursor-pointer"
                        >
                            Start Mixing Process
                        </Button>
                    </HeroSection>
                </div>
            </section>

            <section className="py-20 bg-card/50">
                <div className="container mx-auto px-4">
                    <FadeInSection className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-8 text-center">About This Service</h2>
                        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed text-center">
                            <p>Mixing and mastering are essential steps in professional audio production.</p>
                            <p>Instead of limiting you to one engineer, we collaborate with trusted mixing and mastering specialists to ensure your project receives the right treatment. Our role is to coordinate the process, communicate your creative vision, and ensure the final sound meets professional standards.</p>
                        </div>
                    </FadeInSection>
                </div>
            </section>

            <section className="py-20 bg-card/50">
                <div className="container mx-auto px-4 text-center">
                    <FadeInSection>
                        <h2 className="text-3xl font-bold mb-12">Post-Production <span className="text-primary">Pricing</span></h2>
                    </FadeInSection>
                    <StaggerContainer className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {[
                            { name: "Mixing", price: "R900 per song", features: ["Full mix balancing", "EQ & compression", "Vocal & instrument effects", "Stereo imaging", "2 revisions"] },
                            { name: "Mastering", price: "R450 per song", highlighted: true, features: ["Loudness optimization", "Final polish and clarity", "Streaming-ready format", "Multiple output formats"] }
                        ].map((tier, i) => (
                            <StaggerScaleItem key={i}>
                                <div className={`p-8 rounded-2xl border flex flex-col h-full ${tier.highlighted ? 'border-primary bg-primary/5 shadow-xl' : 'border-border bg-background'}`}>
                                    <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                                    <p className="text-2xl font-black text-primary mb-6">{tier.price}</p>
                                    <ul className="text-left space-y-3 mb-8 flex-1">
                                        {tier.features.map(f => (
                                            <li key={f} className="flex items-center gap-2 text-sm">
                                                <CheckCircle className="h-4 w-4 text-primary" />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                    <Button
                                        onClick={() => openBooking({
                                            service: "Mixing & Mastering",
                                            package: tier.name,
                                            price: parseInt(tier.price.replace(/[^\d]/g, "")) || 0
                                        })}
                                        variant={tier.highlighted ? "default" : "outline"}
                                        className="w-full cursor-pointer"
                                    >
                                        Get Started
                                    </Button>
                                </div>
                            </StaggerScaleItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            <section className="py-24 border-t border-border">
                <div className="container mx-auto px-4 text-center">
                    <FadeInSection>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Polish Your Sound?</h2>
                        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                            Give your music the professional finish it deserves.
                        </p>
                        <Button
                            onClick={() => openBooking({
                                service: "Mixing & Mastering",
                                package: "General Inquiry",
                                price: 0
                            })}
                            size="lg"
                            className="gap-2 cursor-pointer"
                        >
                            Start Your Mixing Process <ArrowRight className="h-4 w-4" />
                        </Button>
                    </FadeInSection>
                </div>
            </section>
        </div>
    );
};

export default MixingMastering;

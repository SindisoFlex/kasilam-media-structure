import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Radio, CheckCircle, ArrowRight } from "lucide-react";
import { FadeInSection, HeroSection, StaggerContainer, StaggerScaleItem } from "@/components/animations";
import { useBooking } from "@/contexts/BookingContext";

const PodcastRecording = () => {
    const { openBooking } = useBooking();

    const tiers = [
        { name: "Basic Podcast Session", price: 400, priceLabel: "R400 / hour", features: ["Studio microphones", "Audio recording", "Basic audio cleanup"] },
        { name: "Podcast Production Package", price: 1500, priceLabel: "R1500 / episode", highlighted: true, features: ["Recording session", "Audio editing", "Noise reduction", "Intro / outro placement", "Final broadcast-ready audio"] }
    ];

    return (
        <div className="min-h-screen bg-background">
            <section className="relative py-24 md:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
                <div className="container relative mx-auto px-4 text-center">
                    <HeroSection>
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                            <Radio className="h-4 w-4" />
                            Podcast Recording
                        </div>
                    </HeroSection>
                    <HeroSection delay={0.1}>
                        <h1 className="text-4xl md:text-6xl font-black mb-6">
                            Professional <span className="text-primary">Podcast Recording</span>
                        </h1>
                    </HeroSection>
                    <HeroSection delay={0.2}>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                            Launch your podcast with clean, professional sound that keeps listeners engaged.
                        </p>
                    </HeroSection>
                    <HeroSection delay={0.3}>
                        <Button onClick={() => openBooking({ serviceName: "Podcast Recording", packageName: "Podcast Session", mediaType: "none", basePrice: 400, eventType: "Podcast Recording" })} size="lg" className="px-8">
                            Start Recording Session
                        </Button>
                    </HeroSection>
                </div>
            </section>

            <section className="py-20 bg-card/50">
                <div className="container mx-auto px-4">
                    <FadeInSection className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-8 text-center">About This Service</h2>
                        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed text-center">
                            <p>Podcasts are one of the most powerful ways to share ideas, stories, and conversations.</p>
                            <p>Our podcast recording service helps creators produce clear, high-quality episodes that sound professional and engaging.</p>
                        </div>
                    </FadeInSection>
                </div>
            </section>

            <section className="py-20 bg-card/50">
                <div className="container mx-auto px-4 text-center">
                    <FadeInSection>
                        <h2 className="text-3xl font-bold mb-12">Podcast Recording <span className="text-primary">Packages</span></h2>
                    </FadeInSection>
                    <StaggerContainer className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {tiers.map((tier, i) => (
                            <StaggerScaleItem key={i}>
                                <div className={`p-8 rounded-2xl border flex flex-col h-full ${tier.highlighted ? 'border-primary bg-primary/5 shadow-xl' : 'border-border bg-background'}`}>
                                    <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                                    <p className="text-2xl font-black text-primary mb-6">{tier.priceLabel}</p>
                                    <ul className="text-left space-y-3 mb-8 flex-1">
                                        {tier.features.map(f => (
                                            <li key={f} className="flex items-center gap-2 text-sm">
                                                <CheckCircle className="h-4 w-4 text-primary" />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                    <Button
                                        variant={tier.highlighted ? "default" : "outline"}
                                        className="w-full"
                                        onClick={() => openBooking({ serviceName: "Podcast Recording", packageName: tier.name, mediaType: "none", basePrice: tier.price, eventType: "Podcast Recording" })}
                                    >
                                        Book Now
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
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Share Your Voice?</h2>
                        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                            Get broadcast-ready sound for your podcast. Book your recording session today.
                        </p>
                        <Button onClick={() => openBooking({ serviceName: "Podcast Recording", packageName: "Podcast Session", mediaType: "none", basePrice: 400, eventType: "Podcast Recording" })} size="lg" className="gap-2">
                            Start Recording Your Podcast <ArrowRight className="h-4 w-4" />
                        </Button>
                    </FadeInSection>
                </div>
            </section>
        </div>
    );
};

export default PodcastRecording;

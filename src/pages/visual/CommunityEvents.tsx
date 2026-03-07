import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Heart,
  Users,
  Cake,
  BookOpen,
  Flower,
  Home,
  Target,
  Check,
  Music2,
} from "lucide-react";

const CommunityEvents = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showPackages, setShowPackages] = useState(false);

  const services = [
    {
      id: "wedding",
      title: "Wedding Production",
      description: "Comprehensive coverage of your special day",
      icon: Heart,
      details: [
        "Pre-event coverage",
        "Ceremony documentation",
        "Reception highlights",
        "Family portraits",
        "Guest moments",
      ],
    },
    {
      id: "funeral",
      title: "Funeral Coverage",
      description: "Respectful documentation of memorial services",
      icon: Flower,
      details: [
        "Service coverage",
        "Family moments",
        "Tribute documentation",
        "Professional presence",
        "Sensitive approach",
      ],
    },
    {
      id: "family",
      title: "Family & Social Events",
      description: "Personal celebrations and gatherings",
      icon: Home,
      details: [
        "Birthdays",
        "Baby Showers",
        "Graduations",
        "Traditional Ceremonies",
        "Family Gatherings",
        "Private Celebrations",
      ],
    },
  ];

  const eventTypes = [
    "Birthday",
    "Baby Shower",
    "Graduation",
    "Traditional Ceremony",
    "Family Gathering",
    "Other",
  ];

  const coverageTiers = [
    {
      tier: 1,
      hours: 2,
      price: 2500,
      pricingPhoto: 1800,
      pricingVideo: 2000,
      pricingCombo: 2500,
      deliverables: [
        "Professional coverage of key moments",
        "Selected highlights edited",
        "Color corrected gallery/video",
        "Digital delivery (web + USB)",
        "Same-day previews via WhatsApp",
      ],
    },
    {
      tier: 2,
      hours: 4,
      price: 5000,
      pricingPhoto: 3500,
      pricingVideo: 4000,
      pricingCombo: 5000,
      deliverables: [
        "Extended comprehensive coverage",
        "Multiple creative angles",
        "Full edited gallery or video",
        "Advanced color grading",
        "Priority delivery within 10 days",
        "Mobile preview gallery",
      ],
    },
    {
      tier: 3,
      hours: 6,
      price: 7500,
      pricingPhoto: 5500,
      pricingVideo: 6500,
      pricingCombo: 7500,
      deliverables: [
        "Complete extended coverage",
        "Cinematic storytelling approach",
        "Priority editing and delivery",
        "45-minute grace period",
        "Expedited delivery within 5 days",
        "Backup equipment on standby",
        "Highlight reel included",
      ],
    },
  ];

  const mediaTypes = [
    {
      id: "photography",
      label: "Photography Only",
      description: "Professional still photography",
      icon: "📸",
    },
    {
      id: "videography",
      label: "Videography Only",
      description: "Cinematic video coverage",
      icon: "🎥",
    },
    {
      id: "combo",
      label: "Photo + Video Combo",
      description: "Complete visual storytelling (Recommended)",
      icon: "✨",
      recommended: true,
    },
  ];

  const handleServiceSelect = (serviceId: string) => {
    if (serviceId === "family") {
      setSelectedService(serviceId);
      setShowPackages(true);
    } else {
      // Navigate to booking for other services
      window.location.href = `/booking?service=visual&category=${serviceId}`;
    }
  };

  if (showPackages && selectedService === "family") {
    return (
      <div className="bg-background text-white min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 mesh-bg opacity-20" />
          <div className="content-width relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-black mb-6 text-gradient">
                Family & Social Events
              </h1>
              <p className="text-xl text-white/70 font-medium">
                Select your event type, coverage time, and media format for the perfect package.
              </p>
            </div>

            {/* Step A: Event Type Selection */}
            <div className="max-w-4xl mx-auto mb-24">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-6 uppercase tracking-tight">
                  <span className="text-red-600">Step 1:</span> Select Event Type
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {eventTypes.map((type) => (
                  <button
                    key={type}
                    className="premium-card h-24 flex items-center justify-center text-center group hover:border-red-600/50"
                  >
                    <span className="text-lg font-bold uppercase tracking-widest">{type}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step B: Coverage Tier Selection */}
            <div className="max-w-6xl mx-auto mb-24">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-6 uppercase tracking-tight">
                  <span className="text-red-600">Step 2:</span> Select Coverage Tier
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {coverageTiers.map((tier) => (
                  <div key={tier.tier} className="premium-card group h-full flex flex-col border-white/5 hover:border-red-600/50">
                    <div className="mb-6">
                      <h3 className="text-2xl font-black text-red-600 mb-2 uppercase tracking-tight">
                        Tier {tier.tier}
                      </h3>
                      <p className="text-4xl font-black text-white mb-2">{tier.hours} Hours</p>
                      <p className="text-sm text-white/50">
                        Perfect for {tier.hours === 2 ? "intimate gatherings" : tier.hours === 4 ? "medium-sized events" : "extensive celebrations"}
                      </p>
                    </div>

                    <div className="space-y-4 mb-12 flex-grow">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600">Deliverables:</p>
                      {tier.deliverables.map((deliverable) => (
                        <div key={deliverable} className="flex items-start gap-3">
                          <Check className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                          <span className="text-xs text-white/70 font-medium">{deliverable}</span>
                        </div>
                      ))}
                    </div>

                    <Button asChild className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-black border-0 rounded-lg uppercase tracking-widest text-[10px]">
                      <Link to={`/booking?service=visual&type=${selectedService}&tier=${tier.tier}&hours=${tier.hours}`}>
                        Select This Tier
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Step C: Media Type Selection */}
            <div className="max-w-6xl mx-auto mb-24">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-6 uppercase tracking-tight">
                  <span className="text-red-600">Step 3:</span> Choose Your Media Format
                </h2>
                <p className="text-white/60 text-lg">
                  Each tier is available in photography, videography, or premium combo format.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {mediaTypes.map((media) => (
                  <div
                    key={media.id}
                    className="premium-card group relative h-full border-white/5 hover:border-red-600/50 transition-all cursor-pointer"
                  >
                    {media.recommended && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-red-600 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                        Recommended
                      </div>
                    )}
                    <div className="text-5xl mb-6">{media.icon}</div>
                    <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">{media.label}</h3>
                    <p className="text-white/60 mb-8 font-medium text-sm leading-relaxed">{media.description}</p>

                    <div className="space-y-4 mb-12">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600">Available with all tiers</p>
                      <div className="space-y-3">
                        {coverageTiers.map((tier) => (
                          <div key={tier.tier} className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/10">
                            <span className="text-xs font-bold">Tier {tier.tier} ({tier.hours}h)</span>
                            <span className="text-red-600 font-black text-sm">
                              R {media.id === "photography" ? tier.pricingPhoto : media.id === "videography" ? tier.pricingVideo : tier.pricingCombo}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button asChild className={`w-full h-12 font-black border rounded-lg uppercase tracking-widest text-[10px] transition-all ${
                      media.recommended
                        ? "bg-red-600 hover:bg-red-700 text-white border-red-600"
                        : "bg-white/5 hover:bg-red-600 text-white border-white/10 hover:border-red-600"
                    }`}>
                      <Link to={`/booking?service=visual&type=${selectedService}&media=${media.id}`}>
                        Select {media.label}
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Back Button */}
            <div className="max-w-4xl mx-auto">
              <Button
                variant="outline"
                onClick={() => setShowPackages(false)}
                className="border-white/10 text-white hover:bg-white/5"
              >
                ← Back to Services
              </Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

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
                  Community Events
                </span>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-8 text-gradient">
              Life's Important Celebrations
            </h1>
            <p className="text-xl text-white/70 font-medium leading-relaxed">
              Professional visual production for personal and family celebrations, ceremonies, and gatherings in Gqeberha. From intimate moments to large celebrations, we document your memories with dignity and artistry.
            </p>
          </div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="section-padding">
        <div className="content-width">
          <div className="grid md:grid-cols-3 gap-10">
            {services.map((service) => (
              <div key={service.id} className="premium-card group h-full">
                <div className="mb-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/5 group-hover:border-red-600/30 group-hover:scale-110 transition-all duration-700">
                  <service.icon className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4 uppercase tracking-tight">{service.title}</h3>
                <p className="text-lg text-white/50 mb-8 font-medium">{service.description}</p>
                <div className="space-y-3 mb-12 flex-grow">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600 mb-4">Includes:</p>
                  {service.details.map((detail) => (
                    <div key={detail} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white/80">
                      <div className="h-1.5 w-1.5 rounded-full bg-red-600 shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => handleServiceSelect(service.id)}
                  className="w-full h-14 bg-white/5 hover:bg-red-600 text-white font-black border border-white/10 hover:border-red-600 transition-all uppercase tracking-widest text-[10px] rounded-full"
                >
                  {service.id === "family" ? "View Packages" : "View Options"} <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-zinc-950">
        <div className="content-width">
          <h2 className="text-center mb-24 text-gradient text-4xl">Why Videography & Photography Coverage?</h2>
          <div className="grid md:grid-cols-2 gap-16 max-w-4xl mx-auto">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-red-600 uppercase">For Celebrations</h3>
              <ul className="space-y-4">
                {[
                  "Capture unscripted moments and genuine emotions",
                  "Professional lighting and composition",
                  "Multiple creative angles and perspectives",
                  "Preserves memories for generations",
                  "Professional editing and color grading",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                    <span className="text-white/80 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-red-600 uppercase">Our Approach</h3>
              <ul className="space-y-4">
                {[
                  "Respectful and discreet documentation",
                  "Understanding of cultural traditions",
                  "Flexible scheduling for your needs",
                  "Professional equipment on standby",
                  "Quick turnaround for edited content",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                    <span className="text-white/80 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="content-width text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-8 text-gradient">Ready to Document Your Celebration?</h2>
          <p className="text-xl text-white/60 mb-12 font-medium">
            Each event is unique. Let's discuss your vision and create a custom package that captures your most important moments.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button asChild className="h-14 px-12 bg-red-600 hover:bg-red-700 text-white font-black rounded-full uppercase tracking-widest text-[10px]">
              <Link to="/contact">Get in Touch</Link>
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

export default CommunityEvents;

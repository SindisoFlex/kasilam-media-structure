import {
  HeroSection,
  AboutSection,
  ServicesSection,
  TrustSection,
  GallerySection,
  ContactSection,
  DemoTheme,
} from "@/components/portfolio/DemoSections";

const theme: DemoTheme = {
  pageBg: "bg-[#f7f3f2]",
  sectionAlt: "bg-[#efe9e7]",
  text: "text-[#2b1f1f]",
  muted: "text-[#5b4a4a]",
  heroText: "text-white",
  heroMuted: "text-white/80",
  heroAccent: "text-[#f5d4a3]",
  accent: "text-[#7a1f2b]",
  accentSoft: "bg-[#7a1f2b]/20 text-[#f5d4a3]",
  cardBg: "bg-white",
  cardBorder: "border-[#dbcfc7]",
  button: "bg-[#7a1f2b] hover:bg-[#641a23]",
  buttonText: "text-white",
  buttonOutline: "border-white/60 text-white hover:bg-white/10",
};

const FuneralHomeDemo = () => (
  <main className="min-h-screen">
    <HeroSection
      theme={theme}
      brand="Eternal Peace Funeral Services"
      badge="Compassionate Guidance"
      headline="Compassionate Funeral Services When You Need Them Most"
      subheadline="We provide dignified, respectful farewells with attentive care for every family. Our team handles every detail so you can focus on honoring your loved one."
      primaryCta="Plan a Service"
      secondaryCta="Speak With Us"
      backgroundImage="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80"
      highlights={["24/7 Support", "Family Liaison Team", "Personalized Memorials"]}
    />
    <AboutSection
      theme={theme}
      title="A Calm, Guided Experience"
      subtitle="About Us"
      body="Eternal Peace Funeral Services offers compassionate support and meticulous planning for every family. We coordinate ceremonies, documentation, and logistics with the respect each life deserves."
      stats={[
        { label: "Families Served", value: "1,200+" },
        { label: "Years of Care", value: "18" },
        { label: "Available", value: "24/7" },
      ]}
    />
    <ServicesSection
      theme={theme}
      title="Comprehensive Funeral Services"
      subtitle="Our Services"
      services={[
        { title: "Burial Services", description: "Traditional ceremonies with full coordination and graveside support." },
        { title: "Cremation Services", description: "Flexible options with memorials tailored to your family." },
        { title: "Memorial Planning", description: "Personalized tributes, programs, and remembrance keepsakes." },
        { title: "Transportation", description: "Professional, timely transport arrangements and escorts." },
      ]}
    />
    <TrustSection
      theme={theme}
      title="Why Families Choose Eternal Peace"
      subtitle="Why Choose Us"
      points={[
        "Dedicated family coordinators for every service.",
        "Transparent planning with respectful pricing options.",
        "Memorial packages designed around your traditions.",
        "Gentle aftercare and grief support resources.",
      ]}
    />
    <GallerySection
      theme={theme}
      title="Thoughtful Memorial Spaces"
      subtitle="Highlights"
      images={[
        "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1523437094842-2ce5c9b1b2b1?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1486591978090-58e619d37fe7?auto=format&fit=crop&w=900&q=80",
      ]}
    />
    <ContactSection
      theme={theme}
      title="We Are Here For You"
      subtitle="Contact"
      phone="+27 41 555 0199"
      email="care@eternalpeace.co.za"
      address="23 Heritage Way, Gqeberha"
    />
  </main>
);

export default FuneralHomeDemo;

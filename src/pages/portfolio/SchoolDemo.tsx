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
  pageBg: "bg-[#f8f9f6]",
  sectionAlt: "bg-[#eef1ea]",
  text: "text-[#1d2b22]",
  muted: "text-[#4c5a52]",
  heroText: "text-white",
  heroMuted: "text-white/80",
  heroAccent: "text-[#f4d58d]",
  accent: "text-[#2f6b4f]",
  accentSoft: "bg-[#2f6b4f]/20 text-[#f4d58d]",
  cardBg: "bg-white",
  cardBorder: "border-[#d5ddd3]",
  button: "bg-[#2f6b4f] hover:bg-[#25573f]",
  buttonText: "text-white",
  buttonOutline: "border-white/60 text-white hover:bg-white/10",
};

const SchoolDemo = () => (
  <main className="min-h-screen">
    <HeroSection
      theme={theme}
      brand="Riverside Community School"
      badge="Community Focused"
      headline="Shaping the Future Through Quality Education"
      subheadline="A nurturing, innovative environment where students grow academically, socially, and creatively. We partner with families to build confident, responsible leaders."
      primaryCta="Explore Admissions"
      secondaryCta="Book a Tour"
      backgroundImage="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1800&q=80"
      highlights={["STEM & Arts", "Safe Campus", "Inclusive Programs"]}
    />
    <AboutSection
      theme={theme}
      title="A School Built Around Community"
      subtitle="About Riverside"
      body="Riverside Community School offers a balanced curriculum with strong academic foundations, creative learning, and mentorship. We celebrate diversity and emphasize student wellbeing."
      stats={[
        { label: "Students", value: "680" },
        { label: "Pass Rate", value: "96%" },
        { label: "Clubs & Sports", value: "24" },
      ]}
    />
    <ServicesSection
      theme={theme}
      title="Programs That Inspire"
      subtitle="Programs"
      services={[
        { title: "Primary School", description: "Foundational literacy, numeracy, and creative exploration." },
        { title: "Middle School", description: "Academic growth with leadership and social development." },
        { title: "Senior School", description: "Career preparation and university readiness." },
        { title: "Aftercare", description: "Safe, structured support beyond school hours." },
      ]}
    />
    <TrustSection
      theme={theme}
      title="Why Families Choose Riverside"
      subtitle="Why Choose Us"
      points={[
        "Qualified educators with a passion for teaching.",
        "Modern classrooms and digital learning resources.",
        "Well-rounded enrichment in sports and arts.",
        "Active parent and community partnerships.",
      ]}
    />
    <GallerySection
      theme={theme}
      title="Life At Riverside"
      subtitle="Highlights"
      images={[
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80",
      ]}
    />
    <ContactSection
      theme={theme}
      title="Join The Riverside Family"
      subtitle="Contact"
      phone="+27 41 555 0266"
      email="admissions@riversideschool.co.za"
      address="120 Riverside Drive, Gqeberha"
    />
  </main>
);

export default SchoolDemo;

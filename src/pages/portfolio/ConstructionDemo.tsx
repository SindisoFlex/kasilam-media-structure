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
  pageBg: "bg-[#f3f5f8]",
  sectionAlt: "bg-[#e8edf2]",
  text: "text-[#0b1b2d]",
  muted: "text-[#4b5b6a]",
  heroText: "text-white",
  heroMuted: "text-white/80",
  heroAccent: "text-white",
  accent: "text-[#f97316]",
  accentSoft: "bg-[#f97316]/20 text-white",
  cardBg: "bg-white",
  cardBorder: "border-[#d0d7df]",
  button: "bg-[#0b1b2d] hover:bg-[#132a45]",
  buttonText: "text-white",
  buttonOutline: "border-white/60 text-white hover:bg-white/10",
};

const ConstructionDemo = () => (
  <main className="min-h-screen">
    <HeroSection
      theme={theme}
      brand="PrimeBuild Construction"
      badge="Licensed & Insured"
      headline="Building Strength, Delivering Results"
      subheadline="PrimeBuild Construction delivers high-quality residential and commercial projects with transparent timelines, expert crews, and dependable project management."
      primaryCta="Request a Quote"
      secondaryCta="View Projects"
      backgroundImage="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1800&q=80"
      highlights={["On-Time Delivery", "Safety First", "Project Transparency"]}
    />
    <AboutSection
      theme={theme}
      title="Reliable Construction Partners"
      subtitle="About PrimeBuild"
      body="We manage projects from concept to completion with certified teams, detailed planning, and clear communication. PrimeBuild is trusted by homeowners, developers, and businesses."
      stats={[
        { label: "Projects Completed", value: "320+" },
        { label: "Years Experience", value: "22" },
        { label: "Safety Record", value: "A+" },
      ]}
    />
    <ServicesSection
      theme={theme}
      title="Construction Services"
      subtitle="Our Services"
      services={[
        { title: "Residential Builds", description: "Custom homes built to your specifications." },
        { title: "Renovations", description: "Modern upgrades and structural improvements." },
        { title: "Commercial Projects", description: "Offices, retail spaces, and industrial facilities." },
        { title: "Project Management", description: "Transparent planning, scheduling, and reporting." },
      ]}
    />
    <TrustSection
      theme={theme}
      title="Why PrimeBuild"
      subtitle="Why Choose Us"
      points={[
        "Dedicated project managers on every site.",
        "Verified contractors and vetted supply partners.",
        "Weekly progress updates and milestone reviews.",
        "Warranty-backed workmanship you can trust.",
      ]}
    />
    <GallerySection
      theme={theme}
      title="Recent Builds"
      subtitle="Highlights"
      images={[
        "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=80",
      ]}
    />
    <ContactSection
      theme={theme}
      title="Start Your Build"
      subtitle="Contact"
      phone="+27 41 555 0622"
      email="projects@primebuild.co.za"
      address="16 Industrial Park, Gqeberha"
    />
  </main>
);

export default ConstructionDemo;

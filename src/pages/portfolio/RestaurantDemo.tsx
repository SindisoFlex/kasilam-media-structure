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
  pageBg: "bg-white",
  sectionAlt: "bg-[#f5f5f5]",
  text: "text-black",
  muted: "text-[#333333]",
  heroText: "text-white",
  heroMuted: "text-white/80",
  heroAccent: "text-white",
  accent: "text-black",
  accentSoft: "bg-white/20 text-white",
  cardBg: "bg-white",
  cardBorder: "border-[#d9d9d9]",
  button: "bg-black hover:bg-[#1a1a1a]",
  buttonText: "text-white",
  buttonOutline: "border-white/60 text-white hover:bg-white/10",
};

const RestaurantDemo = () => (
  <main className="min-h-screen">
    <HeroSection
      theme={theme}
      brand="Urban Table Grill"
      badge="Modern Dining"
      headline="Bold Flavors. Minimalist Atmosphere."
      subheadline="An elevated grill experience with seasonal menus, signature plates, and a sleek, modern setting in the heart of the city."
      primaryCta="Reserve a Table"
      secondaryCta="View Menu"
      backgroundImage="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1800&q=80"
      highlights={["Chef Curated", "Seasonal Menu", "Private Dining"]}
    />
    <AboutSection
      theme={theme}
      title="Crafted For The City"
      subtitle="Our Story"
      body="Urban Table Grill blends minimalist design with a bold culinary philosophy. Every plate is built around fresh ingredients and modern technique."
      stats={[
        { label: "Signature Dishes", value: "24" },
        { label: "Chef Years", value: "15" },
        { label: "Evening Seats", value: "140" },
      ]}
    />
    <ServicesSection
      theme={theme}
      title="Dining Experiences"
      subtitle="What We Offer"
      services={[
        { title: "Featured Dishes", description: "Seasonal plates inspired by global flavors." },
        { title: "Chef Story", description: "Meet the culinary team behind the menu." },
        { title: "Menu Highlights", description: "Signature steaks, seafood, and vegetarian plates." },
        { title: "Reservations", description: "Secure a table for lunch, dinner, or events." },
      ]}
    />
    <TrustSection
      theme={theme}
      title="Why Guests Return"
      subtitle="Why Choose Us"
      points={[
        "Open-kitchen energy with curated ambiance.",
        "Locally sourced produce and premium proteins.",
        "Thoughtful wine and cocktail pairings.",
        "Private dining for celebrations and meetings.",
      ]}
    />
    <GallerySection
      theme={theme}
      title="Signature Moments"
      subtitle="Highlights"
      images={[
        "https://images.unsplash.com/photo-1421622548261-c45bfe178854?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
      ]}
    />
    <ContactSection
      theme={theme}
      title="Plan Your Evening"
      subtitle="Contact"
      phone="+27 41 555 0401"
      email="reservations@urbantablegrill.co.za"
      address="84 Central Square, Gqeberha"
    />
  </main>
);

export default RestaurantDemo;

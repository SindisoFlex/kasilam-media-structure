import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, Camera, Globe, ArrowRight, CheckCircle } from "lucide-react";

const services = [
  {
    id: "audio",
    icon: Mic,
    title: "Audio Production",
    desc: "From studio recording to final master — we deliver professional sound that hits different.",
    items: [
      "Music Recording & Production",
      "Mixing & Mastering",
      "Podcast Production",
      "Sound Design & SFX",
      "Voice-Over Recording",
      "Beat Production",
    ],
  },
  {
    id: "visual",
    icon: Camera,
    title: "Visual Production",
    desc: "Cinematic photography and videography that captures moments and tells stories with impact.",
    items: [
      "Music Videos",
      "Corporate Videos",
      "Event Coverage",
      "Product Photography",
      "Portrait & Lifestyle Shoots",
      "Drone Footage",
    ],
  },
  {
    id: "digital",
    icon: Globe,
    title: "Digital Media Solutions",
    desc: "Modern digital solutions to grow your brand, reach your audience, and streamline your business.",
    items: [
      "Website Design & Development",
      "Social Media Management",
      "Digital Marketing & Ads",
      "Brand Identity & Logo Design",
      "AI-Powered Tools & Automation",
      "Content Strategy",
    ],
  },
];

const Services = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-card py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="animate-fade-in text-4xl font-black md:text-5xl">
            Our <span className="text-primary">Services</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl animate-fade-in text-muted-foreground" style={{ animationDelay: "100ms" }}>
            Three disciplines. One standard — excellence. Explore what we offer.
          </p>
        </div>
      </section>

      {/* Service Sections */}
      {services.map((s, i) => (
        <section key={s.id} id={s.id} className={i % 2 === 0 ? "py-20" : "bg-card py-20"}>
          <div className="container mx-auto px-4">
            <div className="grid items-start gap-10 md:grid-cols-2">
              <div>
                <div className="mb-4 inline-flex rounded-full bg-primary/10 p-3">
                  <s.icon className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold">{s.title}</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">{s.desc}</p>
                <Button asChild size="lg" className="mt-6 gap-2">
                  <Link to="/booking">
                    Get a Quote <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <Card className="border-border">
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {s.items.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm">
                        <CheckCircle className="h-4 w-4 shrink-0 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">Need Something Custom?</h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">
            Every project is unique. Let's discuss exactly what you need.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-8">
            <Link to="/contact">Get In Touch</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Services;

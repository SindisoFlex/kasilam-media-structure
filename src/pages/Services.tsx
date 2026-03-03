import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, Camera, Globe, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Mic,
    title: "Audio Production",
    desc: "From studio recording to final master — we deliver professional sound that hits different.",
    link: "/services/audio-production",
    ready: true,
  },
  {
    icon: Camera,
    title: "Visual Production",
    desc: "Cinematic photography and videography that captures moments and tells stories with impact.",
    link: "/services/visual-production",
    ready: false,
  },
  {
    icon: Globe,
    title: "Digital Media Solutions",
    desc: "Modern digital solutions to grow your brand, reach your audience, and streamline your business.",
    link: "/services/digital-marketing",
    ready: false,
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

      {/* Service Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            {services.map((s, i) => (
              <Card
                key={s.title}
                className="animate-fade-in border-border bg-muted transition-shadow hover:shadow-lg"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <CardContent className="flex flex-col items-start p-8">
                  <div className="mb-4 inline-flex rounded-full bg-primary/10 p-3">
                    <s.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">{s.title}</h2>
                  <p className="mt-3 flex-1 text-muted-foreground leading-relaxed">{s.desc}</p>
                  <Button asChild size="lg" className="mt-6 gap-2" variant={s.ready ? "default" : "outline"}>
                    <Link to={s.link}>
                      {s.ready ? "Explore" : "Coming Soon"} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

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

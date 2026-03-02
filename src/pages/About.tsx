import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Target, Eye, Shield, ArrowRight } from "lucide-react";

const timeline = [
  { year: "2018", title: "The Spark", desc: "A passion for storytelling through sound and image begins." },
  { year: "2019", title: "First Studio", desc: "Built a home studio and started producing for local artists." },
  { year: "2020", title: "Going Digital", desc: "Expanded into web development and digital marketing." },
  { year: "2022", title: "KMP Founded", desc: "Kasilam Media Productions officially launched as a full-service media house." },
  { year: "2024", title: "Growing Impact", desc: "Serving clients across South Africa with premium media solutions." },
];

const values = [
  { icon: Heart, title: "Passion", desc: "Every project is fueled by genuine love for the craft." },
  { icon: Target, title: "Precision", desc: "Attention to detail in every frame, note, and pixel." },
  { icon: Eye, title: "Vision", desc: "We see beyond the brief to create something extraordinary." },
  { icon: Shield, title: "Integrity", desc: "Honest pricing, transparent processes, quality guaranteed." },
];

const About = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-card py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="animate-fade-in text-4xl font-black md:text-5xl">
            About <span className="text-primary">KMP</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl animate-fade-in text-muted-foreground" style={{ animationDelay: "100ms" }}>
            We are Kasilam Media Productions — a community-rooted media house driven by passion, precision, and purpose.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold">Who We Are</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              KMP was born from a simple belief: great media should be accessible to everyone. We combine technical expertise with creative vision to deliver audio, visual, and digital solutions that don't just meet expectations — they exceed them. Based in South Africa, we serve artists, businesses, and brands who demand premium quality without the premium attitude.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-card py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold">Our Journey</h2>
          <div className="mx-auto mt-12 max-w-2xl">
            <div className="relative border-l-2 border-primary/30 pl-8">
              {timeline.map((t, i) => (
                <div key={t.year} className="relative mb-10 last:mb-0">
                  <div className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-2 border-primary bg-background" />
                  <span className="text-sm font-bold text-primary">{t.year}</span>
                  <h3 className="mt-1 text-lg font-semibold">{t.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-primary">Our Mission</h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  To empower individuals and businesses through premium, accessible media production — bridging the gap between vision and reality with every project we deliver.
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-primary">Our Vision</h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  To be the go-to media house in South Africa known for cinematic quality, community impact, and innovative digital solutions that set new standards.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-card py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold">Core Values</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="flex flex-col items-center text-center">
                <div className="mb-3 rounded-full bg-primary/10 p-4">
                  <v.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">{v.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">Let's Work Together</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Ready to bring your project to life? Get in touch or book a session today.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="gap-2">
              <Link to="/booking">Book Now <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

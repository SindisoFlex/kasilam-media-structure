import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Hammer, HardHat, Shield, PhoneCall, Mail, MapPin, Menu, X } from "lucide-react";

const ConstructionDemo = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#f3f5f8] text-[#0b1b2d]">
      <header className="sticky top-0 z-50 border-b border-[#cfd6de] bg-white/95 backdrop-blur">
        <div className="content-width flex items-center justify-between py-5">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.4em] text-[#0b1b2d]">PrimeBuild Construction</p>
          <p className="text-sm text-[#4b5b6a]">Licensed & Insured</p>
        </div>
        <nav className="hidden items-center gap-6 text-xs font-black uppercase tracking-[0.3em] text-[#4b5b6a] md:flex">
          <a href="#home" className="hover:text-[#f97316]">Home</a>
          <a href="#services" className="hover:text-[#f97316]">Services</a>
          <a href="#projects" className="hover:text-[#f97316]">Projects</a>
          <a href="#about" className="hover:text-[#f97316]">About</a>
          <a href="#contact" className="hover:text-[#f97316]">Contact</a>
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Button asChild className="h-10 px-5 text-[10px] font-black uppercase tracking-[0.3em] bg-[#0b1b2d] text-white hover:bg-[#132a45]">
            <Link to="/services/web-development">Back to KMP</Link>
          </Button>
        </div>
        <div className="flex items-center gap-3 md:hidden">
          <Button asChild className="h-9 px-4 text-[10px] font-black uppercase tracking-[0.3em] bg-[#0b1b2d] text-white hover:bg-[#132a45]">
            <Link to="/services/web-development">Back to KMP</Link>
          </Button>
          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#cfd6de] bg-white text-[#0b1b2d] shadow-sm"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="border-t border-[#cfd6de] bg-white md:hidden">
          <nav className="content-width flex flex-col gap-4 py-4 text-xs font-black uppercase tracking-[0.3em] text-[#4b5b6a]">
            {[
              { href: "#home", label: "Home" },
              { href: "#services", label: "Services" },
              { href: "#projects", label: "Projects" },
              { href: "#about", label: "About" },
              { href: "#contact", label: "Contact" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#f97316]"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>

    <section className="border-b border-[#cfd6de] bg-white">
      <div className="content-width flex flex-col gap-4 py-4 text-sm md:flex-row md:items-center md:justify-between">
        <p className="font-black uppercase tracking-[0.2em] text-[#0b1b2d]">
          This is a demo website created by Kasilam Media Productions.
        </p>
        <Button asChild className="h-10 px-5 text-[10px] font-black uppercase tracking-[0.3em] bg-[#0b1b2d] text-white hover:bg-[#132a45]">
          <Link to="/services/web-development">Back to KMP Web Development</Link>
        </Button>
      </div>
    </section>

    <section id="home" className="relative overflow-hidden bg-[#0b1b2d] text-white scroll-mt-24">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center opacity-40" />
      <div className="content-width relative z-10 py-24">
        <p className="text-xs font-black uppercase tracking-[0.4em] text-[#f97316]">Strong. Reliable. On-Time.</p>
        <h1 className="mt-6 text-4xl md:text-6xl font-black">Building strength, delivering results.</h1>
        <p className="mt-6 max-w-2xl text-base md:text-lg text-white/80">
          PrimeBuild delivers high-quality residential and commercial projects with transparent timelines and dependable crews.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button className="h-12 px-8 text-xs font-black uppercase tracking-[0.3em] bg-[#f97316] text-white hover:bg-[#ea6a0b]">Request a Quote</Button>
          <Button variant="outline" className="h-12 px-8 text-xs font-black uppercase tracking-[0.3em] border-white/60 text-white hover:bg-white/10">View Projects</Button>
        </div>
      </div>
    </section>

    <section className="section-padding bg-white">
      <div className="content-width grid gap-6 md:grid-cols-3">
        {[{ icon: Hammer, label: "Projects Completed", value: "320+" }, { icon: HardHat, label: "Certified Crew", value: "48" }, { icon: Shield, label: "Safety Record", value: "A+" }].map((item) => (
          <div key={item.label} className="rounded-3xl border border-[#cfd6de] bg-[#f3f5f8] p-6">
            <item.icon className="h-6 w-6 text-[#f97316]" />
            <p className="mt-4 text-3xl font-black">{item.value}</p>
            <p className="mt-2 text-xs font-black uppercase tracking-[0.3em] text-[#4b5b6a]">{item.label}</p>
          </div>
        ))}
      </div>
    </section>

    <section id="services" className="section-padding bg-[#f3f5f8] scroll-mt-24">
      <div className="content-width space-y-10">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.4em] text-[#f97316]">Services</p>
          <h2 className="mt-4 text-3xl md:text-5xl font-black">Construction services that scale.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Residential Builds", description: "Custom homes built to your specifications." },
            { title: "Renovations", description: "Modern upgrades and structural improvements." },
            { title: "Commercial Projects", description: "Offices, retail spaces, and industrial facilities." },
            { title: "Project Management", description: "Transparent scheduling and reporting." },
          ].map((service) => (
            <div key={service.title} className="rounded-3xl border border-[#cfd6de] bg-white p-6">
              <h3 className="text-lg font-black">{service.title}</h3>
              <p className="mt-3 text-sm text-[#4b5b6a]">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section id="projects" className="section-padding bg-white scroll-mt-24">
      <div className="content-width">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.4em] text-[#f97316]">Projects</p>
            <h2 className="mt-4 text-3xl md:text-5xl font-black">Recent builds.</h2>
          </div>
          <Button variant="outline" className="h-11 px-6 text-xs font-black uppercase tracking-[0.3em] border-[#0b1b2d] text-[#0b1b2d] hover:bg-[#0b1b2d] hover:text-white">Full Portfolio</Button>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {["https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80", "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80", "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=80"].map((img) => (
            <div key={img} className="relative h-56 overflow-hidden rounded-2xl">
              <img src={img} alt="Project" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>

    <section id="about" className="section-padding bg-[#e8edf2] scroll-mt-24">
      <div className="content-width grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.4em] text-[#f97316]">About PrimeBuild</p>
          <h2 className="mt-4 text-3xl md:text-5xl font-black">Reliable construction partners.</h2>
          <p className="mt-4 text-[#4b5b6a]">
            We manage projects from concept to completion with certified teams, detailed planning, and clear communication.
          </p>
        </div>
        <div className="rounded-3xl border border-[#cfd6de] bg-white p-6">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-[#4b5b6a]">Why Clients Choose Us</p>
          <ul className="mt-4 space-y-3 text-sm text-[#4b5b6a]">
            {["Dedicated project managers", "Verified contractors", "Weekly progress updates", "Warranty-backed workmanship"].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[#f97316]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>

    <section id="contact" className="section-padding bg-white scroll-mt-24">
      <div className="content-width grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-[#f97316]">Contact</p>
          <h2 className="text-3xl md:text-5xl font-black">Start your build.</h2>
          <div className="space-y-4 text-sm text-[#4b5b6a]">
            <div className="flex items-center gap-3">
              <PhoneCall className="h-4 w-4 text-[#f97316]" />
              <span>+27 41 555 0622</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-[#f97316]" />
              <span>projects@primebuild.co.za</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-[#f97316]" />
              <span>16 Industrial Park, Gqeberha</span>
            </div>
          </div>
        </div>
        <form className="grid gap-4 rounded-3xl border border-[#cfd6de] bg-[#f3f5f8] p-6">
          <input className="h-12 rounded-xl border border-transparent bg-white px-4 text-sm shadow-sm outline-none focus:border-[#f97316]/30" placeholder="Full name" />
          <input className="h-12 rounded-xl border border-transparent bg-white px-4 text-sm shadow-sm outline-none focus:border-[#f97316]/30" placeholder="Company" />
          <textarea className="min-h-[140px] rounded-xl border border-transparent bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-[#f97316]/30" placeholder="Tell us about your project" />
          <Button className="h-12 text-xs font-black uppercase tracking-[0.3em] bg-[#0b1b2d] hover:bg-[#132a45] text-white">Request Estimate</Button>
        </form>
      </div>
    </section>

    <footer className="border-t border-[#cfd6de] bg-white">
      <div className="content-width grid gap-8 py-12 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.4em] text-[#0b1b2d]">PrimeBuild Construction</p>
          <p className="mt-4 text-sm text-[#4b5b6a]">Residential, commercial, and industrial construction across the Eastern Cape.</p>
        </div>
        <div className="text-sm text-[#4b5b6a]">
          <p>Project Office: Mon-Fri, 8:00 - 17:00</p>
          <p className="mt-2">Safety first. Quality always.</p>
        </div>
      </div>
    </footer>
    </main>
  );
};

export default ConstructionDemo;

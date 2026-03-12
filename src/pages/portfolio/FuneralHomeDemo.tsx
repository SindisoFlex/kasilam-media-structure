import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, PhoneCall, Mail, MapPin, Menu, X } from "lucide-react";

const FuneralHomeDemo = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#f7f4f3] text-[#2b1f1f]">
      <header className="sticky top-0 z-50 border-b border-[#e4d9d5] bg-[#f7f4f3]/95 backdrop-blur">
        <div className="content-width flex items-center justify-between py-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#7a1f2b]">Eternal Peace</p>
          <p className="text-lg font-black text-[#2b1f1f]">Funeral Services</p>
        </div>
        <nav className="hidden items-center gap-6 text-xs font-black uppercase tracking-[0.3em] text-[#5b4a4a] md:flex">
          <a href="#home" className="hover:text-[#7a1f2b]">Home</a>
          <a href="#services" className="hover:text-[#7a1f2b]">Services</a>
          <a href="#packages" className="hover:text-[#7a1f2b]">Funeral Packages</a>
          <a href="#obituaries" className="hover:text-[#7a1f2b]">Obituaries</a>
          <a href="#contact" className="hover:text-[#7a1f2b]">Contact</a>
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Button asChild className="h-10 px-5 text-[10px] font-black uppercase tracking-[0.3em] bg-[#7a1f2b] hover:bg-[#641a23] text-white">
            <Link to="/services/web-development">Back to KMP</Link>
          </Button>
        </div>
        <div className="flex items-center gap-3 md:hidden">
          <Button asChild className="h-9 px-4 text-[10px] font-black uppercase tracking-[0.3em] bg-[#7a1f2b] hover:bg-[#641a23] text-white">
            <Link to="/services/web-development">Back to KMP</Link>
          </Button>
          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#dbcfc7] bg-white text-[#7a1f2b] shadow-sm"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="border-t border-[#e4d9d5] bg-[#f7f4f3] md:hidden">
          <nav className="content-width flex flex-col gap-4 py-4 text-xs font-black uppercase tracking-[0.3em] text-[#5b4a4a]">
            {[
              { href: "#home", label: "Home" },
              { href: "#services", label: "Services" },
              { href: "#packages", label: "Funeral Packages" },
              { href: "#obituaries", label: "Obituaries" },
              { href: "#contact", label: "Contact" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#7a1f2b]"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>

    <section className="border-b border-[#e4d9d5] bg-white">
      <div className="content-width flex flex-col gap-4 py-4 text-sm md:flex-row md:items-center md:justify-between">
        <p className="font-bold uppercase tracking-[0.2em] text-[#7a1f2b]">
          This is a demo website created by Kasilam Media Productions.
        </p>
        <Button asChild className="h-10 px-5 text-[10px] font-black uppercase tracking-[0.3em] bg-[#7a1f2b] hover:bg-[#641a23] text-white">
          <Link to="/services/web-development">Back to KMP Web Development</Link>
        </Button>
      </div>
    </section>

    <section id="home" className="relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      <div className="content-width relative z-10 py-28 text-white">
        <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#f5d4a3]">Compassionate Guidance</p>
        <h1 className="mt-6 text-4xl md:text-6xl font-black leading-[1.05]">A dignified farewell, held with grace.</h1>
        <p className="mt-6 max-w-2xl text-base md:text-lg text-white/80">
          We provide a calm, respectful experience for every family, honoring each life with meticulous care and thoughtful detail.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button className="h-12 px-8 text-xs font-black uppercase tracking-[0.3em] bg-[#7a1f2b] hover:bg-[#641a23] text-white">Plan a Service</Button>
          <Button variant="outline" className="h-12 px-8 text-xs font-black uppercase tracking-[0.3em] border-white/60 text-white hover:bg-white/10">Speak With Us</Button>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {["24/7 Support", "Family Liaison Team", "Personalized Memorials"].map((item) => (
            <div key={item} className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-xs font-bold uppercase tracking-widest">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding bg-[#f7f4f3]">
      <div className="content-width grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#7a1f2b]">About Us</p>
          <h2 className="text-3xl md:text-5xl font-black">A calm, guided experience.</h2>
          <p className="text-[#5b4a4a]">
            Eternal Peace Funeral Services coordinates ceremonies, documentation, and logistics with quiet professionalism so families can focus on remembrance.
          </p>
        </div>
        <div className="grid gap-4">
          {[
            { label: "Families Served", value: "1,200+" },
            { label: "Years of Care", value: "18" },
            { label: "Available", value: "24/7" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-[#dbcfc7] bg-white p-6">
              <p className="text-3xl font-black">{stat.value}</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.3em] text-[#5b4a4a]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section id="services" className="section-padding bg-[#efe9e7] scroll-mt-24">
      <div className="content-width space-y-10">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#7a1f2b]">Services</p>
          <h2 className="mt-4 text-3xl md:text-5xl font-black">Comprehensive funeral services.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { title: "Burial Services", description: "Traditional ceremonies with full coordination and graveside support." },
            { title: "Cremation Services", description: "Flexible options with memorials tailored to your family." },
            { title: "Memorial Planning", description: "Personalized tributes, programs, and remembrance keepsakes." },
            { title: "Transportation", description: "Professional, timely transport arrangements and escorts." },
          ].map((service) => (
            <div key={service.title} className="rounded-3xl border border-[#dbcfc7] bg-white p-6">
              <h3 className="text-lg font-black">{service.title}</h3>
              <p className="mt-3 text-sm text-[#5b4a4a]">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section id="packages" className="section-padding bg-[#f7f4f3] scroll-mt-24">
      <div className="content-width grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#7a1f2b]">Funeral Packages</p>
          <h2 className="mt-4 text-3xl md:text-5xl font-black">Options tailored to every family.</h2>
          <p className="mt-4 text-[#5b4a4a]">Clear, respectful packages designed around your traditions and budget.</p>
        </div>
        <div className="space-y-4">
          {["Traditional Service", "Celebration of Life", "Simple Cremation"].map((pkg) => (
            <div key={pkg} className="flex items-center justify-between rounded-2xl border border-[#dbcfc7] bg-white p-5">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#7a1f2b]">{pkg}</p>
                <p className="mt-2 text-sm text-[#5b4a4a]">Includes planning, coordination, and dedicated family support.</p>
              </div>
              <CheckCircle className="h-5 w-5 text-[#7a1f2b]" />
            </div>
          ))}
        </div>
      </div>
    </section>

    <section id="obituaries" className="section-padding bg-[#efe9e7] scroll-mt-24">
      <div className="content-width">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#7a1f2b]">Obituaries</p>
            <h2 className="mt-4 text-3xl md:text-5xl font-black">Honoring cherished lives.</h2>
          </div>
          <Button variant="outline" className="h-12 px-6 text-xs font-black uppercase tracking-[0.3em] border-[#7a1f2b] text-[#7a1f2b] hover:bg-[#7a1f2b] hover:text-white">View All Notices</Button>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {["Evelyn Jacobs", "Richard Maseko", "Clara Fourie"].map((name) => (
            <div key={name} className="rounded-3xl border border-[#dbcfc7] bg-white p-6">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#7a1f2b]">In Loving Memory</p>
              <h3 className="mt-3 text-lg font-black">{name}</h3>
              <p className="mt-3 text-sm text-[#5b4a4a]">Service details and tributes available for family and friends.</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section id="contact" className="section-padding bg-[#f7f4f3] scroll-mt-24">
      <div className="content-width grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#7a1f2b]">Contact</p>
          <h2 className="text-3xl md:text-5xl font-black">We are here for you.</h2>
          <div className="space-y-4 text-sm text-[#5b4a4a]">
            <div className="flex items-center gap-3">
              <PhoneCall className="h-4 w-4 text-[#7a1f2b]" />
              <span>+27 41 555 0199</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-[#7a1f2b]" />
              <span>care@eternalpeace.co.za</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-[#7a1f2b]" />
              <span>23 Heritage Way, Gqeberha</span>
            </div>
          </div>
        </div>
        <form className="grid gap-4 rounded-3xl border border-[#dbcfc7] bg-white p-6">
          <input className="h-12 rounded-xl border border-transparent bg-[#f7f4f3] px-4 text-sm shadow-sm outline-none focus:border-[#7a1f2b]/30" placeholder="Full name" />
          <input className="h-12 rounded-xl border border-transparent bg-[#f7f4f3] px-4 text-sm shadow-sm outline-none focus:border-[#7a1f2b]/30" placeholder="Email address" type="email" />
          <textarea className="min-h-[140px] rounded-xl border border-transparent bg-[#f7f4f3] px-4 py-3 text-sm shadow-sm outline-none focus:border-[#7a1f2b]/30" placeholder="Share a memory or ask a question" />
          <Button className="h-12 text-xs font-black uppercase tracking-[0.3em] bg-[#7a1f2b] hover:bg-[#641a23] text-white">Send Inquiry</Button>
        </form>
      </div>
    </section>

    <footer className="border-t border-[#e4d9d5] bg-[#f7f4f3]">
      <div className="content-width grid gap-8 py-12 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#7a1f2b]">Eternal Peace Funeral Services</p>
          <p className="mt-4 text-sm text-[#5b4a4a]">Compassionate guidance, respectful ceremonies, and dedicated aftercare.</p>
        </div>
        <div className="text-sm text-[#5b4a4a]">
          <p>24/7 Family Support Line</p>
          <p className="mt-2">Serving Gqeberha and surrounding communities</p>
        </div>
      </div>
    </footer>
    </main>
  );
};

export default FuneralHomeDemo;

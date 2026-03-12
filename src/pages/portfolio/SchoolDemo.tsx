import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendarDays, Star, BookOpen, PhoneCall, Mail, MapPin, Menu, X } from "lucide-react";

const SchoolDemo = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#f6f7f5] text-[#1d2b22]">
      <header className="sticky top-0 z-50 border-b border-[#d8ddd7] bg-white/95 backdrop-blur">
        <div className="content-width flex items-center justify-between py-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#2f6b4f]">Riverside Community School</p>
          <p className="text-lg font-black text-[#1d2b22]">Learning With Purpose</p>
        </div>
        <nav className="hidden items-center gap-6 text-xs font-black uppercase tracking-[0.3em] text-[#4c5a52] md:flex">
          <a href="#home" className="hover:text-[#2f6b4f]">Home</a>
          <a href="#about" className="hover:text-[#2f6b4f]">About School</a>
          <a href="#programs" className="hover:text-[#2f6b4f]">Programs</a>
          <a href="#admissions" className="hover:text-[#2f6b4f]">Admissions</a>
          <a href="#contact" className="hover:text-[#2f6b4f]">Contact</a>
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Button asChild className="h-10 px-5 text-[10px] font-black uppercase tracking-[0.3em] bg-[#2f6b4f] hover:bg-[#25573f] text-white">
            <Link to="/services/web-development">Back to KMP</Link>
          </Button>
        </div>
        <div className="flex items-center gap-3 md:hidden">
          <Button asChild className="h-9 px-4 text-[10px] font-black uppercase tracking-[0.3em] bg-[#2f6b4f] hover:bg-[#25573f] text-white">
            <Link to="/services/web-development">Back to KMP</Link>
          </Button>
          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#d5ddd3] bg-white text-[#2f6b4f] shadow-sm"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="border-t border-[#d8ddd7] bg-white md:hidden">
          <nav className="content-width flex flex-col gap-4 py-4 text-xs font-black uppercase tracking-[0.3em] text-[#4c5a52]">
            {[
              { href: "#home", label: "Home" },
              { href: "#about", label: "About School" },
              { href: "#programs", label: "Programs" },
              { href: "#admissions", label: "Admissions" },
              { href: "#contact", label: "Contact" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#2f6b4f]"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>

    <section className="border-b border-[#d8ddd7] bg-white">
      <div className="content-width flex flex-col gap-4 py-4 text-sm md:flex-row md:items-center md:justify-between">
        <p className="font-bold uppercase tracking-[0.2em] text-[#2f6b4f]">
          This is a demo website created by Kasilam Media Productions.
        </p>
        <Button asChild className="h-10 px-5 text-[10px] font-black uppercase tracking-[0.3em] bg-[#2f6b4f] hover:bg-[#25573f] text-white">
          <Link to="/services/web-development">Back to KMP Web Development</Link>
        </Button>
      </div>
    </section>

    <section id="home" className="relative overflow-hidden bg-[#1d2b22] text-white scroll-mt-24">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center opacity-40" />
      <div className="content-width relative z-10 py-24">
        <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#f4d58d]">Community Focused</p>
        <h1 className="mt-6 text-4xl md:text-6xl font-black">Shaping the future through education.</h1>
        <p className="mt-6 max-w-2xl text-base md:text-lg text-white/80">
          A welcoming environment where students grow academically, socially, and creatively with strong family partnerships.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button className="h-12 px-8 text-xs font-black uppercase tracking-[0.3em] bg-[#f4d58d] text-[#1d2b22] hover:bg-[#f0c55f]">Explore Admissions</Button>
          <Button variant="outline" className="h-12 px-8 text-xs font-black uppercase tracking-[0.3em] border-white/70 text-white hover:bg-white/10">Book a Tour</Button>
        </div>
      </div>
    </section>

    <section className="bg-[#f4efe4] py-6">
      <div className="content-width flex flex-wrap items-center justify-between gap-4 text-sm text-[#1d2b22]">
        <div className="flex items-center gap-3">
          <CalendarDays className="h-4 w-4 text-[#2f6b4f]" />
          <span>Open Day: April 12, 2026</span>
        </div>
        <div className="flex items-center gap-3">
          <Star className="h-4 w-4 text-[#2f6b4f]" />
          <span>2026 Applications Now Open</span>
        </div>
      </div>
    </section>

    <section id="about" className="section-padding bg-white scroll-mt-24">
      <div className="content-width grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-5">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#2f6b4f]">About Riverside</p>
          <h2 className="text-3xl md:text-5xl font-black">A school built around community.</h2>
          <p className="text-[#4c5a52]">
            Riverside offers a balanced curriculum with strong academic foundations, creative learning, and mentorship that supports student wellbeing.
          </p>
        </div>
        <div className="grid gap-4">
          {[
            { label: "Students", value: "680" },
            { label: "Pass Rate", value: "96%" },
            { label: "Clubs & Sports", value: "24" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-[#d5ddd3] bg-[#f6f7f5] p-6">
              <p className="text-3xl font-black">{stat.value}</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.3em] text-[#4c5a52]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section id="programs" className="section-padding bg-[#eef1ea] scroll-mt-24">
      <div className="content-width space-y-10">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#2f6b4f]">Programs</p>
          <h2 className="mt-4 text-3xl md:text-5xl font-black">Learning pathways for every stage.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Primary School", description: "Foundational literacy, numeracy, and creative exploration." },
            { title: "Middle School", description: "Academic growth with leadership and social development." },
            { title: "Senior School", description: "Career preparation and university readiness." },
            { title: "Arts & Culture", description: "Music, drama, and creative expression through projects." },
            { title: "STEM Labs", description: "Hands-on discovery in science, robotics, and coding." },
            { title: "Sports", description: "Athletics, team sports, and wellness programs." },
          ].map((program) => (
            <div key={program.title} className="rounded-3xl border border-[#d5ddd3] bg-white p-6">
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-[#2f6b4f]" />
                <h3 className="text-lg font-black">{program.title}</h3>
              </div>
              <p className="mt-3 text-sm text-[#4c5a52]">{program.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding bg-white">
      <div className="content-width grid gap-8 md:grid-cols-3">
        {[
          { title: "Announcements", items: ["Student council elections", "Science fair entries due", "Parent-teacher evening"] },
          { title: "Student Highlights", items: ["Choir wins regional award", "Robotics team qualifies", "Debate team advances"] },
          { title: "Campus Life", items: ["New library wing", "Community garden", "Aftercare upgrades"] },
        ].map((group) => (
          <div key={group.title} className="rounded-3xl border border-[#d5ddd3] bg-[#f6f7f5] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#2f6b4f]">{group.title}</p>
            <ul className="mt-4 space-y-3 text-sm text-[#4c5a52]">
              {group.items.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#2f6b4f]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>

    <section id="admissions" className="section-padding bg-[#2f6b4f] text-white scroll-mt-24">
      <div className="content-width grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#f4d58d]">Admissions</p>
          <h2 className="mt-4 text-3xl md:text-5xl font-black">Join the Riverside family.</h2>
          <p className="mt-4 text-white/80">Applications for 2026 are open. Schedule a visit and meet our educators.</p>
        </div>
        <div className="rounded-3xl border border-white/15 bg-white/10 p-6">
          <p className="text-sm font-bold uppercase tracking-[0.3em]">Admissions Steps</p>
          <ol className="mt-4 space-y-3 text-sm text-white/80">
            <li>1. Submit online application</li>
            <li>2. Campus tour & interview</li>
            <li>3. Placement confirmation</li>
          </ol>
          <Button className="mt-6 h-12 px-6 text-xs font-black uppercase tracking-[0.3em] bg-[#f4d58d] text-[#1d2b22] hover:bg-[#f0c55f]">Start Application</Button>
        </div>
      </div>
    </section>

    <section id="contact" className="section-padding bg-white scroll-mt-24">
      <div className="content-width grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#2f6b4f]">Contact</p>
          <h2 className="text-3xl md:text-5xl font-black">We would love to meet you.</h2>
          <div className="space-y-4 text-sm text-[#4c5a52]">
            <div className="flex items-center gap-3">
              <PhoneCall className="h-4 w-4 text-[#2f6b4f]" />
              <span>+27 41 555 0266</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-[#2f6b4f]" />
              <span>admissions@riversideschool.co.za</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-[#2f6b4f]" />
              <span>120 Riverside Drive, Gqeberha</span>
            </div>
          </div>
        </div>
        <form className="grid gap-4 rounded-3xl border border-[#d5ddd3] bg-[#f6f7f5] p-6">
          <input className="h-12 rounded-xl border border-transparent bg-white px-4 text-sm shadow-sm outline-none focus:border-[#2f6b4f]/30" placeholder="Parent/Guardian name" />
          <input className="h-12 rounded-xl border border-transparent bg-white px-4 text-sm shadow-sm outline-none focus:border-[#2f6b4f]/30" placeholder="Email address" type="email" />
          <textarea className="min-h-[140px] rounded-xl border border-transparent bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-[#2f6b4f]/30" placeholder="Tell us about your child" />
          <Button className="h-12 text-xs font-black uppercase tracking-[0.3em] bg-[#2f6b4f] hover:bg-[#25573f] text-white">Request Info</Button>
        </form>
      </div>
    </section>

    <footer className="border-t border-[#d8ddd7] bg-white">
      <div className="content-width grid gap-8 py-12 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#2f6b4f]">Riverside Community School</p>
          <p className="mt-4 text-sm text-[#4c5a52]">Educating with care, curiosity, and confidence.</p>
        </div>
        <div className="text-sm text-[#4c5a52]">
          <p>Office Hours: Mon-Fri, 7:30 - 16:30</p>
          <p className="mt-2">Accredited Independent School</p>
        </div>
      </div>
    </footer>
    </main>
  );
};

export default SchoolDemo;

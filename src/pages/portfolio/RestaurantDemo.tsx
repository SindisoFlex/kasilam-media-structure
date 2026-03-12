import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChefHat, Clock, MapPin, Menu, X } from "lucide-react";

const RestaurantDemo = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white text-black">
      <header className="sticky top-0 z-50 border-b border-black/10 bg-white/95 backdrop-blur">
        <div className="content-width flex items-center justify-between py-5">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.4em] text-black">Urban Table Grill</p>
          <p className="text-sm text-black/60">Modern Dining</p>
        </div>
        <nav className="hidden items-center gap-6 text-xs font-black uppercase tracking-[0.3em] text-black/70 md:flex">
          <a href="#home" className="hover:text-black">Home</a>
          <a href="#menu" className="hover:text-black">Menu</a>
          <a href="#chef" className="hover:text-black">Chef</a>
          <a href="#reservations" className="hover:text-black">Reservations</a>
          <a href="#contact" className="hover:text-black">Contact</a>
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Button asChild className="h-10 px-5 text-[10px] font-black uppercase tracking-[0.3em] bg-black text-white hover:bg-black/80">
            <Link to="/services/web-development">Back to KMP</Link>
          </Button>
        </div>
        <div className="flex items-center gap-3 md:hidden">
          <Button asChild className="h-9 px-4 text-[10px] font-black uppercase tracking-[0.3em] bg-black text-white hover:bg-black/80">
            <Link to="/services/web-development">Back to KMP</Link>
          </Button>
          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-black shadow-sm"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="border-t border-black/10 bg-white md:hidden">
          <nav className="content-width flex flex-col gap-4 py-4 text-xs font-black uppercase tracking-[0.3em] text-black/70">
            {[
              { href: "#home", label: "Home" },
              { href: "#menu", label: "Menu" },
              { href: "#chef", label: "Chef" },
              { href: "#reservations", label: "Reservations" },
              { href: "#contact", label: "Contact" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="hover:text-black"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>

    <section className="border-b border-black/10 bg-white">
      <div className="content-width flex flex-col gap-4 py-4 text-sm md:flex-row md:items-center md:justify-between">
        <p className="font-black uppercase tracking-[0.2em] text-black">
          This is a demo website created by Kasilam Media Productions.
        </p>
        <Button asChild className="h-10 px-5 text-[10px] font-black uppercase tracking-[0.3em] bg-black text-white hover:bg-black/80">
          <Link to="/services/web-development">Back to KMP Web Development</Link>
        </Button>
      </div>
    </section>

    <section id="home" className="relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/10" />
      <div className="content-width relative z-10 py-28 text-white">
        <p className="text-xs font-black uppercase tracking-[0.4em]">Modern Dining</p>
        <h1 className="mt-6 text-4xl md:text-6xl font-black leading-[1.05]">Bold flavors. Minimalist atmosphere.</h1>
        <p className="mt-6 max-w-2xl text-base md:text-lg text-white/80">
          An elevated grill experience with seasonal menus, signature plates, and a sleek setting in the heart of the city.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button className="h-12 px-8 text-xs font-black uppercase tracking-[0.3em] bg-white text-black hover:bg-white/80">Reserve a Table</Button>
          <Button variant="outline" className="h-12 px-8 text-xs font-black uppercase tracking-[0.3em] border-white/70 text-white hover:bg-white/10">View Menu</Button>
        </div>
      </div>
    </section>

    <section id="menu" className="section-padding bg-white scroll-mt-24">
      <div className="content-width">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.4em] text-black/70">Menu</p>
            <h2 className="mt-4 text-3xl md:text-5xl font-black">Signature plates.</h2>
          </div>
          <p className="text-sm text-black/60">Seasonal, chef-curated, locally sourced.</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Charcoal Ribeye", description: "Smoked butter, roasted garlic, black pepper jus." },
            { title: "Citrus Salmon", description: "Seared salmon, herb oil, grilled lemon." },
            { title: "Wild Mushroom Gnocchi", description: "Creamed shallots, thyme, parmesan." },
            { title: "Truffle Fries", description: "Sea salt, rosemary, aioli." },
            { title: "Crisp Caesar", description: "Baby gem, aged parmesan, brioche croutons." },
            { title: "Cacao Torte", description: "Dark chocolate, salted cream, cherry." },
          ].map((dish) => (
            <div key={dish.title} className="rounded-3xl border border-black/10 p-6">
              <h3 className="text-lg font-black">{dish.title}</h3>
              <p className="mt-2 text-sm text-black/60">{dish.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding bg-black text-white">
      <div className="content-width grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <p className="text-xs font-black uppercase tracking-[0.4em] text-white/60">Gallery</p>
          <h2 className="text-3xl md:text-5xl font-black">Evening moments.</h2>
          <p className="text-white/70">A sleek, modern dining room with open-kitchen energy.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {["https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80", "https://images.unsplash.com/photo-1421622548261-c45bfe178854?auto=format&fit=crop&w=900&q=80", "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80", "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=900&q=80"].map((img) => (
            <div key={img} className="relative h-48 overflow-hidden rounded-2xl">
              <img src={img} alt="Restaurant" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>

    <section id="chef" className="section-padding bg-white scroll-mt-24">
      <div className="content-width grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl bg-black text-white p-8">
          <ChefHat className="h-8 w-8" />
          <h3 className="mt-4 text-2xl font-black">Chef Amara Nkosi</h3>
          <p className="mt-3 text-sm text-white/70">Signature plates designed around seasonal produce and modern techniques.</p>
          <Button className="mt-6 h-11 px-6 text-xs font-black uppercase tracking-[0.3em] bg-white text-black hover:bg-white/80">Meet the Chef</Button>
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.4em] text-black/70">Our Story</p>
          <h2 className="mt-4 text-3xl md:text-5xl font-black">Minimalist space. Maximum flavor.</h2>
          <p className="mt-4 text-black/60">
            Urban Table Grill pairs a sleek interior with a curated grill menu. Expect bold flavors, open flames, and an elevated evening.
          </p>
        </div>
      </div>
    </section>

    <section id="reservations" className="section-padding bg-[#f5f5f5] scroll-mt-24">
      <div className="content-width grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.4em] text-black/70">Reservations</p>
          <h2 className="mt-4 text-3xl md:text-5xl font-black">Reserve your table.</h2>
          <p className="mt-4 text-black/60">Lunch and dinner reservations available. Private dining upon request.</p>
          <div className="mt-6 space-y-3 text-sm text-black/60">
            <div className="flex items-center gap-3"><Clock className="h-4 w-4" /> Tue-Sun, 12:00 - 23:00</div>
            <div className="flex items-center gap-3"><MapPin className="h-4 w-4" /> 84 Central Square, Gqeberha</div>
          </div>
        </div>
        <form className="grid gap-4 rounded-3xl border border-black/10 bg-white p-6">
          <input className="h-12 rounded-xl border border-transparent bg-[#f5f5f5] px-4 text-sm outline-none focus:border-black/20" placeholder="Full name" />
          <input className="h-12 rounded-xl border border-transparent bg-[#f5f5f5] px-4 text-sm outline-none focus:border-black/20" placeholder="Phone" />
          <input className="h-12 rounded-xl border border-transparent bg-[#f5f5f5] px-4 text-sm outline-none focus:border-black/20" placeholder="Date & time" />
          <Button className="h-12 text-xs font-black uppercase tracking-[0.3em] bg-black text-white hover:bg-black/80">Confirm Reservation</Button>
        </form>
      </div>
    </section>

    <section id="contact" className="section-padding bg-white scroll-mt-24">
      <div className="content-width grid gap-8 md:grid-cols-3">
        <div className="rounded-3xl border border-black/10 p-6">
          <p className="text-xs font-black uppercase tracking-[0.4em] text-black/70">Contact</p>
          <h3 className="mt-4 text-xl font-black">(041) 555-0401</h3>
          <p className="mt-3 text-sm text-black/60">reservations@urbantablegrill.co.za</p>
        </div>
        <div className="rounded-3xl border border-black/10 p-6">
          <p className="text-xs font-black uppercase tracking-[0.4em] text-black/70">Location</p>
          <p className="mt-4 text-sm text-black/60">84 Central Square, Gqeberha</p>
        </div>
        <div className="rounded-3xl border border-black/10 p-6">
          <p className="text-xs font-black uppercase tracking-[0.4em] text-black/70">Private Dining</p>
          <p className="mt-4 text-sm text-black/60">Events and celebrations with a custom menu.</p>
        </div>
      </div>
    </section>

    <footer className="border-t border-black/10 bg-white">
      <div className="content-width flex flex-col gap-4 py-10 text-sm text-black/60 md:flex-row md:items-center md:justify-between">
        <span>Urban Table Grill. Modern dining in Gqeberha.</span>
        <span>Open Tue-Sun. Reservations recommended.</span>
      </div>
    </footer>
    </main>
  );
};

export default RestaurantDemo;

import { Button } from "@/components/ui/button";
import { CheckCircle, PhoneCall, Mail, MapPin } from "lucide-react";
import { useState } from "react";

export type DemoTheme = {
  pageBg: string;
  text: string;
  muted: string;
  heroText: string;
  heroMuted: string;
  heroAccent: string;
  accent: string;
  accentSoft: string;
  cardBg: string;
  cardBorder: string;
  sectionAlt: string;
  button: string;
  buttonText: string;
  buttonOutline: string;
};

type HeroProps = {
  theme: DemoTheme;
  brand: string;
  headline: string;
  subheadline: string;
  primaryCta: string;
  secondaryCta: string;
  backgroundImage: string;
  badge?: string;
  highlights?: string[];
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
};

export const HeroSection = ({
  theme,
  brand,
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  backgroundImage,
  badge,
  highlights = [],
  onPrimaryClick,
  onSecondaryClick,
}: HeroProps) => {
  const scrollToContact = () => {
    const target = document.querySelector("[data-demo-contact]");
    if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className={`relative overflow-hidden ${theme.pageBg}`}>
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
    <div className="content-width relative z-10 py-24 md:py-36 lg:py-44">
      {badge && (
        <div className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] ${theme.accentSoft}`}>
          {badge}
        </div>
      )}
      <p className={`mt-6 text-sm font-bold uppercase tracking-[0.4em] ${theme.heroAccent}`}>
        {brand}
      </p>
      <h1 className={`mt-6 text-4xl md:text-6xl lg:text-7xl font-black leading-[1.05] ${theme.heroText}`}>
        {headline}
      </h1>
      <p className={`mt-6 max-w-2xl text-base md:text-lg ${theme.heroMuted}`}>
        {subheadline}
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Button
          onClick={onPrimaryClick ?? scrollToContact}
          className={`${theme.button} ${theme.buttonText} px-8 py-6 text-xs font-black uppercase tracking-[0.3em]`}
        >
          {primaryCta}
        </Button>
        <Button
          onClick={onSecondaryClick ?? scrollToContact}
          variant="outline"
          className={`${theme.buttonOutline} px-8 py-6 text-xs font-black uppercase tracking-[0.3em]`}
        >
          {secondaryCta}
        </Button>
      </div>
      {highlights.length > 0 && (
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {highlights.map((item) => (
            <div key={item} className={`rounded-2xl border px-4 py-3 text-xs font-bold uppercase tracking-widest ${theme.cardBg} ${theme.cardBorder}`}>
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  </section>
);
};

type SectionHeaderProps = {
  theme: DemoTheme;
  title: string;
  subtitle: string;
  center?: boolean;
};

const SectionHeader = ({ theme, title, subtitle, center }: SectionHeaderProps) => (
  <div className={center ? "text-center" : "text-left"}>
    <p className={`text-xs font-bold uppercase tracking-[0.3em] ${theme.accent}`}>{subtitle}</p>
    <h2 className={`mt-4 text-3xl md:text-5xl font-black ${theme.text}`}>{title}</h2>
  </div>
);

export const AboutSection = ({
  theme,
  title,
  subtitle,
  body,
  stats,
}: {
  theme: DemoTheme;
  title: string;
  subtitle: string;
  body: string;
  stats: { label: string; value: string }[];
}) => (
  <section className={`section-padding ${theme.pageBg}`}>
    <div className="content-width grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-6">
        <SectionHeader theme={theme} title={title} subtitle={subtitle} />
        <p className={`${theme.muted}`}>{body}</p>
      </div>
      <div className="grid gap-4">
        {stats.map((item) => (
          <div key={item.label} className={`rounded-2xl border p-6 ${theme.cardBg} ${theme.cardBorder}`}>
            <p className={`text-3xl font-black ${theme.text}`}>{item.value}</p>
            <p className={`mt-2 text-xs font-bold uppercase tracking-[0.3em] ${theme.muted}`}>{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const ServicesSection = ({
  theme,
  title,
  subtitle,
  services,
}: {
  theme: DemoTheme;
  title: string;
  subtitle: string;
  services: { title: string; description: string }[];
}) => (
  <section className={`section-padding ${theme.sectionAlt}`}>
    <div className="content-width space-y-12">
      <SectionHeader theme={theme} title={title} subtitle={subtitle} center />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <div key={service.title} className={`rounded-3xl border p-6 ${theme.cardBg} ${theme.cardBorder}`}>
            <h3 className={`text-lg font-black ${theme.text}`}>{service.title}</h3>
            <p className={`mt-3 text-sm ${theme.muted}`}>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const TrustSection = ({
  theme,
  title,
  subtitle,
  points,
}: {
  theme: DemoTheme;
  title: string;
  subtitle: string;
  points: string[];
}) => (
  <section className={`section-padding ${theme.pageBg}`}>
    <div className="content-width grid gap-10 lg:grid-cols-[1fr_1fr]">
      <SectionHeader theme={theme} title={title} subtitle={subtitle} />
      <div className="grid gap-4">
        {points.map((point) => (
          <div key={point} className={`flex gap-3 rounded-2xl border p-5 ${theme.cardBg} ${theme.cardBorder}`}>
            <CheckCircle className={`h-5 w-5 ${theme.accent}`} />
            <p className={`${theme.muted}`}>{point}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const GallerySection = ({
  theme,
  title,
  subtitle,
  images,
}: {
  theme: DemoTheme;
  title: string;
  subtitle: string;
  images: string[];
}) => (
  <section className={`section-padding ${theme.sectionAlt}`}>
    <div className="content-width space-y-12">
      <SectionHeader theme={theme} title={title} subtitle={subtitle} />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {images.map((img, index) => (
          <div key={img} className={`relative overflow-hidden rounded-3xl border ${theme.cardBorder}`}>
            <img src={img} alt={`Gallery ${index + 1}`} className="h-64 w-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const ContactSection = ({
  theme,
  title,
  subtitle,
  phone,
  email,
  address,
}: {
  theme: DemoTheme;
  title: string;
  subtitle: string;
  phone: string;
  email: string;
  address: string;
}) => {
  const [name, setName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd handle form submission here
    console.log({ name, contactEmail, message });
    alert("Inquiry sent! (check console for details)");
    setName("");
    setContactEmail("");
    setMessage("");
  };

  return (
    <section className={`section-padding ${theme.pageBg}`} data-demo-contact>
      <div className="content-width grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <SectionHeader theme={theme} title={title} subtitle={subtitle} />
          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <PhoneCall className={`h-4 w-4 ${theme.accent}`} />
              <span className={theme.muted}>{phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className={`h-4 w-4 ${theme.accent}`} />
              <span className={theme.muted}>{email}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className={`h-4 w-4 ${theme.accent}`} />
              <span className={theme.muted}>{address}</span>
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className={`grid gap-4 rounded-3xl border p-6 ${theme.cardBg} ${theme.cardBorder}`}
        >
          <input
            className="h-12 rounded-xl border border-transparent bg-white/80 px-4 text-sm text-black shadow-sm outline-none focus:border-black/20"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="h-12 rounded-xl border border-transparent bg-white/80 px-4 text-sm text-black shadow-sm outline-none focus:border-black/20"
            placeholder="Email address"
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
          />
          <textarea
            className="min-h-[140px] rounded-xl border border-transparent bg-white/80 px-4 py-3 text-sm text-black shadow-sm outline-none focus:border-black/20"
            placeholder="Tell us about your needs"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            type="submit"
            className={`${theme.button} ${theme.buttonText} h-12 text-xs font-black uppercase tracking-[0.3em]`}
          >
            Send Inquiry
          </Button>
        </form>
      </div>
    </section>
  );
};

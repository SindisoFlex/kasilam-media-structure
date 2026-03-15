import { ContactForm } from "@/components/ContactForm";
import { Briefcase, Mail, MapPin, MessageCircle } from "lucide-react";
import { FadeInSection, HeroSection } from "@/components/animations";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <div>
      <section className="relative overflow-hidden section-padding pb-24">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0">
            <img
              src="/contact-hero.svg"
              alt="Digital workspace with laptop and creative dashboards"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/70 to-background z-10" />
          <div className="absolute inset-0 mesh-bg opacity-10 dark:opacity-30" />
        </div>
        
        <div className="content-width relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <HeroSection>
              <div className="mb-10 inline-flex items-center gap-3 rounded-full border border-red-600/30 bg-red-600/10 px-6 py-2 text-xs font-black uppercase tracking-[0.3em] text-red-600">
                Start the Conversation
              </div>
            </HeroSection>
            <HeroSection delay={0.1}>
              <h1 className="text-5xl font-black leading-[0.9] md:text-7xl lg:text-8xl text-foreground tracking-[-0.05em] mb-8 uppercase">
                Start Your <span className="text-gradient">Project</span> Conversation
              </h1>
            </HeroSection>
            <HeroSection delay={0.2}>
              <p className="mt-4 text-lg md:text-2xl text-foreground/70 font-semibold leading-relaxed max-w-3xl mx-auto">
                Tell us about your project and we will help you build the right solution for your business.
              </p>
            </HeroSection>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="content-width">
          <div className="grid gap-8">
            <FadeInSection>
              <div className="flex flex-col gap-4">
                <p className="text-xs font-black uppercase tracking-[0.35em] text-red-600">Contact Options</p>
                <h2 className="text-3xl md:text-4xl font-black text-foreground uppercase tracking-tight">
                  Choose Your Preferred Way to Reach Us
                </h2>
              </div>
            </FadeInSection>
            <div className="grid gap-6 md:grid-cols-3">
              <FadeInSection delay={0.05}>
                <a
                  href="#project-inquiry"
                  className="premium-card p-8 flex flex-col gap-4 bg-background transition-all hover:border-red-600/30"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600/10 text-red-600">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-lg font-black text-foreground">Email Inquiry</p>
                    <p className="text-sm text-foreground/70">
                      Share a detailed brief using the form and we will respond with next steps.
                    </p>
                  </div>
                </a>
              </FadeInSection>
              <FadeInSection delay={0.1}>
                <a
                  href="https://wa.me/27732238078"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="premium-card p-8 flex flex-col gap-4 bg-background transition-all hover:border-red-600/30"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600/10 text-red-600">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-lg font-black text-foreground">Direct WhatsApp Message</p>
                    <p className="text-sm text-foreground/70">
                      Start a quick conversation to see if we are a fit.
                    </p>
                  </div>
                </a>
              </FadeInSection>
              <FadeInSection delay={0.15}>
                <a
                  href="#project-inquiry"
                  className="premium-card p-8 flex flex-col gap-4 bg-background transition-all hover:border-red-600/30"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600/10 text-red-600">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-lg font-black text-foreground">Project Consultation Request</p>
                    <p className="text-sm text-foreground/70">
                      Book a discovery call to shape the best plan for your goals.
                    </p>
                  </div>
                </a>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="content-width">
          <div className="grid gap-16 lg:grid-cols-2">
            <FadeInSection>
              <div className="premium-card p-10 bg-background" id="project-inquiry">
                <div className="mb-8">
                  <p className="text-xs font-black uppercase tracking-[0.35em] text-red-600 mb-3">
                    Project Inquiry Form
                  </p>
                  <h2 className="text-3xl font-black text-foreground uppercase tracking-tighter">
                    Tell Us About Your Project
                  </h2>
                  <p className="mt-4 text-sm font-semibold text-foreground/70">
                    Most project inquiries receive a response within 24 hours.
                  </p>
                </div>
                <ContactForm />
              </div>
            </FadeInSection>

            <div className="flex flex-col gap-8">
              <FadeInSection delay={0.1}>
                <div className="premium-card p-10 bg-background">
                  <p className="text-xs font-black uppercase tracking-[0.35em] text-red-600 mb-3">
                    What Happens Next
                  </p>
                  <h2 className="text-3xl font-black text-foreground uppercase tracking-tighter mb-6">
                    A Clear, Simple Process
                  </h2>
                  <div className="grid gap-4">
                    {[
                      "Request review",
                      "Response within 24 hours",
                      "Consultation discussion",
                      "Project proposal",
                    ].map((step, index) => (
                      <div
                        key={step}
                        className="flex items-start gap-4 rounded-2xl border border-foreground/10 bg-foreground/5 p-4"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white text-sm font-black">
                          {index + 1}
                        </div>
                        <div className="pt-1">
                          <p className="text-base font-semibold text-foreground">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeInSection>

              <FadeInSection delay={0.15}>
                <div className="premium-card p-10 bg-background">
                  <p className="text-xs font-black uppercase tracking-[0.35em] text-red-600 mb-3">
                    Local Presence
                  </p>
                  <h3 className="text-2xl font-black text-foreground uppercase tracking-tighter mb-4">
                    Based in South Africa
                  </h3>
                  <p className="text-sm font-semibold text-foreground/70 mb-6">
                    Serving businesses in Port Elizabeth (Gqeberha), across the Eastern Cape, and throughout South Africa.
                  </p>
                  <div className="relative h-40 overflow-hidden rounded-2xl border border-foreground/10 bg-gradient-to-br from-foreground/5 via-background to-foreground/5">
                    <div className="absolute inset-0 grid grid-cols-6 gap-2 opacity-40">
                      {Array.from({ length: 24 }).map((_, index) => (
                        <div key={index} className="h-full border border-foreground/10" />
                      ))}
                    </div>
                    <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-background/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-foreground shadow-lg">
                      <MapPin className="h-4 w-4 text-red-600" />
                      Eastern Cape
                    </div>
                    <div className="absolute left-[48%] top-[58%] h-3 w-3 rounded-full bg-red-600 shadow-[0_0_20px_rgba(225,29,46,0.6)]" />
                  </div>
                </div>
              </FadeInSection>
            </div>
          </div>

          <FadeInSection delay={0.2} className="mt-16">
            <div className="p-10 rounded-3xl bg-red-600 text-white flex flex-col items-center text-center gap-6 shadow-2xl shadow-red-600/20">
              <h3 className="text-2xl font-black uppercase tracking-tighter">Ready to Start?</h3>
              <p className="text-xs font-bold uppercase tracking-widest opacity-80 leading-relaxed">
                Skip the form and jump straight into our scheduling system.
              </p>
              <Button className="w-full max-w-md h-16 bg-white text-red-600 hover:bg-white/90 font-black uppercase tracking-[0.3em] rounded-xl transition-all">
                View Availability
              </Button>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
};

export default Contact;

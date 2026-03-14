import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Send, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { FadeInSection, HeroSection, StaggerContainer, StaggerItem } from "@/components/animations";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "", _honeypot: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple spam protection
    if (form._honeypot) {
      console.log("Spam detected");
      return;
    }

    setIsSubmitting(true);

    try {
      // Using Formspree as a secure backend to hide the actual email address
      // The email sindisototo@hotmail.com is handled on the Formspree side
      // For maximum security, the user should replace 'mailto:sindisototo@hotmail.com' 
      // with a Formspree Form ID (e.g., https://formspree.io/f/xknkyvoz)
      const response = await fetch("https://formspree.io/f/xknkyvoz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message
        })
      });

      if (response.ok) {
        toast({ 
          title: "Message sent!", 
          description: "Thank you for reaching out. We'll get back to you soon.",
          variant: "default"
        });
        setForm({ name: "", email: "", message: "", _honeypot: "" });
      } else {
        const data = await response.json();
        throw new Error(data.error || "Failed to send message");
      }
    } catch (error) {
      toast({ 
        title: "Submission failed", 
        description: "There was an error sending your message. Please try again later or contact us via WhatsApp.",
        variant: "destructive"
      });
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <section className="relative overflow-hidden section-padding pb-32">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background z-10" />
          <div className="absolute inset-0 mesh-bg opacity-20 dark:opacity-40" />
        </div>
        
        <div className="content-width relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <HeroSection>
              <div className="mb-10 inline-flex items-center gap-3 rounded-full border border-red-600/30 bg-red-600/10 px-6 py-2 text-xs font-black uppercase tracking-[0.3em] text-red-600 animate-pulse">
                Connect With Us
              </div>
            </HeroSection>
            <HeroSection delay={0.1}>
              <h1 className="text-5xl font-black leading-[0.85] md:text-8xl lg:text-9xl text-foreground tracking-[-0.06em] mb-12 uppercase">
                Get In <span className="text-gradient">Touch</span>
              </h1>
            </HeroSection>
            <HeroSection delay={0.2}>
              <p className="mt-8 text-xl md:text-2xl text-foreground/50 font-bold uppercase tracking-widest leading-relaxed max-w-3xl mx-auto">
                Have a project in mind? Let's build something extraordinary together.
              </p>
            </HeroSection>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="content-width">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Form */}
            <FadeInSection>
              <div className="premium-card p-10 bg-background">
                <h2 className="text-3xl font-black text-foreground mb-8 uppercase tracking-tighter">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Honeypot Field (Hidden from users) */}
                  <div className="hidden">
                    <Label htmlFor="_honeypot">Leave this field empty</Label>
                    <Input
                      id="_honeypot"
                      name="_honeypot"
                      value={form._honeypot}
                      onChange={(e) => setForm({ ...form, _honeypot: e.target.value })}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/50">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      required
                      className="h-16 bg-foreground/5 border-foreground/5 focus:border-red-600/50 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/50">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      required
                      className="h-16 bg-foreground/5 border-foreground/5 focus:border-red-600/50 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/50">Project Details</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about your project..."
                      rows={5}
                      required
                      className="bg-foreground/5 border-foreground/5 focus:border-red-600/50 rounded-xl"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    size="lg" 
                    variant="red"
                    disabled={isSubmitting}
                    className="w-full h-20 text-xs font-black rounded-xl uppercase tracking-[0.4em] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"} <Send className="h-4 w-4 ml-4" />
                  </Button>
                </form>
              </div>
            </FadeInSection>

            {/* Connect */}
            <div className="flex flex-col gap-10">
              <FadeInSection delay={0.1}>
                <h2 className="text-3xl font-black text-foreground mb-8 uppercase tracking-tighter">Reach Us Directly</h2>
                <div className="grid gap-6">
                  <a
                    href="https://wa.me/27732238078"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="premium-card p-8 flex items-center gap-8 group hover:border-red-600/30 transition-all bg-background"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600/10 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
                      <MessageCircle className="h-7 w-7" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30 mb-1">WhatsApp</p>
                      <p className="text-xl font-black text-foreground uppercase tracking-tight">Chat with us</p>
                    </div>
                  </a>

                  <div className="premium-card p-8 flex items-center gap-8 bg-background">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-foreground/5 text-foreground/50">
                      <MapPin className="h-7 w-7" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30 mb-1">Our Studio</p>
                      <p className="text-base font-bold text-foreground/80 uppercase tracking-tight leading-tight">
                        6034 NTONGELA STREET<br />KWAZAKHELE, PORT ELIZABETH
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <a
                      href="#"
                      className="premium-card p-6 flex flex-col items-center text-center gap-4 group hover:border-red-600/30 transition-all bg-background"
                    >
                      <Facebook className="h-6 w-6 text-foreground/30 group-hover:text-red-600 transition-colors" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30">Facebook</span>
                    </a>
                    <a
                      href="#"
                      className="premium-card p-6 flex flex-col items-center text-center gap-4 group hover:border-red-600/30 transition-all bg-background"
                    >
                      <Instagram className="h-6 w-6 text-foreground/30 group-hover:text-red-600 transition-colors" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30">Instagram</span>
                    </a>
                  </div>
                </div>
              </FadeInSection>

              <FadeInSection delay={0.2} className="mt-auto">
                <div className="p-10 rounded-3xl bg-red-600 text-white flex flex-col items-center text-center gap-6 shadow-2xl shadow-red-600/20">
                  <h3 className="text-2xl font-black uppercase tracking-tighter">Ready to Start?</h3>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-80 leading-relaxed">
                    Skip the form and jump straight into our scheduling system.
                  </p>
                  <Button className="w-full h-16 bg-white text-red-600 hover:bg-white/90 font-black uppercase tracking-[0.3em] rounded-xl transition-all hover:scale-105 active:scale-95">
                    View Availability
                  </Button>
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

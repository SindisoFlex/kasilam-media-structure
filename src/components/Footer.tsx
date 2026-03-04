import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import logo from "@/images/kmp.svg";

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-card py-20 lg:py-32">
      <div className="content-width">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block transition-opacity hover:opacity-80 mb-6">
              <img src={logo} alt="KMP Logo" className="h-10 w-auto" />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed font-medium">
              Kasilam Media Productions — where sound, vision, and digital innovation converge to tell stories that resonate.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-6 text-xs font-black uppercase tracking-[0.2em] text-primary">Explore</h4>
            <div className="flex flex-col gap-4">
              {["Home", "About", "Services", "Contact", "Booking"].map((link) => (
                <Link
                  key={link}
                  to={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                  className="text-sm font-semibold transition-colors hover:text-primary w-fit"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div>
            <h4 className="mb-6 text-xs font-black uppercase tracking-[0.2em] text-primary">Connect</h4>
            <div className="flex flex-col gap-4">
              <a href="https://wa.me/27000000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-semibold transition-all hover:text-primary w-fit group">
                <MessageCircle className="h-4 w-4 transition-transform group-hover:scale-110" /> WhatsApp
              </a>
              {["Facebook", "Instagram", "LinkedIn"].map((social) => (
                <a
                  key={social}
                  href={`https://${social.toLowerCase()}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold transition-colors hover:text-primary w-fit"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 lg:mt-32 pt-10 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/60">
          <div>© {new Date().getFullYear()} Kasilam Media Productions</div>
          <div className="flex gap-8">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

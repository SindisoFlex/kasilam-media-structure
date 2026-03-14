import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import logo from "@/images/kmp.svg";

const Footer = () => {
  return (
    <footer className="border-t border-foreground/5 bg-background py-32">
      <div className="content-width">
        <div className="grid gap-20 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block transition-transform hover:scale-105 mb-10">
              <img src={logo} alt="KMP Logo" className="h-14 w-auto" />
            </Link>
            <p className="max-w-md text-base leading-relaxed font-semibold text-muted-foreground uppercase tracking-widest opacity-60">
              Creative media solutions for real stories, bold creators, and growing brands.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-10 text-[10px] font-black uppercase tracking-[0.4em] text-red-600">Explore</h4>
            <div className="flex flex-col gap-6">
              {["Home", "About", "Services", "Contact", "Booking"].map((link) => (
                <Link
                  key={link}
                  to={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                  className="text-xs font-black uppercase tracking-widest transition-all hover:text-red-600 w-fit"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div>
            <h4 className="mb-10 text-[10px] font-black uppercase tracking-[0.4em] text-red-600">Connect</h4>
            <div className="flex flex-col gap-6">
              <a href="https://wa.me/27000000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-xs font-black uppercase tracking-widest transition-all hover:text-red-600 w-fit group">
                <MessageCircle className="h-4 w-4 transition-transform group-hover:scale-110 group-hover:rotate-12" /> WhatsApp
              </a>
              {["Facebook", "Instagram", "LinkedIn"].map((social) => (
                <a
                  key={social}
                  href={`https://${social.toLowerCase()}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-black uppercase tracking-widest transition-all hover:text-red-600 w-fit"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-32 pt-12 border-t border-foreground/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.4em] text-foreground/20">
          <div>© {new Date().getFullYear()} Kasilam Media Productions</div>
          <div className="flex gap-10">
            <Link to="/privacy" className="hover:text-red-600 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-red-600 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

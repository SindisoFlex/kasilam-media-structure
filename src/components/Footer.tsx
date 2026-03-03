import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import logo from "@/images/kmp.svg";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <img src={logo} alt="KMP Logo" className="h-10 w-auto" />
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Kasilam Media Productions — Premium audio, visual, and digital media solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-sm transition-colors hover:text-primary">Home</Link>
              <Link to="/about" className="text-sm transition-colors hover:text-primary">About</Link>
              <Link to="/services" className="text-sm transition-colors hover:text-primary">Services</Link>
              <Link to="/contact" className="text-sm transition-colors hover:text-primary">Contact</Link>
              <Link to="/booking" className="text-sm transition-colors hover:text-primary">Book Now</Link>
            </div>
          </div>

          {/* Socials */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Connect</h4>
            <div className="flex flex-col gap-2">
              <a href="https://wa.me/27000000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm transition-colors hover:text-primary">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-sm transition-colors hover:text-primary">
                Facebook
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-sm transition-colors hover:text-primary">
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Kasilam Media Productions. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

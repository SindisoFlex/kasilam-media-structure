import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";
import logo from "@/images/kmp.svg";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  {
    label: "Services",
    path: "/services",
    children: [
      { label: "Audio Production", path: "/services/audio-production" },
      { label: "Visual Production", path: "/services/visual-production" },
      { label: "Digital Media Solutions", path: "/services/digital-marketing" },
    ],
  },
  { label: "Portfolio", path: "/portfolio" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const isParentActive = (children: any[]) => children.some(child => isActive(child.path));

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/60 backdrop-blur-2xl">
      <div className="content-width flex h-24 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <img src={logo} alt="KMP Logo" className="h-12 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) =>
            link.children ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setDesktopDropdown(true)}
                onMouseLeave={() => setDesktopDropdown(false)}
              >
                <button
                  className={cn(
                    "flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.3em] transition-all hover:text-red-500",
                    (isActive(link.path) || isParentActive(link.children)) ? "text-red-600" : "text-foreground/70"
                  )}
                >
                  {link.label}
                  <ChevronDown className={cn("h-3.5 w-3.5 opacity-50 transition-transform duration-500", desktopDropdown && "rotate-180")} />
                </button>
                {desktopDropdown && (
                  <div className="absolute left-1/2 top-full -translate-x-1/2 pt-6">
                    <div className="animate-scale-in rounded-[1.5rem] border border-white/5 bg-black/95 p-3 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] min-w-[280px] backdrop-blur-3xl">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.path}
                          className={cn(
                            "block rounded-xl px-5 py-4 text-[10px] font-black uppercase tracking-widest transition-all hover:bg-white/5 hover:text-red-500",
                            isActive(child.path) ? "text-red-600 bg-white/5" : "text-white/50"
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.label}
                to={link.path}
                className={cn(
                  "text-[11px] font-black uppercase tracking-[0.3em] transition-all hover:text-red-500",
                  isActive(link.path) ? "text-red-600" : "text-foreground/70"
                )}
              >
                {link.label}
              </Link>
            )
          )}

          {/* Desktop Theme Toggle */}
          <div className="h-4 w-px bg-white/10 mx-2" />
          <button
            onClick={toggleTheme}
            className="rounded-full p-3 transition-all hover:bg-white/5 hover:text-red-500 hover:scale-110 active:scale-90"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-full p-2.5 transition-colors hover:bg-white/5 md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Slide-in Menu */}
      <div
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-[85%] max-w-sm flex-col bg-black/95 backdrop-blur-3xl border-l border-white/5 shadow-2xl transition-transform duration-500 ease-in-out md:hidden",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-white/5 px-8 py-6">
          <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
            <img src={logo} alt="KMP Logo" className="h-8 w-auto" />
          </Link>
          <button onClick={() => setMobileOpen(false)} className="rounded-full p-2 hover:bg-white/5 transition-colors" aria-label="Close menu">
            <X className="h-6 w-6 text-white" />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-4 px-8 py-10 overflow-y-auto">
          {navLinks.map((link, i) =>
            link.children ? (
              <div key={link.label} className="animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-2xl px-5 py-4 text-xl font-black uppercase tracking-tight transition-colors hover:bg-white/5 hover:text-red-500",
                    (isActive(link.path) || isParentActive(link.children)) ? "text-red-600" : "text-white"
                  )}
                >
                  {link.label}
                  <ChevronDown className={cn("h-5 w-5 opacity-40 transition-transform", servicesOpen && "rotate-180")} />
                </button>
                {servicesOpen && (
                  <div className="mt-2 ml-4 flex flex-col gap-2 border-l border-red-600/30 pl-6">
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.path}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "rounded-xl px-4 py-3 text-sm font-bold transition-all hover:text-red-500",
                          isActive(child.path) ? "text-red-600" : "text-white/50"
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "animate-fade-in rounded-2xl px-5 py-4 text-xl font-black uppercase tracking-tight transition-colors hover:bg-white/5 hover:text-red-500",
                  isActive(link.path) ? "text-red-600" : "text-white"
                )}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        <div className="border-t border-white/5 px-8 py-10">
          <button
            onClick={toggleTheme}
            className="flex w-full items-center justify-between rounded-2xl bg-white/5 px-6 py-5 text-sm font-black uppercase tracking-widest transition-all active:scale-[0.98]"
          >
            <span className="flex items-center gap-4 text-white">
              {theme === "dark" ? <Sun className="h-5 w-5 text-red-500" /> : <Moon className="h-5 w-5 text-red-500" />}
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </span>
            <div className="h-2 w-2 rounded-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,1)]" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


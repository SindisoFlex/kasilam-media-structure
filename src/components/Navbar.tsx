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

const mobileLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Audio Production", path: "/services/audio-production", indent: true },
  { label: "Visual Production", path: "/services/visual-production", indent: true },
  { label: "Digital Media Solutions", path: "/services/digital-marketing", indent: true },
  { label: "Portfolio", path: "/portfolio" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const isParentActive = (children: any[]) => children.some(child => isActive(child.path));

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/30 bg-background/60 backdrop-blur-2xl">
      <div className="content-width relative flex h-24 items-center justify-between">
        {/* Left: Logo */}
        <Link to="/" className="flex-shrink-0 transition-transform hover:scale-105">
          <img src={logo} alt="KMP Logo" className="h-12 w-auto" />
        </Link>

        {/* Center: Desktop Nav (absolute centered) */}
        <div className="hidden md:flex items-center gap-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
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
                    "flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.3em] transition-all hover:text-primary",
                    (isActive(link.path) || isParentActive(link.children)) ? "text-primary" : "text-foreground/70"
                  )}
                >
                  {link.label}
                  <ChevronDown className={cn("h-3.5 w-3.5 opacity-50 transition-transform duration-500", desktopDropdown && "rotate-180")} />
                </button>
                {desktopDropdown && (
                  <div className="absolute left-1/2 top-full -translate-x-1/2 pt-6">
                    <div className="animate-scale-in rounded-[1.5rem] border border-border bg-popover p-3 shadow-xl min-w-[280px] backdrop-blur-3xl">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.path}
                          className={cn(
                            "block rounded-xl px-5 py-4 text-[10px] font-black uppercase tracking-widest transition-all hover:bg-accent hover:text-primary",
                            isActive(child.path) ? "text-primary bg-accent" : "text-muted-foreground"
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
                  "text-[11px] font-black uppercase tracking-[0.3em] transition-all hover:text-primary",
                  isActive(link.path) ? "text-primary" : "text-foreground/70"
                )}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Right: Theme Toggle + Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="rounded-full p-3 transition-all hover:bg-accent hover:text-primary hover:scale-110 active:scale-90"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-full p-2.5 transition-colors hover:bg-accent md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/60 backdrop-blur-md md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Slide-in Menu */}
      <div
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-[85%] max-w-sm flex-col bg-background border-l border-border shadow-2xl transition-transform duration-500 ease-in-out md:hidden",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-8 py-6">
          <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
            <img src={logo} alt="KMP Logo" className="h-8 w-auto" />
          </Link>
          <button onClick={() => setMobileOpen(false)} className="rounded-full p-2 hover:bg-accent transition-colors" aria-label="Close menu">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-1 px-6 py-8 overflow-y-auto">
          {mobileLinks.map((link, i) => (
            <Link
              key={link.label}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "animate-fade-in rounded-xl px-5 py-4 transition-colors hover:bg-accent hover:text-primary",
                link.indent
                  ? "ml-4 text-sm font-bold text-muted-foreground"
                  : "text-lg font-black uppercase tracking-tight text-foreground",
                isActive(link.path) && "text-primary bg-accent"
              )}
              style={{ animationDelay: `${i * 40}ms` }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="border-t border-border px-8 py-8">
          <button
            onClick={toggleTheme}
            className="flex w-full items-center justify-between rounded-2xl bg-accent px-6 py-5 text-sm font-black uppercase tracking-widest transition-all active:scale-[0.98]"
          >
            <span className="flex items-center gap-4 text-foreground">
              {theme === "dark" ? <Sun className="h-5 w-5 text-primary" /> : <Moon className="h-5 w-5 text-primary" />}
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </span>
            <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

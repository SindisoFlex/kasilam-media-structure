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
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="container mx-auto flex h-20 items-center justify-between px-6 md:px-12">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <img src={logo} alt="KMP Logo" className="h-10 w-auto" />
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
                    "flex items-center gap-1.5 text-sm font-semibold tracking-wide transition-colors hover:text-primary",
                    isActive(link.path) && "text-primary"
                  )}
                >
                  {link.label}
                  <ChevronDown className={cn("h-3.5 w-3.5 opacity-50 transition-transform", desktopDropdown && "rotate-180")} />
                </button>
                {desktopDropdown && (
                  <div className="absolute left-1/2 top-full -translate-x-1/2 pt-4">
                    <div className="animate-scale-in rounded-xl border border-border/50 bg-popover p-2 shadow-2xl min-w-[240px] ring-1 ring-black/5">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.path}
                          className="block rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-primary"
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
                  "text-sm font-semibold tracking-wide transition-colors hover:text-primary",
                  isActive(link.path) && "text-primary"
                )}
              >
                {link.label}
              </Link>
            )
          )}

          {/* Desktop Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="rounded-full p-2.5 transition-all hover:bg-accent hover:scale-110 active:scale-90"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-5 w-5 text-primary" /> : <Moon className="h-5 w-5 text-primary" />}
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-full p-2.5 transition-colors hover:bg-accent md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Slide-in Menu */}
      <div
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-4/5 max-w-sm flex-col bg-background/95 backdrop-blur-2xl border-l border-border/50 shadow-2xl transition-transform duration-500 ease-in-out md:hidden",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-border/50 px-6 py-6">
          <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
            <img src={logo} alt="KMP Logo" className="h-8 w-auto" />
          </Link>
          <button onClick={() => setMobileOpen(false)} className="rounded-full p-2 hover:bg-accent transition-colors" aria-label="Close menu">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-2 px-6 py-10 overflow-y-auto">
          {navLinks.map((link, i) =>
            link.children ? (
              <div key={link.label} className="animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl px-4 py-4 text-lg font-bold transition-colors hover:bg-accent/50 hover:text-primary",
                    isActive(link.path) && "text-primary"
                  )}
                >
                  {link.label}
                  <ChevronDown className={cn("h-4 w-4 opacity-50 transition-transform", servicesOpen && "rotate-180")} />
                </button>
                {servicesOpen && (
                  <div className="mt-2 ml-4 flex flex-col gap-1 border-l border-primary/20 pl-4">
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.path}
                        onClick={() => setMobileOpen(false)}
                        className="rounded-lg px-4 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary hover:bg-accent/30"
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
                  "animate-fade-in rounded-xl px-4 py-4 text-lg font-bold transition-colors hover:bg-accent/50 hover:text-primary",
                  isActive(link.path) && "text-primary"
                )}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        <div className="border-t border-border/50 px-6 py-8">
          <button
            onClick={toggleTheme}
            className="flex w-full items-center gap-4 rounded-xl px-4 py-4 text-sm font-bold transition-all hover:bg-accent active:scale-[0.98]"
          >
            <div className="rounded-full bg-primary/10 p-2">
              {theme === "dark" ? <Sun className="h-5 w-5 text-primary" /> : <Moon className="h-5 w-5 text-primary" />}
            </div>
            {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

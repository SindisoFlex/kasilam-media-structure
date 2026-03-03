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
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="KMP Logo" className="h-8 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
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
                    "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary",
                    isActive(link.path) && "text-primary"
                  )}
                >
                  {link.label}
                  <ChevronDown className={cn("h-4 w-4 transition-transform", desktopDropdown && "rotate-180")} />
                </button>
                {desktopDropdown && (
                  <div className="absolute left-1/2 top-full -translate-x-1/2 pt-2">
                    <div className="animate-scale-in rounded-md border border-border bg-popover p-2 shadow-lg min-w-[220px]">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.path}
                          className="block rounded-sm px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-primary"
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
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive(link.path) && "text-primary"
                )}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Desktop Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="hidden rounded-full p-2 transition-colors hover:bg-accent md:block"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-md p-2 md:hidden"
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
          "fixed right-0 top-0 z-50 flex h-full w-4/5 max-w-sm flex-col bg-background border-l border-border shadow-2xl transition-transform duration-300 md:hidden",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-4">
          <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
            <img src={logo} alt="KMP Logo" className="h-7 w-auto" />
          </Link>
          <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-1 px-4 py-6">
          {navLinks.map((link, i) =>
            link.children ? (
              <div key={link.label} className="animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-md px-3 py-3 text-base font-medium transition-colors hover:text-primary",
                    isActive(link.path) && "text-primary"
                  )}
                >
                  {link.label}
                  <ChevronDown className={cn("h-4 w-4 transition-transform", servicesOpen && "rotate-180")} />
                </button>
                {servicesOpen && (
                  <div className="ml-4 flex flex-col gap-1 border-l border-border pl-4">
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.path}
                        onClick={() => setMobileOpen(false)}
                        className="rounded-md px-3 py-2 text-sm transition-colors hover:text-primary"
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
                  "animate-fade-in rounded-md px-3 py-3 text-base font-medium transition-colors hover:text-primary",
                  isActive(link.path) && "text-primary"
                )}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        <div className="border-t border-border px-4 py-4">
          <button
            onClick={toggleTheme}
            className="flex w-full items-center gap-3 rounded-md px-3 py-3 text-sm font-medium transition-colors hover:bg-accent"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

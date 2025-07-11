import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Music,
  Mail,
  Headphones,
  Users,
  Camera,
  FileText,
  Home,
  Menu,
  X,
  Play,
} from "lucide-react";
import { cn, rafThrottle } from "@/utils";
import { SCROLL_THRESHOLD, EXTERNAL_LINKS, APP_CONFIG } from "@/constants";
import type { NavLink } from "@/types";

const NAV_LINKS: NavLink[] = [
  // Internal pages first
  {
    to: "/",
    href: "/",
    label: "Home",
    icon: Home,
    gradientHover: "hover:from-artistic-fog hover:to-white",
  },
  {
    to: "/bio",
    href: "/bio",
    label: "Bio",
    icon: FileText,
    gradientHover: "hover:from-artistic-fog hover:to-white",
  },
  {
    to: "/music",
    href: "/music",
    label: "Music",
    icon: Music,
    gradientHover: "hover:from-artistic-ash hover:to-artistic-silver",
  },
  {
    to: "/gallery",
    href: "/gallery",
    label: "Gallery",
    icon: Camera,
    gradientHover: "hover:from-artistic-mercury hover:to-artistic-platinum",
  },
  {
    to: "/contact",
    href: "/contact",
    label: "Contact",
    icon: Mail,
    gradientHover: "hover:from-artistic-fog hover:to-white",
  },
  // External links
  {
    href: EXTERNAL_LINKS.youtube,
    label: "YouTube",
    icon: Play,
    gradientHover: "hover:from-red-400 hover:to-red-600",
  },
  {
    href: EXTERNAL_LINKS.spotify,
    label: "Spotify",
    icon: Music,
    gradientHover: "hover:from-artistic-ash hover:to-artistic-silver",
  },
  {
    href: EXTERNAL_LINKS.instagram,
    label: "Instagram",
    icon: Camera,
    gradientHover: "hover:from-artistic-mercury hover:to-artistic-platinum",
  },
];

// Mobile navigation button component
const MobileNavButton = memo<{ link: NavLink; onClose: () => void }>(
  ({ link, onClose }) => {
    const location = useLocation();
    const isActive = link.to && location.pathname === link.to;
    const Icon = link.icon;

    const handleClick = useCallback(() => {
      onClose();
    }, [onClose]);

    if (link.href && !link.to) {
      return (
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className={cn(
            "flex items-center space-x-3 px-6 py-4 text-white hover:bg-white/10 transition-all duration-300 border-b border-white/10",
            "touch-manipulation",
          )}
        >
          <Icon className="h-5 w-5" />
          <span className="text-lg font-medium uppercase font-['Montserrat']">
            {link.label}
          </span>
        </a>
      );
    }

    return (
      <Link
        to={link.to!}
        onClick={handleClick}
        className={cn(
          "flex items-center space-x-3 px-6 py-4 transition-all duration-300 border-b border-white/10 touch-manipulation",
          isActive
            ? "bg-white/20 text-white font-semibold"
            : "text-white hover:bg-white/10",
        )}
      >
        <Icon className="h-5 w-5" />
        <span className="text-lg font-medium uppercase font-['Montserrat']">
          {link.label}
        </span>
      </Link>
    );
  },
);

MobileNavButton.displayName = "MobileNavButton";

// Desktop navigation button component
const DesktopNavButton = memo<{ link: NavLink }>(({ link }) => {
  const location = useLocation();
  const isActive = link.to && location.pathname === link.to;
  const Icon = link.icon;

  if (link.href && !link.to) {
    return (
      <Button
        asChild
        variant="ghost"
        size="sm"
        className={cn(
          "text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300",
          "px-1.5 py-1 text-xs sm:text-xs font-medium uppercase font-['Montserrat'] min-h-[44px]",
        )}
      >
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${link.label}`}
        >
          <Icon className="h-2.5 w-2.5 mr-1" />
          {link.label}
        </a>
      </Button>
    );
  }

  return (
    <Button
      asChild
      variant="ghost"
      size="sm"
      className={cn(
        "transition-all duration-300 px-1.5 py-1 text-xs font-medium uppercase font-['Montserrat']",
        isActive
          ? "text-white bg-white/20 hover:bg-white/30"
          : "text-white/80 hover:text-white hover:bg-white/10",
      )}
    >
      <Link to={link.to!} aria-label={`Navigate to ${link.label}`}>
        <Icon className="h-2.5 w-2.5 mr-1" />
        {link.label}
      </Link>
    </Button>
  );
});

DesktopNavButton.displayName = "DesktopNavButton";

// Main Navigation component
export const Navigation = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll detection
  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > SCROLL_THRESHOLD;
    setIsScrolled(scrolled);
  }, []);

  const throttledScrollHandler = useMemo(
    () => rafThrottle(handleScroll),
    [handleScroll],
  );

  useEffect(() => {
    window.addEventListener("scroll", throttledScrollHandler, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", throttledScrollHandler);
  }, [throttledScrollHandler]);

  // Mobile menu handlers
  const openMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "unset";
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen, closeMobileMenu]);

  // Memoize navigation class names
  const navClassName = useMemo(
    () =>
      cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-black/60 backdrop-blur-xl border-b border-white/10 shadow-2xl"
          : "bg-transparent",
      ),
    [isScrolled],
  );

  // Memoize logo class name
  const logoClassName = useMemo(
    () =>
      cn(
        "font-bold text-2xl font-black tracking-wider uppercase",
        "bg-gradient-to-r from-white via-artistic-pearl to-artistic-silver",
        "bg-clip-text text-transparent hover:scale-105",
        "transition-transform duration-300 drop-shadow-lg",
        "font-['Montserrat']",
      ),
    [],
  );

  return (
    <>
      <nav className={navClassName}>
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo - Left Side */}
            <Link
              to="/"
              className="flex items-center space-x-3 text-white hover:text-white/80 transition-all duration-300 group ml-4 lg:ml-16"
              aria-label={`${APP_CONFIG.name} Homepage`}
            >
              <span className={logoClassName}>{APP_CONFIG.name}</span>
            </Link>

            {/* Desktop Navigation - Right Side */}
            <nav
              className="hidden lg:flex items-center space-x-0.5 mr-8"
              role="navigation"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map((link) => (
                <DesktopNavButton key={link.label} link={link} />
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={openMobileMenu}
              className="lg:hidden p-2 text-white hover:text-white/80 transition-colors touch-manipulation mr-4"
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[60] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeMobileMenu}
          />

          {/* Menu Panel */}
          <div className="absolute top-0 right-0 w-80 max-w-[85vw] h-full bg-black/95 backdrop-blur-xl border-l border-white/10 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <span className="text-white font-semibold text-lg">Menu</span>
              <button
                onClick={closeMobileMenu}
                className="p-2 text-white hover:text-white/80 transition-colors touch-manipulation"
                aria-label="Close navigation menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="py-4" role="navigation">
              {NAV_LINKS.map((link) => (
                <MobileNavButton
                  key={link.label}
                  link={link}
                  onClose={closeMobileMenu}
                />
              ))}
            </nav>

            {/* Footer */}
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-white/60 text-sm text-center">
                {APP_CONFIG.tagline}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

Navigation.displayName = "Navigation";

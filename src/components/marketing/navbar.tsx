"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Menu, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MarketingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMobileMenuOpen(false);
      };
      window.addEventListener("keydown", handleEscape);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleEscape);
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Product", href: "#solution" },
    { label: "Features", href: "#features" },
    { label: "CRM", href: "#crm" },
    { label: "Finance", href: "#finance" },
    { label: "AI Intelligence", href: "#ai" },
    { label: "Solutions", href: "#solutions" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
          scrolled || mobileMenuOpen
            ? "bg-[#F7F9FB]/95 backdrop-blur-md border-b border-[#E3E9EF] shadow-[0_1px_2px_0_rgba(16,24,32,0.03)] py-3"
            : "bg-transparent border-b border-transparent py-4 sm:py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group select-none">
              <div className="w-8 h-8 rounded-lg bg-[#101820] flex items-center justify-center text-[#F7F9FB] font-bold text-sm tracking-tight shadow-2xs group-hover:bg-[#17232D] transition-colors">
                N
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-[#17212B] tracking-tight">
                  Nexora
                </span>
                <span className="hidden sm:inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#EBF3FC] text-[#2F80ED] border border-[#C4DEFA]">
                  Business OS
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 text-[13px] font-medium text-[#667482]">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:text-[#17212B] transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-[#2F80ED] after:absolute after:bottom-0 after:left-0 after:transition-all"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <Link href="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#667482] hover:text-[#17212B] text-xs font-semibold"
                >
                  Sign in
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  variant="dark"
                  size="sm"
                  className="text-xs font-semibold shadow-2xs"
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Hamburger (accessible 44px touch target) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-lg text-[#17212B] hover:bg-[#F0F4F8] transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-[#E3E9EF] px-5 pt-3 pb-6 space-y-3 shadow-xl max-h-[calc(100vh-60px)] overflow-y-auto">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3.5 py-2.5 text-xs font-medium text-[#17212B] hover:bg-[#F7F9FB] rounded-lg flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-[#667482]" />
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-[#E3E9EF] flex flex-col gap-2">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="md" className="w-full justify-center text-xs h-10">
                  Sign in
                </Button>
              </Link>
              <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="dark" size="md" className="w-full justify-center text-xs h-10">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Backdrop for mobile drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-[#101820]/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}

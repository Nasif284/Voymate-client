"use client";

import { useState } from "react";
import Link from "next/link";
import { Compass, Menu, X, ArrowRight } from "lucide-react";

export default function LandingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#f7faf6]/85 backdrop-blur-md border-b border-[#bec9c3]/20 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#005440] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#a0f3d4]" />
          </div>
          <span className="font-headline font-black text-xl sm:text-2xl tracking-tight text-[#181d1a]">
            Voymate
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-sm font-medium text-[#3f4944] hover:text-[#005440] transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-[#3f4944] hover:text-[#005440] transition-colors"
          >
            How It Works
          </a>
          <a
            href="#community-trips"
            className="text-sm font-medium text-[#3f4944] hover:text-[#005440] transition-colors"
          >
            Community Trips
          </a>
          <a
            href="#safety"
            className="text-sm font-medium text-[#3f4944] hover:text-[#005440] transition-colors"
          >
            Safety & Trust
          </a>
          <a
            href="#faq"
            className="text-sm font-medium text-[#3f4944] hover:text-[#005440] transition-colors"
          >
            FAQ
          </a>
        </nav>

        {/* Desktop Auth CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-semibold text-[#181d1a] hover:text-[#005440] px-4 py-2 transition-colors"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-[#005440] hover:bg-[#0f6e56] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all shadow-xs active:scale-95"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4 text-[#a0f3d4]" />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <Link
            href="/login"
            className="text-xs font-semibold text-[#005440] px-3 py-1.5 rounded-lg border border-[#005440]/20"
          >
            Log In
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 text-[#181d1a] rounded-lg hover:bg-[#ebefeb] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#bec9c3]/20 bg-[#f7faf6] px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-3">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-[#3f4944] py-1"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-[#3f4944] py-1"
            >
              How It Works
            </a>
            <a
              href="#community-trips"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-[#3f4944] py-1"
            >
              Community Trips
            </a>
            <a
              href="#safety"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-[#3f4944] py-1"
            >
              Safety & Trust
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-[#3f4944] py-1"
            >
              FAQ
            </a>
          </nav>

          <div className="pt-3 border-t border-[#bec9c3]/20 flex flex-col gap-2">
            <Link
              href="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-[#005440] text-white text-sm font-semibold py-3 rounded-xl shadow-xs"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 text-[#a0f3d4]" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

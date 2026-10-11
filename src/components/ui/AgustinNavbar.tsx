"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

export default function AgustinNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-4 bg-black/85 backdrop-blur-md border-b border-white/10"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-10 flex items-center justify-between">
        {/* Agustin-style Pill Brand Mark */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="px-3.5 py-1 rounded-full border border-white/30 text-xs font-mono uppercase tracking-wider text-white group-hover:border-white transition-colors">
            Ameer Hamza <span className="txt-cursive lowercase font-normal">portfolio</span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs uppercase tracking-widest text-neutral-400 hover:text-white transition-colors relative py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA & Socials */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noreferrer"
            className="text-neutral-400 hover:text-white transition-colors"
            title="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-neutral-400 hover:text-white transition-colors"
            title="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            className="group flex items-center gap-1.5 px-4 py-2 rounded-full border border-white text-white text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-all"
          >
            <span>Let&apos;s talk</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-neutral-300 hover:text-white p-1"
          aria-label="Toggle navigation"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 px-8 py-6 space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base uppercase tracking-wider text-neutral-300 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <div className="flex gap-4">
              <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white">
                <GithubIcon className="w-4 h-4" />
              </a>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white">
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-2 rounded-full border border-white text-white text-xs uppercase tracking-wider"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

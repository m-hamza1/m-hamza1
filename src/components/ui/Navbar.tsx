"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { PERSONAL_INFO } from "@/data/portfolioData";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "py-3.5 bg-neutral-950/85 backdrop-blur-md border-b border-white/[0.08]"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Brand */}
        <a href="#hero" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center font-semibold text-white text-xs group-hover:border-white/30 transition-colors">
            MH
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-sm text-neutral-100 group-hover:text-white transition-colors">
              {PERSONAL_INFO.name}
            </span>
            <span className="text-[11px] text-neutral-500">
              Senior Full-Stack &amp; Mobile
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-medium text-neutral-400 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-colors"
            title="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-colors"
            title="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white text-neutral-950 font-medium text-xs hover:bg-neutral-200 transition-colors"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-neutral-400 hover:text-white"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-neutral-950/95 backdrop-blur-xl px-6 py-5 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 text-sm text-neutral-300 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg text-neutral-400 hover:text-white"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg text-neutral-400 hover:text-white"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-2 rounded-lg bg-white text-neutral-950 font-medium text-xs"
            >
              Get in Touch
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

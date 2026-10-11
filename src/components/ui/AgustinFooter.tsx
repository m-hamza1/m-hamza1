"use client";

import React, { useState, useEffect } from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

export default function AgustinFooter() {
  const [currentYear, setCurrentYear] = useState<number>(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/10 bg-black py-10 sm:py-16 text-neutral-400 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-5 sm:px-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 pb-8 sm:pb-12 border-b border-white/10">
          {/* Brand & Title */}
          <div>
            <div className="text-white text-base font-semibold tracking-tight">
              {PERSONAL_INFO.name}
            </div>
            <div className="text-neutral-500 mt-1">
              Based in Gujranwala, PK &bull; Senior Full-Stack &amp; DevOps &bull; Available Remotely Worldwide
            </div>
          </div>

          {/* Center Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs uppercase tracking-widest text-neutral-400">
            <a href="#work" className="hover:text-white transition-colors">Work</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-4">
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
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2.5 rounded-full border border-white/20 text-neutral-400 hover:text-white hover:border-white transition-colors cursor-pointer"
              title="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px]">
          <div>
            &copy; {currentYear} {PERSONAL_INFO.name}. All rights reserved.
          </div>
          <div>
            Next.js &bull; TypeScript &bull; Three.js &bull; Tailwind CSS
          </div>
        </div>
      </div>
    </footer>
  );
}

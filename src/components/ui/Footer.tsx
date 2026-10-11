"use client";

import React, { useState, useEffect } from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { soundFx } from "@/lib/audio";
import { ArrowUp, Mail, Shield } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number>(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/90 backdrop-blur-md pt-12 pb-10 text-slate-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-850">
          {/* Brand info */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 p-[1px]">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-bold text-white font-mono text-sm">
                MH
              </div>
            </div>
            <div>
              <div className="font-bold text-white text-sm">
                Ameer Hamza
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Senior Full-Stack &amp; Mobile Engineer • Google &amp; Microsoft Craftsmanship
              </div>
            </div>
          </div>

          {/* Realtime Node Status */}
          <div className="flex items-center gap-4 text-[11px]">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400">All Clusters Operational</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-slate-500">
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>SOC-2 &amp; OWASP Compliant</span>
            </div>
          </div>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundFx.playClick()}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-white hover:border-slate-700 transition-colors"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundFx.playClick()}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-white hover:border-slate-700 transition-colors"
              title="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              onClick={() => soundFx.playClick()}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-white hover:border-slate-700 transition-colors"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 transition-all ml-2"
              title="Return to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500 text-center sm:text-left">
          <div>
            &copy; {currentYear} Ameer Hamza. Built with Next.js 16, Three.js &amp; TypeScript.
          </div>
          <div className="flex items-center gap-1">
            <span>Engineered with strict DRY, SOLID &amp; Clean Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import React from "react";
import HeroCanvas3D from "@/components/canvas/HeroCanvas3D";
import { ArrowUpRight } from "lucide-react";

export default function AgustinHero() {
  return (
    <section id="hero" className="relative min-h-[85vh] md:min-h-[95vh] flex flex-col justify-center pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-40 md:pb-32 overflow-hidden bg-black">
      {/* 3D Interactive Spatial Canvas in Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-auto opacity-75 md:opacity-85">
        <HeroCanvas3D className="w-full h-full" />
        {/* Subtle vignette gradient overlay to ensure perfect typography legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 pointer-events-none" />
      </div>

      {/* Editorial Content on Top */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-10 w-full pointer-events-none">

        {/* Massive Editorial Header (Agustin Burgos Signature) */}
        <div className="space-y-0.5 sm:space-y-1 mb-6 sm:mb-10 md:mb-14 select-none">
          {/* Row 1 */}
          <div className="flex flex-wrap items-baseline gap-x-3 sm:gap-x-6 text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tighter text-white uppercase leading-[0.95]">
            <span className="txt-cursive lowercase font-normal text-neutral-400 text-3xl sm:text-5xl md:text-7xl lg:text-8xl">
              I&apos;m a
            </span>
            <span className="drop-shadow-sm">Full-stack</span>
          </div>

          {/* Row 2 */}
          <div className="flex flex-wrap items-baseline gap-x-3 sm:gap-x-6 text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tighter text-white uppercase leading-[0.95]">
            <span className="drop-shadow-sm">Developer</span>
            <span className="txt-cursive lowercase font-normal text-neutral-400 text-3xl sm:text-5xl md:text-7xl lg:text-8xl">
              &amp;
            </span>
          </div>

          {/* Row 3 */}
          <div className="flex flex-wrap items-baseline gap-x-3 sm:gap-x-6 text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tighter text-white uppercase leading-[0.95]">
            <span className="drop-shadow-sm">DevOps</span>
            <span className="text-neutral-500 drop-shadow-sm">Specialist</span>
          </div>
        </div>

        {/* Intro Statement & Direct CTAs */}
        <div className="max-w-3xl space-y-4 sm:space-y-6 md:space-y-8 pt-5 sm:pt-8 border-t border-white/10">
          <p className="text-base sm:text-xl md:text-2xl text-neutral-200 font-light leading-relaxed tracking-tight">
            I build custom <strong className="font-semibold text-white">ERPs &amp; internal dashboards</strong> that replace messy spreadsheets with automated workflows. Specializing in <strong className="font-semibold text-white">Laravel</strong>, modern <strong className="font-semibold text-white">React &amp; Next.js</strong> architectures, and <strong className="font-semibold text-white">AI automation</strong> for international clients remotely worldwide.
          </p>

          {/* Action Buttons: perfectly balanced side-by-side on mobile, elegant on desktop */}
          <div className="flex flex-row items-center gap-3 pt-2 w-full max-w-md sm:max-w-none pointer-events-auto">
            <a
              href="#work"
              className="flex-1 sm:flex-initial group inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white text-black font-semibold text-xs sm:text-sm uppercase tracking-wider hover:bg-neutral-200 transition-all shadow-xl active:scale-[0.98] text-center whitespace-nowrap"
            >
              <span>Selected Work</span>
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-black" />
              </div>
            </a>

            <a
              href="#contact"
              className="flex-1 sm:flex-initial group inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-7 py-3 sm:py-3.5 rounded-full border border-white/30 bg-white/5 backdrop-blur-sm text-white font-semibold text-xs sm:text-sm uppercase tracking-wider hover:border-white hover:bg-white/10 transition-all active:scale-[0.98] text-center whitespace-nowrap"
            >
              <span>Contact</span>
              <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

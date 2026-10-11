"use client";

import React from "react";
import HeroCanvas3D from "@/components/canvas/HeroCanvas3D";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { ArrowDown, ArrowUpRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[88vh] flex items-center pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Human Corporate Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Simple Availability line */}
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Available Remotely Worldwide</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.12]">
              Senior Full-Stack &amp; Mobile Engineer.
            </h1>

            {/* Subtitle / Bio */}
            <p className="text-base sm:text-lg text-neutral-300 max-w-xl font-normal leading-relaxed">
              I&apos;m <span className="text-white font-medium">{PERSONAL_INFO.name}</span>. Over the past 5+ years, I&apos;ve engineered high-throughput web platforms, offline-first mobile applications, and low-latency real-time systems with an emphasis on clean architecture and maintainability.
            </p>

            {/* Tech stack inline */}
            <div className="text-xs font-mono text-neutral-400 pt-1">
              <span className="text-neutral-500">Core Technologies: </span>
              Next.js, TypeScript, Flutter, React Native, Node.js, WebRTC, SQLite
            </div>

            {/* Direct Corporate CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <a
                href="#projects"
                className="px-5 py-2.5 rounded-lg bg-white text-neutral-950 font-medium text-xs hover:bg-neutral-200 transition-colors inline-flex items-center gap-1.5"
              >
                <span>View Selected Work</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>
              <a
                href="#contact"
                className="px-5 py-2.5 rounded-lg bg-neutral-900 border border-white/10 text-neutral-200 font-medium text-xs hover:bg-neutral-850 hover:border-white/20 transition-colors inline-flex items-center gap-1.5"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: 3D Interactive Canvas */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <HeroCanvas3D className="w-full max-w-[440px]" />
          </div>
        </div>
      </div>
    </section>
  );
}

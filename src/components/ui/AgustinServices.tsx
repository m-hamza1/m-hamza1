"use client";

import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";

export default function AgustinServices() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const services = [
    {
      num: "01",
      title: "Custom ERPs & Laravel Backends",
      category: "Internal Dashboards & Automated Workflows",
      description: "Architecting custom ERP systems, administrative portals, and internal dashboards that replace messy spreadsheets with automated workflows. Developing secure Laravel REST APIs, inventory/billing engines, and AI/LLM automation pipelines.",
      stack: ["Laravel", "PHP", "Custom ERPs", "AI Automation", "MySQL", "REST APIs"],
    },
    {
      num: "02",
      title: "React.js & Next.js Full-Stack",
      category: "Modern Web Interfaces & SSR",
      description: "Engineering responsive, fast, and scalable web frontends using React.js and Next.js (App Router). Building type-safe component architectures with TypeScript, Tailwind CSS, clean state management, and optimized Core Web Vitals.",
      stack: ["React.js", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"],
    },
    {
      num: "03",
      title: "Server Deployments & DevOps",
      category: "cPanel, Linux VPS & Cloud",
      description: "Managing complete production deployments and server configurations. Setting up Linux VPS instances, cPanel hosting, Nginx and Apache reverse proxies, SSH operations, SSL certificates, DNS routing, and automated GitHub Actions CI/CD pipelines.",
      stack: ["cPanel", "Linux / SSH", "Nginx", "VPS / Cloud", "SSL & DNS", "CI/CD"],
    },
    {
      num: "04",
      title: "Mobile App Development",
      category: "Cross-Platform & Offline-First",
      description: "Building production mobile applications for Android and iOS using Flutter and Dart. Implementing offline-first SQLite local persistence, automatic data syncing, and native hardware features with fluid 60fps UX.",
      stack: ["Flutter", "Dart", "SQLite", "Riverpod", "Offline Sync"],
    },
  ];

  return (
    <section id="services" className="py-12 sm:py-20 md:py-32 border-t border-white/10 bg-black">
      <div className="max-w-7xl mx-auto px-5 sm:px-10">
        {/* Section Header */}
        <div className="mb-8 sm:mb-14 md:mb-20">
          <div className="text-3xl sm:text-5xl md:text-7xl font-semibold tracking-tighter text-white uppercase leading-[0.95]">
            <span className="txt-cursive lowercase font-normal text-neutral-400 text-3xl sm:text-5xl md:text-6xl mr-3">
              where
            </span>
            <span>expertise</span>
            <br />
            <span className="txt-cursive lowercase font-normal text-neutral-400 text-3xl sm:text-5xl md:text-6xl mr-3">
              meets
            </span>
            <span className="text-neutral-400">innovation</span>
          </div>
        </div>

        {/* Services List (Agustin Burgos Horizontal Accordion/Card Style) */}
        <div className="divide-y divide-white/10 border-y border-white/10">
          {services.map((service, idx) => (
            <div
              key={service.num}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="py-6 sm:py-10 md:py-14 transition-colors duration-300 group"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-baseline">
                {/* Number */}
                <div className="md:col-span-1 text-sm font-mono text-neutral-500 group-hover:text-white transition-colors">
                  {service.num}
                </div>

                {/* Service Title */}
                <div className="md:col-span-4">
                  <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight group-hover:translate-x-1 transition-transform">
                    {service.title}
                  </h3>
                  <div className="text-xs uppercase tracking-widest text-neutral-500 mt-1">
                    {service.category}
                  </div>
                </div>

                {/* Description */}
                <div className="md:col-span-5">
                  <p className="text-sm sm:text-base text-neutral-400 leading-relaxed font-light">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {service.stack.map((item) => (
                      <span
                        key={item}
                        className="text-xs font-mono px-2.5 py-1 rounded-full border border-white/10 text-neutral-400"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow indicator */}
                <div className="md:col-span-2 flex justify-start md:justify-end items-center">
                  <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-neutral-400 group-hover:border-white group-hover:text-white group-hover:bg-white group-hover:text-black transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

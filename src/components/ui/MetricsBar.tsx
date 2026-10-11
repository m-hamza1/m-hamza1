"use client";

import React from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";

export default function MetricsBar() {
  return (
    <section className="relative z-10 py-10 border-y border-white/[0.08] bg-neutral-950/60">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {PERSONAL_INFO.stats.map((stat) => (
            <div key={stat.label} className="space-y-1">
              <div className="text-2xl sm:text-3xl font-semibold text-white tracking-tight font-mono">
                {stat.value}
              </div>
              <div className="text-xs text-neutral-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

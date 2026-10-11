"use client";

import React from "react";

export default function AboutSection() {
  const principles = [
    {
      title: "Clean Architecture & Low Coupling",
      description: "Isolating business domain logic from UI presentation and database adapters keeps applications maintainable, testable, and adaptable as requirements evolve.",
    },
    {
      title: "Offline-First Mobile Architecture",
      description: "Designing mobile apps with local persistence and sync queues so core workflows stay fast and reliable even under poor network conditions.",
    },
    {
      title: "Type Safety & Production Discipline",
      description: "Leveraging strict TypeScript and structured error handling to prevent runtime regressions, catch edge cases early, and maintain high codebase quality.",
    },
  ];

  return (
    <section id="about" className="py-24 border-b border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            Engineering Approach
          </h2>
          <p className="text-neutral-400 mt-3 text-base leading-relaxed">
            I prioritize maintainable, readable code and robust system design over unnecessary complexity. Every architectural decision is guided by performance, reliability, and long-term team velocity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {principles.map((item, idx) => (
            <div
              key={item.title}
              className="p-6 rounded-xl bg-neutral-900/40 border border-white/[0.08] space-y-3"
            >
              <div className="text-xs font-mono text-neutral-500">
                0{idx + 1}
              </div>
              <h3 className="text-base font-medium text-white">
                {item.title}
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

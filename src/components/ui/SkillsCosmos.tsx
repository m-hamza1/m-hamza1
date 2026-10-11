"use client";

import React, { useState } from "react";
import { SKILL_CATEGORIES } from "@/data/portfolioData";

export default function SkillsCosmos() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="skills" className="py-24 border-b border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            Technical Skills &amp; Stack
          </h2>
          <p className="text-neutral-400 mt-2 text-base leading-relaxed">
            Technologies and tools I work with daily across full-stack web and mobile development.
          </p>
        </div>

        {/* Clean Minimalist Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <button
              key={cat.title}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                activeTab === idx
                  ? "bg-white text-neutral-950 font-semibold"
                  : "bg-neutral-900 border border-white/[0.08] text-neutral-400 hover:text-white hover:border-white/20"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILL_CATEGORIES[activeTab].skills.map((skill) => (
            <div
              key={skill.name}
              className="p-4 rounded-xl bg-neutral-900/40 border border-white/[0.08] flex items-center justify-between"
            >
              <div>
                <div className="text-sm font-medium text-white">{skill.name}</div>
                <div className="text-xs text-neutral-500 mt-0.5">{skill.popularIn}</div>
              </div>
              <span className="text-xs font-mono text-neutral-400">
                {skill.experience}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

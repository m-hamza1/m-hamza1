"use client";

import React, { useState } from "react";
import { PROJECTS } from "@/data/portfolioData";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { ProjectCategory } from "@/types/portfolio";

export default function AgustinWork() {
  const [selectedFilter, setSelectedFilter] = useState<ProjectCategory>("all");

  const filterOptions: { label: string; value: ProjectCategory }[] = [
    { label: "All Projects", value: "all" },
    { label: "Full-Stack Web", value: "fullstack" },
    { label: "Mobile Apps", value: "mobile" },
    { label: "Systems & APIs", value: "systems" },
    { label: "Automation & Tools", value: "tools" },
  ];

  const filtered = PROJECTS.filter((p) => {
    if (selectedFilter === "all") return true;
    return p.category === selectedFilter;
  });

  return (
    <section id="work" className="py-12 sm:py-20 md:py-32 border-t border-white/10 bg-black">
      <div className="max-w-7xl mx-auto px-5 sm:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-8 sm:mb-12 md:mb-16">
          <div>
            <div className="text-3xl sm:text-5xl md:text-7xl font-semibold tracking-tighter text-white uppercase leading-[0.95]">
              <span className="txt-cursive lowercase font-normal text-neutral-400 text-3xl sm:text-5xl md:text-6xl mr-3">
                selected
              </span>
              <span>work</span>
            </div>
          </div>

          {/* Clean Minimalist Category Filters */}
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setSelectedFilter(opt.value)}
                className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  selectedFilter === opt.value
                    ? "bg-white text-black font-semibold"
                    : "border border-white/20 text-neutral-400 hover:text-white hover:border-white/40"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8 md:gap-12">
          {filtered.map((project, idx) => (
            <div
              key={project.id}
              className="group flex flex-col justify-between p-5 sm:p-8 md:p-10 rounded-2xl border border-white/10 bg-neutral-950/70 hover:border-white/30 transition-all duration-300"
            >
              <div>
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-2.5 text-xs font-mono text-neutral-500 mb-4 sm:mb-6">
                  <span>0{idx + 1} &bull; {project.category.toUpperCase()}</span>
                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/20 text-xs font-mono text-neutral-300 hover:text-white hover:border-white transition-all"
                        title="GitHub Repository"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>Code</span>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 px-3 py-1 rounded-full bg-white text-black text-xs font-mono font-medium hover:bg-neutral-200 transition-all"
                        title="Live Deployment"
                      >
                        <span>Live Preview</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Project Title */}
                <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white tracking-tight group-hover:text-neutral-200 transition-colors flex items-center justify-between gap-2">
                  <span>{project.title}</span>
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                </h3>
                <div className="text-xs sm:text-sm text-neutral-400 font-light mt-1 mb-3 sm:mb-4">
                  {project.tagline}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light mb-4 sm:mb-6">
                  {project.description}
                </p>

                {/* Key Metrics / Highlights */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                  {project.metrics.map((metric) => (
                    <span
                      key={metric}
                      className="text-[11px] sm:text-xs font-mono px-2.5 sm:px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-neutral-300"
                    >
                      {metric}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Tech Stack */}
              <div className="pt-4 sm:pt-6 border-t border-white/10 flex flex-wrap gap-1.5 sm:gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] sm:text-xs font-mono text-neutral-500"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

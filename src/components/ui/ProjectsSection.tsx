"use client";

import React, { useState } from "react";
import TiltCard3D from "@/components/canvas/TiltCard3D";
import { PROJECTS } from "@/data/portfolioData";
import { soundFx } from "@/lib/audio";
import { ProjectCategory, Project } from "@/types/portfolio";
import { ExternalLink, Sparkles, Layers, Cpu, ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories: { label: string; value: ProjectCategory }[] = [
    { label: "All Architectures", value: "all" },
    { label: "Mobile Apps (Flutter)", value: "mobile" },
    { label: "Full-Stack Web (Next.js)", value: "fullstack" },
    { label: "P2P & Distributed Systems", value: "systems" },
    { label: "Security & Tools", value: "tools" },
  ];

  const filteredProjects = PROJECTS.filter((p) => {
    if (selectedCategory === "all") return true;
    return p.category === selectedCategory;
  });

  const toggleExpand = (id: string) => {
    soundFx.playClick();
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs uppercase tracking-wider mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Production Deployments</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Flagship Engineering Systems
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base leading-relaxed">
            Real production architectures engineered for resilience, sub-second latency, and offline-first mobile dependability.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => {
                soundFx.playClick();
                setSelectedCategory(cat.value);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono transition-all ${
                selectedCategory === cat.value
                  ? "bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/30 scale-105"
                  : "bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project: Project) => {
            const isExpanded = expandedId === project.id;
            return (
              <TiltCard3D
                key={project.id}
                maxTilt={8}
                className="h-full rounded-2xl"
              >
                <div
                  onMouseEnter={() => soundFx.playHover()}
                  className="h-full flex flex-col justify-between rounded-2xl bg-slate-900/80 border border-slate-800/90 hover:border-cyan-500/50 backdrop-blur-xl p-6 transition-all duration-300 shadow-xl group hover:shadow-cyan-950/40"
                >
                  {/* Top Badges & Actions */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full">
                        {project.category}
                      </span>
                      <div className="flex items-center gap-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => {
                              e.stopPropagation();
                              soundFx.playClick();
                            }}
                            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                            title="View Source on GitHub"
                          >
                            <GithubIcon className="w-4 h-4" />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => {
                              e.stopPropagation();
                              soundFx.playClick();
                            }}
                            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-cyan-500 text-slate-300 hover:text-slate-950 transition-colors"
                            title="Open Live Deployment"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Title & Tagline */}
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                      <span>{project.title}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-cyan-400" />
                    </h3>
                    <div className="text-xs font-mono text-slate-400 mt-1 mb-3">
                      {project.tagline}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-slate-300 leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Metrics chips */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.metrics.map((metric, mi) => (
                        <span
                          key={mi}
                          className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-emerald-950/40 text-emerald-400 border border-emerald-500/30"
                        >
                          {metric}
                        </span>
                      ))}
                    </div>

                    {/* Architecture Notes Dropdown */}
                    <button
                      type="button"
                      onClick={() => toggleExpand(project.id)}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors mb-4"
                    >
                      <span className="flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-cyan-400" />
                        <span>System Architecture Insight</span>
                      </span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {isExpanded && (
                      <div className="p-3 rounded-xl bg-slate-950 border border-cyan-500/30 text-xs text-slate-300 mb-4 animate-in fade-in duration-200">
                        <div className="font-mono text-cyan-400 text-[11px] mb-1 font-semibold uppercase">
                          Engineering Decision:
                        </div>
                        <p className="leading-relaxed">{project.architectureNotes}</p>
                      </div>
                    )}
                  </div>

                  {/* Tech Tags Footer */}
                  <div className="pt-4 border-t border-slate-800/70 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/60 text-slate-300 border border-slate-700/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard3D>
            );
          })}
        </div>
      </div>
    </section>
  );
}

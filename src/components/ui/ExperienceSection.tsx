"use client";

import React from "react";
import { EXPERIENCES } from "@/data/portfolioData";
import { soundFx } from "@/lib/audio";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs uppercase tracking-wider mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Production Track Record
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base leading-relaxed">
            Progressive trajectory shipping enterprise mobile software, high-throughput web applications, and resilient cloud services.
          </p>
        </div>

        {/* Timeline Stream */}
        <div className="relative border-l-2 border-slate-800 ml-4 md:ml-32 space-y-12">
          {EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              onMouseEnter={() => soundFx.playHover()}
              className="relative pl-8 md:pl-10 group"
            >
              {/* Timeline Node Point */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-500 group-hover:bg-cyan-400 group-hover:scale-125 transition-all duration-300 shadow-md shadow-cyan-500/50" />

              {/* Timestamp label on left for large screens */}
              <div className="hidden md:block absolute -left-36 top-1 text-xs font-mono text-slate-400 text-right w-28 group-hover:text-cyan-400 transition-colors">
                {exp.period}
              </div>

              {/* Experience Card */}
              <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/70 border border-slate-800/90 group-hover:border-cyan-500/40 backdrop-blur-xl transition-all duration-300 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4 mb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-semibold text-cyan-400 mt-0.5">
                      {exp.company}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
                    <span className="md:hidden flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {exp.location}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {exp.type}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  {exp.summary}
                </p>

                {/* Bullet Highlights */}
                <div className="space-y-2 mb-5">
                  {exp.highlights.map((hl, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/60">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-850"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

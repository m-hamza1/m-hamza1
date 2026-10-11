"use client";

import React from "react";
import { EXPERIENCES, TESTIMONIALS } from "@/data/portfolioData";

export default function AgustinAbout() {
  return (
    <section id="about" className="py-12 sm:py-20 md:py-32 border-t border-white/10 bg-black">
      <div className="max-w-7xl mx-auto px-5 sm:px-10">
        {/* Header */}
        <div className="mb-8 sm:mb-14 md:mb-20">
          <div className="text-3xl sm:text-5xl md:text-7xl font-semibold tracking-tighter text-white uppercase leading-[0.95]">
            <span className="txt-cursive lowercase font-normal text-neutral-400 text-3xl sm:text-5xl md:text-6xl mr-3">
              about
            </span>
            <span>me &amp; journey</span>
          </div>
        </div>

        {/* Narrative & Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 md:gap-12 mb-12 sm:mb-18 md:mb-24">
          <div className="lg:col-span-5 text-lg sm:text-2xl text-white font-light leading-snug">
            Passionate about building software where solid engineering meets thoughtful design.
          </div>
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-neutral-400 text-sm sm:text-base leading-relaxed font-light">
            <p>
              Based in Gujranwala, Pakistan and collaborating remotely with international clients worldwide. Over the past 3+ years, I have engineered full-stack web platforms, custom ERP modules, and internal dashboards that replace messy spreadsheets with automated workflows for growing businesses.
            </p>
            <p>
              I specialize in architecting custom <strong className="text-white font-normal">Laravel &amp; PHP backend APIs</strong>, automating data pipelines with <strong className="text-white font-normal">AI &amp; LLM workflows</strong>, developing reactive interfaces with <strong className="text-white font-normal">React.js &amp; Next.js</strong>, and delivering remote projects globally across Upwork, Fiverr, and contract teams.
            </p>
          </div>
        </div>

        {/* Career Timeline (Agustin Burgos Clean Style) */}
        <div className="mb-12 sm:mb-18 md:mb-24">
          <h3 className="text-xs uppercase tracking-widest text-neutral-500 mb-6 sm:mb-8 font-mono">
            Experience Timeline &bull; Remote &amp; Enterprise
          </h3>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {EXPERIENCES.map((exp) => (
              <div key={exp.id} className="py-6 sm:py-9 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-baseline">
                <div className="md:col-span-3 text-xs font-mono text-neutral-400">
                  {exp.period}
                </div>
                <div className="md:col-span-4">
                  <h4 className="text-lg sm:text-xl font-medium text-white">{exp.role}</h4>
                  <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider font-mono">
                    <span className="text-neutral-300 font-semibold">{exp.company}</span> &bull; {exp.location}
                  </div>
                </div>
                <div className="md:col-span-5 text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                  <p className="text-neutral-300 font-normal">{exp.summary}</p>
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="mt-3 space-y-1.5 text-xs text-neutral-400">
                      {exp.highlights.map((h, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-emerald-400 shrink-0 font-mono mt-0.5">&bull;</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.technologies.map((t) => (
                      <span key={t} className="text-[11px] font-mono text-neutral-400 px-2.5 py-0.5 rounded-full border border-white/10 bg-white/5">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <h3 className="text-xs uppercase tracking-widest text-neutral-500 mb-6 sm:mb-8 font-mono">
            Client &amp; Leadership Endorsements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="p-5 sm:p-8 rounded-2xl border border-white/10 bg-neutral-950/50 flex flex-col justify-between"
              >
                <p className="text-sm text-neutral-300 font-light leading-relaxed italic mb-6">
                  &ldquo;{t.feedback}&rdquo;
                </p>
                <div>
                  <div className="font-medium text-sm text-white">{t.name}</div>
                  <div className="text-xs text-neutral-500 mt-0.5">
                    {t.role}, {t.company}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

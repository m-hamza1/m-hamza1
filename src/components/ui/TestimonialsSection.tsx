"use client";

import React from "react";
import { TESTIMONIALS } from "@/data/portfolioData";
import { soundFx } from "@/lib/audio";
import { Quote, Star, Sparkles } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 font-mono text-xs uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Peer &amp; Leadership Endorsements</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Trusted by Engineering Leaders
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base leading-relaxed">
            What founders, VPs of product, and engineering directors say about working together.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              onMouseEnter={() => soundFx.playHover()}
              className="p-6 sm:p-7 rounded-2xl bg-slate-900/70 border border-slate-800/90 hover:border-cyan-500/40 backdrop-blur-xl flex flex-col justify-between transition-all duration-300 shadow-xl group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-slate-700 group-hover:text-cyan-500/50 transition-colors" />
                </div>

                <p className="text-sm text-slate-300 leading-relaxed italic mb-6">
                  &ldquo;{t.feedback}&rdquo;
                </p>
              </div>

              <div>
                <div className="mb-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    {t.endorsedSkill}
                  </span>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-slate-800/70">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-white text-xs font-mono shadow-md">
                    {t.avatarText}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white">{t.name}</div>
                    <div className="text-xs text-slate-400">
                      {t.role} • <span className="text-slate-300">{t.company}</span>
                    </div>
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

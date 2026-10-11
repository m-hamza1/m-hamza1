"use client";

import React from "react";
import Interactive3DPlayground from "@/components/canvas/Interactive3DPlayground";

export default function Agustin3DLab() {
  return (
    <section id="lab" className="py-12 sm:py-20 md:py-32 border-t border-white/10 bg-black">
      <div className="max-w-7xl mx-auto px-5 sm:px-10">
        <div className="mb-8 sm:mb-14">
          <div className="text-3xl sm:text-5xl md:text-7xl font-semibold tracking-tighter text-white uppercase leading-[0.95]">
            <span className="txt-cursive lowercase font-normal text-neutral-400 text-3xl sm:text-5xl md:text-6xl mr-3">
              interactive
            </span>
            <span>prototypes</span>
            <br />
            <span className="txt-cursive lowercase font-normal text-neutral-400 text-3xl sm:text-5xl md:text-6xl mr-3">
              &amp;
            </span>
            <span className="text-neutral-400">spatial 3d</span>
          </div>
          <p className="text-neutral-400 mt-3 text-sm sm:text-base max-w-2xl font-light">
            Realtime Three.js spatial simulations, procedural topology shaders, and GPU buffer optimizations.
          </p>
        </div>

        <Interactive3DPlayground />
      </div>
    </section>
  );
}

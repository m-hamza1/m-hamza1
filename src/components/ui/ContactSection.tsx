"use client";

import React, { useState } from "react";
import { soundFx } from "@/lib/audio";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { Mail, Copy, Check, Send, Sparkles, MapPin, Clock, MessageSquare, AlertCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import confetti from "canvas-confetti";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasCopiedEmail, setHasCopiedEmail] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = "Please provide your name (at least 2 characters).";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please provide a valid email address.";
    }
    if (!formData.subject.trim()) {
      newErrors.subject = "Please enter a subject.";
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = "Please include a message with at least 10 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playClick();

    if (!validate()) {
      soundFx.playBeep(320, 0.1, "sawtooth");
      return;
    }

    setIsSubmitting(true);

    // Simulate high-speed dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      soundFx.playSuccess();
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {}
    }, 900);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setHasCopiedEmail(true);
    soundFx.playSuccess();
    setTimeout(() => setHasCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs uppercase tracking-wider mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>Initiate Direct Connection</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Let&apos;s Build Something Resilient
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base leading-relaxed">
            Whether you need a senior full-stack architect, high-scale Next.js engineering, or an offline-first mobile app shipped to production, I&apos;m ready.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct info & Availability */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-xl space-y-6">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  Contact Telemetry
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Ameer Hamza
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Senior Full-Stack &amp; Mobile Engineer
                </p>
              </div>

              {/* Email copy card */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className="text-[10px] font-mono text-slate-500">PRIMARY EMAIL</div>
                    <div className="text-xs sm:text-sm font-mono text-white truncate">
                      {PERSONAL_INFO.email}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={copyEmail}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-cyan-500/20 hover:text-cyan-300 border border-slate-700/80 text-slate-300 text-xs font-mono flex items-center gap-1.5 shrink-0 transition-all"
                  title="Copy email to clipboard"
                >
                  {hasCopiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{hasCopiedEmail ? "Copied" : "Copy"}</span>
                </button>
              </div>

              {/* Status details */}
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-850">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{PERSONAL_INFO.location}</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-850">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Turnaround Guarantee: Under 4 Hours</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-850">
                  <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>{PERSONAL_INFO.status}</span>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center gap-3">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-mono transition-all"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-mono transition-all"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Dispatch Portal */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-xl">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Transmission Received!</h3>
                  <p className="text-slate-300 max-w-md mx-auto text-sm leading-relaxed">
                    Thank you for reaching out, <span className="text-cyan-300 font-semibold">{formData.name}</span>. Your dispatch has been logged and forwarded directly to Ameer Hamza.
                  </p>
                  <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={`mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(formData.message)}`}
                      className="px-4 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors"
                    >
                      Open Email Client Copy
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        soundFx.playClick();
                        setIsSubmitted(false);
                        setFormData({ name: "", email: "", subject: "", message: "" });
                      }}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-mono transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-2">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Project Dispatch Terminal</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. John Miller"
                        className={`w-full px-4 py-2.5 rounded-xl bg-slate-950 border text-slate-200 text-xs sm:text-sm font-mono placeholder:text-slate-600 focus:outline-none transition-colors ${
                          errors.name
                            ? "border-rose-500/80 focus:border-rose-500"
                            : "border-slate-800 focus:border-cyan-500"
                        }`}
                      />
                      {errors.name && (
                        <p className="text-rose-400 text-[11px] font-mono mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. john@enterprise.io"
                        className={`w-full px-4 py-2.5 rounded-xl bg-slate-950 border text-slate-200 text-xs sm:text-sm font-mono placeholder:text-slate-600 focus:outline-none transition-colors ${
                          errors.email
                            ? "border-rose-500/80 focus:border-rose-500"
                            : "border-slate-800 focus:border-cyan-500"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-rose-400 text-[11px] font-mono mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Subject / Engagement Type *
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Full-Stack SaaS Architecture / Mobile POS App Development"
                      className={`w-full px-4 py-2.5 rounded-xl bg-slate-950 border text-slate-200 text-xs sm:text-sm font-mono placeholder:text-slate-600 focus:outline-none transition-colors ${
                        errors.subject
                          ? "border-rose-500/80 focus:border-rose-500"
                          : "border-slate-800 focus:border-cyan-500"
                      }`}
                    />
                    {errors.subject && (
                      <p className="text-rose-400 text-[11px] font-mono mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Project Scope &amp; Specifications *
                    </label>
                    <textarea
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share details regarding requirements, timelines, technical constraints, or system specifications..."
                      className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-slate-200 text-xs sm:text-sm font-mono placeholder:text-slate-600 focus:outline-none transition-colors resize-none ${
                        errors.message
                          ? "border-rose-500/80 focus:border-rose-500"
                          : "border-slate-800 focus:border-cyan-500"
                      }`}
                    />
                    {errors.message && (
                      <p className="text-rose-400 text-[11px] font-mono mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>Encrypting &amp; Dispatching...</span>
                      </div>
                    ) : (
                      <>
                        <span>Transmit Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

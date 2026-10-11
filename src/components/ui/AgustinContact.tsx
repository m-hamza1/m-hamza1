"use client";

import React, { useState } from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { ArrowUpRight, Check, AlertCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

export default function AgustinContact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const validate = () => {
    const err: Record<string, string> = {};
    if (!formData.name.trim()) err.name = "Please enter your name.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      err.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      err.message = "Please share a brief message (minimum 10 characters).";
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to deliver message. Please try again.");
      }

      setIsSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred. Please try again.";
      setServerError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const marqueeItems = [
    "LET'S WORK TOGETHER",
    "BUILD SOMETHING REMARKABLE",
    "OPEN FOR COLLABORATION",
    "LET'S TALK",
    "START A PROJECT",
    "READY TO SHIP",
  ];

  return (
    <section id="contact" className="py-12 sm:py-20 md:py-36 border-t border-white/10 bg-black overflow-hidden">
      {/* 1. Agustin Burgos Editorial Infinite Marquee */}
      <div className="w-full border-b border-white/10 pb-8 sm:pb-14 md:pb-24 select-none overflow-hidden">
        <div className="animate-marquee-track flex items-center gap-8 sm:gap-16">
          {marqueeItems.concat(marqueeItems).map((text, idx) => (
            <div
              key={idx}
              className="flex items-center gap-8 sm:gap-16 shrink-0"
            >
              <span className="text-4xl sm:text-7xl md:text-9xl lg:text-[11rem] font-bold tracking-tighter text-white uppercase leading-none hover:text-neutral-300 transition-colors">
                {text}
              </span>
              <span className="text-2xl sm:text-5xl md:text-8xl text-neutral-600 font-light">&bull;</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-10 pt-8 sm:pt-14 md:pt-24">
        {/* Section Intro */}
        <div className="mb-8 sm:mb-14 md:mb-20">
          <p className="text-xl sm:text-3xl md:text-4xl font-light text-white tracking-tight leading-snug max-w-2xl">
            Ready to elevate your code base to new heights? Let&apos;s discuss your next project.
          </p>
          <p className="text-neutral-400 mt-2 sm:mt-3 text-xs sm:text-base max-w-xl font-light">
            Available for full-stack web development, Laravel backend engineering, React/Next.js applications, and production server deployments.
          </p>
        </div>

        {/* Contact Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 md:gap-16 items-start">
          {/* Left Column: Minimalist Underline Form */}
          <div className="lg:col-span-7">
            {isSuccess ? (
              <div className="py-16 space-y-4">
                <div className="w-12 h-12 rounded-full border border-white flex items-center justify-center text-white">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-semibold text-white">Message sent successfully</h3>
                <p className="text-neutral-400 font-light text-base">
                  Thank you for reaching out, {formData.name}. I will get back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSuccess(false);
                    setFormData({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="mt-4 px-6 py-2.5 rounded-full border border-white/40 text-xs uppercase tracking-wider text-white hover:border-white transition-all cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                {/* Name */}
                <div>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name here *"
                    className="editorial-input"
                  />
                  {errors.name && (
                    <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Your email here *"
                    className="editorial-input"
                  />
                  {errors.email && (
                    <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Subject / Project scope"
                    className="editorial-input"
                  />
                </div>

                {/* Message */}
                <div>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project... *"
                    className="editorial-input resize-none"
                  />
                  {errors.message && (
                    <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.message}
                    </p>
                  )}
                </div>

                  {serverError && (
                    <div className="p-3.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                      <span>{serverError}</span>
                    </div>
                  )}

                  {/* Submit button with Agustin-style arrow hover */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-medium text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                    <div className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                      <ArrowUpRight className="w-3.5 h-3.5 text-black" />
                    </div>
                  </button>
                </form>
            )}
          </div>

          {/* Right Column: Direct Info, Deployments & Socials */}
          <div className="lg:col-span-5 space-y-10 lg:pl-8 lg:border-l lg:border-white/10">
            {/* Direct Email */}
            <div>
              <div className="text-xs uppercase tracking-widest text-neutral-500 mb-2 font-mono">
                Direct Email
              </div>
              <button
                type="button"
                onClick={copyEmail}
                className="text-xl sm:text-2xl text-white font-light hover:text-neutral-300 transition-colors block text-left cursor-pointer"
                title="Click to copy email"
              >
                {PERSONAL_INFO.email}
              </button>
              <div className="text-xs text-neutral-500 mt-1 font-mono">
                {copied ? "✓ Copied to clipboard" : "Click to copy"}
              </div>
            </div>

            {/* Core Stack */}
            <div>
              <div className="text-xs uppercase tracking-widest text-neutral-500 mb-2 font-mono">
                Core Stack &amp; Deployments
              </div>
              <p className="text-sm text-neutral-300 font-light leading-relaxed">
                Laravel, PHP, React.js, Next.js, MySQL, Linux VPS, cPanel, Nginx, SSL, REST APIs &amp; Flutter.
              </p>
            </div>

            {/* Location & Status */}
            <div>
              <div className="text-xs uppercase tracking-widest text-neutral-500 mb-2 font-mono">
                Location &amp; Work Model
              </div>
              <div className="text-base text-white font-light">
                Gujranwala, Pakistan
              </div>
              <div className="text-xs text-emerald-400/90 mt-1.5 flex items-center gap-1.5 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span>100% Remote Available &bull; Flexible for Worldwide &amp; Freelance Roles</span>
              </div>
            </div>

            {/* Social channels */}
            <div>
              <div className="text-xs uppercase tracking-widest text-neutral-500 mb-3 font-mono">
                Connect &amp; Follow
              </div>
              <div className="flex items-center gap-5">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

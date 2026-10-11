"use client";

import React, { useState, useRef, useEffect } from "react";
import { soundFx } from "@/lib/audio";
import { PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES } from "@/data/portfolioData";
import { Terminal as TerminalIcon, CornerDownLeft, Maximize2, Minimize2, Trash2 } from "lucide-react";
import confetti from "canvas-confetti";

interface HistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
}

const AVAILABLE_COMMANDS = [
  "help",
  "about",
  "skills",
  "projects",
  "experience",
  "contact",
  "whoami",
  "cat resume.md",
  "metrics",
  "sudo hire",
  "clear",
  "date",
];

export default function InteractiveTerminal() {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: "init-1",
      command: "whoami",
      output: (
        <div className="text-slate-300">
          <span className="text-cyan-400 font-bold">{PERSONAL_INFO.name}</span> — {PERSONAL_INFO.role}
          <div className="text-slate-400 text-xs mt-1">
            Type <span className="text-emerald-400 font-mono">help</span> to explore commands, or click any command chip below.
          </div>
        </div>
      ),
    },
  ]);
  const [cmdIndex, setCmdIndex] = useState<number>(-1);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    soundFx.playClick();

    // Add to command history list
    setCmdHistory((prev) => [...prev, trimmed]);
    setCmdIndex(-1);

    const lower = trimmed.toLowerCase();

    if (lower === "clear") {
      setHistory([]);
      setInputVal("");
      return;
    }

    let outputNode: React.ReactNode = null;

    switch (lower) {
      case "help":
        outputNode = (
          <div className="space-y-1.5 text-xs font-mono">
            <div className="text-cyan-400 font-semibold mb-1">Available Terminal Directives:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-slate-300">
              <div><span className="text-emerald-400">help</span> - Display this reference manual</div>
              <div><span className="text-emerald-400">about</span> - Background & engineering principles</div>
              <div><span className="text-emerald-400">skills</span> - Inspect technical stack & proficiencies</div>
              <div><span className="text-emerald-400">projects</span> - Query shipped production systems</div>
              <div><span className="text-emerald-400">metrics</span> - Realtime production reliability metrics</div>
              <div><span className="text-emerald-400">whoami</span> - Identity & current clearance</div>
              <div><span className="text-emerald-400">cat resume.md</span> - Display technical curriculum vitae</div>
              <div><span className="text-emerald-400">contact</span> - Direct communication channels</div>
              <div><span className="text-emerald-400">date</span> - Query server & local UTC+5 timestamps</div>
              <div><span className="text-emerald-400">sudo hire</span> - Initiate onboarding handshake</div>
              <div><span className="text-emerald-400">clear</span> - Flush terminal buffer</div>
            </div>
          </div>
        );
        break;

      case "about":
        outputNode = (
          <div className="space-y-2 text-xs text-slate-300">
            <div className="text-cyan-400 font-bold">{PERSONAL_INFO.name} • {PERSONAL_INFO.role}</div>
            <p className="leading-relaxed text-slate-300">{PERSONAL_INFO.bio}</p>
            <div className="text-slate-400">Location: {PERSONAL_INFO.location}</div>
          </div>
        );
        break;

      case "skills":
        outputNode = (
          <div className="space-y-3 text-xs">
            {SKILL_CATEGORIES.map((cat, i) => (
              <div key={i} className="border-l-2 border-cyan-500/50 pl-3">
                <div className="text-cyan-400 font-semibold">{cat.title}</div>
                <div className="text-slate-400 flex flex-wrap gap-2 mt-1">
                  {cat.skills.map((s, si) => (
                    <span key={si} className="bg-slate-800 text-slate-200 px-2 py-0.5 rounded font-mono">
                      {s.name} ({s.experience})
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case "projects":
        outputNode = (
          <div className="space-y-2 text-xs">
            <div className="text-cyan-400 font-semibold">Flagship Production Deployments:</div>
            {PROJECTS.map((p, i) => (
              <div key={i} className="bg-slate-900/60 p-2 rounded border border-slate-800">
                <div className="text-emerald-400 font-bold">{p.title} <span className="text-slate-500 font-normal">[{p.category}]</span></div>
                <div className="text-slate-300 mt-0.5">{p.tagline}</div>
                <div className="text-slate-500 text-[11px] mt-1">Tech: {p.tags.join(" • ")}</div>
              </div>
            ))}
          </div>
        );
        break;

      case "metrics":
        outputNode = (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
            {PERSONAL_INFO.stats.map((st, i) => (
              <div key={i} className="bg-slate-900/90 border border-slate-800 p-2 rounded">
                <div className="text-slate-500 text-[10px]">{st.label}</div>
                <div className="text-cyan-400 font-bold text-sm mt-0.5">{st.value}</div>
                <div className="text-emerald-400 text-[10px]">{st.change}</div>
              </div>
            ))}
          </div>
        );
        break;

      case "cat resume.md":
      case "cat resume":
        outputNode = (
          <div className="space-y-2 text-xs font-mono text-slate-300 bg-slate-950/80 p-3 rounded border border-slate-800">
            <div className="text-cyan-400 font-bold text-sm"># AMEER HAMZA - RESUME</div>
            <div>**Role**: Senior Full-Stack & Mobile Software Engineer</div>
            <div>**Contact**: {PERSONAL_INFO.email} | {PERSONAL_INFO.github}</div>
            <div>**Core Focus**: High-throughput Next.js Web Systems, Flutter/React Native Cross-Platform Apps, Offline Sync, Distributed WebRTC</div>
            <div className="text-emerald-400">**Status**: Actively considering high-impact technical roles.</div>
          </div>
        );
        break;

      case "whoami":
        outputNode = (
          <div className="text-xs text-slate-300 font-mono">
            <div>User: guest@antigravity-guest-session</div>
            <div>Host: hamza-engineering-cluster</div>
            <div>Clearance: read-only (unrestricted terminal telemetry)</div>
          </div>
        );
        break;

      case "date":
        outputNode = (
          <div className="text-xs text-cyan-300 font-mono">
            <div>UTC Timestamp: {new Date().toUTCString()}</div>
            <div>Local Node (PKT UTC+5): {new Date().toLocaleString("en-US", { timeZone: "Asia/Karachi" })}</div>
          </div>
        );
        break;

      case "contact":
        outputNode = (
          <div className="space-y-1 text-xs font-mono text-slate-300">
            <div>Email: <a href={`mailto:${PERSONAL_INFO.email}`} className="text-cyan-400 hover:underline">{PERSONAL_INFO.email}</a></div>
            <div>GitHub: <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">{PERSONAL_INFO.github}</a></div>
            <div>LinkedIn: <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">{PERSONAL_INFO.linkedin}</a></div>
          </div>
        );
        break;

      case "sudo hire":
      case "hire":
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch {}
        soundFx.playSuccess();
        outputNode = (
          <div className="space-y-2 text-xs font-mono p-2.5 rounded bg-emerald-950/30 border border-emerald-500/40 text-emerald-300">
            <div className="font-bold text-sm">Access Granted: Welcome aboard!</div>
            <div>Candidate verification: Ameer Hamza passed with flying colors.</div>
            <div className="text-slate-300">
              Direct line: <span className="text-cyan-300 font-bold">{PERSONAL_INFO.email}</span>. Click below to initiate project discussion:
            </div>
            <div>
              <a
                href="#contact"
                className="inline-block mt-1 px-3 py-1 rounded bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors"
              >
                Jump to Contact Portal →
              </a>
            </div>
          </div>
        );
        break;

      default:
        outputNode = (
          <div className="text-xs text-rose-400 font-mono">
            Directive not recognized: &quot;{trimmed}&quot;. Type <span className="text-emerald-400 underline cursor-pointer" onClick={() => executeCommand("help")}>help</span> to view available instructions.
          </div>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        id: `cmd-${Date.now()}`,
        command: trimmed,
        output: outputNode,
      },
    ]);

    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      executeCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIndex = cmdIndex === -1 ? cmdHistory.length - 1 : Math.max(0, cmdIndex - 1);
        setCmdIndex(nextIndex);
        setInputVal(cmdHistory[nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdHistory.length > 0 && cmdIndex !== -1) {
        const nextIndex = cmdIndex + 1;
        if (nextIndex < cmdHistory.length) {
          setCmdIndex(nextIndex);
          setInputVal(cmdHistory[nextIndex]);
        } else {
          setCmdIndex(-1);
          setInputVal("");
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const current = inputVal.trim().toLowerCase();
      if (!current) return;
      const match = AVAILABLE_COMMANDS.find((c) => c.startsWith(current));
      if (match) {
        setInputVal(match);
      }
    }
  };

  return (
    <div
      className={`w-full rounded-2xl border border-slate-800 bg-slate-950/90 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-300 font-mono text-slate-200 flex flex-col ${
        isExpanded ? "min-h-[580px]" : "min-h-[380px]"
      }`}
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800 select-none">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <div className="flex items-center gap-2 ml-3 text-xs text-slate-400 font-mono">
            <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span>hamza@cloud-node:~ (bash)</span>
          </div>
        </div>

        {/* Window controls */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setHistory([])}
            className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
            title="Clear buffer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title={isExpanded ? "Collapse height" : "Expand height"}
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Terminal Output Stream */}
      <div
        className="flex-1 p-4 overflow-y-auto space-y-4 max-h-[460px] text-xs font-mono selection:bg-cyan-500/30"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="text-slate-500 text-[11px] leading-relaxed">
          Antigravity Shell v2.4 (x86_64-node-enterprise)
          <br />
          Authentication: Verified • Security Level: Grade-A • All systems responsive.
        </div>

        {history.map((item) => (
          <div key={item.id} className="space-y-1.5">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="text-emerald-400 font-bold">hamza@node:~$</span>
              <span className="text-cyan-300 font-semibold">{item.command}</span>
            </div>
            <div className="pl-4 border-l border-slate-800/80 mt-1">{item.output}</div>
          </div>
        ))}

        {/* Active Input Prompt */}
        <div className="flex items-center gap-2 text-slate-400 pt-1">
          <span className="text-emerald-400 font-bold shrink-0">hamza@node:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' or click quick commands below..."
            className="flex-1 bg-transparent border-none outline-none text-cyan-300 font-mono text-xs placeholder:text-slate-600 focus:ring-0 p-0"
            autoComplete="off"
            spellCheck="false"
          />
          <button
            type="button"
            onClick={() => executeCommand(inputVal)}
            className="p-1 text-slate-500 hover:text-cyan-400 transition-colors"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>
        <div ref={bottomRef} />
      </div>

      {/* Quick Interactive Command Chips */}
      <div className="p-2.5 bg-slate-900/60 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
        <span className="text-slate-500 text-[10px] uppercase tracking-wider mr-1">Quick Run:</span>
        {["help", "projects", "skills", "metrics", "cat resume.md", "sudo hire"].map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => executeCommand(chip)}
            className="px-2 py-0.5 rounded bg-slate-800/80 hover:bg-cyan-500/20 border border-slate-700/60 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-all cursor-pointer"
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}

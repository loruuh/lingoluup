"use client";

import { useState, useEffect } from "react";
import { useModule } from "@/lib/ModuleContext";
import moduleIndex from "@/data/modules/index.json";
import { useAuth } from "@/lib/useAuth";
import { hasAdvanceAccess, isAdvanceModule } from "@/lib/subscription";
import { UpgradeModal } from "./UpgradeModal";
import { LoginButton } from "./LoginButton";
import HistoryButton from "./HistoryButton";
import { NavIcon } from "./NavIcon";
import Link from "next/link";

const BookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 6.5C12 6.5 8 4 4 6V19C8 17 12 19.5 12 19.5C12 19.5 16 17 20 19V6C16 4 12 6.5 12 6.5Z" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 6.5V19.5" strokeLinecap="round"/>
  </svg>
);

const SPECIAL_PALETTE: Record<string, { bg: string; border: string; accent: string; glow: string }> = {
  redewendungen:      { bg: "rgba(132,204,22,0.07)",  border: "rgba(132,204,22,0.28)",  accent: "#84cc16", glow: "rgba(132,204,22,0.15)"  },
  "aussprache-tipps": { bg: "rgba(52,211,153,0.07)",  border: "rgba(52,211,153,0.28)",  accent: "#34d399", glow: "rgba(52,211,153,0.15)"  },
  lektionen:          { bg: "rgba(20,184,166,0.07)",  border: "rgba(20,184,166,0.28)",  accent: "#2dd4bf", glow: "rgba(20,184,166,0.15)"  },
};

const PALETTE = [
  { bg: "rgba(132,204,22,0.07)", border: "rgba(132,204,22,0.28)", accent: "#84cc16", glow: "rgba(132,204,22,0.15)" },
  { bg: "rgba(52,211,153,0.07)", border: "rgba(52,211,153,0.28)", accent: "#34d399", glow: "rgba(52,211,153,0.15)" },
  { bg: "rgba(59,130,246,0.07)", border: "rgba(59,130,246,0.28)", accent: "#60a5fa", glow: "rgba(59,130,246,0.15)" },
  { bg: "rgba(168,85,247,0.07)", border: "rgba(168,85,247,0.28)", accent: "#c084fc", glow: "rgba(168,85,247,0.15)" },
  { bg: "rgba(236,72,153,0.07)", border: "rgba(236,72,153,0.28)", accent: "#f472b6", glow: "rgba(236,72,153,0.15)" },
  { bg: "rgba(251,191,36,0.07)", border: "rgba(251,191,36,0.28)", accent: "#fbbf24", glow: "rgba(251,191,36,0.15)" },
];

export default function ModuleSelection() {
  const { selectModule, getModuleItemCount } = useModule();
  const { user } = useAuth();
  const [hasAdvance, setHasAdvance] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);

  useEffect(() => {
    if (user) {
      hasAdvanceAccess(user.id).then(setHasAdvance);
    } else {
      setHasAdvance(false);
    }
  }, [user]);

  const vocabModules = moduleIndex.filter((m) => m.type === "vocabulary");
  const specialModules = moduleIndex.filter((m) => m.type !== "vocabulary");

  const handleModuleClick = (moduleId: string) => {
    const needsAdvance = isAdvanceModule(moduleId);
    if (needsAdvance && !hasAdvance) {
      setShowUpgrade(true);
    } else {
      selectModule(moduleId);
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ background: "#0d1117" }}>

      {/* Background lime glow */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{ background: "radial-gradient(ellipse 80% 45% at 50% 0%, rgba(132,204,22,0.08) 0%, transparent 65%)" }}
      />

      {/* Sticky header */}
      <header
        className="sticky top-0 z-50 border-b border-white/[0.06]"
        style={{ background: "rgba(13,17,23,0.90)", backdropFilter: "blur(14px)" }}
      >
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-6 h-6 text-lime-400 group-hover:text-lime-300 transition-colors">
              <BookIcon />
            </div>
            <span className="font-bold text-base tracking-tight">
              <span className="text-white">LINGO</span>
              <span className="text-lime-500">LUUP</span>
            </span>
          </Link>

          <div className="flex items-center gap-1">
            <HistoryButton />
            <NavIcon href="/vokabelheft" label="Vokabelheft">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </NavIcon>
            <NavIcon href="/statistik" label="Statistik">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </NavIcon>
            <NavIcon href="/account" label="Account">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </NavIcon>
            <LoginButton />
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-4 pb-20">

        {/* Hero */}
        <div className="text-center pt-14 pb-12">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-[11px] font-bold tracking-widest uppercase text-lime-400"
            style={{ background: "rgba(132,204,22,0.08)", border: "1px solid rgba(132,204,22,0.18)" }}
          >
            🇪🇸 Spanisch lernen
          </div>
          <h1
            className="text-4xl sm:text-5xl font-black tracking-tight mb-4"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #84cc16 65%, #65a30d 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Wähle dein Modul
          </h1>
          <p className="text-gray-500 text-sm">
            2,600+ Vokabeln · 5 Level · Science-backed
          </p>
        </div>

        {/* Feature pillars */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
          {[
            { icon: "🧠", title: "Active Recall", sub: "Erst denken, dann aufdecken" },
            { icon: "🎵", title: "Native Audio", sub: "Korrekte Aussprache" },
            { icon: "📝", title: "Kontext-Sätze", sub: "Für jede Vokabel" },
          ].map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <span className="text-lg">{f.icon}</span>
              <div>
                <div className="text-xs font-semibold text-white leading-tight">{f.title}</div>
                <div className="text-[11px] text-gray-500 leading-tight">{f.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Vocab Modules */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <p className="text-[11px] font-bold tracking-widest uppercase text-lime-500 shrink-0">
              Vokabel-Module
            </p>
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {vocabModules.map((module, idx) => {
              const palette = PALETTE[idx % PALETTE.length];
              const needsAdvance = isAdvanceModule(module.id);
              const isLocked = needsAdvance && !hasAdvance;
              const count = getModuleItemCount(module.id);
              const levelMatch = module.id.match(/vokabeln-(\d+)/);
              const levelLabel = levelMatch ? `Level ${levelMatch[1].padStart(2, "0")}` : "Extra";

              return (
                <button
                  key={module.id}
                  onClick={() => handleModuleClick(module.id)}
                  className="group relative text-left rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1117]"
                  style={{
                    background: isLocked ? "rgba(255,255,255,0.02)" : palette.bg,
                    border: `1px solid ${isLocked ? "rgba(255,255,255,0.06)" : palette.border}`,
                  }}
                >
                  {/* Hover inner glow */}
                  {!isLocked && (
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                      style={{ boxShadow: `inset 0 0 60px ${palette.glow}` }}
                    />
                  )}

                  {/* Top accent stripe */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{
                      background: isLocked
                        ? "rgba(255,255,255,0.04)"
                        : `linear-gradient(90deg, ${palette.accent}bb, ${palette.accent}33, transparent)`,
                    }}
                  />

                  <div className="relative p-5">
                    {/* Level label + badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="text-[10px] font-bold tracking-widest uppercase"
                        style={{ color: isLocked ? "#374151" : palette.accent }}
                      >
                        {levelLabel}
                      </span>
                      {needsAdvance ? (
                        <span
                          className="text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
                          style={
                            hasAdvance
                              ? { background: "rgba(132,204,22,0.12)", color: "#84cc16", border: "1px solid rgba(132,204,22,0.25)" }
                              : { background: "rgba(255,255,255,0.04)", color: "#4b5563", border: "1px solid rgba(255,255,255,0.08)" }
                          }
                        >
                          {hasAdvance ? "ADVANCE ✓" : "ADVANCE"}
                        </span>
                      ) : (
                        <span
                          className="text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
                          style={{ background: "rgba(132,204,22,0.10)", color: "#84cc16", border: "1px solid rgba(132,204,22,0.22)" }}
                        >
                          GRATIS
                        </span>
                      )}
                    </div>

                    {/* Emoji + content */}
                    <div className="flex items-start gap-4">
                      <span
                        className="text-4xl leading-none inline-block transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5"
                        style={{ filter: isLocked ? "grayscale(0.7) opacity(0.4)" : undefined }}
                      >
                        {module.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h3
                          className="font-bold text-base leading-tight mb-1"
                          style={{ color: isLocked ? "#4b5563" : "#f3f4f6" }}
                        >
                          {module.name}
                        </h3>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: isLocked ? "#374151" : "#9ca3af" }}
                        >
                          {module.description}
                        </p>
                        <p
                          className="text-[11px] mt-2 tabular-nums"
                          style={{ color: isLocked ? "#1f2937" : "#6b7280" }}
                        >
                          {count} Vokabeln
                        </p>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-5 flex justify-end">
                      {isLocked ? (
                        <span className="text-[11px] text-gray-700 flex items-center gap-1.5">
                          🔒 Advance freischalten
                        </span>
                      ) : (
                        <span
                          className="text-xs font-semibold flex items-center gap-1 transition-all duration-200 group-hover:gap-2"
                          style={{ color: palette.accent }}
                        >
                          Starten
                          <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Special Modules */}
        {specialModules.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <p className="text-[11px] font-bold tracking-widest uppercase text-lime-500 shrink-0">
                Spezial-Module
              </p>
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {specialModules.map((module) => {
                const needsAdvance = isAdvanceModule(module.id);
                const isLocked = needsAdvance && !hasAdvance;
                const palette = SPECIAL_PALETTE[module.id] ?? { bg: "rgba(255,255,255,0.025)", border: "rgba(255,255,255,0.07)", accent: "#9ca3af", glow: "rgba(255,255,255,0.08)" };

                return (
                  <button
                    key={module.id}
                    onClick={() => handleModuleClick(module.id)}
                    className="group relative text-left rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1117]"
                    style={{ background: palette.bg, border: `1px solid ${palette.border}` }}
                  >
                    {/* Top accent stripe */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
                      style={{ background: `linear-gradient(90deg, ${palette.accent}bb, ${palette.accent}33, transparent)` }}
                    />

                    {/* Hover inner glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                      style={{ boxShadow: `inset 0 0 60px ${palette.glow}` }}
                    />

                    <div className="relative p-5 flex items-center gap-4">
                      <span className="text-3xl leading-none inline-block transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5">
                        {module.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-white text-base leading-tight mb-1">
                          {module.name}
                          {isLocked && (
                            <span className="ml-2 text-[9px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded-full align-middle"
                              style={{ background: "rgba(255,255,255,0.05)", color: "#4b5563", border: "1px solid rgba(255,255,255,0.08)" }}>
                              ADVANCE
                            </span>
                          )}
                        </h3>
                        <p className="text-sm text-gray-500">{module.description}</p>
                        <p className="text-[11px] mt-1.5 tabular-nums" style={{ color: palette.accent + "99" }}>
                          {getModuleItemCount(module.id)} Einträge
                        </p>
                      </div>
                      <span
                        className="shrink-0 text-sm transition-all duration-200 group-hover:translate-x-0.5"
                        style={{ color: palette.accent + "88" }}
                      >
                        →
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* Why it works */}
        <section
          className="rounded-2xl p-6"
          style={{ background: "rgba(132,204,22,0.04)", border: "1px solid rgba(132,204,22,0.12)" }}
        >
          <p className="text-[11px] font-bold tracking-widest uppercase text-lime-500 mb-5">
            Warum es funktioniert
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { icon: "🧠", title: "Active Recall", desc: "Erst denken, dann aufdecken — bis zu 10× effektiver als passives Lesen." },
              { icon: "📝", title: "Kontext-Lernen", desc: "Vokabeln in echten Sätzen speichert dein Gehirn 3× besser." },
              { icon: "🎵", title: "Native Audio", desc: "Hören + Nachsprechen = multimodales Lernen auf drei Kanälen gleichzeitig." },
            ].map((f, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-xl shrink-0 mt-0.5">{f.icon}</span>
                <div>
                  <div className="text-sm font-semibold text-white mb-1">{f.title}</div>
                  <div className="text-xs text-gray-500 leading-relaxed">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      <UpgradeModal
        isOpen={showUpgrade}
        onClose={() => setShowUpgrade(false)}
      />
    </div>
  );
}

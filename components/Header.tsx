"use client";

import Link from "next/link";
import HistoryButton from "./HistoryButton";
import { NavIcon } from "./NavIcon";
import VokabelheftBadge from "./VokabelheftBadge";
import { useModule } from "@/lib/ModuleContext";

interface HeaderProps {
  voiceModus?: boolean;
  onToggleModus?: () => void;
}

export default function Header({ voiceModus, onToggleModus }: HeaderProps = {}) {
  const { clearModule } = useModule();

  return (
    <header className="w-full bg-background/80 backdrop-blur-lg border-b border-primary/20 sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link href="/modules" onClick={clearModule} className="group relative flex items-center gap-1.5">
          <span className="text-xl font-bold bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent transition-all duration-300">
            HablaPalabra
          </span>
          <span className="text-xl transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 inline-block">
            🌟
          </span>
          <div className="absolute -bottom-0.5 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-primary to-purple-400 transition-all duration-300 rounded-full" />
        </Link>

        {/* Mode toggle — shown only on the learning page (when onToggleModus is provided) */}
        {onToggleModus && (
          <div
            role="group"
            aria-label="Lernmodus wählen"
            className="relative inline-flex items-stretch bg-white/[0.04] border border-white/[0.09] rounded-xl p-0.5"
          >
            {/* Spring-animated pill — yellow for Text, red for Voice (España flag) */}
            <div
              aria-hidden="true"
              className="absolute top-0.5 bottom-0.5 rounded-[10px] pointer-events-none"
              style={{
                left: "2px",
                width: "calc(50% - 2px)",
                transform: voiceModus ? "translateX(100%)" : "translateX(0)",
                transition: "transform 240ms cubic-bezier(0.34,1.12,0.64,1), background 200ms ease, border-color 200ms ease, box-shadow 200ms ease",
                background: voiceModus ? "rgba(198,11,30,0.18)" : "rgba(255,196,0,0.18)",
                border: `1px solid ${voiceModus ? "rgba(198,11,30,0.55)" : "rgba(255,196,0,0.55)"}`,
                boxShadow: voiceModus ? "0 0 14px rgba(198,11,30,0.28)" : "0 0 14px rgba(255,196,0,0.28)",
              }}
            />
            {/* Text-Modus */}
            <button
              onClick={onToggleModus}
              aria-pressed={!voiceModus}
              className={`relative z-10 inline-flex items-center gap-1.5 px-3 py-[5px] rounded-[10px] text-[11px] font-semibold tracking-wide whitespace-nowrap transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-background ${
                !voiceModus
                  ? "text-yellow-400 focus-visible:ring-yellow-400"
                  : "text-gray-500 hover:text-gray-300 focus-visible:ring-gray-400"
              }`}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="4 7 4 4 20 4 20 7" />
                <line x1="9" y1="20" x2="15" y2="20" />
                <line x1="12" y1="4" x2="12" y2="20" />
              </svg>
              Text<span className="hidden sm:inline">-Modus</span>
            </button>
            {/* Voice-Modus */}
            <button
              onClick={onToggleModus}
              aria-pressed={!!voiceModus}
              className={`relative z-10 inline-flex items-center gap-1.5 px-3 py-[5px] rounded-[10px] text-[11px] font-semibold tracking-wide whitespace-nowrap transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-background ${
                voiceModus
                  ? "text-red-500 focus-visible:ring-red-500"
                  : "text-gray-500 hover:text-gray-300 focus-visible:ring-gray-400"
              }`}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
              Voice<span className="hidden sm:inline">-Modus</span>
            </button>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center gap-2">
          <HistoryButton />

          <NavIcon href="/vokabelheft" label="Vokabelheft" badge={<VokabelheftBadge />}>
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
        </div>
      </div>
    </header>
  );
}

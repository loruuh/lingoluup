"use client";

import { useState, useEffect } from "react";
import { useModule } from "@/lib/ModuleContext";
import moduleIndex from "@/data/modules/index.json";
import { useAuth } from "@/lib/useAuth";
import { hasAdvanceAccess, isAdvanceModule } from "@/lib/subscription";
import { AdvanceBadge } from "./AdvanceBadge";
import { UpgradeModal } from "./UpgradeModal";
import { LoginButton } from "./LoginButton";
import HistoryButton from "./HistoryButton";
import { NavIcon } from "./NavIcon";
import { LearningMethodology } from "./LearningMethodology";

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
  // TEMPORÄR AUSGEBLENDET: "redewendungen" - Redewendungen sind selbst vollständige Sätze
  // und brauchen keine Beispielsätze. Modul macht in der aktuellen Form keinen Sinn.
  const specialModules = moduleIndex.filter((m) => m.type !== "vocabulary" && m.id !== "redewendungen");

  const handleModuleClick = (moduleId: string) => {
    const needsAdvance = isAdvanceModule(moduleId);
    if (needsAdvance && !hasAdvance) {
      setShowUpgrade(true);
    } else {
      selectModule(moduleId);
    }
  };

  const renderModuleButton = (module: (typeof moduleIndex)[0]) => {
    const needsAdvance = isAdvanceModule(module.id);
    const isLocked = needsAdvance && !hasAdvance;

    return (
      <button
        key={module.id}
        onClick={() => handleModuleClick(module.id)}
        className={`group relative bg-white/[0.04] border text-left overflow-hidden rounded-2xl p-6 transition-all duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
          isLocked
            ? "border-white/8 opacity-70"
            : "border-primary/20 hover:border-primary/50 hover:bg-white/[0.08] hover:shadow-[0_8px_32px_var(--shadow-glow)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
        }`}
      >
        {/* Subtle gradient reveal on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

        <div className="relative">
          <span className="text-3xl block mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5 inline-block">
            {module.icon}
          </span>
          <h3 className="text-base font-semibold text-white leading-snug">
            {module.name}
            {needsAdvance && <AdvanceBadge />}
          </h3>
          <p className="text-sm text-gray-400 mt-1.5 leading-relaxed">
            {module.description}
            {module.type === "vocabulary" &&
              ` · ${getModuleItemCount(module.id)} Einheiten`}
          </p>
        </div>

        {isLocked && (
          <div className="absolute inset-0 bg-background/75 backdrop-blur-[2px] rounded-2xl flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl mb-1.5">🔒</div>
              <div className="text-white text-sm font-semibold">Advance</div>
            </div>
          </div>
        )}
      </button>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Row */}
      <div className="flex justify-end items-center gap-2 px-4 py-2">
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

      <div className="flex-1 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-5xl font-bold tracking-tight">
            <span className="text-white">LINGO</span><span className="text-primary">LUUP</span>
            <span className="ml-2 inline-block">🎯</span>
          </h1>
          <p className="text-base text-gray-400 leading-relaxed">
            Wähle ein Lern-Modul und starte durch
          </p>
        </div>

        {/* Lernmethodik */}
        <LearningMethodology />

        {/* Vokabel-Module */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider px-1">
            Vokabel-Module
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {vocabModules.map(renderModuleButton)}
          </div>
        </div>

        {/* Spezial-Module */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider px-1">
            Spezial-Module
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {specialModules.map(renderModuleButton)}
          </div>
        </div>
      </div>

      <UpgradeModal
        isOpen={showUpgrade}
        onClose={() => setShowUpgrade(false)}
      />
    </div>
    </div>
  );
}

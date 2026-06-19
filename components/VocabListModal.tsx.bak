"use client";

import { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { useModule } from "@/lib/ModuleContext";

interface VocabListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VocabListModal({ isOpen, onClose }: VocabListModalProps) {
  const { selectedModule, getModuleVocab } = useModule();
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setRevealedIds(new Set());
      setSearch("");
    }
  }, [isOpen]);

  const vocab = useMemo(() => {
    if (!selectedModule || selectedModule.type !== "vocabulary") return [];
    return getModuleVocab(selectedModule.id);
  }, [selectedModule, getModuleVocab]);

  const filtered = useMemo(() => {
    if (!search.trim()) return vocab;
    const q = search.toLowerCase();
    return vocab.filter(
      (v) =>
        v.german.toLowerCase().includes(q) ||
        v.spanish.toLowerCase().includes(q)
    );
  }, [vocab, search]);

  const allRevealed = vocab.length > 0 && revealedIds.size >= vocab.length;

  const toggleReveal = (id: string) => {
    setRevealedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleRevealAll = () => {
    if (allRevealed) {
      setRevealedIds(new Set());
    } else {
      setRevealedIds(new Set(vocab.map((v) => v.id)));
    }
  };

  if (!isOpen || !selectedModule) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-[var(--background)] w-full sm:max-w-2xl sm:rounded-2xl rounded-t-2xl border border-white/10 flex flex-col max-h-[92vh] sm:max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0">
          <div>
            <h2 className="text-white font-bold text-lg leading-tight">{selectedModule.name}</h2>
            <p className="text-gray-500 text-xs mt-0.5">{vocab.length} Vokabeln</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRevealAll}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-primary/30 text-primary hover:bg-primary/10 transition-colors whitespace-nowrap"
            >
              {allRevealed ? "Alle verbergen" : "Alle anzeigen"}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Schließen"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="px-5 py-3 border-b border-white/10 shrink-0">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-sm">🔍</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Suchen (Deutsch oder Spanisch)…"
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-9 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/40 transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-sm leading-none"
                aria-label="Suche löschen"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Column headers */}
        <div className="grid grid-cols-[2.5rem_1fr_1.5rem_1fr] gap-x-2 px-5 py-2 border-b border-white/10 shrink-0">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-600">#</span>
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Deutsch</span>
          <span />
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Español</span>
        </div>

        {/* Scrollable list */}
        <div className="overflow-y-auto flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-gray-500 text-sm">
              {search ? `Keine Treffer für „${search}"` : "Keine Vokabeln."}
            </div>
          ) : (
            <div className="divide-y divide-white/[0.05] px-2 pb-2">
              {filtered.map((v, i) => {
                const revealed = revealedIds.has(v.id);
                return (
                  <div
                    key={v.id}
                    onClick={() => toggleReveal(v.id)}
                    className="grid grid-cols-[2.5rem_1fr_1.5rem_1fr] gap-x-2 items-center px-3 py-3 cursor-pointer hover:bg-white/5 rounded-lg transition-colors group"
                  >
                    <span className="text-xs text-gray-600 tabular-nums select-none">{i + 1}</span>
                    <span className="text-sm text-white">{v.german}</span>
                    <span className={`text-xs select-none transition-colors text-center ${revealed ? "text-primary" : "text-gray-600 group-hover:text-gray-400"}`}>
                      👁
                    </span>
                    <span className={`text-sm font-medium transition-colors ${revealed ? "text-primary" : "text-gray-700"}`}>
                      {revealed ? v.spanish : "· · · · ·"}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer: result count when searching */}
        {search && filtered.length > 0 && (
          <div className="px-5 py-2.5 border-t border-white/10 shrink-0 text-center text-xs text-gray-500">
            {filtered.length} von {vocab.length} Vokabeln
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

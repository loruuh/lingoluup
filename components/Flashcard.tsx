"use client";

import { useState } from "react";

interface FlashcardProps {
  german: string;
  spanish: string;
  onReveal?: () => void;
  isRevealed?: boolean;
}

export default function Flashcard({ german, spanish, onReveal, isRevealed: externalIsRevealed }: FlashcardProps) {
  const [internalIsRevealed, setInternalIsRevealed] = useState(false);
  const isRevealed = externalIsRevealed ?? internalIsRevealed;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Verhindert dass der Click zum Main-Container weitergegeben wird
    if (!isRevealed) {
      setInternalIsRevealed(true);
      if (onReveal) {
        onReveal();
      }
    }
  };

  return (
    <div
      onClick={handleClick}
      className="w-full max-w-2xl mx-auto cursor-pointer select-none"
    >
      {/* Card container with glassmorphism */}
      <div
        className={`relative rounded-2xl border px-8 py-10 md:py-14 text-center transition-all duration-500 ease-out overflow-hidden ${
          isRevealed
            ? 'border-primary/40 bg-white/5 shadow-[0_12px_48px_var(--shadow-glow)]'
            : 'border-white/10 bg-white/[0.03] hover:border-primary/30 hover:bg-white/[0.06] hover:shadow-[0_8px_32px_var(--shadow-glow)]'
        }`}
      >
        {/* Subtle gradient background shimmer */}
        <div className={`absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent transition-opacity duration-500 ${isRevealed ? 'opacity-100' : 'opacity-0'}`} />

        {/* Deutsches Wort */}
        <div className="relative mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">Deutsch</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white transition-all duration-500 ease-out leading-tight"
              style={{ transform: isRevealed ? 'translateY(-4px) scale(0.97)' : 'translateY(0) scale(1)' }}>
            {german}
          </h2>
        </div>

        {/* Divider */}
        <div className={`relative w-16 h-px mx-auto mb-8 transition-all duration-500 ${isRevealed ? 'bg-primary/60 w-24' : 'bg-white/20'}`} />

        {/* Spanisches Wort (wird aufgedeckt) */}
        <div className="relative min-h-[4rem] flex flex-col items-center justify-center gap-2">
          <div
            className={`transition-all duration-500 ease-out ${
              isRevealed ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-2">Español</p>
            <p className="text-3xl md:text-4xl font-bold text-primary leading-tight">
              {spanish}
            </p>
          </div>
        </div>

        {/* Hinweis-Text */}
        <div className={`relative mt-6 transition-all duration-300 min-h-[1.5rem] flex items-center justify-center ${!isRevealed ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <p className="text-sm text-gray-500 animate-pulse flex items-center gap-2">
            <span>👆</span> Tippe um aufzudecken
          </p>
        </div>
      </div>
    </div>
  );
}

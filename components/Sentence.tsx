"use client";

import { useState, useEffect } from "react";

interface SentenceProps {
  spanishSentence: string;
  germanSentence: string;
  isVisible: boolean;
  onTranslationRevealed?: () => void;
  germanRevealed?: boolean;
}

export default function Sentence({
  spanishSentence,
  germanSentence,
  isVisible,
  onTranslationRevealed,
  germanRevealed = false,
}: SentenceProps) {
  const [showSentence, setShowSentence] = useState(false);
  const [showGermanTranslation, setShowGermanTranslation] = useState(false);
  const isGermanVisible = showGermanTranslation || germanRevealed;

  // Fade in the Spanish sentence after 500ms delay
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setShowSentence(true);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setShowSentence(false);
      setShowGermanTranslation(false);
    }
  }, [isVisible]);

  const handleClick = (e: React.MouseEvent) => {
    if (!showSentence || isGermanVisible) return;
    e.stopPropagation();
    setShowGermanTranslation(true);
    if (onTranslationRevealed) onTranslationRevealed();
  };

  return (
    <div
      className="w-full space-y-3 cursor-pointer"
      onClick={handleClick}
    >
      {/* Spanish Sentence */}
      <div
        className={`text-white px-5 py-4 rounded-2xl text-center text-base md:text-lg font-semibold transition-all duration-500 min-h-[4.5rem] flex items-center justify-center leading-relaxed shadow-lg ${
          showSentence ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
        style={{ backgroundColor: 'var(--sentence-spanish)' }}
      >
        {spanishSentence}
      </div>

      {/* German Translation */}
      <div
        className={`text-white px-5 py-4 rounded-2xl text-center text-base md:text-lg font-medium transition-all duration-500 min-h-[4.5rem] flex items-center justify-center leading-relaxed ${
          isGermanVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
        style={{ backgroundColor: 'var(--sentence-german)' }}
      >
        {germanSentence}
      </div>

      {/* Hint text */}
      <div className={`text-center transition-all duration-300 min-h-[1.75rem] flex items-center justify-center ${
        showSentence && !isGermanVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}>
        <p className="text-xs text-gray-500 animate-pulse flex items-center gap-1.5">
          <span>👆</span> Tippe für die Übersetzung
        </p>
      </div>
    </div>
  );
}

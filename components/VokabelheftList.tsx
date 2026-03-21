"use client";

import { getVocabById } from "@/lib/spaced-repetition";
import { removeFavorite } from "@/lib/local-storage";

interface VokabelheftListProps {
  favorites: string[];
  onUpdate: () => void;
  hideGerman: boolean;
  hideSpanish: boolean;
}

export default function VokabelheftList({
  favorites,
  onUpdate,
  hideGerman,
  hideSpanish,
}: VokabelheftListProps) {
  const handleDelete = (vocabId: string) => {
    removeFavorite(vocabId);
    onUpdate();
  };

  if (favorites.length === 0) {
    return (
      <div className="text-center py-24 px-4">
        <div className="text-5xl mb-4">📖</div>
        <p className="text-white text-lg font-semibold mb-2">Dein Vokabelheft ist leer</p>
        <p className="text-gray-400 text-sm max-w-xs mx-auto leading-relaxed">
          Tippe beim Lernen auf das Herz ♥ um Vokabeln hier zu speichern.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Schulheft-Container */}
      <div className="bg-[#f8f7f0] rounded-2xl shadow-2xl overflow-hidden border border-gray-300">
        {favorites.map((vocabId) => {
          const vocab = getVocabById(vocabId);
          if (!vocab) return null;

          return (
            <div
              key={vocabId}
              className="relative border-b border-blue-200 last:border-b-0 hover:bg-blue-50/60 transition-colors group"
              style={{
                minHeight: "60px",
                backgroundImage:
                  "linear-gradient(to bottom, transparent 59px, #93c5fd 59px, #93c5fd 60px, transparent 60px)",
              }}
            >
              {/* Rote vertikale Trennlinie in der Mitte */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-red-400"></div>

              <div className="grid grid-cols-2 gap-0 h-full">
                {/* Linke Spalte: Deutsch */}
                <div className="flex items-center px-5 py-4">
                  {!hideGerman && (
                    <span className="text-gray-800 text-base font-medium leading-snug">
                      {vocab.german}
                    </span>
                  )}
                </div>

                {/* Rechte Spalte: Spanisch + Delete */}
                <div className="flex items-center justify-between px-5 py-4">
                  {!hideSpanish && (
                    <span className="text-gray-800 text-base font-medium leading-snug flex-1">
                      {vocab.spanish}
                    </span>
                  )}

                  {/* Löschen-Button — sichtbar auf mobile, hover auf desktop */}
                  <button
                    onClick={() => handleDelete(vocabId)}
                    className="ml-3 p-2 sm:opacity-0 sm:group-hover:opacity-100 hover:bg-red-100 active:bg-red-200 rounded-lg transition-all duration-200 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                    aria-label="Vokabel löschen"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info-Text */}
      <p className="text-center text-gray-500 text-sm mt-5">
        {favorites.length} {favorites.length === 1 ? "Vokabel" : "Vokabeln"} gespeichert
      </p>
    </div>
  );
}

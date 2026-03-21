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
      <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
        <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-5 text-4xl">
          📖
        </div>
        <h3 className="text-white font-semibold text-lg mb-2">Vokabelheft ist leer</h3>
        <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
          Tippe beim Lernen auf das{" "}
          <span className="text-secondary font-semibold">♥ Herz</span>{" "}
          um Vokabeln hier zu speichern.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Schulheft container */}
      <div
        className="rounded-2xl shadow-2xl overflow-hidden border border-gray-300/80"
        style={{ backgroundColor: "#f8f7f0" }}
      >
        {/* Column headers */}
        <div
          className="grid grid-cols-2 border-b-2 border-blue-200 bg-[#f0efe8]"
          style={{ borderBottomColor: "#93c5fd" }}
        >
          <div className="px-5 py-2.5 flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">🇩🇪 Deutsch</span>
          </div>
          <div className="relative px-5 py-2.5 flex items-center gap-2">
            {/* Red divider */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-red-400" />
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">🇪🇸 Español</span>
          </div>
        </div>

        {favorites.map((vocabId, index) => {
          const vocab = getVocabById(vocabId);
          if (!vocab) return null;

          return (
            <div
              key={vocabId}
              className="relative border-b border-blue-100 last:border-b-0 hover:bg-blue-50/50 transition-colors duration-150 group"
              style={{
                minHeight: "56px",
                backgroundImage:
                  "linear-gradient(to bottom, transparent 55px, #bfdbfe 55px, #bfdbfe 56px, transparent 56px)",
              }}
            >
              {/* Red vertical divider */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-red-400/70" />

              <div className="grid grid-cols-2">
                {/* German column */}
                <div className="flex items-center px-5 py-3.5 min-h-[56px]">
                  {!hideGerman ? (
                    <span className="text-gray-800 text-sm font-medium leading-snug">{vocab.german}</span>
                  ) : (
                    <div className="h-3 w-20 bg-gray-300/60 rounded-full" />
                  )}
                </div>

                {/* Spanish column + delete */}
                <div className="flex items-center justify-between px-5 py-3.5 min-h-[56px]">
                  {!hideSpanish ? (
                    <span className="text-gray-800 text-sm font-medium leading-snug flex-1">{vocab.spanish}</span>
                  ) : (
                    <div className="h-3 w-20 bg-gray-300/60 rounded-full flex-1" />
                  )}

                  {/* Delete button — always visible on mobile, hover on desktop */}
                  <button
                    onClick={() => handleDelete(vocabId)}
                    className="ml-3 p-1.5 sm:opacity-0 sm:group-hover:opacity-100 hover:bg-red-100 active:bg-red-200 rounded-lg transition-all duration-150 shrink-0 focus-visible:outline-none focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-red-400"
                    aria-label="Vokabel löschen"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3.5 h-3.5 text-red-400"
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

      {/* Footer count */}
      <p className="text-center text-gray-500 text-xs mt-4">
        {favorites.length} {favorites.length === 1 ? "Vokabel" : "Vokabeln"} gespeichert
      </p>
    </div>
  );
}

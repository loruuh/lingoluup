"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VokabelheftList from "@/components/VokabelheftList";
import VokabelheftToggle from "@/components/VokabelheftToggle";
import { getFavorites, getHistory, type HistoryEntry } from "@/lib/local-storage";
import { getVocabById } from "@/lib/spaced-repetition";
import { VocabTimer } from "@/components/VocabTimer";

export default function VokabelheftPage() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [hideGerman, setHideGerman] = useState(false);
  const [hideSpanish, setHideSpanish] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const loadFavorites = () => {
    const favs = getFavorites();
    setFavorites(favs);
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const handleShowHistory = () => {
    setHistory(getHistory());
    setShowHistory(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Titel + Controls (sticky beim Scrollen) */}
          <div className="sticky top-0 z-10 bg-background pb-4">
            <div className="mb-8 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">
                    {showHistory ? "Historie" : "Mein Vokabelheft"}
                  </h1>
                  <p className="text-gray-300">
                    {showHistory
                      ? "Deine zuletzt gelernten Sätze"
                      : "Deine gespeicherten Vokabeln im klassischen Schulheft-Design"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {/* Historie / Vokabeln Toggle */}
                  <button
                    onClick={showHistory ? () => setShowHistory(false) : handleShowHistory}
                    className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                      showHistory
                        ? "bg-primary text-white border-primary shadow-lg shadow-primary/25"
                        : "bg-white/5 text-gray-300 border-white/15 hover:border-primary/50 hover:text-white hover:bg-primary/10"
                    }`}
                  >
                    {showHistory ? "← Vokabeln" : "🕐 Historie"}
                  </button>
                  <VocabTimer />
                </div>
              </div>
            </div>

            {/* Toggle Buttons — nur im Vokabeln-View */}
            {!showHistory && (
              <VokabelheftToggle
                hideGerman={hideGerman}
                hideSpanish={hideSpanish}
                onToggleGerman={() => setHideGerman(!hideGerman)}
                onToggleSpanish={() => setHideSpanish(!hideSpanish)}
              />
            )}
          </div>

          {/* VOKABELN VIEW */}
          {!showHistory && (
            <VokabelheftList
              favorites={favorites}
              onUpdate={loadFavorites}
              hideGerman={hideGerman}
              hideSpanish={hideSpanish}
            />
          )}

          {/* HISTORIE VIEW */}
          {showHistory && (
            <div>
              {history.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-400 text-lg">Noch keine Sätze gelernt.</p>
                  <p className="text-gray-500 text-sm mt-2">
                    Deine letzten 10 Sätze werden hier angezeigt.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {history.map((entry, index) => {
                    const vocab = getVocabById(entry.vocabId);
                    return (
                      <div
                        key={`${entry.vocabId}-${entry.timestamp}-${index}`}
                        className="bg-white/[0.04] rounded-2xl p-5 border border-white/8 hover:border-primary/30 hover:bg-white/[0.07] transition-all duration-200"
                      >
                        {vocab && (
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-gray-400 text-sm font-medium">{vocab.german}</span>
                            <span className="text-gray-600 text-xs">→</span>
                            <span className="text-primary font-semibold text-sm">{vocab.spanish}</span>
                          </div>
                        )}
                        <p className="text-white text-base leading-relaxed mb-3">{entry.sentence}</p>
                        <p className="text-gray-600 text-xs">
                          {new Date(entry.timestamp).toLocaleString("de-DE", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    );
                  })}
                  <p className="text-center text-gray-500 text-sm mt-8">
                    Die letzten {history.length} von maximal 10 Sätzen
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Zurück-Button */}
          <div className="mt-10 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark active:scale-[0.97] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Zurück zum Lernen
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

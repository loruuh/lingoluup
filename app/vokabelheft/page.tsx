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
    setFavorites(getFavorites());
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const handleShowHistory = () => {
    setHistory(getHistory());
    setShowHistory(true);
  };

  const handleShowVokabeln = () => {
    setShowHistory(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 px-4 py-6">
        <div className="max-w-5xl mx-auto">

          {/* ── Sticky header with backdrop blur ── */}
          <div className="sticky top-[57px] z-10 bg-background/90 backdrop-blur-xl pb-3 -mx-4 px-4 border-b border-white/6 mb-6">

            {/* Title row */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="min-w-0">
                <h1 className="text-2xl font-bold text-white tracking-tight truncate">
                  {showHistory ? "Historie" : "Mein Vokabelheft"}
                </h1>
                <p className="text-gray-500 text-xs mt-0.5">
                  {showHistory
                    ? "Deine zuletzt gelernten Sätze"
                    : `${favorites.length} ${favorites.length === 1 ? "Vokabel" : "Vokabeln"} gespeichert`}
                </p>
              </div>

              {/* Controls row */}
              <div className="flex items-center gap-2 shrink-0">
                {/* Tab switcher */}
                <div className="flex bg-white/5 border border-white/10 rounded-xl p-1 gap-1">
                  <button
                    onClick={handleShowVokabeln}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 focus-visible:outline-none ${
                      !showHistory
                        ? "bg-primary text-white shadow-sm"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    📖 Vokabeln
                  </button>
                  <button
                    onClick={handleShowHistory}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 focus-visible:outline-none ${
                      showHistory
                        ? "bg-primary text-white shadow-sm"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    🕐 Historie
                  </button>
                </div>

                <VocabTimer />
              </div>
            </div>

            {/* Hide toggles — Vokabeln view only */}
            {!showHistory && (
              <div className="mt-3">
                <VokabelheftToggle
                  hideGerman={hideGerman}
                  hideSpanish={hideSpanish}
                  onToggleGerman={() => setHideGerman(!hideGerman)}
                  onToggleSpanish={() => setHideSpanish(!hideSpanish)}
                />
              </div>
            )}
          </div>

          {/* ── Vokabeln View ── */}
          {!showHistory && (
            <VokabelheftList
              favorites={favorites}
              onUpdate={loadFavorites}
              hideGerman={hideGerman}
              hideSpanish={hideSpanish}
            />
          )}

          {/* ── Historie View ── */}
          {showHistory && (
            <div className="animate-fade-in">
              {history.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
                  <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-5 text-4xl">
                    🕐
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">Noch keine Sätze gelernt</h3>
                  <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                    Deine letzten 10 gelernten Sätze werden hier nach dem Lernen angezeigt.
                  </p>
                  <Link
                    href="/"
                    className="mt-6 px-5 py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-xl transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    Jetzt lernen →
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {history.map((entry, index) => {
                    const vocab = getVocabById(entry.vocabId);
                    const timeStr = new Date(entry.timestamp).toLocaleString("de-DE", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    });

                    return (
                      <div
                        key={`${entry.vocabId}-${entry.timestamp}-${index}`}
                        className="group relative bg-white/[0.04] rounded-2xl border border-white/8 hover:border-primary/30 hover:bg-white/[0.07] transition-all duration-200 overflow-hidden"
                      >
                        {/* Left accent bar */}
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary/40 group-hover:bg-primary transition-colors duration-200" />

                        <div className="pl-5 pr-5 py-4">
                          {/* Vocab pair */}
                          {vocab && (
                            <div className="flex items-center gap-2 mb-2.5">
                              <span className="text-gray-400 text-xs font-medium bg-white/5 px-2 py-0.5 rounded-md">
                                {vocab.german}
                              </span>
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                              <span className="text-primary text-xs font-semibold bg-primary/10 px-2 py-0.5 rounded-md">
                                {vocab.spanish}
                              </span>
                            </div>
                          )}

                          {/* Sentence */}
                          <p className="text-white text-sm leading-relaxed">{entry.sentence}</p>

                          {/* Timestamp */}
                          <p className="text-gray-600 text-xs mt-2.5 flex items-center gap-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {timeStr}
                          </p>
                        </div>
                      </div>
                    );
                  })}

                  <p className="text-center text-gray-600 text-xs mt-6 pb-2">
                    {history.length} von maximal 10 Einträgen
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ── Zurück-Button ── */}
          <div className="mt-10 text-center pb-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark active:scale-[0.97] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
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

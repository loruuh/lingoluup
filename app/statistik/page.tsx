"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConfettiAnimation from "@/components/ConfettiAnimation";
import { getStats, getTodayCount, getWeekCount, getLast7Days } from "@/lib/local-storage";

export default function StatistikPage() {
  const [todayCount, setTodayCount] = useState(0);
  const [weekCount, setWeekCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [last7Days, setLast7Days] = useState<{ date: string; count: number }[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const stats = getStats();
    const today = getTodayCount();
    const week = getWeekCount();
    const days = getLast7Days();

    setTodayCount(today);
    setWeekCount(week);
    setTotalCount(stats.totalGenerated);
    setLast7Days(days);

    // Zeige Konfetti wenn Tagesziel erreicht
    if (today >= 10) {
      setShowConfetti(true);
    }
  }, []);

  // Finde maximalen Wert für Balkendiagramm-Skalierung
  const maxCount = Math.max(...last7Days.map((d) => d.count), 1);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {showConfetti && <ConfettiAnimation />}

      <main className="flex-1 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Titel */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Statistik</h1>
            <p className="text-gray-400 text-sm">Dein Lernfortschritt im Überblick</p>
          </div>

          {/* Statistik-Karten */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {/* Heute */}
            <div className="bg-white/[0.04] rounded-2xl p-6 border border-primary/20 hover:border-primary/40 hover:bg-white/[0.07] transition-all duration-200 text-center">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
                Heute gelernt
              </p>
              <p className="text-6xl font-bold text-primary mb-2 tabular-nums leading-none">
                {todayCount}
              </p>
              <p className="text-gray-500 text-sm">
                {todayCount >= 10
                  ? "🎉 Tagesziel erreicht!"
                  : `Noch ${10 - todayCount} bis zum Ziel`}
              </p>
            </div>

            {/* Diese Woche */}
            <div className="bg-white/[0.04] rounded-2xl p-6 border border-secondary/20 hover:border-secondary/40 hover:bg-white/[0.07] transition-all duration-200 text-center">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
                Diese Woche
              </p>
              <p className="text-6xl font-bold text-secondary mb-2 tabular-nums leading-none">
                {weekCount}
              </p>
              <p className="text-gray-500 text-sm">Vokabeln</p>
            </div>

            {/* Gesamt */}
            <div className="bg-white/[0.04] rounded-2xl p-6 border border-white/10 hover:border-white/20 hover:bg-white/[0.07] transition-all duration-200 text-center">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
                Gesamt
              </p>
              <p className="text-6xl font-bold text-white mb-2 tabular-nums leading-none">
                {totalCount}
              </p>
              <p className="text-gray-500 text-sm">Vokabeln</p>
            </div>
          </div>

          {/* Balkendiagramm - Letzte 7 Tage */}
          <div className="bg-white/[0.04] rounded-2xl p-6 md:p-8 border border-primary/20">
            <h2 className="text-lg font-semibold text-white mb-8">
              Letzte 7 Tage
            </h2>

            <div className="flex items-end justify-between gap-2 h-52">
              {last7Days.map((day, index) => {
                const height = maxCount > 0 ? Math.max((day.count / maxCount) * 100, day.count > 0 ? 8 : 0) : 0;
                const date = new Date(day.date);
                const dayName = date.toLocaleDateString("de-DE", {
                  weekday: "short",
                });
                const isToday = index === last7Days.length - 1;

                return (
                  <div
                    key={day.date}
                    className="flex-1 flex flex-col items-center gap-2"
                  >
                    {/* Wert über dem Balken */}
                    <div className="h-6 flex items-end justify-center">
                      {day.count > 0 && (
                        <span className={`text-xs font-bold ${isToday ? 'text-primary' : 'text-gray-400'}`}>
                          {day.count}
                        </span>
                      )}
                    </div>

                    {/* Balken */}
                    <div className="w-full flex flex-col justify-end h-40 relative">
                      {/* Empty track */}
                      <div className="absolute inset-0 rounded-lg bg-white/5" />
                      {/* Filled bar */}
                      <div
                        className={`relative w-full rounded-lg transition-all duration-700 ease-out ${
                          isToday
                            ? "bg-gradient-to-t from-primary to-primary-light shadow-[0_0_16px_var(--shadow-glow)]"
                            : day.count > 0
                            ? "bg-gradient-to-t from-secondary/80 to-secondary"
                            : "h-0"
                        }`}
                        style={{ height: `${height}%` }}
                      />
                    </div>

                    {/* Tag */}
                    <p
                      className={`text-xs font-medium ${
                        isToday
                          ? "text-primary font-bold"
                          : "text-gray-500"
                      }`}
                    >
                      {dayName}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Legende */}
            <div className="mt-6 pt-4 border-t border-white/8 flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-primary" />
                <span className="text-xs text-gray-500">Heute</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-secondary" />
                <span className="text-xs text-gray-500">Andere Tage</span>
              </div>
            </div>
          </div>

          {/* Zurück-Button */}
          <div className="mt-8 text-center">
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

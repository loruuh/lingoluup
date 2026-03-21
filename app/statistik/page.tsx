"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConfettiAnimation from "@/components/ConfettiAnimation";
import { getStats, getTodayCount, getWeekCount, getLast7Days } from "@/lib/local-storage";
import { useStreak } from "@/components/StreakCounter";

export default function StatistikPage() {
  const [todayCount, setTodayCount] = useState(0);
  const [weekCount, setWeekCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [last7Days, setLast7Days] = useState<{ date: string; count: number }[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [mounted, setMounted] = useState(false);
  const streak = useStreak();

  useEffect(() => {
    const stats = getStats();
    const today = getTodayCount();
    const week = getWeekCount();
    const days = getLast7Days();

    setTodayCount(today);
    setWeekCount(week);
    setTotalCount(stats.totalGenerated);
    setLast7Days(days);

    if (today >= 10) {
      setShowConfetti(true);
    }

    // Delay so CSS transitions animate in on mount
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const maxCount = Math.max(...last7Days.map((d) => d.count), 1);
  const todayGoal = 10;
  const goalPercent = Math.min((todayCount / todayGoal) * 100, 100);
  const goalReached = todayCount >= todayGoal;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {showConfetti && <ConfettiAnimation />}

      <main className="flex-1 px-4 py-10">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* ── Page Header ── */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-white tracking-tight">Statistik</h1>
            <p className="text-gray-400 text-sm">Dein Lernfortschritt im Überblick</p>
          </div>

          {/* ── Streak Banner (only if > 1) ── */}
          {streak > 1 && (
            <div className="flex items-center justify-center gap-3 bg-orange-500/10 border border-orange-500/25 rounded-2xl px-6 py-4">
              <span className="text-3xl">🔥</span>
              <div>
                <p className="text-orange-300 font-bold text-lg leading-none">{streak} Tage in Folge</p>
                <p className="text-orange-400/70 text-xs mt-0.5">Weiter so – du bist auf einem Streak!</p>
              </div>
            </div>
          )}

          {/* ── Stat Cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Heute */}
            <div className="relative bg-white/[0.04] rounded-2xl border border-primary/25 hover:border-primary/50 hover:bg-white/[0.07] transition-all duration-200 overflow-hidden group">
              {/* Top accent stripe */}
              <div className="h-1 bg-gradient-to-r from-primary to-primary-light" />
              <div className="p-6 text-center">
                <div className="text-2xl mb-3">📚</div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Heute gelernt</p>
                <p className="text-6xl font-bold text-primary tabular-nums leading-none mb-3">{todayCount}</p>
                {/* Mini progress ring-like bar */}
                <div className="w-full bg-white/8 rounded-full h-1.5 mb-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${goalReached ? 'bg-green-400' : 'bg-primary'}`}
                    style={{ width: mounted ? `${goalPercent}%` : '0%' }}
                  />
                </div>
                <p className="text-gray-500 text-xs">
                  {goalReached ? "🎉 Tagesziel erreicht!" : `${todayCount} / ${todayGoal} Tagesziel`}
                </p>
              </div>
            </div>

            {/* Diese Woche */}
            <div className="relative bg-white/[0.04] rounded-2xl border border-secondary/25 hover:border-secondary/50 hover:bg-white/[0.07] transition-all duration-200 overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-secondary to-yellow-300" />
              <div className="p-6 text-center">
                <div className="text-2xl mb-3">📈</div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Diese Woche</p>
                <p className="text-6xl font-bold text-secondary tabular-nums leading-none mb-3">{weekCount}</p>
                <p className="text-gray-500 text-xs">Vokabeln</p>
              </div>
            </div>

            {/* Gesamt */}
            <div className="relative bg-white/[0.04] rounded-2xl border border-white/10 hover:border-white/25 hover:bg-white/[0.07] transition-all duration-200 overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-gray-400 to-gray-300" />
              <div className="p-6 text-center">
                <div className="text-2xl mb-3">🏆</div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Gesamt</p>
                <p className="text-6xl font-bold text-white tabular-nums leading-none mb-3">{totalCount}</p>
                <p className="text-gray-500 text-xs">Vokabeln insgesamt</p>
              </div>
            </div>
          </div>

          {/* ── Bar Chart ── */}
          <div className="bg-white/[0.04] rounded-2xl border border-primary/20 overflow-hidden">
            <div className="px-6 pt-6 pb-2 flex items-center justify-between">
              <h2 className="text-base font-semibold text-white">Letzte 7 Tage</h2>
              <span className="text-xs text-gray-500 tabular-nums">{weekCount} diese Woche</span>
            </div>

            <div className="px-6 pb-6">
              <div className="flex items-end justify-between gap-2 h-48 mt-4">
                {last7Days.map((day, index) => {
                  const rawHeight = maxCount > 0 ? (day.count / maxCount) * 100 : 0;
                  const height = day.count > 0 ? Math.max(rawHeight, 8) : 0;
                  const date = new Date(day.date);
                  const dayName = date.toLocaleDateString("de-DE", { weekday: "short" });
                  const isToday = index === last7Days.length - 1;

                  return (
                    <div key={day.date} className="flex-1 flex flex-col items-center gap-2">
                      {/* Count label */}
                      <div className="h-5 flex items-center justify-center">
                        {day.count > 0 && (
                          <span className={`text-xs font-bold tabular-nums ${isToday ? 'text-primary' : 'text-gray-400'}`}>
                            {day.count}
                          </span>
                        )}
                      </div>

                      {/* Bar */}
                      <div className="w-full relative h-36">
                        {/* Track */}
                        <div className="absolute inset-0 rounded-xl bg-white/5" />
                        {/* Fill — animates from 0 to height on mount */}
                        <div className="absolute bottom-0 left-0 right-0 rounded-xl overflow-hidden">
                          <div
                            className={`w-full transition-all duration-700 ease-out rounded-xl ${
                              isToday
                                ? "bg-gradient-to-t from-primary via-primary to-primary-light shadow-[0_0_20px_var(--shadow-glow)]"
                                : day.count > 0
                                ? "bg-gradient-to-t from-secondary/70 to-secondary"
                                : ""
                            }`}
                            style={{
                              height: mounted ? `${height}%` : '0%',
                              transitionDelay: `${index * 60}ms`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Day label */}
                      <p className={`text-xs font-medium ${isToday ? 'text-primary font-bold' : 'text-gray-500'}`}>
                        {dayName}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-5 pt-4 border-t border-white/8 flex items-center justify-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded bg-primary" />
                  <span className="text-xs text-gray-500">Heute</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded bg-secondary" />
                  <span className="text-xs text-gray-500">Andere Tage</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded bg-white/10" />
                  <span className="text-xs text-gray-500">Kein Eintrag</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Zurück-Button ── */}
          <div className="text-center pb-4">
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

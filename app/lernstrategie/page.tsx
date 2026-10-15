"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const STRATEGIE = [
  "Erkläre mir eventuelle Etymologien zu folgenden Wörtern",
  "Bringe jede Vokabel in je 3 kurze Beispielsätze mit klassischen Anwendungsfällen",
  "Vokabel abtippen, in die Luft malen, im Gehirn vor dem Auge replizieren, aussprechen",
  "Spanische Vokabeln kontextualisiert lesen und direkt zuordnen können. Es geht darum, spanische Wörter und Phrasen zu lesen und zu verstehen. Es ist der schnellere Weg um sie ins Gedächtnis zu bekommen und irgendwann per Medien zu wiederholen, so dass sie dann ins Langzeitgedächtnis gehen können.",
];

export default function LernstrategiePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 px-4 py-10">
        <div className="max-w-3xl mx-auto space-y-8">

          {/* ── Page Header ── */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-white tracking-tight">Lernstrategie</h1>
          </div>

          {/* ── Strategie-Liste ── */}
          <ol className="space-y-4">
            {STRATEGIE.map((text, i) => (
              <li
                key={i}
                className="flex gap-4 bg-white/[0.04] rounded-2xl border border-primary/25 px-5 py-4"
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <p className="text-gray-200 leading-relaxed pt-1">{text}</p>
              </li>
            ))}
          </ol>

          {/* ── Zurück-Button ── */}
          <div className="text-center pb-4">
            <Link
              href="/modules"
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

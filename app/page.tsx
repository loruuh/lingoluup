"use client";

import { useAuth } from "@/lib/useAuth";
import Link from "next/link";

const BookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 6.5C12 6.5 8 4 4 6V19C8 17 12 19.5 12 19.5C12 19.5 16 17 20 19V6C16 4 12 6.5 12 6.5Z" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 6.5V19.5" strokeLinecap="round"/>
  </svg>
);

const UserIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="8" r="4"/>
    <path d="M4 20C4 17.2386 7.58172 15 12 15C16.4183 15 20 17.2386 20 20" strokeLinecap="round"/>
  </svg>
);

const ChevronDown = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9L12 15L18 9" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function LandingPage() {
  const { user, loading } = useAuth();
  const isLoggedIn = !loading && !!user;
  const ctaHref = "/modules";

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ background: "#0d1117" }}>

      {/* SEKTION 1: Background Glow */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{ background: "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(132,204,22,0.10) 0%, transparent 70%)" }}
      />

      {/* SEKTION 2: Header */}
      <header
        className="sticky top-0 z-50 border-b border-white/[0.06]"
        style={{ background: "rgba(13,17,23,0.88)", backdropFilter: "blur(14px)" }}
      >
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-6 h-6 text-lime-400 group-hover:text-lime-300 transition-colors">
              <BookIcon />
            </div>
            <span className="font-bold text-base tracking-tight">
              <span className="text-white">LINGO</span>
              <span className="text-lime-500">LUUP</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href={isLoggedIn ? "/modules" : "/modules"}
              className={`transition-colors ${isLoggedIn ? "text-lime-400 hover:text-lime-300" : "text-gray-500 hover:text-gray-300"}`}
              title={isLoggedIn ? "Zu den Modulen" : "Registrieren"}
            >
              <UserIcon size={22} />
            </Link>
          </div>
        </div>
      </header>

      {/* SEKTION 3: Mobile Theme Hint */}
      <div className="md:hidden text-center py-2 text-[11px] text-gray-600 border-b border-white/[0.04]">
        Klicke auf die Palette unten rechts um das Theme zu wechseln
      </div>

      <main className="relative z-10">

        {/* SEKTION 4: Hero */}
        <section className="max-w-4xl mx-auto px-4 pt-16 pb-12 text-center">

          {/* 4a: Hero Logo */}
          <div className="flex flex-col items-center gap-5 mb-8">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-lime-400 p-3"
              style={{
                background: "rgba(132,204,22,0.08)",
                border: "1px solid rgba(132,204,22,0.20)",
                boxShadow: "0 0 48px rgba(132,204,22,0.14)",
              }}
            >
              <BookIcon />
            </div>
            <h1
              className="text-5xl sm:text-6xl font-black tracking-tight"
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #84cc16 55%, #65a30d 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              LINGOLUUP
            </h1>
          </div>

          {/* 4b: Main Headline */}
          <p className="text-2xl sm:text-3xl md:text-[2.1rem] font-bold text-white/90 leading-tight mb-4 text-balance max-w-3xl mx-auto">
            Schluss mit oberflächlichen Apps:{" "}
            <span className="text-lime-400">2.600</span> spanische Vokabeln für echte Gespräche.{" "}
            <span className="text-lime-400">Science-backed.</span>
          </p>

          {/* 4c: Feature Pillars */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-10 mb-10">
            {[
              { icon: "🎵", title: "Native Audio", sub: "für jede Vokabel" },
              { icon: "📚", title: "Context Learning", sub: "echte Beispielsätze" },
              { icon: "📈", title: "Progressive", sub: "5 Module: Tourist → Profi" },
            ].map((p, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <span className="text-xl">{p.icon}</span>
                <div className="text-left">
                  <div className="text-sm font-semibold text-white leading-tight">{p.title}</div>
                  <div className="text-xs text-gray-400 leading-tight">{p.sub}</div>
                </div>
                {i < 2 && <div className="hidden sm:block w-px h-8 bg-white/10 ml-4" />}
              </div>
            ))}
          </div>

          {/* 4d: CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex flex-col items-center gap-2">
              <Link
                href={ctaHref}
                className="relative overflow-hidden px-8 py-4 rounded-2xl font-bold text-base text-white landing-cta-shimmer"
                style={{
                  background: "linear-gradient(135deg, #84cc16 0%, #65a30d 100%)",
                  boxShadow: "0 0 32px rgba(132,204,22,0.35), 0 4px 16px rgba(0,0,0,0.3)",
                }}
              >
                <span className="relative z-10 sm:hidden">Kostenlos starten →</span>
                <span className="relative z-10 hidden sm:inline">Jetzt kostenlos starten →</span>
              </Link>
              <p className="text-[11px] text-gray-400">⚡ Module 1–2 komplett gratis. Kein Abo-Zwang.</p>
              <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                <span>🎯 Science-backed</span>
                <span>·</span>
                <span>🎵 2,600+ Audio</span>
                <span>·</span>
                <span>🇪🇸 Native Spanish</span>
              </div>
            </div>

            <Link
              href="/modules"
              className="px-8 py-4 rounded-2xl font-semibold text-sm text-white/60 border border-white/12 hover:border-white/25 hover:text-white/90 transition-all duration-200 hover:scale-[1.02]"
            >
              Zu den Modulen →
            </Link>
          </div>
        </section>

        {/* SEKTION 5: Scroll Indicator */}
        <div className="flex justify-center pb-14">
          <div className="animate-bounce text-gray-600">
            <ChevronDown />
          </div>
        </div>

        {/* SEKTION 6: Feature Grid */}
        <section className="max-w-5xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase text-lime-500 mb-3">Alles in einer App</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Was du mit LINGOLUUP machst:</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: "🎵", title: "Native Audio", desc: "für 2,600+ Vokabeln", bg: "rgba(132,204,22,0.06)", border: "rgba(132,204,22,0.22)" },
              { icon: "📚", title: "Beispielsätze", desc: "für JEDEN Begriff", bg: "rgba(132,204,22,0.06)", border: "rgba(132,204,22,0.22)" },
              { icon: "📈", title: "5 Progressive Module", desc: "Vom Tourist zum Profi", bg: "rgba(59,130,246,0.06)", border: "rgba(59,130,246,0.22)" },
              { icon: "💚", title: "Vokabelheft", desc: "mit Smart Badge", bg: "rgba(34,197,94,0.06)", border: "rgba(34,197,94,0.22)" },
              { icon: "🧠", title: "Science-backed", desc: "Bewährte Lernmethoden", bg: "rgba(168,85,247,0.06)", border: "rgba(168,85,247,0.22)" },
              { icon: "✨", title: "Und vieles mehr", desc: "Stetig wachsend", bg: "rgba(236,72,153,0.06)", border: "rgba(236,72,153,0.22)" },
            ].map((f, i) => (
              <div
                key={i}
                className="rounded-2xl p-5 transition-all duration-200 hover:scale-[1.02]"
                style={{ background: f.bg, border: `1px solid ${f.border}` }}
              >
                <div className="text-2xl mb-3">{f.icon}</div>
                <div className="font-bold text-white text-sm">{f.title}</div>
                <div className="text-xs text-gray-400 mt-1">{f.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* SEKTION 8: Target Audience */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold tracking-widest uppercase text-lime-500 mb-3">Für wen?</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">LINGOLUUP ist für dich, wenn du:</h2>
          </div>
          <div className="space-y-3">
            {[
              "Spanisch für Reisen lernen willst",
              "Duolingo satt hast und echte Gespräche führen willst",
              "Nach Spanien/Lateinamerika auswandern möchtest",
              "Beruflich Spanisch brauchst",
              "Science-backed Methoden bevorzugst",
              "Authentisches Spanisch lernen willst",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 rounded-xl"
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div
                  className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-lime-400"
                  style={{ background: "rgba(132,204,22,0.12)", border: "1px solid rgba(132,204,22,0.30)" }}
                >
                  <CheckIcon />
                </div>
                <span className="text-gray-200 text-sm sm:text-base">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* SEKTION 9: Screenshots */}
        <section className="max-w-5xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold tracking-widest uppercase text-lime-500 mb-3">Einblicke</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">So sieht LINGOLUUP aus:</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {["Module Overview", "Vokabel Card", "Beispielsatz", "Vokabelheft", "Statistik", "Settings"].map((label, i) => (
              <div
                key={i}
                className="aspect-[9/16] rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-[1.02]"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <span className="text-xs text-gray-600 font-medium">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* SEKTION 10: Pricing */}
        <section className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase text-lime-500 mb-3">Fairer Preis. Volle Leistung.</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Wähle deinen Plan:</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">

            {/* Free */}
            <div
              className="rounded-2xl p-6"
              style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <h3 className="text-lg font-bold text-white mb-1">Kostenlos</h3>
              <div className="text-4xl font-black text-white mb-1">0€</div>
              <div className="text-xs text-gray-500 mb-5">Für immer gratis</div>
              <ul className="space-y-2.5 mb-6">
                {["Module 1–2 komplett", "~800 Vokabeln", "Audio für alles", "Vokabelheft", "Unbegrenzt testen"].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="text-lime-400 font-bold">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={ctaHref}
                className="block w-full text-center py-3 rounded-xl font-semibold text-sm border border-white/12 text-white/70 hover:border-white/25 hover:text-white hover:bg-white/[0.04] transition-all"
              >
                Kostenlos starten
              </Link>
            </div>

            {/* Premium */}
            <div
              className="rounded-2xl p-6 relative"
              style={{
                background: "linear-gradient(135deg, rgba(132,204,22,0.07) 0%, rgba(101,163,13,0.04) 100%)",
                border: "1px solid rgba(132,204,22,0.28)",
              }}
            >
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span
                  className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full text-black"
                  style={{ background: "linear-gradient(135deg, #84cc16, #65a30d)" }}
                >
                  EMPFOHLEN
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Premium</h3>
              <div className="text-4xl font-black text-white mb-1">7,99€</div>
              <div className="text-xs text-gray-500 mb-5">Early Adopter Preis</div>
              <ul className="space-y-2.5 mb-6">
                {["Alle 5 Module", "2,600+ Vokabeln", "Bridge vocabulary", "Advanced verbs", "Redewendungen", "Jederzeit kündbar"].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="text-lime-400 font-bold">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={ctaHref}
                className="block w-full text-center py-3 rounded-xl font-bold text-sm text-black transition-all hover:opacity-90 hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg, #84cc16, #65a30d)" }}
              >
                Premium freischalten
              </Link>
              <div className="text-center mt-3 text-[11px] text-gray-500">
                Jahresabo: unter 7€/Monat
              </div>
            </div>
          </div>
        </section>

        {/* SEKTION 11: Testimonials */}
        <section className="max-w-5xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold tracking-widest uppercase text-lime-500 mb-3">Was Nutzer sagen</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">Bereits von Spanish Lernern genutzt</h2>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-lime-500 animate-pulse-strong" />
              <span className="text-sm text-gray-400">Bereits von Spanish Lernern in Deutschland genutzt</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { name: "Anna M.", label: "A2→B1 Level", text: "Die Beispielsätze sind Gold wert. Endlich Kontext!" },
              { name: "Thomas K.", label: "Reisender", text: "Vokabeln die ich wirklich brauche, nicht Lehrbuch-Deutsch" },
              { name: "Sarah L.", label: "Auswanderin", text: "Das Audio hat meine Aussprache komplett verbessert" },
            ].map((t, i) => (
              <div
                key={i}
                className="rounded-2xl p-5 transition-all duration-200 hover:scale-[1.02]"
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <p className="text-gray-300 text-sm italic mb-4">&ldquo;{t.text}&rdquo;</p>
                <div className="font-bold text-white text-sm">{t.name}</div>
                <div className="text-xs text-gray-500">{t.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* SEKTION 12: Disclaimer */}
        <div className="max-w-3xl mx-auto px-4 pb-4 text-center">
          <p className="text-xs text-gray-700">
            LingoLuup ist ein Lernwerkzeug und ersetzt keinen professionellen Sprachkurs oder Lehrer.
          </p>
        </div>

        {/* Footer CTA */}
        <section className="max-w-2xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Bereit für echte Spanisch-Gespräche?
          </h2>
          <Link
            href={ctaHref}
            className="relative overflow-hidden inline-block px-10 py-4 rounded-2xl font-bold text-base text-white landing-cta-shimmer"
            style={{
              background: "linear-gradient(135deg, #84cc16 0%, #65a30d 100%)",
              boxShadow: "0 0 40px rgba(132,204,22,0.28), 0 4px 20px rgba(0,0,0,0.3)",
            }}
          >
            <span className="relative z-10">Jetzt kostenlos starten →</span>
          </Link>
          <p className="text-xs text-gray-600 mt-4">⚡ Module 1–2 komplett gratis · Kein Abo-Zwang</p>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-8 text-xs text-gray-600">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm">
              <span className="text-white/80">LINGO</span>
              <span className="text-lime-500">LUUP</span>
            </span>
            <span>— Spanisch lernen. Richtig.</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/impressum" className="hover:text-gray-400 transition-colors">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-gray-400 transition-colors">Datenschutz</Link>
            <Link href="/modules" className="hover:text-lime-500 transition-colors text-lime-600">App →</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

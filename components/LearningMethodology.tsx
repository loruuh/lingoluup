'use client';

import { useState } from 'react';

export function LearningMethodology() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl border border-blue-500/30 hover:border-blue-500/50 transition-all"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">🎓</span>
          <span className="text-white font-semibold text-lg">
            Warum LINGOLUUP so effektiv ist
          </span>
        </div>
        <span className="text-xl text-blue-400 font-bold">
          {isExpanded ? '−' : '+'}
        </span>
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-4">

          {/* Pareto-Prinzip */}
          <div className="flex gap-4 p-4 bg-emerald-900/20 rounded-xl border border-emerald-500/20">
            <span className="text-3xl">📊</span>
            <div>
              <h4 className="text-emerald-400 font-bold mb-1">
                Das Pareto-Prinzip: 500 Wörter = 80% Verständnis
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                Mit nur 500 der häufigsten spanischen Wörter verstehst du bereits 80% aller Alltagsgespräche!
                Das ist das Pareto-Prinzip in Aktion: 20% Input für 80% Output.
                Bei nur 25 Wörtern pro Tag bist du in 20 Tagen durch –
                und hast damit eine solide Basis für echte Gespräche! 🚀
              </p>
            </div>
          </div>

          {/* Active Recall */}
          <div className="flex gap-4 p-4 bg-blue-900/20 rounded-xl border border-blue-500/20">
            <span className="text-3xl">🧠</span>
            <div>
              <h4 className="text-blue-400 font-bold mb-1">
                Active Recall: Erst denken, dann aufdecken
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                Du siehst zuerst das deutsche Wort.
                Dein Gehirn aktiviert sich: &quot;Wie heißt das nochmal auf Spanisch?&quot;
                Dieser aktive Abruf-Prozess (Active Recall) ist{' '}
                <span className="text-blue-300 font-semibold">bis zu 10x effektiver</span> als passives Lesen.
                Erst dann deckst du die Lösung auf – maximaler Lerneffekt! 💡
              </p>
            </div>
          </div>

          {/* Kontextuelles Lernen */}
          <div className="flex gap-4 p-4 bg-amber-900/20 rounded-xl border border-amber-500/20">
            <span className="text-3xl">📝</span>
            <div>
              <h4 className="text-amber-400 font-bold mb-1">
                Wörter im Kontext: So lernt dein Gehirn am besten
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                Nach dem Wort siehst du einen kompletten spanischen Satz.
                Das ist kontextuelles Lernen – du merkst dir nicht nur &quot;caminar = laufen/gehen&quot;,
                sondern &quot;Me gusta caminar por el parque&quot; = ein lebendiges Bild im Kopf!
                Dein Gehirn speichert Wörter{' '}
                <span className="text-amber-300 font-semibold">3x besser</span>,
                wenn sie in echten Sätzen vorkommen. 🎯
              </p>
            </div>
          </div>

          {/* Multimodales Lernen */}
          <div className="flex gap-4 p-4 bg-pink-900/20 rounded-xl border border-pink-500/20">
            <span className="text-3xl">🔊</span>
            <div>
              <h4 className="text-pink-400 font-bold mb-1">
                Hören + Sprechen = Doppelter Effekt
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                Mit dem 🔊 Lautsprecher-Button hörst du die korrekte Aussprache.
                Noch besser: Sprich die Sätze laut nach!
                Motorisches Lernen (Mund bewegen) + auditives Lernen (hören) + visuelles Lernen (sehen) ={' '}
                <span className="text-pink-300 font-semibold">multimodales Lernen</span>.
                Dein Gehirn speichert auf 3 Kanälen gleichzeitig! 🎤
              </p>
            </div>
          </div>

          {/* Rückübersetzung */}
          <div className="flex gap-4 p-4 bg-violet-900/20 rounded-xl border border-violet-500/20">
            <span className="text-3xl">🔄</span>
            <div>
              <h4 className="text-violet-400 font-bold mb-1">
                Reverse Translation: Beide Richtungen trainieren
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                Wenn du den spanischen Satz siehst, kannst du einen Moment innehalten:
                &quot;Was könnte das auf Deutsch bedeuten?&quot;
                Erst dann klickst du weiter zum deutschen Satz.
                So trainierst du beide Übersetzungsrichtungen –
                essentiell für echte Gespräche! 🔁
              </p>
            </div>
          </div>

          {/* Vokabelheft */}
          <div className="flex gap-4 p-4 bg-cyan-900/20 rounded-xl border border-cyan-500/20">
            <span className="text-3xl">📚</span>
            <div>
              <h4 className="text-cyan-400 font-bold mb-1">
                Dein persönliches Vokabelheft: Wiederholung ist der Schlüssel
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                Markiere schwierige Wörter mit dem ❤️ Herz-Symbol –
                sie landen direkt in deinem Vokabelheft!
                Dort kannst du Spalten ausblenden (z.B. nur Spanisch zeigen)
                und gezielt die Wörter wiederholen, die du noch nicht drauf hast.
                Spaced Repetition auf deine Art! 📖
              </p>
            </div>
          </div>

          {/* Geschwindigkeit */}
          <div className="flex gap-4 p-4 bg-orange-900/20 rounded-xl border border-orange-500/20">
            <span className="text-3xl">⚡</span>
            <div>
              <h4 className="text-orange-400 font-bold mb-1">
                Rasanter Fortschritt: In 20 Tagen zur Konversationsfähigkeit
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                Während traditionelle Apps dich mit Grammatikregeln und endlosen Lektionen ausbremsen,
                fokussiert sich LINGOLUUP auf das Wesentliche: die häufigsten 500 Wörter.
                Das Ergebnis? Du lernst 10-15 Minuten täglich und kannst nach nur{' '}
                <span className="text-orange-300 font-semibold">20 Tagen echte Gespräche führen!</span>
                Keine monatelangen Kurse – nur pure Effizienz. ⚡
              </p>
            </div>
          </div>

          {/* Call-to-Action */}
          <div className="text-center p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl border border-blue-500/20">
            <p className="text-white font-bold text-lg">
              💪 Wissenschaftlich fundiert. Praktisch umgesetzt.
            </p>
            <p className="text-blue-300 mt-1">
              25 Wörter pro Tag ={' '}
              <span className="font-bold text-white">Fließend Spanisch in wenigen Wochen!</span>
            </p>
          </div>

        </div>
      )}
    </div>
  );
}

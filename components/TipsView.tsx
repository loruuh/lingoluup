"use client";

import { useState } from "react";
import { useModule } from "@/lib/ModuleContext";
import ausspracheTipps from "@/data/modules/aussprache-tipps.json";
import type { TipQuizItem } from "@/lib/ModuleContext";

function QuizSection({ quiz }: { quiz: TipQuizItem[] }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});

  return (
    <div className="mt-4 space-y-3">
      <p className="text-[10px] font-bold tracking-widest uppercase text-emerald-400">
        Teste dich
      </p>
      {quiz.map((q, qi) => {
        const selected = answers[qi];
        const answered = selected !== undefined;

        return (
          <div key={qi}>
            <p className="text-sm text-gray-300 mb-2 leading-relaxed">{q.question}</p>
            <div className="flex flex-wrap gap-2">
              {q.options.map((opt, oi) => {
                const isSelected = selected === oi;
                const isCorrect = oi === q.correct;
                let style: React.CSSProperties = {
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  color: "#9ca3af",
                };
                if (answered && isSelected && isCorrect) {
                  style = { background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.35)", color: "#34d399" };
                } else if (answered && isSelected && !isCorrect) {
                  style = { background: "rgba(239,68,68,0.10)", border: "1px solid rgba(239,68,68,0.30)", color: "#f87171" };
                } else if (answered && isCorrect) {
                  style = { background: "rgba(52,211,153,0.07)", border: "1px solid rgba(52,211,153,0.22)", color: "#34d399" };
                }

                return (
                  <button
                    key={oi}
                    onClick={() => !answered && setAnswers((p) => ({ ...p, [qi]: oi }))}
                    disabled={answered}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150"
                    style={style}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {answered && (
              <p className="mt-2 text-xs text-gray-500 leading-relaxed">
                {answers[qi] === q.correct ? "✅ " : "❌ "}{q.explanation}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function TipsView() {
  const { clearModule } = useModule();

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="w-full max-w-2xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={clearModule}
            className="text-sm text-primary hover:text-primary-light transition-colors"
          >
            ← Module
          </button>
          <h1 className="text-base font-bold text-white">
            {ausspracheTipps.icon} {ausspracheTipps.name}
          </h1>
          <div className="w-20" />
        </div>

        {/* Tips */}
        <div className="space-y-4">
          {ausspracheTipps.tips.map((tip) => (
            <div
              key={tip.id}
              className="rounded-xl p-5 space-y-3"
              style={{ background: "rgba(52,211,153,0.05)", border: "1px solid rgba(52,211,153,0.18)" }}
            >
              <h2 className="text-base font-bold" style={{ color: "#34d399" }}>
                {tip.title}
              </h2>

              <p className="text-sm text-gray-300 leading-relaxed">{tip.rule}</p>

              {tip.mnemonic && (
                <div className="rounded-lg p-3" style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.20)" }}>
                  <p className="text-xs text-emerald-300">{tip.mnemonic}</p>
                </div>
              )}

              <div className="space-y-1">
                <p className="text-[10px] font-bold tracking-widest uppercase text-gray-500">Beispiele</p>
                {tip.examples.map((ex, i) => (
                  <p key={i} className="text-sm text-gray-400 pl-3">{ex}</p>
                ))}
              </div>

              {tip.quiz && tip.quiz.length > 0 && (
                <QuizSection quiz={tip.quiz as TipQuizItem[]} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

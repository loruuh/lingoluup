"use client";

import { useState } from "react";
import { useModule, type LessonsModule, type LessonItem } from "@/lib/ModuleContext";

function parseBold(text: string) {
  return text.split(/\*\*(.*?)\*\*/g).map((part, i) =>
    i % 2 === 1
      ? <strong key={i} className="text-white font-semibold">{part}</strong>
      : part
  );
}

function ExplanationText({ text }: { text: string }) {
  return (
    <div className="space-y-3">
      {text.split("\n\n").map((block, i) => (
        <p key={i} className="text-gray-300 text-sm leading-relaxed">
          {block.split("\n").map((line, j) => (
            <span key={j}>
              {parseBold(line)}
              {j < block.split("\n").length - 1 && <br />}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}

function QuizSection({ quiz }: { quiz: LessonItem["quiz"] }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});

  return (
    <div className="space-y-4">
      <p className="text-[11px] font-bold tracking-widest uppercase text-lime-500 mb-3">
        Quiz — teste dich selbst
      </p>
      {quiz.map((q, qi) => {
        const selected = answers[qi];
        const answered = selected !== undefined;

        return (
          <div
            key={qi}
            className="rounded-xl p-4"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <p className="text-sm text-gray-200 mb-3 leading-relaxed">{q.question}</p>
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
                  style = { background: "rgba(132,204,22,0.12)", border: "1px solid rgba(132,204,22,0.35)", color: "#84cc16" };
                } else if (answered && isSelected && !isCorrect) {
                  style = { background: "rgba(239,68,68,0.10)", border: "1px solid rgba(239,68,68,0.30)", color: "#f87171" };
                } else if (answered && isCorrect) {
                  style = { background: "rgba(132,204,22,0.07)", border: "1px solid rgba(132,204,22,0.22)", color: "#84cc16" };
                }

                return (
                  <button
                    key={oi}
                    onClick={() => !answered && setAnswers((p) => ({ ...p, [qi]: oi }))}
                    className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150"
                    style={style}
                    disabled={answered}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {answered && (
              <p className="mt-3 text-xs text-gray-400 leading-relaxed">
                {answers[qi] === q.correct ? "✅ " : "❌ "}
                {q.explanation}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

function LessonCard({ lesson }: { lesson: LessonItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: "rgba(132,204,22,0.04)", border: "1px solid rgba(132,204,22,0.14)" }}
    >
      {/* Header */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full text-left p-5 flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="font-bold text-white text-base">{lesson.title}</h2>
              <span
                className="text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
                style={{ background: "rgba(132,204,22,0.10)", color: "#84cc16", border: "1px solid rgba(132,204,22,0.22)" }}
              >
                {lesson.category}
              </span>
            </div>
            <p className="text-[11px] text-gray-600 capitalize">{lesson.difficulty}</p>
          </div>
        </div>
        <span className="text-gray-600 shrink-0 transition-transform duration-200" style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}>
          →
        </span>
      </button>

      {open && (
        <div className="px-5 pb-6 space-y-6 border-t border-white/[0.05]">

          {/* Explanation */}
          <div className="pt-5">
            <p className="text-[11px] font-bold tracking-widest uppercase text-lime-500 mb-3">Erklärung</p>
            <ExplanationText text={lesson.explanation_de} />
          </div>

          {/* Examples */}
          <div>
            <p className="text-[11px] font-bold tracking-widest uppercase text-lime-500 mb-3">Beispiele</p>
            <div className="space-y-3">
              {lesson.examples.map((ex, i) => (
                <div
                  key={i}
                  className="rounded-xl p-4"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:gap-4 gap-1 mb-2">
                    <p className="font-semibold text-lime-400 text-sm sm:w-56 shrink-0">{ex.spanish}</p>
                    <p className="text-gray-400 text-sm">{ex.german}</p>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{ex.explanation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quiz */}
          {lesson.quiz.length > 0 && <QuizSection quiz={lesson.quiz} />}
        </div>
      )}
    </div>
  );
}

export default function LektionenView() {
  const { selectedModule, clearModule } = useModule();
  const module = selectedModule as LessonsModule;

  return (
    <div className="min-h-screen relative" style={{ background: "#0d1117" }}>
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{ background: "radial-gradient(ellipse 70% 35% at 50% 0%, rgba(132,204,22,0.07) 0%, transparent 65%)" }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8 space-y-6">

        {/* Back + title */}
        <div className="flex items-center justify-between">
          <button
            onClick={clearModule}
            className="flex items-center gap-1.5 text-sm text-primary hover:text-primary-light transition-colors"
          >
            ← Module
          </button>
          <h1 className="text-base font-bold text-white">
            {module.icon} {module.name}
          </h1>
          <div className="w-20" />
        </div>

        {/* Lessons */}
        <div className="space-y-4">
          {module.lessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>

      </div>
    </div>
  );
}

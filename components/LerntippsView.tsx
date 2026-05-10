"use client";

import { useState } from "react";
import { useModule, type TipsModule } from "@/lib/ModuleContext";

interface LerntippItem {
  id: string;
  title: string;
  category: string;
  content_de: string;
  practical_tip: string;
}

function parseBold(text: string) {
  return text.split(/\*\*(.*?)\*\*/g).map((part, i) =>
    i % 2 === 1
      ? <strong key={i} className="text-lime-400 font-semibold">{part}</strong>
      : part
  );
}

function TipCard({ tip, index }: { tip: LerntippItem; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-lime-500/30 transition-all duration-300">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-5 flex items-start gap-4 text-left hover:bg-white/5 transition-colors"
      >
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-lime-500/15 flex items-center justify-center text-lime-400 font-bold text-lg border border-lime-500/20">
          {index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white mb-1">{tip.title}</h3>
          <p className="text-sm text-gray-400">{tip.category}</p>
        </div>
        <div
          className="flex-shrink-0 text-gray-400 transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          ▼
        </div>
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-4 border-t border-white/5">
          <div className="pt-4">
            {tip.content_de.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-gray-300 leading-relaxed mb-3">
                {parseBold(paragraph)}
              </p>
            ))}
          </div>
          <div className="bg-lime-500/10 border border-lime-500/20 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">💡</span>
              <div>
                <h4 className="text-sm font-semibold text-lime-400 mb-1">Praktischer Tipp</h4>
                <p className="text-sm text-gray-300 leading-relaxed">{tip.practical_tip}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LerntippsView() {
  const { selectedModule, clearModule } = useModule();

  if (!selectedModule || selectedModule.type !== "tips") return null;

  const tipsModule = selectedModule as TipsModule;
  const tips = tipsModule.tips as unknown as LerntippItem[];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <button
            onClick={clearModule}
            className="text-sm text-primary hover:text-primary-light transition-colors"
          >
            ← Module
          </button>
        </div>

        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{tipsModule.icon}</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{tipsModule.name}</h1>
          <p className="text-gray-400 text-lg">{tipsModule.description}</p>
        </div>

        <div className="bg-gradient-to-r from-lime-500/10 to-emerald-500/10 border border-lime-500/20 rounded-2xl p-6 mb-8">
          <p className="text-gray-300 leading-relaxed text-center">
            Diese 8 Lerntipps basieren auf{" "}
            <strong className="text-lime-400">wissenschaftlichen Erkenntnissen</strong> aus der
            Neurowissenschaft und Lernpsychologie. Sie erklären, wie dein Gehirn am besten lernt –
            und wie du LingoLuup optimal nutzt! 🧠
          </p>
        </div>

        <div className="space-y-4">
          {tips.map((tip, index) => (
            <TipCard key={tip.id} tip={tip} index={index} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <p className="text-gray-300 mb-4">
              Jetzt weißt du, <strong className="text-lime-400">wie</strong> dein Gehirn lernt.
            </p>
            <p className="text-lg text-white font-semibold">Zeit, es anzuwenden! 🚀</p>
          </div>
        </div>
      </div>
    </div>
  );
}

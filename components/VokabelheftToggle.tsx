"use client";

interface VokabelheftToggleProps {
  hideGerman: boolean;
  hideSpanish: boolean;
  onToggleGerman: () => void;
  onToggleSpanish: () => void;
}

export default function VokabelheftToggle({
  hideGerman,
  hideSpanish,
  onToggleGerman,
  onToggleSpanish,
}: VokabelheftToggleProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-6">
      <button
        onClick={onToggleGerman}
        className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95 ${
          hideGerman
            ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
            : "bg-white/5 text-gray-300 border-white/10 hover:border-primary/40 hover:text-white hover:bg-primary/10"
        }`}
      >
        {hideGerman ? "👁 Deutsch anzeigen" : "Deutsch ausblenden"}
      </button>

      <button
        onClick={onToggleSpanish}
        className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95 ${
          hideSpanish
            ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
            : "bg-white/5 text-gray-300 border-white/10 hover:border-primary/40 hover:text-white hover:bg-primary/10"
        }`}
      >
        {hideSpanish ? "👁 Spanisch anzeigen" : "Spanisch ausblenden"}
      </button>
    </div>
  );
}

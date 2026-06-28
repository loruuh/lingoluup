"use client";

import { useState, useEffect } from "react";
import { useModule } from "@/lib/ModuleContext";
import ModuleSelection from "@/components/ModuleSelection";
import TipsView from "@/components/TipsView";
import LektionenView from "@/components/LektionenView";
import LerntippsView from "@/components/LerntippsView";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Flashcard from "@/components/Flashcard";
import Sentence from "@/components/Sentence";
import SpeakButton from "@/components/SpeakButton";
import FavoriteButton from "@/components/FavoriteButton";
import NextButton from "@/components/NextButton";
import OnboardingOverlay from "@/components/OnboardingOverlay";
import ConfettiAnimation from "@/components/ConfettiAnimation";
import VocabListModal from "@/components/VocabListModal";
import { useStreak } from "@/components/StreakCounter";
import { playSound } from "@/lib/sounds";
import {
  selectNextVocab,
  markVocabAsSeen,
  type Vocabulary,
} from "@/lib/spaced-repetition";
import {
  addToHistory,
  incrementStats,
  getTodayGoal,
  incrementTodayGoal,
  setTodayGoalCount,
  type DailyGoal,
} from "@/lib/local-storage";
import { loadProgressFromDb, syncProgressToDb } from "@/lib/daily-progress-db";
import {
  ensureAnonSession,
  getProgress,
  markSeen,
  pickNext,
} from "@/lib/round-robin";

export default function Home() {
  const { selectedModule, clearModule, getModuleVocab } = useModule();
  const streak = useStreak();

  const [currentVocab, setCurrentVocab] = useState<Vocabulary | null>(null);
  const [spanishSentence, setSpanishSentence] = useState<string>("");
  const [germanSentence, setGermanSentence] = useState<string>("");
  const [isRevealed, setIsRevealed] = useState(false);
  const [showSentence, setShowSentence] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [dailyGoal, setDailyGoal] = useState<DailyGoal | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showMilestone, setShowMilestone] = useState(false);
  const [milestoneText, setMilestoneText] = useState("");
  const [showVocabList, setShowVocabList] = useState(false);

  // Round-robin coverage state
  const [rrSeenSet, setRrSeenSet] = useState<Set<string>>(new Set());
  const [rrSeenCount, setRrSeenCount] = useState(0);
  const [rrTotal, setRrTotal] = useState(0);
  const [rrRound, setRrRound] = useState(1);
  const [playCounts, setPlayCounts] = useState<Record<string, number>>({});

  // Ensure anon Supabase session once on mount (fails gracefully → localStorage)
  useEffect(() => {
    ensureAnonSession();
  }, []);

  // Check onboarding status beim Mount
  useEffect(() => {
    const onboardingComplete = localStorage.getItem("onboardingComplete");
    if (onboardingComplete !== "true") {
      setShowOnboarding(true);
      setIsInitialized(true);
    } else {
      setIsInitialized(true);
    }
  }, []);

  const resetCardState = () => {
    setIsRevealed(false);
    setShowSentence(false);
    setShowNextButton(false);
    setSpanishSentence("");
    setGermanSentence("");
  };

  // ── Round-robin initial loader (module mode) ──────────────────────────────
  const loadRoundRobinVocab = async (moduleId: string) => {
    setIsLoading(true);
    resetCardState();
    try {
      const moduleVocab = getModuleVocab(moduleId);
      const progress = await getProgress(moduleId);
      setRrSeenSet(progress.seenIds);
      setRrSeenCount(progress.seenIds.size);
      setRrTotal(moduleVocab.length);
      setRrRound(progress.round);
      setPlayCounts(progress.playCounts);
      const next = pickNext(moduleId, moduleVocab, progress.seenIds);
      if (next) setCurrentVocab(next);
      incrementStats();
    } catch (error) {
      console.error("Fehler beim Laden der RR-Vokabel:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // ── SR loader — kept intact for global mode (Change 2) ────────────────────
  // This path is unreachable from modules/page.tsx (no-module case returns
  // <ModuleSelection>), but is preserved so SR data is never accidentally wired
  // into the module path.
  const loadNextVocab = () => {
    setIsLoading(true);
    resetCardState();
    try {
      let vocab: Vocabulary;
      if (selectedModule && selectedModule.type !== "tips") {
        const moduleVocabs = getModuleVocab(selectedModule.id);
        vocab = selectNextVocab(moduleVocabs, selectedModule.id);
        markVocabAsSeen(vocab.id, selectedModule.id);
      } else {
        vocab = selectNextVocab();
        markVocabAsSeen(vocab.id);
      }
      setCurrentVocab(vocab);
      incrementStats();
    } catch (error) {
      console.error("Fehler beim Laden der Vokabel:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Lade Daily Goal + erste Vokabel wenn ein Modul ausgewählt wird
  useEffect(() => {
    if (
      selectedModule &&
      selectedModule.type !== "tips" &&
      selectedModule.type !== "lessons" &&
      isInitialized &&
      !showOnboarding
    ) {
      const localGoal = getTodayGoal(selectedModule.id);
      setDailyGoal(localGoal);

      // Reset coverage counters while new module loads
      setRrSeenSet(new Set());
      setRrSeenCount(0);
      setRrTotal(0);
      setRrRound(1);

      // Module mode → round-robin only (Change 2: SR not called here)
      loadRoundRobinVocab(selectedModule.id);

      // DB-Sync: Falls User eingeloggt ist, DB-Wert laden (höherer Wert gewinnt)
      loadProgressFromDb(selectedModule.id).then((dbCount) => {
        if (dbCount !== null && dbCount > localGoal.completed) {
          const synced = setTodayGoalCount(selectedModule.id, dbCount);
          setDailyGoal(synced);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedModule, isInitialized]);

  const handleReveal = () => {
    setIsRevealed(true);
    if (!currentVocab) return;
    setSpanishSentence(currentVocab.sentence_es);
    setGermanSentence(currentVocab.sentence_de);
    setShowSentence(true);
    addToHistory({
      vocabId: currentVocab.id,
      sentence: currentVocab.sentence_es,
      timestamp: new Date().toISOString(),
    });
  };

  const handleTranslationRevealed = () => {
    setShowNextButton(true);
  };

  // ── "Nächster Satz" handler ───────────────────────────────────────────────
  const handleNext = async () => {
    if (!currentVocab) return;

    if (selectedModule) {
      // ── MODULE MODE: round-robin path ────────────────────────────────────
      // Change 1: markSeen fires here (on Weiter), never on display.
      // Change 2: selectNextVocab / markVocabAsSeen (SR) are NOT called.
      const moduleVocab = getModuleVocab(selectedModule.id);
      const allVocabIds = moduleVocab.map((v) => v.id);

      setIsLoading(true);
      resetCardState();

      const result = await markSeen(selectedModule.id, currentVocab.id, allVocabIds);
      setRrSeenSet(result.newSeenSet);
      setRrSeenCount(result.seenCount);
      setRrTotal(result.total);
      setRrRound(result.round);
      setPlayCounts(result.playCounts);

      // Daily goal
      const updated = incrementTodayGoal(selectedModule.id);
      setDailyGoal(updated);
      syncProgressToDb(selectedModule.id, updated.completed);
      const newCount = updated.completed;

      // Milestone toasts (count-based)
      if ([5, 10, 15, 20].includes(newCount)) {
        setMilestoneText(`${newCount} von ${updated.goal}!`);
        setShowMilestone(true);
        playSound("milestone");
        setTimeout(() => setShowMilestone(false), 2000);
      }

      if (newCount === updated.goal) {
        setMilestoneText("Tagesziel erreicht!");
        setShowMilestone(true);
        setShowConfetti(true);
        playSound("complete");
        setTimeout(() => {
          setShowConfetti(false);
          setShowMilestone(false);
        }, 5000);
      } else if (newCount < updated.goal) {
        playSound("correct");
      }

      // Round-complete toast (overwrites count toast when both fire simultaneously)
      if (result.roundJustCompleted) {
        const completedRound = result.round - 1;
        setMilestoneText(`Runde ${completedRound} komplett! ↺`);
        setShowMilestone(true);
        playSound("milestone");
        setTimeout(() => setShowMilestone(false), 3000);
      }

      // Pick next word using the fresh seen set returned by markSeen
      const next = pickNext(selectedModule.id, moduleVocab, result.newSeenSet);
      if (next) setCurrentVocab(next);
      setIsLoading(false);
    } else {
      // ── GLOBAL / NO-MODULE MODE: SR path unchanged (Change 2) ────────────
      // Unreachable from this component (no selectedModule → ModuleSelection),
      // kept so the SR branch is never accidentally merged into module mode.
      const updated = incrementTodayGoal("global");
      setDailyGoal(updated);
      const newCount = updated.completed;

      if ([5, 10, 15, 20].includes(newCount)) {
        setMilestoneText(`${newCount} von ${updated.goal}!`);
        setShowMilestone(true);
        playSound("milestone");
        setTimeout(() => setShowMilestone(false), 2000);
      }

      if (newCount === updated.goal) {
        setMilestoneText("Tagesziel erreicht!");
        setShowMilestone(true);
        setShowConfetti(true);
        playSound("complete");
        setTimeout(() => {
          setShowConfetti(false);
          setShowMilestone(false);
        }, 5000);
      } else if (newCount < updated.goal) {
        playSound("correct");
      }

      loadNextVocab();
    }
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem("onboardingComplete", "true");
    setShowOnboarding(false);
  };

  const handleBackToModules = () => {
    setCurrentVocab(null);
    setDailyGoal(null);
    clearModule();
  };

  // Onboarding
  if (showOnboarding) {
    return (
      <div className="min-h-screen flex flex-col">
        <OnboardingOverlay onComplete={handleOnboardingComplete} />
      </div>
    );
  }

  // Kein Modul gewählt → Modul-Auswahl
  if (!selectedModule) {
    return <ModuleSelection />;
  }

  // Lerntipps-Modul → LerntippsView
  if (selectedModule.id === "lerntipps") {
    return <LerntippsView />;
  }

  // Tipps-Modul → TipsView
  if (selectedModule.type === "tips") {
    return <TipsView />;
  }

  // Lektionen-Modul → LektionenView
  if (selectedModule.type === "lessons") {
    return <LektionenView />;
  }

  // Loading / noch keine Vokabel
  if (!isInitialized || !currentVocab) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-500 mt-4 text-sm">Lädt...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleMainClick = () => {
    if (isLoading) return;
    if (!isRevealed) {
      handleReveal();
    } else if (!showNextButton) {
      setShowNextButton(true);
    } else {
      handleNext();
    }
  };

  const goalPercent = dailyGoal
    ? Math.min((dailyGoal.completed / dailyGoal.goal) * 100, 100)
    : 0;
  const goalReached = dailyGoal ? dailyGoal.completed >= dailyGoal.goal : false;
  const remaining = dailyGoal ? dailyGoal.goal - dailyGoal.completed : 25;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Confetti bei Tagesziel */}
      {showConfetti && <ConfettiAnimation />}

      {/* Milestone Popup */}
      {showMilestone && (
        <div className="fixed inset-0 pointer-events-none z-40 flex items-center justify-center">
          <div className="animate-milestone-pop bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-2xl shadow-2xl text-2xl font-bold">
            {milestoneText}
          </div>
        </div>
      )}

      {/* Top Bar: Zurück + Wortliste + Coverage Counter + Streak */}
      <div className="px-4 pt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={handleBackToModules}
            aria-label="Zurück zu Modulen"
            className="group flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-primary hover:text-primary-light rounded-full border border-white/10 hover:border-primary/40 transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <span className="text-sm transition-transform duration-200 group-hover:-translate-x-0.5">←</span>
            <span className="font-semibold text-sm">Module</span>
          </button>
          {(selectedModule?.type === "vocabulary" || selectedModule?.type === "phrases") && (
            <button
              onClick={() => setShowVocabList(true)}
              aria-label="Wortliste anzeigen"
              className="flex items-center gap-1.5 px-3 py-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-primary rounded-full border border-white/10 hover:border-primary/40 transition-all duration-200 active:scale-95"
            >
              <span className="text-sm">📋</span>
              <span className="font-medium text-sm hidden sm:inline">Wortliste</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Coverage Counter: "seen / total ↺round" */}
          {rrTotal > 0 && (
            <span className="text-xs font-medium tabular-nums text-gray-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
              {rrSeenCount}&nbsp;/&nbsp;{rrTotal}&nbsp;↺{rrRound}
            </span>
          )}

          {streak > 1 && (
            <div className="flex items-center gap-1.5 bg-orange-500/15 border border-orange-500/25 px-3 py-1.5 rounded-full">
              <span className="text-base">🔥</span>
              <span className="text-sm font-bold text-orange-400">{streak} Tage</span>
            </div>
          )}
        </div>
      </div>

      {/* Daily Goal Progress Bar */}
      {dailyGoal && (
        <div className="px-4 pt-3 pb-1">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-500">
                Tagesziel
              </span>
              <span className={`text-xs font-bold tabular-nums ${goalReached ? "text-green-400" : "text-gray-300"}`}>
                {dailyGoal.completed} / {dailyGoal.goal}
              </span>
            </div>
            <div className="w-full bg-white/8 rounded-full h-2 overflow-hidden">
              <div
                className={`h-2 rounded-full transition-all duration-700 ease-out ${
                  goalReached
                    ? "bg-gradient-to-r from-green-400 to-emerald-500"
                    : "bg-gradient-to-r from-primary to-purple-500"
                }`}
                style={{ width: `${goalPercent}%` }}
              />
            </div>
            {goalReached && (
              <p className="text-xs text-green-400 mt-1.5 text-center font-medium">
                Tagesziel erreicht! Gut gemacht! 🎉
              </p>
            )}
            {!goalReached && dailyGoal.completed > 0 && (
              <p className="text-xs text-gray-500 mt-1.5 text-center">
                Noch {remaining} bis zum Ziel
              </p>
            )}
          </div>
        </div>
      )}

      <main
        className="flex-1 flex items-center justify-center px-4 py-6"
      >
        <div className="w-full max-w-3xl space-y-8">
          {/* Flashcard */}
          <Flashcard
            key={currentVocab.id}
            german={currentVocab.german}
            spanish={currentVocab.spanish}
            onReveal={handleMainClick}
            isRevealed={isRevealed}
          />

          {/* Favorite Button */}
          <div className={`flex justify-center transition-all duration-300 min-h-[2.5rem] items-center ${isRevealed ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            <FavoriteButton vocabId={currentVocab.id} />
          </div>

          {/* Beispielsatz mit Speaker */}
          <div className={`transition-all duration-300 ${showSentence ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            <div className="flex items-start gap-3 justify-center">
              <div className="flex-1 max-w-2xl">
                <Sentence
                  spanishSentence={spanishSentence || "..."}
                  germanSentence={germanSentence || "..."}
                  isVisible={showSentence}
                  onTranslationRevealed={handleTranslationRevealed}
                  germanRevealed={showNextButton}
                />
              </div>
              <div className="pt-1 shrink-0">
                <SpeakButton
                  text={spanishSentence || ""}
                  audioUrl={currentVocab?.audio}
                />
              </div>
            </div>
          </div>

          {/* LATAM Note */}
          {currentVocab.note && showSentence && (
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full">
                <span className="text-amber-400 text-xs">🇪🇸</span>
                <span className="text-amber-300/80 text-xs">{currentVocab.note}</span>
              </div>
            </div>
          )}

          {/* Next Button */}
          <div className={`flex justify-center transition-all duration-300 min-h-[3.5rem] items-center ${showNextButton ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            <NextButton onClick={handleNext} loading={isLoading} />
          </div>
        </div>
      </main>

      <Footer />

      <VocabListModal
        isOpen={showVocabList}
        onClose={() => setShowVocabList(false)}
        seenIds={rrSeenSet}
        playCounts={playCounts}
      />
    </div>
  );
}

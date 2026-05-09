"use client";

import { useState, useEffect } from "react";
import { useModule } from "@/lib/ModuleContext";
import ModuleSelection from "@/components/ModuleSelection";
import TipsView from "@/components/TipsView";
import LektionenView from "@/components/LektionenView";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Flashcard from "@/components/Flashcard";
import Sentence from "@/components/Sentence";
import SpeakButton from "@/components/SpeakButton";
import FavoriteButton from "@/components/FavoriteButton";
import NextButton from "@/components/NextButton";
import OnboardingOverlay from "@/components/OnboardingOverlay";
import ConfettiAnimation from "@/components/ConfettiAnimation";
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

  // Lade Daily Goal + erste Vokabel wenn ein Modul ausgewählt wird
  useEffect(() => {
    if (selectedModule && selectedModule.type !== "tips" && selectedModule.type !== "lessons" && isInitialized && !showOnboarding) {
      const localGoal = getTodayGoal(selectedModule.id);
      setDailyGoal(localGoal);
      loadNextVocab();

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

  const loadNextVocab = () => {
    setIsLoading(true);
    setIsRevealed(false);
    setShowSentence(false);
    setShowNextButton(false);
    setSpanishSentence("");
    setGermanSentence("");

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

  // "Nächster Satz" → zählt zum Tagesziel + Gamification
  const handleNext = () => {
    if (selectedModule) {
      const updated = incrementTodayGoal(selectedModule.id);
      setDailyGoal(updated);

      // DB-Sync (fire & forget)
      syncProgressToDb(selectedModule.id, updated.completed);

      const newCount = updated.completed;

      // Meilensteine: 5, 10, 15, 20
      if ([5, 10, 15, 20].includes(newCount)) {
        setMilestoneText(`${newCount} von ${updated.goal}!`);
        setShowMilestone(true);
        playSound('milestone');
        setTimeout(() => setShowMilestone(false), 2000);
      }

      // Tagesziel erreicht!
      if (newCount === updated.goal) {
        setMilestoneText('Tagesziel erreicht!');
        setShowMilestone(true);
        setShowConfetti(true);
        playSound('complete');
        setTimeout(() => {
          setShowConfetti(false);
          setShowMilestone(false);
        }, 5000);
      } else if (newCount < updated.goal) {
        playSound('correct');
      }
    }
    loadNextVocab();
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
    if (!isRevealed) {
      handleReveal();
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

      {/* Top Bar: Zurück + Streak */}
      <div className="px-4 pt-3 flex items-center justify-between">
        <button
          onClick={handleBackToModules}
          aria-label="Zurück zu Modulen"
          className="group flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-primary hover:text-primary-light rounded-full border border-white/10 hover:border-primary/40 transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span className="text-sm transition-transform duration-200 group-hover:-translate-x-0.5">←</span>
          <span className="font-semibold text-sm">Module</span>
        </button>
        {streak > 1 && (
          <div className="flex items-center gap-1.5 bg-orange-500/15 border border-orange-500/25 px-3 py-1.5 rounded-full">
            <span className="text-base">🔥</span>
            <span className="text-sm font-bold text-orange-400">{streak} Tage</span>
          </div>
        )}
      </div>

      {/* Daily Goal Progress Bar */}
      {dailyGoal && (
        <div className="px-4 pt-3 pb-1">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-500">
                Tagesziel
              </span>
              <span className={`text-xs font-bold tabular-nums ${goalReached ? 'text-green-400' : 'text-gray-300'}`}>
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
        className={`flex-1 flex items-center justify-center px-4 py-6 ${!isRevealed ? 'cursor-pointer' : ''}`}
        onClick={!isRevealed ? handleMainClick : undefined}
      >
        <div className="w-full max-w-3xl space-y-8">
          {/* Flashcard */}
          <Flashcard
            key={currentVocab.id}
            german={currentVocab.german}
            spanish={currentVocab.spanish}
            onReveal={handleReveal}
            isRevealed={isRevealed}
          />

          {/* Favorite Button */}
          <div className={`flex justify-center transition-all duration-300 min-h-[2.5rem] items-center ${isRevealed ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <FavoriteButton vocabId={currentVocab.id} />
          </div>

          {/* Beispielsatz mit Speaker */}
          <div className={`transition-all duration-300 ${showSentence ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="flex items-start gap-3 justify-center">
              <div className="flex-1 max-w-2xl">
                <Sentence
                  spanishSentence={spanishSentence || "..."}
                  germanSentence={germanSentence || "..."}
                  isVisible={showSentence}
                  onTranslationRevealed={handleTranslationRevealed}
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

          {/* Next Button */}
          <div className={`flex justify-center transition-all duration-300 min-h-[3.5rem] items-center ${showNextButton ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <NextButton onClick={handleNext} loading={isLoading} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

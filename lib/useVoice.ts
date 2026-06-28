"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface UseVoiceReturn {
  speak: (text: string, onEnd?: () => void) => void;
  isSpeaking: boolean;
  hasSpanishVoice: boolean | null;
}

export function useVoice(): UseVoiceReturn {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasSpanishVoice, setHasSpanishVoice] = useState<boolean | null>(null);
  const spanishVoiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const isSpeakingRef = useRef(false);
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resolveVoices = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) return;
    const found = voices.find(
      (v) => v.lang.startsWith("es") || v.name.toLowerCase().includes("spanish")
    ) ?? null;
    spanishVoiceRef.current = found;
    setHasSpanishVoice(found !== null);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    resolveVoices();
    window.speechSynthesis.addEventListener("voiceschanged", resolveVoices);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", resolveVoices);
      window.speechSynthesis.cancel();
    };
  }, [resolveVoices]);

  const speak = useCallback((text: string, onEnd?: () => void) => {
    if (typeof window === "undefined" || !window.speechSynthesis || !text) return;

    window.speechSynthesis.cancel();
    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-ES";
    utterance.rate = 0.9;
    utterance.pitch = 1;

    if (spanishVoiceRef.current) {
      utterance.voice = spanishVoiceRef.current;
    }

    const finish = () => {
      if (fallbackTimerRef.current) {
        clearTimeout(fallbackTimerRef.current);
        fallbackTimerRef.current = null;
      }
      isSpeakingRef.current = false;
      setIsSpeaking(false);
      onEnd?.();
    };

    utterance.onstart = () => {
      isSpeakingRef.current = true;
      setIsSpeaking(true);
    };
    utterance.onend = finish;
    utterance.onerror = finish;

    // Fallback: always fire after estimated duration in case onstart/onend never fire
    const estimatedMs = Math.max(text.length * 80, 4000);
    fallbackTimerRef.current = setTimeout(() => {
      window.speechSynthesis.cancel();
      finish();
    }, estimatedMs);

    window.speechSynthesis.speak(utterance);
  }, []);

  return { speak, isSpeaking, hasSpanishVoice };
}

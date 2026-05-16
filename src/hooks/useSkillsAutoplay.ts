"use client";

import { useCallback, useEffect, useRef, type Dispatch, type SetStateAction } from "react";
import type { SkillCategory } from "@/data/portfolio";

const CYCLE_MS = 4500;
const PAUSE_AFTER_MANUAL_MS = 10000;

export function useSkillsAutoplay(
  categories: SkillCategory[],
  setActiveSkill: Dispatch<SetStateAction<string>>,
  enabled: boolean
) {
  const pausedRef = useRef(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const selectSkill = useCallback(
    (id: string, manual = false) => {
      setActiveSkill(id);
      if (!manual) return;

      pausedRef.current = true;
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = setTimeout(() => {
        pausedRef.current = false;
      }, PAUSE_AFTER_MANUAL_MS);
    },
    [setActiveSkill]
  );

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const section = document.getElementById("skills");
    if (!section) return;

    let intervalId: ReturnType<typeof setInterval> | null = null;

    const startCycle = () => {
      if (intervalId) return;
      intervalId = setInterval(() => {
        if (pausedRef.current) return;
        setActiveSkill((prev) => {
          const index = categories.findIndex((c) => c.id === prev);
          const next = index < 0 ? 0 : (index + 1) % categories.length;
          return categories[next].id;
        });
      }, CYCLE_MS);
    };

    const stopCycle = () => {
      if (!intervalId) return;
      clearInterval(intervalId);
      intervalId = null;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startCycle();
        else stopCycle();
      },
      { threshold: 0.35 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      stopCycle();
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, [enabled, categories, setActiveSkill]);

  return selectSkill;
}

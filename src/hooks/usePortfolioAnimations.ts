"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const isFirstWorkFilter = { current: true };

const scrollRevealConfig = (trigger: Element | string) => ({
  trigger,
  start: "top 88%",
  toggleActions: "play none none none",
  once: true
});

type AnimationOptions = {
  workFilter: string;
  activeSkill: string;
  popupOpen: boolean;
  serviceOpen: boolean;
  ready: boolean;
  onIntroComplete?: () => void;
};

export function usePortfolioAnimations({
  workFilter,
  activeSkill,
  popupOpen,
  serviceOpen,
  ready,
  onIntroComplete
}: AnimationOptions) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || !ready) return;

      const overlay = root.querySelector<HTMLElement>(".portfolio-boot-overlay");
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const finishIntro = () => {
        if (overlay) gsap.set(overlay, { autoAlpha: 0, pointerEvents: "none" });
        onIntroComplete?.();
      };

      if (reducedMotion) {
        gsap.set("[data-hero], [data-reveal], [data-stagger-item], .skills-percentage", {
          clearProps: "all",
          opacity: 1,
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1
        });
        finishIntro();
        return;
      }

      gsap.set(".sidebar, .sidebar .nav-logo, .sidebar .nav-link", {
        opacity: 1,
        visibility: "visible",
        autoAlpha: 1
      });

      const revealHero = () => {
        gsap.set("[data-hero]", { autoAlpha: 1, opacity: 1, visibility: "visible", clearProps: "transform" });
      };

      window.scrollTo(0, 0);
      gsap.set("[data-hero]", { autoAlpha: 0 });

      const heroTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onStart: () => {
          if (overlay) {
            gsap.to(overlay, {
              autoAlpha: 0,
              duration: 0.55,
              ease: "power2.inOut"
            });
          }
        },
        onComplete: () => {
          revealHero();
          finishIntro();
        }
      });

      const introFallback = window.setTimeout(() => {
        revealHero();
        finishIntro();
      }, 2800);

      heroTl.eventCallback("onComplete", () => window.clearTimeout(introFallback));

      heroTl
        .from(".sidebar .nav-logo", { scale: 0.6, duration: 0.5, ease: "back.out(1.6)" })
        .from(".sidebar .nav-link", { y: 12, duration: 0.4, stagger: 0.05 }, "-=0.3")
        .fromTo(
          "[data-hero='social']",
          { x: -30, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.5 },
          "-=0.15"
        )
        .fromTo(
          "[data-hero='image']",
          { scale: 0.88, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 0.7, ease: "back.out(1.4)" },
          "-=0.35"
        )
        .fromTo(
          "[data-hero='line']",
          { y: 32, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, stagger: 0.1, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          "[data-hero='info']",
          { y: 24, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, stagger: 0.1, duration: 0.45 },
          "-=0.3"
        );

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 28, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.65,
            ease: "power2.out",
            clearProps: "transform",
            scrollTrigger: scrollRevealConfig(el)
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((container) => {
        gsap.fromTo(
          container.querySelectorAll("[data-stagger-item]"),
          { y: 24, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.55,
            stagger: 0.1,
            ease: "power2.out",
            clearProps: "transform",
            scrollTrigger: scrollRevealConfig(container)
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".timeline-item").forEach((item) => {
        gsap.fromTo(
          item,
          { y: 20, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.6,
            ease: "power2.out",
            clearProps: "transform",
            scrollTrigger: scrollRevealConfig(item)
          }
        );
      });

      const hoverCleanups: Array<() => void> = [];

      gsap.utils.toArray<HTMLElement>(".work-card").forEach((card) => {
        gsap.fromTo(
          card,
          { y: 20, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.55,
            ease: "power2.out",
            clearProps: "transform",
            scrollTrigger: scrollRevealConfig(card)
          }
        );

        const img = card.querySelector<HTMLElement>(".work-img");
        if (img) {
          gsap.set(img, { transformOrigin: "center center" });
          const onEnter = () => gsap.to(img, { scale: 1.05, duration: 0.35, ease: "power2.out" });
          const onLeave = () => gsap.to(img, { scale: 1, duration: 0.35, ease: "power2.out" });
          card.addEventListener("mouseenter", onEnter);
          card.addEventListener("mouseleave", onLeave);
          hoverCleanups.push(() => {
            card.removeEventListener("mouseenter", onEnter);
            card.removeEventListener("mouseleave", onLeave);
          });
        }
      });

      gsap.utils.toArray<HTMLElement>(".services-content").forEach((card) => {
        gsap.fromTo(
          card,
          { y: 24, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.6,
            ease: "power2.out",
            clearProps: "transform",
            scrollTrigger: scrollRevealConfig(card)
          }
        );
      });

      gsap.fromTo(
        ".footer-bg",
        { y: 20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          ease: "power2.out",
          clearProps: "transform",
          scrollTrigger: scrollRevealConfig(".footer")
        }
      );

      return () => {
        window.clearTimeout(introFallback);
        hoverCleanups.forEach((cleanup) => cleanup());
      };
    },
    { scope: rootRef, dependencies: [ready] }
  );

  useGSAP(
    () => {
      if (isFirstWorkFilter.current) {
        isFirstWorkFilter.current = false;
        return;
      }
      const root = rootRef.current;
      if (!root) return;
      gsap.fromTo(
        root.querySelectorAll(".work-card"),
        { scale: 0.9, autoAlpha: 0, y: 20 },
        {
          scale: 1,
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.08,
          ease: "power2.out",
          overwrite: true
        }
      );
    },
    { scope: rootRef, dependencies: [workFilter], revertOnUpdate: true }
  );

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const activeGroup = root.querySelector(`.skills-group#${activeSkill}`);
      if (!activeGroup) return;
      gsap.fromTo(
        activeGroup.querySelectorAll<HTMLElement>("[data-skill-bar]"),
        { width: "0%" },
        {
          width: (i, el) => `${Number((el as HTMLElement).dataset.level ?? 0)}%`,
          duration: 0.9,
          stagger: 0.08,
          ease: "power2.out",
          overwrite: true
        }
      );
    },
    { scope: rootRef, dependencies: [activeSkill] }
  );

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const popup = root.querySelector<HTMLElement>(".portfolio-popup");
      const inner = root.querySelector<HTMLElement>(".portfolio-popup-inner");
      if (!popup || !inner || !popupOpen) return;
      gsap.fromTo(popup, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, ease: "power2.out" });
      gsap.fromTo(
        inner,
        { scale: 0.88, y: 40, autoAlpha: 0 },
        { scale: 1, y: 0, autoAlpha: 1, duration: 0.45, ease: "back.out(1.4)" }
      );
    },
    { scope: rootRef, dependencies: [popupOpen], revertOnUpdate: true }
  );

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      root.querySelectorAll<HTMLElement>(".services-modal.active-modal .services-modal-content").forEach((content) => {
        gsap.fromTo(
          content,
          { scale: 0.9, y: 30, autoAlpha: 0 },
          { scale: 1, y: 0, autoAlpha: 1, duration: 0.4, ease: "back.out(1.5)" }
        );
      });
    },
    { scope: rootRef, dependencies: [serviceOpen], revertOnUpdate: true }
  );

  return rootRef;
}

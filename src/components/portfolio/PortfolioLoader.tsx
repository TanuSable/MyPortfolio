"use client";

import { useEffect, useState } from "react";
import { gsap } from "@/lib/gsap";
import { profile } from "@/data/portfolio";

type PortfolioLoaderProps = {
  onComplete: () => void;
};

export function PortfolioLoader({ onComplete }: PortfolioLoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const interval = window.setInterval(() => {
      frame += 1;
      setProgress((prev) => {
        const bump = frame < 8 ? 14 + Math.random() * 16 : 5 + Math.random() * 8;
        return Math.min(100, prev + bump);
      });
    }, 85);

    const done = window.setTimeout(() => setProgress(100), 1000);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(done);
    };
  }, []);

  useEffect(() => {
    if (progress < 100) return;

    const panel = document.querySelector(".portfolio-loader");
    if (!panel) {
      onComplete();
      return;
    }

    gsap.to(panel, {
      autoAlpha: 0,
      duration: 0.35,
      ease: "power2.inOut",
      onComplete
    });
  }, [progress, onComplete]);

  return (
    <div className="portfolio-loader" aria-busy={progress < 100}>
      <div className="portfolio-loader-inner">
        <span className="portfolio-loader-logo">{profile.shortName}</span>
        <p className="portfolio-loader-name">{profile.name}</p>
        <div className="portfolio-loader-bar">
          <span className="portfolio-loader-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="portfolio-loader-percent">{Math.round(progress)}%</p>
      </div>
    </div>
  );
}

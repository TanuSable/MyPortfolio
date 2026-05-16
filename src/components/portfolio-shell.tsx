"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { education, experience, heroImages, profile, projects, skills } from "@/data/portfolio";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import styles from "./portfolio-shell.module.css";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" }
];

export function PortfolioShell() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const groupedSkills = useMemo(
    () => [
      { title: "Frontend", values: skills.slice(0, 6), levels: [95, 92, 90, 96, 94, 90] },
      { title: "Backend & Data", values: skills.slice(6, 12), levels: [90, 88, 86, 84, 88, 82] },
      { title: "APIs & Tools", values: skills.slice(12), levels: [92, 85, 88, 90, 86, 84, 80] }
    ],
    []
  );

  const aboutSkillBars = useMemo(
    () => [
      { name: "React.js", level: 95, color: "#DD1E2F" },
      { name: "Next.js", level: 92, color: "#EBB035" },
      { name: "TypeScript", level: 90, color: "#218559" },
      { name: "Node.js", level: 90, color: "#3C873A" },
      { name: "Express.js", level: 88, color: "#6840D4" },
      { name: "MongoDB", level: 86, color: "#06A2CB" }
    ],
    []
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setProgress((current) => {
        const next = Math.min(100, current + Math.ceil(Math.random() * 12));
        if (next === 100) {
          window.clearInterval(timer);
          window.setTimeout(() => setLoading(false), 250);
        }
        return next;
      });
    }, 90);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.45 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      if (loading) return;

      gsap.from("[data-hero-line]", {
        opacity: 0,
        y: 26,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out"
      });

      gsap.from("[data-float-badge]", {
        opacity: 0,
        scale: 0.82,
        y: 20,
        duration: 0.75,
        stagger: 0.15,
        ease: "back.out(1.4)"
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((node) => {
        gsap.from(node, {
          opacity: 0,
          y: 36,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: node,
            start: "top 82%",
            toggleActions: "play none none reverse"
          }
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-skill]").forEach((node) => {
        const value = Number(node.getAttribute("data-level") ?? "75");
        const bar = node.querySelector<HTMLElement>("[data-progress]");
        const label = node.querySelector<HTMLElement>("[data-percent]");
        if (!bar || !label) return;

        gsap.set(bar, { width: "0%" });
        gsap.to(bar, {
          width: `${value}%`,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: node,
            start: "top 88%"
          }
        });

        gsap.to(
          { score: 0 },
          {
            score: value,
            duration: 1.2,
            ease: "power2.out",
            onUpdate() {
              const target = this.targets()[0] as { score: number };
              label.textContent = `${Math.round(target.score)}%`;
            },
            scrollTrigger: {
              trigger: node,
              start: "top 88%"
            }
          }
        );
      });

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    },
    { scope: rootRef, dependencies: [loading] }
  );

  const isLight = theme === "light";

  return (
    <div
      ref={rootRef}
      className={isLight ? "bg-slate-100 text-slate-900" : "bg-[#07020f] text-slate-100"}
    >
      {loading && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-[#07020f]">
          <div className="text-center">
            <pre className="font-mono text-sm text-pink-300 md:text-base">
{`const portfolio = {
  loading: true,
  status: 'initializing...'
};`}
            </pre>
            <div className="mx-auto mt-6 h-2 w-52 overflow-hidden rounded-full bg-white/15">
              <div
                className="h-full rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-400 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-2 font-mono text-pink-200">{progress}%</p>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/75 backdrop-blur-xl">
        <nav className="flex w-full items-center justify-between px-4 py-3 md:px-8">
          <div className="font-mono text-lg font-semibold tracking-wide text-pink-300">&lt;Dev /&gt;</div>
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`rounded-full px-3 py-1.5 text-sm transition ${
                  activeSection === item.id
                    ? "bg-pink-500/20 text-pink-200"
                    : "text-slate-300 hover:text-pink-200"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
          <button
            onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
            className="rounded-full border border-white/20 px-3 py-1.5 text-xs text-slate-200"
          >
            {isLight ? "Dark" : "Light"}
          </button>
        </nav>
      </header>

      <main className="w-full px-4 pb-16 pt-8 md:px-8">
        <section id="home" className={`${styles.welcomeSection} -mx-4 px-4 md:-mx-6 md:px-6`}>
          <div className={styles.starsLayer} />
          <div className={styles.moonLayer} />
          <div className={styles.forestLayer} />
          <div className={styles.silhouetteLayer} />

          <div className={styles.welcomeCopy}>
            <p data-hero-line className="font-mono text-base text-pink-300">
              Hello, I&apos;m
            </p>
            <h1 data-hero-line className="mt-2 text-5xl font-normal italic leading-[0.9] text-white md:text-7xl">
              <span className="block">I build</span>
              <span className="block">full stack</span>
              <span className="block">
                <span className="text-pink-300">&amp;</span> ship.
              </span>
            </h1>
            <p data-hero-line className="mt-5 max-w-xl text-base text-slate-200 md:text-lg">
              {profile.summary}
            </p>
            <div data-hero-line className="mt-6 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="min-w-[170px] border border-white px-5 py-3 text-center text-sm uppercase tracking-wider text-white transition hover:-translate-y-0.5 hover:border-pink-400 hover:shadow-[0_10px_60px_-20px_rgba(243,0,180,0.6)]"
              >
                my portfolio
              </a>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[170px] border border-white/60 px-5 py-3 text-center text-sm uppercase tracking-wider text-white transition hover:-translate-y-0.5 hover:border-pink-400"
              >
                download resume
              </a>
              <a
                href="#contact"
                className="min-w-[170px] border border-transparent bg-pink-600 px-5 py-3 text-center text-sm font-semibold uppercase tracking-wider text-white transition hover:-translate-y-0.5 hover:bg-transparent hover:border-pink-500"
              >
                get in touch
              </a>
            </div>
          </div>
        </section>

        <section id="about" data-reveal className={`${styles.aboutSection} scroll-mt-24 -mx-4 px-4 py-24 md:-mx-6 md:px-10`}>
          <div className="w-full">
            <div className="mb-7 flex flex-col items-center">
              <h2 className="text-4xl font-bold text-slate-900">ABOUT ME</h2>
              <div className="mt-3 h-0.5 w-40 bg-pink-600" />
            </div>
            <p className="mx-auto max-w-3xl text-center text-lg text-slate-700">
              Hi, I&apos;m {profile.name}, a {profile.title.toLowerCase()}. I build end-to-end web
              applications — from responsive UIs and reusable components to APIs, databases, and
              production deployments.
            </p>

            <div className="mt-8 rounded-2xl bg-white/85 p-6 shadow-sm backdrop-blur md:p-8">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="text-left text-slate-800">
                  <h3 className="text-2xl font-semibold text-slate-900">Who&apos;s this developer?</h3>
                  <p className="mt-3 text-base leading-7">{profile.summary}</p>
                  <p className="mt-3 text-base leading-7">
                    I work across the stack — React and Next.js on the frontend, Node.js and Express
                    on the backend, MongoDB and SQL for data, plus REST, GraphQL, and WebSockets for
                    integrations and real-time features.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-slate-900">Core Skills</h3>
                  <div className="mt-4 space-y-3">
                    {aboutSkillBars.map((skill) => (
                      <div key={skill.name} data-skill data-level={skill.level}>
                        <div className="mb-1 flex items-center justify-between text-xs font-semibold text-slate-700">
                          <span>{skill.name}</span>
                          <span data-percent>{skill.level}%</span>
                        </div>
                        <div className="h-8 rounded bg-slate-200">
                          <div
                            data-progress
                            className="h-full rounded px-3 text-left text-xs font-semibold leading-8 text-white"
                            style={{ backgroundColor: skill.color, width: "0%" }}
                          >
                            {skill.name}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" data-reveal className="scroll-mt-24 py-14">
          <h2 className="font-mono text-3xl font-bold text-pink-300">Experience</h2>
          <div className="mt-8 space-y-5 border-l border-pink-400/40 pl-5">
            {experience.map((item) => (
              <article key={item.role} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold text-white">{item.role}</h3>
                  <span className="font-mono text-xs text-pink-200">{item.period}</span>
                </div>
                <p className="mt-2 text-sm text-pink-300">{item.company}</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-300">
                  {item.points.map((point) => (
                    <li key={point}>- {point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" data-reveal className="scroll-mt-24 py-14">
          <h2 className="font-mono text-3xl font-bold text-pink-300">Projects</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {projects.map((project) => (
              <article key={project.name} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-wider text-pink-300">{project.stack}</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-300">
                  {project.points.map((point) => (
                    <li key={point}>- {point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" data-reveal className="scroll-mt-24 py-14">
          <h2 className="font-mono text-3xl font-bold text-pink-300">Contact</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm text-slate-400">Email</p>
              <a href={`mailto:${profile.email}`} className="mt-1 block text-pink-300">
                {profile.email}
              </a>
              <p className="mt-4 text-sm text-slate-400">Phone</p>
              <a href={`tel:${profile.phone}`} className="mt-1 block text-pink-300">
                {profile.phone}
              </a>
              <p className="mt-4 text-sm text-slate-400">Education</p>
              <p className="mt-1 text-slate-300">
                {education.degree}, {education.institute} ({education.year})
              </p>
              <p className="mt-4 text-sm text-slate-400">Resume</p>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-pink-300 underline decoration-pink-400/50 underline-offset-4"
              >
                Download PDF
              </a>
            </div>
            <form className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <input className="mb-3 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm" placeholder="Name" />
              <input className="mb-3 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm" placeholder="Email" />
              <textarea className="h-28 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm" placeholder="Message" />
              <button
                type="button"
                className="mt-4 rounded-xl bg-gradient-to-r from-pink-500 to-fuchsia-400 px-5 py-2.5 font-medium text-white"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-black/40 py-6">
        <div className="flex w-full items-center justify-between px-4 text-sm text-slate-300 md:px-8">
          <p>© 2026 {profile.name} Portfolio</p>
          <Link href="#home" className="text-pink-300">
            Back to top
          </Link>
        </div>
      </footer>
    </div>
  );
}

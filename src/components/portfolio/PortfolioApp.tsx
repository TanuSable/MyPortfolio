"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { PortfolioLoader } from "@/components/portfolio/PortfolioLoader";
import { usePortfolioAnimations } from "@/hooks/usePortfolioAnimations";
import { useSkillsAutoplay } from "@/hooks/useSkillsAutoplay";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import {
  aboutStats,
  educationTimeline,
  experienceTimeline,
  highlights,
  profile,
  projects,
  services,
  skillCategories,
  socialLinks,
  workFilters,
  type ProjectItem,
  type WorkFilter
} from "@/data/portfolio";
import "@/styles/portfolio.css";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" }
];

type BootPhase = "loading" | "intro" | "ready";

export function PortfolioApp() {
  const [phase, setPhase] = useState<BootPhase>("loading");
  const [activeNav, setActiveNav] = useState("home");
  const [activeSkill, setActiveSkill] = useState(skillCategories[0].id);
  const [workFilter, setWorkFilter] = useState<WorkFilter>("all");
  const [popupProject, setPopupProject] = useState<ProjectItem | null>(null);
  const [activeService, setActiveService] = useState<number | null>(null);

  const filteredProjects =
    workFilter === "all" ? projects : projects.filter((p) => p.category === workFilter);

  const rootRef = usePortfolioAnimations({
    workFilter,
    activeSkill,
    popupOpen: popupProject !== null,
    serviceOpen: activeService !== null,
    ready: phase !== "loading",
    onIntroComplete: () => setPhase("ready")
  });

  useSmoothScroll(phase === "ready");

  const selectSkill = useSkillsAutoplay(skillCategories, setActiveSkill, phase === "ready");

  useEffect(() => {
    const previousScrollRestoration = history.scrollRestoration;
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    return () => {
      history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    if (phase === "intro") {
      window.scrollTo(0, 0);
    }
  }, [phase]);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveNav(entry.target.id);
          }
        });
      },
      { threshold: 0.35, rootMargin: "-80px 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = popupProject || activeService !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [popupProject, activeService]);

  return (
    <div
      ref={rootRef}
      className={`portfolio-page${phase === "loading" ? " portfolio-page--loading" : ""}${phase === "ready" ? " portfolio-page--ready" : ""}`}
    >
      <div
        className={`portfolio-boot-overlay${phase === "ready" ? " portfolio-boot-overlay--hidden" : ""}`}
        aria-hidden={phase === "ready"}
      />

      {phase === "loading" && <PortfolioLoader onComplete={() => setPhase("intro")} />}

      <aside className="sidebar" id="sidebar">
        <nav className="nav">
          <div className="nav-logo">
            <a href="#home" className="nav-logo-text">
              {profile.shortName}
            </a>
          </div>

          <div className="nav-menu">
            <div className="menu">
              <ul className="nav-list">
                {navItems.map((item) => (
                  <li key={item.id} className="nav-item">
                    <a
                      href={`#${item.id}`}
                      className={`nav-link${activeNav === item.id ? " active-link" : ""}`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </nav>
      </aside>

      <main className="main">
        <section
          className="home"
          id="home"
          style={{ backgroundImage: `url(${profile.homeBg})` }}
        >
          <div className="home-container container grid">
            <div className="home-social" data-hero="social">
              <span className="home-social-follow">Follow Me</span>
              <div className="home-social-links">
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="home-social-link">
                  <i className="uil uil-linkedin-alt" />
                </a>
                <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="home-social-link">
                  <i className="uil uil-github-alt" />
                </a>
              </div>
            </div>

            <Image
              src={profile.avatar}
              alt={profile.name}
              width={480}
              height={480}
              className="home-img"
              data-hero="image"
              priority
            />

            <div className="home-data">
              <h1 className="home-title" data-hero="line">
                Hi, I&apos;m {profile.name.split(" ")[0]}
              </h1>
              <h3 className="home-subtitle" data-hero="line">
                {profile.title}
              </h3>
              <p className="home-description" data-hero="line">
                {profile.summary}
              </p>
              <a href="#about" className="button" data-hero="line">
                <i className="uil uil-user button-icon" />
                More About me!
              </a>
            </div>

            <div className="my-info">
              <div className="info-item" data-hero="info">
                <i className="uil uil-whatsapp info-icon" />
                <div>
                  <h3 className="info-title">Whatsapp</h3>
                  <span className="info-subtitle">{profile.phone}</span>
                </div>
              </div>
              <div className="info-item" data-hero="info">
                <i className="uil uil-envelope-edit info-icon" />
                <div>
                  <h3 className="info-title">Email</h3>
                  <span className="info-subtitle">{profile.email}</span>
                </div>
              </div>
              <div className="info-item" data-hero="info">
                <i className="uil uil-file-download info-icon" />
                <div>
                  <h3 className="info-title">Resume</h3>
                  <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="info-subtitle">
                    Download PDF
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="about section" id="about">
          <h2 className="section-title" data-heading="My Intro" data-reveal>
            About me
          </h2>
          <div className="about-container container grid">
            <Image
              src={profile.avatar}
              alt={profile.name}
              width={480}
              height={480}
              className="about-img"
              data-reveal
            />
            <div className="about-data" data-reveal>
              <h3 className="about-heading">
                Hi, I&apos;m {profile.name}, based in {profile.location}
              </h3>
              <p className="about-description">{profile.aboutDescription}</p>
              <div className="about-info" data-stagger>
                {aboutStats.map((stat) => (
                  <div key={stat.title} className="about-box" data-stagger-item>
                    <i className={`uil ${stat.icon} about-icon`} />
                    <h3 className="about-title">{stat.title}</h3>
                    <span className="about-subtitle">{stat.subtitle}</span>
                  </div>
                ))}
              </div>
              <a href="#contact" className="button">
                <i className="uil uil-navigator button-icon" />
                Contact me
              </a>
            </div>
          </div>
        </section>

        <section className="qualification section" id="qualification">
          <h2 className="section-title" data-heading="My Journey" data-reveal>
            Qualifications
          </h2>
          <div className="qualification-container container grid">
            <div className="education">
              <h3 className="qualification-title">
                <i className="uil uil-graduation-cap" /> Education
              </h3>
              <div className="timeline">
                {educationTimeline.map((item) => (
                  <div key={item.title} className="timeline-item">
                    <div className="circle-dot" />
                    <h3 className="timeline-title">{item.title}</h3>
                    <p className="timeline-text">{item.subtitle}</p>
                    <span className="timeline-date">
                      <i className="uil uil-calendar-alt" /> {item.period}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="experience">
              <h3 className="qualification-title">
                <i className="uil uil-suitcase" /> Experience
              </h3>
              <div className="timeline">
                {experienceTimeline.map((item) => (
                  <div key={item.title} className="timeline-item">
                    <div className="circle-dot" />
                    <h3 className="timeline-title">{item.title}</h3>
                    <p className="timeline-text">{item.subtitle}</p>
                    <span className="timeline-date">
                      <i className="uil uil-calendar-alt" /> {item.period}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="skills section" id="skills">
          <h2 className="section-title" data-heading="My Abilities" data-reveal>
            My Experience
          </h2>
          <div className="skills-container container grid" data-reveal>
            <div className="skills-tabs">
              {skillCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className={`skills-header${activeSkill === category.id ? " skills-active" : ""}`}
                  onClick={() => selectSkill(category.id, true)}
                  aria-selected={activeSkill === category.id}
                >
                  <i className={`uil ${category.icon} skills-icon`} />
                  <div>
                    <h2 className="skills-title">{category.title}</h2>
                    <span className="skills-subtitle">{category.subtitle}</span>
                  </div>
                  <i className="uil uil-angle-down skills-arrow" />
                </button>
              ))}
            </div>
            <div className="skills-content">
              {skillCategories.map((category) => (
                <div
                  key={category.id}
                  className={`skills-group${activeSkill === category.id ? " skills-active" : ""}`}
                  id={category.id}
                >
                  <div className="skills-list grid">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="skills-data">
                        <div className="skills-titles">
                          <h3 className="skills-name">{skill.name}</h3>
                          <span className="skills-number">{skill.percent}%</span>
                        </div>
                        <div className="skills-bar">
                          <span
                            className="skills-percentage"
                            data-skill-bar
                            data-level={skill.percent}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="work section" id="work">
          <h2 className="section-title" data-heading="My Portfolio" data-reveal>
            Recent Works
          </h2>
          <div className="work-filters" data-reveal>
            {workFilters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                className={`work-item${workFilter === filter.id ? " active-work" : ""}`}
                onClick={() => setWorkFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <div className="work-container container grid">
            {filteredProjects.map((project) => (
              <article key={project.name} className="work-card">
                <Image
                  src={project.image}
                  alt={project.name}
                  width={330}
                  height={200}
                  className="work-img"
                />
                <h3 className="work-title">{project.name}</h3>
                <button type="button" className="work-button" onClick={() => setPopupProject(project)}>
                  Demo
                  <i className="uil uil-arrow-right work-button-icon" />
                </button>
              </article>
            ))}
          </div>
        </section>

        <div className={`portfolio-popup${popupProject ? " open" : ""}`}>
          <div className="portfolio-popup-inner">
            {popupProject && (
              <div className="portfolio-popup-content grid">
                <button
                  type="button"
                  className="portfolio-popup-close"
                  aria-label="Close"
                  onClick={() => setPopupProject(null)}
                >
                  <i className="uil uil-times" />
                </button>
                <div className="pp-thumbnail">
                  <Image
                    src={popupProject.image}
                    alt={popupProject.name}
                    width={400}
                    height={280}
                    className="portfolio-popup-img"
                  />
                </div>
                <div className="portfolio-popup-info">
                  <div className="portfolio-popup-subtitle">
                    Featured — <span>{popupProject.category === "web" ? "Web" : "Full Stack"}</span>
                  </div>
                  <div className="portfolio-popup-body">
                    <h3 className="details-title">{popupProject.name}</h3>
                    <p className="details-description">{popupProject.description}</p>
                    <ul className="details-info">
                      <li>
                        Stack — <span>{popupProject.stack}</span>
                      </li>
                      <li>
                        Role — <span>{popupProject.role}</span>
                      </li>
                      {popupProject.demoUrl && (
                        <li>
                          View —{" "}
                          <span>
                            <a href={popupProject.demoUrl} target="_blank" rel="noopener noreferrer">
                              {popupProject.demoUrl}
                            </a>
                          </span>
                        </li>
                      )}
                    </ul>
                    <ul className="details-info" style={{ marginTop: "1rem" }}>
                      {popupProject.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <section className="services section" id="services">
          <h2 className="section-title" data-heading="Services" data-reveal>
            What I Offer
          </h2>
          <div className="services-container container grid">
            {services.map((service, index) => (
              <div key={service.title} className="services-content">
                <div>
                  <i className={`uil ${service.icon} services-icon`} />
                  <h3 className="services-title">{service.title}</h3>
                </div>
                <button type="button" className="services-button" onClick={() => setActiveService(index)}>
                  View More <i className="uil uil-arrow-right services-button-icon" />
                </button>
                <div className={`services-modal${activeService === index ? " active-modal" : ""}`}>
                  <div className="services-modal-content">
                    <button
                      type="button"
                      className="services-modal-close"
                      aria-label="Close"
                      onClick={() => setActiveService(null)}
                    >
                      <i className="uil uil-times" />
                    </button>
                    <h3 className="services-modal-title">{service.title.replace("\n", " ")}</h3>
                    <p className="services-modal-description">{service.description}</p>
                    <ul className="services-modal-services grid">
                      {service.features.map((feature) => (
                        <li key={feature} className="services-modal-service">
                          <i className="uil uil-check-circle services-modal-icon" />
                          <p className="services-modal-info">{feature}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="testimonials section">
          <h2 className="section-title" data-heading="Highlights" data-reveal>
            Project Highlights
          </h2>
          <div className="highlights-container container" data-stagger>
            {highlights.map((item) => (
              <article key={item.title} className="testimonial-card" data-stagger-item>
                <div className="testimonial-quote">
                  <i className="bx bxs-quote-alt-left" />
                </div>
                <p className="testimonial-description">{item.quote}</p>
                <h3 className="testimonial-date">{item.date}</h3>
                <div>
                  <span className="testimonial-profile-name">{item.title}</span>
                  <span className="testimonial-profile-detail">{item.detail}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="contact-footer-panel" id="contact">
          <section className="contact section">
            <h2 className="section-title" data-heading="Get in Touch" data-reveal>
              Contact me
            </h2>
            <div className="contact-container container">
              <div className="contact-info" data-reveal data-stagger>
                <div className="contact-card" data-stagger-item>
                  <i className="uil uil-envelope-edit contact-card-icon" />
                  <h3 className="contact-card-title">Email</h3>
                  <span className="contact-card-data">{profile.email}</span>
                </div>
                <div className="contact-card" data-stagger-item>
                  <i className="uil uil-whatsapp contact-card-icon" />
                  <h3 className="contact-card-title">Whatsapp</h3>
                  <span className="contact-card-data">{profile.phone}</span>
                </div>
                <div className="contact-card" data-stagger-item>
                  <i className="uil uil-file-download contact-card-icon" />
                  <h3 className="contact-card-title">Resume</h3>
                  <span className="contact-card-data">Full Stack — PDF</span>
                </div>
              </div>
            </div>
          </section>

          <footer className="footer">
            <div className="footer-bg">
              <div className="footer-container container grid">
              <div>
                <h1 className="footer-title">{profile.name.split(" ")[0]}</h1>
                <span className="footer-subtitle">{profile.title}</span>
              </div>
              <ul className="footer-links">
                <li>
                  <a href="#services">Services</a>
                </li>
                <li>
                  <a href="#work">Work</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
              </ul>
              <div className="footer-socials">
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="footer-social">
                  <i className="uil uil-linkedin-alt" />
                </a>
                <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="footer-social">
                  <i className="uil uil-github-alt" />
                </a>
              </div>
            </div>
          </div>
        </footer>
        </div>
      </main>
    </div>
  );
}

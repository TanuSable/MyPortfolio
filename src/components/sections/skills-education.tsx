import { education, skills } from "@/data/portfolio";
import { SectionTitle } from "@/components/ui/section-title";

export function SkillsEducationSection() {
  return (
    <section>
      <div data-animate>
        <SectionTitle eyebrow="Core stack" title="Skills and education" />
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_0.8fr]">
        <article data-animate className="border-t border-white/15 pt-5">
          <h3 className="text-lg font-semibold text-white">Technical Skills</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className="text-xs text-slate-200/90">
                {skill}
              </span>
            ))}
          </div>
        </article>

        <article data-animate className="border-t border-white/15 pt-5">
          <h3 className="text-lg font-semibold text-white">Education</h3>
          <p className="mt-3 text-sm text-slate-300">{education.institute}</p>
          <p className="mt-2 text-sm text-pink-300">{education.degree}</p>
          <p className="mt-1 text-xs text-slate-400">Passing year: {education.year}</p>
        </article>
      </div>
    </section>
  );
}

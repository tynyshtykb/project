import type { Project } from '../data/content';
import { PROJECTS } from '../data/content';
import { ProjectPlate } from './ProjectPlate';
import { Reveal, Rule, Section, SectionHeader, WordReveal } from './primitives';

function ExternalLink({
  href,
  label,
  dark = false,
}: {
  href: string;
  label: string;
  dark?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      data-print-url={href}
      className={`group/link inline-flex items-center gap-2 text-sm font-medium tracking-tight transition-colors duration-300 ${
        dark ? 'text-paper hover:text-accent-soft' : 'text-ink hover:text-accent'
      }`}
    >
      <span className="link-underline">{label}</span>
      <span className="inline-block transition-transform duration-400 ease-[var(--ease-out-quint)] group-hover/link:translate-x-1">
        ↗
      </span>
    </a>
  );
}

function Media({ project, dark = false }: { project: Project; dark?: boolean }) {
  return (
    <div
      className={`no-print relative aspect-4/3 w-full overflow-hidden border transition-colors duration-500 ${
        dark
          ? 'border-white/15 bg-white/[0.03] text-paper group-hover:border-white/30'
          : 'dot-matrix border-line bg-paper-2 text-ink group-hover:border-ink/40'
      }`}
    >
      <ProjectPlate plate={project.plate} />
    </div>
  );
}

function Meta({ project, dark = false }: { project: Project; dark?: boolean }) {
  const muted = dark ? 'text-white/55' : 'text-ink-mute';
  const soft = dark ? 'text-white/75' : 'text-ink-soft';

  return (
    <>
      {project.role ? (
        <div className="mt-8">
          <p className={`label ${dark ? 'text-white/45' : ''}`}>Role</p>
          <p className={`mt-2.5 text-[0.95rem] tracking-tight ${dark ? 'text-paper' : 'text-ink'}`}>
            {project.role}
          </p>
        </div>
      ) : null}

      {project.highlights ? (
        <ul className="mt-8 space-y-2.5">
          {project.highlights.map((item) => (
            <li key={item} className={`flex gap-3 text-[0.95rem] leading-relaxed ${soft}`}>
              <span className={`mt-2.5 h-px w-3 shrink-0 ${dark ? 'bg-white/40' : 'bg-line'}`} />
              {item}
            </li>
          ))}
        </ul>
      ) : null}

      {project.tech ? (
        <div className="mt-8">
          <p className={`label ${dark ? 'text-white/45' : ''}`}>Technologies</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <li
                key={tech}
                className={`border px-2.5 py-1 font-mono text-[0.7rem] tracking-tight transition-colors duration-300 ${
                  dark
                    ? 'border-white/20 text-white/75 hover:border-white/50 hover:text-paper'
                    : 'border-line text-ink-soft hover:border-ink hover:text-ink'
                }`}
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {project.achievement ? (
        <div className="mt-8">
          <p className={`label ${dark ? 'text-white/45' : ''}`}>Result</p>
          <ul className="mt-2.5 space-y-1.5">
            {project.achievement.map((line, i) => (
              <li
                key={line}
                className={`text-[0.95rem] leading-relaxed tracking-tight ${
                  i === 0 ? (dark ? 'text-paper' : 'text-ink') : muted
                }`}
              >
                {line}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {project.links ? (
        <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3">
          {project.links.map((link) => (
            <ExternalLink key={link.href} href={link.href} label={link.label} dark={dark} />
          ))}
        </div>
      ) : null}
    </>
  );
}

function CaseHeader({
  project,
  dark = false,
  large = false,
}: {
  project: Project;
  dark?: boolean;
  large?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-6">
      <Reveal>
        <span className={`label ${dark ? 'text-white/50' : ''}`}>
          <span className={dark ? 'text-paper' : 'text-ink'}>{project.num}</span>
          <span className="mx-2 opacity-40">/</span>
          {project.category}
        </span>
      </Reveal>
      {large ? (
        <Reveal delay={80}>
          <span className="label hidden items-center gap-2 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Flagship
          </span>
        </Reveal>
      ) : null}
    </div>
  );
}

/** The startup — given the widest, tallest treatment on the page. */
function FlagshipCase({ project }: { project: Project }) {
  return (
    <article className="group">
      <Rule />
      <div className="pt-5">
        <CaseHeader project={project} large />
      </div>

      <h3 className="hed mt-8 text-subhed">
        <WordReveal text={project.name} />
      </h3>

      <Reveal delay={120}>
        {/* Two canvases rather than one letterboxed drawing: the wide banner
            fills the frame on tablet and up, the 4:3 plate suits phones. */}
        <div className="no-print mt-9 aspect-4/3 w-full overflow-hidden border border-line bg-paper-2 text-ink transition-colors duration-500 group-hover:border-ink/40 sm:aspect-21/9 dot-matrix">
          <div className="hidden h-full w-full sm:block">
            <ProjectPlate plate={project.plate} variant="banner" />
          </div>
          <div className="h-full w-full sm:hidden">
            <ProjectPlate plate={project.plate} />
          </div>
        </div>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="text-xl leading-[1.5] tracking-tight text-ink md:text-2xl md:leading-[1.45]">
              {project.description}
            </p>
          </Reveal>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal delay={100}>
            <Meta project={project} />
          </Reveal>
        </div>
      </div>
    </article>
  );
}

/** Research / competition projects — alternating two-column case studies. */
function StandardCase({ project, reverse }: { project: Project; reverse: boolean }) {
  return (
    <article className="group">
      <Rule />
      <div className="pt-5">
        <CaseHeader project={project} />
      </div>

      <div className="mt-8 grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
        <div className={`lg:col-span-7 ${reverse ? 'lg:order-2 lg:col-start-6' : ''}`}>
          <Reveal>
            <Media project={project} />
          </Reveal>
        </div>

        <div className={`lg:col-span-5 ${reverse ? 'lg:order-1 lg:col-start-1 lg:row-start-1' : ''}`}>
          <Reveal delay={80}>
            <h3 className="hed text-4xl md:text-5xl">{project.name}</h3>
            <p className="mt-6 text-lg leading-[1.55] tracking-tight text-ink-soft">
              {project.description}
            </p>
            <Meta project={project} />
          </Reveal>
        </div>
      </div>
    </article>
  );
}

/** Paid client work — inverted panel to separate it from the research projects. */
function ClientCase({ project }: { project: Project }) {
  return (
    <article className="group -mx-5 bg-ink px-5 py-14 text-paper md:-mx-10 md:px-10 md:py-20 xl:-mx-16 xl:px-16">
      <div className="h-px w-full bg-white/20" />
      <div className="pt-5">
        <CaseHeader project={project} dark />
      </div>

      <div className="mt-8 grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Reveal>
            <span className="label text-white/45">Client work</span>
            <h3 className="hed mt-4 text-4xl text-paper md:text-5xl">{project.name}</h3>
            <p className="mt-6 text-lg leading-[1.55] tracking-tight text-white/70">
              {project.description}
            </p>
            <Meta project={project} dark />
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal delay={80}>
            <Media project={project} dark />
          </Reveal>
        </div>
      </div>
    </article>
  );
}

export function ProjectShowcase() {
  return (
    <Section id="projects" labelledBy="projects-title">
      <div className="shell">
        <SectionHeader
          index="02"
          title="Selected Projects"
          meta={`${PROJECTS.length} case studies`}
          titleId="projects-title"
        />

        <div className="space-y-24 md:space-y-36">
          {PROJECTS.map((project, i) => {
            if (project.kind === 'flagship') return <FlagshipCase key={project.num} project={project} />;
            if (project.kind === 'client') return <ClientCase key={project.num} project={project} />;
            return <StandardCase key={project.num} project={project} reverse={i % 2 === 0} />;
          })}
        </div>
      </div>
    </Section>
  );
}

import { profile, projects } from '../data/content';
import { useSpotlight } from '../hooks/useSpotlight';
import { Reveal } from './Reveal';
import { ArrowIcon, GitHubIcon } from './Icons';
import './Work.css';

export function Work() {
  const spotlight = useSpotlight();

  return (
    <section className="section work" id="work" aria-labelledby="work-title">
      <div className="shell">
        <header className="section-head">
          <Reveal>
            <p className="eyebrow">04 — Selected work</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="section-title" id="work-title">
              Teaching is how I <em>pressure-test</em> what I know.
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="section-sub">
              Both of these are the same instinct: take something difficult, and make it land for
              someone else.
            </p>
          </Reveal>
        </header>

        <ul className="work__list">
          {projects.map((project, i) => (
            <Reveal key={project.id} as="li" delay={i * 0.08} amount={0.2}>
              <article className="card work__card" onPointerMove={spotlight}>
                <div className="work__head">
                  <span className="work__kind">{project.kind}</span>
                  <span className="work__org">{project.org}</span>
                </div>
                <h3 className="work__title">{project.title}</h3>
                <p className="work__blurb">{project.blurb}</p>
                <ul className="chip-row work__tags">
                  {project.tags.map((tag) => (
                    <li className="chip" key={tag}>
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}

          <Reveal as="li" delay={0.16} amount={0.2}>
            <a
              className="card work__card work__card--next"
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              onPointerMove={spotlight}
            >
              <div className="work__next-inner">
                <GitHubIcon className="work__next-ico" />
                <h3 className="work__title">More on GitHub</h3>
                <p className="work__blurb">
                  Coursework, experiments and the projects currently taking shape. This space is
                  reserved for the case studies I am writing up next.
                </p>
                <span className="work__next-cta">
                  github.com/julianamoore
                  <ArrowIcon />
                </span>
              </div>
            </a>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}

import { motion, useReducedMotion } from 'motion/react';
import { skillGroups } from '../data/content';
import { useSpotlight } from '../hooks/useSpotlight';
import { Reveal, staggerChild, staggerParent } from './Reveal';
import './Skills.css';

const MARQUEE = [
  'Microsoft 365 Copilot',
  'Copilot Studio',
  'AI agents',
  'Prompt engineering',
  'Python',
  'Java',
  'C',
  'Databases',
  'Azure fundamentals',
  'Security fundamentals',
  'Power Platform',
  'GitHub',
];

export function Skills() {
  const spotlight = useSpotlight();
  const reduced = useReducedMotion();

  return (
    <section className="section skills" id="skills" aria-labelledby="skills-title">
      <div className="shell">
        <header className="section-head">
          <Reveal>
            <p className="eyebrow">03 — Skills</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="section-title" id="skills-title">
              The <em>toolkit</em>, honestly labelled.
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="section-sub">
              No progress bars — just what I use, how often, and where I am still climbing.
            </p>
          </Reveal>
        </header>

        <div className="skills__grid">
          {skillGroups.map((group, i) => (
            <Reveal key={group.id} delay={i * 0.08} amount={0.2}>
              <article className="card skills__card" onPointerMove={spotlight}>
                <div className="skills__card-head">
                  <span className="skills__num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="skills__card-title">{group.title}</h3>
                    <p className="skills__card-caption">{group.caption}</p>
                  </div>
                </div>

                <motion.ul
                  className="skills__items"
                  variants={reduced ? undefined : staggerParent}
                  initial={reduced ? undefined : 'hidden'}
                  whileInView={reduced ? undefined : 'shown'}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  {group.items.map((item) => (
                    <motion.li key={item} variants={reduced ? undefined : staggerChild}>
                      <span className="skills__dot" aria-hidden="true" />
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="skills__marquee" aria-hidden="true">
        <div className="skills__track">
          {[0, 1].map((copy) => (
            <ul key={copy}>
              {MARQUEE.map((item) => (
                <li key={`${copy}-${item}`}>
                  {item}
                  <span>✦</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}

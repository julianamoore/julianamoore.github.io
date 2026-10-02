import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { experience } from '../data/content';
import { useSpotlight } from '../hooks/useSpotlight';
import { Reveal, staggerChild, staggerParent } from './Reveal';
import './Experience.css';

export function Experience() {
  const railRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const spotlight = useSpotlight();

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start 78%', 'end 55%'],
  });
  const beam = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });

  return (
    <section className="section experience" id="experience" aria-labelledby="experience-title">
      <div className="shell">
        <header className="section-head">
          <Reveal>
            <p className="eyebrow">02 — Experience</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="section-title" id="experience-title">
              A short career with a <em>deliberate</em> shape.
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="section-sub">
              Three years of high-volume language assessment, then straight into customer-facing AI
              engineering. Different rooms, same job: understand the person, then be precise.
            </p>
          </Reveal>
        </header>

        <div className="timeline" ref={railRef}>
          <div className="timeline__rail" aria-hidden="true">
            <motion.span
              className="timeline__beam"
              style={reduced ? { scaleY: 1 } : { scaleY: beam }}
            />
          </div>

          <ol className="timeline__list">
            {experience.map((job, index) => (
              <li className="timeline__item" key={job.id}>
                <span className="timeline__node" aria-hidden="true">
                  <span />
                </span>

                <Reveal delay={0.05} amount={0.15}>
                  <article className="card timeline__card" onPointerMove={spotlight}>
                    <div className="timeline__top">
                      <p className="timeline__period">{job.period}</p>
                      <span className="timeline__mode">{job.mode}</span>
                    </div>

                    <h3 className="timeline__role">
                      {job.role}
                      <span className="timeline__at">at</span>
                      <span className="timeline__company">{job.company}</span>
                    </h3>

                    <p className="timeline__summary">{job.summary}</p>

                    <motion.ul
                      className="timeline__points"
                      variants={reduced ? undefined : staggerParent}
                      initial={reduced ? undefined : 'hidden'}
                      whileInView={reduced ? undefined : 'shown'}
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      {job.highlights.map((point) => (
                        <motion.li key={point} variants={reduced ? undefined : staggerChild}>
                          <span className="timeline__bullet" aria-hidden="true" />
                          {point}
                        </motion.li>
                      ))}
                    </motion.ul>

                    <ul className="chip-row timeline__tags">
                      {job.tags.map((tag) => (
                        <li className="chip" key={tag}>
                          {tag}
                        </li>
                      ))}
                    </ul>

                    <span className="timeline__index" aria-hidden="true">
                      0{experience.length - index}
                    </span>
                  </article>
                </Reveal>
              </li>
            ))}

            <li className="timeline__item timeline__item--origin">
              <span className="timeline__node timeline__node--origin" aria-hidden="true">
                <span />
              </span>
              <Reveal delay={0.05} amount={0.3}>
                <p className="timeline__origin">
                  <span>2021</span> Started out reading Psychology in Santiago — the reason I still
                  design for people first.
                </p>
              </Reveal>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

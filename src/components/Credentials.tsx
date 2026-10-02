import { useCallback } from 'react';
import type { PointerEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { credentials, education } from '../data/content';
import { useSpotlight } from '../hooks/useSpotlight';
import { Reveal, staggerChild, staggerParent } from './Reveal';
import './Credentials.css';

const TIER_ORDER = ['Expert', 'Associate', 'Business AI', 'Fundamentals'] as const;

export function Credentials() {
  const spotlight = useSpotlight();
  const reduced = useReducedMotion();

  /* Tiles lean slightly toward the cursor — tactile without being a toy. */
  const onTileMove = useCallback(
    (event: PointerEvent<HTMLLIElement>) => {
      if (reduced || event.pointerType === 'touch') return;
      const el = event.currentTarget;
      const rect = el.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty('--lean-x', `${(-py * 10).toFixed(2)}deg`);
      el.style.setProperty('--lean-y', `${(px * 12).toFixed(2)}deg`);
    },
    [reduced],
  );

  const onTileLeave = useCallback((event: PointerEvent<HTMLLIElement>) => {
    const el = event.currentTarget;
    el.style.setProperty('--lean-x', '0deg');
    el.style.setProperty('--lean-y', '0deg');
  }, []);

  const sorted = [...credentials].sort(
    (a, b) => TIER_ORDER.indexOf(a.tier) - TIER_ORDER.indexOf(b.tier),
  );

  return (
    <section className="section creds" id="credentials" aria-labelledby="creds-title">
      <div className="shell">
        <header className="section-head">
          <Reveal>
            <p className="eyebrow">05 — Education &amp; certifications</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="section-title" id="creds-title">
              Two degrees, two countries, <em>ten</em> Microsoft badges.
            </h2>
          </Reveal>
        </header>

        <div className="creds__layout">
          <div className="creds__edu">
            {education.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.08} amount={0.2}>
                <article className="card creds__edu-card" onPointerMove={spotlight}>
                  <p className="creds__edu-period">{item.period}</p>
                  <h3 className="creds__edu-degree">{item.degree}</h3>
                  <p className="creds__edu-school">{item.school}</p>
                  <p className="creds__edu-note">
                    <span>{item.location}</span>
                    {item.note}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="creds__certs">
            <Reveal>
              <h3 className="creds__certs-title">
                Microsoft certifications
                <span>Verified on LinkedIn</span>
              </h3>
            </Reveal>

            <motion.ul
              className="creds__grid"
              variants={reduced ? undefined : staggerParent}
              initial={reduced ? undefined : 'hidden'}
              whileInView={reduced ? undefined : 'shown'}
              viewport={{ once: true, amount: 0.2 }}
            >
              {sorted.map((cert) => (
                <motion.li
                  key={cert.code}
                  className={`creds__tile creds__tile--${cert.tier.toLowerCase().replace(/\s+/g, '-')}`}
                  variants={reduced ? undefined : staggerChild}
                  onPointerMove={onTileMove}
                  onPointerLeave={onTileLeave}
                  tabIndex={0}
                >
                  <span className="creds__tile-tier">{cert.tier}</span>
                  <span className="creds__tile-code">{cert.code}</span>
                  <span className="creds__tile-glow" aria-hidden="true" />
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}

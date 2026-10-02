import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { profile, stats } from '../data/content';
import { portraitPlaceholder } from '../assets/portrait-placeholder';
import { ArrowIcon, DownIcon, LinkedInIcon, MailIcon, PinIcon } from './Icons';
import './Hero.css';

const EASE = [0.22, 1, 0.36, 1] as const;

function Word({ text, delay, italic }: { text: string; delay: number; italic?: boolean }) {
  const reduced = useReducedMotion();
  return (
    <span className={`hero__word ${italic ? 'is-italic' : ''}`}>
      <motion.span
        className="hero__word-inner"
        initial={reduced ? false : { y: '108%', rotate: 3 }}
        animate={{ y: '0%', rotate: 0 }}
        transition={{ duration: 1.05, delay, ease: EASE }}
      >
        {text}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const reduced = useReducedMotion();
  const nameRef = useRef<HTMLHeadingElement>(null);
  const figureRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [lit, setLit] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const portraitY = useSpring(rawY, { stiffness: 120, damping: 28, mass: 0.4 });
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  /* Spotlight that reveals a pink gradient copy of the name under the cursor. */
  const onNameMove = useCallback(
    (event: React.PointerEvent<HTMLHeadingElement>) => {
      if (reduced || event.pointerType === 'touch') return;
      const el = nameRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--sx', `${event.clientX - rect.left}px`);
      el.style.setProperty('--sy', `${event.clientY - rect.top}px`);
      setLit(true);
    },
    [reduced],
  );

  /* Touch + reduced-motion fallback: the spotlight sweeps on its own. */
  useEffect(() => {
    if (reduced) return;
    const el = nameRef.current;
    if (!el) return;
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let frame = 0;
    const start = performance.now();
    const loop = (now: number) => {
      const t = ((now - start) / 5200) % 1;
      el.style.setProperty('--sx', `${t * el.offsetWidth}px`);
      el.style.setProperty('--sy', `${el.offsetHeight * 0.5}px`);
      frame = requestAnimationFrame(loop);
    };
    setLit(true);
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [reduced]);

  /* Pointer tilt on the portrait (desktop only). */
  useEffect(() => {
    if (reduced) return;
    const fig = figureRef.current;
    if (!fig) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const onMove = (event: MouseEvent) => {
      const rect = fig.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      fig.style.setProperty('--tilt-x', `${(-py * 7).toFixed(2)}deg`);
      fig.style.setProperty('--tilt-y', `${(px * 9).toFixed(2)}deg`);
      fig.style.setProperty('--shift-x', `${(px * 14).toFixed(1)}px`);
      fig.style.setProperty('--shift-y', `${(py * 14).toFixed(1)}px`);
    };
    const reset = () => {
      fig.style.setProperty('--tilt-x', '0deg');
      fig.style.setProperty('--tilt-y', '0deg');
      fig.style.setProperty('--shift-x', '0px');
      fig.style.setProperty('--shift-y', '0px');
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseout', reset);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseout', reset);
    };
  }, [reduced]);

  return (
    <section className="hero" id="top" ref={sectionRef}>
      <div className="hero__grid shell">
        <motion.div className="hero__copy" style={reduced ? undefined : { y: copyY, opacity: fade }}>
          <motion.p
            className="hero__status"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          >
            <span className="hero__pulse" aria-hidden="true" />
            Solution Engineer Intern at Microsoft
          </motion.p>

          <h1
            className={`hero__name ${lit ? 'is-lit' : ''}`}
            ref={nameRef}
            onPointerMove={onNameMove}
            onPointerLeave={() => setLit(false)}
          >
            <span className="hero__name-line">
              <Word text="Juliana" delay={0.18} />
            </span>
            <span className="hero__name-line">
              <Word text="Moore" delay={0.28} italic />
            </span>
            <span className="hero__name-ghost" aria-hidden="true">
              <span className="hero__name-line">Juliana</span>
              <span className="hero__name-line is-italic">Moore</span>
            </span>
          </h1>

          <motion.p
            className="hero__role"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
          >
            I build the bridge between <strong>business problems</strong> and{' '}
            <strong>AI that actually ships.</strong>
          </motion.p>

          <motion.p
            className="hero__intro"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.66, ease: EASE }}
          >
            {profile.intro}
          </motion.p>

          <motion.div
            className="hero__cta"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.78, ease: EASE }}
          >
            <a className="btn btn--primary" href="#contact">
              Let&rsquo;s work together
              <ArrowIcon />
            </a>
            <a
              className="btn"
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon />
              View my LinkedIn
            </a>
            <a className="btn hero__cta-ghost" href={`mailto:${profile.email}`}>
              <MailIcon />
              Email me
            </a>
          </motion.div>

          <motion.p
            className="hero__meta"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <PinIcon className="hero__meta-ico" />
            {profile.location}
            <span className="hero__meta-dot" aria-hidden="true" />
            Open to graduate &amp; internship conversations
          </motion.p>
        </motion.div>

        <motion.div
          className="hero__figure"
          ref={figureRef}
          style={reduced ? undefined : { y: portraitY }}
          initial={reduced ? false : { opacity: 0, scale: 0.94, filter: 'blur(14px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
        >
          <div className="hero__figure-plate" aria-hidden="true" />
          <div className="hero__figure-ring" aria-hidden="true" />

          <motion.div className="hero__portrait" style={reduced ? undefined : { scale: portraitScale }}>
            <picture>
              <source
                type="image/avif"
                srcSet="/juliana-portrait.avif"
                media="(min-width: 700px)"
              />
              <source
                type="image/webp"
                srcSet="/juliana-portrait-480.webp 480w, /juliana-portrait.webp 960w"
                sizes="(min-width: 1024px) 460px, (min-width: 700px) 50vw, 80vw"
              />
              <img
                src="/juliana-portrait.jpg"
                width={960}
                height={1263}
                alt="Juliana Moore standing beside the Microsoft sign at the Redmond campus"
                fetchPriority="high"
                decoding="async"
                style={{
                  backgroundImage: `url(${portraitPlaceholder})`,
                  backgroundSize: 'cover',
                }}
              />
            </picture>
            <span className="hero__portrait-sheen" aria-hidden="true" />
          </motion.div>

          <motion.div
            className="hero__badge"
            initial={reduced ? false : { opacity: 0, y: 18, x: -10 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.9, delay: 1.05, ease: EASE }}
          >
            <span className="hero__badge-k">Currently</span>
            <span className="hero__badge-v">Microsoft</span>
            <span className="hero__badge-s">Copilot &amp; AI solutions</span>
          </motion.div>

          <span className="hero__caption" aria-hidden="true">
            Redmond, WA
          </span>
        </motion.div>
      </div>

      <motion.ul
        className="hero__stats shell"
        initial={reduced ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.1, ease: EASE }}
      >
        {stats.map((s) => (
          <li key={s.label}>
            <span className="hero__stat-v">{s.value}</span>
            <span className="hero__stat-l">{s.label}</span>
            <span className="hero__stat-d">{s.detail}</span>
          </li>
        ))}
      </motion.ul>

      <div className="hero__scrollwrap shell">
        <a className="hero__scroll" href="#about">
          <DownIcon className="hero__scroll-ico" />
          <span>Keep scrolling</span>
        </a>
      </div>
    </section>
  );
}

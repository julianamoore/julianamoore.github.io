import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { profile } from '../data/content';
import { LinkedInIcon } from './Icons';
import './Nav.css';

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'contact', label: 'Contact' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav__inner shell">
        <a className="nav__mark" href="#top" aria-label="Juliana Moore — back to top">
          <span className="nav__mark-glyph">JM</span>
          <span className="nav__mark-text">
            Juliana <span>Moore</span>
          </span>
        </a>

        <nav className="nav__links" aria-label="Section navigation">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`nav__link ${active === link.id ? 'is-active' : ''}`}
            >
              <span>{link.label}</span>
              {active === link.id && !reduced && (
                <motion.span className="nav__pill" layoutId="nav-pill" transition={{ type: 'spring', stiffness: 420, damping: 36 }} />
              )}
            </a>
          ))}
        </nav>

        <div className="nav__end">
          <a
            className="nav__icon"
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Juliana Moore on LinkedIn (opens in a new tab)"
          >
            <LinkedInIcon className="nav__icon-svg" />
          </a>
          <button
            type="button"
            className={`nav__burger ${open ? 'is-open' : ''}`}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <i aria-hidden="true" />
            <i aria-hidden="true" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="nav__sheet"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul>
              {LINKS.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.4 }}
                >
                  <a href={`#${link.id}`} onClick={() => setOpen(false)}>
                    <span className="nav__sheet-num">{String(i + 1).padStart(2, '0')}</span>
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a
              className="btn btn--primary nav__sheet-cta"
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              <LinkedInIcon />
              Connect on LinkedIn
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

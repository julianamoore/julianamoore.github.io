import { useRef, useState } from 'react';
import { profile } from '../data/content';
import { Reveal } from './Reveal';
import { ArrowIcon, GitHubIcon, LinkedInIcon, MailIcon, PinIcon } from './Icons';
import './Contact.css';

export function Contact() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="contact__glow" aria-hidden="true" />
      <div className="shell">
        <div className="contact__inner">
          <Reveal>
            <p className="eyebrow">06 — Contact</p>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="contact__title" id="contact-title">
              Let&rsquo;s build something
              <span className="contact__title-accent"> worth demoing.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="contact__lede">
              Hiring, collaborating, or just want to argue about whether AI agents are overhyped?
              I&rsquo;d genuinely like to hear from you.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="contact__actions">
              <a
                className="btn btn--primary btn--lg"
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon />
                Connect on LinkedIn
                <ArrowIcon className="btn-ico btn-arrow" />
              </a>
              <a className="btn btn--ghost btn--lg" href={`mailto:${profile.email}`}>
                <MailIcon />
                Email me
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="contact__meta">
              <button type="button" className="contact__email" onClick={copyEmail}>
                <span>{profile.email}</span>
                <span className="contact__copy" aria-hidden="true">
                  {copied ? 'Copied ✓' : 'Copy'}
                </span>
                <span className="sr-only">
                  {copied ? 'Email address copied' : 'Copy email address'}
                </span>
              </button>

              <p className="contact__where">
                <PinIcon />
                {profile.location}
              </p>

              <a
                className="contact__gh"
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon />
                GitHub
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

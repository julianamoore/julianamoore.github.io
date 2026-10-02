import { profile } from '../data/content';
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons';
import './Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer__inner">
        <div className="footer__brand">
          <a className="footer__mark" href="#top">
            JM
          </a>
          <p>
            {profile.fullName} — {profile.headline}
          </p>
        </div>

        <ul className="footer__social">
          <li>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Juliana Moore on LinkedIn"
            >
              <LinkedInIcon />
            </a>
          </li>
          <li>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Juliana Moore on GitHub"
            >
              <GitHubIcon />
            </a>
          </li>
          <li>
            <a href={`mailto:${profile.email}`} aria-label={`Email ${profile.fullName}`}>
              <MailIcon />
            </a>
          </li>
        </ul>

        <p className="footer__legal">
          <span>© {new Date().getFullYear()} {profile.fullName}</span>
          <span aria-hidden="true">·</span>
          <span>{profile.location}</span>
        </p>
      </div>
    </footer>
  );
}

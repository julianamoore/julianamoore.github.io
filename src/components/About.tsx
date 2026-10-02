import { about, languages } from '../data/content';
import { Reveal } from './Reveal';
import { SparkIcon } from './Icons';
import './About.css';

export function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="shell about__grid">
        <div className="about__side">
          <Reveal>
            <p className="eyebrow">01 — About</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="section-title" id="about-title">
              Psychology taught me <em>why</em>. Engineering taught me <em>how</em>.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="about__quote">
              <SparkIcon className="about__quote-ico" />
              <p>{about.lede}</p>
            </div>
          </Reveal>
        </div>

        <div className="about__body">
          {about.paragraphs.map((text, i) => (
            <Reveal key={i} delay={0.06 * i} as="p" className="about__p">
              {text}
            </Reveal>
          ))}

          <Reveal delay={0.2}>
            <p className="about__signature">{about.signature}</p>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="about__langs">
              <h3 className="about__langs-title">Languages</h3>
              <ul>
                {languages.map((lang) => (
                  <li key={lang.name}>
                    <span className="about__lang-code" aria-hidden="true">
                      {lang.short}
                    </span>
                    <span className="about__lang-name">{lang.name}</span>
                    <span className="about__lang-level">{lang.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

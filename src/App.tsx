import { Atmosphere } from './components/Atmosphere';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Work } from './components/Work';
import { Credentials } from './components/Credentials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Atmosphere />
      <Nav />
      <main className="page" id="main">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Work />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

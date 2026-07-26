import { About } from './components/About';
import { Achievements } from './components/Achievements';
import { BlueprintGrid } from './components/BlueprintGrid';
import { Contact } from './components/Contact';
import { Education } from './components/Education';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Journey } from './components/Journey';
import { Marquee } from './components/Marquee';
import { Navbar } from './components/Navbar';
import { ProjectShowcase } from './components/ProjectShowcase';
import { StatusBar } from './components/StatusBar';
import { TechStack } from './components/TechStack';

export default function App() {
  return (
    <>
      <BlueprintGrid />
      <Navbar />
      <main id="main" className="relative z-10">
        <Hero />
        <Marquee />
        <About />
        <ProjectShowcase />
        <ExperienceTimeline />
        <Achievements />
        <TechStack />
        <Education />
        <Journey />
        <Contact />
      </main>
      <Footer />
      <StatusBar />
    </>
  );
}

// src/pages/Home.jsx
import Banner from '../Components/Banner';
import About from '../Components/About';
import Education from '../Components/Education';
import Services from '../Components/Services';
import Projects from '../Components/Projects';
import Contact from '../Components/Contact';
import AnimatedSection from '../Components/AnimatedSection';

const Home = () => {
  return (
    <div>
      {/* Banner - No animation or very light */}
      <Banner />

      <div className="space-y-20">
        <AnimatedSection direction="up">
          <About />
        </AnimatedSection>

        <AnimatedSection direction="left" delay={0.1}>
          <Education />
        </AnimatedSection>

        <AnimatedSection direction="right" delay={0.2}>
          <Services />
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.1}>
          <Projects />
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.2}>
          <Contact />
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Home;
// src/pages/AboutPage.jsx
import About from '../Components/About';
import Education from '../Components/Education';
import AnimatedSection from '../Components/AnimatedSection';
import TechStack from '../Components/TechStack';

const AboutPage = () => {
  return (
    <div className="pb-16 space-y-20">
      <AnimatedSection direction="left">
        <About />
      </AnimatedSection>

      <AnimatedSection direction="right" delay={0.2}>
        <Education />
      </AnimatedSection>

      
    </div>
  );
};

export default AboutPage;
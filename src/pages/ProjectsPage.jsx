// src/pages/ProjectsPage.jsx
import Projects from '../Components/Projects';
import AnimatedSection from '../Components/AnimatedSection';
import TechStack from '../Components/TechStack';

const ProjectsPage = () => {
  return (
    <div className="pb-16">
      <AnimatedSection direction="up">
        <Projects />
      </AnimatedSection>

      <AnimatedSection direction="left" delay={0.4}>
        <TechStack />
      </AnimatedSection>
    </div>
  );
};

export default ProjectsPage;
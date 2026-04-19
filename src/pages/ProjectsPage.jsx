// src/pages/ProjectsPage.jsx
import Projects from '../Components/Projects';
import AnimatedSection from '../Components/AnimatedSection';

const ProjectsPage = () => {
  return (
    <div className="pb-16">
      <AnimatedSection direction="up">
        <Projects />
      </AnimatedSection>
    </div>
  );
};

export default ProjectsPage;
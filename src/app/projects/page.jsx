import Projects from '@/Components/Projects';
import AnimatedSection from '@/Components/AnimatedSection';
import TechStack from '@/Components/TechStack';

export const metadata = {
  title: 'My Projects - Ruhul Amin',
  description: 'A showcase of web development projects, client solutions, and technical works by Ruhul Amin.',
};

export default function ProjectsPage() {
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
}

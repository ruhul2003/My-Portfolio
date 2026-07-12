import About from '@/Components/About';
import Education from '@/Components/Education';
import AnimatedSection from '@/Components/AnimatedSection';

export const metadata = {
  title: 'About Me - Ruhul Amin',
  description: 'Learn more about Ruhul Amin\'s background, education, and professional experience.',
};

export default function AboutPage() {
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
}

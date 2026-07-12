import Contact from '@/Components/Contact';
import AnimatedSection from '@/Components/AnimatedSection';

export const metadata = {
  title: 'Contact - Ruhul Amin',
  description: 'Get in touch with Ruhul Amin for project opportunities, job offers, or collaboration questions.',
};

export default function ContactPage() {
  return (
    <div className="pb-16">
      <AnimatedSection direction="up">
        <Contact />
      </AnimatedSection>
    </div>
  );
}

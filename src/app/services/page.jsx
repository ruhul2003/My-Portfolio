import Services from '@/Components/Services';
import AnimatedSection from '@/Components/AnimatedSection';

export const metadata = {
  title: 'Services - Ruhul Amin',
  description: 'Explore the web development, brand design, and database management services provided by Ruhul Amin.',
};

export default function ServicesPage() {
  return (
    <div className="pb-16">
      <AnimatedSection direction="right">
        <Services />
      </AnimatedSection>
    </div>
  );
}

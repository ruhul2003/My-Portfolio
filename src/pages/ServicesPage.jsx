// src/pages/ServicesPage.jsx
import Services from '../Components/Services';
import AnimatedSection from '../Components/AnimatedSection';

const ServicesPage = () => {
  return (
    <div className="pb-16">
      <AnimatedSection direction="right">
        <Services />
      </AnimatedSection>
    </div>
  );
};

export default ServicesPage;
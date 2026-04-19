// src/pages/ContactPage.jsx
import Contact from '../Components/Contact';
import AnimatedSection from '../Components/AnimatedSection';

const ContactPage = () => {
  return (
    <div className="pb-16">
      <AnimatedSection direction="up">
        <Contact />
      </AnimatedSection>
    </div>
  );
};

export default ContactPage;
// src/Components/AnimatedSection.jsx
import { motion } from 'framer-motion';

const AnimatedSection = ({ children, direction = "up", delay = 0 }) => {
  const variants = {
    up: {
      initial: { opacity: 0, y: 40 },
      animate: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6, ease: "easeOut", delay }
      }
    },
    left: {
      initial: { opacity: 0, x: -60 },
      animate: { 
        opacity: 1, 
        x: 0,
        transition: { duration: 0.6, ease: "easeOut", delay }
      }
    },
    right: {
      initial: { opacity: 0, x: 60 },
      animate: { 
        opacity: 1, 
        x: 0,
        transition: { duration: 0.6, ease: "easeOut", delay }
      }
    }
  };

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}     // Important: Runs only once
      variants={variants[direction]}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
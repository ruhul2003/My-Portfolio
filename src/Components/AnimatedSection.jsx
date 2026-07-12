"use client";

import { motion } from 'framer-motion';

const AnimatedSection = ({ children, direction = "up", delay = 0, duration = 0.8 }) => {
  const springTransition = {
    type: "spring",
    stiffness: 50,
    damping: 15,
    mass: 1,
    delay: delay,
  };

  const variants = {
    up: {
      initial: { opacity: 0, y: 50 },
      animate: { 
        opacity: 1, 
        y: 0,
        transition: springTransition
      }
    },
    down: {
      initial: { opacity: 0, y: -50 },
      animate: { 
        opacity: 1, 
        y: 0,
        transition: springTransition
      }
    },
    left: {
      initial: { opacity: 0, x: -50 },
      animate: { 
        opacity: 1, 
        x: 0,
        transition: springTransition
      }
    },
    right: {
      initial: { opacity: 0, x: 50 },
      animate: { 
        opacity: 1, 
        x: 0,
        transition: springTransition
      }
    },
    fade: {
      initial: { opacity: 0 },
      animate: { 
        opacity: 1,
        transition: { duration, ease: "easeInOut", delay }
      }
    },
    scale: {
      initial: { opacity: 0, scale: 0.92 },
      animate: { 
        opacity: 1, 
        scale: 1,
        transition: springTransition
      }
    }
  };

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants[direction]}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
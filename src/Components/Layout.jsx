// src/Components/Layout.jsx
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';

const pageVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1,        // Creates nice staggered effect
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: "easeIn",
    },
  },
};

// Different animations for left and right coming elements
const leftVariant = {
  initial: { opacity: 0, x: -60 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    x: -40,
    transition: { duration: 0.4 }
  },
};

const rightVariant = {
  initial: { opacity: 0, x: 60 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    x: 40,
    transition: { duration: 0.4 }
  },
};

const centerVariant = {
  initial: { opacity: 0, y: 30 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.35 }
  },
};

const Layout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-white">
      <Navbar />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            className="pt-20"                 // Keeps space for fixed navbar
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
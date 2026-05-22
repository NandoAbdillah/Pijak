import { motion } from "framer-motion";

/** @typedef {{ children: import('react').ReactNode, delay?: number, className?: string }} FadeUpProps */
/** @typedef {{ children: import('react').ReactNode, className?: string }} MotionProps */

/** @param {FadeUpProps} props */
export const FadeUp = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

// src/components/motion/stagger-container.tsx
/** @param {MotionProps} props */
export const StaggerContainer = ({ children, className = "" }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={className}
    >
      {children}
    </motion.div>
  );
};

/** @param {MotionProps} props */
export const StaggerItem = ({ children, className = "" }) => {
  const item = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };
  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  );
};

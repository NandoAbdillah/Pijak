import { Variants } from "framer-motion";

export const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 15 } }
};

export const STAGGER_CONTAINER: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export const FLOATING_MOTION: Variants = {
  animate: { 
    y: [0, -12, 0], 
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" } 
  }
};

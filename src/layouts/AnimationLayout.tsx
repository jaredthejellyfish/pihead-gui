import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface AnimationLayoutProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    x: 500,
  },
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: -500,
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.3,
};

function AnimationLayout({ children }: AnimationLayoutProps) {
  const { pathname } = useLocation();

  return (
    <motion.div
      key={pathname}
      initial="initial"
      animate="in"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
}

export default AnimationLayout;

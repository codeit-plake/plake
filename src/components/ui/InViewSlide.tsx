"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface InViewSlideProps {
  children: React.ReactNode;
  direction: "left" | "right" | "top" | "bottom";
  className?: string;
}

const InViewSlide = ({ children, className, direction }: InViewSlideProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const variants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
      y: direction === "top" ? -100 : direction === "bottom" ? 100 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{
        duration: 1,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default InViewSlide;

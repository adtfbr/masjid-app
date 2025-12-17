'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'left' | 'right';
  className?: string;
}

export default function ScrollReveal({ 
  children, 
  delay = 0, 
  direction = 'up',
  className = ''
}: ScrollRevealProps) {
  
  // Tentukan arah animasi
  const variants = {
    hidden: { 
      opacity: 0, 
      y: direction === 'up' ? 50 : 0, 
      x: direction === 'left' ? -50 : direction === 'right' ? 50 : 0 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0 
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }} // Animasi jalan saat elemen masuk layar -50px
      transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
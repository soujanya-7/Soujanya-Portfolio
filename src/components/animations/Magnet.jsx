import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const Magnet = ({ children, padding = 100, disabled = false, className = '' }) => {
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const magnetRef = useRef(null);

  const handleMouseMove = (e) => {
    if (disabled) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = magnetRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    // Check if within padding
    if (Math.abs(distanceX) < width / 2 + padding && Math.abs(distanceY) < height / 2 + padding) {
      setIsActive(true);
      setPosition({ x: distanceX * 0.3, y: distanceY * 0.3 });
    } else {
      setIsActive(false);
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setIsActive(false);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={magnetRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Magnet;

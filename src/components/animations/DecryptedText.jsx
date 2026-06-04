import React, { useEffect, useState, useRef } from 'react';

const CHARS = '!@#$%^&*()_+-=[]{}|;\':",./<>?0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export default function DecryptedText({
  text,
  speed = 40,
  delay = 0,
  className = '',
  useHover = true,
  useInView = true,
}) {
  const [displayText, setDisplayText] = useState('');
  const containerRef = useRef(null);
  const hasTriggered = useRef(false);
  const intervalRef = useRef(null);

  const startScramble = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    let currentIteration = 0;
    const maxIterations = text.length + 5;
    
    intervalRef.current = setInterval(() => {
      setDisplayText(() => {
        return text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            const revealLimit = Math.floor(currentIteration / 2);
            if (index < revealLimit) {
              return char;
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('');
      });

      currentIteration++;
      if (currentIteration >= maxIterations * 2) {
        clearInterval(intervalRef.current);
        setDisplayText(text);
      }
    }, speed);
  };

  useEffect(() => {
    let timeoutId;
    
    if (useInView && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasTriggered.current) {
              hasTriggered.current = true;
              timeoutId = setTimeout(() => {
                startScramble();
              }, delay);
            }
          });
        },
        { threshold: 0.1 }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => {
        observer.disconnect();
        if (timeoutId) clearTimeout(timeoutId);
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    } else {
      timeoutId = setTimeout(() => {
        startScramble();
      }, delay);
      return () => {
        clearTimeout(timeoutId);
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, [text, speed, delay, useInView]);

  const handleMouseEnter = () => {
    if (useHover) {
      startScramble();
    }
  };

  return (
    <span
      ref={containerRef}
      className={`decrypted-text ${className}`}
      onMouseEnter={handleMouseEnter}
      style={{ display: 'inline-block' }}
    >
      {displayText || text}
    </span>
  );
}

import React, { useEffect, useState, useRef } from 'react';

export default function DecryptedText({ 
  text, 
  speed = 35, 
  delay = 100,
  sequential = true,
  animateOn = 'view', // 'view', 'hover', or 'mount'
  className = '' 
}) {
  const [displayedText, setDisplayedText] = useState(text);
  const containerRef = useRef(null);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*+-/<>[]{}';

  useEffect(() => {
    let active = true;
    let observer;
    let cleanupFunc;

    const startAnimation = () => {
      let currentIteration = 0;
      const totalSteps = text.length * 2 + 8;
      
      const interval = setInterval(() => {
        if (!active) {
          clearInterval(interval);
          return;
        }
        
        setDisplayedText(() => {
          return text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              
              if (sequential) {
                // Progressive reveal from left to right
                const revealIndex = Math.floor(currentIteration / 2);
                if (index < revealIndex) {
                  return text[index];
                }
              }

              // Return a random character for currently scrambled letters
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');
        });

        currentIteration++;
        if (currentIteration >= totalSteps) {
          clearInterval(interval);
          setDisplayedText(text);
        }
      }, speed);

      cleanupFunc = () => clearInterval(interval);
    };

    if (animateOn === 'view') {
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && active) {
            setTimeout(() => {
              if (active) startAnimation();
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }
    } else if (animateOn === 'mount') {
      setTimeout(() => {
        if (active) startAnimation();
      }, delay);
    }

    return () => {
      active = false;
      if (observer && containerRef.current) {
        observer.unobserve(containerRef.current);
      }
      if (cleanupFunc) cleanupFunc();
    };
  }, [text, speed, delay, sequential, animateOn]);

  const handleMouseEnter = () => {
    if (animateOn === 'hover') {
      let currentIteration = 0;
      const totalSteps = text.length * 2 + 8;
      const interval = setInterval(() => {
        setDisplayedText(() => {
          return text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (index < Math.floor(currentIteration / 2)) {
                return text[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');
        });
        currentIteration++;
        if (currentIteration >= totalSteps) {
          clearInterval(interval);
          setDisplayedText(text);
        }
      }, speed);
    }
  };

  return (
    <span 
      ref={containerRef} 
      className={className}
      onMouseEnter={handleMouseEnter}
    >
      {displayedText}
    </span>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import soujanyaPhoto from './assets/soujanya.png';
import ShinyText from './components/animations/ShinyText';

/* ── Animated Split Text ── */
function SplitText({ text, className, delay = 0 }) {
  return (
    <span className={className} aria-label={text}>
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
          initial={{ opacity: 0, y: 40, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.5, delay: delay + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

/* ── Typewriter Role ── */
const ROLES = ['Full-Stack Developer', 'MERN Stack Engineer', 'UI/UX Enthusiast', 'Problem Solver'];
function TypewriterRole() {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const target = ROLES[idx];
    const speed = deleting ? 40 : 80;
    ref.current = setTimeout(() => {
      if (!deleting) {
        setDisplayed(target.slice(0, displayed.length + 1));
        if (displayed.length + 1 === target.length) {
          setTimeout(() => setDeleting(true), 1500);
        }
      } else {
        setDisplayed(target.slice(0, displayed.length - 1));
        if (displayed.length === 0) {
          setDeleting(false);
          setIdx((p) => (p + 1) % ROLES.length);
        }
      }
    }, speed);
    return () => clearTimeout(ref.current);
  }, [displayed, deleting, idx]);

  return (
    <span className="typewriter-role">
      {displayed}<span className="cursor-blink">|</span>
    </span>
  );
}



/* ── Main Component ── */
export default function SpotlightHero({ onNavigate }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5; // range: -0.5 to 0.5
    const y = (e.clientY - top) / height - 0.5; // range: -0.5 to 0.5
    setTilt({ x: x * 15, y: y * -15 }); // Tilt limit: 15 degrees max
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section className="clean-hero" id="home">
      {/* Aurora background */}
      <div className="aurora-wrap" aria-hidden>
        <div className="aurora a1" />
        <div className="aurora a2" />
        <div className="aurora a3" />
      </div>

      {/* Dot grid */}
      <div className="hero-dot-grid" aria-hidden />

      <div className="clean-hero-container">
        {/* ── LEFT ── */}
        <div className="clean-hero-left">
          {/* Top Status Badge */}
          <motion.div 
            className="hero-badge font-mono"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <span className="badge-glow-dot" />
            <span>Available for Internships & Projects</span>
          </motion.div>

          {/* Big title */}
          <h1 className="clean-hero-title">
            <span className="title-hi">
              <SplitText text="Hi, I'm" delay={0.2} />
            </span>
            <span className="title-name">
              <SplitText text="Soujanya" className="hero-name-text" delay={0.4} />
            </span>
            <span className="title-role">
              <TypewriterRole />
            </span>
          </h1>

          {/* Description */}
          <motion.p
            className="clean-hero-desc"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2 }}
          >
            I craft fast, accessible, and visually stunning web experiences using the MERN stack — turning ideas into impactful digital products.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="hero-cta-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.4 }}
          >
            <button className="btn-glow" onClick={() => onNavigate('projects')}>
              <ShinyText speed="3s">View My Work</ShinyText>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <button className="btn-outline-hero" onClick={() => onNavigate('contact')}>
              <ShinyText color="#7c3aed" speed="3s">Contact Me</ShinyText>
            </button>
          </motion.div>
        </div>

        {/* ── RIGHT: 3D Tilting Blob Photo ── */}
        <motion.div
          className="clean-hero-right"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div 
            className="clean-hero-blob-wrap"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ rotateX: tilt.y, rotateY: tilt.x }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
          >
            {/* Ambient drop glow behind morphing blob */}
            <div className="blob-glow-backdrop" />
            
            <div className="clean-hero-blob" style={{ transform: 'translateZ(20px)' }}>
              <img src={soujanyaPhoto} alt="Soujanya" className="clean-hero-photo" />
            </div>
            
            {/* Orbiting ring */}
            <div className="blob-ring" aria-hidden style={{ transform: 'translateZ(10px)' }} />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <div className="scroll-mouse"><div className="scroll-wheel" /></div>
        <span>Scroll</span>
      </motion.div>
    </section>
  );
}

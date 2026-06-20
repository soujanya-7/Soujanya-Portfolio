import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import soujanyaPhoto from './assets/soujanya.png';
import ShinyText from './components/animations/ShinyText';
import Magnet from './components/animations/Magnet';
import { Database, Cpu, Terminal, Blocks, ArrowRight } from 'lucide-react';

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
            <Magnet padding={40} className="hero-cta-magnet">
              <button className="btn-glow" onClick={() => onNavigate('projects')}>
                <ShinyText speed="3s">View My Work</ShinyText>
                <ArrowRight size={16} />
              </button>
            </Magnet>
            <Magnet padding={40} className="hero-cta-magnet">
              <button className="btn-outline-hero" onClick={() => onNavigate('contact')}>
                <ShinyText color="#7c3aed" speed="3s">Contact Me</ShinyText>
              </button>
            </Magnet>
          </motion.div>
        </div>

        {/* ── RIGHT: Blob Photo ── */}
        <motion.div
          className="clean-hero-right"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="clean-hero-blob-wrap">
            {/* Holographic background rings */}
            <div className="blob-ring-outer" aria-hidden />
            <div className="blob-ring-inner" aria-hidden />
            
            <div className="clean-hero-blob">
              <img src={soujanyaPhoto} alt="Soujanya" className="clean-hero-photo" />
            </div>
            
            {/* Orbiting ring */}
            <div className="blob-ring" aria-hidden />

            {/* Interactive floating badges */}
            <motion.div 
              className="hero-floating-badge badge-top-left"
              whileHover={{ y: -5, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="badge-icon-wrap" style={{ background: 'rgba(124, 58, 237, 0.15)', color: '#8b5cf6' }}>
                <Blocks size={18} />
              </div>
              <div className="badge-info">
                <span className="badge-title">Full-Stack Web</span>
                <span className="badge-sub">MERN Developer</span>
              </div>
            </motion.div>

            <motion.div 
              className="hero-floating-badge badge-bottom-right"
              whileHover={{ y: -5, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="badge-icon-wrap" style={{ background: 'rgba(14, 165, 233, 0.15)', color: '#0ea5e9' }}>
                <Cpu size={18} />
              </div>
              <div className="badge-info">
                <span className="badge-title">IoT Systems</span>
                <span className="badge-sub">Arduino & ESP32</span>
              </div>
            </motion.div>
          </div>
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

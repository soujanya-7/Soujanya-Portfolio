import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import soujanyaPhoto from './assets/soujanya.png';

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

/* ── Social Icons ── */
const SOCIALS = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V9h4v1.5A6 6 0 0 1 16 8zM2 9h4v12H2zm2-6a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/>
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85 0 1.34-.01 2.41-.01 2.74 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z"/>
      </svg>
    ),
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.5 7-3.8 1.1 0 3-1.2 3-1.2z"/>
      </svg>
    ),
  },
];

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
          {/* Status badge */}
          <motion.div
            className="hero-status-badge"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="status-dot" />
            Available for Work
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
              View My Work
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <button className="btn-outline-hero" onClick={() => onNavigate('contact')}>
              Contact Me
            </button>
          </motion.div>

          {/* Socials */}
          <motion.div
            className="clean-hero-socials"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.7 }}
          >
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="social-icon" aria-label={s.label}>
                {s.icon}
              </a>
            ))}
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
            <div className="clean-hero-blob">
              <img src={soujanyaPhoto} alt="Soujanya" className="clean-hero-photo" />
            </div>
            {/* Orbiting ring */}
            <div className="blob-ring" aria-hidden />
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

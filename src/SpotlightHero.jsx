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

/* ── Floating Particles ── */
function FloatingParticles() {
  const particles = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 12 + 8,
    delay: Math.random() * 6,
    opacity: Math.random() * 0.4 + 0.1,
  }));

  return (
    <div className="hero-particles-field" aria-hidden>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="hero-particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [p.opacity, p.opacity * 1.8, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ── Main Component ── */
export default function SpotlightHero({ onNavigate }) {
  const stats = [
    { value: '10+', label: 'Projects' },
    { value: '2+', label: 'Years Exp.' },
    { value: '15+', label: 'Technologies' },
  ];

  return (
    <section className="clean-hero" id="home">
      {/* Mesh gradient background */}
      <div className="hero-mesh-bg" aria-hidden />

      {/* Aurora glow blobs */}
      <div className="aurora-wrap" aria-hidden>
        <div className="aurora a1" />
        <div className="aurora a2" />
        <div className="aurora a3" />
      </div>

      {/* Dot grid */}
      <div className="hero-dot-grid" aria-hidden />

      {/* Floating particles */}
      <FloatingParticles />

      {/* Horizontal scan line */}
      <div className="hero-scanline" aria-hidden />

      <div className="clean-hero-container">
        {/* ── LEFT ── */}
        <div className="clean-hero-left">

          {/* Status badge */}
          <motion.div
            className="hero-status-badge"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="status-dot" />
            Available for opportunities
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

          {/* Stats row */}
          <motion.div
            className="hero-stats-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.35 }}
          >
            {stats.map((s, i) => (
              <React.Fragment key={s.label}>
                <div className="hero-stat-item">
                  <span className="hero-stat-num">{s.value}</span>
                  <span className="hero-stat-label">{s.label}</span>
                </div>
                {i < stats.length - 1 && <div className="hero-stat-divider" />}
              </React.Fragment>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="hero-cta-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.5 }}
          >
            <button className="btn-glow" onClick={() => onNavigate('projects')}>
              <ShinyText speed="3s">View My Work</ShinyText>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <button className="btn-outline-hero" onClick={() => onNavigate('contact')}>
              <ShinyText color="#7c3aed" speed="3s">Contact Me</ShinyText>
            </button>
          </motion.div>

          {/* Social links */}
          <motion.div
            className="hero-social-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.65 }}
          >
            <span className="hero-social-label">Find me on</span>
            <a href="https://github.com/soujanya-7" target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label="GitHub">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/soujanya-s-5aa02a286/" target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="mailto:soujanyaselvaraj2004@gmail.com" className="hero-social-link" aria-label="Email">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </a>
          </motion.div>
        </div>

        {/* ── RIGHT: Premium Photo Frame ── */}
        <motion.div
          className="clean-hero-right"
          initial={{ opacity: 0, scale: 0.85, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-photo-frame">
            {/* Outer glow */}
            <div className="hero-photo-glow" />
            {/* Spinning rings */}
            <div className="hero-ring hero-ring-1" />
            <div className="hero-ring hero-ring-2" />
            {/* Photo blob */}
            <div className="clean-hero-blob-wrap">
              <div className="clean-hero-blob">
                <img src={soujanyaPhoto} alt="Soujanya" className="clean-hero-photo" />
              </div>
            </div>
            {/* Floating badges */}
            <motion.div
              className="hero-float-badge badge-mern"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="badge-icon">⚡</span>
              <span>MERN Stack</span>
            </motion.div>
            <motion.div
              className="hero-float-badge badge-ui"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              <span className="badge-icon">🎨</span>
              <span>UI / UX</span>
            </motion.div>
            <motion.div
              className="hero-float-badge badge-open"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <span className="badge-icon">✨</span>
              <span>Open Source</span>
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

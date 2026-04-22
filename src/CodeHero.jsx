import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { ChevronRight, Terminal, Code, Cpu, Globe } from 'lucide-react';

const FULL_CODE = [
  { type: 'comment', text: '// Initialize the developer profile' },
  { type: 'keyword', text: 'const', variable: 'soujanya', value: '{' },
  { type: 'property', text: '  role:', string: '"ECE Engineer & Full-Stack Developer",' },
  { type: 'property', text: '  education:', string: '"Sri Eshwar College of Engineering",' },
  { type: 'property', text: '  skills:', array: '["React", "Node.js", "IoT", "Arduino", "Java"],' },
  { type: 'property', text: '  passion:', string: '"Building scalable web apps & smart systems.",' },
  { type: 'property', text: '  availability:', boolean: 'true' },
  { type: 'plain', text: '};' },
  { type: 'empty', text: '' },
  { type: 'comment', text: '// Start a new project' },
  { type: 'method', text: 'await soujanya.buildAmazingThings();' },
];

export default function CodeHero({ onNavigate }) {
  const [codeLines, setCodeLines] = useState([]);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    // Reset state strictly to prevent StrictMode duplicate firing issues
    setCodeLines([]);
    setIsTypingComplete(false);
    
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < FULL_CODE.length) {
        const item = FULL_CODE[currentLine];
        setCodeLines((prev) => [...prev, item]);
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsTypingComplete(true), 500);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="code-hero" id="home">
      {/* Animated Background Mesh */}
      <div className="ch-bg">
        <div className="ch-orb ch-orb-1"></div>
        <div className="ch-orb ch-orb-2"></div>
        <div className="ch-grid"></div>
      </div>

      <div className="ch-container">
        {/* Left Side: Text & CTAs */}
        <motion.div 
          className="ch-text-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="ch-badge">
            <span className="ch-pulse-dot"></span> System Online
          </div>
          <h1 className="ch-title">
            I write <span className="shimmer-text">Code</span> that<br />
            powers the future.
          </h1>
          <p className="ch-desc">
            Electronics & Communication Engineer crafting seamless experiences across web interfaces and embedded IoT devices.
          </p>

          {isTypingComplete && (
            <motion.div 
              className="ch-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <button className="btn-primary" onClick={() => onNavigate('projects')}>
                <Terminal size={18} style={{ marginRight: '8px' }} />
                Execute Project
                <ChevronRight size={18} style={{ marginLeft: '4px' }} />
              </button>
              <button className="btn-secondary" onClick={() => onNavigate('contact')}>
                Initialize Contact
              </button>
            </motion.div>
          )}

          {/* Floating UI Widgets */}
          <div className="ch-widgets">
            <motion.div 
              className="ch-widget glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <Cpu size={24} className="ch-widget-icon" />
              <div>
                <h4>Hardware</h4>
                <p>Arduino, ESP32</p>
              </div>
            </motion.div>
            <motion.div 
              className="ch-widget glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <Globe size={24} className="ch-widget-icon" />
              <div>
                <h4>Software</h4>
                <p>MERN Stack</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side: IDE Window */}
        <motion.div 
          className="ch-ide-wrapper"
          initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, type: "spring" }}
        >
          <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2500} className="ch-tilt">
            <div className="ch-ide-window glass-card">
              {/* Window Header */}
              <div className="ch-ide-header">
                <div className="ch-ide-controls">
                  <div className="ch-control red"></div>
                  <div className="ch-control yellow"></div>
                  <div className="ch-control green"></div>
                </div>
                <div className="ch-ide-title">
                  <Code size={14} /> soujanya.js
                </div>
              </div>

              {/* Code Area */}
              <div className="ch-ide-body">
                <div className="ch-line-numbers">
                  {FULL_CODE.map((_, i) => (
                    <span key={i}>{i + 1}</span>
                  ))}
                </div>
                <div className="ch-code-content">
                  {codeLines.map((line, idx) => {
                    if (!line) return null;
                    return (
                      <motion.div 
                        key={idx} 
                        className="ch-code-line"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        {line.type === 'comment' && <span className="c-comment">{line.text}</span>}
                        {line.type === 'empty' && <span>&nbsp;</span>}
                        {line.type === 'keyword' && (
                          <>
                            <span className="c-keyword">{line.text}</span> <span className="c-variable">{line.variable}</span> = <span className="c-punctuation">{line.value}</span>
                          </>
                        )}
                        {line.type === 'property' && (
                          <>
                            <span className="c-property">{line.text}</span>{' '}
                            {line.string && <span className="c-string">{line.string}</span>}
                            {line.array && <span className="c-array">{line.array}</span>}
                            {line.boolean && <span className="c-boolean">{line.boolean}</span>}
                          </>
                        )}
                        {line.type === 'plain' && <span className="c-punctuation">{line.text}</span>}
                        {line.type === 'method' && (
                          <>
                            <span className="c-keyword">await</span> <span className="c-variable">soujanya</span>.<span className="c-method">buildAmazingThings</span>();
                          </>
                        )}
                      </motion.div>
                    );
                  })}
                  {!isTypingComplete && <span className="ch-cursor">|</span>}
                </div>
              </div>
            </div>
          </Tilt>
        </motion.div>
      </div>
    </section>
  );
}

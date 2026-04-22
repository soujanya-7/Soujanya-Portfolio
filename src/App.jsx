import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import Matter from 'matter-js';
import { 
  Mail, ChevronRight, 
  Code, Globe, Cpu, Database, Blocks, Terminal, Edit3, Monitor, CheckCircle, Shield
} from 'lucide-react';

const Github = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17a5.5 5.5 0 0 0-1.5-3.8 5.5 5.5 0 0 0 .15-3.8s-1.18-.38-3.9 1.4a13.38 13.38 0 0 0-7 0c-2.72-1.78-3.9-1.4-3.9-1.4a5.5 5.5 0 0 0 .15 3.8 5.5 5.5 0 0 0-1.5 3.8c0 5.76 3.35 6.78 6.5 7.16a4.8 4.8 0 0 0-1 3.04V22" />
    <path d="M9 20c-5 1.5-5-2.5-7-3" />
  </svg>
);

const Linkedin = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Magnetic = ({ children, className }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      className={className}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      style={{ display: 'inline-block' }}
    >
      {children}
    </motion.div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  const [loaderProgress, setLoaderProgress] = useState(0);
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const typedTextRef = useRef(null);
  const canvasRef = useRef(null);

  // Physics Sandbox State (Concept C)
  const sceneRef = useRef(null);
  const engineRef = useRef(null);
  const renderRef = useRef(null);

  useEffect(() => {
    if (loading || !sceneRef.current) return;

    const Engine = Matter.Engine,
          Render = Matter.Render,
          Runner = Matter.Runner,
          MouseConstraint = Matter.MouseConstraint,
          Mouse = Matter.Mouse,
          Composite = Matter.Composite,
          Bodies = Matter.Bodies;

    // Create engine
    const engine = Engine.create();
    engineRef.current = engine;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Create renderer
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: 'transparent',
        pixelRatio: window.devicePixelRatio
      }
    });
    renderRef.current = render;

    // Create boundaries
    const ground = Bodies.rectangle(width / 2, height + 30, width * 2, 60, { isStatic: true, render: { fillStyle: 'transparent' } });
    const wallLeft = Bodies.rectangle(-30, height / 2, 60, height * 2, { isStatic: true, render: { fillStyle: 'transparent' } });
    const wallRight = Bodies.rectangle(width + 30, height / 2, 60, height * 2, { isStatic: true, render: { fillStyle: 'transparent' } });
    const ceiling = Bodies.rectangle(width / 2, -300, width * 2, 60, { isStatic: true, render: { fillStyle: 'transparent' } });

    Composite.add(engine.world, [ground, wallLeft, wallRight, ceiling]);

    // Create skill blocks
    const skills = ['React', 'Node.js', 'MongoDB', 'IoT', 'Arduino', 'C++', 'Java', 'Python', 'Firebase', 'MERN'];
    const blocks = skills.map((skill, i) => {
      const textWidth = skill.length * 16 + 40;
      return Bodies.rectangle(
        Math.random() * (width - 200) + 100,
        -150 - (i * 200),
        textWidth, 56,
        {
          restitution: 0.6,
          friction: 0.1,
          render: {
            fillStyle: ['#7c3aed', '#06b6d4', '#f59e0b', '#ec4899'][i % 4],
            strokeStyle: 'rgba(255,255,255,0.2)',
            lineWidth: 2
          },
          label: skill
        }
      );
    });

    Composite.add(engine.world, blocks);

    // Add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });

    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    // Run engine and renderer
    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Custom render event for drawing text on the blocks
    Matter.Events.on(render, 'afterRender', () => {
      const ctx = render.context;
      ctx.font = 'bold 20px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ffffff';

      blocks.forEach(block => {
        const { x, y } = block.position;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(block.angle);
        ctx.fillText(block.label, 0, 0);
        ctx.restore();
      });
    });

    const handleResize = () => {
      render.canvas.width = window.innerWidth;
      render.canvas.height = window.innerHeight;
      Matter.Body.setPosition(ground, { x: window.innerWidth / 2, y: window.innerHeight + 30 });
      Matter.Body.setPosition(wallRight, { x: window.innerWidth + 30, y: window.innerHeight / 2 });
    };
    window.addEventListener('resize', handleResize);

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      if (engineRef.current) Engine.clear(engineRef.current);
      if (renderRef.current && renderRef.current.canvas) renderRef.current.canvas.remove();
      window.removeEventListener('resize', handleResize);
    };
  }, [loading]);

  // Loader Effect
  useEffect(() => {
    let pct = 0;
    const interval = setInterval(() => {
      pct += Math.random() * 12 + 4;
      if (pct >= 100) {
        pct = 100;
        clearInterval(interval);
      }
      setLoaderProgress(pct);
      if (pct >= 100) {
        setTimeout(() => setLoading(false), 400);
      }
    }, 80);
    return () => clearInterval(interval);
  }, []);

  // Cursor Effect
  useEffect(() => {
    if ('ontouchstart' in window) return;

    let fx = 0, fy = 0;
    const handleMouseMove = (e) => {
      if (cursorRef.current && followerRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
        fx += (e.clientX - fx) * 0.12;
        fy += (e.clientY - fy) * 0.12;
        followerRef.current.style.left = e.clientX + 'px';
        followerRef.current.style.top = e.clientY + 'px';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Navbar Scroll & Intersection Observer
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const backToTop = document.getElementById('backToTop');
      if (backToTop) {
        backToTop.classList.toggle('visible', window.scrollY > 400);
      }
    };
    window.addEventListener('scroll', handleScroll);

    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );
    sections.forEach((s) => observer.observe(s));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      sections.forEach((s) => observer.unobserve(s));
    };
  }, []);

  // Reveal Elements Observer
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el, i) => {
      el.style.transitionDelay = (i % 4) * 0.08 + 's';
      obs.observe(el);
    });
    return () => obs.disconnect();
  }, [loading]);

  // Typed Text Effect
  useEffect(() => {
    if (loading || !typedTextRef.current) return;
    const phrases = [
      'Smart Web Apps',
      'IoT Solutions',
      'MERN Projects',
      'Embedded Systems',
      'Full-Stack Magic',
    ];
    let pi = 0, ci = 0, deleting = false;
    let timer;

    const tick = () => {
      if (!typedTextRef.current) return;
      const phrase = phrases[pi];
      typedTextRef.current.textContent = deleting ? phrase.slice(0, ci--) : phrase.slice(0, ci++);
      let delay = deleting ? 60 : 90;
      if (!deleting && ci > phrase.length) {
        deleting = true;
        delay = 1600;
      }
      if (deleting && ci < 0) {
        deleting = false;
        pi = (pi + 1) % phrases.length;
        ci = 0;
        delay = 400;
      }
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, 1200);
    return () => clearTimeout(timer);
  }, [loading]);

  // Counters Effect
  useEffect(() => {
    if (loading) return;
    const counters = document.querySelectorAll('.counter');
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseInt(el.dataset.target);
          let current = 0;
          const step = Math.max(1, Math.floor(target / 80));
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            el.textContent = current;
          }, 18);
          obs.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, [loading]);



  const handleNavClick = (sectionId) => {
    setNavOpen(false);
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const btn = e.currentTarget.querySelector('button');
    const span = btn.querySelector('span');
    const originalText = span.textContent;
    
    span.textContent = 'Sending...';
    btn.disabled = true;
    
    setTimeout(() => {
      span.textContent = '✓ Message Sent!';
      btn.style.background = 'linear-gradient(135deg,#10b981,#059669)';
      setTimeout(() => {
        span.textContent = originalText;
        btn.disabled = false;
        btn.style.background = '';
        e.target.reset();
      }, 3000);
    }, 1500);
  };

  return (
    <>
      {loading && (
        <div className="loader" id="loader">
          <div className="loader-inner">
            <div className="loader-text">
              <span className="loader-name">Soujanya S</span>
              <div className="loader-bar">
                <div className="loader-progress" style={{ width: `${loaderProgress}%` }}></div>
              </div>
              <span className="loader-percent">{Math.floor(loaderProgress)}%</span>
            </div>
          </div>
        </div>
      )}

      <div className="cursor" ref={cursorRef}></div>
      <div className="cursor-follower" ref={followerRef}></div>

      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="nav-logo">
          <span className="logo-bracket">&lt;</span>
          <span className="logo-name">Soujanya</span>
          <span className="logo-bracket">/&gt;</span>
        </div>
        <div className={`nav-links ${navOpen ? 'open' : ''}`} id="navLinks">
          {['home', 'about', 'skills', 'projects', 'experience', 'achievements', 'contact'].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className={`nav-link ${activeSection === item ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleNavClick(item); }}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          ))}
        </div>
        <div className="nav-actions">
          <Magnetic><a href="mailto:soujanya.s2023@sece.ac.in" className="btn-hire">Hire Me</a></Magnetic>
          <button className="nav-toggle" id="navToggle" onClick={() => setNavOpen(!navOpen)}>
            <span style={{ transform: navOpen ? 'rotate(45deg) translate(5px,5px)' : '' }}></span>
            <span style={{ opacity: navOpen ? '0' : '1' }}></span>
            <span style={{ transform: navOpen ? 'rotate(-45deg) translate(5px,-5px)' : '' }}></span>
          </button>
        </div>
      </nav>

      <section className="physics-hero" id="home">
        <div className="physics-canvas-container" ref={sceneRef}></div>
        <div className="physics-overlay">
          <h1 className="physics-title">Soujanya S</h1>
          <p className="physics-subtitle">MERN Developer & ECE Engineer</p>
        </div>
        <div className="physics-instruction">Drag and throw the blocks!</div>
        <a href="#about" className="scroll-indicator" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }} style={{ zIndex: 10 }}>
          <div className="scroll-mouse"><div className="scroll-wheel"></div></div>
          <span>Scroll Down</span>
        </a>
      </section>

      {/* About Section */}
      <section className="about section" id="about">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">01. About Me</span>
            <h2 className="section-title">Who I Am</h2>
          </div>
          <div className="about-grid">
            <div className="about-image-col">
              <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.05} transitionSpeed={2000} className="about-card glass-card">
                <div className="about-avatar-wrap">
                  <div className="about-avatar">
                    <span className="avatar-initials-lg">SS</span>
                  </div>
                  <div className="about-glow"></div>
                </div>
                <div className="about-info-pills">
                  <div className="info-pill">
                    <Mail size={16} /> soujanya.s2023@sece.ac.in
                  </div>
                  <div className="info-pill">
                    <Monitor size={16} /> +91 8610531594
                  </div>
                  <div className="info-pill">
                    <Globe size={16} /> Coimbatore, Tamil Nadu
                  </div>
                </div>
              </Tilt>
            </div>
            <div className="about-text-col">
              <p className="about-lead">
                I'm a <strong>B.E. Electronics & Communication Engineering</strong> student at Sri Eshwar College of Engineering (Batch 2023–2027), with a passion for building things that live on the web and in embedded systems.
              </p>
              <p className="about-body">
                From designing responsive web interfaces to building smart wearable systems with Arduino and React, I enjoy working at the intersection of <em>hardware and software</em>. I've interned at PropelFoundry and Better Tomorrow, where I worked on production-grade web applications using the MERN stack.
              </p>
              <p className="about-body">
                Outside of engineering, I'm a competitive programmer — I've solved 400+ problems on LeetCode and 630+ on SkillRack. I love hackathons and have cleared rounds at Innohacks, Hacksagon, and won 3rd place at Freshathon.
              </p>
              <div className="education-timeline">
                <h3 className="sub-heading">Education</h3>
                <div className="edu-item">
                  <div className="edu-dot"></div>
                  <div className="edu-content">
                    <span className="edu-degree">B.E. (ECE)</span>
                    <span className="edu-school">Sri Eshwar College of Engineering</span>
                    <span className="edu-meta">2023–2027</span>
                  </div>
                </div>
                <div className="edu-item">
                  <div className="edu-dot"></div>
                  <div className="edu-content">
                    <span className="edu-degree">HSC (12th)</span>
                    <span className="edu-school">Srinivasa Vidhyala Matric Higher Secondary School</span>
                    <span className="edu-meta">2021–2023</span>
                  </div>
                </div>
                <div className="edu-item">
                  <div className="edu-dot"></div>
                  <div className="edu-content">
                    <span className="edu-degree">SSLC (10th)</span>
                    <span className="edu-school">Srinivasa Vidhyala Matric Higher Secondary School</span>
                    <span className="edu-meta">2020–2021</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills section" id="skills">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">02. Skills</span>
            <h2 className="section-title">My Tech Stack</h2>
          </div>
          <div className="skills-grid">
            <div className="skill-category glass-card reveal">
              <div className="skill-cat-icon"><Code size={24} /></div>
              <h3>Programming</h3>
              <div className="skill-chips">
                <span className="chip">Java</span><span className="chip">C (Basics)</span><span className="chip">React.js</span><span className="chip">Node.js</span>
              </div>
            </div>
            <div className="skill-category glass-card reveal">
              <div className="skill-cat-icon"><Monitor size={24} /></div>
              <h3>Web Development</h3>
              <div className="skill-chips">
                <span className="chip">MERN Stack</span><span className="chip">HTML</span><span className="chip">CSS</span><span className="chip">JavaScript</span>
              </div>
            </div>
            <div className="skill-category glass-card reveal">
              <div className="skill-cat-icon"><Globe size={24} /></div>
              <h3>Core</h3>
              <div className="skill-chips">
                <span className="chip">DSA</span><span className="chip">OOPs</span><span className="chip">Embedded Systems</span><span className="chip">IoT</span>
              </div>
            </div>
            <div className="skill-category glass-card reveal">
              <div className="skill-cat-icon"><Database size={24} /></div>
              <h3>Databases</h3>
              <div className="skill-chips">
                <span className="chip">MySQL</span><span className="chip">MongoDB</span><span className="chip">Firebase</span>
              </div>
            </div>
            <div className="skill-category glass-card reveal">
              <div className="skill-cat-icon"><Blocks size={24} /></div>
              <h3>Libraries</h3>
              <div className="skill-chips">
                <span className="chip">Pandas</span><span className="chip">NumPy</span><span className="chip">Matplotlib</span>
              </div>
            </div>
            <div className="skill-category glass-card reveal">
              <div className="skill-cat-icon"><Cpu size={24} /></div>
              <h3>Microcontrollers</h3>
              <div className="skill-chips">
                <span className="chip">ESP32</span><span className="chip">Arduino Uno</span><span className="chip">8051</span>
              </div>
            </div>
            <div className="skill-category glass-card reveal">
              <div className="skill-cat-icon"><Terminal size={24} /></div>
              <h3>Tools & IDE</h3>
              <div className="skill-chips">
                <span className="chip">VSCode</span><span className="chip">Eclipse</span><span className="chip">Arduino IDE</span><span className="chip">MATLAB</span><span className="chip">GitHub</span><span className="chip">Canva</span><span className="chip">Colab</span>
              </div>
            </div>
            <div className="skill-category glass-card reveal">
              <div className="skill-cat-icon"><Edit3 size={24} /></div>
              <h3>Simulation</h3>
              <div className="skill-chips">
                <span className="chip">Multisim</span><span className="chip">Octave</span><span className="chip">ModelSim</span><span className="chip">IntelliJ IDEA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects section" id="projects">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">03. Projects</span>
            <h2 className="section-title">What I've Built</h2>
          </div>
          <div className="projects-grid">
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2500} className="project-card featured glass-card reveal">
              <div className="project-badge">Featured</div>
              <div className="project-header">
                <div className="project-icon project-icon-1"><Shield size={28} /></div>
                <div className="project-links">
                  <a href="#" className="proj-link" aria-label="GitHub"><Github size={18} /></a>
                </div>
              </div>
              <h3 className="project-title">AuraVue</h3>
              <p className="project-subtitle">Wearable Smart Glasses System</p>
              <p className="project-desc">A wearable smart glasses system that monitors pulse rate from the neck, detects fainting or falls, and triggers emergency protocols. Captures real-time photos and GPS data with Firebase backend and a React dashboard for live monitoring.</p>
              <div className="project-tech">
                <span className="tech-tag">Arduino</span><span className="tech-tag">React.js</span><span className="tech-tag">Firebase</span><span className="tech-tag">GPS Module</span><span className="tech-tag">Pulse Sensor</span><span className="tech-tag">Embedded C</span>
              </div>
              <div className="project-year">2025</div>
            </Tilt>

            <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.03} transitionSpeed={2500} className="project-card glass-card reveal">
              <div className="project-header">
                <div className="project-icon project-icon-2"><Monitor size={28} /></div>
                <div className="project-links">
                  <a href="#" className="proj-link" aria-label="GitHub"><Github size={18} /></a>
                </div>
              </div>
              <h3 className="project-title">PropelFoundry Website</h3>
              <p className="project-subtitle">Business Consulting Platform</p>
              <p className="project-desc">A professional business website for a startup consulting firm, enhancing online visibility and user engagement. Features responsive UI, structured content, and mentorship & startup support services showcase.</p>
              <div className="project-tech">
                <span className="tech-tag">HTML</span><span className="tech-tag">CSS</span><span className="tech-tag">JavaScript</span><span className="tech-tag">React.js</span>
              </div>
              <div className="project-year">2025</div>
            </Tilt>

            <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.03} transitionSpeed={2500} className="project-card glass-card reveal">
              <div className="project-header">
                <div className="project-icon project-icon-3"><Database size={28} /></div>
                <div className="project-links">
                  <a href="#" className="proj-link" aria-label="GitHub"><Github size={18} /></a>
                </div>
              </div>
              <h3 className="project-title">Insurance Management System</h3>
              <p className="project-subtitle">Java CRUD Application</p>
              <p className="project-desc">An insurance management system focusing on CRUD operations to manage policyholder data efficiently. Designed and optimized functionalities for seamless policy creation and retrieval.</p>
              <div className="project-tech">
                <span className="tech-tag">Java</span><span className="tech-tag">OOP</span><span className="tech-tag">MySQL</span><span className="tech-tag">JDBC</span>
              </div>
              <div className="project-year">2024</div>
            </Tilt>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="experience section" id="experience">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">04. Experience</span>
            <h2 className="section-title">Internships</h2>
          </div>
          <div className="timeline">
            <div className="timeline-item reveal">
              <div className="timeline-dot"></div>
              <div className="timeline-content glass-card">
                <div className="timeline-header">
                  <div>
                    <h3 className="timeline-role">Web Development Intern</h3>
                    <span className="timeline-company">PropelFoundry</span>
                  </div>
                  <span className="timeline-year">2025</span>
                </div>
                <p className="timeline-desc">Developed and maintained the company's official website, improving overall online presence and user engagement. Worked on designing responsive and clean user interfaces to effectively showcase services like mentorship and startup support. Collaborated closely with the team to build a scalable and user-friendly platform.</p>
                <div className="timeline-tags">
                  <span className="chip sm">HTML</span><span className="chip sm">CSS</span><span className="chip sm">JavaScript</span><span className="chip sm">React.js</span>
                </div>
              </div>
            </div>
            <div className="timeline-item reveal">
              <div className="timeline-dot"></div>
              <div className="timeline-content glass-card">
                <div className="timeline-header">
                  <div>
                    <h3 className="timeline-role">MERN Stack Developer Intern</h3>
                    <span className="timeline-company">Better Tomorrow</span>
                  </div>
                  <span className="timeline-year">2025</span>
                </div>
                <p className="timeline-desc">Developed projects using the MERN stack (MongoDB, Express, React, Node.js). Designed and implemented APIs to connect frontend and backend seamlessly. Enhanced application performance, scalability, and maintainability.</p>
                <div className="timeline-tags">
                  <span className="chip sm">MongoDB</span><span className="chip sm">Express.js</span><span className="chip sm">React.js</span><span className="chip sm">Node.js</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="certifications section" id="certifications">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">05. Credentials</span>
            <h2 className="section-title">Certifications</h2>
          </div>
          <div className="cert-grid">
            <div className="cert-card glass-card reveal">
              <div className="cert-icon">🔌</div>
              <div className="cert-info">
                <h4>Debugging Techniques for Serial Communications (I2C/SPI/UART)</h4>
                <span className="cert-issuer">Microchip</span>
              </div>
              <span className="cert-year">2025</span>
            </div>
            <div className="cert-card glass-card reveal">
              <div className="cert-icon">⚛️</div>
              <div className="cert-info">
                <h4>Learning React</h4>
                <span className="cert-issuer">Infosys Springboard</span>
              </div>
              <span className="cert-year">2025</span>
            </div>
            <div className="cert-card glass-card reveal">
              <div className="cert-icon">☕</div>
              <div className="cert-info">
                <h4>Programming with Java</h4>
                <span className="cert-issuer">NPTEL</span>
              </div>
              <span className="cert-year">2025</span>
            </div>
            <div className="cert-card glass-card reveal">
              <div className="cert-icon">🗄️</div>
              <div className="cert-info">
                <h4>SQL – Basics (Standard)</h4>
                <span className="cert-issuer">SkillRack</span>
              </div>
              <span className="cert-year">2024</span>
            </div>
            <div className="cert-card glass-card reveal">
              <div className="cert-icon">🧩</div>
              <div className="cert-info">
                <h4>Problem Solving (Basics) | SQL (Basics)</h4>
                <span className="cert-issuer">HackerRank</span>
              </div>
              <span className="cert-year">2024</span>
            </div>
            <div className="cert-card glass-card reveal">
              <div className="cert-icon">☕</div>
              <div className="cert-info">
                <h4>Java Programming</h4>
                <span className="cert-issuer">GreatLearning</span>
              </div>
              <span className="cert-year">2024</span>
            </div>
            <div className="cert-card glass-card reveal">
              <div className="cert-icon">📊</div>
              <div className="cert-info">
                <h4>Mastering Data Structures and Algorithms using C and C++</h4>
                <span className="cert-issuer">Udemy</span>
              </div>
              <span className="cert-year">2024</span>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="achievements section" id="achievements">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">06. Achievements</span>
            <h2 className="section-title">Milestones</h2>
          </div>
          <div className="achievements-grid">
            <div className="achievement-card glass-card reveal">
              <div className="ach-icon">🏆</div>
              <div className="ach-body">
                <h4>Freshathon</h4>
                <p>Secured <strong>3rd place</strong> at the First-Year Student Project Expo</p>
              </div>
            </div>
            <div className="achievement-card glass-card reveal">
              <div className="ach-icon">⚡</div>
              <div className="ach-body">
                <h4>Innohacks</h4>
                <p>Cleared <strong>1st round</strong> in hackathon at PSG College of Technology</p>
              </div>
            </div>
            <div className="achievement-card glass-card reveal">
              <div className="ach-icon">🔥</div>
              <div className="ach-body">
                <h4>Hacksagon</h4>
                <p>Cleared <strong>1st round</strong> in hackathon at ABV-IITM-IEEE (Gwalior)</p>
              </div>
            </div>
            <div className="achievement-card glass-card reveal">
              <div className="ach-icon">💡</div>
              <div className="ach-body">
                <h4>LeetCode</h4>
                <p>Solved <strong>400+ problems</strong> · Max Rating: 1,603 · Contests: 34</p>
              </div>
            </div>
            <div className="achievement-card glass-card reveal">
              <div className="ach-icon">🍳</div>
              <div className="ach-body">
                <h4>CodeChef</h4>
                <p>Secured <strong>Highest Rating of 1037</strong></p>
              </div>
            </div>
            <div className="achievement-card glass-card reveal">
              <div className="ach-icon">⭐</div>
              <div className="ach-body">
                <h4>HackerRank</h4>
                <p>Achieved <strong>1 star in Java</strong> · 1 Badge</p>
              </div>
            </div>
            <div className="achievement-card glass-card reveal">
              <div className="ach-icon">🎯</div>
              <div className="ach-body">
                <h4>SkillRack</h4>
                <p>Solved <strong>630+ problems</strong> · Received 1 Certificate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact section" id="contact">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">07. Contact</span>
            <h2 className="section-title">Get in Touch</h2>
            <p className="section-sub">I'm currently open to internships, collaborations, and exciting opportunities. Let's build something amazing together!</p>
          </div>
          <div className="contact-grid">
            <div className="contact-info">
              <div className="contact-card glass-card">
                <div className="contact-item">
                  <div className="contact-item-icon"><Mail size={20} /></div>
                  <div>
                    <span className="contact-label">Email</span>
                    <a href="mailto:soujanya.s2023@sece.ac.in" className="contact-value">soujanya.s2023@sece.ac.in</a>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-item-icon"><Monitor size={20} /></div>
                  <div>
                    <span className="contact-label">Phone</span>
                    <a href="tel:+918610531594" className="contact-value">+91 8610531594</a>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-item-icon"><Globe size={20} /></div>
                  <div>
                    <span className="contact-label">Location</span>
                    <span className="contact-value">Coimbatore, Tamil Nadu</span>
                  </div>
                </div>
                <div className="contact-socials">
                  <a href="https://github.com/soujanya-7" target="_blank" rel="noreferrer" className="social-btn">
                    <Github size={20} /> GitHub
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-btn">
                    <Linkedin size={20} /> LinkedIn
                  </a>
                </div>
              </div>
            </div>
            <div className="contact-form-wrap">
              <form className="contact-form glass-card" onSubmit={handleContactSubmit}>
                <div className="form-group">
                  <label htmlFor="senderName">Your Name</label>
                  <input type="text" id="senderName" name="name" placeholder="John Doe" required />
                </div>
                <div className="form-group">
                  <label htmlFor="senderEmail">Your Email</label>
                  <input type="email" id="senderEmail" name="email" placeholder="john@example.com" required />
                </div>
                <div className="form-group">
                  <label htmlFor="messageSubject">Subject</label>
                  <input type="text" id="messageSubject" name="subject" placeholder="Internship Opportunity..." />
                </div>
                <div className="form-group">
                  <label htmlFor="messageBody">Message</label>
                  <textarea id="messageBody" name="message" rows="5" placeholder="Hello Soujanya, I'd love to..." required></textarea>
                </div>
                <button type="submit" className="btn-primary full-width">
                  <span>Send Message</span>
                  <ChevronRight size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-logo">
              <span className="logo-bracket">&lt;</span>
              <span className="logo-name">Soujanya S</span>
              <span className="logo-bracket">/&gt;</span>
            </div>
            <p className="footer-copy">Designed & Built with ❤️ by Soujanya S · 2026</p>
            <div className="footer-nav">
              <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>Home</a>
              <a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}>About</a>
              <a href="#projects" onClick={(e) => { e.preventDefault(); handleNavClick('projects'); }}>Projects</a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}>Contact</a>
            </div>
          </div>
        </div>
      </footer>

      <button className="back-to-top" id="backToTop" onClick={scrollToTop} aria-label="Back to top">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="18 15 12 9 6 15" /></svg>
      </button>
    </>
  );
}

export default App;

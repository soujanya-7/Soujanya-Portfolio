import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import CodeHero from './CodeHero';
import SpotlightHero from './SpotlightHero';
import soujanyaPhoto from './assets/soujanya.png';
import ShinyText from './components/animations/ShinyText';
import Magnet from './components/animations/Magnet';
import ParticlesBackground from './components/animations/ParticlesBackground';
import SplitText from './components/animations/SplitText';

import { 
  Mail, ChevronRight, Award,
  Code, Globe, Layout, Database, Blocks, Terminal, Edit3, Monitor, CheckCircle, Shield,
  ExternalLink, Activity, Check, Cpu, Layers, Lock, RefreshCw, Play, Sparkles, Heart, Clock, Server
} from 'lucide-react';

/* ── Interactive Projects Dataset ── */
const PROJECTS_DATA = [
  {
    title: "AuraVue",
    subtitle: "Health Monitoring Dashboard",
    desc: "A responsive MERN web dashboard that aggregates user physiological telemetry, monitors key health thresholds, and automatically coordinates SOS protocols when anomalies are triggered.",
    tech: ["Next.js", "React.js", "Firebase", "WebSockets"],
    status: "Active",
    statusColor: "#3b82f6",
    url: "https://auravue-c8b99.web.app/",
    github: "https://github.com/soujanya-7/auravue-frontend.git",
    demo: "https://auravue-c8b99.web.app/",
    highlights: [
      "Aggregates vital health metrics via responsive, multi-tier panels",
      "Executes real-time anomaly detection triggers for rapid alert routing",
      "Features seamless WebSockets streams coupled with cloud telemetry logs"
    ]
  },
  {
    title: "PropelFoundry",
    subtitle: "Business Consulting Hub",
    desc: "A highly-optimized digital corporate consulting landing page and portfolio interface engineered to showcase professional agency offerings and accelerate user onboarding.",
    tech: ["HTML5", "CSS3", "JavaScript", "React.js"],
    status: "Completed",
    statusColor: "#10b981",
    url: "https://propelfoundry.com",
    github: "https://github.com/soujanya-s",
    demo: "#",
    highlights: [
      "Custom responsive design utilizing curated, clean layout standards",
      "Smooth modern interaction triggers and transitions built in pure CSS/React",
      "High performance SEO scores and structured client contact endpoints"
    ]
  },
  {
    title: "PolicyPro",
    subtitle: "Insurance CRUD Database",
    desc: "A robust Java-based database administration console engineered to perform reliable create, read, update, and delete actions on insurance profiles, schemas, and policy listings.",
    tech: ["Java", "MySQL", "JDBC", "Console CLI"],
    status: "Completed",
    statusColor: "#8b5cf6",
    url: "https://policypro.db.local",
    github: "https://github.com/soujanya-s",
    demo: "#",
    highlights: [
      "Features a strict transactional CLI interface with complete validation checks",
      "Engineered clean database schemas with optimized query execution indexing",
      "Adheres strictly to traditional Object-Oriented Controller architectures"
    ]
  },
  {
    title: "EcoSense",
    subtitle: "Smart Environmental Monitor",
    desc: "An end-to-end data platform that processes environmental sensor telemetry and maps trends on a gorgeous, highly visual react dashboard utilizing custom gauges and trendcharts.",
    tech: ["React.js", "Node.js", "Chart.js", "WebSockets"],
    status: "Live",
    statusColor: "#06b6d4",
    url: "https://ecosense.live",
    github: "https://github.com/soujanya-s",
    demo: "#",
    highlights: [
      "Visualizes humidity, temperature, and AQI readings in interactive layouts",
      "Maintains low-latency streams via WebSockets server aggregation",
      "Combines modular React custom gauges with history timeline comparisons"
    ]
  },
  {
    title: "Genzolver",
    subtitle: "Hackathon Workspace Platform",
    desc: "A centralized hub engineered to host large scale hackathons, facilitating team matching, prompt submissions, interactive grading boards, and live results calculations.",
    tech: ["Next.js", "TailwindCSS", "Firebase", "Framer Motion"],
    status: "Beta",
    statusColor: "#f59e0b",
    url: "https://genzolver.org",
    github: "https://github.com/soujanya-s",
    demo: "#",
    highlights: [
      "Integrates instant team-matching rooms with real-time feedback flows",
      "Features custom judge submission scorecards with responsive rankings syncing",
      "Rich front-end detail elements incorporating animated layouts and components"
    ]
  }
];

/* ── Services Dataset ── */
const SERVICES_DATA = [
  {
    title: "Full-Stack Web Dev",
    subtitle: "End-to-End MERN Architectures",
    desc: "Building highly-scalable, production-ready MERN web applications with secure backend models and clean component logic.",
    icon: Globe,
    color: "var(--accent-1)",
    watermark: "MERN",
    capabilities: [
      "Real-time synchronization using WebSockets",
      "Secure JWT authentication & session management",
      "State management patterns via Redux & Context API",
      "Cloud uploads with Firebase & AWS storage"
    ],
    tech: ["MongoDB", "Express", "React", "Node.js", "WebSockets"]
  },
  {
    title: "Frontend Development",
    subtitle: "Pixel-Perfect UI/UX Engineering",
    desc: "Crafting responsive, high-performance interfaces with clean layouts, fluid animations, and strict accessibility standards.",
    icon: Layout,
    color: "var(--accent-2)",
    watermark: "FRONTEND",
    capabilities: [
      "Modern fluid layouts utilizing CSS grid & flexbox",
      "60fps interactions utilizing Framer Motion",
      "Semantic structure matching WCAG guidelines",
      "Cross-browser speed & performance optimization"
    ],
    tech: ["HTML5", "CSS3", "JavaScript", "React.js", "Framer Motion"]
  },
  {
    title: "Database & API Design",
    subtitle: "Secure & Efficient Data Pipelines",
    desc: "Designing optimized relational schemas and building secure RESTful API endpoints for low-latency CRUD operations.",
    icon: Database,
    color: "var(--accent-3)",
    watermark: "DATABASE",
    capabilities: [
      "Structured schema design and indexing optimization",
      "API security middleware and input validations",
      "Advanced transactional SQL & MongoDB queries",
      "External service connections & data sync pipelines"
    ],
    tech: ["MySQL", "MongoDB", "REST APIs", "JDBC", "GraphQL"]
  }
];

/* ── Technical Skills Dataset ── */
const SKILLS_DATA = [
  {
    category: "Languages & Core Fundamentals",
    subtitle: "DSA, OOPS & PROGRAMMING",
    icon: Cpu,
    color: "var(--accent-1)",
    items: [
      { name: "Java SE", level: "Expert", value: 90 },
      { name: "JavaScript (ES6+)", level: "Advanced", value: 85 },
      { name: "Data Structures & Algos", level: "Advanced", value: 85 },
      { name: "Object-Oriented Coding", level: "Advanced", value: 88 },
      { name: "C Programming", level: "Intermediate", value: 70 }
    ]
  },
  {
    category: "Frontend UI Engineering",
    subtitle: "PIXEL-PERFECT INTERACTION",
    icon: Layers,
    color: "var(--accent-2)",
    items: [
      { name: "React.js / Next.js", level: "Expert", value: 92 },
      { name: "Redux & Context API", level: "Advanced", value: 80 },
      { name: "TailwindCSS & CSS Grid", level: "Expert", value: 90 },
      { name: "Framer Motion / UX Anims", level: "Advanced", value: 85 },
      { name: "HTML5 / Semantic markup", level: "Expert", value: 95 }
    ]
  },
  {
    category: "Backend & Systems",
    subtitle: "APIS & DATABASE PIPELINES",
    icon: Server,
    color: "var(--accent-3)",
    items: [
      { name: "Node.js & Express", level: "Advanced", value: 85 },
      { name: "REST APIs & WebSockets", level: "Advanced", value: 88 },
      { name: "MySQL database design", level: "Advanced", value: 80 },
      { name: "MongoDB database CRUD", level: "Advanced", value: 85 },
      { name: "Firebase integrations", level: "Intermediate", value: 78 }
    ]
  },
  {
    category: "Tools, Platforms & Analytics",
    subtitle: "VERSION CONTROL & ANALYTICS",
    icon: Terminal,
    color: "#f59e0b",
    items: [
      { name: "Git & GitHub workflow", level: "Expert", value: 90 },
      { name: "Postman API testing", level: "Advanced", value: 82 },
      { name: "NumPy & Pandas analysis", level: "Intermediate", value: 75 },
      { name: "Matplotlib graphics", level: "Intermediate", value: 70 },
      { name: "VS Code environment", level: "Expert", value: 90 }
    ]
  }
];

/* ── Experience Dataset ── */
const EXPERIENCE_DATA = [
  {
    role: "MERN Stack Developer Intern",
    company: "Better Tomorrow",
    duration: "May 2025 - Completed",
    desc: "Engineered robust full-stack applications using the MERN stack (MongoDB, Express, React, Node.js). Designed secure RESTful APIs to bridge the frontend and backend architectures for seamless data flow.",
    tech: ["MongoDB", "Express", "React.js", "Node.js"],
    color: "var(--accent-2)",
    icon: "BT"
  },
  {
    role: "Web Development Intern",
    company: "PropelFoundry",
    duration: "Jan 2025 - Apr 2025",
    desc: "Spearheaded the development and maintenance of the official company website. Overhauled the UI/UX design to build highly responsive, clean, and engaging user interfaces that boosted online presence.",
    tech: ["HTML5", "CSS3", "React.js"],
    color: "var(--accent-1)",
    icon: "PF"
  }
];

/* ── Animated Counter Card ── */

function CounterCard({ val, suffix, label, color, delay }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1400;
        const steps = 50;
        const increment = val / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= val) { setCount(val); clearInterval(timer); }
          else setCount(Math.floor(current));
        }, duration / steps);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [val]);

  return (
    <motion.div
      ref={ref}
      className="av3-counter-card glass-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
    >
      <span className="av3-counter-num" style={{ color }}>{count}{suffix}</span>
      <span className="av3-counter-label">{label.split('\n').map((l, i) => <span key={i}>{l}<br/></span>)}</span>
      <div className="av3-counter-glow" style={{ background: color }} />
    </motion.div>
  );
}

function CounterVal({ val }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1200;
        const steps = 40;
        const increment = val / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= val) { setCount(val); clearInterval(timer); }
          else setCount(Math.floor(current));
        }, duration / steps);
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [val]);

  return <span ref={ref}>{count}</span>;
}

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

function CertificateCard({ cert, index, onPreview }) {
  const [imgValid, setImgValid] = useState(true);
  const IconComponent = cert.icon;
  return (
    <motion.div
      className="cert-gallery-card glass-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      style={{ '--card-brand-glow': cert.color }}
    >
      {/* Certificate Image Preview or Fallback */}
      <div className="cert-img-wrapper" onClick={() => onPreview(cert)}>
        {imgValid ? (
          <img 
            src={`/certificates/${cert.filename}`} 
            alt={`${cert.title} Certificate`} 
            className="cert-preview-img"
            onError={() => setImgValid(false)}
          />
        ) : (
          <div className="cert-fallback-placeholder" style={{ '--accent-glow': cert.color }}>
            <div className="fallback-ring ring-1" />
            <div className="fallback-ring ring-2" />
            <Award size={36} className="fallback-icon" style={{ color: cert.color }} />
            <span className="fallback-watermark font-mono">PREVIEW</span>
          </div>
        )}
        <div className="cert-img-overlay">
          <span className="overlay-text font-mono">VIEW PREVIEW</span>
        </div>
      </div>

      {/* Info block */}
      <div className="cert-card-info">
        <div className="cert-card-header-row">
          <div className="cert-card-icon-circle" style={{ background: `${cert.color}15`, border: `1px solid ${cert.color}30` }}>
            <IconComponent size={14} style={{ color: cert.color }} />
          </div>
          <span className="cert-year-badge font-mono">{cert.year}</span>
        </div>
        
        <h3 className="cert-card-title">{cert.title}</h3>
        <p className="cert-card-issuer font-mono" style={{ color: cert.color }}>{cert.issuer}</p>
      </div>

      <div className="cert-card-actions">
        <button className="cert-action-btn view font-mono" onClick={() => onPreview(cert)}>
          View Image
        </button>
        <span className="verified-pill font-mono">✔ Verified</span>
      </div>
    </motion.div>
  );
}

function CertGridCard({ cert, onView }) {
  const [imgOk, setImgOk] = useState(true);
  const IconComp = cert.icon;
  return (
    <Tilt
      tiltMaxAngleX={6}
      tiltMaxAngleY={6}
      perspective={1000}
      scale={1.02}
      transitionSpeed={1500}
      style={{ width: '100%', height: '100%' }}
    >
      <motion.div 
        className="cert-grid-card"
        style={{ '--card-brand-glow': cert.color }}
        whileHover={{ y: -6 }}
        onMouseMove={handleMouseMove}
        transition={{ duration: 0.3 }}
      >
        <div className="cert-grid-card-glow" />
        {imgOk ? (
          <div className="cert-grid-card-image-wrap" onClick={() => onView(cert)}>
            <img
              src={`/certificates/${cert.filename}`}
              alt={`${cert.title} Certificate`}
              className="cert-grid-card-img"
              onError={() => setImgOk(false)}
            />
            <div className="cert-grid-card-img-hover">
              <span className="font-mono">VIEW CREDENTIAL</span>
            </div>
          </div>
        ) : (
          <div className="cert-stack-fallback" style={{ '--cert-color': cert.color }}>
            {/* Tech Style Corner Lines */}
            <div className="cert-corner top-left"></div>
            <div className="cert-corner top-right"></div>
            <div className="cert-corner bottom-left"></div>
            <div className="cert-corner bottom-right"></div>
            
            {/* Grid pattern background */}
            <div className="cert-grid-pattern"></div>
            
            <div className="cert-card-header">
              <span className="cert-card-issuer font-mono">{cert.issuer.toUpperCase()}</span>
              <span className="cert-card-badge-icon" style={{ color: cert.color }}>
                <IconComp size={16} />
              </span>
            </div>
            
            <div className="cert-card-body">
              <div className="cert-card-subtitle font-mono" style={{ color: cert.color }}>VERIFIED CREDENTIAL</div>
              <h4 className="cert-card-title">{cert.title}</h4>
              <div className="cert-card-recipient">
                <span>Awarded to:</span> <strong>Soujanya S</strong>
              </div>
              {cert.skills && (
                <div className="cert-skills-list">
                  {cert.skills.map((skill, k) => (
                    <span key={k} className="cert-skill-tag font-mono" style={{ '--tag-glow': cert.color }}>
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            <div className="cert-card-footer">
              <div className="cert-card-meta">
                <div className="meta-label font-mono">DATE OF ISSUANCE</div>
                <div className="meta-val font-mono">{cert.year}</div>
              </div>
              
              <div className="cert-card-actions">
                <button 
                  className="cert-view-btn font-mono" 
                  onClick={(e) => { e.stopPropagation(); onView(cert); }}
                  style={{ borderColor: `${cert.color}40`, color: cert.color }}
                >
                  VIEW
                </button>
                <span className="verified-pill-lg font-mono">✔ Verified</span>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </Tilt>
  );
}

const handleMouseMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
  e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
};

function App() {
  const [loading, setLoading] = useState(true);
  const [loaderProgress, setLoaderProgress] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.pageYOffset / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [activeProject, setActiveProject] = useState(0);
  const [activeService, setActiveService] = useState(0);

  const prevProject = () => {
    setActiveProject((prev) => (prev === 0 ? PROJECTS_DATA.length - 1 : prev - 1));
  };
  const nextProject = () => {
    setActiveProject((prev) => (prev === PROJECTS_DATA.length - 1 ? 0 : prev + 1));
  };
  const [lightboxImage, setLightboxImage] = useState(null);
  const [formState, setFormState] = useState('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [emailCopied, setEmailCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // Live Coimbatore Time Clock (IST is UTC + 5:50 or 5:30)
  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      const formatter = new Intl.DateTimeFormat([], options);
      setCurrentTime(formatter.format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('soujanya.s2023@sece.ac.in').then(() => {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    });
  };

  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const typedTextRef = useRef(null);
  const canvasRef = useRef(null);

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

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let fx = mx;
    let fy = my;

    const handleMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = `${mx}px`;
        cursorRef.current.style.top = `${my}px`;
      }
    };

    let active = true;
    const updateFollower = () => {
      if (!active) return;
      fx += (mx - fx) * 0.12;
      fy += (my - fy) * 0.12;
      if (followerRef.current) {
        followerRef.current.style.left = `${fx}px`;
        followerRef.current.style.top = `${fy}px`;
      }
      requestAnimationFrame(updateFollower);
    };

    window.addEventListener('mousemove', handleMouseMove);
    requestAnimationFrame(updateFollower);

    return () => {
      active = false;
      window.removeEventListener('mousemove', handleMouseMove);
    };
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
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((el, i) => {
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
      'UI/UX Design',
      'MERN Projects',
      'API Development',
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

  // Canvas Particles
  useEffect(() => {
    if (loading || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];
    let animationId;
    let mouse = { x: null, y: null };

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    class Particle {
      constructor() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.r = Math.random() * 1.5 + 0.5;
        this.a = Math.random() * 0.5 + 0.1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0) this.x = W;
        if (this.x > W) this.x = 0;
        if (this.y < 0) this.y = H;
        if (this.y > H) this.y = 0;
      }
    }

    const init = () => {
      resize();
      particles = Array.from({ length: 120 }, () => new Particle());
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(124,58,237,${p.a})`;
        ctx.fill();
        p.update();
        
        if (mouse.x != null && mouse.y != null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(6,182,212,${0.2 * (1 - dist / 150)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
            // Subtle pull
            p.x += dx * 0.005;
            p.y += dy * 0.005;
          }
        }
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(124,58,237,${0.12 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animationId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    init();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
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
    const data = new FormData(e.currentTarget);
    setFormData({
      name: data.get('name') || '',
      email: data.get('email') || '',
      message: data.get('message') || ''
    });
    setFormState('sending');
    
    // Simulate terminal transmission delay
    setTimeout(() => {
      setFormState('success');
    }, 3500);
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
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />
      <canvas ref={canvasRef} className="global-particles-canvas" />

      {/* Section Progress Indicator */}
      <div className="section-progress">
        {['home', 'services', 'skills', 'projects', 'experience', 'achievements', 'contact'].map((item) => (
          <div 
            key={item}
            className={`progress-dot ${activeSection === item || (item === 'experience' && activeSection === 'certifications') ? 'active' : ''}`}
            onClick={() => handleNavClick(item)}
          >
            <span className="progress-label">{item}</span>
          </div>
        ))}
      </div>

      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="nav-logo" onClick={() => handleNavClick('home')}>
          <div className="text-logo">
            <span className="logo-brace">&lt;</span>
            <span className="logo-name">Soujanya</span>
            <span className="logo-brace">/&gt;</span>
          </div>
         </div>
        <div className={`nav-links ${navOpen ? 'open' : ''}`} id="navLinks">
          {['home', 'services', 'skills', 'projects', 'experience', 'contact'].map((item) => (
            <Magnet key={item} padding={12}>
              <a
                href={`#${item}`}
                className={`nav-link ${activeSection === item || (item === 'experience' && (activeSection === 'certifications' || activeSection === 'achievements')) ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick(item); }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            </Magnet>
          ))}
          <Magnet padding={12}>
            <a
              href="/Soujanya_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Soujanya_Resume.pdf"
              className="nav-link resume-nav-link"
              onClick={() => setNavOpen(false)}
            >
              Resume
            </a>
          </Magnet>
        </div>
        <div className="nav-actions">
          <Magnetic>
            <a href="/Soujanya_Resume.pdf" target="_blank" rel="noopener noreferrer" download="Soujanya_Resume.pdf" className="btn-resume">
              <ShinyText speed="3s">Resume</ShinyText>
            </a>
          </Magnetic>
          <Magnetic><a href="mailto:soujanya.s2023@sece.ac.in" className="btn-hire"><ShinyText speed="3s">Hire Me</ShinyText></a></Magnetic>
          <button className="nav-toggle" id="navToggle" onClick={() => setNavOpen(!navOpen)}>
            <span style={{ transform: navOpen ? 'rotate(45deg) translate(5px,5px)' : '' }}></span>
            <span style={{ opacity: navOpen ? '0' : '1' }}></span>
            <span style={{ transform: navOpen ? 'rotate(-45deg) translate(5px,-5px)' : '' }}></span>
          </button>
        </div>
      </nav>

      <SpotlightHero onNavigate={handleNavClick} />

      {/* Services Section */}
      <section className="services section" id="services">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">01. Specialties</span>
            <h2 className="section-title"><SplitText>Areas of Expertise</SplitText></h2>
          </div>
          
          <div className="services-deck">
            {SERVICES_DATA.map((service, idx) => {
              const IconComponent = service.icon;
              const isActive = activeService === idx;
              return (
                <motion.div
                  key={service.title}
                  layout
                  onClick={() => setActiveService(idx)}
                  className={`deck-card ${isActive ? 'active' : ''}`}
                  onMouseMove={handleMouseMove}
                  transition={{ type: "spring", stiffness: 220, damping: 22 }}
                  style={{
                    '--card-accent': service.color
                  }}
                >
                  <div className="deck-card-glow-mouse" />
                  {/* Card Background Glow */}
                  {isActive && (
                    <div className="deck-card-glow" />
                  )}

                  {/* Watermark Backtext */}
                  <div className="deck-watermark font-mono">{service.watermark}</div>

                  {/* Top Header Node */}
                  <div className="deck-card-top">
                    <span className="deck-num font-mono">0{idx + 1}</span>
                    <div className="deck-icon-wrapper">
                      <IconComponent size={24} className="deck-icon" />
                    </div>
                  </div>

                  <div className="deck-card-body">
                    <h3 className="deck-title">{service.title}</h3>
                    <p className="deck-subtitle font-mono">{service.subtitle}</p>
                    
                    {/* Expanded details */}
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          transition={{ duration: 0.2 }}
                          className="deck-expanded-content"
                        >
                          <p className="deck-desc">{service.desc}</p>
                          
                          <div className="deck-capabilities">
                            <span className="cap-label font-mono">
                              <Sparkles size={11} className="text-accent-1" style={{ marginRight: '6px' }} /> 
                              Core Specialties
                            </span>
                            <ul className="cap-list">
                              {service.capabilities.map((c, i) => (
                                <li key={i}>
                                  <Check size={11} className="cap-check-icon text-green" style={{ flexShrink: 0, marginTop: '3px' }} />
                                  <span>{c}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="deck-tech-tags">
                            {service.tech.map(t => (
                              <span key={t} className="tech-badge">{t}</span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>



      {/* Skills Section */}
      <section className="skills section" id="skills">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">02. Skills</span>
            <h2 className="section-title"><SplitText>Technical Mastery</SplitText></h2>
          </div>

          <div className="skills-grid">
            {SKILLS_DATA.map((cat, i) => {
              const IconComponent = cat.icon;
              return (
                <Tilt
                  key={cat.category}
                  tiltMaxAngleX={6}
                  tiltMaxAngleY={6}
                  perspective={1000}
                  scale={1.02}
                  transitionSpeed={1500}
                >
                  <motion.div
                    className="skills-category-card glass-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.12 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    onMouseMove={handleMouseMove}
                    style={{ '--card-accent': cat.color }}
                  >
                    <div className="skills-card-glow" />
                    <div className="skills-category-header">
                      <div className="skills-category-icon-wrap" style={{ color: cat.color }}>
                        <IconComponent size={20} />
                      </div>
                      <div>
                        <h3 className="skills-category-title">{cat.category}</h3>
                        <span className="skills-category-subtitle font-mono">{cat.subtitle}</span>
                      </div>
                    </div>

                    <div className="skills-list">
                      {cat.items.map((skill, idx) => (
                        <div key={skill.name} className="skill-progress-item">
                          <div className="skill-info">
                            <span className="skill-name">{skill.name}</span>
                            <span className="skill-level font-mono" style={{ color: cat.color }}>{skill.level}</span>
                          </div>
                          <div className="skill-track">
                            <motion.div 
                              className="skill-bar" 
                              style={{ background: `linear-gradient(90deg, var(--border), ${cat.color})` }}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.value}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.2, delay: 0.2 + idx * 0.08, ease: "easeOut" }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </Tilt>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects section" id="projects">
        <div className="container">
          <div className="projects-header-wrap">
            <button className="carousel-nav-btn prev" onClick={prevProject} aria-label="Previous Project">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            </button>
            
            <div className="section-header centered">
              <span className="section-tag">03. Projects</span>
              <h2 className="section-title"><SplitText>Featured Projects</SplitText></h2>
              <p className="section-sub-centered">
                A showcase of production-ready applications, secure database systems, and low-latency environmental monitors engineered with high-performance architectures.
              </p>
            </div>
            
            <button className="carousel-nav-btn next" onClick={nextProject} aria-label="Next Project">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
          </div>

          <div className="projects-carousel-wrapper">
            <div className="projects-carousel-track">
              {PROJECTS_DATA.map((project, idx) => {
                const isActive = activeProject === idx;
                
                return (
                  <motion.div
                    key={project.title}
                    onClick={() => setActiveProject(idx)}
                    className={`project-carousel-card ${isActive ? 'active' : ''}`}
                    layout
                    transition={{ type: "spring", stiffness: 180, damping: 24 }}
                  >
                    {/* Background Art Graphics per project */}
                    <div className="project-card-bg-art">
                      {idx === 0 && (
                        <div className="bg-art-graphic auravue-art">
                          <div className="mesh-grid" />
                          <svg viewBox="0 0 100 40" className="art-sparkline text-red" style={{ color: '#ef4444' }}>
                            <path 
                              d="M0,20 L20,20 L25,5 L30,35 L33,20 L60,20 L65,5 L70,35 L73,20 L100,20" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="1" 
                            />
                          </svg>
                          <div className="pulse-circle red" />
                        </div>
                      )}
                      {idx === 1 && (
                        <div className="bg-art-graphic propelfoundry-art">
                          <div className="mesh-grid" />
                          <div className="isometric-box-grid">
                            <div className="iso-line line-1" />
                            <div className="iso-line line-2" />
                            <div className="iso-line line-3" />
                          </div>
                        </div>
                      )}
                      {idx === 2 && (
                        <div className="bg-art-graphic policypro-art font-mono">
                          <div className="mesh-grid" />
                          <div className="terminal-lines-art">
                            <span>admin@db:~$ select *</span>
                            <span>[INFO] Connection ok</span>
                            <span>+----+------------+</span>
                            <span>| 01 | SOUJANYA S |</span>
                            <span>+----+------------+</span>
                          </div>
                        </div>
                      )}
                      {idx === 3 && (
                        <div className="bg-art-graphic ecosense-art">
                          <div className="mesh-grid" />
                          <div className="circular-dials">
                            <div className="dial-circle green" style={{ borderColor: '#10b981' }} />
                            <div className="dial-circle blue" style={{ borderColor: '#3b82f6' }} />
                          </div>
                          <svg viewBox="0 0 100 40" className="art-sparkline text-green" style={{ color: '#10b981' }}>
                            <path 
                              d="M0,30 Q20,10 40,22 T80,5 T100,15" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="1" 
                            />
                          </svg>
                        </div>
                      )}
                      {idx === 4 && (
                        <div className="bg-art-graphic genzolver-art">
                          <div className="mesh-grid" />
                          <div className="network-nodes">
                            <span className="node node-1" />
                            <span className="node node-2" />
                            <span className="node node-3" />
                            <span className="node-line l1" />
                            <span className="node-line l2" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Dark gradient overlay for readability */}
                    <div className="project-card-overlay" />

                    {/* Content Top */}
                    <div className="project-card-top-info">
                      <span className="project-card-num font-mono">0{idx + 1}</span>
                      <span className="project-card-status font-mono" style={{ color: project.statusColor, borderColor: `${project.statusColor}30`, backgroundColor: `${project.statusColor}08` }}>
                        {project.status}
                      </span>
                    </div>

                    {/* Content Bottom / Center */}
                    <div className="project-card-content">
                      <h3 className="project-card-title">{project.title}</h3>
                      <p className="project-card-subtitle font-mono">{project.subtitle}</p>
                      
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.15 }}
                          className="project-card-expanded-body"
                        >
                          <p className="project-card-desc">{project.desc}</p>
                          
                          <div className="project-card-tech font-mono">
                            {project.tech.map(t => (
                              <span key={t} className="tech-badge">{t}</span>
                            ))}
                          </div>

                          <div className="project-card-actions">
                            <a href={project.github} className="project-action-link secondary" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                              <Github size={14} />
                              <span>Code</span>
                            </a>
                            <a href={project.demo} className="project-action-link primary" onClick={(e) => e.stopPropagation()}>
                              <ExternalLink size={14} />
                              <span>Live Demo</span>
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Diagonal indicator arrow bottom-right (just like screenshot) */}
                    {!isActive && (
                      <div className="project-card-enter-arrow">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="7" y1="17" x2="17" y2="7"></line>
                          <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="experience section" id="experience">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">04. Internships</span>
            <h2 className="section-title"><SplitText>Professional Experience</SplitText></h2>
          </div>

          <div className="exp-dual-grid">
            {EXPERIENCE_DATA.map((exp, i) => (
              <Tilt
                key={i}
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                perspective={1000}
                scale={1.02}
                transitionSpeed={1500}
              >
                <motion.div 
                  className="exp-dual-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  onMouseMove={handleMouseMove}
                  style={{ '--exp-color': exp.color }}
                >
                  <div className="exp-dual-bg-glow" />
                  <div className="exp-dual-content">
                    <div className="exp-dual-top">
                      <div className="exp-dual-logo font-mono">{exp.icon}</div>
                      <div className="exp-dual-status">
                        <CheckCircle size={16} /> Completed
                      </div>
                    </div>
                    
                    <div className="exp-dual-main">
                      <h3 className="exp-dual-role">{exp.role}</h3>
                      <div className="exp-dual-company font-mono">@ {exp.company}</div>
                      <div className="exp-dual-duration">{exp.duration}</div>
                    </div>

                    <p className="exp-dual-desc">{exp.desc}</p>

                    <div className="exp-dual-tech">
                      {exp.tech.map((t, j) => (
                        <span key={j} className="dual-tech-badge font-mono">{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="certifications section" id="certifications">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">05. Credentials</span>
            <h2 className="section-title"><SplitText>Credentials & Certifications</SplitText></h2>
          </div>

          {(() => {
            const CERTS = [
              { icon: Cpu,         title: 'Learning React',                                        issuer: 'Infosys Springboard', year: '2025', color: '#61dafb', filename: 'cert_react.png', skills: ['React.js', 'Hooks', 'State Management', 'Components'] },
              { icon: Code,        title: 'Programming with Java',                                  issuer: 'NPTEL',               year: '2025', color: '#f89820', filename: 'cert_java_nptel.png', skills: ['OOPs', 'Java SE', 'Multithreading', 'Data Structures'] },
              { icon: Award,       title: 'Problem Solving (Basics) | SQL (Basics)',               issuer: 'HackerRank',          year: '2024', color: '#2ec866', filename: 'cert_hackerrank.png', skills: ['Problem Solving', 'SQL Queries', 'Relational Databases', 'Algorithms'] },
              { icon: Terminal,    title: 'Java Programming',                                       issuer: 'GreatLearning',       year: '2024', color: '#f89820', filename: 'cert_greatlearning.png', skills: ['Java Basics', 'Variables', 'Control Flow', 'Methods'] },
              { icon: Database,    title: 'SQL – Basics (Standard)',                              issuer: 'SkillRack',           year: '2024', color: '#6366f1', filename: 'cert_skillrack.png', skills: ['Database Joins', 'Grouping', 'SQL Schema', 'Indexing'] },
              { icon: Layers,      title: 'Mastering Data Structures & Algorithms using C and C++', issuer: 'Udemy',              year: '2024', color: '#a435f0', filename: 'cert_udemy_dsa.png', skills: ['Data Structures', 'C/C++', 'Time Complexity', 'Recursion'] },
            ];
            return (
              <>
                <div className="cert-grid-layout">
                  {CERTS.map((cert, i) => (
                    <CertGridCard key={i} cert={cert} onView={setLightboxImage} />
                  ))}
                </div>

                {/* Lightbox Modal overlay */}
                <AnimatePresence>
                  {lightboxImage && (
                    <motion.div
                      className="lightbox-overlay"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setLightboxImage(null)}
                    >
                      <motion.div
                        className="lightbox-content"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button className="lightbox-close font-mono" onClick={() => setLightboxImage(null)}>
                          ✕
                        </button>
                        <img
                          src={`/certificates/${lightboxImage.filename}`}
                          alt={`${lightboxImage.title} Certificate Full Preview`}
                          className="lightbox-img"
                          onError={(e) => {
                            e.target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='100%' height='100%' fill='%230b0f19'/><text x='50%' y='50%' font-family='monospace' font-size='24' fill='%23ef4444' text-anchor='middle'>Certificate Image Not Found</text><text x='50%' y='56%' font-family='monospace' font-size='14' fill='%236b7280' text-anchor='middle'>Place the file in /public/certificates/" + lightboxImage.filename + "</text></svg>";
                          }}
                        />
                        <div className="lightbox-caption">
                          <h3 className="lightbox-title">{lightboxImage.title}</h3>
                          <p className="lightbox-subtitle font-mono" style={{ color: lightboxImage.color }}>{lightboxImage.issuer} ({lightboxImage.year})</p>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            );
          })()}
        </div>
      </section>

      {/* Achievements Section */}
      <section className="achievements section" id="achievements">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">06. Achievements</span>
            <h2 className="section-title"><SplitText>Honors & Achievements</SplitText></h2>
          </div>

          <div className="achievements-bento-grid">
            {/* 1. Freshathon (Tall: Col 1, Spans 2 Rows) */}
            <motion.div
              className="bento-card-wrapper tall"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Tilt
                className="bento-card tall gold-theme"
                tiltMaxAngleX={6}
                tiltMaxAngleY={6}
                perspective={1000}
                scale={1.02}
                transitionSpeed={1500}
                style={{ width: '100%', height: '100%' }}
              >
                <div 
                  className="bento-card-inner"
                  onMouseMove={handleMouseMove}
                  style={{ '--card-accent': '#f59e0b', width: '100%', height: '100%' }}
                >
                  <div className="bento-card-glow" />
                  <div className="bento-trophy-content">
                    <div className="bento-trophy-orb">
                      <Award size={40} className="glow-icon" style={{ color: '#f59e0b' }} />
                    </div>
                    <div>
                      <span className="bento-tag font-mono" style={{ color: '#f59e0b' }}>3RD PLACE</span>
                      <h3 className="bento-title">Freshathon</h3>
                      <p className="bento-desc">First-Year Student Project Expo</p>
                    </div>
                    <div className="bento-seal font-mono">
                      VERIFIED PROJECT EXPO · 2023
                    </div>
                  </div>
                </div>
              </Tilt>
            </motion.div>

            {/* 2. Innohacks (Col 2, Row 1) */}
            <motion.div
              className="bento-card-wrapper"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Tilt
                className="bento-card cyan-theme"
                tiltMaxAngleX={6}
                tiltMaxAngleY={6}
                perspective={1000}
                scale={1.02}
                transitionSpeed={1500}
                style={{ width: '100%', height: '100%' }}
              >
                <div 
                  className="bento-card-inner"
                  onMouseMove={handleMouseMove}
                  style={{ '--card-accent': '#06b6d4', width: '100%', height: '100%' }}
                >
                  <div className="bento-card-glow" />
                  <div className="bento-standard-content">
                    <div className="bento-card-header">
                      <span className="bento-platform-tag font-mono">HACKATHON</span>
                      <Cpu size={18} style={{ color: '#06b6d4' }} />
                    </div>
                    <div className="bento-stat-block">
                      <div className="bento-stat-value" style={{ color: '#06b6d4' }}>R1 Cleared</div>
                      <div className="bento-stat-label">Innohacks</div>
                    </div>
                    <p className="bento-card-desc">PSG College of Technology</p>
                  </div>
                </div>
              </Tilt>
            </motion.div>

            {/* 3. Hacksagon (Col 3, Row 1) */}
            <motion.div
              className="bento-card-wrapper"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Tilt
                className="bento-card orange-theme"
                tiltMaxAngleX={6}
                tiltMaxAngleY={6}
                perspective={1000}
                scale={1.02}
                transitionSpeed={1500}
                style={{ width: '100%', height: '100%' }}
              >
                <div 
                  className="bento-card-inner"
                  onMouseMove={handleMouseMove}
                  style={{ '--card-accent': '#f97316', width: '100%', height: '100%' }}
                >
                  <div className="bento-card-glow" />
                  <div className="bento-standard-content">
                    <div className="bento-card-header">
                      <span className="bento-platform-tag font-mono">HACKATHON</span>
                      <Sparkles size={18} style={{ color: '#f97316' }} />
                    </div>
                    <div className="bento-stat-block">
                      <div className="bento-stat-value" style={{ color: '#f97316' }}>R1 Cleared</div>
                      <div className="bento-stat-label">Hacksagon</div>
                    </div>
                    <p className="bento-card-desc">ABV-IITM-IEEE (Gwalior)</p>
                  </div>
                </div>
              </Tilt>
            </motion.div>

            {/* 4. LeetCode (Wide: Col 2 & 3, Row 2) */}
            <motion.div
              className="bento-card-wrapper wide"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <Tilt
                className="bento-card wide leetcode-theme"
                tiltMaxAngleX={6}
                tiltMaxAngleY={6}
                perspective={1000}
                scale={1.02}
                transitionSpeed={1500}
                style={{ width: '100%', height: '100%' }}
              >
                <div 
                  className="bento-card-inner"
                  onMouseMove={handleMouseMove}
                  style={{ '--card-accent': '#f89820', width: '100%', height: '100%' }}
                >
                  <div className="bento-card-glow" />
                  <div className="bento-leetcode-content">
                    <div className="leetcode-text-side">
                      <div className="bento-card-header">
                        <span className="bento-platform-tag font-mono">CODING PLATFORM</span>
                        <Code size={18} style={{ color: '#f89820' }} />
                      </div>
                      <div className="bento-stat-block">
                        <div className="bento-stat-value" style={{ color: '#f89820' }}>LeetCode</div>
                        <div className="bento-stat-label">400+ Problems Solved</div>
                      </div>
                    </div>
                    
                    <div className="leetcode-graphics-side">
                      <div className="leetcode-chart-circle">
                        <svg width="80" height="80" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="40" stroke="rgba(248, 152, 32, 0.06)" strokeWidth="8" fill="transparent" />
                          <circle cx="50" cy="50" r="40" stroke="#f89820" strokeWidth="8" fill="transparent"
                                  strokeDasharray="251.2" strokeDashoffset="75" strokeLinecap="round" />
                          <text x="50" y="55" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="800" fontFamily="monospace">400+</text>
                        </svg>
                      </div>
                      <div className="leetcode-metrics">
                        <div className="metric">
                          <span className="m-label font-mono">MAX RATING</span>
                          <span className="m-val font-mono">1,603</span>
                        </div>
                        <div className="metric">
                          <span className="m-label font-mono">CONTESTS</span>
                          <span className="m-val font-mono">34</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tilt>
            </motion.div>

            {/* 5. SkillRack (Col 1, Row 3) */}
            <motion.div
              className="bento-card-wrapper"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Tilt
                className="bento-card indigo-theme"
                tiltMaxAngleX={6}
                tiltMaxAngleY={6}
                perspective={1000}
                scale={1.02}
                transitionSpeed={1500}
                style={{ width: '100%', height: '100%' }}
              >
                <div 
                  className="bento-card-inner"
                  onMouseMove={handleMouseMove}
                  style={{ '--card-accent': '#6366f1', width: '100%', height: '100%' }}
                >
                  <div className="bento-card-glow" />
                  <div className="bento-standard-content">
                    <div className="bento-card-header">
                      <span className="bento-platform-tag font-mono">CODING PLATFORM</span>
                      <CheckCircle size={18} style={{ color: '#6366f1' }} />
                    </div>
                    <div className="bento-stat-block">
                      <div className="bento-stat-value" style={{ color: '#6366f1' }}>630+</div>
                      <div className="bento-stat-label">SkillRack Solved</div>
                    </div>
                    <div className="bento-footer-tag font-mono" style={{ color: '#6366f1' }}>1 CERTIFICATE EARNED</div>
                  </div>
                </div>
              </Tilt>
            </motion.div>

            {/* 6. HackerRank (Col 2, Row 3) */}
            <motion.div
              className="bento-card-wrapper"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <Tilt
                className="bento-card green-theme"
                tiltMaxAngleX={6}
                tiltMaxAngleY={6}
                perspective={1000}
                scale={1.02}
                transitionSpeed={1500}
                style={{ width: '100%', height: '100%' }}
              >
                <div 
                  className="bento-card-inner"
                  onMouseMove={handleMouseMove}
                  style={{ '--card-accent': '#10b981', width: '100%', height: '100%' }}
                >
                  <div className="bento-card-glow" />
                  <div className="bento-standard-content">
                    <div className="bento-card-header">
                      <span className="bento-platform-tag font-mono">CODING PLATFORM</span>
                      <Award size={18} style={{ color: '#10b981' }} />
                    </div>
                    <div className="bento-stat-block">
                      <div className="bento-stat-value" style={{ color: '#10b981' }}>1 Star</div>
                      <div className="bento-stat-label">HackerRank Java</div>
                    </div>
                    <div className="bento-footer-tag font-mono" style={{ color: '#10b981' }}>1 BADGE EARNED</div>
                  </div>
                </div>
              </Tilt>
            </motion.div>

            {/* 7. CodeChef (Col 3, Row 3) */}
            <motion.div
              className="bento-card-wrapper"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Tilt
                className="bento-card brown-theme"
                tiltMaxAngleX={6}
                tiltMaxAngleY={6}
                perspective={1000}
                scale={1.02}
                transitionSpeed={1500}
                style={{ width: '100%', height: '100%' }}
              >
                <div 
                  className="bento-card-inner"
                  onMouseMove={handleMouseMove}
                  style={{ '--card-accent': '#d97706', width: '100%', height: '100%' }}
                >
                  <div className="bento-card-glow" />
                  <div className="bento-standard-content">
                    <div className="bento-card-header">
                      <span className="bento-platform-tag font-mono">COMPETITIVE</span>
                      <Terminal size={18} style={{ color: '#d97706' }} />
                    </div>
                    <div className="bento-stat-block">
                      <div className="bento-stat-value" style={{ color: '#d97706' }}>1037</div>
                      <div className="bento-stat-label">CodeChef Rating</div>
                    </div>
                    <div className="bento-footer-tag font-mono" style={{ color: '#d97706' }}>COMPETITIVE CODING</div>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact section" id="contact">
        <ParticlesBackground count={30} speed={0.3} color="rgba(124, 58, 237, 0.4)" />
        <div className="container" style={{ position: 'relative' }}>
          <div className="contact-orb orb-2" />

          <div className="section-header">
            <span className="section-tag">07. Contact</span>
            <h2 className="section-title"><SplitText>Let's Work Together</SplitText></h2>
            <p className="section-sub">Have a project in mind or want to collaborate? I'd love to hear from you.</p>
          </div>

          {/* Contact Info Chips */}
          <motion.div className="contact-chips-row" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="contact-chip-card">
              <div className="cchip-icon" style={{ background: 'rgba(124,58,237,0.15)' }}>
                <Mail size={18} style={{ color: '#8b5cf6' }} />
              </div>
              <div className="cchip-text">
                <span className="cchip-label font-mono">EMAIL</span>
                <span className="cchip-val">soujanya.s2023@sece.ac.in</span>
              </div>
              <button className={`cchip-copy font-mono ${emailCopied ? 'copied' : ''}`} onClick={handleCopyEmail}>
                {emailCopied ? <><Check size={14} /> Copied</> : 'Copy'}
              </button>
            </div>
            <div className="contact-chip-card">
              <div className="cchip-icon" style={{ background: 'rgba(6,182,212,0.15)' }}>
                <Globe size={18} style={{ color: '#06b6d4' }} />
              </div>
              <div className="cchip-text">
                <span className="cchip-label font-mono">LOCATION</span>
                <span className="cchip-val">Coimbatore, India</span>
              </div>
            </div>
            <div className="contact-chip-card">
              <div className="cchip-icon" style={{ background: 'rgba(16,185,129,0.15)' }}>
                <Clock size={18} style={{ color: '#10b981' }} />
              </div>
              <div className="cchip-text">
                <span className="cchip-label font-mono">LOCAL TIME</span>
                <span className="cchip-val">{currentTime || '...'} IST</span>
              </div>
            </div>
          </motion.div>

          {/* Centered Form Card */}
          <motion.div className="contact-form-hero" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            {formState === 'idle' && (
              <form className="hero-form" onSubmit={handleContactSubmit}>
                <div className="hero-form-row">
                  <div className="hero-input-group">
                    <label htmlFor="heroName" className="hero-label font-mono">Your Name</label>
                    <input type="text" id="heroName" name="name" required placeholder="What should I call you?" autoComplete="off" className="hero-input" />
                  </div>
                  <div className="hero-input-group">
                    <label htmlFor="heroEmail" className="hero-label font-mono">Your Email</label>
                    <input type="email" id="heroEmail" name="email" required placeholder="Where can I reply?" autoComplete="off" className="hero-input" />
                  </div>
                </div>
                <div className="hero-input-group">
                  <label htmlFor="heroMessage" className="hero-label font-mono">Message</label>
                  <textarea id="heroMessage" name="message" rows="5" required placeholder="Tell me about your project, idea, or just say hi..." className="hero-input hero-textarea"></textarea>
                </div>
                <button type="submit" className="hero-submit-btn">
                  <span><ShinyText speed="2.5s">Send Message</ShinyText></span>
                  <ChevronRight size={18} />
                </button>
              </form>
            )}
            {formState === 'sending' && (
              <div className="hero-sending">
                <div className="hero-spinner" />
                <h3 className="hero-sending-title">Sending your message...</h3>
                <p className="hero-sending-sub font-mono">Establishing secure connection</p>
                <div className="hero-progress"><div className="hero-progress-fill" /></div>
              </div>
            )}
            {formState === 'success' && (
              <div className="hero-success">
                <div className="hero-success-icon"><CheckCircle size={56} style={{ color: '#10b981' }} /></div>
                <h3 className="hero-success-title">Message Sent Successfully!</h3>
                <p className="hero-success-sub">Thank you for reaching out. I'll get back to you soon.</p>
                <div className="hero-success-details">
                  <div className="hsd-item"><span className="hsd-label font-mono">From:</span><span>{formData.name}</span></div>
                  <div className="hsd-item"><span className="hsd-label font-mono">At:</span><span>{currentTime} IST</span></div>
                </div>
                <button className="hero-reset-btn font-mono" onClick={() => setFormState('idle')}>Send Another Message</button>
              </div>
            )}
          </motion.div>

          {/* Social Row */}
          <motion.div className="contact-social-row" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
            <Magnet padding={20}>
              <a href="https://github.com/soujanya-7" target="_blank" rel="noreferrer" className="csocial-link">
                <Github size={20} />
                <span>GitHub</span>
              </a>
            </Magnet>
            <Magnet padding={20}>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="csocial-link">
                <Linkedin size={20} />
                <span>LinkedIn</span>
              </a>
            </Magnet>
            <Magnet padding={20}>
              <a href="mailto:soujanya.s2023@sece.ac.in" className="csocial-link">
                <Mail size={20} />
                <span>Email</span>
              </a>
            </Magnet>
          </motion.div>
        </div>
      </section>
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-logo">
              <div className="text-logo sm">
                <span className="logo-brace">&lt;</span>
                <span className="logo-name">Soujanya</span>
                <span className="logo-brace">/&gt;</span>
              </div>
            </div>
            <p className="footer-copy">Designed & Built with ❤️ by Soujanya S · 2026</p>
            <div className="footer-nav">
              <Magnet padding={8}><a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>Home</a></Magnet>
              <Magnet padding={8}><a href="#projects" onClick={(e) => { e.preventDefault(); handleNavClick('projects'); }}>Projects</a></Magnet>
              <Magnet padding={8}><a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}>Contact</a></Magnet>
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

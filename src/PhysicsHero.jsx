import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const SKILLS = [
  { text: 'React', width: 110, color: '#06b6d4' },
  { text: 'IoT', width: 90, color: '#f59e0b' },
  { text: 'Java', width: 100, color: '#ec4899' },
  { text: 'MERN Stack', width: 160, color: '#7c3aed' },
  { text: 'Arduino', width: 130, color: '#10b981' },
  { text: 'ESP32', width: 110, color: '#f43f5e' },
  { text: 'Node.js', width: 130, color: '#8b5cf6' },
  { text: 'MongoDB', width: 140, color: '#14b8a6' },
  { text: 'C++', width: 90, color: '#3b82f6' },
  { text: 'Firebase', width: 140, color: '#f59e0b' }
];

export default function PhysicsHero({ onNavigate }) {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);
  const renderRef = useRef(null);
  const domRefs = useRef([]);

  useEffect(() => {
    if (!sceneRef.current) return;

    const Engine = Matter.Engine,
          Render = Matter.Render,
          Runner = Matter.Runner,
          MouseConstraint = Matter.MouseConstraint,
          Mouse = Matter.Mouse,
          World = Matter.World,
          Bodies = Matter.Bodies,
          Events = Matter.Events;

    const engine = Engine.create();
    engineRef.current = engine;
    const world = engine.world;

    const width = sceneRef.current.clientWidth;
    const height = sceneRef.current.clientHeight;

    // Create a transparent renderer
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width,
        height,
        background: 'transparent',
        wireframes: false,
      }
    });
    
    // Hide all canvas elements rendered by Matter.js visually
    render.canvas.style.opacity = '0'; 
    // Wait, if it's opacity 0, it still catches events. Perfect.
    
    renderRef.current = render;

    // Boundaries
    const ground = Bodies.rectangle(width / 2, height + 30, width * 2, 60, { isStatic: true });
    const leftWall = Bodies.rectangle(-30, height / 2, 60, height * 2, { isStatic: true });
    const rightWall = Bodies.rectangle(width + 30, height / 2, 60, height * 2, { isStatic: true });
    const ceiling = Bodies.rectangle(width / 2, -1000, width * 2, 60, { isStatic: true }); 
    
    World.add(world, [ground, leftWall, rightWall, ceiling]);

    // Create pill bodies
    const bodies = SKILLS.map((skill, i) => {
      // Drop them randomly across the top
      const x = Math.random() * (width - 200) + 100;
      const y = -200 - (i * 100);
      const body = Bodies.rectangle(x, y, skill.width, 50, {
        chamfer: { radius: 25 },
        restitution: 0.8, // Bouncy!
        friction: 0.1,
        frictionAir: 0.01,
      });
      return body;
    });

    World.add(world, bodies);

    // Mouse constraint for dragging
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });
    World.add(world, mouseConstraint);
    render.mouse = mouse;

    // Sync DOM elements
    Events.on(engine, 'afterUpdate', () => {
      bodies.forEach((body, i) => {
        if (domRefs.current[i]) {
          const { x, y } = body.position;
          const angle = body.angle;
          domRefs.current[i].style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle}rad)`;
        }
      });
    });

    Runner.run(Runner.create(), engine);
    Render.run(render);

    const handleResize = () => {
      if (!sceneRef.current) return;
      const newWidth = sceneRef.current.clientWidth;
      const newHeight = sceneRef.current.clientHeight;
      render.canvas.width = newWidth;
      render.canvas.height = newHeight;
      Matter.Body.setPosition(ground, { x: newWidth / 2, y: newHeight + 30 });
      Matter.Body.setPosition(rightWall, { x: newWidth + 30, y: newHeight / 2 });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      Render.stop(render);
      World.clear(world);
      Engine.clear(engine);
      if (render.canvas) render.canvas.remove();
    };
  }, []);

  return (
    <section className="physics-hero" id="home">
      <div className="physics-hero-content">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="ph-subtitle">Hi, I'm Soujanya</p>
          <h1 className="ph-title">
            <span className="shimmer-text">HARDWARE</span><br />
            &amp; SOFTWARE
          </h1>
          <p className="ph-desc">
            Bridging the gap between embedded systems and the web. 
            I build smart IoT devices and scalable MERN applications.
          </p>
          <div className="ph-cta">
            <button className="btn-primary" onClick={() => onNavigate('projects')}>
              <span>View My Work</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>

      <div className="physics-hero-canvas" ref={sceneRef}>
        {SKILLS.map((skill, i) => (
          <div
            key={i}
            ref={(el) => (domRefs.current[i] = el)}
            className="physics-skill-tag"
            style={{
              width: skill.width,
              height: 50,
              boxShadow: `0 4px 20px ${skill.color}44`,
              borderColor: `${skill.color}88`,
              color: skill.color
            }}
          >
            {skill.text}
          </div>
        ))}
        <div className="physics-hint">Drag & Throw the skills around!</div>
      </div>
    </section>
  );
}

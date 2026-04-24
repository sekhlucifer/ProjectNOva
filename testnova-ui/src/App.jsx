import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css';

/* ===== ANIMATION VARIANTS (enterprise stagger system) ===== */
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0, delayChildren: 0 }
  }
};

const fadeSlideUp = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.1, ease: "easeOut" } }
};

const fadeSlideRight = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.25, ease: 'easeOut' } }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: [0.34, 1.56, 0.64, 1] } }
};

/* ===== ANIMATED BACKGROUND (State of the Art Dribbble Motion) ===== */
/* ===== ANIMATED BACKGROUND (Interactive 3D Space Theme) ===== */
const AnimatedBackground = () => {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);

    const stars = Array.from({ length: 800 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * canvas.width,
    }));

    const executeFrame = () => {
      ctx.fillStyle = "rgba(5, 6, 15, 0.4)"; // Trails effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach(star => {
        star.z -= 0.6; // Speed of space travel
        if (star.z <= 0) {
          star.z = canvas.width;
          star.x = Math.random() * canvas.width;
          star.y = Math.random() * canvas.height;
        }

        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const px = (star.x - cx) * (canvas.width / star.z) + cx;
        const py = (star.y - cy) * (canvas.width / star.z) + cy;
        const size = Math.max(0, (1 - star.z / canvas.width) * 2.5);

        if(px > 0 && px < canvas.width && py > 0 && py < canvas.height) {
            ctx.beginPath();
            const brightness = Math.max(0.1, 1 - star.z / canvas.width);
            ctx.fillStyle = `rgba(168, 85, 247, ${brightness})`; 
            if (Math.random() > 0.5) ctx.fillStyle = `rgba(81, 226, 245, ${brightness})`; // Blue and purple stars
            else if (Math.random() > 0.8) ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`; // White stars
            
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(executeFrame);
    };

    executeFrame();

    return () => {
      window.removeEventListener('resize', setSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, background: '#05060f' }} />;
};

/* ===== FIXED HEADER ===== */
const Header = () => {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000, padding: '1.2rem clamp(2rem, 4vw, 4rem)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: scrolled ? 'rgba(5, 6, 15, 0.9)' : 'transparent', backdropFilter: scrolled ? 'blur(10px)' : 'none', borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none', transition: 'all 0.3s ease' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <motion.div animate={{ y: [-4, 4] }} transition={{ repeat: Infinity, duration: 2, repeatType: "reverse", ease: "easeInOut" }}>
          <LogoSVG className="animated-logo" size={36} />
        </motion.div>
        <div style={{ fontSize: '1.6rem', margin: 0, lineHeight: '36px', display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
          <span style={{ color: '#ffffff' }}>Test</span>
          <motion.span 
            animate={{ filter: ['hue-rotate(0deg)', 'hue-rotate(360deg)'] }} 
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            style={{ background: 'linear-gradient(135deg, #51e2f5, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}
          >Nova</motion.span>
        </div>
      </div>
    </header>
  );
};

const SocialIcons = {
  GitHub: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>,
  LinkedIn: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>,
  'Twitter (X)': <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  YouTube: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>,
  Instagram: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
  Newsletter: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/></svg>
};

/* ===== FULL FOOTER ===== */
const Footer = () => (
  <footer style={{ background: '#03040a', padding: '6rem clamp(2rem, 5vw, 6rem) 2rem', borderTop: '1px solid rgba(81, 226, 245, 0.1)', position: 'relative', zIndex: 2 }}>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', justifyContent: 'space-between', marginBottom: '4rem' }}>
      <div style={{ flex: '1 1 150px' }}>
        <h4 style={{ color: 'var(--text-main)', marginBottom: '1.5rem', fontWeight: 600, fontSize: '1.1rem' }}>Features</h4>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {['AI Testing', 'Self-Healing Automation', 'Integrations', 'Pricing', 'Roadmap'].map(link => (
            <li key={link}><a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.95rem', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color='var(--color-bright-blue)'} onMouseOut={e => e.target.style.color='var(--text-muted)'}>{link}</a></li>
          ))}
        </ul>
      </div>
      <div style={{ flex: '1 1 150px' }}>
        <h4 style={{ color: 'var(--text-main)', marginBottom: '1.5rem', fontWeight: 600, fontSize: '1.1rem' }}>Resources</h4>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {['Documentation', 'API Reference', 'Blog', 'Tutorials', 'Release Notes'].map(link => (
             <li key={link}><a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.95rem', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color='var(--color-bright-blue)'} onMouseOut={e => e.target.style.color='var(--text-muted)'}>{link}</a></li>
          ))}
        </ul>
      </div>
      <div style={{ flex: '1 1 150px' }}>
        <h4 style={{ color: 'var(--text-main)', marginBottom: '1.5rem', fontWeight: 600, fontSize: '1.1rem' }}>Company</h4>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {['Community', 'About Us', 'Careers', 'Press', 'Contact'].map(link => (
             <li key={link}><a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.95rem', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color='var(--color-bright-blue)'} onMouseOut={e => e.target.style.color='var(--text-muted)'}>{link}</a></li>
          ))}
        </ul>
      </div>
      <div style={{ flex: '1 1 150px' }}>
        <h4 style={{ color: 'var(--text-main)', marginBottom: '1.5rem', fontWeight: 600, fontSize: '1.1rem' }}>Legal</h4>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Security', 'Compliance'].map(link => (
             <li key={link}><a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.95rem', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color='var(--color-bright-blue)'} onMouseOut={e => e.target.style.color='var(--text-muted)'}>{link}</a></li>
          ))}
        </ul>
      </div>
      <div style={{ flex: '1 1 150px' }}>
        <h4 style={{ color: 'var(--text-main)', marginBottom: '1.5rem', fontWeight: 600, fontSize: '1.1rem' }}>Support</h4>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {['Help Center', 'Report a Bug', 'Status Page', 'Support'].map(link => (
             <li key={link}><a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.95rem', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color='var(--color-bright-blue)'} onMouseOut={e => e.target.style.color='var(--text-muted)'}>{link}</a></li>
          ))}
        </ul>
      </div>
    </div>
    <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2.5rem', paddingBottom: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
      <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        © 2026 TestNova. All rights reserved.
      </div>
      
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        {['GitHub', 'LinkedIn', 'Twitter (X)', 'YouTube', 'Instagram', 'Newsletter'].map(link => (
          <a key={link} href="#" title={link} style={{ color: 'var(--text-muted)', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }} onMouseOver={e => e.target.style.color='var(--color-bright-blue)'} onMouseOut={e => e.target.style.color='var(--text-muted)'}>
            {SocialIcons[link]}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

/* ===== FLOATING PARTICLES ===== */
const FloatingParticles = () => {
  const particles = React.useMemo(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 12,
      duration: 10 + Math.random() * 15,
      size: 1.5 + Math.random() * 3,
      color: ['var(--color-bright-blue)', 'var(--color-plum)', 'var(--color-pink-sand)', 'var(--color-teal)'][Math.floor(Math.random() * 4)]
    })), []);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      {particles.map(p => (
        <div key={p.id} className="particle" style={{ left: p.left, bottom: '-10px', width: p.size, height: p.size, background: p.color, animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s`, opacity: 0.4 }} />
      ))}
    </div>
  );
};

/* ===== TWINKLING STARS ===== */
const TwinklingStars = () => {
  const stars = React.useMemo(() => 
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 1 + Math.random() * 2.5,
      delay: Math.random() * 8,
      duration: 2 + Math.random() * 4,
    })), []);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      {stars.map(s => (
        <div key={s.id} className="star" style={{ left: s.left, top: s.top, width: s.size, height: s.size, animationDelay: `${s.delay}s`, animationDuration: `${s.duration}s` }} />
      ))}
    </div>
  );
};

/* ===== SPOTLIGHT GLASS PANEL ===== */
const GlassPanel = ({ children, style, className = '', ...props }) => {
  const panelRef = useRef(null);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, visible: false });

  const handleMouse = useCallback((e) => {
    if (!panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top, visible: true });
  }, []);

  return (
    <div
      ref={panelRef}
      className={`glass-panel ${className}`}
      style={{ position: 'relative', ...style }}
      onMouseMove={handleMouse}
      onMouseLeave={() => setSpotlight(s => ({ ...s, visible: false }))}
      {...props}
    >
      {spotlight.visible && (
        <div className="glass-spotlight" style={{ left: spotlight.x - 125, top: spotlight.y - 125 }} />
      )}
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
};

/* ===== ANDROID ROBOT ===== */
const AndroidRobot = () => {
  return (
    <motion.div
      style={{ display: 'flex', justifyContent: 'center', padding: '1rem', cursor: 'pointer' }}
      whileHover={{
        y: [0, -25, 0, -25, 0],
        scale: 1.05,
        transition: { duration: 0.6, ease: "easeInOut", repeat: Infinity }
      }}
    >
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="120" height="150" viewBox="0 0 200 250" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="120" r="80" fill="var(--color-bright-blue)" opacity="0.1" filter="blur(20px)" />
          <path d="M 50 100 L 50 140 C 50 170, 150 170, 150 140 L 150 100 Z" fill="var(--color-dusty-white)" />
          <path d="M 50 100 L 50 120 C 50 150, 150 150, 150 120 L 150 100 Z" fill="rgba(0,0,0,0.1)" />
          <rect x="70" y="110" width="60" height="30" rx="5" fill="var(--bg-primary)" />
          <motion.path
            d="M 75 125 L 85 125 L 90 115 L 100 135 L 110 125 L 125 125"
            stroke="var(--color-pink-sand)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
          <path d="M 50 90 A 50 50 0 0 1 150 90 Z" fill="var(--color-dusty-white)" />
          <rect x="85" y="90" width="30" height="10" fill="var(--color-blue-green)" />
          <line x1="100" y1="40" x2="100" y2="10" stroke="var(--color-dark-sand)" strokeWidth="4" strokeLinecap="round"/>
          <motion.circle
             cx="100" cy="10" r="8"
             fill="var(--color-bright-blue)"
             animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
             transition={{ duration: 1, repeat: Infinity }}
          />
          <line x1="70" y1="50" x2="60" y2="30" stroke="var(--color-dark-sand)" strokeWidth="4" strokeLinecap="round"/>
          <circle cx="60" cy="30" r="5" fill="var(--color-pink-sand)" />
          <rect x="65" y="60" width="70" height="20" rx="10" fill="var(--bg-primary)" />
          <motion.rect
            x="75" y="65" width="15" height="10" rx="5" fill="var(--color-bright-blue)"
            animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.rect
            x="110" y="65" width="15" height="10" rx="5" fill="var(--color-bright-blue)"
            animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
          />
          <path d="M 35 100 A 15 15 0 0 0 35 140 L 45 140 L 45 100 Z" fill="var(--color-dusty-white)" />
          <path d="M 165 100 A 15 15 0 0 1 165 140 L 155 140 L 155 100 Z" fill="var(--color-dusty-white)" />
          <path d="M 35 140 V 160 A 10 10 0 0 0 25 150" stroke="var(--color-dark-sand)" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M 165 140 V 160 A 10 10 0 0 1 175 150" stroke="var(--color-dark-sand)" strokeWidth="6" fill="none" strokeLinecap="round" />
        </svg>
      </motion.div>
    </motion.div>
  );
};


/* ===== LOGO SVG (shared across views) ===== */
const LogoSVG = ({ className, style, size = 32 }) => (
  <motion.svg
    className={className}
    style={{ overflow: 'visible', ...style }}
    width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"
    animate={{ y: [-1, 2, -1], x: [0, -3, 0], rotate: [0, -6, 0] }}
    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
  >
    <motion.path
      d="M10 22 L4 36 L28 36 L22 22 Z"
      fill="var(--color-bright-blue)"
      animate={{ opacity: [0.1, 0.4, 0.1] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
    <path d="M10 16 C10 10 22 10 22 16" fill="var(--color-dusty-white)" opacity="0.8" />
    <circle cx="16" cy="14" r="2" fill="var(--color-pink-sand)" />
    <ellipse cx="16" cy="18" rx="14" ry="4" fill="var(--color-blue-green)" stroke="var(--color-bright-blue)" strokeWidth="1" />
    <motion.circle cx="8" cy="18" r="1" fill="var(--color-dusty-white)"
      animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.5, repeat: Infinity }} />
    <motion.circle cx="16" cy="19.5" r="1" fill="var(--color-pink-sand)"
      animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }} />
    <motion.circle cx="24" cy="18" r="1" fill="var(--color-dusty-white)"
      animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.4 }} />
  </motion.svg>
);

/* ===== MAIN APP ===== */
function App() {
  const [isInitializing, setIsInitializing] = useState(true);
  const [isSplashExiting, setIsSplashExiting] = useState(false);
  const [currentView, setCurrentView] = useState('landing');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [isMobile, setIsMobile] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const [testSequence, setTestSequence] = useState([]);
  const [traceViewMode, setTraceViewMode] = useState('dom');
  const [isExecuting, setIsExecuting] = useState(false);
  const [logs, setLogs] = useState([
    { time: '10:24:01', type: 'info', text: '[INFO] Initiating Playwright context...' },
    { time: '10:24:02', type: 'info', text: '[INFO] Navigating to https://staging.myapp.com' },
    { time: '10:24:05', type: 'pass', text: '[PASS] Given user is on the login page' },
    { time: '10:24:06', type: 'fail', text: '[FAIL] When user clicks #submit-btn - Locator not found' },
    { time: '10:24:08', type: 'info', text: '[AUTO-HEAL] Expanding search... found button with text "Login". Updating locator.' },
    { time: '10:24:09', type: 'pass', text: '[PASS] When user clicks "Login" button' }
  ]);

  const runAllTests = async () => {
    setIsExecuting(true);
    const targetUrl = testSequence.length > 0 ? testSequence[0].value1 : "https://example.com";
    
    setLogs(prev => [...prev, {
      time: new Date().toLocaleTimeString(),
      type: 'info',
      text: `[TRIGGER] Requesting execution for: ${targetUrl}`
    }]);

    try {
      const response = await fetch(`http://localhost:8080/api/v1/engine/run?target=${encodeURIComponent(targetUrl)}`);
      const result = await response.text();
      setLogs(prev => [...prev, {
        time: new Date().toLocaleTimeString(),
        type: result.startsWith('SUCCESS') ? 'pass' : 'fail',
        text: `[ENGINE] ${result}`
      }]);
    } catch (error) {
      setLogs(prev => [...prev, {
        time: new Date().toLocaleTimeString(),
        type: 'fail',
        text: `[ERROR] Connection failed: ${error.message}`
      }]);
    } finally {
      setIsExecuting(false);
    }
  };

  const saveSequence = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/engine/sequence`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testSequence)
      });
      const result = await response.text();
      // Using a simple toast notification would be better, but console log for bridge verification
      console.log(`[API] ${result}`);
      setLogs(prev => [...prev, {
        time: new Date().toLocaleTimeString(),
        type: 'info',
        text: `[SYSTEM] ${result}`
      }]);
    } catch (error) {
      console.error('Error saving sequence:', error);
      setLogs(prev => [...prev, {
        time: new Date().toLocaleTimeString(),
        type: 'fail',
        text: `[ERROR] Save failed: ${error.message}`
      }]);
    }
  };


  const allStatusCodes = [
    { code: 100, text: 'Continue', method: 'GET', url: '/api/v1/init', time: '10ms' },
    { code: 101, text: 'Switching Protocols', method: 'GET', url: '/ws', time: '12ms' },
    { code: 200, text: 'OK', method: 'GET', url: '/api/v1/users', time: '45ms' },
    { code: 201, text: 'Created', method: 'POST', url: '/api/v1/users', time: '120ms' },
    { code: 202, text: 'Accepted', method: 'POST', url: '/api/v1/tasks', time: '50ms' },
    { code: 204, text: 'No Content', method: 'DELETE', url: '/api/v1/users/1', time: '30ms' },
    { code: 301, text: 'Moved Permanently', method: 'GET', url: '/old-route', time: '15ms' },
    { code: 302, text: 'Found', method: 'GET', url: '/login-redirect', time: '18ms' },
    { code: 304, text: 'Not Modified', method: 'GET', url: '/assets/logo.png', time: '5ms' },
    { code: 400, text: 'Bad Request', method: 'POST', url: '/api/v1/form', time: '25ms' },
    { code: 401, text: 'Unauthorized', method: 'GET', url: '/api/v1/secure', time: '14ms' },
    { code: 403, text: 'Forbidden', method: 'GET', url: '/admin/config', time: '16ms' },
    { code: 404, text: 'Not Found', method: 'GET', url: '/404-page', time: '12ms' },
    { code: 405, text: 'Method Not Allowed', method: 'PUT', url: '/readonly', time: '11ms' },
    { code: 408, text: 'Request Timeout', method: 'POST', url: '/api/v1/slow', time: '5000ms' },
    { code: 429, text: 'Too Many Requests', method: 'GET', url: '/api/v1/rate-limited', time: '10ms' },
    { code: 500, text: 'Internal Server Error', method: 'POST', url: '/api/v1/crash', time: '80ms' },
    { code: 502, text: 'Bad Gateway', method: 'GET', url: '/api/v1/gateway', time: '150ms' },
    { code: 503, text: 'Service Unavailable', method: 'GET', url: '/api/v1/maintenance', time: '20ms' },
    { code: 504, text: 'Gateway Timeout', method: 'GET', url: '/api/v1/upstream-timeout', time: '10000ms' }
  ];

  const getStatusColor = (code) => {
    if (code >= 200 && code < 300) return 'var(--pass-green)';
    if (code >= 300 && code < 400) return 'var(--color-peach)';
    if (code >= 400 && code < 500) return 'var(--warning-amber)';
    if (code >= 500) return 'var(--fail-red)';
    return 'var(--text-muted)';
  };

  // Responsive listener
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 900);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleDragStart = (e, blockType, icon) => {
    e.dataTransfer.setData('blockType', blockType);
    e.dataTransfer.setData('icon', icon);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const blockType = e.dataTransfer.getData('blockType');
    const icon = e.dataTransfer.getData('icon');
    if (blockType) {
      setTestSequence([...testSequence, {
        id: Date.now().toString(),
        type: blockType,
        icon,
        value1: '',
        value2: ''
      }]);
    }
  };

  const handleDragOver = (e) => { e.preventDefault(); };

  const removeBlock = (index) => {
    const newSeq = [...testSequence];
    newSeq.splice(index, 1);
    setTestSequence(newSeq);
  };

  useEffect(() => {
    if (isInitializing) {
      const exitTimer = setTimeout(() => setIsSplashExiting(true), 300);
      return () => clearTimeout(exitTimer);
    }
  }, [isInitializing]);

  useEffect(() => {
    if (isSplashExiting) {
      const removeTimer = setTimeout(() => {
        setIsInitializing(false);
        setIsSplashExiting(false);
      }, 400); 
      return () => clearTimeout(removeTimer);
    }
  }, [isSplashExiting]);

  const handleAuth = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
    setIsAuthLoading(true);
    setTimeout(() => {
      setIsAuthLoading(false);
      setCurrentView('hub');
    }, 400);
  };

  return (
    <>
      <AnimatedBackground />
      <FloatingParticles />
      <TwinklingStars />
      <div className="noise-overlay" />

      <AnimatePresence mode="wait">

        {/* ======= 1. SPLASH SCREEN ======= */}
        {isInitializing && (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={isSplashExiting ? { y: '-100vh' } : { opacity: 1 }}
            transition={isSplashExiting ? { duration: 0.35, delay: 0.2, ease: [0.76, 0, 0.24, 1] } : { duration: 0.5 }}
            style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'center', alignItems: 'center', background: 'var(--bg-primary)', position: 'fixed', inset: 0, zIndex: 100, overflow: 'hidden' }}
          >
            {/* UFO Logo - flies upward on exit */}
            <motion.div
              animate={isSplashExiting
                ? { y: '-120vh', scale: 0.4, rotate: -3 }
                : { y: 0, scale: 1, rotate: 0 }
              }
              transition={isSplashExiting
                ? { duration: 1.2, ease: [0.22, 0.61, 0.36, 1] }
                : { duration: 0.3 }
              }
            >
              <LogoSVG className="animated-logo" size={150} />
              {/* Thrust flame beneath UFO */}
              <motion.div
                animate={isSplashExiting
                  ? { scaleY: [1, 2.5, 3], opacity: [0.8, 1, 0] }
                  : { scaleY: [0.8, 1.2, 0.8], opacity: [0.3, 0.6, 0.3] }
                }
                transition={isSplashExiting
                  ? { duration: 0.6, ease: "easeOut" }
                  : { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                }
                style={{
                  width: "30px",
                  height: "40px",
                  background: "linear-gradient(to bottom, var(--color-bright-blue), rgba(81,226,245,0.3), transparent)",
                  borderRadius: "0 0 50% 50%",
                  margin: "-8px auto 0",
                  filter: "blur(3px)",
                  transformOrigin: "top center",
                }}
              />
            </motion.div>

            {/* Trail particles that follow UFO on exit */}
            {isSplashExiting && (
              <>
                {[0, 1, 2, 3, 4].map(i => (
                  <motion.div
                    key={`trail-${i}`}
                    initial={{ opacity: 0.8, y: 0, scale: 1 }}
                    animate={{ opacity: 0, y: -800 - i * 100, scale: 0 }}
                    transition={{ duration: 0.7, delay: 0.05 * i, ease: 'easeIn' }}
                    style={{
                      position: 'absolute',
                      width: 4 + Math.random() * 4,
                      height: 4 + Math.random() * 4,
                      borderRadius: '50%',
                      background: ['var(--color-bright-blue)', 'var(--color-teal)', 'var(--color-pink-sand)'][i % 3],
                      left: `calc(50% + ${(Math.random() - 0.5) * 40}px)`,
                      top: '48%',
                      boxShadow: `0 0 12px var(--color-bright-blue)`,
                    }}
                  />
                ))}
              </>
            )}

            {/* Text and progress elements - fade out when exiting */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={isSplashExiting ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
              transition={isSplashExiting ? { duration: 0.3 } : { delay: 0.6, duration: 0.8 }}
              className="gradient-text-animated"
              style={{ marginTop: '2rem', fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight: 800, letterSpacing: '0.05em', fontFamily: 'Outfit, sans-serif' }}
            >
              TestNova
            </motion.h1>
            <motion.div
              initial={{ width: 0 }}
              animate={isSplashExiting ? { width: 0, opacity: 0 } : { width: 150 }}
              transition={isSplashExiting ? { duration: 0.2 } : { delay: 0.5, duration: 1.5, ease: 'easeInOut' }}
              style={{ height: '2px', background: 'linear-gradient(90deg, var(--color-plum), var(--color-pink-sand), var(--color-teal))', marginTop: '1rem', borderRadius: '2px' }}
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={isSplashExiting ? { opacity: 0, y: 20 } : { opacity: 0.5 }}
              transition={isSplashExiting ? { duration: 0.2 } : { delay: 1.2, duration: 0.8 }}
              style={{ marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}
            >
              AI-Powered Test Automation
            </motion.p>
          </motion.div>
        )}

        {/* === 1.5 AUTH LOADING === */}
        {!isInitializing && isAuthLoading && (
          <motion.div
            key="authLoading"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            transition={{ duration: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'center', alignItems: 'center', background: 'var(--bg-primary)', position: 'relative', zIndex: 2 }}
          >
            <LogoSVG className="animated-logo" size={160} />
            <motion.h2
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ marginTop: '2rem', fontSize: '1.5rem', color: 'var(--text-main)', fontWeight: 600 }}
            >
              Authenticating...
            </motion.h2>
          </motion.div>
        )}

        {/* === 2. LANDING + AUTH SIDEBAR === */}
        {!isInitializing && !isAuthLoading && currentView === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            style={{ display: 'flex', flexDirection: 'column', width: '100%', overflowX: 'hidden', position: 'relative', zIndex: 2 }}
          >
            <Header />

            {/* Top Screen Wrapper */}
            <div style={{ display: 'flex', minHeight: '100vh', width: '100%', position: 'relative', paddingTop: '80px' }}>
              {/* Left Hero */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 'clamp(2rem, 4vw, 4rem)', justifyContent: 'center', position: 'relative' }}>

              <motion.div variants={staggerContainer} initial="hidden" animate="show">
                <motion.h1 variants={fadeSlideUp} className="hero-title" style={{ textAlign: 'left', marginBottom: '1rem' }}>
                  Automate testing at <span style={{ color: "var(--color-bright-blue)", fontWeight: 800 }}>lightspeed</span>
                </motion.h1>

                <motion.p variants={fadeSlideUp} className="hero-subtitle" style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
                  The first AI-powered test execution framework that actually understands your app. Self-healing, zero-friction, and infinitely scalable.
                </motion.p>

                <motion.div variants={fadeSlideUp}>
                  <motion.button
                    animate={{ boxShadow: ['0 0 10px rgba(81, 226, 245, 0.2)', '0 0 35px rgba(81, 226, 245, 0.6)', '0 0 10px rgba(81, 226, 245, 0.2)'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.05, boxShadow: '0 0 45px rgba(81, 226, 245, 0.8)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsSidebarOpen(true)}
                    className="btn btn-primary"
                    style={{ padding: '1rem 2.5rem', fontSize: '1.2rem', background: 'linear-gradient(135deg, var(--color-bright-blue), var(--color-blue-green))', color: 'var(--bg-primary)', fontWeight: 700 }}
                  >
                    Explore In
                  </motion.button>
                </motion.div>

                {/* Feature pills */}
                <motion.div variants={fadeSlideUp} style={{ display: 'flex', gap: '1rem', marginTop: '3rem', flexWrap: 'wrap' }}>
                  {['Self-Healing', 'AI Copilot', 'Playwright Engine', 'Zero Config'].map((feat, i) => (
                    <motion.span
                      key={feat}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      style={{ padding: '0.5rem 1rem', borderRadius: '20px', border: '1px solid var(--border-subtle)', background: 'rgba(81, 226, 245, 0.06)', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 500, backdropFilter: 'blur(8px)' }}
                    >
                      {feat}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            </div>
            </div>

            {/* Redefining Testing Section */}
            <motion.section 
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.8 }}
               style={{ display: 'flex', minHeight: '80vh', padding: 'clamp(4rem, 8vw, 8rem)', alignItems: 'center', gap: '5rem', flexWrap: 'wrap-reverse' }}
            >
               <div style={{ flex: '1 1 450px', display: 'flex', justifyContent: 'center' }}>
                 <motion.video 
                   src="/testnova_promo.mp4" 
                   autoPlay={true}
                   loop={true}
                   muted={true}
                   playsInline={true}
                   controls={true}
                   controlsList="nofullscreen"
                   onCanPlay={(e) => { e.target.play().catch(() => {}); }}
                   onEnded={(e) => { e.target.currentTime = 0; e.target.play().catch(() => {}); }}
                   initial={{ opacity: 0, scale: 0.95 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   transition={{ duration: 1, delay: 0.3 }}
                   style={{ width: '100%', maxWidth: '600px', borderRadius: '1rem', border: '1px solid rgba(168, 85, 247, 0.2)', boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 40px rgba(168, 85, 247, 0.15)', objectFit: 'cover' }}
                 />
               </div>
               
               <div style={{ flex: '1 1 450px' }}>
                 <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '2rem', background: 'linear-gradient(135deg, var(--color-bright-blue), var(--color-plum))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1.2 }}>Redefining Modern Testing</h2>
                 
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                   <p>TestNova is built to redefine how testing works in modern software environments by combining speed, intelligence, and simplicity into a single platform. Unlike traditional tools, it leverages advanced AI to truly understand your application—going beyond simple execution to interpret behavior, detect anomalies, and adapt in real time. This intelligence is paired with powerful self-healing automation, ensuring that even when UI elements change, your tests continue to run smoothly without constant manual fixes, significantly reducing maintenance effort.</p>
                   <p>Designed for performance, TestNova delivers lightning-fast execution, enabling rapid feedback cycles and helping teams release with confidence. It also includes an AI-powered copilot that assists developers in generating, optimizing, and debugging test cases, making the entire testing process more efficient and less time-consuming. With a zero-configuration setup, teams can get started instantly without dealing with complex installations or configurations.</p>
                   <p>Whether you're building a startup product or managing enterprise-scale systems, TestNova is designed to scale effortlessly alongside your needs. By combining intelligent automation, speed, and scalability, it transforms testing from a bottleneck into a seamless, reliable part of your development workflow.</p>
                 </div>
               </div>
            </motion.section>

            {/* AI History Section */}
            <motion.section 
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.8 }}
               style={{ display: 'flex', minHeight: '80vh', padding: 'clamp(4rem, 8vw, 8rem)', alignItems: 'center', gap: '5rem', background: 'linear-gradient(180deg, transparent, rgba(81, 226, 245, 0.03), transparent)' }}
            >
               <div style={{ flex: 1 }}>
                 <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '2rem', color: 'var(--color-bright-blue)', lineHeight: 1.2 }}>History of Artificial Intelligence</h2>
                 
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                   <p>Artificial Intelligence (AI) has evolved from a theoretical concept into one of the most transformative technologies of our time.</p>
                   <p>The journey began in the 1950s when pioneers like Alan Turing introduced the idea that machines could simulate human intelligence. His famous “Turing Test” became a benchmark for machine intelligence.</p>
                   <p>In 1956, the term Artificial Intelligence was officially coined at the Dartmouth Conference, marking the birth of AI as a field. Early systems focused on rule-based logic, where machines followed predefined instructions to solve problems.</p>
                   <p>During the 1970s–1990s, AI faced setbacks known as “AI Winters” due to limited computing power and unrealistic expectations. However, progress resumed with the rise of machine learning—allowing systems to learn from data rather than rely solely on rules.</p>
                   <p>The 2000s marked a turning point with big data and increased computational power. Breakthroughs in neural networks and deep learning enabled machines to recognize images, understand speech, and even generate human-like text.</p>
                   <p>Today, AI powers everything from recommendation systems and autonomous vehicles to advanced testing frameworks. Modern AI systems are not just reactive—they are adaptive, predictive, and capable of continuous learning.</p>
                 </div>
               </div>

               <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                 <motion.img 
                   src="/turing.jpg" 
                   alt="Alan Turing" 
                   initial={{ scale: 0.9, opacity: 0, rotate: -2 }}
                   whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 1, delay: 0.2 }}
                   style={{ width: '100%', maxWidth: '450px', borderRadius: '1rem', border: '1px solid rgba(81, 226, 245, 0.2)', boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 40px rgba(81, 226, 245, 0.1)' }}
                 />
               </div>
            </motion.section>

            {/* Auth Sidebar */}
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="glass-panel"
                  style={{ position: 'fixed', top: 0, right: 0, height: '100vh', width: 'min(400px, 90vw)', borderLeft: '1px solid var(--border-subtle)', borderRadius: 0, padding: 'clamp(1.5rem, 3vw, 3rem)', display: 'flex', flexDirection: 'column', gap: '2rem', zIndex: 100, background: 'var(--bg-surface)' }}
                >
                  <button onClick={() => setIsSidebarOpen(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}>X</button>

                  <motion.div variants={staggerContainer} initial="hidden" animate="show" style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <motion.h2 variants={fadeSlideUp} style={{ color: 'var(--text-main)', marginBottom: '1.5rem', fontSize: '1.8rem', textAlign: 'center' }}>
                      {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
                    </motion.h2>

                    <motion.form variants={fadeSlideUp} onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <AnimatePresence mode="popLayout">
                        {authMode === 'signup' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0, y: -10 }}
                            animate={{ opacity: 1, height: 'auto', y: 0 }}
                            exit={{ opacity: 0, height: 0, y: -10 }}
                            className="input-group" style={{ marginBottom: 0 }}
                          >
                            <label className="input-label">Full Name</label>
                            <input type="text" className="input-field" placeholder="John Doe" required />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label">Work Email</label>
                        <input type="email" className="input-field" placeholder="name@company.com" required />
                      </div>

                      <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label">Password</label>
                        <input type="password" className="input-field" placeholder="*********" required />
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(168, 85, 247, 0.3)' }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%', padding: '0.875rem', marginTop: '0.5rem', fontSize: '1rem', background: 'linear-gradient(135deg, var(--color-plum), var(--color-pink))' }}
                      >
                        {authMode === 'login' ? 'Sign In' : 'Sign Up'}
                      </motion.button>
                    </motion.form>

                    <motion.div variants={fadeSlideUp} style={{ textAlign: 'center', marginTop: '1rem' }}>
                      {authMode === 'login' ? (
                        <span style={{ color: 'var(--text-muted)' }}>Don't have an account? <button type="button" onClick={() => setAuthMode('signup')} style={{ background: 'transparent', border: 'none', color: 'var(--color-teal)', cursor: 'pointer', fontWeight: 600 }}>Sign up</button></span>
                      ) : (
                        <span style={{ color: 'var(--text-muted)' }}>Already have an account? <button type="button" onClick={() => setAuthMode('login')} style={{ background: 'transparent', border: 'none', color: 'var(--color-teal)', cursor: 'pointer', fontWeight: 600 }}>Sign in</button></span>
                      )}
                    </motion.div>
                  </motion.div>


                </motion.div>
              )}
            </AnimatePresence>
            
            <Footer />
          </motion.div>
        )}

        {/* === 3. HUB === */}
        {!isInitializing && currentView === 'hub' && (
          <motion.div
            key="hub"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            style={{ padding: 'clamp(2rem, 4vw, 4rem)', display: 'flex', flexDirection: 'column', minHeight: '100vh', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}
          >
            <motion.header
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', height: '48px' }}>
                <LogoSVG className="animated-logo" size={48} />
                <div className="brand-title" style={{ fontSize: '2rem', margin: 0, lineHeight: '48px', display: 'flex', alignItems: 'center' }}>Workspace Hub</div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <button onClick={() => { setIsAuthenticated(false); setCurrentView('landing'); }} className="btn">Sign Out</button>
              </div>
            </motion.header>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ marginBottom: '2rem', color: 'var(--text-main)' }}
            >
              Select a Tool to Continue
            </motion.h2>

            <motion.div className="grid-hub" variants={staggerContainer} initial="hidden" animate="show">

              <motion.div variants={scaleIn}>
                <GlassPanel style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', borderTop: '4px solid var(--color-teal)', cursor: 'pointer', height: '100%' }}>
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ fontSize: '3.5rem', textShadow: '0 0 30px var(--color-teal)' }}
                  >{"\u26A1"}</motion.div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.4rem' }}>Automation Test Tool</h3>
                    <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>AI-powered end-to-end testing builder with self-healing web locators.</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.03, boxShadow: '0 0 35px rgba(20, 184, 166, 0.4)' }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setCurrentView('automation')}
                    className="btn btn-primary"
                    style={{ marginTop: 'auto', width: '100%', padding: '1rem', background: 'linear-gradient(135deg, var(--color-teal), var(--color-plum))' }}
                  >
                    Launch Workspace
                  </motion.button>
                </GlassPanel>
              </motion.div>

              <motion.div variants={scaleIn}>
                <GlassPanel style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', borderTop: '4px solid var(--color-pink)', opacity: 0.6, height: '100%' }}>
                  <div style={{ fontSize: '3.5rem' }}>{"\uD83D\uDCCA"}</div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.4rem' }}>Performance Matrix</h3>
                    <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Load testing and performance monitoring suite.</p>
                  </div>
                  <button disabled className="btn" style={{ marginTop: 'auto', width: '100%', padding: '1rem' }}>Coming Soon</button>
                </GlassPanel>
              </motion.div>

              <motion.div variants={scaleIn}>
                <GlassPanel style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', borderTop: '4px solid var(--color-yellow)', opacity: 0.6, height: '100%' }}>
                  <div style={{ fontSize: '3.5rem' }}>{"\uD83D\uDCF1"}</div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.4rem' }}>Mobile QA Suite</h3>
                    <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Native automation for iOS and Android.</p>
                  </div>
                  <button disabled className="btn" style={{ marginTop: 'auto', width: '100%', padding: '1rem' }}>Coming Soon</button>
                </GlassPanel>
              </motion.div>

              <motion.div variants={scaleIn}>
                <GlassPanel style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', borderTop: '4px solid var(--color-peach)', opacity: 0.6, height: '100%' }}>
                  <div style={{ fontSize: '3.5rem' }}>{"\uD83E\uDDEA"}</div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.4rem' }}>Unit Testing</h3>
                    <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>JUnit 5 integration with AI-generated unit test coverage.</p>
                  </div>
                  <button disabled className="btn" style={{ marginTop: 'auto', width: '100%', padding: '1rem' }}>Coming Soon</button>
                </GlassPanel>
              </motion.div>

              <motion.div variants={scaleIn}>
                <GlassPanel style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', borderTop: '4px solid var(--color-nebula-blue)', opacity: 0.6, height: '100%' }}>
                  <div style={{ fontSize: '3.5rem' }}>{"\uD83D\uDCCB"}</div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.4rem' }}>Project Management</h3>
                    <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Kanban boards, sprint tracking, and test case management.</p>
                  </div>
                  <button disabled className="btn" style={{ marginTop: 'auto', width: '100%', padding: '1rem' }}>Coming Soon</button>
                </GlassPanel>
              </motion.div>

            </motion.div>
          </motion.div>
        )}

        {/* === 4. AUTOMATION WORKSPACE === */}
        {!isInitializing && currentView === 'automation' && (
          <motion.div
            key="automation"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.2 }}
            className="app-container"
            style={{ position: 'relative', zIndex: 2 }}
          >
            {/* Mobile overlay */}
            {isMobile && <div className={`mobile-overlay ${mobileSidebarOpen ? 'visible' : ''}`} onClick={() => setMobileSidebarOpen(false)} />}

            {/* Sidebar */}
            <aside className={`sidebar ${isMobile && mobileSidebarOpen ? 'open' : ''}`}>
              <div className="brand-title" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', height: '36px' }} onClick={() => setCurrentView('hub')}>
                <LogoSVG className="animated-logo" size={32} />
                <span style={{ fontSize: '1.5rem', lineHeight: '36px', display: 'flex', alignItems: 'center', margin: 0 }}>TestNova</span>
              </div>

              <nav className="nav-menu">
                <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); setCurrentView('hub'); if (isMobile) setMobileSidebarOpen(false); }}>
                  <span>{"\u2B05"}</span> Hub Dash
                </a>
                {[
                  { key: 'dashboard', icon: '\uD83D\uDCCA', label: 'Dashboard' },
                  { key: 'builder', icon: '\uD83E\uDDE9', label: 'Visual Builder' },
                  { key: 'config', icon: '\u2699', label: 'Configuration' },
                  { key: 'import', icon: '\uD83D\uDCE5', label: 'Test Data & Copilot' },
                  { key: 'traces', icon: '\uD83D\uDD0D', label: 'Trace Viewer' },
                  { key: 'activity', icon: '\uD83D\uDCCB', label: 'Activity Log' },
                ].map(tab => (
                  <a key={tab.key} href="#" className={`nav-item ${activeTab === tab.key ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab(tab.key); if (isMobile) setMobileSidebarOpen(false); }}>
                    <span>{tab.icon}</span> {tab.label}
                  </a>
                ))}
              </nav>

              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column' }}>
                <AndroidRobot />
                <button onClick={() => { setIsAuthenticated(false); setCurrentView('landing'); }} className="btn" style={{ width: '100%', justifyContent: 'flex-start', background: 'transparent', borderColor: 'transparent', marginTop: '1rem' }}>
                  <span>{"\uD83D\uDEAA"}</span> Sign Out
                </button>
              </div>
            </aside>

            {/* Main Content */}
            <main className="main-content">
              <motion.header
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  {isMobile && (
                    <button className="hamburger-btn" onClick={() => setMobileSidebarOpen(true)}>{"\u2630"}</button>
                  )}
                  <h2 style={{ margin: 0 }}>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Overview</h2>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="btn">View Reports</motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(168, 85, 247, 0.3)' }} 
                    whileTap={{ scale: 0.97 }} 
                    disabled={isExecuting}
                    onClick={runAllTests}
                    className="btn btn-primary" 
                    style={{ background: 'linear-gradient(135deg, var(--color-plum), var(--color-teal))', opacity: isExecuting ? 0.6 : 1 }}
                  >
                    {isExecuting ? "\u23F3 Running..." : "\u25B6 Run All Tests"}
                  </motion.button>
                </div>
              </motion.header>

              <AnimatePresence mode="wait">

                {/* --- DASHBOARD --- */}
                {activeTab === 'dashboard' && (
                  <motion.div key="dashboard" variants={staggerContainer} initial="hidden" animate="show" exit={{ opacity: 0 }}>
                    <motion.div variants={fadeSlideUp} className="grid-stats">
                      {[
                        { label: 'Tests Passed', value: '142', color: 'var(--pass-green)', icon: '\u2713' },
                        { label: 'Tests Failed', value: '3', color: 'var(--fail-red)', icon: '\u2717' },
                        { label: 'Auto-Healed', value: '12', color: 'var(--warning-amber)', icon: '\u26A1' },
                      ].map((stat, i) => (
                        <GlassPanel key={stat.label} style={{ padding: '1.5rem', borderBottom: `3px solid ${stat.color}` }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <h4 style={{ color: 'var(--text-muted)', fontSize: '0.85rem', letterSpacing: '0.04em' }}>{stat.label}</h4>
                            <span style={{ fontSize: '1.2rem', opacity: 0.6 }}>{stat.icon}</span>
                          </div>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + i * 0.15, type: 'spring', stiffness: 200 }}
                            style={{ fontSize: '2.5rem', fontWeight: '700', color: stat.color, marginTop: '0.5rem' }}
                          >{stat.value}</motion.div>
                        </GlassPanel>
                      ))}
                    </motion.div>

                    <motion.div variants={fadeSlideUp}>
                      <GlassPanel style={{ padding: '2rem', marginTop: '1rem' }}>
                        <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          Live Execution Console
                          <motion.span
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            style={{ fontSize: '0.85rem', color: 'var(--pass-green)', fontWeight: 'normal', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                          >
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--pass-green)', display: 'inline-block' }} />
                            Live
                          </motion.span>
                        </h3>
                        <div className="tv-console">
                          {logs.map((log, i) => (
                            <div key={i} className="log-line">
                              <span className="log-time">{log.time}</span>
                              <span className={`log-${log.type}`} style={{ 
                                color: log.type === 'pass' ? 'var(--pass-green)' : 
                                       log.type === 'fail' ? 'var(--fail-red)' : 
                                       log.type === 'info' ? 'var(--color-teal)' : 'inherit' 
                              }}>
                                {log.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      </GlassPanel>
                    </motion.div>
                  </motion.div>
                )}

                {/* --- CONFIG --- */}
                {activeTab === 'config' && (
                  <motion.div key="config" variants={staggerContainer} initial="hidden" animate="show" exit={{ opacity: 0 }} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-md)' }}>
                    <motion.div variants={fadeSlideUp}>
                      <GlassPanel style={{ padding: '2rem' }}>
                        <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-teal)' }}>Environment Variables</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                          <div className="input-group" style={{ marginBottom: 0 }}>
                            <label className="input-label">Active Environment</label>
                            <select className="input-field" defaultValue="staging">
                              <option value="dev">Development</option>
                              <option value="staging">Staging</option>
                              <option value="prod">Production</option>
                            </select>
                          </div>
                          <div className="input-group" style={{ marginBottom: 0 }}>
                            <label className="input-label">Primary Application URL</label>
                            <input type="text" className="input-field" defaultValue="https://staging.testnova.app" />
                          </div>
                        </div>
                      </GlassPanel>
                    </motion.div>

                    <motion.div variants={fadeSlideUp}>
                      <GlassPanel style={{ padding: '2rem' }}>
                        <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-teal)' }}>Secrets Management</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>These values are encrypted and injected dynamically during test execution.</p>

                        {[
                          { key: 'ADMIN_PASSWORD', val: 'supersecret123' },
                          { key: 'STRIPE_API_KEY', val: 'sk_test_12345' },
                        ].map((secret, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                            <div className="input-group" style={{ flex: 1, marginBottom: 0, minWidth: '120px' }}>
                              <input type="text" className="input-field" defaultValue={secret.key} />
                            </div>
                            <div className="input-group" style={{ flex: 2, marginBottom: 0, minWidth: '180px' }}>
                              <input type="password" className="input-field" defaultValue={secret.val} />
                            </div>
                            <motion.button whileHover={{ scale: 1.05 }} className="btn btn-primary" style={{ padding: '0.6rem 1rem' }}>Update</motion.button>
                            <motion.button whileHover={{ scale: 1.05 }} className="btn" style={{ padding: '0.6rem 1rem', color: 'var(--fail-red)' }}>Delete</motion.button>
                          </div>
                        ))}

                        <button className="btn" style={{ width: '100%', borderStyle: 'dashed' }}>+ Add New Secret</button>
                      </GlassPanel>
                    </motion.div>

                    <motion.div variants={fadeSlideUp}>
                      <GlassPanel style={{ padding: '2rem' }}>
                        <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-teal)' }}>Playwright Execution Toggles</h3>
                        <div className="grid-config-toggles">
                          {[
                            { title: 'Headless Mode', desc: 'Run browser in background without UI for maximum speed.', type: 'checkbox', checked: true },
                            { title: 'Record Video', desc: 'Capture video of test execution for CI/CD debugging.', type: 'select' },
                            { title: 'Mock External APIs', desc: 'Intercept and mock third-party network requests.', type: 'checkbox' },
                          ].map((toggle, i) => (
                            <motion.div key={i} whileHover={{ scale: 1.02 }} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', background: 'var(--bg-input)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-subtle)', transition: 'all 0.2s' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h4 style={{ margin: 0 }}>{toggle.title}</h4>
                                {toggle.type === 'checkbox' ? (
                                  <input type="checkbox" defaultChecked={toggle.checked} style={{ width: '1.2rem', height: '1.2rem', accentColor: 'var(--color-teal)' }} />
                                ) : (
                                  <select className="input-field" style={{ padding: '0.2rem 0.5rem', fontSize: '0.85rem' }} defaultValue="on-retry">
                                    <option value="off">Off</option>
                                    <option value="on-retry">On Retry Only</option>
                                    <option value="on">Always On</option>
                                  </select>
                                )}
                              </div>
                              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{toggle.desc}</span>
                            </motion.div>
                          ))}
                        </div>
                      </GlassPanel>
                    </motion.div>
                  </motion.div>
                )}

                {/* --- BUILDER --- */}
                {activeTab === 'builder' && (
                  <motion.div key="builder" variants={staggerContainer} initial="hidden" animate="show" exit={{ opacity: 0 }} className="grid-builder">
                    <motion.div variants={fadeSlideRight}>
                      <GlassPanel style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <h3 style={{ color: 'var(--text-main)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Action Blocks</h3>
                        {[
                          { type: 'Navigate to URL', icon: '\uD83C\uDF10', color: 'var(--color-teal)' },
                          { type: 'Click Element', icon: '\uD83D\uDDB1', color: 'var(--color-pink)' },
                          { type: 'Type Text', icon: '\u2328', color: 'var(--color-plum)' },
                          { type: 'Assert Visible', icon: '\u2705', color: 'var(--pass-green)' },
                          { type: 'Wait For...', icon: '\u23F3', color: 'var(--warning-amber)' },
                        ].map((block) => (
                          <motion.div
                            key={block.type}
                            draggable
                            onDragStart={(e) => handleDragStart(e, block.type, block.icon)}
                            whileHover={{ scale: 1.03, x: 4 }}
                            whileTap={{ scale: 0.97 }}
                            style={{ padding: '0.9rem 1rem', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', borderRadius: '10px', cursor: 'grab', display: 'flex', alignItems: 'center', gap: '0.75rem', transition: 'border-color 0.2s', borderLeft: `3px solid ${block.color}` }}
                          >
                            <span>{block.icon}</span> {block.type}
                          </motion.div>
                        ))}
                      </GlassPanel>
                    </motion.div>

                    <motion.div variants={fadeSlideUp}>
                      <GlassPanel style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                          <h3 style={{ color: 'var(--color-teal)' }}>Test Canvas: Custom Flow</h3>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <motion.button whileHover={{ scale: 1.05 }} className="btn" onClick={() => setTestSequence([])}>Clear</motion.button>
                            <motion.button 
                              whileHover={{ scale: 1.05 }} 
                              onClick={saveSequence}
                              className="btn btn-primary" 
                              style={{ background: 'linear-gradient(135deg, var(--color-plum), var(--color-teal))' }}
                            >
                              Save Suite
                            </motion.button>
                          </div>
                        </div>

                        <div
                          onDrop={handleDrop}
                          onDragOver={handleDragOver}
                          style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, border: '2px dashed var(--border-subtle)', borderRadius: '12px', padding: '1.5rem', background: 'rgba(0,0,0,0.1)', minHeight: '400px' }}
                        >
                          {testSequence.length === 0 && (
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', flexDirection: 'column', gap: '1rem' }}>
                              <motion.span animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ fontSize: '3rem', opacity: 0.4 }}>{"\uD83E\uDDE9"}</motion.span>
                              Drag and drop action blocks here to build your test
                            </div>
                          )}

                          <AnimatePresence>
                            {testSequence.map((block, index) => (
                              <motion.div
                                key={block.id}
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                              >
                                <div style={{ padding: '1rem', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderLeft: `4px solid var(--color-teal)`, borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{index + 1}</span>
                                    <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>{block.icon} {block.type}</span>
                                  </div>
                                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                                    <input type="text" className="input-field" defaultValue={block.value1} placeholder={block.type === 'Navigate to URL' ? 'URL' : 'Locator'} style={{ padding: '0.4rem 0.8rem', width: '150px' }}
                                      onChange={(e) => { const newSeq = [...testSequence]; newSeq[index].value1 = e.target.value; setTestSequence(newSeq); }}
                                    />
                                    {block.type === 'Type Text' && (
                                      <input type="text" className="input-field" defaultValue={block.value2} placeholder="Value" style={{ padding: '0.4rem 0.8rem', width: '150px' }}
                                        onChange={(e) => { const newSeq = [...testSequence]; newSeq[index].value2 = e.target.value; setTestSequence(newSeq); }}
                                      />
                                    )}
                                    <button onClick={() => removeBlock(index)} style={{ background: 'transparent', border: 'none', color: 'var(--fail-red)', cursor: 'pointer', padding: '0.5rem', fontSize: '1.2rem' }}>X</button>
                                  </div>
                                </div>
                                {index < testSequence.length - 1 && (
                                  <div style={{ textAlign: 'center', color: 'var(--border-subtle)', margin: '0.25rem 0' }}>{"\u25BC"}</div>
                                )}
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>
                      </GlassPanel>
                    </motion.div>
                  </motion.div>
                )}

                {/* --- IMPORT / COPILOT --- */}
                {activeTab === 'import' && (
                  <motion.div key="import" variants={staggerContainer} initial="hidden" animate="show" exit={{ opacity: 0 }} className="grid-import">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                      <motion.div variants={fadeSlideUp}>
                        <GlassPanel style={{ padding: '2rem' }}>
                          <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-teal)' }}>Bulk Import Test Data</h3>
                          <motion.div
                            whileHover={{ borderColor: 'var(--accent-cyan)', background: 'rgba(81, 226, 245, 0.04)' }}
                            style={{ border: '2px dashed var(--border-subtle)', borderRadius: '12px', padding: 'clamp(1.5rem, 3vw, 3rem)', textAlign: 'center', background: 'var(--bg-input)', cursor: 'pointer', transition: 'all 0.3s' }}
                          >
                            <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ fontSize: '3rem', margin: '0 auto 1rem' }}>{"\uD83D\uDCC1"}</motion.div>
                            <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>Click or drag file to this area</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Supports .xlsx, .csv, and .json up to 50MB</p>
                          </motion.div>
                        </GlassPanel>
                      </motion.div>

                      <motion.div variants={fadeSlideUp}>
                        <GlassPanel style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                          <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-teal)' }}>Manual BDD Input</h3>
                          <textarea
                            className="input-field"
                            placeholder={"Feature: Login functionality\n  Scenario: Successful login with valid credentials\n    Given the user is on the login page\n    When the user enters valid credentials\n    Then they should be redirected to the dashboard"}
                            style={{ flex: 1, minHeight: '200px', resize: 'vertical', fontFamily: 'monospace', lineHeight: 1.5 }}
                          />
                          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem', flexWrap: 'wrap' }}>
                            <motion.button whileHover={{ scale: 1.03 }} className="btn">Check Syntax</motion.button>
                            <motion.button whileHover={{ scale: 1.03 }} className="btn btn-primary" style={{ background: 'linear-gradient(135deg, var(--color-plum), var(--color-teal))' }}>Generate Step Definitions</motion.button>
                          </div>
                        </GlassPanel>
                      </motion.div>
                    </div>

                    <motion.div variants={fadeSlideRight}>
                      <GlassPanel style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-teal)', marginBottom: '1rem' }}>
                          <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ fontSize: '1.5rem' }}>{"\u2728"}</motion.span>
                          <h3 style={{ margin: 0 }}>Copilot Panel</h3>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>AI suggestions based on your current BDD steps.</p>

                        {[
                          { label: 'Suggestion', text: 'Add: "And the user clicks the Submit button"', color: 'var(--color-teal)' },
                          { label: 'Missing Step Definition', text: 'Warning: Missing Java Playwright locator for #email', color: 'var(--warning-amber)' },
                          { label: 'Optimization', text: 'Refactor data table into Scenario Outline for better data coverage.', color: 'var(--pass-green)' },
                        ].map((item, i) => (
                          <motion.div key={i} whileHover={{ scale: 1.02, x: 3 }} style={{ padding: '1rem', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', borderRadius: '10px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '0.5rem', borderLeft: `3px solid ${item.color}` }}>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</span>
                            <span style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>{item.text}</span>
                          </motion.div>
                        ))}
                      </GlassPanel>
                    </motion.div>
                  </motion.div>
                )}

                {/* --- TRACES --- */}
                {activeTab === 'traces' && (
                  <motion.div key="traces" variants={staggerContainer} initial="hidden" animate="show" exit={{ opacity: 0 }} className="grid-traces">
                    <motion.div variants={fadeSlideRight}>
                      <GlassPanel style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <h3 style={{ color: 'var(--text-main)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Trace History</h3>
                        <div className="input-field" style={{ padding: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span>{"\uD83D\uDD0D"}</span> <input type="text" placeholder="Search traces..." style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', outline: 'none', width: '100%' }} />
                        </div>

                        {[
                          { name: 'Login_EdgeCases.spec', time: '10m ago', desc: 'Attempted to click #submit, timeout 30000ms', color: 'var(--fail-red)' },
                          { name: 'Checkout_Flow.spec', time: '1h ago', desc: 'Passed in 15.2s', color: 'var(--pass-green)' },
                          { name: 'Payment_Gateway.spec', time: '3h ago', desc: 'Auto-healed: Locator updated', color: 'var(--warning-amber)' },
                        ].map((trace, i) => (
                          <motion.div key={i} whileHover={{ x: 3, background: 'var(--bg-input)' }} style={{ padding: '1rem', background: i === 0 ? 'var(--bg-input)' : 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderLeft: `3px solid ${trace.color}`, borderRadius: '10px', cursor: 'pointer', transition: 'all 0.2s' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                              <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>{trace.name}</span>
                              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{trace.time}</span>
                            </div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{trace.desc}</div>
                          </motion.div>
                        ))}
                      </GlassPanel>
                    </motion.div>

                    <motion.div variants={fadeSlideUp}>
                      <GlassPanel style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', flexWrap: 'wrap', gap: '0.5rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--fail-red)' }}></div>
                            <h3 style={{ margin: 0, color: 'var(--text-main)' }}>Login_EdgeCases.spec.js</h3>
                          </div>
                          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            <button className="btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', background: traceViewMode === 'dom' ? 'var(--color-plum)' : 'transparent', color: traceViewMode === 'dom' ? '#fff' : 'var(--text-main)' }} onClick={() => setTraceViewMode('dom')}>DOM</button>
                            <button className="btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', background: traceViewMode === 'network' ? 'var(--color-plum)' : 'transparent', color: traceViewMode === 'network' ? '#fff' : 'var(--text-main)' }} onClick={() => setTraceViewMode('network')}>Network</button>
                            <motion.button whileHover={{ scale: 1.03 }} className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', background: 'linear-gradient(135deg, var(--color-plum), var(--color-teal))' }}>Send to AI Analysis</motion.button>
                          </div>
                        </div>

                        {/* Timeline */}
                        <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', width: '40px' }}>0s</div>
                          <div style={{ flex: 1, height: '24px', background: 'var(--bg-input)', borderRadius: '4px', position: 'relative' }}>
                            <div style={{ position: 'absolute', top: 0, bottom: 0, left: '0', width: '30%', background: 'var(--pass-green)', opacity: 0.3, borderRadius: '4px 0 0 4px' }}></div>
                            <div style={{ position: 'absolute', top: 0, bottom: 0, left: '30%', width: '40%', background: 'var(--warning-amber)', opacity: 0.3 }}></div>
                            <div style={{ position: 'absolute', top: 0, bottom: 0, left: '70%', width: '30%', background: 'var(--fail-red)', opacity: 0.3, borderRadius: '0 4px 4px 0' }}></div>
                            <motion.div
                              animate={{ left: ['0%', '85%'] }}
                              transition={{ duration: 3, ease: 'easeOut' }}
                              style={{ position: 'absolute', top: '-4px', bottom: '-4px', width: '2px', background: 'var(--accent-cyan)' }}
                            >
                              <div style={{ width: '8px', height: '8px', background: 'var(--accent-cyan)', clipPath: 'polygon(50% 100%, 0 0, 100% 0)', position: 'absolute', top: 0, left: '-3px' }}></div>
                            </motion.div>
                          </div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', width: '40px', textAlign: 'right' }}>30s</div>
                        </div>

                        {/* Viewer body */}
                        <div style={{ display: 'flex', flex: 1, flexDirection: isMobile ? 'column' : 'row' }}>
                          {traceViewMode === 'dom' ? (
                            <>
                              <div style={{ flex: 2, padding: '1.5rem', borderRight: isMobile ? 'none' : '1px solid var(--border-subtle)', background: '#fff', display: 'flex', flexDirection: 'column', minHeight: '350px' }}>
                                <div style={{ background: '#f1f5f9', padding: '0.5rem', borderRadius: '8px 8px 0 0', border: '1px solid #cbd5e1', display: 'flex', gap: '0.5rem' }}>
                                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></div>
                                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }}></div>
                                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }}></div>
                                </div>
                                <div style={{ border: '1px solid #cbd5e1', borderTop: 'none', flex: 1, borderRadius: '0 0 8px 8px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                                  <div style={{ width: '250px', padding: '2rem', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                                    <div style={{ height: '30px', background: '#e2e8f0', marginBottom: '1rem', borderRadius: '4px' }}></div>
                                    <div style={{ height: '30px', background: '#e2e8f0', marginBottom: '1rem', borderRadius: '4px' }}></div>
                                    <div style={{ height: '40px', background: '#3b82f6', borderRadius: '4px', position: 'relative' }}>
                                      <motion.div
                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                        style={{ position: 'absolute', inset: '-4px', border: '2px solid #ef4444', borderRadius: '6px', background: 'rgba(239, 68, 68, 0.1)' }}
                                      />
                                      <div style={{ position: 'absolute', top: '-30px', right: '-120px', background: '#ef4444', color: '#fff', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>Timeout 30000ms</div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div style={{ flex: 1, background: 'var(--bg-input)', padding: '1rem', overflowY: 'auto', minHeight: '350px' }}>
                                <h4 style={{ color: 'var(--text-main)', fontSize: '0.9rem', marginBottom: '1rem' }}>Test Actions</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.85rem' }}>
                                    <span style={{ color: 'var(--pass-green)', marginTop: '2px' }}>{"\u2713"}</span>
                                    <div>
                                      <div style={{ color: 'var(--text-main)' }}>BrowserContext.newPage</div>
                                      <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>120ms</div>
                                    </div>
                                  </div>
                                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.85rem', background: 'rgba(239, 68, 68, 0.1)', padding: '0.5rem', borderLeft: '2px solid var(--fail-red)' }}>
                                    <span style={{ color: 'var(--fail-red)', marginTop: '2px' }}>{"\u2717"}</span>
                                    <div>
                                      <div style={{ color: 'var(--text-main)', fontWeight: 500 }}>locator.click(#submit)</div>
                                      <div style={{ color: 'var(--fail-red)', fontSize: '0.75rem', marginTop: '0.2rem' }}>TimeoutError: locator resolved to hidden element</div>
                                      <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>30001ms</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : (
                            <div style={{ flex: 1, background: 'var(--bg-surface)', display: 'flex', flexDirection: 'column', height: '400px', overflowY: 'auto' }}>
                              <div style={{ display: 'grid', gridTemplateColumns: '80px 80px 100px 1fr 80px', padding: '0.75rem 1rem', borderBottom: '1px solid var(--border-subtle)', position: 'sticky', top: 0, background: 'var(--bg-surface)', fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                <div>Status</div><div>Method</div><div>Type</div><div>URL</div><div>Time</div>
                              </div>
                              {allStatusCodes.slice(0, 10).map((item, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                  style={{ display: 'grid', gridTemplateColumns: '80px 80px 100px 1fr 80px', padding: '0.5rem 1rem', borderBottom: '1px solid var(--border-subtle)', fontSize: '0.85rem', color: 'var(--text-main)', alignItems: 'center' }}
                                >
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: getStatusColor(item.code) }}></span>
                                    <span>{item.code}</span>
                                  </div>
                                  <div style={{ fontWeight: 500, color: item.method === 'GET' ? 'var(--pass-green)' : item.method === 'POST' ? 'var(--warning-amber)' : 'var(--color-teal)' }}>{item.method}</div>
                                  <div>Fetch/XHR</div>
                                  <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--text-muted)' }}>{item.url}</div>
                                  <div>{item.time}</div>
                                </motion.div>
                              ))}
                            </div>
                          )}
                        </div>
                      </GlassPanel>
                    </motion.div>
                  </motion.div>
                )}

                {/* --- ACTIVITY LOG --- */}
                {activeTab === 'activity' && (
                  <motion.div key="activity" variants={staggerContainer} initial="hidden" animate="show" exit={{ opacity: 0 }}>
                    <motion.div variants={fadeSlideUp}>
                      <GlassPanel style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                          <h3 style={{ color: 'var(--color-teal)' }}>Activity Log</h3>
                          <div className="input-field" style={{ padding: '0.4rem 0.8rem', width: 'min(250px, 100%)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span>{"\uD83D\uDD0D"}</span> <input type="text" placeholder="Search activities..." style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', outline: 'none', width: '100%' }} />
                          </div>
                        </div>

                        <div className="grid-stats">
                          {[
                            { label: 'Total Activities (24h)', value: '1,248', color: 'var(--color-teal)' },
                            { label: 'Auto-Heals', value: '24', color: 'var(--warning-amber)' },
                            { label: 'CI/CD Runs', value: '18', color: 'var(--color-plum)' },
                            { label: 'Config Changes', value: '7', color: 'var(--pass-green)' },
                          ].map((stat, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                              style={{ background: 'var(--bg-input)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-subtle)', borderLeft: `3px solid ${stat.color}` }}
                            >
                              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.3rem' }}>{stat.label}</div>
                              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-main)' }}>{stat.value}</div>
                            </motion.div>
                          ))}
                        </div>

                        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                          <div className="grid-activity-header" style={{ borderBottom: '1px solid var(--border-subtle)', fontWeight: 600, color: 'var(--text-muted)' }}>
                            <div>Timestamp</div><div>User/System</div><div>Action Detail</div><div>Type</div>
                          </div>

                          {[
                            { time: '10:45:22', user: 'System', action: 'Auto-healed Web Locator for #login-btn', type: 'Heal', color: 'var(--warning-amber)' },
                            { time: '10:42:15', user: 'CI/CD Pipeline', action: 'Triggered Test Suite: Regression_V1.2', type: 'Run', color: 'var(--color-teal)' },
                            { time: '10:35:05', user: 'John Doe', action: 'Modified Environment Variable: STAGING_URL', type: 'Config', color: 'var(--pass-green)' },
                            { time: '10:28:44', user: 'System', action: 'Completed full regression -- 142 passed, 3 failed', type: 'Report', color: 'var(--color-plum)' },
                            { time: '10:15:10', user: 'Jane Smith', action: 'Created new test suite: Payment_Flow_v2', type: 'Create', color: 'var(--color-bright-blue)' },
                          ].map((log, i) => (
                            <motion.div key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.08 }}
                              className="grid-activity-row"
                              style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-main)', background: 'var(--bg-surface)', borderRadius: '6px' }}
                            >
                              <div style={{ color: 'var(--text-muted)' }}>{log.time}</div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: log.color }}></span> {log.user}</div>
                              <div>{log.action}</div>
                              <div><span style={{ padding: '0.2rem 0.6rem', background: 'var(--bg-input)', borderRadius: '6px', fontSize: '0.75rem', border: '1px solid var(--border-subtle)' }}>{log.type}</span></div>
                            </motion.div>
                          ))}
                        </div>
                      </GlassPanel>
                    </motion.div>
                  </motion.div>
                )}

                {/* --- FALLBACK --- */}
                {activeTab !== 'dashboard' && activeTab !== 'config' && activeTab !== 'builder' && activeTab !== 'import' && activeTab !== 'traces' && activeTab !== 'activity' && (
                  <motion.div key="other" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <GlassPanel style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                      <h3>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Module Workspace</h3>
                      <p style={{ marginTop: '1rem' }}>Select another tab or begin implementing components.</p>
                    </GlassPanel>
                  </motion.div>
                )}
              </AnimatePresence>

            </main>
          </motion.div>
        )}

      </AnimatePresence>
    </>
  );
}

export default App;

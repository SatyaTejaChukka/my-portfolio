import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useIsTouchDevice } from '../hooks/useMobile';
import {
  hapticLight,
  hapticMedium,
  requestDeviceOrientation,
} from '../utils/mobile';

const Hero = () => {
  const name = 'Satya Teja Chukka';
  const letters = name.split('');
  const [isWaving, setIsWaving] = useState(false);
  const [tiltStyles, setTiltStyles] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [pullOffset, setPullOffset] = useState(0);
  const [tiltEnabled, setTiltEnabled] = useState(false);
  const touchStartY = useRef(0);
  const isTouch = useIsTouchDevice();
  const reduceMotion = useReducedMotion();

  const enableTilt = useCallback(async () => {
    const granted = await requestDeviceOrientation();
    setTiltEnabled(granted);
    return granted;
  }, []);

  useEffect(() => {
    if (!tiltEnabled) return undefined;

    const handleDeviceOrientation = (event) => {
      const { gamma, beta } = event;
      if (gamma === null || beta === null) return;

      const maxTilt = 20;
      const xTilt = (Math.min(Math.max(gamma, -30), 30) / 30) * maxTilt;
      const yTilt = (Math.min(Math.max(beta - 45, -30), 30) / 30) * maxTilt;
      setTiltStyles({ x: xTilt, y: yTilt });
    };

    window.addEventListener('deviceorientation', handleDeviceOrientation, true);
    return () =>
      window.removeEventListener('deviceorientation', handleDeviceOrientation, true);
  }, [tiltEnabled]);

  useEffect(() => {
    if (!isTouch || tiltEnabled) return undefined;

    const tryEnable = () => {
      enableTilt();
    };

    window.addEventListener('touchstart', tryEnable, { once: true, passive: true });
    return () => window.removeEventListener('touchstart', tryEnable);
  }, [isTouch, tiltEnabled, enableTilt]);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY || 0);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isTouch || reduceMotion) return undefined;

    const onTouchStart = (e) => {
      touchStartY.current = e.touches[0]?.clientY ?? 0;
    };

    const onTouchMove = (e) => {
      if (window.scrollY > 8) {
        setPullOffset(0);
        return;
      }
      const currentY = e.touches[0]?.clientY ?? 0;
      const delta = currentY - touchStartY.current;
      if (delta > 0) {
        setPullOffset(Math.min(delta * 0.35, 36));
      } else {
        setPullOffset(0);
      }
    };

    const onTouchEnd = () => setPullOffset(0);

    const hero = document.getElementById('home');
    if (!hero) return undefined;

    hero.addEventListener('touchstart', onTouchStart, { passive: true });
    hero.addEventListener('touchmove', onTouchMove, { passive: true });
    hero.addEventListener('touchend', onTouchEnd, { passive: true });
    hero.addEventListener('touchcancel', onTouchEnd, { passive: true });

    return () => {
      hero.removeEventListener('touchstart', onTouchStart);
      hero.removeEventListener('touchmove', onTouchMove);
      hero.removeEventListener('touchend', onTouchEnd);
      hero.removeEventListener('touchcancel', onTouchEnd);
    };
  }, [isTouch, reduceMotion]);

  const scrollParallax = reduceMotion
    ? { x: 0, y: 0 }
    : { x: scrollY * 0.018, y: scrollY * 0.012 };

  const combinedTilt = tiltEnabled
    ? tiltStyles
    : scrollParallax;

  const handleTap = () => {
    if (isWaving) return;
    hapticMedium();
    setIsWaving(true);
    enableTilt();
    window.setTimeout(() => setIsWaving(false), letters.length * 40 + 600);
  };

  return (
    <section id="home" className="hero overflow-hidden relative">
      <div className="absolute inset-0 z-0">
        <motion.div
          className="hero-bg-circle"
          animate={{
            x: combinedTilt.x * -1.5,
            y: combinedTilt.y * -1.5,
          }}
          transition={{ type: 'tween', ease: 'easeOut', duration: 0.15 }}
          style={{ top: '10%', left: '10%', background: 'var(--primary)' }}
        />
        <motion.div
          className="hero-bg-circle"
          animate={{
            x: combinedTilt.x * 2,
            y: combinedTilt.y * 2,
          }}
          transition={{ type: 'tween', ease: 'easeOut', duration: 0.15 }}
          style={{
            bottom: '10%',
            right: '10%',
            background: 'var(--secondary)',
            animationDelay: '2s',
          }}
        />
      </div>

      <motion.div
        className="container hero-content"
        animate={{ y: pullOffset }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-xl hero-greeting mb-4">Hello, I&apos;m</h2>
          <h1
            className="hero-title"
            onClick={handleTap}
            style={{ cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}
            aria-label="Interactive name: tap for animation"
          >
            {letters.map((letter, index) => (
              <motion.span
                key={index}
                animate={
                  isWaving
                    ? {
                        scale: [1, 1.25, 1],
                        textShadow: [
                          '0px 0px 0px transparent',
                          '0px 0px 12px rgb(0, 243, 255)',
                          '0px 0px 0px transparent',
                        ],
                        color: ['var(--text-main)', '#fff', 'var(--text-main)'],
                      }
                    : {}
                }
                transition={
                  isWaving
                    ? {
                        duration: 0.5,
                        delay: index * 0.035,
                        ease: 'easeInOut',
                      }
                    : { type: 'spring', stiffness: 300 }
                }
                whileHover={
                  !isTouch
                    ? {
                        scale: 1.2,
                        textShadow: '0px 0px 8px rgb(0, 243, 255)',
                      }
                    : undefined
                }
                whileTap={
                  isTouch
                    ? {
                        scale: 1.15,
                        textShadow: '0px 0px 10px rgb(0, 243, 255)',
                      }
                    : undefined
                }
                style={{ display: 'inline-block' }}
                className={`hero-title-letter ${letter === ' ' ? 'mr-4' : ''}`}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </h1>

          <h3 className="hero-subtitle">B.Tech CSE (AI & ML) Student</h3>
          <p className="hero-desc">
            Building backend APIs and machine-learning applications using Python,
            FastAPI, and core ML libraries.
          </p>

          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <span className="hero-badge-dot" />
            Open to Software Engineering & ML Internships
          </motion.div>

          <div className="flex justify-center gap-4">
            <motion.a
              href="#projects"
              className="btn btn-primary"
              whileTap={{ scale: 0.96 }}
              onClick={() => hapticLight()}
            >
              View Work
            </motion.a>
            <motion.a
              href="#contact"
              className="btn btn-outline glass-panel"
              whileTap={{ scale: 0.96 }}
              onClick={() => hapticLight()}
            >
              Contact Me
            </motion.a>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="scroll-indicator"
      >
        <ArrowDown />
      </motion.div>
    </section>
  );
};

export default Hero;

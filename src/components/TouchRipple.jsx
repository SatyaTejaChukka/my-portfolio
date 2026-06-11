import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  isTouchDevice,
  prefersReducedMotion,
  shouldSkipTouchEffect,
} from '../utils/mobile';

const MAX_RIPPLES = 3;
const RIPPLE_LIFETIME = 650;

const TouchRipple = () => {
  const [ripples, setRipples] = useState([]);
  const [enabled] = useState(
    () => isTouchDevice() && !prefersReducedMotion()
  );
  const idRef = useRef(0);

  const spawnRipple = useCallback((x, y) => {
    const id = ++idRef.current;
    setRipples((prev) => {
      const next = [...prev, { id, x, y }];
      return next.length > MAX_RIPPLES ? next.slice(-MAX_RIPPLES) : next;
    });

    window.setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, RIPPLE_LIFETIME);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;

    const onTouchStart = (e) => {
      const touch = e.touches[0];
      if (!touch) return;
      if (shouldSkipTouchEffect(e.target)) return;
      spawnRipple(touch.clientX, touch.clientY);
    };

    document.addEventListener('touchstart', onTouchStart, { passive: true });
    return () => document.removeEventListener('touchstart', onTouchStart);
  }, [enabled, spawnRipple]);

  if (!enabled && ripples.length === 0) return null;

  return (
    <div className="touch-ripple-layer" aria-hidden="true">
      <AnimatePresence>
        {ripples.map((ripple) => (
          <React.Fragment key={ripple.id}>
            <motion.span
              className="touch-ripple-dot"
              style={{ left: ripple.x, top: ripple.y }}
              initial={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
              animate={{ opacity: 0, scale: 0.5, x: '-50%', y: '-50%' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            />
            <motion.span
              className="touch-ripple-ring"
              style={{ left: ripple.x, top: ripple.y }}
              initial={{
                opacity: 0.85,
                scale: 0.4,
                x: '-50%',
                y: '-50%',
              }}
              animate={{ opacity: 0, scale: 2.2, x: '-50%', y: '-50%' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            />
          </React.Fragment>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TouchRipple;

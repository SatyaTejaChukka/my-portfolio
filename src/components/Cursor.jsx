import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const SPRING_DOT  = { stiffness: 2000, damping: 60, mass: 0.2 };
const SPRING_RING = { stiffness: 180,  damping: 22, mass: 0.6 };

const Cursor = () => {
  const [visible, setVisible]   = useState(false);
  const [hovering, setHovering] = useState(false);
  const [isTouchDevice] = useState(() =>
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: coarse)').matches
  );

  // Raw mouse position (dot follows instantly via spring with high stiffness)
  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  // Dot: very tight spring — almost instant
  const dotX = useSpring(rawX, SPRING_DOT);
  const dotY = useSpring(rawY, SPRING_DOT);

  // Ring: slow spring — creates the lag effect
  const ringX = useSpring(rawX, SPRING_RING);
  const ringY = useSpring(rawY, SPRING_RING);

  const ringSize = hovering ? 52 : 32;
  const ringOpacity = hovering ? 0.9 : 0.55;

  useEffect(() => {
    if (isTouchDevice) return;

    const onMove = (e) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);

    const onElementEnter = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea, select, label')) {
        setHovering(true);
      }
    };
    const onElementLeave = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea, select, label')) {
        setHovering(false);
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseenter', onEnter);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseover', onElementEnter);
    document.addEventListener('mouseout', onElementLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseenter', onEnter);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseover', onElementEnter);
      document.removeEventListener('mouseout', onElementLeave);
    };
  }, [isTouchDevice, visible, rawX, rawY]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Outer lagging ring */}
      <motion.div
        className="cursor-ring"
        style={{
          x: ringX,
          y: ringY,
          width: ringSize,
          height: ringSize,
          opacity: visible ? ringOpacity : 0,
          translateX: '-50%',
          translateY: '-50%',
          scale: hovering ? 1.3 : 1,
        }}
        transition={{ scale: { type: 'spring', stiffness: 200, damping: 20 } }}
      />

      {/* Inner precision dot */}
      <motion.div
        className="cursor-dot"
        style={{
          x: dotX,
          y: dotY,
          opacity: visible ? 1 : 0,
          translateX: '-50%',
          translateY: '-50%',
          scale: hovering ? 0 : 1,
        }}
        transition={{ scale: { duration: 0.15 } }}
      />
    </>
  );
};

export default Cursor;

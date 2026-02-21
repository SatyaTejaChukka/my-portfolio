import React, { useRef, useCallback } from 'react';

/**
 * SpotlightCard
 * Wraps any card with a mouse-tracking radial gradient spotlight effect.
 *
 * Props:
 *  - children  : card content
 *  - className : extra classes (forwarded to wrapper div)
 *  - color     : spotlight colour  (default: 'rgba(0, 243, 255, 0.12)')
 *  - style     : extra inline styles
 */
const SpotlightCard = ({
  children,
  className = '',
  color = 'rgba(0, 243, 255, 0.12)',
  style = {},
  ...rest
}) => {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--spotlight-x', `${x}px`);
    card.style.setProperty('--spotlight-y', `${y}px`);
    card.style.setProperty('--spotlight-color', color);
    card.style.setProperty('--spotlight-opacity', '1');
  }, [color]);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--spotlight-opacity', '0');
  }, []);

  return (
    <div
      ref={cardRef}
      className={`spotlight-card ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {/* Spotlight radial layer */}
      <div className="spotlight-overlay" aria-hidden="true" />
      {children}
    </div>
  );
};

export default SpotlightCard;

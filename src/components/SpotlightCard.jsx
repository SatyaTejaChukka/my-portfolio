import React, { useRef, useCallback } from 'react';
import { useIsTouchDevice } from '../hooks/useMobile';

/**
 * SpotlightCard
 * Wraps any card with a mouse/touch-tracking radial gradient spotlight effect.
 */
const SpotlightCard = ({
  children,
  className = '',
  color = 'rgba(0, 243, 255, 0.12)',
  style = {},
  ...rest
}) => {
  const cardRef = useRef(null);
  const fadeTimerRef = useRef(null);
  const isTouch = useIsTouchDevice();

  const setSpotlight = useCallback(
    (x, y) => {
      const card = cardRef.current;
      if (!card) return;

      card.style.setProperty('--spotlight-x', `${x}px`);
      card.style.setProperty('--spotlight-y', `${y}px`);
      card.style.setProperty('--spotlight-color', color);
      card.style.setProperty(
        '--spotlight-opacity',
        isTouch ? '1' : '1'
      );
      card.classList.add('spotlight-card--active');
    },
    [color, isTouch]
  );

  const clearSpotlight = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--spotlight-opacity', '0');
    card.classList.remove('spotlight-card--active');
  }, []);

  const scheduleFade = useCallback(() => {
    if (fadeTimerRef.current) {
      window.clearTimeout(fadeTimerRef.current);
    }
    fadeTimerRef.current = window.setTimeout(clearSpotlight, 320);
  }, [clearSpotlight]);

  const rectRef = useRef(null);

  const updateFromClient = useCallback(
    (clientX, clientY) => {
      const card = cardRef.current;
      if (!card) return;

      if (!rectRef.current) {
        rectRef.current = card.getBoundingClientRect();
      }
      
      const rect = rectRef.current;
      setSpotlight(clientX - rect.left, clientY - rect.top);
    },
    [setSpotlight]
  );

  const handleMouseMove = useCallback(
    (e) => {
      updateFromClient(e.clientX, e.clientY);
    },
    [updateFromClient]
  );

  const handleMouseEnter = useCallback(() => {
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    rectRef.current = null;
    clearSpotlight();
  }, [clearSpotlight]);

  const handleTouchStart = useCallback(
    (e) => {
      const touch = e.touches[0];
      if (!touch) return;
      if (cardRef.current) {
        rectRef.current = cardRef.current.getBoundingClientRect();
      }
      updateFromClient(touch.clientX, touch.clientY);
    },
    [updateFromClient]
  );

  const handleTouchMove = useCallback(
    (e) => {
      const touch = e.touches[0];
      if (!touch) return;
      updateFromClient(touch.clientX, touch.clientY);
    },
    [updateFromClient]
  );

  const handleTouchEnd = useCallback(() => {
    rectRef.current = null;
    scheduleFade();
  }, [scheduleFade]);

  return (
    <div
      ref={cardRef}
      className={`spotlight-card ${isTouch ? 'spotlight-card--touch' : ''} ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      {...rest}
    >
      <div className="spotlight-overlay" aria-hidden="true" />
      {children}
    </div>
  );
};

export default SpotlightCard;

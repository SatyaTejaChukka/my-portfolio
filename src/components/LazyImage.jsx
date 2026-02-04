import React, { useState, useRef, useEffect } from 'react';

/**
 * LazyImage component with intersection observer for lazy loading
 * Provides blur-up placeholder effect, smooth transitions, and fallback emoji support
 */
const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  placeholderClassName = '',
  wrapperClassName = '',
  fallbackEmoji = '🖼️',
  width,
  height,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px 0px', // Start loading 50px before entering viewport
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div 
      ref={imgRef} 
      className={`lazy-image-wrapper ${wrapperClassName}`}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Placeholder/Skeleton - show while loading */}
      {!isLoaded && (
        <div 
          className={`lazy-image-placeholder ${placeholderClassName}`}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, var(--bg-card) 0%, rgba(0, 243, 255, 0.05) 100%)',
            animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 'inherit',
          }}
        >
          <span className="lazy-image-loading-emoji" style={{ fontSize: '2rem', opacity: 0.4 }}>
            {fallbackEmoji}
          </span>
        </div>
      )}
      
      {/* Error Fallback - show emoji if image fails to load */}
      {hasError && (
        <div 
          className="lazy-image-fallback"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, var(--bg-card) 0%, rgba(0, 243, 255, 0.1) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 'inherit',
          }}
        >
          <span style={{ fontSize: '3rem' }}>{fallbackEmoji}</span>
        </div>
      )}
      
      {/* Actual Image - only load when in view */}
      {isInView && !hasError && (
        <img
          src={src}
          alt={alt}
          className={className}
          onLoad={handleLoad}
          onError={handleError}
          width={width}
          height={height}
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.6s ease-in-out',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: 'inherit',
          }}
          loading="eager"
          decoding="async"
          fetchPriority="low"
          {...props}
        />
      )}
    </div>
  );
};

export default LazyImage;

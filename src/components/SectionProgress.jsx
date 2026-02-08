import React, { useEffect, useState } from 'react';

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

const SectionProgress = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      setProgress(nextProgress);

      const navOffset = 90;
      const scrollPosition = scrollTop + navOffset;
      let current = sections[0]?.id ?? 'home';
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element && scrollPosition >= element.offsetTop) {
          current = section.id;
        }
      });
      setActiveSection(current);
    };

    const handleScroll = () => {
      if (rafId) {
        return;
      }
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        updateProgress();
      });
    };

    updateProgress();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <nav className="section-progress" aria-label="Section progress">
      <div className="section-progress-track">
        <span
          className="section-progress-fill"
          style={{ height: `${progress * 100}%` }}
          aria-hidden="true"
        />
      </div>
      <div className="section-progress-dots">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`section-progress-dot ${isActive ? 'active' : ''}`}
              aria-label={`Jump to ${section.label}`}
              aria-current={isActive ? 'true' : undefined}
            >
              <span className="section-progress-label">{section.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
};

export default SectionProgress;

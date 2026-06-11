import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Home, User, FolderKanban, Briefcase, Mail } from 'lucide-react';
import { hapticLight } from '../utils/mobile';
import { useIsMobileNav } from '../hooks/useMobile';

const sections = [
  { id: 'home', label: 'Home', Icon: Home },
  { id: 'about', label: 'About', Icon: User },
  { id: 'projects', label: 'Projects', Icon: FolderKanban },
  { id: 'experience', label: 'Experience', Icon: Briefcase },
  { id: 'contact', label: 'Contact', Icon: Mail },
];

const MobileSectionNav = () => {
  const isMobile = useIsMobileNav();
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    if (!isMobile) return undefined;

    let rafId = 0;

    const updateActive = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
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

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        updateActive();
      });
    };

    updateActive();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [isMobile]);

  if (!isMobile) return null;

  const handleNavClick = () => {
    hapticLight();
  };

  return (
    <nav className="mobile-section-nav" aria-label="Section navigation">
      <div className="mobile-section-nav-pill">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          const SectionIcon = section.Icon;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`mobile-section-nav-item ${isActive ? 'active' : ''}`}
              aria-label={`Jump to ${section.label}`}
              aria-current={isActive ? 'page' : undefined}
              onClick={handleNavClick}
            >
              {isActive && (
                <motion.span
                  layoutId="mobile-nav-active"
                  className="mobile-section-nav-active-bg"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <SectionIcon size={18} className="mobile-section-nav-icon" />
              <span className="mobile-section-nav-label">{section.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileSectionNav;

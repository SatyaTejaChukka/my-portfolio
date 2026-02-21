import React, { Suspense, lazy, useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import SectionProgress from './components/SectionProgress';
import ErrorBoundary, { SectionErrorBoundary } from './components/ErrorBoundary';
import { registerServiceWorker, isOffline, onOnlineStatusChange } from './utils/registerSW';
import Cursor from './components/Cursor';

// Lazy load components for code splitting
const About = lazy(() => import('./components/About'));
const Projects = lazy(() => import('./components/Projects'));
const Experience = lazy(() => import('./components/Experience'));
const Contact = lazy(() => import('./components/Contact'));

// Loading fallback component
const SectionLoader = () => (
  <div className="section-loader">
    <div className="loader-spinner" />
  </div>
);

function App() {
  const [isOnline, setIsOnline] = useState(!isOffline());

  // Register service worker on mount
  useEffect(() => {
    registerServiceWorker();
  }, []);

  useEffect(() => {
    const cleanup = onOnlineStatusChange(setIsOnline);
    return cleanup;
  }, []);

  // Scroll to top on page load/reload
  useEffect(() => {
    // Disable browser's scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <ErrorBoundary>
      <div className="app">
        <Cursor />
        <Navbar />
        <main id="main-content" tabIndex="-1">
          <SectionErrorBoundary sectionName="Hero">
            <Hero />
          </SectionErrorBoundary>
          <SectionErrorBoundary sectionName="About">
            <Suspense fallback={<SectionLoader />}>
              <About />
            </Suspense>
          </SectionErrorBoundary>
          <SectionErrorBoundary sectionName="Projects">
            <Suspense fallback={<SectionLoader />}>
              <Projects />
            </Suspense>
          </SectionErrorBoundary>
          <SectionErrorBoundary sectionName="Experience">
            <Suspense fallback={<SectionLoader />}>
              <Experience />
            </Suspense>
          </SectionErrorBoundary>
          <SectionErrorBoundary sectionName="Contact">
            <Suspense fallback={<SectionLoader />}>
              <Contact />
            </Suspense>
          </SectionErrorBoundary>
        </main>
        <Footer />
        <SectionProgress />
        <ScrollToTop />
        {!isOnline && (
          <div className="offline-indicator" role="status" aria-live="polite">
            You&apos;re offline. Some features may be unavailable.
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;

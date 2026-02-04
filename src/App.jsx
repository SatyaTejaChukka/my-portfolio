import React, { Suspense, lazy, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import ErrorBoundary, { SectionErrorBoundary } from './components/ErrorBoundary';
import { registerServiceWorker } from './utils/registerSW';

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
  // Register service worker on mount
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return (
    <ErrorBoundary>
      <div className="app">
        <Navbar />
        <main>
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
      </div>
    </ErrorBoundary>
  );
}

export default App;

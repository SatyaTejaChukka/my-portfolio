import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';
import LazyImage from './LazyImage';
import SpotlightCard from './SpotlightCard';


/* ------------------ Animation Variants ------------------ */

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

// Desktop: animate on scroll with opacity
const cardVariantsDesktop = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 14,
    },
  },
};

// Mobile: always visible, just slight y animation
const cardVariantsMobile = {
  hidden: {
    opacity: 1,
    y: 0,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};


/* ------------------ Data ------------------ */

const projectsData = [
  /* ---------- AI / ML Projects ---------- */

  {
    id: 1,
    title: 'Stroke Prediction App',
    category: 'AI',
    image: '/my-portfolio/projects/stroke-prediction.png',
    fallbackEmoji: '🧠',
    description:
      'A comprehensive machine learning application that predicts stroke risk by analyzing patient health data including age, hypertension, heart disease, glucose levels, and BMI. Features include interactive data visualization, model comparison (Random Forest, XGBoost, Logistic Regression), and a REST API built with FastAPI for real-time predictions.',
    features: ['Risk Assessment Dashboard', 'Multiple ML Models', 'Real-time Predictions', 'Data Visualization'],
    tech: ['Python', 'Pandas', 'Numpy', 'FastAPI', 'Scikit-learn', 'Machine Learning'],
    github: 'https://github.com/SatyaTejaChukka',
    demo: 'https://stroke-prediction-app.vercel.app/',
    screenshots: ['/my-portfolio/projects/stroke-prediction.png'],
    caseStudy: {
      summary:
        'ML-driven web app that estimates stroke risk and compares model performance with a production-ready API.',
      problem:
        'Provide an accessible, reliable way to assess stroke risk from multiple health indicators with clear model insights.',
      solution:
        'Built a data pipeline, trained multiple classifiers, exposed a FastAPI prediction endpoint, and designed a dashboard for model comparison.',
      impact:
        'Enables fast, transparent risk assessment with measurable accuracy and explainable feature inputs.',
      role: 'End-to-end delivery: data prep, model training, API design, and UI.',
      highlights: ['Model benchmarking', 'Real-time API scoring', 'Insightful visualizations'],
    },
  },
  {
    id: 2,
    title: 'House Price Prediction',
    category: 'AI',
    image: '/my-portfolio/projects/house-price.png',
    fallbackEmoji: '🏠',
    description:
      'An end-to-end regression-based ML project that predicts Boston house prices using features like crime rate, number of rooms, property tax, and proximity to employment centers. Implements feature engineering, cross-validation, and hyperparameter tuning with a Flask web interface for user-friendly predictions.',
    features: ['Feature Engineering', 'Cross-Validation', 'Interactive Web UI', 'Model Explainability'],
    tech: ['Python', 'Pandas', 'Numpy', 'Flask', 'Scikit-learn', 'Regression'],
    github: 'https://github.com/SatyaTejaChukka',
    demo: 'https://bostonhousepricing-qi28.onrender.com/',
    screenshots: ['/my-portfolio/projects/house-price.png'],
    caseStudy: {
      summary:
        'Regression pipeline with a clean Flask UI to predict housing prices from key market features.',
      problem:
        'Accurately estimate house prices while keeping the experience understandable for non-technical users.',
      solution:
        'Engineered features, tuned models with cross-validation, and shipped a lightweight web interface for instant predictions.',
      impact:
        'Improved prediction quality and packaged insights into a simple, usable tool.',
      role: 'Modeling, tuning, API integration, and frontend integration.',
      highlights: ['Feature engineering', 'Cross-validation', 'User-friendly UI'],
    },
  },
  {
    id: 3,
    title: 'Traffic Accident Prediction',
    category: 'AI',
    image: '/my-portfolio/projects/traffic-accident.png',
    fallbackEmoji: '🚦',
    description:
      'A predictive analytics system that forecasts traffic accident severity using historical data including weather conditions, road characteristics, time of day, and location. Utilizes ensemble methods and feature importance analysis to identify key risk factors for road safety improvement.',
    features: ['Severity Classification', 'Weather Integration', 'Geospatial Analysis', 'Risk Factor Identification'],
    tech: ['Python', 'Pandas', 'FastAPI', 'Scikit-learn', 'Machine Learning'],
    github: 'https://github.com/SatyaTejaChukka/traffic-accident',
    demo: 'https://traffic-accident-prediction.vercel.app/',
    screenshots: ['/my-portfolio/projects/traffic-accident.png'],
    caseStudy: {
      summary:
        'Predictive system that classifies traffic accident severity using historical and environmental features.',
      problem:
        'Identify which conditions most influence accident severity to improve road safety planning.',
      solution:
        'Built ensemble models, analyzed feature importance, and surfaced risk drivers through an API-backed interface.',
      impact:
        'Highlights high-risk scenarios and supports data-informed safety interventions.',
      role: 'Model development, evaluation, and API delivery.',
      highlights: ['Severity classification', 'Weather-aware modeling', 'Risk factor analysis'],
    },
  },

    /* ---------- Web / Frontend Projects ---------- */

  {
    id: 4,
    title: 'Namaste Codes to ICD-11 Mapping',
    category: 'Web',
    image: '/my-portfolio/projects/namaste-icd.png',
    fallbackEmoji: '🩺',
    description:
      'A healthcare data processing solution that maps Indian Namaste medical codes to international ICD-11 standards. Features fuzzy matching algorithms, hierarchical code traversal, and a PostgreSQL database for efficient querying. Designed to improve healthcare interoperability and standardization.',
    features: ['Fuzzy Matching', 'Hierarchical Mapping', 'Database Integration', 'API Documentation'],
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'Data Processing', 'Healthcare Data'],
    github: 'https://github.com/SatyaTejaChukka/namaste_to_icd',
    demo: 'https://namaste-to-icd11.vercel.app/',
    screenshots: ['/my-portfolio/projects/namaste-icd.png'],
    caseStudy: {
      summary:
        'Healthcare data mapper that aligns Namaste codes with ICD-11 using fuzzy matching and hierarchy traversal.',
      problem:
        'Local medical codes lack interoperability with global ICD-11 standards, slowing analytics and reporting.',
      solution:
        'Implemented fuzzy search, hierarchical resolution, and a PostgreSQL-backed API to deliver accurate mappings.',
      impact:
        'Accelerates code normalization and improves downstream clinical data quality.',
      role: 'Backend architecture, data processing, and API documentation.',
      highlights: ['Fuzzy matching', 'Hierarchical resolution', 'PostgreSQL optimization'],
    },
  },
  {
    id: 5,
    title: 'Bloch Sphere Explorer',
    category: 'Web',
    image: '/my-portfolio/projects/bloch-sphere.png',
    fallbackEmoji: '⚛️',
    description:
      'An interactive 3D visualization tool for exploring quantum computing concepts through Bloch sphere representations. Allows users to manipulate qubit states, apply quantum gates, and observe state transformations in real-time using Three.js for rendering and Qiskit for quantum simulations.',
    features: ['3D Visualization', 'Quantum Gate Operations', 'Multi-Qubit Support', 'Educational Tooltips'],
    tech: ['React', 'JavaScript', 'Three.js', 'Qiskit'],
    github: 'https://github.com/SatyaTejaChukka',
    demo: 'https://bloch-sphere-explorer.vercel.app/',
    screenshots: ['/my-portfolio/projects/bloch-sphere.png'],
    caseStudy: {
      summary:
        'Interactive 3D Bloch sphere for visualizing qubit states and quantum gate transformations.',
      problem:
        'Quantum state transformations are hard to grasp without strong visual intuition.',
      solution:
        'Combined Three.js rendering with Qiskit simulations to let users manipulate and observe qubit changes in real time.',
      impact:
        'Turns abstract quantum concepts into an intuitive, hands-on learning experience.',
      role: '3D visualization, state simulation, and UX design.',
      highlights: ['Real-time 3D controls', 'Gate visualization', 'Educational tooltips'],
    },
  },
  {
    id: 6,
    title: 'Interview Master',
    category: 'Web',
    image: '/my-portfolio/projects/interview-master.png',
    fallbackEmoji: '🎤',
    description:
      'A comprehensive interview preparation platform that helps users organize questions by category, track their preparation progress, and practice with timed mock sessions. Features include customizable question banks, performance analytics, and spaced repetition for effective learning.',
    features: ['Question Bank', 'Progress Tracking', 'Mock Interviews', 'Performance Analytics'],
    tech: ['React', 'JavaScript', 'Frontend Development'],
    github: 'https://github.com/SatyaTejaChukka/interviewmaster',
    demo: 'https://interview-master.vercel.app/',
    screenshots: ['/my-portfolio/projects/interview-master.png'],
    caseStudy: {
      summary:
        'Interview prep platform that organizes practice questions and tracks readiness over time.',
      problem:
        'Candidates struggle to structure preparation and measure progress consistently.',
      solution:
        'Built a categorized question bank, timed practice mode, and analytics to guide daily prep.',
      impact:
        'Creates a repeatable workflow and improves prep consistency.',
      role: 'Frontend architecture, UX design, and progress tracking.',
      highlights: ['Question banks', 'Mock interview timer', 'Progress analytics'],
    },
  },
  {
    id: 7,
    title: 'WealthSync',
    category: 'Web',
    image: '/my-portfolio/projects/wealthsync.png',
    fallbackEmoji: '💰',
    description:
      'A full-stack personal finance application for tracking income, expenses, and budgets with visual reports. Features include transaction categorization, monthly spending analysis, budget goal setting, and data export capabilities. Built with a FastAPI backend and PostgreSQL for secure data storage.',
    features: ['Expense Tracking', 'Budget Goals', 'Visual Reports', 'Data Export'],
    tech: ['React', 'JavaScript', 'FastAPI', 'PostgreSQL', 'Frontend Development'],
    github: 'https://github.com/SatyaTejaChukka/money_manage',
    demo: 'https://wealthsync-lemon.vercel.app/',
    screenshots: ['/my-portfolio/projects/wealthsync.png'],
    caseStudy: {
      summary:
        'Full-stack personal finance manager for tracking income, spending, and budgets with visual reports.',
      problem:
        'Personal budgeting tools often lack clarity and real-time insights.',
      solution:
        'Built a FastAPI + PostgreSQL backend with a React dashboard for categorization and monthly analysis.',
      impact:
        'Improves visibility into spending patterns and budget goals.',
      role: 'Backend integration, data modeling, and dashboard UI.',
      highlights: ['Expense categorization', 'Budget goals', 'Export-ready reports'],
    },
  },
];

const CATEGORIES = ['All', 'Web', 'AI'];


/* ------------------ Component ------------------ */

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeShot, setActiveShot] = useState(0);

  const openCaseStudy = (project) => {
    setSelectedProject(project);
    setActiveShot(0);
  };

  const closeCaseStudy = () => {
    setSelectedProject(null);
  };

  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredProjects =
    filter === 'All'
      ? projectsData
      : projectsData.filter((p) => p.category === filter);

  const caseStudy = selectedProject?.caseStudy ?? {};
  const screenshots =
    selectedProject?.screenshots?.length
      ? selectedProject.screenshots
      : selectedProject
        ? [selectedProject.image]
        : [];
  const highlightItems =
    caseStudy.highlights?.length
      ? caseStudy.highlights
      : selectedProject?.features ?? [];

  const advanceShot = (direction) => {
    if (screenshots.length <= 1) {
      return;
    }
    setActiveShot((prev) => {
      const next = (prev + direction + screenshots.length) % screenshots.length;
      return next;
    });
  };

  React.useEffect(() => {
    if (!selectedProject) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }
      if (event.key === 'Escape') {
        closeCaseStudy();
      }
      if (event.key === 'ArrowRight' && screenshots.length > 1) {
        event.preventDefault();
        advanceShot(1);
      }
      if (event.key === 'ArrowLeft' && screenshots.length > 1) {
        event.preventDefault();
        advanceShot(-1);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedProject, screenshots.length]);

  return (
    <section id="projects" className="section">
      <div className="container">
        {/* Title */}
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Featured <span className="text-gradient">Projects</span>
        </motion.h2>

        {/* Filters */}
        <div className="filter-container">
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        {isDesktop ? (
          // Desktop: Animate on scroll
          <motion.div
            key={filter}
            className="projects-grid"
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          >
            {filteredProjects.map((project) => (
              <SpotlightCard key={project.id} className="relative project-card glass-panel group">
              <motion.div
                variants={cardVariantsDesktop}
                className="h-full"
              >
                {/* Project Image with Lazy Loading */}
                <div className="project-img-container">
                  <LazyImage
                    width={600}
                    height={800}
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    className="project-screenshot"
                    fallbackEmoji={project.fallbackEmoji}
                    wrapperClassName="project-img-wrapper"
                  />
                </div>

                {/* Base Content */}
                <div className="project-info">
                  <span className="text-xs font-bold text-[var(--primary)] mb-2 block">
                    {project.category.toUpperCase()}
                  </span>

                  <h3 className="project-title">
                    {project.title}
                  </h3>

                  <div className="project-description-wrapper">
                    <p className="text-[var(--text-muted)] text-sm project-description">
                      {project.description}
                    </p>
                    <span className="project-description-hint">Hover to read more</span>
                    <div className="project-description-full">
                      {project.description}
                    </div>
                  </div>

                  {/* Key Features */}
                  {project.features && (
                    <div className="project-features">
                      {project.features.map((feature) => (
                        <span key={feature} className="project-feature-tag">
                          ✓ {feature}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="project-tech-list">
                    {project.tech.map((t) => (
                      <span key={t} className="project-tech-pill">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="project-actions">
                    <button
                      type="button"
                      className="project-action-btn case-study-btn"
                      onClick={() => openCaseStudy(project)}
                      title="Open Case Study"
                    >
                      Case Study
                    </button>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-action-btn"
                        title="View Live Demo"
                      >
                        <ExternalLink size={16} />
                        Live
                      </a>
                    )}

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-action-btn"
                      title="View Source Code"
                    >
                      <Github size={16} />
                      Code
                    </a>
                  </div>
                </div>
              </motion.div>
              </SpotlightCard>
            ))}
          </motion.div>
        ) : (
          // Mobile: Always visible, no scroll animation
          <div key={filter} className="projects-grid">
            {filteredProjects.map((project) => (
              <SpotlightCard key={project.id} className="relative project-card glass-panel group">
              <div
                className="h-full"
              >
                {/* Project Image with Lazy Loading */}
                <div className="project-img-container">
                  <LazyImage
                    width={600}
                    height={800}
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    className="project-screenshot"
                    fallbackEmoji={project.fallbackEmoji}
                    wrapperClassName="project-img-wrapper"
                  />
                </div>

                {/* Base Content */}
                <div className="project-info">
                  <span className="text-xs font-bold text-[var(--primary)] mb-2 block">
                    {project.category.toUpperCase()}
                  </span>

                  <h3 className="project-title">
                    {project.title}
                  </h3>

                  <div className="project-description-wrapper">
                    <p className="text-[var(--text-muted)] text-sm project-description">
                      {project.description}
                    </p>
                    <span className="project-description-hint">Tap to read more</span>
                    <div className="project-description-full">
                      {project.description}
                    </div>
                  </div>

                  {/* Key Features */}
                  {project.features && (
                    <div className="project-features">
                      {project.features.map((feature) => (
                        <span key={feature} className="project-feature-tag">
                          ✓ {feature}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="project-tech-list">
                    {project.tech.map((t) => (
                      <span key={t} className="project-tech-pill">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="project-actions">
                    <button
                      type="button"
                      className="project-action-btn case-study-btn"
                      onClick={() => openCaseStudy(project)}
                      title="Open Case Study"
                    >
                      Case Study
                    </button>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-action-btn"
                        title="View Live Demo"
                      >
                        <ExternalLink size={16} />
                        Live
                      </a>
                    )}

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-action-btn"
                      title="View Source Code"
                    >
                      <Github size={16} />
                      Code
                    </a>
                  </div>
                </div>
              </div>
              </SpotlightCard>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="case-study-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCaseStudy}
          >
            <motion.div
              className="case-study-dialog"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="case-study-title"
            >
              <div className="case-study-header">
                <div>
                  <span className="case-study-kicker">{selectedProject.category}</span>
                  <h3 className="case-study-title" id="case-study-title">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  type="button"
                  className="case-study-close"
                  onClick={closeCaseStudy}
                  aria-label="Close case study"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="case-study-body">
                <div className="case-study-gallery">
                  <div className="case-study-hero">
                    <LazyImage
                      src={screenshots[activeShot]}
                      alt={`${selectedProject.title} screenshot`}
                      className="case-study-hero-img"
                      fallbackEmoji={selectedProject.fallbackEmoji}
                      wrapperClassName="case-study-hero-wrapper"
                    />
                  </div>
                  {screenshots.length > 1 && (
                    <div className="case-study-thumbs">
                      {screenshots.map((shot, index) => (
                        <button
                          key={`${shot}-${index}`}
                          type="button"
                          className={`case-study-thumb ${index === activeShot ? 'active' : ''}`}
                          onClick={() => setActiveShot(index)}
                          aria-label={`View screenshot ${index + 1}`}
                        >
                          <img src={shot} alt="" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="case-study-details">
                  <p className="case-study-summary">
                    {caseStudy.summary || selectedProject.description}
                  </p>

                  <div className="case-study-meta">
                    <div className="case-study-meta-item">
                      <span className="case-study-meta-label">Category</span>
                      <span className="case-study-meta-value">
                        {selectedProject.category}
                      </span>
                    </div>
                    {caseStudy.role && (
                      <div className="case-study-meta-item">
                        <span className="case-study-meta-label">Role</span>
                        <span className="case-study-meta-value">{caseStudy.role}</span>
                      </div>
                    )}
                  </div>

                  {caseStudy.problem && (
                    <div className="case-study-section">
                      <h4 className="case-study-section-title">Problem</h4>
                      <p className="case-study-section-text">{caseStudy.problem}</p>
                    </div>
                  )}

                  {caseStudy.solution && (
                    <div className="case-study-section">
                      <h4 className="case-study-section-title">Solution</h4>
                      <p className="case-study-section-text">{caseStudy.solution}</p>
                    </div>
                  )}

                  {caseStudy.impact && (
                    <div className="case-study-section">
                      <h4 className="case-study-section-title">Impact</h4>
                      <p className="case-study-section-text">{caseStudy.impact}</p>
                    </div>
                  )}

                  {highlightItems.length > 0 && (
                    <div className="case-study-section">
                      <h4 className="case-study-section-title">Highlights</h4>
                      <div className="case-study-highlights">
                        {highlightItems.map((item) => (
                          <span key={item} className="case-study-highlight">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="case-study-section">
                    <h4 className="case-study-section-title">Tech Stack</h4>
                    <div className="case-study-tech">
                      {selectedProject.tech.map((tech) => (
                        <span key={tech} className="project-tech-pill">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="case-study-links">
                    {selectedProject.demo && (
                      <a
                        href={selectedProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-action-btn"
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </a>
                    )}
                    {selectedProject.github && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-action-btn"
                      >
                        <Github size={16} />
                        Source Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Projects;

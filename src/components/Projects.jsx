import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import LazyImage from './LazyImage';

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

const cardVariants = {
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
  },
  {
    id: 7,
    title: 'Money Manage',
    category: 'Web',
    image: '/my-portfolio/projects/money-manage.png',
    fallbackEmoji: '💰',
    description:
      'A full-stack personal finance application for tracking income, expenses, and budgets with visual reports. Features include transaction categorization, monthly spending analysis, budget goal setting, and data export capabilities. Built with a FastAPI backend and PostgreSQL for secure data storage.',
    features: ['Expense Tracking', 'Budget Goals', 'Visual Reports', 'Data Export'],
    tech: ['React', 'JavaScript', 'FastAPI', 'PostgreSQL', 'Frontend Development'],
    github: 'https://github.com/SatyaTejaChukka/money_manage',
    demo: 'https://money-manage-app.vercel.app/',
  },
];

const CATEGORIES = ['All', 'Web', 'AI'];


/* ------------------ Component ------------------ */

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

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
        <motion.div
          key={filter}
          layout
          className="projects-grid"
          variants={gridVariants}
          initial="hidden"
          animate={isDesktop ? "hidden" : "visible"}
          whileInView={isDesktop ? "visible" : undefined}
          viewport={isDesktop ? { once: true, margin: "0px 0px -100px 0px" } : undefined}
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                variants={cardVariants}
                className="relative project-card glass-panel group overflow-hidden"
                whileHover={{ y: -8, boxShadow: '0 12px 30px rgba(0, 243, 255, 0.15)' }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Project Image with Lazy Loading */}
                <div className="project-img-container">
                  <LazyImage
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
                    {project.demo && (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-action-btn"
                        title="View Live Demo"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink size={16} />
                        Live
                      </motion.a>
                    )}

                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-action-btn"
                      title="View Source Code"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={16} />
                      Code
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;

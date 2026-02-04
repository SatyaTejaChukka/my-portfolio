import React, { Component } from 'react';

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree,
 * logs errors, and displays a fallback UI
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console (could be sent to error reporting service)
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
    
    // Optional: Send to error reporting service
    // logErrorToService(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="error-boundary">
          <div className="error-boundary-content glass-panel">
            <div className="error-icon">⚠️</div>
            <h3 className="error-title">Something went wrong</h3>
            <p className="error-message">
              {this.props.message || "We're sorry, but something unexpected happened."}
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="error-details">
                <summary>Error Details</summary>
                <pre>{this.state.error.toString()}</pre>
                {this.state.errorInfo && (
                  <pre>{this.state.errorInfo.componentStack}</pre>
                )}
              </details>
            )}
            <button 
              onClick={this.handleRetry}
              className="btn btn-primary error-retry-btn"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Section-specific Error Boundary with minimal UI
 */
export const SectionErrorBoundary = ({ children, sectionName }) => (
  <ErrorBoundary
    message={`Failed to load ${sectionName || 'this section'}. Please try refreshing the page.`}
    fallback={
      <div className="section-error">
        <div className="section-error-content">
          <span className="section-error-icon">📦</span>
          <p>Unable to load {sectionName || 'content'}</p>
          <button 
            onClick={() => window.location.reload()}
            className="btn btn-outline section-error-btn"
          >
            Refresh Page
          </button>
        </div>
      </div>
    }
  >
    {children}
  </ErrorBoundary>
);

/**
 * Image Error Boundary - shows placeholder on image load failure
 */
export const ImageErrorBoundary = ({ children, fallbackEmoji = '🖼️' }) => (
  <ErrorBoundary
    fallback={
      <div className="image-error-fallback">
        <span className="image-error-emoji">{fallbackEmoji}</span>
      </div>
    }
  >
    {children}
  </ErrorBoundary>
);

export default ErrorBoundary;

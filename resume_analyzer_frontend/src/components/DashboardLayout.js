import React from 'react';
import './DashboardLayout.css';

/**
 * PUBLIC_INTERFACE
 * DashboardLayout Component - Main layout wrapper with navigation
 * @param {ReactNode} children - Child components to render
 */
const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-brand">
            <span className="brand-icon">🤖</span>
            <h1 className="brand-title">AI Resume Analyzer</h1>
          </div>
          <div className="navbar-actions">
            <a 
              href="https://vscode-internal-36100-beta.beta01.cloud.kavia.ai:3001/docs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="nav-link"
            >
              📚 API Docs
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-wrapper">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">
          Powered by Google Gemini AI • Built with React
        </p>
      </footer>
    </div>
  );
};

export default DashboardLayout;

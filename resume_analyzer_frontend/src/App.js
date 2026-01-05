import React, { useState } from 'react';
import './App.css';
import DashboardLayout from './components/DashboardLayout';
import UploadArea from './components/UploadArea';
import JobRoleInput from './components/JobRoleInput';
import AnalyzeResults from './components/AnalyzeResults';
import { uploadResume, analyzeResume } from './utils/apiClient';

/**
 * PUBLIC_INTERFACE
 * Main App Component - AI Resume Analyzer Dashboard
 */
function App() {
  const [resumeText, setResumeText] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [error, setError] = useState(null);

  /**
   * Handle file upload
   */
  const handleFileUpload = async (file) => {
    setIsUploading(true);
    setError(null);
    setAnalysisResults(null);

    try {
      const response = await uploadResume(file);
      setResumeText(response.text);
      showNotification('✅ Resume uploaded successfully!', 'success');
    } catch (err) {
      setError(err.message);
      showNotification('❌ Failed to upload resume', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  /**
   * Handle text paste
   */
  const handleTextPaste = (text) => {
    setResumeText(text);
    setAnalysisResults(null);
    showNotification('✅ Resume text saved!', 'success');
  };

  /**
   * Handle resume analysis
   */
  const handleAnalyze = async (jobRole) => {
    if (!resumeText) {
      setError('Please upload or paste your resume first');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await analyzeResume(resumeText, jobRole);
      setAnalysisResults(response);
      showNotification('✅ Analysis complete!', 'success');
      
      // Scroll to results
      setTimeout(() => {
        document.querySelector('.analyze-results')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    } catch (err) {
      setError(err.message);
      showNotification('❌ Analysis failed', 'error');
    } finally {
      setIsAnalyzing(false);
    }
  };

  /**
   * Show notification toast
   */
  const showNotification = (message, type) => {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 10);

    // Remove after 3 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  };

  return (
    <DashboardLayout>
      <div className="app-container">
        {/* Hero Section */}
        <div className="hero-section">
          <h1 className="hero-title">
            AI-Powered Resume Analysis
          </h1>
          <p className="hero-subtitle">
            Upload your resume and get instant AI-driven insights to land your dream job
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="error-banner">
            <span className="error-icon">⚠️</span>
            <span>{error}</span>
            <button className="error-close" onClick={() => setError(null)}>×</button>
          </div>
        )}

        {/* Upload Section */}
        <section className="section">
          <UploadArea
            onUpload={handleFileUpload}
            onTextPaste={handleTextPaste}
            isLoading={isUploading}
          />
        </section>

        {/* Job Role Input Section */}
        {resumeText && (
          <section className="section">
            <JobRoleInput
              onAnalyze={handleAnalyze}
              isLoading={isAnalyzing}
              hasResumeText={!!resumeText}
            />
          </section>
        )}

        {/* Analysis Results Section */}
        {analysisResults && (
          <section className="section">
            <AnalyzeResults results={analysisResults} />
          </section>
        )}

        {/* Loading Overlay */}
        {(isUploading || isAnalyzing) && (
          <div className="loading-overlay">
            <div className="loading-content">
              <div className="loading-spinner"></div>
              <p className="loading-text">
                {isUploading ? 'Uploading resume...' : 'Analyzing with AI...'}
              </p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default App;

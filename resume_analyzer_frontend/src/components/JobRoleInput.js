import React, { useState } from 'react';
import './JobRoleInput.css';

/**
 * PUBLIC_INTERFACE
 * JobRoleInput Component - Input field for target job role
 * @param {Function} onAnalyze - Callback when analyze button is clicked
 * @param {boolean} isLoading - Loading state indicator
 * @param {boolean} hasResumeText - Whether resume text is available
 */
const JobRoleInput = ({ onAnalyze, isLoading, hasResumeText }) => {
  const [jobRole, setJobRole] = useState('');

  /**
   * Handle form submission
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (jobRole.trim()) {
      onAnalyze(jobRole.trim());
    }
  };

  return (
    <div className="job-role-container">
      <form onSubmit={handleSubmit} className="job-role-form">
        <div className="input-group">
          <label htmlFor="jobRole" className="input-label">
            🎯 Target Job Role
          </label>
          <input
            id="jobRole"
            type="text"
            className="job-role-input"
            placeholder="e.g., Senior Software Engineer, Product Manager, Data Scientist"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            disabled={isLoading || !hasResumeText}
          />
        </div>
        <button
          type="submit"
          className="analyze-btn"
          disabled={isLoading || !hasResumeText || !jobRole.trim()}
        >
          {isLoading ? (
            <>
              <span className="spinner"></span>
              Analyzing...
            </>
          ) : (
            <>
              ✨ Analyze Resume
            </>
          )}
        </button>
      </form>
      {!hasResumeText && (
        <p className="hint-text">Please upload or paste your resume first</p>
      )}
    </div>
  );
};

export default JobRoleInput;

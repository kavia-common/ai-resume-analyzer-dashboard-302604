import React from 'react';
import './AnalyzeResults.css';

/**
 * PUBLIC_INTERFACE
 * AnalyzeResults Component - Displays resume analysis results in dashboard format
 * @param {Object} results - Analysis results from the API
 */
const AnalyzeResults = ({ results }) => {
  if (!results) return null;

  const { analysis } = results;

  /**
   * Render score circle with animated percentage
   */
  const ScoreCircle = ({ score, label }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;
    
    // Determine color based on score
    let color = '#EF4444'; // red for low scores
    if (score >= 70) color = '#10B981'; // green for high scores
    else if (score >= 50) color = '#F59E0B'; // amber for medium scores

    return (
      <div className="score-circle-container">
        <svg className="score-circle" width="120" height="120">
          <circle
            className="score-circle-bg"
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
          />
          <circle
            className="score-circle-progress"
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
          />
          <text
            x="60"
            y="60"
            textAnchor="middle"
            dy="8"
            className="score-text"
            fill={color}
          >
            {score}%
          </text>
        </svg>
        <p className="score-label">{label}</p>
      </div>
    );
  };

  /**
   * Render skill tag with color coding
   */
  const SkillTag = ({ skill, type = 'present' }) => {
    const className = `skill-tag skill-tag-${type}`;
    return <span className={className}>{skill}</span>;
  };

  /**
   * Render metric card
   */
  const MetricCard = ({ icon, title, value, description }) => (
    <div className="metric-card">
      <div className="metric-icon">{icon}</div>
      <div className="metric-content">
        <h4 className="metric-title">{title}</h4>
        <p className="metric-value">{value}</p>
        {description && <p className="metric-description">{description}</p>}
      </div>
    </div>
  );

  return (
    <div className="analyze-results">
      <div className="results-header">
        <h2 className="results-title">📊 Analysis Results</h2>
        <p className="results-subtitle">AI-powered insights for your resume</p>
      </div>

      {/* Overall Score Section */}
      <div className="score-section">
        <ScoreCircle score={analysis.overallScore} label="Overall Match Score" />
      </div>

      {/* Key Metrics Grid */}
      <div className="metrics-grid">
        <MetricCard
          icon="💼"
          title="Experience Match"
          value={`${analysis.experienceMatch}%`}
          description="How well your experience aligns"
        />
        <MetricCard
          icon="🎓"
          title="Skills Match"
          value={`${analysis.skillsMatch}%`}
          description="Technical skills alignment"
        />
        <MetricCard
          icon="📝"
          title="Content Quality"
          value={`${analysis.contentQuality}%`}
          description="Resume structure and clarity"
        />
        <MetricCard
          icon="🎯"
          title="Keywords Match"
          value={`${analysis.keywordsMatch}%`}
          description="Industry-relevant keywords"
        />
      </div>

      {/* Skills Section */}
      <div className="section-card">
        <h3 className="section-title">✅ Skills Found</h3>
        <div className="skills-container">
          {analysis.skillsFound && analysis.skillsFound.length > 0 ? (
            analysis.skillsFound.map((skill, index) => (
              <SkillTag key={index} skill={skill} type="present" />
            ))
          ) : (
            <p className="empty-message">No specific skills identified</p>
          )}
        </div>
      </div>

      <div className="section-card">
        <h3 className="section-title">⚠️ Missing Skills</h3>
        <div className="skills-container">
          {analysis.missingSkills && analysis.missingSkills.length > 0 ? (
            analysis.missingSkills.map((skill, index) => (
              <SkillTag key={index} skill={skill} type="missing" />
            ))
          ) : (
            <p className="empty-message">No critical skills missing</p>
          )}
        </div>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="two-column-grid">
        <div className="section-card">
          <h3 className="section-title">💪 Strengths</h3>
          <ul className="list">
            {analysis.strengths && analysis.strengths.length > 0 ? (
              analysis.strengths.map((strength, index) => (
                <li key={index} className="list-item strength-item">{strength}</li>
              ))
            ) : (
              <p className="empty-message">No strengths identified</p>
            )}
          </ul>
        </div>

        <div className="section-card">
          <h3 className="section-title">🔧 Areas for Improvement</h3>
          <ul className="list">
            {analysis.weaknesses && analysis.weaknesses.length > 0 ? (
              analysis.weaknesses.map((weakness, index) => (
                <li key={index} className="list-item weakness-item">{weakness}</li>
              ))
            ) : (
              <p className="empty-message">No improvements needed</p>
            )}
          </ul>
        </div>
      </div>

      {/* Recommendations */}
      <div className="section-card recommendations">
        <h3 className="section-title">💡 Recommendations</h3>
        <ul className="list">
          {analysis.recommendations && analysis.recommendations.length > 0 ? (
            analysis.recommendations.map((rec, index) => (
              <li key={index} className="list-item recommendation-item">{rec}</li>
            ))
          ) : (
            <p className="empty-message">No specific recommendations</p>
          )}
        </ul>
      </div>

      {/* Summary */}
      {analysis.summary && (
        <div className="section-card summary">
          <h3 className="section-title">📋 Summary</h3>
          <p className="summary-text">{analysis.summary}</p>
        </div>
      )}
    </div>
  );
};

export default AnalyzeResults;

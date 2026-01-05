/**
 * API Client for Resume Analyzer Backend
 * Handles all communication with the backend endpoints
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://vscode-internal-36100-beta.beta01.cloud.kavia.ai:3001';

/**
 * PUBLIC_INTERFACE
 * Upload a resume file to the backend
 * @param {File} file - The resume file (PDF or DOCX)
 * @returns {Promise<Object>} - Response with extracted text
 */
export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append('resume', file);

  try {
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to upload resume');
    }

    return await response.json();
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

/**
 * PUBLIC_INTERFACE
 * Analyze resume text for a specific job role
 * @param {string} resumeText - The resume text to analyze
 * @param {string} jobRole - The target job role
 * @returns {Promise<Object>} - Analysis results from Gemini AI
 */
export const analyzeResume = async (resumeText, jobRole) => {
  try {
    const response = await fetch(`${API_BASE_URL}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resumeText,
        jobRole,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to analyze resume');
    }

    return await response.json();
  } catch (error) {
    console.error('Analysis error:', error);
    throw error;
  }
};

/**
 * PUBLIC_INTERFACE
 * Check backend health status
 * @returns {Promise<Object>} - Health status
 */
export const checkHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/`);
    return await response.json();
  } catch (error) {
    console.error('Health check error:', error);
    throw error;
  }
};

import React, { useState, useRef } from 'react';
import './UploadArea.css';

/**
 * PUBLIC_INTERFACE
 * UploadArea Component - Handles resume file upload or text paste
 * @param {Function} onUpload - Callback when file is uploaded successfully
 * @param {Function} onTextPaste - Callback when text is pasted
 * @param {boolean} isLoading - Loading state indicator
 */
const UploadArea = ({ onUpload, onTextPaste, isLoading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [mode, setMode] = useState('upload'); // 'upload' or 'paste'
  const [pastedText, setPastedText] = useState('');
  const fileInputRef = useRef(null);

  /**
   * Handle drag events for file upload
   */
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  /**
   * Handle file drop
   */
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  /**
   * Handle file selection
   */
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  /**
   * Validate and process uploaded file
   */
  const handleFile = (file) => {
    // Validate file type
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a PDF or DOCX file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    onUpload(file);
  };

  /**
   * Handle browse button click
   */
  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  /**
   * Handle text paste submission
   */
  const handleTextSubmit = () => {
    if (pastedText.trim().length < 50) {
      alert('Please paste a valid resume (at least 50 characters)');
      return;
    }
    onTextPaste(pastedText);
  };

  return (
    <div className="upload-area-container">
      {/* Mode Toggle */}
      <div className="mode-toggle">
        <button
          className={`mode-btn ${mode === 'upload' ? 'active' : ''}`}
          onClick={() => setMode('upload')}
          disabled={isLoading}
        >
          📄 Upload File
        </button>
        <button
          className={`mode-btn ${mode === 'paste' ? 'active' : ''}`}
          onClick={() => setMode('paste')}
          disabled={isLoading}
        >
          📝 Paste Text
        </button>
      </div>

      {/* Upload Mode */}
      {mode === 'upload' && (
        <div
          className={`upload-area ${dragActive ? 'drag-active' : ''} ${isLoading ? 'loading' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="file-input"
            accept=".pdf,.docx"
            onChange={handleChange}
            disabled={isLoading}
          />
          
          <div className="upload-content">
            <div className="upload-icon">📤</div>
            <h3 className="upload-title">Drop your resume here</h3>
            <p className="upload-subtitle">or</p>
            <button
              className="browse-btn"
              onClick={handleBrowseClick}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Browse Files'}
            </button>
            <p className="upload-hint">Supported formats: PDF, DOCX (Max 10MB)</p>
          </div>
        </div>
      )}

      {/* Paste Mode */}
      {mode === 'paste' && (
        <div className="paste-area">
          <textarea
            className="paste-textarea"
            placeholder="Paste your resume text here..."
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
            disabled={isLoading}
          />
          <button
            className="submit-text-btn"
            onClick={handleTextSubmit}
            disabled={isLoading || pastedText.trim().length < 50}
          >
            {isLoading ? 'Processing...' : 'Submit Text'}
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadArea;

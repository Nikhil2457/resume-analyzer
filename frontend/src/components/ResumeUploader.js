import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import ResumeDetails from './ResumeDetails';
import './ResumeUploader.css';


function ResumeUploader() {
    const [file, setFile] = useState(null);
    const [analysis, setAnalysis] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setError('');
        setAnalysis(null);
    };

    const fileInputRef = React.useRef();

    const handleRemoveFile = () => {
        setFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a PDF file');
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('resume', file);

        const API_BASE_URL = 'https://resume-analyzer-backend-rcju.onrender.com';

        try {
            const response = await axios.post(`${API_BASE_URL}/api/resumes/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setAnalysis(response.data);
            setError('');
            setFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to analyze resume');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="resume-uploader">
            <div className="website-intro" style={{
                background: 'rgba(255,255,255,0.85)',
                borderRadius: '14px',
                boxShadow: '0 2px 12px rgba(79, 70, 229, 0.08)',
                padding: '1.5rem 1rem',
                marginBottom: '2rem',
                textAlign: 'center',
                animation: 'fadeIn 1.2s',
            }}>
                <h2 style={{
                    background: 'linear-gradient(90deg, #d16ba5, #69bff8, #5ffbf1)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 'bold',
                    fontSize: '2rem',
                    letterSpacing: '2px',
                    marginBottom: '0.7rem',
                }}>
                    Welcome to Resume Analyzer!
                </h2>
                <p style={{ fontSize: '1.15rem', color: '#333', marginBottom: '0.5rem' }}>
                    Instantly analyze your resume with AI-powered feedback, skill suggestions, and improvement tips. Upload your PDF resume and get a detailed breakdown of your strengths, work experience, education, and more.
                </p>
                <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0.5rem 0 0 0',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '1.2rem',
                }}>
                    <li style={{ color: '#d16ba5', fontWeight: 500 }}>AI Resume Analysis</li>
                    <li style={{ color: '#69bff8', fontWeight: 500 }}>Skill & Upskill Suggestions</li>
                    <li style={{ color: '#ba83ca', fontWeight: 500 }}>Improvement Areas</li>
                    <li style={{ color: '#41dfff', fontWeight: 500 }}>History & Search</li>
                    <li style={{ color: '#5ffbf1', fontWeight: 500 }}>Stunning Animated UI</li>
                </ul>
            </div>
            <Form onSubmit={handleSubmit} className="animated-form">
                <Form.Group controlId="formFile" className="mb-3 file-input-group">
                    <Form.Label>Upload Resume (PDF)</Form.Label>
                    <div className="file-input-wrapper">
                        <Form.Control type="file" accept="application/pdf" onChange={handleFileChange} ref={fileInputRef} aria-label="Upload resume PDF" />
                        {file && (
                            <span className="remove-file-input" title="Remove file" onClick={handleRemoveFile}>
                                &#10060;
                            </span>
                        )}
                    </div>
                    {file && (
                        <div className="file-preview">
                            <span className="file-name">{file.name}</span>
                        </div>
                    )}
                </Form.Group>
                <Button variant="primary" type="submit" disabled={loading} className="animated-button" aria-label="Analyze Resume">
                    {loading ? <Spinner animation="border" size="sm" /> : <span role="img" aria-label="upload">📤</span>}
                    {loading ? '' : ' Analyze Resume'}
                </Button>
            </Form>
            {analysis && (
                <Alert variant="success" className="mt-3 animated-alert" aria-live="polite">
                    Resume analyzed successfully!
                </Alert>
            )}
            {error && <Alert variant="danger" className="mt-3 animated-alert">{error}</Alert>}
            {analysis && <ResumeDetails analysis={analysis} />}
        </div>
    );
}

export default ResumeUploader;

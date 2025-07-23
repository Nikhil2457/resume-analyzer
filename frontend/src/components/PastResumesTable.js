import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Alert, Spinner } from 'react-bootstrap';
import ResumeDetails from './ResumeDetails';
import './PastResumesTable.css';

function PastResumesTable() {
    const [resumes, setResumes] = useState([]);
    const [selectedResume, setSelectedResume] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState('');
    const [loadingDetails, setLoadingDetails] = useState(false);
    const [detailsError, setDetailsError] = useState('');
    const [loadingTable, setLoadingTable] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('new');

    const fetchResumes = async () => {
        setLoadingTable(true);
        setError('');
        try {
            const response = await axios.get('http://localhost:5000/api/resumes');
            setResumes(response.data);
        } catch (err) {
            setError('Failed to fetch resumes');
        }
        setLoadingTable(false);
    };

    useEffect(() => {
        fetchResumes();
    }, []);

    const handleReload = () => {
        fetchResumes();
    };

    const handleShowDetails = async (id) => {
        setLoadingDetails(true);
        setDetailsError('');
        setSelectedResume(null);
        setShowModal(true);
        try {
            const response = await axios.get(`http://localhost:5000/api/resumes/${id}`);
            setSelectedResume(response.data);
        } catch (err) {
            setDetailsError('Failed to fetch resume details');
        } finally {
            setLoadingDetails(false);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedResume(null);
        setDetailsError('');
    };

    // Filter and sort resumes
    const filteredResumes = resumes
        .filter((resume) => {
            const term = searchTerm.toLowerCase();
            return (
                resume.file_name.toLowerCase().includes(term) ||
                (resume.name && resume.name.toLowerCase().includes(term))
            );
        })
        .sort((a, b) => {
            if (sortOrder === 'new') {
                return new Date(b.uploaded_at) - new Date(a.uploaded_at);
            } else {
                return new Date(a.uploaded_at) - new Date(b.uploaded_at);
            }
        });

    return (
        <div className="past-resumes-table">
            <div className="table-header">
                <h4>Past Resume Analyses</h4>
                <div className="table-controls">
                    <input
                        type="text"
                        placeholder="Search by file name or name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                        aria-label="Search resumes by file name or name"
                    />
                    <Button
                        variant={sortOrder === 'new' ? 'primary' : 'outline-primary'}
                        onClick={() => setSortOrder('new')}
                        className="animated-button sort-btn"
                        aria-label="Sort by newest"
                    >
                        Newest
                    </Button>
                    <Button
                        variant={sortOrder === 'old' ? 'primary' : 'outline-primary'}
                        onClick={() => setSortOrder('old')}
                        className="animated-button sort-btn"
                        aria-label="Sort by oldest"
                    >
                        Oldest
                    </Button>
                    <Button
                        variant="outline-info"
                        onClick={handleReload}
                        className="animated-button reload-btn"
                        aria-label="Reload resumes"
                    >
                        <span role="img" aria-label="reload">🔄</span> Reload
                    </Button>
                </div>
            </div>
            {error && <Alert variant="danger" className="animated-alert">{error}</Alert>}
            {loadingTable ? (
                <div className="details-loading">
                    <Spinner animation="border" variant="primary" className="details-spinner" />
                    <div className="details-loading-text">Loading resumes...</div>
                </div>
            ) : filteredResumes.length === 0 ? (
                <div className="no-file-message">
                    <span className="no-file-text">NO FILE EXISTS WITH THAT NAME</span>
                </div>
            ) : (
                <div className="table-scroll-x">
                    <Table striped bordered hover className="animated-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>File Name</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Uploaded At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredResumes.map((resume) => (
                                <tr key={resume.id} className="fade-in-row">
                                    <td>{resume.id}</td>
                                    <td>{resume.file_name}</td>
                                    <td>{resume.name || 'N/A'}</td>
                                    <td>{resume.email || 'N/A'}</td>
                                    <td>{new Date(resume.uploaded_at).toLocaleString()}</td>
                                    <td>
                                        <Button variant="info" onClick={() => handleShowDetails(resume.id)} className="animated-button">
                                            Details
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
            <Modal
                show={showModal}
                onHide={handleCloseModal}
                aria-labelledby="resume-details-modal"
                autoFocus
                restoreFocus
                className="animated-modal modal-fade"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="resume-details-modal">Resume Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loadingDetails && (
                        <div className="details-loading">
                            <Spinner animation="border" variant="primary" className="details-spinner" />
                            <div className="details-loading-text">Loading analysis...</div>
                        </div>
                    )}
                    {detailsError && (
                        <Alert variant="danger" className="animated-alert">{detailsError}</Alert>
                    )}
                    {selectedResume && !loadingDetails && !detailsError && (
                        <ResumeDetails analysis={selectedResume} />
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal} className="animated-button">
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default PastResumesTable;

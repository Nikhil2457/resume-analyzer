import React from 'react';
import { Card, ListGroup, Badge } from 'react-bootstrap';
import './ResumeDetails.css';

function ResumeDetails({ analysis }) {
    return (
        <div className="mt-4 animated-details">
            <h3>Resume Analysis</h3>
            <Card className="fade-in">
                <Card.Body>
                    <Card.Title>Personal Details</Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Name: {analysis.name || 'N/A'}</ListGroup.Item>
                        <ListGroup.Item>Email: {analysis.email || 'N/A'}</ListGroup.Item>
                        <ListGroup.Item>Phone: {analysis.phone || 'N/A'}</ListGroup.Item>
                        <ListGroup.Item>LinkedIn: {analysis.linkedin_url || 'N/A'}</ListGroup.Item>
                        <ListGroup.Item>Portfolio: {analysis.portfolio_url || 'N/A'}</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
            <Card className="mt-3 fade-in">
                <Card.Body>
                    <Card.Title>Summary</Card.Title>
                    <Card.Text>{analysis.summary || 'N/A'}</Card.Text>
                </Card.Body>
            </Card>
            <Card className="mt-3 fade-in">
                <Card.Body>
                    <Card.Title>Work Experience</Card.Title>
                    {analysis.work_experience?.map((exp, index) => (
                        <div key={index} className="work-exp-item">
                            <h5>{exp.role} at {exp.company}</h5>
                            <p>{exp.duration}</p>
                            <ul>
                                {exp.description?.map((desc, i) => <li key={i}>{desc}</li>)}
                            </ul>
                        </div>
                    ))}
                </Card.Body>
            </Card>
            <Card className="mt-3 fade-in">
                <Card.Body>
                    <Card.Title>Education</Card.Title>
                    {analysis.education?.map((edu, index) => (
                        <div key={index} className="edu-item">
                            <p>{edu.degree} - {edu.institution} ({edu.graduation_year})</p>
                        </div>
                    ))}
                </Card.Body>
            </Card>
            <Card className="mt-3 fade-in">
                <Card.Body>
                    <Card.Title>Skills</Card.Title>
                    <h5>Technical Skills:</h5>
                    {analysis.technical_skills?.map((skill, index) => (
                        <Badge key={index} bg="primary" className="me-1 skill-badge animated-badge">{skill}</Badge>
                    ))}
                    <h5 className="mt-2">Soft Skills:</h5>
                    {analysis.soft_skills?.map((skill, index) => (
                        <Badge key={index} bg="secondary" className="me-1 skill-badge animated-badge">{skill}</Badge>
                    ))}
                </Card.Body>
            </Card>
            <Card className="mt-3 fade-in">
                <Card.Body>
                    <Card.Title>Projects</Card.Title>
                    {analysis.projects?.map((project, index) => (
                        <div key={index} className="project-item">
                            <h5>{project.name}</h5>
                            <p>{project.description}</p>
                        </div>
                    ))}
                </Card.Body>
            </Card>
            <Card className="mt-3 fade-in">
                <Card.Body>
                    <Card.Title>Certifications</Card.Title>
                    {analysis.certifications?.map((cert, index) => (
                        <div key={index} className="cert-item">
                            <p>{cert.name} - {cert.issuer} ({cert.year})</p>
                        </div>
                    ))}
                </Card.Body>
            </Card>
            <Card className="mt-3 fade-in">
                <Card.Body>
                    <Card.Title>AI Feedback</Card.Title>
                    <p><strong>Rating:</strong> {analysis.resume_rating}/10</p>
                    <p><strong>Improvement Areas:</strong> {analysis.improvement_areas}</p>
                    <p><strong>Upskill Suggestions:</strong></p>
                    <ul>
                        {analysis.upskill_suggestions?.map((suggestion, index) => (
                            <li key={index}>{suggestion}</li>
                        ))}
                    </ul>
                </Card.Body>
            </Card>
        </div>
    );
}

export default ResumeDetails;

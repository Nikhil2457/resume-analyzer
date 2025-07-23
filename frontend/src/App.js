import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import ResumeUploader from './components/ResumeUploader';
import PastResumesTable from './components/PastResumesTable';
import './App.css';

function App() {
    const [key, setKey] = useState('upload');

    return (
        <div className="container mt-4">
            <h1 className="animated-title">Resume Analyzer</h1>
            <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
                <Tab eventKey="upload" title="Upload Resume">
                    <ResumeUploader />
                </Tab>
                <Tab eventKey="history" title="View History">
                    <PastResumesTable />
                </Tab>
            </Tabs>
        </div>
    );
}

export default App;

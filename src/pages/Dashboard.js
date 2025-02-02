import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PDFDownloadLink } from '@react-pdf/renderer'; // Add PDFDownloadLink
import Template1 from '../components/Template1'; // Import templates
import Template2 from '../components/Template2';
import './Dashboard.css';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [resumes, setResumes] = useState([]);

    // Fetch user's resumes
    useEffect(() => {
        const fetchResumes = async () => {
            try {
                const res = await axios.get('/api/resumes', {
                    headers: {
                        'x-auth-token': localStorage.getItem('token'),
                    },
                });
                setResumes(res.data);
            } catch (err) {
                console.error('Error fetching resumes:', err.response?.data || err.message);
            }
        };

        if (user) {
            fetchResumes();
        }
    }, [user]);

    const handleLogout = () => {
        logout(navigate);
    };

    return (
        <div className="dashboard-container">
            <header className="header">
                <div className="logo">
                <a href="/" className="logo" style={{ textDecoration: 'none' }}>ResumeGenius</a>
                </div>
                <nav className="nav">
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </nav>
            </header>

            <main className="main-content">
                <h1 className="main-title">Welcome, {user?.name}!</h1>
                <p className="main-subtitle">Start building your resume now.</p>
                <button onClick={() => navigate('/resume-builder')} className="cta-button">
                    Create New Resume
                </button>

                {/* Display user's resumes */}
                <div className="resumes-list">
                    <h2>Your Resumes</h2>
                    {resumes.length > 0 ? (
                        resumes.map((resume) => (
                            <div key={resume._id} className="resume-item">
                                <h3>{resume.sections.name}</h3>
                                <p>Created on: {new Date(resume.createdAt).toLocaleDateString()}</p>
                                <button onClick={() => navigate(`/resume-builder/${resume._id}`)} className="edit-button">
                                    Edit Resume
                                </button>
                                <PDFDownloadLink
                                    document={
                                        resume.templateId === "template1" ? (
                                            <Template1 resume={resume.sections} />
                                        ) : (
                                            <Template2 resume={resume.sections} />
                                        )
                                    }
                                    fileName={`${resume.sections.name}_resume.pdf`}
                                    className="download-button"
                                >
                                    {({ loading }) => (loading ? 'Generating PDF...' : 'Download PDF')}
                                </PDFDownloadLink>
                            </div>
                        ))
                    ) : (
                        <p>No resumes found. Create a new one!</p>
                    )}
                </div>
            </main>

            <footer className="footer">
                <p>&copy; 2023 ResumeGenius. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Dashboard;
import React from 'react';
import './Home.css'; // Import the CSS file

const Home = () => {
    return (
        <div className="home-container">
            <header className="header">
                <div className="logo">
                <a href="/" className="logo" style={{ textDecoration: 'none' }}>ResumeGenius</a>
                </div>
                <nav className="nav">
                    <a href="/login" className="nav-link">Login</a>
                    <a href="/signup" className="nav-link">Sign Up</a>
                </nav>
            </header>

            <main className="main-content">
                <h1 className="main-title">Craft Smarter Resumes with AI Guidance</h1>
                <p className="main-subtitle">
                    Create professional, ATS-friendly resumes with real-time AI feedback.
                </p>
                <a href="/signup" className="cta-button">Get Started</a>
            </main>

            <footer className="footer">
                <p>&copy; 2023 ResumeGenius. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <header className="header">
                <div className="logo">
                    <a href="/" className="logo">ResumeGenius</a>
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

            {/* How It Works Section */}
            <section className="how-it-works">
                <h2>How It Works</h2>
                <div className="steps">
                    <div className="step">1. Choose a template</div>
                    <div className="step">2. Enter your details</div>
                    <div className="step">3. Get AI suggestions</div>
                    <div className="step">4. Download your resume</div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features">
                <h2>Why Choose ResumeGenius?</h2>
                <ul>
                    <li>✅ AI-powered resume suggestions</li>
                    <li>✅ Professional templates</li>
                    <li>✅ ATS-optimized formatting</li>
                    <li>✅ Real-time feedback</li>
                </ul>
            </section>

            {/* Testimonials */}
            <section className="testimonials">
                <h2>What Our Users Say</h2>
                <p>"ResumeGenius helped me land my dream job!" – Alex M.</p>
                <p>"The AI suggestions made my resume stand out." – Sarah K.</p>
            </section>

            {/* FAQ Section */}
            <section className="faq">
                <h2>Frequently Asked Questions</h2>
                <details>
                    <summary>Is ResumeGenius free to use?</summary>
                    <p>Yes! You can create and download resumes for free.</p>
                </details>
                <details>
                    <summary>How does AI improve my resume?</summary>
                    <p>Our AI provides real-time feedback and optimizations for better job applications.</p>
                </details>
            </section>

            <footer className="footer">
                <p>&copy; 2025 ResumeGenius. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;

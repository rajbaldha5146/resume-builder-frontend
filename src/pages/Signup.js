import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Signup.css';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Show loader
        try {
            await signup(name, email, password, navigate);
            setTimeout(() => {
                setLoading(false); // Hide loader
                navigate('/login'); // Redirect to login page
            }, 2000); // Simulate a 2-second delay
        } catch (err) {
            console.error('Signup error:', err);
            setLoading(false); // Hide loader in case of error
        }
    };

    return (
        <div className="signup-container">
            <header className="header">
                <div className="logo">
                    <a href="/" className="logo" style={{ textDecoration: 'none' }}>ResumeGenius</a>
                </div>
                <nav className="nav">
                    <a href="/login" className="nav-link">Login</a>
                </nav>
            </header>

            <main className="main-content">
                <h1 className="main-title">Sign Up</h1>

                {/* Display errors */}
                {errors.length > 0 && (
                    <div className="error-messages">
                        <ul>
                            {errors.map((error, index) => (
                                <li key={index}>{error.msg || error.message}</li> // Handle both 'msg' and 'message'
                            ))}
                        </ul>
                    </div>
                )}


                <form onSubmit={handleSubmit} className="signup-form">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="submit-button" disabled={loading}>
                        {loading ? <div className="loader"></div> : 'Sign Up'}
                    </button>
                </form>
                {/* ... rest of the content ... */}
            </main>

            <footer className="footer">
                <p>&copy; 2025 ResumeGenius. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Signup;
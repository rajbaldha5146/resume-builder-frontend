import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Signup.css';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(name, email, password, navigate); // Pass navigate here
        } catch (err) {
            console.error('Signup error:', err);
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
                    <button type="submit" className="submit-button">Sign Up</button>
                </form>
                <p className="login-link">
                    Already have an account? <a href="/login">Login</a>
                </p>
            </main>

            <footer className="footer">
                <p>&copy; 2023 ResumeGenius. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Signup;
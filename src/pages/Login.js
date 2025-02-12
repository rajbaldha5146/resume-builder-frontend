import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Show loader
        try {
            // console.log('Login request:', { email, password });
            await login(email, password, navigate);
            // Show success toast
            toast.success('Login successful! Redirecting to dashboard...', {
                position: "top-center",
                autoClose: 2000, // Close after 2 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            // Redirect to dashboard after 2 seconds
            setTimeout(() => {
                setLoading(false); // Hide loader
                navigate('/dashboard');
            }, 2000);
        } catch (err) {
            console.error('Login error:', err);
            setLoading(false); // Hide loader in case of error
            // Show error toast
            toast.error('Login failed. Please check your email and password.', {
                position: "top-center",
                autoClose: 5000, // Close after 5 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <div className="login-container">
            {/* Add ToastContainer to render toasts */}
            <ToastContainer />
            <header className="header">
                <div className="logo">
                    <a href="/" className="logo" style={{ textDecoration: 'none' }}>ResumeGenius</a>
                </div>
                <nav className="nav">
                    <a href="/signup" className="nav-link">Sign Up</a>
                </nav>
            </header>

            <main className="main-content">
                <h1 className="main-title">Login</h1>
                <form onSubmit={handleSubmit} className="login-form">
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
                        {loading ? <div className="loader"></div> : 'Login'}
                    </button>
                </form>
                <p className="signup-link">
                    Don't have an account? <a href="/signup">Sign Up</a>
                </p>
            </main>

            <footer className="footer">
                <p>&copy; 2025 ResumeGenius. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Login;
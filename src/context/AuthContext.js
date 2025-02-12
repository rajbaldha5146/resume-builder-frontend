import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { backend_url } from '../server';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    // Set token in localStorage and axios headers
    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [token]);

    // Login function
    const login = async (email, password, navigate) => {
        try {
            const res = await axios.post(`${backend_url}/api/auth/login`, { email, password });
            setToken(res.data.token);
            setUser(res.data.user); // Ensure user is set here
            // console.log('User after login:', res.data.user); // Add this line
            navigate('/dashboard');
        } catch (err) {
            console.error('Login error:', err.response?.data?.msg || err.message);
            throw err;
        }
    };

    
    
    const signup = async (name, email, password, navigate) => {
        try {
            const res = await axios.post(`${backend_url}/api/auth/signup`, { name, email, password });
            setToken(res.data.token);
            setUser(res.data.user); // Ensure user is set here
            navigate('/dashboard'); // Redirect to dashboard after signup
        } catch (err) {
            console.error('Signup error:', err.response?.data?.msg || err.message);
            throw err;
        }
    };
    // Logout function
    const logout = (navigate) => {
        setToken('');
        setUser(null);
        navigate('/login'); // Redirect to login page after logout
    };

    return (
        <AuthContext.Provider value={{ user, token, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ResumeBuilder from './pages/ResumeBuilder'; // Import ResumeBuilder
import { useAuth } from './context/AuthContext';


function App() {
    const { user } = useAuth();

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
            {/* Add a dynamic route for editing resumes */}
            <Route path="/resume-builder/:id" element={user ? <ResumeBuilder /> : <Navigate to="/login" />} />
            <Route path="/resume-builder" element={user ? <ResumeBuilder /> : <Navigate to="/login" />} />
        </Routes>
    );
}

export default App;
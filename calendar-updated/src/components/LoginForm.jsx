import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/usercontextprovider';
import './LoginForm.css';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const { login } = useUserContext(); 
    const navigate = useNavigate();

    const roles = [
        { value: '', label: 'Select your role' },
        { value: 'Admin', label: 'GSO Director' },
        { value: 'Student', label: 'Student' },
        { value: 'Faculty/Office Assistant', label: 'Regular Faculty' },
        { value: 'Faculty/Org Adviser', label: 'Faculty Adviser' },
        { value: 'Heads/Deans', label: 'Heads/Deans' },
        { value: 'GSO Officer', label: 'GSO Officer' }
    ];

    const handleSubmit = () => {
        if (!username || !password || !role) {
            alert('Please fill in all fields');
            return;
        }

        console.log('Form submitted with:', { username, password, role });

        const userInfo = {
            username: username,
            role: role,
            loginID: Date.now(), 
        };

        const mockToken = 'mock-jwt-token-' + Date.now();

        console.log('Calling login with:', userInfo, mockToken);

        login(userInfo, mockToken);

        console.log('Login function called, attempting navigation...');

        navigate('/main/dashboard');

        console.log('Navigation attempted to /main/dashboard');
    };

    return (
        <div className="login-container">
            <div className="login-wrapper">
                {/* Header */}
                <div className="login-header">
                    <div className="logo-container">
                        <div className="logo-icon">
                            <svg
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M3 6L10 13L14 9L21 16"
                                    stroke="#FF6B6B"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M10 13L5 18L14 9L19 4"
                                    stroke="#FF6B6B"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <div className="logo-text">
                            <h1>KRONOS</h1>
                            <p>GSO Management System</p>
                        </div>
                    </div>
                    <h2 className="welcome-title">
                        Welcome to Kronos!
                    </h2>
                    <p className="welcome-subtitle">
                        Please sign in to your account
                    </p>
                </div>

                <div className="form-container">
                    <div className="form-fields">
                        <div className="field-group">
                            <label htmlFor="role" className="field-label">
                                Role
                            </label>
                            <select
                                id="role"
                                name="role"
                                required
                                className="field-select"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                {roles.map((roleOption) => (
                                    <option key={roleOption.value} value={roleOption.value}>
                                        {roleOption.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="field-group">
                            <label htmlFor="username" className="field-label">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                className="field-input"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="field-group">
                            <label htmlFor="password" className="field-label">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="field-input"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="submit-button"
                    >
                        Sign In
                    </button>

                    <div className="forgot-password">
                        <a href="#" className="forgot-password-link">
                            Forgot your password?
                        </a>
                    </div>
                </div>

                <div className="login-footer">
                    <p className="footer-text">
                        © 2024 Kronos GSO Management System. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
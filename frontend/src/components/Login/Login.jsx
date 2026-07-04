import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../../assets/logo.jpeg';

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    role: '',
    branch: '',
    email: '',
    password: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();

    // Manager/Employee ke liye branch zaroori hai
    if (loginData.role !== 'admin' && !loginData.branch) {
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (loginData.email && loginData.password) {
        localStorage.setItem('token', 'dummy-token');
        localStorage.setItem('user', JSON.stringify({
          email: loginData.email,
          role: loginData.role,
          branch: loginData.role === 'admin' ? 'all' : loginData.branch
        }));
        setIsLoggedIn(true);
        navigate('/');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-logo">
          <img src={logo} alt="SARA Electronics" className="login-logo-img" />
          <p className="logo-subtitle">Admin Panel Login</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Select Role *</label>
            <select
              className="login-input"
              value={loginData.role}
              onChange={(e) => {
                const role = e.target.value;
                setLoginData({
                  ...loginData,
                  role: role,
                  // Admin select karne par branch auto-set ho jaye
                  branch: role === 'admin' ? 'all' : ''
                });
              }}
              required
            >
              <option value="">Select Role...</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="employee">Employee</option>
            </select>
          </div>

          {/* Branch - Sirf Manager/Employee ke liye show ho */}
          {loginData.role !== 'admin' && loginData.role !== '' && (
            <div className="form-group">
              <label>Select Branch *</label>
              <select
                className="login-input"
                value={loginData.branch}
                onChange={(e) => setLoginData({ ...loginData, branch: e.target.value })}
                required={loginData.role !== 'admin'}
              >
                <option value="">Select Branch...</option>
                <option value="1">Branch 1</option>
                <option value="2">Branch 2</option>
              </select>
            </div>
          )}

          {/* Admin ke liye branch info show karein */}
          {loginData.role === 'admin' && (
            <div className="branch-info">
              <span className="info-badge">🔑 Admin - All Branches Access</span>
            </div>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              className="login-input"
              placeholder="admin@sara.com"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="login-input"
              placeholder="••••••••"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Signing In...' : 'Login'}
          </button>
        </form>

        <p className="login-footer">© 2026 SARA Electronics. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Login;
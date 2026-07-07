import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../../assets/logo.jpeg';

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    branch: '',
    role: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  // ===== FIXED CREDENTIALS =====
  const credentials = {
    admin: {
      email: 'xahmedmalik30600@gmail.com',
      password: 'password',
    },
    manager1: {
      email: 'manager1@gmail.com',
      password: 'password',
    },
    manager2: {
      email: 'manager2@gmail.com',
      password: 'password',
    },
    // ===== EMPLOYEE CREDENTIALS =====
    employee1: {
      email: 'empb1@gmail.com',
      password: 'password',
      branch: '1'
    },
    employee2: {
      email: 'empb2@gmail.com',
      password: 'password',
      branch: '2'
    },
    // Fallback employees for demo
    employee3: {
      email: 'employee1@gmail.com',
      password: 'password',
      branch: '1'
    },
    employee4: {
      email: 'employee2@gmail.com',
      password: 'password',
      branch: '2'
    }
  };

  // ===== HANDLE BRANCH SELECTION =====
  const handleBranchSelect = (branch) => {
    setLoginData({ ...loginData, branch: branch });
    setError('');
    setStep(2);
  };

  // ===== GO BACK TO BRANCH SELECTION =====
  const handleBackToBranch = () => {
    setStep(1);
    setLoginData({ ...loginData, role: '', email: '', password: '' });
    setError('');
  };

  // ===== HANDLE LOGIN =====
  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      let isValid = false;
      let userData = null;

      // ===== ADMIN CHECK =====
      if (loginData.role === 'admin') {
        if (loginData.email === credentials.admin.email && 
            loginData.password === credentials.admin.password) {
          isValid = true;
          userData = {
            email: loginData.email,
            role: 'admin',
            branch: loginData.branch
          };
        }
      } 
      // ===== MANAGER CHECK =====
      else if (loginData.role === 'manager') {
        if (loginData.email === credentials.manager1.email && 
            loginData.password === credentials.manager1.password) {
          isValid = true;
          userData = {
            email: loginData.email,
            role: 'manager',
            branch: loginData.branch
          };
        }
      } 
      // ===== EMPLOYEE CHECK =====
      else if (loginData.role === 'employee') {
        // Check empb1 (Branch 1)
        if (loginData.email === credentials.employee1.email && 
            loginData.password === credentials.employee1.password) {
          if (loginData.branch === '1') {
            isValid = true;
            userData = {
              email: loginData.email,
              role: 'employee',
              branch: '1',
              employeeId: 1
            };
          } else {
            setError('This employee is only allowed on Branch 1');
          }
        }
        // Check empb2 (Branch 2)
        else if (loginData.email === credentials.employee2.email && 
                 loginData.password === credentials.employee2.password) {
          if (loginData.branch === '2') {
            isValid = true;
            userData = {
              email: loginData.email,
              role: 'employee',
              branch: '2',
              employeeId: 2
            };
          } else {
            setError('This employee is only allowed on Branch 2');
          }
        }
        // Fallback employees
        else if (loginData.email === credentials.employee3.email && 
                 loginData.password === credentials.employee3.password) {
          isValid = true;
          userData = {
            email: loginData.email,
            role: 'employee',
            branch: loginData.branch,
            employeeId: 3
          };
        }
        else if (loginData.email === credentials.employee4.email && 
                 loginData.password === credentials.employee4.password) {
          isValid = true;
          userData = {
            email: loginData.email,
            role: 'employee',
            branch: loginData.branch,
            employeeId: 4
          };
        }
      }

      if (isValid && userData) {
        localStorage.setItem('token', 'dummy-token');
        localStorage.setItem('user', JSON.stringify(userData));
        setIsLoggedIn(true);
        // Employee ko direct employee dashboard par bhejo
        if (userData.role === 'employee') {
          navigate('/employee-dashboard');
        } else {
          navigate('/');
        }
      } else if (!error) {
        setError('Invalid credentials. Please check your email and password.');
      }
      
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-logo">
          <img src={logo} alt="SARA Electronics" className="login-logo-img" />
          <h1 className="brand-title">SARA <span>Electronics</span></h1>
          <p className="logo-subtitle">Admin Panel Login</p>
        </div>

        {/* ===== STEP 1: BRANCH SELECTION ===== */}
        {step === 1 && (
          <div className="step-branch">
            <h3 className="step-title">Select Branch</h3>
            <p className="step-hint">Please select a branch to continue</p>
            <div className="branch-grid">
              <div 
                className={`branch-card ${loginData.branch === '1' ? 'selected' : ''}`}
                onClick={() => handleBranchSelect('1')}
              >
                <div className="branch-icon">🏪</div>
                <h4>Branch 1</h4>
                <p>Main Branch</p>
              </div>
              <div 
                className={`branch-card ${loginData.branch === '2' ? 'selected' : ''}`}
                onClick={() => handleBranchSelect('2')}
              >
                <div className="branch-icon">🏪</div>
                <h4>Branch 2</h4>
                <p>Secondary Branch</p>
              </div>
            </div>
          </div>
        )}

        {/* ===== STEP 2: LOGIN FORM ===== */}
        {step === 2 && (
          <form onSubmit={handleLogin}>
            <div className="selected-branch-info">
              <span className="branch-badge">
                📍 Branch {loginData.branch}
              </span>
              <button type="button" className="change-branch-btn" onClick={handleBackToBranch}>
                Change
              </button>
            </div>

            <div className="form-group">
              <label>Select Role *</label>
              <select
                className="login-input"
                value={loginData.role}
                onChange={(e) => {
                  setLoginData({ ...loginData, role: e.target.value });
                  setError('');
                }}
                required
              >
                <option value="">Select Role...</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="employee">Employee</option>
              </select>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                className="login-input"
                placeholder={
                  loginData.role === 'admin' ? 'xahmedmalik30600@gmail.com' :
                  loginData.role === 'manager' ? 'manager1@gmail.com' :
                  loginData.role === 'employee' ? 'empb1@gmail.com / empb2@gmail.com' :
                  'Enter your email'
                }
                value={loginData.email}
                onChange={(e) => {
                  setLoginData({ ...loginData, email: e.target.value });
                  setError('');
                }}
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
                onChange={(e) => {
                  setLoginData({ ...loginData, password: e.target.value });
                  setError('');
                }}
                required
              />
            </div>

            {error && <div className="login-error">{error}</div>}

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Signing In...' : 'Login'}
            </button>

            {/* Credentials hint */}
            <div className="credentials-hint">
              <p className="hint-title">Demo Credentials:</p>
              <div className="hint-grid">
                <div className="hint-item">
                  <strong>Admin</strong>
                  <span>xahmedmalik30600@gmail.com</span>
                  <span>password</span>
                </div>
                <div className="hint-item">
                  <strong>Manager 1</strong>
                  <span>manager1@gmail.com</span>
                  <span>password</span>
                </div>
                <div className="hint-item">
                  <strong>Employee B1</strong>
                  <span>empb1@gmail.com</span>
                  <span>password</span>
                </div>
                <div className="hint-item">
                  <strong>Employee B2</strong>
                  <span>empb2@gmail.com</span>
                  <span>password</span>
                </div>
              </div>
            </div>
          </form>
        )}

        <p className="login-footer">© 2026 SARA Electronics. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Login;
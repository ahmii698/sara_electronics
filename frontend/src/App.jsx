import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Login/Login';
import Inventory from './components/Inventory/Inventory';
import Salary from './components/Finance/Salary';
import FixedExpense from './components/Finance/FixedExpense';
import ExtraExpense from './components/Finance/ExtraExpense';
import AddAccount from './components/Accounts/AddAccount';
import Recovery from './components/Recovery/Recovery';
import AddEmployee from './components/Employees/AddEmployee';
import EmployeeExpenses from './components/Employees/EmployeeExpenses';
import EmployeeReport from './components/Employees/EmployeeReport';
import EmployeeDashboard from './components/Employees/EmployeeDashboard';
import EmployeeRecovery from './components/Employees/EmployeeRecovery';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';

// ===== PROTECTED ROUTE =====
const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Employee routes - sirf employee ko allowed
  if (user.role === 'employee') {
    if (location.pathname === '/employee-dashboard' || location.pathname === '/employee-recovery') {
      return children;
    }
    // Employee ko kisi aur page par nahi jaane dena
    return <Navigate to="/employee-dashboard" />;
  }

  // Manager restrictions
  if (user.role === 'manager' && location.pathname === '/') {
    return <Navigate to="/inventory" />;
  }

  if (user.role === 'manager') {
    const restrictedPaths = ['/finance/salary', '/finance/fixed', '/finance/extra'];
    if (restrictedPaths.includes(location.pathname)) {
      return <Navigate to="/inventory" />;
    }
  }

  // Employee dashboard aur recovery admin/manager ko nahi dikhana
  if (user.role !== 'employee') {
    if (location.pathname === '/employee-dashboard' || location.pathname === '/employee-recovery') {
      return <Navigate to="/" />;
    }
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/inventory" />;
  }

  return children;
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <BrowserRouter>
      {isLoggedIn ? (
        <div className="app-container">
          <Routes>
            {/* Admin/Manager Routes with Sidebar */}
            <Route 
              path="/*" 
              element={
                <ProtectedRoute allowedRoles={['admin', 'manager']}>
                  <div className="app-layout">
                    <Sidebar />
                    <div className="main-content">
                      <Header />
                      <div className="page-content">
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/inventory" element={<Inventory />} />
                          <Route path="/finance/salary" element={<Salary />} />
                          <Route path="/finance/fixed" element={<FixedExpense />} />
                          <Route path="/finance/extra" element={<ExtraExpense />} />
                          <Route path="/add-account" element={<AddAccount />} />
                          <Route path="/recovery" element={<Recovery />} />
                          <Route path="/employees/add" element={<AddEmployee />} />
                          <Route path="/employee-expenses" element={<EmployeeExpenses />} />
                          <Route path="/employee-report" element={<EmployeeReport />} />
                        </Routes>
                      </div>
                    </div>
                  </div>
                </ProtectedRoute>
              } 
            />

            {/* Employee Routes - No Sidebar */}
            <Route 
              path="/employee-dashboard" 
              element={
                <ProtectedRoute allowedRoles={['employee']}>
                  <EmployeeDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/employee-recovery" 
              element={
                <ProtectedRoute allowedRoles={['employee']}>
                  <EmployeeRecovery />
                </ProtectedRoute>
              } 
            />

            <Route path="/login" element={<Navigate to="/" />} />
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;
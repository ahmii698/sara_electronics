import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Package, DollarSign, Users, FileText, LogOut, ChevronDown, ChevronRight, UserPlus, Receipt, BarChart3 } from 'lucide-react';
import './Sidebar.css';
import logo from '../../assets/logo.jpeg';

const Sidebar = () => {
  const navigate = useNavigate();
  const [isFinanceOpen, setIsFinanceOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userBranch, setUserBranch] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserRole(user.role);
      setUserBranch(user.branch);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    window.location.reload();
  };

  const toggleFinance = () => {
    setIsFinanceOpen(!isFinanceOpen);
  };

  // ===== CHECK IF ADMIN =====
  const isAdmin = userRole === 'admin';
  const isManager = userRole === 'manager';
  const isEmployee = userRole === 'employee';

  // Employee ko sidebar nahi dikhana
  if (isEmployee) {
    return null;
  }

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="SARA Electronics" className="logo-image" />
        <h1 className="brand-title">SARA <span>Electronics</span></h1>
        <p className="brand-subtitle">{isAdmin ? 'ADMIN PANEL' : 'MANAGER PANEL'}</p>
        {isManager && userBranch && (
          <p className="brand-branch">Branch {userBranch}</p>
        )}
      </div>

      <nav className="sidebar-nav">
        {/* ===== DASHBOARD - SIRF ADMIN ===== */}
        {isAdmin && (
          <NavLink
            to="/"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <Home size={20} />
            <span>Dashboard</span>
          </NavLink>
        )}

        {/* ===== INVENTORY - SABKO ===== */}
        <NavLink
          to="/inventory"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <Package size={20} />
          <span>Inventory</span>
        </NavLink>

        {/* ===== FINANCE - SIRF ADMIN ===== */}
        {isAdmin && (
          <div className="nav-dropdown">
            <div className={`nav-item dropdown-toggle ${isFinanceOpen ? 'active' : ''}`} onClick={toggleFinance}>
              <DollarSign size={20} />
              <span>Finance</span>
              {isFinanceOpen ? <ChevronDown size={18} className="dropdown-icon" /> : <ChevronRight size={18} className="dropdown-icon" />}
            </div>
            
            <div className={`sub-menu ${isFinanceOpen ? 'open' : ''}`}>
              <NavLink
                to="/finance/salary"
                className={({ isActive }) => `sub-nav-item ${isActive ? 'active' : ''}`}
              >
                <span>Employee Salary</span>
              </NavLink>
              <NavLink
                to="/finance/fixed"
                className={({ isActive }) => `sub-nav-item ${isActive ? 'active' : ''}`}
              >
                <span>Fixed Expenses</span>
              </NavLink>
              <NavLink
                to="/finance/extra"
                className={({ isActive }) => `sub-nav-item ${isActive ? 'active' : ''}`}
              >
                <span>Extra Expenses</span>
              </NavLink>
            </div>
          </div>
        )}

        {/* ===== EMPLOYEE EXPENSES - SABKO (ADMIN AUR MANAGER DONO) ===== */}
        <NavLink
          to="/employee-expenses"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <Receipt size={20} />
          <span>Employee Expenses</span>
        </NavLink>

        {/* ===== EMPLOYEE REPORT - SABKO (ADMIN AUR MANAGER DONO) ===== */}
        <NavLink
          to="/employee-report"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <BarChart3 size={20} />
          <span>Employee Report</span>
        </NavLink>

        {/* ===== ADD ACCOUNT - SABKO ===== */}
        <NavLink
          to="/add-account"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <UserPlus size={20} />
          <span>Add Account</span>
        </NavLink>

        {/* ===== RECOVERY - SABKO ===== */}
        <NavLink
          to="/recovery"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <FileText size={20} />
          <span>Recovery</span>
        </NavLink>

        {/* ===== EMPLOYEES - ADMIN AUR MANAGER DONO ===== */}
        <NavLink
          to="/employees/add"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <Users size={20} />
          <span>Employees</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div className="nav-item logout-btn" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
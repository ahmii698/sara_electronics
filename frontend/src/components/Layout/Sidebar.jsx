import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Package, DollarSign, Users, FileText, LogOut, ChevronDown, ChevronRight, UserPlus } from 'lucide-react';
import './Sidebar.css';
import logo from '../../assets/logo.jpeg';

const Sidebar = () => {
  const navigate = useNavigate();
  const [isFinanceOpen, setIsFinanceOpen] = useState(false);

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/inventory', icon: Package, label: 'Inventory' },
  ];

  const financeSubItems = [
    { path: '/finance/salary', label: 'Employee Salary' },
    { path: '/finance/fixed', label: 'Fixed Expenses' },
    { path: '/finance/extra', label: 'Extra Expenses' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    window.location.reload();
  };

  const toggleFinance = () => {
    setIsFinanceOpen(!isFinanceOpen);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="SARA Electronics" className="logo-image" />
        <h1 className="brand-title">SARA <span>Electronics</span></h1>
        <p className="brand-subtitle">ADMIN PANEL</p>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}

        {/* Finance Dropdown */}
        <div className="nav-dropdown">
          <div className={`nav-item dropdown-toggle ${isFinanceOpen ? 'active' : ''}`} onClick={toggleFinance}>
            <DollarSign size={20} />
            <span>Finance</span>
            {isFinanceOpen ? <ChevronDown size={18} className="dropdown-icon" /> : <ChevronRight size={18} className="dropdown-icon" />}
          </div>
          
          <div className={`sub-menu ${isFinanceOpen ? 'open' : ''}`}>
            {financeSubItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `sub-nav-item ${isActive ? 'active' : ''}`}
              >
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>

        {/* Add Account - Alag Section */}
        <NavLink
          to="/add-account"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <UserPlus size={20} />
          <span>Add Account</span>
        </NavLink>

        <NavLink
          to="/recovery"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <FileText size={20} />
          <span>Recovery</span>
        </NavLink>

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
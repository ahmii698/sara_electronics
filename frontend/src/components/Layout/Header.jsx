import React from 'react';
import { Bell, Search } from 'lucide-react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-search">
        <Search size={20} className="search-icon" />
        <input type="text" placeholder="Search..." />
      </div>

      <div className="header-actions">
        <button className="notif-btn">
          <Bell size={20} />
          <span className="notif-badge"></span>
        </button>
        <div className="header-user">
          <div className="user-avatar">A</div>
          <div className="user-info">
            <p>Admin</p>
            <p>admin@sara.com</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
import React from 'react';
import StatsCard from './StatsCard';
import { Users, Package, DollarSign, TrendingUp } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const stats = [
    { label: 'Total Customers', value: '1,284', icon: Users, color: '#C9A84C' },
    { label: 'Products in Stock', value: '3,456', icon: Package, color: '#1A2A4A' },
    { label: 'Revenue', value: '₹54,32,000', icon: DollarSign, color: '#0A1628' },
    { label: 'Recovery Rate', value: '87%', icon: TrendingUp, color: '#C9A84C' },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <select className="branch-select">
          <option>All Branches</option>
          <option>Branch 1</option>
          <option>Branch 2</option>
        </select>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="dashboard-bottom">
        <div className="recent-card">
          <h3>Recent Transactions</h3>
          <div className="transaction-list">
            <div className="transaction-item">
              <div>
                <p className="customer">Customer #1234</p>
                <p className="due">Due: 15 Mar 2026</p>
              </div>
              <span className="amount">₹12,500</span>
            </div>
            <div className="transaction-item">
              <div>
                <p className="customer">Customer #1235</p>
                <p className="due">Due: 16 Mar 2026</p>
              </div>
              <span className="amount">₹22,500</span>
            </div>
            <div className="transaction-item">
              <div>
                <p className="customer">Customer #1236</p>
                <p className="due">Due: 17 Mar 2026</p>
              </div>
              <span className="amount">₹8,500</span>
            </div>
          </div>
        </div>

        <div className="recent-card">
          <h3>Branch Overview</h3>
          <div className="branch-overview">
            <div className="branch-row">
              <span>Branch 1</span>
              <div className="bar-track">
                <div className="bar-fill gold" style={{ width: '65%' }}></div>
              </div>
              <span>₹28,00,000</span>
            </div>
            <div className="branch-row">
              <span>Branch 2</span>
              <div className="bar-track">
                <div className="bar-fill dark" style={{ width: '60%' }}></div>
              </div>
              <span>₹26,32,000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
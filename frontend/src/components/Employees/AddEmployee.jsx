import React, { useState } from 'react';
import { UserPlus, Mail, Phone, MapPin, Briefcase } from 'lucide-react';
import './AddEmployee.css';

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    phone: '',
    branch: 1,
    role: 'employee',
    password: '',
    confirmPassword: '',
    address: '',
    salary: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Employee Created:', employee);
  };

  return (
    <div className="employee-form-container">
      <div className="form-header">
        <div className="icon-wrapper">
          <UserPlus className="icon-gold" size={28} />
        </div>
        <h2>Add New Employee</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Full Name *</label>
            <div className="input-with-icon">
              <Briefcase size={18} />
              <input
                type="text"
                className="form-input"
                placeholder="Enter employee name"
                value={employee.name}
                onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email Address *</label>
            <div className="input-with-icon">
              <Mail size={18} />
              <input
                type="email"
                className="form-input"
                placeholder="employee@company.com"
                value={employee.email}
                onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Phone Number *</label>
            <div className="input-with-icon">
              <Phone size={18} />
              <input
                type="tel"
                className="form-input"
                placeholder="03XX-XXXXXXX"
                value={employee.phone}
                onChange={(e) => setEmployee({ ...employee, phone: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Branch *</label>
            <select
              className="form-input"
              value={employee.branch}
              onChange={(e) => setEmployee({ ...employee, branch: parseInt(e.target.value) })}
            >
              <option value={1}>Branch 1</option>
              <option value={2}>Branch 2</option>
            </select>
          </div>

          <div className="form-group">
            <label>Role *</label>
            <select
              className="form-input"
              value={employee.role}
              onChange={(e) => setEmployee({ ...employee, role: e.target.value })}
            >
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="form-group">
            <label>Salary (₹)</label>
            <input
              type="number"
              className="form-input"
              placeholder="0"
              value={employee.salary}
              onChange={(e) => setEmployee({ ...employee, salary: parseInt(e.target.value) || 0 })}
            />
          </div>

          <div className="form-group">
            <label>Password *</label>
            <input
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={employee.password}
              onChange={(e) => setEmployee({ ...employee, password: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password *</label>
            <input
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={employee.confirmPassword}
              onChange={(e) => setEmployee({ ...employee, confirmPassword: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="form-group full-width">
          <label>Address</label>
          <div className="input-with-icon">
            <MapPin size={18} />
            <textarea
              className="form-input form-textarea"
              placeholder="Enter employee address"
              value={employee.address}
              onChange={(e) => setEmployee({ ...employee, address: e.target.value })}
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            Create Employee Account
          </button>
          <button type="reset" className="btn-reset">
            Clear
          </button>
        </div>

        <p className="form-footer">
          * All fields are required. Branch assignment is permanent for login access.
        </p>
      </form>
    </div>
  );
};

export default AddEmployee;
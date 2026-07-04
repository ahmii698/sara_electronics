import React, { useState } from 'react';
import './AddAccount.css';

const AddAccount = () => {
  const [account, setAccount] = useState({
    name: '',
    phone: '',
    cnic: '',
    limit: 100000,
    branch: 1,
    accountType: 'regular',
    customLimit: '',
    reason: '',
    approvalStatus: 'pending',
  });

  const [showSpecialFields, setShowSpecialFields] = useState(false);

  const handleAccountTypeChange = (e) => {
    const value = e.target.value;
    setAccount({ ...account, accountType: value });
    setShowSpecialFields(value === 'special');
    
    if (value === 'regular') {
      setAccount({ ...account, accountType: value, customLimit: '', reason: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Account Created:', account);
    alert('Account created successfully!');
  };

  return (
    <div className="add-account-container">
      <h3>Create New Account</h3>

      <form onSubmit={handleSubmit}>
        <div className="account-grid">
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter customer full name"
              value={account.name}
              onChange={(e) => setAccount({ ...account, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number *</label>
            <input
              type="tel"
              className="form-input"
              placeholder="03XX-XXXXXXX"
              value={account.phone}
              onChange={(e) => setAccount({ ...account, phone: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>CNIC *</label>
            <input
              type="text"
              className="form-input"
              placeholder="XXXXX-XXXXXXX-X"
              value={account.cnic}
              onChange={(e) => setAccount({ ...account, cnic: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Limit (₹)</label>
            <input
              type="number"
              className="form-input"
              placeholder="100000"
              value={account.limit}
              onChange={(e) => setAccount({ ...account, limit: parseInt(e.target.value) || 0 })}
              disabled={account.accountType === 'special'}
            />
            {account.accountType === 'regular' && (
              <small className="field-hint">Default limit: ₹1,00,000 for regular accounts</small>
            )}
          </div>

          <div className="form-group">
            <label>Branch *</label>
            <select
              className="form-input"
              value={account.branch}
              onChange={(e) => setAccount({ ...account, branch: parseInt(e.target.value) })}
            >
              <option value={1}>Branch 1</option>
              <option value={2}>Branch 2</option>
            </select>
          </div>

          <div className="form-group">
            <label>Account Type *</label>
            <select
              className="form-input"
              value={account.accountType}
              onChange={handleAccountTypeChange}
            >
              <option value="regular">Regular (1 Lakh Limit)</option>
              <option value="special">Special (Custom Limit - Approval Required)</option>
            </select>
          </div>
        </div>

        {/* ===== SPECIAL ACCOUNT FIELDS ===== */}
        {showSpecialFields && (
          <div className="special-fields">
            <div className="special-header">
              <span className="special-badge">⚡ Special Account</span>
              <p className="special-info">Custom limit requires admin/manager approval</p>
            </div>

            {/* ===== CUSTOM LIMIT & REASON - SIDE BY SIDE SAME SIZE ===== */}
            <div className="special-grid">
              <div className="form-group">
                <label>Custom Limit (₹) *</label>
                <input
                  type="number"
                  className="form-input special-input"
                  placeholder="Enter custom limit amount"
                  value={account.customLimit}
                  onChange={(e) => setAccount({ ...account, customLimit: e.target.value })}
                  required={showSpecialFields}
                />
                <small className="field-hint">e.g., 200000, 500000, 1000000</small>
              </div>

              <div className="form-group">
                <label>Reason for Special Limit *</label>
                <input
                  type="text"
                  className="form-input special-input"
                  placeholder="Enter reason for special limit request..."
                  value={account.reason}
                  onChange={(e) => setAccount({ ...account, reason: e.target.value })}
                  required={showSpecialFields}
                />
                <small className="field-hint">Admin will review this reason for approval</small>
              </div>
            </div>

            {/* ===== APPROVAL STATUS ===== */}
            <div className="approval-section">
              <div className="approval-info">
                <div className="approval-status">
                  <span className="status-label">Approval Status:</span>
                  <span className="status-pending">⏳ Pending</span>
                </div>
                <p className="approval-note">
                  This request will be sent to Admin/Manager for approval.
                  Account will be activated after approval.
                </p>
              </div>
            </div>
          </div>
        )}

        <button type="submit" className="account-btn">
          {showSpecialFields ? 'Submit Special Request' : 'Create Account'}
        </button>

        {showSpecialFields && (
          <p className="special-footer">
            ⚠️ Special accounts require approval from Admin or Manager.
            You will be notified once approved.
          </p>
        )}
      </form>
    </div>
  );
};

export default AddAccount;
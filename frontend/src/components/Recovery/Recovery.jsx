import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import './Recovery.css';

const Recovery = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const recoveries = [
    { id: 1, customer: 'Ahmed Khan', caseNo: 'SR-001', amount: 60000, paid: 25000, due: 35000, monthly: 5000, nextDue: '2026-04-01' },
    { id: 2, customer: 'Sara Ali', caseNo: 'SR-002', amount: 100000, paid: 100000, due: 0, monthly: 0, nextDue: 'Paid' },
    { id: 3, customer: 'Usman Malik', caseNo: 'SR-003', amount: 40000, paid: 15000, due: 25000, monthly: 4000, nextDue: '2026-03-15' },
    { id: 4, customer: 'Fatima Noor', caseNo: 'SR-004', amount: 80000, paid: 30000, due: 50000, monthly: 6000, nextDue: '2026-03-20' },
    { id: 5, customer: 'Ali Raza', caseNo: 'SR-005', amount: 50000, paid: 50000, due: 0, monthly: 0, nextDue: 'Paid' },
    { id: 6, customer: 'Zainab Khan', caseNo: 'SR-006', amount: 70000, paid: 10000, due: 60000, monthly: 7000, nextDue: '2026-04-10' },
    { id: 7, customer: 'Bilal Ahmed', caseNo: 'SR-007', amount: 30000, paid: 30000, due: 0, monthly: 0, nextDue: 'Paid' },
    { id: 8, customer: 'Hina Riaz', caseNo: 'SR-008', amount: 90000, paid: 45000, due: 45000, monthly: 5000, nextDue: '2026-03-25' },
    { id: 9, customer: 'Imran Ali', caseNo: 'SR-009', amount: 55000, paid: 20000, due: 35000, monthly: 4000, nextDue: '2026-04-05' },
    { id: 10, customer: 'Nadia Khan', caseNo: 'SR-010', amount: 75000, paid: 75000, due: 0, monthly: 0, nextDue: 'Paid' },
    { id: 11, customer: 'Omar Farooq', caseNo: 'SR-011', amount: 45000, paid: 10000, due: 35000, monthly: 5000, nextDue: '2026-03-30' },
    { id: 12, customer: 'Rabia Malik', caseNo: 'SR-012', amount: 85000, paid: 25000, due: 60000, monthly: 6000, nextDue: '2026-04-15' },
    { id: 13, customer: 'Salman Khan', caseNo: 'SR-013', amount: 65000, paid: 65000, due: 0, monthly: 0, nextDue: 'Paid' },
    { id: 14, customer: 'Tahir Abbas', caseNo: 'SR-014', amount: 50000, paid: 15000, due: 35000, monthly: 4000, nextDue: '2026-04-20' },
  ];

  const filtered = recoveries.filter(r => 
    r.customer.toLowerCase().includes(search.toLowerCase()) ||
    r.caseNo.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="recovery-container">
      <h2>Recovery Management</h2>

      <div className="table-container">
        <div className="table-header">
          <h3>Recovery Records</h3>
          <div className="search-wrapper">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              className="table-search"
              placeholder="Search by case or customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="table-scroll">
          <table className="table-data">
            <thead>
              <tr>
                <th>Case #</th>
                <th>Customer</th>
                <th>Total (₹)</th>
                <th>Paid (₹)</th>
                <th>Due (₹)</th>
                <th>Monthly</th>
                <th>Next Due</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id}>
                  <td className="case-number">{item.caseNo}</td>
                  <td className="font-medium">{item.customer}</td>
                  <td>₹{item.amount.toLocaleString()}</td>
                  <td className="paid-amount">₹{item.paid.toLocaleString()}</td>
                  <td className={item.due > 0 ? 'due-amount' : 'paid-amount'}>
                    ₹{item.due.toLocaleString()}
                  </td>
                  <td>{item.monthly > 0 ? `₹${item.monthly.toLocaleString()}` : '---'}</td>
                  <td className={item.nextDue === 'Paid' ? 'paid-amount' : ''}>
                    {item.nextDue}
                  </td>
                  <td>
                    <span className={item.due === 0 ? 'badge-active' : 'badge-pending'}>
                      {item.due === 0 ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={18} />
            Previous
          </button>
          <span className="page-info">
            Showing {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filtered.length)} of {filtered.length} records
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Recovery;
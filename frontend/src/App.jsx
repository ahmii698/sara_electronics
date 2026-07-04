import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Login/Login';
import Inventory from './components/Inventory/Inventory';
import Salary from './components/Finance/Salary';
import FixedExpense from './components/Finance/FixedExpense';
import ExtraExpense from './components/Finance/ExtraExpense';
import AddAccount from './components/Accounts/AddAccount';
import Recovery from './components/Recovery/Recovery';
import AddEmployee from './components/Employees/AddEmployee';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';

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
                <Route path="/login" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </div>
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
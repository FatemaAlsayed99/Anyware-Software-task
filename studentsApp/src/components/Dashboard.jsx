import React from 'react';
import Sidebar from './Sidebar/sidebar.jsx';
import { Outlet } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="content">
        <Outlet data-testid="outlet" />
      </div>
    </div>
  );
};

export default Dashboard;
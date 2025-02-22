import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    estimateCount: 0,
    consultationCount: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const estimateResponse = await axios.get('http://147.93.107.225:5000/get-estimates');
        const consultationResponse = await axios.get('http://147.93.107.225:5000/get-consultations');

        setDashboardData({
          estimateCount: estimateResponse.data.length,
          consultationCount: consultationResponse.data.length,
        });
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();

    const interval = setInterval(fetchCounts, 5000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome to Intora Buildtech Interior</h1>

      <div className="dashboard-summary">
        <h2>Dashboard Overview</h2>
        <div className="summary-cards">
          <div className="summary-card">
            <div className="icon">
              <i className="fas fa-file-alt"></i> 
            </div>
            <h3>Estimate Projects</h3>
            <p>{dashboardData.estimateCount}</p>
          </div>
          <div className="summary-card">
            <div className="icon">
              <i className="fas fa-calendar-check"></i> 
            </div>
            <h3>Free Consultations</h3>
            <p>{dashboardData.consultationCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

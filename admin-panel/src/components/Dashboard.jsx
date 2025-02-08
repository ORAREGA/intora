import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  // State to store dashboard data
  const [dashboardData, setDashboardData] = useState({
    estimateCount: 0,
    enquiryCount: 0,
    consultationCount: 0,
    contactCount: 0, // Added contactCount state
  });

  // Fetch the counts for estimates, enquiries, consultations, and contacts
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetching the number of entries for each form
        const estimateResponse = await axios.get('http://localhost:5000/get-estimates');
        const enquiryResponse = await axios.get('http://localhost:5000/get-enquiries');
        const consultationResponse = await axios.get('http://localhost:5000/get-consultations');
        const contactResponse = await axios.get('http://localhost:5000/contact'); // Fetching contact form data

        // Updating state with the count of entries for each form
        setDashboardData({
          estimateCount: estimateResponse.data.length,
          enquiryCount: enquiryResponse.data.length,
          consultationCount: consultationResponse.data.length,
          contactCount: contactResponse.data.length, // Set contact count
        });
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();

    // Simulate an interval to refresh counts (if needed)
    const interval = setInterval(fetchCounts, 5000); // Update every 5 seconds

    // Cleanup the interval on component unmount
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
              <i className="fas fa-file-alt"></i> {/* Example Icon */}
            </div>
            <h3>Estimate Projects</h3>
            <p>{dashboardData.estimateCount}</p>
          </div>
          <div className="summary-card">
            <div className="icon">
              <i className="fas fa-comments"></i> {/* Example Icon */}
            </div>
            <h3>Enquiries</h3>
            <p>{dashboardData.enquiryCount}</p>
          </div>
          <div className="summary-card">
            <div className="icon">
              <i className="fas fa-calendar-check"></i> {/* Example Icon */}
            </div>
            <h3>Free Consultations</h3>
            <p>{dashboardData.consultationCount}</p>
          </div>
          <div className="summary-card">
            <div className="icon">
              <i className="fas fa-phone-alt"></i> {/* Example Icon for contact */}
            </div>
            <h3>Contact Form</h3>
            <p>{dashboardData.contactCount}</p> {/* Contact count */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

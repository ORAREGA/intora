import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import Estimates from "./Estimate";
import Notifications from "./Notifications";
import FormSwitcher from "../components/FormSwitcher";

const UserLayout = () => {
  return (
    <div className="admin-layout">
      <div className="background-container">
        <div className="overlay"></div>
      </div>
      <Sidebar />
      <div className="admin-content">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/estimates" element={<Estimates />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/form" element={<FormSwitcher />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;

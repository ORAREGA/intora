import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import Estimates from "./Estimate";
import Notifications from "./Notifications";
import Banner from "./Banner";
import FormSwitcher from "../components/FormSwitcher";
import UserCreation from "./UserCreation";
import Design from "./Design"; 
import Testimonials from "./Testimonials";

const AdminLayout = () => {
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
            <Route path="/banner" element={<Banner />} />
            <Route path="/create-user" element={<UserCreation />} /> 
            <Route path="/design" element={<Design />}/>
            <Route path="/testimonials" element={<Testimonials/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

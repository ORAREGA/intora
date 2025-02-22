import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

const FormSwitcher = () => {
  const [activeForm, setActiveForm] = useState("consultation");
  const [consultationData, setConsultationData] = useState([]);

  // Fetch Consultation Data
  const fetchConsultations = async () => {
    try {
      const response = await axios.get(
        "http://147.93.107.225:5000/get-consultations"
      );
      setConsultationData(response.data);
    } catch (error) {
      console.error("Error fetching consultations:", error);
    }
  };

  // Call fetch functions when component mounts
  useEffect(() => {
    fetchConsultations();
  }, []);

  // Export Consultation Data to Excel
  const exportConsultationsToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(consultationData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Consultations");
    XLSX.writeFile(workbook, "Consultations.xlsx");
  };``

  return (
    <div className="form-containers">
      <h1>Form Management</h1>

      {activeForm === "consultation" && (
        <div className="form-section">
          <button
            onClick={exportConsultationsToExcel}
            className="export-button"
          >
            Export to Excel
          </button>
          <h3>Consultation Data:</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {consultationData.map((data, index) => (
                <tr key={index}>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.phone}</td>
                  <td>{data.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FormSwitcher;

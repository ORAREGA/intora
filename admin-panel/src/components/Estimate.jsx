import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

const Estimate = () => {
  const [estimates, setEstimates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch estimates on component mount
  useEffect(() => {
    const fetchEstimates = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get-estimates');
        setEstimates(response.data); // Save the fetched data
        setLoading(false);
      } catch (err) {
        setError("Error fetching estimates");
        setLoading(false);
      }
    };

    fetchEstimates();
  }, []); // Empty dependency array means this will run only once, after the initial render

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(estimates); // Convert data to sheet
    const workbook = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Estimates'); // Append the sheet
    XLSX.writeFile(workbook, 'Estimates.xlsx'); // Trigger a download
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='form-containers'>
      <h1>Estimates</h1>
      <p>Manage project estimates here.</p>
      <button onClick={exportToExcel} className="export-button">
        Export to Excel
      </button>

      {estimates.length > 0 ? (
        <table className="data-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>BHK Type</th>
              <th>Size</th>
              <th>Rooms Selected</th>
              <th>Kitchen Layout</th>
              <th>Kitchen Length</th>
              <th>Full Home Design Type</th>
              <th>Full Home Interior Add-Ons</th>
              <th>Layout Type</th>
              <th>Length</th>
              <th>Modular Kitchen Design Type</th>
              <th>Modular Kitchen Add-Ons</th>
              <th>Wardrobe Type</th>
              <th>Height</th>
              <th>Width</th>
              <th>Wardrobe Design Type</th>
              <th>Material Type</th>
              <th>Loft</th>
              <th>Loft Size</th>
              <th>Finishing</th>
              <th>Workspace Type</th>
              <th>Desk Type</th>
              <th>Materials Type</th>
              <th>Desk Size</th>
              <th>Workspace Layout</th>
              <th>Workspace Add-Ons</th>
            </tr>
          </thead>
          <tbody>
            {estimates.map((estimate, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{estimate.name}</td>
                <td>{estimate.mobile}</td>
                <td>{estimate.email}</td>
                <td>{estimate.bhkType}</td>
                <td>{estimate.size}</td>
                <td>{estimate.selectedRooms ? estimate.selectedRooms.join(', ') : 'N/A'}</td>
                <td>{estimate.kitchenLayout}</td>
                <td>{estimate.kitchenLength}</td>
                <td>{estimate.FullHomeInteriordesignType}</td>
                <td>{estimate.FullHomeInteriorAddOns ? estimate.FullHomeInteriorAddOns.join(', ') : 'N/A'}</td>
                <td>{estimate.layoutType}</td>
                <td>{estimate.length}</td>
                <td>{estimate.ModularKitchendesignType}</td>
                <td>{estimate.ModularKitchenAddOns ? estimate.ModularKitchenAddOns.join(', ') : 'N/A'}</td>
                <td>{estimate.wardrobeType}</td>
                <td>{estimate.height}</td>
                <td>{estimate.width}</td>
                <td>{estimate.WardrobedesignType}</td>
                <td>{estimate.materialType}</td>
                <td>{estimate.loft}</td>
                <td>{estimate.loftSize}</td>
                <td>{estimate.finishing}</td>
                <td>{estimate.workspaceType}</td>
                <td>{estimate.deskType}</td>
                <td>{estimate.materialsType}</td>
                <td>{estimate.deskSize}</td>
                <td>{estimate.workspaceLayout}</td>
                <td>{estimate.addOns ? estimate.addOns.join(', ') : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No estimates available.</p>
      )}
    </div>
  );
};

export default Estimate;

import React, { useState } from "react";

const FullHomeInteriorForm = ({ onSubmitFormData, formErrors }) => {
  const [formData, setFormData] = useState({
    bhkType: "",
    size: "",
    selectedRooms: [],
    kitchenLayout: "",
    kitchenLength: "",
    FullHomeInteriordesignType: "",
    FullHomeInteriorAddOns: [],
  });
  const [currentSection, setCurrentSection] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const handleAddonsChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const addOns = checked
        ? [...prevData.FullHomeInteriorAddOns, value]
        : prevData.FullHomeInteriorAddOns.filter((addon) => addon !== value);
      return { ...prevData, FullHomeInteriorAddOns: addOns };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      console.log(updatedData);  // Check if `bhkType` is updated
      return updatedData;
    });
  };

  const handleRoomChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const selectedRooms = checked
        ? [...prevData.selectedRooms, value]
        : prevData.selectedRooms.filter((room) => room !== value);
      return { ...prevData, selectedRooms };
    });
  };

  const validateSection = () => {
    if (currentSection === 1) {
      return formData.bhkType !== "" && formData.size !== "";
    }
    if (currentSection === 2) {
      return formData.selectedRooms.length > 0;
    }
    if (currentSection === 3) {
      return formData.kitchenLayout !== "" && formData.kitchenLength !== "";
    }
    if (currentSection === 4) {
      return formData.FullHomeInteriordesignType !== "";
    }
    if (currentSection === 5) {
      return formData.FullHomeInteriorAddOns.length > 0;
    }
    return true; // For any other section, allow navigation
  };

  const nextSection = () => {
    if (validateSection()) {
      if (currentSection < 5) setCurrentSection(currentSection + 1);
    } else {
      alert("Please fill in the required fields.");
    }
  };

  const prevSection = () => {
    if (currentSection > 1) setCurrentSection(currentSection - 1);
  };

  const handleSubmit = () => {
    onSubmitFormData(formData); // Call the external function if needed
    setSubmitted(true); // Set the submitted state to true
  };

  return (
    <div className="full-home-interior-form">
      {!submitted ? (
        <>
          {/* Section 1 */}
          {currentSection === 1 && (
            <div className="section-card">
              <h4 className="playfont wow flipInX" data-wow-delay=".2s">
                Select Your BHK Type
              </h4>
              {["1 BHK", "2 BHK", "3 BHK", "4 BHK", "Independent House"].map(
                (bhk) => (
                  <div key={bhk} className="radio-checkbox-label">
                    <input
                      type="radio"
                      name="bhkType" // This links the radio button to the `bhkType` field in formData
                      value={bhk} // The value is set to each room type (e.g., "1 BHK")
                      onChange={handleChange} // Triggers handleChange to update the formData
                      checked={formData.bhkType === bhk} // Optional: to ensure the selected radio is checked
                    />
                    {bhk}
                  </div>
                )
              )}

              {formErrors.bhkType && (
                <p className="error-text">{formErrors.bhkType}</p>
              )}

              <label className="mt-2 block">Size (Sq ft) </label>
              <input
                type="number"
                name="size"
                onChange={(e) => handleChange(e)}
                className="input-field"
              />
              {formErrors.size && (
                <p className="error-text">{formErrors.size}</p>
              )}
            </div>
          )}

          {/* Section 2 */}
          {currentSection === 2 && (
            <div className="section-card">
              <h4 className="playfont wow flipInX" data-wow-delay=".2s">
                Select the rooms you'd like us to design
              </h4>
              {["Living Room", "Kitchen", "Bedroom", "Bathroom", "Terrace"].map(
                (room) => (
                  <div key={room} className="checkbox-label">
                    <input
                      type="checkbox"
                      value={room}
                      onChange={handleRoomChange}
                      className="checkbox-input"
                    />
                    {room}
                  </div>
                )
              )}
              {formErrors.selectedRooms && (
                <p className="error-text">{formErrors.selectedRooms}</p>
              )}
            </div>
          )}

          {/* Section 3 */}
          {currentSection === 3 && (
            <div className="section-card">
              <h4 className="playfont wow flipInX" data-wow-delay=".2s">
                Select the layout of your kitchen
              </h4>
              {["L-shaped", "Straight", "U-shaped", "Parallel", "Island"].map(
                (layout) => (
                  <div key={layout} className="radio-checkbox-label">
                    <input
                      type="radio"
                      name="kitchenLayout"
                      value={layout}
                      onChange={(e) => handleChange(e)}
                      className={formErrors.kitchenLayout ? "input-error" : ""}
                    />
                    {layout}
                  </div>
                )
              )}
              {formErrors.kitchenLayout && (
                <p className="error-text">{formErrors.kitchenLayout}</p>
              )}

              <label className="mt-2 block">
                Enter the length of your kitchen (in feet)
              </label>
              <input
                type="number"
                name="kitchenLength"
                value={formData.kitchenLength || ""}
                onChange={(e) => handleChange(e)}
                className="input-field"
                placeholder="E.g., 10"
              />
              {formErrors.kitchenLength && (
                <p className="error-text">{formErrors.kitchenLength}</p>
              )}
            </div>
          )}

          {/* Section 4 */}
          {currentSection === 4 && (
            <div className="section-card">
              {/* Design Type Section */}
              <h4 className="playfont wow flipInX" data-wow-delay=".2s">
                Design Type{" "}
              </h4>

              {["Basic", "Premium", "Luxury"].map((design) => (
                <div key={design} className="radio-checkbox-label">
                  <input
                    type="radio"
                    name="FullHomeInteriordesignType"
                    value={design}
                    onChange={(e) => handleChange(e)}
                    className={
                      formErrors.FullHomeInteriordesignType ? "input-error" : ""
                    }
                  />
                  {design}
                </div>
              ))}
              {formErrors.FullHomeInteriordesignType && (
                <p className="error-text">
                  {formErrors.FullHomeInteriordesignType}
                </p>
              )}
            </div>
          )}

          {/* Add-ons Section in a New Section */}
          {currentSection === 5 && (
            <div className="section-card">
              <h4 className="playfont wow flipInX" data-wow-delay=".2s">
                Add-ons{" "}
              </h4>

              {[
                "Swing",
                "Refrigerator",
                "Dishwasher",
                "Washing Machine",
                "Dryer",
                "Oven",
                "Other",
              ].map((addon) => (
                <div key={addon} className="radio-checkbox-label">
                  <input
                    type="checkbox"
                    value={addon}
                    onChange={handleAddonsChange}
                  />
                  {addon}
                </div>
              ))}
            </div>
          )}

          <div className="form-actions">
            {currentSection > 1 && (
              <button type="button" onClick={prevSection} className="btn-back">
                Back
              </button>
            )}
            {currentSection < 5 ? (
              <button type="button" onClick={nextSection} className="btn-next">
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="btn-submit"
              >
                Submit
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="submission-message">
        <h3>Form Submitted Successfully!</h3>
        <p>Here is the submitted data:</p>
        <pre className="json-data">{JSON.stringify(formData, null, 2)}</pre>
      </div>
      
      )}
    </div>
  );
};

export default FullHomeInteriorForm;

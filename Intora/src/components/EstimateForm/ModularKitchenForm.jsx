import React, { useState } from "react";

const ModularKitchenForm = ({ onSubmitFormData, formErrors }) => {
  const [formData, setFormData] = useState({
    layoutType: "", // Correct key
    length: "", // Correct key
    ModularKitchendesignType: "",
    ModularKitchenAddOns: [],
  });
  const [currentSection, setCurrentSection] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  // Handle Add-ons Change
  const handleAddonsChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const addOns = checked
        ? [...prevData.ModularKitchenAddOns, value]
        : prevData.ModularKitchenAddOns.filter((addon) => addon !== value);
      return { ...prevData, ModularKitchenAddOns: addOns };
    });
  };

  // Handle Form Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      return updatedData;
    });
  };

  // Validate Each Section
  const validateSection = () => {
    if (currentSection === 1) {
      return formData.layoutType !== "" && formData.length !== "";
    }
    if (currentSection === 2) {
      return formData.ModularKitchendesignType !== "";
    }
    if (currentSection === 3) {
      return formData.ModularKitchenAddOns.length > 0;
    }
    return true; // For any other section, allow navigation
  };

  // Move to Next Section
  const nextSection = () => {
    if (validateSection()) {
      if (currentSection < 3) setCurrentSection(currentSection + 1);
    } else {
      alert("Please fill in the required fields.");
    }
  };

  // Go to Previous Section
  const prevSection = () => {
    if (currentSection > 1) setCurrentSection(currentSection - 1);
  };

  // Handle Form Submit
  const handleSubmit = () => {
    onSubmitFormData(formData); // Pass form data to external function
    setSubmitted(true); // Set the submitted state to true
  };

  return (
    <div className="modular-kitchen-form">
      {!submitted ? (
        <>
          {/* Section 1: Kitchen Layout */}
          {currentSection === 1 && (
            <div className="section-card">
              <h4 className="playfont wow flipInX" data-wow-delay=".2s">
                Select the layout of your kitchen
              </h4>
              {["L-shaped", "Straight", "U-shaped", "Parallel", "Island"].map(
                (layout) => (
                  <div key={layout} className="radio-checkbox-label">
                    <input
                      type="radio"
                      name="layoutType" // Correct name attribute
                      value={layout}
                      onChange={handleChange}
                      checked={formData.layoutType === layout} // Ensure the checked value matches state
                      className={formErrors.layoutType ? "input-error" : ""}
                    />
                    {layout}
                  </div>
                )
              )}
              {formErrors.layoutType && (
                <p className="error-text">{formErrors.layoutType}</p>
              )}

              <label className="mt-2 block">
                Enter the length of your kitchen (in feet)
              </label>
              <input
                type="number"
                name="length" // Correct name attribute
                value={formData.length || ""}
                onChange={handleChange}
                className="input-field"
                placeholder="E.g., 10"
              />
              {formErrors.length && (
                <p className="error-text">{formErrors.length}</p>
              )}
            </div>
          )}

          {/* Section 2: Design Type */}
          {currentSection === 2 && (
            <div className="section-card">
              <h4 className="playfont wow flipInX" data-wow-delay=".2s">
                Select the design type for your modular kitchen
              </h4>
              {["Basic", "Premium", "Luxury"].map((design) => (
                <div key={design} className="radio-checkbox-label">
                  <input
                    type="radio"
                    name="ModularKitchendesignType" // Correct name attribute
                    value={design}
                    onChange={handleChange}
                    checked={formData.ModularKitchendesignType === design} // Ensure the checked value matches state
                    className={
                      formErrors.ModularKitchendesignType ? "input-error" : ""
                    }
                  />
                  {design}
                </div>
              ))}
              {formErrors.ModularKitchendesignType && (
                <p className="error-text">
                  {formErrors.ModularKitchendesignType}
                </p>
              )}
            </div>
          )}

          {/* Section 3: Add-ons */}
          {currentSection === 3 && (
            <div className="section-card">
              <h4 className="playfont wow flipInX" data-wow-delay=".2s">
                Add-ons
              </h4>

              {[
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
                    checked={formData.ModularKitchenAddOns.includes(addon)} // Ensure checkbox reflects state correctly
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
            {currentSection < 3 ? (
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

export default ModularKitchenForm;

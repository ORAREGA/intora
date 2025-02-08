import React, { useState } from "react";

const WorkspaceForm = ({ onSubmitFormData, formErrors }) => {
  const [formData, setFormData] = useState({
    workspaceType: "",
    deskType: "",
    materialsType: "",
    deskSize: "",
    workspaceLayout: "",
    addOns: [],
  });
  const [currentSection, setCurrentSection] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const handleAddonsChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const addOns = checked
        ? [...prevData.addOns, value]
        : prevData.addOns.filter((addon) => addon !== value);
      return { ...prevData, addOns: addOns };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      console.log(updatedData);  // Check if `workspaceType` is updated
      return updatedData;
    });
  };

  const validateSection = () => {
    if (currentSection === 1) {
      return formData.workspaceType !== "" && formData.deskType !== "";
    }
    if (currentSection === 2) {
      return formData.materialsType !== "" && formData.deskSize !== "";
    }
    if (currentSection === 3) {
      return formData.workspaceLayout !== "";
    }
    if (currentSection === 4) {
      return formData.addOns.length > 0;
    }
    return true; // For any other section, allow navigation
  };

  const nextSection = () => {
    if (validateSection()) {
      if (currentSection < 4) setCurrentSection(currentSection + 1);
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
    <div className="workspace-form">
      {!submitted ? (
        <>
          {/* Section 1 */}
          {currentSection === 1 && (
            <div className="section-card">
              <h4 className="playfont wow flipInX" data-wow-delay=".2s">
                Select Your Workspace Type
              </h4>
              {["Home Office", "Corporate Office", "Coworking Space"].map(
                (workspace) => (
                  <div key={workspace} className="radio-checkbox-label">
                    <input
                      type="radio"
                      name="workspaceType"
                      value={workspace}
                      onChange={handleChange}
                      checked={formData.workspaceType === workspace}
                    />
                    {workspace}
                  </div>
                )
              )}

              {formErrors.workspaceType && (
                <p className="error-text">{formErrors.workspaceType}</p>
              )}

              <h4 className="playfont wow flipInX" data-wow-delay=".2s">
                Select Your Desk Type
              </h4>
              {["Standing Desk", "Adjustable Desk", "Fixed Desk"].map((desk) => (
                <div key={desk} className="radio-checkbox-label">
                  <input
                    type="radio"
                    name="deskType"
                    value={desk}
                    onChange={handleChange}
                    checked={formData.deskType === desk}
                  />
                  {desk}
                </div>
              ))}

              {formErrors.deskType && (
                <p className="error-text">{formErrors.deskType}</p>
              )}
            </div>
          )}

          {/* Section 2 */}
          {currentSection === 2 && (
            <div className="section-card">
              <h4 className="playfont wow flipInX" data-wow-delay=".2s">
                Select Material Type for Your Desk
              </h4>
              {["Wood", "Metal", "Glass", "Laminate"].map((material) => (
                <div key={material} className="radio-checkbox-label">
                  <input
                    type="radio"
                    name="materialsType"
                    value={material}
                    onChange={handleChange}
                    checked={formData.materialsType === material}
                  />
                  {material}
                </div>
              ))}

              {formErrors.materialsType && (
                <p className="error-text">{formErrors.materialsType}</p>
              )}

              <label className="mt-2 block">Desk Size (in inches)</label>
              <input
                type="number"
                name="deskSize"
                onChange={handleChange}
                value={formData.deskSize}
                className="input-field"
              />
              {formErrors.deskSize && (
                <p className="error-text">{formErrors.deskSize}</p>
              )}
            </div>
          )}

          {/* Section 3 */}
          {currentSection === 3 && (
            <div className="section-card">
              <h4 className="playfont wow flipInX" data-wow-delay=".2s">
                Select Your Workspace Layout
              </h4>
              {["Open Layout", "Cubicle", "Private Office", "Collaborative"].map(
                (layout) => (
                  <div key={layout} className="radio-checkbox-label">
                    <input
                      type="radio"
                      name="workspaceLayout"
                      value={layout}
                      onChange={handleChange}
                      checked={formData.workspaceLayout === layout}
                    />
                    {layout}
                  </div>
                )
              )}

              {formErrors.workspaceLayout && (
                <p className="error-text">{formErrors.workspaceLayout}</p>
              )}
            </div>
          )}

          {/* Section 4 */}
          {currentSection === 4 && (
            <div className="section-card">
              <h4 className="playfont wow flipInX" data-wow-delay=".2s">
                Add-ons
              </h4>

              {[
                "Monitor",
                "Chair",
                "Drawer",
                "Lamp",
                "Whiteboard",
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
            {currentSection < 4 ? (
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

export default WorkspaceForm;

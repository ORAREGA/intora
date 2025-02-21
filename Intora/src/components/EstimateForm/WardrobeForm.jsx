import React, { useState } from "react";

const WardrobeForm = ({ onSubmitFormData, formErrors }) => {
  const [formData, setFormData] = useState({
    wardrobeType: "",
    height: "",
    width: "",
    WardrobedesignType: "",
    materialType: "",
    loft: "",
    loftSize: "",
    finishing: "",
  });
  const [currentSection, setCurrentSection] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      console.log(updatedData);  // Check if `wardrobeType` is updated
      return updatedData;
    });
  };

  const validateSection = () => {
    if (currentSection === 1) {
      return formData.wardrobeType !== "" && formData.height !== "" && formData.width !== "";
    }
    if (currentSection === 2) {
      return formData.WardrobedesignType !== "";
    }
    if (currentSection === 3) {
      return formData.materialType !== "" && formData.finishing !== "";
    }
    if (currentSection === 4) {
      return formData.loft !== "" && formData.loftSize !== "";
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
    <div className="wardrobe-form">
      {!submitted ? (
        <>
          {/* Section 1 */}
          {currentSection === 1 && (
            <div className="section-card">
              <h4 className="playfont wow flipInX" data-wow-delay=".2s">
                Select Your Wardrobe Type
              </h4>
              {["Sliding Door", "Hinged Door", "Walk-in"].map((wardrobe) => (
                <div key={wardrobe} className="radio-checkbox-label">
                  <input
                    type="radio"
                    name="wardrobeType"
                    value={wardrobe}
                    onChange={handleChange}
                    checked={formData.wardrobeType === wardrobe}
                  />
                  {wardrobe}
                </div>
              ))}

              {formErrors.wardrobeType && (
                <p className="error-text">{formErrors.wardrobeType}</p>
              )}

              <label className="mt-2 block">Height (in feet) </label>
              <input
                type="number"
                name="height"
                value={formData.height || ""}
                onChange={handleChange}
                className="input-field"
              />
              {formErrors.height && <p className="error-text">{formErrors.height}</p>}

              <label className="mt-2 block">Width (in feet) </label>
              <input
                type="number"
                name="width"
                value={formData.width || ""}
                onChange={handleChange}
                className="input-field"
              />
              {formErrors.width && <p className="error-text">{formErrors.width}</p>}
            </div>
          )}

          {/* Section 2 */}
          {currentSection === 2 && (
            <div className="section-card">
              <h4 className="playfont wow flipInX" data-wow-delay=".2s">
                Select the Wardrobe Design Type
              </h4>
              {["Modern", "Classic", "Contemporary"].map((design) => (
                <div key={design} className="radio-checkbox-label">
                  <input
                    type="radio"
                    name="WardrobedesignType"
                    value={design}
                    onChange={handleChange}
                    className={formErrors.WardrobedesignType ? "input-error" : ""}
                  />
                  {design}
                </div>
              ))}
              {formErrors.WardrobedesignType && (
                <p className="error-text">{formErrors.WardrobedesignType}</p>
              )}
            </div>
          )}

          {/* Section 3 */}
          {currentSection === 3 && (
            <div className="section-card">
              <h4 className="playfont wow flipInX" data-wow-delay=".2s">
                Select Material and Finishing
              </h4>
              {["Wood", "MDF", "Plywood"].map((material) => (
                <div key={material} className="radio-checkbox-label">
                  <input
                    type="radio"
                    name="materialType"
                    value={material}
                    onChange={handleChange}
                  />
                  {material}
                </div>
              ))}

              {formErrors.materialType && (
                <p className="error-text">{formErrors.materialType}</p>
              )}

              <label className="mt-2 block">Finishing Type</label>
              <input
                type="text"
                name="finishing"
                value={formData.finishing || ""}
                onChange={handleChange}
                className="input-field"
              />
              {formErrors.finishing && (
                <p className="error-text">{formErrors.finishing}</p>
              )}
            </div>
          )}

          {/* Section 4 */}
          {currentSection === 4 && (
            <div className="section-card">
              <h4 className="playfont wow flipInX" data-wow-delay=".2s">
                Loft and Loft Size
              </h4>
              <div className="radio-checkbox-label">
                <input
                  type="checkbox"
                  name="loft"
                  value="Yes"
                  onChange={handleChange}
                />
                Loft Available
              </div>

              <label className="mt-2 block">Loft Size (in feet)</label>
              <input
                type="number"
                name="loftSize"
                value={formData.loftSize || ""}
                onChange={handleChange}
                className="input-field"
              />
              {formErrors.loftSize && (
                <p className="error-text">{formErrors.loftSize}</p>
              )}
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

export default WardrobeForm;

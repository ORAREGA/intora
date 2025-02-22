import React, { useState, useEffect } from "react";
import FullHomeInteriorForm from "./FullHomeInteriorForm";
import WardrobeForm from "./WardrobeForm";
import ModularKitchenForm from "./ModularKitchenForm";
import WorkspaceForm from "./WorkspaceForm";

const GetEstimate = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    bhkType: "",
    size: "",
    selectedRooms: [],
    kitchenLayout: "",
    kitchenLength: "",
    FullHomeInteriordesignType: "",
    FullHomeInteriorAddOns: [],
    layoutType: "",
    length: "",
    ModularKitchendesignType: "",
    ModularKitchenAddOns: [],
    wardrobeType: "",
    height: "",
    width: "",
    WardrobedesignType: "",
    materialType: "",
    loft: "",
    loftSize: "",
    finishing: "",
    workspaceType: "",
    deskType: "",
    materialsType: "",
    deskSize: "",
    workspaceLayout: "",
    addOns: [],
    getEstimate: false,
  });

  const [formErrors, setFormErrors] = useState({});
  const [selectedService, setSelectedService] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isGetEstimateDisabled, setIsGetEstimateDisabled] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const requiredFields = ["name", "mobile", "email"];
    const allFilled = requiredFields.every(
      (field) => formData[field] && formData[field].trim() !== ""
    );

    let serviceFieldsFilled = true;
    switch (selectedService) {
      case "Full Home Interior":
        serviceFieldsFilled =
          formData.FullHomeInteriordesignType &&
          formData.selectedRooms.length > 0;
        break;
      case "Wardrobe":
        serviceFieldsFilled =
          formData.wardrobeType && formData.height && formData.width;
        break;
      case "Modular Kitchen":
        serviceFieldsFilled =
          formData.ModularKitchendesignType && formData.kitchenLength;
        break;
      case "Workspace":
        serviceFieldsFilled =
          formData.WorkspacelayoutType && formData.WorkspacedeskType;
        break;
      default:
        serviceFieldsFilled = true;
    }

    setIsGetEstimateDisabled(!(allFilled && serviceFieldsFilled));
  }, [formData, selectedService]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const updatedArray = formData[name]?.includes(value)
        ? formData[name].filter((item) => item !== value)
        : [...(formData[name] || []), value];
      setFormData({
        ...formData,
        [name]: updatedArray,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleServiceChange = (e) => {
    setSelectedService(e.target.value);
    setShowDropdown(e.target.value !== "");
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.mobile.trim()) {
      errors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      errors.mobile = "Mobile number must be exactly 10 digits";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formData.email)
    ) {
      errors.email = "Invalid email format";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      const firstErrorField = Object.keys(errors)[0];
      const errorElement = document.getElementsByName(firstErrorField)[0];
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
        errorElement.focus();
      }
      return;
    }

    try {
      const response = await fetch("http://147.93.107.225:5000/api/estimates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 3000);
      } else {
        console.error("Error submitting form:", data.error);
      }
    } catch (error) {
      console.error("Error connecting to backend:", error);
    }

    setFormData({
      name: "",
      mobile: "",
      email: "",
      bhkType: "",
      size: "",
      selectedRooms: [],
      kitchenLayout: "",
      kitchenLength: "",
      FullHomeInteriordesignType: "",
      FullHomeInteriorAddOns: [],
      layoutType: "",
      length: "",
      ModularKitchendesignType: "",
      ModularKitchenAddOns: [],
      wardrobeType: "",
      height: "",
      width: "",
      WardrobedesignType: "",
      materialType: "",
      loft: "",
      loftSize: "",
      finishing: "",
      workspaceType: "",
      deskType: "",
      materialsType: "",
      deskSize: "",
      workspaceLayout: "",
      addOns: [],
      getEstimate: false,
    });
    setSelectedService("");
    setFormErrors({});
    setShowDropdown(false);
  };

  const handleFormDataSubmit = (data) => {
    setFormData((prevData) => ({
      ...prevData,
      ...data,
    }));
    console.log("Form data from selected service form:", data);
  };

  return (
    <div className="get-estimate-container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-flex">
            <div className="form-left">
              <div className="form-fields">
                <div className="form-field ">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={formErrors.name ? "input-error" : ""}
                    placeholder="Enter your name"
                  />
                  {formErrors.name && (
                    <p className="error-text">{formErrors.name}</p>
                  )}
                </div>
                <div className="form-field"style={{color:"#000"}}>
                  <label>Mobile</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className={formErrors.mobile ? "input-error" : ""}
                    placeholder="Enter your mobile number"
                  />
                  {formErrors.mobile && (
                    <p className="error-text">{formErrors.mobile}</p>
                  )}
                </div>
                <div className="form-field">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={formErrors.email ? "input-error" : ""}
                    placeholder="Enter your email"
                  />
                  {formErrors.email && (
                    <p className="error-text">{formErrors.email}</p>
                  )}
                </div>
                <div className="form-field">
                  <label>Select Service</label>
                  <select
                    name="selectedService"
                    value={selectedService}
                    onChange={handleServiceChange}
                  >
                    <option value="">Select a service</option>
                    <option value="Full Home Interior">
                      Full Home Interior
                    </option>
                    <option value="Wardrobe">Wardrobe</option>
                    <option value="Modular Kitchen">Modular Kitchen</option>
                    <option value="Workspace">Workspace</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-right">
              {showDropdown && selectedService === "Full Home Interior" && (
                <FullHomeInteriorForm
                  onSubmitFormData={handleFormDataSubmit}
                  handleChange={handleChange}
                  formErrors={formErrors}
                />
              )}
              {showDropdown && selectedService === "Wardrobe" && (
                <WardrobeForm
                  onSubmitFormData={handleFormDataSubmit}
                  handleChange={handleChange}
                  formErrors={formErrors}
                />
              )}
              {showDropdown && selectedService === "Modular Kitchen" && (
                <ModularKitchenForm
                  onSubmitFormData={handleFormDataSubmit}
                  handleChange={handleChange}
                  formErrors={formErrors}
                />
              )}
              {showDropdown && selectedService === "Workspace" && (
                <WorkspaceForm
                  onSubmitFormData={handleFormDataSubmit}
                  handleChange={handleChange}
                  formErrors={formErrors}
                />
              )}
            </div>
          </div>
          <div className="form-button-container">
            <button type="submit" className="get-estimate-button">
              Get Estimate
            </button>
          </div>
        </form>
        {isSuccess && (
          <p className="success-message" style={{ marginTop: "-50px" }}>
            Estimate request submitted successfully!
          </p>
        )}
      </div>
    </div>
  );
};

export default GetEstimate;

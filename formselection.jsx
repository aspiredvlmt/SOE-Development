import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; 
import "./formselection.css"; 

const FormSelectionUI = ({ onSelectForm }) => {
  return (
    <div className="form-selection-container">
      

      
      <div className="main-content">
        <div className="form-card">
          <h5 className="form-title">What form do you need?</h5>
          <p className="form-subtitle">Kindly choose your needed form</p>
          <div className="form-buttons">
            <button className="btn btn-primary" onClick={() => onSelectForm("vehicle")}>
              Vehicle Reservation
            </button>
            <button className="btn btn-outline-primary" onClick={() => onSelectForm("facility")}>
              Facility Reservation
            </button>
            <button className="btn btn-primary" onClick={() => onSelectForm("purchase")}>
              Purchase Requisition
            </button>
            <button className="btn btn-outline-primary" onClick={() => onSelectForm("job")}>
              Job Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSelectionUI;

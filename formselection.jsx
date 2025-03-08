import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; 
import "./formselection.css"; 

const FormSelectionUI = ({ onSelectForm }) => {
  return (
    <div className="form-selection-container">
      <div className="sidebar">
        <h4 className="sidebar-title">Kronos</h4>
        <ul className="nav-list">
        <li className="nav-item mb-3">
            <a href="#" className="nav-link active text-white bg-primary d-flex align-items-center">
                <i className="bi bi-file-earmark-text me-2"></i> Reservation Forms
            </a>
            </li>
            <li className="nav-item mb-3">
            <a href="#" className="nav-link text-dark d-flex align-items-center">
                <i className="bi bi-folder me-2"></i> Records
            </a>
            </li>
            <li className="nav-item mb-3">
            <a href="#" className="nav-link text-dark d-flex align-items-center">
                <i className="bi bi-card-checklist me-2"></i> Request Management
            </a>
            </li>
            <li className="nav-item mb-3">
            <a href="#" className="nav-link text-dark d-flex align-items-center">
                <i className="bi bi-bar-chart me-2"></i> Reports
            </a>
            </li>
            <li className="nav-item mb-3">
            <a href="#" className="nav-link text-dark d-flex align-items-center">
                <i className="bi bi-building me-2"></i> Properties
            </a>
            </li>
            <li className="nav-item mb-3">
            <a href="#" className="nav-link text-dark d-flex align-items-center">
                <i className="bi bi-people me-2"></i> User Management
            </a>
            </li>
            <li className="nav-item mb-3">
            <a href="#" className="nav-link text-danger d-flex align-items-center">
                <i className="bi bi-box-arrow-right me-2"></i> Logout
            </a>
        </li>
        </ul>
        
    </div>

      
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

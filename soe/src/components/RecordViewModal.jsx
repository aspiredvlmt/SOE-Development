import React from "react";
import { X } from "lucide-react";
import { 
  VehicleReservationForm, 
  FacilityReservationForm, 
  JobRequestForm, 
  PurchaseRequestForm 
} from "./Formcomponenets";

const RecordViewModal = ({ isOpen, onClose, request }) => {
  if (!isOpen || !request) return null;
  
  // Maps request type to appropriate form and title
  const getFormForType = () => {
    switch (request.type) {
      case "VR":
        return {
          title: "Vehicle Reservation",
          form: <VehicleReservationForm request={request} readOnly={true} />
        };
      case "FR":
        return {
          title: "Facility Reservation",
          form: <FacilityReservationForm request={request} readOnly={true} />
        };
      case "JR":
        return {
          title: "Job Request",
          form: <JobRequestForm request={request} readOnly={true} />
        };
      case "PR":
        return {
          title: "Purchase Request",
          form: <PurchaseRequestForm request={request} readOnly={true} />
        };
      default:
        return {
          title: "Request Details",
          form: <div>Unknown request type</div>
        };
    }
  };

  const { title, form } = getFormForType();

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <div className="reference-number">{request.referenceNo}</div>
          <button className="modal-close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <div className="modal-status-container">
          <span className={`status-badge status-${request.status.toLowerCase()}`}>
            {request.status}
          </span>
          <span className="type-badge">
            {request.typeLabel}
          </span>
        </div>
        
        <div className="modal-content">
          {form}
        </div>
        
        <div className="modal-footer">
          <button className="modal-cancel-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordViewModal;
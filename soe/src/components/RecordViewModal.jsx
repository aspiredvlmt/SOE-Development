import React from "react";
import { X } from "lucide-react";
import "./recordmanagement.css";

// A single, generic component to render a form field
const FormField = ({ label, value }) => (
  <div className="form-group">
    <div className="form-label">{label}</div>
    <div className="form-value">{value || "-"}</div>
  </div>
);

// Facility Reservation Form Component
const FacilityReservationForm = ({ request }) => {
  return (
    <div className="modal-form-grid">
      <div className="form-column">
        <FormField label="Requestor" value={request.requestor} />
        <FormField label="Venue" value={request.venue} />
        <FormField label="Nature of Activity" value={request.natureOfActivity} />
        <FormField label="Activity" value={request.activity} />
        <FormField label="Purpose" value={request.purpose} />
      </div>
      <div className="form-column">
        <FormField label="Date Submitted" value={request.dateSubmitted} />
        <FormField label="Date Needed" value={request.dateNeeded} />
        <FormField label="Time Start" value={request.timeStart} />
        <FormField label="Special Instruction" value={request.specialInstruction} />
        <FormField label="Materials and Equipment" value={request.materialsEquipment} />
      </div>
    </div>
  );
};

// Vehicle Reservation Form Component
const VehicleReservationForm = ({ request }) => {
  return (
    <div className="modal-form-grid">
      <div className="form-column">
        <FormField label="Requestor" value={request.requestor} />
        <FormField label="Time of Departure" value={request.departureTime} />
        <FormField label="Time of Arrival" value={request.arrivalTime} />
        <FormField label="Driver" value={request.driver} />
        <FormField label="Destination" value={request.destination} />
      </div>
      <div className="form-column">
        <FormField label="Purpose" value={request.purpose} />
        <FormField label="Date Submitted" value={request.dateSubmitted} />
        <FormField label="Date Needed" value={request.dateNeeded} />
        <FormField label="No. of Passenger" value={request.passengerCount} />
        <FormField label="Passengers" value={request.passengers} />
      </div>
    </div>
  );
};

// Job Request Form Component
const JobRequestForm = ({ request }) => {
  return (
    <>
      <div className="modal-form-grid">
        <div className="form-column">
          <FormField label="Date Submitted" value={request.dateSubmitted} />
          <FormField label="Date Needed" value={request.dateNeeded} />
        </div>
        <div className="form-column">
          <FormField label="Date Completed" value={request.dateCompleted} />
          <FormField label="Nature of Work" value={request.natureOfWork} />
        </div>
      </div>
      <div className="modal-particulars-section">
        <div className="form-label">Particulars</div>
        <table className="modal-particulars-table">
          <thead>
            <tr>
              <th className="qty-column">Qty</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {request.particulars && request.particulars.length > 0 ? (
              request.particulars.map((item, index) => (
                <tr key={index}>
                  <td>{item.qty}</td>
                  <td>{item.details}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">-</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

// Purchase Request Form Component
const PurchaseRequestForm = ({ request }) => {
  return (
    <>
      <div className="modal-form-grid">
        <div className="form-column">
          <FormField label="Requestor" value={request.from} />
          <FormField label="Category" value={request.category || "Office Supplies"} />
          <FormField label="Purpose of Request" value={request.purpose} />
        </div>
        <div className="form-column">
          <FormField label="Date Submitted" value={request.dateSubmitted} />
          <FormField label="Date Needed" value={request.dateNeeded} />
           <FormField label="Nature of Work" value={request.natureOfWork} />
        </div>
      </div>
      <div className="modal-particulars-section">
        <div className="form-label">Particulars / Item Description / Specifications</div>
        <table className="modal-particulars-table">
          <thead>
            <tr>
              <th className="qty-column">Qty</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {request.particulars && request.particulars.length > 0 ? (
              request.particulars.map((item, index) => (
                <tr key={index}>
                  <td>{item.qty}</td>
                  <td>{item.details}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">-</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};


// Main Modal Component
const RecordViewModal = ({ isOpen, onClose, request }) => {
  if (!isOpen || !request) return null;
  
  const handleBump = () => {
    console.log("Bumping request:", request.referenceNo);
    // Add your bump functionality here
  };
  
  const getFormForType = () => {
    switch (request.type) {
      case "VR": return <VehicleReservationForm request={request} />;
      case "FR": return <FacilityReservationForm request={request} />;
      case "JR": return <JobRequestForm request={request} />;
      case "PR": return <PurchaseRequestForm request={request} />;
      default: return <div>Unknown request type</div>;
    }
  };

  const getFormTitle = () => {
      switch (request.type) {
          case "VR": return "Vehicle Reservation Form";
          case "FR": return "Facility Reservation Form";
          case "JR": return "Job Request Form";
          case "PR": return "Purchase Requisition Form";
          default: return "Request Form";
      }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container view-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
            <h2 className="modal-title">{getFormTitle()}</h2>
            <div className="modal-reference-number">{request.referenceNo}</div>
        </div>
        <div className="modal-form-content">
            {getFormForType()}
        </div>
        <div className="modal-footer">
            <button className="modal-bump-button" onClick={handleBump}>
                Bump
            </button>
            <button className="modal-close-button" onClick={onClose}>
                Close
            </button>
        </div>
      </div>
    </div>
  );
};

export default RecordViewModal;

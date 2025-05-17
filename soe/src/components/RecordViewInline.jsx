import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import "./recordmanagement.css";

const RecordViewInline = ({ request, isExpanded, onToggle, onClose }) => {
  // Maps request type to appropriate form
  const getFormForType = () => {
    switch (request.type) {
      case "VR":
        return <VehicleReservationForm request={request} onClose={onClose} onBump={handleBump} />;
      case "FR":
        return <FacilityReservationForm request={request} onClose={onClose} onBump={handleBump} />;
      case "JR":
        return <JobRequestForm request={request} onClose={onClose} onBump={handleBump} />;
      case "PR":
        return <PurchaseRequestForm request={request} onClose={onClose} onBump={handleBump} />;
      default:
        return <div>Unknown request type</div>;
    }
  };

  // Handle bump action
  const handleBump = () => {
    console.log("Bumping request:", request.referenceNo);
    // Add your bump functionality here
  };

  return (
    <tr className={`details-row ${isExpanded ? "expanded" : ""}`}>
      <td colSpan="7" className="details-cell">
        <div className="inline-form-container">
          {getFormForType()}
        </div>
      </td>
    </tr>
  );
};

// Facility Reservation Form Component
const FacilityReservationForm = ({ request, onClose, onBump }) => {
  return (
    <div className="form-content">
      <div className="form-header">
        <h2 className="form-title">Facility Reservation Form</h2>
        <div className="reference-number">{request.referenceNo}</div>
      </div>
      
      <div className="form-content">
        <div className="form-field-container">
          <div className="form-field-left">
            <div className="field-row">
              <div className="field-label">Requestor:</div>
              <div className="field-value">{request.requestor || ""}</div>
            </div>
            <div className="field-row">
              <div className="field-label">Venue:</div>
              <div className="field-value">{request.venue || ""}</div>
            </div>
            <div className="field-row">
              <div className="field-label">Nature of Activity:</div>
              <div className="field-value">{request.natureOfActivity || ""}</div>
            </div>
            <div className="field-row">
              <div className="field-label">Activity:</div>
              <div className="field-value">{request.activity || ""}</div>
            </div>
            <div className="field-row">
              <div className="field-label">Purpose:</div>
              <div className="field-value">{request.purpose || ""}</div>
            </div>
            <div className="field-row">
              <div className="field-label">Special Instruction:</div>
              <div className="field-value">{request.specialInstruction || "N/A"}</div>
            </div>
            <div className="field-row">
              <div className="field-label">Materials and Equipment:</div>
              <div className="field-value">{request.materialsEquipment || ""}</div>
            </div>
          </div>
          
          <div className="form-field-right">
            <div className="field-row">
              <div className="field-label">Date and Time Submitted:</div>
              <div className="field-value">{request.dateSubmitted || ""}</div>
            </div>
            <div className="field-row">
              <div className="field-label">Date Needed:</div>
              <div className="field-value">{request.dateNeeded || ""}</div>
            </div>
            <div className="field-row">
              <div className="field-label">Time Start:</div>
              <div className="field-value">{request.timeStart || ""}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="form-footer">
        <button className="bump-button" onClick={onBump}>
          Bump
        </button>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

// Vehicle Reservation Form Component
const VehicleReservationForm = ({ request, onClose, onBump }) => {
  return (
    <div className="form-content">
      <div className="form-header">
        <h2 className="form-title">Vehicle Reservation Form</h2>
        <div className="reference-number">{request.referenceNo}</div>
      </div>
      
      <div className="form-content">
        <div className="form-field-container">
          <div className="form-field-left">
            <div className="field-row">
              <div className="field-label">Requestor:</div>
              <div className="field-value">{request.requestor || ""}</div>
            </div>
            <div className="field-row">
              <div className="field-label">Time of Departure:</div>
              <div className="field-value">{request.departureTime || ""}</div>
            </div>
            <div className="field-row">
              <div className="field-label">Time of Arrival:</div>
              <div className="field-value">{request.arrivalTime || ""}</div>
            </div>
            <div className="field-row">
              <div className="field-label">Driver:</div>
              <div className="field-value">{request.driver || ""}</div>
            </div>
            <div className="field-row">
              <div className="field-label">Destination:</div>
              <div className="field-value">{request.destination || ""}</div>
            </div>
            <div className="field-row">
              <div className="field-label">Purpose:</div>
              <div className="field-value">{request.purpose || ""}</div>
            </div>
          </div>
          
          <div className="form-field-right">
            <div className="field-row">
              <div className="field-label">Date Submitted:</div>
              <div className="field-value">{request.dateSubmitted || ""}</div>
            </div>
            <div className="field-row">
              <div className="field-label">Date Needed:</div>
              <div className="field-value">{request.dateNeeded || ""}</div>
            </div>
            <div className="field-row">
              <div className="field-label">No. of Passenger:</div>
              <div className="field-value">{request.passengerCount || ""}</div>
            </div>
            <div className="field-row">
              <div className="field-label">Passengers:</div>
              <div className="field-value">{request.passengers || ""}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="form-footer">
        <button className="bump-button" onClick={onBump}>
          Bump
        </button>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

// Job Request Form Component
const JobRequestForm = ({ request, onClose, onBump }) => {
  return (
    <div className="form-content">
      <div className="form-header">
        <h2 className="form-title">Job Request Form</h2>
        <div className="reference-number">{request.referenceNo}</div>
      </div>
      
      <div className="form-content">
        <div className="job-request-layout">
          <div className="form-field-left">
            <div className="field-row">
              <div className="field-label">Date Submitted:</div>
              <div className="field-value">{request.dateSubmitted || ""}</div>
            </div>
            <div className="field-row">
              <div className="field-label">Date Needed:</div>
              <div className="field-value">{request.dateNeeded || ""}</div>
            </div>
            <div className="field-row">
              <div className="field-label">Date Completed:</div>
              <div className="field-value">{request.dateCompleted || ""}</div>
            </div>
            <div className="field-row">
              <div className="field-label">Nature of Work:</div>
              <div className="field-value">{request.natureOfWork || ""}</div>
            </div>
          </div>
          
          <div className="form-field-right">
            <div className="particulars-table-container">
              <div className="particulars-table-header">
                <div className="particulars-header-qty">Qty</div>
                <div className="particulars-header-desc">Particulars</div>
              </div>
              <div className="particulars-table-content">
                {request.particulars && request.particulars.map((item, index) => (
                  <div key={index} className="particulars-table-row">
                    <div className="particulars-cell-qty">{item.qty}</div>
                    <div className="particulars-cell-desc">{item.details}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="form-footer">
        <button className="bump-button" onClick={onBump}>
          Bump
        </button>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

// Purchase Request Form Component
const PurchaseRequestForm = ({ request, onClose, onBump }) => {
  return (
    <div className="form-content">
      <div className="form-header">
        <h2 className="form-title">Purchase Requisition Form</h2>
        <div className="reference-number">{request.referenceNo}</div>
      </div>
      
      <div className="form-content">
        <div className="purchase-layout">
          <div className="form-field-left">
            <div className="field-row">
              <div className="field-label">Requestor:</div>
              <div className="field-value">{request.from || ""}</div>
            </div>
            <div className="field-row">
              <div className="field-label">Category:</div>
              <div className="field-value">{request.category || "Office Supplies"}</div>
            </div>
            <div className="field-row">
              <div className="field-label">Date Submitted:</div>
              <div className="field-value">{request.dateSubmitted || ""}</div>
            </div>
            <div className="field-row">
              <div className="field-label">Date Needed:</div>
              <div className="field-value">{request.dateNeeded || ""}</div>
            </div>
            <div className="field-row">
              <div className="field-label">Purpose of Request:</div>
              <div className="field-value">{request.purpose || ""}</div>
            </div>
          </div>
          
          <div className="form-field-right">
            <div className="purchase-particulars-container">
              <div className="purchase-particulars-header">
                Qty Particulars / Item Description /Specifications
              </div>
              <div className="purchase-particulars-list">
                {request.particulars && request.particulars.map((item, index) => (
                  <div key={index} className="purchase-particulars-item">
                    - {item.qty} {item.details}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="form-footer">
        <button className="bump-button" onClick={onBump}>
          Bump
        </button>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default RecordViewInline;
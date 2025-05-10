import React from "react";

// Vehicle Reservation Form Component
export const VehicleReservationForm = ({ request, onFieldChange, readOnly }) => {
  return (
    <div className="form-grid">
      <div className="form-left">
        <div className="form-group">
          <div className="form-label">Requestor:</div>
          {readOnly ? (
            <div className="form-value">{request.requestor || "-"}</div>
          ) : (
            <input
              type="text"
              className="text-input"
              value={request.requestor || ""}
              onChange={(e) => onFieldChange("requestor", e.target.value)}
            />
          )}
        </div>
        <div className="form-group">
          <div className="form-label">Time of Departure:</div>
          {readOnly ? (
            <div className="form-value">{request.departureTime || "-"}</div>
          ) : (
            <input
              type="time"
              className="text-input"
              value={request.departureTime || ""}
              onChange={(e) => onFieldChange("departureTime", e.target.value)}
            />
          )}
        </div>
        <div className="form-group">
          <div className="form-label">Time of Arrival:</div>
          {readOnly ? (
            <div className="form-value">{request.arrivalTime || "-"}</div>
          ) : (
            <input
              type="time"
              className="text-input"
              value={request.arrivalTime || ""}
              onChange={(e) => onFieldChange("arrivalTime", e.target.value)}
            />
          )}
        </div>
        <div className="form-group">
          <div className="form-label">Driver:</div>
          {readOnly ? (
            <div className="form-value">{request.driver || "-"}</div>
          ) : (
            <input
              type="text"
              className="text-input"
              value={request.driver || ""}
              onChange={(e) => onFieldChange("driver", e.target.value)}
            />
          )}
        </div>
        <div className="form-group">
          <div className="form-label">Destination:</div>
          {readOnly ? (
            <div className="form-value">{request.destination || "-"}</div>
          ) : (
            <input
              type="text"
              className="text-input"
              value={request.destination || ""}
              onChange={(e) => onFieldChange("destination", e.target.value)}
            />
          )}
        </div>
        <div className="form-group">
          <div className="form-label">Purpose:</div>
          {readOnly ? (
            <div className="form-value">{request.purpose || "-"}</div>
          ) : (
            <input
              type="text"
              className="text-input"
              value={request.purpose || ""}
              onChange={(e) => onFieldChange("purpose", e.target.value)}
            />
          )}
        </div>
      </div>
      <div className="form-right">
        <div className="form-group">
          <div className="form-label">Date Submitted:</div>
          <div className="form-value">{request.dateSubmitted || "-"}</div>
        </div>
        <div className="form-group">
          <div className="form-label">Date Needed:</div>
          {readOnly ? (
            <div className="form-value">{request.dateNeeded || "-"}</div>
          ) : (
            <input
              type="date"
              className="date-input"
              value={request.dateNeeded || ""}
              onChange={(e) => onFieldChange("dateNeeded", e.target.value)}
            />
          )}
        </div>
        <div className="form-group">
          <div className="form-label">No. of Passengers:</div>
          {readOnly ? (
            <div className="form-value">{request.passengerCount || "-"}</div>
          ) : (
            <input
              type="number"
              className="text-input"
              value={request.passengerCount || ""}
              onChange={(e) => onFieldChange("passengerCount", e.target.value)}
              min="1"
            />
          )}
        </div>
        <div className="form-group">
          <div className="form-label">Passengers:</div>
          {readOnly ? (
            <div className="form-value">{request.passengers || "-"}</div>
          ) : (
            <input
              type="text"
              className="text-input"
              value={request.passengers || ""}
              onChange={(e) => onFieldChange("passengers", e.target.value)}
              placeholder="Comma separated list of names"
            />
          )}
        </div>
      </div>
    </div>
  );
};

// Facility Reservation Form Component
export const FacilityReservationForm = ({ request, onFieldChange, readOnly }) => {
  return (
    <div className="form-grid">
      <div className="form-left">
        <div className="form-group">
          <div className="form-label">Requestor:</div>
          {readOnly ? (
            <div className="form-value">{request.requestor || "-"}</div>
          ) : (
            <input
              type="text"
              className="text-input"
              value={request.requestor || ""}
              onChange={(e) => onFieldChange("requestor", e.target.value)}
            />
          )}
        </div>
        <div className="form-group">
          <div className="form-label">Venue:</div>
          {readOnly ? (
            <div className="form-value">{request.venue || "-"}</div>
          ) : (
            <input
              type="text"
              className="text-input"
              value={request.venue || ""}
              onChange={(e) => onFieldChange("venue", e.target.value)}
            />
          )}
        </div>
        <div className="form-group">
          <div className="form-label">Nature of Activity:</div>
          {readOnly ? (
            <div className="form-value">{request.natureOfActivity || "-"}</div>
          ) : (
            <input
              type="text"
              className="text-input"
              value={request.natureOfActivity || ""}
              onChange={(e) => onFieldChange("natureOfActivity", e.target.value)}
            />
          )}
        </div>
        <div className="form-group">
          <div className="form-label">Activity:</div>
          {readOnly ? (
            <div className="form-value">{request.activity || "-"}</div>
          ) : (
            <input
              type="text"
              className="text-input"
              value={request.activity || ""}
              onChange={(e) => onFieldChange("activity", e.target.value)}
            />
          )}
        </div>
        <div className="form-group">
          <div className="form-label">Purpose:</div>
          {readOnly ? (
            <div className="form-value">{request.purpose || "-"}</div>
          ) : (
            <input
              type="text"
              className="text-input"
              value={request.purpose || ""}
              onChange={(e) => onFieldChange("purpose", e.target.value)}
            />
          )}
        </div>
      </div>
      <div className="form-right">
        <div className="form-group">
          <div className="form-label">Date Submitted:</div>
          <div className="form-value">{request.dateSubmitted || "-"}</div>
        </div>
        <div className="form-group">
          <div className="form-label">Date Needed:</div>
          {readOnly ? (
            <div className="form-value">{request.dateNeeded || "-"}</div>
          ) : (
            <input
              type="date"
              className="date-input"
              value={request.dateNeeded || ""}
              onChange={(e) => onFieldChange("dateNeeded", e.target.value)}
            />
          )}
        </div>
        <div className="form-group">
          <div className="form-label">Time Start:</div>
          {readOnly ? (
            <div className="form-value">{request.timeStart || "-"}</div>
          ) : (
            <input
              type="text"
              className="text-input"
              value={request.timeStart || ""}
              onChange={(e) => onFieldChange("timeStart", e.target.value)}
              placeholder="e.g. 8:00 am - 5:00 pm"
            />
          )}
        </div>
        <div className="form-group">
          <div className="form-label">Special Instruction:</div>
          {readOnly ? (
            <div className="form-value">{request.specialInstruction || "N/A"}</div>
          ) : (
            <input
              type="text"
              className="text-input"
              value={request.specialInstruction || ""}
              onChange={(e) => onFieldChange("specialInstruction", e.target.value)}
            />
          )}
        </div>
        <div className="form-group">
          <div className="form-label">Materials and Equipment:</div>
          {readOnly ? (
            <div className="form-value">{request.materialsEquipment || "-"}</div>
          ) : (
            <input
              type="text"
              className="text-input"
              value={request.materialsEquipment || ""}
              onChange={(e) => onFieldChange("materialsEquipment", e.target.value)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// Job Request Form Component
export const JobRequestForm = ({ request, onFieldChange, readOnly, onAddParticulars }) => {
  return (
    <div className="form-grid">
      <div className="form-left">
        <div className="form-group">
          <div className="form-label">Date Submitted:</div>
          <div className="form-value">{request.dateSubmitted || "-"}</div>
        </div>
        <div className="form-group">
          <div className="form-label">Date Needed:</div>
          {readOnly ? (
            <div className="form-value">{request.dateNeeded || "-"}</div>
          ) : (
            <input
              type="date"
              className="date-input"
              value={request.dateNeeded || ""}
              onChange={(e) => onFieldChange("dateNeeded", e.target.value)}
            />
          )}
        </div>
        <div className="form-group">
          <div className="form-label">Date Completed:</div>
          <div className="form-value">{request.dateCompleted || "-"}</div>
        </div>
        <div className="form-group">
          <div className="form-label">Nature of Work:</div>
          {readOnly ? (
            <div className="form-value">{request.natureOfWork || "-"}</div>
          ) : (
            <input
              type="text"
              className="text-input"
              value={request.natureOfWork || ""}
              onChange={(e) => onFieldChange("natureOfWork", e.target.value)}
            />
          )}
        </div>
      </div>
      <div className="form-right">
        <table className="particulars-table">
          <thead>
            <tr>
              <th className="particulars-header">Qty</th>
              <th className="particulars-header">Particulars</th>
            </tr>
          </thead>
          <tbody>
            {request.particulars.map((item, index) => (
              <tr key={index}>
                <td className="particulars-cell">
                  {readOnly ? (
                    <div className="form-value">{item.qty || "-"}</div>
                  ) : (
                    <input
                      type="text"
                      className="qty-input"
                      value={item.qty}
                      onChange={(e) =>
                        onFieldChange(
                          "particulars",
                          request.particulars.map((p, i) =>
                            i === index ? { ...p, qty: e.target.value } : p
                          )
                        )
                      }
                    />
                  )}
                </td>
                <td className="particulars-cell">
                  {readOnly ? (
                    <div className="form-value">{item.details || "-"}</div>
                  ) : (
                    <input
                      type="text"
                      className="details-input"
                      value={item.details}
                      onChange={(e) =>
                        onFieldChange(
                          "particulars",
                          request.particulars.map((p, i) =>
                            i === index ? { ...p, details: e.target.value } : p
                          )
                        )
                      }
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!readOnly && (
          <button className="add-item-button" onClick={onAddParticulars}>
            + Add item
          </button>
        )}
      </div>
    </div>
  );
};

// Purchase Request Form Component
export const PurchaseRequestForm = ({ request, onFieldChange, readOnly, onAddParticulars }) => {
  return (
    <div className="form-grid">
      <div className="form-left">
        <div className="form-group">
          <div className="form-label">From:</div>
          {readOnly ? (
            <div className="form-value">{request.from || "-"}</div>
          ) : (
            <input
              type="text"
              className="text-input"
              value={request.from || ""}
              onChange={(e) => onFieldChange("from", e.target.value)}
            />
          )}
        </div>
        <div className="form-group">
          <div className="form-label">Date Submitted:</div>
          <div className="form-value">{request.dateSubmitted || "-"}</div>
        </div>
        <div className="form-group">
          <div className="form-label">Date Needed:</div>
          {readOnly ? (
            <div className="form-value">{request.dateNeeded || "-"}</div>
          ) : (
            <input
              type="date"
              className="date-input"
              value={request.dateNeeded || ""}
              onChange={(e) => onFieldChange("dateNeeded", e.target.value)}
            />
          )}
        </div>
        <div className="form-group">
          <div className="form-label">Nature of Work:</div>
          {readOnly ? (
            <div className="form-value">{request.natureOfWork || "-"}</div>
          ) : (
            <input
              type="text"
              className="text-input"
              value={request.natureOfWork || ""}
              onChange={(e) => onFieldChange("natureOfWork", e.target.value)}
            />
          )}
        </div>
      </div>
      <div className="form-right">
        <table className="particulars-table">
          <thead>
            <tr>
              <th className="particulars-header">Qty</th>
              <th className="particulars-header">Particulars</th>
            </tr>
          </thead>
          <tbody>
            {request.particulars.map((item, index) => (
              <tr key={index}>
                <td className="particulars-cell">
                  {readOnly ? (
                    <div className="form-value">{item.qty || "-"}</div>
                  ) : (
                    <input
                      type="text"
                      className="qty-input"
                      value={item.qty}
                      onChange={(e) =>
                        onFieldChange(
                          "particulars",
                          request.particulars.map((p, i) =>
                            i === index ? { ...p, qty: e.target.value } : p
                          )
                        )
                      }
                    />
                  )}
                </td>
                <td className="particulars-cell">
                  {readOnly ? (
                    <div className="form-value">{item.details || "-"}</div>
                  ) : (
                    <input
                      type="text"
                      className="details-input"
                      value={item.details}
                      onChange={(e) =>
                        onFieldChange(
                          "particulars",
                          request.particulars.map((p, i) =>
                            i === index ? { ...p, details: e.target.value } : p
                          )
                        )
                      }
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!readOnly && (
          <button className="add-item-button" onClick={onAddParticulars}>
            + Add item
          </button>
        )}
      </div>
    </div>
  );
};
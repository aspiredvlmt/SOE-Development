import React, { useState } from "react";
import "./FacilityReservationForm.css";

const FacilityReservationForm = () => {
  const [showOtherInput, setShowOtherInput] = useState(false);

  return (
    <div className="form-container">
      <div className="form-box">
        <h2 className="form-title">Facility Reservation Form</h2>
        <p className="form-subtitle">Kindly fill out all the required fields.</p>
        <p className="form-recommendation">
          Recommendation: Reserve facility 7 days before the event.
        </p>

        {/* Venue and Activity */}
        <div className="form-row">
          <div className="form-group">
            <label>Venue</label>
            <select>
              <option>Select Venue</option>
            </select>
          </div>

          <div className="form-group">
            <label>Nature of Activity</label>
            <select>
              <option>Select Activity</option>
            </select>
          </div>
        </div>

        {/* Date and Time */}
        <div className="form-row">
          <div className="form-group">
            <label>Date Start</label>
            <input type="date" />
          </div>
          <div className="form-group">
            <label>Time Start</label>
            <input type="time" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Date Ended</label>
            <input type="date" />
          </div>
          <div className="form-group">
            <label>Time End</label>
            <input type="time" />
          </div>
        </div>

        {/* Activity and Purpose */}
        <div className="form-group">
          <label>Activity</label>
          <input type="text" />
        </div>

        <div className="form-group">
          <label>Purpose</label>
          <input type="text" />
        </div>

        {/* Materials and Equipment */}
        <div className="form-group">
          <label>Materials and Equipment Needed</label>
          <div className="grid-container">
            {[
              "Chairs",
              "Tables",
              "LED Monitor",
              "LCD Projector",
              "Electric Fans",
              "Microphones",
              "Whiteboards",
              "Water Dispenser",
            ].map((item) => (
              <div key={item} className="grid-item">
                <label>{item}</label>
                <input type="number" min="0" defaultValue="0" />
              </div>
            ))}

            {/* Others Checkbox and Input */}
            <div className="grid-item">
              <div className="others-container">
                <input
                  type="checkbox"
                  onChange={() => setShowOtherInput(!showOtherInput)}
                />
                <label>Others</label>
                {showOtherInput && <input type="text" placeholder="Specify..." />}
              </div>
            </div>
          </div>
        </div>

        {/* Special Note */}
        <div className="form-group">
          <label>Special Note</label>
          <textarea></textarea>
        </div>

        {/* Submit Button */}
        <button className="submit-button">Submit Request</button>
      </div>
    </div>
  );
};

export default FacilityReservationForm;

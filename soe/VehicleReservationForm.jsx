import React from 'react';

const VehicleReservationForm = ({ formData, handleChange }) => {
  return (
    <>
      <div className="form-group">
        <label className="form-label">From</label>
        <input type="text" name="from" value={formData.from || ''} onChange={handleChange} className="text-input" />
      </div>
      <div className="form-group">
        <label className="form-label">Date Needed</label>
        <input type="date" name="dateNeeded" value={formData.dateNeeded || ''} onChange={handleChange} className="text-input" />
      </div>
      <div className="form-group">
        <label className="form-label">Nature of Work</label>
        <input type="text" name="natureOfWork" value={formData.natureOfWork || ''} onChange={handleChange} className="text-input" />
      </div>
      <div className="form-group">
        <label className="form-label">Requestor</label>
        <input type="text" name="requestor" value={formData.requestor || ''} onChange={handleChange} className="text-input" />
      </div>
      <div className="form-group">
        <label className="form-label">Departure Time</label>
        <input type="time" name="departureTime" value={formData.departureTime || ''} onChange={handleChange} className="text-input" />
      </div>
      <div className="form-group">
        <label className="form-label">Arrival Time</label>
        <input type="time" name="arrivalTime" value={formData.arrivalTime || ''} onChange={handleChange} className="text-input" />
      </div>
      <div className="form-group">
        <label className="form-label">Driver</label>
        <input type="text" name="driver" value={formData.driver || ''} onChange={handleChange} className="text-input" />
      </div>
      <div className="form-group">
        <label className="form-label">Destination</label>
        <input type="text" name="destination" value={formData.destination || ''} onChange={handleChange} className="text-input" />
      </div>
      <div className="form-group">
        <label className="form-label">Purpose</label>
        <input type="text" name="purpose" value={formData.purpose || ''} onChange={handleChange} className="text-input" />
      </div>
      <div className="form-group">
        <label className="form-label">Passenger Count</label>
        <input type="number" name="passengerCount" value={formData.passengerCount || ''} onChange={handleChange} className="text-input" />
      </div>
      <div className="form-group">
        <label className="form-label">Passengers</label>
        <input type="text" name="passengers" value={formData.passengers || ''} onChange={handleChange} className="text-input" />
      </div>
    </>
  );
};

export default VehicleReservationForm;
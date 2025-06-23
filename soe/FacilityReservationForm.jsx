import React from 'react';

const FacilityReservationForm = ({ formData, handleChange }) => {
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
        <label className="form-label">Facility Name</label>
        <input type="text" name="facilityName" value={formData.facilityName || ''} onChange={handleChange} className="text-input" />
      </div>
      <div className="form-group">
        <label className="form-label">Reservation Date</label>
        <input type="date" name="reservationDate" value={formData.reservationDate || ''} onChange={handleChange} className="text-input" />
      </div>
      <div className="form-group">
        <label className="form-label">Start Time</label>
        <input type="time" name="startTime" value={formData.startTime || ''} onChange={handleChange} className="text-input" />
      </div>
      <div className="form-group">
        <label className="form-label">End Time</label>
        <input type="time" name="endTime" value={formData.endTime || ''} onChange={handleChange} className="text-input" />
      </div>
    </>
  );
};

export default FacilityReservationForm;
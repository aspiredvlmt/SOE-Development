import React from 'react';

const JobRequestForm = ({ formData, handleChange, handleParticularChange, addParticular, removeParticular }) => {
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

      <label className="form-label">Particulars</label>
      {formData.particulars && formData.particulars.map((particular, index) => (
        <div key={index} className="form-group" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type="text"
            name="qty"
            placeholder="Quantity"
            value={particular.qty}
            onChange={(e) => handleParticularChange(index, e)}
            className="text-input"
            style={{ flex: 0.2 }}
          />
          <input
            type="text"
            name="details"
            placeholder="Details"
            value={particular.details}
            onChange={(e) => handleParticularChange(index, e)}
            className="text-input"
            style={{ flex: 0.7 }}
          />
          <button type="button" onClick={() => removeParticular(index)} className="modal-cancel-button" style={{ padding: '8px', flex: 0.1 }}>-</button>
        </div>
      ))}
      <button type="button" onClick={addParticular} className="modal-confirm-button" style={{ width: 'auto', marginTop: '10px' }}>Add Particular</button>
    </>
  );
};

export default JobRequestForm;
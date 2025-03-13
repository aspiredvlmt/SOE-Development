import React, { useState } from 'react';
import './job-request-form.css';
import ConfirmationPopup from './ConfirmationPopup';

const JobRequestForm = () => {
  const [formData, setFormData] = useState({
    dateNeeded: '',
    purpose: '',
    items: [
      { qty: '', particulars: '', natureOfWork: '', remarks: '' },
      { qty: '', particulars: '', natureOfWork: '', remarks: '' },
      { qty: '', particulars: '', natureOfWork: '', remarks: '' },
      { qty: '', particulars: '', natureOfWork: '', remarks: '' }
    ]
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDateChange = (e) => {
    setFormData({
      ...formData,
      dateNeeded: e.target.value
    });
  };

  const handlePurposeChange = (e) => {
    setFormData({
      ...formData,
      purpose: e.target.value
    });
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value
    };
    
    setFormData({
      ...formData,
      items: updatedItems
    });
  };

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { qty: '', particulars: '', natureOfWork: '', remarks: '' }]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirmSubmit = () => {
    console.log('Form submitted with data:', formData);
    alert('Job Request Form successfully submitted!');
    setShowConfirmation(false);
  };

  const handleCancelSubmit = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="job-form-container">
      <div className="form-number">GSO-JR-0001</div>
      
      <div className="job-form-header">
        <h1>Job Request Form</h1>
        <p>Kindly fill out all the required fields.</p>
        <p className="sub-text">Advance requisition of items are highly recommended.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="date-field">
          <label htmlFor="dateNeeded">Date Needed</label>
          <input
            type="date"
            id="dateNeeded"
            value={formData.dateNeeded}
            onChange={handleDateChange}
          />
        </div>

        <div className="purpose-field">
          <label htmlFor="purpose">Purpose</label>
          <input
            type="text"
            id="purpose"
            value={formData.purpose}
            onChange={handlePurposeChange}
          />
        </div>

        <div className="job-items-table">
          <div className="form-table-labels">
            <div className="qty-label">Qty</div>
            <div className="particulars-label">Particulars</div>
            <div className="nature-label">Nature of Work</div>
            <div className="remarks-label">Remarks</div>
          </div>
          
          {formData.items.map((item, index) => (
            <div key={index} className="job-item-row">
              <input
                type="number"
                value={item.qty}
                onChange={(e) => handleItemChange(index, 'qty', e.target.value)}
                min="0"
                className="qty-input"
              />
              <input
                type="text"
                value={item.particulars}
                onChange={(e) => handleItemChange(index, 'particulars', e.target.value)}
                className="particulars-input"
              />
              <input
                type="text"
                value={item.natureOfWork}
                onChange={(e) => handleItemChange(index, 'natureOfWork', e.target.value)}
                className="nature-input"
              />
              <input
                type="text"
                value={item.remarks}
                onChange={(e) => handleItemChange(index, 'remarks', e.target.value)}
                className="remarks-input"
              />
            </div>
          ))}
          
          <div className="add-button-container">
            <button 
              type="button" 
              className="add-button"
              onClick={handleAddItem}
            >
              add
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="submit-button"
        >
          Submit Request
        </button>
      </form>

      {showConfirmation && (
        <ConfirmationPopup 
          onConfirm={handleConfirmSubmit}
          onCancel={handleCancelSubmit}
        />
      )}
    </div>
  );
};

export default JobRequestForm;
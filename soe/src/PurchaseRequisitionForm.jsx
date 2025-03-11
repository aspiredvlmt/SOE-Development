import React, { useState } from 'react';
import './purchase-requisition-form.css';
import ConfirmationPopup from './ConfirmationPopup';

const PurchaseRequisitionForm = () => {
  const [formData, setFormData] = useState({
    category: {
      officeSupplies: false,
      computerParts: false,
      machineryParts: false,
      electricalSupply: false,
      others: false,
      officeEquipment: false,
      toolsEquipment: false,
      publications: false,
      otherConsumables: false
    },
    dateNeeded: '',
    items: [
      { qty: '', description: 'Pencils' },
      { qty: '', description: '' },
      { qty: '', description: '' }
    ],
    purpose: ''
  });

  // Add state for showing the confirmation popup
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleCategoryChange = (category) => {
    setFormData({
      ...formData,
      category: {
        ...formData.category,
        [category]: !formData.category[category]
      }
    });
  };

  const handleDateChange = (e) => {
    setFormData({
      ...formData,
      dateNeeded: e.target.value
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

  // New function to add an item
  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { qty: '', description: '' }]
    });
  };

  const handlePurposeChange = (e) => {
    setFormData({
      ...formData,
      purpose: e.target.value
    });
  };

  // Updated submit handler to show confirmation popup
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  // Handler for confirm button in popup
  const handleConfirmSubmit = () => {
    // Process the actual form submission
    console.log('Form submitted with data:', formData);
    
    // Here you would typically make an API call to submit the data
    alert('Form successfully submitted!');
    
    // Close the popup
    setShowConfirmation(false);
    
    // Optional: Reset the form
    // resetForm();
  };

  // Handler for cancel button in popup
  const handleCancelSubmit = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Purchase Requisition Form</h1>
        <p>Kindly fill out all the required fields</p>
        <p className="sub-text">Accurate quotation of items are highly recommended</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="checkbox-container">
          <div className="checkbox-item">
            <input
              type="checkbox"
              id="officeSupplies"
              checked={formData.category.officeSupplies}
              onChange={() => handleCategoryChange('officeSupplies')}
            />
            <label htmlFor="officeSupplies">Office Supplies</label>
          </div>
          
          <div className="checkbox-item">
            <input
              type="checkbox"
              id="computerParts"
              checked={formData.category.computerParts}
              onChange={() => handleCategoryChange('computerParts')}
            />
            <label htmlFor="computerParts">Computer Parts</label>
          </div>
          
          <div className="checkbox-item">
            <input
              type="checkbox"
              id="machineryParts"
              checked={formData.category.machineryParts}
              onChange={() => handleCategoryChange('machineryParts')}
            />
            <label htmlFor="machineryParts">Machinery/Parts</label>
          </div>
          
          <div className="checkbox-item">
            <input
              type="checkbox"
              id="electricalSupply"
              checked={formData.category.electricalSupply}
              onChange={() => handleCategoryChange('electricalSupply')}
            />
            <label htmlFor="electricalSupply">Electrical Supply</label>
          </div>
          
          <div className="checkbox-item">
            <input
              type="checkbox"
              id="others"
              checked={formData.category.others}
              onChange={() => handleCategoryChange('others')}
            />
            <label htmlFor="others">Others</label>
          </div>
        </div>

        <div className="checkbox-container-second-row">
          <div className="checkbox-item">
            <input
              type="checkbox"
              id="officeEquipment"
              checked={formData.category.officeEquipment}
              onChange={() => handleCategoryChange('officeEquipment')}
            />
            <label htmlFor="officeEquipment">Office Equipment</label>
          </div>
          
          <div className="checkbox-item">
            <input
              type="checkbox"
              id="toolsEquipment"
              checked={formData.category.toolsEquipment}
              onChange={() => handleCategoryChange('toolsEquipment')}
            />
            <label htmlFor="toolsEquipment">Tools/Equipment</label>
          </div>
          
          <div className="checkbox-item">
            <input
              type="checkbox"
              id="publications"
              checked={formData.category.publications}
              onChange={() => handleCategoryChange('publications')}
            />
            <label htmlFor="publications">Publications</label>
          </div>
          
          <div className="checkbox-item">
            <input
              type="checkbox"
              id="otherConsumables"
              checked={formData.category.otherConsumables}
              onChange={() => handleCategoryChange('otherConsumables')}
            />
            <label htmlFor="otherConsumables">Other Consumables</label>
          </div>
        </div>

        <div className="date-field">
          <label htmlFor="dateNeeded">Date Needed</label>
          <input
            type="date"
            id="dateNeeded"
            value={formData.dateNeeded}
            onChange={handleDateChange}
          />
        </div>

        <div className="items-table">
          <div className="items-header">
            <div className="table-header">
              <label>Qty</label>
              <label>Particulars / Item Description /Specifications</label>
            </div>
            <button 
              type="button" 
              className="add-item-button"
              onClick={handleAddItem}
            >
              Add
            </button>
          </div>
          
          {formData.items.map((item, index) => (
            <div key={index} className="item-row">
              <input
                type="number"
                value={item.qty}
                onChange={(e) => handleItemChange(index, 'qty', e.target.value)}
                min="0"
              />
              <input
                type="text"
                value={item.description}
                placeholder={index === 0 ? "" : "Type here..."}
                onChange={(e) => handleItemChange(index, 'description', e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="purpose-field">
          <label htmlFor="purpose">Purpose of Request</label>
          <input
            type="text"
            id="purpose"
            value={formData.purpose}
            onChange={handlePurposeChange}
          />
        </div>

        <button
          type="submit"
          className="submit-button"
        >
          Submit Request
        </button>
      </form>
      
      <div className="form-number">GSO-PR-001</div>

      {/* Render the confirmation popup conditionally */}
      {showConfirmation && (
        <ConfirmationPopup 
          onConfirm={handleConfirmSubmit}
          onCancel={handleCancelSubmit}
        />
      )}
    </div>
  );
};

export default PurchaseRequisitionForm;
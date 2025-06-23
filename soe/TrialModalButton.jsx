import React, { useState } from 'react';
import SubmissionSuccessModal from './SubmissionSuccessModal'; // Import the new modal component

/**
 * A self-contained component to demonstrate a "Submit Request" button
 * that triggers a success modal pop-up with a reference code.
 */
const TrialModalButton = () => {
  // State to manage whether the modal is visible or hidden
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [referenceCode, setReferenceCode] = useState(''); // State to hold the generated reference code
  
  // Sample reference codes that can be randomly generated
  const sampleReferenceCodes = [
    "OSO-FR-0001",
    "OSO-VR-0001", 
    "OSO-JR-0001",
    "OSO-PR-0001"
  ];

  // Function to generate a random reference code
  const generateReferenceCode = () => {
    return sampleReferenceCodes[Math.floor(Math.random() * sampleReferenceCodes.length)];
  };

  // This function is called when the "Submit Request" button is clicked
  const handleSubmit = () => {
    setReferenceCode(generateReferenceCode()); // Generate and set the reference code
    setIsModalOpen(true); // This will make the modal appear
  };
  
  // This function is called when the modal's "Okay" button or overlay is clicked
  const handleCloseModal = () => {
    setIsModalOpen(false); // This will hide the modal
  };

  const trialContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    marginTop: '20px'
  };

  const trialSubmitButtonStyle = {
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s ease'
  };

  return (
    <>
      {/* This container centers the button on the page for the trial. */}
      <div style={trialContainerStyle}>
        {/* This is the button that you can click to test the modal. */}
        <button style={trialSubmitButtonStyle} onClick={handleSubmit}>
          Submit Request
        </button>
      </div>

      {/* This is the JSX for the modal. 
        It is only rendered and shown if 'isModalOpen' is true.
      */}
      <SubmissionSuccessModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        referenceCode={referenceCode}
      />
    </>
  );
};

export default TrialModalButton;
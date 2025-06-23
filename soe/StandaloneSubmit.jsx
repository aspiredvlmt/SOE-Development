import React, { useState } from 'react';
import SubmissionSuccessModal from './SubmissionSuccessModal'; // Import the new modal component

/**
 * A standalone submit component that shows only a submit button
 * and displays a success modal with reference code when clicked.
 */
const StandaloneSubmit = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');

  // Reference code options
  const referenceCodes = [
    'GSO-FR-0001',
    'GSO-VR-0001', 
    'GSO-JR-0001',
    'GSO-PR-0001',
    'GSO-MR-0001'
  ];

  const handleSubmit = () => {
    // Generate random reference code
    const randomCode = referenceCodes[Math.floor(Math.random() * referenceCodes.length)];
    setReferenceCode(randomCode);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f3f7fa',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        style={{
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          padding: '16px 32px',
          borderRadius: '8px',
          fontSize: '18px',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.2s ease',
          minWidth: '200px'
        }}
      >
        Submit Request
      </button>

      {/* Success Modal */}
      <SubmissionSuccessModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        referenceCode={referenceCode}
      />
    </div>
  );
};

export default StandaloneSubmit;
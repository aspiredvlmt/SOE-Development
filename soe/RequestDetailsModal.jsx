import React from 'react';

const RequestDetailsModal = ({ request, onClose, onApprove, onReject, onMarkAsCompleted, renderForm }) => {
  if (!request) {
    return null;
  }

  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(17, 24, 39, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
    backdropFilter: 'blur(4px)'
  };

  const modalContainerStyle = {
    backgroundColor: '#ffffff',
    padding: '32px',
    borderRadius: '12px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
    width: '90%',
    maxWidth: '600px',
    maxHeight: '90vh',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    margin: '20px'
  };

  const detailItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px dashed #e5e7eb'
  };

  const detailLabelStyle = {
    fontWeight: '600',
    color: '#4b5563',
    flex: 1
  };

  const detailValueStyle = {
    color: '#374151',
    flex: 2,
    textAlign: 'right'
  };

  const modalTitleStyle = {
    fontSize: '24px',
    fontWeight: '700',
    color: '#111827',
    margin: '0 0 8px 0',
  };

  const modalSubtitleStyle = {
    color: '#6b7280',
    margin: '0 0 24px 0',
    fontSize: '14px',
  };

  const modalActionsStyle = {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
    marginTop: '24px'
  };

  const buttonStyle = {
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background-color 0.2s',
  };

  const approveButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#10b981', // Green for Approve
    color: 'white',
  };

  const rejectButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#ef4444', // Red for Reject
    color: 'white',
  };

  const completeButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#f59e0b', // Amber for Complete
    color: 'white',
  };

  const closeButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#e5e7eb', // Grey for Close
    color: '#374151',
  };

  return (
    <div style={modalOverlayStyle} onClick={onClose}>
      <div style={modalContainerStyle} onClick={(e) => e.stopPropagation()}>
        <h3 style={modalTitleStyle}>Request Details: {request.referenceNo}</h3>
        <p style={modalSubtitleStyle}>Type: {request.type}</p>

        {/* Display common details */}
        <div style={detailItemStyle}>
          <span style={detailLabelStyle}>From:</span>
          <span style={detailValueStyle}>{request.from}</span>
        </div>
        <div style={detailItemStyle}>
          <span style={detailLabelStyle}>Date Submitted:</span>
          <span style={detailValueStyle}>{request.dateSubmitted}</span>
        </div>
        <div style={detailItemStyle}>
          <span style={detailLabelStyle}>Date Needed:</span>
          <span style={detailValueStyle}>{request.dateNeeded}</span>
        </div>
        <div style={detailItemStyle}>
          <span style={detailLabelStyle}>Status:</span>
          <span style={detailValueStyle}>{request.status}</span>
        </div>
        <div style={detailItemStyle}>
          <span style={detailLabelStyle}>Nature of Work:</span>
          <span style={detailValueStyle}>{request.natureOfWork}</span>
        </div>
        {request.dateCompleted && (
          <div style={detailItemStyle}>
            <span style={detailLabelStyle}>Date Completed:</span>
            <span style={detailValueStyle}>{request.dateCompleted}</span>
          </div>
        )}
        {request.rejectionReason && request.status === "Rejected" && (
          <div style={detailItemStyle}>
            <span style={detailLabelStyle}>Rejection Reason:</span>
            <span style={detailValueStyle}>{request.rejectionReason}</span>
          </div>
        )}

        {/* Display type-specific details based on the form rendering logic */}
        {request.type === "Vehicle" && (
          <>
            <div style={detailItemStyle}>
              <span style={detailLabelStyle}>Departure Time:</span>
              <span style={detailValueStyle}>{request.departureTime}</span>
            </div>
            <div style={detailItemStyle}>
              <span style={detailLabelStyle}>Arrival Time:</span>
              <span style={detailValueStyle}>{request.arrivalTime}</span>
            </div>
            <div style={detailItemStyle}>
              <span style={detailLabelStyle}>Driver:</span>
              <span style={detailValueStyle}>{request.driver}</span>
            </div>
            <div style={detailItemStyle}>
              <span style={detailLabelStyle}>Destination:</span>
              <span style={detailValueStyle}>{request.destination}</span>
            </div>
            <div style={detailItemStyle}>
              <span style={detailLabelStyle}>Purpose:</span>
              <span style={detailValueStyle}>{request.purpose}</span>
            </div>
            <div style={detailItemStyle}>
              <span style={detailLabelStyle}>Passenger Count:</span>
              <span style={detailValueStyle}>{request.passengerCount}</span>
            </div>
            <div style={detailItemStyle}>
              <span style={detailLabelStyle}>Passengers:</span>
              <span style={detailValueStyle}>{request.passengers}</span>
            </div>
          </>
        )}
        {request.type === "Facility" && (
          <>
            <div style={detailItemStyle}>
              <span style={detailLabelStyle}>Facility Name:</span>
              <span style={detailValueStyle}>{request.facilityName}</span>
            </div>
            <div style={detailItemStyle}>
              <span style={detailLabelStyle}>Reservation Date:</span>
              <span style={detailValueStyle}>{request.reservationDate}</span>
            </div>
            <div style={detailItemStyle}>
              <span style={detailLabelStyle}>Start Time:</span>
              <span style={detailValueStyle}>{request.startTime}</span>
            </div>
            <div style={detailItemStyle}>
              <span style={detailLabelStyle}>End Time:</span>
              <span style={detailValueStyle}>{request.endTime}</span>
            </div>
          </>
        )}
        {(request.type === "Job" || request.type === "Purchase") && request.particulars && request.particulars.length > 0 && (
          <div>
            <h4 style={{ margin: '16px 0 8px 0', color: '#374151' }}>Particulars:</h4>
            {request.particulars.map((item, index) => (
              <div key={index} style={detailItemStyle}>
                <span style={detailLabelStyle}>Qty: {item.qty}</span>
                <span style={detailValueStyle}>{item.details}</span>
              </div>
            ))}
          </div>
        )}

        <div style={modalActionsStyle}>
          {request.status === "Pending" && (
            <>
              <button style={approveButtonStyle} onClick={() => onApprove(request.id)}>Approve</button>
              <button style={rejectButtonStyle} onClick={() => onReject(request)}>Reject</button>
            </>
          )}
          {request.status === "Ongoing" && (
            <button style={completeButtonStyle} onClick={() => onMarkAsCompleted(request.id)}>Mark as Completed</button>
          )}
          <button style={closeButtonStyle} onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default RequestDetailsModal;
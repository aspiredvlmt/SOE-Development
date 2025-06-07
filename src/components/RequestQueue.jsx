import React from 'react';
import './RequestQueue.css';

const requests = [
  { type: 'PR', ref: 'GSO-PR-0002', from: 'Mary Ann Lim', status: 'Pending' },
  { type: 'FR', ref: 'GSO-FR-0006', from: 'Rhey Verunque', status: 'Pending' },
  { type: 'JR', ref: 'GSO-JR-0004', from: 'Herliza Estrada', status: 'Pending' },
  { type: 'VR', ref: 'GSO-VR-0005', from: 'Gemma Gibaga', status: 'Pending' },
];

const RequestQueue = () => {
  return (
    <div className="request-queue">
      <h3>Request Queue</h3>
      <div className="table">
        <div className="table-header">
          <span>Type</span>
          <span>Reference Number</span>
          <span>From</span>
          <span>Status</span>
          <span>View</span>
        </div>
        {requests.map((req, index) => (
          <div className="table-row" key={index}>
            <span>{req.type}</span>
            <span>{req.ref}</span>
            <span>{req.from}</span>
            <span className="status">{req.status}</span>
            <span><a href="#" className="view-link">View</a></span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestQueue;

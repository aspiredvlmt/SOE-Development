import React, { useState } from "react";
import { Search, Bell, Edit2, ChevronDown } from "lucide-react";
import "./recordmanagement.css";
import RecordViewModal from "./RecordViewModal";

function RecordManagement() {
  // Sample initial data with expanded information for each type of request
  const initialRequests = [
    {
      id: 1,
      type: "FR",
      typeLabel: "Facility",
      referenceNo: "GSO-FR-0001",
      from: "Mary Ann Lim",
      requestor: "Mary Ann Lim",
      dateSubmitted: "12/19/2024",
      dateNeeded: "12/20/2024",
      venue: "Conference Room A",
      natureOfActivity: "Meeting",
      activity: "Project Kickoff",
      purpose: "Planning for Q1 Projects",
      timeStart: "10:00 am - 12:00 pm",
      specialInstruction: "Need projector setup",
      materialsEquipment: "Projector, Whiteboard",
      status: "Completed"
    },
    {
      id: 2,
      type: "VR",
      typeLabel: "Vehicle",
      referenceNo: "GSO-VR-0001",
      from: "Mary Ann Lim",
      requestor: "Mary Ann Lim",
      dateSubmitted: "12/19/2024",
      dateNeeded: "12/20/2024",
      departureTime: "09:00",
      arrivalTime: "17:00",
      driver: "John Smith",
      destination: "Downtown Business District",
      purpose: "Client Meeting",
      passengerCount: "3",
      passengers: "Mary Ann Lim, David Chen, Sarah Johnson",
      status: "Ongoing"
    },
    {
      id: 3,
      type: "PR",
      typeLabel: "Purchase",
      referenceNo: "GSO-PR-0001",
      from: "Herliza Estrada",
      dateSubmitted: "12/19/2024",
      dateNeeded: "12/20/2024",
      natureOfWork: "Office Supplies",
      particulars: [
        { qty: "5", details: "Reams of A4 Paper" },
        { qty: "10", details: "Black Ink Cartridges" },
        { qty: "3", details: "Staplers" }
      ],
      status: "Pending"
    },
    {
      id: 4,
      type: "JR",
      typeLabel: "Job",
      referenceNo: "GSO-JR-0001",
      from: "Herliza Estrada",
      dateSubmitted: "12/19/2024",
      dateNeeded: "12/20/2024",
      dateCompleted: "",
      natureOfWork: "Office Maintenance",
      particulars: [
        { qty: "1", details: "Fix leaking ceiling in HR department" },
        { qty: "2", details: "Replace faulty electrical outlets" }
      ],
      status: "Rejected"
    }
  ];

  // Filter options
  const statusFilterOptions = ["All", "Pending", "Ongoing", "Completed", "Rejected"];
  const typeFilterOptions = ["All", "Vehicle", "Facility", "Purchase", "Job"];

  // State management
  const [requests, setRequests] = useState(initialRequests);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("All");
  const [selectedTypeFilter, setSelectedTypeFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  
  // Filter requests based on selected filters and search query
  const filteredRequests = requests.filter((request) => {
    const matchesStatusFilter = selectedStatusFilter === "All" || request.status === selectedStatusFilter;
    const matchesTypeFilter = selectedTypeFilter === "All" || request.typeLabel === selectedTypeFilter;
    const matchesSearch =
      request.referenceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.from.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatusFilter && matchesTypeFilter && matchesSearch;
  });

  // Handle view button click
  const handleViewRequest = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="app-container">
      <div className="request-management-container">
        {/* Header */}
        <div className="header">
          <div className="header-row">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="search-icon">
                <Search size={16} />
              </div>
              <span className="search-shortcut">F</span>
            </div>
            <div className="notification-container">
              <Bell size={20} className="notification-icon" />
            </div>
          </div>

          <div className="title-container">
            <h1 className="title">Records</h1>
            <p className="subtitle">
              Statuses of request are in this module.
            </p>
          </div>
        </div>

        <hr className="divider" />

        {/* Content */}
        <div className="content-container">
          {/* Filter tabs for Status */}
          <div className="tabs-container">
            <div className="tabs">
              {statusFilterOptions.map((filter, index) => (
                <button
                  key={filter}
                  className={`tab ${
                    selectedStatusFilter === filter ? "active" : ""
                  } ${index === 0 ? "tab-first" : ""} ${
                    index === statusFilterOptions.length - 1 ? "tab-last" : ""
                  }`}
                  onClick={() => setSelectedStatusFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Type filter dropdown */}
          <div className="filters-container">
            <div className="filter-group">
              <span className="filter-label">Type:</span>
              <div className="dropdown-container">
                <select
                  className="filter-dropdown"
                  value={selectedTypeFilter}
                  onChange={(e) => setSelectedTypeFilter(e.target.value)}
                >
                  {typeFilterOptions.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className="dropdown-icon" />
              </div>
            </div>
          </div>

          {/* Request Table */}
          <div className="table-container">
            <table className="request-table">
              <thead>
                <tr>
                  <th className="table-head">Type</th>
                  <th className="table-head">Reference No.</th>
                  <th className="table-head">From</th>
                  <th className="table-head">Date Submitted</th>
                  <th className="table-head">Date Needed</th>
                  <th className="table-head">Status</th>
                  <th className="table-head">View</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => (
                    <tr key={request.id} className="table-row">
                      <td className="table-cell">{request.typeLabel}</td>
                      <td className="table-cell">{request.referenceNo}</td>
                      <td className="table-cell">{request.from}</td>
                      <td className="table-cell">{request.dateSubmitted}</td>
                      <td className="table-cell">{request.dateNeeded}</td>
                      <td className="table-cell">
                        <span className={`status-badge status-${request.status.toLowerCase()}`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="table-cell">
                        <button 
                          className="view-button"
                          onClick={() => handleViewRequest(request)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="empty-state">
                      No records found matching your filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Floating Action Button */}
          <div className="fab-container">
            <button className="fab">
              <Edit2 size={20} className="fab-icon" />
            </button>
          </div>
        </div>
      </div>

      {/* Record View Modal */}
      <RecordViewModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        request={selectedRequest}
      />
    </div>
  );
}

export default RecordManagement;
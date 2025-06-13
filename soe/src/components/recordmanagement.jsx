import React, { useState, useEffect } from "react";
import { Search, Bell, Edit2, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import "./recordmanagement.css";
import RecordViewModal from "./RecordViewModal";

function RecordManagement() {
  // Sample initial data with expanded information for each type of request
  const initialRequests = [
    { id: 1, type: "FR", typeLabel: "Facility", referenceNo: "GSO-FR-0001", from: "Mary Ann Lim", requestor: "Mary Ann Lim", dateSubmitted: "12/19/2024", dateNeeded: "12/20/2024", venue: "Conference Room A", natureOfActivity: "Meeting", activity: "Project Kickoff", purpose: "Planning for Q1 Projects", timeStart: "10:00 am - 12:00 pm", specialInstruction: "Need projector setup", materialsEquipment: "Projector, Whiteboard", status: "Completed" },
    { id: 2, type: "VR", typeLabel: "Vehicle", referenceNo: "GSO-VR-0001", from: "Mary Ann Lim", requestor: "Mary Ann Lim", dateSubmitted: "12/19/2024", dateNeeded: "12/20/2024", departureTime: "09:00", arrivalTime: "17:00", driver: "John Smith", destination: "Downtown Business District", purpose: "Client Meeting", passengerCount: "3", passengers: "Mary Ann Lim, David Chen, Sarah Johnson", status: "Ongoing" },
    { id: 3, type: "PR", typeLabel: "Purchase", referenceNo: "GSO-PR-0001", from: "Herliza Estrada", dateSubmitted: "12/19/2024", dateNeeded: "12/20/2024", natureOfWork: "Office Supplies", particulars: [{ qty: "5", details: "Reams of A4 Paper" }, { qty: "10", details: "Black Ink Cartridges" }, { qty: "3", details: "Staplers" }], status: "Pending" },
    { id: 4, type: "JR", typeLabel: "Job", referenceNo: "GSO-JR-0001", from: "Herliza Estrada", dateSubmitted: "12/19/2024", dateNeeded: "12/20/2024", dateCompleted: "", natureOfWork: "Office Maintenance", particulars: [{ qty: "1", details: "Fix leaking ceiling in HR department" }, { qty: "2", details: "Replace faulty electrical outlets" }], status: "Rejected" },
    { id: 5, type: "VR", typeLabel: "Vehicle", referenceNo: "GSO-VR-0002", from: "John Doe", requestor: "John Doe", dateSubmitted: "01/10/2025", dateNeeded: "01/12/2025", departureTime: "13:00", arrivalTime: "15:00", driver: "Jane Doe", destination: "Supplier Warehouse", purpose: "Pickup Supplies", passengerCount: "1", passengers: "John Doe", status: "Completed" },
    { id: 6, type: "PR", typeLabel: "Purchase", referenceNo: "GSO-PR-0002", from: "Jane Doe", dateSubmitted: "02/05/2025", dateNeeded: "02/15/2025", natureOfWork: "New Equipment", particulars: [{ qty: "2", details: "Laptops for new hires" }], status: "Ongoing" },
    { id: 7, type: "FR", typeLabel: "Facility", referenceNo: "GSO-FR-0002", from: "John Doe", requestor: "John Doe", dateSubmitted: "03/01/2025", dateNeeded: "03/10/2025", venue: "Auditorium", natureOfActivity: "Training", activity: "Company-wide seminar", purpose: "Annual Training", timeStart: "9:00 am - 5:00 pm", specialInstruction: "AV equipment required", materialsEquipment: "Podium, Microphone, Projector", status: "Pending" },
    { id: 8, type: "JR", typeLabel: "Job", referenceNo: "GSO-JR-0002", from: "Jane Doe", dateSubmitted: "04/20/2025", dateNeeded: "04/25/2025", dateCompleted: "", natureOfWork: "IT Support", particulars: [{ qty: "1", details: "Install new server" }], status: "Ongoing" },
    { id: 9, type: "PR", typeLabel: "Purchase", referenceNo: "GSO-PR-0003", from: "Mary Ann Lim", dateSubmitted: "05/15/2025", dateNeeded: "05/25/2025", natureOfWork: "Marketing Materials", particulars: [{ qty: "500", details: "Brochures" }, { qty: "100", details: "Business Cards" }], status: "Pending" },
    { id: 10, type: "VR", typeLabel: "Vehicle", referenceNo: "GSO-VR-0003", from: "Herliza Estrada", requestor: "Herliza Estrada", dateSubmitted: "06/01/2025", dateNeeded: "06/03/2025", departureTime: "08:00", arrivalTime: "18:00", driver: "John Smith", destination: "Conference Center", purpose: "Industry Conference", passengerCount: "4", passengers: "Herliza Estrada, Team Members", status: "Pending" }
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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Set number of items per page

  // Filter requests based on selected filters and search query
  const filteredRequests = requests.filter((request) => {
    const matchesStatusFilter = selectedStatusFilter === "All" || request.status === selectedStatusFilter;
    const matchesTypeFilter = selectedTypeFilter === "All" || request.typeLabel === selectedTypeFilter;
    const matchesSearch =
      request.referenceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.from.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatusFilter && matchesTypeFilter && matchesSearch;
  });

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedStatusFilter, selectedTypeFilter, searchQuery]);

  // Handle changing pages
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Handle view button click
  const handleViewRequest = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
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
                {currentItems.length > 0 ? (
                  currentItems.map((request) => (
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
            
          {/* Pagination Controls */}
          {filteredRequests.length > 0 && (
            <div className="pagination-container">
                <div className="pagination-info">
                    Showing <span>{Math.min(indexOfFirstItem + 1, filteredRequests.length)}</span> to <span>{Math.min(indexOfLastItem, filteredRequests.length)}</span> of <span>{filteredRequests.length}</span> results
                </div>
                <div className="pagination">
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="page-link">
                        <ChevronLeft size={16} />
                        <span>Previous</span>
                    </button>
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages || totalPages === 0} className="page-link">
                        <span>Next</span>
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
          )}


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

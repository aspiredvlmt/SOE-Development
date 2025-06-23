import React, { useState, useEffect } from "react";
import { Search, Bell, Edit2, ChevronLeft, ChevronRight } from "lucide-react";
// Corrected import paths assuming individual files for each form component
import VehicleReservationForm from "./VehicleReservationForm"; // Corrected import
import FacilityReservationForm from "./FacilityReservationForm"; // Corrected import
import JobRequestForm from "./JobRequestForm"; // Corrected import
import PurchaseRequestForm from "./PurchaseRequestForm"; // Corrected import
import RequestDetailsModal from "./RequestDetailsModal"; // Corrected import
import SubmissionSuccessModal from "./SubmissionSuccessModal"; // Corrected import
import TrialModalButton from "./TrialModalButton"; // Corrected import
import "./requestmanagement.css"; // Corrected import



function RequestManagement() {
    // Sample initial data
    const initialRequests = [
        { id: 1, type: "Vehicle", referenceNo: "OSO-VR-0001", from: "Herliza Estrada", dateSubmitted: "05/09/2025", dateNeeded: "05/09/2025", status: "Ongoing", natureOfWork: "Service", dateCompleted: "", particulars: [{ qty: "", details: "" }], requestor: "John Doe", departureTime: "08:00", arrivalTime: "17:00", driver: "Mike Smith", destination: "Downtown Office", purpose: "Client Meeting", passengerCount: "3", passengers: "John Doe, Jane Smith, Mark Johnson" },
        { id: 2, type: "Facility", referenceNo: "OSO-FR-0001", from: "Herliza Estrada", dateSubmitted: "05/09/2025", dateNeeded: "05/22/2025", status: "Ongoing", natureOfWork: "Facility Reservation", dateCompleted: "", particulars: [{ qty: "", details: "" }], requestor: "Jane Smith", facilityName: "Conference Room A", reservationDate: "05/22/2025", startTime: "09:00", endTime: "12:00" },
        { id: 3, type: "Job", referenceNo: "OSO-JR-0001", from: "Michael Johnson", dateSubmitted: "05/10/2025", dateNeeded: "05/15/2025", status: "Completed", natureOfWork: "Repair", dateCompleted: "05/15/2025", particulars: [{ qty: "1", details: "Fix leaky faucet in breakroom" }], requestor: "Michael Johnson" },
        { id: 4, type: "Purchase", referenceNo: "OSO-PR-0001", from: "Emily White", dateSubmitted: "05/11/2025", dateNeeded: "05/20/2025", status: "Rejected", natureOfWork: "Office Supplies", dateCompleted: "", particulars: [{ qty: "50", details: "A4 Printer Paper" }, { qty: "20", details: "Black Ink Cartridges" }], requestor: "Emily White", rejectionReason: "Budget exceeded for this quarter." },
        { id: 5, type: "Vehicle", referenceNo: "OSO-VR-0002", from: "Herliza Estrada", dateSubmitted: "06/01/2025", dateNeeded: "06/05/2025", status: "Pending", natureOfWork: "Delivery", dateCompleted: "", particulars: [{ qty: "", details: "" }], requestor: "Herliza Estrada", departureTime: "10:00", arrivalTime: "14:00", driver: "Lisa Davis", destination: "Warehouse", purpose: "Deliver new equipment", passengerCount: "1", passengers: "Herliza Estrada" },
        { id: 6, type: "Facility", referenceNo: "OSO-FR-0002", from: "Herliza Estrada", dateSubmitted: "06/02/2025", dateNeeded: "06/10/2025", status: "Ongoing", natureOfWork: "Event Setup", dateCompleted: "", particulars: [{ qty: "", details: "" }], requestor: "Herliza Estrada", facilityName: "Auditorium", reservationDate: "06/10/2025", startTime: "13:00", endTime: "17:00" },
    ];

    const [requests, setRequests] = useState(initialRequests);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("All");
    const [filterStatus, setFilterStatus] = useState("All");
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [editingRequest, setEditingRequest] = useState(null);
    const [showRejectionModal, setShowRejectionModal] = useState(false);
    const [rejectionReason, setRejectionReason] = useState("");

    // State for the success modal
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [submittedReferenceCode, setSubmittedReferenceCode] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const requestsPerPage = 5;

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterTypeChange = (event) => {
        setFilterType(event.target.value);
    };

    const handleFilterStatusChange = (event) => {
        setFilterStatus(event.target.value);
    };

    const handleOpenFormModal = (request = null) => {
        setEditingRequest(request);
        setIsFormModalOpen(true);
    };

    const handleCloseFormModal = () => {
        setIsFormModalOpen(false);
        setEditingRequest(null);
    };

    const handleOpenViewModal = (request) => {
        setSelectedRequest(request);
        setIsViewModalOpen(true);
    };

    const handleCloseViewModal = () => {
        setIsViewModalOpen(false);
        setSelectedRequest(null);
    };

    const handleOpenRejectionModal = (request) => {
        setSelectedRequest(request);
        setRejectionReason(request.rejectionReason || "");
        setShowRejectionModal(true);
    };

    const handleCancelRejection = () => {
        setShowRejectionModal(false);
        setRejectionReason("");
        setSelectedRequest(null);
    };

    const handleConfirmRejection = () => {
        if (!selectedRequest) return;

        const updatedRequests = requests.map((req) =>
            req.id === selectedRequest.id
                ? { ...req, status: "Rejected", rejectionReason: rejectionReason, dateCompleted: new Date().toLocaleDateString('en-US') }
                : req
        );
        setRequests(updatedRequests);
        setShowRejectionModal(false);
        setRejectionReason("");
        setSelectedRequest(null);
        handleCloseViewModal();
    };

    const generateReferenceNo = (type) => {
        const prefixMap = {
            "Vehicle": "OSO-VR",
            "Facility": "OSO-FR",
            "Job": "OSO-JR",
            "Purchase": "OSO-PR",
        };
        const prefix = prefixMap[type] || "OSO-GEN";
        const count = requests.filter(req => req.type === type).length + 1;
        const paddedCount = String(count).padStart(4, '0');
        return `${prefix}-${paddedCount}`;
    };

    const handleSaveRequest = (formData) => {
        if (editingRequest) {
            setRequests(requests.map(req =>
                req.id === editingRequest.id ? { ...req, ...formData } : req
            ));
        } else {
            const newId = requests.length > 0 ? Math.max(...requests.map(req => req.id)) + 1 : 1;
            const newReferenceNo = generateReferenceNo(formData.type);
            setRequests([
                ...requests,
                {
                    id: newId,
                    referenceNo: newReferenceNo,
                    dateSubmitted: new Date().toLocaleDateString('en-US'),
                    status: "Pending",
                    dateCompleted: "",
                    ...formData,
                },
            ]);
            setSubmittedReferenceCode(newReferenceNo);
            setIsSuccessModalOpen(true);
        }
        handleCloseFormModal();
    };

    const handleApproveRequest = (id) => {
        setRequests(requests.map(req =>
            req.id === id ? { ...req, status: "Ongoing" } : req
        ));
        handleCloseViewModal();
    };

    const handleMarkAsCompleted = (id) => {
        setRequests(requests.map(req =>
            req.id === id ? { ...req, status: "Completed", dateCompleted: new Date().toLocaleDateString('en-US') } : req
        ));
        handleCloseViewModal();
    };

    const filteredRequests = requests.filter((request) => {
        const matchesSearch = Object.values(request).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        );
        const matchesType = filterType === "All" || request.type === filterType;
        const matchesStatus = filterStatus === "All" || request.status === filterStatus;
        return matchesSearch && matchesType && matchesStatus;
    });

    // Pagination logic
    const indexOfLastRequest = currentPage * requestsPerPage;
    const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
    const currentRequests = filteredRequests.slice(
        indexOfFirstRequest,
        indexOfLastRequest
    );

    const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const renderRequestForm = (type, formData, handleChange, handleParticularChange, addParticular, removeParticular) => {
        switch (type) {
            case "Vehicle":
                return <VehicleReservationForm formData={formData} handleChange={handleChange} />;
            case "Facility":
                return <FacilityReservationForm formData={formData} handleChange={handleChange} />;
            case "Job":
                return <JobRequestForm formData={formData} handleChange={handleChange} handleParticularChange={handleParticularChange} addParticular={addParticular} removeParticular={removeParticular} />;
            case "Purchase":
                return <PurchaseRequestForm formData={formData} handleChange={handleChange} handleParticularChange={handleParticularChange} addParticular={addParticular} removeParticular={removeParticular} />;
            default:
                return null;
        }
    };

    return (
        <div className="app-container">
            <div className="request-management-container">
                <header className="header">
                    <div className="header-row">
                        <div className="search-container">
                            <Search className="search-icon" size={20} />
                            <input
                                type="text"
                                placeholder="Search here..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="search-input"
                            />
                            <span className="search-shortcut">⌘K</span>
                        </div>
                        <div className="notification-container">
                            <Bell className="notification-icon" size={20} />
                        </div>
                    </div>
                    <div className="title-container">
                        <h1 className="title">Request Management</h1>
                        <p className="subtitle">Manage all your requests efficiently</p>
                    </div>
                </header>

                <hr className="divider" />

                <div className="tabs-container">
                    <div className="tabs">
                        <button className="tab tab-first active">All Requests</button>
                        <button className="tab tab-last">My Requests</button>
                    </div>
                    
                    <div className="filters-container">
                        <div className="filter-group">
                            <label className="filter-label">Type:</label>
                            <div className="dropdown-container">
                                <select
                                    className="filter-dropdown"
                                    value={filterType}
                                    onChange={handleFilterTypeChange}
                                >
                                    <option value="All">All Types</option>
                                    <option value="Vehicle">Vehicle Reservation</option>
                                    <option value="Facility">Facility Reservation</option>
                                    <option value="Job">Job Request</option>
                                    <option value="Purchase">Purchase Request</option>
                                </select>
                                <ChevronLeft className="dropdown-icon" size={16} />
                            </div>
                        </div>
                        
                        <div className="filter-group">
                            <label className="filter-label">Status:</label>
                            <div className="dropdown-container">
                                <select
                                    className="filter-dropdown"
                                    value={filterStatus}
                                    onChange={handleFilterStatusChange}
                                >
                                    <option value="All">All Statuses</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Ongoing">Ongoing</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                                <ChevronLeft className="dropdown-icon" size={16} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="content-container">
                    {currentRequests.length > 0 ? (
                        <>
                            <table className="request-table">
                                <thead>
                                    <tr>
                                        <th className="table-head checkbox-cell">
                                            <input type="checkbox" className="checkbox" />
                                        </th>
                                        <th className="table-head">Ref. No.</th>
                                        <th className="table-head">Type</th>
                                        <th className="table-head">From</th>
                                        <th className="table-head">Date Submitted</th>
                                        <th className="table-head">Date Needed</th>
                                        <th className="table-head">Status</th>
                                        <th className="table-head">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentRequests.map((request) => (
                                        <tr key={request.id}>
                                            <td className="table-cell checkbox-cell">
                                                <input type="checkbox" className="checkbox" />
                                            </td>
                                            <td className="table-cell">{request.referenceNo}</td>
                                            <td className="table-cell">{request.type}</td>
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
                                                    onClick={() => handleOpenViewModal(request)}
                                                >
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="pagination-container">
                                <div className="pagination-info">
                                    Showing <span>{indexOfFirstRequest + 1}</span> to <span>{Math.min(indexOfLastRequest, filteredRequests.length)}</span> of <span>{filteredRequests.length}</span> results
                                </div>
                                <div className="pagination">
                                    <button
                                        className="page-link"
                                        onClick={() => paginate(currentPage - 1)}
                                        disabled={currentPage === 1}
                                    >
                                        <ChevronLeft size={16} />
                                        Previous
                                    </button>
                                    <button
                                        className="page-link"
                                        onClick={() => paginate(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                    >
                                        Next
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="empty-state">
                            No requests found matching your criteria.
                        </div>
                    )}
                </div>

                {/* Floating Action Button */}
                <div className="fab-container">
                    <button
                        className="fab"
                        onClick={() => handleOpenFormModal()}
                        title="Add New Request"
                    >
                        <span className="fab-icon">+</span>
                    </button>
                </div>

                {/* Form Modal */}
                {isFormModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal-container">
                            <h3 className="modal-title">{editingRequest ? "Edit Request" : "Add New Request"}</h3>
                            <div className="form-content">
                                {editingRequest ? (
                                    renderRequestForm(editingRequest.type, editingRequest,
                                        (e) => setEditingRequest({ ...editingRequest, [e.target.name]: e.target.value }),
                                        (index, e) => {
                                            const newParticulars = [...editingRequest.particulars];
                                            newParticulars[index][e.target.name] = e.target.value;
                                            setEditingRequest({ ...editingRequest, particulars: newParticulars });
                                        },
                                        () => setEditingRequest({ ...editingRequest, particulars: [...editingRequest.particulars, { qty: '', details: '' }] }),
                                        (index) => {
                                            const newParticulars = editingRequest.particulars.filter((_, i) => i !== index);
                                            setEditingRequest({ ...editingRequest, particulars: newParticulars });
                                        }
                                    )
                                ) : (
                                    <RequestFormSelector onSave={handleSaveRequest} onClose={handleCloseFormModal} />
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* View Modal */}
                {isViewModalOpen && selectedRequest && (
                    <RequestDetailsModal 
                        request={selectedRequest} 
                        onClose={handleCloseViewModal} 
                        onApprove={handleApproveRequest} 
                        onReject={handleOpenRejectionModal} 
                        onMarkAsCompleted={handleMarkAsCompleted} 
                        renderForm={renderRequestForm} 
                    />
                )}

                {/* Rejection Modal */}
                {showRejectionModal && (
                    <div className="modal-overlay">
                        <div className="modal-container">
                            <h3 className="modal-title">Reasons for Rejection</h3>
                            <p className="modal-subtitle">It is required to state the reason for rejection</p>
                            <textarea 
                                className="rejection-textarea" 
                                value={rejectionReason} 
                                onChange={(e) => setRejectionReason(e.target.value)} 
                                placeholder="Enter your reason for rejection..." 
                            />
                            <div className="modal-actions">
                                <button 
                                    className="modal-confirm-button" 
                                    onClick={handleConfirmRejection} 
                                    disabled={!rejectionReason.trim()}
                                >
                                    Confirm
                                </button>
                                <button 
                                    className="modal-cancel-button" 
                                    onClick={handleCancelRejection}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Success Modal */}
                <SubmissionSuccessModal
                    isOpen={isSuccessModalOpen}
                    onClose={() => setIsSuccessModalOpen(false)}
                    referenceCode={submittedReferenceCode}
                />
            </div>

            {/* Trial Modal Button - positioned at the bottom */}
            <TrialModalButton />
        </div>
    );
}

// RequestFormSelector Component
function RequestFormSelector({ onSave, onClose }) {
    const [selectedType, setSelectedType] = useState('Vehicle');
    const [formData, setFormData] = useState({});

    useEffect(() => {
        switch (selectedType) {
            case 'Vehicle':
                setFormData({
                    type: 'Vehicle', from: '', dateNeeded: '', natureOfWork: '', requestor: '',
                    departureTime: '', arrivalTime: '', driver: '', destination: '', purpose: '', passengerCount: '', passengers: ''
                });
                break;
            case 'Facility':
                setFormData({
                    type: 'Facility', from: '', dateNeeded: '', natureOfWork: '', requestor: '',
                    facilityName: '', reservationDate: '', startTime: '', endTime: ''
                });
                break;
            case 'Job':
                setFormData({
                    type: 'Job', from: '', dateNeeded: '', natureOfWork: '', requestor: '', particulars: [{ qty: '', details: '' }]
                });
                break;
            case 'Purchase':
                setFormData({
                    type: 'Purchase', from: '', dateNeeded: '', natureOfWork: '', requestor: '', particulars: [{ qty: '', details: '' }]
                });
                break;
            default:
                setFormData({});
        }
    }, [selectedType]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleParticularChange = (index, e) => {
        const newParticulars = [...formData.particulars];
        newParticulars[index][e.target.name] = e.target.value;
        setFormData({ ...formData, particulars: newParticulars });
    };

    const addParticular = () => {
        setFormData({ ...formData, particulars: [...formData.particulars, { qty: '', details: '' }] });
    };

    const removeParticular = (index) => {
        const newParticulars = formData.particulars.filter((_, i) => i !== index);
        setFormData({ ...formData, particulars: newParticulars });
    };

    const handleSubmit = () => {
        onSave(formData);
    };

    return (
        <div>
            <div className="form-group">
                <label className="form-label">Request Type</label>
                <select 
                    className="select-input" 
                    value={selectedType} 
                    onChange={(e) => setSelectedType(e.target.value)}
                >
                    <option value="Vehicle">Vehicle Reservation</option>
                    <option value="Facility">Facility Reservation</option>
                    <option value="Job">Job Request</option>
                    <option value="Purchase">Purchase Request</option>
                </select>
            </div>
            
            {selectedType === 'Vehicle' && <VehicleReservationForm formData={formData} handleChange={handleChange} />}
            {selectedType === 'Facility' && <FacilityReservationForm formData={formData} handleChange={handleChange} />}
            {selectedType === 'Job' && <JobRequestForm formData={formData} handleChange={handleChange} handleParticularChange={handleParticularChange} addParticular={addParticular} removeParticular={removeParticular} />}
            {selectedType === 'Purchase' && <PurchaseRequestForm formData={formData} handleChange={handleChange} handleParticularChange={handleParticularChange} addParticular={addParticular} removeParticular={removeParticular} />}
            
            <div className="modal-actions">
                <button className="modal-confirm-button" onClick={handleSubmit}>Save</button>
                <button className="modal-cancel-button" onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
}

export default RequestManagement;
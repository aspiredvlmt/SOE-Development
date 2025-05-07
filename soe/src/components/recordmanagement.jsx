import React, { useState } from "react";
import { Search, Bell, Edit2, ChevronDown, X } from "lucide-react";
import "./recordmanagement.css";

function RequestManagement() {
    // Sample initial data
    const initialRequests = [
        {
            id: 1,
            type: "Job",
            referenceNo: "OSO-JR-0001",
            from: "Herliza Estrada",
            dateSubmitted: "12/19/2024",
            dateNeeded: "12/20/2024",
            status: "Pending",
            natureOfWork: "Maintenance",
            dateCompleted: "",
            particulars: [{ qty: "", details: "" }],
        },
    ];

    // Type options for dropdown
    const typeOptions = ["All", "Vehicle", "Facility", "Purchase", "Job"];

    // State management
    const [requests, setRequests] = useState(initialRequests);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("All");
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showRequests, setShowRequests] = useState(true);
    const [selectedType, setSelectedType] = useState("All"); // New state for type filter
    const [showRejectionModal, setShowRejectionModal] = useState(false);
    const [rejectionReason, setRejectionReason] = useState("");

    // Filter requests based on active tab, selected type, and search query
    const filteredRequests = requests.filter((request) => {
        const matchesTab = activeTab === "All" || request.status === activeTab;
        const matchesType = selectedType === "All" || request.type === selectedType;
        const matchesSearch =
            request.referenceNo
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            request.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
            request.natureOfWork
                .toLowerCase()
                .includes(searchQuery.toLowerCase());

        return matchesTab && matchesType && matchesSearch;
    });

    // Handle viewing a request
    const handleViewRequest = (request) => {
        setSelectedRequest(request);
    };

    // Handle adding new particulars
    const handleAddParticulars = () => {
        if (selectedRequest) {
            const updatedRequest = {
                ...selectedRequest,
                particulars: [
                    ...selectedRequest.particulars,
                    { qty: "", details: "" },
                ],
            };
            setSelectedRequest(updatedRequest);

            // Update in the main requests list
            setRequests(
                requests.map((req) =>
                    req.id === selectedRequest.id ? updatedRequest : req
                )
            );
        }
    };

    // Handle updating particulars
    const handleParticularsChange = (index, field, value) => {
        if (selectedRequest) {
            const updatedParticulars = [...selectedRequest.particulars];
            updatedParticulars[index] = {
                ...updatedParticulars[index],
                [field]: value,
            };

            const updatedRequest = {
                ...selectedRequest,
                particulars: updatedParticulars,
            };

            setSelectedRequest(updatedRequest);

            // Update in the main requests list
            setRequests(
                requests.map((req) =>
                    req.id === selectedRequest.id ? updatedRequest : req
                )
            );
        }
    };

    // Handle approving a request
    const handleApproveRequest = () => {
        if (selectedRequest) {
            const updatedRequest = { 
                ...selectedRequest, 
                status: "Ongoing" 
            };

            // Update in the main requests list
            setRequests(
                requests.map((req) =>
                    req.id === selectedRequest.id ? updatedRequest : req
                )
            );

            // Close the form and reset selection
            setSelectedRequest(null);
        }
    };
    
    // Handle opening the rejection modal
    const handleOpenRejectionModal = () => {
        setShowRejectionModal(true);
    };
    
    // Handle confirming rejection with reason
    const handleConfirmRejection = () => {
        if (selectedRequest) {
            const updatedRequest = { 
                ...selectedRequest, 
                status: "Rejected",
                rejectionReason: rejectionReason 
            };

            // Update in the main requests list
            setRequests(
                requests.map((req) =>
                    req.id === selectedRequest.id ? updatedRequest : req
                )
            );

            // Close the modal and form
            setShowRejectionModal(false);
            setSelectedRequest(null);
            setRejectionReason("");
        }
    };
    
    // Handle canceling rejection
    const handleCancelRejection = () => {
        setShowRejectionModal(false);
        setRejectionReason("");
    };

    // Handle creating a new request
    const handleNewRequest = () => {
        const newId =
            requests.length > 0
                ? Math.max(...requests.map((r) => r.id)) + 1
                : 1;
        const newReferenceNo = `OSO-JR-${String(newId).padStart(4, "0")}`;

        const newRequest = {
            id: newId,
            type: "Job", // Default type
            referenceNo: newReferenceNo,
            from: "",
            dateSubmitted: new Date().toLocaleDateString(),
            dateNeeded: "",
            status: "Pending",
            natureOfWork: "",
            dateCompleted: "",
            particulars: [{ qty: "", details: "" }],
        };

        setSelectedRequest(newRequest);
        setShowRequests(false);
    };

    // Handle saving a new request
    const handleSaveNewRequest = () => {
        if (
            selectedRequest &&
            !requests.find((r) => r.id === selectedRequest.id)
        ) {
            setRequests([...requests, selectedRequest]);
        }
        setShowRequests(true);
    };

    // Handle type change in new request form
    const handleTypeChange = (e) => {
        if (selectedRequest) {
            setSelectedRequest({
                ...selectedRequest,
                type: e.target.value,
            });
        }
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
                        <h1 className="title">Request Management</h1>
                        <p className="subtitle">
                            Statuses of request are in this module.
                        </p>
                    </div>
                </div>

                <hr className="divider" />

                {/* Tabs */}
                <div className="tabs-container">
                    <div className="tabs">
                        <button
                            className={`tab ${
                                activeTab === "All" ? "active" : ""
                            } tab-first`}
                            onClick={() => setActiveTab("All")}
                        >
                            All
                        </button>
                        <button
                            className={`tab ${
                                activeTab === "Pending" ? "active" : ""
                            }`}
                            onClick={() => setActiveTab("Pending")}
                        >
                            Pending
                        </button>
                        <button
                            className={`tab ${
                                activeTab === "Ongoing" ? "active" : ""
                            }`}
                            onClick={() => setActiveTab("Ongoing")}
                        >
                            Ongoing
                        </button>
                        <button
                            className={`tab ${
                                activeTab === "Completed" ? "active" : ""
                            } tab-last`}
                            onClick={() => setActiveTab("Completed")}
                        >
                            Completed
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="content-container">
                    {showRequests ? (
                        <>
                            {/* Type filter dropdown */}
                            <div className="filters-container">
                                <div className="filter-group">
                                    <label className="filter-label">Type:</label>
                                    <div className="dropdown-container">
                                        <select
                                            className="filter-dropdown"
                                            value={selectedType}
                                            onChange={(e) => setSelectedType(e.target.value)}
                                        >
                                            {typeOptions.map((type) => (
                                                <option key={type} value={type}>
                                                    {type}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown size={16} className="dropdown-icon" />
                                    </div>
                                </div>
                            </div>

                            {filteredRequests.length > 0 ? (
                                <div>
                                    {/* Request List */}
                                    <table className="request-table">
                                        <thead className="">
                                            <tr className="">
                                                <th className="table-head checkbox-cell"></th>
                                                <th className="table-head">
                                                    Type
                                                </th>
                                                <th className="table-head">
                                                    Reference No.
                                                </th>
                                                <th className="table-head">
                                                    From
                                                </th>
                                                <th className="table-head">
                                                    Date Submitted
                                                </th>
                                                <th className="table-head">
                                                    Date Needed
                                                </th>
                                                <th className="table-head">
                                                    Status
                                                </th>
                                                <th className="table-head">
                                                    View
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredRequests.map((request) => (
                                                <React.Fragment
                                                    key={request.id}
                                                >
                                                    <tr>
                                                        <td className="table-cell checkbox-cell">
                                                            <input
                                                                type="checkbox"
                                                                className="checkbox"
                                                            />
                                                        </td>
                                                        <td className="table-cell">
                                                            {request.type}
                                                        </td>
                                                        <td className="table-cell">
                                                            {
                                                                request.referenceNo
                                                            }
                                                        </td>
                                                        <td className="table-cell">
                                                            {request.from}
                                                        </td>
                                                        <td className="table-cell">
                                                            {
                                                                request.dateSubmitted
                                                            }
                                                        </td>
                                                        <td className="table-cell">
                                                            {request.dateNeeded}
                                                        </td>
                                                        <td className="table-cell">
                                                            <span
                                                                className={`status-badge status-${request.status.toLowerCase()}`}
                                                            >
                                                                {request.status}
                                                            </span>
                                                        </td>
                                                        <td className="table-cell">
                                                            <button
                                                                className="view-button"
                                                                onClick={() =>
                                                                    handleViewRequest(
                                                                        request
                                                                    )
                                                                }
                                                            >
                                                                View
                                                            </button>
                                                        </td>
                                                    </tr>

                                                    {/* Request Details */}
                                                    {selectedRequest &&
                                                        selectedRequest.id ===
                                                            request.id && (
                                                            <tr>
                                                                <td
                                                                    colSpan="8"
                                                                    className="details-cell"
                                                                >
                                                                    <div className="request-details">
                                                                        <h2 className="form-title">
                                                                            {request.type} Request Form
                                                                        </h2>
                                                                        <div className="reference-number">
                                                                            {
                                                                                request.referenceNo
                                                                            }
                                                                        </div>

                                                                        <div className="form-grid">
                                                                            <div className="form-left">
                                                                                <div className="form-group">
                                                                                    <div className="form-label">
                                                                                        Type:
                                                                                    </div>
                                                                                    <div className="form-value">
                                                                                        {request.type}
                                                                                    </div>
                                                                                </div>
                                                                                <div className="form-group">
                                                                                    <div className="form-label">
                                                                                        Date
                                                                                        Submitted:
                                                                                    </div>
                                                                                    <div className="form-value">
                                                                                        {
                                                                                            request.dateSubmitted
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                                <div className="form-group">
                                                                                    <div className="form-label">
                                                                                        Date
                                                                                        Needed:
                                                                                    </div>
                                                                                    <div className="form-value">
                                                                                        {
                                                                                            request.dateNeeded
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                                <div className="form-group">
                                                                                    <div className="form-label">
                                                                                        Date
                                                                                        Completed:
                                                                                    </div>
                                                                                    <div className="form-value">
                                                                                        {request.dateCompleted ||
                                                                                            "-"}
                                                                                    </div>
                                                                                </div>
                                                                                <div className="form-group">
                                                                                    <div className="form-label">
                                                                                        Nature
                                                                                        of
                                                                                        Work:
                                                                                    </div>
                                                                                    <div className="form-value">
                                                                                        {
                                                                                            request.natureOfWork
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="form-right">
                                                                                <table className="particulars-table">
                                                                                    <thead>
                                                                                        <tr>
                                                                                            <th className="particulars-header">
                                                                                                Qty
                                                                                            </th>
                                                                                            <th className="particulars-header">
                                                                                                Particulars
                                                                                            </th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                        {request.particulars.map(
                                                                                            (
                                                                                                item,
                                                                                                index
                                                                                            ) => (
                                                                                                <tr
                                                                                                    key={
                                                                                                        index
                                                                                                    }
                                                                                                >
                                                                                                    <td className="particulars-cell">
                                                                                                        <input
                                                                                                            type="text"
                                                                                                            className="qty-input"
                                                                                                            value={
                                                                                                                item.qty
                                                                                                            }
                                                                                                            onChange={(
                                                                                                                e
                                                                                                            ) =>
                                                                                                                handleParticularsChange(
                                                                                                                    index,
                                                                                                                    "qty",
                                                                                                                    e
                                                                                                                        .target
                                                                                                                        .value
                                                                                                                )
                                                                                                            }
                                                                                                        />
                                                                                                    </td>
                                                                                                    <td className="particulars-cell">
                                                                                                        <input
                                                                                                            type="text"
                                                                                                            className="details-input"
                                                                                                            value={
                                                                                                                item.details
                                                                                                            }
                                                                                                            onChange={(
                                                                                                                e
                                                                                                            ) =>
                                                                                                                handleParticularsChange(
                                                                                                                    index,
                                                                                                                    "details",
                                                                                                                    e
                                                                                                                        .target
                                                                                                                        .value
                                                                                                                )
                                                                                                            }
                                                                                                        />
                                                                                                    </td>
                                                                                                </tr>
                                                                                            )
                                                                                        )}
                                                                                    </tbody>
                                                                                </table>
                                                                                <button
                                                                                    className="add-item-button"
                                                                                    onClick={
                                                                                        handleAddParticulars
                                                                                    }
                                                                                >
                                                                                    +
                                                                                    Add
                                                                                    item
                                                                                </button>
                                                                            </div>
                                                                        </div>

                                                                        <div className="action-buttons">
                                                                            <button
                                                                                className="approve-button"
                                                                                onClick={handleApproveRequest}
                                                                            >
                                                                                Approve
                                                                            </button>
                                                                            <button
                                                                                className="reject-button"
                                                                                onClick={handleOpenRejectionModal}
                                                                            >
                                                                                Reject
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )}
                                                </React.Fragment>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="empty-state">
                                    No requests found.
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="new-request-form">
                            <h2 className="form-title">New Request Form</h2>
                            <div className="reference-number">
                                {selectedRequest?.referenceNo}
                            </div>

                            <div className="form-grid">
                                <div className="form-left">
                                    <div className="form-group">
                                        <div className="form-label">Type:</div>
                                        <select
                                            className="select-input"
                                            value={selectedRequest?.type || "Job"}
                                            onChange={handleTypeChange}
                                        >
                                            {typeOptions.filter(type => type !== "All").map((type) => (
                                                <option key={type} value={type}>
                                                    {type}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-label">From:</div>
                                        <input
                                            type="text"
                                            className="text-input"
                                            value={selectedRequest?.from || ""}
                                            onChange={(e) =>
                                                setSelectedRequest({
                                                    ...selectedRequest,
                                                    from: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <div className="form-label">
                                            Date Submitted:
                                        </div>
                                        <div className="form-value">
                                            {selectedRequest?.dateSubmitted}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-label">
                                            Date Needed:
                                        </div>
                                        <input
                                            type="date"
                                            className="date-input"
                                            value={
                                                selectedRequest?.dateNeeded ||
                                                ""
                                            }
                                            onChange={(e) =>
                                                setSelectedRequest({
                                                    ...selectedRequest,
                                                    dateNeeded: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <div className="form-label">
                                            Nature of Work:
                                        </div>
                                        <input
                                            type="text"
                                            className="text-input"
                                            value={
                                                selectedRequest?.natureOfWork ||
                                                ""
                                            }
                                            onChange={(e) =>
                                                setSelectedRequest({
                                                    ...selectedRequest,
                                                    natureOfWork:
                                                        e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="form-right">
                                    <table className="particulars-table">
                                        <thead>
                                            <tr>
                                                <th className="particulars-header">
                                                    Qty
                                                </th>
                                                <th className="particulars-header">
                                                    Particulars
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedRequest?.particulars.map(
                                                (item, index) => (
                                                    <tr key={index}>
                                                        <td className="particulars-cell">
                                                            <input
                                                                type="text"
                                                                className="qty-input"
                                                                value={item.qty}
                                                                onChange={(e) =>
                                                                    handleParticularsChange(
                                                                        index,
                                                                        "qty",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                        </td>
                                                        <td className="particulars-cell">
                                                            <input
                                                                type="text"
                                                                className="details-input"
                                                                value={
                                                                    item.details
                                                                }
                                                                onChange={(e) =>
                                                                    handleParticularsChange(
                                                                        index,
                                                                        "details",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                    <button
                                        className="add-item-button"
                                        onClick={handleAddParticulars}
                                    >
                                        + Add item
                                    </button>
                                </div>
                            </div>

                            <div className="action-buttons">
                                <button
                                    className="approve-button"
                                    onClick={handleSaveNewRequest}
                                >
                                    Save
                                </button>
                                <button
                                    className="reject-button"
                                    onClick={() => setShowRequests(true)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Floating Action Button */}
                    <div className="fab-container">
                        <button className="fab" onClick={handleNewRequest}>
                            <Edit2 size={20} className="fab-icon" />
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Rejection Reason Modal */}
            {showRejectionModal && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <h3 className="modal-title">Reasons for Rejection</h3>
                        <p className="modal-subtitle">It is required to state the reason for Confirmation</p>
                        
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
        </div>
    );
}

export default RequestManagement;
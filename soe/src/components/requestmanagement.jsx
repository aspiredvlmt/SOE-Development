import React, { useState } from "react";
import { Search, Bell, Edit2, ChevronDown, X } from "lucide-react";
import { VehicleReservationForm, FacilityReservationForm, JobRequestForm, PurchaseRequestForm } from "./Formcomponents";
import "./recordmanagement.css";

function RequestManagement() {
    // Sample initial data
    const initialRequests = [
        {
            id: 4,
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
        { id: 1,
            type: "Vehicle",
            referenceNo: "OSO-VR-0001",
            from: "Herliza Estrada",
            dateSubmitted: "05/09/2025",
            dateNeeded: "05/09/2025",
            status: "Ongoing",
            natureOfWork: "Service",
            dateCompleted: "",
            particulars: [{ qty: "", details: "" }],
            // Vehicle specific fields
            requestor: "John Doe",
            departureTime: "08:00",
            arrivalTime: "17:00",
            driver: "Mike Smith",
            destination: "Downtown Office",
            purpose: "Client Meeting",
            passengerCount: "3",
            passengers: "John Doe, Jane Smith, Mark Johnson"
        },
        { id: 2,
            type: "Facility",
            referenceNo: "OSO-FR-0001",
            from: "Herliza Estrada",
            dateSubmitted: "05/09/2025",
            dateNeeded: "05/22/2025",
            status: "Ongoing",
            natureOfWork: "Facility Reservation",
            dateCompleted: "",
            particulars: [{ qty: "", details: "" }],
            // Facility specific fields
            requestor: "Jane Smith",
            venue: "Conference Room A",
            natureOfActivity: "Meeting",
            activity: "Quarterly Planning",
            purpose: "Team Planning Session",
            timeStart: "9:00 am - 5:00 pm",
            specialInstruction: "Need projector setup",
            materialsEquipment: "Projector, Whiteboard, Markers"
        },
        { id: 3,
            type: "Purchase",
            referenceNo: "OSO-PR-0001",
            from: "Herliza Estrada",
            dateSubmitted: "05/09/2025",
            dateNeeded: "05/20/2025",
            status: "Ongoing",
            natureOfWork: "Re-stock",
            dateCompleted: "",
            particulars: [
                { qty: "10", details: "Office Paper (A4)" },
                { qty: "5", details: "Ink Cartridges (Black)" }
            ],
        },
    ];

    // Type options for filter bar
    const typeOptions = ["All", "Vehicle", "Facility", "Purchase", "Job"];

    // State management
    const [requests, setRequests] = useState(initialRequests);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showRequests, setShowRequests] = useState(true);
    const [selectedType, setSelectedType] = useState("All"); // Type filter state
    const [showRejectionModal, setShowRejectionModal] = useState(false);
    const [rejectionReason, setRejectionReason] = useState("");

    // Filter requests based on selected type and search query
    const filteredRequests = requests.filter((request) => {
        const matchesType = selectedType === "All" || request.type === selectedType;
        const matchesSearch =
            request.referenceNo
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            request.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
            request.natureOfWork
                .toLowerCase()
                .includes(searchQuery.toLowerCase());

        return matchesType && matchesSearch;
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

    // Handle field change for form inputs
    const handleFieldChange = (field, value) => {
        if (selectedRequest) {
            const updatedRequest = {
                ...selectedRequest,
                [field]: value,
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
        // Get the next ID
        const newId =
            requests.length > 0
                ? Math.max(...requests.map((r) => r.id)) + 1
                : 1;
                
        // Create appropriate reference number based on selected type
        const type = "Job"; // Default type
        const typePrefix = getTypePrefix(type);
        const newReferenceNo = `OSO-${typePrefix}-${String(newId).padStart(4, "0")}`;

        const newRequest = {
            id: newId,
            type: type,
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

    // Helper function to get type prefix
    const getTypePrefix = (type) => {
        switch (type) {
            case "Vehicle":
                return "VR";
            case "Facility":
                return "FR";
            case "Purchase":
                return "PR";
            case "Job":
            default:
                return "JR";
        }
    };

    // Handle saving a new request
    const handleSaveNewRequest = () => {
        if (selectedRequest) {
            let requestToSave = { ...selectedRequest };
            
            // Create appropriate reference number based on type
            const typePrefix = getTypePrefix(requestToSave.type);
            requestToSave.referenceNo = `OSO-${typePrefix}-${String(requestToSave.id).padStart(4, "0")}`;
            
            // If this is a new request, add it
            if (!requests.find((r) => r.id === selectedRequest.id)) {
                setRequests([...requests, requestToSave]);
            } else {
                // Otherwise update the existing request
                setRequests(
                    requests.map((req) =>
                        req.id === requestToSave.id ? requestToSave : req
                    )
                );
            }
        }
        setShowRequests(true);
    };

    // Handle type change in new request form
    const handleTypeChange = (type) => {
        if (selectedRequest) {
            setSelectedRequest({
                ...selectedRequest,
                type: type,
            });
        }
    };

    // Render the appropriate form based on request type
    const renderRequestForm = (request, readOnly = true) => {
        switch (request.type) {
            case "Vehicle":
                return (
                    <VehicleReservationForm 
                        request={request} 
                        onFieldChange={handleFieldChange}
                        readOnly={readOnly}
                    />
                );
            case "Facility":
                return (
                    <FacilityReservationForm 
                        request={request} 
                        onFieldChange={handleFieldChange}
                        readOnly={readOnly}
                    />
                );
            case "Purchase":
                return (
                    <PurchaseRequestForm 
                        request={request} 
                        onFieldChange={handleFieldChange}
                        readOnly={readOnly}
                        onAddParticulars={handleAddParticulars}
                    />
                );
            case "Job":
            default:
                return (
                    <JobRequestForm 
                        request={request} 
                        onFieldChange={handleFieldChange}
                        readOnly={readOnly}
                        onAddParticulars={handleAddParticulars}
                    />
                );
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

                {/* Content */}
                <div className="content-container">
                    {showRequests ? (
                        <>
                            {/* Type filter tabs */}
                            <div className="tabs-container">
                                <div className="tabs">
                                    {typeOptions.map((type, index) => (
                                        <button
                                            key={type}
                                            className={`tab ${
                                                selectedType === type ? "active" : ""
                                            } ${index === 0 ? "tab-first" : ""} ${
                                                index === typeOptions.length - 1 ? "tab-last" : ""
                                            }`}
                                            onClick={() => setSelectedType(type)}
                                        >
                                            {type}
                                        </button>
                                    ))}
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

                                                                        {renderRequestForm(request, true)}

                                                                        <div className="action-buttons">
                                                                            {request.status === "Pending" && (
                                                                                <>
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
                                                                                </>
                                                                            )}
                                                                            {request.status === "Ongoing" && (
                                                                                <button
                                                                                    className="approve-button"
                                                                                    onClick={() => {
                                                                                        const updatedRequest = {
                                                                                            ...request,
                                                                                            status: "Completed",
                                                                                            dateCompleted: new Date().toLocaleDateString()
                                                                                        };
                                                                                        setRequests(
                                                                                            requests.map(req => 
                                                                                                req.id === request.id ? updatedRequest : req
                                                                                            )
                                                                                        );
                                                                                        setSelectedRequest(null);
                                                                                    }}
                                                                                >
                                                                                    Mark as Completed
                                                                                </button>
                                                                            )}
                                                                            <button
                                                                                className="close-button"
                                                                                onClick={() => setSelectedRequest(null)}
                                                                            >
                                                                                Close
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
                            <h2 className="form-title">New {selectedRequest?.type} Request Form</h2>
                            <div className="reference-number">
                                {selectedRequest?.referenceNo}
                            </div>

                            <div className="form-type-selector-container">
                                <div className="form-label">Request Type:</div>
                                <div className="form-type-selector">
                                    {typeOptions.filter(type => type !== "All").map((type) => (
                                        <button
                                            key={type}
                                            className={`type-selector-button ${selectedRequest?.type === type ? 'active' : ''}`}
                                            onClick={() => handleTypeChange(type)}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Render the appropriate form based on the selected type */}
                            {selectedRequest && renderRequestForm(selectedRequest, false)}

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
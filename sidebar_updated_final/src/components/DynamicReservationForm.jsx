import React from 'react';
import { useParams } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./ReservationForm.css";

const DynamicReservationForm = () => {
    const { formType } = useParams();
    
    const formTitles = {
        'facility-reservation': 'Facility Reservation',
        'vehicle-reservation': 'Vehicle Reservation',
        'purchase-requisition': 'Purchase Requisition',
        'job-request': 'Job Request'
    };
    
    const currentFormTitle = formTitles[formType] || 'Reservation Form';
    
    return (
        <div className="form-selection-container">
            <div className="main-content">
                <div className="form-card">
                    <h5 className="form-title">{currentFormTitle}</h5>
                    <div className="form-content">
                        {}
                        <form>
                            <div className="mb-3">
                                <label htmlFor="formBasicText" className="form-label">
                                    Sample Field
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DynamicReservationForm;
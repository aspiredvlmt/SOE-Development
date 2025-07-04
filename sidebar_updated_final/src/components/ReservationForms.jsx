import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./ReservationForm.css";
import { useNavigate } from "react-router";
import { useUserContext } from "../context/usercontextprovider";

const FormSelectionUI = () => {
    const navigate = useNavigate();
    const { userInfo } = useUserContext();

    // Check if user should only see Vehicle and Facility reservations
    const isLimitedUser = userInfo?.role === 'Student' || userInfo?.role === 'Faculty/Office Assistant';

    return (
        <div className="form-selection-container">
            <div className="main-content">
                <div className="form-card">
                    <h5 className="form-title">What form do you need?</h5>
                    <p className="form-subtitle">
                        Kindly choose your needed form
                    </p>
                    <div className="form-buttons">
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                navigate(
                                    "/main/reservation-forms/vehicle-reservation"
                                );
                            }}
                        >
                            Vehicle Reservation
                        </button>
                        <button
                            className="btn btn-outline-primary"
                            onClick={() => {
                                navigate(
                                    "/main/reservation-forms/facility-reservation"
                                );
                            }}
                        >
                            Facility Reservation
                        </button>
                        {!isLimitedUser && (
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    navigate(
                                        "/main/reservation-forms/purchase-requisit"
                                    );
                                }}
                            >
                                Purchase Requisition
                            </button>
                        )}
                        {!isLimitedUser && (
                            <button
                                className="btn btn-outline-primary"
                                onClick={() => {
                                    navigate("/main/reservation-forms/job-request");
                                }}
                            >
                                Job Request
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormSelectionUI;
import React from "react";
import "./VehicleReservation.css";
import "bootstrap/dist/css/bootstrap.min.css";

const VehicleReservationForm = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card vehicle-reservation-card">
        <div className="card-body">
          <h2 className="form-title">Vehicle Reservation Form</h2>
          <p className="form-subtitle">
            Kindly fill out all the required fields.
          </p>
          <p className="form-recommendation">
            Recommendation: Reserve Vehicle 7 days before the trip.
          </p>

          <form>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Time of Departure</label>
                  <input type="time" className="form-control" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Time of Arrival</label>
                  <input type="time" className="form-control" />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Date Needed</label>
                  <input type="date" className="form-control" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Date Needed</label>
                  <input type="date" className="form-control" />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>No. of Passengers</label>
                  <input type="number" className="form-control" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Destination</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Passengers</label>
              <textarea className="form-control" rows="3"></textarea>
            </div>

            <div className="form-group">
              <label>Purpose</label>
              <input type="text" className="form-control" />
            </div>

            <button type="submit" className="btn btn-primary w-100 mt-3">
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VehicleReservationForm;

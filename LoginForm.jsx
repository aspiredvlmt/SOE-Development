import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons
import "./LoginForm.css"; // Custom CSS for additional styling

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock validation
    if (username !== "admin" || password !== "password") {
      setError("Wrong Credentials! Try again.");
    } else {
      setError("");
      alert("Login successful!");
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="row shadow-lg rounded overflow-hidden">
        {/* Login Form Section */}
        <div className="col-md-6 p-5 bg-white">
          <h2 className="text-center mb-4">
            Welcome to <span className="text-primary">Kronos!</span>
          </h2>
          <p className="text-center text-muted mb-4">
            Enter your credentials to access
          </p>
          <form onSubmit={handleLogin}>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className={`form-control ${error ? "is-invalid" : ""}`}
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"} // Toggle input type
                  className={`form-control ${error ? "is-invalid" : ""}`}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)} // Toggle visibility
                >
                  <i
                    className={`bi ${
                      showPassword ? "bi-eye-slash" : "bi-eye"
                    }`}
                  ></i>
                </button>
              </div>
            </div>
            <div className="mb-3 text-end">
              <a href="#" className="text-decoration-none text-primary">
                Forgot Password?
              </a>
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="termsCheckbox"
              />
              <label className="form-check-label" htmlFor="termsCheckbox">
                I agree to the{" "}
                <a href="#" className="text-decoration-none text-primary">
                  Terms & Privacy
                </a>
              </label>
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-3">
              Login
            </button>
            <p className="text-center text-muted">
              No Account?{" "}
              <a href="#" className="text-decoration-none text-primary">
                Sign up
              </a>
            </p>
          </form>
        </div>

        {/* Info Section */}
        <div className="col-md-6 p-5 bg-primary text-white">
          <h2 className="mb-4">Efficiency Meets Simplicity in GSO Operations</h2>
          <p className="mb-4">Enter your credentials to access</p>
          <div className="bg-white p-3 rounded text-center">
            <img
              src="/dashboard_mockup.png"
              alt="Dashboard Preview"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
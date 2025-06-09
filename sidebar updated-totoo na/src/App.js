import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserContextProvider, { useUserContext } from './context/usercontextprovider';
import Layout from './components/main';
import LoginForm from './components/loginform';
import Dashboard from './components/Dashboard';
import ReservationForms from './components/ReservationForms';
import Records from './components/Records';
import RequestManagement from './components/RequestManagement';
import RecommendingApproval from './components/RecommendingApproval';
import Reports from './components/Reports';
import Properties from './components/Properties';
import UserManagement from './components/UserManagement';
import './App.css';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useUserContext();
  
  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner
  }
  
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

// Public Route component (redirects to main if already authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useUserContext();
  
  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner
  }
  
  return !isAuthenticated() ? children : <Navigate to="/main/dashboard" replace />;
};

function App() {
  return (
    <UserContextProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <LoginForm />
                </PublicRoute>
              } 
            />
            
            {/* Protected Routes */}
            <Route 
              path="/main" 
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              {/* Nested routes for the main layout */}
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="reservation-forms" element={<ReservationForms />} />
              <Route path="records/all" element={<Records />} />
              <Route path="request-management" element={<RequestManagement />} />
              <Route path="recommending-approval" element={<RecommendingApproval />} />
              <Route path="reports" element={<Reports />} />
              <Route path="user-management" element={<UserManagement />} />
              
              {/* Default redirect to dashboard */}
              <Route index element={<Navigate to="dashboard" replace />} />
            </Route>
            
            {/* Properties route (outside main layout) */}
            <Route 
              path="/properties" 
              element={
                <ProtectedRoute>
                  <Properties />
                </ProtectedRoute>
              } 
            />
            
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </UserContextProvider>
  );
}

export default App;
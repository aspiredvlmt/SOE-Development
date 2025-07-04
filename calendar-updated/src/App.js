import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserContextProvider, useUserContext } from './context/usercontextprovider';
import LoginForm from './components/LoginForm';
import CalendarApp from './components/CalendarApp';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useUserContext();
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Public Route Component (redirect to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useUserContext();
  
  return !isAuthenticated ? children : <Navigate to="/main/dashboard" replace />;
};

// App Routes Component (separated so it can use context)
const AppRoutes = () => {
  return (
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
          path="/main/dashboard" 
          element={
            <ProtectedRoute>
              <CalendarApp />
            </ProtectedRoute>
          } 
        />
        
        {/* Default redirect */}
        <Route 
          path="/" 
          element={<Navigate to="/login" replace />} 
        />
        
        {/* Catch all other routes and redirect to login */}
        <Route 
          path="*" 
          element={<Navigate to="/login" replace />} 
        />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <UserContextProvider>
      <Router>
        <AppRoutes />
      </Router>
    </UserContextProvider>
  );
}

export default App;
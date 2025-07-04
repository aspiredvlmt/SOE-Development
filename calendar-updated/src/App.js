import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserContextProvider, useUserContext } from './context/usercontextprovider';
import LoginForm from './components/LoginForm';
import CalendarApp from './components/CalendarApp';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useUserContext();
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useUserContext();
  
  return !isAuthenticated ? children : <Navigate to="/main/dashboard" replace />;
};

const AppRoutes = () => {
  return (
    <div className="App">
      <Routes>
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <LoginForm />
            </PublicRoute>
          } 
        />
        
        <Route 
          path="/main/dashboard" 
          element={
            <ProtectedRoute>
              <CalendarApp />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/" 
          element={<Navigate to="/login" replace />} 
        />
        
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
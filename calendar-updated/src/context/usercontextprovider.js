import React, { createContext, useContext, useState } from 'react';

// Create the context
const UserContext = createContext();

// Create a custom hook to use the context
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }
  return context;
};

// Create the provider component
export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (userData, userToken) => {
    console.log('Login called with userData:', userData);
    setUser(userData);
    setToken(userToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  // Helper function to check if user can manage events
  const canManageEvents = () => {
    return user?.role === 'Admin' || user?.role === 'GSO Officer';
  };

  // Helper function to get user info (for backward compatibility)
  const userInfo = user;

  const value = {
    user,
    userInfo, // Add this for backward compatibility with your calendar component
    token,
    isAuthenticated,
    login,
    logout,
    setUser,
    setToken,
    canManageEvents
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
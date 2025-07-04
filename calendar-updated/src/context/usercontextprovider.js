import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }
  return context;
};

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

  const canManageEvents = () => {
    return user?.role === 'Admin' || user?.role === 'GSO Officer';
  };

  const userInfo = user;

  const value = {
    user,
    userInfo, 
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
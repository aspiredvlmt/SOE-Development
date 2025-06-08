import { createContext, useContext, useState, useEffect } from 'react';

// Create the UserContext
const UserContext = createContext();

// UserContextProvider component
export const UserContextProvider = ({ children }) => {
    const [usertoken, setUsertoken] = useState(null);
    const [loginID, setLoginID] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Initialize context with data from localStorage on component mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('loginID');
        const role = localStorage.getItem('userRole');

        if (token) {
            setUsertoken(token);
        }
        if (id) {
            setLoginID(id);
        }
        if (role) {
            setUserRole(role);
        }
        
        setIsLoading(false);
    }, []);

    // Login function - stores user data and persists to localStorage
    const login = (token, id, role) => {
        setUsertoken(token);
        setLoginID(id);
        setUserRole(role);
        
        localStorage.setItem('token', token);
        localStorage.setItem('loginID', id);
        localStorage.setItem('userRole', role);
    };

    // Logout function - clears user data and localStorage
    const logout = () => {
        setUsertoken(null);
        setLoginID(null);
        setUserRole(null);
        
        localStorage.removeItem('token');
        localStorage.removeItem('loginID');
        localStorage.removeItem('userRole');
        localStorage.removeItem('active'); // Also clear active page
    };

    // Update user role separately (if needed)
    const updateUserRole = (role) => {
        setUserRole(role);
        localStorage.setItem('userRole', role);
    };

    // Check if user is authenticated
    const isAuthenticated = () => {
        return usertoken !== null && loginID !== null;
    };

    // Context value object
    const contextValue = {
        usertoken,
        loginID,
        userRole,
        isLoading,
        login,
        logout,
        updateUserRole,
        isAuthenticated,
        // Helper functions for role checking
        isAdmin: () => userRole?.toLowerCase() === 'admin',
        isStudent: () => userRole?.toLowerCase() === 'student',
        isFaculty: () => userRole?.toLowerCase().includes('faculty'),
        isHead: () => userRole?.toLowerCase().includes('heads') || userRole?.toLowerCase().includes('deans'),
        isGSOOfficer: () => userRole?.toLowerCase() === 'gso officer'
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the UserContext
export const useUserContext = () => {
    const context = useContext(UserContext);
    
    if (!context) {
        throw new Error('useUserContext must be used within a UserContextProvider');
    }
    
    return context;
};

// Default export
export default UserContextProvider;
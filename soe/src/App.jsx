import React, { useState } from 'react';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('Reservation Forms');
  

  const renderPage = () => {
    switch(currentPage) {
      case 'Dashboard':
        return <div className="page-content"><h1>Dashboard</h1><p>Dashboard content goes here</p></div>;
      case 'Reservation Forms':
        return <div className="page-content"><h1>Reservation Forms</h1><p>Reservation forms content goes here</p></div>;
      case 'Records':
        return <div className="page-content"><h1>Records</h1><p>Records content goes here</p></div>;
      case 'Request Management':
        return <div className="page-content"><h1>Request Management</h1><p>Request management content goes here</p></div>;
      case 'Reports':
        return <div className="page-content"><h1>Reports</h1><p>Reports content goes here</p></div>;
      case 'Properties':
        return <div className="page-content"><h1>Properties</h1><p>Properties content goes here</p></div>;
      case 'User Management':
        return <div className="page-content"><h1>User Management</h1><p>User management content goes here</p></div>;
      default:
        return <div className="page-content"><h1>Dashboard</h1><p>Dashboard content goes here</p></div>;
    }
  };


  const handleLogout = () => {
    alert('Logging out...');

  };

  return (
    <div className="App">
      <Sidebar 
        activePage={currentPage} 
        setActivePage={setCurrentPage} 
        onLogout={handleLogout} 
      />
      {renderPage()}
    </div>
  );
}

const Sidebar = ({ activePage, setActivePage, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '□', section: 'menu' },
    { id: 'reservation', label: 'Reservation Forms', icon: '■', section: 'menu', hasArrow: true },
    { id: 'records', label: 'Records', icon: '□', section: 'menu' },
    { id: 'request', label: 'Request Management', icon: '□', section: 'menu' },
    { id: 'reports', label: 'Reports', icon: '□', section: 'menu' },
    { id: 'properties', label: 'Properties', icon: '□', section: 'others' },
    { id: 'user', label: 'User Management', icon: '□', section: 'others' },
    { id: 'logout', label: 'Logout', icon: '■', section: 'footer', hasArrow: true },
  ];

  const handleItemClick = (label) => {
    if (label === 'Logout') {
      onLogout();
    } else {
      setActivePage(label);
    }
  };

  return (
    <div className="h-screen w-64 bg-white flex flex-col shadow-md">
      {/* Header with Logo */}
      <div className="p-4 border-b">
        <div className="flex items-center">
          <div className="mr-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6L10 13L14 9L21 16" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10 13L5 18L14 9L19 4" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-bold text-blue-500">KRONOS</h1>
            <p className="text-xs text-gray-500">GSO Management System</p>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="p-2">
          <p className="text-xs font-semibold text-gray-400 px-2 py-1">MENU</p>
          {menuItems
            .filter(item => item.section === 'menu')
            .map(item => (
              <div
                key={item.id}
                className={`menu-item ${activePage === item.label ? 'active' : ''}`}
                onClick={() => handleItemClick(item.label)}
              >
                <div className="flex items-center">
                  <span className={`mr-3 ${activePage === item.label ? 'text-blue-500' : 'text-gray-500'}`}>
                    {item.icon}
                  </span>
                  <span className={activePage === item.label ? 'font-medium' : ''}>{item.label}</span>
                </div>
                {item.hasArrow && (
                  <span className="text-gray-400">
                    &gt;
                  </span>
                )}
              </div>
            ))}
        </div>

        {/* Others Section */}
        <div className="p-2">
          <p className="text-xs font-semibold text-gray-400 px-2 py-1">OTHERS</p>
          {menuItems
            .filter(item => item.section === 'others')
            .map(item => (
              <div
                key={item.id}
                className={`menu-item ${activePage === item.label ? 'active' : ''}`}
                onClick={() => handleItemClick(item.label)}
              >
                <div className="flex items-center">
                  <span className={`mr-3 ${activePage === item.label ? 'text-blue-500' : 'text-gray-500'}`}>
                    {item.icon}
                  </span>
                  <span className={activePage === item.label ? 'font-medium' : ''}>{item.label}</span>
                </div>
                {item.hasArrow && (
                  <span className="text-gray-400">
                    &gt;
                  </span>
                )}
              </div>
            ))}
        </div>
      </div>

      {/* Footer with Logout */}
      <div className="p-2 mt-auto">
        {menuItems
          .filter(item => item.section === 'footer')
          .map(item => (
            <div
              key={item.id}
              className="menu-item logout-btn"
              onClick={() => handleItemClick(item.label)}
            >
              <div className="flex items-center">
                <span className="mr-3 text-blue-500">
                  {item.icon}
                </span>
                <span className="font-medium">{item.label}</span>
              </div>
              {item.hasArrow && (
                <span className="text-blue-500">
                  &gt;
                </span>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default App;
import React, { useState, useEffect } from 'react';
import './UserManagement.css';
import { FaSearch, FaBell, FaCog, FaPlus, FaTrash, FaPencilAlt } from 'react-icons/fa';

const UserManagement = () => {
  // Sample user data based on the image
  const [users, setUsers] = useState([
    { 
      userId: "GSO-usr-001", 
      fullName: "Mary Ann Lim", 
      userRole: "GSO Director", 
      username: "marylim", 
      password: "•••••",
      status: "Active" 
    },
    { 
      userId: "GSO-usr-002", 
      fullName: "Ivy Mora", 
      userRole: "GSO Officer", 
      username: "imora", 
      password: "•••••",
      status: "Active"
    },
    { 
      userId: "GSO-usr-003", 
      fullName: "Helica Estrada", 
      userRole: "Faculty, Adviser", 
      username: "estradahelica", 
      password: "•••••",
      status: "Active"
    },
    { 
      userId: "GSO-usr-004", 
      fullName: "Elma Llamas", 
      userRole: "Office Assistant", 
      username: "llamaselma", 
      password: "•••••",
      status: "Active"
    },
    { 
      userId: "GSO-usr-005", 
      fullName: "Rhey Verunque", 
      userRole: "ACES Governor", 
      username: "llamaselma", 
      password: "•••••",
      status: "Active"
    },
    { 
      userId: "GSO-usr-006", 
      fullName: "Glemme Ollage", 
      userRole: "Faculty", 
      username: "ollageglemme", 
      password: "•••••", 
      status: "Active"
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [hasNotifications, setHasNotifications] = useState(false);

  // Form state for editing user
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    role: '',
    department: '',
    campus: '',
    units: '',
    password: '',
    confirmPassword: '',
    lastLogin: ''
  });

  useEffect(() => {
    // Simulate notification appearance after 2 seconds
    const timer = setTimeout(() => {
      setHasNotifications(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddUser = () => {
    setEditingUser({
      userId: `GSO-usr-${(users.length + 1).toString().padStart(3, '0')}`,
      fullName: '',
      userRole: '',
      username: '',
      password: '•••••',
      status: 'Active'
    });
    
    setFormData({
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      role: '',
      department: '',
      campus: '',
      units: '',
      password: '',
      confirmPassword: '',
      lastLogin: new Date().toISOString().split('T')[0]
    });
  };

  const handleEditUser = (user) => {
    // Parse fullName into its components (assumed format: FirstName MiddleName LastName)
    const nameParts = user.fullName.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
    const middleName = nameParts.length > 2 ? nameParts.slice(1, -1).join(' ') : '';
    
    setEditingUser(user);
    setFormData({
      firstName,
      middleName,
      lastName,
      email: `${user.username}@example.com`,
      role: user.userRole,
      department: 'GSO',
      campus: 'Main',
      units: 'N/A',
      password: '',
      confirmPassword: '',
      lastLogin: '2023-11-20'
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSaveUser = () => {
    if (editingUser) {
      // Combine name parts into fullName
      const fullName = `${formData.firstName} ${formData.middleName ? formData.middleName + ' ' : ''}${formData.lastName}`;
      
      // Update existing user or add new user
      if (users.find(u => u.userId === editingUser.userId)) {
        setUsers(users.map(user => 
          user.userId === editingUser.userId 
            ? { 
                ...user, 
                fullName, 
                userRole: formData.role,
                username: formData.email.split('@')[0],
                password: formData.password ? '•••••' : user.password
              } 
            : user
        ));
      } else {
        setUsers([...users, {
          userId: editingUser.userId,
          fullName,
          userRole: formData.role,
          username: formData.email.split('@')[0],
          password: '•••••',
          status: 'Active'
        }]);
      }
      
      setEditingUser(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  const handleFilters = () => {
    alert('Filter options would appear here');
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    
    if (newSelectAll) {
      setSelectedUsers(filteredUsers.map(user => user.userId));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.userRole?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.userId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-management-container">
      {/* Header with search and notification */}
      <div className="header">
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          <span className="search-icon"><FaSearch /></span>
        </div>
        <div className="notification-icon">
          <FaBell className="bell-icon" />
          {hasNotifications && <span className="notification-dot"></span>}
        </div>
      </div>

      {/* Main content */}
      <div className="content">
        <h1>User Management</h1>
        <p className="subtitle">Manage users and their account permission</p>

        <div className="user-list-section">
          <div className="all-users">
            <span>All Users</span>
            <span className="user-count">{users.length}</span>
          </div>
          
          <div className="action-buttons">
            <button className="filter-button" onClick={handleFilters}>
              <span className="filter-icon"><FaCog /></span>
              Filters
            </button>
            <button className="add-user-button" onClick={handleAddUser}>
              <span className="plus-icon"><FaPlus /></span>
              Add Users
            </button>
          </div>
        </div>

        {/* User list table */}
        <div className="table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th className="checkbox-column">
                  <input 
                    type="checkbox" 
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="user-id-column">User ID</th>
                <th>Full Name</th>
                <th>User Role</th>
                <th>Username</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.userId}>
                    <td className="checkbox-column">
                      <input 
                        type="checkbox" 
                        checked={selectedUsers.includes(user.userId)}
                        onChange={() => handleSelectUser(user.userId)}
                      />
                    </td>
                    <td className="user-id-cell">
                      <a href="#">{user.userId}</a>
                    </td>
                    <td>{user.fullName}</td>
                    <td>{user.userRole}</td>
                    <td>{user.username}</td>
                    <td>{user.password}</td>
                    <td className="action-cell">
                      <button className="edit-button" onClick={() => handleEditUser(user)}>
                        <FaPencilAlt className="edit-icon" />
                      </button>
                      <button className="delete-button">
                        <FaTrash className="delete-icon" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="empty-row">
                  <td colSpan="7" className="empty-message">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit User Modal */}
      {editingUser && (
        <div className="modal-overlay">
          <div className="user-modal">
            <div className="modal-header">
              <div className="user-avatar">
                <img src="/user-avatar.jpg" alt="User" />
              </div>
              <div className="modal-user-info">
                <h2>{editingUser.fullName || 'New User'}</h2>
                <span className={`user-status ${editingUser.status?.toLowerCase() || 'active'}`}>
                  {editingUser.status || 'Active'}
                </span>
              </div>
              <span className="user-id-display">{editingUser.userId}</span>
            </div>
            
            <div className="modal-form">
              <div className="form-group">
                <label>Name</label>
                <div className="name-inputs">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First"
                    value={formData.firstName}
                    onChange={handleFormChange}
                  />
                  <input
                    type="text"
                    name="middleName"
                    placeholder="Middle"
                    value={formData.middleName}
                    onChange={handleFormChange}
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last"
                    value={formData.lastName}
                    onChange={handleFormChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                />
              </div>

              <div className="form-group">
                <label>Role</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleFormChange}
                />
              </div>

              <div className="form-group">
                <label>Department</label>
                <div className="department-inputs">
                  <input
                    type="text"
                    name="department"
                    placeholder="GSO"
                    value={formData.department}
                    onChange={handleFormChange}
                  />
                  <input
                    type="text"
                    name="campus"
                    placeholder="Main"
                    value={formData.campus}
                    onChange={handleFormChange}
                  />
                  <input
                    type="text"
                    name="units"
                    placeholder="N/A"
                    value={formData.units}
                    onChange={handleFormChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleFormChange}
                />
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleFormChange}
                />
              </div>

              <div className="form-group">
                <label>Last Login</label>
                <input
                  type="text"
                  name="lastLogin"
                  value={formData.lastLogin}
                  readOnly
                />
              </div>

              <div className="modal-actions">
                <button className="save-button" onClick={handleSaveUser}>Save</button>
                <button className="cancel-button" onClick={handleCancelEdit}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
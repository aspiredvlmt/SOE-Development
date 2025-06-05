import React, { useState } from 'react';
import { Bell, X } from 'lucide-react';
import './NotificationModule.css';

const NotificationModule = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      name: "Mary Ann Lim",
      action: "requested a Facility",
      time: "Thursday, 4:12 PM",
      timeAgo: "2 hours ago",
      isUnread: true
    },
    {
      id: 2,
      name: "Herliza Estrada",
      action: "submitted a Purchase...",
      time: "Thursday, 4:12 PM",
      timeAgo: "2 hours ago",
      isUnread: true
    },
    {
      id: 3,
      name: "Rhey Veronique",
      action: "requested a Vehicle",
      time: "Thursday, 4:12 PM",
      timeAgo: "2 hours ago",
      isUnread: true
    },
    {
      id: 4,
      name: "Mary Ann Lim",
      action: "submitted a Job Request",
      time: "Thursday, 4:12 PM",
      timeAgo: "2 hours ago",
      isUnread: true
    },
    {
      id: 5,
      name: "Herliza Estrada",
      action: "requested a Facility",
      time: "Thursday, 4:12 PM",
      timeAgo: "2 hours ago",
      isUnread: true
    }
  ]);

  const unreadCount = notifications.filter(n => n.isUnread).length;

  const handleView = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isUnread: false } : n)
    );
  };

  const handleReject = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  const closeNotifications = () => {
    setIsOpen(false);
  };

  return (
    <div className="notification-container">
      {/* Search Bar */}
      <div className="search-header">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
          />
          <div className="search-icon">🔍</div>
          <div className="search-shortcut">F</div>
        </div>

        {/* Notification Bell */}
        <div className="bell-container">
          <button
            onClick={toggleNotifications}
            className="bell-button"
          >
            <Bell size={24} />
            {unreadCount > 0 && (
              <span className="notification-badge">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="notification-dropdown">
          {/* Header */}
          <div className="dropdown-header">
            <div className="header-content">
              <span className="header-title">Notifications</span>
              {unreadCount > 0 && (
                <span className="unread-count">
                  {unreadCount}
                </span>
              )}
            </div>
            <button
              onClick={closeNotifications}
              className="close-button"
            >
              <X size={16} />
            </button>
          </div>

          {/* Notification List */}
          <div className="notification-list">
            {notifications.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <Bell size={48} />
                </div>
                <p className="empty-text">No recent notification</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="notification-item"
                >
                  <div className="notification-content">
                    <div className="notification-info">
                      {notification.isUnread && (
                        <div className="unread-dot"></div>
                      )}
                      <div className="notification-text">
                        <p className="notification-message">
                          <span className="user-name">{notification.name}</span>{' '}
                          <span className="action-text">{notification.action}</span>
                        </p>
                        <div className="notification-time">
                          <p className="time">{notification.time}</p>
                          <p className="time-ago">{notification.timeAgo}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="action-buttons">
                    <button
                      onClick={() => handleView(notification.id)}
                      className="view-button"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleReject(notification.id)}
                      className="reject-button"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Overlay to close dropdown when clicking outside */}
      {isOpen && (
        <div
          className="dropdown-overlay"
          onClick={closeNotifications}
        ></div>
      )}
    </div>
  );
};

export default NotificationModule;
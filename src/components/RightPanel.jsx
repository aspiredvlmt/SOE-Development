import React, { useState } from 'react';
import './RightPanel.css';

const RightPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('Select Request Type');

  const requestOptions = ['Facility Reservation', 'Vehicle Reservation','Job Request', 'Purchase Request'];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  const today = new Date();
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthDays = Array.from({ length: 30 }, (_, i) => i + 1); // for June
  const schedule = [
    { time: '10:00 AM', title: 'Delivery Vehicle – Toyota Hiace', from: 'Angela Tolentino' },
    { time: '12:00 PM', title: 'Audio Visual Room', from: 'John Espiritu' },
  ];

  return (
    <div className="right-panel">
      <h3>Quickly reserve a facility or vehicle</h3>

      <div className="dropdown">
        <button className="dropdown-btn" onClick={toggleDropdown}>
          {selected} ⌄
        </button>
        {isOpen && (
          <ul className="dropdown-menu">
            {requestOptions.map((option, index) => (
              <li key={index} onClick={() => handleSelect(option)}>
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="calendar">
        <div className="calendar-header">
          <span>June 2025</span>
        </div>
        <div className="calendar-grid">
          {weekdays.map(day => (
            <div key={day} className="day-name">{day}</div>
          ))}
          {monthDays.map(day => {
            const isToday = today.getDate() === day;
            return (
              <div key={day} className={`day ${isToday ? 'today' : ''}`}>
                {day}
              </div>
            );
          })}
        </div>
      </div>

      <div className="schedule">
        <h4>Today’s Schedule</h4>
        {schedule.map((item, i) => (
          <div key={i} className="schedule-item">
            <div className="time">{item.time}</div>
            <div className="details">
              <strong>{item.title}</strong>
              <p>{item.from}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightPanel;

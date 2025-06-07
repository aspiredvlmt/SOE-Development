import React from 'react';
import './Overview.css';

const Overview = () => {
  const data = [
    { title: 'Facility Request', count: 12, change: '1%', previous: 11 },
    { title: 'Vehicle Request', count: 10, change: '↓ 4%', previous: 14 },
    { title: 'Purchase Request', count: 11, change: '↑ 22%', previous: 20 },
    { title: 'Job Request', count: 8, change: '↑ 14%', previous: 7 },
  ];

  return (
    <div className="overview">
      {data.map((item, index) => (
        <div className="overview-card" key={index}>
          <h4>{item.title}</h4>
          <p className="count">{item.count}</p>
          <p className="change">{item.change}</p>
          <p className="previous">Previous month {item.previous}</p>
        </div>
      ))}
    </div>
  );
};

export default Overview;

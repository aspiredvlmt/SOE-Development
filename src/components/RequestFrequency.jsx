import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import './RequestFrequency.css';

const data = [
  { name: 'Jan', requests: 160 },
  { name: 'Feb', requests: 200 },
  { name: 'Mar', requests: 130 },
  { name: 'Apr', requests: 260 },
  { name: 'May', requests: 220 },
  { name: 'Jun', requests: 210 },
  { name: 'Jul', requests: 210 },
  { name: 'Aug', requests: 160 },
  { name: 'Sep', requests: 180 },
  { name: 'Oct', requests: 220 },
  { name: 'Nov', requests: 160 },
  { name: 'Dec', requests: 180 },
];

const RequestFrequency = () => {
  return (
    <div className="request-frequency">
      <h3>Request Frequency 2025</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="requests" fill="#3ea8ff" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RequestFrequency;

import React from 'react';
import './App.css';
import RequestFrequency from './components/RequestFrequency';
import RequestQueue from './components/RequestQueue';
import RightPanel from './components/RightPanel';
import Overview from './components/Overview';

function App() {
  return (
    <div className="dashboard-container">
      
      <Overview />
      <RequestFrequency />
      <RequestQueue />
      <RightPanel />
    </div>
  );
}

export default App;

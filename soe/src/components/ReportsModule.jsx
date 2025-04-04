import React, { useState } from 'react';
import './ReportsModule.css';
import SummarySection from './SummarySection';
import RequestDistribution from './RequestDistribution';
import RequestTrends from './RequestTrends';
import CategoryFilter from './CategoryFilter';
import VehicleRequestSection from './VehicleRequestSection';
import FacilityRequestSection from './FacilityRequestSection';
import PurchaseRequestSection from './PurchaseRequestSection';
import JobRequestSection from './JobRequestSection';
import { BellIcon } from 'lucide-react';

const ReportsModule = () => {
  const [selectedCategory, setSelectedCategory] = useState('Facility');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  // Summary data
  const totalSummary = {
    total: 140,
    completed: 0,
    approved: 50,
    ongoing: 30,
    rejected: 20,
    submitted: 40
  };

  // Distribution data
  const distributionData = [
    { name: 'Facility', value: 30, color: '#3498db' },
    { name: 'Vehicle', value: 20, color: '#2ecc71' },
    { name: 'Purchase', value: 30, color: '#f39c12' },
    { name: 'Job', value: 20, color: '#f1c40f' }
  ];

  // Trend data for line graph
  const monthlyTrendData = [
    { month: 'Jan', facility: 65, vehicle: 45, purchase: 30, job: 20 },
    { month: 'Feb', facility: 70, vehicle: 40, purchase: 35, job: 25 },
    { month: 'Mar', facility: 60, vehicle: 55, purchase: 40, job: 30 },
    { month: 'Apr', facility: 75, vehicle: 50, purchase: 45, job: 35 },
    { month: 'May', facility: 65, vehicle: 60, purchase: 50, job: 40 },
    { month: 'Jun', facility: 90, vehicle: 55, purchase: 45, job: 45 },
    { month: 'Jul', facility: 85, vehicle: 65, purchase: 40, job: 50 },
    { month: 'Aug', facility: 80, vehicle: 60, purchase: 45, job: 45 },
    { month: 'Sep', facility: 75, vehicle: 55, purchase: 50, job: 40 },
    { month: 'Oct', facility: 70, vehicle: 50, purchase: 45, job: 35 },
    { month: 'Nov', facility: 65, vehicle: 45, purchase: 40, job: 30 },
    { month: 'Dec', facility: 60, vehicle: 40, purchase: 35, job: 25 }
  ];

  // Request section data - Vehicle
  const vehicleSummary = {
    total: 9,
    completed: 0,
    approved: 5,
    ongoing: 2,
    rejected: 1,
    submitted: 1
  };

  const vehicleRequests = [
    { refNo: 'GSO-VH-0001', requestor: 'Rhay Verunque', department: 'CCS', requestDate: 'Nov 30, 2024', dateRemarked: 'Nov 30, 2024', vehicleId: 'VR-001', status: 'Approved' },
    { refNo: 'GSO-VH-0001', requestor: 'Rhay Verunque', department: 'CCS', requestDate: 'Nov 30, 2024', dateRemarked: 'Nov 30, 2024', vehicleId: 'VR-001', status: 'Rejected' },
    { refNo: 'GSO-VH-0001', requestor: 'Rhay Verunque', department: 'CCS', requestDate: 'Nov 30, 2024', dateRemarked: 'Nov 30, 2024', vehicleId: 'VR-001', status: 'Submitted' },
    { refNo: 'GSO-VH-0001', requestor: 'Rhay Verunque', department: 'CCS', requestDate: 'Nov 30, 2024', dateRemarked: 'Nov 30, 2024', vehicleId: 'VR-001', status: 'Ongoing' },
    { refNo: 'GSO-VH-0001', requestor: 'Rhay Verunque', department: 'CCS', requestDate: 'Nov 30, 2024', dateRemarked: 'Nov 30, 2024', vehicleId: 'VR-001', status: 'Approved' },
    { refNo: 'GSO-VH-0001', requestor: 'Rhay Verunque', department: 'CCS', requestDate: 'Nov 30, 2024', dateRemarked: 'Nov 30, 2024', vehicleId: 'VR-001', status: 'Approved' }
  ];

  // Request section data - Facility
  const facilitySummary = {
    total: 12,
    completed: 2,
    approved: 6,
    ongoing: 1,
    rejected: 1,
    submitted: 2
  };

  const facilityRequests = [
    { refNo: 'GSO-FC-0001', requestor: 'John Doe', department: 'HR', requestDate: 'Nov 28, 2024', dateRemarked: 'Nov 29, 2024', facilityId: 'FC-101', status: 'Approved' },
    { refNo: 'GSO-FC-0002', requestor: 'Jane Smith', department: 'Finance', requestDate: 'Nov 28, 2024', dateRemarked: 'Nov 29, 2024', facilityId: 'FC-102', status: 'Completed' },
    { refNo: 'GSO-FC-0003', requestor: 'Alex Johnson', department: 'IT', requestDate: 'Nov 27, 2024', dateRemarked: 'Nov 28, 2024', facilityId: 'FC-103', status: 'Rejected' },
    { refNo: 'GSO-FC-0004', requestor: 'Emily Brown', department: 'Marketing', requestDate: 'Nov 27, 2024', dateRemarked: 'Nov 28, 2024', facilityId: 'FC-104', status: 'Ongoing' },
    { refNo: 'GSO-FC-0005', requestor: 'Michael Lee', department: 'Operations', requestDate: 'Nov 26, 2024', dateRemarked: 'Nov 27, 2024', facilityId: 'FC-105', status: 'Submitted' }
  ];

  // Request section data - Purchase
  const purchaseSummary = {
    total: 15,
    completed: 3,
    approved: 7,
    ongoing: 2,
    rejected: 1,
    submitted: 2
  };

  const purchaseRequests = [
    { refNo: 'GSO-PUR-0001', requestor: 'Sarah Williams', department: 'HR', requestDate: 'Nov 29, 2024', dateRemarked: 'Nov 30, 2024', itemDetails: 'Office Supplies', status: 'Approved' },
    { refNo: 'GSO-PUR-0002', requestor: 'David Miller', department: 'Finance', requestDate: 'Nov 29, 2024', dateRemarked: 'Nov 30, 2024', itemDetails: 'Computer Equipment', status: 'Completed' },
    { refNo: 'GSO-PUR-0003', requestor: 'Jessica Davis', department: 'IT', requestDate: 'Nov 28, 2024', dateRemarked: 'Nov 29, 2024', itemDetails: 'Software Licenses', status: 'Ongoing' },
    { refNo: 'GSO-PUR-0004', requestor: 'Robert Wilson', department: 'Marketing', requestDate: 'Nov 28, 2024', dateRemarked: 'Nov 29, 2024', itemDetails: 'Promotional Materials', status: 'Rejected' },
    { refNo: 'GSO-PUR-0005', requestor: 'Lisa Taylor', department: 'Operations', requestDate: 'Nov 27, 2024', dateRemarked: 'Nov 28, 2024', itemDetails: 'Safety Equipment', status: 'Submitted' }
  ];

  // Request section data - Job
  const jobSummary = {
    total: 8,
    completed: 1,
    approved: 4,
    ongoing: 1,
    rejected: 1,
    submitted: 1
  };

  const jobRequests = [
    { refNo: 'GSO-JOB-0001', requestor: 'Kevin Anderson', department: 'Maintenance', requestDate: 'Nov 29, 2024', dateRemarked: 'Nov 30, 2024', jobType: 'Electrical Repair', status: 'Approved' },
    { refNo: 'GSO-JOB-0002', requestor: 'Amanda Clark', department: 'Facilities', requestDate: 'Nov 29, 2024', dateRemarked: 'Nov 30, 2024', jobType: 'Plumbing', status: 'Completed' },
    { refNo: 'GSO-JOB-0003', requestor: 'Thomas Moore', department: 'IT', requestDate: 'Nov 28, 2024', dateRemarked: 'Nov 29, 2024', jobType: 'Network Installation', status: 'Ongoing' },
    { refNo: 'GSO-JOB-0004', requestor: 'Melissa White', department: 'HR', requestDate: 'Nov 28, 2024', dateRemarked: 'Nov 29, 2024', jobType: 'Office Renovation', status: 'Rejected' },
    { refNo: 'GSO-JOB-0005', requestor: 'Daniel Green', department: 'Operations', requestDate: 'Nov 27, 2024', dateRemarked: 'Nov 28, 2024', jobType: 'HVAC Maintenance', status: 'Submitted' }
  ];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleDateChange = (type, value) => {
    setDateRange(prev => ({
      ...prev,
      [type]: value
    }));
  };

  // Render the appropriate request section based on the selected category
  const renderRequestSection = () => {
    switch(selectedCategory) {
      case 'Facility':
        return (
          <FacilityRequestSection 
            summary={facilitySummary} 
            requests={facilityRequests} 
            dateRange={dateRange} 
            onDateChange={handleDateChange} 
          />
        );
      case 'Vehicle':
        return (
          <VehicleRequestSection 
            summary={vehicleSummary} 
            requests={vehicleRequests} 
            dateRange={dateRange} 
            onDateChange={handleDateChange} 
          />
        );
      case 'Purchase':
        return (
          <PurchaseRequestSection 
            summary={purchaseSummary} 
            requests={purchaseRequests} 
            dateRange={dateRange} 
            onDateChange={handleDateChange} 
          />
        );
      case 'Job':
        return (
          <JobRequestSection 
            summary={jobSummary} 
            requests={jobRequests} 
            dateRange={dateRange} 
            onDateChange={handleDateChange} 
          />
        );
      default:
        return (
          <FacilityRequestSection 
            summary={facilitySummary} 
            requests={facilityRequests} 
            dateRange={dateRange} 
            onDateChange={handleDateChange} 
          />
        );
    }
  };

  return (
    <div className="reports-module">
      <div className="header">
        <h1>Reports</h1>
        <div className="notification-icon">
          <BellIcon size={24} />
        </div>
      </div>

      <SummarySection data={totalSummary} />

      <div className="reports-visualization">
        <div className="chart-section">
          <h3>Request:</h3>
          <RequestDistribution data={distributionData} />
        </div>
        <div className="chart-section">
          <RequestTrends data={monthlyTrendData} />
        </div>
      </div>

      <CategoryFilter 
        categories={distributionData.map(item => item.name)} 
        selectedCategory={selectedCategory} 
        onCategoryChange={handleCategoryChange} 
      />

      {renderRequestSection()}

      <div className="pagination">
        <span>Page 1 of 2</span>
        <button className="pagination-next">›</button>
      </div>
    </div>
  );
};

export default ReportsModule;
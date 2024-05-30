import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { useSelector } from 'react-redux';

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('xlsx');
  const userEmail = useSelector((state) => state.auth.user.email);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/customer/customerData');
        setCustomers(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const sendEmail = async () => {
    setIsSending(true);
    try {
      const ws = XLSX.utils.json_to_sheet(customers);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Customers');
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
      const formData = new FormData();
      formData.append('file', data, 'customers_report.xlsx');
      formData.append('email', userEmail);
      await axios.post('http://localhost:3001/api/send-report', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccessMessage('Report has been sent successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);  // Clear message after 3 seconds
    } catch (error) {
      setError('Failed to send report: ' + error.message);
    }
    setIsSending(false);
  };

  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet(customers);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Customers');
    switch (selectedFormat) {
      case 'xlsx':
        XLSX.writeFile(wb, 'customers_report.xlsx');
        break;
      case 'csv':
        XLSX.writeFile(wb, 'customers_report.csv', { bookType: 'csv' });
        break;
      // case 'pdf':
      //   alert('PDF download is currently not supported in client-side JavaScript due to complexity. Please contact the administrator.');
      //   break;
      default:
        break;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const containerStyle = {
    overflowY: 'auto',
    maxHeight: '500px',
  };

  const actionStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  };

  const buttonStyle = {
    backgroundColor: '#008080',
    color: 'white',
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  const dropdownStyle = {
    padding: '10px',
    width: '200px',
    marginRight: '10px'
  };

  return (
    <div style={containerStyle}>
      <h1>Customer Data</h1>
      <div style={actionStyle}>
        <div>
          <select style={dropdownStyle} value={selectedFormat} onChange={(e) => setSelectedFormat(e.target.value)}>
            <option value="xlsx">Excel (.xlsx)</option>
            <option value="csv">CSV (.csv)</option>
            {/* <option value="pdf">PDF (.pdf)</option> */}
          </select>
          <button style={buttonStyle} onClick={handleDownload}>Download Report</button>
        </div>
        <button style={buttonStyle} onClick={sendEmail} disabled={isSending}>
          {isSending ? 'Sending...' : 'Send Report via Email'}
        </button>
      </div>
      {successMessage && <div style={{ color: 'green', margin: '10px 0' }}>{successMessage}</div>}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: '#008080', color: 'white' }}>
          <tr>
            <th>Customer ID</th>
            <th>Company Name</th>
            <th>Customer Name</th>
            <th>Customer Address</th>
            <th>Customer Contact Number</th>
            <th>Customer Email</th>
            <th>Credit Score</th>
            <th>KYC Status</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.CustomerID}>
              <td>{customer.CustomerID}</td>
              <td>{customer.CompanyName}</td>
              <td>{customer.CustomerName}</td>
              <td>{customer.CustomerAddress}</td>
              <td>{customer.CustomerContactNumber}</td>
              <td>{customer.CustomerEmail}</td>
              <td>{customer.CreditScore}</td>
              <td>{customer.KYCStatus}</td>
              <td>{customer.Role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;






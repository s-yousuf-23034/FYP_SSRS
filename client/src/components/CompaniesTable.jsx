import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CompaniesTable = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/companies/companiesData');
        setCompanies(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const thStyle = {
    border: '1px solid black',
    backgroundColor: '#008080', // Assuming this is the green color you want
    color: 'white',
    position: 'sticky',
    top: 0,
    zIndex: 1,
  };

  const tdStyle = {
    border: '1px solid black',
  };

  const containerStyle = {
    overflowY: 'auto',
    maxHeight: '500px', // Adjust this value as needed
  };

  return (
    <div style={containerStyle}>
      <h1>Companies Data</h1>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Company ID</th>
            <th style={thStyle}>Company Name</th>
            <th style={thStyle}>Address</th>
            <th style={thStyle}>City</th>
            <th style={thStyle}>State</th>
            <th style={thStyle}>Country</th>
            <th style={thStyle}>Postal Code</th>
            <th style={thStyle}>Phone Number</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Website</th>
            <th style={thStyle}>Contact Person</th>
            <th style={thStyle}>Contact Person Title</th>
            <th style={thStyle}>Additional Notes</th>
            <th style={thStyle}>Industry Sector</th>
            <th style={thStyle}>Legal Structure</th>
            <th style={thStyle}>Registration Number</th>
            <th style={thStyle}>Credit Score</th>
            <th style={thStyle}>KYC Status</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company.CompanyID}>
              <td style={tdStyle}>{company.CompanyID}</td>
              <td style={tdStyle}>{company.CompanyName}</td>
              <td style={tdStyle}>{company.Address}</td>
              <td style={tdStyle}>{company.City}</td>
              <td style={tdStyle}>{company.State}</td>
              <td style={tdStyle}>{company.Country}</td>
              <td style={tdStyle}>{company.PostalCode}</td>
              <td style={tdStyle}>{company.PhoneNumber}</td>
              <td style={tdStyle}>{company.Email}</td>
              <td style={tdStyle}>{company.Website}</td>
              <td style={tdStyle}>{company.ContactPerson}</td>
              <td style={tdStyle}>{company.ContactPersonTitle}</td>
              <td style={tdStyle}>{company.AdditionalNotes}</td>
              <td style={tdStyle}>{company.IndustrySector}</td>
              <td style={tdStyle}>{company.LegalStructure}</td>
              <td style={tdStyle}>{company.RegistrationNumber}</td>
              <td style={tdStyle}>{company.CreditScore}</td>
              <td style={tdStyle}>{company.KYCStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompaniesTable;

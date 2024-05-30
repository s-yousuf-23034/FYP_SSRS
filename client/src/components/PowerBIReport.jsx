import React from 'react';

const PowerBIReport = ({ embedUrl }) => {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <iframe
        title="Power BI Report"
        width="100%"
        height="100%"
        src={embedUrl}
        frameBorder="0"
        allowFullScreen="true"
      ></iframe>
    </div>
  );
};

export default PowerBIReport;

import React, { useState, useEffect } from 'react';

const MachineDashboard = () => {
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://127.0.0.1:5000/api/machines')
        .then(res => res.json())
        .then(data => setMachines(data));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <h1>🏭 Production Line Monitor</h1>
      <div style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
        {machines.map(m => (
          <div key={m.machineId} style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>{m.machineName}</h3>
              <span style={statusBadge(m.status)}>{m.status}</span>
            </div>
            <hr />
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <p>Total Cycles Processed</p>
              <h2 style={{ fontSize: '3rem', margin: '10px 0' }}>{m.lastCycleCount}</h2>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#888' }}>
              Last Signal: {new Date(m.lastSeen).toLocaleTimeString()}
            </p>
            <div style={flowIndicator(m.status)}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

const cardStyle = {
  background: '#fff', borderTop: '5px solid #2ecc71',
  padding: '20px', borderRadius: '8px', width: '300px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
};

const statusBadge = (status) => ({
  backgroundColor: status === 'RUNNING' ? '#2ecc71' : '#e74c3c',
  color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem'
});

const flowIndicator = (status) => ({
  height: '4px', width: '100%',
  backgroundColor: status === 'RUNNING' ? '#2ecc71' : '#ccc',
  boxShadow: status === 'RUNNING' ? '0 0 10px #2ecc71' : 'none',
  marginTop: '10px'
});

export default MachineDashboard;
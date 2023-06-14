import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OTTPlatform from './components/OTTPlatform';


const App = () => {
  return (
    <Router>
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>
          <span style={{ color: 'red' }}>Watch</span>
          <span style={{ color: 'red' }}>flix</span>
        </h1>
        <Routes>
          <Route path="/" element={<OTTPlatform />} />
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;
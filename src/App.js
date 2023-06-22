import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import OTTPlatform from './components/OTTPlatform';
import PaymentMode from './components/PaymentMode';

const App = () => {
  const [showPayment, setShowPayment] = useState(false);

  const handlePaymentButtonClick = () => {
    setShowPayment(true);
  };

  return (
    <Router>
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>
          <span style={{ color: 'red' }}>Watch</span>
          <span style={{ color: 'red' }}>flix</span>
        </h1>
        <div>
          <Link to="/payment">
            <button
              onClick={handlePaymentButtonClick}
              style={{
                padding: '10px 20px',
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#fff',
                backgroundColor: 'red',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Payment
            </button>
          </Link>
        </div>
        <Routes>
          <Route path="/" element={<OTTPlatform />} />
          {showPayment && <Route path="/payment" element={<PaymentMode />} />}
        </Routes>
      </div>
    </Router>
  );
};

export default App;




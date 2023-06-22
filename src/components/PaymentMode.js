import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RazorpayPayment from './RazorpayPayment';
import './PaymentMode.css'; // Import the CSS file for styling

const PaymentMode = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [otp, setOtp] = useState('');

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handlePaymentSuccess = (response) => {
    // Handle payment success logic here
    console.log('Payment success:', response);
  };

  const handlePaymentFailure = (error) => {
    // Handle payment failure logic here
    console.log('Payment failure:', error);
  };

  const handlePayment = () => {
    // Handle payment initiation logic here
    // This could involve validating the selected plan,
    // calculating the final amount, etc.

    // Open Razorpay payment form
    if (selectedPlan) {
      // Calculate the amount based on the selected plan
      const amount = calculateAmount(selectedPlan);

      // Set the visibility of the payment component
      setShowPayment(true);
    }
  };

  // Function to calculate the final payment amount
  const calculateAmount = (selectedPlan) => {
    // Implement your calculation logic based on selected plan
    let amount = 0;
    // Example calculation logic:
    if (selectedPlan === 'Mobile') {
      amount = 100;
    } else if (selectedPlan === 'Premium HD') {
      amount = 200;
    } else if (selectedPlan === 'Premium 4K') {
      amount = 300;
    }

    return amount;
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleApplyCode = () => {
    // Handle the code application logic here
    // You can use the `otp` state value for further processing

    console.log('Applied code:', otp);
  };

  return (
    <div className="payment-container">
      <h3 className="payment-heading">Payment Mode</h3>
      <div className="plan-selection">
        <h4 className="plan-heading">Choose a Plan:</h4>
        <div className="plan-option">
          <input
            type="radio"
            id="mobile"
            name="plan"
            value="Mobile"
            checked={selectedPlan === 'Mobile'}
            onChange={() => handlePlanSelect('Mobile')}
          />
          <label htmlFor="mobile" className="plan-label">
            Mobile Plan - Basic features, Standard quality streaming
          </label>
        </div>
        <div className="plan-option">
          <input
            type="radio"
            id="premium-hd"
            name="plan"
            value="Premium HD"
            checked={selectedPlan === 'Premium HD'}
            onChange={() => handlePlanSelect('Premium HD')}
          />
          <label htmlFor="premium-hd" className="plan-label">
            Premium HD Plan - Ad-free, HD quality streaming
          </label>
        </div>
        <div className="plan-option">
          <input
            type="radio"
            id="premium-4k"
            name="plan"
            value="Premium 4K"
            checked={selectedPlan === 'Premium 4K'}
            onChange={() => handlePlanSelect('Premium 4K')}
          />
          <label htmlFor="premium-4k" className="plan-label">
            Premium 4K Plan - Ad-free, 4K Ultra HD quality streaming
          </label>
        </div>
      </div>

      <div className="payment-action">
        <button onClick={handlePayment} disabled={!selectedPlan} className="payment-button">
          Subscribe Now
        </button>
      </div>

      {showPayment && (
        <>
          <RazorpayPayment
            amount={calculateAmount(selectedPlan)}
            onSuccess={handlePaymentSuccess}
            onFailure={handlePaymentFailure}
          />
          <div className="apply-code">
            <h4 className="apply-code-heading">Apply Code:</h4>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={handleOtpChange}
              className="otp-input"
            />
            <button onClick={handleApplyCode} className="apply-button">Apply</button>
          </div>
        </>
      )}

      <div className="back-link">
        <Link to="/" className="back-link-text">Back to OTTPlatform</Link>
      </div>
    </div>
  );
};

export default PaymentMode;









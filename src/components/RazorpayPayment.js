import React, { useEffect } from 'react';

const RazorpayPayment = ({ amount, adFree, premiumContent, onSuccess, onFailure }) => {
  useEffect(() => {
    const options = {
      key: 'rzp_test_mmQTMRTmA94gog', // Replace with your Razorpay API Key
      amount: amount * 100, // Amount in paisa (1 Rupee = 100 Paisa)
      currency: 'INR', // Replace with your preferred currency
      name: 'Watchflix', // Replace with your website/app name
      description: 'Payment for Watchflix subscription',
      image: 'https://your-website.com/logo.png', // Replace with your website/app logo URL
      handler: function (response) {
        // Callback function executed on successful payment
        onSuccess(response);
      },
      prefill: {
        name: 'John Doe', // Replace with customer's name
        email: 'john.doe@example.com', // Replace with customer's email
        contact: '+91XXXXXXXXXX', // Replace with customer's contact number
      },
      notes: {
        address: 'Street Address', // Replace with customer's address
      },
      theme: {
        color: '#F37254', // Replace with your preferred color theme
      },
    };

    const razorpayScript = document.createElement('script');
    razorpayScript.src = 'https://checkout.razorpay.com/v1/checkout.js';
    razorpayScript.async = true;
    razorpayScript.onload = function () {
      window.Razorpay && window.Razorpay.open(options);
    };

    document.body.appendChild(razorpayScript);

    return () => {
      document.body.removeChild(razorpayScript);
    };
  }, [amount, adFree, premiumContent, onSuccess, onFailure]);

  return <div>Processing payment...</div>;
};

export default RazorpayPayment;




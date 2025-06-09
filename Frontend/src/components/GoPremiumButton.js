import React from 'react';

function GoPremiumButton() {
  const handleClick = () => {
    // Replace this URL with your actual PayPal payment link or PayPal Checkout integration
    window.location.href = "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YOUR_BUTTON_ID";
  };

  return (
    <button onClick={handleClick} style={{ padding: '1rem', fontSize: '1.2rem', margin: '2rem' }}>
      Go Premium
    </button>
  );
}

export default GoPremiumButton;

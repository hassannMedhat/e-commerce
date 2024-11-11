// src/components/CreditCard.jsx
import React, { useState, useEffect } from 'react';
import '../index.css';

const CreditCard = ({ cardNumber, expiryDate, cvc, name, isInputFocused }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setIsFlipped(isInputFocused === 'cvc');
  }, [isInputFocused]);

  const formatCardNumber = (number) => {
    return number.padEnd(16, '•').match(/.{1,4}/g)?.join(' ') || '';
  };

  return (
    <div className="credit-card-container">
      <div className={`credit-card ${isFlipped ? 'flipped' : ''}`}>
        <div className="front">
          <div className="card-type">VISA</div>
          <div className="card-number">{formatCardNumber(cardNumber)}</div>
          <div className="card-name">{name || 'FULL NAME'}</div>
          <div className="card-expiry">{expiryDate || 'MM/YY'}</div>
        </div>
        <div className="back">
          <div className="card-strip"></div>
          <div className="card-signature"></div>
          <div className="card-cvc">
            CVC: {cvc || '***'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;



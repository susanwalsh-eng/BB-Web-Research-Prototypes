'use client';

import { useState } from 'react';

interface PaymentCardProps {
  amount: string;
  invoices: number;
  paymentInfo: string;
  status: 'PAID' | 'OVERDUE' | 'DUE' | 'DRAFTS';
}

export default function PaymentCard({ 
  amount, 
  invoices, 
  paymentInfo, 
  status
}: PaymentCardProps) {
  const [isActive, setIsActive] = useState(false);

  const getStatusClass = () => {
    switch (status) {
      case 'PAID': return 'payment-card-status--paid';
      case 'OVERDUE': return 'payment-card-status--overdue';
      case 'DUE': return 'payment-card-status--due';
      case 'DRAFTS': return 'payment-card-status--drafts';
      default: return 'payment-card-status--due';
    }
  };

  const getCardClass = () => {
    let baseClass = 'payment-card-new';
    if (isActive) baseClass += ' payment-card-new--active';
    return baseClass;
  };

  const getSubtitleText = () => {
    if (isActive) {
      return `${invoices} invoice${invoices !== 1 ? 's' : ''} • ${paymentInfo}`;
    }
    // Truncate for default state
    const fullText = `${invoices} invoice${invoices !== 1 ? 's' : ''} • ${paymentInfo}`;
    return fullText.length > 25 ? fullText.substring(0, 25) + '...' : fullText;
  };

  return (
    <div 
      className={getCardClass()}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onMouseLeave={() => setIsActive(false)}
      onClick={() => {
        // Handle card click
        console.log('Card clicked:', { amount, status });
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsActive(true);
          console.log('Card activated:', { amount, status });
        }
      }}
      onKeyUp={() => setIsActive(false)}
      tabIndex={0}
      role="button"
      aria-label={`Payment ${status.toLowerCase()}: ${amount}, ${invoices} invoice${invoices !== 1 ? 's' : ''}${paymentInfo ? ` and ${paymentInfo}` : ''}`}
    >
      <div className={`payment-card-status ${getStatusClass()}`}>
        {status}
      </div>
      
      <div className="payment-card-amount">
        {amount}
      </div>
      
      <div className="payment-card-description">
        {getSubtitleText()}
      </div>
      
      <div className="payment-card-arrow">
        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.0293 10.5L7.61685 7.08751C7.45643 6.9271 7.37622 6.72293 7.37622 6.47501C7.37622 6.2271 7.45643 6.02293 7.61685 5.86251C7.77726 5.7021 7.98143 5.62189 8.22935 5.62189C8.47726 5.62189 8.68143 5.7021 8.84185 5.86251L12.8668 9.88751C12.9543 9.97501 13.0163 10.0698 13.0528 10.1719C13.0892 10.274 13.1075 10.3833 13.1075 10.5C13.1075 10.6167 13.0892 10.7261 13.0528 10.8281C13.0163 10.9302 12.9543 11.025 12.8668 11.1125L8.84185 15.1375C8.68143 15.2979 8.47726 15.3781 8.22935 15.3781C7.98143 15.3781 7.77726 15.2979 7.61685 15.1375C7.45643 14.9771 7.37622 14.7729 7.37622 14.525C7.37622 14.2771 7.45643 14.0729 7.61685 13.9125L11.0293 10.5Z" fill="#112231" fillOpacity="0.75"/>
        </svg>
      </div>
    </div>
  );
} 
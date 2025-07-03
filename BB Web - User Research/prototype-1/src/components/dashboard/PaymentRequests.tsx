'use client';

import { useState } from 'react';
import PaymentCard from './PaymentCard';
import { getPaymentRequests, formatCurrency } from '@/utils/bankingData';

interface PaymentRequestsProps {
  onStarClick?: () => void;
  onNavigate?: (page: string) => void;
  visibleCardCount?: number;
}

export default function PaymentRequests({ onStarClick, onNavigate, visibleCardCount }: PaymentRequestsProps) {
  const [starButtonClicked, setStarButtonClicked] = useState(false);
  const [showRightSidebar, setShowRightSidebar] = useState(false);

  const handleStarButtonClick = () => {
    setStarButtonClicked(true);
    setShowRightSidebar(!showRightSidebar);
    if (onStarClick) {
      onStarClick();
    }
  };

  // Get payment requests data and aggregate by status
  const paymentRequests = getPaymentRequests();
  
  const aggregateByStatus = () => {
    const statuses = ['paid', 'overdue', 'due', 'drafts'] as const;
    
    return statuses.map(status => {
      const requests = paymentRequests.filter(request => request.status === status);
      const totalAmount = requests.reduce((sum, request) => sum + request.amount, 0);
      const invoiceCount = requests.length;
      
      return {
        status: status.toUpperCase() as 'PAID' | 'OVERDUE' | 'DUE' | 'DRAFTS',
        amount: formatCurrency(totalAmount),
        invoices: invoiceCount,
        paymentInfo: invoiceCount > 0 ? `${invoiceCount} payment${invoiceCount !== 1 ? 's' : ''}` : ''
      };
    });
  };

  const aggregatedData = aggregateByStatus();
  const totalActiveRequests = paymentRequests.filter(req => req.status === 'overdue' || req.status === 'due').length;

  const handleStatusClick = (status: string) => {
    const filterParam = status.toLowerCase();
    // Navigate to GetPaid page with status filter
    onNavigate?.(`Get Paid?status=${filterParam}`);
  };

  return (
    <div className="card">
      <div className="card__header">
        <h2 className="card__title">Payment requests</h2>
        <button 
          className={`add-btn ${showRightSidebar ? 'add-btn--active' : ''} ${starButtonClicked ? 'add-btn--clicked' : ''}`} 
          onClick={handleStarButtonClick}
        >
          <svg width="24" height="25" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.4673 27.9543C16.9176 27.9543 16.5178 27.592 16.3679 26.9174C16.093 25.7056 15.8307 24.4814 15.5558 23.2696C15.131 21.4457 13.9941 20.3214 12.1701 19.8966C10.9957 19.6218 9.82126 19.3719 8.65935 19.0971C8.5594 19.0721 8.45946 19.0596 8.35951 19.0221C7.82228 18.8472 7.49745 18.41 7.50994 17.8978C7.50994 17.3856 7.85976 16.9984 8.43447 16.8609C9.72131 16.5611 11.0081 16.2863 12.295 15.974C14.0566 15.5492 15.131 14.4249 15.5433 12.6884C15.8307 11.4892 16.0805 10.2899 16.3554 9.0906C16.3804 8.96568 16.4179 8.82826 16.4678 8.70334C16.6677 8.21613 17.13 7.91631 17.6173 7.95379C18.092 8.00376 18.4668 8.34105 18.5918 8.86574C18.8916 10.165 19.154 11.4767 19.4788 12.7634C19.9036 14.4749 20.9905 15.5492 22.7021 15.974C23.8516 16.2613 25.0135 16.4987 26.1754 16.761C26.3003 16.786 26.4377 16.8235 26.5627 16.8484C27.1499 17.0109 27.5122 17.4481 27.4997 17.9853C27.4997 18.4975 27.1249 18.9097 26.5252 19.0471C25.3008 19.3345 24.0639 19.5968 22.8396 19.8716C21.053 20.2839 19.9036 21.3582 19.4788 23.1572C19.179 24.4189 18.9041 25.7056 18.6043 26.9674C18.4668 27.567 18.0171 27.9293 17.4798 27.9293L17.4673 27.9543Z" fill="#218FB7"/>
            <path d="M7.48494 12.951C7.21008 12.951 7.01019 12.7761 6.93522 12.4388C6.79779 11.8267 6.67286 11.227 6.52294 10.6149C6.31054 9.70294 5.74833 9.14078 4.8363 8.92841C4.2491 8.79099 3.6619 8.66606 3.07471 8.52865C3.02473 8.52865 2.97476 8.50366 2.92478 8.49117C2.64992 8.40372 2.5 8.19135 2.5 7.92901C2.5 7.66666 2.67491 7.47928 2.96226 7.40432C3.59944 7.25441 4.2491 7.11699 4.88628 6.96708C5.76083 6.75471 6.29805 6.19255 6.51044 5.31807C6.66037 4.71843 6.7853 4.11879 6.91024 3.51915C6.92273 3.45669 6.93522 3.39423 6.96021 3.33176C7.08515 3.08191 7.31003 2.932 7.5599 2.95699C7.79728 2.98197 7.98469 3.14438 8.04715 3.40672C8.19708 4.05633 8.33451 4.70594 8.48443 5.35555C8.69682 6.21753 9.23405 6.75471 10.0961 6.96708C10.6708 7.1045 11.258 7.22943 11.8327 7.36684C11.8952 7.37934 11.9576 7.39183 12.0326 7.41681C12.3325 7.50426 12.5074 7.71663 12.5074 7.99147C12.5074 8.25381 12.32 8.45369 12.0201 8.51615C11.4079 8.65357 10.7957 8.79099 10.1711 8.92841C9.27152 9.12829 8.70931 9.66546 8.48443 10.5649C8.33451 11.202 8.19708 11.8392 8.04715 12.4763C7.97219 12.7761 7.7598 12.951 7.48494 12.9635V12.951Z" fill="#218FB7"/>
          </svg>
          <span style={{fontSize: '20px', fontWeight: 500, marginLeft: '5px', color: "#218FB7"}}>{visibleCardCount || 0}</span>
        </button>
      </div>
      <div className="card__content">
        <div className="payment-grid">
          {aggregatedData.map((data, index) => (
            <PaymentCard
              key={index}
              amount={data.amount}
              invoices={data.invoices}
              paymentInfo={data.paymentInfo}
              status={data.status}
              onClick={() => handleStatusClick(data.status)}
            />
          ))}
        </div>
        <div className="card-footer">
          <button 
            className="view-all-link"
            onClick={() => onNavigate?.('Get Paid')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--primary-blue)',
              textDecoration: 'none',
              fontSize: '20px',
              fontWeight: '500',
              transition: 'color 0.2s'
            }}
          >
            View all payment requests
            <svg width="24" height="24" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.7563 15.9546L10.8813 11.0796C10.6522 10.8504 10.5376 10.5588 10.5376 10.2046C10.5376 9.85042 10.6522 9.55876 10.8813 9.32959C11.1105 9.10042 11.4022 8.98584 11.7563 8.98584C12.1105 8.98584 12.4022 9.10042 12.6313 9.32959L18.3813 15.0796C18.5063 15.2046 18.5949 15.34 18.647 15.4858C18.6991 15.6317 18.7251 15.7879 18.7251 15.9546C18.7251 16.1213 18.6991 16.2775 18.647 16.4233C18.5949 16.5692 18.5063 16.7046 18.3813 16.8296L12.6313 22.5796C12.4022 22.8088 12.1105 22.9233 11.7563 22.9233C11.4022 22.9233 11.1105 22.8088 10.8813 22.5796C10.6522 22.3504 10.5376 22.0588 10.5376 21.7046C10.5376 21.3504 10.6522 21.0588 10.8813 20.8296L15.7563 15.9546Z" fill="#218FB7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
} 
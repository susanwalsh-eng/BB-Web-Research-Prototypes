'use client';

import { useState } from 'react';
import PaymentCard from './PaymentCard';
import { getPaymentRequests, formatCurrency } from '@/utils/bankingData';

interface PaymentRequestsProps {
  onNavigate?: (page: string) => void;
}

export default function PaymentRequests({ onNavigate }: PaymentRequestsProps) {

  // Get payment requests data and aggregate by status
  const paymentRequests = getPaymentRequests();
  
  const aggregateByStatus = () => {
    const statuses = ['paid', 'overdue', 'due', 'drafts'] as const;
    
    // Hard coded descriptions as requested
    const hardcodedDescriptions = [
      '5 paid invoices',
      '5 overdue invoices', 
      '5 invoices due',
      '2 drafts created'
    ];
    
    return statuses.map((status, index) => {
      const requests = paymentRequests.filter(request => request.status === status);
      const totalAmount = requests.reduce((sum, request) => sum + request.amount, 0);
      const invoiceCount = requests.length;
      
      return {
        status: status.toUpperCase() as 'PAID' | 'OVERDUE' | 'DUE' | 'DRAFTS',
        amount: formatCurrency(totalAmount),
        invoices: invoiceCount,
        paymentInfo: hardcodedDescriptions[index]
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
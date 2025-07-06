'use client';

import { useState, useMemo, useEffect } from 'react';
import { getPayments, formatCurrency } from '@/utils/bankingData';
import type { Payment } from '@/utils/bankingData';

interface ScheduledPayment {
  id: string;
  payee: string;
  reference: string;
  nextPayment: string;
  type: 'Bulk payments' | 'Standing Order';
  amount: number;
  avatar: string;
  avatarBg: string;
  description: string;
  category: string;
}

interface RecentRecipient {
  id: string;
  name: string;
  bankDetails: string;
  avatar: string;
  avatarBg: string;
}

interface PaymentsProps {
  onRowClick?: (payment: ScheduledPayment, element?: HTMLElement | null) => void;
  selectedRowId?: string;
  onNavigate?: (page: string) => void;
}

export default function Payments({ onRowClick, selectedRowId, onNavigate }: PaymentsProps) {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [clickedRowId, setClickedRowId] = useState<string | null>(null);

  // Filter options for scheduled payments
  const filterOptions = [
    { id: 'All', label: 'All' },
    { id: 'Bulk payments', label: 'Bulk payments' },
    { id: 'Standing Orders', label: 'Standing Orders' }
  ];

  // Payment tool cards
  const paymentToolCards = [
    {
      id: 'bank-transfer',
      title: 'Pay by bank transfer',
      description: 'Send money instantly to any UK bank account',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 9h18l-2 9H5l-2-9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 5v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 9V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 'bill-pay',
      title: 'Bill Pay',
      description: 'Pay bills and utilities with automatic scheduling',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="10,9 9,9 8,9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 'bulk-payments',
      title: 'Bulk payments',
      description: 'Send multiple payments at once from CSV upload',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
          <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
          <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
          <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
          <path d="M8 14h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 14h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 14h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];

  // Create scheduled payments data from banking data (outgoing payments)
  const scheduledPayments: ScheduledPayment[] = useMemo(() => {
    const payments = getPayments();
    const outgoingPayments = payments.filter(p => p.type === 'expense');
    
    return outgoingPayments.slice(0, 12).map((payment: Payment, index) => {
      // Assign type based on index for variety
      const type: 'Bulk payments' | 'Standing Order' = index % 3 === 0 ? 'Bulk payments' : 'Standing Order';
      
      // Create next payment dates (future dates)
      const today = new Date();
      const nextPaymentOffset = Math.floor(Math.random() * 30) + 1; // 1-30 days from now
      const nextPaymentDate = new Date(today);
      nextPaymentDate.setDate(today.getDate() + nextPaymentOffset);

      return {
        id: payment.id,
        payee: payment.payee,
        reference: payment.reference || `Payment reference`,
        nextPayment: nextPaymentDate.toLocaleDateString('en-GB', { 
          day: 'numeric', 
          month: 'long' 
        }),
        type,
        amount: Math.abs(payment.amount),
        avatar: payment.avatar,
        avatarBg: payment.avatarBg,
        description: payment.description,
        category: payment.category || 'Business Expense'
      };
    });
  }, []);

  // Create recent recipients data
  const recentRecipients: RecentRecipient[] = useMemo(() => {
    const payments = getPayments();
    const uniqueRecipients = new Map();
    
    payments.filter(p => p.type === 'expense').forEach(payment => {
      if (!uniqueRecipients.has(payment.payee)) {
        uniqueRecipients.set(payment.payee, {
          id: payment.id,
          name: payment.payee,
          bankDetails: `Sort Code: 20-00-00 • Account: ****${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
          avatar: payment.avatar,
          avatarBg: payment.avatarBg
        });
      }
    });
    
    return Array.from(uniqueRecipients.values()).slice(0, 4);
  }, []);

  // Filter scheduled payments based on active filter
  const filteredPayments = useMemo(() => {
    if (activeFilter === 'All') {
      return scheduledPayments;
    }
    return scheduledPayments.filter(payment => payment.type === activeFilter);
  }, [scheduledPayments, activeFilter]);

  const handleFilterClick = (filterId: string) => {
    setActiveFilter(filterId);
  };

  const handleRowClick = (payment: ScheduledPayment, event?: React.MouseEvent) => {
    const rowElement = event?.currentTarget as HTMLElement;
    setClickedRowId(payment.id);
    
    // Remove clicked state after animation
    setTimeout(() => {
      setClickedRowId(null);
    }, 200);

    onRowClick?.(payment, rowElement);
  };

  const handlePaymentToolClick = (toolId: string) => {
    console.log(`Payment tool clicked: ${toolId}`);
    // Future: Open respective payment flow modals
  };

  const handleRecentRecipientClick = (recipient: RecentRecipient) => {
    console.log(`Recent recipient clicked: ${recipient.name}`);
    // Future: Open quick payment flow for this recipient
  };

  const getRowClassName = (paymentId: string) => {
    let className = 'scheduled-payments-table__row';
    if (selectedRowId === paymentId) {
      className += ' scheduled-payments-table__row--selected';
    }
    if (clickedRowId === paymentId) {
      className += ' scheduled-payments-table__row--clicked';
    }
    return className;
  };

  const formatAmount = (amount: number) => {
    return formatCurrency(amount);
  };

  return (
    <div className="content-left">
      {/* Page Header */}
      <div className="all-activity-header">
        <div className="all-activity-header-container">
          {/* Page Title Row */}
          <div className="all-activity-title-row">
            <h1 className="all-activity-title">Payments</h1>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="all-activity-full-width">
        <div className="content__container" style={{ 
          maxWidth: '1228px', 
          margin: '0', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '32px', 
          paddingBottom: '100px' 
        }}>

        {/* Payment Tool Cards */}
        <div className="payment-tools-section">
          <div className="payment-tools-container">
            {paymentToolCards.map((card) => (
              <div
                key={card.id}
                className="payment-tool-card"
                onClick={() => handlePaymentToolClick(card.id)}
                tabIndex={0}
                role="button"
                aria-label={`${card.title}: ${card.description}`}
              >
                <div className="payment-tool-card__icon">
                  {card.icon}
                </div>
                <div className="payment-tool-card__content">
                  <h3 className="payment-tool-card__title">{card.title}</h3>
                  <p className="payment-tool-card__description">{card.description}</p>
                </div>
                <div className="payment-tool-card__arrow">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Recipients */}
        <div className="recent-recipients-section">
          <h3 className="recent-recipients-title">Recent recipients</h3>
          <div className="recent-recipients-container">
            {recentRecipients.map((recipient) => (
              <div
                key={recipient.id}
                className="recent-recipient-card"
                onClick={() => handleRecentRecipientClick(recipient)}
                tabIndex={0}
                role="button"
                aria-label={`Pay ${recipient.name}`}
              >
                <div 
                  className="recent-recipient-avatar"
                  style={{ backgroundColor: recipient.avatarBg }}
                >
                  {recipient.avatar}
                </div>
                <div className="recent-recipient-details">
                  <h4 className="recent-recipient-name">{recipient.name}</h4>
                  <p className="recent-recipient-bank-details">{recipient.bankDetails}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scheduled Payments Table */}
        <div className="scheduled-payments-section">
          <div className="scheduled-payments-header">
            <h3 className="scheduled-payments-title">Scheduled payments</h3>
            <div className="scheduled-payments-filters">
              {filterOptions.map((filter) => (
                <button
                  key={filter.id}
                  className={`payments-filter-pill ${
                    activeFilter === filter.id ? 'payments-filter-pill--active' : ''
                  }`}
                  onClick={() => handleFilterClick(filter.id)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="scheduled-payments-table-container">
            <div className="scheduled-payments-table">
              <div className="scheduled-payments-table__header">
                <div className="scheduled-payments-table__header-cell">To</div>
                <div className="scheduled-payments-table__header-cell">Next payment</div>
                <div className="scheduled-payments-table__header-cell">Type</div>
                <div className="scheduled-payments-table__header-cell scheduled-payments-table__header-cell--amount">Amount</div>
              </div>

              <div className="scheduled-payments-table__body">
                {filteredPayments.length > 0 ? (
                  filteredPayments.map((payment) => (
                    <div
                      key={payment.id}
                      className={getRowClassName(payment.id)}
                      onClick={(e) => handleRowClick(payment, e)}
                      tabIndex={0}
                      role="button"
                      aria-label={`View payment to ${payment.payee} for ${formatAmount(payment.amount)}`}
                    >
                      <div className="scheduled-payments-table__cell scheduled-payments-table__cell--payee">
                        <div 
                          className="scheduled-payments-table__avatar"
                          style={{ backgroundColor: payment.avatarBg }}
                        >
                          {payment.avatar}
                        </div>
                        <div className="scheduled-payments-table__payee-details">
                          <h4 className="scheduled-payments-table__payee-name">{payment.payee}</h4>
                          <p className="scheduled-payments-table__payee-reference">{payment.reference}</p>
                        </div>
                      </div>
                      <div className="scheduled-payments-table__cell">
                        {payment.nextPayment}
                      </div>
                      <div className="scheduled-payments-table__cell">
                        {payment.type}
                      </div>
                      <div className="scheduled-payments-table__cell scheduled-payments-table__cell--amount">
                        {formatAmount(payment.amount)}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="scheduled-payments-table__empty">
                    No scheduled payments found for the selected filter.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
} 
'use client';

import { useState } from 'react';

interface Payment {
  id: string;
  payee: string;
  invoice: string;
  date: string;
  type: string;
  amount: string;
  avatar: string;
  avatarBg: string;
}

interface ScheduledPaymentsProps {
  onRowClick: (payment: Payment, element?: HTMLElement | null) => void;
  selectedRowId?: string;
  onMenuStateChange?: (isOpen: boolean) => void;
  onNavigate?: (page: string) => void;
}

export default function ScheduledPayments({ onRowClick, selectedRowId, onMenuStateChange, onNavigate }: ScheduledPaymentsProps) {
  const [sortField, setSortField] = useState<'date' | 'amount' | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [clickedRowId, setClickedRowId] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const payments: Payment[] = [
    {
      id: '1',
      payee: 'Cheese shop International',
      invoice: 'Invoice #24875',
      date: '20 June 2024',
      type: 'Standing Order',
      amount: '£285.00',
      avatar: 'CS',
      avatarBg: '#ef4444'
    },
    {
      id: '2',
      payee: 'Crisps \'n Ting',
      invoice: 'Invoice #1658',
      date: '25 June 2025',
      type: 'Standing Order',
      amount: '£2185.00',
      avatar: 'CT',
      avatarBg: '#84cc16'
    },
    {
      id: '3',
      payee: 'June Payroll',
      invoice: 'Salaries for June',
      date: '25 June 2025',
      type: 'Bulk payment',
      amount: '£9,863.52',
      avatar: 'JP',
      avatarBg: '#06b6d4'
    },
    {
      id: '4',
      payee: 'Noble Rot Wineshop',
      invoice: 'Invoice #9001',
      date: '30 June 2025',
      type: 'Standing Order',
      amount: '£124.00',
      avatar: 'NR',
      avatarBg: '#14b8a6'
    },
    {
      id: '5',
      payee: 'Blackhorse Workshop',
      invoice: 'Invoice #1566',
      date: '30 June 2025',
      type: 'Standing Order',
      amount: '£98.00',
      avatar: 'BW',
      avatarBg: '#8b5cf6'
    }
  ];

  const handleSort = (field: 'date' | 'amount') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleRowClick = (payment: Payment, event?: React.MouseEvent) => {
    // Capture the row element immediately before any timeouts
    const rowElement = event ? (event.currentTarget as HTMLElement) : null;
    
    // Close any open menus first
    if (openMenuId) {
      setOpenMenuId(null);
      onMenuStateChange?.(false);
    }
    
    setClickedRowId(payment.id);
    // Brief delay to show clicked state before transitioning to selected
    setTimeout(() => {
      setClickedRowId(null);
      onRowClick(payment, rowElement);
    }, 150);
  };

  const handleMenuClick = (paymentId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const newOpenId = openMenuId === paymentId ? null : paymentId;
    setOpenMenuId(newOpenId);
    onMenuStateChange?.(newOpenId !== null);
  };

  const getRowClassName = (paymentId: string) => {
    const baseClass = 'scheduled-payment-row';
    
    if (clickedRowId === paymentId) {
      return `${baseClass} scheduled-payment-row--clicked`;
    }
    
    if (selectedRowId === paymentId) {
      return `${baseClass} scheduled-payment-row--selected`;
    }
    
    return baseClass;
  };

  const SortIcon = ({ field, active }: { field: 'date' | 'amount', active: boolean }) => (
    <svg 
      width="12" 
      height="12" 
      viewBox="0 0 12 12" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`sort-icon ${active ? 'sort-icon--active' : ''}`}
    >
      {sortField === field && sortDirection === 'asc' ? (
        <path d="M6 2L9 8H3L6 2Z" fill="currentColor" />
      ) : (
        <path d="M6 10L3 4H9L6 10Z" fill="currentColor" />
      )}
    </svg>
  );

  return (
    <div className="card">
      <div className="card__header">
        <h2 className="card__title">Scheduled payments</h2>
      </div>
      <div className="card__content">
        <div className="scheduled-payments-table">
          <div className="scheduled-payments-table__header">
            <div>Payee details</div>
            <div 
              className="sortable-header"
              onClick={() => handleSort('date')}
            >
              Date
              <SortIcon field="date" active={sortField === 'date'} />
            </div>
            <div>Payment type</div>
            <div 
              className="sortable-header"
              onClick={() => handleSort('amount')}
            >
              Amount
              <SortIcon field="amount" active={sortField === 'amount'} />
            </div>
          </div>
          
          <div className="scheduled-payments-list">
            {payments.map((payment) => (
              <div
                key={payment.id}
                className={getRowClassName(payment.id)}
                onClick={(e) => handleRowClick(payment, e)}
                role="button"
                tabIndex={0}
                aria-label={`${payment.payee}, ${payment.amount}, ${payment.date}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleRowClick(payment);
                  }
                }}
              >
                <div className="scheduled-payment-info">
                  <div 
                    className="scheduled-payment-avatar" 
                    style={{backgroundColor: payment.avatarBg}}
                  >
                    {payment.avatar}
                  </div>
                  <div className="scheduled-payment-details">
                    <h4>{payment.payee}</h4>
                    <p>{payment.invoice}</p>
                  </div>
                </div>
                <div className="scheduled-payment-date">{payment.date}</div>
                <div className="scheduled-payment-type">{payment.type}</div>
                <div className="scheduled-payment-meta">
                  <div className="scheduled-payment-amount">{payment.amount}</div>
                  <div className="activity-menu-container">
                    <button 
                      className={`activity-menu ${openMenuId === payment.id ? 'activity-menu--active' : ''}`}
                      onClick={(e) => handleMenuClick(payment.id, e)}
                      aria-label="More options"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="1" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="19" cy="12" r="1" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="5" cy="12" r="1" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </button>
                    {openMenuId === payment.id && (
                      <div className="activity-menu-dropdown">
                        <button>Edit Payment</button>
                        <button>Duplicate</button>
                        <button>Cancel Payment</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="payments-summary">
            <div className="summary-info">
              <span className="info-icon">ⓘ</span>
              Estimated total payments: 5 payments due in next 30 days
            </div>
            <div className="summary-amount">£11,587.52</div>
          </div>
        </div>
        
        <div className="card-footer">
          <button 
            className="view-all-link" 
            onClick={() => onNavigate?.('Payments')}
          >
            View all payments
            <svg width="24" height="24" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.7563 15.9546L10.8813 11.0796C10.6522 10.8504 10.5376 10.5588 10.5376 10.2046C10.5376 9.85042 10.6522 9.55876 10.8813 9.32959C11.1105 9.10042 11.4022 8.98584 11.7563 8.98584C12.1105 8.98584 12.4022 9.10042 12.6313 9.32959L18.3813 15.0796C18.5063 15.2046 18.5949 15.34 18.647 15.4858C18.6991 15.6317 18.7251 15.7879 18.7251 15.9546C18.7251 16.1213 18.6991 16.2775 18.647 16.4233C18.5949 16.5692 18.5063 16.7046 18.3813 16.8296L12.6313 22.5796C12.4022 22.8088 12.1105 22.9233 11.7563 22.9233C11.4022 22.9233 11.1105 22.8088 10.8813 22.5796C10.6522 22.3504 10.5376 22.0588 10.5376 21.7046C10.5376 21.3504 10.6522 21.0588 10.8813 20.8296L15.7563 15.9546Z" fill="#218FB7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
} 
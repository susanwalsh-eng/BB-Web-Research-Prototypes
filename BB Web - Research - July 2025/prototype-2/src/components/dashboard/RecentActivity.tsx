'use client';

import { useState, useMemo } from 'react';
import { getRecentPayments, formatCurrency } from '@/utils/bankingData';
import type { Payment } from '@/utils/bankingData';

interface Transaction {
  id: string;
  name: string;
  description: string;
  amount: string;
  date: string;
  type: 'income' | 'expense';
  avatar: string;
  avatarBg: string;
}

interface RecentActivityProps {
  onRowClick: (transaction: Transaction, element?: HTMLElement | null) => void;
  selectedRowId?: string;
  onMenuStateChange?: (isOpen: boolean) => void;
  onNavigate?: (page: string) => void;
}

export default function RecentActivity({ onRowClick, selectedRowId, onMenuStateChange, onNavigate }: RecentActivityProps) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['All']);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [clickedRowId, setClickedRowId] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState({
    from: '',
    to: ''
  });

  // Get real banking data
  const payments = getRecentPayments(10); // Get recent 10 payments
  
  // Convert payments to transactions format
  const transactions: Transaction[] = useMemo(() => {
    return payments.map((payment: Payment) => ({
      id: payment.id,
      name: payment.payee,
      description: `${payment.paymentType} • ${payment.display_date}`,
      amount: payment.type === 'income' ? 
        `+${formatCurrency(payment.amount)}` : 
        formatCurrency(payment.amount),
      date: payment.display_date,
      type: payment.type,
      avatar: payment.avatar,
      avatarBg: payment.avatarBg
    }));
  }, [payments]);

  // Calculate filter counts dynamically
  const filters = useMemo(() => {
    const allCount = transactions.length;
    const paymentsInCount = transactions.filter(t => t.type === 'income').length;
    const paymentsOutCount = transactions.filter(t => t.type === 'expense').length;
    const potTransfersCount = 0; // Not in our data for now
    
    return [
      { id: 'All', label: 'All', count: allCount },
      { id: 'Payments in', label: 'Payments in', count: paymentsInCount },
      { id: 'Payments out', label: 'Payments out', count: paymentsOutCount },
      { id: 'Pot transfers', label: 'Pot transfers', count: potTransfersCount }
    ];
  }, [transactions]);

  // Filter transactions based on selected filters
  const filteredTransactions = useMemo(() => {
    if (selectedFilters.includes('All')) {
      return transactions;
    }
    
    return transactions.filter(transaction => {
      if (selectedFilters.includes('Payments in') && transaction.type === 'income') return true;
      if (selectedFilters.includes('Payments out') && transaction.type === 'expense') return true;
      // Pot transfers would be handled here if we had that data
      return false;
    });
  }, [transactions, selectedFilters]);

  const quickPresets = [
    'This month',
    'Last month',
    'Last 3 months',
    'This year'
  ];

  const handleFilterClick = (filterId: string) => {
    if (filterId === 'All') {
      setSelectedFilters(['All']);
    } else {
      const newFilters = selectedFilters.filter(f => f !== 'All');
      if (selectedFilters.includes(filterId)) {
        const updated = newFilters.filter(f => f !== filterId);
        setSelectedFilters(updated.length === 0 ? ['All'] : updated);
      } else {
        setSelectedFilters([...newFilters, filterId]);
      }
    }
  };

  const handleRowClick = (transaction: Transaction, event?: React.MouseEvent) => {
    // Capture the row element immediately before any timeouts
    const rowElement = event ? (event.currentTarget as HTMLElement) : null;
    
    // Close any open menus first
    if (openMenuId) {
      setOpenMenuId(null);
      onMenuStateChange?.(false);
    }
    
    setClickedRowId(transaction.id);
    // Brief delay to show clicked state before transitioning to selected
    setTimeout(() => {
      setClickedRowId(null);
      onRowClick(transaction, rowElement);
    }, 150);
  };

  const handleMenuClick = (transactionId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const newOpenId = openMenuId === transactionId ? null : transactionId;
    setOpenMenuId(newOpenId);
    onMenuStateChange?.(newOpenId !== null);
  };

  const getRowClassName = (transactionId: string) => {
    const baseClass = 'activity-row';
    
    if (clickedRowId === transactionId) {
      return `${baseClass} activity-row--clicked`;
    }
    
    if (selectedRowId === transactionId) {
      return `${baseClass} activity-row--selected`;
    }
    
    return baseClass;
  };

  const handleDateRangeSubmit = () => {
    setIsDatePickerOpen(false);
    // Here you would filter the transactions based on the date range
    console.log('Date range:', dateRange);
  };

  return (
    <div className="card">
      <div className="card__header">
        <h2 className="card__title">Recent activity</h2>
      </div>
      <div className="card__content">
        {/* Filter Chips and Activity Controls Row */}
        <div className="activity-controls-wrapper">
          <div className="filter-chips">
            {filters.map((filter) => (
              <button
                key={filter.id}
                className={`filter-chip ${selectedFilters.includes(filter.id) ? 'filter-chip--selected' : ''}`}
                onClick={() => handleFilterClick(filter.id)}
              >
                {filter.label}
                <span className="filter-chip__count">{filter.count}</span>
              </button>
            ))}
          </div>

          <div className="activity-controls">
            <button 
              className="control-btn"
              onClick={() => setIsDatePickerOpen(true)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
                <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
                <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Date range
            </button>
            <button className="control-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2"/>
                <polyline points="7,10 12,15 17,10" stroke="currentColor" strokeWidth="2"/>
                <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Export
            </button>
          </div>
        </div>

        {/* Transactions List */}
        <div className="activity-list">
          {filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className={getRowClassName(transaction.id)}
              onClick={(e) => handleRowClick(transaction, e)}
              role="button"
              tabIndex={0}
              aria-label={`${transaction.name}, ${transaction.amount}, ${transaction.description}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleRowClick(transaction);
                }
              }}
            >
              <div className="activity-info">
                <div 
                  className="activity-avatar"
                  style={{backgroundColor: transaction.avatarBg}}
                >
                  {transaction.avatar}
                </div>
                <div className="activity-details">
                  <h4>{transaction.name}</h4>
                  <p>{transaction.description}</p>
                </div>
              </div>
              <div className="activity-meta">
                <div className={`activity-amount ${transaction.type === 'income' ? 'activity-amount--positive' : ''}`}>
                  {transaction.amount}
                </div>
                <div className="activity-menu-container">
                  <button 
                    className={`activity-menu ${openMenuId === transaction.id ? 'activity-menu--active' : ''}`}
                    onClick={(e) => handleMenuClick(transaction.id, e)}
                    aria-label="More options"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="1" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="19" cy="12" r="1" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="5" cy="12" r="1" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </button>
                  {openMenuId === transaction.id && (
                    <div className="activity-menu-dropdown">
                      <button>Edit</button>
                      <button>Duplicate</button>
                      <button>Delete</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="card-footer">
          <button 
            onClick={() => onNavigate?.('Activity?from=dashboard')}
            className="view-all-link"
          >
            View all activity
            <svg width="24" height="24" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.7563 15.9546L10.8813 11.0796C10.6522 10.8504 10.5376 10.5588 10.5376 10.2046C10.5376 9.85042 10.6522 9.55876 10.8813 9.32959C11.1105 9.10042 11.4022 8.98584 11.7563 8.98584C12.1105 8.98584 12.4022 9.10042 12.6313 9.32959L18.3813 15.0796C18.5063 15.2046 18.5949 15.34 18.647 15.4858C18.6991 15.6317 18.7251 15.7879 18.7251 15.9546C18.7251 16.1213 18.6991 16.2775 18.647 16.4233C18.5949 16.5692 18.5063 16.7046 18.3813 16.8296L12.6313 22.5796C12.4022 22.8088 12.1105 22.9233 11.7563 22.9233C11.4022 22.9233 11.1105 22.8088 10.8813 22.5796C10.6522 22.3504 10.5376 22.0588 10.5376 21.7046C10.5376 21.3504 10.6522 21.0588 10.8813 20.8296L15.7563 15.9546Z" fill="#218FB7"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Date Range Picker Modal */}
      {isDatePickerOpen && (
        <div className="date-picker-overlay" onClick={() => setIsDatePickerOpen(false)}>
          <div className="date-picker-modal" onClick={(e) => e.stopPropagation()}>
            <div className="date-picker-header">
              <h3>Select date range</h3>
              <button 
                className="date-picker-close"
                onClick={() => setIsDatePickerOpen(false)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            <div className="date-picker-content">
              <div className="date-picker-fields">
                <div className="date-field">
                  <label>From</label>
                  <input 
                    type="date" 
                    value={dateRange.from}
                    onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
                  />
                </div>
                <div className="date-field">
                  <label>To</label>
                  <input 
                    type="date" 
                    value={dateRange.to}
                    onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="date-picker-presets">
                <h4>Quick presets</h4>
                <div className="preset-buttons">
                  {quickPresets.map((preset) => (
                    <button key={preset} className="preset-btn">
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="date-picker-footer">
              <button 
                className="button-ui button-ui--secondary"
                onClick={() => setIsDatePickerOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="button-ui button-ui--primary"
                onClick={handleDateRangeSubmit}
              >
                View transactions
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
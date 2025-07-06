'use client';

import { useState, useMemo } from 'react';
import { getPayments, formatCurrency, getCashFlowData } from '@/utils/bankingData';
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
  paymentType: string;
}

interface AllActivityProps {
  onRowClick: (transaction: Transaction, element?: HTMLElement | null) => void;
  selectedRowId?: string;
  onMenuStateChange?: (isOpen: boolean) => void;
  onNavigate?: (page: string) => void;
  showBackButton?: boolean;
}

export default function AllActivity({ 
  onRowClick, 
  selectedRowId, 
  onMenuStateChange, 
  onNavigate,
  showBackButton = false
}: AllActivityProps) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['This month']);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isFiltersDropdownOpen, setIsFiltersDropdownOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [clickedRowId, setClickedRowId] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<{ field: string; direction: 'asc' | 'desc' }>({
    field: 'date',
    direction: 'desc'
  });
  const [dateRange, setDateRange] = useState({
    from: '',
    to: ''
  });

  const chipFilters = [
    { id: 'Money in', label: 'Money in', isChip: true },
    { id: 'Money out', label: 'Money out', isChip: true },
    { id: 'This month', label: 'This month', isChip: true, removable: true }
  ];

  const dropdownFilters = [
    { id: 'Filters', label: 'Filters', isDropdown: true },
    { id: 'Date', label: 'Date', isDropdown: true },
    { id: 'Currency', label: 'Currency', isDropdown: true }
  ];

  // Get real banking data
  const payments = getPayments();
  const cashFlowData = getCashFlowData();
  
  // Convert payments to transactions format
  const transactions: Transaction[] = useMemo(() => {
    return payments.map((payment: Payment) => ({
      id: payment.id,
      name: payment.payee,
      description: payment.description,
      amount: Math.abs(payment.amount).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      date: payment.display_date,
      type: payment.type,
      avatar: payment.avatar,
      avatarBg: payment.avatarBg,
      paymentType: payment.paymentType
    }));
  }, [payments]);

  const handleBackClick = () => {
    onNavigate?.('Home');
  };

  const handleFilterClick = (filterId: string) => {
    if (dropdownFilters.find(f => f.id === filterId)) {
      // Handle dropdown filters
      if (filterId === 'Filters') {
        setIsFiltersDropdownOpen(!isFiltersDropdownOpen);
      } else if (filterId === 'Date') {
        setIsDatePickerOpen(true);
      } else if (filterId === 'Currency') {
        setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen);
      }
    } else {
      // Handle chip filters
      if (selectedFilters.includes(filterId)) {
        setSelectedFilters(selectedFilters.filter(f => f !== filterId));
      } else {
        setSelectedFilters([...selectedFilters, filterId]);
      }
    }
  };

  const handleRemoveFilter = (filterId: string) => {
    setSelectedFilters(selectedFilters.filter(f => f !== filterId));
  };

  const handleRowClick = (transaction: Transaction, event?: React.MouseEvent) => {
    const rowElement = event ? (event.currentTarget as HTMLElement) : null;
    
    if (openMenuId) {
      setOpenMenuId(null);
      onMenuStateChange?.(false);
    }
    
    setClickedRowId(transaction.id);
    setTimeout(() => {
      setClickedRowId(null);
      onRowClick(transaction, rowElement);
    }, 150);
  };

  const handleSort = (field: string) => {
    setSortBy(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
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

  const formatAmount = (amount: string, type: 'income' | 'expense') => {
    const sign = type === 'income' ? '+' : '-';
    return `${sign}£${amount}`;
  };

  // Sort transactions based on current sort settings
  const sortedTransactions = [...transactions].sort((a, b) => {
    const direction = sortBy.direction === 'asc' ? 1 : -1;
    
    switch (sortBy.field) {
      case 'date':
        // Simple date sorting - in real app would use proper date parsing
        const dateOrder = ['Today', 'Yesterday'];
        const aIndex = dateOrder.indexOf(a.date);
        const bIndex = dateOrder.indexOf(b.date);
        return (aIndex - bIndex) * direction;
      case 'amount':
        const aAmount = parseFloat(a.amount.replace('£', '').replace(',', ''));
        const bAmount = parseFloat(b.amount.replace('£', '').replace(',', ''));
        return (aAmount - bAmount) * direction;
      case 'name':
        return a.name.localeCompare(b.name) * direction;
      default:
        return 0;
    }
  });

  // Calculate summary stats using real data
  const netIncome = cashFlowData.netIncome;
  const thisMonthIncome = cashFlowData.moneyIn;
  const thisMonthExpenses = cashFlowData.moneyOut;

  return (
    <div className="content-left">
      {/* Page Header with Back Button */}
      <div className="all-activity-header">
        <div className="all-activity-header-container">
          {/* Back Button - only show when showBackButton prop is true */}
          {showBackButton && (
            <button className="back-button" onClick={handleBackClick}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5m0 0l7 7m-7-7l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back
            </button>
          )}
          
          {/* Page Title Row with Download Button */}
          <div className="all-activity-title-row">
            <h1 className="all-activity-title">Activity</h1>
            
            {/* Download Statements Button */}
            <button className="download-statements-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2"/>
                <polyline points="7,10 12,15 17,10" stroke="currentColor" strokeWidth="2"/>
                <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Download statements
            </button>
          </div>
          
          {/* Filters Row */}
          <div className="filters-row">
            <div className="filters-container">
              {/* Dropdown Filters */}
              {dropdownFilters.map((filter) => (
                <div key={filter.id} style={{ position: 'relative' }}>
                  <button
                    className="filter-chip filter-chip--dropdown"
                    onClick={() => handleFilterClick(filter.id)}
                  >
                    {filter.label}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              ))}
              
              {/* Chip Filters */}
              {chipFilters.map((filter) => (
                <button
                  key={filter.id}
                  className={`filter-chip ${selectedFilters.includes(filter.id) ? 'filter-chip--selected' : ''}`}
                  onClick={() => handleFilterClick(filter.id)}
                >
                  {filter.label}
                  {filter.removable && selectedFilters.includes(filter.id) && (
                    <svg 
                      width="14" 
                      height="14" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFilter(filter.id);
                      }}
                      style={{ marginLeft: '4px', cursor: 'pointer' }}
                    >
                      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="content__container all-activity-full-width" style={{ paddingBottom: '100px' }}>
        {/* Summary Stats */}
        <div className="card" style={{ marginBottom: '24px' }}>
          <div className="card__content" style={{ padding: '24px' }}>
            <div className="cash-flow-grid">
              <div className="cash-flow-item">
                <div className="cash-flow-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  Net income
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 3v18h18" stroke="currentColor" strokeWidth="2"/>
                    <path d="M13 17l4-4-4-4M8 12l4 4" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="cash-flow-amount">{formatCurrency(netIncome)}</div>
                <div className="cash-flow-period">This month</div>
              </div>

              <div className="cash-flow-item">
                <div className="cash-flow-label">Money in</div>
                <div className="cash-flow-amount cash-flow-positive">{formatCurrency(thisMonthIncome)}</div>
                <div className="cash-flow-period">↑ 20% vs last month</div>
              </div>

              <div className="cash-flow-item">
                <div className="cash-flow-label">Money out</div>
                <div className="cash-flow-amount">{formatCurrency(thisMonthExpenses)}</div>
                <div className="cash-flow-period">↓ 11.2% vs last month</div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Table */}
        <div className="card">
          <div className="card__header">
            <h2 className="card__title">Transactions</h2>
          </div>
          <div className="card__content">
            {/* Table Header */}
            <div className="scheduled-payments-table__header">
              <div className="sortable-header" onClick={() => handleSort('payee')}>
                Payee details
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 10l5-5 5 5M7 14l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="sortable-header" onClick={() => handleSort('date')}>
                Date
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 10l5-5 5 5M7 14l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="sortable-header" onClick={() => handleSort('type')}>
                Payment type
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 10l5-5 5 5M7 14l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>Amount</div>
            </div>

            {/* Transaction Rows */}
            <div className="scheduled-payments-list">
              {sortedTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className={`scheduled-payment-row ${getRowClassName(transaction.id)}`}
                  onClick={(e) => handleRowClick(transaction, e)}
                  role="button"
                  tabIndex={0}
                  aria-label={`${transaction.name}, ${formatAmount(transaction.amount, transaction.type)}, ${transaction.description}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleRowClick(transaction);
                    }
                  }}
                >
                  <div className="scheduled-payment-info">
                    <div 
                      className="scheduled-payment-avatar"
                      style={{backgroundColor: transaction.avatarBg}}
                    >
                      {transaction.avatar}
                    </div>
                    <div className="scheduled-payment-details">
                      <h4>{transaction.name}</h4>
                      <p>{transaction.description}</p>
                    </div>
                  </div>
                  <div className="scheduled-payment-date">{transaction.date}</div>
                  <div className="scheduled-payment-type">{transaction.paymentType}</div>
                  <div className="scheduled-payment-meta">
                    <div className={`scheduled-payment-amount ${transaction.type === 'income' ? 'activity-amount--positive' : ''}`}>
                      {formatAmount(transaction.amount, transaction.type)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
                  {['This month', 'Last month', 'Last 3 months', 'This year'].map((preset) => (
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
                onClick={() => setIsDatePickerOpen(false)}
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
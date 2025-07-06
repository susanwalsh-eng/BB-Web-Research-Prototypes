'use client';

import { useState, useMemo, useEffect } from 'react';
import { getPayments, formatCurrency } from '@/utils/bankingData';
import type { Payment } from '@/utils/bankingData';

interface Invoice {
  id: string;
  payee: string;
  reference: string;
  dueDate: string;
  status: 'paid' | 'overdue' | 'due' | 'draft';
  amount: number;
  avatar: string;
  avatarBg: string;
  description: string;
  category: string;
  paymentType: string;
}

interface GetPaidProps {
  onRowClick: (invoice: Invoice, element?: HTMLElement | null) => void;
  selectedRowId?: string;
  onNavigate?: (page: string) => void;
  initialFilter?: string;
}

export default function GetPaid({ onRowClick, selectedRowId, onNavigate, initialFilter = 'All' }: GetPaidProps) {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<string>('Invoices');
  const [clickedRowId, setClickedRowId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<{ field: string; direction: 'asc' | 'desc' }>({
    field: 'dueDate',
    direction: 'desc'
  });

  // Main tabs for Get Paid section
  const mainTabs = [
    { id: 'Quotes', label: 'Quotes' },
    { id: 'Invoices', label: 'Invoices' },
    { id: 'Payment Links', label: 'Payment Links' },
    { id: 'QR Codes', label: 'QR Codes' },
    { id: 'Contactless', label: 'Contactless' }
  ];

  // Filter tabs for current view
  const filterTabs = [
    { id: 'Paid', label: 'Paid', count: 0 },
    { id: 'Due', label: 'Due', count: 0 },
    { id: 'Overdue', label: 'Overdue', count: 0 },
    { id: 'Drafts', label: 'Drafts', count: 0 }
  ];

  // Request payment cards
  const requestPaymentCards = [
    {
      id: 'share-link',
      title: 'Share payment link',
      description: 'Create a link to share with customers for quick payments',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 'create-quote',
      title: 'Create quote', 
      description: 'Generate a professional quote for your services',
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
      id: 'create-invoice',
      title: 'Create invoice',
      description: 'Send invoices to customers with payment terms',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="13" y1="9" x2="8" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];

  // Create invoice data from payments (filter for income payments which represent invoices)
  const invoices: Invoice[] = useMemo(() => {
    const payments = getPayments();
    const incomePayments = payments.filter(p => p.type === 'income');
    
    return incomePayments.slice(0, 25).map((payment: Payment, index) => {
      // Assign status based on index to create variety
      let status: 'paid' | 'overdue' | 'due' | 'draft';
      const statusIndex = index % 4;
      switch (statusIndex) {
        case 0: status = 'paid'; break;
        case 1: status = 'overdue'; break;
        case 2: status = 'due'; break;
        default: status = 'draft'; break;
      }

      // Create due dates (some past for overdue, some future for due)
      const today = new Date();
      const dueDateOffset = status === 'overdue' ? -Math.floor(Math.random() * 30) - 1 : 
                           status === 'due' ? Math.floor(Math.random() * 30) + 1 : 0;
      const dueDate = new Date(today);
      dueDate.setDate(today.getDate() + dueDateOffset);

      return {
        id: payment.id,
        payee: payment.payee,
        reference: payment.reference || `INV-${payment.id.padStart(4, '0')}`,
        dueDate: dueDate.toLocaleDateString('en-GB'),
        status,
        amount: Math.abs(payment.amount),
        avatar: payment.avatar,
        avatarBg: payment.avatarBg,
        description: payment.description,
        category: payment.category || 'Business Income',
        paymentType: payment.paymentType
      };
    });
  }, []);

  // Update filter counts
  const filtersWithCounts = useMemo(() => {
    const counts = {
      Paid: invoices.filter(i => i.status === 'paid').length,
      Due: invoices.filter(i => i.status === 'due').length,
      Overdue: invoices.filter(i => i.status === 'overdue').length,
      Drafts: invoices.filter(i => i.status === 'draft').length
    };

    return filterTabs.map(tab => ({
      ...tab,
      count: counts[tab.id as keyof typeof counts]
    }));
  }, [invoices]);

  // Update active filter when initialFilter changes
  useEffect(() => {
    if (initialFilter && initialFilter !== 'All') {
      const capitalizedStatus = initialFilter.charAt(0).toUpperCase() + initialFilter.slice(1);
      if (filterTabs.find(tab => tab.id === capitalizedStatus)) {
        setActiveFilter(capitalizedStatus);
      }
    }
  }, [initialFilter]);

  // Filter invoices based on active filter
  const filteredInvoices = useMemo(() => {
    if (activeFilter === 'All') {
      return invoices;
    }
    return invoices.filter(invoice => {
      const statusMap = {
        'Paid': 'paid',
        'Due': 'due', 
        'Overdue': 'overdue',
        'Drafts': 'draft'
      };
      return invoice.status === statusMap[activeFilter as keyof typeof statusMap];
    });
  }, [invoices, activeFilter]);

  // Sort invoices
  const sortedInvoices = useMemo(() => {
    return [...filteredInvoices].sort((a, b) => {
      const direction = sortBy.direction === 'asc' ? 1 : -1;
      
      switch (sortBy.field) {
        case 'payee':
          return a.payee.localeCompare(b.payee) * direction;
        case 'reference':
          return a.reference.localeCompare(b.reference) * direction;
        case 'dueDate':
          const aDate = new Date(a.dueDate.split('/').reverse().join('-'));
          const bDate = new Date(b.dueDate.split('/').reverse().join('-'));
          return (aDate.getTime() - bDate.getTime()) * direction;
        case 'amount':
          return (a.amount - b.amount) * direction;
        default:
          return 0;
      }
    });
  }, [filteredInvoices, sortBy]);



  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    // Reset filter when switching tabs
    setActiveFilter('All');
  };

  const handleFilterClick = (filterId: string) => {
    if (activeFilter === filterId) {
      setActiveFilter('All'); // Deselect if already active
    } else {
      setActiveFilter(filterId);
    }
  };

  const handleRowClick = (invoice: Invoice, event?: React.MouseEvent) => {
    const rowElement = event ? (event.currentTarget as HTMLElement) : null;
    
    setClickedRowId(invoice.id);
    setTimeout(() => {
      setClickedRowId(null);
      onRowClick(invoice, rowElement);
    }, 150);
  };

  const handleSort = (field: string) => {
    setSortBy(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleRequestPaymentClick = (cardId: string) => {
    console.log('Request payment clicked:', cardId);
    // Handle navigation to appropriate creation flow
  };

  const getRowClassName = (invoiceId: string) => {
    const baseClass = 'invoice-table__row';
    
    if (clickedRowId === invoiceId) {
      return `${baseClass} invoice-table__row--clicked`;
    }
    
    if (selectedRowId === invoiceId) {
      return `${baseClass} invoice-table__row--selected`;
    }
    
    return baseClass;
  };

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      paid: 'status-pill status-pill--paid',
      overdue: 'status-pill status-pill--overdue',
      due: 'status-pill status-pill--due',
      draft: 'status-pill status-pill--draft'
    };

    const statusLabels = {
      paid: 'PAID',
      overdue: 'OVERDUE',
      due: 'DUE',
      draft: 'DRAFT'
    };

    return (
      <span className={statusClasses[status as keyof typeof statusClasses]}>
        {statusLabels[status as keyof typeof statusLabels]}
      </span>
    );
  };

  const getSortIcon = (field: string) => {
    if (sortBy.field !== field) {
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="sort-icon">
          <path d="M8 9l4-4 4 4M16 15l-4 4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    }

    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="sort-icon sort-icon--active">
        {sortBy.direction === 'asc' ? (
          <path d="M8 15l4-4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        ) : (
          <path d="M8 9l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        )}
      </svg>
    );
  };

  // Format currency amount properly to avoid double symbols
  const formatAmount = (amount: number) => {
    return `£${amount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="content-left">
      {/* Page Header without Back Button */}
      <div className="all-activity-header">
        <div className="all-activity-header-container">
          {/* Page Title Row */}
          <div className="all-activity-title-row">
            <h1 className="all-activity-title">Get Paid</h1>
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
          {/* Request Payment Section */}
          <div className="action-cards-section">
            <div className="action-cards-container">
              {requestPaymentCards.map((card) => (
                <div
                  key={card.id}
                  className="action-card"
                  onClick={() => handleRequestPaymentClick(card.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleRequestPaymentClick(card.id);
                    }
                  }}
                >
                  <div className="action-card__icon">{card.icon}</div>
                  <div className="action-card__content">
                    <h3 className="action-card__title">{card.title}</h3>
                    <p className="action-card__description">{card.description}</p>
                  </div>
                  <div className="action-card__arrow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tab Bar */}
          <div className="tab-bar">
            <div className="tab-bar__container">
              {mainTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`tab-bar__tab ${activeTab === tab.id ? 'tab-bar__tab--active' : ''}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Pills for Current View */}
          {activeTab === 'Invoices' && (
            <div className="filter-pills-section">
              <div className="filter-pills-container">
                {filtersWithCounts.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => handleFilterClick(filter.id)}
                    className={`filter-pill ${activeFilter === filter.id ? 'filter-pill--active' : ''}`}
                  >
                    {filter.label}
                    {activeFilter === filter.id && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="filter-pill__close">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Content based on active tab */}
          {activeTab === 'Invoices' && (
            <div className="invoice-table-container">
              <div className="invoice-table">
                {/* Table Header */}
                <div className="invoice-table__header">
                  <div className="invoice-table__header-cell invoice-table__header-cell--payee">
                    <span>Payee Details</span>
                  </div>
                  <div className="invoice-table__header-cell">
                    <span>Due Date</span>
                  </div>
                  <div className="invoice-table__header-cell">
                    <span>Status</span>
                  </div>
                  <div className="invoice-table__header-cell invoice-table__header-cell--amount">
                    <span>Amount</span>
                  </div>
                </div>

                {/* Table Body */}
                <div className="invoice-table__body">
                  {sortedInvoices.map((invoice) => (
                    <div
                      key={invoice.id}
                      className={getRowClassName(invoice.id)}
                      onClick={(e) => handleRowClick(invoice, e)}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleRowClick(invoice);
                        }
                      }}
                    >
                      <div className="invoice-table__cell invoice-table__cell--payee">
                        <div className="invoice-table__avatar" style={{ backgroundColor: invoice.avatarBg }}>
                          {invoice.avatar}
                        </div>
                        <div className="invoice-table__payee-details">
                          <div className="invoice-table__payee-name">{invoice.payee}</div>
                          <div className="invoice-table__payee-reference">{invoice.reference}</div>
                        </div>
                      </div>
                      <div className="invoice-table__cell">
                        {invoice.dueDate}
                      </div>
                      <div className="invoice-table__cell">
                        {getStatusBadge(invoice.status)}
                      </div>
                      <div className="invoice-table__cell invoice-table__cell--amount">
                        {formatAmount(invoice.amount)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Empty State */}
                {sortedInvoices.length === 0 && (
                  <div className="invoice-table__empty">
                    No invoices found for "{activeFilter}" filter.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Placeholder content for other tabs */}
          {activeTab !== 'Invoices' && (
            <div className="tab-content-placeholder">
              <div className="tab-content-placeholder__content">
                <h3 className="tab-content-placeholder__title">
                  {activeTab} - Coming Soon
                </h3>
                <p className="tab-content-placeholder__description">
                  This section will contain {activeTab.toLowerCase()} management features.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
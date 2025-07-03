'use client';

import { useEffect, useRef } from 'react';
import { formatCurrency } from '@/utils/bankingData';

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
  className?: string;
  // For payment/transaction details
  avatar?: string;
  companyName?: string;
  amount?: string;
  nextPaymentLabel?: string;
  nextPaymentDate?: string;
  details?: Array<{
    label: string;
    value: string;
    copyable?: boolean;
  }>;
  isIntegrated?: boolean;
}

export default function SidePanel({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  className = '',
  avatar,
  companyName,
  amount,
  nextPaymentLabel,
  nextPaymentDate,
  details,
  isIntegrated = false
}: SidePanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Focus trap
      const focusableElements = panelRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements && focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const formatAmount = (amount: string) => {
    // Simple approach: if it's a string amount, try to parse and reformat
    const numericValue = parseFloat(amount.replace(/[£$€,]/g, ''));
    if (!isNaN(numericValue)) {
      return formatCurrency(numericValue);
    }
    return amount; // Return as-is if parsing fails
  };

  if (!isOpen) return null;

  // Integrated side panel (matches Figma design)
  if (isIntegrated) {
    const formattedAmount = amount ? formatAmount(amount) : null;
    
    return (
      <div className="content-side-panel">
        <div className="side-panel-integrated">
          {/* Header Section - Mint Green */}
          <div className="side-panel__header">
            <div className="side-panel__header-top">
              <div className="side-panel__header-spacer"></div>
              <h2 className="side-panel__title">{title}</h2>
              <div className="side-panel__header-spacer"></div>
              <button className="side-panel__close" onClick={onClose}>
                ×
              </button>
            </div>
            
            {/* Profile Section */}
            <div className="side-panel__profile">
              <div className="side-panel__avatar">
                {avatar || 'CT'}
              </div>
              <h3 className="side-panel__company-name">
                {companyName || 'Company Name'}
              </h3>
              {formattedAmount && (
                <div className="side-panel__amount" style={{ fontSize: '33.18px', fontWeight: 600, color: '#112231' }}>
                  {formattedAmount}
                </div>
              )}
              {nextPaymentLabel && nextPaymentDate && (
                <div className="side-panel__next-payment">
                  <p className="side-panel__next-payment-label">{nextPaymentLabel}</p>
                  <p className="side-panel__next-payment-date">{nextPaymentDate}</p>
                </div>
              )}
            </div>
          </div>

          {/* Body Section - White */}
          <div className="side-panel__body">
            {details && details.length > 0 && (
              <div className="side-panel__section">
                <h4 className="side-panel__section-title">Details</h4>
                {details.map((detail, index) => (
                  <div key={index} className="side-panel__detail-row">
                    <span className="side-panel__detail-label">{detail.label}</span>
                    <span className="side-panel__detail-value">
                      {detail.value}
                      {detail.copyable && (
                        <button 
                          className="side-panel__copy-btn"
                          onClick={() => handleCopy(detail.value)}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M8 5H6a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-2M8 5a2 2 0 012-2h2a2 2 0 012 2M8 5a2 2 0 000 4h4a2 2 0 000-4" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                        </button>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            )}
            
            {children}
          </div>

          {/* Footer Section */}
          <div className="side-panel__footer">
            <button className="side-panel__edit-btn">
              Edit payment
            </button>
            <button className="side-panel__cancel-btn">
              Cancel Standing Order
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Original modal-style side panel
  return (
    <div 
      ref={overlayRef}
      className="side-panel-overlay"
      onClick={handleOverlayClick}
    >
      <div 
        ref={panelRef}
        className={`side-panel ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="side-panel-title"
      >
        <div className="side-panel__header">
          <h2 id="side-panel-title" className="side-panel__title">
            {title}
          </h2>
          <button 
            className="side-panel__close"
            onClick={onClose}
            aria-label="Close panel"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div className="side-panel__body">
          {children}
        </div>
        
        <div className="side-panel__footer">
          <button 
            className="button-ui button-ui--secondary"
            onClick={onClose}
          >
            Cancel
          </button>
          <button className="button-ui button-ui--primary">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
} 
'use client';

import React, { useRef, useState, useEffect } from 'react';

interface SuggestedActionCTA {
  type: 'primary' | 'secondary';
  text: string;
  action: string;
}

interface SuggestedAction {
  id: string;
  type: 'approval' | 'reminder' | 'feature' | 'info' | 'draft' | 'due' | 'paid';
  icon: string;
  title: string;
  reference?: string;
  body?: string;
  amount?: number;
  status?: 'OVERDUE' | 'PAID' | 'DRAFT' | 'DUE';
  cta: string[];
}

interface SuggestedActionsProps {
  onActionClick?: (actionId: string, actionType: string) => void;
}

// Mock data as specified in the user's code
const mockSuggestedActions: SuggestedAction[] = [
  {
    id: "1",
    type: "approval",
    title: "Approve a payment",
    reference: "Invoice #271 to Beer for All",
    amount: 1547.17,
    cta: ["Approve", "Review details"],
    icon: "💰",
  },
  {
    id: "2",
    type: "reminder",
    status: "OVERDUE",
    title: "Invoice #1496 overdue",
    body: "This invoice is awaiting payment.",
    cta: ["Send reminder", "Review details"],
    icon: "🔔",
  },
  {
    id: "3",
    type: "draft",
    status: "DRAFT",
    title: "New invoice draft",
    body: "Create and send a new invoice.",
    cta: ["Continue draft", "Discard"],
    icon: "📝",
  },
  {
    id: "4",
    type: "due",
    status: "DUE",
    title: "Payment due soon",
    body: "Invoice #1501 to Acme Corp is due on 2025-07-15.",
    cta: ["View invoice", "Send reminder"],
    icon: "📅",
  },
  {
    id: "5",
    type: "paid",
    status: "PAID",
    title: "Payment received",
    body: "Invoice #1488 from Global Widgets has been paid.",
    cta: ["View payment", "Archive"],
    icon: "✅",
  },
  {
    id: "6",
    type: "approval",
    title: "Approve another payment",
    reference: "Invoice #272 to Pizza Palace",
    amount: 899.50,
    cta: ["Approve", "Review details"],
    icon: "💰",
  },
  {
    id: "7",
    type: "reminder",
    status: "OVERDUE",
    title: "Invoice #1500 overdue",
    body: "This invoice is awaiting payment.",
    cta: ["Send reminder", "Review details"],
    icon: "🔔",
  },
];

const SparkleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M10 1L12.09 6.26L18 7L12.09 7.74L10 13L7.91 7.74L2 7L7.91 6.26L10 1Z" 
      fill="#FFD700" 
      stroke="#FFD700" 
      strokeWidth="0.5"
    />
    <path 
      d="M15 4L16.5 7.5L20 8L16.5 8.5L15 12L13.5 8.5L10 8L13.5 7.5L15 4Z" 
      fill="#FFD700" 
      stroke="#FFD700" 
      strokeWidth="0.3"
    />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M10 12L6 8L10 4" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M6 4L10 8L6 12" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// SuggestedActionCard Component
const SuggestedActionCard: React.FC<{ action: SuggestedAction; onActionClick: (actionId: string, actionType: string) => void }> = ({ action, onActionClick }) => {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'OVERDUE': return '#FF9D00';
      case 'PAID': return '#00C281';
      case 'DRAFT': return '#94A3B8';
      case 'DUE': return '#2E3D49';
      default: return '#94A3B8';
    }
  };

  const formatAmount = (amount?: number) => {
    if (!amount) return '';
    return `£${amount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="suggested-action-card">
      <div className="suggested-action-card__header">
        <div className="suggested-action-card__icon">
          {action.icon}
        </div>
        <h3 className="suggested-action-card__title">{action.title}</h3>
      </div>
      
      {action.status && (
        <div 
          className="suggested-action-card__status"
          style={{ backgroundColor: getStatusColor(action.status) }}
        >
          {action.status}
        </div>
      )}
      
      <div className="suggested-action-card__content">
        <p className="suggested-action-card__body">
          {action.body || action.reference}
          {action.amount && (
            <span className="suggested-action-card__amount">
              {' '}for {formatAmount(action.amount)}
            </span>
          )}
        </p>
      </div>
      
      <div className="suggested-action-card__actions">
        {action.cta.map((buttonText, index) => (
          <button
            key={index}
            className={`suggested-action-card__btn ${
              index === 0 
                ? 'suggested-action-card__btn--primary' 
                : 'suggested-action-card__btn--secondary'
            }`}
            onClick={() => onActionClick(action.id, buttonText.toLowerCase().replace(' ', '-'))}
          >
            {buttonText}
          </button>
        ))}
      </div>
    </div>
  );
};

// SuggestedActions Component
export default function SuggestedActions({ onActionClick }: SuggestedActionsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Function to check scrollability
  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  // Effect to check scrollability on mount and scroll
  useEffect(() => {
    checkScrollability();
    const currentRef = scrollContainerRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', checkScrollability);
      // Also check on resize
      window.addEventListener('resize', checkScrollability);
      
      // Clean up event listeners
      return () => {
        currentRef.removeEventListener('scroll', checkScrollability);
        window.removeEventListener('resize', checkScrollability);
      };
    }
  }, []);

  // Scroll left/right by one card width (~325px + margin)
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 325 + 20; // Card width + gap
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleActionClick = (actionId: string, actionType: string) => {
    console.log(`Action: ${actionType} for ${actionId}`);
    onActionClick?.(actionId, actionType);
  };

  return (
    <div className="suggested-actions">
      <div className="suggested-actions__header">
        <div className="suggested-actions__title">
          <SparkleIcon />
          <span>Suggested actions</span>
        </div>
        <div className="suggested-actions__controls">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`suggested-actions__control-btn ${
              canScrollLeft ? '' : 'suggested-actions__control-btn--disabled'
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeftIcon />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`suggested-actions__control-btn ${
              canScrollRight ? '' : 'suggested-actions__control-btn--disabled'
            }`}
            aria-label="Scroll right"
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="suggested-actions__container"
      >
        <div className="suggested-actions__cards">
          {mockSuggestedActions.map((action) => (
            <SuggestedActionCard
              key={action.id}
              action={action}
              onActionClick={handleActionClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 
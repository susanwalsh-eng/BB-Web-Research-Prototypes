'use client';

import { useState } from 'react';

interface PotsProps {
  onNavigate?: (page: string) => void;
}

interface Pot {
  name: string;
  balance: number;
  currency: string;
  icon: string;
  subLabel: string;
}

export default function Pots({ onNavigate }: PotsProps) {
  // Mock pot data
  const pots: Pot[] = [
    {
      name: "Tax Pot",
      balance: 1258.00,
      currency: "GBP",
      icon: "/forest-wines-dashboard/tax-pot.png",
      subLabel: "Balance in GBP"
    },
    {
      name: "Rainday fund",
      balance: 1258.00,
      currency: "GBP",
      icon: "/forest-wines-dashboard/rainy-day-pot.png",
      subLabel: "Balance in GBP"
    },
    {
      name: "Savings",
      balance: 1788.00,
      currency: "GBP",
      icon: "/forest-wines-dashboard/savings-pot.png",
      subLabel: "1 Pot + 1 challenge"
    }
  ];

  // Calculate total balance (all in GBP)
  const calculateTotalBalance = () => {
    const total = pots.reduce((sum, pot) => {
      return sum + pot.balance;
    }, 0);
    return total.toFixed(2);
  };

  const handleViewAll = () => {
    if (onNavigate) {
      onNavigate('pots');
    }
  };

  const handlePotsClick = () => {
    if (onNavigate) {
      onNavigate('pots');
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    const formatter = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return formatter.format(amount);
  };

  return (
    <div className="pots">
      <div className="pots__header">
        <h2 className="pots__title">Pots</h2>
      </div>
      
      <div className="pots__list">
        <PotsSummaryItem
          totalBalance={parseFloat(calculateTotalBalance())}
          potCount={pots.length}
          onClick={handlePotsClick}
        />
      </div>
      
      <div className="pots__footer">
        <button 
          className="view-all-link"
          onClick={handleViewAll}
        >
          View all Pots
          <svg width="24" height="24" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.7563 15.9546L10.8813 11.0796C10.6522 10.8504 10.5376 10.5588 10.5376 10.2046C10.5376 9.85042 10.6522 9.55876 10.8813 9.32959C11.1105 9.10042 11.4022 8.98584 11.7563 8.98584C12.1105 8.98584 12.4022 9.10042 12.6313 9.32959L18.3813 15.0796C18.5063 15.2046 18.5949 15.34 18.647 15.4858C18.6991 15.6317 18.7251 15.7879 18.7251 15.9546C18.7251 16.1213 18.6991 16.2775 18.647 16.4233C18.5949 16.5692 18.5063 16.7046 18.3813 16.8296L12.6313 22.5796C12.4022 22.8088 12.1105 22.9233 11.7563 22.9233C11.4022 22.9233 11.1105 22.8088 10.8813 22.5796C10.6522 22.3504 10.5376 22.0588 10.5376 21.7046C10.5376 21.3504 10.6522 21.0588 10.8813 20.8296L15.7563 15.9546Z" fill="#218FB7"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

interface PotsSummaryItemProps {
  totalBalance: number;
  potCount: number;
  onClick: () => void;
}

function PotsSummaryItem({ totalBalance, potCount, onClick }: PotsSummaryItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const formatCurrency = (amount: number) => {
    const formatter = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return formatter.format(amount);
  };

  const getPotCountText = (count: number) => {
    return "1 Tax Pot • 2 Percentage pots • 2 Savings pots";
  };

  // Pot icons for stacking
  const potIcons = ['/forest-wines-dashboard/tax-pot.png', '/forest-wines-dashboard/rainy-day-pot.png', '/forest-wines-dashboard/savings-pot.png'];

  return (
    <div 
      className="pot-summary-item"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="pot-summary-item__stacked-icons">
        {potIcons.map((icon, index) => (
          <div 
            key={index} 
            className="pot-summary-item__icon-stack"
            style={{ zIndex: potIcons.length - index }}
          >
            <img 
              src={icon} 
              alt={`Pot icon ${index + 1}`}
              width={40}
              height={40}
              style={{
                objectFit: 'contain',
                borderRadius: '8px'
              }}
            />
          </div>
        ))}
      </div>
      
      <div className="pot-summary-item__content">
        <div className="pot-summary-item__name">Tax Pots, Savings & Regular Pots</div>
        <div className="pot-summary-item__sub-label">{getPotCountText(potCount)}</div>
      </div>
      
      <div className="pot-summary-item__balance">
        {formatCurrency(totalBalance)}
      </div>
      
      <div className={`pot-summary-item__chevron ${isHovered ? 'pot-summary-item__chevron--visible' : ''}`}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path 
            d="M6 12L10 8L6 4" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
} 
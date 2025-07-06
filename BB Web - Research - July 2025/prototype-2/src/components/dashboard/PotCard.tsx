'use client';

import { useState } from 'react';

interface PotCardProps {
  name: string;
  balance: number;
  currency: string;
  icon: string;
  onClick?: () => void;
}

const formatCurrency = (amount: number, currency: string) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatter.format(amount);
};

export default function PotCard({ 
  name, 
  balance, 
  currency, 
  icon,
  onClick
}: PotCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="pot-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`${name} pot: ${formatCurrency(balance, currency)}`}
    >
      <div className="pot-card__header">
        <div className="pot-card__icon">
          <img 
            src={icon} 
            alt={`${name} pot icon`}
            width={40}
            height={40}
            style={{
              objectFit: 'contain',
              borderRadius: '8px'
            }}
          />
        </div>
        
        <div className="pot-card__name">
          {name}
        </div>
      </div>
      
      <div className="pot-card__content">
        <div className="pot-card__balance">
          {formatCurrency(balance, currency)}
        </div>
        
        <div className="pot-card__subtext">
          Balance in GBP
        </div>
      </div>
      
      <div className={`pot-card__chevron ${isHovered ? 'pot-card__chevron--visible' : ''}`}>
        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.0293 10.5L7.61685 7.08751C7.45643 6.9271 7.37622 6.72293 7.37622 6.47501C7.37622 6.2271 7.45643 6.02293 7.61685 5.86251C7.77726 5.7021 7.98143 5.62189 8.22935 5.62189C8.47726 5.62189 8.68143 5.7021 8.84185 5.86251L12.8668 9.88751C12.9543 9.97501 13.0163 10.0698 13.0528 10.1719C13.0892 10.274 13.1075 10.3833 13.1075 10.5C13.1075 10.6167 13.0892 10.7261 13.0528 10.8281C13.0163 10.9302 12.9543 11.025 12.8668 11.1125L8.84185 15.1375C8.68143 15.2979 8.47726 15.3781 8.22935 15.3781C7.98143 15.3781 7.77726 15.2979 7.61685 15.1375C7.45643 14.9771 7.37622 14.7729 7.37622 14.525C7.37622 14.2771 7.45643 14.0729 7.61685 13.9125L11.0293 10.5Z" fill="#218FB7"/>
        </svg>
      </div>
    </div>
  );
} 
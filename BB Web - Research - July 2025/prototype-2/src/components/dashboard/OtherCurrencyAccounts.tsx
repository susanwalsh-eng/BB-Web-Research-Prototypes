'use client';

import { useState } from 'react';

interface ForeignAccount {
  accountName: string;
  currency: string;
  balance: number;
  flag: string;
}

interface OtherCurrencyAccountsProps {
  onNavigate?: (page: string) => void;
}

const ChevronIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M9 18L15 12L9 6" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

interface ForeignAccountCardProps {
  account: ForeignAccount;
  onClick?: () => void;
}

const ForeignAccountCard = ({ account, onClick }: ForeignAccountCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatCurrency = (amount: number, currency: string) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return formatter.format(amount);
  };

  return (
    <div 
      className="foreign-account-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <div className="foreign-account-card__content">
        <div className="foreign-account-card__header">
          <span className="foreign-account-card__flag">{account.flag}</span>
          <div className="foreign-account-card__title">{account.accountName}</div>
        </div>
        
        <div className="foreign-account-card__balance">
          {formatCurrency(account.balance, account.currency)}
        </div>
        
        <div className="foreign-account-card__subtext">
          Balance in {account.currency}
        </div>
      </div>
      
      <div className={`foreign-account-card__chevron ${isHovered ? 'foreign-account-card__chevron--visible' : ''}`}>
        <ChevronIcon />
      </div>
    </div>
  );
};

export default function OtherCurrencyAccounts({ onNavigate }: OtherCurrencyAccountsProps) {
  const foreignAccounts: ForeignAccount[] = [
    {
      accountName: "Forest Wines: USD account",
      currency: "USD",
      balance: 1258.00,
      flag: "🇺🇸"
    },
    {
      accountName: "Forest Wines: EU account",
      currency: "EUR",
      balance: 1788.00,
      flag: "🇪🇺"
    }
  ];

  const handleAccountClick = (account: ForeignAccount) => {
    console.log(`Clicked on ${account.accountName}`);
    // Handle navigation to account details
    onNavigate?.(`Account Details/${account.currency}`);
  };

  return (
    <div className="other-currency-accounts">
      <h2 className="other-currency-accounts__title">Other currency accounts</h2>
      <div className="other-currency-accounts__cards">
        {foreignAccounts.map((account, index) => (
          <ForeignAccountCard
            key={index}
            account={account}
            onClick={() => handleAccountClick(account)}
          />
        ))}
      </div>
    </div>
  );
} 
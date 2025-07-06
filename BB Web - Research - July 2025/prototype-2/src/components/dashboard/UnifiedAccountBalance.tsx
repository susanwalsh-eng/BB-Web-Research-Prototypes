'use client';

import AccountBalance from './AccountBalance';
import OtherCurrencyAccounts from './OtherCurrencyAccounts';

interface UnifiedAccountBalanceProps {
  onAccountDetailsClick?: () => void;
  onNavigate?: (page: string) => void;
}

export default function UnifiedAccountBalance({ 
  onAccountDetailsClick, 
  onNavigate 
}: UnifiedAccountBalanceProps) {
  return (
    <div className="unified-account-balance-wrapper">
      <AccountBalance 
        onAccountDetailsClick={onAccountDetailsClick} 
        onNavigate={onNavigate}
      />
      <OtherCurrencyAccounts onNavigate={onNavigate} />
    </div>
  );
} 
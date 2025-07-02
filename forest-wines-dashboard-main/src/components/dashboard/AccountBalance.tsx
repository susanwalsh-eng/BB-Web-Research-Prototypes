'use client';

import { getAccountBalance, formatCurrency } from '@/utils/bankingData';

// Custom Icons
const AccountDetailsIcon = ({ className }: { className?: string }) => (
  <svg width="21" height="21" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M15 6.07959C8.75 6.07959 3.4125 9.96709 1.25 15.4546C3.4125 20.9421 8.75 24.8296 15 24.8296C21.25 24.8296 26.5875 20.9421 28.75 15.4546C26.5875 9.96709 21.25 6.07959 15 6.07959ZM15 21.7046C11.55 21.7046 8.75 18.9046 8.75 15.4546C8.75 12.0046 11.55 9.20459 15 9.20459C18.45 9.20459 21.25 12.0046 21.25 15.4546C21.25 18.9046 18.45 21.7046 15 21.7046ZM15 11.7046C12.925 11.7046 11.25 13.3796 11.25 15.4546C11.25 17.5296 12.925 19.2046 15 19.2046C17.075 19.2046 18.75 17.5296 18.75 15.4546C18.75 13.3796 17.075 11.7046 15 11.7046Z" fill="#218FB7"/>
  </svg>
);

const MoveMoneyIcon = ({ className }: { className?: string }) => (
  <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M7.24089 14.5707C7.72905 14.0826 8.5205 14.0826 9.00866 14.5707C9.45926 15.0213 9.49392 15.7303 9.11265 16.2207L9.00866 16.3385L5.51727 19.8296H16.2497C16.8908 19.8296 17.4191 20.3121 17.4914 20.9338L17.4997 21.0796C17.4997 21.7206 17.0172 22.249 16.3956 22.3212L16.2497 22.3296H5.51727L9.00866 25.8207C9.45926 26.2713 9.49392 26.9803 9.11265 27.4707L9.00866 27.5885C8.55805 28.0391 7.84901 28.0737 7.35865 27.6925L7.24089 27.5885L1.6159 21.9635L1.4952 21.8237L1.40561 21.6847L1.33881 21.5437L1.29459 21.4121L1.26355 21.2652L1.25474 21.1912L1.25 21.0556L1.25474 20.968L1.27507 20.8287L1.31195 20.6895L1.36687 20.5506L1.43227 20.4287L1.51576 20.3087C1.54686 20.269 1.58031 20.2313 1.6159 20.1957L7.24089 14.5707ZM22.7586 3.3207L28.3836 8.9457C28.4279 8.98995 28.4681 9.03668 28.5044 9.08545L28.594 9.22452L28.6607 9.36542L28.705 9.4971L28.736 9.644L28.7447 9.71705L28.7497 9.82959L28.7463 9.92364L28.7245 10.0805L28.6876 10.2198L28.6327 10.3586L28.5672 10.4805L28.4752 10.6114L28.3836 10.7135L22.7586 16.3385C22.2705 16.8266 21.4791 16.8266 20.9909 16.3385C20.5027 15.8503 20.5027 15.0588 20.9909 14.5707L24.481 11.0796H13.7497C13.0595 11.0796 12.4998 10.5199 12.4998 9.82959C12.4998 9.13924 13.0595 8.57959 13.7497 8.57959H24.481L20.9909 5.08848C20.5027 4.60031 20.5027 3.80886 20.9909 3.3207C21.4791 2.83255 22.2705 2.83255 22.7586 3.3207Z" fill="#218FB7"/>
  </svg>
);

interface AccountBalanceProps {
  onAccountDetailsClick?: () => void;
  onNavigate?: (page: string) => void;
}

export default function AccountBalance({ onAccountDetailsClick, onNavigate }: AccountBalanceProps) {
  const balance = getAccountBalance();
  const formattedBalance = formatCurrency(balance);

  return (
    <div className="card balance-card">
      {/* Top section with logo and balance */}
      <div className="balance-header">
        <div className="balance-left">
          <div className="monzo-logo">
            <span className="monzo-logo__text">monzo</span>
            <span className="monzo-logo__sub">BUSINESS</span>
          </div>
          <div className="account-number">
            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.75001 10.038V13.3713C3.75001 14.063 4.30834 14.6213 5.00001 14.6213C5.69168 14.6213 6.25001 14.063 6.25001 13.3713V10.038C6.25001 9.34631 5.69168 8.78798 5.00001 8.78798C4.30834 8.78798 3.75001 9.34631 3.75001 10.038ZM8.75001 10.038V13.3713C8.75001 14.063 9.30834 14.6213 10 14.6213C10.6917 14.6213 11.25 14.063 11.25 13.3713V10.038C11.25 9.34631 10.6917 8.78798 10 8.78798C9.30834 8.78798 8.75001 9.34631 8.75001 10.038ZM3.33334 18.788H16.6667C17.3583 18.788 17.9167 18.2296 17.9167 17.538C17.9167 16.8463 17.3583 16.288 16.6667 16.288H3.33334C2.64168 16.288 2.08334 16.8463 2.08334 17.538C2.08334 18.2296 2.64168 18.788 3.33334 18.788ZM13.75 10.038V13.3713C13.75 14.063 14.3083 14.6213 15 14.6213C15.6917 14.6213 16.25 14.063 16.25 13.3713V10.038C16.25 9.34631 15.6917 8.78798 15 8.78798C14.3083 8.78798 13.75 9.34631 13.75 10.038ZM9.22501 1.69631L2.64168 5.16298C2.30001 5.33798 2.08334 5.69631 2.08334 6.07965C2.08334 6.65465 2.55001 7.12131 3.12501 7.12131H16.8833C17.45 7.12131 17.9167 6.65465 17.9167 6.07965C17.9167 5.69631 17.7 5.33798 17.3583 5.16298L10.775 1.69631C10.2917 1.43798 9.70834 1.43798 9.22501 1.69631V1.69631Z" fill="#112231" fillOpacity="0.75"/>
            </svg>
            04-00-04  •  12345678
          </div>
        </div>
        
        <div className="balance-right">
          <div className="balance-main">
            {formattedBalance}
          </div>
          <div className="balance-currency">Balance in GBP</div>
        </div>
      </div>

      {/* Bottom section with actions */}
      <div className="balance-footer">
        <div className="balance-actions">
          <button className="balance-btn" onClick={onAccountDetailsClick}>
            <AccountDetailsIcon className="balance-btn-icon" />
            Account details
          </button>
          <button className="balance-btn">
            <MoveMoneyIcon className="balance-btn-icon" />
            Move money
          </button>
        </div>
        
        <button 
          onClick={() => onNavigate?.('All Activity')}
          className="view-activity"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0',
            font: 'inherit'
          }}
        >
          View all activity
          <svg width="24" height="24" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.7563 15.9546L10.8813 11.0796C10.6522 10.8504 10.5376 10.5588 10.5376 10.2046C10.5376 9.85042 10.6522 9.55876 10.8813 9.32959C11.1105 9.10042 11.4022 8.98584 11.7563 8.98584C12.1105 8.98584 12.4022 9.10042 12.6313 9.32959L18.3813 15.0796C18.5063 15.2046 18.5949 15.34 18.647 15.4858C18.6991 15.6317 18.7251 15.7879 18.7251 15.9546C18.7251 16.1213 18.6991 16.2775 18.647 16.4233C18.5949 16.5692 18.5063 16.7046 18.3813 16.8296L12.6313 22.5796C12.4022 22.8088 12.1105 22.9233 11.7563 22.9233C11.4022 22.9233 11.1105 22.8088 10.8813 22.5796C10.6522 22.3504 10.5376 22.0588 10.5376 21.7046C10.5376 21.3504 10.6522 21.0588 10.8813 20.8296L15.7563 15.9546Z" fill="#218FB7"/>
          </svg>
        </button>
      </div>
    </div>
  );
} 
'use client';

import { useState } from 'react';


// Custom Icons
const HamburgerIcon = ({ className }: { className?: string }) => (
  <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M4 15.75H18C18.4813 15.75 18.875 15.3563 18.875 14.875C18.875 14.3937 18.4813 14 18 14H4C3.51875 14 3.125 14.3937 3.125 14.875C3.125 15.3563 3.51875 15.75 4 15.75ZM4 11.375H18C18.4813 11.375 18.875 10.9813 18.875 10.5C18.875 10.0187 18.4813 9.625 18 9.625H4C3.51875 9.625 3.125 10.0187 3.125 10.5C3.125 10.9813 3.51875 11.375 4 11.375ZM3.125 6.125C3.125 6.60625 3.51875 7 4 7H18C18.4813 7 18.875 6.60625 18.875 6.125C18.875 5.64375 18.4813 5.25 18 5.25H4C3.51875 5.25 3.125 5.64375 3.125 6.125Z" fill="#112231"/>
  </svg>
);

const HomeIcon = ({ className }: { className?: string }) => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M3.25467 14.067C2.9525 14.067 2.66396 13.9416 2.45813 13.721C2.0803 13.316 2.07238 12.6998 2.41941 12.2862L2.51354 12.1874L11.5178 3.8314C12.3067 3.09927 13.5046 3.05859 14.339 3.70938L14.4823 3.8314L23.4865 12.1874C23.7077 12.3927 23.8333 12.6805 23.8333 12.9818C23.8333 13.5383 23.4134 13.997 22.8722 14.0597L22.7453 14.067H21.7039V21.663C21.7039 22.8617 20.7297 23.8333 19.5279 23.8333H15.72V18.9502C15.72 17.4519 14.5022 16.2373 13 16.2373C11.5579 16.2373 10.3779 17.3566 10.2858 18.7718L10.28 18.9502V23.8333H6.47208C5.27031 23.8333 4.29609 22.8617 4.29609 21.663V14.067H3.25467Z" fill="currentColor"/>
  </svg>
);

const GetPaidIcon = ({ className }: { className?: string }) => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M19.5 2.16666C20.6966 2.16666 21.6667 3.13671 21.6667 4.33332V23.8333L19.5 21.6667L17.3333 23.8333L15.1667 21.6667L13 23.8333L10.8333 21.6667L8.66667 23.8333L6.5 21.6667L4.33333 23.8333V4.33332C4.33333 3.13671 5.30338 2.16666 6.5 2.16666H19.5ZM11.9167 14.0833H7.58333C6.98503 14.0833 6.5 14.5683 6.5 15.1667C6.5 15.7222 6.91821 16.1801 7.45699 16.2427L7.58333 16.25H11.9167C12.515 16.25 13 15.765 13 15.1667C13 14.6111 12.5818 14.1532 12.043 14.0906L11.9167 14.0833ZM18.4167 9.74999H7.58333C6.98503 9.74999 6.5 10.235 6.5 10.8333C6.5 11.3889 6.91821 11.8468 7.45699 11.9094L7.58333 11.9167H18.4167C19.015 11.9167 19.5 11.4316 19.5 10.8333C19.5 10.2777 19.0818 9.81985 18.543 9.75728L18.4167 9.74999ZM18.4167 5.41666H7.58333C6.98503 5.41666 6.5 5.90169 6.5 6.49999C6.5 7.05557 6.91821 7.51346 7.45699 7.57603L7.58333 7.58332H18.4167C19.015 7.58332 19.5 7.09829 19.5 6.49999C19.5 5.94441 19.0818 5.48652 18.543 5.42395L18.4167 5.41666Z" fill="currentColor"/>
  </svg>
);

const PaymentsIcon = ({ className }: { className?: string }) => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M17.5229 14.0833H5.41667C5.10972 14.0833 4.85243 13.9795 4.64479 13.7719C4.43715 13.5642 4.33333 13.3069 4.33333 13C4.33333 12.6931 4.43715 12.4358 4.64479 12.2281C4.85243 12.0205 5.10972 11.9167 5.41667 11.9167H17.5229L12.2146 6.60833C11.9979 6.39166 11.8941 6.13889 11.9031 5.85C11.9122 5.56111 12.025 5.30833 12.2417 5.09166C12.4583 4.89305 12.7111 4.78923 13 4.7802C13.2889 4.77118 13.5417 4.875 13.7583 5.09166L20.9083 12.2417C21.0167 12.35 21.0934 12.4674 21.1385 12.5937C21.1837 12.7201 21.2062 12.8556 21.2062 13C21.2062 13.1444 21.1837 13.2799 21.1385 13.4062C21.0934 13.5326 21.0167 13.65 20.9083 13.7583L13.7583 20.9083C13.5597 21.1069 13.3115 21.2062 13.0135 21.2062C12.7156 21.2062 12.4583 21.1069 12.2417 20.9083C12.025 20.6917 11.9167 20.4344 11.9167 20.1365C11.9167 19.8385 12.025 19.5812 12.2417 19.3646L17.5229 14.0833Z" fill="currentColor"/>
  </svg>
);

const PotsIcon = ({ className }: { className?: string }) => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M20.4347 7.5841C21.8788 9.18997 22.75 11.2697 22.75 13.5417C22.75 18.6273 18.3848 22.75 13 22.75C7.61523 22.75 3.25 18.6273 3.25 13.5417C3.25 11.2697 4.12118 9.18997 5.56526 7.5841H20.4347ZM19.5 3.25C20.0983 3.25 20.5833 3.73503 20.5833 4.33333C20.5833 4.88891 20.1652 5.3468 19.6263 5.40938L19.5 5.41667H6.5C5.9017 5.41667 5.41667 4.93164 5.41667 4.33333C5.41667 3.77776 5.83488 3.31986 6.37366 3.25729L6.5 3.25H19.5Z" fill="currentColor"/>
  </svg>
);

const InsightsIcon = ({ className }: { className?: string }) => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M20.2026 5.46979C20.7103 4.9621 20.7103 4.13899 20.2026 3.63131C19.6949 3.12363 18.8718 3.12363 18.3641 3.63131L14.4487 7.1134L12.956 5.81222C12.1299 5.09214 10.8963 5.10221 10.0821 5.83569L5.8422 9.65529C5.31095 10.1382 5.2718 10.9604 5.75475 11.4917C6.23771 12.0229 7.0599 12.0621 7.59115 11.5791L11.5086 8.01777L13.0666 9.36413C13.8946 10.0796 15.1262 10.0654 15.9374 9.33101L20.2026 5.46979Z" fill="currentColor"/>
    <path d="M18.6875 10.8339C19.4354 10.8339 20.0417 11.4402 20.0417 12.188V21.3964C20.0417 22.1443 19.4354 22.7506 18.6875 22.7506C17.9396 22.7506 17.3333 22.1443 17.3333 21.3964V12.188C17.3333 11.4402 17.9396 10.8339 18.6875 10.8339Z" fill="currentColor"/>
    <path d="M14.3542 14.3005C14.3542 13.5826 13.7479 13.0005 13 13.0005C12.2521 13.0005 11.6458 13.5826 11.6458 14.3005V21.4505C11.6458 22.1685 12.2521 22.7506 13 22.7506C13.7479 22.7506 14.3542 22.1685 14.3542 21.4505V14.3005Z" fill="currentColor"/>
    <path d="M8.66667 16.4781C8.66667 15.7541 8.06039 15.1672 7.3125 15.1672C6.56462 15.1672 5.95833 15.7541 5.95833 16.4781V21.4396C5.95833 22.1636 6.56462 22.7506 7.3125 22.7506C8.06039 22.7506 8.66667 22.1636 8.66667 21.4396V16.4781Z" fill="currentColor"/>
  </svg>
);

const TeamIcon = ({ className }: { className?: string }) => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M17.3333 14.0833C22.0221 14.0833 25.8413 16.8759 25.9951 20.3644L26 20.5833C26 21.78 25.03 22.75 23.8333 22.75L18.9194 22.7514C19.2425 22.1934 19.4447 21.5567 19.4902 20.8771L19.5 20.5833L19.4947 20.3167L19.4762 20.0255C19.2781 17.6506 17.9541 15.6054 15.9681 14.1631C16.4124 14.1107 16.8686 14.0833 17.3333 14.0833ZM8.66667 14.0833C13.3554 14.0833 17.1746 16.8759 17.3285 20.3644L17.3333 20.5833C17.3333 21.78 16.3633 22.75 15.1667 22.75H2.16667C0.970049 22.75 0 21.78 0 20.5833C0 16.9935 3.8802 14.0833 8.66667 14.0833ZM17.3333 3.25C19.7265 3.25 21.6667 5.1901 21.6667 7.58333C21.6667 9.97657 19.7265 11.9167 17.3333 11.9167C16.1794 11.9167 15.1308 11.4656 14.3542 10.7302C14.8723 9.79787 15.1667 8.72497 15.1667 7.58333C15.1667 6.44198 14.8725 5.36934 14.3558 4.43708C15.1308 3.70106 16.1794 3.25 17.3333 3.25ZM8.66667 3.25C11.0599 3.25 13 5.1901 13 7.58333C13 9.97657 11.0599 11.9167 8.66667 11.9167C6.27343 11.9167 4.33333 9.97657 4.33333 7.58333C4.33333 5.1901 6.27343 3.25 8.66667 3.25Z" fill="currentColor"/>
  </svg>
);

const ToggleIcon = ({ className, expanded }: { className?: string, expanded?: boolean }) => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 26 26" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
  >
    <path d="M13 13.6554L17.225 9.43042C17.4236 9.23181 17.6764 9.13251 17.9833 9.13251C18.2903 9.13251 18.5431 9.23181 18.7417 9.43042C18.9403 9.62904 19.0396 9.88181 19.0396 10.1888C19.0396 10.4957 18.9403 10.7485 18.7417 10.9471L13.7583 15.9304C13.65 16.0388 13.5326 16.1155 13.4062 16.1606C13.2799 16.2058 13.1444 16.2283 13 16.2283C12.8556 16.2283 12.7201 16.2058 12.5937 16.1606C12.4674 16.1155 12.35 16.0388 12.2417 15.9304L7.25833 10.9471C7.05972 10.7485 6.96041 10.4957 6.96041 10.1888C6.96041 9.88181 7.05972 9.62903 7.25833 9.43042C7.45694 9.23181 7.70972 9.13251 8.01666 9.13251C8.32361 9.13251 8.57639 9.23181 8.775 9.43042L13 13.6554Z" fill="#112231"/>
  </svg>
);

const navItems = [
  { name: 'Home', icon: HomeIcon },
  { name: 'Get Paid', icon: GetPaidIcon },
  { name: 'Payments', icon: PaymentsIcon },
  { name: 'Pots', icon: PotsIcon },
  { name: 'Insights', icon: InsightsIcon },
  { name: 'Team', icon: TeamIcon },
];

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: (collapsed: boolean) => void;
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

const accounts = [
  { name: 'Jaunty Coffee', initials: 'JC', color: '#9ACD32' },
  { name: 'Yeet - Gifts', initials: 'YG', color: '#98D8C8' },
];

export default function Sidebar({ collapsed = false, onToggle, currentPage = 'Home', onNavigate }: SidebarProps) {
  const [accountsExpanded, setAccountsExpanded] = useState(false);
  
  const handleToggle = () => {
    onToggle?.(!collapsed);
  };

  const toggleAccounts = () => {
    setAccountsExpanded(!accountsExpanded);
  };

  const handleNavClick = (pageName: string) => {
    onNavigate?.(pageName);
  };

  return (
    <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}>
      {/* Header with Logo and Collapse Button */}
      <div className="sidebar-header">
        <button className="collapse-btn-header" onClick={handleToggle}>
          <HamburgerIcon className="nav__icon" />
        </button>
        {!collapsed && (
          <div className="monzo-logo">
            <div className="monzo-logo__text">monzo</div>
            <div className="monzo-logo__sub">BUSINESS</div>
          </div>
        )}
      </div>

      {/* Account Switching */}
      <div className={`account-switching ${collapsed ? 'account-switching--collapsed' : ''}`}>
        {/* Active Account - Always rendered, layout controlled by CSS */}
        <div 
          className={`active-account ${accountsExpanded ? 'active-account--expanded' : ''} ${collapsed ? 'active-account--collapsed' : ''}`} 
          onClick={collapsed ? undefined : toggleAccounts}
          style={{
            background: accountsExpanded ? '#F2F8F3' : 'transparent',
            borderRadius: '12px',
            color: accountsExpanded ? '#218FB7' : '#091723',
            fontWeight: accountsExpanded ? '500' : '400',
            transition: 'all 0.15s ease',
            cursor: collapsed ? 'default' : 'pointer'
          }}
          onMouseEnter={(e) => {
            if (!collapsed && !accountsExpanded) {
              e.currentTarget.style.backgroundColor = 'rgba(117, 129, 126, 0.1)';
              e.currentTarget.style.color = '#218FB7';
            }
          }}
          onMouseLeave={(e) => {
            if (!collapsed && !accountsExpanded) {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#091723';
            }
          }}
        >
          <div className="active-account__content">
            <div className="active-account__avatar">FW</div>
            {!collapsed && (
              <div className="active-account__details">
                <h3>Forest Wines</h3>
                <div className="team-indicator">✦ Team</div>
              </div>
            )}
          </div>
          {!collapsed && (
            <div className="active-account__toggle">
              <ToggleIcon expanded={accountsExpanded} />
            </div>
          )}
        </div>
        
        {/* Other Accounts */}
        {!collapsed && accountsExpanded && (
          <div className="other-accounts">
            {accounts.map((account) => (
              <div 
                key={account.name} 
                className="account-item"
                style={{
                  borderRadius: '12px',
                  transition: 'all 0.15s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(117, 129, 126, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <div className="account-item__avatar" style={{ backgroundColor: account.color }}>
                  {account.initials}
                </div>
                <div className="account-item__name">{account.name}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="nav">
        <ul className="nav__list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            // Treat "All Activity" page as part of "Home" for navigation purposes
            const isActive = currentPage === item.name || (currentPage === 'All Activity' && item.name === 'Home');
            return (
              <li key={item.name} className="nav__item">
                <button
                  onClick={() => handleNavClick(item.name)}
                  className={`nav__link ${isActive ? 'nav__link--active' : ''}`}
                  style={{
                    background: isActive ? '#F2F8F3' : 'transparent',
                    border: 'none',
                    width: '100%',
                    height: '56px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    padding: '0 12px',
                    font: 'inherit',
                    fontSize: '16px',
                    fontWeight: isActive ? '500' : '400',
                    color: isActive ? '#218FB7' : '#091723',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'rgba(117, 129, 126, 0.1)';
                      e.currentTarget.style.color = '#218FB7';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#091723';
                    }
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(117, 129, 126, 0.1)';
                    e.currentTarget.style.color = '#218FB7';
                    e.currentTarget.style.fontWeight = '500';
                    e.currentTarget.style.outline = 'none';
                  }}
                  onBlur={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#091723';
                      e.currentTarget.style.fontWeight = '400';
                    }
                  }}
                  aria-label={`Navigate to ${item.name}`}
                >
                  <Icon className="nav__icon" />
                  {!collapsed && <span>{item.name}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Header Navigation at Bottom */}
      <nav className="header__nav">
        <a href="#help">Help</a>
        <a href="#feedback">Feedback</a>
        <a href="#signout">Sign Out</a>
      </nav>
    </aside>
  );
}
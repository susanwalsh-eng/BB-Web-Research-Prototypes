'use client';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ActionButtons from '@/components/dashboard/ActionButtons';
import AccountBalance from '@/components/dashboard/AccountBalance';
import PaymentRequests from '@/components/dashboard/PaymentRequests';
import ScheduledPayments from '@/components/dashboard/ScheduledPayments';
import RecentActivity from '@/components/dashboard/RecentActivity';
import CashFlow from '@/components/dashboard/CashFlow';

interface Payment {
  id: string;
  payee: string;
  invoice: string;
  date: string;
  type: string;
  amount: string;
  avatar: string;
  avatarBg: string;
}

interface Transaction {
  id: string;
  name: string;
  description: string;
  amount: string;
  date: string;
  type: 'income' | 'expense';
  avatar: string;
  avatarBg: string;
}

interface HomeProps {
  onAccountDetailsClick: () => void;
  onStarClick: () => void;
  selectedPaymentId?: string;
  selectedTransactionId?: string;
  onPaymentRowClick: (payment: Payment) => void;
  onTransactionRowClick: (transaction: Transaction) => void;
  onMenuStateChange: (open: boolean) => void;
  onNavigate?: (page: string) => void;
  rightSidebarVisible?: boolean;
  contextualContent?: React.ReactNode;
  visibleCardCount?: number;
}

export default function Home({
  onAccountDetailsClick,
  onStarClick,
  selectedPaymentId,
  selectedTransactionId,
  onPaymentRowClick,
  onTransactionRowClick,
  onMenuStateChange,
  onNavigate,
  rightSidebarVisible,
  contextualContent,
  visibleCardCount
}: HomeProps) {
  return (
    <div className="main-layout">
      {/* Header Block: Title + Sign-in + Action Buttons */}
      <div className="dashboard-header-block">
        <div className={`dashboard-header-block__inner ${!rightSidebarVisible ? 'dashboard-header-block__inner--full-width' : ''}`}>
          <DashboardHeader />
          <ActionButtons />
        </div>
      </div>
      
      <div className={`main-layout-content ${!rightSidebarVisible ? 'main-layout-content--full-width' : ''}`}>
        <div className="left-column">
          <AccountBalance 
            onAccountDetailsClick={onAccountDetailsClick} 
            onNavigate={onNavigate}
          />
          
          <div className="dashboard-grid" style={{ paddingBottom: '100px' }}>
            <div className="dashboard-col-full">
              <PaymentRequests onStarClick={onStarClick} onNavigate={onNavigate} visibleCardCount={visibleCardCount} />
            </div>
            
            <div className="dashboard-col-full">
              <ScheduledPayments 
                onRowClick={onPaymentRowClick}
                selectedRowId={selectedPaymentId}
                onMenuStateChange={onMenuStateChange}
                onNavigate={onNavigate}
              />
            </div>
            
            <div className="dashboard-col-full">
              <CashFlow />
            </div>
            
            <div className="dashboard-col-full">
              <RecentActivity 
                onRowClick={onTransactionRowClick}
                selectedRowId={selectedTransactionId}
                onMenuStateChange={onMenuStateChange}
                onNavigate={onNavigate}
              />
            </div>
          </div>
        </div>
        
        {rightSidebarVisible && (
          <div className="right-column">
            {contextualContent}
          </div>
        )}
      </div>
    </div>
  );
} 
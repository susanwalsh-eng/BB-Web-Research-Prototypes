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
  selectedPaymentId?: string;
  selectedTransactionId?: string;
  onPaymentRowClick: (payment: Payment) => void;
  onTransactionRowClick: (transaction: Transaction) => void;
  onMenuStateChange: (open: boolean) => void;
  onNavigate?: (page: string) => void;
  suggestedActionsContent?: React.ReactNode;
}

export default function Home({
  onAccountDetailsClick,
  selectedPaymentId,
  selectedTransactionId,
  onPaymentRowClick,
  onTransactionRowClick,
  onMenuStateChange,
  onNavigate,
  suggestedActionsContent
}: HomeProps) {
  return (
    <div className="main-layout">
      {/* Header Block: Title + Sign-in + Action Buttons */}
      <div className="dashboard-header-block">
        <div className="dashboard-header-block__inner dashboard-header-block__inner--full-width">
          <DashboardHeader />
          <ActionButtons />
        </div>
      </div>
      
      <div className="main-layout-content main-layout-content--full-width">
        <div className="left-column">
          <AccountBalance 
            onAccountDetailsClick={onAccountDetailsClick} 
            onNavigate={onNavigate}
          />
          
          {/* Suggested Actions Section */}
          {suggestedActionsContent && (
            <div className="dashboard-col-full">
              {suggestedActionsContent}
            </div>
          )}
          
          <div className="dashboard-grid" style={{ paddingBottom: '100px' }}>
            <div className="dashboard-col-full">
              <PaymentRequests onNavigate={onNavigate} />
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
      </div>
    </div>
  );
} 
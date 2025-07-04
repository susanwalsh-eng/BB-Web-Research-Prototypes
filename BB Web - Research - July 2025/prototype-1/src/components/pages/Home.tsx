'use client';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ActionButtons from '@/components/dashboard/ActionButtons';
import AccountBalance from '@/components/dashboard/AccountBalance';
import PaymentRequests from '@/components/dashboard/PaymentRequests';
import ScheduledPayments from '@/components/dashboard/ScheduledPayments';
import RecentActivity from '@/components/dashboard/RecentActivity';
import CashFlow from '@/components/dashboard/CashFlow';
import Pots from '@/components/dashboard/Pots';
import ExploreMonzoBusinessPro from '@/components/ui/ExploreMonzoBusinessPro';

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
  onPaymentRequestsStarClick: () => void;
  onScheduledPaymentsStarClick: () => void;
  selectedPaymentId?: string;
  selectedTransactionId?: string;
  onPaymentRowClick: (payment: Payment) => void;
  onTransactionRowClick: (transaction: Transaction) => void;
  onMenuStateChange: (open: boolean) => void;
  onNavigate?: (page: string) => void;
  rightSidebarVisible?: boolean;
  contextualContent?: React.ReactNode;
  paymentRequestsVisibleCardCount?: number;
  scheduledPaymentsVisibleCardCount?: number;
  paymentRequestsDisabled?: boolean;
  scheduledPaymentsDisabled?: boolean;
  paymentRequestsActive?: boolean;
  scheduledPaymentsActive?: boolean;
}

export default function Home({
  onAccountDetailsClick,
  onPaymentRequestsStarClick,
  onScheduledPaymentsStarClick,
  selectedPaymentId,
  selectedTransactionId,
  onPaymentRowClick,
  onTransactionRowClick,
  onMenuStateChange,
  onNavigate,
  rightSidebarVisible,
  contextualContent,
  paymentRequestsVisibleCardCount,
  scheduledPaymentsVisibleCardCount,
  paymentRequestsDisabled,
  scheduledPaymentsDisabled,
  paymentRequestsActive,
  scheduledPaymentsActive
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
                                      <PaymentRequests 
              onStarClick={onPaymentRequestsStarClick}
              onNavigate={onNavigate}
              visibleCardCount={paymentRequestsVisibleCardCount}
              isDisabled={paymentRequestsDisabled}
              isActive={paymentRequestsActive}
            />
            </div>
            
            <div className="dashboard-col-full">
            <ScheduledPayments 
              onRowClick={onPaymentRowClick}
              selectedRowId={selectedPaymentId}
              onMenuStateChange={onMenuStateChange}
              onNavigate={onNavigate}
              onStarClick={onScheduledPaymentsStarClick}
              visibleCardCount={scheduledPaymentsVisibleCardCount}
              isDisabled={scheduledPaymentsDisabled}
              isActive={scheduledPaymentsActive}
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
            
            <div className="dashboard-col-full">
              <Pots onNavigate={onNavigate} />
            </div>
            
            <div className="dashboard-col-full">
              <ExploreMonzoBusinessPro 
                onActionClick={(cardId: string, actionType: string) => {
                  console.log(`Explore action: ${actionType} for ${cardId}`);
                  // Handle different explore actions
                  switch (actionType) {
                    case 'create-a-quote':
                      console.log('Create a quote action');
                      break;
                    case 'create-a-tax-pot':
                      console.log('Create a tax pot action');
                      break;
                    case 'make-a-deposit':
                      console.log('Make a deposit action');
                      break;
                    case 'explore-team-plan':
                      console.log('Explore team plan action');
                      break;
                    case 'dismiss':
                      console.log('Dismiss action');
                      break;
                    default:
                      console.log('Unknown explore action type:', actionType);
                  }
                }}
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
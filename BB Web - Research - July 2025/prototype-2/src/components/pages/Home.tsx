'use client';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ActionButtons from '@/components/dashboard/ActionButtons';
import UnifiedAccountBalance from '@/components/dashboard/UnifiedAccountBalance';
import Pots from '@/components/dashboard/Pots';
import PaymentRequests from '@/components/dashboard/PaymentRequests';
import ScheduledPayments from '@/components/dashboard/ScheduledPayments';
import RecentActivity from '@/components/dashboard/RecentActivity';
import CashFlow from '@/components/dashboard/CashFlow';
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
  selectedPaymentId?: string;
  selectedTransactionId?: string;
  onPaymentRowClick: (payment: Payment) => void;
  onTransactionRowClick: (transaction: Transaction) => void;
  onMenuStateChange: (open: boolean) => void;
  onNavigate?: (page: string) => void;
  tasksContent?: React.ReactNode;
}

export default function Home({
  onAccountDetailsClick,
  selectedPaymentId,
  selectedTransactionId,
  onPaymentRowClick,
  onTransactionRowClick,
  onMenuStateChange,
  onNavigate,
  tasksContent
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
          <UnifiedAccountBalance 
            onAccountDetailsClick={onAccountDetailsClick} 
            onNavigate={onNavigate}
          />
          
          {/* Tasks Section */}
          {tasksContent && (
            <div className="dashboard-col-full">
              {tasksContent}
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
      </div>
    </div>
  );
} 
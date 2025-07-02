'use client';

import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Home from '@/components/pages/Home';
import AllActivity from '@/components/pages/AllActivity';
import GetPaid from '@/components/pages/GetPaid';
import Payments from '@/components/pages/Payments';
import Pots from '@/components/pages/Pots';
import Insights from '@/components/pages/Insights';
import Team from '@/components/pages/Team';
import AccountDetailsModal from '@/components/modals/AccountDetailsModal';
import SidePanel from '@/components/ui/SidePanel';
import ContextualCardStack from '@/components/ui/ContextualCardStack';

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

export default function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [rightSidebarVisible, setRightSidebarVisible] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | undefined>();
  const [selectedTransactionId, setSelectedTransactionId] = useState<string | undefined>();
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [sidePanelData, setSidePanelData] = useState<{
    title: string;
    content: Payment | Transaction;
    type: 'payment' | 'transaction';
  } | null>(null);
  const [sidePanelPosition, setSidePanelPosition] = useState<number>(0);
  const [contextualMenusOpen, setContextualMenusOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('Home');
  const [visibleCardCount, setVisibleCardCount] = useState(3);

  const handleStarButtonClick = () => {
    const newRightSidebarVisible = !rightSidebarVisible;
    setRightSidebarVisible(newRightSidebarVisible);
    
    // When opening the right sidebar, collapse the left sidebar for more space
    if (newRightSidebarVisible) {
      setSidebarCollapsed(true);
    } else {
      // When closing the right sidebar, open the left sidebar back up
      setSidebarCollapsed(false);
    }
  };

  const handlePaymentRowClick = (payment: Payment, rowElement?: HTMLElement | null) => {
    if (contextualMenusOpen) {
      setContextualMenusOpen(false);
      setTimeout(() => {
        openPaymentPanel(payment, rowElement);
      }, 150);
    } else {
      openPaymentPanel(payment, rowElement);
    }
  };

  const openPaymentPanel = (payment: Payment, rowElement?: HTMLElement | null) => {
    if (rowElement) {
      const rect = rowElement.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setSidePanelPosition(rect.top + scrollTop - 100); // Offset by 100px for better alignment
    }
    
    setSelectedPaymentId(payment.id);
    setSidePanelData({
      title: `Payment to ${payment.payee}`,
      content: payment,
      type: 'payment'
    });
    setSidePanelOpen(true);
  };

  const handleTransactionRowClick = (transaction: Transaction, rowElement?: HTMLElement | null) => {
    if (contextualMenusOpen) {
      setContextualMenusOpen(false);
      setTimeout(() => {
        openTransactionPanel(transaction, rowElement);
      }, 150);
    } else {
      openTransactionPanel(transaction, rowElement);
    }
  };

  const openTransactionPanel = (transaction: Transaction, rowElement?: HTMLElement | null) => {
    if (rowElement) {
      const rect = rowElement.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setSidePanelPosition(rect.top + scrollTop - 100); // Offset by 100px for better alignment
    }
    
    setSelectedTransactionId(transaction.id);
    setSidePanelData({
      title: transaction.name,
      content: transaction,
      type: 'transaction'
    });
    setSidePanelOpen(true);
  };

  const handleSidePanelClose = () => {
    setSidePanelOpen(false);
    setSelectedPaymentId(undefined);
    setSelectedTransactionId(undefined);
    setSidePanelData(null);
    setSidePanelPosition(0);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    // Close any open panels when navigating
    setSidePanelOpen(false);
    setSelectedPaymentId(undefined);
    setSelectedTransactionId(undefined);
    setSidePanelData(null);
    setSidePanelPosition(0);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'All Activity':
        return (
          <AllActivity
            onRowClick={handleTransactionRowClick}
            selectedRowId={selectedTransactionId}
            onMenuStateChange={setContextualMenusOpen}
            onNavigate={handleNavigate}
          />
        );
      case 'Payments':
        return <Payments />;
      case 'Get Paid':
        return <GetPaid />;
      case 'Pots':
        return <Pots />;
      case 'Insights':
        return <Insights />;
      case 'Team':
        return <Team />;
      default:
        return (
          <Home
            onAccountDetailsClick={() => setAccountModalOpen(true)}
            onStarClick={handleStarButtonClick}
            selectedPaymentId={selectedPaymentId}
            selectedTransactionId={selectedTransactionId}
            onPaymentRowClick={handlePaymentRowClick}
            onTransactionRowClick={handleTransactionRowClick}
            onMenuStateChange={setContextualMenusOpen}
            onNavigate={handleNavigate}
            rightSidebarVisible={rightSidebarVisible}
            visibleCardCount={visibleCardCount}
            contextualContent={
              <div className="right-sidebar">
                <div className="right-sidebar__content">
                  <ContextualCardStack
                    cards={[
                      {
                        id: 'overdue-invoices',
                        type: 'warning',
                        icon: '😬',
                        title: '5 invoices are overdue',
                        description: 'Send a reminder to your customers to pay their invoices to sure up your cashflow for June.',
                        action: {
                          text: 'Send reminders',
                          onClick: () => console.log('Send reminders clicked')
                        },
                        isExpanded: true
                      },
                      {
                        id: 'invoice-1496',
                        type: 'urgent',
                        icon: '🟠',
                        title: 'Invoice #1496 overdue by 14 days',
                        description: 'This invoice is still awaiting payment from Chase Shop International and needs immediate attention.',
                        action: {
                          text: 'Send reminder',
                          onClick: () => console.log('Send reminder for invoice #1496')
                        },
                        isExpanded: false
                      },
                      {
                        id: 'finish-drafts',
                        type: 'feature',
                        icon: '✏️',
                        title: 'Finish your drafts',
                        description: '5 invoices are still in draft status and need to be finished for you to be able to send them to customers.',
                        action: {
                          text: 'Continue drafts',
                          onClick: () => console.log('Continue drafts clicked')
                        },
                        isExpanded: false
                      }
                    ]}
                    onCardClose={(cardId) => {
                      console.log(`Card ${cardId} closed`);
                      setVisibleCardCount(prev => Math.max(0, prev - 1));
                    }}
                  />
                </div>
              </div>
            }
          />
        );
    }
  };

  const renderSidePanelContent = () => {
    if (!sidePanelData) return null;

    const { content, type } = sidePanelData;

    if (type === 'payment') {
      const payment = content as Payment;
      return (
        <div className="side-panel-payment">
          <div className="side-panel-section">
            <h3>Payment Details</h3>
            <div className="detail-row">
              <span>Payee:</span>
              <span>{payment.payee}</span>
            </div>
            <div className="detail-row">
              <span>Invoice:</span>
              <span>{payment.invoice}</span>
            </div>
            <div className="detail-row">
              <span>Amount:</span>
              <span>{payment.amount}</span>
            </div>
            <div className="detail-row">
              <span>Due Date:</span>
              <span>{payment.date}</span>
            </div>
            <div className="detail-row">
              <span>Type:</span>
              <span>{payment.type}</span>
            </div>
          </div>
          
          <div className="side-panel-section">
            <h3>Actions</h3>
            <div className="action-buttons-panel">
              <button className="button-ui button-ui--primary">Edit Payment</button>
              <button className="button-ui button-ui--secondary">Duplicate</button>
              <button className="button-ui button-ui--tertiary">Delete</button>
            </div>
          </div>
        </div>
      );
    }

    if (type === 'transaction') {
      const transaction = content as Transaction;
      return (
        <div className="side-panel-transaction">
          <div className="side-panel-section">
            <h3>Transaction Details</h3>
            <div className="detail-row">
              <span>Description:</span>
              <span>{transaction.description}</span>
            </div>
            <div className="detail-row">
              <span>Amount:</span>
              <span className={transaction.type === 'income' ? 'amount-positive' : ''}>{transaction.amount}</span>
            </div>
            <div className="detail-row">
              <span>Date:</span>
              <span>{transaction.date}</span>
            </div>
            <div className="detail-row">
              <span>Type:</span>
              <span className="capitalize">{transaction.type}</span>
            </div>
          </div>
          
          <div className="side-panel-section">
            <h3>Actions</h3>
            <div className="action-buttons-panel">
              <button className="button-ui button-ui--primary">Add Receipt</button>
              <button className="button-ui button-ui--secondary">Categorize</button>
              <button className="button-ui button-ui--tertiary">Add Note</button>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="dashboard-container">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={setSidebarCollapsed}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />
      
      <div className="main-content">
        <div className={`content-layout ${currentPage === 'All Activity' ? 'content-layout--full-width' : !rightSidebarVisible ? 'content-layout--full-width' : ''} ${sidePanelOpen ? 'content-layout--with-side-panel' : ''} ${rightSidebarVisible ? 'content-layout--with-right-sidebar' : ''}`}>
          {renderCurrentPage()}
          
          <SidePanel
            isOpen={sidePanelOpen}
            onClose={handleSidePanelClose}
            title={sidePanelData?.type === 'payment' ? 'Scheduled Payment' : 'Transaction Details'}
            isIntegrated={true}
            avatar={sidePanelData?.type === 'payment' ? (sidePanelData.content as Payment).payee.substring(0, 2).toUpperCase() : (sidePanelData?.content as Transaction)?.name.substring(0, 2).toUpperCase() || 'CT'}
            companyName={sidePanelData?.type === 'payment' ? (sidePanelData.content as Payment).payee : (sidePanelData?.content as Transaction)?.name || "Crisps 'n Ting"}
            amount={sidePanelData?.type === 'payment' ? (sidePanelData.content as Payment).amount : (sidePanelData?.content as Transaction)?.amount || "£2,185.00"}
            nextPaymentLabel={sidePanelData?.type === 'payment' ? 'Next payment' : 'Transaction date'}
            nextPaymentDate={sidePanelData?.type === 'payment' ? 'Tuesday, 25 June, 04:05' : (sidePanelData?.content as Transaction)?.date || 'Tuesday, 25 June, 04:05'}
            details={sidePanelData?.type === 'payment' ? [
              { label: 'Reference', value: 'Monthly payment details' },
              { label: 'Payment info', value: '1234567 •12-34-56', copyable: true },
              { label: 'Scheduled for', value: 'Tuesday, 25 Jun 2025' },
              { label: 'Repeats', value: 'Every 4 weeks on Wednesdays' },
              { label: 'Stops', value: 'Sunday, 10 Nov 2025' }
            ] : [
              { label: 'Reference', value: (sidePanelData?.content as Transaction)?.description || 'Transaction details' },
              { label: 'Type', value: (sidePanelData?.content as Transaction)?.type || 'expense' },
              { label: 'Date', value: (sidePanelData?.content as Transaction)?.date || 'Today' }
            ]}
          />
        </div>
      </div>
      
      {/* Account Details Modal */}
              <AccountDetailsModal
          isOpen={accountModalOpen}
          onClose={() => {
            setAccountModalOpen(false);
            setSidebarCollapsed(false); // Open the sidebar when modal closes
          }}
        />
    </div>
  );
} 
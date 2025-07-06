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

interface Invoice {
  id: string;
  payee: string;
  reference: string;
  dueDate: string;
  status: 'paid' | 'overdue' | 'due' | 'draft';
  amount: number;
  avatar: string;
  avatarBg: string;
  description: string;
  category: string;
  paymentType: string;
}

interface ScheduledPayment {
  id: string;
  payee: string;
  reference: string;
  nextPayment: string;
  type: 'Bulk payments' | 'Standing Order';
  amount: number;
  avatar: string;
  avatarBg: string;
  description: string;
  category: string;
}

export default function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [paymentRequestsRightSidebarVisible, setPaymentRequestsRightSidebarVisible] = useState(false);
  const [scheduledPaymentsRightSidebarVisible, setScheduledPaymentsRightSidebarVisible] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | undefined>();
  const [selectedTransactionId, setSelectedTransactionId] = useState<string | undefined>();
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | undefined>();
  const [selectedScheduledPaymentId, setSelectedScheduledPaymentId] = useState<string | undefined>();
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [sidePanelData, setSidePanelData] = useState<{
    title: string;
    content: Payment | Transaction | Invoice | ScheduledPayment;
    type: 'payment' | 'transaction' | 'invoice' | 'scheduled-payment';
  } | null>(null);
  const [sidePanelPosition, setSidePanelPosition] = useState<number>(0);
  const [contextualMenusOpen, setContextualMenusOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('Home');
  const [pageParams, setPageParams] = useState<string>('');
  const [paymentRequestsVisibleCardCount, setPaymentRequestsVisibleCardCount] = useState(3);
  const [scheduledPaymentsVisibleCardCount, setScheduledPaymentsVisibleCardCount] = useState(2);

  const handlePaymentRequestsStarButtonClick = () => {
    const newRightSidebarVisible = !paymentRequestsRightSidebarVisible;
    setPaymentRequestsRightSidebarVisible(newRightSidebarVisible);
    
    // Close the other contextual stack if it's open
    if (newRightSidebarVisible && scheduledPaymentsRightSidebarVisible) {
      setScheduledPaymentsRightSidebarVisible(false);
    }
    
    // When opening the right sidebar, collapse the left sidebar for more space
    if (newRightSidebarVisible) {
      setSidebarCollapsed(true);
    } else {
      // When closing the right sidebar, open the left sidebar back up only if no other sidebar is visible
      if (!scheduledPaymentsRightSidebarVisible) {
        setSidebarCollapsed(false);
      }
    }
  };

  const handleScheduledPaymentsStarButtonClick = () => {
    const newRightSidebarVisible = !scheduledPaymentsRightSidebarVisible;
    setScheduledPaymentsRightSidebarVisible(newRightSidebarVisible);
    
    // Close the other contextual stack if it's open
    if (newRightSidebarVisible && paymentRequestsRightSidebarVisible) {
      setPaymentRequestsRightSidebarVisible(false);
    }
    
    // When opening the right sidebar, collapse the left sidebar for more space
    if (newRightSidebarVisible) {
      setSidebarCollapsed(true);
    } else {
      // When closing the right sidebar, open the left sidebar back up only if no other sidebar is visible
      if (!paymentRequestsRightSidebarVisible) {
      setSidebarCollapsed(false);
      }
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

  const handleInvoiceRowClick = (invoice: Invoice, rowElement?: HTMLElement | null) => {
    if (contextualMenusOpen) {
      setContextualMenusOpen(false);
      setTimeout(() => {
        openInvoicePanel(invoice, rowElement);
      }, 150);
    } else {
      openInvoicePanel(invoice, rowElement);
    }
  };

  const openInvoicePanel = (invoice: Invoice, rowElement?: HTMLElement | null) => {
    if (rowElement) {
      const rect = rowElement.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setSidePanelPosition(rect.top + scrollTop - 100); // Offset by 100px for better alignment
    }
    
    setSelectedInvoiceId(invoice.id);
    setSidePanelData({
      title: `Invoice ${invoice.reference}`,
      content: invoice,
      type: 'invoice'
    });
    setSidePanelOpen(true);
  };

  const handleScheduledPaymentRowClick = (scheduledPayment: ScheduledPayment, rowElement?: HTMLElement | null) => {
    if (contextualMenusOpen) {
      setContextualMenusOpen(false);
      setTimeout(() => {
        openScheduledPaymentPanel(scheduledPayment, rowElement);
      }, 150);
    } else {
      openScheduledPaymentPanel(scheduledPayment, rowElement);
    }
  };

  const openScheduledPaymentPanel = (scheduledPayment: ScheduledPayment, rowElement?: HTMLElement | null) => {
    if (rowElement) {
      const rect = rowElement.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setSidePanelPosition(rect.top + scrollTop - 100); // Offset by 100px for better alignment
    }
    
    setSelectedScheduledPaymentId(scheduledPayment.id);
    setSidePanelData({
      title: `Scheduled Payment to ${scheduledPayment.payee}`,
      content: scheduledPayment,
      type: 'scheduled-payment'
    });
    setSidePanelOpen(true);
  };

  const handleSidePanelClose = () => {
    setSidePanelOpen(false);
    setSelectedPaymentId(undefined);
    setSelectedTransactionId(undefined);
    setSelectedInvoiceId(undefined);
    setSelectedScheduledPaymentId(undefined);
    setSidePanelData(null);
    setSidePanelPosition(0);
  };

  const handleNavigate = (page: string) => {
    // Parse page and query parameters
    const [pageName, queryString] = page.split('?');
    setCurrentPage(pageName);
    setPageParams(queryString || '');
    
    // Close any open panels when navigating
    setSidePanelOpen(false);
    setSelectedPaymentId(undefined);
    setSelectedTransactionId(undefined);
    setSelectedInvoiceId(undefined);
    setSelectedScheduledPaymentId(undefined);
    setSidePanelData(null);
    setSidePanelPosition(0);
    
    // Scroll to top when navigating to a new page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'Activity':
        // Parse URL params to determine if back button should be shown
        const activityParams = new URLSearchParams(pageParams);
        const showBackButton = activityParams.get('from') !== null;
        return (
          <AllActivity
            onRowClick={handleTransactionRowClick}
            selectedRowId={selectedTransactionId}
            onMenuStateChange={setContextualMenusOpen}
            onNavigate={handleNavigate}
            showBackButton={showBackButton}
          />
        );
      case 'Payments':
        return (
          <Payments
            onRowClick={handleScheduledPaymentRowClick}
            selectedRowId={selectedScheduledPaymentId}
            onNavigate={handleNavigate}
          />
        );
      case 'Get Paid':
        // Parse initial filter from page params
        const getPaidParams = new URLSearchParams(pageParams);
        const initialFilter = getPaidParams.get('status') || 'All';
        return (
          <GetPaid
            onRowClick={handleInvoiceRowClick}
            selectedRowId={selectedInvoiceId}
            onNavigate={handleNavigate}
            initialFilter={initialFilter}
          />
        );
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
            onPaymentRequestsStarClick={handlePaymentRequestsStarButtonClick}
            onScheduledPaymentsStarClick={handleScheduledPaymentsStarButtonClick}
            selectedPaymentId={selectedPaymentId}
            selectedTransactionId={selectedTransactionId}
            onPaymentRowClick={handlePaymentRowClick}
            onTransactionRowClick={handleTransactionRowClick}
            onMenuStateChange={setContextualMenusOpen}
            onNavigate={handleNavigate}
            rightSidebarVisible={paymentRequestsRightSidebarVisible || scheduledPaymentsRightSidebarVisible}
            paymentRequestsVisibleCardCount={paymentRequestsVisibleCardCount}
            scheduledPaymentsVisibleCardCount={scheduledPaymentsVisibleCardCount}
            paymentRequestsDisabled={paymentRequestsVisibleCardCount === 0}
            scheduledPaymentsDisabled={scheduledPaymentsVisibleCardCount === 0}
            paymentRequestsActive={paymentRequestsRightSidebarVisible}
            scheduledPaymentsActive={scheduledPaymentsRightSidebarVisible}
            contextualContent={
              <div className="right-sidebar">
                {paymentRequestsRightSidebarVisible && (
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
                        const newCount = Math.max(0, paymentRequestsVisibleCardCount - 1);
                        setPaymentRequestsVisibleCardCount(newCount);
                        if (newCount === 0) {
                          setPaymentRequestsRightSidebarVisible(false);
                          if (!scheduledPaymentsRightSidebarVisible) {
                            setSidebarCollapsed(false);
                          }
                        }
                      }}
                    />
                  </div>
                )}
                {scheduledPaymentsRightSidebarVisible && (
                  <div className="right-sidebar__content right-sidebar__content--scheduled-payments">
                    <ContextualCardStack
                      cards={[
                        {
                          id: 'bulk-payment-setup',
                          type: 'info',
                          icon: '💳',
                          title: 'Set up bulk payment for June payroll',
                          description: 'Your June payroll is scheduled but needs final approval. Review and approve the bulk payment to ensure employees are paid on time.',
                          action: {
                            text: 'Review payroll',
                            onClick: () => console.log('Review payroll clicked')
                          },
                          isExpanded: true
                        },
                        {
                          id: 'payment-reminder',
                          type: 'warning',
                          icon: '⏰',
                          title: 'Payment to Cheese shop due tomorrow',
                          description: 'Standing order payment of £285.00 is scheduled for tomorrow. Ensure sufficient balance is available.',
                          action: {
                            text: 'Check balance',
                            onClick: () => console.log('Check balance clicked')
                          },
                          isExpanded: false
                        }
                      ]}
                      onCardClose={(cardId) => {
                        console.log(`Scheduled payment card ${cardId} closed`);
                        const newCount = Math.max(0, scheduledPaymentsVisibleCardCount - 1);
                        setScheduledPaymentsVisibleCardCount(newCount);
                        if (newCount === 0) {
                          setScheduledPaymentsRightSidebarVisible(false);
                          if (!paymentRequestsRightSidebarVisible) {
                            setSidebarCollapsed(false);
                          }
                        }
                    }}
                  />
                </div>
                )}
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

    if (type === 'invoice') {
      const invoice = content as Invoice;
      return (
        <div className="side-panel-invoice">
          <div className="side-panel-section">
            <h3>Invoice Details</h3>
            <div className="detail-row">
              <span>Payee:</span>
              <span>{invoice.payee}</span>
            </div>
            <div className="detail-row">
              <span>Reference:</span>
              <span>{invoice.reference}</span>
            </div>
            <div className="detail-row">
              <span>Amount:</span>
              <span className="amount-positive">£{invoice.amount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="detail-row">
              <span>Due Date:</span>
              <span>{invoice.dueDate}</span>
            </div>
            <div className="detail-row">
              <span>Status:</span>
              <span className="capitalize">{invoice.status}</span>
            </div>
            <div className="detail-row">
              <span>Category:</span>
              <span>{invoice.category}</span>
            </div>
          </div>
          
          <div className="side-panel-section">
            <h3>Actions</h3>
            <div className="action-buttons-panel">
              <button className="button-ui button-ui--primary">Send Reminder</button>
              <button className="button-ui button-ui--secondary">Edit Invoice</button>
              <button className="button-ui button-ui--tertiary">Download PDF</button>
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
        <div className={`main-layout ${sidePanelOpen ? 'has-side-panel' : ''}`}>
          <div className={`main-layout-content ${currentPage === 'Activity' ? 'main-layout-content--full-width' : ''}`}>
            <div className="left-column">
              {renderCurrentPage()}
            </div>
          </div>
        </div>
        
        {sidePanelOpen && (
          <div className="content-side-panel">
            <SidePanel
              isOpen={sidePanelOpen}
              onClose={handleSidePanelClose}
              title={
                sidePanelData?.type === 'payment' ? 'Scheduled Payment' : 
                sidePanelData?.type === 'invoice' ? 'Invoice Details' : 
                sidePanelData?.type === 'scheduled-payment' ? 'Scheduled Payment' :
                'Transaction Details'
              }
              isIntegrated={true}
              avatar={
                sidePanelData?.type === 'payment' ? (sidePanelData.content as Payment).payee.substring(0, 2).toUpperCase() :
                sidePanelData?.type === 'invoice' ? (sidePanelData.content as Invoice).payee.substring(0, 2).toUpperCase() :
                sidePanelData?.type === 'scheduled-payment' ? (sidePanelData.content as ScheduledPayment).payee.substring(0, 2).toUpperCase() :
                (sidePanelData?.content as Transaction)?.name.substring(0, 2).toUpperCase() || 'CT'
              }
              companyName={
                sidePanelData?.type === 'payment' ? (sidePanelData.content as Payment).payee :
                sidePanelData?.type === 'invoice' ? (sidePanelData.content as Invoice).payee :
                sidePanelData?.type === 'scheduled-payment' ? (sidePanelData.content as ScheduledPayment).payee :
                (sidePanelData?.content as Transaction)?.name || "Crisps 'n Ting"
              }
              amount={
                sidePanelData?.type === 'payment' ? (sidePanelData.content as Payment).amount :
                sidePanelData?.type === 'invoice' ? `£${(sidePanelData.content as Invoice).amount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` :
                sidePanelData?.type === 'scheduled-payment' ? `£${(sidePanelData.content as ScheduledPayment).amount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` :
                (sidePanelData?.content as Transaction)?.amount || "£2,185.00"
              }
              nextPaymentLabel={
                sidePanelData?.type === 'payment' ? 'Next payment' :
                sidePanelData?.type === 'invoice' ? 'Due date' :
                sidePanelData?.type === 'scheduled-payment' ? 'Next payment' :
                'Transaction date'
              }
              nextPaymentDate={
                sidePanelData?.type === 'payment' ? 'Tuesday, 25 June, 04:05' :
                sidePanelData?.type === 'invoice' ? (sidePanelData.content as Invoice).dueDate :
                sidePanelData?.type === 'scheduled-payment' ? (sidePanelData.content as ScheduledPayment).nextPayment :
                (sidePanelData?.content as Transaction)?.date || 'Tuesday, 25 June, 04:05'
              }
              details={
                sidePanelData?.type === 'payment' ? [
                  { label: 'Reference', value: 'Monthly payment details' },
                  { label: 'Payment info', value: '1234567 •12-34-56', copyable: true },
                  { label: 'Scheduled for', value: 'Tuesday, 25 Jun 2025' },
                  { label: 'Repeats', value: 'Every 4 weeks on Wednesdays' },
                  { label: 'Stops', value: 'Sunday, 10 Nov 2025' }
                ] : sidePanelData?.type === 'invoice' ? [
                  { label: 'Reference', value: (sidePanelData.content as Invoice).reference },
                  { label: 'Status', value: (sidePanelData.content as Invoice).status.toUpperCase() },
                  { label: 'Category', value: (sidePanelData.content as Invoice).category },
                  { label: 'Due Date', value: (sidePanelData.content as Invoice).dueDate },
                  { label: 'Payment Type', value: (sidePanelData.content as Invoice).paymentType || 'Bank Transfer' }
                ] : sidePanelData?.type === 'scheduled-payment' ? [
                  { label: 'Reference', value: (sidePanelData.content as ScheduledPayment).reference },
                  { label: 'Payment Type', value: (sidePanelData.content as ScheduledPayment).type },
                  { label: 'Category', value: (sidePanelData.content as ScheduledPayment).category },
                  { label: 'Next Payment', value: (sidePanelData.content as ScheduledPayment).nextPayment },
                  { label: 'Schedule', value: 'Recurring monthly payment' }
                ] : [
                  { label: 'Reference', value: (sidePanelData?.content as Transaction)?.description || 'Transaction details' },
                  { label: 'Type', value: (sidePanelData?.content as Transaction)?.type || 'expense' },
                  { label: 'Date', value: (sidePanelData?.content as Transaction)?.date || 'Today' }
                ]
              }
            />
          </div>
        )}
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
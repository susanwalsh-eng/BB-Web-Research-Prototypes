'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import Home from '../components/pages/Home';
import AllActivity from '../components/pages/AllActivity';
import GetPaid from '../components/pages/GetPaid';
import Payments from '../components/pages/Payments';
import Pots from '../components/pages/Pots';
import Insights from '../components/pages/Insights';
import Team from '../components/pages/Team';
import AccountDetailsModal from '../components/modals/AccountDetailsModal';
import SidePanel from '../components/ui/SidePanel';
import Tasks from '../components/ui/Tasks';

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

  const handleStarButtonClick = () => {
    // Toggle sidebar collapsed state
    setSidebarCollapsed(!sidebarCollapsed);
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
            selectedPaymentId={selectedPaymentId}
            selectedTransactionId={selectedTransactionId}
            onPaymentRowClick={handlePaymentRowClick}
            onTransactionRowClick={handleTransactionRowClick}
            onMenuStateChange={setContextualMenusOpen}
            onNavigate={handleNavigate}
            tasksContent={
              <Tasks
                onActionClick={(actionId: string, actionType: string) => {
                  console.log(`Task action clicked: ${actionType} for ${actionId}`);
                  // Handle different action types
                  switch (actionType) {
                    case 'approve-payment':
                      console.log('Approve payment action');
                      break;
                    case 'send-reminder':
                      console.log('Send reminder action');
                      break;
                    case 'review-details':
                      console.log('Review details action');
                      break;
                    case 'continue-drafts':
                      handleNavigate('Get Paid');
                      break;
                    case 'view-insights':
                      handleNavigate('Insights');
                      break;
                    default:
                      console.log('Unknown action type:', actionType);
                  }
                }}
              />
            }
          />
        );
    }
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
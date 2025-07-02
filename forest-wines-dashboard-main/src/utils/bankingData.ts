import bankingData from '@/data/sampleBankingData.json';

// Type definitions
export interface Payment {
  id: string;
  payee: string;
  description: string;
  amount: number;
  date: string;
  display_date: string;
  type: 'income' | 'expense';
  avatar: string;
  avatarBg: string;
  paymentType: string;
  category: string;
  reference: string;
}

export interface PaymentRequest {
  id: string;
  amount: number;
  status: 'paid' | 'overdue' | 'due' | 'drafts';
  description: string;
  dueDate: string;
  client: string;
  invoiceNumber: string;
  avatar: string;
  avatarBg: string;
}

export interface BankingData {
  account_balance: number;
  net_income: number;
  money_in: number;
  money_out: number;
  payments: Payment[];
  payment_requests: PaymentRequest[];
}

// Data access functions
export const getBankingData = (): BankingData => {
  return bankingData as BankingData;
};

export const getAccountBalance = (): number => {
  return bankingData.account_balance;
};

export const getCashFlowData = () => {
  return {
    netIncome: bankingData.net_income,
    moneyIn: bankingData.money_in,
    moneyOut: bankingData.money_out,
    accountBalance: bankingData.account_balance
  };
};

export const getPayments = (): Payment[] => {
  return bankingData.payments as Payment[];
};

export const getPaymentRequests = (): PaymentRequest[] => {
  return bankingData.payment_requests as PaymentRequest[];
};

export const getRecentPayments = (limit: number = 5): Payment[] => {
  return (bankingData.payments as Payment[])
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};

export const getPaymentRequestsByStatus = (status?: string): PaymentRequest[] => {
  const requests = bankingData.payment_requests as PaymentRequest[];
  if (!status || status === 'All') {
    return requests;
  }
  return requests.filter(request => request.status === status);
};

// Utility functions
export const formatCurrency = (amount: number): string => {
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);
  const formatted = absAmount.toLocaleString('en-GB', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  const result = `£${formatted}`;
  return isNegative ? `-${result}` : result;
};

export const formatAmountWithSign = (amount: number, type: 'income' | 'expense'): string => {
  const sign = type === 'income' ? '+' : '-';
  const absAmount = Math.abs(amount);
  const formatted = absAmount.toLocaleString('en-GB', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  return `${sign}£${formatted}`;
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'paid':
      return '#22c55e';
    case 'overdue':
      return '#ef4444';
    case 'due':
      return '#f59e0b';
    case 'drafts':
      return '#94a3b8';
    default:
      return '#94a3b8';
  }
}; 
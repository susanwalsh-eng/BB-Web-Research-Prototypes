'use client';

export default function Payments() {
  return (
    <div className="content-left">
      <div className="content__container" style={{ paddingBottom: '100px' }}>
        {/* Page Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ 
            fontSize: '32px', 
            fontWeight: '600', 
            color: '#111827', 
            margin: '0 0 8px 0' 
          }}>
            Payments
          </h1>
          <p style={{ 
            fontSize: '18px', 
            color: '#6B7280', 
            margin: '0' 
          }}>
            Send money, schedule payments, and manage your outgoing transactions
          </p>
        </div>

        {/* Placeholder Content */}
        <div className="dashboard-grid">
          <div className="dashboard-col-full">
            <div style={{
              backgroundColor: '#F0FDF4',
              border: '2px dashed #10B981',
              borderRadius: '12px',
              padding: '48px 24px',
              textAlign: 'center',
              marginBottom: '24px'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                backgroundColor: '#6EE7B7',
                borderRadius: '50%',
                margin: '0 auto 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px'
              }}>
                💸
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#111827',
                margin: '0 0 8px 0'
              }}>
                Send Payments
              </h3>
              <p style={{
                color: '#6B7280',
                fontSize: '16px',
                margin: '0'
              }}>
                Transfer money to suppliers, employees, and other business contacts instantly.
              </p>
            </div>
          </div>

          <div className="dashboard-col-full">
            <div style={{
              backgroundColor: '#FDF2F8',
              border: '2px dashed #EC4899',
              borderRadius: '12px',
              padding: '48px 24px',
              textAlign: 'center',
              marginBottom: '24px'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                backgroundColor: '#F9A8D4',
                borderRadius: '50%',
                margin: '0 auto 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px'
              }}>
                📅
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#111827',
                margin: '0 0 8px 0'
              }}>
                Scheduled Payments
              </h3>
              <p style={{
                color: '#6B7280',
                fontSize: '16px',
                margin: '0'
              }}>
                Set up recurring payments and future-dated transfers for regular expenses.
              </p>
            </div>
          </div>

          <div className="dashboard-col-full">
            <div style={{
              backgroundColor: '#F3F4F6',
              border: '2px dashed #6B7280',
              borderRadius: '12px',
              padding: '48px 24px',
              textAlign: 'center'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                backgroundColor: '#D1D5DB',
                borderRadius: '50%',
                margin: '0 auto 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px'
              }}>
                📋
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#111827',
                margin: '0 0 8px 0'
              }}>
                Payment History
              </h3>
              <p style={{
                color: '#6B7280',
                fontSize: '16px',
                margin: '0'
              }}>
                View and export your complete payment history with detailed transaction records.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
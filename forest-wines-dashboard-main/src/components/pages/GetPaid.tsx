'use client';

export default function GetPaid() {
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
            Get Paid
          </h1>
          <p style={{ 
            fontSize: '18px', 
            color: '#6B7280', 
            margin: '0' 
          }}>
            Create invoices, send payment requests, and track what you&apos;re owed
          </p>
        </div>

        {/* Placeholder Content */}
        <div className="dashboard-grid">
          <div className="dashboard-col-full">
            <div style={{
              backgroundColor: '#F9FAFB',
              border: '2px dashed #D1D5DB',
              borderRadius: '12px',
              padding: '48px 24px',
              textAlign: 'center',
              marginBottom: '24px'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                backgroundColor: '#E5E7EB',
                borderRadius: '50%',
                margin: '0 auto 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px'
              }}>
                💰
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#111827',
                margin: '0 0 8px 0'
              }}>
                Invoice Management
              </h3>
              <p style={{
                color: '#6B7280',
                fontSize: '16px',
                margin: '0'
              }}>
                Create professional invoices, send payment links, and track outstanding payments.
              </p>
            </div>
          </div>

          <div className="dashboard-col-full">
            <div style={{
              backgroundColor: '#FEF3C7',
              border: '2px dashed #F59E0B',
              borderRadius: '12px',
              padding: '48px 24px',
              textAlign: 'center',
              marginBottom: '24px'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                backgroundColor: '#FCD34D',
                borderRadius: '50%',
                margin: '0 auto 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px'
              }}>
                📄
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#111827',
                margin: '0 0 8px 0'
              }}>
                Payment Requests
              </h3>
              <p style={{
                color: '#6B7280',
                fontSize: '16px',
                margin: '0'
              }}>
                Send quick payment requests via email or messaging for immediate collection.
              </p>
            </div>
          </div>

          <div className="dashboard-col-full">
            <div style={{
              backgroundColor: '#DBEAFE',
              border: '2px dashed #3B82F6',
              borderRadius: '12px',
              padding: '48px 24px',
              textAlign: 'center'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                backgroundColor: '#93C5FD',
                borderRadius: '50%',
                margin: '0 auto 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px'
              }}>
                📊
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#111827',
                margin: '0 0 8px 0'
              }}>
                Payment Analytics
              </h3>
              <p style={{
                color: '#6B7280',
                fontSize: '16px',
                margin: '0'
              }}>
                Track payment patterns, overdue invoices, and collection performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
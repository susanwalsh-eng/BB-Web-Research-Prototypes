'use client';

export default function Insights() {
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
            Insights
          </h1>
          <p style={{ 
            fontSize: '18px', 
            color: '#6B7280', 
            margin: '0' 
          }}>
            Understand your business performance with detailed analytics and reports
          </p>
        </div>

        {/* Placeholder Content */}
        <div className="dashboard-grid">
          <div className="dashboard-col-full">
            <div style={{
              backgroundColor: '#EFF6FF',
              border: '2px dashed #3B82F6',
              borderRadius: '12px',
              padding: '48px 24px',
              textAlign: 'center',
              marginBottom: '24px'
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
                📈
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#111827',
                margin: '0 0 8px 0'
              }}>
                Revenue Analytics
              </h3>
              <p style={{
                color: '#6B7280',
                fontSize: '16px',
                margin: '0'
              }}>
                Track your income trends, growth patterns, and seasonal variations.
              </p>
            </div>
          </div>

          <div className="dashboard-col-full">
            <div style={{
              backgroundColor: '#FDF4FF',
              border: '2px dashed #8B5CF6',
              borderRadius: '12px',
              padding: '48px 24px',
              textAlign: 'center',
              marginBottom: '24px'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                backgroundColor: '#A78BFA',
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
                Expense Breakdown
              </h3>
              <p style={{
                color: '#6B7280',
                fontSize: '16px',
                margin: '0'
              }}>
                Categorize and analyze your spending patterns to optimize costs.
              </p>
            </div>
          </div>

          <div className="dashboard-col-full">
            <div style={{
              backgroundColor: '#FEF2F2',
              border: '2px dashed #EF4444',
              borderRadius: '12px',
              padding: '48px 24px',
              textAlign: 'center'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                backgroundColor: '#FCA5A5',
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
                Financial Reports
              </h3>
              <p style={{
                color: '#6B7280',
                fontSize: '16px',
                margin: '0'
              }}>
                Generate profit & loss statements, tax reports, and compliance documents.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
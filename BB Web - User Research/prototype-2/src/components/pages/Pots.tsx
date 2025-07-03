'use client';

export default function Pots() {
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
            Pots
          </h1>
          <p style={{ 
            fontSize: '18px', 
            color: '#6B7280', 
            margin: '0' 
          }}>
            Save money for specific goals and separate your business funds
          </p>
        </div>

        {/* Placeholder Content */}
        <div className="dashboard-grid">
          <div className="dashboard-col-full">
            <div style={{
              backgroundColor: '#FEF7FF',
              border: '2px dashed #A855F7',
              borderRadius: '12px',
              padding: '48px 24px',
              textAlign: 'center',
              marginBottom: '24px'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                backgroundColor: '#C084FC',
                borderRadius: '50%',
                margin: '0 auto 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px'
              }}>
                🏺
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#111827',
                margin: '0 0 8px 0'
              }}>
                Tax Savings
              </h3>
              <p style={{
                color: '#6B7280',
                fontSize: '16px',
                margin: '0'
              }}>
                Set aside money for tax payments and avoid end-of-year surprises.
              </p>
            </div>
          </div>

          <div className="dashboard-col-full">
            <div style={{
              backgroundColor: '#FFFBEB',
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
                💼
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#111827',
                margin: '0 0 8px 0'
              }}>
                Equipment Fund
              </h3>
              <p style={{
                color: '#6B7280',
                fontSize: '16px',
                margin: '0'
              }}>
                Save for new equipment, software, and business infrastructure.
              </p>
            </div>
          </div>

          <div className="dashboard-col-full">
            <div style={{
              backgroundColor: '#ECFDF5',
              border: '2px dashed #10B981',
              borderRadius: '12px',
              padding: '48px 24px',
              textAlign: 'center'
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
                🎯
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#111827',
                margin: '0 0 8px 0'
              }}>
                Emergency Fund
              </h3>
              <p style={{
                color: '#6B7280',
                fontSize: '16px',
                margin: '0'
              }}>
                Build a safety net for unexpected expenses and business continuity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
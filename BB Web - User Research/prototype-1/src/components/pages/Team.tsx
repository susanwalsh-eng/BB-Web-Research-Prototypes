'use client';

export default function Team() {
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
            Team
          </h1>
          <p style={{ 
            fontSize: '18px', 
            color: '#6B7280', 
            margin: '0' 
          }}>
            Manage team members, permissions, and collaborative access to your business account
          </p>
        </div>

        {/* Placeholder Content */}
        <div className="dashboard-grid">
          <div className="dashboard-col-full">
            <div style={{
              backgroundColor: '#F0F9FF',
              border: '2px dashed #0EA5E9',
              borderRadius: '12px',
              padding: '48px 24px',
              textAlign: 'center',
              marginBottom: '24px'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                backgroundColor: '#7DD3FC',
                borderRadius: '50%',
                margin: '0 auto 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px'
              }}>
                👥
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#111827',
                margin: '0 0 8px 0'
              }}>
                Team Members
              </h3>
              <p style={{
                color: '#6B7280',
                fontSize: '16px',
                margin: '0'
              }}>
                Add colleagues, set permissions, and manage who can access your business account.
              </p>
            </div>
          </div>

          <div className="dashboard-col-full">
            <div style={{
              backgroundColor: '#F0FDF4',
              border: '2px dashed #22C55E',
              borderRadius: '12px',
              padding: '48px 24px',
              textAlign: 'center',
              marginBottom: '24px'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                backgroundColor: '#86EFAC',
                borderRadius: '50%',
                margin: '0 auto 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px'
              }}>
                🔐
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#111827',
                margin: '0 0 8px 0'
              }}>
                Access Control
              </h3>
              <p style={{
                color: '#6B7280',
                fontSize: '16px',
                margin: '0'
              }}>
                Set granular permissions for viewing accounts, making payments, and managing settings.
              </p>
            </div>
          </div>

          <div className="dashboard-col-full">
            <div style={{
              backgroundColor: '#FFFBEB',
              border: '2px dashed #F59E0B',
              borderRadius: '12px',
              padding: '48px 24px',
              textAlign: 'center'
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
                📊
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#111827',
                margin: '0 0 8px 0'
              }}>
                Activity Log
              </h3>
              <p style={{
                color: '#6B7280',
                fontSize: '16px',
                margin: '0'
              }}>
                Monitor team activities, track changes, and maintain audit trails for compliance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
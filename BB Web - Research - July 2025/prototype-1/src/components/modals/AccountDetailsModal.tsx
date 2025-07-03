'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface AccountDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AccountDetailsModal({ isOpen, onClose }: AccountDetailsModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (!isOpen) return null;

  const modalContent = (
    <div 
      className="modal-overlay" 
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
    >
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '32px',
          width: '400px',
          maxWidth: '90vw',
          maxHeight: '90vh',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          position: 'relative'
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#6B7280',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-label="Close modal"
        >
          ×
        </button>

        {/* Avatar and header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#EF4444',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            fontWeight: 'bold',
            margin: '0 auto 16px'
          }}>
            CN
          </div>
          
          <h2 id="modal-title" style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#111827',
            margin: '0 0 4px 0'
          }}>
            Forest Wines
          </h2>
          
          <p style={{
            color: '#6B7280',
            fontSize: '16px',
            margin: '0 0 8px 0'
          }}>
            Business account
          </p>
          
          <span style={{
            display: 'inline-block',
            backgroundColor: '#3B82F6',
            color: 'white',
            padding: '4px 12px',
            borderRadius: '16px',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            Team
          </span>
        </div>

        {/* Account details */}
        <div style={{ marginBottom: '32px' }}>
          {/* Sort code */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <span style={{ color: '#6B7280', fontSize: '16px' }}>Sort code</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontWeight: '500', color: '#111827' }}>12-34-56</span>
              <button
                onClick={() => copyToClipboard('123456')}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#6B7280',
                  fontSize: '16px'
                }}
                title="Copy sort code"
              >
                📋
              </button>
            </div>
          </div>

          {/* Account number */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <span style={{ color: '#6B7280', fontSize: '16px' }}>Account number</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontWeight: '500', color: '#111827' }}>12345678</span>
              <button
                onClick={() => copyToClipboard('12345678')}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#6B7280',
                  fontSize: '16px'
                }}
                title="Copy account number"
              >
                📋
              </button>
            </div>
          </div>

          {/* Bank address */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            marginBottom: '20px'
          }}>
            <span style={{ color: '#6B7280', fontSize: '16px' }}>Bank address</span>
            <div style={{ textAlign: 'right', maxWidth: '200px' }}>
              <div style={{ fontWeight: '500', color: '#111827', lineHeight: '1.4' }}>
                Monzo Bank<br />
                Broadwalk House<br />
                5 Appold Street
              </div>
            </div>
          </div>
        </div>

        {/* Cancel button */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={onClose}
            style={{
              backgroundColor: 'white',
              border: '2px solid #E5E7EB',
              color: '#374151',
              padding: '12px 32px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              minWidth: '120px'
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  if (typeof document !== 'undefined') {
    return createPortal(modalContent, document.body);
  }

  return null;
} 
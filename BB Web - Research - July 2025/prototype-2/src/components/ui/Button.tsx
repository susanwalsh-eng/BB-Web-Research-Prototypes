'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'default' | 'icon';
  loading?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'default', 
    loading = false, 
    icon, 
    children, 
    className = '', 
    disabled,
    ...props 
  }, ref) => {
    const getButtonClass = () => {
      const baseClass = 'button-ui';
      const variantClass = `button-ui--${variant}`;
      const sizeClass = size === 'icon' ? 'button-ui--icon' : '';
      const loadingClass = loading ? 'button-ui--loading' : '';
      const disabledClass = disabled ? 'button-ui--disabled' : '';
      
      return [baseClass, variantClass, sizeClass, loadingClass, disabledClass, className]
        .filter(Boolean)
        .join(' ');
    };

    const renderContent = () => {
      if (loading) {
        return (
          <div className="button-ui__spinner">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5C11.5899 14.5 14.5 11.5899 14.5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        );
      }

      if (size === 'icon' && icon) {
        return icon;
      }

      return (
        <>
          {icon && <span className="button-ui__icon">{icon}</span>}
          {children && <span className="button-ui__text">{children}</span>}
        </>
      );
    };

    return (
      <button
        ref={ref}
        className={getButtonClass()}
        disabled={disabled || loading}
        {...props}
      >
        {renderContent()}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button; 
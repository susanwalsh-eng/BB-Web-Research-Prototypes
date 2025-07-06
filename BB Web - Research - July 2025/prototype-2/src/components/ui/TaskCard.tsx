'use client';

import React from 'react';

interface TaskCardProps {
  icon: string;
  title: string;
  subtitle: string;
  badge?: {
    text: string;
    type: 'overdue' | 'due' | 'paid' | 'draft' | 'urgent' | 'warning' | 'info';
  };
  primaryButton: {
    text: string;
    onClick: () => void;
  };
  secondaryButton: {
    text: string;
    onClick: () => void;
  };
}

export default function TaskCard({
  icon,
  title,
  subtitle,
  badge,
  primaryButton,
  secondaryButton
}: TaskCardProps) {
  const getBadgeClass = () => {
    if (!badge) return '';
    
    switch (badge.type) {
      case 'overdue': return 'task-card-badge--overdue';
      case 'due': return 'task-card-badge--due';
      case 'paid': return 'task-card-badge--paid';
      case 'draft': return 'task-card-badge--draft';
      case 'urgent': return 'task-card-badge--urgent';
      case 'warning': return 'task-card-badge--warning';
      case 'info': return 'task-card-badge--info';
      default: return 'task-card-badge--info';
    }
  };

  return (
    <div className="task-card-new">
      {/* Header with icon, badge, and title */}
      <div className="task-card-new__header">
        {/* Left Icon */}
        <div className="task-card-new__icon">
          <span>{icon}</span>
        </div>

        {/* Badge between icon and title */}
        {badge && (
          <div className={`task-card-badge ${getBadgeClass()}`}>
            {badge.text}
          </div>
        )}

        {/* Title */}
        <h3 className="task-card-new__title">{title}</h3>
      </div>

      {/* Content */}
      <div className="task-card-new__content">
        <p className="task-card-new__subtitle">{subtitle}</p>
        
        {/* Action Buttons */}
        <div className="task-card-new__actions">
          <button 
            className="edu-card__button edu-card__button--primary"
            onClick={primaryButton.onClick}
          >
            {primaryButton.text}
          </button>
          <button 
            className="edu-card__button edu-card__button--secondary"
            onClick={secondaryButton.onClick}
          >
            {secondaryButton.text}
          </button>
        </div>
      </div>
    </div>
  );
} 
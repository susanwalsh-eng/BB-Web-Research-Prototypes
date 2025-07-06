'use client';

import React from 'react';

interface EduCardProps {
  badge: {
    text: string;
    color: string;
    icon: string;
  };
  title: string;
  description: string;
  primaryButton: {
    text: string;
    onClick: () => void;
  };
  secondaryButton: {
    text: string;
    onClick: () => void;
  };
}

export default function EduCard({
  badge,
  title,
  description,
  primaryButton,
  secondaryButton
}: EduCardProps) {
  return (
    <div className="edu-card">
      {/* Top Label Badge */}
      <div 
        className="edu-card__badge"
        style={{ backgroundColor: badge.color }}
      >
        <span className="edu-card__badge-icon">{badge.icon}</span>
        <span className="edu-card__badge-text">{badge.text}</span>
      </div>

      {/* Content */}
      <div className="edu-card__content">
        <h3 className="edu-card__title">{title}</h3>
        <p className="edu-card__description">{description}</p>
      </div>

      {/* Buttons */}
      <div className="edu-card__actions">
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
  );
} 
'use client';

import React, { useState } from 'react';

interface ContextualCard {
  id: string;
  type: 'warning' | 'urgent' | 'info' | 'feature';
  icon: string;
  title: string;
  description: string;
  action?: {
    text: string;
    onClick: () => void;
  };
  isExpanded?: boolean;
}

interface ContextualCardStackProps {
  cards: ContextualCard[];
  onCardClose?: (cardId: string) => void;
}

export default function ContextualCardStack({ cards, onCardClose }: ContextualCardStackProps) {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(
    new Set(cards.filter(card => card.isExpanded).map(card => card.id))
  );
  const [visibleCards, setVisibleCards] = useState<Set<string>>(
    new Set(cards.map(card => card.id))
  );

  const handleCardExpand = (cardId: string) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      newSet.add(cardId);
      return newSet;
    });
  };

  const handleCardClose = (cardId: string) => {
    setVisibleCards(prev => {
      const newSet = new Set(prev);
      newSet.delete(cardId);
      return newSet;
    });
    
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      newSet.delete(cardId);
      return newSet;
    });

    if (onCardClose) {
      onCardClose(cardId);
    }
  };

  const visibleCardsList = cards.filter(card => visibleCards.has(card.id));

  if (visibleCardsList.length === 0) {
    return null;
  }

  return (
    <div className="contextual-card-stack">
      {visibleCardsList.map((card, index) => {
        const isExpanded = expandedCards.has(card.id);
        const canExpand = !isExpanded && card.description.length > 50; // Only show expansion for longer descriptions
        
        return (
          <div
            key={card.id}
            className={`contextual-card ${isExpanded ? 'contextual-card--expanded' : 'contextual-card--collapsed'}`}
            onMouseEnter={() => !isExpanded && handleCardExpand(card.id)}

            style={{
              zIndex: visibleCardsList.length - index,
              marginTop: index > 0 ? (isExpanded ? '16px' : '8px') : '0'
            }}
          >
            <div className="contextual-card__content">
              <div className="contextual-card__body">
                <div className="contextual-card__main">
                  <div className="contextual-card__title">
                    <span className="contextual-card__icon">{card.icon}</span>
                    <span className="contextual-card__title-text">{card.title}</span>
                  </div>
                  <div className={`contextual-card__description ${!isExpanded ? 'contextual-card__description--truncated' : ''}`}>
                    {isExpanded 
                      ? card.description 
                      : card.description.length > 50 
                        ? `${card.description.substring(0, 50)}...`
                        : card.description
                    }
                  </div>
                  {isExpanded && (
                    <div className="contextual-card__actions">
                      {card.action ? (
                        <button 
                          className="contextual-card__action-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            card.action!.onClick();
                          }}
                        >
                          {card.action.text}
                        </button>
                      ) : (
                        <button 
                          className="contextual-card__action-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log(`Default action for ${card.id}`);
                          }}
                        >
                          View details
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="contextual-card__trailing">
                <button
                  className="contextual-card__close-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClose(card.id);
                  }}
                  aria-label="Close card"
                >
                  <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
                    <path 
                      d="M15.75 5.25L5.25 15.75M5.25 5.25L15.75 15.75" 
                      stroke="currentColor" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
            {canExpand && (
              <div className="contextual-card__expand-hint">
                <div className="contextual-card__expand-line"></div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
} 
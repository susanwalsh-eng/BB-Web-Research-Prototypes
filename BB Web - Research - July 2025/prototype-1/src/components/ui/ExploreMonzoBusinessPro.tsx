'use client';

import React, { useRef, useState, useEffect } from 'react';

interface ExploreCard {
  id: string;
  tag: {
    text: string;
    color: string;
    icon: string;
  };
  title: string;
  body: string;
  primaryButton: string;
  secondaryButton: string;
}

interface ExploreMonzoBusinessProProps {
  onActionClick?: (cardId: string, actionType: string) => void;
}

// Mock data for explore cards
const exploreCards: ExploreCard[] = [
  {
    id: "1",
    tag: {
      text: "Quotes",
      color: "#E91E63", // Pink
      icon: "📋"
    },
    title: "We now have quotes!",
    body: "Simple to create and customise, send, chase and pay.",
    primaryButton: "Create a quote",
    secondaryButton: "Dismiss"
  },
  {
    id: "2",
    tag: {
      text: "Tax Pots",
      color: "#4CAF50", // Green
      icon: "🏛️"
    },
    title: "Always tax-ready",
    body: "Automatically put a percentage aside for tax and other big bills every time you're paid with Tax Pots.",
    primaryButton: "Create a Tax Pot",
    secondaryButton: "Dismiss"
  },
  {
    id: "3",
    tag: {
      text: "Feature spotlight",
      color: "#FF9800", // Orange
      icon: "💡"
    },
    title: "Making a cash deposit",
    body: "You can pay cash into your Monzo accounts at any UK PayPoint or Post Office.",
    primaryButton: "Make a deposit",
    secondaryButton: "Dismiss"
  },
  {
    id: "4",
    tag: {
      text: "Upgrade",
      color: "#03A9F4", // Light blue
      icon: "⬆️"
    },
    title: "Avoid admin; get an expense card",
    body: "Let team members spend up to limits and save everyone from endless admin. Available with Monzo Business Team.",
    primaryButton: "Explore Team plan",
    secondaryButton: "Dismiss"
  }
];

const BusinessIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M4 6H16M4 6V16C4 16.5523 4.44772 17 5 17H15C15.5523 17 16 16.5523 16 16V6M4 6L6 4H14L16 6M10 9V13M8 11H12" 
      stroke="#2E3D49" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M10 12L6 8L10 4" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M6 4L10 8L6 12" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// ExploreCard Component
const ExploreCard: React.FC<{ card: ExploreCard; onActionClick: (cardId: string, actionType: string) => void }> = ({ card, onActionClick }) => {
  return (
    <div className="task-card">
      <div className="task-card__header">
        <div className="task-card__icon">
          {card.tag.icon}
        </div>
        <div 
          className="task-card__status"
          style={{ backgroundColor: card.tag.color }}
        >
          {card.tag.text}
        </div>
      </div>
      
      <div className="task-card__content">
        <h3 className="task-card__title">{card.title}</h3>
        <p className="task-card__body">{card.body}</p>
      </div>
      
      <div className="task-card__actions">
        <button
          className="task-card__btn task-card__btn--primary"
          onClick={() => onActionClick(card.id, card.primaryButton.toLowerCase().replace(/\s+/g, '-'))}
        >
          {card.primaryButton}
        </button>
        <button
          className="task-card__btn task-card__btn--secondary"
          onClick={() => onActionClick(card.id, card.secondaryButton.toLowerCase().replace(/\s+/g, '-'))}
        >
          {card.secondaryButton}
        </button>
      </div>
    </div>
  );
};

// ExploreMonzoBusinessPro Component
export default function ExploreMonzoBusinessPro({ onActionClick }: ExploreMonzoBusinessProProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Function to check scrollability
  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  // Effect to check scrollability on mount and scroll
  useEffect(() => {
    checkScrollability();
    const currentRef = scrollContainerRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', checkScrollability);
      // Also check on resize
      window.addEventListener('resize', checkScrollability);
      
      // Clean up event listeners
      return () => {
        currentRef.removeEventListener('scroll', checkScrollability);
        window.removeEventListener('resize', checkScrollability);
      };
    }
  }, []);

  // Scroll left/right by one card width (~325px + margin)
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 325 + 20; // Card width + gap
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleActionClick = (cardId: string, actionType: string) => {
    console.log(`Action: ${actionType} for ${cardId}`);
    onActionClick?.(cardId, actionType);
  };

  return (
    <div className="card">
      <div className="card__header">
        <h2 className="card__title">
          <BusinessIcon />
          <span>Explore Monzo Business Pro</span>
        </h2>
        <div className="tasks__controls">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`tasks__control-btn ${
              canScrollLeft ? '' : 'tasks__control-btn--disabled'
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeftIcon />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`tasks__control-btn ${
              canScrollRight ? '' : 'tasks__control-btn--disabled'
            }`}
            aria-label="Scroll right"
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>

      <div className="card__content">
        <div
          ref={scrollContainerRef}
          className="tasks__container"
        >
          <div className="tasks__cards">
            {exploreCards.map((card) => (
              <ExploreCard
                key={card.id}
                card={card}
                onActionClick={handleActionClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 
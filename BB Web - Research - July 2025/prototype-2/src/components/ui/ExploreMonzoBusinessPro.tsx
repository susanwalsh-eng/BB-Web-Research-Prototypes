'use client';

import React, { useRef, useState, useEffect } from 'react';
import EduCard from './EduCard';

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
      color: "#FDD0EC",
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
      color: "#D4EDDA",
      icon: "💰"
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
      color: "#FFE4CC",
      icon: "🚀"
    },
    title: "Deposits are here",
    body: "Make deposits from your personal account to your business account in seconds.",
    primaryButton: "Make a deposit",
    secondaryButton: "Dismiss"
  },
  {
    id: "4",
    tag: {
      text: "Upgrade",
      color: "#CCE5FF",
      icon: "⭐"
    },
    title: "Upgrade to Pro",
    body: "Get advanced features like expense management, reporting, and team collaboration.",
    primaryButton: "Explore team plan",
    secondaryButton: "Dismiss"
  },
];

const BusinessIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M5 2.5V5.5H15V2.5H5ZM5 7.5V17.5H15V7.5H5ZM3 2.5C3 1.39543 3.89543 0.5 5 0.5H15C16.1046 0.5 17 1.39543 17 2.5V17.5C17 18.6046 16.1046 19.5 15 19.5H5C3.89543 19.5 3 18.6046 3 17.5V2.5ZM7 9.5H13V11.5H7V9.5ZM7 12.5H13V14.5H7V12.5Z" 
      fill="currentColor"
    />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M15.7563 15.9546L10.8813 11.0796C10.6522 10.8504 10.5376 10.5588 10.5376 10.2046C10.5376 9.85042 10.6522 9.55876 10.8813 9.32959C11.1105 9.10042 11.4022 8.98584 11.7563 8.98584C12.1105 8.98584 12.4022 9.10042 12.6313 9.32959L18.3813 15.0796C18.5063 15.2046 18.5949 15.34 18.647 15.4858C18.6991 15.6317 18.7251 15.7879 18.7251 15.9546C18.7251 16.1213 18.6991 16.2775 18.647 16.4233C18.5949 16.5692 18.5063 16.7046 18.3813 16.8296L12.6313 22.5796C12.4022 22.8088 12.1105 22.9233 11.7563 22.9233C11.4022 22.9233 11.1105 22.8088 10.8813 22.5796C10.6522 22.3504 10.5376 22.0588 10.5376 21.7046C10.5376 21.3504 10.6522 21.0588 10.8813 20.8296L15.7563 15.9546Z" 
      fill="#218FB7"
      transform="rotate(180 15 15.5)"
    />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M15.7563 15.9546L10.8813 11.0796C10.6522 10.8504 10.5376 10.5588 10.5376 10.2046C10.5376 9.85042 10.6522 9.55876 10.8813 9.32959C11.1105 9.10042 11.4022 8.98584 11.7563 8.98584C12.1105 8.98584 12.4022 9.10042 12.6313 9.32959L18.3813 15.0796C18.5063 15.2046 18.5949 15.34 18.647 15.4858C18.6991 15.6317 18.7251 15.7879 18.7251 15.9546C18.7251 16.1213 18.6991 16.2775 18.647 16.4233C18.5949 16.5692 18.5063 16.7046 18.3813 16.8296L12.6313 22.5796C12.4022 22.8088 12.1105 22.9233 11.7563 22.9233C11.4022 22.9233 11.1105 22.8088 10.8813 22.5796C10.6522 22.3504 10.5376 22.0588 10.5376 21.7046C10.5376 21.3504 10.6522 21.0588 10.8813 20.8296L15.7563 15.9546Z" 
      fill="#218FB7"
    />
  </svg>
);

// Helper function to format explore card data for new EduCard component
const formatExploreCardForEduCard = (card: ExploreCard) => {
  return {
    badge: {
      text: card.tag.text,
      color: card.tag.color,
      icon: card.tag.icon
    },
    title: card.title,
    description: card.body,
    primaryButton: {
      text: card.primaryButton,
      onClick: () => {}
    },
    secondaryButton: {
      text: card.secondaryButton,
      onClick: () => {}
    }
  };
};

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
    console.log(`Explore action: ${actionType} for ${cardId}`);
    onActionClick?.(cardId, actionType);
  };

  return (
    <div className="card">
      <div className="card__header">
        <h2 className="card__title">
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
            {exploreCards.map((card) => {
              const eduCardData = formatExploreCardForEduCard(card);
              return (
                <EduCard
                  key={card.id}
                  badge={eduCardData.badge}
                  title={eduCardData.title}
                  description={eduCardData.description}
                  primaryButton={{
                    text: eduCardData.primaryButton.text,
                    onClick: () => handleActionClick(card.id, eduCardData.primaryButton.text.toLowerCase().replace(/\s+/g, '-'))
                  }}
                  secondaryButton={{
                    text: eduCardData.secondaryButton.text,
                    onClick: () => handleActionClick(card.id, eduCardData.secondaryButton.text.toLowerCase().replace(/\s+/g, '-'))
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
} 
'use client';

import React, { useRef, useState, useEffect } from 'react';
import TaskCard from './TaskCard';

interface TaskCTA {
  type: 'primary' | 'secondary';
  text: string;
  action: string;
}

interface Task {
  id: string;
  type: 'approval' | 'reminder' | 'feature' | 'info' | 'draft' | 'due' | 'paid';
  icon: string;
  title: string;
  reference?: string;
  body?: string;
  amount?: number;
  status?: 'OVERDUE' | 'PAID' | 'DRAFT' | 'DUE';
  cta: string[];
  badge?: {
    text: string;
    type: string;
  };
}

interface TasksProps {
  onActionClick?: (actionId: string, actionType: string) => void;
}

// Mock data for tasks
const mockTasks: Task[] = [
  {
    id: "1",
    type: "approval",
    icon: "💰",
    title: "Approve a payment",
    reference: "Invoice #271 to Beer for All",
    amount: 1547.17,
    cta: ["Approve", "Review"],
    badge: {
      text: "URGENT",
      type: "urgent"
    }
  },
  {
    id: "2",
    type: "reminder",
    icon: "🔔",
    title: "Send reminder",
    reference: "Invoice #268 to Coffee Co",
    amount: 892.50,
    cta: ["Send reminder", "Dismiss"],
    badge: {
      text: "OVERDUE",
      type: "overdue"
    }
  },
  {
    id: "3",
    type: "feature",
    icon: "🏦",
    title: "Set up tax pot",
    reference: "Automate tax savings",
    cta: ["Set up", "Learn more"]
  },
  {
    id: "4",
    type: "info",
    icon: "📊",
    title: "Review expenses",
    reference: "Monthly expense report ready",
    cta: ["Review", "Download"]
  },
  {
    id: "5",
    type: "draft",
    icon: "📝",
    title: "Finish draft invoice",
    reference: "Invoice #270 to Digital Agency",
    amount: 2400.00,
    cta: ["Complete", "Delete"],
    badge: {
      text: "DRAFT",
      type: "draft"
    }
  },
  {
    id: "6",
    type: "due",
    icon: "📅",
    title: "Payment due soon",
    reference: "Subscription payment in 3 days",
    amount: 299.99,
    cta: ["Pay now", "Schedule"],
    badge: {
      text: "DUE",
      type: "due"
    }
  },
  {
    id: "7",
    type: "approval",
    title: "Approve another payment",
    reference: "Invoice #272 to Pizza Palace",
    amount: 899.50,
    cta: ["Approve", "Review details"],
    icon: "💰",
  },
  {
    id: "8",
    type: "reminder",
    status: "OVERDUE",
    title: "Invoice #1500 overdue",
    body: "This invoice is awaiting payment.",
    cta: ["Send reminder", "Review details"],
    icon: "🔔",
  },
];

const TaskIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M3 5.5L3 4.5C3 3.39543 3.89543 2.5 5 2.5L15 2.5C16.1046 2.5 17 3.39543 17 4.5L17 5.5M3 5.5C2.17157 5.5 1.5 6.17157 1.5 7L1.5 15C1.5 16.1046 2.39543 17 3.5 17L16.5 17C17.6046 17 18.5 16.1046 18.5 15L18.5 7C18.5 6.17157 17.8284 5.5 17 5.5M3 5.5L17 5.5M7 10L9 12L13 8" 
      stroke="#2E3D49" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
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

// Helper function to format task data for new TaskCard component
const formatTaskForNewCard = (task: Task) => {
  const formatAmount = (amount?: number) => {
    if (!amount) return '';
    return `£${amount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  let subtitle = task.body || task.reference || '';
  
  // Add amount to subtitle if it exists
  if (task.amount) {
    subtitle = `${subtitle} for ${formatAmount(task.amount)}`.trim();
  }
  
  // Add status to subtitle if it exists
  if (task.status) {
    subtitle = `${subtitle} - ${task.status}`.trim();
  }
  
  // Clean up subtitle if it starts with " for" or " - "
  subtitle = subtitle.replace(/^(\s*for\s*|\s*-\s*)/, '');

  return {
    icon: task.icon,
    title: task.title,
    subtitle: subtitle,
    badge: task.badge,
    primaryButton: {
      text: task.cta[0] || 'Action',
      onClick: () => {}
    },
    secondaryButton: {
      text: task.cta[1] || 'Dismiss',
      onClick: () => {}
    }
  };
};

// Tasks Component
export default function Tasks({ onActionClick }: TasksProps) {
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

  const handleActionClick = (taskId: string, actionType: string) => {
    console.log(`Action: ${actionType} for ${taskId}`);
    onActionClick?.(taskId, actionType);
  };

  return (
    <div className="card">
      <div className="card__header">
        <h2 className="card__title">
          <span>Tasks</span>
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
            {mockTasks.map((task) => {
              const taskData = formatTaskForNewCard(task);
              return (
              <TaskCard
                key={task.id}
                  icon={taskData.icon}
                  title={taskData.title}
                  subtitle={taskData.subtitle}
                  badge={taskData.badge ? {
                    text: taskData.badge.text,
                    type: taskData.badge.type as 'overdue' | 'due' | 'paid' | 'draft' | 'urgent' | 'warning' | 'info'
                  } : undefined}
                  primaryButton={{
                    text: taskData.primaryButton.text,
                    onClick: () => handleActionClick(task.id, taskData.primaryButton.text.toLowerCase().replace(' ', '-'))
                  }}
                  secondaryButton={{
                    text: taskData.secondaryButton.text,
                    onClick: () => handleActionClick(task.id, taskData.secondaryButton.text.toLowerCase().replace(' ', '-'))
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
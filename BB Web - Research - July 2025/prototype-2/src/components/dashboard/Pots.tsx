"use client";

import PotCard from "./PotCard";

interface PotsProps {
  onNavigate?: (page: string) => void;
}

interface Pot {
  name: string;
  balance: number;
  currency: string;
  icon: string;
}

export default function Pots({ onNavigate }: PotsProps) {
  // Mock pot data
  const pots: Pot[] = [
    {
      name: "Tax Pot",
      balance: 1258.0,
      currency: "GBP",
      icon: "/tax-pot.png",
    },
    {
      name: "Rainday fund",
      balance: 1258.0,
      currency: "GBP",
      icon: "/rainy-day-pot.png",
    },
    {
      name: "Savings",
      balance: 1788.0,
      currency: "GBP",
      icon: "/savings-pot.png",
    },
  ];

  // Calculate total balance (all in GBP)
  const calculateTotalBalance = () => {
    const totalInGBP = pots.reduce((sum, pot) => {
      return sum + pot.balance;
    }, 0);

    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(totalInGBP);
  };

  const handlePotClick = (pot: Pot) => {
    console.log(`Clicked on ${pot.name} pot`);
    // Navigate to pot details
    onNavigate?.(`Pots/${pot.name}`);
  };

  return (
    <div className="card">
      <div className="card__header">
        <h2 className="card__title">
          Tax Pots, Savings & Regular Pots
          <span className="pots__total-balance">
            • {calculateTotalBalance()}
          </span>
        </h2>
      </div>
      <div className="card__content">
        <div className="pots__grid">
          {pots.map((pot, index) => (
            <PotCard
              key={index}
              name={pot.name}
              balance={pot.balance}
              currency={pot.currency}
              icon={pot.icon}
              onClick={() => handlePotClick(pot)}
            />
          ))}
        </div>
        <div className="card-footer">
          <button
            className="view-all-link"
            onClick={() => onNavigate?.("Pots")}
          >
            View all Pots
            <svg
              width="24"
              height="24"
              viewBox="0 0 30 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.7563 15.9546L10.8813 11.0796C10.6522 10.8504 10.5376 10.5588 10.5376 10.2046C10.5376 9.85042 10.6522 9.55876 10.8813 9.32959C11.1105 9.10042 11.4022 8.98584 11.7563 8.98584C12.1105 8.98584 12.4022 9.10042 12.6313 9.32959L18.3813 15.0796C18.5063 15.2046 18.5949 15.34 18.647 15.4858C18.6991 15.6317 18.7251 15.7879 18.7251 15.9546C18.7251 16.1213 18.6991 16.2775 18.647 16.4233C18.5949 16.5692 18.5063 16.7046 18.3813 16.8296L12.6313 22.5796C12.4022 22.8088 12.1105 22.9233 11.7563 22.9233C11.4022 22.9233 11.1105 22.8088 10.8813 22.5796C10.6522 22.3504 10.5376 22.0588 10.5376 21.7046C10.5376 21.3504 10.6522 21.0588 10.8813 20.8296L15.7563 15.9546Z"
                fill="#218FB7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

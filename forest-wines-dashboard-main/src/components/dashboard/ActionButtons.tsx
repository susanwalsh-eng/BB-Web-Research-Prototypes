'use client';

// No more imports needed from heroicons

// Custom Arrow Icon Component
const CustomArrowIcon = ({ className }: { className?: string }) => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M20.2188 16.25H6.25C5.89583 16.25 5.59896 16.1302 5.35937 15.8906C5.11979 15.6511 5 15.3542 5 15C5 14.6458 5.11979 14.349 5.35937 14.1094C5.59896 13.8698 5.89583 13.75 6.25 13.75H20.2188L14.0938 7.62501C13.8438 7.37501 13.724 7.08335 13.7344 6.75001C13.7448 6.41668 13.875 6.12501 14.125 5.87501C14.375 5.64585 14.6667 5.52606 15 5.51564C15.3333 5.50522 15.625 5.62501 15.875 5.87501L24.125 14.125C24.25 14.25 24.3385 14.3854 24.3906 14.5313C24.4427 14.6771 24.4687 14.8333 24.4687 15C24.4687 15.1667 24.4427 15.3229 24.3906 15.4688C24.3385 15.6146 24.25 15.75 24.125 15.875L15.875 24.125C15.6458 24.3542 15.3594 24.4688 15.0156 24.4688C14.6719 24.4688 14.375 24.3542 14.125 24.125C13.875 23.875 13.75 23.5781 13.75 23.2344C13.75 22.8906 13.875 22.5938 14.125 22.3438L20.2188 16.25Z" fill="white"/>
  </svg>
);

// Custom Users Icon Component
const CustomUsersIcon = ({ className }: { className?: string }) => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M12.5006 21.2496C14.5713 21.2496 16.2508 22.9291 16.2508 24.9998C16.2508 27.0705 14.5713 28.75 12.5006 28.75C10.4299 28.75 8.7504 27.0705 8.7504 24.9998C8.7504 22.9291 10.4299 21.2496 12.5006 21.2496ZM23.1269 14.9978C26.2352 14.9978 28.75 17.517 28.75 20.6209C28.75 23.7248 26.2308 26.244 23.1269 26.244C20.023 26.244 17.5038 23.7248 17.5038 20.6209C17.5038 17.517 20.023 14.9978 23.1269 14.9978ZM9.999 1.25C14.8307 1.25 18.748 5.16727 18.748 9.999C18.748 14.8307 14.8307 18.748 9.999 18.748C5.16727 18.748 1.25 14.8307 1.25 9.999C1.25 5.16727 5.16727 1.25 9.999 1.25ZM9.999 10.21C12.2588 10.21 14.0965 11.5554 14.1713 13.2348V13.3403C14.1713 13.9163 13.7052 14.3823 13.1293 14.3823H6.86431C6.28837 14.3823 5.82234 13.9163 5.82234 13.3403C5.82234 11.6125 7.69085 10.21 9.999 10.21ZM9.999 4.99141C11.1509 4.99141 12.0873 5.92786 12.0873 7.07974C12.0873 8.23162 11.1509 9.16807 9.999 9.16807C8.84712 9.16807 7.91067 8.23162 7.91067 7.07974C7.91067 5.92786 8.84712 4.99141 9.999 4.99141Z" fill="#218FB7"/>
  </svg>
);

// Custom Bill Icon Component
const CustomBillIcon = ({ className }: { className?: string }) => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M22.5 2.5C23.8807 2.5 25 3.61929 25 5V27.5L22.5 25L20 27.5L17.5 25L15 27.5L12.5 25L10 27.5L7.5 25L5 27.5V5C5 3.61929 6.11929 2.5 7.5 2.5H22.5ZM13.75 16.25H8.75C8.05965 16.25 7.5 16.8096 7.5 17.5C7.5 18.141 7.98255 18.6694 8.60422 18.7416L8.75 18.75H13.75C14.4404 18.75 15 18.1904 15 17.5C15 16.859 14.5175 16.3306 13.8958 16.2584L13.75 16.25ZM21.25 11.25H8.75C8.05965 11.25 7.5 11.8096 7.5 12.5C7.5 13.141 7.98255 13.6694 8.60422 13.7416L8.75 13.75H21.25C21.9404 13.75 22.5 13.1904 22.5 12.5C22.5 11.859 22.0175 11.3306 21.3958 11.2584L21.25 11.25ZM21.25 6.25H8.75C8.05965 6.25 7.5 6.80965 7.5 7.5C7.5 8.14105 7.98255 8.66939 8.60422 8.74159L8.75 8.75H21.25C21.9404 8.75 22.5 8.19035 22.5 7.5C22.5 6.85895 22.0175 6.33061 21.3958 6.25841L21.25 6.25Z" fill="#218FB7"/>
  </svg>
);

// Custom Invoice Icon Component
const CustomInvoiceIcon = ({ className }: { className?: string }) => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M10 8.75C10 8.05964 10.5596 7.5 11.25 7.5H18.75C19.4404 7.5 20 8.05964 20 8.75C20 9.44036 19.4404 10 18.75 10H11.25C10.5596 10 10 9.44036 10 8.75Z" fill="#218FB7"/>
    <path d="M11.25 11.25C10.5596 11.25 10 11.8096 10 12.5C10 13.1904 10.5596 13.75 11.25 13.75H12.5C13.1904 13.75 13.75 13.1904 13.75 12.5C13.75 11.8096 13.1904 11.25 12.5 11.25H11.25Z" fill="#218FB7"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M24.9931 4.81342C24.8977 3.51985 23.818 2.5 22.5 2.5H7.5L7.31342 2.50686C6.01985 2.60229 5 3.68205 5 5V10.4988L3.43826 11.7494C2.84523 12.2238 2.5 12.9421 2.5 13.7015V25L2.50686 25.1866C2.60229 26.4801 3.68205 27.5 5 27.5H25L25.1866 27.4931C26.4801 27.3977 27.5 26.318 27.5 25V13.7015C27.5 12.9421 27.1547 12.2238 26.5617 11.7494L25 10.4988V5L24.9931 4.81342ZM7.5 5H22.5V16.4988L15 22.5L7.5 16.5V5Z" fill="#218FB7"/>
  </svg>
);

const actions = [
  { title: 'Pay by bank transfer', icon: CustomArrowIcon, primary: true },
  { title: 'Make a bulk payment', icon: CustomUsersIcon, primary: false },
  { title: 'Pay a bill', icon: CustomBillIcon, primary: false },
  { title: 'Create invoice', icon: CustomInvoiceIcon, primary: false },
];

export default function ActionButtons() {
  return (
    <div className="action-buttons">
      <div className="action-buttons__container">
        {actions.map((action) => {
          const Icon = action.icon;
          const buttonClass = action.primary ? 'action-btn action-btn--primary' : 'action-btn action-btn--secondary';
          return (
            <button key={action.title} className={buttonClass}>
              <Icon className="action-btn__icon" />
              {action.title}
            </button>
          );
        })}
      </div>
    </div>
  );
} 
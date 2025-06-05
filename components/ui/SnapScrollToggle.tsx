
import React from 'react';

interface SnapScrollToggleProps {
  isEnabled: boolean;
  onToggle: () => void;
}

// Simple SVG icon for "Snap On" (e.g., aligned sections or magnet-like)
const SnapOnIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75v4.5m0-4.5h-4.5m4.5 0L15 9m5.25 11.25v-4.5m0 4.5h-4.5m4.5 0L15 15" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75h4.5v4.5h-4.5z" />
  </svg>
);

// Simple SVG icon for "Snap Off" (e.g., free flowing lines)
const SnapOffIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
  </svg>
);


export const SnapScrollToggle: React.FC<SnapScrollToggleProps> = ({ isEnabled, onToggle }) => {
  const title = isEnabled ? "Isključi 'snap' skrolovanje (slobodno skrolovanje)" : "Uključi 'snap' skrolovanje (sekcija po sekcija)";
  
  return (
    <button
      onClick={onToggle}
      aria-label={title}
      title={title}
      className="fixed bottom-6 left-6 z-[100] bg-palm-warm-gray text-palm-off-white p-3.5 rounded-full shadow-xl hover:bg-opacity-80 hover:bg-palm-soft-lavender focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-palm-dark-indigo focus:ring-palm-luminous-teal transition-all duration-300 ease-out transform hover:scale-105 active:scale-95"
    >
      {isEnabled ? (
        <SnapOnIcon className="w-6 h-6" />
      ) : (
        <SnapOffIcon className="w-6 h-6" />
      )}
    </button>
  );
};
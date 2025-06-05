
import React, { ReactNode } from 'react';
import { DownArrowIcon } from '../../constants'; // Assuming DownArrowIcon is available

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
  motif?: ReactNode;
  fullHeight?: boolean; // default true
  isLastSection?: boolean; 
  onNavigateNext?: () => void; // This will be undefined if snap scrolling is off
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({ 
  id, 
  children, 
  className, 
  motif, 
  fullHeight = true,
  isLastSection = false, 
  onNavigateNext 
}) => {
  return (
    <section 
      id={id} 
      className={`relative ${fullHeight ? 'min-h-screen' : ''} py-20 md:py-32 px-6 sm:px-10 md:px-16 lg:px-24 flex flex-col justify-center items-center overflow-hidden ${className || ''}`}
    >
      {motif && <div className="absolute inset-0 -z-10">{motif}</div>}
      <div className="relative z-0 w-full max-w-5xl text-center"> 
        {children}
      </div>
      {!isLastSection && onNavigateNext && ( 
        <button
          onClick={onNavigateNext}
          aria-label="Pređi na sledeću sekciju"
          // Updated arrow color for better visibility on potentially varied section backgrounds
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 p-2 text-palm-luminous-teal hover:text-palm-soft-lavender transition-colors duration-300 animate-bounce focus:outline-none focus:ring-2 focus:ring-palm-luminous-teal rounded-full"
        >
          <DownArrowIcon className="h-8 w-8" />
        </button>
      )}
    </section>
  );
};
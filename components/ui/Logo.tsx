
import React from 'react';
import { APP_NAME, LOGO_URL } from '../../constants';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={`block ${className || 'h-24 md:h-28 lg:h-32 w-auto'}`}> {/* Added default size if className not provided */}
      <img
        src={LOGO_URL}
        alt="Palmotićeva - Slika Dobrodošlice" 
        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );
};
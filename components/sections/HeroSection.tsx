
import React from 'react';
import { SectionProps } from '../../types';
import { AnimatedText } from '../ui/AnimatedText';
import { Button } from '../ui/Button';
import { sectionText, DownArrowIcon } from '../../constants';
import { ViewName } from '../../App';

interface HeroSectionProps extends SectionProps {
  isLastSection?: boolean;
  onNavigateNext?: () => void; // Will be undefined if snap scrolling is disabled
  isPageScrolling?: boolean;
  navigateTo?: (view: ViewName, targetId?: string | null) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  id = "hero", 
  isLastSection, 
  onNavigateNext, 
  isPageScrolling,
  navigateTo
}) => {
  const heroContent = sectionText.hero;

  return (
    <div 
      id={id} 
      className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden bg-palm-dark-indigo" // Ensure base dark bg
    >
      <div
        className="absolute inset-0 bg-cover bg-center -z-20"
        style={{ backgroundImage: `url(${heroContent.backgroundImageUrl})` }}
        aria-hidden="true"
      />
      {/* Overlay for depth or abstract patterns later, currently subtle */}
      <div className="absolute inset-0 bg-black/20 -z-10" aria-hidden="true"></div>
      
      <div className="relative z-10 w-full max-w-3xl px-6 sm:px-10 md:px-16 lg:px-24 py-20 md:py-32">
        <AnimatedText 
          as="h1" 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serifDisplay text-palm-off-white mb-6 leading-tight" // serifDisplay is now Manrope
          isPageScrolling={isPageScrolling}
        >
          {heroContent.headline}
        </AnimatedText>
        <AnimatedText 
          as="p" 
          className="text-lg md:text-xl text-palm-soft-lavender mb-10 max-w-2xl mx-auto" // Use a softer supporting color
          delay="delay-300"
          isPageScrolling={isPageScrolling}
        >
          {heroContent.subhead}
        </AnimatedText>
        <AnimatedText 
          as="div" 
          delay="delay-500"
          isPageScrolling={isPageScrolling}
        >
          <Button 
            onClick={() => navigateTo?.('main', 'new-contact')}
            variant="primary" 
            size="lg"
            // New primary button style for dark theme
            className="bg-palm-luminous-teal text-palm-dark-indigo hover:bg-opacity-80 shadow-lg hover:shadow-palm-luminous-teal/30" 
          >
            {heroContent.cta}
          </Button>
        </AnimatedText>
      </div>

      {!isLastSection && onNavigateNext && ( 
        <button
          onClick={onNavigateNext}
          aria-label="Pređi na sledeću sekciju"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 p-2 text-palm-off-white hover:text-palm-luminous-teal transition-colors duration-300 animate-bounce focus:outline-none focus:ring-2 focus:ring-palm-luminous-teal rounded-full"
        >
          <DownArrowIcon className="h-8 w-8" />
        </button>
      )}
    </div>
  );
};

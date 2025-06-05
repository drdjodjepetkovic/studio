import React from 'react';
import { SectionProps } from '../../types';
import { SectionWrapper } from '../ui/SectionWrapper';
import { AnimatedText } from '../ui/AnimatedText';
import { Button } from '../ui/Button';
import { sectionText, SearchIcon } from '../../constants';

interface PriceListSectionProps extends SectionProps {
  onNavigateToDetail: () => void;
  isLastSection?: boolean;
  onNavigateNext?: () => void;
  isPageScrolling?: boolean; // New prop
}

export const PriceListSection: React.FC<PriceListSectionProps> = ({ id, onNavigateToDetail, isLastSection, onNavigateNext, isPageScrolling }) => {
  const content = sectionText.pricelist;

  return (
    <SectionWrapper 
      id={id} 
      className=""
      isLastSection={isLastSection}
      onNavigateNext={onNavigateNext}
    >
      <AnimatedText 
        as="h2" 
        className="text-3xl md:text-4xl lg:text-5xl font-serifDisplay text-palm-luminous-teal mb-6"
        isPageScrolling={isPageScrolling}
      >
        {content.headline}
      </AnimatedText>
      <AnimatedText 
        as="p" 
        className="text-lg md:text-xl text-palm-soft-lavender mb-8 max-w-2xl mx-auto leading-relaxed" 
        delay="delay-200"
        isPageScrolling={isPageScrolling}
      >
        {content.subhead}
      </AnimatedText>

      <AnimatedText 
        as="div" 
        className="mb-8 w-full max-w-md mx-auto relative" 
        delay="delay-300"
        isPageScrolling={isPageScrolling}
      >
        <input
          type="text" 
          id="pricelist-search-trigger"
          name="pricelist-search-trigger"
          placeholder="Pretražite usluge..."
          aria-label="Pretražite usluge na cenovniku (dekorativno)"
          readOnly 
          className="w-full px-4 py-3 bg-white border-2 border-palm-pink-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-palm-pink-300/50 placeholder-palm-gray-400 text-palm-gray-700 cursor-pointer"
          onClick={onNavigateToDetail}
          autoComplete="off"
        />
        <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-palm-pink-400 pointer-events-none" />
      </AnimatedText>
      
      <AnimatedText 
        as="div" 
        delay="delay-400" 
        className="mt-6"
        isPageScrolling={isPageScrolling}
      >
        <Button onClick={onNavigateToDetail} variant="primary" size="lg">
          {content.viewFullCta}
        </Button>
      </AnimatedText>

      <AnimatedText 
        as="p" 
        className="text-xs text-palm-gray-400 mt-10 text-center" 
        delay="delay-500"
        isPageScrolling={isPageScrolling}
      >
        {content.disclaimer}
      </AnimatedText>
      
    </SectionWrapper>
  );
};
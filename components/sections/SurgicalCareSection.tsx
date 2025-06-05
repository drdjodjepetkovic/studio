import React from 'react';
import { SectionProps } from '../../types';
import { SectionWrapper } from '../ui/SectionWrapper';
import { AnimatedText } from '../ui/AnimatedText';
import { Button } from '../ui/Button';
import { sectionText } from '../../constants';

interface SurgicalCareSectionProps extends SectionProps {
  isLastSection?: boolean;
  onNavigateNext?: () => void;
  isPageScrolling?: boolean; 
  onNavigateToTeamDetail?: () => void;
}

export const SurgicalCareSection: React.FC<SurgicalCareSectionProps> = ({ 
  id = "surgical-care", 
  isLastSection, 
  onNavigateNext, 
  isPageScrolling,
  onNavigateToTeamDetail
}) => {
  const surgicalContent = sectionText.surgical;
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
        {surgicalContent.headline}
      </AnimatedText>
      <AnimatedText 
        as="p" 
        className="text-lg md:text-xl text-palm-soft-lavender mb-10 max-w-xl mx-auto leading-relaxed" 
        delay="delay-200"
        isPageScrolling={isPageScrolling}
      >
        {surgicalContent.subhead}
      </AnimatedText>

      {surgicalContent.imageUrl && (
         <AnimatedText 
          as="figure" 
          className="my-8 md:my-10 max-w-lg lg:max-w-xl mx-auto"
          delay="delay-250"
          isPageScrolling={isPageScrolling}
        >
          <img 
            src={surgicalContent.imageUrl} 
            alt="Precizna hirurška nega u ordinaciji Palmotićeva" 
            className="rounded-lg shadow-xl w-full h-auto object-cover" 
          />
        </AnimatedText>
      )}

      <AnimatedText 
        as="p" 
        className="text-md md:text-lg text-palm-off-white mb-10 max-w-2xl mx-auto leading-relaxed" 
        delay="delay-300"
        isPageScrolling={isPageScrolling}
      >
        U našoj ordinaciji obavljamo manje ginekološke intervencije u lokalnoj anesteziji, uz poštovanje najviših standarda sterilnosti i bezbednosti. Naš tim je posvećen pružanju nege koja minimizira nelagodnost i pospešuje brz oporavak.
      </AnimatedText>
      <AnimatedText 
        as="div" 
        delay="delay-400"
        isPageScrolling={isPageScrolling}
      >
        <Button 
          onClick={onNavigateToTeamDetail} 
          variant="primary" 
          size="md" 
          arrow
        > 
          {surgicalContent.cta}
        </Button>
      </AnimatedText>
    </SectionWrapper>
  );
};
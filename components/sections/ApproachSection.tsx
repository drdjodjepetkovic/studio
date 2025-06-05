import React from 'react';
import { SectionProps } from '../../types';
import { SectionWrapper } from '../ui/SectionWrapper';
import { AnimatedText } from '../ui/AnimatedText';
import { Button } from '../ui/Button';
import { sectionText } from '../../constants'; 

interface ApproachSectionProps extends SectionProps {
  isLastSection?: boolean;
  onNavigateNext?: () => void;
  isPageScrolling?: boolean; 
  onNavigateToServicesDetail?: () => void; // New prop
}

export const ApproachSection: React.FC<ApproachSectionProps> = ({ 
  id = "approach", 
  isLastSection, 
  onNavigateNext, 
  isPageScrolling,
  onNavigateToServicesDetail // Destructure new prop
}) => {
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
        {sectionText.approach.headline}
      </AnimatedText>
      <AnimatedText 
        as="p" 
        className="text-lg md:text-xl text-palm-soft-lavender mb-10 max-w-xl mx-auto leading-relaxed" 
        delay="delay-200"
        isPageScrolling={isPageScrolling}
      >
       {sectionText.approach.subhead}
      </AnimatedText>
      <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto text-left">
        <AnimatedText 
          as="div" 
          delay="delay-300"
          isPageScrolling={isPageScrolling}
        >
          <h3 className="font-serifDisplay text-xl text-palm-luminous-teal mb-2">Empatija na Prvom Mestu</h3>
          <p className="text-palm-off-white">Svaka konsultacija započinje razumevanjem Vaše jedinstvene priče, briga i težnji ka zdravlju.</p>
        </AnimatedText>
        <AnimatedText 
          as="div" 
          delay="delay-400"
          isPageScrolling={isPageScrolling}
        >
          <h3 className="font-serifDisplay text-xl text-palm-luminous-teal mb-2">Naučno Potkovano</h3>
          <p className="text-palm-off-white">Koristimo najnovija medicinska dostignuća i prakse zasnovane na dokazima kako bismo osigurali optimalne rezultate.</p>
        </AnimatedText>
      </div>
      <AnimatedText 
        as="div" 
        delay="delay-500" 
        className="mt-12"
        isPageScrolling={isPageScrolling}
      >
        <Button 
          onClick={onNavigateToServicesDetail} // Use onClick to navigate
          variant="primary" 
          size="md" 
          arrow
        >
          {sectionText.approach.cta}
        </Button>
      </AnimatedText>
    </SectionWrapper>
  );
};
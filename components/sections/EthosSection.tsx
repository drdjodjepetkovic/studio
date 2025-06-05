import React from 'react';
import { SectionProps } from '../../types';
import { SectionWrapper } from '../ui/SectionWrapper';
import { AnimatedText } from '../ui/AnimatedText';
import { Button } from '../ui/Button';
import { sectionText } from '../../constants';

interface EthosSectionProps extends SectionProps {
  isLastSection?: boolean;
  onNavigateNext?: () => void;
  isPageScrolling?: boolean;
  onNavigateToApproachDetail?: () => void;
}

export const EthosSection: React.FC<EthosSectionProps> = ({ 
  id = "ethos", 
  isLastSection, 
  onNavigateNext, 
  isPageScrolling,
  onNavigateToApproachDetail
}) => {
  const ethosContent = sectionText.ethos;
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
        {ethosContent.headline}
      </AnimatedText>
      <AnimatedText 
        as="p" 
        className="text-lg md:text-xl text-palm-soft-lavender mb-8 max-w-2xl mx-auto leading-relaxed" 
        delay="delay-200"
        isPageScrolling={isPageScrolling}
      >
        {ethosContent.subhead}
      </AnimatedText>

      {ethosContent.imageUrl && (
        <AnimatedText 
          as="figure" 
          className="my-8 md:my-12 max-w-lg lg:max-w-xl mx-auto"
          delay="delay-300"
          isPageScrolling={isPageScrolling}
        >
          <img 
            src={ethosContent.imageUrl} 
            alt="Ilustracija filozofije ordinacije Palmotićeva" 
            className="rounded-lg shadow-xl w-full h-auto object-cover" 
          />
        </AnimatedText>
      )}

      <AnimatedText 
        as="p" 
        className="text-md md:text-lg text-palm-off-white mb-10 max-w-3xl mx-auto leading-relaxed" 
        delay="delay-400" // Adjusted delay
        isPageScrolling={isPageScrolling}
      >
        Dobrodošli u Ginekološku Ordinaciju Palmotićeva. Naša misija je da svaka pacijentkinja dobije individualizovan pristup, osećaj sigurnosti i stručnu podršku u svim fazama života. Verujemo da je poverenje ključ uspešnog lečenja, zato težimo da izgradimo dugoročan odnos sa našim pacijentkinjama, zasnovan na otvorenoj komunikaciji, razumevanju i poštovanju.
      </AnimatedText>
      <AnimatedText 
        as="div" 
        delay="delay-500" // Adjusted delay
        isPageScrolling={isPageScrolling}
      >
        <Button 
          onClick={onNavigateToApproachDetail}
          variant="primary" 
          size="md" 
          arrow
        >
          {ethosContent.cta}
        </Button>
      </AnimatedText>
    </SectionWrapper>
  );
};
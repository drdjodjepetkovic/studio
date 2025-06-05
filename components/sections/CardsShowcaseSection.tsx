import React from 'react';
import { SectionProps } from '../../types';
import { SectionWrapper } from '../ui/SectionWrapper';
import { AnimatedText } from '../ui/AnimatedText';
import { Button } from '../ui/Button';
import { PlaceholderSparkleIcon, sectionText } from '../../constants';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

interface ShowcaseCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  icon?: React.ReactNode;
  ctaText?: string;
  ctaHref?: string;
  delay?: string;
  className?: string;
  isPageScrolling?: boolean;
}

const ShowcaseCard: React.FC<ShowcaseCardProps> = ({ 
  title, 
  description, 
  imageUrl, 
  icon, 
  ctaText, 
  ctaHref, 
  delay = 'delay-0', 
  className,
  isPageScrolling 
}) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, once: true }, isPageScrolling);
  return (
    <div
      ref={ref}
      className={`bg-palm-white/60 backdrop-blur-md p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-500 ease-out flex flex-col text-left h-full ${delay} ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'} ${className || ''}`}
    >
      {imageUrl && (
        <img src={imageUrl} alt={title} className="rounded-md mb-4 aspect-video object-cover w-full" />
      )}
      {icon && (
        <div className="text-palm-mauve-dark mb-3 self-start">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-serifDisplay text-palm-mauve-dark mb-2">{title}</h3>
      <p className="text-palm-gray-600 text-sm leading-relaxed flex-grow">{description}</p>
      {ctaText && ctaHref && (
        <div className="mt-auto pt-4"> {/* Ensure button is at the bottom */}
          <Button href={ctaHref} variant="outline" size="sm" arrow>
            {ctaText}
          </Button>
        </div>
      )}
    </div>
  );
};

interface CardsShowcaseSectionProps extends SectionProps {
  isLastSection?: boolean;
  onNavigateNext?: () => void;
  isPageScrolling?: boolean;
}

export const CardsShowcaseSection: React.FC<CardsShowcaseSectionProps> = ({ 
  id, 
  isLastSection, 
  onNavigateNext, 
  isPageScrolling 
}) => {
  const cardTexts = sectionText.showcase.cards;
  const showcaseContent = sectionText.showcase;


  const cards: ShowcaseCardProps[] = [
    {
      title: cardTexts.card1Title,
      description: cardTexts.card1Description,
      imageUrl: cardTexts.card1ImageUrl, // Using image URL from constants
      icon: <PlaceholderSparkleIcon className="w-8 h-8" />,
      ctaText: cardTexts.card1Cta,
      ctaHref: '#showcase-detail-1', // Example link, adjust as needed
      delay: 'delay-300',
      isPageScrolling: isPageScrolling,
    },
    {
      title: cardTexts.card2Title,
      description: cardTexts.card2Description,
      imageUrl: cardTexts.card2ImageUrl, // Using image URL from constants
      // Consider a different icon for visual distinction if desired
      // icon: <SomeOtherIcon className="w-8 h-8" />, 
      ctaText: cardTexts.card2Cta,
      ctaHref: '#showcase-detail-2', // Example link, adjust as needed
      delay: 'delay-400',
      isPageScrolling: isPageScrolling,
    },
  ];

  return (
    <SectionWrapper 
      id={id} 
      className="" 
      fullHeight={false} // Or true, depending on design
      isLastSection={isLastSection}
      onNavigateNext={onNavigateNext}
    >
      <AnimatedText 
        as="h2" 
        className="text-3xl md:text-4xl lg:text-5xl font-serifDisplay text-palm-luminous-teal mb-6"
        isPageScrolling={isPageScrolling}
      >
        {showcaseContent.headline}
      </AnimatedText>
      <AnimatedText 
        as="p" 
        className="text-lg md:text-xl text-palm-soft-lavender mb-12 max-w-xl mx-auto leading-relaxed" 
        delay="delay-200"
        isPageScrolling={isPageScrolling}
      >
        {showcaseContent.subhead}
      </AnimatedText>

      <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
        {cards.map((card, index) => (
          <ShowcaseCard 
            key={index} // Using index as key if no unique id is available on card object
            title={card.title}
            description={card.description}
            imageUrl={card.imageUrl}
            icon={card.icon}
            ctaText={card.ctaText}
            ctaHref={card.ctaHref}
            delay={card.delay}
            isPageScrolling={card.isPageScrolling}
          />
        ))}
      </div>
    </SectionWrapper>
  );
};
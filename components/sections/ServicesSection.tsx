
import React from 'react';
import { SectionProps, Service } from '../../types';
import { SectionWrapper } from '../ui/SectionWrapper';
import { AnimatedText } from '../ui/AnimatedText';
import { Button } from '../ui/Button';
import { sectionText } from '../../constants';
import { useScrollAnimation } from '../../hooks/useScrollAnimation'; 

interface ServicesSectionProps extends SectionProps {
  isLastSection?: boolean;
  onNavigateNext?: () => void;
  isPageScrolling?: boolean; 
}

// Updated ServiceCardProps to expect service with potential imageUrl
interface ServiceCardProps {
  service: Service; // Service type from types.ts now includes optional imageUrl
  delay: string;
  isPageScrolling?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, delay, isPageScrolling }) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, once: true }, isPageScrolling);
  return (
    <div
      ref={ref}
      className={`bg-palm-white/50 backdrop-blur-md rounded-lg shadow-lg hover:shadow-xl transition-all duration-500 ease-out flex flex-col overflow-hidden ${delay} ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}
    >
      {service.imageUrl && (
        <img 
          src={service.imageUrl} 
          alt={`Ilustracija za ${service.title}`} 
          className="w-full h-48 object-cover" // Consistent height for images
        />
      )}
      <div className="p-6 flex-grow flex flex-col"> {/* Added flex-grow and flex-col for content alignment */}
        <h3 className="text-xl font-serifDisplay text-palm-mauve-dark mb-2">{service.title}</h3>
        <p className="text-palm-gray-600 text-sm leading-relaxed flex-grow">{service.description}</p>
      </div>
    </div>
  );
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ id = "services", isLastSection, onNavigateNext, isPageScrolling }) => {
  return (
    <SectionWrapper 
      id={id} 
      className=""
      isLastSection={isLastSection}
      onNavigateNext={onNavigateNext}
    >
      <AnimatedText 
        as="h2" 
        className="text-3xl md:text-4xl lg:text-5xl font-serifDisplay text-palm-gray-800 mb-6"
        isPageScrolling={isPageScrolling}
      >
        {sectionText.services.headline}
      </AnimatedText>
      <AnimatedText 
        as="p" 
        className="text-lg md:text-xl text-palm-gray-600 mb-12 max-w-xl mx-auto leading-relaxed" 
        delay="delay-200"
        isPageScrolling={isPageScrolling}
      >
        {sectionText.services.subhead}
      </AnimatedText>
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
        {sectionText.services.items.map((service, index) => (
          <ServiceCard 
            key={service.id} 
            service={service} // service object now includes imageUrl
            delay={`delay-${(index + 1) * 100}`} 
            isPageScrolling={isPageScrolling} 
          />
        ))}
      </div>
       <AnimatedText 
        as="div" 
        delay="delay-500" 
        className="mt-12"
        isPageScrolling={isPageScrolling}
      >
        <Button href="#surgical-care" variant="secondary" size="md" arrow>
          {sectionText.services.cta}
        </Button>
      </AnimatedText>
    </SectionWrapper>
  );
};
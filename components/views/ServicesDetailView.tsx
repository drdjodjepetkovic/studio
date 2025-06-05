
import React, { useEffect } from 'react';
import { AnimatedText } from '../ui/AnimatedText';
import { Button } from '../ui/Button';
import { sectionText, CheckCircleIcon, LuminousPathwaysMotif, ArrowLeftIcon } from '../../constants';

interface ServiceDetailItem {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  keyBenefits: string[];
  icon: React.FC<{ className?: string }>;
}

interface ServicesDetailViewProps {
  onGoBack: () => void; // New prop for general back navigation
  onNavigateToMainSection: (targetId: string) => void; // Kept for specific navigation if needed elsewhere
}

export const ServicesDetailView: React.FC<ServicesDetailViewProps> = ({ onGoBack, onNavigateToMainSection }) => {
  const content = sectionText.servicesDetail;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!content || !content.services) return null; 

  return (
    <div className="relative min-h-screen py-20 md:py-28 px-4 sm:px-8 md:px-12 lg:px-20 flex flex-col items-center bg-palm-white overflow-hidden text-palm-gray-800">
      <div className="absolute inset-0 -z-10 opacity-50">
        <LuminousPathwaysMotif />
      </div>
      <div className="relative z-0 w-full max-w-4xl text-center">
        <AnimatedText 
          as="h1" 
          className="text-4xl sm:text-5xl font-serifDisplay text-palm-gray-800 mb-8"
        >
          {content.headline}
        </AnimatedText>

        <AnimatedText 
          as="p" 
          className="text-lg md:text-xl text-palm-gray-600 mb-12 leading-relaxed text-left max-w-3xl mx-auto" 
          delay="delay-100"
        >
          {content.intro}
        </AnimatedText>

        <div className="space-y-12 text-left">
          {content.services.map((service: ServiceDetailItem, sIndex: number) => (
            <AnimatedText 
              key={service.id} 
              as="section" 
              className="bg-palm-white/70 backdrop-blur-md p-6 md:p-8 rounded-xl shadow-xl" 
              delay={`delay-${(sIndex + 2) * 100}`}
            >
              <div className="flex items-center mb-4">
                <service.icon className="w-8 h-8 mr-4 text-palm-pink-500 flex-shrink-0" />
                <h2 className="text-2xl md:text-3xl font-serifDisplay text-palm-mauve-dark">
                  {service.title}
                </h2>
              </div>
              <AnimatedText 
                as="p" 
                className="text-palm-gray-600 italic mb-4"
                delay={`delay-${(sIndex * 4 + 1) * 70}`}
              >
                {service.shortDescription}
              </AnimatedText>
              <AnimatedText 
                as="p" 
                className="text-palm-gray-700 mb-6 leading-relaxed"
                delay={`delay-${(sIndex * 4 + 2) * 70}`}
              >
                {service.longDescription}
              </AnimatedText>
              
              {service.keyBenefits && service.keyBenefits.length > 0 && (
                <>
                  <h3 className="text-lg font-serifDisplay text-palm-mauve-dark mb-3">Ključne Prednosti:</h3>
                  <ul className="space-y-2.5 mb-4">
                    {service.keyBenefits.map((benefit: string, bIndex: number) => (
                      <AnimatedText 
                        key={bIndex} 
                        as="li" 
                        className="flex items-start text-palm-gray-700"
                        delay={`delay-${(sIndex * 4 + bIndex + 3) * 70}`}
                      >
                        <CheckCircleIcon className="w-5 h-5 mr-3 mt-1 text-palm-pink-500 flex-shrink-0" />
                        <span>{benefit}</span>
                      </AnimatedText>
                    ))}
                  </ul>
                </>
              )}
            </AnimatedText>
          ))}
        </div>

        <AnimatedText 
          as="p" 
          className="text-lg md:text-xl text-palm-gray-700 mt-16 mb-10 leading-relaxed text-left max-w-3xl mx-auto" 
          delay={`delay-${(content.services.length + 2) * 100}`}
        >
          {content.closing}
        </AnimatedText>
        
        <AnimatedText 
          as="div" 
          className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6" 
          delay={`delay-${(content.services.length + 3) * 100}`}
        >
            <Button 
              onClick={() => onNavigateToMainSection('new-contact')}
              variant="primary"
              size="lg"
              arrow 
            >
              {content.appointmentCta}
            </Button>
            <Button 
              onClick={onGoBack} // Changed to use onGoBack
              variant="secondary"
              size="md"
            >
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              {content.backButtonCta || "Nazad"} 
            </Button>
        </AnimatedText>
      </div>
    </div>
  );
};
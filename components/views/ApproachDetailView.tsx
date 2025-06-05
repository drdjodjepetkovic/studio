
import React, { useEffect } from 'react';
import { AnimatedText } from '../ui/AnimatedText';
import { Button } from '../ui/Button';
import { sectionText, CheckCircleIcon, GentleCurrentsMotif, ArrowLeftIcon } from '../../constants';

interface ApproachDetailViewProps {
  onGoBack: () => void; // Changed from onNavigateBack
}

export const ApproachDetailView: React.FC<ApproachDetailViewProps> = ({ onGoBack }) => {
  const content = sectionText.approachDetail;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!content) return null; 

  return (
    <div className="relative min-h-screen py-20 md:py-28 px-4 sm:px-8 md:px-12 lg:px-20 flex flex-col items-center bg-palm-white overflow-hidden text-palm-gray-800">
      <div className="absolute inset-0 -z-10 opacity-50">
        <GentleCurrentsMotif />
      </div>
      <div className="relative z-0 w-full max-w-3xl text-center">
        <AnimatedText 
          as="h1" 
          className="text-4xl sm:text-5xl font-serifDisplay text-palm-gray-800 mb-8"
        >
          {content.headline}
        </AnimatedText>

        <AnimatedText 
          as="p" 
          className="text-lg md:text-xl text-palm-gray-600 mb-12 leading-relaxed text-left" 
          delay="delay-100"
        >
          {content.intro}
        </AnimatedText>

        <div className="space-y-10 text-left">
          {content.pillars.map((pillar: any, pIndex: number) => (
            <AnimatedText 
              key={pillar.id} 
              as="section" 
              className="bg-palm-white/70 backdrop-blur-md p-6 md:p-8 rounded-xl shadow-xl" 
              delay={`delay-${(pIndex + 2) * 100}`}
            >
              <h2 className="text-2xl md:text-3xl font-serifDisplay text-palm-pink-500 mb-6">
                {pillar.title}
              </h2>
              <ul className="space-y-3">
                {pillar.points.map((point: string, pointIndex: number) => (
                  <AnimatedText 
                    key={pointIndex} 
                    as="li" 
                    className="flex items-start text-palm-gray-700"
                    delay={`delay-${(pIndex * 4 + pointIndex + 3) * 50}`} 
                   >
                    <CheckCircleIcon className="w-5 h-5 mr-3 mt-1 text-palm-mauve-dark flex-shrink-0" />
                    <span>{point}</span>
                  </AnimatedText>
                ))}
              </ul>
            </AnimatedText>
          ))}
        </div>

        <AnimatedText 
          as="p" 
          className="text-lg md:text-xl text-palm-gray-700 mt-12 mb-10 leading-relaxed text-left italic" 
          delay={`delay-${(content.pillars.length + 2) * 100}`}
        >
          {content.closing}
        </AnimatedText>
        
        <AnimatedText 
          as="div" 
          className="mt-12" 
          delay={`delay-${(content.pillars.length + 3) * 100}`}
        >
            <Button 
              onClick={onGoBack}
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
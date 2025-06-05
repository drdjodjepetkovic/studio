
import React, { useEffect } from 'react';
import { AnimatedText } from '../ui/AnimatedText';
import { Button } from '../ui/Button';
import { sectionText, teamMembers, PhoneIcon, EmailIcon, GentleCurrentsMotif, ArrowLeftIcon } from '../../constants';
import { TeamMember } from '../../types'; // Import shared TeamMember type

interface TeamDetailViewProps {
  onGoBack: () => void; 
  onNavigateToContact: () => void;
}

export const TeamDetailView: React.FC<TeamDetailViewProps> = ({ onGoBack, onNavigateToContact }) => {
  const content = sectionText.teamDetail;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!content || !teamMembers) return null;

  return (
    <div className="relative min-h-screen py-20 md:py-28 px-4 sm:px-8 md:px-12 lg:px-20 flex flex-col items-center bg-palm-white overflow-hidden text-palm-gray-800">
      <div className="absolute inset-0 -z-10 opacity-50">
        <GentleCurrentsMotif />
      </div>
      <div className="relative z-0 w-full max-w-5xl text-center">
        <AnimatedText 
          as="h1" 
          className="text-4xl sm:text-5xl font-serifDisplay text-palm-gray-800 mb-8"
        >
          {content.headline}
        </AnimatedText>

        <AnimatedText 
          as="p" 
          className="text-lg md:text-xl text-palm-gray-600 mb-16 leading-relaxed max-w-3xl mx-auto" 
          delay="delay-100"
        >
          {content.intro}
        </AnimatedText>

        <div className="space-y-16">
          {teamMembers.map((member: TeamMember, index: number) => (
            <AnimatedText
              key={member.id}
              as="article"
              className="grid md:grid-cols-12 gap-8 items-start bg-palm-white/70 backdrop-blur-md p-6 md:p-10 rounded-xl shadow-xl overflow-hidden"
              delay={`delay-${(index + 2) * 150}`}
            >
              <div className="md:col-span-4 lg:col-span-3 flex justify-center md:justify-start">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-48 h-60 md:w-full md:h-auto aspect-[4/5] object-cover rounded-lg shadow-md filter grayscale transition-all duration-500 hover:filter-none"
                  style={{ filter: 'grayscale(80%)' }}
                  onMouseOver={e => e.currentTarget.style.filter = 'grayscale(0%)'}
                  onMouseOut={e => e.currentTarget.style.filter = 'grayscale(80%)'}
                />
              </div>
              <div className="md:col-span-8 lg:col-span-9 text-left">
                <AnimatedText as="h2" className="text-2xl md:text-3xl font-serifDisplay text-palm-mauve-dark mb-1" delay={`delay-${(index + 2) * 150 + 50}`}>
                  {member.name}
                </AnimatedText>
                <AnimatedText as="p" className="text-md text-palm-pink-text font-semibold mb-4" delay={`delay-${(index + 2) * 150 + 100}`}>
                  {member.title}
                </AnimatedText>
                <div className="text-palm-gray-700 space-y-3 leading-relaxed text-sm md:text-base">
                  {member.bio.split('\n').map((paragraph, pIndex) => (
                    <AnimatedText key={pIndex} as="p" delay={`delay-${(index + 2) * 150 + 150 + pIndex * 50}`}>
                      {paragraph}
                    </AnimatedText>
                  ))}
                </div>
                {member.contacts && (Object.keys(member.contacts).length > 0) && (
                  <div className="mt-6 space-y-2 text-sm">
                    {member.contacts.phone && (
                      <AnimatedText as="p" className="flex items-center" delay={`delay-${(index + 2) * 150 + 200}`}>
                        <PhoneIcon className="w-4 h-4 mr-2 text-palm-mauve-dark flex-shrink-0" />
                        <a href={`tel:${member.contacts.phone.replace(/\s/g, '')}`} className="text-palm-mauve-dark hover:underline">
                          {member.contacts.phone}
                        </a>
                      </AnimatedText>
                    )}
                    {member.contacts.email && (
                      <AnimatedText as="p" className="flex items-center" delay={`delay-${(index + 2) * 150 + 250}`}>
                        <EmailIcon className="w-4 h-4 mr-2 text-palm-mauve-dark flex-shrink-0" />
                        <a href={`mailto:${member.contacts.email}`} className="text-palm-mauve-dark hover:underline break-all">
                          {member.contacts.email}
                        </a>
                      </AnimatedText>
                    )}
                  </div>
                )}
              </div>
            </AnimatedText>
          ))}
        </div>
        
        <AnimatedText 
          as="div" 
          className="mt-20 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6" 
          delay={`delay-${(teamMembers.length + 3) * 100}`}
        >
            <Button 
              onClick={onNavigateToContact}
              variant="primary"
              size="lg"
              arrow 
            >
              {content.contactCta}
            </Button>
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

import React from 'react';
import { SectionProps } from '../../types';
import { SectionWrapper } from '../ui/SectionWrapper';
import { AnimatedText } from '../ui/AnimatedText';
// import { Button } from '../ui/Button'; // Not needed for this section's CTA
import { sectionText, teamMembers, PhoneIcon } from '../../constants';

interface TeamMemberSlobodankaSectionProps extends SectionProps {
  isLastSection?: boolean;
  onNavigateNext?: () => void;
  isPageScrolling?: boolean;
}

export const TeamMemberSlobodankaSection: React.FC<TeamMemberSlobodankaSectionProps> = ({ 
  id = "team-member-slobodanka", 
  isLastSection, 
  onNavigateNext, 
  isPageScrolling 
}) => {
  const member = teamMembers[0]; // Dr. Slobodanka Petković
  const content = sectionText.teamMemberSlobodanka;

  if (!member) return null; // Should not happen if teamMembers is populated

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
        className="text-lg md:text-xl text-palm-soft-lavender mb-12 max-w-2xl mx-auto leading-relaxed" 
        delay="delay-200"
        isPageScrolling={isPageScrolling}
      >
        {content.subhead}
      </AnimatedText>
      
      <AnimatedText 
        as="article" 
        className="grid md:grid-cols-12 gap-6 md:gap-8 items-start bg-palm-white/60 backdrop-blur-md p-6 md:p-8 rounded-lg shadow-xl overflow-hidden max-w-4xl mx-auto"
        delay="delay-300"
        isPageScrolling={isPageScrolling}
      >
        <div className="md:col-span-4 lg:col-span-3">
          <img 
            src={member.imageUrl} 
            alt={member.name} 
            className="w-full h-auto aspect-[4/5] object-cover rounded-md shadow-md filter grayscale transition-all duration-500 hover:filter-none"
            style={{ filter: 'grayscale(100%)' }} 
            onMouseOver={e => e.currentTarget.style.filter = 'grayscale(0%)'}
            onMouseOut={e => e.currentTarget.style.filter = 'grayscale(100%)'}
          />
        </div>
        <div className="md:col-span-8 lg:col-span-9 text-left">
          <h3 className="text-2xl md:text-3xl font-serifDisplay text-palm-mauve-dark mb-1">{member.name}</h3>
          <p className="text-md text-palm-pink-text font-semibold mb-4">{member.title}</p>
          <div className="text-palm-gray-700 space-y-3 leading-relaxed text-sm md:text-base">
            {member.bio.split('\n').map((paragraph, pIndex) => (
              <p key={pIndex}>{paragraph}</p>
            ))}
          </div>
          {member.contacts && Object.keys(member.contacts).length > 0 && (
            <div className="mt-4 space-y-1 text-sm">
              {member.contacts.phone && (
                <p>
                  <PhoneIcon className="inline h-4 w-4 mr-2 text-palm-mauve-dark" />
                  <a href={`tel:${member.contacts.phone.replace(/\s/g, '')}`} className="text-palm-mauve-dark hover:underline">
                    {member.contacts.phone}
                  </a>
                </p>
              )}
              {member.contacts.email && (
                <p>
                  <svg xmlns="http://www.w3.org/2000/svg" className="inline h-4 w-4 mr-2 text-palm-mauve-dark" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <a href={`mailto:${member.contacts.email}`} className="text-palm-mauve-dark hover:underline">
                    {member.contacts.email}
                  </a>
                </p>
              )}
            </div>
          )}
        </div>
      </AnimatedText>
      {/* No specific CTA button here, relies on SectionWrapper's down arrow for navigation to next doctor */}
    </SectionWrapper>
  );
};
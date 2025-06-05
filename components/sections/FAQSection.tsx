import React, { useState } from 'react';
import { SectionProps } from '../../types';
import { SectionWrapper } from '../ui/SectionWrapper';
import { AnimatedText } from '../ui/AnimatedText';
import { Button } from '../ui/Button';
import { sectionText, faqs, PlusIcon, MinusIcon } from '../../constants';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

interface FAQItemProps {
  faq: typeof faqs[0];
  delay: string;
  isPageScrolling?: boolean; // New prop for FAQItem
}
interface FAQSectionProps extends SectionProps {
  isLastSection?: boolean;
  onNavigateNext?: () => void;
  isPageScrolling?: boolean; // New prop
}

const FAQItem: React.FC<FAQItemProps> = ({ faq, delay, isPageScrolling }) => {
  const [isOpen, setIsOpen] = useState(false);
  // Pass isPageScrolling to useScrollAnimation
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, once: true }, isPageScrolling);
  const answerId = `faq-answer-${faq.id}`;
  const questionId = `faq-question-${faq.id}`;

  return (
    <div
      ref={ref}
      className={`bg-palm-white/70 backdrop-blur-md rounded-lg shadow-lg transition-all duration-500 ease-out ${delay} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <h3>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={answerId}
          id={questionId}
          onClick={() => setIsOpen(!isOpen)}
          className="flex justify-between items-center w-full p-5 md:p-6 text-left font-serifDisplay text-lg text-palm-mauve-dark hover:bg-palm-pink-50 transition-colors duration-200 rounded-t-lg focus:outline-none focus:ring-2 focus:ring-palm-mauve-dark focus:ring-inset"
        >
          <span>{faq.question}</span>
          {isOpen ? <MinusIcon className="w-5 h-5 text-palm-pink-500" /> : <PlusIcon className="w-5 h-5 text-palm-mauve-dark" />}
        </button>
      </h3>
      <div
        id={answerId}
        role="region"
        aria-labelledby={questionId}
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-5 md:p-6 border-t border-palm-pink-100 text-palm-gray-700 text-sm md:text-base leading-relaxed">
          {faq.answer.split('\n').map((paragraph, pIndex) => (
            <p key={pIndex} className={pIndex > 0 ? 'mt-2' : ''}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export const FAQSection: React.FC<FAQSectionProps> = ({ id = "faq", isLastSection, onNavigateNext, isPageScrolling }) => {
  const content = sectionText.faq;

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

      <div className="space-y-4 max-w-3xl mx-auto">
        {faqs.map((faqItem, index) => (
          <FAQItem 
            key={faqItem.id} 
            faq={faqItem} 
            delay={`delay-${(index + 1) * 100}`} 
            isPageScrolling={isPageScrolling} // Pass prop
          />
        ))}
      </div>
      
      <AnimatedText 
        as="div" 
        delay="delay-600" 
        className="mt-12"
        isPageScrolling={isPageScrolling}
      >
        <Button href="#new-contact" variant="primary" size="md" arrow>
          {content.cta}
        </Button>
      </AnimatedText>
    </SectionWrapper>
  );
};
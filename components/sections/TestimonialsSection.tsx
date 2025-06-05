import React from 'react';
import { SectionProps } from '../../types';
import { SectionWrapper } from '../ui/SectionWrapper';
import { AnimatedText } from '../ui/AnimatedText';
import { Button } from '../ui/Button';
import { sectionText, testimonials, StarIcon } from '../../constants';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

interface TestimonialCardProps {
  testimonial: typeof testimonials[0];
  delay: string;
  isPageScrolling?: boolean; // New prop for TestimonialCard
}

interface TestimonialsSectionProps extends SectionProps {
  isLastSection?: boolean;
  onNavigateNext?: () => void;
  isPageScrolling?: boolean; // New prop
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, delay, isPageScrolling }) => {
  // Pass isPageScrolling to useScrollAnimation
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, once: true }, isPageScrolling);
  return (
    <div
      ref={ref}
      className={`bg-palm-white/70 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-out flex flex-col text-left h-full ${delay} ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}
    >
      <div className="flex items-center mb-3">
        {[...Array(testimonial.stars)].map((_, i) => (
          <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
        ))}
         {[...Array(5 - testimonial.stars)].map((_, i) => (
          <StarIcon key={`empty-${i}`} className="w-5 h-5 text-palm-gray-300" />
        ))}
      </div>
      <blockquote className="text-palm-gray-700 text-sm md:text-base leading-relaxed flex-grow italic mb-4">
        "{testimonial.review}"
      </blockquote>
      <footer className="mt-auto pt-3 border-t border-palm-pink-100">
        <p className="font-semibold text-palm-mauve-dark text-sm">{testimonial.name}</p>
        <p className="text-xs text-palm-gray-500">{testimonial.date}</p>
      </footer>
    </div>
  );
};

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ id = "testimonials", isLastSection, onNavigateNext, isPageScrolling }) => {
  const content = sectionText.testimonials;

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

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard 
            key={testimonial.id} 
            testimonial={testimonial} 
            delay={`delay-${(index + 1) * 150}`} 
            isPageScrolling={isPageScrolling} // Pass prop
          />
        ))}
      </div>
      
      <AnimatedText 
        as="div" 
        delay="delay-700" 
        className="mt-12"
        isPageScrolling={isPageScrolling}
      >
        <Button href="#new-contact" variant="secondary" size="md" arrow>
          {content.cta}
        </Button>
      </AnimatedText>
    </SectionWrapper>
  );
};
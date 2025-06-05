import React from 'react';
import { SectionProps } from '../../types';
import { SectionWrapper } from '../ui/SectionWrapper';
import { AnimatedText } from '../ui/AnimatedText';
import { Button } from '../ui/Button';
import { sectionText } from '../../constants';

export const ButtonsShowcaseSection: React.FC<SectionProps> = ({ id }) => {
  const texts = sectionText.showcase.buttons;

  return (
    <SectionWrapper id={id} className="" fullHeight={false}>
      <AnimatedText as="h2" className="text-3xl md:text-4xl lg:text-5xl font-serifDisplay text-palm-luminous-teal mb-6">
        {texts.headline}
      </AnimatedText>
      <AnimatedText as="p" className="text-lg md:text-xl text-palm-soft-lavender mb-12 max-w-xl mx-auto leading-relaxed" delay="delay-200">
        {texts.subhead}
      </AnimatedText>

      <div className="space-y-10 max-w-3xl mx-auto">
        {/* Variants */}
        <AnimatedText as="div" delay="delay-300">
          <h3 className="text-2xl font-serifDisplay text-palm-luminous-teal mb-4">{texts.variantsTitle}</h3>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <Button variant="primary">{texts.primary}</Button>
            <Button variant="secondary">{texts.secondary}</Button>
            <Button variant="outline">{texts.outline}</Button>
          </div>
        </AnimatedText>

        {/* Sizes */}
        <AnimatedText as="div" delay="delay-400">
          <h3 className="text-2xl font-serifDisplay text-palm-luminous-teal mb-4">{texts.sizesTitle}</h3>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <Button size="sm" variant="primary">{texts.small}</Button>
            <Button size="md" variant="secondary">{texts.medium}</Button>
            <Button size="lg" variant="outline">{texts.large}</Button>
          </div>
        </AnimatedText>

        {/* States & Extras */}
        <AnimatedText as="div" delay="delay-500">
          <h3 className="text-2xl font-serifDisplay text-palm-luminous-teal mb-4">{texts.statesTitle}</h3>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <Button variant="primary" arrow>{texts.withArrow}</Button>
            <Button variant="primary" disabled>{texts.disabled}</Button>
            <Button href="#" variant="outline" arrow>{texts.link}</Button>
          </div>
        </AnimatedText>
      </div>
    </SectionWrapper>
  );
};
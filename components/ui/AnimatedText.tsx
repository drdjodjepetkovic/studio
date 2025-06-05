
import React, { ReactNode, CSSProperties, useMemo } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

// Define the component's own specific props, excluding 'as'
interface AnimatedTextOwnProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: string;
  stagger?: boolean;
  isPageScrolling?: boolean;
}

// Define the polymorphic props using the component's generic E
// This combines own props, the 'as' prop, and Omit<HTMLAttributes for E, keys of own props | 'as'>
export type AnimatedTextProps<E extends keyof HTMLElementTagNameMap = 'p'> =
  AnimatedTextOwnProps & {
    as?: E;
  } & Omit<React.ComponentPropsWithoutRef<E>, keyof AnimatedTextOwnProps | 'as'>;

// Interface for the props being cloned onto staggered children
interface StaggeredChildCloneProps {
  className: string;
  style: React.CSSProperties;
}

export const AnimatedText = <E extends keyof HTMLElementTagNameMap = 'p'>(
  props: AnimatedTextProps<E>
) => {
  const {
    // Own props
    children,
    className: propClassName,
    style: propStyle,
    delay = 'delay-0',
    stagger = false,
    isPageScrolling,
    // 'as' prop
    as,
    // Remaining HTML attributes are in 'rest'
    ...rest
  } = props;

  // Cast to React.ElementType to help TypeScript with complex polymorphic JSX.
  // (as || 'p') results in type E, which is a keyof HTMLElementTagNameMap.
  // This is already assignable to React.ElementType, so the cast mainly aids TS's inference.
  const TagToRender = (as || 'p') as React.ElementType;

  const scrollAnimationOptions = useMemo(() => ({ threshold: 0.2, once: true }), []);
  const { ref, isVisible } = useScrollAnimation<HTMLElementTagNameMap[E]>(scrollAnimationOptions, isPageScrolling);

  if (stagger && React.Children.count(children) > 1) {
    return (
      <TagToRender
        ref={ref}
        className={propClassName || ''} // Line 52
        style={propStyle}                // Line 53
        {...(rest as any)}
      >
        {React.Children.map(children, (childNode, index) => {
          // MODIFICATION: Provide specific props type to isValidElement
          if (React.isValidElement<{ className?: string; style?: React.CSSProperties }>(childNode)) {
            // MODIFICATION: childNode.props is now more specifically typed, so direct assignment is fine.
            const originalChildProps = childNode.props;

            const animationStateClasses = isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5';
            const baseTransitionClasses = 'transition-all duration-700 ease-out';
            const childExistingClasses = originalChildProps.className || '';

            const newChildClassName = [
                baseTransitionClasses,
                animationStateClasses,
                childExistingClasses
            ].filter(Boolean).join(' ');

            const constructedStyle: React.CSSProperties = {};
            // MODIFICATION: Simplified style check as originalChildProps.style is CSSProperties | undefined
            if (originalChildProps.style) {
              Object.assign(constructedStyle, originalChildProps.style);
            }
            constructedStyle.transitionDelay = isVisible ? `${index * 100}ms` : '0ms';

            const propsForCloning: StaggeredChildCloneProps = {
              className: newChildClassName,
              style: constructedStyle,
            };

            return React.cloneElement(childNode, propsForCloning);
          }
          return childNode;
        })}
      </TagToRender>
    );
  }

  const combinedClassName = `transition-all duration-1000 ease-out ${delay} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${propClassName || ''}`;

  return (
    <TagToRender
      ref={ref}
      className={combinedClassName}
      style={propStyle}
      {...(rest as any)}
    >
      {children}
    </TagToRender>
  );
};

import React, { ReactNode } from 'react';

// Base props shared by both link and button versions
type BaseButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  arrow?: boolean;
};

// Props for when the button is an anchor link
type LinkButtonProps = BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps | 'href'> & 
  { href: string; };

// Props for when the button is a native button element
type ActualButtonProps = BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> & 
  { href?: undefined; };

// The component's props type is a union of the two
export type ButtonProps = LinkButtonProps | ActualButtonProps;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  arrow = false,
  href, 
  ...rest 
}) => {
  const baseStyle = 'font-serifDisplay uppercase tracking-wider rounded-sm transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-palm-dark-indigo focus:ring-palm-luminous-teal inline-flex items-center justify-center group'; // Updated focus ring

  let variantStyle = '';
  switch (variant) {
    case 'primary': // Luminous Teal on Dark Indigo
      variantStyle = 'bg-palm-luminous-teal text-palm-dark-indigo hover:bg-opacity-80 shadow-md hover:shadow-lg hover:shadow-palm-luminous-teal/20';
      break;
    case 'secondary': // Muted Gold on Dark Indigo (or Soft Lavender for softer touch)
      variantStyle = 'bg-palm-muted-gold text-palm-off-white hover:bg-opacity-80 shadow-sm hover:shadow-md hover:shadow-palm-muted-gold/20';
      // Alternative: bg-palm-soft-lavender text-palm-off-white hover:bg-opacity-80
      break;
    case 'outline': // Border Luminous Teal, Text Luminous Teal
      variantStyle = 'border border-palm-luminous-teal text-palm-luminous-teal hover:bg-palm-luminous-teal hover:text-palm-dark-indigo';
      break;
  }

  let sizeStyle = '';
  switch (size) {
    case 'sm':
      sizeStyle = 'px-4 py-2 text-xs';
      break;
    case 'md':
      sizeStyle = 'px-6 py-3 text-sm';
      break;
    case 'lg':
      sizeStyle = 'px-8 py-4 text-base';
      break;
  }

  const combinedClassName = `${baseStyle} ${variantStyle} ${sizeStyle} ${className || ''}`;

  const arrowElement = arrow && <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>;

  if (href) {
    return (
      <a
        href={href}
        className={combinedClassName}
        {...(rest as Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps | 'href'>)}
      >
        {children}
        {arrowElement}
      </a>
    );
  }

  return (
    <button
      className={combinedClassName}
      {...(rest as Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps | 'href'>)} 
    >
      {children}
      {arrowElement}
    </button>
  );
};

import React from 'react';
import { APP_NAME, sectionText } from '../../constants'; 

export const Footer: React.FC = () => {
  const content = sectionText.newContact;

  const formatPhoneForTel = (phone: string) => {
    const digits = phone.replace(/\s+/g, '');
    if (digits.startsWith('011')) {
      return `+38111${digits.substring(3)}`;
    }
    return `+381${digits}`; 
  };

  return (
    <footer className="py-8 px-6 md:px-12 bg-palm-warm-gray/10 text-palm-soft-lavender text-center font-sansBody border-t border-palm-warm-gray/20">
      <div className="container mx-auto">
        <p className="text-sm">&copy; {new Date().getFullYear()} {APP_NAME}. Sva prava zadržana.</p>
        <p className="text-xs mt-1">{content.address}</p>
        <p className="text-xs mt-1">
          Telefoni: <a href={`tel:${formatPhoneForTel(content.phone1)}`} className="hover:text-palm-luminous-teal">{content.phone1}</a>, <a href={`tel:${formatPhoneForTel(content.phone2)}`} className="hover:text-palm-luminous-teal">{content.phone2}</a>
        </p>
        <p className="text-xs mt-1">
          Email: <a href={`mailto:${content.email}`} className="hover:text-palm-luminous-teal">{content.email}</a>
        </p>
      </div>
    </footer>
  );
};
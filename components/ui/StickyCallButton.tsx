
import React from 'react';
import { PhoneIcon, sectionText } from '../../constants';

export const StickyCallButton: React.FC = () => {
  const primaryClinicPhone = sectionText.newContact.phone1;
  const formatPhoneForTel = (phone: string) => {
    const digits = phone.replace(/\s+/g, '');
    if (digits.startsWith('011')) {
      return `+38111${digits.substring(3)}`;
    }
    return `+381${digits}`;
  };
  const internationalPhoneNumber = formatPhoneForTel(primaryClinicPhone);

  return (
    <a
      href={`tel:${internationalPhoneNumber}`}
      aria-label="Pozovite nas direktno"
      className="fixed bottom-6 right-6 z-[100] bg-palm-luminous-teal text-palm-dark-indigo p-4 rounded-full shadow-xl hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-palm-dark-indigo focus:ring-palm-luminous-teal transition-all duration-300 ease-out transform hover:scale-105 active:scale-95"
      title={`Pozovite ${primaryClinicPhone}`}
    >
      <PhoneIcon className="w-6 h-6" />
    </a>
  );
};
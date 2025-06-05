import React, { useState } from 'react';
import { SectionProps } from '../../types';
import { SectionWrapper } from '../ui/SectionWrapper';
import { AnimatedText } from '../ui/AnimatedText';
import { Button } from '../ui/Button';
import { sectionText, PhoneIcon, ClockIcon, MapPinIcon, EmailIcon } from '../../constants'; 

interface NewContactSectionProps extends SectionProps {
  isLastSection?: boolean;
  onNavigateNext?: () => void;
  isPageScrolling?: boolean; 
}

export const NewContactSection: React.FC<NewContactSectionProps> = ({ id, isLastSection, onNavigateNext, isPageScrolling }) => {
  const content = sectionText.newContact;
  const initialFormData = {
    name: '',
    email: '',
    phone: '', 
    date: '', 
    timePreference: 'utokudana', 
    message: ''
  };
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false); 
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [mailtoLink, setMailtoLink] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitted) return; 

    setIsSubmitting(true);

    const subject = `Upit sa web stranice - ${formData.name}`;
    const timePreferenceTextMap: Record<string, string> = {
      'prepodne': 'Pre podne (08-12h)',
      'sredinadana': 'Sredina dana (12-16h)',
      'poslepodne': 'Posle podne (16-20h)',
      'utokudana': 'U toku dana (fleksibilno)'
    };
    const preferredTimeDisplay = timePreferenceTextMap[formData.timePreference] || formData.timePreference;


    const bodyParts = [
      `Poštovani,`,
      `Šaljem upit putem kontakt forme sa Vaše web stranice.`,
      `--------------------------------------------------`,
      `Ime i Prezime: ${formData.name}`,
      `Email Adresa: ${formData.email}`,
      `Broj Telefona: ${formData.phone}`,
      `Željeni Datum Termina: ${formData.date || 'Nije specificiran'}`,
      `Preferirano Vreme Termina: ${preferredTimeDisplay}`,
      `--------------------------------------------------`,
      `Poruka:`,
      formData.message || '(Nema dodatne poruke)',
      `--------------------------------------------------`,
      `Srdačan pozdrav,`,
      formData.name
    ];
    const body = encodeURIComponent(bodyParts.join('\n'));

    const generatedMailtoLink = `mailto:${content.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
    
    await new Promise(resolve => setTimeout(resolve, 700)); 

    setMailtoLink(generatedMailtoLink);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleResetForm = () => {
    setFormData(initialFormData);
    setIsSubmitted(false);
    setMailtoLink('');
    setIsSubmitting(false);
  };

  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(content.address)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(content.address)}`;
  
  const today = new Date().toISOString().split('T')[0];

  const formatPhoneForTel = (phone: string) => {
    const digits = phone.replace(/\s+/g, '');
    if (digits.startsWith('011')) {
      return `+38111${digits.substring(3)}`;
    }
    return `+381${digits}`; 
  };


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
        className="text-lg md:text-xl text-palm-soft-lavender mb-12 max-w-2xl mx-auto" 
        delay="delay-200"
        isPageScrolling={isPageScrolling}
      >
        {content.subhead}
      </AnimatedText>

      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
        {/* Left Column: Contact Details, Working Hours & Image */}
        <div className="space-y-8">
          {content.clinicImageUrl && (
            <AnimatedText 
              as="figure" 
              className="mb-8"
              delay="delay-250"
              isPageScrolling={isPageScrolling}
            >
              <img 
                src={content.clinicImageUrl} 
                alt="Ginekološka ordinacija Palmotićeva" 
                className="rounded-lg shadow-xl w-full h-auto object-cover aspect-[16/10]" 
              />
            </AnimatedText>
          )}
          <AnimatedText 
            as="div" 
            className="text-left bg-palm-white/50 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-lg" 
            delay="delay-300"
            isPageScrolling={isPageScrolling}
          >
            <h3 className="text-2xl font-serifDisplay text-palm-mauve-dark mb-4 flex items-center">
              <MapPinIcon className="w-6 h-6 mr-3 text-palm-pink-500" />
              {content.addressTitle}
            </h3>
            <address className="text-palm-gray-700 not-italic space-y-2 text-sm md:text-base">
              <p>{content.address}</p>
              <p className="flex items-center">
                <EmailIcon className="w-5 h-5 mr-2 text-palm-mauve-dark flex-shrink-0" />
                <a href={`mailto:${content.email}`} className="hover:text-palm-mauve-dark transition-colors break-all">
                  {content.email}
                </a>
              </p>
              <div className="space-y-1">
                <p className="flex items-center">
                  <PhoneIcon className="w-5 h-5 mr-2 text-palm-mauve-dark flex-shrink-0" />
                  <a href={`tel:${formatPhoneForTel(content.phone1)}`} className="hover:text-palm-mauve-dark transition-colors">
                    {content.phone1}
                  </a>
                </p>
                <p className="flex items-center">
                  <PhoneIcon className="w-5 h-5 mr-2 text-palm-mauve-dark flex-shrink-0 opacity-0 md:opacity-100" /> 
                   <span className="md:hidden mr-2 flex-shrink-0">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <a href={`tel:${formatPhoneForTel(content.phone2)}`} className="hover:text-palm-mauve-dark transition-colors">
                    {content.phone2}
                  </a>
                </p>
              </div>
            </address>
            <div className="mt-6">
              <Button 
                href={directionsUrl}
                variant="secondary" 
                size="sm" 
                className="w-full md:w-auto"
                target="_blank"
                rel="noopener noreferrer"
                arrow
              >
                Prikaži Uputstva
              </Button>
            </div>
          </AnimatedText>

          {content.workingHours && (
            <AnimatedText 
              as="div" 
              className="text-left bg-palm-white/50 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-lg" 
              delay="delay-400"
              isPageScrolling={isPageScrolling}
            >
              <h3 className="text-2xl font-serifDisplay text-palm-mauve-dark mb-4 flex items-center">
                <ClockIcon className="w-6 h-6 mr-3 text-palm-pink-500"/>
                {content.workingHoursTitle || "Radno Vreme"}
              </h3>
              <ul className="space-y-1 text-palm-gray-700 text-sm md:text-base">
                {Object.entries(content.workingHours as Record<string,string>).map(([day, hours]) => (
                  <li key={day} className="flex justify-between">
                    <span>{day}:</span>
                    <span className="font-medium">{hours}</span>
                  </li>
                ))}
              </ul>
            </AnimatedText>
          )}
        </div>

        {/* Right Column: Form or Mailto Link */}
        <AnimatedText 
          as="div" 
          className="text-center" 
          delay="delay-500" 
          isPageScrolling={isPageScrolling}
        >
           <h3 className="text-2xl font-serifDisplay text-palm-mauve-dark mb-4">{isSubmitted ? "Potvrdite Slanje Upita" : content.formTitle}</h3>
          <div className="w-full h-full bg-palm-white/70 backdrop-blur-md p-6 md:p-8 rounded-lg shadow-xl flex flex-col">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-5 flex flex-col flex-grow">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-palm-gray-700 text-left font-serifDisplay">Puno Ime i Prezime</label>
                  <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required aria-required="true" className="mt-1 block w-full px-3 py-2 bg-white border border-palm-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-palm-mauve-dark focus:border-palm-mauve-dark sm:text-sm" autoComplete="name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-palm-gray-700 text-left font-serifDisplay">Email Adresa</label>
                  <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required aria-required="true" className="mt-1 block w-full px-3 py-2 bg-white border border-palm-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-palm-mauve-dark focus:border-palm-mauve-dark sm:text-sm" autoComplete="email" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-palm-gray-700 text-left font-serifDisplay">Broj Telefona</label>
                  <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} required aria-required="true" className="mt-1 block w-full px-3 py-2 bg-white border border-palm-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-palm-mauve-dark focus:border-palm-mauve-dark sm:text-sm" autoComplete="tel" />
                </div>
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-palm-gray-700 text-left font-serifDisplay">Željeni Datum Termina</label>
                  <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} required aria-required="true" min={today} className="mt-1 block w-full px-3 py-2 bg-white border border-palm-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-palm-mauve-dark focus:border-palm-mauve-dark sm:text-sm" autoComplete="off" />
                </div>
                
                <fieldset>
                  <legend className="block text-sm font-medium text-palm-gray-700 text-left font-serifDisplay mb-1">Preferirano Vreme Termina</legend>
                  <div className="mt-1 space-y-1 sm:space-y-0 sm:flex sm:space-x-4">
                    {(['Pre podne (08-12h)', 'Sredina dana (12-16h)', 'Posle podne (16-20h)'] as const).map((option) => {
                      const optionValue = option.toLowerCase().replace(/\s+/g, '').split('(')[0];
                      return (
                        <div key={optionValue} className="flex items-center">
                          <input
                            id={`time-${optionValue}`}
                            name="timePreference"
                            type="radio"
                            value={optionValue}
                            checked={formData.timePreference === optionValue}
                            onChange={handleChange}
                            required
                            aria-required="true"
                            className="h-4 w-4 text-palm-mauve-dark border-palm-gray-300 focus:ring-palm-mauve-dark"
                            autoComplete="off"
                          />
                          <label htmlFor={`time-${optionValue}`} className="ml-2 block text-xs sm:text-sm text-palm-gray-700">
                            {option}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-palm-gray-700 text-left font-serifDisplay">Poruka (opciono)</label>
                  <textarea name="message" id="message" value={formData.message} onChange={handleChange} rows={3} className="mt-1 block w-full px-3 py-2 bg-white border border-palm-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-palm-mauve-dark focus:border-palm-mauve-dark sm:text-sm" autoComplete="off"></textarea>
                </div>
                <Button type="submit" variant="primary" size="lg" className="w-full mt-auto" arrow disabled={isSubmitting}>
                  {isSubmitting ? 'Priprema...' : content.cta}
                </Button>
              </form>
            ) : (
              <div className="text-center flex flex-col justify-center items-center flex-grow space-y-6">
                <p className="text-md text-palm-gray-700">
                  Vaš upit je pripremljen. Kliknite na dugme ispod da otvorite Vaš program za elektronsku poštu i pošaljete poruku na <strong className="text-palm-mauve-dark">{content.email}</strong>.
                </p>
                <p className="text-xs text-palm-gray-500">
                  Molimo Vas proverite da li su svi podaci ispravno uneti u email pre slanja.
                </p>
                <Button 
                  href={mailtoLink} 
                  variant="primary" 
                  size="lg" 
                  className="w-full" 
                  arrow
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Otvori Email Klijent
                </Button>
                <Button 
                  onClick={handleResetForm} 
                  variant="outline" 
                  size="md" 
                  className="w-full"
                >
                  Popuni Ponovo
                </Button>
              </div>
            )}
          </div>
        </AnimatedText>
      </div>

      <AnimatedText 
        as="div" 
        className="text-center mt-16 w-full max-w-4xl mx-auto" 
        delay="delay-600" 
        isPageScrolling={isPageScrolling}
      >
        <h3 className="text-2xl font-serifDisplay text-palm-luminous-teal mb-4">{content.mapTitle}</h3>
        <div className="aspect-[16/9] rounded-lg shadow-xl overflow-hidden border-2 border-palm-pink-200 bg-palm-pink-50">
          <iframe
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa Lokacije Ordinacije Palmotićeva"
            aria-label="Google Mapa koja prikazuje lokaciju Ginekološke ordinacije Palmotićeva"
          ></iframe>
        </div>
      </AnimatedText>
    </SectionWrapper>
  );
};
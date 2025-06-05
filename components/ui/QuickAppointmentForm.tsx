import React, { useState } from 'react';
import { Button } from './Button';
import { AnimatedText } from './AnimatedText'; 

interface QuickAppointmentFormProps {
  onClose: () => void;
  onSubmitSuccess: (data: AppointmentData) => void;
}

export interface AppointmentData {
  firstName: string;
  lastName: string;
  date: string;
  time: string; 
  email: string;
  phone: string;
  comment?: string;
}

const today = new Date().toISOString().split('T')[0];

const timePreferenceOptions: Record<string, string> = {
  'prepodne': 'Pre podne (08-12h)',
  'sredinadana': 'Sredina dana (12-16h)',
  'poslepodne': 'Posle podne (16-20h)',
};

export const QuickAppointmentForm: React.FC<QuickAppointmentFormProps> = ({ onClose, onSubmitSuccess }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<AppointmentData>({
    firstName: '',
    lastName: '',
    date: '',
    time: 'prepodne', 
    email: '',
    phone: '',
    comment: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionComplete, setSubmissionComplete] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = () => {
    if (currentStep === 1 && (!formData.firstName || !formData.lastName)) {
        alert("Molimo Vas unesite ime i prezime.");
        return;
    }
    if (currentStep === 2 && (!formData.date || !formData.time)) {
        alert("Molimo Vas odaberite željeni datum i vreme.");
        return;
    }
     if (currentStep === 3 && (!formData.email || !formData.phone)) {
        alert("Molimo Vas unesite email i broj telefona.");
        return;
    }
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate backend submission
    console.log("Podaci iz forme za brzi termin (za backend):", formData);
    await new Promise(resolve => setTimeout(resolve, 700)); 
    
    onSubmitSuccess(formData); 
    setIsSubmitting(false);
    setSubmissionComplete(true); 
  };
  
  const inputClass = "mt-1 block w-full px-3 py-2 bg-palm-dark-indigo border border-palm-warm-gray rounded-md shadow-sm focus:outline-none focus:ring-palm-luminous-teal focus:border-palm-luminous-teal sm:text-sm text-palm-off-white placeholder-palm-warm-gray";
  const labelClass = "block text-sm font-medium text-palm-soft-lavender text-left font-serifDisplay";
  const commentPlaceholder = "Npr. željena usluga (kompletan pregled, intervencija, konsultacija), specifične potrebe ili pitanja...";


  if (submissionComplete) {
    return (
      <div 
        className="fixed inset-0 bg-palm-dark-indigo/90 backdrop-blur-md z-[1000] flex justify-center items-center p-4 overflow-y-auto"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="submission-success-title"
      >
        <AnimatedText 
          as="div" 
          className="bg-palm-warm-gray/30 p-6 md:p-8 rounded-lg shadow-2xl w-full max-w-lg text-center"
        >
          <h2 id="submission-success-title" className="text-2xl md:text-3xl font-serifDisplay text-palm-luminous-teal mb-6">
            Zahtev Poslat!
          </h2>
          <p className="text-palm-off-white mb-8 text-md">
            Hvala! Vaš zahtev za termin je uspešno primljen. Uskoro ćemo Vas kontaktirati radi potvrde.
          </p>
          <Button type="button" onClick={onClose} variant="primary" size="md" className="w-full">
            Zatvori
          </Button>
        </AnimatedText>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 bg-palm-dark-indigo/90 backdrop-blur-md z-[1000] flex justify-center items-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-appointment-title"
    >
      <AnimatedText 
        as="div" 
        className="bg-palm-warm-gray/30 p-6 md:p-8 rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col"
        style={{ animationDelay: '0s' }} 
      >
        <h2 id="quick-appointment-title" className="text-2xl md:text-3xl font-serifDisplay text-palm-luminous-teal mb-6 text-center">
          Zakažite Termin Online
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5 overflow-y-auto pr-2 flex-grow">
          {/* Step 1: Name */}
          {currentStep === 1 && (
            <AnimatedText as="div" className="space-y-4">
              <div>
                <label htmlFor="firstName" className={labelClass}>Ime</label>
                <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} required aria-required="true" className={inputClass} placeholder="Npr. Jovana" autoComplete="given-name" />
              </div>
              <div>
                <label htmlFor="lastName" className={labelClass}>Prezime</label>
                <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} required aria-required="true" className={inputClass} placeholder="Npr. Petrović" autoComplete="family-name" />
              </div>
            </AnimatedText>
          )}

          {/* Step 2: Date and Time */}
          {currentStep === 2 && (
            <AnimatedText as="div" className="space-y-4">
              <div>
                <label htmlFor="date" className={labelClass}>Željeni Datum</label>
                <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} required aria-required="true" min={today} className={inputClass} autoComplete="off" />
              </div>
              <fieldset>
                <legend className={`${labelClass} mb-1`}>Preferirano Vreme Termina</legend>
                <div className="mt-1 space-y-2">
                  {Object.entries(timePreferenceOptions).map(([value, text]) => (
                    <div key={value} className="flex items-center">
                      <input
                        id={`time-${value}`}
                        name="time"
                        type="radio"
                        value={value}
                        checked={formData.time === value}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        className="h-4 w-4 text-palm-luminous-teal border-palm-warm-gray focus:ring-palm-luminous-teal"
                        autoComplete="off"
                      />
                      <label htmlFor={`time-${value}`} className="ml-2 block text-sm text-palm-off-white">
                        {text}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </AnimatedText>
          )}

          {/* Step 3: Contact Info & Comment */}
          {currentStep === 3 && (
             <AnimatedText as="div" className="space-y-4">
              <div>
                <label htmlFor="email" className={labelClass}>Email Adresa</label>
                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required aria-required="true" className={inputClass} placeholder="Npr. email@domen.com" autoComplete="email" />
              </div>
              <div>
                <label htmlFor="phone" className={labelClass}>Broj Telefona</label>
                <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} required aria-required="true" className={inputClass} placeholder="Npr. 06x xxx xxxx" autoComplete="tel" />
              </div>
              <div>
                <label htmlFor="comment" className={labelClass}>Dodatni Komentar (opciono)</label>
                <textarea name="comment" id="comment" value={formData.comment} onChange={handleChange} rows={3} className={inputClass} placeholder={commentPlaceholder} autoComplete="off"></textarea>
              </div>
            </AnimatedText>
          )}
          
          {/* Step 4: Summary */}
          {currentStep === 4 && (
            <AnimatedText as="div" className="space-y-3 text-palm-off-white">
              <h3 className="text-xl font-serifDisplay text-palm-luminous-teal mb-3">Pregled Vašeg Zahteva</h3>
              <p><strong className="text-palm-soft-lavender">Ime i Prezime:</strong> {formData.firstName} {formData.lastName}</p>
              <p><strong className="text-palm-soft-lavender">Željeni Datum:</strong> {formData.date ? new Date(formData.date).toLocaleDateString('sr-RS') : 'Nije odabran'}</p>
              <p><strong className="text-palm-soft-lavender">Željeno Vreme:</strong> {timePreferenceOptions[formData.time] || 'Nije odabrano'}</p>
              <p><strong className="text-palm-soft-lavender">Email:</strong> {formData.email}</p>
              <p><strong className="text-palm-soft-lavender">Telefon:</strong> {formData.phone}</p>
              {formData.comment && <p><strong className="text-palm-soft-lavender">Dodatni Komentar:</strong> {formData.comment}</p>}
              <p className="text-xs text-palm-warm-gray mt-4">Klikom na "Pošalji Zahtev", Vaši podaci će biti poslati ordinaciji.</p>
            </AnimatedText>
          )}
        </form>

        <div className="mt-8 pt-4 border-t border-palm-warm-gray flex justify-between items-center">
          <Button 
            type="button" 
            onClick={onClose} 
            size="sm" 
            className="text-palm-soft-lavender hover:text-palm-luminous-teal focus:ring-palm-luminous-teal focus:ring-offset-palm-warm-gray/30"
          >
            Odustani
          </Button>
          <div className="flex items-center space-x-3">
            {currentStep > 1 && (
              <Button type="button" onClick={handlePrevStep} variant="secondary" size="sm">
                Nazad
              </Button>
            )}
            {currentStep < 4 ? (
              <Button type="button" onClick={handleNextStep} variant="outline" size="sm" arrow>
                Dalje
              </Button>
            ) : (
              <Button type="submit" onClick={handleSubmit} variant="primary" size="sm" arrow disabled={isSubmitting}>
                {isSubmitting ? 'Slanje...' : 'Pošalji Zahtev'}
              </Button>
            )}
          </div>
        </div>
      </AnimatedText>
    </div>
  );
};

import React, { useState } from 'react';
import { SectionProps } from '../../types';
import { SectionWrapper } from '../ui/SectionWrapper';
import { AnimatedText } from '../ui/AnimatedText';
import { Button } from '../ui/Button';
import { SeedMotif, sectionText } from '../../constants'; // Reusing SeedMotif for cyclical feel

export const ContactSection: React.FC<SectionProps> = ({ id = "contact" }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Added for loading state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); 
    // Placeholder for form submission logic
    // In a real app, you would send data to a backend or email service here.
    // For this example, we'll simulate a delay.
    console.log("Form data submitted:", formData);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network request

    setIsSubmitting(false);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: ''});
    }, 4000); // Increased timeout for user to read message
  };

  return (
    <SectionWrapper id={id} motif={<SeedMotif />} className="bg-gradient-to-br from-palm-white to-palm-pink-50">
      <AnimatedText as="h2" className="text-3xl md:text-4xl lg:text-5xl font-serifDisplay text-palm-gray-800 mb-6">
        {sectionText.newContact.headline}
      </AnimatedText>
      <AnimatedText as="p" className="text-lg md:text-xl text-palm-gray-600 mb-10 max-w-xl mx-auto" delay="delay-200">
        {sectionText.newContact.subhead}
      </AnimatedText>

      {isSubmitted ? (
        <AnimatedText as="div" className="text-xl text-palm-mauve-dark bg-palm-mauve-light/30 p-6 rounded-lg shadow-lg">
          Hvala Vam! Vaša poruka je uspešno poslata. Uskoro ćemo Vas kontaktirati.
        </AnimatedText>
      ) : (
        <AnimatedText as="form" onSubmit={handleSubmit} className="w-full max-w-lg mx-auto space-y-6 bg-palm-white/70 backdrop-blur-md p-8 rounded-lg shadow-xl" delay="delay-300">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-palm-gray-700 text-left font-serifDisplay">Puno Ime i Prezime</label>
            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-palm-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-palm-mauve-dark focus:border-palm-mauve-dark sm:text-sm" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-palm-gray-700 text-left font-serifDisplay">Email Adresa</label>
            <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-palm-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-palm-mauve-dark focus:border-palm-mauve-dark sm:text-sm" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-palm-gray-700 text-left font-serifDisplay">Poruka</label>
            <textarea name="message" id="message" value={formData.message} onChange={handleChange} rows={4} required className="mt-1 block w-full px-3 py-2 bg-white border border-palm-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-palm-mauve-dark focus:border-palm-mauve-dark sm:text-sm"></textarea>
          </div>
          <Button type="submit" variant="primary" size="lg" className="w-full" arrow disabled={isSubmitting}>
            {isSubmitting ? 'Slanje...' : sectionText.newContact.cta}
          </Button>
        </AnimatedText>
      )}
      <AnimatedText as="div" className="mt-12 text-palm-gray-600 text-sm md:text-base" delay="delay-400">
        <p className="font-semibold">Ginekološka ordinacija Palmotićeva</p>
        <p>Adresa: Palmotićeva 25a, 11000 Beograd, Srbija</p>
        <p>Email: <a href="mailto:office@palmoticeva.com" className="text-palm-mauve-dark hover:underline">office@palmoticeva.com</a></p>
        <p>Telefoni: <a href="tel:+381113237840" className="text-palm-mauve-dark hover:underline">011 323 78 40</a>, <a href="tel:+381646407905" className="text-palm-mauve-dark hover:underline">064 640 79 05</a></p>
      </AnimatedText>
    </SectionWrapper>
  );
};
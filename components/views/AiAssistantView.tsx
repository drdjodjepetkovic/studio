import React, { useState } from 'react';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Button } from '../ui/Button';
import { AnimatedText } from '../ui/AnimatedText';
import { QuestionIcon, ASSISTANT_PRICELIST_DATA, ASSISTANT_DOCTOR_DATA, ASSISTANT_GENERAL_INFO_DATA } from '../../constants';

interface AiAssistantViewProps {
  onClose: () => void;
}

const API_KEY = process.env.API_KEY;
let ai: GoogleGenAI | null = null;
let apiKeyError: string | null = null;

if (!API_KEY) {
  apiKeyError = "API ključ za Gemini Pomoćnika nije konfigurisan. Ova funkcija trenutno nije dostupna.";
  console.warn(apiKeyError);
} else {
  ai = new GoogleGenAI({ apiKey: API_KEY });
}


const CLINIC_PHONE_NUMBER = "011 322 60 40"; 

const PRICELIST_CONTEXT_FOR_PROMPT = `
Ovde je naš trenutni cenovnik:
${ASSISTANT_PRICELIST_DATA}
Kada odgovaraš na pitanja o cenama, koristi isključivo ove informacije.
`;

const DOCTOR_INFO_CONTEXT_FOR_PROMPT = `
${ASSISTANT_DOCTOR_DATA}
Kada te pitaju o našim doktorima, koristi ove informacije.
`;

const GENERAL_INFO_CONTEXT_FOR_PROMPT = `
Ovde su opšte informacije o nekim ginekološkim temama i procedurama:
${ASSISTANT_GENERAL_INFO_DATA}
Koristi ove informacije kada odgovaraš na opšta pitanja. Uvek naglasi da su ove informacije opšteg karaktera i da je za specifične medicinske savete ili dijagnozu neophodna konsultacija sa lekarom.
`;

const BASE_SYSTEM_INSTRUCTION = `Ti si pomoćnik za Ginekološku ordinaciju Palmotićeva. Tvoj zadatak je da pružiš informacije o našim uslugama, terminima, i opštim ginekološkim temama na osnovu informacija koje su ti date. Budi profesionalan, informativan i saosećajan. Odgovaraj isključivo na srpskom jeziku. Formatiraj svoje odgovore kao čist tekst; izbegavaj Markdown formatiranje ili bilo kakve specijalne URL-ove ili komande u odgovoru, osim ako eksplicitno prenosiš datu informaciju (npr. broj telefona).

Važno: Ako korisnik postavi pitanje na koje ne možeš da pružiš precizan i potpun odgovor koristeći informacije koje su ti date, ili ako pitanje izlazi iz okvira datih opštih informacija, UVEK odgovori: "Za detaljnije informacije o tome, kao i za sva pitanja koja zahtevaju specifičnu medicinsku procenu ili nisu pokrivena opštim informacijama, najbolje bi bilo da se posavetujete direktno sa nama. Možete nas pozvati na broj ${CLINIC_PHONE_NUMBER} ili nam poslati upit putem kontakt forme na našem sajtu." Nemoj sebe identifikovati kao "AI" ili "digitalni asistent". Nemoj koristiti fraze poput "Ja sam pomoćnik" ili "Moje znanje je ograničeno na...". Samo direktno pruži traženi odgovor ili gorenavedenu poruku za upućivanje na kontakt.`;

const FULL_SYSTEM_INSTRUCTION = `${BASE_SYSTEM_INSTRUCTION}\n\n${PRICELIST_CONTEXT_FOR_PROMPT}\n\n${DOCTOR_INFO_CONTEXT_FOR_PROMPT}\n\n${GENERAL_INFO_CONTEXT_FOR_PROMPT}`;

export const AiAssistantView: React.FC<AiAssistantViewProps> = ({ onClose }) => {
  const [userInput, setUserInput] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(apiKeyError); // Initialize with API key error if present

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e?: React.FormEvent) => { 
    if (e) e.preventDefault(); 
    if (!userInput.trim() || isLoading || !ai) {
      if (!ai && !apiKeyError) { // If ai is null but no initial apiKeyError, set a generic one
        setError("Pomoćnik trenutno nije dostupan zbog konfiguracije.");
      }
      return;
    }

    setIsLoading(true);
    setAiResponse(null);
    setError(null); // Clear previous errors before new request

    try {
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-04-17',
        contents: userInput,
        config: {
            systemInstruction: FULL_SYSTEM_INSTRUCTION,
        }
      });
      
      let text = response.text.trim();
      const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
      const match = text.match(fenceRegex);
      if (match && match[2]) {
          text = match[2].trim();
      }
      setAiResponse(text);

    } catch (err: any) {
      console.error("Error calling Gemini API:", err);
      setError("Došlo je do greške prilikom komunikacije sa Pomoćnikom. Molimo pokušajte ponovo kasnije ili nas kontaktirajte direktno.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(); 
    }
  };
  
  const textAreaClass = "mt-1 block w-full px-3 py-2 bg-palm-dark-indigo border border-palm-warm-gray rounded-md shadow-sm focus:outline-none focus:ring-palm-luminous-teal focus:border-palm-luminous-teal sm:text-sm text-palm-off-white placeholder-palm-warm-gray min-h-[80px] resize-none";
  const labelClass = "block text-sm font-medium text-palm-soft-lavender text-left font-serifDisplay";

  return (
    <div 
      className="fixed inset-0 bg-palm-dark-indigo/90 backdrop-blur-md z-[1000] flex justify-center items-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-assistant-title"
    >
      <AnimatedText
        as="div"
        className="bg-palm-warm-gray/40 p-6 md:p-8 rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col"
        style={{ animationDelay: '0s' }} 
      >
        <div className="flex justify-between items-center mb-6">
            <h2 id="ai-assistant-title" className="text-2xl md:text-3xl font-serifDisplay text-palm-luminous-teal flex items-center">
                <QuestionIcon className="w-7 h-7 mr-3" />
                Pitajte Našeg Pomoćnika
            </h2>
            <button
                onClick={onClose}
                aria-label="Zatvori Pomoćnika"
                className="text-palm-soft-lavender hover:text-palm-luminous-teal transition-colors p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-palm-luminous-teal"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col flex-grow">
          <div>
            <label htmlFor="userInput" className={labelClass}>Vaše Pitanje:</label>
            <textarea
              id="userInput"
              name="userInput"
              value={userInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown} 
              required
              aria-required="true"
              className={textAreaClass}
              placeholder="Unesite pitanje o našim uslugama, cenama, terminima, opštim ginekološkim temama..."
              rows={3}
              autoComplete="off"
              disabled={!!apiKeyError} // Disable input if API key is not configured
            />
          </div>

          <div 
            className="mt-4 mb-4 p-4 bg-palm-dark-indigo/50 border border-palm-warm-gray rounded-md min-h-[120px] max-h-[30vh] overflow-y-auto text-palm-off-white text-sm leading-relaxed whitespace-pre-wrap"
            aria-live="polite"
          >
            {isLoading && <p className="italic text-palm-luminous-teal">Samo trenutak...</p>}
            {error && <p className="text-red-400">{error}</p>}
            {aiResponse && <p>{aiResponse}</p>}
            {!isLoading && !error && !aiResponse && !apiKeyError && <p className="text-palm-soft-lavender">Odgovor će se pojaviti ovde.</p>}
            {!isLoading && !error && !aiResponse && apiKeyError && <p className="text-palm-soft-lavender">Pomoćnik je trenutno nedostupan.</p>}
          </div>
          
          <div className="mt-auto pt-4">
            <Button type="submit" variant="primary" size="md" className="w-full" disabled={isLoading || !userInput.trim() || !ai || !!apiKeyError}>
              {isLoading ? 'Slanje...' : 'Pošalji Pitanje'}
            </Button>
            {apiKeyError && <p className="text-xs text-yellow-400 mt-2 text-center">{apiKeyError}</p>}
          </div>
        </form>
      </AnimatedText>
    </div>
  );
};
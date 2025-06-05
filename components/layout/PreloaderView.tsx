
import React, { useState, useEffect } from 'react';
import { UserTheme, UserScope } from '../../App';
import { ArrowLeftIcon, ArrowRightIcon } from '../../constants';
import { Logo } from '../ui/Logo';

// Botticelli's "The Birth of Venus" - Example URL
const BACKGROUND_IMAGE_URL = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/2560px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg";

export interface PreloaderViewProps {
  onBegin: (theme: UserTheme, scope: UserScope) => void;
}

export const PreloaderView: React.FC<PreloaderViewProps> = ({ onBegin }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [choiceMade, setChoiceMade] = useState<'left' | 'right' | null>(null);
  const [showWelcomeBack, setShowWelcomeBack] = useState(false);

  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('hasVisitedPalmSanctuary');
    if (hasVisitedBefore) {
      setShowWelcomeBack(true);
    }
    localStorage.setItem('hasVisitedPalmSanctuary', 'true');
  }, []);

  const handleSelectChoice = (scope: UserScope, side: 'left' | 'right') => {
    if (choiceMade) return;

    setChoiceMade(side);
    setIsExiting(true);
    setTimeout(() => {
      onBegin('dark', scope);
    }, 700); // Duration for exit animations
  };

  const choiceButtonBaseClasses = "preloader-choice-button group text-palm-off-white transition-all duration-300 ease-in-out flex-1 flex flex-col items-center text-center p-4 sm:p-6 rounded-lg focus:outline-none";
  const choiceButtonVisualClasses = "bg-black/50 hover:bg-palm-luminous-teal/25 backdrop-blur-md shadow-md hover:shadow-lg";

  return (
    <div
      className={`fixed inset-0 flex flex-col justify-center items-center z-[9999] p-4 sm:p-8 transition-opacity duration-500 ${isExiting ? 'opacity-0' : 'opacity-100'}`}
    >
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${BACKGROUND_IMAGE_URL})` }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-palm-dark-indigo/60 backdrop-brightness-50"></div>
      </div>

      {showWelcomeBack && (
        <div className="absolute top-10 sm:top-12 md:top-16 text-center w-full z-10">
          <p className="font-serifDisplay text-2xl sm:text-3xl text-palm-luminous-teal animate-subtle-pulse">
            Dobro došli ponovo!
          </p>
        </div>
      )}

      {/* Logo positioned above the choices, centered and larger */}
      <div
        className={`
          mb-8 sm:mb-10 md:mb-12 z-10
          flex justify-center items-center 
          transition-all duration-500 ease-in-out
          ${choiceMade ? 'scale-90 opacity-70' : 'scale-100 opacity-100'}
        `}
      >
        {/* Increased logo size - minimum double original */}
        <Logo className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80"/>
      </div>

      {/* Container for the two choice buttons */}
      <div className={`relative flex items-stretch justify-center w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl space-x-3 sm:space-x-4 md:space-x-5 z-10 transition-opacity duration-300 ${isExiting && choiceMade ? 'opacity-60' : 'opacity-100'}`}>
        {/* Left Choice */}
        <button
          onClick={() => handleSelectChoice('quick', 'left')}
          aria-label="Brzi Uvid: Termini, Cene, Info"
          className={`${choiceButtonBaseClasses} ${choiceButtonVisualClasses}
            ${choiceMade && choiceMade !== 'left' ? 'opacity-50 scale-95 pointer-events-none' : ''}
            ${choiceMade === 'left' ? 'scale-105 shadow-xl ring-2 ring-palm-luminous-teal/50' : ''}`}
          disabled={!!choiceMade && choiceMade !== 'left'}
        >
          <ArrowLeftIcon className="w-6 h-6 sm:w-7 md:w-8 text-palm-luminous-teal mb-2 transition-transform duration-300 group-hover:-translate-x-1" />
          <span className="font-serifDisplay text-md sm:text-lg md:text-xl">Brzi Uvid</span>
          <span className="text-xs sm:text-sm text-palm-soft-lavender/90 mt-0.5">(Termini, Cene, Info)</span>
        </button>

        {/* Right Choice */}
        <button
          onClick={() => handleSelectChoice('full', 'right')}
          aria-label="Upoznajte Nas: Sve o Nama, Usluge..."
          className={`${choiceButtonBaseClasses} ${choiceButtonVisualClasses}
            ${choiceMade && choiceMade !== 'right' ? 'opacity-50 scale-95 pointer-events-none' : ''}
            ${choiceMade === 'right' ? 'scale-105 shadow-xl ring-2 ring-palm-luminous-teal/50' : ''}`}
          disabled={!!choiceMade && choiceMade !== 'right'}
        >
          <ArrowRightIcon className="w-6 h-6 sm:w-7 md:w-8 text-palm-luminous-teal mb-2 transition-transform duration-300 group-hover:translate-x-1" />
          <span className="font-serifDisplay text-md sm:text-lg md:text-xl">Upoznajte Nas</span>
          <span className="text-xs sm:text-sm text-palm-soft-lavender/90 mt-0.5">(Sve o Nama, Usluge...)</span>
        </button>
      </div>

       {isExiting && (
        <div className="absolute bottom-10 text-palm-off-white text-sm transition-opacity duration-300 opacity-80 z-20">
          Učitavanje...
        </div>
      )}
    </div>
  );
};
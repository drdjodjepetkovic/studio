
import React, { useState, useEffect } from 'react';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';
import { PhoneIcon, sectionText, APP_NAME } from '../../constants';
import { ViewName } from '../../App';

interface HeaderProps {
  navigateTo: (view: ViewName, targetId?: string | null) => void;
  currentView: ViewName;
}

export const Header: React.FC<HeaderProps> = ({ navigateTo, currentView }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = ''; 
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleNavClick = (href: string, view: ViewName) => {
    const targetId = href.startsWith('#') ? href.substring(1) : null;
    
    if (view === 'main') {
      navigateTo('main', targetId);
    } else { 
      navigateTo(view, null); 
    }
    setMobileMenuOpen(false); 
  };
  
  const navLinks = [
    { href: "#hero", label: "Početna", view: 'main' as ViewName },
    { href: "#services", label: "Usluge", view: 'main' as ViewName },
    { href: "#pricelist", label: "Cenovnik", view: 'pricelistDetail' as ViewName }, 
    { href: "#team", label: "Tim", view: 'teamDetail' as ViewName },
    { href: "#new-contact", label: "Kontakt", view: 'main' as ViewName },
  ];

  const primaryClinicPhone = sectionText.newContact.phone1;
  const formatPhoneForTel = (phone: string) => {
    const digits = phone.replace(/\s+/g, '');
    if (digits.startsWith('011')) {
      return `+38111${digits.substring(3)}`;
    }
    return `+381${digits}`;
  };
  const internationalPhoneNumber = formatPhoneForTel(primaryClinicPhone);

  const headerBaseClasses = "fixed top-0 left-0 right-0 z-50 py-2 px-6 md:px-12 transition-all duration-300";
  // Updated background for dark theme
  const headerBackgroundStyles = "bg-palm-dark-indigo/80 backdrop-blur-md shadow-lg border-b border-palm-warm-gray/30";

  const isActiveLink = (linkView: ViewName, linkHref: string) => {
    if (currentView !== 'main' && currentView === linkView) {
      return true;
    }
    if (currentView === 'main' && linkView === 'main' && window.location.hash === linkHref) {
        return false; 
    }
    return false;
  };

  return (
    <>
      <header className={`${headerBaseClasses} ${headerBackgroundStyles}`}>
        <div className="container mx-auto flex justify-between items-center">
          <button 
            onClick={() => handleNavClick('#hero', 'main')} 
            className="focus:outline-none focus:ring-2 focus:ring-palm-luminous-teal rounded-sm group" 
            aria-label={`${APP_NAME} - Početna strana`}
          >
            <Logo className="h-20 md:h-24 lg:h-28 w-auto" /> {/* Specific size for header logo */}
          </button>
          
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map(link => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href, link.view)}
                className={`px-4 py-2 font-sansBody text-sm rounded-md transition-colors duration-200
                            ${isActiveLink(link.view, link.href) 
                              ? 'text-palm-luminous-teal bg-palm-warm-gray/50 font-semibold' 
                              : 'text-palm-off-white hover:text-palm-luminous-teal hover:bg-palm-warm-gray/30'}`}
                aria-current={isActiveLink(link.view, link.href) ? 'page' : undefined}
              >
                {link.label}
              </button>
            ))}
             <Button 
              href={`tel:${internationalPhoneNumber}`}
              variant="primary" // Uses new primary button style
              size="sm" 
              className="ml-4"
            >
              <PhoneIcon className="mr-2" />
              Pozovite Nas
            </Button>
          </nav>

          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? "Zatvori meni" : "Otvori meni"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu-overlay"
              className="text-palm-luminous-teal focus:outline-none p-2 z-[60] relative" 
            >
              <svg className="w-7 h-7 transition-transform duration-300 ease-in-out" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu-overlay"
        // Updated mobile menu overlay for dark theme
        className={`fixed inset-0 z-[55] bg-palm-dark-indigo/95 backdrop-blur-xl p-6 transition-opacity duration-300 ease-in-out lg:hidden
                    ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      >
        <button
          onClick={toggleMobileMenu}
          aria-label="Zatvori meni"
          className="absolute top-6 right-6 text-palm-luminous-teal hover:text-palm-off-white focus:outline-none p-2 z-[60]"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="container mx-auto h-full flex flex-col justify-center items-center pt-16">
          <nav className="flex flex-col items-center space-y-6">
            {navLinks.map(link => (
              <button
                key={`mobile-${link.href}`}
                onClick={() => handleNavClick(link.href, link.view)}
                // Updated mobile nav link styles
                className={`font-serifDisplay text-3xl py-3 transition-colors duration-200
                            ${isActiveLink(link.view, link.href) 
                              ? 'text-palm-luminous-teal font-bold' 
                              : 'text-palm-off-white hover:text-palm-luminous-teal'}`}
                aria-current={isActiveLink(link.view, link.href) ? 'page' : undefined}
              >
                {link.label}
              </button>
            ))}
          </nav>
          <div className="mt-12 w-full max-w-xs">
            <Button 
              href={`tel:${internationalPhoneNumber}`}
              variant="primary" // Uses new primary button style
              size="lg" 
              className="w-full" 
            >
              <PhoneIcon className="mr-2" />
              Pozovite Nas
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
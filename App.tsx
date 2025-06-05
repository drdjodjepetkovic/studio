
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { EthosSection } from './components/sections/EthosSection';
import { ApproachSection } from './components/sections/ApproachSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { PriceListSection } from './components/sections/PriceListSection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { SurgicalCareSection } from './components/sections/SurgicalCareSection';
import { TeamMemberSlobodankaSection } from './components/sections/TeamMemberSlobodankaSection';
import { TeamMemberDjordjeSection } from './components/sections/TeamMemberDjordjeSection';
import { FAQSection } from './components/sections/FAQSection';
import { NewContactSection } from './components/sections/NewContactSection';
import { StickyCallButton } from './components/ui/StickyCallButton';
import { CenovnikDetailView } from './components/views/CenovnikDetailView';
import { ApproachDetailView } from './components/views/ApproachDetailView';
import { ServicesDetailView } from './components/views/ServicesDetailView';
import { TeamDetailView } from './components/views/TeamDetailView';
import { SnapScrollToggle } from './components/ui/SnapScrollToggle';
import { PreloaderView, PreloaderViewProps } from './components/layout/PreloaderView';
import { Button } from './components/ui/Button';
import { PhoneIcon, CalendarIcon, PriceTagIcon, QuestionIcon, ExploreIcon } from './constants';
// import { AnimatedText } from './components/ui/AnimatedText'; // Not needed for QuickView title anymore
import { QuickAppointmentForm, AppointmentData } from './components/ui/QuickAppointmentForm';
import { AiAssistantView } from './components/views/AiAssistantView';

export type ViewName = 'main' | 'pricelistDetail' | 'approachDetail' | 'servicesDetail' | 'teamDetail';
export type AppLoadState = 'preloading' | 'active';
export type UserTheme = 'dark' | 'light';
export type UserScope = 'full' | 'quick';

const SCROLL_ANIMATION_DURATION = 750;

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewName>('main');
  const [isSnapScrollingEnabled, setIsSnapScrollingEnabled] = useState(true);

  const [appLoadState, setAppLoadState] = useState<AppLoadState>('preloading');
  const [userSelectedTheme, setUserSelectedTheme] = useState<UserTheme>('dark');
  const [userSelectedScope, setUserSelectedScope] = useState<UserScope>('full');
  const [showQuickAppointmentForm, setShowQuickAppointmentForm] = useState(false);
  const [showAiAssistantView, setShowAiAssistantView] = useState(false);

  const [previousViewContext, setPreviousViewContext] = useState<{ view: ViewName, sectionId?: string | null } | null>(null);

  const sectionIds = useMemo(() => [
    "hero", "ethos", "approach", "services",
    "pricelist", "testimonials", "surgical-care",
    "team-member-slobodanka", "team-member-djordje",
    "faq", "new-contact"
  ], []);

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isSnapping, setIsSnapping] = useState(false);
  const [targetScrollIdFromDetail, setTargetScrollIdFromDetail] = useState<string | null>(null);

  const handlePreloaderBegin: PreloaderViewProps['onBegin'] = (theme, scope) => {
    setUserSelectedTheme(theme);
    setUserSelectedScope(scope);
    setAppLoadState('active');
    document.documentElement.classList.add('theme-dark');
    document.documentElement.classList.remove('theme-light');
    document.body.style.backgroundColor = '#1A1D2E';
    document.body.style.color = '#F0EDE6';
  };

  const navigateTo = useCallback((newView: ViewName, targetId: string | null = null) => {
    if (newView !== 'main' && currentView !== newView) {
      setPreviousViewContext({
        view: currentView,
        sectionId: currentView === 'main' ? sectionIds[currentSectionIndex] : null,
      });
    }

    if (newView === 'main') {
      if (targetId) {
        const index = sectionIds.indexOf(targetId);
        if (index !== -1) {
          if (currentView !== 'main') {
            setTargetScrollIdFromDetail(targetId);
            setCurrentView('main');
          } else if (isSnapScrollingEnabled) {
            setCurrentSectionIndex(index);
            setIsSnapping(true);
          } else {
            const element = document.getElementById(targetId);
            element?.scrollIntoView({ behavior: 'smooth' });
          }
        }
      } else if (currentView !== 'main') {
        setTargetScrollIdFromDetail(isSnapScrollingEnabled ? sectionIds[0] : null);
        setCurrentView('main');
      }
    } else {
      setCurrentView(newView);
      window.scrollTo(0, 0);
    }
  }, [currentView, sectionIds, currentSectionIndex, isSnapScrollingEnabled]);

  const handleGoBack = useCallback(() => {
    if (previousViewContext) {
      const { view: prevView, sectionId: prevSectionId } = previousViewContext;
      setPreviousViewContext(null); // Consume the context for this back action
      navigateTo(prevView, prevSectionId);
    } else {
      navigateTo('main', sectionIds[0]); // Fallback
    }
  }, [previousViewContext, navigateTo, sectionIds]);


  useEffect(() => {
    if (currentView === 'main' && isSnapping && !targetScrollIdFromDetail && isSnapScrollingEnabled) {
      const element = document.getElementById(sectionIds[currentSectionIndex]);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        const timer = setTimeout(() => setIsSnapping(false), SCROLL_ANIMATION_DURATION);
        return () => clearTimeout(timer);
      } else {
        setIsSnapping(false);
      }
    } else if (!isSnapScrollingEnabled) {
      setIsSnapping(false);
    }
  }, [currentSectionIndex, currentView, sectionIds, targetScrollIdFromDetail, isSnapping, isSnapScrollingEnabled]);

  useEffect(() => {
    if (currentView === 'main' && targetScrollIdFromDetail) {
      const index = sectionIds.indexOf(targetScrollIdFromDetail);
      if (index !== -1) {
        if (isSnapScrollingEnabled) {
          setCurrentSectionIndex(index);
          setIsSnapping(true);
        } else {
          const element = document.getElementById(targetScrollIdFromDetail);
          element?.scrollIntoView({ behavior: 'smooth' });
        }
      }
      setTargetScrollIdFromDetail(null);
    }
  }, [currentView, targetScrollIdFromDetail, sectionIds, setIsSnapping, isSnapScrollingEnabled]);

  useEffect(() => {
    if (currentView !== 'main' || !isSnapScrollingEnabled) {
      if (!isSnapScrollingEnabled) setIsSnapping(false);
      return;
    }
    const handleWheel = (event: WheelEvent) => {
      if (showQuickAppointmentForm || showAiAssistantView) { // If any modal/overlay is open, prevent snap scroll
        event.preventDefault(); 
        return;
      }

      const atTop = currentSectionIndex === 0;
      const atBottom = currentSectionIndex === sectionIds.length - 1;

      // Prioritize allowing scroll off edges
      if ((atTop && event.deltaY < 0) || (atBottom && event.deltaY > 0)) {
        if(isSnapping) setIsSnapping(false); // Ensure snapping state is off if we scroll off edge
        return; // Do NOT prevent default, allow native scroll to reveal header/footer
      }
      
      // If not scrolling off an edge, and a snap is already in progress, prevent further actions
      if (isSnapping) {
        event.preventDefault();
        return;
      }
      
      // If we are here, it means we are trying to scroll between sections.
      // Prevent default to control the scroll and initiate a snap.
      event.preventDefault();
      setIsSnapping(true);

      if (event.deltaY > 0) { // Scrolling Down
        setCurrentSectionIndex(prev => Math.min(prev + 1, sectionIds.length - 1));
      } else { // Scrolling Up
        setCurrentSectionIndex(prev => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isSnapping, currentView, sectionIds, currentSectionIndex, isSnapScrollingEnabled, showQuickAppointmentForm, showAiAssistantView]);

  const navigateToNextSection = useCallback(() => {
    if (!isSnapScrollingEnabled) return;
    if (currentSectionIndex < sectionIds.length - 1) {
      setCurrentSectionIndex(prev => prev + 1);
      setIsSnapping(true);
    }
  }, [currentSectionIndex, sectionIds.length, setIsSnapping, isSnapScrollingEnabled]);

  const switchToFullScope = useCallback((targetSectionId?: string) => {
    setUserSelectedScope('full');
    navigateTo('main', targetSectionId || sectionIds[0]);
  }, [navigateTo, sectionIds]);

  const QuickViewContent: React.FC = () => {
    const primaryClinicPhone = "011 322 60 40";
    const formatPhoneForTel = (phone: string) => {
      const digits = phone.replace(/\s+/g, '');
      if (digits.startsWith('011')) return `+38111${digits.substring(3)}`;
      return `+381${digits}`;
    };
    const internationalPhoneNumber = formatPhoneForTel(primaryClinicPhone);
    const handleAppointmentFormSubmitSuccess = (data: AppointmentData) => {
      console.log("Podaci iz forme za brzi termin (za backend):", data);
      // Placeholder for actual backend submission
      // alert("Vaš zahtev je primljen i biće prosleđen. Očekujte potvrdu uskoro.");
    };

    if (showQuickAppointmentForm) {
      return <QuickAppointmentForm onClose={() => setShowQuickAppointmentForm(false)} onSubmitSuccess={handleAppointmentFormSubmitSuccess} />;
    }
    if (showAiAssistantView) {
      return <AiAssistantView onClose={() => setShowAiAssistantView(false)} />;
    }

    return (
      <div className="min-h-screen bg-palm-dark-indigo text-palm-off-white flex flex-col justify-center items-center p-6 pt-20">
        <h1 className="text-3xl md:text-4xl font-serifDisplay text-palm-luminous-teal mb-10 text-center">Brzi Uvid</h1>
        <div className="w-full max-w-xs space-y-4"> {/* max-w-xs for slightly smaller overall appearance */}
          <Button onClick={() => setShowAiAssistantView(true)} variant="outline" size="md" className="w-full"><QuestionIcon className="w-5 h-5 mr-2" />Pitajte Bilo Šta</Button>
          <Button onClick={() => setShowQuickAppointmentForm(true)} variant="outline" size="md" className="w-full"><CalendarIcon className="w-5 h-5 mr-2" />Zakažite Online</Button>
          <Button href={`tel:${internationalPhoneNumber}`} variant="outline" size="md" className="w-full"><PhoneIcon className="w-5 h-5 mr-2" />{primaryClinicPhone}</Button>
          <Button onClick={() => { setUserSelectedScope('full'); navigateTo('pricelistDetail'); }} variant="outline" size="md" className="w-full"><PriceTagIcon className="w-5 h-5 mr-2" />Cenovnik</Button>
          <Button onClick={() => switchToFullScope()} variant="outline" size="sm" className="w-full mt-6"><ExploreIcon className="w-5 h-5 mr-2" />Istražite Potpuno Utočište</Button>
        </div>
      </div>
    );
  };

  const MainContentWithArrows: React.FC = () => {
    const sectionComponentsMap: Record<string, React.ReactElement> = {
      "hero": <HeroSection id="hero" navigateTo={navigateTo} />,
      "ethos": <EthosSection id="ethos" onNavigateToApproachDetail={() => navigateTo('approachDetail')} />,
      "approach": <ApproachSection id="approach" onNavigateToServicesDetail={() => navigateTo('servicesDetail')} />,
      "services": <ServicesSection id="services" />,
      "pricelist": <PriceListSection id="pricelist" onNavigateToDetail={() => navigateTo('pricelistDetail')} />,
      "testimonials": <TestimonialsSection id="testimonials" />,
      "surgical-care": <SurgicalCareSection id="surgical-care" onNavigateToTeamDetail={() => navigateTo('teamDetail')} />,
      "team-member-slobodanka": <TeamMemberSlobodankaSection id="team-member-slobodanka" />,
      "team-member-djordje": <TeamMemberDjordjeSection id="team-member-djordje" />,
      "faq": <FAQSection id="faq" />,
      "new-contact": <NewContactSection id="new-contact" />
    };
    const visibleSectionComponents = sectionIds.map(id => sectionComponentsMap[id]).filter(Boolean);
    return (
      <>
        {visibleSectionComponents.map((sectionComponent, index) => {
          const isLast = index === visibleSectionComponents.length - 1;
          return React.cloneElement(sectionComponent as React.ReactElement<any>, {
            key: sectionIds[index],
            id: sectionIds[index],
            isLastSection: isLast,
            onNavigateNext: !isLast && isSnapScrollingEnabled ? navigateToNextSection : undefined,
            isPageScrolling: isSnapping && isSnapScrollingEnabled,
          });
        })}
      </>
    );
  };

  if (appLoadState === 'preloading') {
    return <PreloaderView onBegin={handlePreloaderBegin} />;
  }
  if (userSelectedScope === 'quick' && !showQuickAppointmentForm && !showAiAssistantView) {
    return (
      <div className="bg-palm-dark-indigo text-palm-off-white font-sansBody selection:bg-palm-luminous-teal selection:text-palm-dark-indigo">
        <QuickViewContent />
        <StickyCallButton />
      </div>
    );
  }
  if (showQuickAppointmentForm || showAiAssistantView) { // This ensures modals also have sticky button
    return (
      <div className="bg-palm-dark-indigo text-palm-off-white font-sansBody selection:bg-palm-luminous-teal selection:text-palm-dark-indigo">
        <QuickViewContent /> 
        <StickyCallButton />
      </div>
    );
  }

  const mainAppClasses = "flex flex-col min-h-screen bg-palm-dark-indigo text-palm-off-white font-sansBody selection:bg-palm-luminous-teal selection:text-palm-dark-indigo";
  return (
    <div className={mainAppClasses}>
      <Header navigateTo={navigateTo} currentView={currentView} />
      <main className="flex-grow pt-24 md:pt-32 lg:pt-36">
        {currentView === 'main' && <MainContentWithArrows />}
        {currentView === 'pricelistDetail' && <CenovnikDetailView onGoBack={handleGoBack} />}
        {currentView === 'approachDetail' && <ApproachDetailView onGoBack={handleGoBack} />}
        {currentView === 'servicesDetail' && <ServicesDetailView onGoBack={handleGoBack} onNavigateToMainSection={(targetId) => navigateTo('main', targetId)}/>}
        {currentView === 'teamDetail' && <TeamDetailView onGoBack={handleGoBack} onNavigateToContact={() => navigateTo('main', 'new-contact')} />}
      </main>
      <Footer />
      <StickyCallButton />
      <SnapScrollToggle isEnabled={isSnapScrollingEnabled} onToggle={() => setIsSnapScrollingEnabled(prev => !prev)} />
    </div>
  );
};
export default App;

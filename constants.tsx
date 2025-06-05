
import React from 'react';
import { Service, TeamMember } from './types';

export const APP_NAME = "Ginekološka ordinacija Palmotićeva";

export const LOGO_URL = "/media/PalmoticevaLogo bez pozadine-1080-534webp.webp";

// --- ICONS ---
export const PhoneIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
  </svg>
);
export const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
  </svg>
);
export const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);
export const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
  </svg>
);
export const MinusIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
    <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
  </svg>
);
export const DownArrowIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="24" height="24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
  </svg>
);
export const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);
export const ArrowRightIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);
export const PlaceholderSparkleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="32" height="32">
    <path fillRule="evenodd" d="M10 2a.75.75 0 01.75.75v2.5a.75.75 0 01-1.5 0v-2.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v2.5a.75.75 0 01-1.5 0v-2.5A.75.75 0 0110 15zM4.09 4.09a.75.75 0 011.06 0l1.77 1.77a.75.75 0 11-1.06 1.06L4.09 5.15a.75.75 0 010-1.06zm10.76 10.76a.75.75 0 011.06 0l1.77 1.77a.75.75 0 11-1.06 1.06l-1.77-1.77a.75.75 0 010-1.06zM15.91 4.09a.75.75 0 010 1.06l-1.77 1.77a.75.75 0 01-1.06-1.06l1.77-1.77a.75.75 0 011.06 0zm-10.76 10.76a.75.75 0 010 1.06l-1.77 1.77a.75.75 0 11-1.06-1.06l1.77-1.77a.75.75 0 011.06 0zM2.75 10a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5h-2.5a.75.75 0 01-.75-.75zM14.25 10a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5h-2.5a.75.75 0 01-.75-.75z" clipRule="evenodd" />
  </svg>
);
export const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);
export const ClockIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
export const MapPinIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);
export const EmailIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
  </svg>
);
export const CalendarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-3.75h.008v.008H12v-.008z" />
  </svg>
);
export const PriceTagIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
  </svg>
);
export const QuestionIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
  </svg>
);
export const ExploreIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);

// Placeholder Motif Components
export const SeedMotif: React.FC = () => <div className="absolute inset-0 opacity-10 animate-pulse">[SeedMotif Placeholder]</div>;
export const GentleCurrentsMotif: React.FC = () => <div className="absolute inset-0 opacity-10 animate-subtle-pulse">[GentleCurrentsMotif Placeholder]</div>;
export const LuminousPathwaysMotif: React.FC = () => <div className="absolute inset-0 opacity-10 animate-gentle-float">[LuminousPathwaysMotif Placeholder]</div>;


// --- TEAM MEMBERS ---
export const teamMembers: TeamMember[] = [
  {
    id: "slobodanka-petkovic",
    name: "Dr Slobodanka Petković",
    title: "Specijalista ginekologije i akušerstva",
    imageUrl: "/media/bobawbp.webp", // Corrected path
    bio: "Dr Slobodanka Petković je iskusni specijalista ginekologije i akušerstva sa višegodišnjim iskustvom u radu sa pacijentkinjama svih životnih doba. Posvećena je pružanju sveobuhvatne nege, od preventivnih pregleda do vođenja trudnoće i tretmana kompleksnih ginekoloških stanja. Njena stručnost i topao pristup čine je pouzdanim partnerom u očuvanju ženskog zdravlja.",
    contacts: { email: "s.petkovic@palmoticeva.com", phone: "011 322 6040" }
  },
  {
    id: "djordje-petkovic",
    name: "Dr Đorđe Petković",
    title: "Specijalista ginekologije i akušerstva",
    imageUrl: "/media/djordjewebp.webp", // Corrected path
    bio: "Dr Đorđe Petković je posvećen ginekolog sa fokusom na savremene dijagnostičke metode i minimalno invazivne procedure. Njegova ekspertiza obuhvata ultrazvučnu dijagnostiku, kolposkopiju i tretmane problema vezanih za plodnost. Strpljiv je i pažljiv, uvek spreman da odgovori na sva pitanja i pruži podršku svojim pacijentkinjama.",
    contacts: { email: "d.petkovic@palmoticeva.com", phone: "011 322 6040" }
  }
];

// --- SECTION TEXTS ---
export const sectionText = {
  hero: {
    headline: "Vaše Utočište za Žensko Zdravlje",
    subhead: "Dobrodošli u Palmotićevu, gde se stručnost i briga susreću u srcu Beograda. Otkrijte posvećenost, inovacije i mirno okruženje stvoreno za Vas.",
    cta: "Zakažite Termin",
    backgroundImageUrl: "/media/Palmoticeva-StockPhotowebpng.webp", // Corrected path
  },
  ethos: {
    headline: "Naša Filozofija: Poverenje i Stručnost",
    subhead: "Verujemo da je poverenje temelj svakog uspešnog lečenja. Naša misija je da pružimo individualizovan pristup i najviši standard nege u atmosferi sigurnosti i poštovanja.",
    imageUrl: undefined, // "/media/ethos_image.webp", // File doesn't exist
    cta: "Naš Pristup Pacijentkinjama"
  },
  approach: {
    headline: "Individualizovan Pristup Vašem Zdravlju",
    subhead: "Svaka žena je jedinstvena, kao i njene zdravstvene potrebe. Naš tim pristupa svakoj pacijentkinji sa posebnom pažnjom, kombinujući empatiju sa najnovijim medicinskim saznanjima.",
    cta: "Saznajte Više o Uslugama"
  },
  services: {
    headline: "Sveobuhvatne Ginekološke Usluge",
    subhead: "Od preventivnih pregleda do kompleksnih tretmana, nudimo širok spektar usluga prilagođenih Vašim potrebama. Koristimo savremenu opremu i tehnike kako bismo osigurali najbolju moguću negu.",
    items: [
      { id: 'pregledi', title: "Preventivni Pregledi", description: "Redovni ginekološki pregledi, PAPA test, kolposkopija.", icon: CheckCircleIcon, imageUrl: undefined /* "/media/service_pregled.webp" */ },
      { id: 'ultrazvuk', title: "Ultrazvučna Dijagnostika", description: "4D ultrazvuk, ekspertni ultrazvuk u trudnoći, ultrazvuk dojki.", icon: PlaceholderSparkleIcon, imageUrl: undefined /* "/media/service_ultrazvuk.webp" */ },
      { id: 'trudnoca', title: "Vođenje Trudnoće", description: "Kompletna prenatalna nega, praćenje rasta i razvoja bebe.", icon: CalendarIcon, imageUrl: undefined /* "/media/service_trudnoca.webp" */ },
      { id: 'kontracepcija', title: "Savetovalište za Kontracepciju", description: "Individualni pristup odabiru najbolje metode kontracepcije.", icon: PhoneIcon, imageUrl: undefined /* "/media/service_kontracepcija.webp" */ },
      { id: 'intervencije', title: "Manje Intervencije", description: "Biopsije, uklanjanje kondiloma, aplikacija spirale.", icon: PlusIcon, imageUrl: undefined /* "/media/service_intervencije.webp" */ },
      { id: 'kolposkopija', title: "Kolposkopija", description: "Detaljan pregled grlića materice pod uvećanjem.", icon: SearchIcon, imageUrl: undefined /* "/media/service_kolposkopija.webp" */ },
    ] as Service[],
    cta: "Hirurška Nega"
  },
  pricelist: {
    headline: "Transparentan Cenovnik Usluga",
    subhead: "Verujemo u transparentnost. Pogledajte naš detaljan cenovnik kako biste se informisali o cenama naših usluga. Za sve dodatne informacije, slobodno nas kontaktirajte.",
    viewFullCta: "Pogledajte Kompletan Cenovnik",
    disclaimer: "Cene su informativnog karaktera. Ordinacija zadržava pravo promene cena. Za najtačnije informacije, molimo Vas da nas kontaktirate."
  },
  testimonials: {
    headline: "Iskustva Naših Pacijentkinja",
    subhead: "Reči naših pacijentkinja su nam najvrednija preporuka. Pročitajte njihova iskustva i saznajte zašto nam poklanjaju svoje poverenje.",
    cta: "Podelite Vaše Iskustvo"
  },
  surgical: {
    headline: "Precizna Hirurška Nega",
    subhead: "Nudimo manje hirurške intervencije u lokalnoj anesteziji, uz najviše standarde sterilnosti i bezbednosti. Naš cilj je Vaš brz oporavak i minimalna nelagodnost.",
    imageUrl: undefined, // "/media/surgical_care_image.webp", // File doesn't exist
    cta: "Upoznajte Naš Tim"
  },
  teamMemberSlobodanka: { // Specific for Slobodanka's section
    headline: "Upoznajte Dr Slobodanku Petković",
    subhead: "Posvećena Vašem zdravlju i dobrobiti, sa višegodišnjim iskustvom i toplim pristupom.",
    cta: "Zakažite Termin" // General CTA, might navigate to contact
  },
  teamMemberDjordje: { // Specific for Djordje's section
    headline: "Upoznajte Dr Đorđa Petkovića",
    subhead: "Fokusiran na savremene metode dijagnostike i lečenja, uz pažljiv i strpljiv pristup.",
    cta: "Zakažite Termin"
  },
  faq: {
    headline: "Često Postavljana Pitanja",
    subhead: "Imate pitanja? Pogledajte odgovore na najčešće postavljana pitanja naših pacijentkinja. Ako ne pronađete odgovor, slobodno nas kontaktirajte.",
    cta: "Postavite Pitanje"
  },
  newContact: {
    headline: "Kontaktirajte Nas",
    subhead: "Tu smo za sva Vaša pitanja i zakazivanje termina. Posetite nas ili nas pozovite.",
    addressTitle: "Naša Adresa",
    address: "Palmotićeva 25a, 11000 Beograd, Srbija",
    email: "ordinacija@palmoticeva.com",
    phone1: "011 322 6040",
    phone2: "064 123 4567", // Placeholder, update if needed
    workingHoursTitle: "Radno Vreme",
    workingHours: {
      "Ponedeljak - Petak": "08:00 - 20:00",
      "Subota": "09:00 - 14:00",
      "Nedelja": "Ne radimo"
    },
    formTitle: "Pošaljite Nam Upit",
    cta: "Pošalji Upit",
    mapTitle: "Pronađite Nas na Mapi",
    clinicImageUrl: undefined, // "/media/clinic_image_modern.webp", // File doesn't exist
  },
  showcase: { // For ButtonsShowcase and CardsShowcase if used
    headline: "Interaktivni Elementi",
    subhead: "Istražite primere korisničkih interfejs elemenata korišćenih u našoj digitalnoj prezentaciji.",
    buttons: {
      headline: "Primeri Dugmadi",
      subhead: "Različiti stilovi i veličine dugmadi za jasnu i efikasnu interakciju.",
      variantsTitle: "Varijante",
      primary: "Primarno",
      secondary: "Sekundarno",
      outline: "Konturno",
      sizesTitle: "Veličine",
      small: "Malo",
      medium: "Srednje",
      large: "Veliko",
      statesTitle: "Stanja i Dodaci",
      withArrow: "Sa Strelcom",
      disabled: "Onemogućeno",
      link: "Kao Link"
    },
    cards: {
      card1Title: "Moderna Dijagnostika",
      card1Description: "Koristimo naprednu tehnologiju za preciznu i brzu dijagnostiku.",
      card1Cta: "Saznaj Više",
      card1ImageUrl: "/media/bobawbp.webp", // Using existing image
      card2Title: "Personalizovana Nega",
      card2Description: "Svakoj pacijentkinji pristupamo individualno, sa punom pažnjom.",
      card2Cta: "Naš Pristup",
      card2ImageUrl: "/media/djordjewebp.webp", // Using existing image
    }
  },
  // For Detail Views
  approachDetail: {
    headline: "Naš Pristup: Partnerstvo u Vašem Zdravlju",
    intro: "U Ginekološkoj ordinaciji Palmotićeva, verujemo da je najbolja nega rezultat saradnje između lekara i pacijentkinje. Naš pristup se temelji na sledećim principima:",
    pillars: [
      { id: "empatija", title: "Empatija i Razumevanje", points: ["Pažljivo slušamo Vaše potrebe i brige.", "Stvaramo atmosferu poverenja i otvorenosti.", "Poštujemo Vašu individualnost i odluke."] },
      { id: "strucnost", title: "Stručnost i Inovacije", points: ["Pratimo najnovija medicinska dostignuća.", "Koristimo savremenu opremu i tehnike.", "Kontinuirano se usavršavamo kako bismo pružili najbolju negu."] },
      { id: "prevencija", title: "Fokus na Prevenciji", points: ["Naglašavamo važnost redovnih pregleda.", "Edukujemo pacijentkinje o očuvanju zdravlja.", "Pružamo savete za zdrav način života."] },
      { id: "podrska", title: "Sveobuhvatna Podrška", points: ["Tu smo za Vas u svim fazama života.", "Pružamo podršku tokom trudnoće i menopauze.", "Pomažemo u rešavanju različitih ginekoloških problema."] }
    ],
    closing: "Vaše zdravlje i dobrobit su naš prioritet. Radujemo se što ćemo biti Vaš partner u očuvanju ženskog zdravlja.",
    backButtonCta: "Nazad na Početnu"
  },
  servicesDetail: {
    headline: "Detaljan Pregled Naših Usluga",
    intro: "Pružamo širok spektar ginekoloških usluga, koristeći najsavremeniju opremu i individualizovan pristup svakoj pacijentkinji. Naš cilj je da Vam obezbedimo najviši kvalitet nege u prijatnom i sigurnom okruženju.",
    services: [
      { id: 'pregledi', title: "Preventivni Pregledi", shortDescription: "Osnova ženskog zdravlja.", longDescription: "Redovni ginekološki pregledi su ključni za rano otkrivanje potencijalnih problema i očuvanje reproduktivnog zdravlja. Naši preventivni pregledi uključuju Papanikolau test, kolposkopiju, ultrazvučni pregled i pregled dojki.", keyBenefits: ["Rano otkrivanje bolesti", "Praćenje opšteg ginekološkog stanja", "Saveti o kontracepciji i planiranju porodice"], icon: CheckCircleIcon },
      { id: 'ultrazvuk', title: "Ultrazvučna Dijagnostika", shortDescription: "Precizan uvid u Vaše zdravlje.", longDescription: "Koristimo napredne ultrazvučne aparate, uključujući 4D tehnologiju, za detaljnu dijagnostiku ginekoloških stanja i praćenje trudnoće. Ultrazvuk omogućava vizualizaciju unutrašnjih organa i praćenje razvoja ploda.", keyBenefits: ["Detaljan prikaz organa male karlice", "Praćenje trudnoće i razvoja ploda", "Dijagnostika cista, mioma i drugih promena"], icon: PlaceholderSparkleIcon },
      { id: 'trudnoca', title: "Vođenje Trudnoće", shortDescription: "Stručna briga od začeća do porođaja.", longDescription: "Pružamo kompletnu prenatalnu negu, uključujući redovne preglede, ultrazvučno praćenje, genetska testiranja i savete o ishrani i načinu života tokom trudnoće. Naš cilj je zdrava mama i zdrava beba.", keyBenefits: ["Redovno praćenje zdravlja majke i bebe", "Rano otkrivanje mogućih komplikacija", "Podrška i saveti tokom cele trudnoće"], icon: CalendarIcon },
      { id: 'kontracepcija', title: "Savetovalište za Kontracepciju", shortDescription: "Individualni odabir najbolje metode.", longDescription: "Pomažemo Vam da odaberete najadekvatniju metodu kontracepcije na osnovu Vaših individualnih potreba, zdravstvenog stanja i životnog stila. Pružamo detaljne informacije o svim dostupnim opcijama.", keyBenefits: ["Personalizovan pristup", "Informisan izbor metode", "Diskretnost i poverljivost"], icon: PhoneIcon },
      { id: 'intervencije', title: "Manje Ginekološke Intervencije", shortDescription: "Brze i efikasne procedure.", longDescription: "U našoj ordinaciji obavljamo manje ginekološke intervencije u lokalnoj anesteziji, kao što su biopsije, uklanjanje kondiloma, polipa, aplikacija i uklanjanje spirale. Procedure se izvode uz maksimalnu pažnju i sterilnost.", keyBenefits: ["Minimalno invazivne metode", "Brz oporavak", "Izvođenje u prijatnom okruženju"], icon: PlusIcon }
    ],
    closing: "Za sva dodatna pitanja o našim uslugama ili zakazivanje termina, slobodno nas kontaktirajte. Tu smo da Vam pružimo najbolju moguću negu.",
    appointmentCta: "Zakažite Termin",
    backButtonCta: "Nazad na Početnu"
  },
  teamDetail: {
    headline: "Naš Stručni Tim",
    intro: "Upoznajte lekare koji čine srce Ginekološke ordinacije Palmotićeva. Posvećeni smo pružanju najkvalitetnije nege uz stručnost, iskustvo i iskrenu brigu za svaku pacijentkinju.",
    contactCta: "Kontaktirajte Nas",
    backButtonCta: "Nazad na Početnu"
  },
};

// --- TESTIMONIALS ---
export const testimonials = [
  { id: 't1', name: "Jelena P.", review: "Dr Petković je izuzetno profesionalna i pažljiva. Osećala sam se sigurno i informisano tokom cele trudnoće.", stars: 5, date: "15. Maj 2024." },
  { id: 't2', name: "Milica K.", review: "Ordinacija je prelepa, a osoblje ljubazno. Sve preporuke za redovne preglede!", stars: 5, date: "02. April 2024." },
  { id: 't3', name: "Ana B.", review: "Brzo su mi rešili problem koji me je dugo mučio. Hvala celom timu!", stars: 4, date: "20. Mart 2024." },
  { id: 't4', name: "Tamara S.", review: "Najbolji ultrazvuk u gradu! Dr Đorđe je detaljan i strpljiv.", stars: 5, date: "10. Februar 2024." },
];

// --- FAQs ---
export const faqs = [
  { id: 'faq1', question: "Kada treba obaviti prvi ginekološki pregled?", answer: "Prvi ginekološki pregled se preporučuje između 13. i 15. godine života, ili ranije ukoliko postoje određeni simptomi ili nedoumice. Takođe je važno obaviti pregled pre stupanja u prve seksualne odnose." },
  { id: 'faq2', question: "Koliko često treba raditi PAPA test?", answer: "Učestalost PAPA testa zavisi od godina i prethodnih rezultata. Generalno se preporučuje jednom godišnje, a Vaš lekar će Vas posavetovati o najboljem rasporedu za Vas." },
  { id: 'faq3', question: "Da li je 4D ultrazvuk bezbedan za bebu?", answer: "Da, 4D ultrazvuk je potpuno bezbedan i neinvazivan metod praćenja razvoja bebe. Koristi istu tehnologiju kao i standardni 2D ultrazvuk, ali pruža trodimenzionalni prikaz u realnom vremenu." },
  { id: 'faq4', question: "Kako da se pripremim za ginekološki pregled?", answer: "Za redovan ginekološki pregled nije potrebna posebna priprema. Preporučuje se da ne koristite vaginalete ili kreme 24-48h pre pregleda. Ukoliko imate menstruaciju, pregled je najbolje odložiti, osim ako nije hitno." },
];

// --- FULL PRICELIST (Example Structure) ---
export const fullPricelist = [
  { service: "Ginekološki pregled", price: "4.000 RSD", category: "Pregledi" },
  { service: "PAPA test", price: "2.500 RSD", category: "Dijagnostika" },
  { service: "Kolposkopija", price: "3.500 RSD", category: "Dijagnostika" },
  { service: "Ultrazvučni pregled (2D)", price: "4.500 RSD", category: "Ultrazvuk" },
  { service: "4D Ultrazvuk (sa snimkom)", price: "7.000 RSD", category: "Ultrazvuk" },
  { service: "Ekspertni ultrazvuk u trudnoći", price: "8.000 RSD", category: "Ultrazvuk" },
  { service: "Bris (VS, Chlamydia, Myco, Urea)", price: "3.000 RSD", category: "Dijagnostika" },
  { service: "Aplikacija spirale (sa spiralom)", price: "15.000 RSD", category: "Intervencije" },
  { service: "Uklanjanje spirale", price: "5.000 RSD", category: "Intervencije" },
  { service: "Biopsija grlića materice", price: "10.000 RSD", category: "Intervencije" },
  { service: "Konsultacije", price: "3.000 RSD", category: "Pregledi" },
];

// --- AI ASSISTANT DATA ---
export const ASSISTANT_PRICELIST_DATA = `
- Ginekološki pregled: 4.000 RSD
- PAPA test: 2.500 RSD
- Kolposkopija: 3.500 RSD
- Ultrazvučni pregled (2D): 4.500 RSD
- 4D Ultrazvuk (sa snimkom): 7.000 RSD
- Ekspertni ultrazvuk u trudnoći: 8.000 RSD
- Bris (VS, Chlamydia, Myco, Urea): 3.000 RSD
- Aplikacija spirale (sa spiralom): 15.000 RSD
- Uklanjanje spirale: 5.000 RSD
- Biopsija grlića materice: 10.000 RSD
- Konsultacije: 3.000 RSD
Ovo su cene nekih od naših najčešćih usluga. Za kompletan cenovnik ili specifične usluge, najbolje je da nas kontaktirate ili posetite naš sajt.
`;

export const ASSISTANT_DOCTOR_DATA = `
Naš tim čine Dr Slobodanka Petković i Dr Đorđe Petković, oboje specijalisti ginekologije i akušerstva.
Dr Slobodanka Petković je iskusni specijalista sa višegodišnjim iskustvom, posvećena sveobuhvatnoj nezi žena svih životnih doba.
Dr Đorđe Petković je fokusiran na savremene dijagnostičke metode i minimalno invazivne procedure.
Oboje su posvećeni pružanju najvišeg standarda nege.
`;

export const ASSISTANT_GENERAL_INFO_DATA = `
- Prvi ginekološki pregled preporučuje se između 13. i 15. godine, ili pre stupanja u seksualne odnose.
- PAPA test se obično radi jednom godišnje, ali lekar određuje najbolji raspored.
- 4D ultrazvuk je bezbedan za bebu.
- Za redovan pregled nije potrebna posebna priprema, osim izbegavanja vaginaleta 24-48h pre. Ako imate menstruaciju, pregled je najbolje odložiti.
- Redovni pregledi su ključni za rano otkrivanje bolesti.
- Ultrazvuk omogućava detaljan prikaz organa male karlice i praćenje trudnoće.
- Pružamo kompletnu prenatalnu negu.
- Pomažemo u odabiru najadekvatnije metode kontracepcije.
- Obavljamo manje ginekološke intervencije u lokalnoj anesteziji.
`;

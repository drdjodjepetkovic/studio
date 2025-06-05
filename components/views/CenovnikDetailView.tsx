import React, { useState, useMemo, useEffect } from 'react';
import { AnimatedText } from '../ui/AnimatedText';
import { Button } from '../ui/Button'; 
import { fullPricelist, SearchIcon, sectionText, ArrowLeftIcon } from '../../constants';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

interface PriceItem {
  service: string;
  price: string;
  category?: string;
}

interface CenovnikDetailViewProps {
  onGoBack: () => void; // Changed from onNavigateBack
}

const PriceRowDetail: React.FC<{ item: PriceItem, index: number }> = ({ item, index }) => {
  const { ref, isVisible } = useScrollAnimation<HTMLTableRowElement>({ threshold: 0.05, once: true });
  const delay = (index % 10) * 70; 

  return (
    <tr
      ref={ref}
      className={`transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
    >
      <td className="py-3.5 px-4 border-b border-palm-pink-100 text-left text-palm-gray-700 text-sm md:text-base">{item.service}</td>
      <td className="py-3.5 px-4 border-b border-palm-pink-100 text-right text-palm-mauve-dark font-semibold text-sm md:text-base">{item.price}</td>
    </tr>
  );
};

export const CenovnikDetailView: React.FC<CenovnikDetailViewProps> = ({ onGoBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const content = sectionText.pricelist; 

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = useMemo(() => 
    fullPricelist.filter(item =>
      item.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase()))
    ), [searchTerm]
  );
  
  const groupedItems = useMemo(() => {
    return filteredItems.reduce((acc, item) => {
      const category = item.category || 'Ostalo';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {} as Record<string, PriceItem[]>);
  }, [filteredItems]);

  const categories = Object.keys(groupedItems).sort();


  return (
    <div className="relative min-h-screen py-20 md:py-28 px-4 sm:px-8 md:px-12 lg:px-20 flex flex-col items-center bg-palm-white text-palm-gray-800"> {/* Added bg and text color */}
      <div className="relative z-0 w-full max-w-4xl text-center">
        <AnimatedText as="h1" className="text-4xl sm:text-5xl font-serifDisplay text-palm-gray-800 mb-8">
          Kompletan Cenovnik Usluga
        </AnimatedText>

        <div className="mb-10 w-full max-w-lg mx-auto sticky top-20 md:top-24 z-10 py-2 bg-palm-white/80 backdrop-blur-sm rounded-xl">
          <div className="relative">
            <input
              type="search"
              id="cenovnik-search"
              name="cenovnik-search"
              placeholder="Pretražite usluge ili kategorije..."
              aria-label="Pretražite usluge na kompletnom cenovniku"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-5 py-3.5 bg-white border-2 border-palm-pink-500 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-palm-pink-500/70 placeholder-palm-gray-400 text-palm-gray-700 transition-colors duration-300"
              autoComplete="off"
            />
            <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-palm-pink-500 pointer-events-none" />
          </div>
        </div>

        {categories.length > 0 ? (
          <div className="space-y-10">
            {categories.map(category => (
              <AnimatedText key={category} as="section" className="w-full bg-palm-white/70 backdrop-blur-md p-4 md:p-6 rounded-xl shadow-xl" delay="delay-200">
                 <h2 className="text-2xl md:text-3xl font-serifDisplay text-palm-pink-500 mb-6 text-left border-b-2 border-palm-pink-100 pb-2">
                  {category}
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-full table-auto">
                    <tbody>
                      {groupedItems[category].map((item, index) => (
                        <PriceRowDetail key={item.service + index} item={item} index={index} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </AnimatedText>
            ))}
          </div>
        ) : (
          <AnimatedText as="p" className="text-lg text-palm-gray-500 mt-10 py-10 bg-palm-white/70 backdrop-blur-md p-6 rounded-lg shadow-lg">
            Nijedna usluga ne odgovara Vašoj pretrazi. Molimo Vas pokušajte sa drugim terminom.
          </AnimatedText>
        )}
        
        <AnimatedText as="p" className="text-xs text-palm-gray-500 mt-12" delay="delay-300">
          {content.disclaimer}
        </AnimatedText>
        <AnimatedText as="div" className="mt-12" delay="delay-400">
            <Button 
              onClick={onGoBack} 
              variant="secondary"
              size="md"
            >
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Nazad
            </Button>
        </AnimatedText>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SHREE_SERVICE_CATEGORIES, SHREE_SERVICES } from '../../data/mockData';
import {
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Shirt,
  Crown,
  Layers,
  Feather,
  Gem,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Plus,
  Check,
  Search
} from 'lucide-react';

const ICON_MAP = {
  Sparkles,
  Shirt,
  Crown,
  Layers,
  Feather,
  Gem
};

export const ServiceSelectionScreen = () => {
  const {
    business,
    setCustomerStep,
    selectedServices,
    setSelectedServices
  } = useApp();

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleService = (serviceName) => {
    if (selectedServices.includes(serviceName)) {
      setSelectedServices(selectedServices.filter((s) => s !== serviceName));
    } else {
      setSelectedServices([...selectedServices, serviceName]);
    }
  };

  const handleClearAll = () => {
    setSelectedServices([]);
  };

  const handleNext = () => {
    setCustomerStep('good_features');
  };

  // Filter services by category and search
  const filteredServices = SHREE_SERVICES.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    if (activeCategory === 'all') return true;

    if (activeCategory === 'curtains') return service.category.includes('Curtains');
    if (activeCategory === 'mosquito_doors') return service.category.includes('Mosquito');
    if (activeCategory === 'blinds') return service.category.includes('Blinds');
    if (activeCategory === 'netlon') return service.category.includes('Netlon');
    if (activeCategory === 'furnishing') return service.category.includes('Furnishing');
    return true;
  });

  const categories = [
    { id: 'all', label: 'All Items (18)', icon: Sparkles },
    { id: 'curtains', label: 'Curtains (5)', icon: Sparkles },
    { id: 'mosquito_doors', label: 'Mosquito Doors (3)', icon: Shirt },
    { id: 'blinds', label: 'Window Blinds (4)', icon: Crown },
    { id: 'netlon', label: 'Netlon Mesh (3)', icon: Layers },
    { id: 'furnishing', label: 'Furnishing (3)', icon: Feather },
  ];

  return (
    <div className="w-full max-w-[430px] mx-auto flex flex-col items-center gap-3 p-1 sm:p-2 animate-fade-in text-center">
      {/* Store Header Card */}
      <div className="w-full bg-gradient-to-br from-[#FFF5F7]/95 via-[#FFFFFF] to-[#FAF5FF]/95 rounded-3xl border border-pink-100/90 shadow-[0_15px_35px_-10px_rgba(236,72,153,0.12)] p-4 sm:p-5 flex flex-col items-center relative overflow-hidden">
        {/* Background sparkles */}
        <div className="absolute top-3 left-4 text-pink-400 text-xs select-none">✦</div>
        <div className="absolute top-8 right-5 text-purple-300 text-xs select-none">✦</div>

        {/* Back Button */}
        <div className="w-full flex items-center justify-between mb-2">
          <button
            onClick={() => setCustomerStep('welcome')}
            className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <span className="text-[10px] font-extrabold bg-pink-100 text-pink-700 px-2.5 py-0.5 rounded-full border border-pink-200/60 shadow-2xs">
            Step 1 of 2
          </span>
        </div>

        {/* Store Logo */}
        <div className="relative mb-2 mt-0.5">
          <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden bg-gradient-to-tr from-pink-600 to-purple-700 shadow-md border-2 border-white ring-3 ring-pink-100/90 flex items-center justify-center">
            {business.logoUrl ? (
              <img
                src={business.logoUrl}
                alt={business.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-white">
                <Crown className="w-6 h-6 text-amber-300" />
                <span className="font-black text-[10px] font-['Outfit']">SHREE</span>
              </div>
            )}
          </div>
          <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 shadow-md ring-2 ring-white flex items-center justify-center">
            <CheckCircle2 className="w-3 h-3 stroke-[3]" />
          </div>
        </div>

        {/* Store Name */}
        <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight font-heading">
          {business.name}
        </h1>

        {/* Feedback Progress Bar */}
        <div className="w-full max-w-xs mt-3 bg-white p-1 rounded-full border border-pink-100/90 shadow-2xs flex items-center justify-between text-[10px] font-bold text-slate-500">
          <span className="pl-2.5 text-slate-600 font-bold">Your selections</span>
          <div className="flex-1 mx-2.5 bg-slate-100 h-2 rounded-full overflow-hidden relative">
            <div className="bg-gradient-to-r from-[#ec4899] via-[#d946ef] to-[#9333ea] h-full w-[45%] rounded-full shadow-2xs" />
          </div>
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 border border-pink-200 flex items-center justify-center text-[8px] text-pink-700 font-black mr-1 shadow-2xs">
            ✦
          </div>
          <span className="pr-2 font-black bg-gradient-to-r from-[#ec4899] to-[#9333ea] bg-clip-text text-transparent">45%</span>
        </div>

        {/* Section Heading */}
        <div className="mt-3.5">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            Which items did you choose <span className="bg-gradient-to-r from-[#ec4899] via-[#d946ef] to-[#9333ea] bg-clip-text text-transparent">today?</span>
          </h2>
          <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
            Tap the items you purchased or installed at <strong className="text-pink-700 font-bold">{business.name} ✨</strong>
          </p>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="w-full relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search eyelet curtains, zebra blinds, netlon..."
          className="w-full bg-white text-xs px-9 py-2.5 rounded-2xl border border-pink-200/80 shadow-xs focus:ring-2 focus:ring-pink-500 outline-none text-slate-800 placeholder-slate-400"
        />
        <Search className="w-4 h-4 text-pink-400 absolute left-3 top-1/2 -translate-y-1/2" />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        )}
      </div>

      {/* Category Filter Pills (Horizontal Scroll) */}
      <div className="w-full overflow-x-auto no-scrollbar flex items-center gap-1.5 py-1">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[#ec4899] to-[#9333ea] text-white shadow-sm shadow-pink-500/20'
                  : 'bg-white text-slate-600 border border-pink-100 hover:border-pink-300'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Select Services Header with Count & Clear All */}
      <div className="w-full flex items-center justify-between px-1 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-slate-900">Catalogue ({filteredServices.length})</span>
          <span className="text-[10px] font-extrabold bg-pink-100 text-pink-700 px-2.5 py-0.5 rounded-full border border-pink-200/60 shadow-2xs">
            {selectedServices.length} selected
          </span>
        </div>

        {selectedServices.length > 0 && (
          <button
            onClick={handleClearAll}
            className="flex items-center gap-1 text-[11px] font-bold text-pink-600 hover:text-pink-800 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" /> Clear
          </button>
        )}
      </div>

      {/* Interactive Products & Services List Cards */}
      <div className="w-full space-y-2">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => {
            const isSelected = selectedServices.includes(service.name);
            const IconComp = ICON_MAP[service.iconName] || Sparkles;

            return (
              <button
                key={service.id}
                onClick={() => toggleService(service.name)}
                className={`w-full bg-white rounded-2xl p-3 flex items-center justify-between text-left transition-all duration-200 cursor-pointer border ${
                  isSelected
                    ? 'border-pink-500 shadow-md shadow-pink-500/15 ring-2 ring-pink-500/30 bg-pink-50/20 scale-[1.01]'
                    : 'border-slate-200/80 hover:border-pink-300 shadow-2xs hover:shadow-xs'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {/* Service Icon */}
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${service.color} text-white flex items-center justify-center shrink-0 shadow-sm shadow-pink-500/20`}>
                    <IconComp className="w-4.5 h-4.5 stroke-[2.2]" />
                  </div>

                  {/* Service Info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-extrabold text-xs text-slate-900 leading-tight">
                        {service.name}
                      </span>
                      {service.badge && (
                        <span className="text-[8.5px] font-bold px-2 py-0.2 bg-pink-50 text-pink-700 rounded-md border border-pink-200/70">
                          {service.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5 leading-tight font-medium line-clamp-1">
                      {service.desc}
                    </p>
                  </div>
                </div>

                {/* Selection Checkbox Pill */}
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-2 transition-all ${
                  isSelected
                    ? 'border-pink-600 bg-pink-600 text-white shadow-xs'
                    : 'border-slate-300 bg-white'
                }`}>
                  {isSelected ? (
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  ) : (
                    <Plus className="w-3 h-3 text-slate-400" />
                  )}
                </div>
              </button>
            );
          })
        ) : (
          <div className="bg-white rounded-2xl p-6 text-center text-slate-400 text-xs border border-slate-200">
            No items matched "{searchQuery}". Try searching another name!
          </div>
        )}
      </div>

      {/* Floating Continue Button */}
      <button
        onClick={handleNext}
        className="w-full py-3.5 px-4 bg-gradient-to-r from-[#ec4899] via-[#d946ef] to-[#9333ea] hover:from-[#db2777] hover:via-[#c026d3] hover:to-[#7e22ce] text-white rounded-2xl font-black text-xs sm:text-sm shadow-xl shadow-pink-600/30 flex items-center justify-between transition-all cursor-pointer transform hover:-translate-y-0.5 mt-2"
      >
        <div className="flex items-center gap-2">
          <span className="tracking-wider uppercase">CONTINUE TO REVIEW DETAILS</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-extrabold bg-white/20 px-2.5 py-0.5 rounded-full">
            {selectedServices.length > 0 ? `${selectedServices.length} selected` : 'Skip / Next'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </button>

      {/* Micro Trust Footnote */}
      <div className="flex items-center justify-center gap-3 text-[9.5px] text-slate-400 font-semibold py-1">
        <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-emerald-600" /> 100% Quality Guaranteed</span>
        <span>|</span>
        <span className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-pink-600" /> Instant AI Review</span>
      </div>
    </div>
  );
};

import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Star,
  ThumbsUp,
  Clock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  UserCheck,
  Lightbulb,
  MessageSquare,
  Crown,
  Shirt,
  Gem,
  Heart,
  Flame
} from 'lucide-react';

const HIGHLIGHT_OPTIONS = [
  {
    id: 'fabric_quality',
    title: 'Fabric Quality',
    desc: 'Pure soft silk & breathable cotton',
    icon: Sparkles,
    colorClass: 'bg-gradient-to-r from-pink-500 to-rose-600 text-white'
  },
  {
    id: 'unique_designs',
    title: 'Unique Designs',
    desc: 'Exclusive sarees, chudis & co-ords',
    icon: Crown,
    colorClass: 'bg-gradient-to-r from-purple-600 to-pink-500 text-white'
  },
  {
    id: 'fitting_comfort',
    title: 'Perfect Fit & Comfort',
    desc: 'Flattering cuts & super soft feel',
    icon: Shirt,
    colorClass: 'bg-gradient-to-r from-amber-500 to-rose-500 text-white'
  },
  {
    id: 'matching_jewellery',
    title: 'Matching Jewellery',
    desc: 'Stunning artificial jewellery & shawls',
    icon: Gem,
    colorClass: 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
  },
  {
    id: 'pricing',
    title: 'Affordable Luxury',
    desc: 'Best pricing for designer pieces',
    icon: DollarSign,
    colorClass: 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
  },
  {
    id: 'hospitality',
    title: 'Warm Hospitality',
    desc: 'Courteous & patient boutique staff',
    icon: Heart,
    colorClass: 'bg-gradient-to-r from-rose-500 to-pink-600 text-white'
  },
  {
    id: 'trendy',
    title: 'Trending Outfits',
    desc: 'Modern festive & chic daily wear',
    icon: Flame,
    colorClass: 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white'
  },
  {
    id: 'trust',
    title: 'Trusted Boutique',
    desc: '25,000+ happy shoppers',
    icon: ThumbsUp,
    colorClass: 'bg-gradient-to-r from-amber-600 to-orange-500 text-white'
  }
];

export const FeatureSelectionScreen = () => {
  const {
    business,
    setCustomerStep,
    selectedServices,
    selectedGoodTags,
    setSelectedGoodTags,
    customerComment,
    setCustomerComment,
    generateLiveAiReview
  } = useApp();

  const toggleTag = (title) => {
    if (selectedGoodTags.includes(title)) {
      setSelectedGoodTags(selectedGoodTags.filter((t) => t !== title));
    } else {
      setSelectedGoodTags([...selectedGoodTags, title]);
    }
  };

  const handleClearAll = () => {
    setSelectedGoodTags([]);
  };

  const handleGenerate = async () => {
    setCustomerStep('good_ai_draft');
    await generateLiveAiReview(selectedGoodTags, customerComment, selectedServices);
  };

  return (
    <div className="w-full max-w-[430px] mx-auto flex flex-col items-center gap-3.5 p-1 sm:p-2 animate-fade-in text-center">
      {/* Store Header Card */}
      <div className="w-full bg-gradient-to-br from-[#FFF5F7]/95 via-[#FFFFFF] to-[#FAF5FF]/95 rounded-3xl border border-pink-100/90 shadow-[0_15px_35px_-10px_rgba(236,72,153,0.12)] p-4 sm:p-5 flex flex-col items-center relative overflow-hidden">
        {/* Background sparkles */}
        <div className="absolute top-3 left-4 text-pink-400 text-xs select-none">✦</div>
        <div className="absolute top-8 right-5 text-purple-300 text-xs select-none">✦</div>

        {/* Back Button and Step Indicator */}
        <div className="w-full flex items-center justify-between mb-2">
          <button
            onClick={() => setCustomerStep('services_selection')}
            className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <span className="text-[10px] font-extrabold bg-pink-100 text-pink-700 px-2.5 py-0.5 rounded-full border border-pink-200/60 shadow-2xs">
            Step 2 of 2
          </span>
        </div>

        {/* Store Logo */}
        <div className="relative mb-2 mt-0.5">
          <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden bg-gradient-to-tr from-pink-600 to-purple-700 shadow-lg border-2 border-white ring-3 ring-pink-100/90 flex items-center justify-center">
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

        {/* Selected Services Pill Preview */}
        {selectedServices && selectedServices.length > 0 && (
          <div className="flex items-center justify-center gap-1 mt-1.5 flex-wrap">
            <span className="text-[9.5px] font-bold text-slate-400">Collections:</span>
            {selectedServices.map((srv, idx) => (
              <span
                key={idx}
                className="text-[9px] font-extrabold bg-pink-50 text-pink-700 px-2 py-0.5 rounded-md border border-pink-200/80"
              >
                {srv}
              </span>
            ))}
          </div>
        )}

        {/* Feedback Progress Bar */}
        <div className="w-full max-w-xs mt-3 bg-white p-1 rounded-full border border-pink-100/90 shadow-2xs flex items-center justify-between text-[10px] font-bold text-slate-500">
          <span className="pl-2.5 text-slate-600 font-bold">Your feedback</span>
          <div className="flex-1 mx-2.5 bg-slate-100 h-2 rounded-full overflow-hidden relative">
            <div className="bg-gradient-to-r from-[#ec4899] via-[#d946ef] to-[#9333ea] h-full w-[75%] rounded-full shadow-2xs" />
          </div>
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 border border-pink-200 flex items-center justify-center text-[8px] text-pink-700 font-black mr-1 shadow-2xs">
            ✦
          </div>
          <span className="pr-2 font-black bg-gradient-to-r from-[#ec4899] to-[#9333ea] bg-clip-text text-transparent">75%</span>
        </div>

        {/* Section Heading */}
        <div className="mt-3.5">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-1">
            What did you like <span className="bg-gradient-to-r from-[#ec4899] via-[#d946ef] to-[#9333ea] bg-clip-text text-transparent">most?</span>
            <span className="text-pink-400 text-xs">✦✦</span>
          </h2>
          <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
            Pick your shopping highlights for your <strong className="text-pink-600 font-extrabold">review ✦</strong>
          </p>
        </div>
      </div>

      {/* Select Highlights Header with Count & Clear All */}
      <div className="w-full flex items-center justify-between px-1 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-slate-900">Select shopping highlights</span>
          <span className="text-[10px] font-extrabold bg-pink-100 text-pink-700 px-2.5 py-0.5 rounded-full border border-pink-200/60 shadow-2xs">
            {selectedGoodTags.length} selected
          </span>
        </div>

        {selectedGoodTags.length > 0 && (
          <button
            onClick={handleClearAll}
            className="flex items-center gap-1 text-[11px] font-bold text-pink-600 hover:text-pink-800 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" /> Clear
          </button>
        )}
      </div>

      {/* 2x4 Feature Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full">
        {HIGHLIGHT_OPTIONS.map((item) => {
          const isSelected = selectedGoodTags.includes(item.title);
          const IconComponent = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => toggleTag(item.title)}
              className={`relative bg-white rounded-2xl p-3 flex flex-col justify-between text-left transition-all duration-200 cursor-pointer h-[105px] border ${
                isSelected
                  ? 'border-pink-500 shadow-md shadow-pink-500/15 ring-2 ring-pink-500/30 scale-[1.02]'
                  : 'border-slate-200/80 hover:border-pink-300 shadow-2xs hover:shadow-xs'
              }`}
            >
              {/* Top Row: Icon and Radio Circle */}
              <div className="flex items-center justify-between w-full">
                <div className={`w-7 h-7 rounded-xl flex items-center justify-center ${item.colorClass} shadow-2xs`}>
                  <IconComponent className="w-3.5 h-3.5" />
                </div>

                <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                  isSelected
                    ? 'border-pink-600 bg-pink-600 text-white'
                    : 'border-slate-300 bg-white'
                }`}>
                  {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                </div>
              </div>

              {/* Title & Desc */}
              <div className="mt-1.5">
                <div className="font-extrabold text-[11px] text-slate-900 leading-tight">
                  {item.title}
                </div>
                <div className="text-[8.5px] text-slate-400 font-medium leading-tight mt-0.5 line-clamp-2">
                  {item.desc}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Add a Personal Touch (Optional) Box */}
      <div className="w-full bg-white rounded-3xl border border-pink-100/90 shadow-2xs p-3.5 text-left">
        <div className="flex items-center gap-1.5 mb-2">
          <MessageSquare className="w-3.5 h-3.5 text-pink-600" />
          <span className="text-[11px] font-extrabold text-slate-900">Mention your favourite outfit or special note</span>
          <span className="text-[10px] text-slate-400 font-medium">(optional)</span>
        </div>

        <div className="relative w-full">
          <input
            type="text"
            maxLength={100}
            value={customerComment}
            onChange={(e) => setCustomerComment(e.target.value)}
            placeholder="e.g. Soft silk saree for reception, perfect fit chudi set"
            className="w-full text-xs p-3 pr-12 bg-slate-50 border border-slate-200/80 rounded-2xl outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white text-slate-800 placeholder-slate-400 transition-all"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-medium text-slate-400">
            {customerComment.length}/100
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[9.5px] text-slate-400 font-medium mt-2">
          <Lightbulb className="w-3 h-3 text-amber-500 shrink-0" />
          <span>Add your outfit details to make your review authentic.</span>
        </div>
      </div>

      {/* Bottom Floating CTA Button */}
      <button
        onClick={handleGenerate}
        className="w-full py-3.5 px-4 bg-gradient-to-r from-[#ec4899] via-[#d946ef] to-[#9333ea] hover:from-[#db2777] hover:via-[#c026d3] hover:to-[#7e22ce] text-white rounded-2xl font-black text-xs sm:text-sm shadow-xl shadow-pink-600/30 flex items-center justify-between transition-all cursor-pointer transform hover:-translate-y-0.5"
      >
        <div className="flex items-center gap-2">
          <span className="tracking-wider uppercase">CREATE MY 5-STAR REVIEW</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-extrabold bg-white/20 px-2.5 py-0.5 rounded-full">
            {selectedGoodTags.length} selected
          </span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </button>

      {/* Micro Trust Footnote */}
      <div className="flex items-center justify-center gap-3 text-[9.5px] text-slate-400 font-semibold py-1">
        <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-emerald-600" /> Takes ~30s</span>
        <span>|</span>
        <span className="flex items-center gap-1"><UserCheck className="w-3 h-3 text-pink-600" /> No registration required</span>
        <span>|</span>
        <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-blue-600" /> 100% Anonymous</span>
      </div>
    </div>
  );
};

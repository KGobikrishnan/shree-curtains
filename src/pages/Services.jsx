import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Shirt, 
  Crown, 
  Layers, 
  Feather, 
  Gem, 
  MessageCircle, 
  Star, 
  MapPin, 
  Clock, 
  CheckCircle2,
  ArrowRight,
  Filter,
  Search
} from 'lucide-react';
import { UMAIYAAL_SERVICE_CATEGORIES, UMAIYAAL_SERVICES } from '../data/mockData';
import { ServiceCard } from '../components/ServiceCard';

export const Services = () => {
  const whatsappBookingUrl = "https://wa.me/919865860076?text=Hi%20Shree%20Curtains%20(A.%20Raja),%20I%20would%20like%20to%20enquire%20about%20curtains,%20blinds%20and%20mosquito%20doors.";
  
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = UMAIYAAL_SERVICE_CATEGORIES.map(cat => ({
    ...cat,
    items: cat.items.filter(item => {
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cat.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchSearch) return false;
      if (activeTab === 'all') return true;
      return cat.id === activeTab;
    })
  })).filter(cat => cat.items.length > 0);

  const tabs = [
    { id: 'all', label: 'All Collections (24)' },
    { id: 'cat_sarees', label: 'Sarees (8)' },
    { id: 'cat_chudi_coord', label: 'Chudi & Co-ords (3)' },
    { id: 'cat_dresses_kurtis', label: 'Kurtis & Maxis (2)' },
    { id: 'cat_bottom_wear', label: 'Bottom Wear (4)' },
    { id: 'cat_shawls_dupattas', label: 'Shawls (4)' },
    { id: 'cat_essentials_jewellery', label: 'Jewellery & Essentials (4)' }
  ];

  const totalItemCount = filteredCategories.reduce((acc, cat) => acc + cat.items.length, 0);

  return (
    <div className="min-h-screen bg-[#0e0714] text-gray-100 font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#ec4899] selection:text-white pb-20">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Our Collections & Services | Shree Curtains - Curtains, Blinds & Mosquito Doors</title>
        <meta 
          name="description" 
          content="Explore all exclusive services at Shree Curtains, Cumbum: Luxury eyelet curtains, blackout curtains, zebra blinds, roller blinds, mosquito doors, velcro netlon & home furnishing." 
        />
        <meta name="keywords" content="Shree Curtains, Cumbum curtains, eyelet curtains, blackout curtains, zebra blinds Theni, mosquito doors Cumbum, velcro netlon LF Road, sofa upholstery" />
      </Helmet>

      {/* Navigation Header Bar */}
      <header className="sticky top-0 z-40 bg-[#0e0714]/90 backdrop-blur-md border-b border-[#2a1338]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-tr from-[#ec4899] to-[#9333ea] flex items-center justify-center font-black text-white text-xl font-['Outfit'] shadow-[0_0_15px_rgba(236,72,153,0.4)] border border-pink-400/40">
              <img src="/logo.png" alt="Shree Curtains" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-xl font-extrabold text-white tracking-wider font-['Outfit'] uppercase block leading-none">
                Shree <span className="text-[#ec4899]">Curtains</span>
              </span>
              <span className="text-[10px] tracking-widest text-pink-300/70 font-semibold uppercase">
                LF Road, Cumbum • Ph: 98658 60076
              </span>
            </div>
          </Link>

          <nav className="flex items-center gap-2 sm:gap-4 text-sm font-medium">
            <Link 
              to="/services" 
              className="px-3.5 py-1.5 rounded-lg text-[#ec4899] bg-[#ec4899]/10 border border-[#ec4899]/30 font-semibold"
            >
              Collections
            </Link>
            <Link 
              to="/reviews" 
              className="px-3.5 py-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-[#1a0f24] transition-colors"
            >
              Reviews
            </Link>
            <a 
              href={whatsappBookingUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#ec4899] to-[#9333ea] text-white font-semibold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity shadow-md"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp Enquiry
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Banner Section */}
      <section className="relative overflow-hidden pt-10 pb-12 sm:pt-16 sm:pb-20 border-b border-[#231030]">
        {/* Glow ambient background orbs */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-r from-[#ec4899]/20 via-[#9333ea]/25 to-transparent blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1e0e2e] border border-[#3b1d54] mb-4 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-[#ec4899] animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide uppercase text-pink-200">
              Curtains, Mosquito Doors, Blinds, Netlon &amp; Furnishing
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-['Outfit'] mb-4 max-w-4xl mx-auto leading-tight sm:leading-none">
            Curated Elegance at <span className="bg-gradient-to-r from-[#ec4899] via-[#d946ef] to-[#a855f7] text-transparent bg-clip-text">Shree Curtains</span>
          </h1>

          <p className="text-sm sm:text-lg text-pink-100/70 max-w-2xl mx-auto mb-8 leading-relaxed">
            Specialist in customized luxury eyelet curtains, blackout drapes, zebra blinds, heavy-duty aluminum mosquito mesh doors, velcro netlon &amp; home interior furnishing.
          </p>

          {/* Search bar inside hero */}
          <div className="max-w-xl mx-auto relative mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by collection (e.g. eyelet curtains, zebra blinds, netlon)..."
              className="w-full bg-[#1b0a2c]/90 text-sm px-11 py-3 rounded-2xl border border-pink-500/30 text-white placeholder-pink-200/40 focus:border-[#ec4899] focus:ring-2 focus:ring-[#ec4899]/30 outline-none shadow-lg"
            />
            <Search className="w-4 h-4 text-pink-400 absolute left-4 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-pink-300 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center justify-center gap-2 flex-wrap max-w-4xl mx-auto">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#ec4899] to-[#9333ea] text-white shadow-md shadow-pink-500/20'
                      : 'bg-[#180827] text-pink-200/70 hover:text-white hover:bg-[#250d3c] border border-[#3b1853]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Structured Category Sections */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <section key={category.id} className="space-y-6">
              {/* Category Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#2d143f] pb-3 gap-1">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ec4899] animate-pulse" />
                    <h2 className="text-xl sm:text-2xl font-black text-white font-['Outfit'] tracking-tight">
                      {category.categoryName}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-pink-200/60 mt-0.5">
                    {category.categoryDesc}
                  </p>
                </div>
                <span className="text-[11px] font-bold text-pink-300 bg-[#220d35] px-2.5 py-1 rounded-full border border-pink-500/20 self-start sm:self-auto">
                  {category.items.length} {category.items.length === 1 ? 'Collection' : 'Collections'}
                </span>
              </div>

              {/* Grid of items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {category.items.map((item) => {
                  const whatsappItemUrl = `https://wa.me/919865860076?text=${encodeURIComponent(`Hi Shree Curtains (A. Raja), I would like to enquire about ${item.name}.`)}`;
                  return (
                    <div
                      key={item.id}
                      className="group bg-[#170a24] rounded-2xl p-5 border border-[#2d143f] hover:border-[#ec4899]/60 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(236,72,153,0.15)] relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#ec4899]/5 to-[#9333ea]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                      <div>
                        {/* Top Badge */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-pink-500/15 text-[#ec4899] border border-pink-500/30">
                            {item.badge}
                          </span>
                          <Sparkles className="w-3.5 h-3.5 text-pink-400 opacity-60 group-hover:opacity-100 group-hover:rotate-12 transition-all" />
                        </div>

                        {/* Title */}
                        <h3 className="text-base sm:text-lg font-bold text-white mb-2 font-['Outfit'] tracking-tight group-hover:text-[#ec4899] transition-colors">
                          {item.name}
                        </h3>

                        {/* Description */}
                        <p className="text-xs text-pink-100/70 leading-relaxed mb-4">
                          {item.desc}
                        </p>
                      </div>

                      {/* WhatsApp Enquiry Button */}
                      <a
                        href={whatsappItemUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs text-white bg-[#220e36] hover:bg-gradient-to-r hover:from-[#ec4899] hover:to-[#9333ea] border border-[#3e1a5e] hover:border-transparent transition-all shadow-sm group/btn"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#25D366] group-hover/btn:text-white" />
                        <span>Enquire on WhatsApp</span>
                        <ArrowRight className="w-3 h-3 text-pink-300 group-hover/btn:text-white group-hover/btn:translate-x-0.5 transition-transform" />
                      </a>
                    </div>
                  );
                })}
              </div>
            </section>
          ))
        ) : (
          <div className="text-center py-16 bg-[#170a24] rounded-3xl border border-[#2d143f]">
            <p className="text-pink-200/70 text-base mb-3">No collections found matching "{searchQuery}".</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveTab('all'); }}
              className="px-4 py-2 bg-gradient-to-r from-[#ec4899] to-[#9333ea] text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              Reset Search &amp; Filters
            </button>
          </div>
        )}
      </main>

      {/* Boutique Highlights Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded-3xl bg-gradient-to-b from-[#1c0c2c] to-[#12071d] border border-[#36184d] p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ec4899]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-[#ec4899] text-xs font-bold tracking-widest uppercase mb-2 block">
                Why Customers Love Shree Curtains
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] mb-4">
                Specialized in Curtains, Mosquito Doors, Blinds &amp; Netlon
              </h3>
              <p className="text-pink-100/70 text-sm leading-relaxed mb-6">
                From luxury eyelet and blackout curtains to zebra window blinds, heavy-duty aluminum mosquito mesh doors, and custom sofa furnishings — every installation is tailored with precision.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-[#ec4899]" />
                  <span>Luxury Eyelet &amp; Blackout Curtains</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-[#ec4899]" />
                  <span>Heavy-Duty Mosquito Mesh Doors</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-[#ec4899]" />
                  <span>Zebra &amp; Motorized Window Blinds</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-[#ec4899]" />
                  <span>Velcro Netlon &amp; Sofa Upholstery</span>
                </div>
              </div>
            </div>

            <div className="bg-[#170a24] p-6 sm:p-8 rounded-2xl border border-[#331749] text-center lg:text-left flex flex-col justify-between">
              <div>
                <h4 className="text-xl font-bold text-white mb-2 font-['Outfit']">Have a Custom Measurement Requirement?</h4>
                <p className="text-pink-100/70 text-xs sm:text-sm mb-6">
                  Visit our showroom on LF Road, Cumbum or call A. Raja sir for quick doorstep measurement &amp; quote.
                </p>
                <div className="space-y-2 text-xs text-pink-100/80 mb-6">
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <MapPin className="w-4 h-4 text-[#ec4899]" />
                    <span>232/3, LF Road, Cumbum, Theni Dt. - 625 516</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <Clock className="w-4 h-4 text-[#ec4899]" />
                    <span>Ph: 98658 60076 / 78110 05021</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={whatsappBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#ec4899] to-[#9333ea] hover:opacity-95 transition-opacity shadow-lg shadow-[#ec4899]/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
                <Link
                  to="/reviews"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-pink-200 bg-[#220e36] hover:bg-[#2e1349] border border-[#441c66] transition-colors"
                >
                  <span>Customer Reviews</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-[#231030] text-center text-xs text-pink-200/50">
        <p>© {new Date().getFullYear()} Shree Curtains, LF Road, Cumbum, Theni Dt. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Services;

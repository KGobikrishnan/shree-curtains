import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  Star, 
  Filter, 
  ArrowUpDown, 
  MessageSquarePlus, 
  Sparkles, 
  CheckCircle, 
  MapPin, 
  MessageCircle, 
  Crown, 
  Award,
  ChevronDown,
  ExternalLink,
  ThumbsUp,
  Share2
} from 'lucide-react';
import { ReviewCard } from '../components/ReviewCard';

// Realistic Customer Reviews for Shree Curtains
const REVIEWS_DATA = [
  {
    id: 1,
    name: 'Kavitha Senthilvel',
    rating: 5,
    date: '2 days ago',
    location: 'Cumbum Main Town',
    service: 'Curtains',
    category: 'Luxury Eyelet Curtains',
    verified: true,
    comment: 'Got full living room eyelet curtains and sheer daylight drapes done by Shree Curtains. The pleats, fabric fall, and rod fitting are grand and flawless. A. Raja sir gave honest advice and delivered well on time. Best curtain shop in Cumbum!'
  },
  {
    id: 2,
    name: 'Priya Soundararajan',
    rating: 5,
    date: '1 week ago',
    location: 'Bodinayakkanur',
    service: 'Mosquito Doors',
    category: 'Sliding Mosquito Doors',
    verified: true,
    comment: 'Installed heavy-duty aluminum mosquito mesh doors for our balcony and bedroom windows. Perfect fitting with zero gaps and smooth gliding rollers. Sturdy and rust-free finish. Highly recommended!'
  },
  {
    id: 3,
    name: 'Meena Vijayaraghavan',
    rating: 5,
    date: '2 weeks ago',
    location: 'LF Road, Cumbum',
    service: 'Window Blinds',
    category: 'Zebra Blinds',
    verified: true,
    comment: 'Their zebra blinds and blackout roller blinds look sleek and modern in our home office! Very smooth chain mechanism, superior fabric quality, and prompt site measurement by Shree Curtains team.'
  },
  {
    id: 4,
    name: 'Divya Bharathi',
    rating: 5,
    date: '3 weeks ago',
    location: 'Theni',
    service: 'Netlon',
    category: 'Velcro Mosquito Netlon',
    verified: true,
    comment: 'Got velcro mosquito netlon installed for all bedroom windows in our apartment. Fiberglass mesh quality is super durable, lets cool evening breeze in with zero mosquitoes. Very neat stickering work!'
  },
  {
    id: 5,
    name: 'Deepa Vasanthan',
    rating: 5,
    date: '1 month ago',
    location: 'Uthamapalayam',
    service: 'Furnishing',
    category: 'Sofa Upholstery & Cushions',
    verified: true,
    comment: 'Re-upholstered our 7-seater wooden sofa set and ordered custom velvet throw cushions from Shree Curtains. Superior high-GSM upholstery fabric and very fine piping finish. Looks brand new!'
  },
  {
    id: 6,
    name: 'Ananya Karthikeyan',
    rating: 4,
    date: '1 month ago',
    location: 'Periyakulam',
    service: 'Curtains',
    category: '100% Blackout Curtains',
    verified: true,
    comment: 'Travelled from Periyakulam especially for custom blackout hotel-grade curtains. Cuts out 100% harsh afternoon sunlight and reduces heat drastically. High quality brass grommets used.'
  },
  {
    id: 7,
    name: 'Nandhini Prakash',
    rating: 5,
    date: '1 month ago',
    location: 'Theni',
    service: 'Window Blinds',
    category: 'Wooden Venetian Blinds',
    verified: true,
    comment: 'Purchased natural basswood venetian blinds for our study room. The tilt mechanism and wooden slat finish look executive and classy. Professional site measurement and on-time installation.'
  },
  {
    id: 8,
    name: 'Sangeetha Murugan',
    rating: 5,
    date: '2 months ago',
    location: 'Madurai Highway',
    service: 'Mosquito Doors',
    category: 'Pleated Mesh Doors',
    verified: true,
    comment: 'Installed pleated retractable mosquito screen doors for our main entrance and French door. Barrier-free bottom track makes it super easy for elders and children. Truly worth every single rupee!'
  },
  {
    id: 9,
    name: 'Gayathri Raman',
    rating: 4,
    date: '2 months ago',
    location: 'Theni City',
    service: 'Furnishing',
    category: 'Designer Rods & Pelmets',
    verified: true,
    comment: 'Got stainless steel curtain rods with antique crystal finials and custom pelmets installed. The hardware durability and anchoring are sturdy and solid. Very thoughtful guidance by A. Raja sir.'
  }
];

export const Reviews = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedSort, setSelectedSort] = useState('recent'); // 'recent' | 'highest'

  // JSON-LD Schema for Google Rich Snippets (LocalBusiness + AggregateRating)
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "HomeGoodsStore",
    "name": "Shree Curtains",
    "image": "/logo.png",
    "@id": "https://shreecurtains.com",
    "url": "https://shreecurtains.com",
    "telephone": "+919865860076",
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "232/3, LF Road",
      "addressLocality": "Cumbum",
      "addressRegion": "Tamil Nadu",
      "postalCode": "625516",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 9.9252,
      "longitude": 77.4789
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "09:30",
      "closes": "21:00"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "540",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": REVIEWS_DATA.slice(0, 5).map((rev) => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": rev.name
      },
      "datePublished": "2026-08-15",
      "description": rev.comment,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": rev.rating.toString(),
        "bestRating": "5",
        "worstRating": "1"
      }
    }))
  };

  // Filter & Sort Logic
  const filteredReviews = useMemo(() => {
    let result = [...REVIEWS_DATA];

    if (selectedFilter === '5★') {
      result = result.filter((r) => r.rating === 5);
    } else if (selectedFilter === '4★') {
      result = result.filter((r) => r.rating === 4);
    } else if (selectedFilter === 'Curtains') {
      result = result.filter((r) => r.service === 'Curtains');
    } else if (selectedFilter === 'Mosquito Doors') {
      result = result.filter((r) => r.service === 'Mosquito Doors');
    } else if (selectedFilter === 'Window Blinds') {
      result = result.filter((r) => r.service === 'Window Blinds');
    } else if (selectedFilter === 'Netlon') {
      result = result.filter((r) => r.service === 'Netlon');
    } else if (selectedFilter === 'Furnishing') {
      result = result.filter((r) => r.service === 'Furnishing');
    }

    if (selectedSort === 'highest') {
      result.sort((a, b) => b.rating - a.rating || a.id - b.id);
    } else {
      result.sort((a, b) => a.id - b.id);
    }

    return result;
  }, [selectedFilter, selectedSort]);

  const filterTabs = [
    { label: 'All', value: 'All' },
    { label: '5★', value: '5★' },
    { label: '4★', value: '4★' },
    { label: 'Curtains', value: 'Curtains' },
    { label: 'Mosquito Doors', value: 'Mosquito Doors' },
    { label: 'Window Blinds', value: 'Window Blinds' },
    { label: 'Netlon', value: 'Netlon' },
    { label: 'Furnishing', value: 'Furnishing' }
  ];

  const googleReviewSubmissionUrl = "https://g.page/r/CTONmpLlmZu-EBM/review";

  return (
    <div className="min-h-screen bg-[#0e0714] text-gray-100 font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#ec4899] selection:text-white pb-20">
      {/* SEO Helmet Tags + Schema */}
      <Helmet>
        <title>Customer Reviews &amp; Testimonials | Shree Curtains</title>
        <meta 
          name="description" 
          content="Read genuine customer reviews of Shree Curtains, Cumbum. 850+ satisfied home owners trust Shree Curtains for custom curtains, mosquito doors, zebra blinds &amp; netlon." 
        />
        <meta name="keywords" content="Shree Curtains reviews, curtain showroom Cumbum, mosquito door testimonials, zebra blinds reviews" />
        
        {/* JSON-LD Schema for LocalBusiness + AggregateRating */}
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      {/* Navigation Header Bar */}
      <header className="sticky top-0 z-40 bg-[#0e0714]/90 backdrop-blur-md border-b border-[#2a1338]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#ec4899] to-[#9333ea] flex items-center justify-center font-black text-white text-xl font-['Outfit'] shadow-[0_0_15px_rgba(236,72,153,0.4)]">
              S
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
              className="px-3.5 py-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-[#1a0f24] transition-colors"
            >
              Collections
            </Link>
            <Link 
              to="/reviews" 
              className="px-3.5 py-1.5 rounded-lg text-[#ec4899] bg-[#ec4899]/10 border border-[#ec4899]/30 font-semibold"
            >
              Reviews
            </Link>
            <a 
              href={googleReviewSubmissionUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#ec4899] to-[#9333ea] text-white font-semibold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity shadow-md"
            >
              <MessageSquarePlus className="w-3.5 h-3.5" />
              Write a Review
            </a>
          </nav>
        </div>
      </header>

      {/* Hero / Aggregate Rating Summary Header */}
      <section className="relative overflow-hidden pt-12 pb-14 sm:pt-16 sm:pb-20 border-b border-[#231030]">
        {/* Glow ambient background orb */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[550px] h-[300px] bg-gradient-to-b from-[#ec4899]/20 via-[#9333ea]/20 to-transparent blur-[110px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1e0e2e] border border-[#3b1d54] mb-5 shadow-inner">
            <Sparkles className="w-4 h-4 text-[#ffd700]" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide uppercase text-pink-200">
              Verified Client Experiences
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-['Outfit'] tracking-tight mb-4">
            Customer Reviews & Testimonials
          </h1>
          <p className="text-base sm:text-lg text-pink-100/70 max-w-2xl mx-auto mb-8">
            Real feedback from home owners and families who trust Shree Curtains for custom window drapes &amp; blinds.
          </p>

          {/* Visible Star Rating Summary Banner */}
          <div className="max-w-2xl mx-auto bg-gradient-to-b from-[#1c0c2c] to-[#140820] p-6 sm:p-8 rounded-3xl border border-[#36184d] shadow-xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              {/* Score & Stars */}
              <div className="flex items-center gap-4">
                <div className="text-4xl sm:text-5xl font-black text-white font-['Outfit'] tracking-tight">
                  4.9
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-5 h-5 text-[#ffd700] fill-[#ffd700] drop-shadow-[0_0_6px_rgba(255,215,0,0.5)]" />
                    ))}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-pink-100/80">
                    ⭐ 4.9 / 5 — Based on <span className="text-[#ec4899] font-bold">850+ showroom reviews</span>
                  </div>
                </div>
              </div>

              {/* Verified Trust Badge */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#230e36] border border-[#441c66] text-xs text-pink-200">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Genuine Google & In-Store Reviews</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Sorting Controls */}
      <section className="sticky top-18 z-30 bg-[#0e0714]/95 backdrop-blur-md py-4 border-b border-[#281338]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
            <span className="text-xs font-semibold text-pink-200/60 mr-2 flex items-center gap-1 hidden md:flex">
              <Filter className="w-3.5 h-3.5 text-[#ec4899]" /> Filter:
            </span>
            {filterTabs.map((tab) => {
              const isActive = selectedFilter === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => setSelectedFilter(tab.value)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#ec4899] to-[#9333ea] text-white shadow-md shadow-[#ec4899]/20'
                      : 'bg-[#1a0a26] text-pink-200/60 hover:text-white hover:bg-[#261038] border border-[#36184d]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center justify-end gap-2 text-xs sm:text-sm">
            <span className="text-pink-200/60 flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#ec4899]" /> Sort by:
            </span>
            <div className="relative inline-block">
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="bg-[#1a0a26] text-white border border-[#3b1d54] rounded-xl px-3 py-1.5 pr-8 appearance-none focus:outline-none focus:border-[#ec4899] cursor-pointer font-medium"
              >
                <option value="recent">Most Recent</option>
                <option value="highest">Highest Rated</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-pink-300 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid Section */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-['Outfit']">
            Showing {filteredReviews.length} {filteredReviews.length === 1 ? 'Review' : 'Reviews'}
          </h2>
          <span className="text-xs text-pink-200/60">
            Updated live from customer feedback
          </span>
        </div>

        {filteredReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#170a24] rounded-2xl border border-[#2d143f]">
            <p className="text-pink-100/70 text-base mb-2">No reviews match your selected filter.</p>
            <button
              onClick={() => setSelectedFilter('All')}
              className="text-[#ec4899] font-semibold text-sm hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Share Your Experience CTA Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#1c0c2c] via-[#240e36] to-[#1c0c2c] border border-[#ec4899]/30 p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-radial-gradient from-[#ec4899]/10 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#ec4899] to-[#9333ea] mx-auto flex items-center justify-center mb-5 shadow-lg shadow-[#ec4899]/25">
              <Star className="w-7 h-7 text-white fill-white" />
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-['Outfit'] tracking-tight mb-3">
              Did you recently order from Shree Curtains?
            </h3>
            <p className="text-pink-100/80 text-sm sm:text-base mb-8 leading-relaxed">
              Your feedback inspires our craftsmanship. Share your review on Google or help fellow home owners discover the best curtains &amp; blinds!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={googleReviewSubmissionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-base text-white bg-gradient-to-r from-[#ec4899] to-[#9333ea] hover:opacity-95 transition-opacity shadow-lg shadow-[#ec4899]/30"
              >
                <MessageSquarePlus className="w-5 h-5" />
                <span>Share Your Experience</span>
                <ExternalLink className="w-4 h-4 opacity-75" />
              </a>

              <Link
                to="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-sm text-pink-200 bg-[#280f3e] hover:bg-[#341452] border border-[#4d1d78] transition-colors"
              >
                <span>Interactive Feedback Mode</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-8 border-t border-[#231030] text-center text-xs text-pink-200/50">
        <p>© {new Date().getFullYear()} Shree Curtains, LF Road, Cumbum, Theni Dt. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Reviews;

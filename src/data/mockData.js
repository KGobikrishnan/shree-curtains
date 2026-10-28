export const INITIAL_BUSINESS = {
  id: "shree-curtains",
  slug: "shree-curtains",
  name: "Shree Curtains",
  branch: "Cumbum Main Showroom",
  category: "Curtains, Blinds, Mosquito Doors & Interior Furnishing",
  ownerName: "A. Raja",
  email: "shreecurtain@gmail.com",
  phone: "+91 98658 60076",
  alternatePhone: "+91 78110 05021",
  plan: "Pro Enterprise",
  monthlyScanLimit: 5000,
  logoUrl: "/logo.png",
  bannerUrl: "/visiting_card.png",
  tagline: "Specialist in Curtains, Mosquito Door, Blinds, Netlon & Furnishing",
  address: "232/3, LF Road, Cumbum, Theni Dt., - 625 516",
  googlePlaceUrl: "https://g.page/r/CSkwyUzjxg-pEBM/review",
  verified: true,
  rating: 4.9,
  totalReviews: 850,
  status: "ACTIVE",
  createdAt: "2019-01-10"
};

export const INITIAL_MERCHANTS_LIST = [
  INITIAL_BUSINESS
];

// Product & Services Catalogue for Shree Curtains
export const UMAIYAAL_SERVICE_CATEGORIES = [
  {
    id: 'cat_curtains',
    categoryName: 'Curtains Collection',
    categoryDesc: 'Luxury eyelet curtains, custom pinch pleat drapes, blackouts & sheer tissue drapes',
    iconName: 'Sparkles',
    items: [
      { id: 'luxury-eyelet-curtains', name: 'Luxury Eyelet Curtains', badge: 'Best Seller', desc: 'Modern ring-top curtains with deep graceful folds and premium fabric finish.' },
      { id: 'pinch-pleat-drapes', name: 'Pinch Pleat Drapes', badge: 'Grand Look', desc: 'Handcrafted tailored pinch pleat curtains with designer valance & pelmets.' },
      { id: 'blackout-curtains', name: '100% Blackout Curtains', badge: 'High Demand', desc: 'Thermal insulated sun-blocking drapes for maximum room darkening & privacy.' },
      { id: 'sheer-tissue-curtains', name: 'Sheer & Tissue Curtains', badge: 'Daylight Elegance', desc: 'Soft luminous sheer drapes creating a breezy, airy, sunlight-diffused ambience.' },
      { id: 'motorized-curtains', name: 'Motorized & Smart Curtains', badge: 'Modern Tech', desc: 'Remote and app-controlled automated curtain track installations.' }
    ]
  },
  {
    id: 'cat_mosquito_doors',
    categoryName: 'Mosquito Doors',
    categoryDesc: 'Heavy-duty aluminum mosquito mesh doors, sliding systems & pleated screens',
    iconName: 'Shirt',
    items: [
      { id: 'hinged-mosquito-doors', name: 'Openable Mosquito Doors', badge: 'Heavy Duty', desc: 'Sturdy powder-coated aluminum framed doors with high-tensile SS mesh.' },
      { id: 'sliding-mosquito-doors', name: 'Sliding Mosquito Doors', badge: 'Space Saver', desc: 'Smooth roller gliding mosquito sliding doors for balconies and French windows.' },
      { id: 'pleated-mesh-doors', name: 'Pleated Mesh Doors', badge: 'Top Trending', desc: 'Modern barrier-free collapsible retractable insect screen systems.' }
    ]
  },
  {
    id: 'cat_blinds',
    categoryName: 'Window Blinds',
    categoryDesc: 'Zebra blinds, motorized roller blinds, wooden Venetian blinds & vertical blinds',
    iconName: 'Crown',
    items: [
      { id: 'zebra-blinds', name: 'Zebra / Day & Night Blinds', badge: 'Best Seller', desc: 'Dual layered sheer & opaque stripe fabric blinds for versatile light control.' },
      { id: 'roller-blinds', name: 'Roller Blinds', badge: 'Modern Minimal', desc: 'Sleek, hassle-free pull-down blinds for modern homes and corporate spaces.' },
      { id: 'wooden-venetian-blinds', name: 'Wooden & Venetian Blinds', badge: 'Luxury', desc: 'Natural wood & aluminum horizontal slats for warm acoustic and glare control.' },
      { id: 'vertical-office-blinds', name: 'Vertical Blinds', badge: 'Corporate', desc: 'Classic vertical louvers ideal for tall patio doors and wide windows.' }
    ]
  },
  {
    id: 'cat_netlon',
    categoryName: 'Netlon Insect Screens',
    categoryDesc: 'Velcro detachable netlon, magnetic insect screens & SS safety mesh',
    iconName: 'Layers',
    items: [
      { id: 'velcro-netlon-screens', name: 'Velcro Detachable Netlon', badge: 'Washable', desc: 'Custom cut flexible fiberglass mosquito net with industrial adhesive Velcro tape.' },
      { id: 'magnetic-window-netlon', name: 'Magnetic Window Netlon', badge: 'Click & Seal', desc: 'Neat magnetic perimeter frame for effortless removal, cleaning, and snaps back.' },
      { id: 'ss-safety-mesh', name: 'SS 304 Safety Mesh & Bird Net', badge: 'Durable', desc: 'Rustproof stainless steel insect & anti-bird protective mesh systems.' }
    ]
  },
  {
    id: 'cat_furnishing',
    categoryName: 'Home Furnishing',
    categoryDesc: 'Custom sofa upholstery, designer cushions, curtain rods, pelmets & rugs',
    iconName: 'Feather',
    items: [
      { id: 'sofa-upholstery', name: 'Sofa Fabric & Upholstery', badge: 'Custom Crafted', desc: 'Premium velvet, suede, and jacquard reupholstering for living room sofas.' },
      { id: 'designer-curtain-rods', name: 'Curtain Rods, Tracks & Pelmets', badge: 'Hardware', desc: 'Antique brass, stainless steel and wooden drapery rods with ornate finials.' },
      { id: 'cushions-linens', name: 'Custom Cushions & Bed Linen', badge: 'Accent', desc: 'Color-coordinated accent cushion covers, bolster covers, and bed runners.' }
    ]
  }
];

// Flat list of all 18 specific client services for selection and card rendering
export const UMAIYAAL_SERVICES = UMAIYAAL_SERVICE_CATEGORIES.flatMap(cat => 
  cat.items.map(item => ({
    id: item.id,
    name: item.name,
    category: cat.categoryName,
    badge: item.badge,
    desc: item.desc,
    iconName: cat.iconName,
    color: cat.id === 'cat_curtains' ? 'from-rose-500 to-pink-600' :
           cat.id === 'cat_mosquito_doors' ? 'from-purple-600 to-pink-500' :
           cat.id === 'cat_blinds' ? 'from-amber-500 to-rose-500' :
           cat.id === 'cat_netlon' ? 'from-emerald-600 to-teal-600' :
           'from-violet-600 to-purple-600'
  }))
);

export const FEATURE_TAGS = [
  { id: "fabric_quality", title: "Fabric & Material Quality", desc: "Heavy drape fabrics & long-lasting finish", iconName: "Sparkles", defaultSelected: true },
  { id: "accurate_measurement", title: "Accurate Measurement & Fit", desc: "Pinpoint window measurement & neat fixing", iconName: "Crown", defaultSelected: true },
  { id: "fitting_stitching", title: "Flawless Pleats & Stitching", desc: "Uniform eyelet rings & double stitched hemlines", iconName: "Shirt", defaultSelected: true },
  { id: "blinds_netlon", title: "Sturdy Mosquito & Netlon", desc: "Rust-free frames & 100% insect protection", iconName: "Gem", defaultSelected: false },
  { id: "best_pricing", title: "Best Affordable Pricing", desc: "Budget friendly with premium luxury look", iconName: "DollarSign", defaultSelected: false },
  { id: "customer_service", title: "Warm Hospitality", desc: "A. Raja & team's polite guidance & quick assistance", iconName: "Heart", defaultSelected: false },
  { id: "latest_trends", title: "Modern Blinds & Trends", desc: "Zebra blinds, blackout & designer drapery", iconName: "Flame", defaultSelected: false },
  { id: "trusted_boutique", title: "Trusted Showroom", desc: "850+ satisfied customers in Cumbum", iconName: "ThumbsUp", defaultSelected: false }
];

export const NEGATIVE_ISSUE_TAGS = [
  { id: "size_fitting", label: "📏 Window Measurement or Fit Issue" },
  { id: "installation_timing", label: "⏱️ Delivery / Installation Timing" },
  { id: "fabric_feel", label: "🧵 Fabric or Material Query" },
  { id: "staff_response", label: "💬 Staff Assistance / Hospitality" },
  { id: "billing_pricing", label: "💳 Pricing or Billing Query" },
  { id: "hardware_query", label: "🔩 Rods / Hardware / Alignment Assistance" }
];

export const INITIAL_FEEDBACK_ENTRIES = [
  {
    id: "FB-1001",
    merchantId: "shree-curtains",
    customerName: "Karthikeyan Ramasamy",
    contactInfo: "+91 98401 54321",
    contactType: "phone",
    sentiment: "NEEDS_ATTENTION",
    rating: 2,
    issues: ["Window Measurement or Fit Issue"],
    comment: "Ordered pinch pleat curtains for living room, wanted minor length adjustment. A. Raja sir attended promptly.",
    status: "NEW",
    priority: "HIGH",
    touchpoint: "Billing Counter (QR-01)",
    createdAt: "2026-08-20T11:30:00Z",
    notes: [
      { id: "n1", author: "A. Raja (Shree Curtains)", text: "Customer contacted and curtain height adjusted smoothly.", timestamp: "2026-08-20T12:00:00Z" }
    ]
  }
];

export const INITIAL_QR_STANDS = [
  {
    id: "QR-01",
    merchantId: "shree-curtains",
    name: "Shree Curtains Reception Counter",
    location: "Main Showroom - LF Road",
    scans: 850,
    goodCount: 815,
    convertedReviews: 690,
    negativeInterceptions: 12,
    active: true,
    createdAt: "2026-01-15"
  }
];

export const INITIAL_ANALYTICS_DATA = {
  totalScans: 850,
  totalPositiveConversions: 690,
  totalNegativeInterceptions: 12,
  averageRating: 4.9,
  conversionRate: 88.5
};

// Fallback dynamic generator
export const getMerchantBySlugOrFallback = (slug, existingList = INITIAL_MERCHANTS_LIST) => {
  if (!slug || slug === 'shree-curtains' || slug === 'shree' || slug === 'umaiyaal-botique') return INITIAL_BUSINESS;
  
  const normalized = slug.toLowerCase().trim();
  const found = existingList.find(m => m.slug.toLowerCase() === normalized || m.id.toLowerCase() === normalized);
  if (found) return found;

  const formattedName = normalized
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    id: `m-custom-${normalized}`,
    slug: normalized,
    name: formattedName,
    branch: "Cumbum Main Showroom",
    category: "Curtains, Blinds, Mosquito Doors & Interior Furnishing",
    ownerName: "A. Raja",
    email: `contact@${normalized.replace(/[^a-z0-9]/g, '')}.com`,
    phone: "+91 98658 60076",
    plan: "Pro Enterprise",
    monthlyScanLimit: 5000,
    logoUrl: "/logo.png",
    bannerUrl: "/visiting_card.png",
    tagline: `Welcome to ${formattedName}! Specialists in Curtains, Blinds & Mosquito Doors.`,
    address: "232/3, LF Road, Cumbum, Theni Dt., - 625 516",
    googlePlaceUrl: `https://maps.google.com/?q=${encodeURIComponent(formattedName + ' Cumbum')}`,
    verified: true,
    rating: 4.9,
    totalReviews: 850,
    status: "ACTIVE",
    createdAt: new Date().toISOString().split('T')[0]
  };
};

import { generateSmartReviewSuite } from './reviewGenerator';

// Client-side AI Review Generator customized for Shree Curtains
export const generateClientSideAiReview = ({
  businessName = "Shree Curtains",
  businessCategory = "Curtains, Blinds, Mosquito Doors & Interior Furnishing",
  selectedServices = [],
  tags = [],
  customerComment = "",
  rating = 5,
  tone = "seo"
}) => {
  return generateSmartReviewSuite({
    businessName,
    businessCategory,
    selectedServices,
    tags,
    customerComment,
    rating,
    tone
  });
};

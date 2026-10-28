import React from 'react';
import { 
  Sparkles, 
  Shirt, 
  Crown, 
  Layers, 
  Feather, 
  Gem, 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle, 
  Heart
} from 'lucide-react';

// Map icons to boutique services
const ICON_MAP = {
  sarees: Sparkles,
  chudi: Shirt,
  kurtis: Crown,
  pants: Layers,
  shawls: Feather,
  jewellery: Gem
};

export const ServiceCard = ({ service, onEnquire }) => {
  const IconComponent = ICON_MAP[service.iconKey] || Sparkles;
  const whatsappUrl = `https://wa.me/919865860076?text=${encodeURIComponent(`Hi Shree Curtains (A. Raja), I would like to enquire about ${service.name}.`)}`;

  return (
    <div className="group relative bg-[#170a24] rounded-2xl p-6 sm:p-7 border border-[#2d143f] hover:border-[#ec4899]/60 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(236,72,153,0.18)]">
      {/* Background glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#ec4899]/5 to-[#9333ea]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div>
        {/* Top bar: Icon & Popular Badge */}
        <div className="flex items-center justify-between mb-5">
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-[#220e36] to-[#2d1246] border border-[#3f1a60] flex items-center justify-center text-[#ec4899] group-hover:text-white group-hover:bg-gradient-to-br group-hover:from-[#ec4899] group-hover:to-[#9333ea] group-hover:border-transparent transition-all duration-300 shadow-md">
            <IconComponent className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>

          {service.badge && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#ec4899]/15 text-[#ec4899] border border-[#ec4899]/30 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#ec4899]" />
              {service.badge}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2.5 font-['Outfit'] tracking-tight group-hover:text-[#ec4899] transition-colors duration-200">
          {service.name}
        </h3>

        {/* Short Description */}
        <p className="text-pink-100/70 text-sm sm:text-base leading-relaxed mb-5">
          {service.description}
        </p>

        {/* Key Features / Highlights */}
        {service.highlights && service.highlights.length > 0 && (
          <ul className="space-y-2 mb-6 pt-2 border-t border-[#29123b]">
            {service.highlights.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-pink-100/80">
                <CheckCircle2 className="w-4 h-4 text-[#ec4899] shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Action CTA Button */}
      <div className="pt-2">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => onEnquire && onEnquire(service)}
          className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl font-semibold text-sm sm:text-base text-white bg-[#220e36] hover:bg-gradient-to-r hover:from-[#ec4899] hover:to-[#9333ea] border border-[#3e1a5e] hover:border-transparent transition-all duration-200 shadow-md group/btn"
        >
          <MessageCircle className="w-4 h-4 text-[#25D366] group-hover/btn:text-white transition-colors" />
          <span>Enquire on WhatsApp</span>
          <ArrowRight className="w-4 h-4 text-pink-300 group-hover/btn:text-white group-hover/btn:translate-x-0.5 transition-all" />
        </a>
      </div>
    </div>
  );
};

export default ServiceCard;

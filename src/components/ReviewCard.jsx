import React from 'react';
import { Star, CheckCircle, Sparkles, Calendar, Shirt, Crown, Gem, MapPin } from 'lucide-react';

export const ReviewCard = ({ review }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => {
      const isFilled = index < rating;
      return (
        <Star
          key={index}
          className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${
            isFilled
              ? 'text-[#ffd700] fill-[#ffd700] drop-shadow-[0_0_6px_rgba(255,215,0,0.4)]'
              : 'text-[#381a4d] fill-transparent'
          }`}
        />
      );
    });
  };

  // Extract initials for customer avatar
  const initials = review.name
    ? review.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'UB';

  return (
    <article className="group relative bg-[#170a24] rounded-2xl p-6 sm:p-7 border border-[#2d143f] hover:border-[#ec4899]/50 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(236,72,153,0.15)]">
      {/* Subtle hover gradient glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#ec4899]/5 to-[#9333ea]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div>
        {/* Header: Customer Info & Rating */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#ec4899] to-[#9333ea] p-[2px] shadow-sm shrink-0">
              <div className="w-full h-full bg-[#1b0a2c] rounded-full flex items-center justify-center font-bold text-white text-sm font-['Outfit']">
                {initials}
              </div>
            </div>

            {/* Name and Location */}
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="font-bold text-white text-base sm:text-lg font-['Outfit'] tracking-tight">
                  {review.name}
                </h4>
                {review.verified && (
                  <span title="Verified Customer" className="text-emerald-400">
                    <CheckCircle className="w-4 h-4 fill-emerald-500/20 text-emerald-400" />
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-2 text-xs text-pink-200/60 mt-0.5">
                {review.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#ec4899]" />
                    {review.location}
                  </span>
                )}
                {review.location && review.date && <span>•</span>}
                {review.date && (
                  <time className="flex items-center gap-1 text-pink-200/60">
                    <Calendar className="w-3 h-3 text-pink-300/40" />
                    {review.date}
                  </time>
                )}
              </div>
            </div>
          </div>

          {/* Star Rating Badge */}
          <div className="flex flex-col items-end shrink-0">
            <div className="flex items-center gap-1">
              {renderStars(review.rating)}
            </div>
            <span className="text-[11px] font-semibold text-pink-200/60 mt-1">
              {review.rating}.0 / 5.0
            </span>
          </div>
        </div>

        {/* Review Text */}
        <p className="text-pink-100/90 text-sm sm:text-[15px] leading-relaxed mb-5 font-normal">
          "{review.comment}"
        </p>
      </div>

      {/* Meta tags at bottom (Category, Service Used) */}
      <div className="pt-4 border-t border-[#29123b] flex flex-wrap items-center gap-2">
        {review.service && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-[#220d35] text-[#ec4899] border border-[#ec4899]/30">
            <Sparkles className="w-3 h-3" />
            {review.service}
          </span>
        )}

        {review.category && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-[#1d0b2e] text-pink-200 border border-[#3b1853]">
            <Shirt className="w-3 h-3 text-pink-300" />
            {review.category}
          </span>
        )}
      </div>
    </article>
  );
};

export default ReviewCard;

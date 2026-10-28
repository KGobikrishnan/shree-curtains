import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';
import { Copy, Check, ExternalLink, Star, X, CheckCircle2, Sparkles, MapPin, Heart, ThumbsUp } from 'lucide-react';

export const SimulatedGoogleReviewModal = () => {
  const {
    showGoogleModal,
    setShowGoogleModal,
    aiDraft,
    business,
    resetCustomerFlow
  } = useApp();

  const [copied, setCopied] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (showGoogleModal) {
      setIsSubmitted(false);
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.6 }
      });
    }
  }, [showGoogleModal]);

  if (!showGoogleModal) return null;

  const handleCopyText = () => {
    navigator.clipboard.writeText(aiDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitReview = () => {
    // 1. Copy review text to clipboard
    navigator.clipboard.writeText(aiDraft);
    setCopied(true);

    // 2. Trigger high-energy confetti explosion
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 }
    });

    // 3. Open Google Maps review place URL in new window
    window.open(business.googlePlaceUrl || 'https://g.page/r/CSkwyUzjxg-pEBM/review', '_blank');

    // 4. Show Beautiful Animated "Thanks for your review!" popup
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fade-in text-left">
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 p-6">
        {/* Close Button */}
        <button
          onClick={() => {
            setShowGoogleModal(false);
            setIsSubmitted(false);
            resetCustomerFlow();
          }}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {isSubmitted ? (
          /* THANK YOU CELEBRATION POPUP SCREEN */
          <div className="py-4 flex flex-col items-center text-center animate-fade-in">
            {/* Glowing Success Animation Icon */}
            <div className="relative mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-xl shadow-emerald-500/30 animate-bounce">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>
              <div className="absolute -top-1 -right-1 text-amber-400 text-xl animate-pulse">✦</div>
              <div className="absolute -bottom-1 -left-1 text-purple-500 text-lg animate-pulse">✨</div>
            </div>

            {/* Main Thank You Title */}
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              Thanks for your review! 🎉
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1.5 max-w-xs leading-relaxed">
              Your feedback means the world to <strong className="text-slate-800">{business.name}</strong>. Google Maps has been opened to post your copied review.
            </p>

            {/* 5 Stars Rating Confirmation */}
            <div className="my-5 p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-200/80 w-full flex flex-col items-center">
              <div className="flex items-center gap-1 text-amber-400 mb-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> 5-Star Review Draft Submitted
              </span>
            </div>

            {/* Reassurance Banner */}
            <div className="w-full py-2 px-3 bg-slate-50 rounded-2xl border border-slate-100 text-[10px] text-slate-500 font-medium mb-4 flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-600 shrink-0" />
              <span>We truly appreciate your support and visit today!</span>
            </div>

            {/* Done Button */}
            <button
              onClick={() => {
                setShowGoogleModal(false);
                setIsSubmitted(false);
                resetCustomerFlow();
              }}
              className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-2xl font-black text-xs shadow-lg shadow-purple-600/25 transition-all cursor-pointer"
            >
              Done & Return to Home
            </button>
          </div>
        ) : (
          /* GOOGLE REVIEW INTERACTIVE FORM */
          <>
            {/* Modal Header Icon & Business Title */}
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
              <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white font-extrabold flex items-center justify-center text-lg shadow-md shadow-blue-600/20">
                G
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 leading-tight">Google Review Page</h3>
                <p className="text-xs text-slate-500 font-semibold">{business.name}</p>
              </div>
            </div>

            {/* Notification Banner */}
            <div className="p-3 bg-blue-50/80 rounded-2xl border border-blue-200/80 text-blue-800 text-xs font-semibold flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Your AI review draft is copied! Select stars and submit below.</span>
            </div>

            {/* Add Star Rating Box */}
            <div className="mb-4">
              <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">
                ADD STAR RATING:
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-center">
                <div className="flex items-center justify-center gap-2 text-amber-400 py-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-7 h-7 fill-amber-400 text-amber-400 transform hover:scale-110 transition-transform cursor-pointer" />
                  ))}
                </div>
                <div className="text-xs font-extrabold text-amber-600 mt-1">
                  ☀️ Outstanding (5 Stars)
                </div>
              </div>
            </div>

            {/* Review Text Box */}
            <div className="mb-5">
              <div className="flex items-center justify-between text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1.5">
                <span>REVIEW TEXT</span>
                <button
                  onClick={handleCopyText}
                  className="text-purple-600 hover:underline flex items-center gap-1 font-bold lowercase cursor-pointer"
                >
                  📋 {copied ? 'copied!' : 'paste copied review'}
                </button>
              </div>

              <div className="p-3.5 bg-white rounded-2xl border border-slate-200/90 text-xs text-slate-800 font-medium leading-relaxed max-h-32 overflow-y-auto">
                {aiDraft}
              </div>
            </div>

            {/* Submit Action Button */}
            <button
              onClick={handleSubmitReview}
              className="w-full flex items-center justify-center gap-2 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-extrabold text-xs sm:text-sm shadow-lg shadow-blue-600/25 transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <span>Submit Review on Google</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

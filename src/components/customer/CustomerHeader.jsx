import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MozhiQrCode, downloadBrandedQrStandee } from '../common/MozhiQrCode';
import {
  Sparkles,
  Shirt,
  Crown,
  Globe,
  Share2,
  MapPin,
  Star,
  Menu,
  X,
  QrCode,
  Download,
  Copy,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  UserCheck,
  Lock
} from 'lucide-react';

export const CustomerHeader = () => {
  const { business, resetCustomerFlow } = useApp();
  const [copiedLink, setCopiedLink] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [showMenuDropdown, setShowMenuDropdown] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const currentLiveUrl = window.location.href;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: business.name,
        text: `Share your review for ${business.name}!`,
        url: currentLiveUrl
      }).catch(() => { });
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentLiveUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDownloadQr = async () => {
    try {
      setIsDownloading(true);
      await downloadBrandedQrStandee({
        businessName: business.name,
        url: currentLiveUrl,
        color: '#be185d',
        iconSrc: '/mozhi-icon.png'
      });
    } catch (err) {
      console.error('Error downloading QR Standee:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <header className="w-full bg-transparent pt-2.5 pb-0.5 px-4 relative z-40">
        <div className="max-w-[430px] mx-auto flex items-center justify-between">
          {/* Brand Logo & Product Name */}
          <button
            onClick={resetCustomerFlow}
            className="flex items-center hover:opacity-90 transition-opacity cursor-pointer text-left py-0.5"
            title="Mozhi"
          >
            <img
              src="/mozhi.png"
              alt="Mozhi"
              className="h-12 sm:h-14 w-auto max-h-16 object-contain drop-shadow-xs"
            />
          </button>

          {/* Action Buttons: QR Standee & Menu Icon */}
          <div className="flex items-center gap-2">
            {/* QR / Standee pill button */}
            <button
              onClick={() => setShowQrModal(true)}
              className="flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-800 rounded-2xl text-xs font-extrabold border border-pink-200/80 shadow-xs transition-all cursor-pointer"
            >
              <QrCode className="w-4 h-4 text-pink-600" />
              <span>QR / Standee</span>
            </button>

            {/* Menu round button */}
            <button
              onClick={() => setShowMenuDropdown(!showMenuDropdown)}
              className="w-9 h-9 flex items-center justify-center bg-white hover:bg-slate-50 text-slate-800 rounded-2xl border border-pink-200/80 shadow-xs transition-colors cursor-pointer"
              title="Menu Options"
            >
              {showMenuDropdown ? (
                <X className="w-4.5 h-4.5 text-slate-800" />
              ) : (
                <Menu className="w-4.5 h-4.5 text-slate-800" />
              )}
            </button>
          </div>
        </div>

        {/* Full Menu Dropdown Popup List */}
        {showMenuDropdown && (
          <div className="absolute top-16 right-4 w-72 bg-white rounded-3xl shadow-2xl border border-pink-100 p-2.5 space-y-1.5 animate-fade-in z-50">
            {/* 1. Share Review Page Link */}
            <button
              onClick={() => {
                handleShare();
                setShowMenuDropdown(false);
              }}
              className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white rounded-2xl text-xs font-extrabold shadow-md shadow-pink-600/20 transition-all cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Share2 className="w-4 h-4 text-white" /> Share Review Page Link
              </span>
              <span className="text-[10px] font-extrabold bg-white/20 text-white px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                {copiedLink ? 'Copied!' : 'Copy / Share'}
              </span>
            </button>

            {/* 2. Official Google Business Page Link */}
            <a
              href={business.googlePlaceUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setShowMenuDropdown(false)}
              className="flex items-center justify-between p-3 bg-slate-50 hover:bg-pink-50/50 rounded-2xl text-xs font-bold text-slate-800 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-pink-600" /> Official Google Business Page
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>

            {/* 3. Store Hours & Information */}
            <button
              onClick={() => {
                setShowInfoModal(true);
                setShowMenuDropdown(false);
              }}
              className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-pink-50/50 rounded-2xl text-xs font-bold text-slate-800 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-pink-600" /> Boutique Information & Address
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        )}
      </header>

      {/* COMPACT SLEEK QR / STANDEE HUB MODAL */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in text-center overflow-y-auto">
          <div className="relative w-full max-w-[395px] bg-white rounded-3xl shadow-2xl border border-slate-100 p-4 sm:p-5 flex flex-col items-center my-auto">
            {/* Close Button */}
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-3.5 right-3.5 p-1.5 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header Title with Star Sparkles */}
            <div className="w-full flex items-center justify-between pr-8 mb-3">
              <div className="flex items-center gap-2 text-left">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#ec4899] via-[#d946ef] to-[#9333ea] flex items-center justify-center text-white shadow-md shadow-pink-500/20 shrink-0">
                  <QrCode className="w-4.5 h-4.5 stroke-[2.5]" />
                </div>
                <div>
                  <h2 className="text-base font-black text-slate-900 leading-tight">
                    <span className="bg-gradient-to-r from-[#ec4899] via-[#d946ef] to-[#9333ea] bg-clip-text text-transparent">QR</span> / Standee Hub
                  </h2>
                  <p className="text-[10px] text-slate-400 font-medium">
                    Scan or share review link
                  </p>
                </div>
              </div>
            </div>

            {/* Main Inner Card: Live Standee Preview (Compact) */}
            <div className="w-full bg-gradient-to-br from-[#FFF5F7] via-white to-[#FAF5FF] rounded-2xl border border-pink-100/90 shadow-sm p-3 sm:p-4 flex flex-col items-center relative overflow-hidden">
              {/* Compact Store Profile Row */}
              <div className="w-full flex items-center gap-2.5 bg-white/90 p-2 rounded-xl border border-pink-100/80 shadow-2xs mb-2.5 text-left">
                {/* Store Avatar Logo */}
                <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-purple-700 shadow-xs border-2 border-white ring-2 ring-pink-100 flex items-center justify-center text-white">
                    {business.logoUrl ? (
                      <img
                        src={business.logoUrl}
                        alt={business.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Crown className="w-5 h-5 text-amber-300" />
                    )}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 bg-emerald-500 text-white rounded-full p-0.5 ring-1 ring-white flex items-center justify-center">
                    <CheckCircle2 className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                </div>

                {/* Name & Rating */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <h3 className="text-xs font-black text-slate-900 truncate">
                      {business.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5 text-[10px] text-slate-600 font-bold">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400 shrink-0" />
                    <span>{business.rating || '4.9'} Rating</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-pink-600 font-extrabold">5-Star Gate</span>
                  </div>
                </div>
              </div>

              {/* Main QR Code Box with Mozhi Center Icon & Circular Dots Pattern */}
              <div className="p-2 sm:p-2.5 bg-white rounded-2xl shadow-md border-2 border-pink-200/80 flex items-center justify-center relative my-1">
                <MozhiQrCode
                  id="hub-qr-code-canvas"
                  value={currentLiveUrl}
                  size={215}
                  color="#be185d"
                  iconSrc="/mozhi-icon.png"
                />
              </div>

              {/* Scan Info Footer Pill */}
              <p className="text-[10px] text-slate-500 font-semibold mt-2 flex items-center gap-1">
                <Smartphone className="w-3 h-3 text-pink-600" />
                <span>Point camera to leave a 5-star review</span>
              </p>
            </div>

            {/* 3 Action Buttons Grid */}
            <div className="grid grid-cols-3 gap-2 w-full mt-3">
              {/* Copy Link Button */}
              <button
                onClick={handleCopyLink}
                className="flex flex-col items-center justify-center py-2 px-1.5 bg-white hover:bg-pink-50/50 text-slate-800 border border-pink-200/80 rounded-xl transition-all cursor-pointer shadow-2xs group"
              >
                <Copy className="w-3.5 h-3.5 text-pink-600 mb-0.5 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-extrabold text-slate-900 leading-tight">
                  {copiedLink ? 'Copied!' : 'Copy Link'}
                </span>
              </button>

              {/* Share Link Button */}
              <button
                onClick={handleShare}
                className="flex flex-col items-center justify-center py-2 px-1.5 bg-gradient-to-r from-[#ec4899] via-[#d946ef] to-[#9333ea] hover:from-[#db2777] hover:via-[#c026d3] hover:to-[#7e22ce] text-white rounded-xl shadow-md shadow-pink-500/20 transition-all cursor-pointer group"
              >
                <Share2 className="w-3.5 h-3.5 text-white mb-0.5 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-extrabold leading-tight">Share Link</span>
              </button>

              {/* Download QR Button */}
              <button
                onClick={handleDownloadQr}
                disabled={isDownloading}
                className="flex flex-col items-center justify-center py-2 px-1.5 bg-white hover:bg-pink-50/50 text-slate-800 border border-pink-200/80 rounded-xl transition-all cursor-pointer shadow-2xs group disabled:opacity-50"
              >
                <Download className={`w-3.5 h-3.5 text-pink-600 mb-0.5 group-hover:scale-110 transition-transform ${isDownloading ? 'animate-bounce' : ''}`} />
                <span className="text-[10px] font-extrabold text-slate-900 leading-tight">
                  {isDownloading ? 'Saving...' : 'Download QR'}
                </span>
              </button>
            </div>

            {/* Privacy Trust Bar */}
            <div className="w-full mt-2.5 py-1 px-2.5 bg-gradient-to-r from-pink-50/80 via-purple-50/80 to-pink-50/80 rounded-xl border border-pink-100 flex items-center justify-center gap-2 text-[9px] font-extrabold text-pink-950 shadow-2xs">
              <span className="flex items-center gap-1 text-pink-700">
                <ShieldCheck className="w-2.5 h-2.5" /> 100% Anonymous
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-purple-700">
                <Lock className="w-2.5 h-2.5" /> Secure
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-pink-700">
                <UserCheck className="w-2.5 h-2.5" /> No App Needed
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Store Info Modal Popup */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 relative text-left">
            <button
              onClick={() => setShowInfoModal(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-pink-50 border border-pink-100 flex items-center justify-center text-pink-600 mb-3">
              <Crown className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-extrabold text-slate-900">{business.name}</h3>
            <p className="text-xs text-pink-600 font-semibold mt-0.5">{business.branch}</p>

            <div className="mt-4 space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>{business.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
                <span>{business.rating} / 5.0 Rating ({business.totalReviews} reviews)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-pink-500 shrink-0" />
                <span>Exclusive Designer Sarees &amp; Ethnic Wear</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end items-center">
              <button
                onClick={() => setShowInfoModal(false)}
                className="px-5 py-2.5 bg-pink-600 hover:bg-pink-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

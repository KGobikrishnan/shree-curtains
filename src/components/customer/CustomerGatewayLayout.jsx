import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { CustomerHeader } from './CustomerHeader';
import { CustomerWelcome } from './CustomerWelcome';
import { ServiceSelectionScreen } from './ServiceSelectionScreen';
import { FeatureSelectionScreen } from './FeatureSelectionScreen';
import { ReviewDraftScreen } from './ReviewDraftScreen';
import { SimulatedGoogleReviewModal } from './SimulatedGoogleReviewModal';
import { BadFlowQuestions } from './BadFlowQuestions';

export const CustomerGatewayLayout = () => {
  const { customerStep, loadMerchantBySlug } = useApp();
  const { shopSlug } = useParams();

  useEffect(() => {
    if (shopSlug && loadMerchantBySlug) {
      loadMerchantBySlug(shopSlug);
    }
  }, [shopSlug, loadMerchantBySlug]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF5FF]/70 via-[#FFFFFF] to-[#EFF6FF]/80 text-slate-800 font-sans flex flex-col justify-between selection:bg-purple-600 selection:text-white relative overflow-hidden">
      {/* Subtle glowing ambient brand orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-gradient-to-tr from-blue-200/20 via-purple-200/25 to-pink-200/20 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-rose-100/20 blur-3xl pointer-events-none rounded-full" />

      {/* Functional Customer Header */}
      <CustomerHeader />

      {/* Clean Full-Screen Responsive Container */}
      <main className="w-full max-w-2xl mx-auto flex-1 flex flex-col pt-0.5 sm:pt-1 pb-6 px-3 sm:px-6 relative z-10">
        <div className="w-full mt-0">
          {customerStep === 'welcome' && <CustomerWelcome />}
          {customerStep === 'services_selection' && <ServiceSelectionScreen />}
          {customerStep === 'good_features' && <FeatureSelectionScreen />}
          {customerStep === 'good_ai_draft' && <ReviewDraftScreen />}
          {customerStep === 'bad_questions' && <BadFlowQuestions />}
        </div>
      </main>

      {/* Google Review Modal overlay */}
      <SimulatedGoogleReviewModal />
    </div>
  );
};

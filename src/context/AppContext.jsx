import React, { createContext, useContext, useState } from 'react';
import { api } from '../services/api';
import { INITIAL_BUSINESS } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Customer Gateway Flow Step State:
  // 'welcome' -> 'services_selection' -> 'good_features' -> 'good_ai_draft' | 'bad_questions'
  const [customerStep, setCustomerStep] = useState('welcome');
  const [selectedRating, setSelectedRating] = useState(5); // 5 for 'Loved it', 4 for 'Good Quality'
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedGoodTags, setSelectedGoodTags] = useState([]);
  const [customerComment, setCustomerComment] = useState('');
  const [aiDraft, setAiDraft] = useState('');
  const [aiTones, setAiTones] = useState(null);
  const [aiKeywords, setAiKeywords] = useState([]);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [copiedReviewText, setCopiedReviewText] = useState(false);

  // Active Business Profile State
  const [business, setBusiness] = useState(INITIAL_BUSINESS);

  // Load Merchant by Slug (for dynamic Customer Gateway URLs: /r/:slug)
  const loadMerchantBySlug = async (slug) => {
    try {
      const res = await api.getMerchantBySlug(slug);
      if (res.success && res.merchant) {
        setBusiness(res.merchant);
        // Track scan event
        api.trackScan(res.merchant.id).catch(() => {});
        return res.merchant;
      }
    } catch (err) {
      console.error('Error loading merchant by slug:', err);
    }
    return null;
  };

  // Feedback Submission for Bad Review Flow
  const submitBadFeedback = async (badFeedbackData) => {
    try {
      await api.submitBadFeedback({
        merchantId: business.id || 1,
        name: badFeedbackData.name,
        contactInfo: badFeedbackData.contactInfo,
        contactType: badFeedbackData.contactType,
        rating: badFeedbackData.rating || 2,
        issues: badFeedbackData.issues || [],
        comment: badFeedbackData.comment || '',
        touchpoint: badFeedbackData.touchpoint || 'Fitting Bay (QR-01)'
      });
    } catch (err) {
      console.error('Error submitting feedback:', err);
    }
  };

  // Generate Live AI Review with 500+ dynamic permutations based on Rating, Services & Highlights
  const generateLiveAiReview = async (tags, comment, services, rating) => {
    setIsGeneratingAi(true);
    try {
      const activeTags = tags !== undefined ? tags : selectedGoodTags;
      const activeComment = comment !== undefined ? comment : customerComment;
      const activeServices = services !== undefined ? services : selectedServices;
      const activeRating = rating !== undefined ? rating : selectedRating;

      const res = await api.generateAiReview({
        businessName: business.name,
        businessCategory: business.category || business.tagline || "Women's Boutique & Designer Clothing",
        selectedServices: activeServices,
        tags: activeTags,
        customerComment: activeComment,
        rating: activeRating,
        tone: 'seo'
      });

      if (res && res.success) {
        const tones = res.data?.tones || res.tones || {};
        const keywords = res.data?.keywords || res.keywords || [];
        const draft = tones.seo || tones.enthusiastic || res.reviewText || Object.values(tones)[0] || '';
        setAiTones(tones);
        setAiKeywords(keywords);
        setAiDraft(draft);
        return { tones, keywords, draft };
      }
    } catch (err) {
      console.error('Failed to generate live AI review:', err);
    } finally {
      setIsGeneratingAi(false);
    }
    return null;
  };

  // Reset Customer Gateway State
  const resetCustomerFlow = () => {
    setCustomerStep('welcome');
    setSelectedRating(5);
    setSelectedServices([]);
    setSelectedGoodTags([]);
    setCustomerComment('');
    setAiDraft('');
    setAiTones(null);
    setAiKeywords([]);
    setShowGoogleModal(false);
    setCopiedReviewText(false);
  };

  return (
    <AppContext.Provider
      value={{
        customerStep,
        setCustomerStep,
        selectedRating,
        setSelectedRating,
        selectedServices,
        setSelectedServices,
        selectedGoodTags,
        setSelectedGoodTags,
        customerComment,
        setCustomerComment,
        aiDraft,
        setAiDraft,
        aiTones,
        setAiTones,
        aiKeywords,
        setAiKeywords,
        generateLiveAiReview,
        isGeneratingAi,
        setIsGeneratingAi,
        showGoogleModal,
        setShowGoogleModal,
        copiedReviewText,
        setCopiedReviewText,
        business,
        setBusiness,
        loadMerchantBySlug,
        submitBadFeedback,
        resetCustomerFlow
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

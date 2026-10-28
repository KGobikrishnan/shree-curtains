import {
  INITIAL_MERCHANTS_LIST,
  INITIAL_BUSINESS,
  INITIAL_FEEDBACK_ENTRIES,
  INITIAL_QR_STANDS,
  INITIAL_ANALYTICS_DATA,
  getMerchantBySlugOrFallback,
  generateClientSideAiReview
} from '../data/mockData';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// In-memory / local storage cache for simulated updates when offline / on Vercel
const getLocalMerchants = () => {
  const saved = localStorage.getItem('mozhi_merchants_list');
  return saved ? JSON.parse(saved) : INITIAL_MERCHANTS_LIST;
};

const saveLocalMerchants = (list) => {
  localStorage.setItem('mozhi_merchants_list', JSON.stringify(list));
};

import { generateGeminiReview } from './geminiService';

export const api = {
  // Auth
  login: async (email, password) => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) return await res.json();
    } catch (e) {
      // Backend offline fallback (Vercel deployment)
    }

    // Local authentication fallback
    const merchants = getLocalMerchants();
    if (email === 'admin@reviewhub.app' || email === 'admin@mozhi.app') {
      return {
        success: true,
        user: { id: 'admin-01', name: 'Super Admin', email, role: 'SUPER_ADMIN' }
      };
    }

    const matchedMerchant = merchants.find(m => m.email.toLowerCase() === email.toLowerCase()) || INITIAL_BUSINESS;
    return {
      success: true,
      user: { id: matchedMerchant.id, name: matchedMerchant.ownerName, email: matchedMerchant.email, role: 'MERCHANT' },
      merchant: matchedMerchant
    };
  },

  // Merchants
  getMerchants: async () => {
    try {
      const res = await fetch(`${API_BASE}/merchants`);
      if (res.ok) return await res.json();
    } catch (e) {
      // Backend offline fallback
    }
    return {
      success: true,
      merchants: getLocalMerchants()
    };
  },

  getMerchantBySlug: async (slug) => {
    try {
      const res = await fetch(`${API_BASE}/merchants/${slug}`);
      if (res.ok) return await res.json();
    } catch (e) {
      // Backend offline fallback
    }
    const merchants = getLocalMerchants();
    const merchant = getMerchantBySlugOrFallback(slug, merchants);
    return {
      success: true,
      merchant
    };
  },

  createMerchant: async (data) => {
    try {
      const res = await fetch(`${API_BASE}/merchants`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      // Backend offline fallback
    }

    const newMerchant = {
      ...data,
      id: `m-${Date.now()}`,
      slug: data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      verified: true,
      status: 'ACTIVE',
      createdAt: new Date().toISOString().split('T')[0]
    };

    const currentList = getLocalMerchants();
    const updated = [newMerchant, ...currentList];
    saveLocalMerchants(updated);

    return {
      success: true,
      merchant: newMerchant
    };
  },

  updateMerchantStatus: async (id, status) => {
    try {
      const res = await fetch(`${API_BASE}/merchants/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) return await res.json();
    } catch (e) {
      // Backend offline fallback
    }

    const currentList = getLocalMerchants();
    const updated = currentList.map(m => m.id === id ? { ...m, status } : m);
    saveLocalMerchants(updated);

    return { success: true };
  },

  deleteMerchant: async (id) => {
    try {
      const res = await fetch(`${API_BASE}/merchants/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) return await res.json();
    } catch (e) {
      // Backend offline fallback
    }

    const currentList = getLocalMerchants();
    const updated = currentList.filter(m => m.id !== id);
    saveLocalMerchants(updated);

    return { success: true };
  },

  // QR Stands
  getQrStands: async (merchantId = 1) => {
    try {
      const res = await fetch(`${API_BASE}/qr?merchantId=${merchantId}`);
      if (res.ok) return await res.json();
    } catch (e) {
      // Backend offline fallback
    }
    return {
      success: true,
      qrStands: INITIAL_QR_STANDS
    };
  },

  createQrStand: async (data) => {
    try {
      const res = await fetch(`${API_BASE}/qr`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      // Backend offline fallback
    }

    const newStand = {
      ...data,
      id: `QR-${String(Math.floor(Math.random() * 90) + 10)}`,
      scans: 0,
      goodCount: 0,
      convertedReviews: 0,
      negativeInterceptions: 0,
      active: true,
      createdAt: new Date().toISOString().split('T')[0]
    };

    return {
      success: true,
      qrStand: newStand
    };
  },

  trackScan: async (merchantId = 1, standId = null) => {
    try {
      const res = await fetch(`${API_BASE}/qr/track-scan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ merchantId, standId })
      });
      if (res.ok) return await res.json();
    } catch (e) {
      // Offline fallback
    }
    return { success: true };
  },

  trackConversion: async (merchantId = 1, tagPraise = 'Top Quality') => {
    try {
      const res = await fetch(`${API_BASE}/qr/track-conversion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ merchantId, tagPraise })
      });
      if (res.ok) return await res.json();
    } catch (e) {
      // Offline fallback
    }
    return { success: true };
  },

  deleteQrStand: async (id) => {
    try {
      const res = await fetch(`${API_BASE}/qr/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) return await res.json();
    } catch (e) {
      // Offline fallback
    }
    return { success: true };
  },

  // Feedback
  getFeedbacks: async (merchantId = 1) => {
    try {
      const res = await fetch(`${API_BASE}/feedback?merchantId=${merchantId}`);
      if (res.ok) return await res.json();
    } catch (e) {
      // Offline fallback
    }
    return {
      success: true,
      feedbacks: INITIAL_FEEDBACK_ENTRIES
    };
  },

  submitBadFeedback: async (data) => {
    try {
      const res = await fetch(`${API_BASE}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      // Offline fallback
    }

    const newFeedback = {
      ...data,
      id: `FB-${Math.floor(Math.random() * 9000) + 1000}`,
      status: 'NEW',
      createdAt: new Date().toISOString(),
      notes: []
    };

    return {
      success: true,
      feedback: newFeedback
    };
  },

  updateFeedbackStatus: async (id, status) => {
    try {
      const res = await fetch(`${API_BASE}/feedback/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) return await res.json();
    } catch (e) {
      // Offline fallback
    }
    return { success: true };
  },

  addFeedbackNote: async (id, text, author) => {
    try {
      const res = await fetch(`${API_BASE}/feedback/${id}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, author })
      });
      if (res.ok) return await res.json();
    } catch (e) {
      // Offline fallback
    }
    return {
      success: true,
      note: {
        id: `n-${Date.now()}`,
        author,
        text,
        timestamp: new Date().toISOString()
      }
    };
  },

  // Analytics
  getAnalytics: async (merchantId = 1) => {
    try {
      const res = await fetch(`${API_BASE}/analytics?merchantId=${merchantId}`);
      if (res.ok) return await res.json();
    } catch (e) {
      // Offline fallback
    }
    return {
      success: true,
      stats: INITIAL_ANALYTICS_DATA
    };
  },

  // Direct Client AI Review Generator (Google AI Studio Gemini + Instant Offline Fallback)
  generateAiReview: async ({ businessName, businessCategory, selectedServices, tags, customerComment, rating = 5, tone = 'seo' }) => {
    return await generateGeminiReview({
      businessName,
      businessCategory,
      selectedServices,
      tags,
      customerComment,
      rating
    });
  }
};



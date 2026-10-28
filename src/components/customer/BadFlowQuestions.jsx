import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NEGATIVE_ISSUE_TAGS } from '../../data/mockData';
import { ArrowLeft, ShieldAlert, CheckCircle2, Phone, Mail, Send, AlertTriangle } from 'lucide-react';

export const BadFlowQuestions = () => {
  const { setCustomerStep, submitBadFeedback, business, resetCustomerFlow } = useApp();

  const [selectedIssues, setSelectedIssues] = useState([]);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [wantsCallback, setWantsCallback] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const toggleIssue = (label) => {
    if (selectedIssues.includes(label)) {
      setSelectedIssues(selectedIssues.filter(i => i !== label));
    } else {
      setSelectedIssues([...selectedIssues, label]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitBadFeedback({
      name,
      contactInfo,
      contactType: contactInfo.includes('@') ? 'email' : (contactInfo ? 'phone' : 'none'),
      issues: selectedIssues,
      comment,
      rating: 2
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="w-full max-w-lg mx-auto bg-gradient-to-br from-[#FFF5F7]/95 via-[#FFFFFF] to-[#FAF5FF]/95 rounded-3xl border border-pink-100/90 shadow-[0_15px_35px_-10px_rgba(236,72,153,0.12)] flex flex-col items-center justify-center min-h-[520px] p-6 text-center animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-600 flex items-center justify-center mb-4 shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight font-heading">
          Thank you for letting us know!
        </h2>
        <p className="text-xs text-slate-600 mt-2 leading-relaxed max-w-xs font-medium">
          Your feedback has been sent directly to the team at <span className="font-bold text-slate-900">{business.name}</span>.
          {wantsCallback && contactInfo && (
            <span className="block mt-1.5 text-emerald-800 font-bold bg-emerald-50 border border-emerald-200 p-2 rounded-xl">
              Our boutique stylist will reach out to you to assist with size exchange or resolving this immediately.
            </span>
          )}
        </p>

        <div className="mt-6 w-full p-4 bg-white/90 rounded-2xl border border-amber-200/90 text-left shadow-2xs">
          <div className="flex items-start gap-2.5">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-black text-amber-950">100% Private Interception</div>
              <div className="text-[11px] text-slate-600 mt-0.5 font-medium">
                This was captured privately and was NOT posted publicly on Google Maps. We appreciate your patience while we make things right!
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={resetCustomerFlow}
          className="mt-6 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[430px] mx-auto bg-gradient-to-br from-[#FFF5F7]/95 via-[#FFFFFF] to-[#FAF5FF]/95 rounded-3xl border border-pink-100/90 shadow-[0_15px_35px_-10px_rgba(236,72,153,0.12)] p-4 sm:p-6 text-left animate-fade-in relative overflow-hidden">
      {/* Back Button */}
      <button
        onClick={() => setCustomerStep('welcome')}
        className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 mb-4 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shadow-xs">
          <AlertTriangle className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-lg font-black text-slate-900 leading-tight">
            We're sorry for the issue
          </h2>
          <p className="text-[11px] text-slate-500 font-medium">
            Help {business.name} understand what we can improve
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        {/* Issue Tags */}
        <div>
          <label className="block text-xs font-extrabold text-slate-800 mb-2">
            What area had an issue? (Select all that apply)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {NEGATIVE_ISSUE_TAGS.map((tag) => {
              const isSelected = selectedIssues.includes(tag.label);
              return (
                <button
                  type="button"
                  key={tag.id}
                  onClick={() => toggleIssue(tag.label)}
                  className={`p-2.5 rounded-xl text-left text-xs font-bold border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-rose-50 border-rose-400 text-rose-950 shadow-xs ring-1 ring-rose-400'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span>{tag.label}</span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Comment Textarea */}
        <div>
          <label className="block text-xs font-extrabold text-slate-800 mb-1.5">
            Tell us more about your experience:
          </label>
          <textarea
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="e.g. Which curtain, blind, size or fitting had an issue? Any details help us resolve it."
            className="w-full text-xs p-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-rose-400 text-slate-800 placeholder-slate-400 resize-none shadow-2xs"
          />
        </div>

        {/* Contact Info */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-2.5">
          <div className="text-xs font-black text-slate-900">
            Want us to reach out and assist with exchange or resolution?
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name (Optional)"
              className="text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-1 focus:ring-pink-500"
            />
            <input
              type="text"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              placeholder="Phone Number / Email"
              className="text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-1 focus:ring-pink-500"
            />
          </div>

          <label className="flex items-center gap-2 pt-1 text-[11px] font-semibold text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              checked={wantsCallback}
              onChange={(e) => setWantsCallback(e.target.checked)}
              className="rounded text-pink-600 focus:ring-pink-500"
            />
            <span>Yes, please have a {business.name} manager contact me</span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3.5 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white rounded-2xl font-black text-xs shadow-lg shadow-rose-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Send className="w-4 h-4" /> Send Feedback Privately to Boutique
        </button>

        <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 text-center font-medium">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
          <span>Will not be posted publicly. Kept strictly private.</span>
        </div>
      </form>
    </div>
  );
};

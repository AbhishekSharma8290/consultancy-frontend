'use client';
import React from 'react';
import { Flame, CheckCircle, Phone, MapPin, IndianRupee, Clock, Sparkles } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { UrgentPosterCard } from '../components/organisms/UrgentPosterCard';
import { CandidateApplicationForm } from '../components/organisms/CandidateApplicationForm';
import { Button } from '../components/atoms/Button';
import { WhatsAppIcon } from '../components/atoms/WhatsAppIcon';

export const UrgentHiringPage: React.FC = () => {
  const { setSelectedJob, jobs } = useAppStore();

  const fmcgJob = jobs.find((j) => j._id === 'job_fmcg_account_exec') || jobs[0];

  const openWhatsApp = () => {
    const text =
      'Hello Balaji Placement Service, I want to apply for the URGENT FMCG Account Executive position in Hazira, Gwalior (₹15,000/mo). When can I attend the interview?';
    window.open(`https://wa.me/919131008934?text=${encodeURIComponent(text)}`, '_blank');
  };

  const scrollToForm = () => {
    const elem = document.getElementById('apply-section');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="py-10 bg-slate-50 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-black uppercase tracking-wider">
            <Flame className="w-4 h-4 animate-bounce" />
            <span>High-Priority Hiring Drive • Gwalior</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Urgent Requirement for <span className="text-red-600">FMCG Company</span>
          </h1>
          <p className="text-sm text-slate-600">
            Immediate joining vacancy for Female Account Executive at Hazira / Char Shahar Ka Naka, Gwalior.
            Direct company payroll and immediate interview slots available today.
          </p>
        </div>

        {/* Poster Showcase & Fast Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6">
            <UrgentPosterCard onApplyClick={scrollToForm} />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-pink-700 bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-200">
                  Female Candidates Preferred
                </span>
                <span className="text-sm font-black text-emerald-700">₹15,000/- Per Month</span>
              </div>

              <h2 className="text-xl font-bold text-slate-900">
                Position: Account Executive (FMCG Distribution)
              </h2>

              <div className="space-y-2.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                  <span><strong>Location:</strong> Hazira / Char Shahar Ka Naka, Gwalior (M.P.)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-500 shrink-0" />
                  <span><strong>Timing:</strong> 10:30 AM to 7:30 PM (Day Shift)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span><strong>Experience:</strong> Freshers with Excel / 1-2 years experience welcome</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Key Skills Checklist:
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    MS Excel (VLOOKUP, basic formulas)
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    Billing &amp; Accurate Data Entry
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    Basic Computer Knowledge
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    Invoice &amp; Ledger Reconciliation
                  </li>
                </ul>
              </div>

              <div className="space-y-2.5 pt-4">
                <Button
                  variant="whatsapp"
                  size="lg"
                  icon={<WhatsAppIcon className="w-5 h-5" />}
                  onClick={openWhatsApp}
                  className="w-full text-xs sm:text-sm font-bold"
                >
                  Apply Directly on WhatsApp (9131008934)
                </Button>

                <Button
                  variant="primary"
                  size="md"
                  onClick={scrollToForm}
                  className="w-full text-xs font-bold bg-[#00236f]"
                >
                  Fill Fast Application Form Below
                </Button>
              </div>
            </div>

            {/* Helpline notice */}
            <div className="p-5 bg-slate-900 text-white rounded-2xl flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] text-amber-300 font-bold uppercase block">
                  Candidate Walk-in Support
                </span>
                <span className="text-xs font-semibold">Call anytime between 10:00 AM – 7:30 PM</span>
              </div>
              <a
                href="tel:+919131008934"
                className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors"
              >
                Call 9131008934
              </a>
            </div>
          </div>
        </div>
      </div>

      <CandidateApplicationForm defaultPosition="Account Executive (FMCG Urgent)" />
    </div>
  );
};

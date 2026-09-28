'use client';
import React from 'react';
import {
  Briefcase,
  Building,
  MapPin,
  Users,
  IndianRupee,
  Clock,
  CheckCircle2,
  Phone,
  Flame,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '../atoms/Button';
import { WhatsAppIcon } from '../atoms/WhatsAppIcon';

interface UrgentOpportunitySectionProps {
  onOpenApplyModal: () => void;
}

export const UrgentOpportunitySection: React.FC<UrgentOpportunitySectionProps> = ({
  onOpenApplyModal,
}) => {
  const openWhatsApp = (number: string) => {
    const text = `Hello Balaji Placement Service HR, I want to apply for the *FMCG Account Executive* position at Hazira, Gwalior (Salary: ₹15,000/mo). My resume is ready. Please schedule my interview.`;
    window.open(
      `https://wa.me/91${number}?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Flame className="w-3.5 h-3.5 text-red-600 animate-pulse" />
            <span>Immediate Joining Opportunity</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Urgent Hiring for <span className="text-red-600">FMCG Company</span>
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Balaji Placement Service is directly recruiting for a reputable FMCG manufacturer &amp;
            distributor. Excellent career growth &amp; supportive work environment.
          </p>
        </div>

        {/* Detailed Layout Card */}
        <div className="bg-[#fafbff] rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-6 pb-4 border-b border-slate-200">
            <div>
              <span className="inline-block text-xs font-bold text-pink-700 bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-200 mb-1.5">
                🌸 Good Opportunity for Working Women
              </span>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                Account Executive
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Reputed Fast-Moving Consumer Goods (FMCG) Enterprise • Gwalior Hub
              </p>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold uppercase tracking-wider shadow-xs">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              URGENT ROLE
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Specs Grid */}
            <div className="lg:col-span-7 space-y-6">
              {/* Parameters 2-column tiles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-3.5 bg-white rounded-xl border border-slate-200 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Designation
                    </span>
                    <span className="text-sm font-bold text-slate-900">Account Executive</span>
                  </div>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-slate-200 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Company Sector
                    </span>
                    <span className="text-sm font-bold text-slate-900">FMCG Company</span>
                  </div>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-slate-200 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Work Location
                    </span>
                    <span className="text-sm font-bold text-slate-900 leading-snug">
                      Hazira / Char Shahar Ka Naka, Gwalior
                    </span>
                  </div>
                </div>

                <div className="p-3.5 bg-pink-50/50 rounded-xl border border-pink-200 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-pink-100 text-pink-700 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-pink-600 uppercase tracking-wider block">
                      Candidate Preference
                    </span>
                    <span className="text-sm font-black text-pink-900">
                      Female Only (Working Women)
                    </span>
                  </div>
                </div>

                <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-200 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <IndianRupee className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
                      Salary Package
                    </span>
                    <span className="text-base font-black text-emerald-900">
                      ₹15,000/- Per Month
                    </span>
                  </div>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-slate-200 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Working Hours
                    </span>
                    <span className="text-sm font-bold text-slate-900">10:30 AM to 7:30 PM</span>
                  </div>
                </div>
              </div>

              {/* Required Skills & Qualifications Block */}
              <div className="p-5 bg-white rounded-2xl border border-slate-200">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  Required Skills &amp; Qualifications
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Knowledge of MS Excel (Formulas, Sheets)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Billing &amp; Accurate Data Entry</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Basic Computer Operations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Accounting &amp; Invoice Management</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Good Hindi &amp; English Communication</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Fast-Track Application Box */}
            <div className="lg:col-span-5 bg-white rounded-2xl border-2 border-blue-200 p-6 shadow-md space-y-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 block">
                  Fast-Track Application
                </span>
                <h4 className="text-lg font-black text-slate-900 tracking-tight">
                  Ready for an Interview?
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Positions fill up quickly. Connect with the Balaji Placement hiring team now.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                <Button
                  variant="whatsapp"
                  size="lg"
                  icon={<WhatsAppIcon className="w-5 h-5" />}
                  onClick={() => openWhatsApp('9131008934')}
                  className="w-full text-xs sm:text-sm font-bold py-3"
                >
                  <div className="text-left">
                    <div className="text-[10px] font-medium text-emerald-100 uppercase leading-none">
                      Click to Send Resume on WhatsApp
                    </div>
                    <div>Apply via WhatsApp (9131008934)</div>
                  </div>
                </Button>

                <button
                  onClick={() => openWhatsApp('9009822116')}
                  className="w-full flex items-center justify-center gap-2 p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
                  <span>Alternative HR Helpline (9009822116)</span>
                </button>
              </div>

              {/* Direct Phone Call Strip */}
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-800 block">
                    Prefer a Direct Phone Call?
                  </span>
                  <a
                    href="tel:+919131008934"
                    className="text-xs sm:text-sm font-black text-slate-900 hover:text-amber-800"
                  >
                    +91 9131008934 / 9009822116
                  </a>
                </div>
                <a
                  href="tel:+919131008934"
                  className="w-9 h-9 rounded-lg bg-amber-500 text-white flex items-center justify-center hover:bg-amber-600 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>

              {/* Guarantee Points */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100 text-[11px] text-slate-600 font-medium">
                <div className="flex items-center gap-1.5 text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>No registration fees before selection</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Immediate interview schedules in Gwalior</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Direct company payroll confirmation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

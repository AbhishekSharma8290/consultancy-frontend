'use client';
import React, { useState } from 'react';
import {
  Megaphone,
  Briefcase,
  Building,
  MapPin,
  Users,
  IndianRupee,
  Clock,
  CheckCircle,
  FileSpreadsheet,
  Receipt,
  Phone,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { BpsLogo } from '../atoms/BpsLogo';
import { Button } from '../atoms/Button';
import { WhatsAppIcon } from '../atoms/WhatsAppIcon';

interface UrgentPosterCardProps {
  onApplyClick: () => void;
}

export const UrgentPosterCard: React.FC<UrgentPosterCardProps> = ({ onApplyClick }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const openWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text =
      'Hello Balaji Placement Service, I am interested in applying for the URGENT FMCG Account Executive position in Hazira, Gwalior (₹15,000/month). Please guide me with the interview process.';
    window.open(
      `https://wa.me/919131008934?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="relative group">
      {/* Decorative Outer Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-amber-500 to-emerald-600 rounded-3xl blur-md opacity-30 group-hover:opacity-60 transition duration-500" />

      {/* Main Poster Container (Matches Image 1 Poster) */}
      <div className="relative bg-white rounded-2xl border-2 border-slate-300 shadow-xl overflow-hidden text-slate-900 transition-all duration-300">
        {/* Top Header Section */}
        <div className="bg-gradient-to-r from-slate-50 via-white to-blue-50/50 p-4 border-b border-slate-200">
          <div className="flex items-center justify-between gap-2">
            <BpsLogo showTagline={true} />
            <div className="text-right">
              <span className="text-[11px] font-bold text-blue-900 tracking-tight block">
                Recruitment &amp; Staffing
              </span>
              <span className="text-[10px] font-semibold text-amber-600 italic block">
                for a Better Tomorrow
              </span>
            </div>
          </div>
        </div>

        {/* Urgent Hiring Banner with Megaphone */}
        <div className="relative bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white py-2.5 px-4 shadow-inner">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-yellow-300 animate-bounce" />
              <span className="font-black text-lg uppercase tracking-wide drop-shadow-sm">
                URGENT HIRING
              </span>
            </div>
            <span className="text-[10px] font-extrabold uppercase bg-yellow-400 text-red-950 px-2.5 py-0.5 rounded shadow-xs tracking-wider">
              Immediate Joining
            </span>
          </div>

          {/* Yellow Sub-ribbon */}
          <div className="mt-1 bg-yellow-400 text-slate-900 text-center py-1 px-2 rounded font-black text-sm uppercase tracking-wider shadow-sm">
            FOR FMCG COMPANY
          </div>
        </div>

        {/* Content Body: Job Specs & Working Women Highlight */}
        <div className="p-4 sm:p-5 space-y-3 bg-[#fbfcfe]">
          {/* Working Women Highlight Badge */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold border border-pink-200">
              <Sparkles className="w-3.5 h-3.5 text-pink-600" />
              <span>Good Opportunity for Working Women</span>
            </div>
            <span className="text-[10px] font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
              Direct Payroll
            </span>
          </div>

          {/* Table Specification Grid */}
          <div className="rounded-xl border border-slate-200 overflow-hidden bg-white text-xs divide-y divide-slate-100 shadow-2xs">
            <div className="grid grid-cols-12 p-2.5 items-center">
              <div className="col-span-4 font-bold text-slate-500 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                <span>Designation</span>
              </div>
              <div className="col-span-8 font-black text-slate-900 text-sm">
                Account Executive
              </div>
            </div>

            <div className="grid grid-cols-12 p-2.5 items-center bg-slate-50/50">
              <div className="col-span-4 font-bold text-slate-500 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-blue-600" />
                <span>Company</span>
              </div>
              <div className="col-span-8 font-semibold text-slate-800">
                FMCG Company (Distribution &amp; Mfg)
              </div>
            </div>

            <div className="grid grid-cols-12 p-2.5 items-center">
              <div className="col-span-4 font-bold text-slate-500 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-red-600" />
                <span>Location</span>
              </div>
              <div className="col-span-8 font-bold text-slate-900">
                Hazira / Char Shahar Ka Naka, Gwalior
              </div>
            </div>

            <div className="grid grid-cols-12 p-2.5 items-center bg-pink-50/30">
              <div className="col-span-4 font-bold text-pink-700 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-pink-600" />
                <span>Gender</span>
              </div>
              <div className="col-span-8 font-extrabold text-pink-700">
                Female Only (Working Women Preferred)
              </div>
            </div>

            <div className="grid grid-cols-12 p-2.5 items-center bg-emerald-50/50">
              <div className="col-span-4 font-bold text-emerald-800 flex items-center gap-1.5">
                <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                <span>Salary</span>
              </div>
              <div className="col-span-8 font-black text-emerald-700 text-sm">
                ₹15,000/- Per Month
              </div>
            </div>

            <div className="grid grid-cols-12 p-2.5 items-center">
              <div className="col-span-4 font-bold text-slate-500 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>Timing</span>
              </div>
              <div className="col-span-8 font-semibold text-slate-800">
                10:30 AM to 7:30 PM (Day Shift)
              </div>
            </div>
          </div>

          {/* Required Skills Box */}
          <div className="p-3.5 rounded-xl bg-blue-900 text-white shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <h5 className="font-extrabold text-xs uppercase tracking-wider text-yellow-300">
                Required Skills &amp; Knowledge:
              </h5>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-start gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Knowledge of MS Excel</span>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Billing &amp; Data Entry</span>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Basic Computer Knowledge</span>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Accounting &amp; Invoice Management</span>
              </div>
            </div>
          </div>

          {/* Contact Helpline Strip */}
          <div className="p-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 text-white flex flex-col sm:flex-row items-center justify-between gap-2 shadow-xs">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-white text-red-600 flex items-center justify-center font-bold shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-red-200 block">
                  Official Contact:
                </span>
                <span className="font-black text-sm tracking-wide text-white">
                  9131008934 | 9009822116
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[11px] font-bold text-yellow-300 italic">
                Interested Candidates Can Contact Us!
              </span>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="p-3 bg-slate-100 border-t border-slate-200 flex items-center gap-2">
          <Button
            variant="whatsapp"
            size="md"
            icon={<WhatsAppIcon className="w-4 h-4" />}
            onClick={openWhatsApp}
            className="flex-1 font-bold text-xs"
          >
            Apply on WhatsApp
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={onApplyClick}
            className="flex-1 font-bold text-xs bg-[#00236f] hover:bg-[#1e3a8a]"
          >
            Quick Online Apply
          </Button>
        </div>
      </div>
    </div>
  );
};

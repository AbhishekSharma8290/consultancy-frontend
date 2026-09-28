'use client';
import React from 'react';
import { MapPin, Phone, Clock, Mail, ShieldCheck } from 'lucide-react';
import { BpsLogo } from '../atoms/BpsLogo';
import { WhatsAppIcon } from '../atoms/WhatsAppIcon';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenApply: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenApply }) => {
  return (
    <footer className="bg-[#001035] text-slate-300 pt-14 pb-8 border-t border-blue-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <BpsLogo variant="white" showTagline={true} />
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm pt-2">
              Leading placement consultancy delivering efficient recruitment solutions for
              companies and reliable career guidance for job seekers across Gwalior, Chambal, and
              Central India.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-900/60 text-amber-300 text-[11px] font-bold border border-blue-800/80">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Govt. Compliant Regional Staffing</span>
            </div>
          </div>

          {/* Col 2: Quick Navigation (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home &amp; Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('urgent')}
                  className="hover:text-amber-300 transition-colors font-semibold text-amber-400 cursor-pointer flex items-center gap-1.5"
                >
                  <span>Urgent FMCG Account Opening</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('jobs')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Job Search &amp; Open Roles
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('employers')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Employers Staffing Inquiries
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('partners')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Placement Partners (100+ Corporates)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenApply}
                  className="hover:text-white transition-colors text-blue-300 font-semibold cursor-pointer"
                >
                  Submit Candidate Resume
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Hiring Sectors (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Hiring Sectors
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>FMCG &amp; Retail Distribution</li>
              <li>Accounts, Tally &amp; Billing</li>
              <li>Back Office &amp; Computer Operators</li>
              <li>Sales &amp; Business Development</li>
              <li>Logistics &amp; Warehouse</li>
              <li>BFSI &amp; Banking</li>
            </ul>
          </div>

          {/* Col 4: Contact Information (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Contact Information
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>16 Sikarwar plaza 1st floor goverdhan colony, Gwalior (M.P.) - 474005</span>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <a href="tel:+919131008934" className="hover:text-white block font-bold text-white">
                    +91 9131008934 / 9009822116
                  </a>
                  <span className="text-[10px] text-slate-400">Candidate &amp; Corporate Hotlines</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-emerald-400 font-semibold">
                <WhatsAppIcon className="w-4 h-4 shrink-0" />
                <span>Instant WhatsApp Support Active</span>
              </div>

              <div className="flex items-center gap-2.5 text-slate-400 text-[11px]">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>Mon - Sat: 10:00 AM - 7:30 PM (Sunday Closed)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            &copy; 2026 Balaji Placement Service (BPS). All rights reserved. Hazira, Gwalior (M.P.).
          </div>
          <div className="text-amber-400 font-medium italic">
            Work with the Right Support | Build Your Career with Us
          </div>
        </div>
      </div>
    </footer>
  );
};

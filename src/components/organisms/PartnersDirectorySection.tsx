'use client';
import React, { useState } from 'react';
import {
  Building2,
  CheckCircle,
  Search,
  Users,
  Clock,
  ShieldCheck,
  Send,
  Phone,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { Partner } from '../../types/index';
import { PartnerCard } from '../molecules/PartnerCard';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { Select } from '../atoms/Select';
import { Textarea } from '../atoms/Textarea';
import { WhatsAppIcon } from '../atoms/WhatsAppIcon';

interface PartnersDirectorySectionProps {
  partners: Partner[];
  onApplyViaDesk: (partner: Partner) => void;
  onOpenEmployerForm: () => void;
}

export const PartnersDirectorySection: React.FC<PartnersDirectorySectionProps> = ({
  partners,
  onApplyViaDesk,
  onOpenEmployerForm,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filterTabs = [
    { id: 'all', label: 'All Partners (100+)' },
    { id: 'bfsi', label: 'BFSI & Banking (25+)' },
    { id: 'bpo', label: 'BPO & CX Services (20+)' },
    { id: 'fmcg', label: 'FMCG & Retail (30+)' },
    { id: 'manufacturing', label: 'Manufacturing & Logistics (20+)' },
    { id: 'tech', label: 'Tech & IT' },
  ];

  const filteredPartners = partners.filter((p) => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesQuery =
      searchTerm.trim() === '' ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.frequentRoles.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="py-12 bg-[#faf8ff]">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 inline-block">
            100+ Verified Corporate Tie-Ups &amp; Hiring Partners
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight">
            Our Esteemed Placement &amp; Corporate Hiring Partners
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Empowering ambitious talent across Gwalior, Chambal, and Madhya Pradesh by connecting them
            with leading MNCs, national NBFCs, BFSI giants, BPO/ITeS powerhouses, and regional FMCG leaders.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              variant="outline"
              size="sm"
              icon={<Building2 className="w-4 h-4 text-blue-700" />}
              onClick={onOpenEmployerForm}
              className="font-bold text-xs"
            >
              Become a Hiring Partner
            </Button>
            <Button
              variant="whatsapp"
              size="sm"
              icon={<WhatsAppIcon className="w-4 h-4" />}
              onClick={() => {
                window.open('https://wa.me/919131008934?text=Hello%20Balaji%20Placement%2C%20we%20want%20to%20partner%20for%20corporate%20hiring.', '_blank');
              }}
              className="font-bold text-xs"
            >
              Direct WhatsApp Desk: 9131008934
            </Button>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 pt-6 border-t border-slate-200">
          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-black text-slate-900">100+</div>
              <div className="text-xs text-slate-500 font-medium">Active Partner Cos</div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-black text-slate-900">10,000+</div>
              <div className="text-xs text-slate-500 font-medium">Placed Candidates</div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-black text-slate-900">48 Hours</div>
              <div className="text-xs text-slate-500 font-medium">Rapid Onboarding</div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-black text-slate-900">100% Free</div>
              <div className="text-xs text-slate-500 font-medium">Zero Candidate Fees</div>
            </div>
          </div>
        </div>
      </div>

      {/* Premier Corporate Alliances */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
          <div>
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
              Top-Tier Enterprise Placement Marquee
            </span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              PREMIER CORPORATE ALLIANCES
            </h2>
          </div>
          <p className="text-xs text-slate-500 max-w-md">
            High-volume active requisition accounts with recurring hiring cycles throughout Gwalior, Lashkar, and Malanpur hubs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Bajaj Finserv */}
          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-blue-700">BFSI Giant</span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Verified
                </span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-900 text-white font-black text-sm flex items-center justify-center">
                  BF
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Bajaj Finserv &amp; Finance</h4>
                  <span className="text-xs text-slate-500">Consumer Durable &amp; Loans</span>
                </div>
              </div>
              <div className="text-xs font-bold text-slate-900 bg-slate-50 p-2 rounded-lg mb-3">
                120+ Placements to Date
                <div className="text-[11px] font-normal text-slate-500 mt-0.5">
                  Sales Execs, Billing Desk, Recovery Ops
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <span className="text-slate-500">Lashkar / Morar</span>
              <span className="font-bold text-slate-900">₹16K – ₹28K/mo</span>
            </div>
          </div>

          {/* Card 2: InTouchCX */}
          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-blue-700">ITeS / Global CX</span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Verified
                </span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-black text-sm flex items-center justify-center">
                  ICX
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">InTouchCX Solutions</h4>
                  <span className="text-xs text-slate-500">Omnichannel Support Center</span>
                </div>
              </div>
              <div className="text-xs font-bold text-slate-900 bg-slate-50 p-2 rounded-lg mb-3">
                85+ Placements to Date
                <div className="text-[11px] font-normal text-slate-500 mt-0.5">
                  Customer Support, Voice/Non-Voice
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <span className="text-slate-500">City Center, Gwalior</span>
              <span className="font-bold text-slate-900">₹14K – ₹22K/mo</span>
            </div>
          </div>

          {/* Card 3: Dabur */}
          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-blue-700">FMCG Distribution</span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Verified
                </span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-600 text-white font-black text-sm flex items-center justify-center">
                  DB
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Dabur Distro Hubs</h4>
                  <span className="text-xs text-slate-500">Madhya Bharat Supply Net</span>
                </div>
              </div>
              <div className="text-xs font-bold text-slate-900 bg-slate-50 p-2 rounded-lg mb-3">
                60+ Placements to Date
                <div className="text-[11px] font-normal text-slate-500 mt-0.5">
                  Inventory In-Charge, Tally Billing
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <span className="text-slate-500">Hazira Depot</span>
              <span className="font-bold text-slate-900">₹15K – ₹24K/mo</span>
            </div>
          </div>

          {/* Card 4: Malanpur Industrial Group */}
          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-blue-700">Industrial Hub</span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Verified
                </span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-slate-800 text-white font-black text-sm flex items-center justify-center">
                  MIA
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Malanpur Industrial Group</h4>
                  <span className="text-xs text-slate-500">Cadbury &amp; Godrej Logistics</span>
                </div>
              </div>
              <div className="text-xs font-bold text-slate-900 bg-slate-50 p-2 rounded-lg mb-3">
                140+ Placements to Date
                <div className="text-[11px] font-normal text-slate-500 mt-0.5">
                  Dispatchers, QA Clerks, Supervisors
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <span className="text-slate-500">Malanpur / Bhind Rd</span>
              <span className="font-bold text-slate-900">₹14K – ₹26K/mo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Directory Section with Search & Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">
        <div className="text-center max-w-xl mx-auto mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block mb-1">
            Verified Network
          </span>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">
            100+ Corporate Hiring Partners Directory
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Filter across industries or search specific employers hiring right now in Gwalior and surrounding regions.
          </p>
        </div>

        {/* Search Input */}
        <div className="max-w-2xl mx-auto mb-6 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search partner company by name, sector or job role (e.g., Bajaj, InTouch, FMCG, Tally)..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
          {filterTabs.map((tab) => {
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#00236f] text-white shadow-2xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPartners.map((partner) => (
            <PartnerCard key={partner._id} partner={partner} onApplyViaDesk={onApplyViaDesk} />
          ))}
        </div>
      </div>
    </div>
  );
};

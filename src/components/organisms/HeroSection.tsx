'use client';
import React from 'react';
import { ShieldCheck, CheckCircle2, TrendingUp, Users, Building, ThumbsUp } from 'lucide-react';
import { SearchBar } from '../molecules/SearchBar';
import { UrgentPosterCard } from './UrgentPosterCard';

interface HeroSectionProps {
  onSearch: (query: string, sector: string) => void;
  onApplyClick: () => void;
  placedCount?: number;
  partnerCount?: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearch,
  onApplyClick,
  placedCount = 10450,
  partnerCount = 500,
}) => {
  const trendingSearches = [
    'FMCG Account Executive',
    'MS Excel Specialist',
    'Gwalior Hazira Jobs',
    'Tally Prime',
    'Back Office',
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#faf8ff] via-white to-slate-50 pt-8 pb-14 border-b border-slate-200">
      {/* Subtle Background Geometry */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading, Search & Stats */}
          <div className="lg:col-span-7 space-y-6">
            {/* Verified Partner Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Verified Recruitment Partner in Gwalior &amp; MP</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.15]">
                Recruitment &amp; Staffing <br />
                for a <span className="text-blue-700 underline decoration-amber-400 decoration-wavy decoration-2">Better Tomorrow</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                Connecting ambitious job seekers with top-tier organizations. Whether you are an
                entry-level professional or an experienced specialist,{' '}
                <strong className="text-slate-900 font-semibold">Balaji Placement Service</strong>{' '}
                guides you to the right opportunity with zero hassle.
              </p>
            </div>

            {/* Interactive Search Bar */}
            <div className="pt-1">
              <SearchBar onSearch={onSearch} />
            </div>

            {/* Trending Searches */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-500 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                Trending Searches:
              </span>
              {trendingSearches.map((term, i) => (
                <button
                  key={i}
                  onClick={() => onSearch(term, 'all')}
                  className="px-2.5 py-1 rounded-md bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-300 text-xs font-medium transition-colors cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200/80">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-950 font-sans tracking-tight">
                  {placedCount.toLocaleString()}+
                </div>
                <div className="text-xs font-semibold text-slate-500 mt-0.5">
                  Placed Candidates
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-950 font-sans tracking-tight">
                  {partnerCount}+
                </div>
                <div className="text-xs font-semibold text-slate-500 mt-0.5">
                  Partner Companies
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-950 font-sans tracking-tight">
                  98%
                </div>
                <div className="text-xs font-semibold text-slate-500 mt-0.5">
                  Satisfaction Rate
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Official Hiring Poster Card */}
          <div className="lg:col-span-5">
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-700 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-red-600" />
                Official Hiring Poster
              </span>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                Hazira, Gwalior
              </span>
            </div>

            <UrgentPosterCard onApplyClick={onApplyClick} />
          </div>
        </div>
      </div>
    </section>
  );
};

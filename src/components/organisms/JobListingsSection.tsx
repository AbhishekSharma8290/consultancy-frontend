'use client';
import React, { useState, useMemo, useEffect } from 'react';
import {
  Briefcase,
  ArrowRight,
  Search,
  X,
  Building2,
  Tag,
  RotateCcw,
  Sparkles,
  SlidersHorizontal,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Job } from '../../types/index';
import { JobCard } from '../molecules/JobCard';
import { Button } from '../atoms/Button';
import { useAppStore } from '../../store/useAppStore';

interface JobListingsSectionProps {
  jobs: Job[];
  onViewDetails: (job: Job) => void;
  onOpenResumeForm: () => void;
  initialFilter?: string;
  initialKeyword?: string;
}

type SearchScope = 'all' | 'title' | 'industry';

export const JobListingsSection: React.FC<JobListingsSectionProps> = ({
  jobs,
  onViewDetails,
  onOpenResumeForm,
  initialFilter = 'all',
  initialKeyword = '',
}) => {
  // Global store sync (optional, fallback to local state)
  const storeSearchQuery = useAppStore((state) => state.searchQuery);
  const storeSelectedSector = useAppStore((state) => state.selectedSector);

  const [keyword, setKeyword] = useState<string>(initialKeyword || storeSearchQuery || '');
  const [selectedIndustry, setSelectedIndustry] = useState<string>(
    initialFilter !== 'all' ? initialFilter : storeSelectedSector || 'all'
  );
  const [searchScope, setSearchScope] = useState<SearchScope>('all');

  // Synchronize when store values change externally (e.g. from Hero search)
  useEffect(() => {
    if (storeSearchQuery && storeSearchQuery !== keyword) {
      setKeyword(storeSearchQuery);
    }
  }, [storeSearchQuery]);

  useEffect(() => {
    if (storeSelectedSector && storeSelectedSector !== 'all' && storeSelectedSector !== selectedIndustry) {
      setSelectedIndustry(storeSelectedSector);
    }
  }, [storeSelectedSector]);

  // Dynamically extract available industries/sectors from jobs data
  const availableIndustries = useMemo(() => {
    const industrySet = new Set<string>();
    jobs.forEach((job) => {
      if (job.companySector) industrySet.add(job.companySector);
      if (job.category) industrySet.add(job.category);
    });
    return Array.from(industrySet).sort();
  }, [jobs]);

  // Popular title suggestions for fast clicking
  const popularTitles = [
    'Account Executive',
    'Data Entry',
    'Sales & Marketing',
    'HR Recruiter',
    'Warehouse',
    'Tally Accountant',
  ];

  // Popular industry suggestions
  const popularIndustries = [
    'FMCG',
    'Logistics',
    'Accounts & Finance',
    'Back Office',
    'Human Resources',
    'Retail',
  ];

  // Keyword filtering logic for Title or Industry
  const filteredJobs = useMemo(() => {
    const cleanKeyword = keyword.trim().toLowerCase();

    return jobs.filter((job) => {
      // 1. Industry / Category filter
      const matchesIndustry =
        selectedIndustry === 'all' ||
        job.category?.toLowerCase() === selectedIndustry.toLowerCase() ||
        job.companySector?.toLowerCase() === selectedIndustry.toLowerCase() ||
        job.category?.toLowerCase().includes(selectedIndustry.toLowerCase()) ||
        job.companySector?.toLowerCase().includes(selectedIndustry.toLowerCase());

      if (!matchesIndustry) return false;

      // 2. Keyword-based filter
      if (!cleanKeyword) return true;

      const titleMatches = job.title?.toLowerCase().includes(cleanKeyword);
      const sectorMatches =
        job.companySector?.toLowerCase().includes(cleanKeyword) ||
        job.category?.toLowerCase().includes(cleanKeyword);
      const companyMatches = job.company?.toLowerCase().includes(cleanKeyword);
      const skillsMatch = job.requiredSkills?.some((skill) =>
        skill.toLowerCase().includes(cleanKeyword)
      );
      const descriptionMatch = job.description?.toLowerCase().includes(cleanKeyword);

      if (searchScope === 'title') {
        return titleMatches;
      }

      if (searchScope === 'industry') {
        return sectorMatches;
      }

      // Default 'all': match either title, industry, sector, company, or skills
      return titleMatches || sectorMatches || companyMatches || skillsMatch || descriptionMatch;
    });
  }, [jobs, keyword, selectedIndustry, searchScope]);

  const handleResetFilters = () => {
    setKeyword('');
    setSelectedIndustry('all');
    setSearchScope('all');
  };

  const hasActiveFilters = keyword.trim() !== '' || selectedIndustry !== 'all' || searchScope !== 'all';

  return (
    <section id="openings" className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
              <Briefcase className="w-3.5 h-3.5 text-blue-700" />
              <span>Explore Direct Career Openings</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Featured Job Openings in Gwalior &amp; MP
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Filter by job title, industry sector, or keyword to find verified immediate vacancies.
            </p>
          </div>

          <button
            onClick={onOpenResumeForm}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-700 hover:text-blue-900 cursor-pointer self-start md:self-auto group"
          >
            <span>Submit your general resume</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Search & Filter Control Panel */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5 mb-6 space-y-4">
          {/* Top Row: Search Input + Scope Selector + Industry Dropdown */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Keyword Input */}
            <div className="relative md:col-span-6">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search by title (e.g. Account Exec) or industry (e.g. FMCG)..."
                className="w-full pl-10 pr-9 py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-blue-600 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors shadow-2xs"
              />
              {keyword && (
                <button
                  onClick={() => setKeyword('')}
                  title="Clear search keyword"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/60 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter Scope Toggle (All / By Title / By Industry) */}
            <div className="md:col-span-3">
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600">
                <button
                  type="button"
                  onClick={() => setSearchScope('all')}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-center transition-all cursor-pointer ${
                    searchScope === 'all'
                      ? 'bg-white text-blue-900 shadow-2xs font-bold'
                      : 'hover:text-slate-900'
                  }`}
                >
                  All Fields
                </button>
                <button
                  type="button"
                  onClick={() => setSearchScope('title')}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-center transition-all cursor-pointer ${
                    searchScope === 'title'
                      ? 'bg-white text-blue-900 shadow-2xs font-bold'
                      : 'hover:text-slate-900'
                  }`}
                >
                  Role Title
                </button>
                <button
                  type="button"
                  onClick={() => setSearchScope('industry')}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-center transition-all cursor-pointer ${
                    searchScope === 'industry'
                      ? 'bg-white text-blue-900 shadow-2xs font-bold'
                      : 'hover:text-slate-900'
                  }`}
                >
                  Industry
                </button>
              </div>
            </div>

            {/* Industry / Category Dropdown */}
            <div className="relative md:col-span-3">
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="w-full pl-9 pr-8 py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-blue-600 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-none transition-colors appearance-none cursor-pointer shadow-2xs"
                >
                  <option value="all">All Industries &amp; Sectors</option>
                  <optgroup label="Popular Sectors">
                    <option value="FMCG">FMCG &amp; Consumer Goods</option>
                    <option value="Trading & Logistics">Trading &amp; Logistics</option>
                    <option value="Accounts & Finance">Accounts &amp; Finance</option>
                    <option value="Back Office & Computer">Back Office &amp; Computer</option>
                    <option value="Sales & Marketing">Sales &amp; Marketing</option>
                    <option value="HR & Administration">HR &amp; Staffing</option>
                    <option value="Logistics & Warehouse">Logistics &amp; Warehouse</option>
                    <option value="Finance & Audit">Finance &amp; Audit</option>
                  </optgroup>
                  {availableIndustries.length > 0 && (
                    <optgroup label="All Detected Sectors">
                      {availableIndustries.map((ind) => (
                        <option key={ind} value={ind}>
                          {ind}
                        </option>
                      ))}
                    </optgroup>
                  )}
                </select>
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Quick Keyword Suggestions & Active Filters */}
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5 text-xs">
            {/* Quick click suggestions */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>Popular:</span>
              </span>
              {popularTitles.slice(0, 3).map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setKeyword(item);
                    setSearchScope('title');
                  }}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer text-[11px] font-medium ${
                    keyword.toLowerCase() === item.toLowerCase()
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {item}
                </button>
              ))}
              <span className="text-slate-300 mx-0.5">•</span>
              {popularIndustries.slice(0, 3).map((ind) => (
                <button
                  key={ind}
                  onClick={() => {
                    setKeyword(ind);
                    setSearchScope('industry');
                  }}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer text-[11px] font-medium ${
                    keyword.toLowerCase() === ind.toLowerCase()
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-100'
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>

            {/* Results count & Reset button */}
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-xs font-semibold text-slate-500">
                Found{' '}
                <span className="text-slate-900 font-bold">
                  {filteredJobs.length}
                </span>{' '}
                {filteredJobs.length === 1 ? 'opening' : 'openings'}
              </span>

              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          </div>

          {/* Active Filter Chips Bar */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 pt-1 flex-wrap text-xs">
              <span className="text-[11px] font-medium text-slate-400">Active Filters:</span>

              {keyword && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 font-medium text-xs">
                  <Tag className="w-3 h-3 text-blue-600" />
                  <span>
                    Keyword: <strong>"{keyword}"</strong>
                    {searchScope !== 'all' && (
                      <span className="text-blue-700 text-[10px] ml-1">
                        ({searchScope === 'title' ? 'Title only' : 'Industry only'})
                      </span>
                    )}
                  </span>
                  <button
                    onClick={() => setKeyword('')}
                    className="hover:text-blue-950 p-0.5 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedIndustry !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-medium text-xs">
                  <Building2 className="w-3 h-3 text-emerald-600" />
                  <span>Industry: <strong>{selectedIndustry}</strong></span>
                  <button
                    onClick={() => setSelectedIndustry('all')}
                    className="hover:text-emerald-950 p-0.5 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Listings Grid */}
        {filteredJobs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">
              No openings match your keyword or industry filter
            </h3>
            <p className="text-xs text-slate-500 mt-1.5 max-w-md mx-auto mb-5">
              {keyword ? (
                <>
                  No results found for <span className="font-semibold text-slate-700">"{keyword}"</span>
                  {selectedIndustry !== 'all' && (
                    <> in industry <span className="font-semibold text-slate-700">"{selectedIndustry}"</span></>
                  )}. Try searching with broader keywords like "Account", "Sales", "Tally", or "FMCG".
                </>
              ) : (
                'No jobs currently listed in the selected category. Try selecting another industry or submit your resume directly.'
              )}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <Button variant="outline" size="sm" onClick={handleResetFilters}>
                <RotateCcw className="w-3.5 h-3.5 mr-1" />
                Clear Filters &amp; View All Openings
              </Button>
              <Button variant="primary" size="sm" onClick={onOpenResumeForm}>
                Submit General Resume
              </Button>
            </div>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filteredJobs.map((job) => (
                <motion.div
                  key={job._id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <JobCard job={job} onViewDetails={onViewDetails} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};

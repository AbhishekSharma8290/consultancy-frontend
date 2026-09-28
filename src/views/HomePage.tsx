'use client';
import React from 'react';
import { ShieldCheck, Zap, HeartHandshake, IndianRupee } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { HeroSection } from '../components/organisms/HeroSection';
import { UrgentOpportunitySection } from '../components/organisms/UrgentOpportunitySection';
import { JobListingsSection } from '../components/organisms/JobListingsSection';
import { CandidateApplicationForm } from '../components/organisms/CandidateApplicationForm';

export const HomePage: React.FC = () => {
  const {
    jobs,
    stats,
    setSearch,
    setSelectedJob,
    openApplyModal,
  } = useAppStore();

  const handleSearch = (query: string, sector: string) => {
    setSearch(query, sector);
    const openingsElem = document.getElementById('openings');
    if (openingsElem) {
      openingsElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToApply = () => {
    const applyElem = document.getElementById('apply-section');
    if (applyElem) {
      applyElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-0">
      {/* 1. Hero Section with Interactive Poster */}
      <HeroSection
        onSearch={handleSearch}
        onApplyClick={scrollToApply}
        placedCount={stats?.placedCandidates || 10450}
        partnerCount={stats?.partnerCompanies || 500}
      />

      {/* 2. Immediate FMCG Opportunity Section (Image 2) */}
      <UrgentOpportunitySection onOpenApplyModal={scrollToApply} />

      {/* 3. Featured Openings in Gwalior & MP */}
      <JobListingsSection
        jobs={jobs}
        onViewDetails={setSelectedJob}
        onOpenResumeForm={scrollToApply}
      />

      {/* 4. Why Job Seekers & Employers Choose BPS (4 Pillars from Image 2) */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 inline-block mb-2">
              Our Advantage
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Why Job Seekers &amp; Employers Choose Balaji Placement Service
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              With over a decade of domain expertise, we bridge talent with right-fit employers with absolute transparency and speed.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80 shadow-2xs hover:border-blue-400 hover:shadow-sm transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                100% Verified Employers
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We exclusively tie up with registered and verified businesses, ensuring timely salaries and genuine career growth.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80 shadow-2xs hover:border-blue-400 hover:shadow-sm transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Fast Interview Setup
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                No waiting for weeks. Selected profiles get scheduled for direct face-to-face or telephone rounds within 24 to 48 hours.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80 shadow-2xs hover:border-blue-400 hover:shadow-sm transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Safe &amp; Equal Opportunity
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Special focus on supportive opportunities for working women, female freshers, and experienced professionals.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80 shadow-2xs hover:border-blue-400 hover:shadow-sm transition-all">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4">
                <IndianRupee className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Salary Negotiation Support
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our career advisors help you articulate your skill value to secure the best compensation package.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Candidate Resume Submission Form (Image 2) */}
      <CandidateApplicationForm />
    </div>
  );
};

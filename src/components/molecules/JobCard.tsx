'use client';
import React from 'react';
import { MapPin, IndianRupee, Clock, CheckCircle2, Building2 } from 'lucide-react';
import { Job } from '../../types/index';
import { Button } from '../atoms/Button';
import { WhatsAppIcon } from '../atoms/WhatsAppIcon';

interface JobCardProps {
  job: Job;
  onViewDetails: (job: Job) => void;
  onQuickApply?: (job: Job) => void;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  onViewDetails,
  onQuickApply,
}) => {
  const handleWhatsAppApply = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `Hello Balaji Placement Service, I want to apply for the position: *${job.title}* at ${job.company} (${job.location}). Please share interview schedule details.`;
    const url = `https://wa.me/91${job.contactPhone1 || '9131008934'}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      onClick={() => onViewDetails(job)}
      className="group relative flex flex-col justify-between p-5 bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            {job.isUrgent && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-red-50 text-red-600 border border-red-200 uppercase tracking-wider">
                Urgent Need
              </span>
            )}
            <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              {job.category}
            </span>
          </div>
          <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-slate-400" />
            <span className="truncate max-w-[120px]">{job.location.split(',')[0]}</span>
          </span>
        </div>

        {/* Title & Company */}
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors tracking-tight line-clamp-1">
          {job.title}
        </h3>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5 mb-3.5">
          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{job.company}</span>
          <span>•</span>
          <span className="text-slate-400">{job.genderPreference}</span>
        </div>

        {/* Key Attributes */}
        <div className="space-y-2 py-3 border-y border-slate-100 text-xs text-slate-600 mb-4">
          <div className="flex items-center gap-2 font-semibold text-emerald-800">
            <IndianRupee className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{job.salary}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{job.timing}</span>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span className="truncate">{job.experienceRequired}</span>
          </div>
        </div>

        {/* Skills Snippet */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {job.requiredSkills.slice(0, 3).map((skill, idx) => (
            <span
              key={idx}
              className="text-[11px] px-2 py-0.5 rounded-md bg-blue-50/70 text-blue-800 font-medium truncate max-w-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
        <Button
          variant="whatsapp"
          size="sm"
          icon={<WhatsAppIcon className="w-4 h-4" />}
          onClick={handleWhatsAppApply}
          className="w-full text-xs font-semibold py-2"
        >
          Apply via WhatsApp
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(job);
          }}
          className="w-full text-xs font-semibold py-2"
        >
          View JD & Apply
        </Button>
      </div>
    </div>
  );
};

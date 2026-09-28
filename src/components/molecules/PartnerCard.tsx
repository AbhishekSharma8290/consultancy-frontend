'use client';
import React from 'react';
import { CheckCircle, MapPin, IndianRupee, ArrowUpRight } from 'lucide-react';
import { Partner } from '../../types/index';
import { Button } from '../atoms/Button';

interface PartnerCardProps {
  partner: Partner;
  onApplyViaDesk: (partner: Partner) => void;
}

export const PartnerCard: React.FC<PartnerCardProps> = ({
  partner,
  onApplyViaDesk,
}) => {
  return (
    <div className="flex flex-col justify-between p-5 bg-white rounded-2xl border border-slate-200 hover:border-blue-400 shadow-xs hover:shadow-md transition-all duration-200">
      <div>
        {/* Header with Initials badge and Verified */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-slate-900 text-white font-black text-sm flex items-center justify-center shrink-0 tracking-tight shadow-xs">
              {partner.initials}
            </div>
            <div>
              <h4 className="font-bold text-base text-slate-900 leading-snug">
                {partner.name}
              </h4>
              <span className="text-xs text-slate-500 font-medium">
                {partner.sector}
              </span>
            </div>
          </div>

          {partner.isVerified && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
              <CheckCircle className="w-3 h-3 text-emerald-600" />
              Verified
            </span>
          )}
        </div>

        {/* Location & Track Record */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{partner.location}</span>
        </div>

        {/* Frequent Roles & Salary */}
        <div className="space-y-2 py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 mb-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-0.5">
              Frequent Roles:
            </span>
            <p className="font-medium text-slate-800 line-clamp-2">
              {partner.frequentRoles}
            </p>
          </div>

          <div className="flex items-center justify-between pt-1.5 border-t border-slate-200/60">
            <span className="text-[11px] text-slate-500">Est. Salary:</span>
            <span className="font-bold text-slate-900 flex items-center">
              <IndianRupee className="w-3 h-3 text-slate-600" />
              {partner.salaryRange.replace('₹', '')}
            </span>
          </div>
        </div>
      </div>

      {/* Footer status & Action */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
          {partner.status}
        </span>
        <Button
          variant="ghost"
          size="sm"
          icon={<ArrowUpRight className="w-3.5 h-3.5" />}
          iconPosition="right"
          onClick={() => onApplyViaDesk(partner)}
          className="text-xs text-blue-700 hover:text-blue-900 font-bold"
        >
          Apply via Desk
        </Button>
      </div>
    </div>
  );
};

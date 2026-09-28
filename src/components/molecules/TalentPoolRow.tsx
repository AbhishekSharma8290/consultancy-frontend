'use client';
import React from 'react';
import { Clock, Users } from 'lucide-react';

interface TalentPoolRowProps {
  category: string;
  countAvailable: string;
  turnaroundTime: string;
  description: string;
  subRoles: string[];
  icon: React.ReactNode;
}

export const TalentPoolRow: React.FC<TalentPoolRowProps> = ({
  category,
  countAvailable,
  turnaroundTime,
  description,
  subRoles,
  icon,
}) => {
  return (
    <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
            {icon}
          </div>
          <h4 className="font-bold text-base text-slate-900">{category}</h4>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
          <Users className="w-3.5 h-3.5 text-emerald-600" />
          <span>{countAvailable} Available</span>
        </div>
      </div>

      <p className="text-xs text-slate-600 mb-3 leading-relaxed">{description}</p>

      {/* Sub roles */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {subRoles.map((role, idx) => (
          <span
            key={idx}
            className="text-[11px] font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md"
          >
            {role}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500 font-medium">
        <span>Avg. Hiring Turnaround:</span>
        <span className="font-bold text-slate-900 flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-blue-600" />
          {turnaroundTime}
        </span>
      </div>
    </div>
  );
};

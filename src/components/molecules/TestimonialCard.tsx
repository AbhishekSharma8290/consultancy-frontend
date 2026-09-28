'use client';
import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  location: string;
  avatarInitials: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  role,
  company,
  location,
  avatarInitials,
}) => {
  return (
    <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
      <div>
        {/* 5-star rating */}
        <div className="flex items-center gap-1 text-amber-400 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400" />
          ))}
        </div>

        {/* Quote text */}
        <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
          &ldquo;{quote}&rdquo;
        </p>
      </div>

      {/* Author block */}
      <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-900 font-bold text-sm flex items-center justify-center shrink-0">
          {avatarInitials}
        </div>
        <div>
          <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <span>{author}</span>
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <div className="text-xs text-slate-500 font-medium">
            {role}, {company}
          </div>
          <div className="text-[11px] text-slate-400 font-medium">{location}</div>
        </div>
      </div>
    </div>
  );
};

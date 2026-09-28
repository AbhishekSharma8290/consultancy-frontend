'use client';
import React from 'react';
import { motion } from 'motion/react';

interface StatCardProps {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  subtext?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  icon,
  subtext,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between ${className}`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight font-sans">
          {value}
        </span>
        {icon && (
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
            {icon}
          </div>
        )}
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
          {label}
        </p>
        {subtext && <p className="text-[11px] text-slate-400 mt-0.5">{subtext}</p>}
      </div>
    </motion.div>
  );
};

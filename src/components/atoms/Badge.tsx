'use client';
import React from 'react';

export interface BadgeProps {
  variant?: 'urgent' | 'hot' | 'verified' | 'featured' | 'neutral' | 'success' | 'blue';
  size?: 'sm' | 'md';
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'md',
  children,
  icon,
  className = '',
}) => {
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
  }[size];

  const variantStyles = {
    urgent: 'bg-red-50 text-red-700 border border-red-200 font-semibold',
    hot: 'bg-rose-500 text-white font-bold tracking-wider text-[10px] uppercase shadow-xs',
    verified: 'bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium',
    featured: 'bg-amber-50 text-amber-800 border border-amber-200 font-medium',
    neutral: 'bg-slate-100 text-slate-700 border border-slate-200 font-normal',
    success: 'bg-green-50 text-green-700 border border-green-200 font-medium',
    blue: 'bg-blue-50 text-blue-700 border border-blue-200 font-medium',
  }[variant];

  return (
    <span
      className={`inline-flex items-center rounded-full tracking-tight ${sizeStyles} ${variantStyles} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

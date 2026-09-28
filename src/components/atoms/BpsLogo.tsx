'use client';
import React from 'react';

interface BpsLogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'white';
  showTagline?: boolean;
}

export const BpsLogo: React.FC<BpsLogoProps> = ({
  className = '',
  variant = 'full',
  showTagline = true,
}) => {
  const isWhite = variant === 'white';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Crescent Emblem */}
      <div className="relative w-11 h-11 shrink-0 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
          {/* Crescent Moon */}
          <path
            d="M 50 10 A 40 40 0 1 0 85 70 A 30 30 0 1 1 50 10 Z"
            fill="#f59e0b"
          />
          {/* Reaching Human Figure */}
          <circle cx="58" cy="35" r="7" fill={isWhite ? '#ffffff' : '#1e3a8a'} />
          <path
            d="M 58 45 C 50 48, 42 62, 42 75 C 50 72, 60 70, 70 75 C 68 62, 62 48, 58 45 Z"
            fill={isWhite ? '#ffffff' : '#1e3a8a'}
          />
          {/* Arms raised up */}
          <path
            d="M 40 42 Q 52 50 58 47 Q 66 42 75 35 Q 67 52 58 52 Q 48 52 40 42 Z"
            fill={isWhite ? '#ffffff' : '#1e3a8a'}
          />
        </svg>
        <span
          className={`absolute -bottom-1 font-black tracking-tighter text-[9px] ${
            isWhite ? 'text-white' : 'text-[#1e3a8a]'
          }`}
        >
          BPS
        </span>
      </div>

      {/* Vertical Divider */}
      <div className={`h-9 w-[1.5px] ${isWhite ? 'bg-white/30' : 'bg-slate-300'}`} />

      {/* Typography */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center leading-none">
          <span
            className={`font-black text-lg tracking-tight font-sans ${
              isWhite ? 'text-white' : 'text-[#00236f]'
            }`}
          >
            BALAJI
          </span>
          <span
            className={`font-black text-lg tracking-tight ml-1 font-sans ${
              isWhite ? 'text-blue-200' : 'text-[#1e3a8a]'
            }`}
          >
            PLACEMENT
          </span>
        </div>
        <div
          className={`font-extrabold text-[11px] tracking-wider uppercase leading-none mt-0.5 ${
            isWhite ? 'text-blue-100' : 'text-[#00236f]'
          }`}
        >
          SERVICE
        </div>

        {showTagline && (
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-3 h-[2px] bg-amber-500 rounded-full" />
            <span
              className={`text-[9.5px] font-semibold italic tracking-tight ${
                isWhite ? 'text-amber-300' : 'text-amber-600'
              }`}
            >
              Your Success, Our Expertise
            </span>
            <span className="w-3 h-[2px] bg-amber-500 rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
};

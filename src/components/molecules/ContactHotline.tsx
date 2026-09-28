'use client';
import React from 'react';
import { Phone } from 'lucide-react';
import { WhatsAppIcon } from '../atoms/WhatsAppIcon';

interface ContactHotlineProps {
  variant?: 'compact' | 'cards' | 'header';
}

export const ContactHotline: React.FC<ContactHotlineProps> = ({ variant = 'cards' }) => {
  const openWhatsApp = (number: string, text: string) => {
    const url = `https://wa.me/91${number}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (variant === 'header') {
    return (
      <div className="flex items-center gap-4 text-xs font-medium">
        <div className="flex items-center gap-1.5 text-slate-700">
          <Phone className="w-3.5 h-3.5 text-blue-700" />
          <span>Call Support:</span>
          <a
            href="tel:+919131008934"
            className="font-bold text-slate-900 hover:text-blue-700 transition-colors"
          >
            9131008934
          </a>
          <span className="text-slate-300">/</span>
          <a
            href="tel:+919009822116"
            className="font-bold text-slate-900 hover:text-blue-700 transition-colors"
          >
            9009822116
          </a>
        </div>
        <button
          onClick={() =>
            openWhatsApp(
              '9131008934',
              'Hello Balaji Placement Service, I am interested in recruitment and job opportunities in Gwalior.'
            )
          }
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors cursor-pointer"
        >
          <WhatsAppIcon className="w-3.5 h-3.5" />
          <span>WhatsApp Us</span>
        </button>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <a
          href="tel:+919131008934"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 text-xs font-bold hover:bg-blue-100 transition-colors"
        >
          <Phone className="w-3.5 h-3.5" />
          9131008934
        </a>
        <a
          href="tel:+919009822116"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 text-xs font-bold hover:bg-blue-100 transition-colors"
        >
          <Phone className="w-3.5 h-3.5" />
          9009822116
        </a>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
      <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900 text-white shadow-xs">
        <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
          <Phone className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
            Primary Helpline
          </div>
          <a
            href="tel:+919131008934"
            className="text-base font-bold text-white hover:text-blue-300 transition-colors"
          >
            9131008934
          </a>
        </div>
      </div>

      <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900 text-white shadow-xs">
        <div className="w-10 h-10 rounded-lg bg-amber-600 flex items-center justify-center shrink-0">
          <Phone className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
            Secondary Helpline
          </div>
          <a
            href="tel:+919009822116"
            className="text-base font-bold text-white hover:text-amber-300 transition-colors"
          >
            9009822116
          </a>
        </div>
      </div>
    </div>
  );
};

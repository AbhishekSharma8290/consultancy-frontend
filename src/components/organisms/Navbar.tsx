'use client';
import React, { useState } from 'react';
import { Phone, Menu, X, ArrowRight, ShieldCheck, Sparkles, Database, User, LogOut } from 'lucide-react';
import { BpsLogo } from '../atoms/BpsLogo';
import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';
import { WhatsAppIcon } from '../atoms/WhatsAppIcon';
import { useAppStore } from '../../store/useAppStore';

interface NavbarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenApplyModal: () => void;
  urgentJobsCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenApplyModal,
  urgentJobsCount = 2,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout, openAuthModal } = useAppStore();

  const handleNavClick = (tabId: string) => {
    onSelectTab(tabId);
    setMobileMenuOpen(false);
  };

  const openWhatsApp = () => {
    window.open(
      'https://wa.me/919131008934?text=Hello%20Balaji%20Placement%20Service%2C%20I%20want%20to%20inquire%20about%20recruitment%20services%20in%20Gwalior.',
      '_blank',
      'noopener,noreferrer'
    );
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'urgent', label: 'Urgent Hiring', hasHot: true },
    { id: 'jobs', label: 'Open Positions' },
    { id: 'employers', label: 'Employers / Hire Talent' },
    { id: 'partners', label: 'Placement Partners' },
    { id: 'admin', label: 'Recruiter Desk', isPill: true },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Utility Bar */}
      <div className="bg-[#00174b] text-white text-[11px] font-medium py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-4">
          <div className="flex items-center gap-3">
            <span className="italic text-amber-300 font-semibold tracking-tight">
              &ldquo;Your Succes, Our Expertise&rdquo;
            </span>
            <span className="hidden md:inline text-slate-400">•</span>
            <span className="hidden md:inline text-slate-300">
              16 Sikarwar plaza 1st floor goverdhan colony, Gwalior & Pan-India Staffing
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-slate-300">
              <Phone className="w-3 h-3 text-amber-400" />
              <span>Call Support:</span>
              <a
                href="tel:+919131008934"
                className="font-bold text-white hover:text-amber-300 transition-colors"
              >
                9131008934
              </a>
              <span className="text-slate-400">/</span>
              <a
                href="tel:+919009822116"
                className="font-bold text-white hover:text-amber-300 transition-colors"
              >
                9009822116
              </a>
            </div>

            <button
              onClick={openWhatsApp}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-300 hover:text-emerald-200 transition-colors cursor-pointer"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="cursor-pointer transition-opacity hover:opacity-95"
          >
            <BpsLogo />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative px-3 py-2 text-xs xl:text-sm font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'text-blue-700 bg-blue-50/70 font-bold'
                      : 'text-slate-700 hover:text-blue-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.hasHot && (
                    <span className="px-1.5 py-0.2 rounded-full text-[9px] font-extrabold uppercase bg-red-600 text-white tracking-wider animate-pulse">
                      HOT
                    </span>
                  )}
                  {link.isPill && (
                    <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
                      <Database className="w-2.5 h-2.5" />
                      DB
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action CTA Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <a
              href="tel:+919131008934"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 text-slate-800 hover:border-blue-600 hover:text-blue-700 text-xs font-bold transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>9131008934</span>
            </a>

            {isAuthenticated ? (
              <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 px-2.5 py-1.5 rounded-lg">
                <User className="w-3.5 h-3.5 text-blue-700" />
                <span className="text-xs font-bold text-blue-900 max-w-[100px] truncate">
                  {user?.name}
                </span>
                <button
                  onClick={logout}
                  className="p-1 rounded text-slate-400 hover:text-red-600 ml-1 transition-colors"
                  title="Log out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                icon={<User className="w-3.5 h-3.5" />}
                onClick={() => openAuthModal('login')}
                className="text-xs font-bold px-3 py-2 border-slate-300 hover:border-blue-500"
              >
                Sign In
              </Button>
            )}

            <Button
              variant="primary"
              size="sm"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              onClick={onOpenApplyModal}
              className="bg-[#00236f] hover:bg-[#1e3a8a] text-xs font-bold px-4 py-2"
            >
              Apply Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-slate-900" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 shadow-lg animate-in fade-in duration-150">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  isActive
                    ? 'text-blue-700 bg-blue-50 font-bold'
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                <span>{link.label}</span>
                {link.hasHot && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-red-600 text-white">
                    HOT
                  </span>
                )}
                {link.isPill && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
                    MongoDB
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100 space-y-2">
            {isAuthenticated ? (
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-blue-50 border border-blue-200">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-700" />
                  <span className="text-xs font-bold text-blue-900">{user?.name} ({user?.role})</span>
                </div>
                <button
                  onClick={logout}
                  className="text-xs font-bold text-red-600 hover:text-red-800"
                >
                  Log out
                </button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="md"
                icon={<User className="w-4 h-4" />}
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('login');
                }}
                className="w-full text-xs font-bold"
              >
                Sign In / Register Account
              </Button>
            )}

            <Button
              variant="whatsapp"
              size="md"
              icon={<WhatsAppIcon className="w-4 h-4" />}
              onClick={openWhatsApp}
              className="w-full text-xs"
            >
              WhatsApp Support (9131008934)
            </Button>
            <Button
              variant="primary"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenApplyModal();
              }}
              className="w-full text-xs"
            >
              Submit Resume / Apply Now
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

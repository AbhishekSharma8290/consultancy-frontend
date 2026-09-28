'use client';
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { Navbar } from '../organisms/Navbar';
import { Footer } from '../organisms/Footer';
import { AuthModal } from '../organisms/AuthModal';
import { JobDetailModal } from '../organisms/JobDetailModal';
import { WhatsAppIcon } from '../atoms/WhatsAppIcon';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const {
    activeTab,
    setActiveTab,
    selectedJob,
    setSelectedJob,
    openApplyModal,
    toast,
    clearToast,
    stats,
  } = useAppStore();

  const openFloatingWhatsApp = () => {
    const text = 'Hello Balaji Placement Service, I want to discuss job openings and recruitment services in Gwalior.';
    window.open(`https://wa.me/919131008934?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8ff] text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenApplyModal={() => openApplyModal('Account Executive (FMCG Urgent)')}
        urgentJobsCount={stats?.urgentOpenings || 2}
      />

      {/* Main Content Area */}
      <main className="flex-1">{children}</main>

      {/* Toast Notification Container */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl text-xs font-bold text-white bg-slate-900 border border-slate-700"
          >
            {toast.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
            {toast.type === 'info' && <Info className="w-4 h-4 text-blue-400 shrink-0" />}
            <span>{toast.text}</span>
            <button
              onClick={clearToast}
              className="ml-2 p-0.5 rounded text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Speed Actions (WhatsApp & Phone) */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        <a
          href="tel:+919131008934"
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-slate-900 text-white text-xs font-bold shadow-lg hover:bg-slate-800 transition-transform hover:scale-105"
          title="Direct Phone Call: 9131008934"
        >
          <Phone className="w-4 h-4 text-amber-400" />
          <span className="hidden sm:inline">Call Helpline</span>
        </a>

        <button
          onClick={openFloatingWhatsApp}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xl transition-transform hover:scale-105 cursor-pointer"
          title="Chat on WhatsApp"
        >
          <WhatsAppIcon className="w-5 h-5 text-white" />
          <span className="hidden sm:inline">WhatsApp Recruiter</span>
        </button>
      </div>

      {/* Global Modals */}
      <AuthModal />
      <JobDetailModal job={selectedJob} onClose={() => setSelectedJob(null)} />

      {/* Footer */}
      <Footer onNavigate={setActiveTab} onOpenApply={() => openApplyModal('General Candidate')} />
    </div>
  );
};

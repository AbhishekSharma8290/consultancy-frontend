'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppStore } from '../store/useAppStore';
import { MainLayout } from './templates/MainLayout';
import { HomePage } from '../views/HomePage';
import { UrgentHiringPage } from '../views/UrgentHiringPage';
import { JobListingsSection } from './organisms/JobListingsSection';
import { EmployerPriorityDesk } from './organisms/EmployerPriorityDesk';
import { PartnersDirectorySection } from './organisms/PartnersDirectorySection';
import { AdminPortal } from './organisms/AdminPortal';

interface PortalAppProps {
  initialTab?: string;
}

export function PortalApp({ initialTab }: PortalAppProps) {
  const {
    activeTab,
    fetchAllData,
    jobs,
    partners,
    setSelectedJob,
    openApplyModal,
    setActiveTab,
  } = useAppStore();

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, setActiveTab]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const renderCurrentView = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'urgent':
        return <UrgentHiringPage />;
      case 'jobs':
        return (
          <div className="py-8 bg-slate-50 min-h-screen">
            <JobListingsSection
              jobs={jobs}
              onViewDetails={setSelectedJob}
              onOpenResumeForm={() => openApplyModal('General Candidate')}
            />
          </div>
        );
      case 'employers':
        return <EmployerPriorityDesk />;
      case 'partners':
        return (
          <PartnersDirectorySection
            partners={partners}
            onApplyViaDesk={(partner) => {
              openApplyModal(`Partner Desk: ${partner.name}`);
            }}
            onOpenEmployerForm={() => setActiveTab('employers')}
          />
        );
      case 'admin':
        return <AdminPortal />;
      default:
        return <HomePage />;
    }
  };

  return (
    <MainLayout>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {renderCurrentView()}
        </motion.div>
      </AnimatePresence>
    </MainLayout>
  );
}

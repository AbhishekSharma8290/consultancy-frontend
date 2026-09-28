'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Briefcase,
  Building,
  MapPin,
  IndianRupee,
  Clock,
  Users,
  CheckCircle2,
  Phone,
  Send,
  FileCheck,
  ShieldCheck,
} from 'lucide-react';
import { Job } from '../../types/index';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { WhatsAppIcon } from '../atoms/WhatsAppIcon';
import { useAppStore } from '../../store/useAppStore';

interface JobDetailModalProps {
  job: Job | null;
  onClose: () => void;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({ job, onClose }) => {
  const { showToast, fetchCandidates } = useAppStore();
  const [activeTab, setActiveTab] = useState<'details' | 'apply'>('details');

  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantLocation, setApplicantLocation] = useState('');
  const [applicantSkills, setApplicantSkills] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!job) return null;

  const openWhatsApp = () => {
    const text = `Hello Balaji Placement Service, I want to apply for *${job.title}* at ${job.company} (${job.location}). My phone is ${applicantPhone || 'available'}. Please schedule an interview.`;
    window.open(`https://wa.me/91${job.contactPhone1 || '9131008934'}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleDirectApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName.trim() || !applicantPhone.trim()) {
      showToast('Please enter your full name and WhatsApp number.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/candidates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: applicantName,
          phone: applicantPhone,
          position: job.title + ` (${job.company})`,
          location: applicantLocation || job.location,
          skills: applicantSkills || job.requiredSkills.join(', '),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setIsSubmitted(true);
        showToast('Application submitted successfully!', 'success');
        fetchCandidates();
      } else {
        showToast(data.message || 'Error submitting application', 'error');
      }
    } catch {
      showToast('Network error submitting application', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8"
        >
          {/* Header */}
          <div className="bg-[#00236f] text-white p-6 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              {job.isUrgent && (
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-red-600 text-white tracking-wider">
                  Urgent Hiring
                </span>
              )}
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/20 text-white">
                {job.category}
              </span>
            </div>

            <h3 className="text-2xl font-black tracking-tight">{job.title}</h3>
            <div className="flex items-center gap-2 text-xs text-blue-200 mt-1">
              <span>{job.company}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {job.location}
              </span>
            </div>

            {/* Tab switch */}
            <div className="grid grid-cols-2 gap-2 mt-5 p-1 bg-white/10 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveTab('details')}
                className={`py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'details' ? 'bg-white text-slate-900 shadow-xs' : 'text-white/80 hover:text-white'
                }`}
              >
                Job Description &amp; Requirements
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('apply')}
                className={`py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'apply' ? 'bg-white text-slate-900 shadow-xs' : 'text-white/80 hover:text-white'
                }`}
              >
                Quick Application Form
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            {activeTab === 'details' ? (
              <div className="space-y-6">
                {/* Highlights bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Salary</span>
                    <span className="text-xs font-bold text-emerald-800">{job.salary}</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Shift Timing</span>
                    <span className="text-xs font-bold text-slate-900">{job.timing}</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Gender</span>
                    <span className="text-xs font-bold text-blue-700">{job.genderPreference}</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Experience</span>
                    <span className="text-xs font-bold text-slate-900 truncate block">{job.experienceRequired}</span>
                  </div>
                </div>

                {/* About the role */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    About The Role
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {job.description}
                  </p>
                </div>

                {/* Skills */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Required Skills &amp; Qualifications
                  </h4>
                  <div className="space-y-2 text-xs text-slate-700">
                    {job.requiredSkills.map((skill, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Placement Guarantees &amp; Benefits
                  </h4>
                  <div className="space-y-2 text-xs text-slate-700">
                    {job.benefits.map((b, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-200">
                  <Button
                    variant="whatsapp"
                    size="md"
                    icon={<WhatsAppIcon className="w-4 h-4" />}
                    onClick={openWhatsApp}
                    className="w-full sm:flex-1 text-xs font-bold"
                  >
                    Apply on WhatsApp
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => setActiveTab('apply')}
                    className="w-full sm:flex-1 text-xs font-bold bg-[#00236f]"
                  >
                    Fill Application Form
                  </Button>
                </div>
              </div>
            ) : isSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-black text-slate-900">Application Sent!</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Your profile for <strong className="text-slate-900">{job.title}</strong> has been logged in our local database. Our recruiter will call you within 24 hours.
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <Button variant="whatsapp" size="sm" onClick={openWhatsApp}>
                    Follow up on WhatsApp
                  </Button>
                  <Button variant="outline" size="sm" onClick={onClose}>
                    Close Window
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleDirectApply} className="space-y-4">
                <Input
                  label="Candidate Full Name"
                  required
                  placeholder="e.g. Anjali Verma"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                />

                <Input
                  label="WhatsApp Phone Number"
                  required
                  placeholder="e.g. 9131008934"
                  value={applicantPhone}
                  onChange={(e) => setApplicantPhone(e.target.value)}
                />

                <Input
                  label="Current Location in Gwalior"
                  placeholder="e.g. Hazira, Morar, Thatipur, Lashkar"
                  value={applicantLocation}
                  onChange={(e) => setApplicantLocation(e.target.value)}
                />

                <Input
                  label="Relevant Skills & Experience"
                  placeholder="e.g. Tally Prime, MS Excel, 6 months billing"
                  value={applicantSkills}
                  onChange={(e) => setApplicantSkills(e.target.value)}
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={isSubmitting}
                  icon={<Send className="w-4 h-4" />}
                  className="w-full bg-[#00236f] hover:bg-[#1e3a8a] text-xs font-bold py-3 mt-2 rounded-xl"
                >
                  Submit Application for {job.title}
                </Button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

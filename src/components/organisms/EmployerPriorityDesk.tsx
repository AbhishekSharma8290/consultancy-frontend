'use client';
import React, { useState } from 'react';
import {
  Building2,
  Users,
  Clock,
  ShieldCheck,
  Send,
  Phone,
  FileCheck,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  Truck,
  Calculator,
  Laptop,
  TrendingUp,
  Wrench,
} from 'lucide-react';
import { Input } from '../atoms/Input';
import { Select } from '../atoms/Select';
import { Textarea } from '../atoms/Textarea';
import { Button } from '../atoms/Button';
import { WhatsAppIcon } from '../atoms/WhatsAppIcon';
import { TalentPoolRow } from '../molecules/TalentPoolRow';
import { TestimonialCard } from '../molecules/TestimonialCard';

export const EmployerPriorityDesk: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    industrySector: 'FMCG & Retail Distribution',
    roleNeeded: '',
    vacancies: '1 - 2 Staff',
    location: 'Hazira / Char Shahar Ka Naka',
    salaryRange: '₹15,000 - ₹22,000',
    experienceLevel: 'Freshers Welcome (0-1 yr)',
    genderPreference: 'No Preference',
    notes: '',
    contactName: '',
    whatsapp: '',
    email: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedInquiry, setSubmittedInquiry] = useState<any | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.companyName.trim() || !formData.roleNeeded.trim() || !formData.contactName.trim() || !formData.whatsapp.trim()) {
      setErrorMsg('Please fill in Company Name, Role Needed, Contact Name, and WhatsApp Number.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/employers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to submit requirement');
      }

      setSubmittedInquiry(data.data);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error submitting requirement. Please try again or WhatsApp our corporate desk.');
    } finally {
      setIsLoading(false);
    }
  };

  const openCorporateWhatsApp = () => {
    const text = 'Hello Balaji Placement Corporate Desk, we have an urgent corporate manpower requirement in Gwalior / Central India. Please connect us with your Senior Staffing Manager.';
    window.open(`https://wa.me/919009822116?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="py-12 bg-[#faf8ff]">
      {/* Top Banner Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-3">
          <Clock className="w-3.5 h-3.5 text-blue-700" />
          <span>Quick Turnaround Recruitment in Gwalior &amp; Central India</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight max-w-4xl">
          Hire Pre-Vetted, Qualified Talent in <span className="text-blue-700 underline decoration-amber-400">Under 48 Hours</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 mt-3 max-w-3xl leading-relaxed">
          From FMCG Account Executives and Billing Operators to Field Sales and Warehouse
          Supervisors, Balaji Placement Service connects local businesses and pan-India enterprises
          with reliable, ready-to-join candidates.
        </p>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-3 pt-5">
          <Button
            variant="whatsapp"
            size="md"
            icon={<WhatsAppIcon className="w-4 h-4" />}
            onClick={openCorporateWhatsApp}
            className="text-xs font-bold"
          >
            Chat with Head of Staffing on WhatsApp
          </Button>

          <a
            href="tel:+919009822116"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
          >
            <Phone className="w-4 h-4 text-amber-400" />
            <span>Call Corporate Desk: +91 9009822116</span>
          </a>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-200">
          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <div className="text-xs font-bold uppercase text-slate-500">Active Clients</div>
            <div className="text-2xl font-black text-slate-900 mt-0.5">500+</div>
            <div className="text-[11px] text-slate-500">Partner Companies in MP</div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <div className="text-xs font-bold uppercase text-slate-500">Turnaround</div>
            <div className="text-2xl font-black text-slate-900 mt-0.5">48h</div>
            <div className="text-[11px] text-slate-500">Avg. First Shortlist Delivered</div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <div className="text-xs font-bold uppercase text-slate-500">Stability</div>
            <div className="text-2xl font-black text-slate-900 mt-0.5">98%</div>
            <div className="text-[11px] text-slate-500">Candidate Retention Rate</div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-emerald-200 bg-emerald-50/30 shadow-2xs">
            <div className="text-xs font-bold uppercase text-emerald-800">Risk-Free</div>
            <div className="text-2xl font-black text-emerald-900 mt-0.5">₹0 Fee</div>
            <div className="text-[11px] text-emerald-700">Zero Cost Until Candidate Joins</div>
          </div>
        </div>
      </div>

      {/* Priority Hiring Desk & Form Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Card */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                <FileCheck className="w-4 h-4" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                PRIORITY HIRING DESK
              </h2>
            </div>
            <p className="text-xs text-slate-500 mb-6">
              Fill in the job details below. Our industrial recruitment specialists will review and dispatch verified profiles within 24 hours.
            </p>

            {submittedInquiry ? (
              <div className="text-center py-8 space-y-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">
                  Hiring Requirement Logged!
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Thank you, <strong className="text-slate-900">{submittedInquiry.contactName}</strong> from{' '}
                  <strong className="text-slate-900">{submittedInquiry.companyName}</strong>. Our Senior Talent Recruiter has received your opening for{' '}
                  <span className="text-blue-700 font-bold">{submittedInquiry.roleNeeded}</span>.
                </p>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 max-w-sm mx-auto text-xs text-left space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Tracking Reference:</span>
                    <span className="font-mono font-bold text-slate-900">{submittedInquiry._id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Guaranteed Shortlist SLA:</span>
                    <span className="font-bold text-emerald-700">Under 48 Hours</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    variant="whatsapp"
                    size="md"
                    icon={<WhatsAppIcon className="w-4 h-4" />}
                    onClick={openCorporateWhatsApp}
                  >
                    Send Specs Instantly via WhatsApp
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Company / Business Name"
                    required
                    placeholder="e.g. Mahavir Trading Co."
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  />

                  <Select
                    label="Industry Sector"
                    required
                    value={formData.industrySector}
                    onChange={(e) => setFormData({ ...formData, industrySector: e.target.value })}
                    options={[
                      { label: 'FMCG & Retail Distribution', value: 'FMCG & Retail Distribution' },
                      { label: 'Accounts & GST Taxation', value: 'Accounts & GST Taxation' },
                      { label: 'BFSI & Banking', value: 'BFSI & Banking' },
                      { label: 'BPO & Customer Experience', value: 'BPO & Customer Experience' },
                      { label: 'Manufacturing & Industrial Plant', value: 'Manufacturing & Industrial Plant' },
                      { label: 'Logistics & Warehousing', value: 'Logistics & Warehousing' },
                      { label: 'IT & Digital Services', value: 'IT & Digital Services' },
                    ]}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Designation / Role Needed"
                    required
                    placeholder="e.g. Senior Tally Billing Executive"
                    value={formData.roleNeeded}
                    onChange={(e) => setFormData({ ...formData, roleNeeded: e.target.value })}
                  />

                  <Select
                    label="No. of Vacancies"
                    required
                    value={formData.vacancies}
                    onChange={(e) => setFormData({ ...formData, vacancies: e.target.value })}
                    options={[
                      { label: '1 - 2 Staff', value: '1 - 2 Staff' },
                      { label: '3 - 5 Staff', value: '3 - 5 Staff' },
                      { label: '6 - 10 Staff', value: '6 - 10 Staff' },
                      { label: '10+ Bulk Hiring', value: '10+ Bulk Hiring' },
                    ]}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Work Location in Gwalior / MP"
                    required
                    placeholder="e.g. Hazira / Char Shahar Ka Naka"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />

                  <Select
                    label="Monthly In-Hand Salary Range"
                    required
                    value={formData.salaryRange}
                    onChange={(e) => setFormData({ ...formData, salaryRange: e.target.value })}
                    options={[
                      { label: '₹12,000 - ₹15,000', value: '₹12,000 - ₹15,000' },
                      { label: '₹15,000 - ₹22,000', value: '₹15,000 - ₹22,000' },
                      { label: '₹22,000 - ₹35,000', value: '₹22,000 - ₹35,000' },
                      { label: '₹35,000+ (Executive)', value: '₹35,000+' },
                    ]}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select
                    label="Experience Level Required"
                    value={formData.experienceLevel}
                    onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                    options={[
                      { label: 'Freshers Welcome (0-1 yr)', value: 'Freshers Welcome (0-1 yr)' },
                      { label: '1 - 3 Years Experienced', value: '1 - 3 Years Experienced' },
                      { label: '3 - 5 Years Senior', value: '3 - 5 Years Senior' },
                    ]}
                  />

                  <Select
                    label="Gender Preference"
                    value={formData.genderPreference}
                    onChange={(e) => setFormData({ ...formData, genderPreference: e.target.value })}
                    options={[
                      { label: 'No Preference', value: 'No Preference' },
                      { label: 'Female Only', value: 'Female Only' },
                      { label: 'Male Only', value: 'Male Only' },
                    ]}
                  />
                </div>

                <Textarea
                  label="Key Skills & Job Description Notes"
                  rows={2}
                  placeholder="e.g. Need candidate proficient in Tally ERP9 / Prime, GST billing, Excel VLOOKUP, client communication. Working hours 10:30 AM - 7:30 PM."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />

                <div className="pt-2 border-t border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-3">
                    Hiring Point of Contact
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Input
                      label="Your Name"
                      required
                      placeholder="e.g. Rajesh Agrawal"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    />
                    <Input
                      label="WhatsApp No."
                      required
                      placeholder="e.g. 9826011223"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    />
                    <Input
                      label="Official Email (Optional)"
                      placeholder="contact@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isLoading}
                  icon={<Send className="w-4 h-4" />}
                  className="w-full bg-[#00236f] hover:bg-[#1e3a8a] text-sm font-bold py-3 mt-4 rounded-xl"
                >
                  Submit Job Requirement - Get Profiles in 24 Hrs
                </Button>
                <p className="text-[11px] text-center text-slate-400 mt-2">
                  🔒 100% Confidential. Zero spam. We never share your contact details with non-relevant third parties.
                </p>
              </form>
            )}
          </div>

          {/* Right Why Employers Trust BPS & Hotlines */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-700" />
                Why Central MP Employers Trust BPS
              </h3>

              <div className="space-y-3.5 text-xs text-slate-600">
                <div>
                  <h4 className="font-bold text-slate-900 mb-0.5">Pre-Screened &amp; Skill Tested</h4>
                  <p>
                    We independently verify practical ability in MS Excel, Tally ERP/Prime, billing,
                    typing speed, and communication before sending candidates for interview.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 mb-0.5">Speed &amp; Walk-In Coordination</h4>
                  <p>
                    Candidates arrive at your office strictly on schedule. We handle directions,
                    interview briefing, and attendance follow-ups directly.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 mb-0.5">Dedicated Account Recruiter</h4>
                  <p>
                    A single point of contact who understands your exact business operations, avoiding
                    endless back-and-forth communication.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 mb-0.5">30-Day Free Replacement</h4>
                  <p>
                    If an onboarded candidate discontinues or doesn&apos;t meet performance benchmarks
                    within 30 days, we provide a priority replacement at zero additional charges.
                  </p>
                </div>
              </div>
            </div>

            {/* Hotline card */}
            <div className="p-6 bg-slate-900 text-white rounded-3xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase text-amber-400">
                  Employer Urgent Hotline
                </span>
                <span className="text-[11px] text-slate-400">Mon-Sat: 10AM - 7:30PM</span>
              </div>
              <h4 className="font-bold text-sm text-white">Need Staff Joining By Tomorrow?</h4>
              <p className="text-xs text-slate-300">
                Speak directly with our senior talent acquisition team in Hazira, Gwalior for immediate walk-in batches.
              </p>
              <div className="space-y-1.5 pt-2 text-xs">
                <div className="font-mono text-sm font-bold text-white">
                  Director Desk: +91 9131008934
                </div>
                <div className="font-mono text-sm font-bold text-amber-300">
                  Operations Desk: +91 9009822116
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deep Regional Talent Pool Matrix */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
            <Users className="w-3.5 h-3.5" />
            <span>Deep Regional Talent Pool</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Specialized Roles We Staff Every Week
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Our active database comprises over 10,000 job seekers in Gwalior, Malanpur, Bhind, Morena, and surrounding central MP districts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <TalentPoolRow
            category="FMCG & Retail Distribution"
            countAvailable="3,200+"
            turnaroundTime="24 - 36 Hours"
            description="Reliable manpower tailored for distribution depots, retail outlets, marts, and FMCG wholesale networks."
            subRoles={['Retail Store Managers', 'Billing Counter Clerks', 'Cashiers & PoS Staff', 'Distribution Supervisors']}
            icon={<Briefcase className="w-5 h-5" />}
          />

          <TalentPoolRow
            category="Accounts & GST Taxation"
            countAvailable="1,850+"
            turnaroundTime="24 - 48 Hours"
            description="Certified finance personnel capable of handling everyday ledgers, Tally Prime entries, GST filing, and invoice reconciliation."
            subRoles={['Tally Prime Specialists', 'GST Invoicing Executives', 'Junior Accountants', 'Audit Assistants']}
            icon={<Calculator className="w-5 h-5" />}
          />

          <TalentPoolRow
            category="Back Office & Computer Operators"
            countAvailable="2,900+"
            turnaroundTime="12 - 24 Hours"
            description="Fast, accurate computer operators with solid knowledge of Excel formulas, CRM software, Hindi/English typing, and phone etiquette."
            subRoles={['Advanced Excel Operators', 'Hindi/English Typists', 'Telecallers & CRM Admins', 'Receptionists']}
            icon={<Laptop className="w-5 h-5" />}
          />

          <TalentPoolRow
            category="Sales & Business Development"
            countAvailable="2,400+"
            turnaroundTime="24 - 48 Hours"
            description="Target-driven sales professionals with bike, driving license, and localized geography familiarity across Chambal & Gwalior region."
            subRoles={['B2B Field Sales Officers', 'FMCG Route Order Bookers', 'Channel Sales Leads', 'Counter Sales Promoters']}
            icon={<TrendingUp className="w-5 h-5" />}
          />

          <TalentPoolRow
            category="Logistics & Warehouse Ops"
            countAvailable="1,600+"
            turnaroundTime="36 - 48 Hours"
            description="Hands-on operational supervisors, dispatch clerks, and inventory controllers for industrial Malanpur, Rairu, and Banmore plants."
            subRoles={['Warehouse Supervisors', 'Dispatch & Gate Pass Clerks', 'Inventory Auditors', 'Packaging Supervisors']}
            icon={<Truck className="w-5 h-5" />}
          />

          <TalentPoolRow
            category="Industrial & Technical Support"
            countAvailable="1,400+"
            turnaroundTime="48 Hours"
            description="ITI technicians, maintenance staff, quality line checkers, and facility coordinators for manufacturing units."
            subRoles={['ITI Electricians & Fitters', 'Production Line Foremen', 'QC Inspectors', 'Safety Officers']}
            icon={<Wrench className="w-5 h-5" />}
          />
        </div>
      </div>

      {/* 4-Step Frictionless Recruitment Workflow */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block mb-1">
            Frictionless Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Our 4-Step Recruitment Workflow
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Designed to take the headache out of local recruitment so you can focus on running your business.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs relative">
            <span className="text-3xl font-black text-blue-100 block mb-2 font-mono">01</span>
            <h4 className="font-bold text-base text-slate-900 mb-2">Share Job Specs</h4>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Post your requirements via our portal or message us directly on WhatsApp in under 2 minutes. We establish exact salary bands and skill checklists.
            </p>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
              Speed: Under 10 Mins
            </span>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs relative">
            <span className="text-3xl font-black text-blue-100 block mb-2 font-mono">02</span>
            <h4 className="font-bold text-base text-slate-900 mb-2">Resume Filtering &amp; Screening</h4>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Our talent specialists tap into 10,000+ localized CVs, verifying identity, past employment history, notice periods, and commute feasibility.
            </p>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
              Speed: 24 - 48 Hours
            </span>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs relative">
            <span className="text-3xl font-black text-blue-100 block mb-2 font-mono">03</span>
            <h4 className="font-bold text-base text-slate-900 mb-2">Walk-In &amp; Video Interviews</h4>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              We schedule filtered candidates for interviews directly at your office or via video call. We confirm attendance and brief them in advance.
            </p>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              Coordinated by BPS
            </span>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs relative">
            <span className="text-3xl font-black text-blue-100 block mb-2 font-mono">04</span>
            <h4 className="font-bold text-base text-slate-900 mb-2">Joining &amp; Free Guarantee</h4>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Candidate reports to duty. We oversee onboarding formalities and offer an iron-clad 30-day replacement policy for ultimate peace of mind.
            </p>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              Success &amp; Growth
            </span>
          </div>
        </div>
      </div>

      {/* Verified Employer Feedback Testimonials */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block mb-1">
            Verified Employer Feedback
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Trusted By Regional Business Leaders
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real reviews from business owners, CFOs, and plant heads across Gwalior and Madhya Pradesh.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TestimonialCard
            quote="We needed 3 billing operators with high speed in Tally Prime during festive peak season. Balaji Placement Service arranged 5 candidates next day at Char Shahar Ka Naka. 2 were selected immediately. Saved us weeks!"
            author="Rajesh Agrawal"
            role="Owner"
            company="Agrawal FMCG & Wholesale Dist."
            location="Gwalior, MP"
            avatarInitials="RA"
          />

          <TestimonialCard
            quote="Unlike other consultancy portals where half the candidates don't show up, Balaji conducts pre-interviews. Candidates arrive on time with verified address proofs and genuine willingness to work."
            author="Vikas Sharma"
            role="Managing Partner"
            company="Gwalior Retail Marts"
            location="Lashkar & Hazira"
            avatarInitials="VS"
          />

          <TestimonialCard
            quote="Finding punctual warehouse supervisors for our depot in Malanpur was difficult due to shift timings. Balaji Placement found us 2 experienced supervisors residing in nearby Morar with their own transport. Fantastic service."
            author="S. K. Jain"
            role="Depot Head"
            company="National Logistics Hub"
            location="Malanpur Industrial Area"
            avatarInitials="SK"
          />
        </div>
      </div>
    </div>
  );
};

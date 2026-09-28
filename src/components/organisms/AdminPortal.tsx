'use client';
import React, { useState, useEffect } from 'react';
import {
  Database,
  Users,
  Briefcase,
  Building,
  CheckCircle2,
  Clock,
  Search,
  Plus,
  RefreshCw,
  Lock,
  Phone,
  ShieldCheck,
  Send,
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { Select } from '../atoms/Select';
import { WhatsAppIcon } from '../atoms/WhatsAppIcon';

export const AdminPortal: React.FC = () => {
  const {
    candidates,
    candidatesLoading,
    fetchCandidates,
    employers,
    employersLoading,
    fetchEmployers,
    updateCandidateStatus,
    addNewJob,
    user,
    isAuthenticated,
    openAuthModal,
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<'candidates' | 'employers' | 'add_job'>('candidates');
  const [candidateFilter, setCandidateFilter] = useState('all');
  const [candidateSearch, setCandidateSearch] = useState('');
  const [dbStatus, setDbStatus] = useState<any>(null);

  // New Job Form State
  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    companySector: 'FMCG & Consumer Goods',
    category: 'Accounts & Finance',
    location: 'Hazira / Char Shahar Ka Naka, Gwalior',
    genderPreference: 'Female Only',
    salary: '₹15,000/- Per Month',
    timing: '10:30 AM to 7:30 PM',
    experienceRequired: '0-2 Years',
    isUrgent: true,
    isFeatured: true,
    vacancies: 2,
    description: '',
    skillsString: 'MS Excel, Billing & Data Entry, Basic Computer Knowledge, Accounting',
  });

  useEffect(() => {
    fetchCandidates();
    fetchEmployers();
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => setDbStatus(data.database))
      .catch(() => {});
  }, [fetchCandidates, fetchEmployers]);

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    const skills = newJob.skillsString.split(',').map((s) => s.trim()).filter(Boolean);
    const success = await addNewJob({
      ...newJob,
      requiredSkills: skills,
    });
    if (success) {
      setActiveTab('candidates');
    }
  };

  const filteredCandidates = candidates.filter((c) => {
    const matchesFilter = candidateFilter === 'all' || c.status === candidateFilter;
    const matchesSearch =
      candidateSearch === '' ||
      c.fullName.toLowerCase().includes(candidateSearch.toLowerCase()) ||
      c.phone.includes(candidateSearch) ||
      c.position.toLowerCase().includes(candidateSearch.toLowerCase()) ||
      c.location.toLowerCase().includes(candidateSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Header & DB Status */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-white rounded-3xl border border-slate-200 shadow-xs mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-900 flex items-center justify-center font-bold">
                <Database className="w-4 h-4" />
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Recruiter &amp; Staffing Management Desk
              </h1>
            </div>
            <p className="text-xs text-slate-500">
              Live MongoDB database administration for candidate resumes and employer requirements.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {dbStatus && (
              <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="font-bold text-emerald-900">
                  DB: {dbStatus.mode === 'mongodb_daemon' ? 'MongoDB Daemon' : 'Local Document DB'}
                </span>
                <span className="text-slate-400">({dbStatus.dbName})</span>
              </div>
            )}

            {!isAuthenticated ? (
              <Button
                variant="primary"
                size="sm"
                icon={<Lock className="w-3.5 h-3.5" />}
                onClick={() => openAuthModal('login')}
                className="text-xs font-bold"
              >
                Sign In as Admin
              </Button>
            ) : (
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-xl text-xs font-bold text-blue-900">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Logged in: {user?.name} ({user?.role})</span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab('candidates')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'candidates'
                ? 'bg-[#00236f] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Candidate Applications ({candidates.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('employers')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'employers'
                ? 'bg-[#00236f] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>Employer Inquiries ({employers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('add_job')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'add_job'
                ? 'bg-[#00236f] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Post New Vacancy</span>
          </button>

          <button
            onClick={() => {
              fetchCandidates();
              fetchEmployers();
            }}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 ml-auto cursor-pointer"
            title="Refresh database records"
          >
            <RefreshCw className={`w-4 h-4 ${candidatesLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Tab 1: Candidates Table */}
        {activeTab === 'candidates' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-4">
            {/* Filter toolbar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                {['all', 'New', 'Screened', 'Interview Scheduled', 'Placed'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setCandidateFilter(st)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer whitespace-nowrap ${
                      candidateFilter === st
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {st === 'all' ? 'All Candidates' : st}
                  </button>
                ))}
              </div>

              <div className="relative sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search name, phone, role, skills..."
                  value={candidateSearch}
                  onChange={(e) => setCandidateSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Candidates Table */}
            {filteredCandidates.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs">
                No candidate submissions found matching your filters.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs divide-y divide-slate-200">
                  <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-3">Candidate</th>
                      <th className="p-3">Position</th>
                      <th className="p-3">Contact</th>
                      <th className="p-3">Location &amp; Skills</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {filteredCandidates.map((cand) => (
                      <tr key={cand._id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3 font-bold text-slate-900">
                          <div>{cand.fullName}</div>
                          <span className="text-[10px] text-slate-400 font-normal">
                            {cand.gender}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className="font-semibold text-blue-900 block">{cand.position}</span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {cand.createdAt ? new Date(cand.createdAt).toLocaleDateString() : 'Recent'}
                          </span>
                        </td>
                        <td className="p-3">
                          <a
                            href={`tel:+91${cand.phone}`}
                            className="font-bold text-slate-900 hover:text-blue-700 flex items-center gap-1"
                          >
                            <Phone className="w-3 h-3 text-slate-400" />
                            {cand.phone}
                          </a>
                        </td>
                        <td className="p-3 max-w-xs">
                          <div className="font-medium text-slate-800">{cand.location}</div>
                          <div className="text-[11px] text-slate-500 truncate" title={cand.skills}>
                            {cand.skills}
                          </div>
                        </td>
                        <td className="p-3">
                          <select
                            value={cand.status || 'New'}
                            onChange={(e) => updateCandidateStatus(cand._id!, e.target.value)}
                            className="text-[11px] font-bold py-1 px-2 rounded-lg border border-slate-200 bg-white cursor-pointer"
                          >
                            <option value="New">New</option>
                            <option value="Screened">Screened</option>
                            <option value="Interview Scheduled">Interview Scheduled</option>
                            <option value="Placed">Placed</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => {
                              const text = `Hello ${cand.fullName}, this is Balaji Placement Service regarding your application for ${cand.position}. We would like to schedule your interview round in Gwalior.`;
                              window.open(`https://wa.me/91${cand.phone}?text=${encodeURIComponent(text)}`, '_blank');
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] cursor-pointer"
                          >
                            <WhatsAppIcon className="w-3 h-3" />
                            <span>WhatsApp</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Employers Table */}
        {activeTab === 'employers' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Employer Priority Desk Requisitions
            </h3>

            {employers.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs">
                No employer requirements submitted yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs divide-y divide-slate-200">
                  <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-3">Company</th>
                      <th className="p-3">Role &amp; Vacancies</th>
                      <th className="p-3">Salary &amp; Loc</th>
                      <th className="p-3">Contact</th>
                      <th className="p-3">Notes</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {employers.map((emp) => (
                      <tr key={emp._id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3">
                          <div className="font-bold text-slate-900">{emp.companyName}</div>
                          <span className="text-[10px] text-slate-500">{emp.industrySector}</span>
                        </td>
                        <td className="p-3">
                          <span className="font-bold text-blue-900 block">{emp.roleNeeded}</span>
                          <span className="text-[10px] text-slate-500">{emp.vacancies}</span>
                        </td>
                        <td className="p-3">
                          <div className="font-semibold text-emerald-800">{emp.salaryRange}</div>
                          <div className="text-[10px] text-slate-500">{emp.location}</div>
                        </td>
                        <td className="p-3">
                          <div className="font-bold text-slate-900">{emp.contactName}</div>
                          <a href={`tel:+91${emp.whatsapp}`} className="text-blue-700 font-semibold">
                            {emp.whatsapp}
                          </a>
                        </td>
                        <td className="p-3 max-w-xs text-[11px] text-slate-600 truncate" title={emp.notes}>
                          {emp.notes || 'No notes specified.'}
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => {
                              const text = `Hello ${emp.contactName} (${emp.companyName}), Balaji Placement Service has reviewed your requirement for ${emp.roleNeeded}. We have ready shortlisted profiles to share with you.`;
                              window.open(`https://wa.me/91${emp.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-blue-700 hover:bg-blue-800 text-white font-bold text-[11px] cursor-pointer"
                          >
                            <span>Dispatch Profiles</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Post New Vacancy Form */}
        {activeTab === 'add_job' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 max-w-3xl mx-auto">
            <h3 className="text-xl font-black text-slate-900 mb-2">
              Post a New Vacancy to Database
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Create a real job opening directly stored in the MongoDB collection.
            </p>

            <form onSubmit={handleCreateJob} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Job Title / Designation"
                  required
                  placeholder="e.g. Account Executive"
                  value={newJob.title}
                  onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                />
                <Input
                  label="Hiring Company Name"
                  required
                  placeholder="e.g. FMCG Distribution Co."
                  value={newJob.company}
                  onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Category"
                  value={newJob.category}
                  onChange={(e) => setNewJob({ ...newJob, category: e.target.value })}
                  options={[
                    { label: 'Accounts & Finance', value: 'Accounts & Finance' },
                    { label: 'Back Office & Computer', value: 'Back Office & Computer' },
                    { label: 'Sales & Marketing', value: 'Sales & Marketing' },
                    { label: 'HR & Administration', value: 'HR & Administration' },
                    { label: 'Logistics & Warehouse', value: 'Logistics & Warehouse' },
                  ]}
                />
                <Input
                  label="Work Location"
                  required
                  placeholder="e.g. Hazira / Char Shahar Ka Naka, Gwalior"
                  value={newJob.location}
                  onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="Monthly Salary Package"
                  placeholder="e.g. ₹15,000/- Per Month"
                  value={newJob.salary}
                  onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                />
                <Input
                  label="Shift Timing"
                  placeholder="e.g. 10:30 AM to 7:30 PM"
                  value={newJob.timing}
                  onChange={(e) => setNewJob({ ...newJob, timing: e.target.value })}
                />
                <Select
                  label="Gender Preference"
                  value={newJob.genderPreference}
                  onChange={(e) => setNewJob({ ...newJob, genderPreference: e.target.value })}
                  options={[
                    { label: 'Female Only', value: 'Female Only' },
                    { label: 'Male Only', value: 'Male Only' },
                    { label: 'Any', value: 'Any' },
                  ]}
                />
              </div>

              <Input
                label="Required Skills (Comma-separated)"
                placeholder="e.g. MS Excel, Tally Prime, Billing, Invoicing"
                value={newJob.skillsString}
                onChange={(e) => setNewJob({ ...newJob, skillsString: e.target.value })}
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                icon={<Send className="w-4 h-4" />}
                className="w-full bg-[#00236f] hover:bg-[#1e3a8a] text-xs font-bold py-3 mt-4"
              >
                Publish Job to Portal &amp; Database
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

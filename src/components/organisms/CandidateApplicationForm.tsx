'use client';
import React, { useState } from 'react';
import {
  Send,
  CheckCircle,
  Phone,
  MapPin,
  Sparkles,
  AlertCircle,
  FileText,
  UserCheck,
} from 'lucide-react';
import { Input } from '../atoms/Input';
import { Select } from '../atoms/Select';
import { Textarea } from '../atoms/Textarea';
import { Button } from '../atoms/Button';
import { WhatsAppIcon } from '../atoms/WhatsAppIcon';

interface CandidateApplicationFormProps {
  defaultPosition?: string;
  onSuccess?: () => void;
}

export const CandidateApplicationForm: React.FC<CandidateApplicationFormProps> = ({
  defaultPosition = 'Account Executive (FMCG Urgent)',
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    gender: 'Female (Preferred for FMCG Account Exec)',
    position: defaultPosition,
    location: '',
    skills: '',
    experience: 'Fresher (0-1 yr)',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedCandidate, setSubmittedCandidate] = useState<any | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setErrorMsg('Please enter your full name and 10-digit WhatsApp number.');
      return;
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/candidates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          phone: cleanPhone,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to submit application');
      }

      setSubmittedCandidate(data.data);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setErrorMsg(err.message || 'Network error submitting application. Please try again or WhatsApp us.');
    } finally {
      setIsLoading(false);
    }
  };

  const openWhatsAppConfirmation = () => {
    if (!submittedCandidate) return;
    const text = `Hello Balaji Placement Service, I just submitted my resume on your website for *${submittedCandidate.position}*.\nName: ${submittedCandidate.fullName}\nPhone: ${submittedCandidate.phone}\nLocation: ${submittedCandidate.location}\nSkills: ${submittedCandidate.skills}\nPlease verify my candidate profile.`;
    window.open(
      `https://wa.me/919131008934?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <section id="apply-section" className="py-14 bg-[#0a142f] text-white relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Guidance & Hotlines */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interested Candidates Can Contact Us!</span>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Work with the Right Support. <br />
                <span className="text-amber-400">Build Your Career with Us.</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-lg">
                Whether you are applying for the urgent FMCG Account Executive position or seeking
                new job openings in Gwalior, drop your details below or call our recruiters right
                away.
              </p>
            </div>

            {/* Official Hotlines Box */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-3.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                BALAJI PLACEMENT SERVICE OFFICIAL HOTLINES
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="tel:+919131008934"
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/90 border border-slate-700 hover:border-blue-400 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">
                      Primary Helpline
                    </div>
                    <div className="text-sm font-black text-white">9131008934</div>
                  </div>
                </a>

                <a
                  href="tel:+919009822116"
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/90 border border-slate-700 hover:border-amber-400 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-amber-600 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">
                      Secondary Helpline
                    </div>
                    <div className="text-sm font-black text-white">9009822116</div>
                  </div>
                </a>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span>Hazira / Char Shahar Ka Naka &amp; City-wide, Gwalior (M.P.)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Fast Resume Submission Card */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 text-slate-900 shadow-2xl border border-slate-200">
              {submittedCandidate ? (
                <div className="text-center py-6 space-y-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle className="w-8 h-8" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-slate-900">
                      Application Submitted!
                    </h3>
                    <p className="text-xs text-slate-600 max-w-md mx-auto mt-1">
                      Thank you, <strong className="text-slate-900">{submittedCandidate.fullName}</strong>.
                      Your details have been logged into our verified candidate database.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1.5 max-w-sm mx-auto">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Candidate Ref ID:</span>
                      <span className="font-mono font-bold text-slate-900">{submittedCandidate._id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Position Applied:</span>
                      <span className="font-bold text-slate-900">{submittedCandidate.position}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">WhatsApp Mobile:</span>
                      <span className="font-bold text-slate-900">{submittedCandidate.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Screening Status:</span>
                      <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                        Queued for Recruiter Review
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <Button
                      variant="whatsapp"
                      size="lg"
                      icon={<WhatsAppIcon className="w-5 h-5" />}
                      onClick={openWhatsAppConfirmation}
                      className="w-full text-xs sm:text-sm font-bold"
                    >
                      Send Direct Confirmation on WhatsApp
                    </Button>

                    <button
                      onClick={() => setSubmittedCandidate(null)}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                    >
                      Submit Another Candidate Application
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      Fast Resume Submission
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Fill out the quick form to receive callbacks for verified job interviews.
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <Input
                    label="Full Name"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Enter candidate full name"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <Input
                      label="Phone Number (WhatsApp)"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 9131008934"
                    />

                    <Select
                      label="Gender"
                      required
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      options={[
                        {
                          label: 'Female (Preferred for FMCG Account Exec)',
                          value: 'Female (Preferred for FMCG Account Exec)',
                        },
                        { label: 'Male Candidate', value: 'Male Candidate' },
                        { label: 'Any / Other', value: 'Any / Other' },
                      ]}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <Select
                      label="Applying for Position"
                      required
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      options={[
                        {
                          label: 'Account Executive (FMCG Urgent)',
                          value: 'Account Executive (FMCG Urgent)',
                        },
                        {
                          label: 'Back Office & Data Entry',
                          value: 'Back Office & Data Entry',
                        },
                        {
                          label: 'Sales & Marketing Exec',
                          value: 'Sales & Marketing Exec',
                        },
                        {
                          label: 'HR Recruiter / Coordinator',
                          value: 'HR Recruiter / Coordinator',
                        },
                        {
                          label: 'Warehouse Supervisor',
                          value: 'Warehouse Supervisor',
                        },
                        {
                          label: 'Senior Tally & GST Accountant',
                          value: 'Senior Tally & GST Accountant',
                        },
                        {
                          label: 'General Application (Any Suitable Opening)',
                          value: 'General Application',
                        },
                      ]}
                    />

                    <Input
                      label="Current Location in Gwalior"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Hazira, Morar, Lashkar"
                    />
                  </div>

                  <Textarea
                    label="Key Skills & Experience"
                    rows={3}
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    placeholder="e.g. MS Excel, Tally, Billing, 1 year experience in accounting..."
                    helperText="Instant WhatsApp support active after submission."
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isLoading}
                    icon={<Send className="w-4 h-4" />}
                    className="w-full bg-[#00236f] hover:bg-[#1e3a8a] text-sm font-bold py-3 mt-2 rounded-xl"
                  >
                    Submit Details for Instant Screening
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

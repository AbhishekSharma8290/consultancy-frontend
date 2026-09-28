'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, Mail, User, Phone, Briefcase, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, authModalMode, closeAuthModal, openAuthModal, login, register, authLoading, authError } = useAppStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<'candidate' | 'employer'>('candidate');

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (authModalMode === 'login') {
      await login(email, password);
    } else {
      await register(name, email, password, role, phone);
    }
  };

  const handleFillDemoAdmin = () => {
    setEmail('admin@balajiplacement.com');
    setPassword('adminpassword123');
    openAuthModal('login');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#00174b] to-[#00236f] text-white p-6 relative">
            <button
              onClick={closeAuthModal}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block mb-1">
              Balaji Placement Service
            </span>
            <h3 className="text-2xl font-black tracking-tight">
              {authModalMode === 'login' ? 'Welcome Back' : 'Create an Account'}
            </h3>
            <p className="text-xs text-blue-100 mt-1">
              {authModalMode === 'login'
                ? 'Sign in to access verified job tracks, recruiter tools, and status updates.'
                : 'Join Gwalior & MP’s leading recruitment and placement platform.'}
            </p>

            {/* Mode switch tabs */}
            <div className="grid grid-cols-2 gap-1 p-1 bg-white/10 rounded-xl mt-4">
              <button
                type="button"
                onClick={() => openAuthModal('login')}
                className={`py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  authModalMode === 'login'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => openAuthModal('register')}
                className={`py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  authModalMode === 'register'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Register
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {authError && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            {authModalMode === 'register' && (
              <>
                {/* Role Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    I am registering as:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRole('candidate')}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        role === 'candidate'
                          ? 'border-blue-600 bg-blue-50 text-blue-800'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <User className="w-4 h-4" />
                      <span>Job Seeker</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('employer')}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        role === 'employer'
                          ? 'border-blue-600 bg-blue-50 text-blue-800'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <Briefcase className="w-4 h-4" />
                      <span>Employer</span>
                    </button>
                  </div>
                </div>

                <Input
                  label="Full Name"
                  required
                  leftIcon={<User className="w-4 h-4" />}
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <Input
                  label="Phone Number (WhatsApp)"
                  leftIcon={<Phone className="w-4 h-4" />}
                  placeholder="e.g. 9131008934"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </>
            )}

            <Input
              label="Email Address"
              type="email"
              required
              leftIcon={<Mail className="w-4 h-4" />}
              placeholder="you@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Password"
              type="password"
              required
              leftIcon={<Lock className="w-4 h-4" />}
              placeholder="Enter at least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={authLoading}
              className="w-full bg-[#00236f] hover:bg-[#1e3a8a] text-sm font-bold py-3 rounded-xl mt-2"
            >
              {authModalMode === 'login' ? 'Sign In to Portal' : 'Create Free Account'}
            </Button>

            {/* Quick Demo Recruiter Fill */}
            {authModalMode === 'login' && (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-[11px] text-slate-500 block mb-1">
                  Testing Staff / Recruiter Access?
                </span>
                <button
                  type="button"
                  onClick={handleFillDemoAdmin}
                  className="text-xs font-bold text-blue-700 hover:text-blue-900 underline cursor-pointer"
                >
                  Use Pre-seeded Admin (admin@balajiplacement.com)
                </button>
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

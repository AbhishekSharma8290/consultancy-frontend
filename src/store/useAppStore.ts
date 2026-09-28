'use client';

import { create } from 'zustand';
import { Job, Partner, CandidateSubmission, EmployerInquiry, PlatformStats, AuthUser } from '../types';
import { api, getAuthToken, setAuthToken } from '../lib/api';

interface ToastInfo {
  type: 'success' | 'error' | 'info';
  text: string;
}

interface AppState {
  // Auth state
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  authLoading: boolean;
  authError: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role?: string, phone?: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<void>;

  // Data state
  jobs: Job[];
  jobsLoading: boolean;
  partners: Partner[];
  partnersLoading: boolean;
  candidates: CandidateSubmission[];
  candidatesLoading: boolean;
  employers: EmployerInquiry[];
  employersLoading: boolean;
  stats: PlatformStats | null;

  // UI & Navigation
  activeTab: string;
  searchQuery: string;
  selectedSector: string;
  selectedJob: Job | null;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register';
  isApplyModalOpen: boolean;
  applyTargetPosition: string;
  toast: ToastInfo | null;

  // Actions
  fetchJobs: (urgentOnly?: boolean) => Promise<void>;
  fetchPartners: (category?: string) => Promise<void>;
  fetchCandidates: () => Promise<void>;
  fetchEmployers: () => Promise<void>;
  fetchStats: () => Promise<void>;
  fetchAllData: () => Promise<void>;
  setActiveTab: (tab: string) => void;
  setSearch: (query: string, sector: string) => void;
  setSelectedJob: (job: Job | null) => void;
  openAuthModal: (mode?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  openApplyModal: (position?: string) => void;
  closeApplyModal: () => void;
  showToast: (text: string, type?: 'success' | 'error' | 'info') => void;
  clearToast: () => void;
  updateCandidateStatus: (id: string, status: string) => Promise<boolean>;
  addNewJob: (jobData: Partial<Job>) => Promise<boolean>;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Auth Initial State
  user: null,
  token: getAuthToken(),
  isAuthenticated: false,
  authLoading: false,
  authError: null,

  login: async (email, password) => {
    set({ authLoading: true, authError: null });
    try {
      const data = await api.login({ email, password });
      setAuthToken(data.token);

      set({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
        authLoading: false,
        authError: null,
        isAuthModalOpen: false,
      });

      get().showToast(`Welcome back, ${data.user.name}!`, 'success');
      return true;
    } catch (err: any) {
      set({ authLoading: false, authError: err.message });
      get().showToast(err.message, 'error');
      return false;
    }
  },

  register: async (name, email, password, role = 'candidate', phone = '') => {
    set({ authLoading: true, authError: null });
    try {
      const data = await api.register({ name, email, password, role, phone });
      setAuthToken(data.token);

      set({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
        authLoading: false,
        authError: null,
        isAuthModalOpen: false,
      });

      get().showToast('Registration successful! Welcome to Balaji Placement Service.', 'success');
      return true;
    } catch (err: any) {
      set({ authLoading: false, authError: err.message });
      get().showToast(err.message, 'error');
      return false;
    }
  },

  logout: () => {
    setAuthToken(null);
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      authError: null,
    });
    get().showToast('Logged out successfully.', 'info');
  },

  checkAuth: async () => {
    const token = getAuthToken();
    if (!token) return;

    try {
      const data = await api.getMe();
      if (data?.user) {
        set({
          user: data.user,
          isAuthenticated: true,
        });
      }
    } catch {
      setAuthToken(null);
      set({ user: null, token: null, isAuthenticated: false });
    }
  },

  // Data Initial State
  jobs: [],
  jobsLoading: false,
  partners: [],
  partnersLoading: false,
  candidates: [],
  candidatesLoading: false,
  employers: [],
  employersLoading: false,
  stats: null,

  // UI Initial State
  activeTab: 'home',
  searchQuery: '',
  selectedSector: 'all',
  selectedJob: null,
  isAuthModalOpen: false,
  authModalMode: 'login',
  isApplyModalOpen: false,
  applyTargetPosition: 'General Candidate',
  toast: null,

  // UI Actions
  setActiveTab: (tab: string) => set({ activeTab: tab }),
  setSearch: (query: string, sector: string) => set({ searchQuery: query, selectedSector: sector }),
  setSelectedJob: (job: Job | null) => set({ selectedJob: job }),
  openAuthModal: (mode = 'login') => set({ isAuthModalOpen: true, authModalMode: mode }),
  closeAuthModal: () => set({ isAuthModalOpen: false, authError: null }),
  openApplyModal: (position = 'General Candidate') =>
    set({ isApplyModalOpen: true, applyTargetPosition: position }),
  closeApplyModal: () => set({ isApplyModalOpen: false }),

  showToast: (text: string, type: 'success' | 'error' | 'info' = 'info') => {
    set({ toast: { text, type } });
    setTimeout(() => {
      if (get().toast?.text === text) {
        set({ toast: null });
      }
    }, 4500);
  },

  clearToast: () => set({ toast: null }),

  // Data Fetching Actions
  fetchJobs: async (urgentOnly = false) => {
    set({ jobsLoading: true });
    try {
      const res = await api.getJobs({ urgent: urgentOnly });
      set({ jobs: res.data || [], jobsLoading: false });
    } catch (err: any) {
      console.error('Failed to fetch jobs:', err);
      set({ jobsLoading: false });
    }
  },

  fetchPartners: async (category = 'all') => {
    set({ partnersLoading: true });
    try {
      const res = await api.getPartners({ category });
      set({ partners: res.data || [], partnersLoading: false });
    } catch (err: any) {
      console.error('Failed to fetch partners:', err);
      set({ partnersLoading: false });
    }
  },

  fetchCandidates: async () => {
    set({ candidatesLoading: true });
    try {
      const res = await api.getCandidates();
      set({ candidates: res.data || [], candidatesLoading: false });
    } catch (err: any) {
      console.error('Failed to fetch candidates:', err);
      set({ candidatesLoading: false });
    }
  },

  fetchEmployers: async () => {
    set({ employersLoading: true });
    try {
      const res = await api.getEmployers();
      set({ employers: res.data || [], employersLoading: false });
    } catch (err: any) {
      console.error('Failed to fetch employer inquiries:', err);
      set({ employersLoading: false });
    }
  },

  fetchStats: async () => {
    try {
      const res = await api.getStats();
      set({ stats: res.data || null });
    } catch (err: any) {
      console.error('Failed to fetch platform stats:', err);
    }
  },

  fetchAllData: async () => {
    await Promise.allSettled([
      get().fetchJobs(),
      get().fetchPartners(),
      get().fetchStats(),
      get().checkAuth(),
    ]);
  },

  updateCandidateStatus: async (id: string, status: string) => {
    try {
      const res = await api.updateCandidateStatus(id, status);
      if (res.success) {
        set((state) => ({
          candidates: state.candidates.map((c) =>
            (c._id === id ? { ...c, status } : c)
          ),
        }));
        get().showToast(`Candidate status updated to "${status}"`, 'success');
        return true;
      }
      return false;
    } catch (err: any) {
      get().showToast(err.message || 'Failed to update candidate status', 'error');
      return false;
    }
  },

  addNewJob: async (jobData: Partial<Job>) => {
    try {
      const res = await api.createJob(jobData);
      if (res.success) {
        set((state) => ({
          jobs: [res.data, ...state.jobs],
        }));
        get().showToast('New job posted successfully!', 'success');
        return true;
      }
      return false;
    } catch (err: any) {
      get().showToast(err.message || 'Failed to create job', 'error');
      return false;
    }
  },
}));

import { Job, Partner, CandidateSubmission, EmployerInquiry, PlatformStats, AuthUser } from '../types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

export function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('bps_auth_token');
  }
  return null;
}

export function setAuthToken(token: string | null) {
  if (typeof window !== 'undefined') {
    if (token) {
      localStorage.setItem('bps_auth_token', token);
    } else {
      localStorage.removeItem('bps_auth_token');
    }
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  const headers = new Headers(options.headers || {});

  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const token = getAuthToken();
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg = data?.message || data?.error || `HTTP error ${response.status}`;
    throw new Error(errorMsg);
  }

  return data;
}

export const api = {
  // Auth
  register: (payload: { name: string; email: string; password: string; role?: string; phone?: string }) =>
    request<{ success: boolean; token: string; user: AuthUser; message: string }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  login: (payload: { email: string; password: string }) =>
    request<{ success: boolean; token: string; user: AuthUser; message: string }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  getMe: () => request<{ success: boolean; user: AuthUser }>('/api/auth/me'),

  // Jobs
  getJobs: (params?: { urgent?: boolean; category?: string; search?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.urgent) searchParams.append('urgent', 'true');
    if (params?.category && params.category !== 'all') searchParams.append('category', params.category);
    if (params?.search) searchParams.append('search', params.search);
    const queryString = searchParams.toString();
    return request<{ success: boolean; count: number; data: Job[] }>(
      `/api/jobs${queryString ? `?${queryString}` : ''}`
    );
  },

  getJobById: (id: string) => request<{ success: boolean; data: Job }>(`/api/jobs/${id}`),

  createJob: (jobData: Partial<Job>) =>
    request<{ success: boolean; data: Job; message: string }>('/api/jobs', {
      method: 'POST',
      body: JSON.stringify(jobData),
    }),

  // Candidates
  getCandidates: (params?: { status?: string; position?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.status && params.status !== 'all') searchParams.append('status', params.status);
    if (params?.position && params.position !== 'all') searchParams.append('position', params.position);
    const queryString = searchParams.toString();
    return request<{ success: boolean; count: number; data: CandidateSubmission[] }>(
      `/api/candidates${queryString ? `?${queryString}` : ''}`
    );
  },

  applyCandidate: (candidateData: Partial<CandidateSubmission>) =>
    request<{ success: boolean; message: string; data: CandidateSubmission }>('/api/candidates', {
      method: 'POST',
      body: JSON.stringify(candidateData),
    }),

  updateCandidateStatus: (id: string, status: string) =>
    request<{ success: boolean; modifiedCount: number }>(`/api/candidates/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),

  // Employers
  getEmployers: () =>
    request<{ success: boolean; count: number; data: EmployerInquiry[] }>('/api/employers'),

  submitEmployerInquiry: (inquiryData: Partial<EmployerInquiry>) =>
    request<{ success: boolean; message: string; data: EmployerInquiry }>('/api/employers', {
      method: 'POST',
      body: JSON.stringify(inquiryData),
    }),

  // Partners
  getPartners: (params?: { category?: string; search?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.category && params.category !== 'all') searchParams.append('category', params.category);
    if (params?.search) searchParams.append('search', params.search);
    const queryString = searchParams.toString();
    return request<{ success: boolean; count: number; data: Partner[] }>(
      `/api/partners${queryString ? `?${queryString}` : ''}`
    );
  },

  createPartner: (partnerData: Partial<Partner>) =>
    request<{ success: boolean; message: string; data: Partner }>('/api/partners', {
      method: 'POST',
      body: JSON.stringify(partnerData),
    }),

  // Stats & Health
  getStats: () => request<{ success: boolean; data: PlatformStats }>('/api/stats'),
  getHealth: () => request<{ status: string; database: any }>('/api/health'),
};

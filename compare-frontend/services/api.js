import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://compare-rvh9.onrender.com';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export const authService = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
    getCurrentUser: () => api.get('/auth/me'),
};

export const resumeService = {
    createBaseResume: (data) => {
        if (data instanceof FormData) {
          return api.post('/resume/base', data, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        } else {
          return api.post('/resume/base', data);
        }
      },
    getBaseResume: () => api.get('/resume/base'),
    compareResume: (data) => api.post('/resume/compare', data),
    getInputResumes: () => api.get('/resume/input'),
    getResumeHistory: () => api.get('/resume/history'),
    improveResume: (data) => api.post('/resume/improve', data),
};

export const jobService = {
    createJobPosting: (data) => api.post('/jobs', data),
    getAllJobPostings: () => api.get('/jobs'),
    getJobPostingById: (id) => api.get(`/jobs/${id}`),
    generateCoverLetter: (jobId) => api.post(`/resume/cover-letter/${jobId}`),
    getInterviewQuestions: (jobId) => api.get(`/resume/interview-questions/${jobId}`),
    analyzeSkillGap: (jobId) => api.get(`/resume/skill-gap/${jobId}`),
    optimizeKeywords: (jobId) => api.get(`/resume/optimize-keywords/${jobId}`),
};

export const careerService = {
    translateResume: (data) => api.post('/resume/translate', data),
    tailorResumeForIndustry: (data) => api.post('/resume/tailor', data),
    getPersonalityAssessment: () => api.get('/resume/personality'),
    predictCareerTrajectory: (params) => api.get('/resume/career-trajectory', { params }),
    generatePersonalBrand: (data) => api.post('/resume/personal-brand', data),
    analyzeVideoResume: (data) => api.post('/resume/analyze-video', data),
    getSkillDevelopmentPlan: (data) => api.post('/resume/skill-development', data),
    analyzeIndustryTrends: (params) => api.get('/resume/industry-trends', { params }),
    generateRecruiterOutreach: (data) => api.post('/resume/recruiter-outreach', data),
    checkDiversityAndInclusion: () => api.get('/resume/diversity-check'),
    matchGigOpportunities: () => api.get('/resume/gig-opportunities'),
    getCareerPivotAdvice: (data) => api.post('/resume/career-pivot', data),
};

export const applicationService = {
    trackJobApplication: (data) => api.post('/resume/job-application', data),
    checkApplicationStatus: (jobId) => api.get(`/resume/job-application/${jobId}/status`),
    getJobApplications: () => api.get('/resume/job-applications'),
    updateApplicationStatus: (id, status) => api.put(`/resume/job-applications/${id}`, { status }),
    withdrawApplication: (id) => api.delete(`/resume/job-applications/${id}`),
    trackJobApplication: (data) => api.post('/resume/job-application', data),
    checkApplicationStatus: (jobId) => api.get(`/resume/job-application/${jobId}/status`),

  };

export const interviewService = {
    mockInterview: (jobId, data) => api.post(`/resume/mock-interview/${jobId}`, data),
    getSalaryNegotiationAdvice: (jobId) => api.get(`/resume/salary-negotiation/${jobId}`),
 };

export const networkService = {
    analyzeNetworkProfessional: (data) => api.post('/resume/network-analysis', data),
};

export default api;
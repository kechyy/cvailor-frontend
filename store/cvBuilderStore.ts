// ================================================================
// CVAILOR — CV BUILDER ZUSTAND STORE
// Central state for entire CV building flow.
// Persists across steps. Reset on new CV start.
// ================================================================
import { create } from 'zustand'
import type { CVData, PersonalInfo, ExperienceEntry, EducationEntry, TemplateId } from '@/types'

interface CVBuilderState {
  // Flow
  currentStep: number
  isUploaded: boolean

  // CV Data
  personal: PersonalInfo
  experience: ExperienceEntry[]
  education: EducationEntry[]
  skills: string[]
  languages: string[]
  certifications: string[]
  jobDescription: string
  selectedTemplate: TemplateId

  // Actions — Flow
  setStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  setIsUploaded: (val: boolean) => void

  // Actions — CV Data
  updatePersonal: (data: Partial<PersonalInfo>) => void
  addExperience: (entry: ExperienceEntry) => void
  updateExperience: (id: string, data: Partial<ExperienceEntry>) => void
  removeExperience: (id: string) => void
  addEducation: (entry: EducationEntry) => void
  updateEducation: (id: string, data: Partial<EducationEntry>) => void
  removeEducation: (id: string) => void
  setSkills: (skills: string[]) => void
  setLanguages: (languages: string[]) => void
  setCertifications: (certs: string[]) => void
  setJobDescription: (jd: string) => void
  setTemplate: (id: TemplateId) => void

  // Utility
  loadCVData: (data: CVData) => void
  resetForm: () => void
  getCVData: () => CVData
}

const defaultPersonal: PersonalInfo = {
  fullName: '', jobTitle: '', email: '',
  phone: '', location: '', linkedin: '', website: '', summary: '',
}

export const useCVBuilderStore = create<CVBuilderState>((set, get) => ({
  currentStep: 1,
  isUploaded: false,
  personal: defaultPersonal,
  experience: [],
  education: [],
  skills: [],
  languages: [],
  certifications: [],
  jobDescription: '',
  selectedTemplate: 'minimal',

  setStep: (step) => set({ currentStep: step }),
  nextStep: () => set((s) => ({ currentStep: Math.min(s.currentStep + 1, 5) })),
  prevStep: () => set((s) => ({ currentStep: Math.max(s.currentStep - 1, 1) })),
  setIsUploaded: (val) => set({ isUploaded: val }),

  updatePersonal: (data) => set((s) => ({ personal: { ...s.personal, ...data } })),

  addExperience: (entry) => set((s) => ({ experience: [...s.experience, entry] })),
  updateExperience: (id, data) =>
    set((s) => ({ experience: s.experience.map((e) => (e.id === id ? { ...e, ...data } : e)) })),
  removeExperience: (id) =>
    set((s) => ({ experience: s.experience.filter((e) => e.id !== id) })),

  addEducation: (entry) => set((s) => ({ education: [...s.education, entry] })),
  updateEducation: (id, data) =>
    set((s) => ({ education: s.education.map((e) => (e.id === id ? { ...e, ...data } : e)) })),
  removeEducation: (id) =>
    set((s) => ({ education: s.education.filter((e) => e.id !== id) })),

  setSkills: (skills) => set({ skills }),
  setLanguages: (languages) => set({ languages }),
  setCertifications: (certifications) => set({ certifications }),
  setJobDescription: (jobDescription) => set({ jobDescription }),
  setTemplate: (selectedTemplate) => set({ selectedTemplate }),

  loadCVData: (data) =>
    set({
      personal: data.personal,
      experience: data.experience,
      education: data.education,
      skills: data.skills,
      languages: data.languages,
      certifications: data.certifications,
    }),

  resetForm: () =>
    set({
      currentStep: 1,
      isUploaded: false,
      personal: defaultPersonal,
      experience: [],
      education: [],
      skills: [],
      languages: [],
      certifications: [],
      jobDescription: '',
      selectedTemplate: 'minimal',
    }),

  getCVData: (): CVData => {
    const s = get()
    return {
      personal: s.personal,
      experience: s.experience,
      education: s.education,
      skills: s.skills,
      languages: s.languages,
      certifications: s.certifications,
    }
  },
}))

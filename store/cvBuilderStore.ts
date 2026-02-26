// ================================================================
// CVAILOR — CV BUILDER ZUSTAND STORE
// Central state for entire CV building flow.
// Persists across steps. Reset on new CV start.
// ================================================================
"use client"
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { CVData, PersonalInfo, ExperienceEntry, EducationEntry, TemplateId } from '@/types'
import { mockCVData } from '@/mock/cvBuilderMock'

interface CVBuilderState {
  // Flow
  selectedFlow: 'build' | 'upload' | null
  selectedTemplateId: TemplateId | null
  currentStep: number
  isUploaded: boolean

  // CV Data
  cvData: CVData
  personal: PersonalInfo
  experience: ExperienceEntry[]
  education: EducationEntry[]
  skills: string[]
  languages: string[]
  certifications: string[]
  jobDescription: string
  uploadedCvText: string | null
  tailoredCvData: CVData | null
  selectedTemplate: TemplateId

  // Actions — Flow
  setSelectedFlow: (flow: 'build' | 'upload' | null) => void
  setSelectedTemplateId: (template: TemplateId) => void
  setStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  setIsUploaded: (val: boolean) => void
  resetFlow: () => void

  // Actions — CV Data
  setCvData: (data: CVData) => void
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
  setUploadedCvText: (text: string | null) => void
  setTailoredCvData: (data: CVData | null) => void

  // Utility
  loadCVData: (data: CVData) => void
  resetForm: () => void
  getCVData: () => CVData
}

const defaultPersonal: PersonalInfo = {
  fullName: '', jobTitle: '', email: '',
  phone: '', location: '', linkedin: '', website: '', summary: '',
}

const fromCvData = (cv: CVData) => ({
  cvData: cv,
  personal: cv.personal,
  experience: cv.experience,
  education: cv.education,
  skills: cv.skills,
  languages: cv.languages,
  certifications: cv.certifications,
})

const initialCv = mockCVData

export const useCVBuilderStore = create<CVBuilderState>()(
  persist(
    (set, get) => ({
      // Flow
      selectedFlow: null,
      selectedTemplateId: null,
      currentStep: 1,
      isUploaded: false,

      // CV data
      ...fromCvData(initialCv),
      jobDescription: '',
      uploadedCvText: null,
      tailoredCvData: null,
      selectedTemplate: 'modern',

      setSelectedFlow: (flow) => set({ selectedFlow: flow, isUploaded: flow === 'upload' }),
      setSelectedTemplateId: (template) => set({ selectedTemplateId: template, selectedTemplate: template }),
      setStep: (step) => set({ currentStep: step }),
      nextStep: () => set((s) => ({ currentStep: Math.min(s.currentStep + 1, 5) })),
      prevStep: () => set((s) => ({ currentStep: Math.max(s.currentStep - 1, 1) })),
      setIsUploaded: (val) => set({ isUploaded: val }),
      resetFlow: () => set({
        selectedFlow: null,
        selectedTemplateId: null,
        currentStep: 1,
        isUploaded: false,
        jobDescription: '',
        uploadedCvText: null,
        tailoredCvData: null,
        selectedTemplate: 'modern',
        ...fromCvData(initialCv),
      }),

      setCvData: (data) => set({ ...fromCvData(data) }),
      updatePersonal: (data) => set((s) => {
        const personal = { ...s.personal, ...data }
        return { personal, cvData: { ...s.cvData, personal } }
      }),

      addExperience: (entry) => set((s) => {
        const experience = [...s.experience, entry]
        return { experience, cvData: { ...s.cvData, experience } }
      }),
      updateExperience: (id, data) => set((s) => {
        const experience = s.experience.map((e) => (e.id === id ? { ...e, ...data } : e))
        return { experience, cvData: { ...s.cvData, experience } }
      }),
      removeExperience: (id) => set((s) => {
        const experience = s.experience.filter((e) => e.id !== id)
        return { experience, cvData: { ...s.cvData, experience } }
      }),

      addEducation: (entry) => set((s) => {
        const education = [...s.education, entry]
        return { education, cvData: { ...s.cvData, education } }
      }),
      updateEducation: (id, data) => set((s) => {
        const education = s.education.map((e) => (e.id === id ? { ...e, ...data } : e))
        return { education, cvData: { ...s.cvData, education } }
      }),
      removeEducation: (id) => set((s) => {
        const education = s.education.filter((e) => e.id !== id)
        return { education, cvData: { ...s.cvData, education } }
      }),

      setSkills: (skills) => set((s) => ({ skills, cvData: { ...s.cvData, skills } })),
      setLanguages: (languages) => set((s) => ({ languages, cvData: { ...s.cvData, languages } })),
      setCertifications: (certifications) => set((s) => ({ certifications, cvData: { ...s.cvData, certifications } })),
      setJobDescription: (jobDescription) => set({ jobDescription }),
      setTemplate: (selectedTemplate) => set({ selectedTemplate, selectedTemplateId: selectedTemplate }),
      setUploadedCvText: (text) => set({ uploadedCvText: text }),
      setTailoredCvData: (data) => set({ tailoredCvData: data }),

      loadCVData: (data) => set({ ...fromCvData(data) }),

      resetForm: () => set({
        currentStep: 1,
        isUploaded: false,
        jobDescription: '',
        selectedTemplate: 'modern',
        selectedTemplateId: 'modern',
        uploadedCvText: null,
        tailoredCvData: null,
        ...fromCvData(initialCv),
      }),

      getCVData: (): CVData => {
        const s = get()
        return s.cvData
      },
    }),
    {
      name: 'cvailor-cv-builder-v1',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        selectedFlow: state.selectedFlow,
        selectedTemplateId: state.selectedTemplateId,
        currentStep: state.currentStep,
        isUploaded: state.isUploaded,
        cvData: state.cvData,
        personal: state.personal,
        experience: state.experience,
        education: state.education,
        skills: state.skills,
        languages: state.languages,
        certifications: state.certifications,
        jobDescription: state.jobDescription,
        uploadedCvText: state.uploadedCvText,
        tailoredCvData: state.tailoredCvData,
        selectedTemplate: state.selectedTemplate,
      }),
    }
  )
)

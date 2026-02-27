'use client'
import { useEffect, useMemo, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import TopBar from '@/components/dashboard/TopBar'
import { FormField } from '@/components/ui/FormField'
import { TextareaField } from '@/components/ui/TextareaField'
import { TagInput } from '@/components/ui/TagInput'
import { Button } from '@/components/ui/Button'
import A4PreviewFrame from '@/components/dashboard/A4PreviewFrame'
import { useCVBuilderStore } from '@/store/cvBuilderStore'
import { personalInfoSchema } from '@/lib/validations'
import type { CVData } from '@/types'
import { mockCV_TechSenior } from '@/mock/cvBuilderMock'

type FormValues = {
  fullName: string
  jobTitle: string
  email: string
  phone: string
  location: string
  linkedin?: string
  website?: string
  summary?: string
  skills: string[]
  languages: string[]
  certifications: string[]
}

export default function EditorPage() {
  const router = useRouter()
  const {
    selectedFlow,
    selectedTemplateId,
    cvData,
    setCvData,
    setSelectedFlow,
    setSelectedTemplateId,
    getCVData,
  } = useCVBuilderStore()
  const [imported, setImported] = useState(false)

  // Guard: must have chosen a flow and template
  useEffect(() => {
    if (!selectedFlow) {
      setSelectedFlow('build')
      router.replace('/dashboard/templates')
    } else if (!selectedTemplateId) {
      router.replace('/dashboard/templates')
    }
  }, [router, selectedFlow, selectedTemplateId, setSelectedFlow])

  const defaultValues = useMemo(() => ({
    fullName: cvData.personal.fullName,
    jobTitle: cvData.personal.jobTitle,
    email: cvData.personal.email,
    phone: cvData.personal.phone,
    location: cvData.personal.location,
    linkedin: cvData.personal.linkedin,
    website: cvData.personal.website,
    summary: cvData.personal.summary,
    skills: cvData.skills,
    languages: cvData.languages,
    certifications: cvData.certifications,
  }), [cvData])

  const [skills, setSkills] = useState<string[]>(cvData.skills)
  const [languages, setLanguages] = useState<string[]>(cvData.languages)
  const [certifications, setCertifications] = useState<string[]>(cvData.certifications)
  const [importing, setImporting] = useState(false)
  const [importError, setImportError] = useState<string | null>(null)
  const [previousCv, setPreviousCv] = useState<CVData | null>(null)
  const isDev = process.env.NODE_ENV !== 'production'
  const [forceLong, setForceLong] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(personalInfoSchema.pick({
      fullName: true,
      jobTitle: true,
      email: true,
      phone: true,
      location: true,
      linkedin: true,
      website: true,
      summary: true,
    })),
    defaultValues,
    mode: 'onBlur',
  })
  // register array fields so RHF keeps them
  register('skills')
  register('languages')
  register('certifications')

  const watched = useWatch({ control })

  const onSubmit = (data: FormValues) => {
    const updated: CVData = {
      ...cvData,
      personal: { ...cvData.personal, ...data },
      skills,
      languages,
      certifications,
    }
    setCvData(updated)
    router.push('/dashboard/job-description')
  }

  const loadLongCv = () => {
    const longCv: CVData = {
      ...mockCV_TechSenior,
      experience: [...mockCV_TechSenior.experience, ...mockCV_TechSenior.experience].map((e, idx) => ({
        ...e,
        id: `${e.id}_long_${idx}`,
      })),
    }
    setCvData(longCv)
    setSkills(longCv.skills)
    setLanguages(longCv.languages)
    setCertifications(longCv.certifications)
    setForceLong(true)
    console.debug('[DEV] applied long CV for pagination test')
  }

  const importLinkedIn = () => {
    const url = (watched?.linkedin || '').trim()
    if (!url) {
      setImportError('Add your LinkedIn URL above before importing.')
      return
    }
    setImportError(null)
    setPreviousCv(cvData)
    setImporting(true)
    // Placeholder: await backend integration. We only show success feedback.
    setTimeout(() => {
      setImported(true)
      setImporting(false)
    }, 900)
  }

  const revertImport = () => {
    if (!previousCv) return
    setCvData(previousCv)
    setSkills(previousCv.skills)
    setLanguages(previousCv.languages)
    setCertifications(previousCv.certifications)
    setImported(false)
    setPreviousCv(null)
  }

  const skip = () => router.push('/dashboard/job-description')

  // Derive preview data from current form values + tag state (no store churn)
  const previewCv: CVData = {
    ...cvData,
    personal: { ...cvData.personal, ...watched },
    skills: watched?.skills ?? skills,
    languages: watched?.languages ?? languages,
    certifications: watched?.certifications ?? certifications,
  }

  // Keep store CV data aligned with what the user sees in the live preview.
  useEffect(() => {
    if (!watched) return
    const base = getCVData()
    const next: CVData = {
      ...base,
      personal: { ...base.personal, ...watched },
      skills: watched.skills ?? skills,
      languages: watched.languages ?? languages,
      certifications: watched.certifications ?? certifications,
    }
    const changed =
      JSON.stringify(next.personal) !== JSON.stringify(base.personal) ||
      JSON.stringify(next.skills) !== JSON.stringify(base.skills) ||
      JSON.stringify(next.languages) !== JSON.stringify(base.languages) ||
      JSON.stringify(next.certifications) !== JSON.stringify(base.certifications)

    if (changed) setCvData(next)
  }, [watched, skills, languages, certifications, getCVData, setCvData])

  return (
    <>
      <TopBar
        title="Edit your CV"
        subtitle="Make quick tweaks before tailoring to a job"
        action={
          <div className="flex gap-2 text-xs text-gray-400 items-center">
            <button onClick={() => { setSelectedFlow('build'); setSelectedTemplateId(selectedTemplateId || 'modern'); }} className="underline">Switch template</button>
            {isDev && (
              <button onClick={loadLongCv} className="underline text-brand-purple">
                Dev: long CV
              </button>
            )}
          </div>
        }
      />

      <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-6 items-start">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-gray-100 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="font-display text-xl text-gray-900">CV details</h3>
              <p className="text-sm text-gray-400">These fields feed directly into the template</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={importLinkedIn}
                disabled={importing}
                className="flex items-center gap-2 text-xs font-semibold text-white bg-[#0A66C2] px-3 py-1.5 rounded-lg hover:bg-[#084f96] disabled:opacity-60"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.2 8.2h4.6V24H.2zM8.34 8.2h4.41v2.15h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.47 3.04 5.47 6.99V24h-4.8v-7.7c0-1.84-.03-4.2-2.56-4.2-2.56 0-2.95 2-2.95 4.07V24h-4.8z"/>
                </svg>
                {importing ? 'Importing…' : 'Import from LinkedIn'}
              </button>
              {imported && (
                <button
                  type="button"
                  onClick={revertImport}
                  className="text-xs font-semibold text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50"
                >
                  Revert
                </button>
              )}
            </div>
          </div>

          {imported && (
            <p className="text-xs text-brand-green font-semibold flex items-center gap-1.5">
              <span>✓</span> LinkedIn import queued — your current data stayed unchanged. We’ll sync once connected.
            </p>
          )}
          {importError && (
            <p className="text-xs text-red-500 font-semibold">{importError}</p>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            <FormField label="Full name" placeholder="Your name" error={errors.fullName?.message} {...register('fullName')} />
            <FormField label="Job title" placeholder="Product Manager" error={errors.jobTitle?.message} {...register('jobTitle')} />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <FormField label="Email" type="email" placeholder="you@email.com" error={errors.email?.message} {...register('email')} />
            <FormField label="Phone" type="tel" placeholder="+1 555 123 1234" error={errors.phone?.message} {...register('phone')} />
          </div>

          <FormField label="Location" placeholder="City, Country" error={errors.location?.message} {...register('location')} />

          <div className="grid sm:grid-cols-2 gap-4">
            <FormField label="LinkedIn" placeholder="linkedin.com/in/you" error={errors.linkedin?.message} {...register('linkedin')} />
            <FormField label="Website" placeholder="yourportfolio.com" error={errors.website?.message} {...register('website')} />
          </div>

          <TextareaField
            label="Professional summary"
            placeholder="Short intro that highlights your strengths"
            rows={4}
            error={errors.summary?.message}
            {...register('summary')}
          />

          <div className="grid sm:grid-cols-2 gap-4">
            <TagInput label="Skills" value={skills} onChange={(vals) => {
              setSkills(vals)
              setValue('skills', vals)
              setCvData({ ...getCVData(), skills: vals })
            }} />
            <TagInput label="Languages" value={languages} onChange={(vals) => {
              setLanguages(vals)
              setValue('languages', vals)
              setCvData({ ...getCVData(), languages: vals })
            }} />
          </div>
          <TagInput label="Certifications" value={certifications} onChange={(vals) => {
            setCertifications(vals)
            setValue('certifications', vals)
            setCvData({ ...getCVData(), certifications: vals })
          }} />

          <div className="flex justify-between pt-2">
            <Button type="button" variant="ghost" onClick={skip}>Skip</Button>
            <Button type="submit" size="lg">Next: Job description →</Button>
          </div>
        </form>

        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-gray-400">Live preview</p>
              <p className="text-sm font-semibold text-gray-700">{selectedTemplateId || 'modern'} template</p>
            </div>
            <span className="text-[10px] font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">A4 preview</span>
          </div>
          <div className="w-full max-w-[520px] mx-auto">
            <A4PreviewFrame templateId={selectedTemplateId || 'modern'} cv={previewCv} />
          </div>
        </div>
      </div>
    </>
  )
}

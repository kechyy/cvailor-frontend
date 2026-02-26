'use client'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
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

const linkedinMock = {
  personal: {
    fullName: 'Jordan Avery',
    jobTitle: 'Senior Product Manager',
    email: 'jordan.avery@email.com',
    phone: '+1 415 222 9898',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/jordanavery',
    website: 'jordanavery.com',
    summary: 'Senior PM with 8 years in B2B SaaS, specializing in growth, onboarding, and monetization. Led multi-team launches that increased ARR by $9.4M and improved activation by 18 points.',
  },
  experience: [],
  education: [],
  skills: ['Product Strategy', 'Experimentation', 'A/B Testing', 'SQL', 'Roadmapping'],
  languages: ['English', 'Spanish'],
  certifications: ['CSPO'],
}

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

  const {
    register,
    handleSubmit,
    setValue,
    watch,
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

  const watched = watch()

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

  const importLinkedIn = () => {
    setSkills(linkedinMock.skills)
    setLanguages(linkedinMock.languages)
    setCertifications(linkedinMock.certifications)
    setCvData({ ...cvData, ...linkedinMock, personal: { ...linkedinMock.personal } })
    setImported(true)
  }

  const skip = () => router.push('/dashboard/job-description')

  // Derive preview data from current form defaults + tag state (no store churn)
  const previewCv: CVData = {
    ...cvData,
    personal: { ...cvData.personal, ...watched },
    skills,
    languages,
    certifications,
  }

  return (
    <>
      <TopBar
        title="Edit your CV"
        subtitle="Make quick tweaks before tailoring to a job"
        action={
          <div className="flex gap-2 text-xs text-gray-400">
            <button onClick={() => { setSelectedFlow('build'); setSelectedTemplateId(selectedTemplateId || 'modern'); }} className="underline">Switch template</button>
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
            <button type="button" onClick={importLinkedIn}
              className="text-xs font-semibold text-brand-purple bg-brand-purple/10 px-3 py-1.5 rounded-lg hover:bg-brand-purple/15">
              Import LinkedIn (mock)
            </button>
          </div>

          {imported && <p className="text-xs text-brand-green font-semibold">LinkedIn data imported.</p>}

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
          <A4PreviewFrame templateId={selectedTemplateId || 'modern'} cv={previewCv} />
        </div>
      </div>
    </>
  )
}

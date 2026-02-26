'use client'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import TopBar from '@/components/dashboard/TopBar'
import A4PreviewFrame from '@/components/dashboard/A4PreviewFrame'
import { Button } from '@/components/ui/Button'
import { useCVBuilderStore } from '@/store/cvBuilderStore'
import type { CVData } from '@/types'

function injectKeywords(cv: CVData, jobDescription: string): CVData {
  const keywords = jobDescription
    .split(/\W+/)
    .filter((w) => w.length > 4)
    .slice(0, 6)
    .map((w) => w.toLowerCase())
  const unique = Array.from(new Set(keywords)).slice(0, 3)

  const addToSummary = unique.length ? `${cv.personal.summary || ''} Focus areas: ${unique.join(', ')}.` : cv.personal.summary
  const exp = cv.experience.map((e, idx) => {
    if (idx === 0 && unique[0]) {
      const bullets = e.bullets && e.bullets.length ? [...e.bullets] : []
      bullets[0] = bullets[0] ? `${bullets[0]} (${unique[0]})` : `Delivered impact in ${unique[0]}`
      return { ...e, bullets }
    }
    return e
  })

  return {
    ...cv,
    personal: { ...cv.personal, summary: addToSummary },
    experience: exp,
    skills: unique.length ? Array.from(new Set([...cv.skills, ...unique.map((k) => k[0].toUpperCase() + k.slice(1))])) : cv.skills,
  }
}

export default function TailorPage() {
  const router = useRouter()
  const {
    selectedFlow,
    selectedTemplateId,
    cvData,
    jobDescription,
    tailoredCvData,
    setTailoredCvData,
  } = useCVBuilderStore()
  const [isLoading, setIsLoading] = useState(false)
  const [view, setView] = useState<'original' | 'tailored'>('original')

  useEffect(() => {
    if (!selectedFlow) {
      router.replace('/dashboard/templates')
    } else if (!selectedTemplateId) {
      router.replace('/dashboard/templates')
    }
  }, [router, selectedFlow, selectedTemplateId])

  const tailored = useMemo(() => tailoredCvData ?? injectKeywords(cvData, jobDescription || ''), [cvData, jobDescription, tailoredCvData])

  const runTailor = async () => {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setTailoredCvData(tailored)
    setView('tailored')
    setIsLoading(false)
  }

  const continueNext = () => {
    if (!tailoredCvData) setTailoredCvData(tailored)
    router.push('/dashboard/download')
  }

  return (
    <>
      <TopBar title="AI tailor" subtitle="Mock tailoring with before/after" />

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <Button variant={view === 'original' ? 'primary' : 'secondary'} onClick={() => setView('original')}>Original</Button>
        <Button variant={view === 'tailored' ? 'primary' : 'secondary'} onClick={() => setView('tailored')}>Tailored</Button>
        <Button onClick={runTailor} loading={isLoading}>AI Tailor CV</Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className={`bg-white border border-gray-100 rounded-2xl p-4 ${view === 'original' ? '' : 'opacity-70'}`}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-gray-700">Original CV</p>
            <span className="text-[10px] text-gray-500">A4 preview</span>
          </div>
          <A4PreviewFrame templateId={selectedTemplateId || 'modern'} cv={cvData} shadow={view === 'original'} />
        </div>
        <div className={`bg-white border border-gray-100 rounded-2xl p-4 ${view === 'tailored' ? '' : 'opacity-70'}`}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-gray-700">Tailored CV</p>
            <span className="text-[10px] text-gray-500">A4 preview</span>
          </div>
          <A4PreviewFrame templateId={selectedTemplateId || 'modern'} cv={tailored} shadow={view === 'tailored'} />
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <Button variant="ghost" onClick={() => router.push('/dashboard/job-description')}>← Back</Button>
        <Button onClick={continueNext}>Continue to download →</Button>
      </div>
    </>
  )
}

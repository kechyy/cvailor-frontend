'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import TopBar from '@/components/dashboard/TopBar'
import { TextareaField } from '@/components/ui/TextareaField'
import { Button } from '@/components/ui/Button'
import { useCVBuilderStore } from '@/store/cvBuilderStore'

export default function JobDescriptionPage() {
  const router = useRouter()
  const { selectedTemplateId, selectedFlow, jobDescription, setJobDescription } = useCVBuilderStore()
  const [value, setValue] = useState(jobDescription || '')

  useEffect(() => {
    if (!selectedFlow) {
      router.replace('/dashboard/templates')
    } else if (!selectedTemplateId) {
      router.replace('/dashboard/templates')
    }
  }, [router, selectedFlow, selectedTemplateId])

  const continueFlow = () => {
    setJobDescription(value)
    router.push('/dashboard/tailor')
  }

  const skip = () => {
    setJobDescription('')
    router.push('/dashboard/tailor')
  }

  return (
    <>
      <TopBar title="Job description" subtitle="Optional — AI will tailor harder with this" />
      <div className="max-w-2xl bg-white border border-gray-100 rounded-2xl p-6">
        <TextareaField
          label="Paste job description (optional)"
          placeholder="Paste the full JD so AI can align your bullets and summary."
          rows={10}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="flex justify-between pt-3">
          <Button type="button" variant="ghost" onClick={skip}>Skip</Button>
          <div className="flex gap-2">
            <Button type="button" variant="secondary" onClick={skip}>Skip for now</Button>
            <Button type="button" onClick={continueFlow}>Continue →</Button>
          </div>
        </div>
      </div>
    </>
  )
}

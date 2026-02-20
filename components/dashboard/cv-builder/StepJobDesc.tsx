'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { TextareaField } from '@/components/ui/TextareaField'
import { Button } from '@/components/ui/Button'
import { useCVBuilderStore } from '@/store/cvBuilderStore'
import { jobDescriptionSchema, type JobDescriptionFormData } from '@/lib/validations'

export default function StepJobDesc() {
  const { jobDescription, setJobDescription, prevStep } = useCVBuilderStore()
  const [isGenerating, setIsGenerating] = useState(false)
  const [scanPhase, setScanPhase] = useState(0)
  const router = useRouter()

  const scanMessages = [
    'Scanning job description…',
    'Detecting key requirements…',
    'Matching your experience…',
    'Tailoring your CV…',
    'Almost ready…',
  ]

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<JobDescriptionFormData>({
    resolver: zodResolver(jobDescriptionSchema),
    defaultValues: { jobDescription },
    mode: 'onChange',
  })

  const jdValue = watch('jobDescription') ?? ''

  const onSubmit = async (data: JobDescriptionFormData) => {
    setJobDescription(data.jobDescription)
    setIsGenerating(true)

    // Mock AI processing animation
    for (let i = 0; i < scanMessages.length; i++) {
      setScanPhase(i)
      await new Promise((r) => setTimeout(r, 600))
    }

    router.push('/dashboard/cv/preview')
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <h2 className="font-display text-2xl text-gray-900 mb-1">Paste the job description</h2>
        <p className="text-sm text-gray-400">AI will tailor your CV and cover letter to this specific role</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <TextareaField
          label="Job description"
          placeholder="Paste the full job description here… The more detail you include, the better AI can tailor your CV to match exactly what the employer is looking for."
          rows={10}
          charCount={jdValue.length}
          maxChars={10000}
          error={errors.jobDescription?.message}
          {...register('jobDescription')}
        />

        {/* Keyword preview */}
        {jdValue.length > 100 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-brand-green/6 border border-brand-green/20 rounded-xl px-4 py-3 flex items-center gap-2"
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-brand-green"
            >✦</motion.span>
            <span className="text-sm text-brand-green font-medium">
              AI is ready to analyse this job description
            </span>
          </motion.div>
        )}

        <div className="flex justify-between pt-2">
          <Button type="button" variant="ghost" onClick={prevStep}>← Back</Button>
          <Button type="submit" size="lg" loading={isGenerating}>
            {isGenerating ? scanMessages[scanPhase] : 'Generate my CV ✦'}
          </Button>
        </div>
      </form>

      {/* Full-screen overlay during generation */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-purple to-brand-green flex items-center justify-center mb-6 shadow-2xl shadow-brand-purple/30"
            >
              <span className="text-white text-2xl">✦</span>
            </motion.div>
            <h3 className="font-display text-2xl text-gray-900 mb-2">Tailoring your CV</h3>
            <motion.p
              key={scanPhase}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gray-400 text-sm"
            >
              {scanMessages[scanPhase]}
            </motion.p>
            {/* Progress dots */}
            <div className="flex gap-2 mt-6">
              {scanMessages.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ scale: i === scanPhase ? 1.4 : 1, opacity: i <= scanPhase ? 1 : 0.3 }}
                  className="w-1.5 h-1.5 rounded-full bg-brand-purple"
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

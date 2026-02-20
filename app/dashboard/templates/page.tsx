'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TopBar from '@/components/dashboard/TopBar'
import TemplateCard from '@/components/dashboard/TemplateCard'
import { mockTemplates } from '@/mock/templatesMock'
import type { JobCategory } from '@/types'

const filters: { label: string; value: 'all' | JobCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'Tech', value: 'tech' },
  { label: 'Creative', value: 'creative' },
  { label: 'Finance', value: 'finance' },
  { label: 'Healthcare', value: 'healthcare' },
  { label: 'Sales', value: 'sales' },
  { label: 'Executive', value: 'executive' },
]

export default function TemplatesPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | JobCategory>('all')

  const filtered = activeFilter === 'all'
    ? mockTemplates
    : mockTemplates.filter((t) => t.categories.includes(activeFilter))

  const recommended = mockTemplates.find((t) => t.isAiRecommended)

  return (
    <>
      <TopBar title="Templates" subtitle="AI recommends the best fit for your field" />

      {/* AI Recommendation banner */}
      {recommended && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 bg-brand-purple/6 border border-brand-purple/20 rounded-2xl px-5 py-4 mb-6"
        >
          <motion.span
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="text-brand-purple text-lg flex-shrink-0"
          >✦</motion.span>
          <div>
            <p className="text-sm font-semibold text-brand-purple">
              Based on your profile, we recommend <span className="underline">{recommended.name}</span>
            </p>
            <p className="text-xs text-brand-purple/60 mt-0.5">Best for senior tech roles — clean, ATS-optimised, professional</p>
          </div>
        </motion.div>
      )}

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${
              activeFilter === f.value
                ? 'bg-brand-purple text-white shadow-md shadow-brand-purple/20'
                : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-300'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Template grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filtered.map((template, i) => (
            <TemplateCard key={template.id} template={template} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>
    </>
  )
}

'use client'
import React from 'react'
import { TemplateThumbnail } from './TemplateThumbnail'
import type { CvTemplateMeta, SampleCvData } from '@/src/templates/registry'
import { useTemplateStore } from '@/src/store/templateStore'
import clsx from 'clsx'

type Props = {
  template: CvTemplateMeta
  sample: SampleCvData
}

export function TemplateCard({ template, sample }: Props) {
  const { selectedTemplateId, setSelectedTemplateId } = useTemplateStore()
  const isSelected = selectedTemplateId === template.id

  return (
    <button
      type="button"
      onClick={() => setSelectedTemplateId(template.id)}
      className={clsx(
        'group relative flex flex-col items-center gap-3 rounded-2xl border transition-all p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple',
        isSelected ? 'border-brand-purple shadow-lg shadow-brand-purple/10' : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
      )}
    >
      <TemplateThumbnail template={template} sample={sample} />
      <div className="w-full text-left">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-900">{template.name}</p>
          {isSelected && <span className="text-xs px-2 py-0.5 rounded-full bg-brand-purple/10 text-brand-purple">Selected</span>}
        </div>
        <p className="text-xs text-gray-500 mt-1">{template.layout.toUpperCase()} · {template.tags.join(' · ')}</p>
      </div>
      <div className="absolute inset-0 rounded-2xl ring-2 ring-brand-purple opacity-0 group-hover:opacity-40 transition-opacity pointer-events-none" />
    </button>
  )
}


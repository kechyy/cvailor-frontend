'use client'
import React from 'react'
import type { CvTemplateMeta, SampleCvData } from '@/src/templates/registry'

type Props = {
  template: CvTemplateMeta
  sample: SampleCvData
}

// Outer viewport and scaled inner A4 preview
export function TemplateThumbnail({ template, sample }: Props) {
  const scale = 0.24
  return (
    <div className="w-[190px] h-[260px] rounded-xl overflow-hidden bg-gray-100 border border-gray-200 relative">
      <div
        className="absolute top-0 left-0"
        style={{
          width: 794,
          height: 1123,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          pointerEvents: 'none',
        }}
      >
        <template.Component sample={sample} />
      </div>
    </div>
  )
}


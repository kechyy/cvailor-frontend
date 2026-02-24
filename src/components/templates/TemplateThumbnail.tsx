'use client'
import React, { useLayoutEffect, useRef, useState } from 'react'
import type { CvTemplateMeta, SampleCvData } from '@/src/templates/registry'

type Props = {
  template: CvTemplateMeta
  sample: SampleCvData
}

// Responsive outer viewport that keeps A4 ratio and scales to full card width
export function TemplateThumbnail({ template, sample }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.26)

  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return
    const compute = () => {
      const width = el.clientWidth || 210
      setScale(width / 794)
    }
    compute()
    const handle = () => compute()
    window.addEventListener('resize', handle)
    return () => window.removeEventListener('resize', handle)
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full aspect-[794/1123] rounded-xl overflow-hidden bg-gray-100 border border-gray-200 relative"
    >
      <div
        className="absolute top-0 left-0"
        style={{
          width: 100%,
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

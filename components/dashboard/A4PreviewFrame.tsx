'use client'
import { useLayoutEffect, useRef, useState } from 'react'
import type { CVData, TemplateId } from '@/types'
import { renderTemplate } from './cv-templates/registry'

const A4_WIDTH = 794
const A4_HEIGHT = 1123

interface Props {
  templateId: TemplateId
  cv: CVData
  matchedKeywords?: string[]
  className?: string
  shadow?: boolean
}

// Single source of truth for scaling CV previews. Keeps aspect ratio and transforms
// only the wrapper (never the template), so typography stays ATS-safe.
export default function A4PreviewFrame({ templateId, cv, matchedKeywords, className, shadow = true }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.26)

  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return

    const compute = () => {
      const width = el.clientWidth || A4_WIDTH
      const next = width / A4_WIDTH
      setScale((prev) => (Math.abs(prev - next) > 0.0001 ? next : prev))
    }

    compute()
    const obs = new ResizeObserver(compute)
    obs.observe(el)
    return () => obs.disconnect()
  }, [templateId])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: '100%',
        aspectRatio: `${A4_WIDTH} / ${A4_HEIGHT}`,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 10,
        background: '#F7F8FA',
        boxShadow: shadow ? '0 12px 32px rgba(15,23,42,0.18)' : 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: A4_WIDTH,
          height: A4_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {renderTemplate(templateId, { cv, matchedKeywords })}
      </div>
    </div>
  )
}

'use client'
import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { CVData, TemplateId } from '@/types'
import { renderTemplate } from './cv-templates/registry'

const A4_WIDTH = 794
const A4_HEIGHT = 1123
const SAFE_PAD = 32 // px breathing room top/bottom used for slicing windows

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
  const measureRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.26)
  const [pageCount, setPageCount] = useState(1)
  const scaledHeight = A4_HEIGHT * scale
  const scaledWidth = A4_WIDTH * scale

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

  useLayoutEffect(() => {
    const inner = measureRef.current
    if (!inner) return
    const h = inner.scrollHeight
    const pageWindow = A4_HEIGHT - SAFE_PAD * 2
    const pages = Math.max(1, Math.ceil((h + SAFE_PAD * 2) / pageWindow))
    setPageCount(pages)
  }, [templateId, cv])

  const pages = useMemo(() => Array.from({ length: pageCount }, (_, i) => i), [pageCount])

  const goToPage = (page: number) => {
    const el = containerRef.current
    if (!el) return
    const top = (page - 1) * scaledHeight
    el.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <>
      {/* hidden measure node to determine total height at 1x */}
      <div style={{ position: 'absolute', visibility: 'hidden', pointerEvents: 'none', height: 0, overflow: 'hidden' }}>
        <div ref={measureRef} style={{ width: A4_WIDTH }}>
          {renderTemplate(templateId, { cv, matchedKeywords })}
        </div>
      </div>

      <div
        ref={containerRef}
        className={className}
        style={{
          width: '100%',
          height: scaledHeight,
          position: 'relative',
          overflowY: 'auto',
          borderRadius: 10,
          background: '#F7F8FA',
          boxShadow: shadow ? '0 12px 32px rgba(15,23,42,0.18)' : 'none',
        }}
      >
        {pages.map((page) => (
          <div
            key={page}
            style={{
              width: scaledWidth,
              height: scaledHeight,
              margin: '0 auto 14px',
              background: '#fff',
              boxShadow: shadow ? '0 10px 26px rgba(17,24,39,0.18)' : 'none',
              borderRadius: 8,
              overflow: 'hidden',
              position: 'relative',
              padding: `${SAFE_PAD * scale}px`,
              boxSizing: 'border-box',
            }}
            >
              <div
                style={{
                  position: 'absolute',
                top: -(Math.max(0, page * (A4_HEIGHT - SAFE_PAD * 2) - SAFE_PAD)) * scale,
                left: 0,
                width: scaledWidth,
                transformOrigin: 'top left',
              }}
            >
              <div
                style={{
                  transform: `scale(${scale})`,
                  transformOrigin: 'top left',
                  width: A4_WIDTH,
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
              >
                {renderTemplate(templateId, { cv, matchedKeywords })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

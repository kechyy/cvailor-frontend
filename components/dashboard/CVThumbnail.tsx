'use client'
import type { CSSProperties } from 'react'
import type { CVData, TemplateId } from '@/types'
import { renderTemplate } from './cv-templates/registry'
import { useLayoutEffect, useRef, useState } from 'react'

type Props = {
  templateId: TemplateId
  cv: CVData
  width: number
  matchedKeywords?: string[]
  showShadow?: boolean
}

const A4_WIDTH = 794
const A4_HEIGHT = 1123

const innerBase: CSSProperties = {
  width: A4_WIDTH,
  height: A4_HEIGHT,
  transformOrigin: 'top left',
  pointerEvents: 'none',
  userSelect: 'none',
}

export default function CVThumbnail({ templateId, cv, width, matchedKeywords, showShadow = true }: Props) {
  const widthScale = width / A4_WIDTH
  const [scale, setScale] = useState(widthScale)
  const [height, setHeight] = useState(Math.round(A4_HEIGHT * widthScale))
  const innerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ws = width / A4_WIDTH
    setScale(ws)
    setHeight(Math.round(A4_HEIGHT * ws))
  }, [width, templateId, cv])

  return (
    <div style={{ width, height, overflow: 'hidden', position: 'relative', boxShadow: showShadow ? '0 10px 26px rgba(17,24,39,0.18)' : 'none', borderRadius: 8 }}>
      <div ref={innerRef} style={{ ...innerBase, transform: `scale(${scale})` }}>
        {renderTemplate(templateId, { cv, matchedKeywords })}
      </div>
    </div>
  )
}

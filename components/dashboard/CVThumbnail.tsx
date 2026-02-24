'use client'
import type { CSSProperties } from 'react'
import type { CVData, TemplateId } from '@/types'
import TemplateClassic from './cv-templates/TemplateClassic'
import TemplateModern from './cv-templates/TemplateModern'
import TemplateProfessional from './cv-templates/TemplateProfessional'
import TemplateExecutive from './cv-templates/TemplateExecutive'
import TemplateAcademic from './cv-templates/TemplateAcademic'
import TemplateHealthcare from './cv-templates/TemplateHealthcare'
import TemplateCreative from './cv-templates/TemplateCreative'
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

const TEMPLATE_MAP: Record<TemplateId, (props: { cv: CVData; matchedKeywords?: string[] }) => JSX.Element> = {
  classic: (props) => <TemplateClassic {...props} />,
  modern: (props) => <TemplateModern {...props} />,
  professional: (props) => <TemplateProfessional {...props} />,
  executive: (props) => <TemplateExecutive {...props} />,
  academic: (props) => <TemplateAcademic {...props} />,
  healthcare: (props) => <TemplateHealthcare {...props} />,
  creative: (props) => <TemplateCreative {...props} />,
}

export default function CVThumbnail({ templateId, cv, width, matchedKeywords, showShadow = true }: Props) {
  const widthScale = width / A4_WIDTH
  const [scale, setScale] = useState(widthScale)
  const [height, setHeight] = useState(Math.round(A4_HEIGHT * widthScale))
  const innerRef = useRef<HTMLDivElement>(null)
  const renderTemplate = TEMPLATE_MAP[templateId] || TEMPLATE_MAP.classic

  useLayoutEffect(() => {
    const ws = width / A4_WIDTH
    setScale(ws)
    setHeight(Math.round(A4_HEIGHT * ws))
  }, [width, templateId, cv])

  return (
    <div style={{ width, height, overflow: 'hidden', position: 'relative', boxShadow: showShadow ? '0 10px 26px rgba(17,24,39,0.18)' : 'none', borderRadius: 8 }}>
      <div ref={innerRef} style={{ ...innerBase, transform: `scale(${scale})` }}>
        {renderTemplate({ cv, matchedKeywords })}
      </div>
    </div>
  )
}

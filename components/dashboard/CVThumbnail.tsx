'use client'
import type { CSSProperties } from 'react'
import type { CVData, TemplateId } from '@/types'
import TemplateMinimal from './cv-templates/TemplateMinimal'
import TemplateClean from './cv-templates/TemplateClean'
import TemplateClassic from './cv-templates/TemplateClassic'
import TemplateModern from './cv-templates/TemplateModern'
import TemplateBold from './cv-templates/TemplateBold'
import TemplateExecutive from './cv-templates/TemplateExecutive'
import TemplateCompact from './cv-templates/TemplateCompact'
import TemplatePolished from './cv-templates/TemplatePolished'
import TemplateContemporary from './cv-templates/TemplateContemporary'
import TemplateTimeline from './cv-templates/TemplateTimeline'
import TemplateCreative from './cv-templates/TemplateCreative'

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

const templateMap: Record<TemplateId, (props: { cv: CVData; matchedKeywords?: string[] }) => JSX.Element> = {
  minimal: (props) => <TemplateMinimal {...props} />,
  clean: (props) => <TemplateClean {...props} />,
  classic: (props) => <TemplateClassic {...props} />,
  modern: (props) => <TemplateModern {...props} />,
  bold: (props) => <TemplateBold {...props} />,
  executive: (props) => <TemplateExecutive {...props} />,
  compact: (props) => <TemplateCompact {...props} />,
  polished: (props) => <TemplatePolished {...props} />,
  contemporary: (props) => <TemplateContemporary {...props} />,
  timeline: (props) => <TemplateTimeline {...props} />,
  creative: (props) => <TemplateCreative {...props} />,
}

export default function CVThumbnail({ templateId, cv, width, matchedKeywords, showShadow = true }: Props) {
  const scale = width / A4_WIDTH
  const height = Math.round(A4_HEIGHT * scale)
  const renderTemplate = templateMap[templateId] || templateMap.minimal

  return (
    <div style={{ width, height, overflow: 'hidden', position: 'relative', boxShadow: showShadow ? '0 10px 26px rgba(17,24,39,0.18)' : 'none', borderRadius: 8 }}>
      <div style={{ ...innerBase, transform: `scale(${scale})` }}>
        {renderTemplate({ cv, matchedKeywords })}
      </div>
    </div>
  )
}

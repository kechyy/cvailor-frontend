'use client'
import { useRouter } from 'next/navigation'
import CVThumbnail from './CVThumbnail'
import { useCVBuilderStore } from '@/store/cvBuilderStore'
import type { CVTemplate } from '@/types'

type Props = {
  template: CVTemplate
  isSelected?: boolean
  showReason?: boolean
}

export default function TemplateCard({ template, isSelected = false, showReason = false }: Props) {
  const router = useRouter()
  const { setTemplate } = useCVBuilderStore()

  const handleUse = () => {
    setTemplate(template.id)
    router.push('/dashboard/cv/new')
  }

  return (
    <div className={`tc-card relative cursor-pointer ${isSelected ? 'tc-selected' : ''}`} onClick={handleUse}>
      <div className="clickable-overlay" aria-hidden />

      {/* Badges */}
      {template.isAiRecommended && (
        <div className="badge ai-badge">
          <span style={{ marginRight: 6 }}>✦</span>
          AI Pick
        </div>
      )}
      <div className="badge ats-badge">ATS {template.atsScore}%</div>
      {isSelected && (
        <div className="badge check-badge" aria-label="Selected template">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      )}

      <CVThumbnail templateId={template.id} cv={template.sampleCV} width={190} showShadow={false} />

      <div className="footer">
        <div className="footer-top">
          <span className="name">{template.name}</span>
          <span className="accent-dot" style={{ background: template.accentColor }} />
        </div>
        <div className="tags">
          {template.bestFor.slice(0, 2).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>

      <button type="button" className="tc-btn" onClick={(e) => { e.stopPropagation(); handleUse() }}>
        Use This Template
      </button>

      {showReason && (
        <p className="reason">{template.industryReason}</p>
      )}

      <style jsx>{`
        .tc-card {
          border: 1.5px solid #E5E7EB;
          border-radius: 14px;
          overflow: hidden;
          background: #FFFFFF;
          transition: border-color 0.18s ease, box-shadow 0.18s ease;
        }
        .tc-card:hover {
          border-color: #5B4FCF;
          box-shadow: 0 6px 24px rgba(91,79,207,0.14);
        }
        .tc-card:hover .tc-btn {
          opacity: 1;
          transform: translateY(0);
          pointer-events: all;
        }
        .tc-selected {
          border: 2.5px solid #2ECC8F;
        }
        .clickable-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
        }
        .badge {
          position: absolute;
          z-index: 3;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2px;
          padding: 6px 10px;
          border-radius: 999px;
        }
        .ai-badge {
          top: 10px;
          right: 10px;
          background: #5B4FCF;
          color: #FFFFFF;
          box-shadow: 0 8px 18px rgba(91,79,207,0.3);
        }
        .ats-badge {
          bottom: 12px;
          left: 12px;
          background: rgba(255,255,255,0.78);
          color: #111827;
          backdrop-filter: blur(6px);
          border: 1px solid rgba(229,231,235,0.8);
        }
        .check-badge {
          bottom: 12px;
          right: 12px;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #2ECC8F;
          display: grid;
          place-items: center;
          box-shadow: 0 6px 14px rgba(46,204,143,0.35);
        }
        .footer {
          position: relative;
          z-index: 2;
          background: #FFFFFF;
          border-top: 1px solid #F3F4F6;
          padding: 10px 12px 12px;
        }
        .footer-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 6px;
        }
        .name {
          font-size: 12px;
          font-weight: 600;
          color: #111827;
        }
        .accent-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .tags {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .tags span {
          font-size: 9px;
          color: #9CA3AF;
          padding: 4px 8px;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          background: #F9FAFB;
        }
        .tc-btn {
          position: absolute;
          left: 50%;
          bottom: 60px;
          transform: translate(-50%, 4px);
          padding: 9px 16px;
          background: #5B4FCF;
          color: #FFFFFF;
          font-size: 11px;
          font-weight: 700;
          border: none;
          border-radius: 10px;
          box-shadow: 0 12px 30px rgba(91,79,207,0.22);
          opacity: 0;
          transition: opacity 0.18s ease, transform 0.18s ease;
          pointer-events: none;
          z-index: 4;
        }
        .tc-btn:hover {
          background: #5144c4;
        }
        .reason {
          margin: 6px 10px 10px;
          font-size: 10px;
          color: #9CA3AF;
        }
      `}</style>
    </div>
  )
}

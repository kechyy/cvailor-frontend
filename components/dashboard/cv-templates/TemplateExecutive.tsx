'use client'
import type { CVData } from '@/types'

interface Props { cv: CVData; matchedKeywords?: string[] }

const header = (text: string, accent = '#C9A84C') => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
    <span style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: accent, whiteSpace: 'nowrap' }}>{text}</span>
    <div style={{ flex: 1, height: 1, background: '#E5E7EB' }} />
  </div>
)

export default function TemplateExecutive({ cv }: Props) {
  const { personal, experience = [], education = [], skills = [], languages = [], certifications = [] } = cv

  return (
    <div style={{ width: 794, minHeight: 1123, boxSizing: 'border-box', fontFamily: 'Georgia, "Times New Roman", serif', color: '#0F2044', lineHeight: 1.55 }}>
      {/* Header band */}
      <div style={{ background: '#0F2044', color: '#FFFFFF', padding: '30px 46px 26px', boxSizing: 'border-box' }}>
        <div style={{ fontSize: 26, fontWeight: 800 }}>{personal.fullName || 'Your Name'}</div>
        {personal.jobTitle && <div style={{ fontSize: 12, color: '#C9A84C', fontWeight: 700, marginTop: 6 }}>{personal.jobTitle}</div>}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', fontSize: 10, color: 'rgba(255,255,255,0.8)', marginTop: 10 }}>
          {[personal.email, personal.phone, personal.location, personal.website, personal.linkedin].filter(Boolean).map((item) => <span key={item}>{item}</span>)}
        </div>
      </div>

      <div style={{ display: 'flex', minHeight: 900 }}>
        {/* Left: career history */}
        <div style={{ flex: '0 0 56%', padding: '28px 28px 32px 52px', boxSizing: 'border-box' }}>
          {experience.length > 0 && (
            <section style={{ marginBottom: 18 }}>
              {header('Career History')}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {experience.map((exp) => (
                  <div key={exp.id} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <div style={{ fontSize: 12, fontWeight: 800, color: '#0F2044' }}>{exp.role}</div>
                      <div style={{ fontSize: 10, color: '#6B7280' }}>{exp.startDate} – {exp.endDate}</div>
                    </div>
                    <div style={{ fontSize: 11, color: '#C9A84C', fontStyle: 'italic', fontWeight: 700 }}>{exp.company}</div>
                    <ul style={{ margin: 0, paddingLeft: 18 }}>
                      {exp.bullets?.filter(Boolean).slice(0, 4).map((b, i) => (
                        <li key={i} style={{ color: '#1F2937', fontSize: 10.5, marginBottom: 4, lineHeight: 1.55 }}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right: credentials */}
        <div style={{ flex: '0 0 44%', background: '#F8FAFC', padding: '28px 28px 32px', boxSizing: 'border-box', borderLeft: '1px solid #E9EAEC' }}>
          {personal.summary && (
            <section style={{ marginBottom: 16 }}>
              {header('Executive Summary')}
              <p style={{ margin: 0, fontSize: 11, color: '#1F2937', fontStyle: 'italic' }}>{personal.summary}</p>
            </section>
          )}

          {education.length > 0 && (
            <section style={{ marginBottom: 14 }}>
              {header('Education')}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {education.map((edu) => (
                  <div key={edu.id} style={{ fontSize: 10.5 }}>
                    <div style={{ fontWeight: 700, color: '#0F2044' }}>{edu.degree}</div>
                    <div style={{ color: '#6B7280' }}>{edu.field}</div>
                    <div style={{ color: '#9CA3AF', fontSize: 9.5 }}>{edu.institution} · {edu.year}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {skills.length > 0 && (
            <section style={{ marginBottom: 14 }}>
              {header('Core Competencies')}
              <p style={{ margin: 0, color: '#1F2937', lineHeight: 1.6, fontSize: 10.5 }}>{skills.join(' · ')}</p>
            </section>
          )}

          {certifications.length > 0 && (
            <section style={{ marginBottom: 14 }}>
              {header('Certifications')}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 10.5, color: '#1F2937' }}>
                {certifications.map((c) => (
                  <div key={c} style={{ paddingLeft: 8, borderLeft: '2px solid #C9A84C' }}>{c}</div>
                ))}
              </div>
            </section>
          )}

          {languages.length > 0 && (
            <section>
              {header('Languages')}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, fontSize: 10.5, color: '#1F2937' }}>
                {languages.map((l) => <span key={l}>{l}</span>)}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

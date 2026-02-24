'use client'
import type { CVData } from '@/types'

interface Props { cv: CVData; matchedKeywords?: string[] }

const header = (title: string) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
    <span style={{ fontSize: 8.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: '#374151', whiteSpace: 'nowrap' }}>{title}</span>
    <div style={{ flex: 1, height: 1, background: '#E5E7EB' }} />
  </div>
)

export default function TemplateAcademic({ cv }: Props) {
  const { personal, experience = [], education = [], skills = [], languages = [], certifications = [] } = cv

  return (
    <div style={{ width: 794, minHeight: 1123, boxSizing: 'border-box', padding: '44px 52px', background: '#FFFFFF', fontFamily: 'Inter, -apple-system, Helvetica Neue, sans-serif', color: '#111827', lineHeight: 1.5, fontSize: 10 }}>
      <header style={{ marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ fontSize: 24, fontWeight: 800 }}>{personal.fullName || 'Your Name'}</div>
        {personal.jobTitle && <div style={{ fontSize: 11.5, color: '#6B7280', marginTop: 2 }}>{personal.jobTitle}</div>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, fontSize: 9.5, color: '#6B7280', marginTop: 8 }}>
          {[personal.email, personal.phone, personal.location, personal.website, personal.linkedin].filter(Boolean).map((item) => <span key={item}>{item}</span>)}
        </div>
      </header>

      {personal.summary && (
        <section style={{ marginBottom: 14 }}>
          {header('Research Profile')}
          <p style={{ margin: 0, color: '#1F2937', lineHeight: 1.6 }}>{personal.summary}</p>
        </section>
      )}

      {education.length > 0 && (
        <section style={{ marginBottom: 14 }}>
          {header('Education')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {education.map((edu) => (
              <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 700 }}>{edu.degree} in {edu.field}</div>
                  <div style={{ color: '#6B7280' }}>{edu.institution}</div>
                </div>
                <div style={{ color: '#9CA3AF' }}>{edu.year}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {experience.length > 0 && (
        <section style={{ marginBottom: 14 }}>
          {header('Research & Professional Experience')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {experience.map((exp) => (
              <div key={exp.id} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div style={{ fontSize: 11, fontWeight: 700 }}>{exp.role}</div>
                  <div style={{ fontSize: 9.5, color: '#6B7280' }}>{exp.startDate} – {exp.endDate}</div>
                </div>
                <div style={{ fontSize: 10.5, color: '#4B5563' }}>{exp.company}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {exp.bullets?.filter(Boolean).slice(0, 5).map((b, i) => (
                    <div key={i} style={{ fontSize: 10, color: '#374151' }}>• {b}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section style={{ marginBottom: certifications.length > 0 || languages.length > 0 ? 12 : 0 }}>
          {header('Skills & Technical Expertise')}
          <p style={{ margin: 0, color: '#1F2937', lineHeight: 1.6 }}>{skills.join(' · ')}</p>
        </section>
      )}

      {certifications.length > 0 && (
        <section style={{ marginBottom: languages.length > 0 ? 12 : 0 }}>
          {header('Certifications & Awards')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {certifications.map((c) => <span key={c}>{c}</span>)}
          </div>
        </section>
      )}

      {languages.length > 0 && (
        <section>
          {header('Languages')}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {languages.map((l) => <span key={l}>{l}</span>)}
          </div>
        </section>
      )}
    </div>
  )
}

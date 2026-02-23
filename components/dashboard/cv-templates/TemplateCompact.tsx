'use client'
import type { CSSProperties } from 'react'
import type { CVData } from '@/types'

interface Props { cv: CVData; matchedKeywords?: string[] }

const palette = {
  accent: '#1D4ED8',
  text: '#1F2937',
  muted: '#6B7280',
}

const root: CSSProperties = {
  width: 794,
  minHeight: 1123,
  boxSizing: 'border-box',
  padding: '44px 48px',
  background: '#FFFFFF',
  fontFamily: 'Inter, -apple-system, sans-serif',
  color: palette.text,
  lineHeight: 1.4,
}

const sectionLabel = (label: string) => (
  <div style={{ position: 'relative', textAlign: 'center', margin: '12px 0 8px' }}>
    <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: '#E2E8F0' }} />
    <span
      style={{
        position: 'relative', background: '#FFFFFF', padding: '0 10px', fontSize: 9, fontWeight: 700,
        textTransform: 'uppercase', letterSpacing: 2, color: palette.accent,
      }}
    >
      {label}
    </span>
  </div>
)

export default function TemplateCompact({ cv }: Props) {
  const { personal, experience = [], education = [], skills = [], languages = [], certifications = [] } = cv
  const contacts = [personal.email, personal.phone, personal.location, personal.website, personal.linkedin].filter(Boolean)

  return (
    <div style={root}>
      <header style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 20, fontWeight: 800 }}>{personal.fullName || 'Your Name'}</div>
        <div style={{ fontSize: 10.5, color: palette.muted }}>{personal.jobTitle || ''}</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', fontSize: 9.5, color: palette.muted, marginTop: 6 }}>
          {contacts.map((c, i) => (
            <span key={c}>{c}{i < contacts.length - 1 ? ' · ' : ''}</span>
          ))}
        </div>
      </header>

      {education.length > 0 && (
        <section>
          {sectionLabel('Education')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {education.map((edu) => (
              <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10 }}>
                <div><strong>{edu.degree}</strong> in {edu.field}, {edu.institution}</div>
                <span style={{ color: palette.muted }}>{edu.year}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {certifications.length > 0 && (
        <section>
          {sectionLabel('Publications / Certifications')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {certifications.map((cert) => (
              <div key={cert} style={{ fontSize: 10 }}>{cert}</div>
            ))}
          </div>
        </section>
      )}

      {experience.length > 0 && (
        <section>
          {sectionLabel('Experience')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {experience.map((exp) => (
              <div key={exp.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, fontWeight: 800 }}>
                  <span>{exp.role} — {exp.company}</span>
                  <span style={{ color: palette.muted }}>{exp.startDate} – {exp.endDate}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 4 }}>
                  {exp.bullets?.filter(Boolean).map((b, i) => (
                    <div key={i} style={{ fontSize: 10, color: palette.text }}>• {b}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section>
          {sectionLabel('Skills')}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, fontSize: 9 }}>
            {skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </section>
      )}

      {languages.length > 0 && (
        <section style={{ marginBottom: 6 }}>
          {sectionLabel('Languages')}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', fontSize: 9.5 }}>
            {languages.map((lang) => <span key={lang}>{lang}</span>)}
          </div>
        </section>
      )}

      {personal.summary && (
        <section>
          {sectionLabel('Summary')}
          <p style={{ margin: 0, fontSize: 10.5 }}>{personal.summary}</p>
        </section>
      )}
    </div>
  )
}

'use client'
import type { CSSProperties } from 'react'
import type { CVData } from '@/types'

interface Props { cv: CVData; matchedKeywords?: string[] }

const palette = {
  name: '#0F172A',
  accent: '#4F46E5',
  body: '#334155',
  muted: '#64748B',
  tagBg: '#F1F5F9',
  tagBorder: '#E2E8F0',
}

const root: CSSProperties = {
  width: 794,
  minHeight: 1123,
  boxSizing: 'border-box',
  padding: '52px 56px 48px',
  background: '#FFFFFF',
  fontFamily: 'Inter, -apple-system, sans-serif',
  color: palette.body,
  lineHeight: 1.5,
}

const sectionHeading = (label: string) => (
  <div style={{ margin: '0 0 10px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ fontSize: 10, letterSpacing: 1.4, textTransform: 'uppercase', fontWeight: 800, color: palette.accent }}>{label}</span>
    </div>
    <div style={{ height: 1, background: '#E2E8F0', marginTop: 6 }} />
  </div>
)

export default function TemplateMinimal({ cv }: Props) {
  const { personal, experience = [], education = [], skills = [], certifications = [] } = cv
  const contacts = [personal.email, personal.phone, personal.location, personal.website, personal.linkedin].filter(Boolean)
  const languages = cv.languages || []

  return (
    <div style={root}>
      <header style={{ marginBottom: 26 }}>
        <div style={{ fontSize: 28, fontWeight: 800, color: palette.name }}>{personal.fullName || 'Your Name'}</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: palette.accent, marginTop: 4 }}>{personal.jobTitle || ''}</div>
        <div style={{ width: 60, height: 2, background: palette.accent, margin: '12px 0' }} />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, fontSize: 10, color: palette.muted }}>
          {contacts.map((c, i) => (
            <span key={c}>{c}{i < contacts.length - 1 ? ' · ' : ''}</span>
          ))}
        </div>
      </header>

      {personal.summary && (
        <section style={{ marginBottom: 18 }}>
          {sectionHeading('Summary')}
          <p style={{ margin: 0, fontSize: 12.5, color: palette.body }}>{personal.summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section style={{ marginBottom: 18 }}>
          {sectionHeading('Experience')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {experience.map((exp) => (
              <div key={exp.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: 11.5, fontWeight: 700, color: palette.name }}>
                    {exp.role}
                    <span style={{ fontWeight: 600, color: palette.accent }}> · {exp.company}</span>
                  </div>
                  <div style={{ fontSize: 10, color: palette.muted, flexShrink: 0 }}>{exp.startDate} – {exp.endDate}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 6 }}>
                  {exp.bullets?.filter(Boolean).map((b, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, fontSize: 11.5, color: palette.body }}>
                      <div style={{ width: 4, height: 4, borderRadius: 999, background: palette.accent, marginTop: 6 }} />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section style={{ marginBottom: 18 }}>
          {sectionHeading('Skills')}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {skills.map((skill) => (
              <span
                key={skill}
                style={{
                  fontFamily: 'JetBrains Mono, Courier New, monospace',
                  fontSize: 11,
                  background: palette.tagBg,
                  border: `1px solid ${palette.tagBorder}`,
                  color: palette.body,
                  padding: '6px 10px',
                  borderRadius: 6,
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section style={{ marginBottom: 16 }}>
          {sectionHeading('Education')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {education.map((edu) => (
              <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5 }}>
                <div>
                  <div style={{ fontWeight: 700, color: palette.name }}>{edu.degree} in {edu.field}</div>
                  <div style={{ color: palette.muted }}>{edu.institution}</div>
                </div>
                <div style={{ color: palette.muted }}>{edu.year}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {certifications.length > 0 && (
        <section>
          {sectionHeading('Certifications')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {certifications.map((cert) => (
              <span key={cert} style={{ fontSize: 11.5, color: palette.body }}>{cert}</span>
            ))}
          </div>
        </section>
      )}

      {languages.length > 0 && (
        <section style={{ marginTop: 14 }}>
          {sectionHeading('Languages')}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', fontSize: 11.5, color: palette.body }}>
            {languages.map((lang) => <span key={lang}>{lang}</span>)}
          </div>
        </section>
      )}
    </div>
  )
}

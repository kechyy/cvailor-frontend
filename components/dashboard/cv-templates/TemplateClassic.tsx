'use client'
import type { CSSProperties } from 'react'
import type { CVData } from '@/types'

interface Props { cv: CVData; matchedKeywords?: string[] }

const palette = {
  name: '#111827',
  text: '#374151',
  muted: '#6B7280',
  rule: '#111827',
}

const root: CSSProperties = {
  width: 794,
  minHeight: 1123,
  boxSizing: 'border-box',
  padding: '56px 58px',
  background: '#FFFFFF',
  fontFamily: 'Georgia, Times New Roman, serif',
  color: palette.text,
  lineHeight: 1.5,
}

const sectionTitle = (label: string) => (
  <div style={{ margin: '0 0 10px' }}>
    <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, textAlign: 'left', color: palette.name }}>{label}</div>
    <div style={{ height: 1, background: palette.rule, marginTop: 4 }} />
  </div>
)

export default function TemplateClassic({ cv }: Props) {
  const { personal, experience = [], education = [], skills = [], certifications = [], languages = [] } = cv
  const contacts = [personal.email, personal.phone, personal.location, personal.website, personal.linkedin].filter(Boolean)

  return (
    <div style={root}>
      <header style={{ textAlign: 'center' }}>
        <div style={{ fontVariant: 'small-caps', fontSize: 26, fontWeight: 700, color: palette.name }}>{personal.fullName || 'Your Name'}</div>
        <div style={{ fontStyle: 'italic', fontSize: 12, color: palette.text, marginTop: 4 }}>{personal.jobTitle || ''}</div>
        <div style={{ marginTop: 12 }}>
          <div style={{ height: 2, background: palette.rule }} />
          <div style={{ height: 0.5, background: palette.rule, marginTop: 4 }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap', fontSize: 9.5, color: palette.text, marginTop: 8 }}>
          {contacts.map((c, i) => (
            <span key={c}>{c}{i < contacts.length - 1 ? ' · ' : ''}</span>
          ))}
        </div>
      </header>

      {personal.summary && (
        <section style={{ marginTop: 20, marginBottom: 18 }}>
          {sectionTitle('Professional Summary')}
          <p style={{ margin: 0, fontSize: 11.5, fontStyle: 'italic' }}>{personal.summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section style={{ marginBottom: 18 }}>
          {sectionTitle('Experience')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {experience.map((exp) => (
              <div key={exp.id} style={{ borderBottom: '1px solid #E5E7EB', paddingBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: 12, fontWeight: 700 }}>{exp.role}</div>
                  <div style={{ fontSize: 9.5, color: palette.muted }}>{exp.startDate} – {exp.endDate}</div>
                </div>
                <div style={{ fontSize: 11, fontStyle: 'italic', color: '#4B5563', marginTop: 2 }}>{exp.company}</div>
                <ul style={{ margin: '6px 0 0', paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {exp.bullets?.filter(Boolean).map((b, i) => (
                    <li key={i} style={{ fontSize: 11, color: palette.text }}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section style={{ marginBottom: 18 }}>
          {sectionTitle('Education')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {education.map((edu) => (
              <div key={edu.id} style={{ fontSize: 11.5 }}>
                <div style={{ fontWeight: 700 }}>{edu.degree} in {edu.field}</div>
                <div style={{ color: palette.text }}>{edu.institution} — <span style={{ color: palette.muted }}>{edu.year}</span></div>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section style={{ marginBottom: 16 }}>
          {sectionTitle('Skills & Qualifications')}
          <div style={{ fontSize: 11, color: palette.text, lineHeight: 1.6 }}>
            {skills.map((skill, idx) => (
              <span key={skill}>
                {skill}{idx < skills.length - 1 ? ' · ' : ''}
              </span>
            ))}
          </div>
        </section>
      )}

      {certifications.length > 0 && (
        <section>
          {sectionTitle('Certifications')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 11 }}>
            {certifications.map((cert) => (
              <span key={cert}>{cert}</span>
            ))}
          </div>
        </section>
      )}

      {languages.length > 0 && (
        <section style={{ marginTop: 12 }}>
          {sectionTitle('Languages')}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', fontSize: 11, color: palette.text }}>
            {languages.map((lang) => <span key={lang}>{lang}</span>)}
          </div>
        </section>
      )}
    </div>
  )
}

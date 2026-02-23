'use client'
import type { CSSProperties } from 'react'
import type { CVData } from '@/types'

interface Props { cv: CVData; matchedKeywords?: string[] }

const palette = {
  accent: '#0D9488',
  name: '#FFFFFF',
  body: '#0F172A',
  muted: 'rgba(255,255,255,0.7)',
  chipBg: '#F0FDFA',
  chipBorder: '#99F6E4',
}

const root: CSSProperties = {
  width: 794,
  minHeight: 1123,
  boxSizing: 'border-box',
  background: '#FFFFFF',
  fontFamily: 'Inter, -apple-system, sans-serif',
  color: palette.body,
  lineHeight: 1.5,
}

const sectionLabel = (text: string) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 10px' }}>
    <div style={{ width: 4, height: 20, background: palette.accent }} />
    <div style={{ fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase', fontWeight: 800, color: palette.accent }}>{text}</div>
  </div>
)

export default function TemplateClean({ cv }: Props) {
  const { personal, experience = [], education = [], skills = [], certifications = [], languages = [] } = cv

  return (
    <div style={root}>
      <div style={{ background: palette.accent, padding: '36px 48px 32px', minHeight: 240, color: palette.name, boxSizing: 'border-box' }}>
        <div style={{ fontSize: 26, fontWeight: 800 }}>{personal.fullName || 'Your Name'}</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 4 }}>{personal.jobTitle || ''}</div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', fontSize: 10, color: palette.muted, marginTop: 10 }}>
          {[personal.email, personal.phone, personal.location, personal.website, personal.linkedin].filter(Boolean).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>

      <div style={{ padding: '28px 48px 32px' }}>
        {personal.summary && (
          <section style={{ marginBottom: 18 }}>
            {sectionLabel('Profile')}
            <p style={{ margin: 0, fontSize: 12.5 }}>{personal.summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section style={{ marginBottom: 18 }}>
            {sectionLabel('Experience')}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: 12.5, fontWeight: 800, color: palette.body }}>{exp.role}</div>
                    <div style={{ fontSize: 10, color: '#4B5563', flexShrink: 0 }}>{exp.startDate} – {exp.endDate}</div>
                  </div>
                  <div style={{ fontSize: 11.5, color: palette.accent, fontWeight: 700, marginTop: 2 }}>{exp.company}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 6 }}>
                    {exp.bullets?.filter(Boolean).map((b, i) => (
                      <div key={i} style={{ display: 'flex', gap: 8, fontSize: 11.5, color: palette.body }}>
                        <div style={{ width: 4, height: 4, background: palette.accent, marginTop: 7, borderRadius: 999 }} />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {certifications.length > 0 && (
          <section style={{ marginBottom: 16 }}>
            {sectionLabel('Certifications')}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {certifications.map((cert) => (
                <span key={cert} style={{ fontSize: 11.5, fontWeight: 700, color: palette.accent }}>{cert}</span>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section style={{ marginBottom: 16 }}>
            {sectionLabel('Education')}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {education.map((edu) => (
                <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5 }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{edu.degree} in {edu.field}</div>
                    <div style={{ color: '#6B7280' }}>{edu.institution}</div>
                  </div>
                  <div style={{ color: '#6B7280' }}>{edu.year}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section style={{ marginBottom: 14 }}>
            {sectionLabel('Skills')}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {skills.map((skill) => (
                <span key={skill} style={{ fontSize: 11.5, padding: '6px 10px', background: palette.chipBg, border: `1px solid ${palette.chipBorder}`, borderRadius: 8, color: palette.body }}>
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {languages.length > 0 && (
          <section>
            {sectionLabel('Languages')}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', fontSize: 11.5 }}>
              {languages.map((lang) => <span key={lang}>{lang}</span>)}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

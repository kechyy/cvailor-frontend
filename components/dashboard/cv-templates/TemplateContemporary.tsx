'use client'
import type { CSSProperties } from 'react'
import type { CVData } from '@/types'

interface Props { cv: CVData; matchedKeywords?: string[] }

const palette = {
  accent: '#2563EB',
  sidebar: '#EFF6FF',
  name: '#0F172A',
  body: '#374151',
  muted: '#6B7280',
}

const root: CSSProperties = {
  width: 794,
  minHeight: 1123,
  boxSizing: 'border-box',
  display: 'flex',
  background: '#FFFFFF',
  fontFamily: 'Inter, -apple-system, sans-serif',
  color: palette.body,
  lineHeight: 1.5,
}

const sectionTitle = (label: string) => (
  <div style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 800, color: palette.accent, marginBottom: 8 }}>{label}</div>
)

export default function TemplateContemporary({ cv }: Props) {
  const { personal, experience = [], education = [], skills = [], languages = [], certifications = [] } = cv

  return (
    <div style={root}>
      <div style={{ flex: 1, padding: '32px 32px 32px 40px', boxSizing: 'border-box' }}>
        <header style={{ marginBottom: 18 }}>
          <div style={{ borderLeft: `4px solid ${palette.accent}`, paddingLeft: 12 }}>
            <div style={{ fontSize: 26, fontWeight: 900, color: palette.name }}>{personal.fullName || 'Your Name'}</div>
            <div style={{ fontSize: 13, color: palette.muted, marginTop: 4 }}>{personal.jobTitle || ''}</div>
          </div>
        </header>

        {personal.summary && (
          <section style={{ marginBottom: 16 }}>
            {sectionTitle('Professional Summary')}
            <p style={{ margin: 0, fontSize: 12.5 }}>{personal.summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section style={{ marginBottom: 16 }}>
            {sectionTitle('Experience')}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {experience.map((exp) => (
                <div key={exp.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 800 }}>{exp.role}</div>
                    <div style={{ fontSize: 11.5, color: palette.accent, fontWeight: 700 }}>{exp.company}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 6 }}>
                      {exp.bullets?.filter(Boolean).map((b, i) => (
                        <div key={i} style={{ fontSize: 11.5, color: palette.body }}>• {b}</div>
                      ))}
                    </div>
                  </div>
                  <div style={{ fontSize: 10.5, color: palette.muted, flexShrink: 0 }}>{exp.startDate} – {exp.endDate}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section>
            {sectionTitle('Education')}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {education.map((edu) => (
                <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5 }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{edu.degree} in {edu.field}</div>
                    <div style={{ color: palette.muted }}>{edu.institution}</div>
                  </div>
                  <div style={{ color: palette.muted }}>{edu.year}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <aside style={{ width: 240, background: palette.sidebar, padding: '26px 22px', boxSizing: 'border-box', flexShrink: 0, minHeight: 1123 }}>
        <div style={{ marginBottom: 14 }}>
          {sectionTitle('Contact')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 11 }}>
            {[personal.email, personal.phone, personal.location, personal.website, personal.linkedin].filter(Boolean).map((item) => (
              <div key={item} style={{ display: 'flex', gap: 8 }}>
                <div style={{ width: 4, height: 4, background: palette.accent, marginTop: 6 }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {certifications.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            {sectionTitle('Certifications')}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 11 }}>
              {certifications.map((cert) => (
                <div key={cert} style={{ display: 'flex', gap: 8 }}>
                  <div style={{ width: 4, height: 4, background: palette.accent, marginTop: 6 }} />
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {skills.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            {sectionTitle('Skills')}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 11 }}>
              {skills.map((skill) => (
                <div key={skill} style={{ display: 'flex', gap: 8 }}>
                  <div style={{ width: 4, height: 4, background: palette.accent, marginTop: 6 }} />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {languages.length > 0 && (
          <div>
            {sectionTitle('Languages')}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 11 }}>
              {languages.map((lang) => (
                <div key={lang} style={{ display: 'flex', gap: 8 }}>
                  <div style={{ width: 4, height: 4, background: palette.accent, marginTop: 6 }} />
                  <span>{lang}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>
    </div>
  )
}

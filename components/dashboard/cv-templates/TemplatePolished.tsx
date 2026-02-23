'use client'
import type { CSSProperties } from 'react'
import type { CVData } from '@/types'

interface Props { cv: CVData; matchedKeywords?: string[] }

const palette = {
  sidebar: '#1E293B',
  amber: '#F59E0B',
  body: '#374151',
  heading: '#0F172A',
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

const headerBlock = (text: string) => (
  <div style={{ borderLeft: `2px solid ${palette.amber}`, paddingLeft: 10, marginBottom: 10 }}>
    <div style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 800, color: palette.heading }}>{text}</div>
  </div>
)

export default function TemplatePolished({ cv }: Props) {
  const { personal, experience = [], education = [], skills = [], certifications = [], languages = [] } = cv

  return (
    <div style={root}>
      <aside style={{ width: 210, background: palette.sidebar, color: '#FFFFFF', padding: '28px 20px', boxSizing: 'border-box' }}>
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 17, fontWeight: 800 }}>{personal.fullName || 'Your Name'}</div>
          <div style={{ fontSize: 10, color: palette.amber, fontWeight: 700, marginTop: 4 }}>{personal.jobTitle || ''}</div>
          <div style={{ height: 1, background: palette.amber, margin: '10px 0' }} />
        </div>

        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 800, color: palette.amber, marginBottom: 8 }}>Contact</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 10.5, color: 'rgba(255,255,255,0.82)' }}>
            {[personal.email, personal.phone, personal.location, personal.website, personal.linkedin].filter(Boolean).map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        {skills.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 800, color: palette.amber, marginBottom: 8 }}>Expertise</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 10.5 }}>
              {skills.map((skill) => (
                <div key={skill} style={{ display: 'flex', gap: 8 }}>
                  <div style={{ width: 4, height: 4, background: palette.amber, marginTop: 6 }} />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {languages.length > 0 && (
          <div>
            <div style={{ fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 800, color: palette.amber, marginBottom: 8 }}>Languages</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 10.5 }}>
              {languages.map((lang) => (
                <div key={lang} style={{ display: 'flex', gap: 8 }}>
                  <div style={{ width: 4, height: 4, background: palette.amber, marginTop: 6 }} />
                  <span>{lang}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      <main style={{ flex: 1, padding: '30px 34px', boxSizing: 'border-box' }}>
        {personal.summary && (
          <section style={{ marginBottom: 16 }}>
            {headerBlock('Executive Profile')}
            <p style={{ margin: 0, fontSize: 12 }}>{personal.summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section style={{ marginBottom: 16 }}>
            {headerBlock('Career History')}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {experience.map((exp) => (
                <div key={exp.id} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 800, color: palette.heading }}>{exp.company}</div>
                      <div style={{ fontSize: 12, color: palette.amber, fontWeight: 700 }}>{exp.role}</div>
                    </div>
                    <div style={{ fontSize: 10.5, color: palette.muted }}>{exp.startDate} – {exp.endDate}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {exp.bullets?.filter(Boolean).map((b, i) => (
                      <div key={i} style={{ fontSize: 11.5, color: palette.body, display: 'flex', gap: 8 }}>
                        <span style={{ color: palette.amber }}>▸</span>
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section style={{ marginBottom: 12 }}>
            {headerBlock('Education & Qualifications')}
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

        {certifications.length > 0 && (
          <section>
            {headerBlock('Certifications')}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 11.5 }}>
              {certifications.map((cert) => (
                <span key={cert}>{cert}</span>
              ))}
            </div>
          </section>
        )}

        {languages.length > 0 && (
          <section style={{ marginTop: 12 }}>
            {headerBlock('Languages')}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', fontSize: 11.5 }}>
              {languages.map((lang) => <span key={lang}>{lang}</span>)}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

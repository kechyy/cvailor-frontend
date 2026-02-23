'use client'
import type { CSSProperties } from 'react'
import type { CVData } from '@/types'

interface Props { cv: CVData; matchedKeywords?: string[] }

const palette = {
  page: '#FFFBF5',
  pink: '#FB7185',
  orange: '#FB923C',
  text: '#0F172A',
  muted: '#6B7280',
}

const root: CSSProperties = {
  width: 794,
  minHeight: 1123,
  boxSizing: 'border-box',
  background: palette.page,
  fontFamily: 'Inter, -apple-system, sans-serif',
  color: palette.text,
  lineHeight: 1.5,
}

const underline = { width: 28, height: 2, background: palette.orange, marginTop: 4 }

export default function TemplateCreative({ cv }: Props) {
  const { personal, experience = [], education = [], skills = [], certifications = [], languages = [] } = cv

  return (
    <div style={root}>
      <div style={{ display: 'flex', width: 794, minHeight: 140 }}>
        <div style={{ flex: 1, background: palette.page, padding: '40px 36px 32px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <h1 style={{ fontSize: 30, fontWeight: 900, color: palette.text, margin: '0 0 6px', lineHeight: 1.1 }}>{personal.fullName || 'Your Name'}</h1>
          <p style={{ fontSize: 13, color: palette.orange, margin: 0, fontWeight: 700 }}>{personal.jobTitle || ''}</p>
        </div>
        <div style={{ width: 240, background: palette.pink, padding: '40px 28px 32px', flexShrink: 0, boxSizing: 'border-box' }}>
          <div style={{ fontSize: 8, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.5, color: 'rgba(255,255,255,0.7)', marginBottom: 12 }}>Contact</div>
          {[personal.email, personal.phone, personal.location, personal.website, personal.linkedin].filter(Boolean).map((item) => (
            <div key={item} style={{ fontSize: 9.5, color: '#FFFFFF', marginBottom: 6, wordBreak: 'break-word' }}>{item}</div>
          ))}
        </div>
      </div>

      <div style={{ padding: '26px 40px 34px' }}>
        {personal.summary && (
          <section style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 800 }}>About</div>
            <div style={underline} />
            <p style={{ margin: '8px 0 0', fontSize: 12.5 }}>{personal.summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 800 }}>Experience</div>
            <div style={underline} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>
              {experience.map((exp) => (
                <div key={exp.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: 12.5, fontWeight: 800 }}>{exp.role}</div>
                    <div style={{ fontSize: 11.5, color: palette.pink, fontWeight: 700 }}>{exp.company}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 6 }}>
                      {exp.bullets?.filter(Boolean).map((b, i) => (
                        <div key={i} style={{ fontSize: 11.5, color: palette.text }}>→ {b}</div>
                      ))}
                    </div>
                  </div>
                  <div style={{ fontSize: 10.5, color: palette.muted, flexShrink: 0 }}>{exp.startDate} – {exp.endDate}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 800 }}>Selected Skills</div>
            <div style={underline} />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
              {skills.map((skill) => (
                <span key={skill} style={{ fontSize: 11.5, padding: '6px 10px', background: '#FFFFFF', border: `1px solid ${palette.pink}`, borderRadius: 999, color: palette.pink, fontWeight: 700 }}>{skill}</span>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 800 }}>Education</div>
            <div style={underline} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
              {education.map((edu) => (
                <div key={edu.id} style={{ fontSize: 11.5, display: 'flex', justifyContent: 'space-between' }}>
                  <span>{edu.degree} · {edu.institution}</span>
                  <span style={{ color: palette.muted }}>{edu.year}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {certifications.length > 0 && (
          <section>
            <div style={{ fontSize: 13, fontWeight: 800 }}>Certifications</div>
            <div style={underline} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8, fontSize: 11.5 }}>
              {certifications.map((cert) => (
                <span key={cert}>→ {cert}</span>
              ))}
            </div>
          </section>
        )}

        {languages.length > 0 && (
          <section style={{ marginTop: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 800 }}>Languages</div>
            <div style={underline} />
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 8, fontSize: 11.5 }}>
              {languages.map((lang) => <span key={lang}>→ {lang}</span>)}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

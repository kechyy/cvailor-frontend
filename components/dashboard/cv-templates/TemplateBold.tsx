'use client'
import type { CSSProperties } from 'react'
import type { CVData } from '@/types'

interface Props { cv: CVData; matchedKeywords?: string[] }

const palette = {
  bg: '#0F172A',
  gradient: 'linear-gradient(135deg, #F97316 0%, #EC4899 50%, #8B5CF6 100%)',
  text: '#E2E8F0',
  accent: '#F97316',
  muted: '#94A3B8',
}

const root: CSSProperties = {
  width: 794,
  minHeight: 1123,
  boxSizing: 'border-box',
  background: palette.bg,
  color: palette.text,
  fontFamily: 'Inter, -apple-system, sans-serif',
  lineHeight: 1.5,
}

export default function TemplateBold({ cv }: Props) {
  const { personal, experience = [], education = [], skills = [], certifications = [], languages = [] } = cv

  return (
    <div style={root}>
      <div style={{ background: palette.gradient, padding: '34px 42px', color: '#0B1021' }}>
        <div style={{ fontSize: 28, fontWeight: 900 }}>{personal.fullName || 'Your Name'}</div>
        <div style={{ fontSize: 14, marginTop: 6, fontWeight: 700 }}>{personal.jobTitle || ''}</div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', fontSize: 12, marginTop: 10 }}>
          {[personal.email, personal.phone, personal.location, personal.website, personal.linkedin].filter(Boolean).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>

      <div style={{ padding: '30px 42px 36px' }}>
        {skills.length > 0 && (
          <section style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 800, color: palette.accent, marginBottom: 10 }}>Core Skills</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {skills.map((skill, idx) => (
                <div key={skill}>
                  <div style={{ fontSize: 11.5, color: palette.text, marginBottom: 4 }}>{skill}</div>
                  <div style={{ height: 6, background: '#111827', borderRadius: 999 }}>
                    <div style={{ height: 6, width: `${78 + (idx % 4) * 6}%`, background: palette.accent, borderRadius: 999 }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {experience.length > 0 && (
          <section style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 800, color: palette.accent, marginBottom: 12 }}>Experience</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {experience.map((exp) => (
                <div key={exp.id} style={{ borderLeft: `2px solid ${palette.accent}`, paddingLeft: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: 13.5, fontWeight: 800 }}>{exp.role}</div>
                    <div style={{ fontSize: 11, color: palette.muted }}>{exp.startDate} – {exp.endDate}</div>
                  </div>
                  <div style={{ fontSize: 12, color: palette.accent, fontWeight: 700, marginTop: 2 }}>{exp.company}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
                    {exp.bullets?.filter(Boolean).map((b, i) => (
                      <div key={i} style={{ display: 'flex', gap: 8, fontSize: 12, color: palette.text }}>
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

        {education.length > 0 && (
          <section style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 800, color: palette.accent, marginBottom: 10 }}>Education</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {education.map((edu) => (
                <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5 }}>
                  <div>
                    <div style={{ fontWeight: 800 }}>{edu.degree} in {edu.field}</div>
                    <div style={{ color: palette.muted }}>{edu.institution}</div>
                  </div>
                  <div style={{ color: palette.muted }}>{edu.year}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {certifications.length > 0 && (
          <section style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 800, color: palette.accent, marginBottom: 8 }}>Certifications</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 11.5 }}>
              {certifications.map((cert) => <span key={cert}>{cert}</span>)}
            </div>
          </section>
        )}

        {languages.length > 0 && (
          <section>
            <div style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 800, color: palette.accent, marginBottom: 8 }}>Languages</div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', fontSize: 11.5 }}>
              {languages.map((lang) => <span key={lang}>{lang}</span>)}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

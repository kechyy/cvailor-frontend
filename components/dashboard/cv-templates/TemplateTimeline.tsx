'use client'
import type { CSSProperties } from 'react'
import type { CVData } from '@/types'

interface Props { cv: CVData; matchedKeywords?: string[] }

const palette = {
  header: '#0D9488',
  body: '#111827',
  spine: '#CCFBF1',
  dot: '#0D9488',
  tag: '#F1F5F9',
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

const sectionTitle = (label: string) => (
  <div style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 800, color: palette.dot, marginBottom: 10 }}>{label}</div>
)

export default function TemplateTimeline({ cv }: Props) {
  const { personal, experience = [], education = [], skills = [], certifications = [], languages = [] } = cv

  return (
    <div style={root}>
      <div style={{ background: palette.header, color: '#FFFFFF', padding: '26px 32px' }}>
        <div style={{ fontSize: 26, fontWeight: 900 }}>{personal.fullName || 'Your Name'}</div>
        <div style={{ fontSize: 13, marginTop: 4 }}>{personal.jobTitle || ''}</div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', fontSize: 11, marginTop: 10 }}>
          {[personal.email, personal.phone, personal.location, personal.website, personal.linkedin].filter(Boolean).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>

      <div style={{ padding: '24px 32px 30px' }}>
        {personal.summary && (
          <section style={{ marginBottom: 16 }}>
            {sectionTitle('Profile')}
            <p style={{ margin: 0, fontSize: 12.5 }}>{personal.summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section style={{ marginBottom: 18 }}>
            {sectionTitle('Experience')}
            <div style={{ position: 'relative', paddingLeft: 32 }}>
              <div style={{ position: 'absolute', left: 8, top: 6, bottom: 6, width: 2, background: palette.spine }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {experience.map((exp) => (
                  <div key={exp.id} style={{ position: 'relative', marginBottom: 0 }}>
                    <div style={{
                      position: 'absolute', left: -28, top: 4,
                      width: 14, height: 14, borderRadius: '50%',
                      background: '#FFFFFF', border: `2.5px solid ${palette.dot}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <div style={{ width: 5, height: 5, borderRadius: '50%', background: palette.dot }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ fontSize: 13, fontWeight: 800 }}>{exp.role}</div>
                      <div style={{ fontSize: 10.5, color: '#6B7280' }}>{exp.startDate} – {exp.endDate}</div>
                    </div>
                    <div style={{ fontSize: 11.5, color: '#374151', marginTop: 2, fontWeight: 700 }}>{exp.company}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 6 }}>
                      {exp.bullets?.filter(Boolean).map((b, i) => (
                        <div key={i} style={{ fontSize: 11.5, color: '#374151' }}>• {b}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section style={{ marginBottom: 16 }}>
            {sectionTitle('Skills')}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {skills.map((skill) => (
                <span key={skill} style={{ fontSize: 11, background: palette.tag, padding: '6px 10px', borderRadius: 8 }}>{skill}</span>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section>
            {sectionTitle('Education')}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {education.map((edu) => (
                <div key={edu.id} style={{ fontSize: 11.5, display: 'flex', justifyContent: 'space-between' }}>
                  <span>{edu.degree} in {edu.field} — {edu.institution}</span>
                  <span style={{ color: '#6B7280' }}>{edu.year}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {certifications.length > 0 && (
          <section style={{ marginTop: 14 }}>
            {sectionTitle('Certifications')}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 11.5 }}>
              {certifications.map((cert) => <span key={cert}>{cert}</span>)}
            </div>
          </section>
        )}

        {languages.length > 0 && (
          <section style={{ marginTop: 14 }}>
            {sectionTitle('Languages')}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', fontSize: 11.5 }}>
              {languages.map((lang) => <span key={lang}>{lang}</span>)}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

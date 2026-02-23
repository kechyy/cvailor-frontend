'use client'
import type { CSSProperties } from 'react'
import type { CVData } from '@/types'

interface Props { cv: CVData; matchedKeywords?: string[] }

const palette = {
  header: '#0F2044',
  gold: '#C9A84C',
  body: '#1F2937',
  muted: '#6B7280',
  panel: '#F8FAFC',
  border: '#E5E7EB',
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

const label = (text: string) => (
  <div style={{ fontSize: 10.5, letterSpacing: 1.2, textTransform: 'uppercase', fontWeight: 800, color: palette.gold, marginBottom: 10 }}>{text}</div>
)

export default function TemplateExecutive({ cv }: Props) {
  const { personal, experience = [], education = [], skills = [], certifications = [], languages = [] } = cv
  const achievements = certifications

  return (
    <div style={root}>
      <div style={{ background: palette.header, color: '#FFFFFF', padding: '32px 46px', boxSizing: 'border-box' }}>
        <div style={{ fontSize: 26, fontWeight: 900 }}>{personal.fullName || 'Your Name'}</div>
        <div style={{ height: 1, background: palette.gold, margin: '10px 0' }} />
        <div style={{ fontSize: 13, color: palette.gold, fontWeight: 700 }}>{personal.jobTitle || ''}</div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', fontSize: 10, color: 'rgba(255,255,255,0.7)', marginTop: 10 }}>
          {[personal.email, personal.phone, personal.location, personal.website, personal.linkedin].filter(Boolean).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', padding: '28px 32px 32px', gap: 20, boxSizing: 'border-box' }}>
        <div style={{ flex: 0.58 }}>
          {experience.length > 0 && (
            <section style={{ marginBottom: 18 }}>
              {label('Career History')}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {experience.map((exp) => (
                  <div key={exp.id} style={{ borderBottom: `1px solid ${palette.border}`, paddingBottom: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ fontSize: 13.5, fontWeight: 800, color: palette.header }}>{exp.company}</div>
                        <div style={{ fontSize: 12.5, fontStyle: 'italic', color: palette.gold, fontWeight: 700 }}>{exp.role}</div>
                      </div>
                      <div style={{ fontSize: 10.5, color: palette.muted }}>{exp.startDate} – {exp.endDate}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
                      {exp.bullets?.filter(Boolean).map((b, i) => (
                        <div key={i} style={{ display: 'flex', gap: 8, fontSize: 11.5 }}>
                          <div style={{ width: 6, height: 6, background: palette.gold, marginTop: 6 }} />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {personal.summary && (
            <section>
              {label('Executive Summary')}
              <p style={{ margin: 0, fontSize: 12 }}>{personal.summary}</p>
            </section>
          )}
        </div>

        <div style={{ flex: 0.42, background: palette.panel, borderLeft: `1px solid ${palette.border}`, padding: '18px 18px 18px 20px', boxSizing: 'border-box' }}>
          {education.length > 0 && (
            <section style={{ marginBottom: 16 }}>
              {label('Education')}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {education.map((edu) => (
                  <div key={edu.id} style={{ fontSize: 11.5 }}>
                    <div style={{ fontWeight: 800 }}>{edu.degree}</div>
                    <div style={{ color: palette.muted }}>{edu.institution} — {edu.year}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {skills.length > 0 && (
            <section style={{ marginBottom: 16 }}>
              {label('Core Competencies')}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 11.5 }}>
                {skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </section>
          )}

          {languages.length > 0 && (
            <section style={{ marginBottom: 16 }}>
              {label('Languages')}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 11.5 }}>
                {languages.map((lang) => <span key={lang}>{lang}</span>)}
              </div>
            </section>
          )}

          {achievements.length > 0 && (
            <section>
              {label('Key Achievements')}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 11.5 }}>
                {achievements.map((item) => (
                  <div key={item} style={{ display: 'flex', gap: 8 }}>
                    <div style={{ width: 4, height: 4, background: palette.gold, marginTop: 6 }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

'use client'
import type { CSSProperties } from 'react'
import type { CVData } from '@/types'

interface Props { cv: CVData; matchedKeywords?: string[] }

const palette = {
  sidebarTop: '#5B21B6',
  sidebarBottom: '#4C1D95',
  sidebarText: '#FFFFFF',
  sidebarAccent: '#A78BFA',
  mainText: '#1F2937',
  muted: '#6B7280',
}

const root: CSSProperties = {
  width: 794,
  minHeight: 1123,
  boxSizing: 'border-box',
  display: 'flex',
  background: '#FFFFFF',
  fontFamily: 'Inter, -apple-system, sans-serif',
  color: palette.mainText,
  lineHeight: 1.5,
}

const skillWidths = [92, 85, 88, 78, 90, 82, 75, 87, 80, 84, 79, 86]

export default function TemplateModern({ cv }: Props) {
  const { personal, experience = [], education = [], certifications = [], skills = [], languages = [] } = cv

  return (
    <div style={root}>
      <aside style={{ width: 220, background: `linear-gradient(180deg, ${palette.sidebarTop} 0%, ${palette.sidebarBottom} 100%)`, color: palette.sidebarText, padding: '32px 22px', boxSizing: 'border-box' }}>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 22, fontWeight: 800 }}>{personal.fullName || 'Your Name'}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>{personal.jobTitle || ''}</div>
        </div>

        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase', fontWeight: 800, marginBottom: 8 }}>Contact</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 10.5 }}>
            {[personal.email, personal.phone, personal.location, personal.website, personal.linkedin].filter(Boolean).map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        {skills.length > 0 && (
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase', fontWeight: 800, marginBottom: 8 }}>Key Skills</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {skills.slice(0, 12).map((skill, idx) => (
                <div key={skill}>
                  <div style={{ fontSize: 10.5, color: palette.sidebarText, marginBottom: 4 }}>{skill}</div>
                  <div style={{ height: 3, background: 'rgba(255,255,255,0.2)', borderRadius: 2 }}>
                    <div style={{ height: 3, width: `${skillWidths[idx % skillWidths.length]}%`, background: palette.sidebarAccent, borderRadius: 2 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {languages.length > 0 && (
          <div>
            <div style={{ fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase', fontWeight: 800, marginBottom: 8 }}>Languages</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 10.5 }}>
              {languages.map((lang) => <span key={lang}>{lang}</span>)}
            </div>
          </div>
        )}
      </aside>

      <main style={{ flex: 1, padding: '32px 34px 34px', boxSizing: 'border-box' }}>
        {personal.summary && (
          <section style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 800, color: palette.sidebarTop }}>Profile</div>
            <p style={{ margin: '6px 0 0', fontSize: 12.5 }}>{personal.summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 800, color: palette.sidebarTop, marginBottom: 8 }}>Experience</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {experience.map((exp) => (
                <div key={exp.id} style={{ padding: '12px 14px', borderRadius: 10, background: '#F9FAFB' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: 13, fontWeight: 800 }}>{exp.role}</div>
                    <div style={{ fontSize: 10.5, color: palette.muted }}>{exp.startDate} – {exp.endDate}</div>
                  </div>
                  <div style={{ fontSize: 11.5, color: palette.sidebarTop, fontWeight: 700, marginTop: 2 }}>{exp.company}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 6 }}>
                    {exp.bullets?.filter(Boolean).map((b, i) => (
                      <div key={i} style={{ display: 'flex', gap: 8, fontSize: 11.5, color: palette.mainText }}>
                        <div style={{ width: 3, height: 3, background: palette.sidebarTop, marginTop: 6 }} />
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
            <div style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 800, color: palette.sidebarTop, marginBottom: 8 }}>Education</div>
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
            <div style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 800, color: palette.sidebarTop, marginBottom: 8 }}>Certifications</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 11.5 }}>
              {certifications.map((cert) => (
                <span key={cert}>{cert}</span>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

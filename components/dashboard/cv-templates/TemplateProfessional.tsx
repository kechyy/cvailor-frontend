'use client'
import type { CVData } from '@/types'

interface Props { cv: CVData; matchedKeywords?: string[] }

const label = (text: string, color = '#F59E0B') => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
    <span style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color, whiteSpace: 'nowrap' }}>{text}</span>
    <div style={{ flex: 1, height: 1, background: '#E5E7EB' }} />
  </div>
)

export default function TemplateProfessional({ cv }: Props) {
  const { personal, experience = [], education = [], skills = [], languages = [], certifications = [] } = cv

  return (
    <div style={{ width: 794, minHeight: 1123, boxSizing: 'border-box', display: 'flex', fontFamily: 'Inter, -apple-system, Helvetica Neue, sans-serif', color: '#1F2937', lineHeight: 1.55 }}>
      {/* Sidebar */}
      <aside style={{ width: 220, background: '#1E293B', color: '#FFFFFF', padding: '28px 20px', boxSizing: 'border-box', flexShrink: 0, minHeight: 1123 }}>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 18, fontWeight: 800 }}>{personal.fullName || 'Your Name'}</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.72)', fontWeight: 500, marginTop: 4 }}>{personal.jobTitle || ''}</div>
          <div style={{ height: 2, background: '#F59E0B', marginTop: 12 }} />
        </div>

        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 9, letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 800, color: '#F59E0B', marginBottom: 8 }}>Contact</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 10.5, color: 'rgba(255,255,255,0.9)' }}>
            {[personal.email, personal.phone, personal.location, personal.linkedin, personal.website].filter(Boolean).map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        {skills.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 9, letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 800, color: '#F59E0B', marginBottom: 8 }}>Skills</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 10.5 }}>
              {skills.map((skill) => (
                <div key={skill} style={{ display: 'flex', gap: 8 }}>
                  <span style={{ color: '#F59E0B', fontWeight: 700 }}>▸</span>
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {languages.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 9, letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 800, color: '#F59E0B', marginBottom: 8 }}>Languages</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 10.5 }}>
              {languages.map((lang) => <span key={lang}>{lang}</span>)}
            </div>
          </div>
        )}

        {certifications.length > 0 && (
          <div>
            <div style={{ fontSize: 9, letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 800, color: '#F59E0B', marginBottom: 8 }}>Certifications</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 10.5 }}>
              {certifications.map((c) => (
                <div key={c} style={{ display: 'flex', gap: 8 }}>
                  <span style={{ color: '#F59E0B', fontWeight: 700 }}>▸</span>
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main column */}
      <main style={{ flex: 1, padding: '32px 36px 34px', boxSizing: 'border-box' }}>
        {personal.summary && (
          <section style={{ marginBottom: 18 }}>
            {label('Summary', '#1E293B')}
            <p style={{ margin: 0, fontSize: 12, color: '#1F2937' }}>{personal.summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section style={{ marginBottom: 18 }}>
            {label('Experience', '#1E293B')}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {experience.map((exp) => (
                <div key={exp.id} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div style={{ fontSize: 12, fontWeight: 700 }}>{exp.role}</div>
                    <div style={{ fontSize: 10, color: '#6B7280' }}>{exp.startDate} – {exp.endDate}</div>
                  </div>
                  <div style={{ fontSize: 11, color: '#F59E0B', fontWeight: 700 }}>{exp.company}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 2 }}>
                    {exp.bullets?.filter(Boolean).slice(0, 4).map((b, i) => (
                      <div key={i} style={{ display: 'flex', gap: 8, fontSize: 10.2, color: '#374151' }}>
                        <span style={{ color: '#F59E0B', fontWeight: 700 }}>▸</span>
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
          <section>
            {label('Education', '#1E293B')}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {education.map((edu) => (
                <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{edu.degree} in {edu.field}</div>
                    <div style={{ color: '#6B7280' }}>{edu.institution}</div>
                  </div>
                  <div style={{ color: '#9CA3AF' }}>{edu.year}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

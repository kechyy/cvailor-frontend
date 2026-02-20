'use client'
import type { CVData } from '@/types'
interface Props { cv: CVData; matchedKeywords?: string[] }

export default function TemplateClean({ cv, matchedKeywords = [] }: Props) {
  const { personal, experience, education, skills } = cv
  const textColor = '#1A1A2E'
  const subColor = '#6B7280'

  return (
    <div className="font-sans text-sm min-h-[1000px]" style={{ background: '#FFFFFF' }}>
      <div className="p-7" style={{ background: '#F5F6FA', color: textColor }}>
        <h1 className="text-2xl font-bold mb-1" style={{ color: textColor }}>{personal.fullName}</h1>
        <p className="text-sm font-medium mb-2" style={{ color: '#2ECC8F' }}>{personal.jobTitle}</p>
        <div className="flex flex-wrap gap-3 text-xs" style={{ color: subColor }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
        </div>
      </div>
      <div className="p-7 space-y-5 bg-white">
        {personal.summary && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#2ECC8F' }}>Summary</h2>
            <p className="text-gray-600 leading-relaxed">{personal.summary}</p>
          </section>
        )'
        {experience.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#2ECC8F' }}>Experience</h2>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between mb-0.5">
                    <span className="font-semibold text-gray-900">{exp.role} · {exp.company}</span>
                    <span className="text-xs text-gray-400">{exp.startDate} – {exp.endDate}</span>
                  </div>
                  <ul className="space-y-0.5 mt-1">
                    {exp.bullets.filter(Boolean).map((b, i) => (
                      <li key={i} className="text-xs text-gray-600 pl-3 relative before:content-['·'] before:absolute before:left-0">{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )'
        {education.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#2ECC8F' }}>Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between text-xs">
                <span className="font-medium">{edu.degree} in {edu.field} · {edu.institution}</span>
                <span className="text-gray-400">{edu.year}</span>
              </div>
            ))}
          </section>
        )'
        {skills.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#2ECC8F' }}>Skills</h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.slice(0,10).map(s => (
                <span key={s} className="text-xs border px-2 py-0.5 rounded-full text-gray-600" style={{ borderColor: '#2ECC8F40' }}>{s}</span>
              ))}
            </div>
          </section>
        )'
      </div>
    </div>
  )
}

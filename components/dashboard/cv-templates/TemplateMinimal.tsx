'use client'
import type { CVData } from '@/types'

interface Props { cv: CVData; matchedKeywords?: string[] }

function highlight(text: string, keywords: string[]) {
  if (!keywords.length) return <>{text}</>
  const regex = new RegExp(`(${keywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi')
  const parts = text.split(regex)
  return <>{parts.map((p, i) => regex.test(p) ? <mark key={i} className="bg-emerald-100 text-emerald-800 rounded px-0.5 not-italic font-medium">{p}</mark> : p)}</>
}

export default function TemplateMinimal({ cv, matchedKeywords = [] }: Props) {
  const { personal, experience, education, skills, languages } = cv
  return (
    <div className="font-sans text-[#1A1A2E] bg-white min-h-[1000px] p-10 text-sm leading-relaxed">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-1">{personal.fullName}</h1>
        <p className="text-base text-[#5B4FCF] font-medium mb-2">{personal.jobTitle}</p>
        <div className="h-0.5 bg-[#5B4FCF] w-16 mb-3" />
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
        </div>
      </div>

      {/* Summary */}
      {personal.summary && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#5B4FCF] mb-2">Summary</h2>
          <p className="text-gray-600 leading-relaxed">{highlight(personal.summary, matchedKeywords)}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#5B4FCF] mb-3">Experience</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex items-start justify-between mb-0.5">
                  <div>
                    <span className="font-semibold text-gray-900">{exp.role}</span>
                    <span className="text-gray-400 mx-2">·</span>
                    <span className="text-gray-600">{exp.company}</span>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0 ml-4">{exp.startDate} – {exp.endDate}</span>
                </div>
                <ul className="mt-1.5 space-y-1 pl-4">
                  {exp.bullets.filter(Boolean).map((b, i) => (
                    <li key={i} className="text-gray-600 before:content-['–'] before:mr-2 before:text-[#5B4FCF]">
                      {highlight(b, matchedKeywords)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#5B4FCF] mb-3">Education</h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between">
                <div>
                  <span className="font-semibold">{edu.degree} in {edu.field}</span>
                  <span className="text-gray-500 ml-2">· {edu.institution}</span>
                </div>
                <span className="text-xs text-gray-400">{edu.year}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#5B4FCF] mb-2">Skills</h2>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((s) => (
              <span key={s} className="text-xs border border-gray-200 px-2.5 py-1 rounded-full text-gray-600">{s}</span>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

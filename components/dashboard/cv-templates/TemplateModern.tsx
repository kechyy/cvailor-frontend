'use client'
import type { CVData } from '@/types'

interface Props { cv: CVData; matchedKeywords?: string[] }

export default function TemplateModern({ cv, matchedKeywords = [] }: Props) {
  const { personal, experience, education, skills, languages, certifications } = cv
  return (
    <div className="font-sans text-sm flex min-h-[1000px]">
      {/* Sidebar */}
      <div className="w-[38%] bg-[#5B4FCF] text-white p-7 space-y-6 flex-shrink-0">
        <div>
          <h1 className="text-xl font-bold leading-tight mb-1">{personal.fullName}</h1>
          <p className="text-white/70 text-xs font-medium">{personal.jobTitle}</p>
        </div>
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-2">Contact</p>
          {[personal.email, personal.phone, personal.location].filter(Boolean).map((v) => (
            <p key={v} className="text-xs text-white/80">{v}</p>
          ))}
        </div>
        {skills.length > 0 && (
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-2">Skills</p>
            <div className="space-y-1.5">
              {skills.slice(0, 8).map((s) => (
                <div key={s}>
                  <p className="text-xs text-white/80 mb-0.5">{s}</p>
                  <div className="h-1 bg-white/20 rounded-full"><div className="h-full bg-white/60 rounded-full" style={{ width: '70%' }} /></div>
                </div>
              ))}
            </div>
          </div>
        )}
        {languages.length > 0 && (
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-2">Languages</p>
            {languages.map((l) => <p key={l} className="text-xs text-white/80">{l}</p>)}
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 p-7 bg-white space-y-5">
        {personal.summary && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#5B4FCF] border-b border-gray-100 pb-1 mb-2">Profile</h2>
            <p className="text-gray-600 leading-relaxed text-xs">{personal.summary}</p>
          </section>
        )}
        {experience.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#5B4FCF] border-b border-gray-100 pb-1 mb-3">Experience</h2>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-0.5">
                    <div>
                      <span className="font-semibold text-gray-900 text-xs">{exp.role}</span>
                      <span className="text-gray-500 text-xs ml-2">{exp.company}</span>
                    </div>
                    <span className="text-[10px] text-gray-400">{exp.startDate} – {exp.endDate}</span>
                  </div>
                  <ul className="space-y-0.5 mt-1">
                    {exp.bullets.filter(Boolean).map((b, i) => (
                      <li key={i} className="text-[11px] text-gray-600 pl-3 before:content-['•'] before:absolute before:left-0 before:text-[#5B4FCF] relative">{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}
        {education.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#5B4FCF] border-b border-gray-100 pb-1 mb-2">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between text-xs">
                <span className="font-medium text-gray-800">{edu.degree} · {edu.field}</span>
                <span className="text-gray-400">{edu.year}</span>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  )
}

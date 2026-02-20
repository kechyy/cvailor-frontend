// REPLACE WITH: POST /api/cv/parse (file upload result)
import type { CVData } from '@/types'

export const mockCVData: CVData = {
  personal: {
    fullName: 'Sarah Mitchell',
    jobTitle: 'Senior Product Designer',
    email: 'sarah.mitchell@email.com',
    phone: '+44 7700 900123',
    location: 'London, UK',
    linkedin: 'https://linkedin.com/in/sarahmitchell',
    website: '',
    summary: '',
  },
  experience: [
    {
      id: 'exp_01',
      company: 'Spotify',
      role: 'Senior Product Designer',
      startDate: '2022-03',
      endDate: 'Present',
      current: true,
      bullets: [
        'Led redesign of mobile onboarding flow, increasing activation rate by 34%',
        'Collaborated with 3 engineering squads to ship 12 major features in 2023',
        'Established design system used across 5 product teams',
      ],
    },
    {
      id: 'exp_02',
      company: 'Monzo Bank',
      role: 'Product Designer',
      startDate: '2020-06',
      endDate: '2022-02',
      current: false,
      bullets: [
        'Designed the Monzo Plus subscription upgrade flow from 0 to launch',
        'Ran 20+ usability sessions informing key design decisions',
      ],
    },
  ],
  education: [
    {
      id: 'edu_01',
      institution: 'University of the Arts London',
      degree: 'Bachelor of Arts',
      field: 'Graphic Design',
      year: '2020',
    },
  ],
  skills: ['Figma', 'UX Research', 'Prototyping', 'Design Systems', 'Framer', 'User Testing', 'Sketch'],
  languages: ['English (Native)', 'French (Conversational)'],
  certifications: ['Google UX Design Certificate'],
}

export const mockJobDescription = `We are looking for a Senior UX Designer to join our product team at Google.

You will work closely with product managers and engineers to define and deliver exceptional user experiences across Google's core products.

Requirements:
- 5+ years of UX/Product Design experience
- Strong portfolio demonstrating end-to-end design process
- Proficiency in Figma and prototyping tools
- Experience with design systems at scale
- Strong communication and stakeholder management skills
- Experience conducting user research and usability testing
- Knowledge of accessibility standards (WCAG)
- TypeScript familiarity a plus`

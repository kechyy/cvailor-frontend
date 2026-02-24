import type { CVData } from '@/types'

export const mockCVData: CVData = {
  personal: {
    fullName: 'Sarah Mitchell',
    jobTitle: 'Senior Product Designer',
    email: 'sarah.mitchell@gmail.com',
    phone: '+44 7700 900123',
    location: 'London, UK',
    linkedin: 'linkedin.com/in/sarahmitchell',
    website: 'sarahmitchell.design',
    summary:
      "Senior Product Designer with 7 years crafting user-centred digital products across fintech and consumer apps. Led end-to-end design for Spotify's mobile onboarding — increasing activation by 34%. Deep expertise in design systems, UX research, and cross-functional collaboration with engineering and product teams.",
  },
  experience: [
    {
      id: 'exp_01',
      company: 'Spotify',
      role: 'Senior Product Designer',
      startDate: 'Mar 2022',
      endDate: 'Present',
      current: true,
      bullets: [
        'Led end-to-end redesign of mobile onboarding flow, increasing 7-day activation rate by 34% across 12M monthly users',
        "Defined and shipped Spotify's first cross-platform design system, adopted by 5 product squads within 6 months",
        'Partnered with 3 engineering squads to deliver 12 major features in 2023, maintaining 98% on-time delivery',
        'Mentored 3 mid-level designers; 2 promoted within 12 months through structured growth frameworks',
      ],
    },
    {
      id: 'exp_02',
      company: 'Monzo Bank',
      role: 'Product Designer',
      startDate: 'Jun 2020',
      endDate: 'Feb 2022',
      current: false,
      bullets: [
        'Owned design for Monzo Plus subscription tier from concept to launch — product reached 200K subscribers in 3 months',
        'Conducted 20+ usability sessions; translated findings into decisions that reduced support tickets by 18%',
        'Collaborated with compliance and engineering to deliver PSD2 open banking features ahead of regulatory deadline',
      ],
    },
    {
      id: 'exp_03',
      company: 'IDEO',
      role: 'UX Designer',
      startDate: 'Aug 2018',
      endDate: 'May 2020',
      current: false,
      bullets: [
        'Delivered UX strategy and prototypes for 6 client engagements across healthcare, retail, and financial services',
        'Facilitated 30+ design sprints for FTSE 100 clients including HSBC and John Lewis Partnership',
      ],
    },
    {
      id: 'exp_04',
      company: 'Fjord (Accenture Interactive)',
      role: 'Junior UX Designer',
      startDate: 'Sep 2016',
      endDate: 'Jul 2018',
      current: false,
      bullets: [
        'Produced wireframes, prototypes and user research for digital transformation projects across 4 industry verticals',
        'Awarded internal Design Excellence recognition for accessibility improvements on a major NHS patient portal',
      ],
    },
  ],
  education: [
    {
      id: 'edu_01',
      institution: 'Royal College of Art',
      degree: 'MA',
      field: 'Innovation Design Engineering',
      year: '2016',
    },
    {
      id: 'edu_02',
      institution: 'University of the Arts London',
      degree: 'BA (Hons)',
      field: 'Graphic Design',
      year: '2014',
    },
  ],
  skills: [
    'Figma',
    'Prototyping',
    'UX Research',
    'Design Systems',
    'Framer',
    'User Testing',
    'Adobe XD',
    'Sketch',
    'Accessibility (WCAG)',
    'Interaction Design',
    'Information Architecture',
    'Design Sprints',
  ],
  languages: ['English (Native)', 'French (Professional)', 'Spanish (Conversational)'],
  certifications: [
    'Google UX Design Professional Certificate',
    'Nielsen Norman Group UX Certification',
    'IDEO Design Thinking Facilitator',
  ],
}

export const mockJobDescription = `Senior Product Designer — Airbnb
We are looking for a Senior Product Designer to shape the future of travel experiences.
You will own end-to-end design across web and mobile, collaborating with product, engineering and data.
Requirements: 6+ years product design experience, strong systems thinking, Figma proficiency,
user research experience, track record shipping 0-to-1 products, excellent communication skills.`

import type { CVData } from '@/types'

export const mockCVData: CVData = {
  personal: {
    fullName: 'James Okafor',
    jobTitle: 'Senior Software Engineer',
    email: 'james.okafor@gmail.com',
    phone: '+44 7911 234567',
    location: 'London, UK',
    linkedin: 'linkedin.com/in/jamesokafor',
    website: 'jamesokafor.dev',
    summary:
      'Senior engineer with 8 years building scalable distributed systems at Google and Stripe. Led teams of 12 across payments infrastructure handling $2B in daily transactions. Deep expertise in TypeScript, Rust, and cloud-native architecture. Passionate about developer experience and engineering culture.',
  },
  experience: [
    {
      id: 'exp_01',
      company: 'Google',
      role: 'Senior Software Engineer',
      startDate: 'Mar 2022',
      endDate: 'Present',
      current: true,
      bullets: [
        'Architected real-time payments reconciliation system processing 50M transactions/day, reducing settlement time from 72 to 4 hours',
        'Led cross-functional team of 12 engineers to deliver Google Pay merchant dashboard, increasing merchant activation by 41%',
        'Reduced API p99 latency by 68% through distributed caching layer using Redis Cluster and custom sharding strategy',
        'Mentored 6 junior engineers through structured growth plans; 4 promoted to mid-level within 18 months',
      ],
    },
    {
      id: 'exp_02',
      company: 'Stripe',
      role: 'Software Engineer II',
      startDate: 'Jun 2020',
      endDate: 'Feb 2022',
      current: false,
      bullets: [
        'Built Stripe Radar fraud detection pipeline in Rust, processing 800K events/sec with sub-10ms latency at 99.99% availability',
        'Designed and shipped public-facing Webhooks v2 API now used by 180,000+ businesses globally',
        'Migrated 40TB of legacy MySQL data to distributed CockroachDB with zero downtime using custom shadow-write strategy',
        'Contributed 12 merged PRs to open-source Stripe CLI; feature adopted by 25,000+ developers within 3 months',
      ],
    },
    {
      id: 'exp_03',
      company: 'Monzo Bank',
      role: 'Software Engineer',
      startDate: 'Aug 2018',
      endDate: 'May 2020',
      current: false,
      bullets: [
        'Engineered core banking ledger service handling £500M in daily transactions across 5M customer accounts',
        'Implemented PSD2 Open Banking API endpoints; Monzo became first UK challenger bank to achieve full compliance',
        'Reduced microservice cold-start time by 73% by introducing Go module caching in Docker build pipeline',
      ],
    },
    {
      id: 'exp_04',
      company: 'Accenture',
      role: 'Associate Software Engineer',
      startDate: 'Sep 2016',
      endDate: 'Jul 2018',
      current: false,
      bullets: [
        'Delivered 3 client-facing enterprise web applications for FTSE 100 financial services clients using React and Java Spring',
        'Automated regression test suite reducing QA cycle time from 5 days to 6 hours across 4 project teams',
      ],
    },
  ],
  education: [
    {
      id: 'edu_01',
      institution: 'Imperial College London',
      degree: 'MEng in Computer Science',
      field: 'Distributed Systems',
      year: '2016',
    },
    {
      id: 'edu_02',
      institution: 'University of Lagos',
      degree: 'BSc in Electrical Engineering',
      field: 'Computer Engineering',
      year: '2014',
    },
  ],
  skills: [
    'TypeScript',
    'Rust',
    'Go',
    'Python',
    'React',
    'Node.js',
    'PostgreSQL',
    'Redis',
    'Kafka',
    'AWS',
    'Kubernetes',
    'Docker',
    'System Design',
    'GraphQL',
    'gRPC',
    'Terraform',
  ],
  languages: [
    'English (Native)',
    'French (Professional)',
    'Yoruba (Native)',
  ],
  certifications: [
    'AWS Solutions Architect — Professional',
    'Certified Kubernetes Administrator (CKA)',
    'Google Cloud Professional Data Engineer',
  ],
}

// Keep backward-compat alias
export { mockCVData as mockCV_Tech }

// Backwards-compatible aliases (all templates use the same rich dataset)
export const mockCV_Creative = mockCVData
export const mockCV_Finance = mockCVData
export const mockCV_Healthcare = mockCVData
export const mockCV_Sales = mockCVData
export const mockCV_Executive = mockCVData

export const mockJobDescription = `Senior Software Engineer — Payments Infrastructure
We are looking for a Senior Software Engineer to join our Payments Infrastructure team.
Requirements: 6+ years backend engineering, TypeScript or Go, distributed systems experience, 
experience with high-throughput data pipelines, strong system design fundamentals, AWS or GCP.`

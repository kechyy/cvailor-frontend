// REPLACE WITH: GET /api/templates
import type { CVTemplate } from '@/types'

export const mockTemplates: CVTemplate[] = [
  { id: 'minimal', name: 'Minimal', description: 'Clean single-column with generous white space', bestFor: ['Tech', 'Engineering', 'Senior roles'], categories: ['tech', 'executive'], accentColor: '#5B4FCF', previewBg: '#FFFFFF', isAiRecommended: true },
  { id: 'clean', name: 'Clean', description: 'Light header band with icon contact details', bestFor: ['General', 'Mid-level', 'Healthcare'], categories: ['general', 'healthcare'], accentColor: '#2ECC8F', previewBg: '#F5F6FA' },
  { id: 'classic', name: 'Classic', description: 'Traditional serif layout, timeless and conservative', bestFor: ['Finance', 'Legal', 'Banking'], categories: ['finance'], accentColor: '#1A1A2E', previewBg: '#FFFFFF' },
  { id: 'modern', name: 'Modern', description: 'Two-column with colored sidebar for skills', bestFor: ['Sales', 'Marketing', 'Business Dev'], categories: ['sales'], accentColor: '#5B4FCF', previewBg: '#5B4FCF' },
  { id: 'bold', name: 'Bold', description: 'Strong gradient header with visual skill bars', bestFor: ['Creative', 'Design', 'UX', 'Media'], categories: ['creative'], accentColor: '#F4A97F', previewBg: '#1A1A2E' },
  { id: 'executive', name: 'Executive', description: 'Premium elegant layout with gold accents', bestFor: ['C-Suite', 'Director', 'VP', '10+ years'], categories: ['executive'], accentColor: '#B8960C', previewBg: '#1A1A2E' },
]

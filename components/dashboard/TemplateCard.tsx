'use client'
import { motion } from 'framer-motion'
import { useCVBuilderStore } from '@/store/cvBuilderStore'
import type { CVTemplate } from '@/types'
import { useRouter } from 'next/navigation'

interface TemplateCardProps {
  template: CVTemplate
  index?: number
}

export default function TemplateCard({ template, index = 0 }: TemplateCardProps) {
  const { setTemplate } = useCVBuilderStore()
  const router = useRouter()

  const handleUse = () => {
    setTemplate(template.id)
    router.push('/dashboard/cv/new')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all group relative"
    >
      {template.isAiRecommended && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-brand-purple text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md">
          <motion.span animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>✦</motion.span>
          AI Pick
        </div>
      )}

      {/* Mini CV thumbnail */}
      <div
        className="h-48 p-4 relative overflow-hidden"
        style={{ background: template.previewBg }}
      >
        <MiniCVPreview template={template} />
      </div>

      {/* Card info */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-gray-800 text-sm">{template.name}</h3>
          <div className="w-3 h-3 rounded-full" style={{ background: template.accentColor }} />
        </div>
        <p className="text-xs text-gray-400 mb-3">{template.description}</p>
        <div className="flex flex-wrap gap-1 mb-4">
          {template.bestFor.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[10px] bg-gray-50 border border-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{tag}</span>
          ))}
        </div>
        <button
          onClick={handleUse}
          className="w-full bg-brand-purple text-white text-xs font-semibold py-2.5 rounded-xl hover:bg-brand-purple/90 transition-all hover:shadow-md hover:shadow-brand-purple/20"
        >
          Use this template
        </button>
      </div>
    </motion.div>
  )
}

// Mini static CV preview per template style
function MiniCVPreview({ template }: { template: CVTemplate }) {
  const id = template.id
  const accent = template.accentColor

  if (id === 'modern') {
    return (
      <div className="flex h-full gap-2 scale-90 origin-top-left">
        <div className="w-1/3 rounded-lg h-full" style={{ background: accent, opacity: 0.9 }}>
          <div className="p-2 space-y-2">
            <div className="w-8 h-8 rounded-full bg-white/30 mx-auto" />
            <div className="h-1.5 bg-white/40 rounded-full" />
            <div className="h-1 bg-white/25 rounded-full" />
            {[60,80,50,70].map((w,i) => <div key={i} className="h-1 bg-white/20 rounded-full" style={{width:`${w}%`}} />)}
          </div>
        </div>
        <div className="flex-1 space-y-2 pt-1">
          <div className="h-2 bg-gray-200 rounded-full w-3/4" />
          <div className="h-1.5 bg-gray-100 rounded-full w-1/2" />
          <div className="h-px bg-gray-200 my-1" />
          {[90,70,80,60,75].map((w,i) => <div key={i} className="h-1 bg-gray-100 rounded-full" style={{width:`${w}%`}} />)}
        </div>
      </div>
    )
  }

  if (id === 'bold') {
    return (
      <div className="space-y-2 scale-90 origin-top-left">
        <div className="h-14 rounded-xl" style={{ background: `linear-gradient(135deg, ${accent}, #5B4FCF)` }}>
          <div className="p-3 space-y-1">
            <div className="h-2 bg-white/60 rounded-full w-1/2" />
            <div className="h-1.5 bg-white/40 rounded-full w-1/3" />
          </div>
        </div>
        <div className="space-y-1.5 px-1">
          {[90,70,85,60].map((w,i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="h-1.5 bg-gray-100 rounded-full flex-1" />
              <div className="h-1.5 rounded-full" style={{ width: `${w * 0.4}px`, background: accent }} />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (id === 'executive') {
    return (
      <div className="space-y-2 scale-90 origin-top-left">
        <div className="h-12 rounded-xl" style={{ background: '#1A1A2E' }}>
          <div className="p-3 flex items-center gap-2">
            <div className="h-2 bg-white/60 rounded-full flex-1" />
            <div className="h-1.5 rounded-full w-8" style={{ background: '#B8960C' }} />
          </div>
        </div>
        <div className="space-y-1.5 px-1">
          <div className="h-px" style={{ background: '#B8960C' }} />
          {[85,70,90,60,75].map((w,i) => <div key={i} className="h-1 bg-gray-100 rounded-full" style={{width:`${w}%`}} />)}
        </div>
      </div>
    )
  }

  // Default: minimal / clean / classic
  return (
    <div className="space-y-2 scale-90 origin-top-left">
      <div className="pb-2" style={{ borderBottom: `2px solid ${accent}` }}>
        <div className="h-2.5 bg-gray-700 rounded-full w-1/2 mb-1" />
        <div className="h-1.5 bg-gray-300 rounded-full w-1/3" />
      </div>
      <div className="space-y-1">
        <div className="h-1.5 rounded-full" style={{ background: accent, width: '30%', opacity: 0.6 }} />
        {[90,75,60,80].map((w,i) => <div key={i} className="h-1 bg-gray-100 rounded-full" style={{width:`${w}%`}} />)}
      </div>
      <div className="space-y-1 pt-1">
        <div className="h-1.5 rounded-full" style={{ background: accent, width: '35%', opacity: 0.6 }} />
        {[85,70,65].map((w,i) => <div key={i} className="h-1 bg-gray-100 rounded-full" style={{width:`${w}%`}} />)}
      </div>
    </div>
  )
}

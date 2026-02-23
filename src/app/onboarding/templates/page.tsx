'use client'
import React from 'react'
import { TemplateGrid } from '@/src/components/templates/TemplateGrid'

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-8">
        <header className="space-y-2">
          <p className="text-sm font-semibold text-brand-purple">Step 2 · Choose a template</p>
          <h1 className="text-3xl font-display text-gray-900">Pick a template that fits your story</h1>
          <p className="text-gray-500 text-sm">
            Thumbnails are live previews of real templates. Click a card to select; adjust profession/stack to see tailored recommendations.
          </p>
        </header>
        <TemplateGrid />
      </div>
    </div>
  )
}


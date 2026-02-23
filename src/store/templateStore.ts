'use client'
import { create } from 'zustand'

type TemplateState = {
  selectedTemplateId?: string
  selectedProfession?: string
  selectedStack?: string
  setSelectedTemplateId: (id: string) => void
  setSelectedProfession: (p?: string) => void
  setSelectedStack: (s?: string) => void
}

export const useTemplateStore = create<TemplateState>((set) => ({
  selectedTemplateId: undefined,
  selectedProfession: undefined,
  selectedStack: undefined,
  setSelectedTemplateId: (id) => set({ selectedTemplateId: id }),
  setSelectedProfession: (p) => set({ selectedProfession: p || undefined }),
  setSelectedStack: (s) => set({ selectedStack: s || undefined }),
}))


import { create } from 'zustand'

interface MermaidState {
  scale: number
  translateX: number
  translateY: number
  isPanning: boolean
  setScale: (scale: number) => void
  setTranslate: (x: number, y: number) => void
  setIsPanning: (isPanning: boolean) => void
  reset: () => void
}

export const useMermaidStore = create<MermaidState>((set) => ({
  scale: 1,
  translateX: 0,
  translateY: 0,
  isPanning: false,
  setScale: (scale) => set({ scale }),
  setTranslate: (x, y) => set({ translateX: x, translateY: y }),
  setIsPanning: (isPanning) => set({ isPanning }),
  reset: () => set({ scale: 1, translateX: 0, translateY: 0 }),
}))
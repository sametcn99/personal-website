'use client'

import { persist } from 'zustand/middleware'
import { create } from 'zustand'

interface SidebarState {
	isOpen: boolean
	setIsOpen: (open: boolean) => void
	toggleSidebar: () => void
}

export const useSidebarStore = create<SidebarState>()(
	persist(
		(set) => ({
			isOpen: true,
			setIsOpen: (open: boolean) => set({ isOpen: open }),
			toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
		}),
		{
			name: 'sidebar-storage',
		}
	)
)

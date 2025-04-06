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
			isOpen: true, // This is already true by default, which is correct
			setIsOpen: (open: boolean) => set({ isOpen: open }),
			toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
		}),
		{
			name: 'sidebar-storage',
		}
	)
)

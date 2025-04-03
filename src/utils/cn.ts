import { twMerge } from 'tailwind-merge'
import { ClassValue, clsx } from 'clsx'

/**
 * Merges multiple class names using clsx and tailwind-merge.
 * @param {...ClassValue[]} inputs - Class names to merge.
 * @returns {string} - Merged class names as a single string.
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

/**
 * Utility functions index
 * 모든 유틸리티 함수를 여기서 export
 */

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// CSS utility
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Re-export all utility modules
export * from './date.utils'
export * from './format.utils'
export * from './validation.utils'
export * from './status.utils'


import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const assetPrefix =
  process.env.NEXT_PUBLIC_NODE_ENV === 'production'
    ? `https://${process.env.NEXT_PUBLIC_PROJECT_PRODUCTION_URL}`
    : `http://${process.env.NEXT_PUBLIC_PROJECT_PRODUCTION_URL}`

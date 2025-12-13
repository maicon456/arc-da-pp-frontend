import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatEther as viemFormatEther } from 'viem'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format Ethereum address for display
 */
export function formatAddress(address: string): string {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

/**
 * Format wei to ether (USDC)
 * Uses viem's formatEther for proper formatting
 */
export function formatEther(value: bigint | string | number): string {
  try {
    if (typeof value === 'string') {
      value = BigInt(value)
    } else if (typeof value === 'number') {
      value = BigInt(value)
    }
    return viemFormatEther(value)
  } catch (error) {
    return '0'
  }
}

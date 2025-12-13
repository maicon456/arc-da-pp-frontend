import { createPublicClient, http, formatUnits, parseUnits } from 'viem'
import { arcTestnet } from './arcChain'

/**
 * Arc Network Gas Configuration
 * Based on: https://docs.arc.network/arc/references/gas-and-fees
 * 
 * Arc Network uses EIP-1559 with USDC as gas token:
 * - Minimum base fee: 160 Gwei (~$0.01 per transaction)
 * - Priority fee: 2 Gwei (tip for validators)
 * - Gas token: USDC (18 decimals)
 */

const MIN_BASE_FEE_GWEI = 160n // Minimum base fee in Gwei
const PRIORITY_FEE_GWEI = 2n // Priority fee in Gwei
const GWEI_TO_WEI = 10n ** 9n // Convert Gwei to Wei

// Create public client for fetching gas prices
const publicClient = createPublicClient({
  chain: arcTestnet,
  transport: http('https://rpc.testnet.arc.network'),
})

/**
 * Get the current base fee per gas from the network
 * Returns the base fee in Wei, ensuring minimum of 160 Gwei
 */
export async function getBaseFeePerGas(): Promise<bigint> {
  try {
    const block = await publicClient.getBlock({ blockTag: 'latest' })
    
    // EIP-1559 base fee (in Wei)
    const baseFee = block.baseFeePerGas || 0n
    
    // Ensure minimum 160 Gwei (Arc Network requirement)
    const minBaseFee = MIN_BASE_FEE_GWEI * GWEI_TO_WEI
    
    // If base fee is 0 or less than minimum, use minimum
    if (!baseFee || baseFee === 0n || baseFee < minBaseFee) {
      return minBaseFee
    }
    
    return baseFee
  } catch (error) {
    console.error('Error fetching base fee:', error)
    // Return minimum base fee as fallback (Arc Network requirement)
    return MIN_BASE_FEE_GWEI * GWEI_TO_WEI
  }
}

/**
 * Get priority fee per gas (tip for validators)
 * Returns 2 Gwei in Wei
 */
export function getPriorityFeePerGas(): bigint {
  return PRIORITY_FEE_GWEI * GWEI_TO_WEI
}

/**
 * Calculate max fee per gas for EIP-1559 transaction
 * Formula: maxFeePerGas = baseFeePerGas * 2 + priorityFeePerGas
 * This ensures the transaction is included even if base fee increases
 */
export async function getMaxFeePerGas(): Promise<bigint> {
  const baseFee = await getBaseFeePerGas()
  const priorityFee = getPriorityFeePerGas()
  
  // Multiply base fee by 2 to ensure transaction is included
  // even if base fee increases before confirmation
  const maxFee = baseFee * 2n + priorityFee
  
  // Ensure minimum (160 Gwei * 2 + 2 Gwei = 322 Gwei)
  const minMaxFee = (MIN_BASE_FEE_GWEI * 2n + PRIORITY_FEE_GWEI) * GWEI_TO_WEI
  
  return maxFee > minMaxFee ? maxFee : minMaxFee
}

/**
 * Get gas configuration for Arc Network transactions
 * Returns both maxFeePerGas and maxPriorityFeePerGas
 */
export async function getGasConfig(): Promise<{
  maxFeePerGas: bigint
  maxPriorityFeePerGas: bigint
}> {
  const maxFeePerGas = await getMaxFeePerGas()
  const maxPriorityFeePerGas = getPriorityFeePerGas()
  
  return {
    maxFeePerGas,
    maxPriorityFeePerGas,
  }
}

/**
 * Format gas fee for display
 */
export function formatGasFee(fee: bigint): string {
  return formatUnits(fee, 18) // USDC has 18 decimals
}

/**
 * Estimate total transaction cost
 */
export async function estimateTransactionCost(gasLimit: bigint): Promise<{
  maxFeePerGas: bigint
  maxPriorityFeePerGas: bigint
  estimatedCost: bigint
  estimatedCostFormatted: string
}> {
  const { maxFeePerGas, maxPriorityFeePerGas } = await getGasConfig()
  const estimatedCost = maxFeePerGas * gasLimit
  
  return {
    maxFeePerGas,
    maxPriorityFeePerGas,
    estimatedCost,
    estimatedCostFormatted: formatGasFee(estimatedCost),
  }
}


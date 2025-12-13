/**
 * Wagmi configuration export
 * This file exports the wagmi config for use in hooks
 */

import { createConfig, http } from 'wagmi'
import { metaMask } from '@wagmi/connectors'
import { arcTestnet } from '@/lib/arcChain'

export const config = createConfig({
  chains: [arcTestnet],
  connectors: [metaMask()],
  transports: {
    [arcTestnet.id]: http(process.env.NEXT_PUBLIC_ARC_RPC_URL || 'https://rpc.testnet.arc.network'),
  },
})


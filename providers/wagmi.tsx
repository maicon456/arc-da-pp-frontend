'use client'

import { useState, useMemo } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { injected } from '@wagmi/connectors'
import { arcTestnet } from '@/lib/arcChain'

export function WagmiProviderWrapper({ children }: { children: React.ReactNode }) {
  // Create a client for React Query with proper configuration
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  )

  // Create wagmi config inside component to avoid SSR issues
  // Using injected connector which works with all EIP-1193 compatible wallets
  // (MetaMask, Trust Wallet, Coinbase Wallet, Brave Wallet, etc.)
  const config = useMemo(() => {
    return createConfig({
      chains: [arcTestnet],
      connectors: [injected()],
      transports: {
        [arcTestnet.id]: http('https://rpc.testnet.arc.network'),
      },
    })
  }, [])

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}



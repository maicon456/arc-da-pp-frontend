'use client'

import { useState } from 'react'
import { useAccount, useConnect, useDisconnect, useChainId } from 'wagmi'
import { arcTestnet } from '@/lib/arcChain'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Wallet, Copy, ExternalLink, LogOut, Check, Loader2 } from 'lucide-react'
import { formatAddress } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import { useSwitchChain } from 'wagmi'

interface ConnectWalletButtonProps {
  className?: string
  variant?: 'default' | 'outline' | 'ghost' | 'destructive' | 'secondary' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

export function ConnectWalletButton({
  className = '',
  variant = 'default',
  size = 'default',
}: ConnectWalletButtonProps) {
  const [open, setOpen] = useState(false)
  const { address, isConnected, connector } = useAccount()
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const chainId = useChainId()
  const { switchChain, isPending: isSwitching } = useSwitchChain()
  const { toast } = useToast()

  const isCorrectChain = chainId === arcTestnet.id

  const handleConnect = (connectorId: string) => {
    const selectedConnector = connectors.find((c) => c.id === connectorId)
    if (selectedConnector) {
      connect({ connector: selectedConnector })
      setOpen(false)
    }
  }

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      toast({
        title: 'Address copied!',
        description: 'Wallet address copied to clipboard',
      })
    }
  }

  const handleDisconnect = () => {
    disconnect()
    toast({
      title: 'Disconnected',
      description: 'Wallet disconnected successfully',
    })
  }

  const getWalletIcon = (connectorId: string) => {
    switch (connectorId) {
      case 'metaMask':
      case 'metaMaskSDK':
        return '🦊'
      case 'walletConnect':
        return '🔗'
      case 'coinbaseWallet':
      case 'coinbaseWalletSDK':
        return '🔵'
      case 'injected':
        return '💼'
      default:
        return '🔷'
    }
  }

  const getWalletName = (connectorId: string) => {
    switch (connectorId) {
      case 'metaMask':
      case 'metaMaskSDK':
        return 'MetaMask'
      case 'walletConnect':
        return 'WalletConnect'
      case 'coinbaseWallet':
      case 'coinbaseWalletSDK':
        return 'Coinbase Wallet'
      case 'injected':
        return 'Browser Wallet'
      default:
        return connectorId
    }
  }

  // If connected, show dropdown menu
  if (isConnected && address) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={variant} size={size} className={`gap-2 ${className}`}>
            <Wallet className="h-4 w-4" />
            <span className="hidden sm:inline">{formatAddress(address)}</span>
            {!isCorrectChain && (
              <Badge variant="destructive" className="ml-1">
                Wrong Network
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="px-2 py-1.5 text-sm text-muted-foreground">
            {connector?.name || 'Connected'}
          </div>
          <DropdownMenuSeparator />
          {!isCorrectChain && (
            <>
              <DropdownMenuItem
                onClick={() => switchChain({ chainId: arcTestnet.id })}
                disabled={isSwitching}
                className="cursor-pointer"
              >
                {isSwitching ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <ExternalLink className="mr-2 h-4 w-4" />
                )}
                Switch to Arc Network
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem onClick={handleCopyAddress} className="cursor-pointer">
            <Copy className="mr-2 h-4 w-4" />
            Copy Address
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              window.open(`https://testnet.arcscan.app/address/${address}`, '_blank')
            }
            className="cursor-pointer"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            View on ArcScan
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDisconnect} className="cursor-pointer text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  // Show connect dialog
  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={`gap-2 ${className}`}
        onClick={() => setOpen(true)}
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="hidden sm:inline">Connecting...</span>
          </>
        ) : (
          <>
            <Wallet className="h-4 w-4" />
            <span className="hidden sm:inline">Connect Wallet</span>
          </>
        )}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Connect Wallet</DialogTitle>
            <DialogDescription>
              Choose a wallet to connect to Arc Network
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-4">
            {connectors.map((connector) => {
              const isConnecting = isPending
              // Check if wallet is installed (for MetaMask and other EIP-1193 wallets)
              const isInstalled =
                connector.id === 'metaMask' ||
                (typeof window !== 'undefined' && !!(window as any).ethereum)

              return (
                <Button
                  key={connector.id}
                  variant="outline"
                  className="w-full justify-start gap-3 h-auto py-4 px-4 hover:bg-accent"
                  onClick={() => handleConnect(connector.id)}
                  disabled={isPending || isConnecting}
                >
                  <span className="text-2xl">{getWalletIcon(connector.id)}</span>
                  <div className="flex flex-col items-start flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{getWalletName(connector.id)}</span>
                      {isConnecting && <Loader2 className="h-4 w-4 animate-spin" />}
                    </div>
                    {connector.id === 'metaMask' && (
                      <span className="text-xs text-muted-foreground">
                        MetaMask and EIP-1193 compatible wallets
                      </span>
                    )}
                    {connector.id === 'walletConnect' && (
                      <span className="text-xs text-muted-foreground">
                        Connect via QR code
                      </span>
                    )}
                  </div>
                  {isConnecting && <Check className="h-4 w-4 text-primary" />}
                </Button>
              )
            })}
          </div>
          <div className="text-xs text-muted-foreground text-center pt-2 border-t">
            <p>
              New to Web3?{' '}
              <a
                href="https://metamask.io/download/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Get MetaMask
              </a>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}


'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Coins } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { usePurchaseAgentTokens } from '@/lib/hooks/useVirtualAgents'
import { formatEther } from '@/lib/utils'
import { useEffect } from 'react'

interface PurchaseTokensDialogProps {
  agent: {
    id: bigint
    name: string
    price: bigint
    totalSupply: bigint
    circulatingSupply: bigint
  }
}

export function PurchaseTokensDialog({ agent }: PurchaseTokensDialogProps) {
  const [open, setOpen] = useState(false)
  const [amount, setAmount] = useState('')
  const { isConnected } = useAccount()
  const { toast } = useToast()

  const {
    purchaseTokens,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  } = usePurchaseAgentTokens()

  const pricePerToken = formatEther(agent.price)
  const totalCost = amount ? BigInt(Math.floor(parseFloat(amount) * parseFloat(pricePerToken) * 10 ** 18)) : BigInt(0)
  const availableSupply = agent.totalSupply - agent.circulatingSupply

  useEffect(() => {
    if (isConfirmed && hash) {
      toast({
        title: 'Tokens purchased! 🎉',
        description: `You now own ${amount} tokens of ${agent.name}`,
      })
      setAmount('')
      setOpen(false)
    }
    if (error) {
      toast({
        title: 'Purchase failed',
        description: error.message || 'Failed to purchase tokens',
        variant: 'destructive',
      })
    }
  }, [isConfirmed, hash, error, amount, agent.name, toast])

  const handlePurchase = async () => {
    if (!isConnected) {
      toast({
        title: 'Wallet not connected',
        description: 'Please connect your wallet first',
        variant: 'destructive',
      })
      return
    }

    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: 'Invalid amount',
        description: 'Please enter a valid amount',
        variant: 'destructive',
      })
      return
    }

    const amountBigInt = BigInt(Math.floor(parseFloat(amount)))
    if (amountBigInt > availableSupply) {
      toast({
        title: 'Insufficient supply',
        description: `Only ${availableSupply.toString()} tokens available`,
        variant: 'destructive',
      })
      return
    }

    try {
      await purchaseTokens(agent.id, amountBigInt, totalCost)
    } catch (err: any) {
      console.error('Error purchasing tokens:', err)
    }
  }

  const isLoading = isPending || isConfirming

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="gap-2">
          <Coins className="h-4 w-4" />
          Buy Tokens
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Purchase {agent.name} Tokens</DialogTitle>
          <DialogDescription>
            Buy ownership tokens for this <span className="font-semibold text-primary">AI</span> agent
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount of Tokens</Label>
            <Input
              id="amount"
              type="number"
              placeholder="10"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
              max={availableSupply.toString()}
            />
            <p className="text-xs text-muted-foreground">
              Available: {availableSupply.toString()} tokens
            </p>
          </div>

          <div className="space-y-2">
            <Label>Price per Token</Label>
            <p className="text-sm font-semibold">{pricePerToken} USDC</p>
          </div>

          {amount && parseFloat(amount) > 0 && (
            <div className="space-y-2">
              <Label>Total Cost</Label>
              <p className="text-sm font-semibold">{formatEther(totalCost)} USDC</p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handlePurchase} disabled={isLoading || !amount}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? 'Processing...' : 'Purchase'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}


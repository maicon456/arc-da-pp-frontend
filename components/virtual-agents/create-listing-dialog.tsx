'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { useCreateListing } from '@/lib/hooks/useVirtualAgents'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, ShoppingCart } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { parseEther } from 'viem'
import { formatEther } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

interface CreateListingDialogProps {
  agent: {
    id: bigint
    name: string
    price: bigint
  }
  userOwnership: bigint
  onListingCreated?: () => void
}

export function CreateListingDialog({ agent, userOwnership, onListingCreated }: CreateListingDialogProps) {
  const [open, setOpen] = useState(false)
  const [price, setPrice] = useState('')
  const [amount, setAmount] = useState('')
  const { isConnected } = useAccount()
  const { toast } = useToast()

  const {
    createListing,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  } = useCreateListing()

  useEffect(() => {
    if (isConfirmed && hash) {
      toast({
        title: 'Listing created! 🎉',
        description: `Your listing for ${agent.name} has been created`,
      })
      setPrice('')
      setAmount('')
      setOpen(false)
      onListingCreated?.()
    }
    if (error) {
      toast({
        title: 'Listing failed',
        description: error.message || 'Failed to create listing',
        variant: 'destructive',
      })
    }
  }, [isConfirmed, hash, error, agent.name, toast, onListingCreated])

  const handleCreate = async () => {
    if (!isConnected) {
      toast({
        title: 'Wallet not connected',
        description: 'Please connect your wallet first',
        variant: 'destructive',
      })
      return
    }

    if (!price || !amount) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in all fields',
        variant: 'destructive',
      })
      return
    }

    const priceWei = parseEther(price)
    const amountBigInt = BigInt(Math.floor(parseFloat(amount)))

    if (amountBigInt > userOwnership) {
      toast({
        title: 'Insufficient balance',
        description: `You only own ${userOwnership.toString()} tokens`,
        variant: 'destructive',
      })
      return
    }

    try {
      await createListing(agent.id, priceWei, amountBigInt)
    } catch (err: any) {
      console.error('Error creating listing:', err)
    }
  }

  const isLoading = isPending || isConfirming
  const totalValue = price && amount ? parseEther(price) * BigInt(Math.floor(parseFloat(amount))) : BigInt(0)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="gap-2">
          <ShoppingCart className="h-4 w-4" />
          List for Sale
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Listing for {agent.name}</DialogTitle>
          <DialogDescription>
            List your tokens for sale on the marketplace
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
              max={userOwnership.toString()}
            />
            <p className="text-xs text-muted-foreground">
              Your balance: <Badge variant="outline">{userOwnership.toString()}</Badge> tokens
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price per Token (USDC)</Label>
            <Input
              id="price"
              type="number"
              step="0.001"
              placeholder="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          {price && amount && parseFloat(amount) > 0 && (
            <div className="space-y-2 p-3 bg-muted rounded-lg">
              <Label>Total Value</Label>
              <p className="text-sm font-semibold">{formatEther(totalValue)} USDC</p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={isLoading || !price || !amount}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? 'Creating...' : 'Create Listing'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}


'use client'

import { useAccount } from 'wagmi'
import { useAgentListings, useFillListing } from '@/lib/hooks/useVirtualAgents'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatAddress, formatEther } from '@/lib/utils'
import { Loader2, ShoppingCart, User } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface MarketplaceListingsProps {
  agentId: bigint | number
  agentName: string
}

export function MarketplaceListings({ agentId, agentName }: MarketplaceListingsProps) {
  const { address } = useAccount()
  const { listings, isLoading } = useAgentListings(agentId)
  const { toast } = useToast()
  const [selectedListing, setSelectedListing] = useState<any>(null)
  const [buyDialogOpen, setBuyDialogOpen] = useState(false)
  const [buyAmount, setBuyAmount] = useState('')

  const {
    fillListing,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  } = useFillListing()

  useEffect(() => {
    if (isConfirmed && hash) {
      toast({
        title: 'Purchase successful! 🎉',
        description: `You purchased tokens from ${agentName}`,
      })
      setBuyAmount('')
      setBuyDialogOpen(false)
      setSelectedListing(null)
    }
    if (error) {
      toast({
        title: 'Purchase failed',
        description: error.message || 'Failed to purchase tokens',
        variant: 'destructive',
      })
    }
  }, [isConfirmed, hash, error, agentName, toast])

  const handleBuy = async () => {
    if (!selectedListing || !buyAmount) return

    const amount = BigInt(Math.floor(parseFloat(buyAmount)))
    if (amount > selectedListing.amount) {
      toast({
        title: 'Invalid amount',
        description: `Maximum available: ${selectedListing.amount.toString()}`,
        variant: 'destructive',
      })
      return
    }

    const totalCost = selectedListing.price * amount
    try {
      await fillListing(selectedListing.listingId, amount, totalCost)
    } catch (err: any) {
      console.error('Error filling listing:', err)
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6 text-center py-12">
          <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Loading listings...</p>
        </CardContent>
      </Card>
    )
  }

  if (listings.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center py-12">
          <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No listings available</h3>
          <p className="text-sm text-muted-foreground">
            Be the first to list tokens for this agent
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Marketplace Listings</CardTitle>
          <CardDescription>Buy tokens from other users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {listings.map((listing) => (
              <div
                key={listing.listingId.toString()}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-mono">{formatAddress(listing.seller)}</span>
                    {listing.seller.toLowerCase() === address?.toLowerCase() && (
                      <Badge variant="secondary">Your Listing</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span>
                      <strong>{listing.amount.toString()}</strong> tokens available
                    </span>
                    <span className="text-muted-foreground">
                      {formatEther(listing.price)} USDC per token
                    </span>
                  </div>
                  <div className="mt-2 text-sm font-semibold">
                    Total: {formatEther(listing.price * listing.amount)} USDC
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => {
                    setSelectedListing(listing)
                    setBuyDialogOpen(true)
                  }}
                  disabled={listing.seller.toLowerCase() === address?.toLowerCase()}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Buy
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={buyDialogOpen} onOpenChange={setBuyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Buy Tokens from Listing</DialogTitle>
            <DialogDescription>
              Purchase tokens from {selectedListing && formatAddress(selectedListing.seller)}
            </DialogDescription>
          </DialogHeader>
          {selectedListing && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="buyAmount">Amount of Tokens</Label>
                <Input
                  id="buyAmount"
                  type="number"
                  placeholder="10"
                  value={buyAmount}
                  onChange={(e) => setBuyAmount(e.target.value)}
                  min="1"
                  max={selectedListing.amount.toString()}
                />
                <p className="text-xs text-muted-foreground">
                  Available: {selectedListing.amount.toString()} tokens
                </p>
              </div>

              <div className="space-y-2">
                <Label>Price per Token</Label>
                <p className="text-sm font-semibold">{formatEther(selectedListing.price)} USDC</p>
              </div>

              {buyAmount && parseFloat(buyAmount) > 0 && (
                <div className="space-y-2 p-3 bg-muted rounded-lg">
                  <Label>Total Cost</Label>
                  <p className="text-sm font-semibold">
                    {formatEther(selectedListing.price * BigInt(Math.floor(parseFloat(buyAmount) || 0)))} USDC
                  </p>
                </div>
              )}
            </div>
          )}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setBuyDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleBuy}
              disabled={isPending || isConfirming || !buyAmount}
            >
              {(isPending || isConfirming) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isPending || isConfirming ? 'Processing...' : 'Purchase'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}


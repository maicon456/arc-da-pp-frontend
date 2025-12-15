'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MessageSquare, TrendingUp, Users, ExternalLink, Coins, ShoppingCart } from 'lucide-react'
import { PurchaseTokensDialog } from './purchase-tokens-dialog'
import { CreateListingDialog } from './create-listing-dialog'
import { formatAddress, formatEther } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'

interface Agent {
  id: bigint
  creator: string
  name: string
  avatar: string
  description: string
  personality: string
  price: bigint
  totalSupply: bigint
  circulatingSupply: bigint
  createdAt: bigint
  isActive: boolean
  capabilities?: string[]
  ownership?: bigint
}

interface AgentCardProps {
  agent: Agent
  onChat: () => void
}

export function AgentCard({ agent, onChat }: AgentCardProps) {
  const ownershipPercentage =
    agent.totalSupply > BigInt(0)
      ? (Number(agent.circulatingSupply) / Number(agent.totalSupply)) * 100
      : 0

  const priceFormatted = formatEther(agent.price)
  const createdAt = new Date(Number(agent.createdAt) * 1000)

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg hover:border-primary/50">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary/20">
            <AvatarImage src={agent.avatar} alt={agent.name} />
            <AvatarFallback>{agent.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-xl mb-1 line-clamp-1">{agent.name}</CardTitle>
            <CardDescription className="flex items-center gap-2 text-xs">
              <Badge variant="outline" className="font-mono text-[10px]">
                #{agent.id.toString()}
              </Badge>
              <span>{formatDistanceToNow(createdAt, { addSuffix: true })}</span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{agent.description}</p>

        {agent.personality && (
          <div>
            <p className="text-xs font-medium mb-1">Personality:</p>
            <p className="text-xs text-muted-foreground line-clamp-1">{agent.personality}</p>
          </div>
        )}

        {agent.capabilities && agent.capabilities.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {agent.capabilities.slice(0, 3).map((cap, i) => (
              <Badge key={i} variant="secondary" className="text-[10px]">
                {cap}
              </Badge>
            ))}
            {agent.capabilities.length > 3 && (
              <Badge variant="secondary" className="text-[10px]">
                +{agent.capabilities.length - 3}
              </Badge>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <p className="text-muted-foreground">Price</p>
            <p className="font-semibold">{priceFormatted} USDC</p>
          </div>
          <div>
            <p className="text-muted-foreground">Ownership</p>
            <p className="font-semibold">{ownershipPercentage.toFixed(1)}%</p>
          </div>
        </div>

        {agent.ownership && agent.ownership > BigInt(0) && (
          <div className="bg-primary/10 p-2 rounded text-xs">
            <p className="font-medium">You own: {agent.ownership.toString()} tokens</p>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Users className="h-3 w-3" />
            <span className="font-mono">{formatAddress(agent.creator)}</span>
          </div>
          <div className="flex gap-2">
            <PurchaseTokensDialog agent={agent} />
            {agent.ownership && agent.ownership > BigInt(0) && (
              <CreateListingDialog
                agent={agent}
                userOwnership={agent.ownership}
              />
            )}
            <Button size="sm" variant="outline" onClick={onChat} className="gap-1">
              <MessageSquare className="h-3 w-3" />
              Chat
            </Button>
            <Button size="sm" variant="outline" className="gap-1" asChild>
              <Link href={`/marketplace/agent/${agent.id.toString()}`}>
                <ExternalLink className="h-3 w-3" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


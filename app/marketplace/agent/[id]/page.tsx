'use client'

import { useParams } from 'next/navigation'
import { useAgent, useAgentCapabilities, useAgentOwnership } from '@/lib/hooks/useVirtualAgents'
import { useAccount } from 'wagmi'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatAddress, formatEther } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'
import { ArrowLeft, MessageSquare, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { PurchaseTokensDialog } from '@/components/virtual-agents/purchase-tokens-dialog'
import { CreateListingDialog } from '@/components/virtual-agents/create-listing-dialog'
import { MarketplaceListings } from '@/components/virtual-agents/marketplace-listings'
import { AgentChatDialog } from '@/components/virtual-agents/agent-chat-dialog'
import { useState } from 'react'

// Configuração para rotas dinâmicas
export const dynamic = 'force-dynamic' // Força renderização dinâmica
export const dynamicParams = true // Permite IDs não pré-gerados

export default function AgentDetailPage() {
  const params = useParams()
  
  // Validação explícita do parâmetro
  if (!params.id || typeof params.id !== 'string') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">Invalid agent ID</p>
            <Link href="/marketplace">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Marketplace
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Validação numérica
  const idNumber = Number(params.id)
  if (isNaN(idNumber) || idNumber < 0 || !Number.isInteger(idNumber)) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">Agent ID must be a valid number</p>
            <Link href="/marketplace">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Marketplace
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const agentId = BigInt(idNumber)
  const { address } = useAccount()
  const [chatOpen, setChatOpen] = useState(false)

  const { data: agentData, isLoading: agentLoading } = useAgent(agentId)
  const { data: capabilities } = useAgentCapabilities(agentId)
  const { data: ownership } = useAgentOwnership(agentId, address)

  if (agentLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading agent...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!agentData || !agentId) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Agent not found</p>
            <Link href="/marketplace">
              <Button variant="outline" className="mt-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Marketplace
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const agent = {
    id: agentData[0],
    creator: agentData[1],
    name: agentData[2],
    avatar: agentData[3],
    description: agentData[4],
    personality: agentData[5],
    price: agentData[6],
    totalSupply: agentData[7],
    circulatingSupply: agentData[8],
    createdAt: agentData[9],
    isActive: agentData[10],
    capabilities: capabilities ? [...capabilities] : [],
    ownership: ownership || BigInt(0),
  }

  const ownershipPercentage =
    agent.totalSupply > BigInt(0)
      ? (Number(agent.circulatingSupply) / Number(agent.totalSupply)) * 100
      : 0

  const createdAt = new Date(Number(agent.createdAt) * 1000)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Link href="/marketplace">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Marketplace
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Agent Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="h-20 w-20 border-2 border-primary/20">
                    <AvatarImage src={agent.avatar} alt={agent.name} />
                    <AvatarFallback>{agent.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-3xl mb-2">{agent.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Badge variant="outline" className="font-mono">
                        #{agent.id.toString()}
                      </Badge>
                      <span>{formatDistanceToNow(createdAt, { addSuffix: true })}</span>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{agent.description}</p>
                </div>

                {agent.personality && (
                  <div>
                    <h3 className="font-semibold mb-2">Personality</h3>
                    <p className="text-muted-foreground">{agent.personality}</p>
                  </div>
                )}

                {agent.capabilities && agent.capabilities.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Capabilities</h3>
                    <div className="flex flex-wrap gap-2">
                      {agent.capabilities.map((cap, i) => (
                        <Badge key={i} variant="secondary">
                          {cap}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-4 pt-4 border-t">
                  <Button onClick={() => setChatOpen(true)} className="gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Chat with Agent
                  </Button>
                  <Button variant="outline" className="gap-2" asChild>
                    <a
                      href={`https://testnet.arcscan.app/address/${agent.creator}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View Creator
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Marketplace Listings */}
            <MarketplaceListings agentId={agent.id} agentName={agent.name} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Token Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Price per Token</p>
                  <p className="text-2xl font-bold">{formatEther(agent.price)} USDC</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Supply</p>
                  <p className="text-lg font-semibold">{agent.totalSupply.toString()}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Circulating Supply</p>
                  <p className="text-lg font-semibold">{agent.circulatingSupply.toString()}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Ownership Distributed</p>
                  <p className="text-lg font-semibold">{ownershipPercentage.toFixed(1)}%</p>
                </div>

                {agent.ownership && agent.ownership > BigInt(0) && (
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Your Ownership</p>
                    <p className="text-xl font-bold">{agent.ownership.toString()} tokens</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {((Number(agent.ownership) / Number(agent.totalSupply)) * 100).toFixed(2)}% of total
                    </p>
                  </div>
                )}

                <div className="pt-4 border-t space-y-2">
                  <PurchaseTokensDialog agent={agent} />
                  {agent.ownership && agent.ownership > BigInt(0) && (
                    <CreateListingDialog
                      agent={agent}
                      userOwnership={agent.ownership}
                    />
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Creator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono">
                    {formatAddress(agent.creator)}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Chat Dialog */}
      <AgentChatDialog
        agent={agent}
        open={chatOpen}
        onOpenChange={setChatOpen}
      />
    </div>
  )
}


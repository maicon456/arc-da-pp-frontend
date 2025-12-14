'use client'

import { useState, useEffect } from 'react'
import { useAccount, useChainId, useReadContract } from 'wagmi'
import { arcTestnet } from '@/lib/arcChain'
import { VirtualAgentABI, getVirtualAgentAddress, isContractConfigured } from '@/lib/virtualAgentContract'
import { useAllAgents, type Agent } from '@/lib/hooks/useVirtualAgents'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Bot, Search, Sparkles, Twitter, MessageCircle, Globe } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { formatEther } from '@/lib/utils'
import { CreateAgentDialog } from '@/components/virtual-agents/create-agent-dialog'
import { AgentCard } from '@/components/virtual-agents/agent-card'
import { AgentChatDialog } from '@/components/virtual-agents/agent-chat-dialog'
import { ConnectWalletButton } from '@/components/connect-wallet-button'
import Link from 'next/link'

export default function MarketplacePage() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [chatOpen, setChatOpen] = useState(false)

  const isCorrectChain = chainId === arcTestnet.id
  const contractAddress = getVirtualAgentAddress()
  const contractConfigured = isContractConfigured()

  // Get agent count
  const { data: agentCount } = useReadContract({
    address: isConnected && isCorrectChain && contractAddress ? contractAddress : undefined,
    abi: VirtualAgentABI,
    functionName: 'getAgentCount',
    query: {
      enabled: isConnected && isCorrectChain && contractConfigured,
      refetchInterval: 10000,
    },
  })

  // Load all agents using custom hook
  const { agents, isLoading, error: agentsError } = useAllAgents()

  // Handle errors
  useEffect(() => {
    if (agentsError) {
      toast({
        title: 'Error loading agents',
        description: agentsError.message || 'Failed to load agents',
        variant: 'destructive',
      })
    }
  }, [agentsError, toast])

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary via-primary/80 to-accent flex items-center justify-center shadow-lg">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">
                  Arcnet<span className="bg-gradient-to-r from-primary via-chart-1 to-chart-2 bg-clip-text text-transparent font-extrabold">AI</span>
                </h1>
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-primary">AI</span> Agent Marketplace
                </p>
              </div>
            </Link>
            <div className="flex items-center gap-3">
              <a
                href="https://easyfaucetarc.xyz/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm" className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  Faucet
                </Button>
              </a>
              <ConnectWalletButton variant="outline" size="sm" />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary/20 via-primary/10 to-accent/20 text-primary text-sm mb-6 border border-primary/30 backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            <span className="font-medium">Built on Arc Network</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Create & Trade <span className="bg-gradient-to-r from-primary via-chart-1 to-chart-2 bg-clip-text text-transparent font-extrabold">AI</span> Agents
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Tokenize your <span className="font-semibold text-primary">AI</span> agents, enable co-ownership, and trade them on the marketplace.
            Every agent is a unique asset on Arc Network.
          </p>
          {isConnected && isCorrectChain && contractConfigured && (
            <CreateAgentDialog onAgentCreated={() => {}} />
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{Number(agentCount || 0)}</div>
              <p className="text-xs text-muted-foreground">Total Agents</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{agents.length}</div>
              <p className="text-xs text-muted-foreground">Active Agents</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                {agents.reduce((sum, a) => sum + Number(a.circulatingSupply || 0), 0)}
              </div>
              <p className="text-xs text-muted-foreground">Tokens Circulating</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                    {address ? agents.filter(a => (a.ownership || BigInt(0)) > BigInt(0)).length : 0}
              </div>
              <p className="text-xs text-muted-foreground">Your Agents</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search agents by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Agents Grid */}
        {!contractConfigured ? (
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <Bot className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Contract Not Deployed</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Deploy the Arcnet<span className="font-extrabold text-primary">AI</span> contract to start creating <span className="font-semibold text-primary">AI</span> agents.
              </p>
            </CardContent>
          </Card>
        ) : isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-muted-foreground">Loading agents...</div>
          </div>
        ) : filteredAgents.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <Bot className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No agents found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {searchQuery ? 'Try a different search term' : 'Be the first to create an agent!'}
              </p>
              {isConnected && isCorrectChain && contractConfigured && (
                <CreateAgentDialog onAgentCreated={() => {}} />
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map((agent) => (
              <AgentCard
                key={agent.id.toString()}
                agent={agent}
                onChat={() => {
                  setSelectedAgent(agent)
                  setChatOpen(true)
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Chat Dialog */}
      {selectedAgent && (
        <AgentChatDialog
          agent={selectedAgent}
          open={chatOpen}
          onOpenChange={setChatOpen}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 bg-gradient-to-b from-background to-background/95 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-sm text-muted-foreground">
              <p>
                Built on{" "}
                <a
                  href="https://arc.network"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline transition-colors"
                >
                  Arc Network
                </a>{" "}
                • Testnet
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Connect with Arc:</span>
              <div className="flex gap-3">
                <a
                  href="https://x.com/arc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1DA1F2] to-[#0d8bd9] hover:from-[#0d8bd9] hover:to-[#1DA1F2] flex items-center justify-center transition-all group shadow-lg hover:shadow-xl"
                  aria-label="X (Twitter)"
                >
                  <Twitter className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://discord.gg/arc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#5865F2] to-[#4752C4] hover:from-[#4752C4] hover:to-[#5865F2] flex items-center justify-center transition-all group shadow-lg hover:shadow-xl"
                  aria-label="Discord"
                >
                  <MessageCircle className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://www.arc.network"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 hover:from-primary/80 hover:to-primary flex items-center justify-center transition-all group shadow-lg hover:shadow-xl"
                  aria-label="Arc Network Website"
                >
                  <Globe className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}


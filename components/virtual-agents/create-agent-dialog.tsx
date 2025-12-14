'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { VirtualAgentABI, getVirtualAgentAddress, isContractConfigured } from '@/lib/virtualAgentContract'
import { useCreateAgent } from '@/lib/hooks/useVirtualAgents'
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
import { Textarea } from '@/components/ui/textarea'
import { Plus, Loader2, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'

interface CreateAgentDialogProps {
  onAgentCreated: () => void
}

const DEFAULT_CAPABILITIES = [
  'Data Analysis',
  'Content Generation',
  'Translation',
  'Text Summarization',
  'Code Generation',
  'Customer Support',
]

export function CreateAgentDialog({ onAgentCreated }: CreateAgentDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    avatar: '',
    description: '',
    personality: '',
    capabilities: [] as string[],
    price: '',
    totalSupply: '',
  })
  const { address, isConnected } = useAccount()
  const { toast } = useToast()

  const {
    createAgent: createAgentOnChain,
    hash,
    isPending: isPendingTx,
    isConfirming,
    isConfirmed,
    error: writeError,
  } = useCreateAgent()

  const handleCapabilityToggle = (capability: string) => {
    setFormData((prev) => ({
      ...prev,
      capabilities: prev.capabilities.includes(capability)
        ? prev.capabilities.filter((c) => c !== capability)
        : [...prev.capabilities, capability],
    }))
  }

  const handleCreate = async () => {
    if (!isConnected) {
      toast({
        title: 'Wallet not connected',
        description: 'Please connect your wallet first',
        variant: 'destructive',
      })
      return
    }

    if (!isContractConfigured()) {
      toast({
        title: 'Contract not deployed',
        description: 'Please deploy the ArcnetAI contract first. See DEPLOY_INSTRUCTIONS.md',
        variant: 'destructive',
      })
      return
    }

    if (!formData.name || !formData.description || !formData.personality) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      })
      return
    }

    if (!formData.price || !formData.totalSupply) {
      toast({
        title: 'Missing fields',
        description: 'Please set price and total supply',
        variant: 'destructive',
      })
      return
    }

    const contractAddress = getVirtualAgentAddress()
    if (!contractAddress) {
      toast({
        title: 'Contract not configured',
        description: 'Please set NEXT_PUBLIC_VIRTUAL_AGENT_ADDRESS (ArcnetAI contract) in .env.local',
        variant: 'destructive',
      })
      return
    }

    try {
      const priceWei = BigInt(Math.floor(parseFloat(formData.price) * 10 ** 18))
      const totalSupply = BigInt(formData.totalSupply)

      await createAgentOnChain(
        formData.name,
        formData.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${formData.name}`,
        formData.description,
        formData.personality,
        formData.capabilities,
        priceWei,
        totalSupply
      )
    } catch (error: any) {
      console.error('Error creating agent:', error)
      toast({
        title: 'Error',
        description: error.message || 'Failed to create agent',
        variant: 'destructive',
      })
    }
  }

  // Handle success
  useEffect(() => {
    if (isConfirmed && hash) {
      toast({
        title: 'Agent created! 🎉',
            description: 'Your AI agent has been tokenized on Arc Network',
      })
      setFormData({
        name: '',
        avatar: '',
        description: '',
        personality: '',
        capabilities: [],
        price: '',
        totalSupply: '',
      })
      setOpen(false)
      onAgentCreated()
    }
  }, [isConfirmed, hash, toast, onAgentCreated])

  const isLoading = isPendingTx || isConfirming

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2">
          <Plus className="h-5 w-5" />
          Create Agent
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Create <span className="font-semibold text-primary">AI</span> Agent
          </DialogTitle>
          <DialogDescription>
                Tokenize your <span className="font-semibold text-primary">AI</span> agent on Arc Network. Set ownership tokens and initial price.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Agent Name *</Label>
            <Input
              id="name"
              placeholder="e.g., Financial Assistant"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="avatar">Avatar URL (optional)</Label>
            <Input
              id="avatar"
              placeholder="https://example.com/avatar.png"
              value={formData.avatar}
              onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe your agent's capabilities..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="personality">Personality *</Label>
            <Textarea
              id="personality"
              placeholder="Describe your agent's personality traits..."
              value={formData.personality}
              onChange={(e) => setFormData({ ...formData, personality: e.target.value })}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label>Capabilities</Label>
            <div className="flex flex-wrap gap-2">
              {DEFAULT_CAPABILITIES.map((cap) => (
                <Badge
                  key={cap}
                  variant={formData.capabilities.includes(cap) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => handleCapabilityToggle(cap)}
                >
                  {cap}
                  {formData.capabilities.includes(cap) && (
                    <X className="ml-1 h-3 w-3" />
                  )}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price per Token (USDC) *</Label>
              <Input
                id="price"
                type="number"
                step="0.001"
                placeholder="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalSupply">Total Supply *</Label>
              <Input
                id="totalSupply"
                type="number"
                placeholder="1000"
                value={formData.totalSupply}
                onChange={(e) => setFormData({ ...formData, totalSupply: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? 'Creating...' : 'Create Agent'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}


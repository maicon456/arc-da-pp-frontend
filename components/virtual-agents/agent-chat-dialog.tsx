'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Send, Bot, User, Loader2, ExternalLink } from 'lucide-react'
import { formatEther } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import { useInteractWithAgent } from '@/lib/hooks/useVirtualAgents'
import { arcTestnet } from '@/lib/arcChain'

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

interface AgentChatDialogProps {
  agent: Agent
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface Message {
  role: 'user' | 'agent'
  content: string
  timestamp: Date
  txHash?: string
}

export function AgentChatDialog({ agent, open, onOpenChange }: AgentChatDialogProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'agent',
      content: `Hello! I'm ${agent.name}. ${agent.description} How can I help you today?`,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const { isConnected } = useAccount()
  const { toast } = useToast()
  const {
    interactWithAgent,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  } = useInteractWithAgent()

  // Handle transaction confirmation
  useEffect(() => {
    if (isConfirmed && hash) {
      // Update the last user message with transaction hash
      setMessages((prev) => {
        const updated = [...prev]
        const lastUserMessageIndex = updated.length - 1
        if (updated[lastUserMessageIndex]?.role === 'user') {
          updated[lastUserMessageIndex] = {
            ...updated[lastUserMessageIndex],
            txHash: hash,
          }
        }
        return updated
      })

      // Simulate AI response (in production, this would call an AI API)
      setTimeout(() => {
        const agentMessage: Message = {
          role: 'agent',
          content: `Based on my personality (${agent.personality}), I understand you're asking about "${input}". Let me help you with that!`,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, agentMessage])
      }, 1000)

      toast({
        title: 'Message sent on-chain! ✅',
        description: 'Your interaction has been recorded on Arc Network',
      })
    }
    if (error) {
      toast({
        title: 'Transaction failed',
        description: error.message || 'Failed to send message',
        variant: 'destructive',
      })
    }
  }, [isConfirmed, hash, error, input, agent.personality, toast])

  const handleSend = async () => {
    if (!input.trim() || isPending || isConfirming) return

    if (!isConnected) {
      toast({
        title: 'Wallet not connected',
        description: 'Please connect your wallet to interact with agents',
        variant: 'destructive',
      })
      return
    }

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const messageToSend = input
    setInput('')

    try {
      // Send transaction on-chain - this will charge gas fees
      await interactWithAgent(agent.id, messageToSend)
    } catch (err: any) {
      console.error('Error sending message:', err)
      toast({
        title: 'Error',
        description: err.message || 'Failed to send message',
        variant: 'destructive',
      })
      // Remove the message if transaction failed
      setMessages((prev) => prev.slice(0, -1))
    }
  }

  const isLoading = isPending || isConfirming

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] h-[80vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={agent.avatar} alt={agent.name} />
              <AvatarFallback>{agent.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle>{agent.name}</DialogTitle>
              <DialogDescription>{agent.description}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4 py-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <Avatar className="h-8 w-8">
                  {message.role === 'user' ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <>
                      <AvatarImage src={agent.avatar} />
                      <AvatarFallback>
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </>
                  )}
                </Avatar>
                <div
                  className={`flex-1 rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                    {message.txHash && (
                      <a
                        href={`https://testnet.arcscan.app/tx/${message.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs opacity-70 hover:opacity-100 flex items-center gap-1"
                      >
                        View on ArcScan
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={agent.avatar} />
                  <AvatarFallback>
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 rounded-lg p-3 bg-muted">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <p className="text-sm text-muted-foreground">
                      Sending transaction on-chain...
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="flex flex-col gap-2 pt-4 border-t">
          {!isConnected && (
            <p className="text-xs text-muted-foreground text-center">
              Connect your wallet to interact with agents (each message requires gas fees)
            </p>
          )}
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
              disabled={isLoading || !isConnected}
            />
            <Button onClick={handleSend} disabled={!input.trim() || isLoading || !isConnected}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

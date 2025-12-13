'use client'

import { useState, useEffect } from 'react'
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
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Loader2, FileText, Image, Bot, MessageSquare, Plus } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useCreateForumPost, PostType, useAllAgents } from '@/lib/hooks/useVirtualAgents'
import { isContractConfigured } from '@/lib/virtualAgentContract'

interface CreateForumPostDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

export function CreateForumPostDialog({
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  children,
  onPostCreated,
}: CreateForumPostDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen
  const setOpen = controlledOnOpenChange || setInternalOpen

  const { isConnected } = useAccount()
  const { toast } = useToast()
  const { agents } = useAllAgents()
  const {
    createForumPost,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  } = useCreateForumPost()

  // Debug logs
  useEffect(() => {
    if (hash) {
      console.log('✅ Transaction hash received:', hash)
    }
    if (isPending) {
      console.log('⏳ Transaction pending...')
    }
    if (isConfirming) {
      console.log('⏳ Transaction confirming...')
    }
    if (isConfirmed) {
      console.log('✅ Transaction confirmed!')
    }
  }, [hash, isPending, isConfirming, isConfirmed])

  const [formData, setFormData] = useState({
    postType: PostType.Discussion.toString(),
    title: '',
    content: '',
    attachments: '',
    agentId: '',
  })

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
        description: 'Please deploy the ArcnetAI contract first',
        variant: 'destructive',
      })
      return
    }

    if (!formData.title || !formData.content) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in title and content',
        variant: 'destructive',
      })
      return
    }

    const postType = parseInt(formData.postType) as PostType
    const attachments = formData.attachments
      .split(',')
      .map((url) => url.trim())
      .filter((url) => url.length > 0)

    const agentId = postType === PostType.Agent && formData.agentId
      ? BigInt(formData.agentId)
      : 0n

    if (postType === PostType.Agent && !formData.agentId) {
      toast({
        title: 'Agent ID required',
        description: 'Please select an agent for Agent posts',
        variant: 'destructive',
      })
      return
    }

    try {
      // writeContract doesn't return a promise, so we just call it
      // The transaction will be triggered and hash/error will be available via the hook state
      createForumPost(postType, formData.title, formData.content, attachments, agentId)
    } catch (err: any) {
      console.error('Error creating post:', err)
      toast({
        title: 'Error',
        description: err.message || 'Failed to create post',
        variant: 'destructive',
      })
    }
  }

  useEffect(() => {
    if (isConfirmed && hash) {
      toast({
        title: 'Post created! 🎉',
        description: `Your post has been published on-chain. Transaction: ${hash.slice(0, 10)}...${hash.slice(-8)}`,
      })
      setFormData({
        postType: PostType.Discussion.toString(),
        title: '',
        content: '',
        attachments: '',
        agentId: '',
      })
      setOpen(false)
      // Notify parent to refetch posts
      if (onPostCreated) {
        setTimeout(() => {
          onPostCreated()
        }, 2000) // Wait 2 seconds for transaction to be indexed
      }
    }
  }, [isConfirmed, hash, toast, setOpen, onPostCreated])

  useEffect(() => {
    if (error) {
      console.error('❌ Forum post error:', error)
      toast({
        title: 'Error',
        description: error.message || error.shortMessage || 'Failed to create post',
        variant: 'destructive',
      })
    }
  }, [error, toast])

  const isLoading = isPending || isConfirming

  const getPostTypeIcon = (type: PostType) => {
    switch (type) {
      case PostType.Document:
        return <FileText className="h-4 w-4" />
      case PostType.Photo:
        return <Image className="h-4 w-4" />
      case PostType.Agent:
        return <Bot className="h-4 w-4" />
      case PostType.Discussion:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children ? (
        <DialogTrigger asChild>{children}</DialogTrigger>
      ) : (
        <Button size="lg" className="gap-2" onClick={() => setOpen(true)}>
          <Plus className="h-5 w-5" />
          Create Post
        </Button>
      )}
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Forum Post</DialogTitle>
          <DialogDescription>
                Share documents, photos, <span className="font-semibold text-primary">AI</span> (Inteligência Artificial) agents, or start a discussion. Each post creates an on-chain transaction.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="postType">Post Type *</Label>
            <Select
              value={formData.postType}
              onValueChange={(value) => setFormData({ ...formData, postType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select post type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={PostType.Document.toString()}>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Document
                  </div>
                </SelectItem>
                <SelectItem value={PostType.Photo.toString()}>
                  <div className="flex items-center gap-2">
                    <Image className="h-4 w-4" />
                    Photo
                  </div>
                </SelectItem>
                <SelectItem value={PostType.Agent.toString()}>
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4" />
                    <span className="font-semibold text-primary">AI</span> Agent
                  </div>
                </SelectItem>
                <SelectItem value={PostType.Discussion.toString()}>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Discussion
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {parseInt(formData.postType) === PostType.Agent && (
            <div className="space-y-2">
              <Label htmlFor="agentId">Agent ID *</Label>
              <Select
                value={formData.agentId}
                onValueChange={(value) => setFormData({ ...formData, agentId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an agent" />
                </SelectTrigger>
                <SelectContent>
                  {agents.map((agent) => (
                    <SelectItem key={agent.id.toString()} value={agent.id.toString()}>
                      {agent.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="Enter post title..."
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              placeholder="Write your post content..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={6}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="attachments">Attachments (URLs, comma-separated)</Label>
            <Input
              id="attachments"
              placeholder="https://example.com/file.pdf, https://ipfs.io/ipfs/..."
              value={formData.attachments}
              onChange={(e) => setFormData({ ...formData, attachments: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">
              Add URLs or IPFS hashes for documents, photos, or other files
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={isLoading || !formData.title || !formData.content}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? 'Publishing...' : 'Publish Post'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

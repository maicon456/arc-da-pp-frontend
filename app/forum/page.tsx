'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, FileText, Image, Bot, MessageSquare, Heart, ExternalLink, Loader2 } from 'lucide-react'
import { useAllForumPosts, useCreateForumPost, useLikeForumPost, PostType } from '@/lib/hooks/useVirtualAgents'
import { useToast } from '@/hooks/use-toast'
import { formatAddress } from '@/lib/utils'
import { CreateForumPostDialog } from '@/components/forum/create-forum-post-dialog'
import { ForumPostCard } from '@/components/forum/forum-post-card'
import { ConnectWalletButton } from '@/components/connect-wallet-button'
import { useEffect } from 'react'

export default function ForumPage() {
  const { isConnected } = useAccount()
  const { posts, isLoading, error } = useAllForumPosts()
  const { toast } = useToast()
  const [createPostOpen, setCreatePostOpen] = useState(false)
  const [filterType, setFilterType] = useState<PostType | 'all'>('all')

  const filteredPosts = filterType === 'all' 
    ? posts 
    : posts.filter(p => p.postType === filterType)

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

  const getPostTypeLabel = (type: PostType) => {
    switch (type) {
      case PostType.Document:
        return 'Document'
      case PostType.Photo:
        return 'Photo'
      case PostType.Agent:
        return 'Agent'
      case PostType.Discussion:
        return 'Discussion'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary via-chart-1 to-chart-2 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">Forum</h1>
                <p className="text-xs text-muted-foreground">Share documents, photos, and AI agents</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ConnectWalletButton variant="outline" size="sm" />
              {isConnected && (
                <CreateForumPostDialog open={createPostOpen} onOpenChange={setCreatePostOpen} />
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Tabs value={filterType === 'all' ? 'all' : filterType.toString()} onValueChange={(v) => setFilterType(v === 'all' ? 'all' : Number(v) as PostType)}>
            <TabsList>
              <TabsTrigger value="all">All Posts</TabsTrigger>
              <TabsTrigger value={PostType.Document.toString()}>
                <FileText className="h-4 w-4 mr-2" />
                Documents
              </TabsTrigger>
              <TabsTrigger value={PostType.Photo.toString()}>
                <Image className="h-4 w-4 mr-2" />
                Photos
              </TabsTrigger>
              <TabsTrigger value={PostType.Agent.toString()}>
                <Bot className="h-4 w-4 mr-2" />
                Agents
              </TabsTrigger>
              <TabsTrigger value={PostType.Discussion.toString()}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Discussions
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {!isConnected && (
          <Card className="mb-6 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-muted-foreground mb-4">
                  Connect your wallet to create posts and interact with the forum
                </p>
                <ConnectWalletButton />
              </div>
            </CardContent>
          </Card>
        )}

        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {error && (
          <Card className="mb-6 border-destructive">
            <CardContent className="pt-6">
              <p className="text-destructive">Error loading posts: {error.message}</p>
            </CardContent>
          </Card>
        )}

        {!isLoading && !error && filteredPosts.length === 0 && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
                <p className="text-muted-foreground mb-4">
                  Be the first to share a document, photo, or AI agent!
                </p>
                {isConnected && (
                  <Button onClick={() => setCreatePostOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Post
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {!isLoading && !error && filteredPosts.length > 0 && (
          <div className="grid gap-6">
            {filteredPosts.map((post) => (
              <ForumPostCard key={post.id.toString()} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


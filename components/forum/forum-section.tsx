'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Plus, Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useAllForumPosts, PostType } from '@/lib/hooks/useVirtualAgents'
import { ForumPostCard } from './forum-post-card'
import { CreateForumPostDialog } from './create-forum-post-dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageSquare } from 'lucide-react'

export function ForumSection() {
  const { isConnected } = useAccount()
  const { toast } = useToast()
  const { posts, isLoading, error, refetch } = useAllForumPosts()
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  
  // Refetch posts when dialog closes (in case a new post was created)
  useEffect(() => {
    if (!createDialogOpen) {
      // Small delay to ensure transaction is confirmed
      const timer = setTimeout(() => {
        refetch()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [createDialogOpen, refetch])

  if (!isConnected) {
    return (
      <div className="py-20 text-center">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 justify-center">
              <MessageSquare className="h-5 w-5" />
              Connect Your Wallet
            </CardTitle>
            <CardDescription>
              Connect your wallet to view and create forum posts
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Community Forum</h2>
          <p className="text-muted-foreground mt-2">
                Share documents, photos, <span className="font-semibold text-primary">AI</span> (Inteligência Artificial) agents, and discussions. Every interaction is on-chain.
          </p>
        </div>
        <CreateForumPostDialog 
          open={createDialogOpen} 
          onOpenChange={setCreateDialogOpen}
          onPostCreated={refetch}
        >
          <Button size="lg" className="gap-2">
            <Plus className="h-5 w-5" />
            Create Post
          </Button>
        </CreateForumPostDialog>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )}

      {error && (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Error loading posts</CardTitle>
            <CardDescription>{error.message}</CardDescription>
          </CardHeader>
        </Card>
      )}

      {!isLoading && !error && posts.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
            <p className="text-muted-foreground mb-4">
              Be the first to share something with the community!
            </p>
            <CreateForumPostDialog 
              open={createDialogOpen} 
              onOpenChange={setCreateDialogOpen}
              onPostCreated={refetch}
            >
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create First Post
              </Button>
            </CreateForumPostDialog>
          </CardContent>
        </Card>
      )}

      {!isLoading && posts.length > 0 && (
        <div className="space-y-4">
          {posts.map((post) => (
            <ForumPostCard key={post.id.toString()} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}


'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { FileText, Image, Bot, MessageSquare, Heart, ExternalLink, Loader2, Send } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useLikeForumPost, useCommentOnForumPost, ForumPost, PostType } from '@/lib/hooks/useVirtualAgents'
import { formatAddress } from '@/lib/utils'

interface ForumPostCardProps {
  post: ForumPost
}

export function ForumPostCard({ post }: ForumPostCardProps) {
  const { isConnected, address } = useAccount()
  const { toast } = useToast()
  const { likePost, hash: likeHash, isPending: isLiking, isConfirmed: isLiked } = useLikeForumPost()
  const { commentOnPost, hash: commentHash, isPending: isCommenting, isConfirmed: isCommented } = useCommentOnForumPost()
  const [comment, setComment] = useState('')
  const [showComments, setShowComments] = useState(false)

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
        return 'AI Agent'
      case PostType.Discussion:
        return 'Discussion'
    }
  }

  const handleLike = async () => {
    if (!isConnected) {
      toast({
        title: 'Wallet not connected',
        description: 'Please connect your wallet to like posts',
        variant: 'destructive',
      })
      return
    }

    if (post.hasLiked) {
      toast({
        title: 'Already liked',
        description: 'You have already liked this post',
        variant: 'destructive',
      })
      return
    }

    try {
      await likePost(post.id)
    } catch (err: any) {
      console.error('Error liking post:', err)
    }
  }

  const handleComment = async () => {
    if (!isConnected) {
      toast({
        title: 'Wallet not connected',
        description: 'Please connect your wallet to comment',
        variant: 'destructive',
      })
      return
    }

    if (!comment.trim()) {
      toast({
        title: 'Empty comment',
        description: 'Please enter a comment',
        variant: 'destructive',
      })
      return
    }

    try {
      await commentOnPost(post.id, comment)
      setComment('')
    } catch (err: any) {
      console.error('Error commenting:', err)
    }
  }

  useEffect(() => {
    if (isLiked && likeHash) {
      toast({
        title: 'Post liked! ✅',
        description: 'Your like has been recorded on-chain',
      })
    }
  }, [isLiked, likeHash, toast])

  useEffect(() => {
    if (isCommented && commentHash) {
      toast({
        title: 'Comment posted! ✅',
        description: 'Your comment has been recorded on-chain',
      })
    }
  }, [isCommented, commentHash, toast])

  const createdAt = new Date(Number(post.createdAt) * 1000)

  return (
    <Card className="hover:border-primary/50 transition-colors">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <Avatar>
              <AvatarFallback>{formatAddress(post.author).slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold">{formatAddress(post.author)}</span>
                <span className="text-xs text-muted-foreground">
                  {createdAt.toLocaleDateString()} {createdAt.toLocaleTimeString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  {getPostTypeIcon(post.postType)}
                  {getPostTypeLabel(post.postType)}
                </div>
                {post.postType === PostType.Agent && (
                  <span className="text-xs text-muted-foreground">
                    Agent ID: {post.agentId.toString()}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <CardTitle className="mt-4">{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm whitespace-pre-wrap">{post.content}</p>

        {post.attachments && post.attachments.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Attachments:</p>
            <div className="flex flex-wrap gap-2">
              {post.attachments.map((url, index) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline flex items-center gap-1"
                >
                  {url}
                  <ExternalLink className="h-3 w-3" />
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-4 pt-4 border-t">
          <Button
            variant={post.hasLiked ? 'default' : 'outline'}
            size="sm"
            onClick={handleLike}
            disabled={isLiking || !isConnected || post.hasLiked}
            className="gap-2"
          >
            {isLiking ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Heart className={`h-4 w-4 ${post.hasLiked ? 'fill-current' : ''}`} />
            )}
            {post.likes.toString()}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowComments(!showComments)}
            className="gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Comments
          </Button>
        </div>

        {showComments && (
          <div className="pt-4 border-t space-y-3">
            <div className="flex gap-2">
              <Input
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleComment()
                  }
                }}
                disabled={isCommenting || !isConnected}
              />
              <Button
                onClick={handleComment}
                disabled={isCommenting || !isConnected || !comment.trim()}
                size="sm"
              >
                {isCommenting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            {!isConnected && (
              <p className="text-xs text-muted-foreground">
                Connect your wallet to comment (each comment creates an on-chain transaction)
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}


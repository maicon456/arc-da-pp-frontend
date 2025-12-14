/**
 * Custom hooks for ArcnetAI contract interactions
 */

import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useAccount, useChainId } from 'wagmi'
import { arcTestnet } from '@/lib/arcChain'
import { VirtualAgentABI, getVirtualAgentAddress, isContractConfigured } from '@/lib/virtualAgentContract'
import { useEffect, useState } from 'react'
import { createPublicClient, http, encodeFunctionData } from 'viem'
import { getGasConfig } from '@/lib/gas-fees'

export interface Agent {
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

/**
 * Hook to get total agent count
 */
export function useAgentCount() {
  const { isConnected } = useAccount()
  const chainId = useChainId()
  const contractAddress = getVirtualAgentAddress()
  const isCorrectChain = chainId === arcTestnet.id

  return useReadContract({
    address: isConnected && isCorrectChain && contractAddress ? contractAddress : undefined,
    abi: VirtualAgentABI,
    functionName: 'getAgentCount',
    query: {
      enabled: isConnected && isCorrectChain && isContractConfigured(),
      refetchInterval: 10000, // Refetch every 10 seconds
    },
  })
}

/**
 * Hook to get a single agent
 */
export function useAgent(agentId: bigint | number | undefined) {
  const { isConnected } = useAccount()
  const chainId = useChainId()
  const contractAddress = getVirtualAgentAddress()
  const isCorrectChain = chainId === arcTestnet.id

  return useReadContract({
    address: isConnected && isCorrectChain && contractAddress ? contractAddress : undefined,
    abi: VirtualAgentABI,
    functionName: 'getAgent',
    args: agentId !== undefined ? [BigInt(Number(agentId))] : undefined,
    query: {
      enabled: isConnected && isCorrectChain && isContractConfigured() && agentId !== undefined,
    },
  })
}

/**
 * Hook to get agent capabilities
 */
export function useAgentCapabilities(agentId: bigint | number | undefined) {
  const { isConnected } = useAccount()
  const chainId = useChainId()
  const contractAddress = getVirtualAgentAddress()
  const isCorrectChain = chainId === arcTestnet.id

  return useReadContract({
    address: isConnected && isCorrectChain && contractAddress ? contractAddress : undefined,
    abi: VirtualAgentABI,
    functionName: 'getAgentCapabilities',
    args: agentId !== undefined ? [BigInt(Number(agentId))] : undefined,
    query: {
      enabled: isConnected && isCorrectChain && isContractConfigured() && agentId !== undefined,
    },
  })
}

/**
 * Hook to get user's ownership of an agent
 */
export function useAgentOwnership(agentId: bigint | number | undefined, ownerAddress: string | undefined) {
  const { isConnected } = useAccount()
  const chainId = useChainId()
  const contractAddress = getVirtualAgentAddress()
  const isCorrectChain = chainId === arcTestnet.id

  return useReadContract({
    address: isConnected && isCorrectChain && contractAddress ? contractAddress : undefined,
    abi: VirtualAgentABI,
    functionName: 'getOwnership',
    args: agentId !== undefined && ownerAddress ? [BigInt(Number(agentId)), ownerAddress as `0x${string}`] : undefined,
    query: {
      enabled: isConnected && isCorrectChain && isContractConfigured() && agentId !== undefined && !!ownerAddress,
    },
  })
}

/**
 * Hook to load all agents
 */
export function useAllAgents() {
  const { data: agentCount } = useAgentCount()
  const { isConnected, address } = useAccount()
  const chainId = useChainId()
  const contractAddress = getVirtualAgentAddress()
  const isCorrectChain = chainId === arcTestnet.id
  const [agents, setAgents] = useState<Agent[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [mounted, setMounted] = useState(false)

  // Ensure we're on client side
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    async function loadAgents() {
      // Only run on client side
      if (!mounted || typeof window === 'undefined') {
        return
      }

      if (!agentCount || !isConnected || !isCorrectChain || !contractAddress || !isContractConfigured()) {
        setAgents([])
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const publicClient = createPublicClient({
          chain: arcTestnet,
          transport: http(process.env.NEXT_PUBLIC_ARC_RPC_URL || 'https://rpc.testnet.arc.network'),
        })

        const count = Number(agentCount)
        const agentPromises: Promise<Agent>[] = []

        for (let i = 0; i < count; i++) {
          agentPromises.push(
            publicClient.readContract({
              address: contractAddress as `0x${string}`,
              abi: VirtualAgentABI,
              functionName: 'getAgent',
              args: [BigInt(i)],
            }).then((data: any) => ({
              id: BigInt(i),
              creator: data[1] as string,
              name: data[2] as string,
              avatar: data[3] as string,
              description: data[4] as string,
              personality: data[5] as string,
              price: data[6] as bigint,
              totalSupply: data[7] as bigint,
              circulatingSupply: data[8] as bigint,
              createdAt: data[9] as bigint,
              isActive: data[10] as boolean,
            }))
          )
        }

        const loadedAgents = await Promise.all(agentPromises)
        
        // Load capabilities and ownership for each agent
        const agentsWithDetails = await Promise.all(
          loadedAgents.map(async (agent) => {
            try {
              const capabilities = await publicClient.readContract({
                address: contractAddress as `0x${string}`,
                abi: VirtualAgentABI,
                functionName: 'getAgentCapabilities',
                args: [agent.id],
              }).catch(() => [] as string[])

              const ownership = address ? await publicClient.readContract({
                address: contractAddress as `0x${string}`,
                abi: VirtualAgentABI,
                functionName: 'getOwnership',
                args: [agent.id, address as `0x${string}`],
              }).catch(() => BigInt(0)) : BigInt(0)

              return {
                ...agent,
                capabilities: capabilities as string[],
                ownership: ownership as bigint,
              }
            } catch (e) {
              return agent
            }
          })
        )

        setAgents(agentsWithDetails.filter(a => a.isActive).reverse()) // Most recent first, only active
      } catch (err) {
        console.error('Error loading agents:', err)
        setError(err as Error)
        setAgents([])
      } finally {
        setIsLoading(false)
      }
    }

    loadAgents()
  }, [agentCount, isConnected, isCorrectChain, contractAddress, mounted, address])

  return { agents, isLoading, error, refetch: () => {} }
}

/**
 * Hook to create an agent
 */
export function useCreateAgent() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const createAgent = async (
    name: string,
    avatar: string,
    description: string,
    personality: string,
    capabilities: string[],
    price: bigint,
    totalSupply: bigint
  ) => {
    if (!isConnected) {
      throw new Error('Wallet not connected')
    }

    if (!address) {
      throw new Error('Wallet address not available')
    }

    if (chainId !== arcTestnet.id) {
      throw new Error(`Wrong network. Please switch to Arc Testnet (Chain ID: ${arcTestnet.id})`)
    }

    const contractAddress = getVirtualAgentAddress()
    if (!contractAddress) {
      throw new Error('Contract not configured')
    }

    // Get gas configuration for Arc Network (EIP-1559)
    const { maxFeePerGas, maxPriorityFeePerGas } = await getGasConfig()

    // writeContract doesn't return a promise - it triggers the transaction
    // The hash will be available in the 'hash' state from useWriteContract
    writeContract({
      address: contractAddress,
      abi: VirtualAgentABI,
      functionName: 'createAgent',
      args: [name, avatar, description, personality, capabilities, price, totalSupply],
      maxFeePerGas,
      maxPriorityFeePerGas,
    })
  }

  return {
    createAgent,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  }
}

/**
 * Hook to purchase agent tokens
 */
export function usePurchaseAgentTokens() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const purchaseTokens = async (agentId: bigint | number, amount: bigint | number, value: bigint) => {
    const contractAddress = getVirtualAgentAddress()
    if (!contractAddress) {
      throw new Error('Contract not configured')
    }

    // Get gas configuration for Arc Network (EIP-1559)
    const { maxFeePerGas, maxPriorityFeePerGas } = await getGasConfig()

    writeContract({
      address: contractAddress,
      abi: VirtualAgentABI,
      functionName: 'purchaseAgentTokens',
      args: [BigInt(Number(agentId)), BigInt(Number(amount))],
      value,
      maxFeePerGas,
      maxPriorityFeePerGas,
    })
  }

  return {
    purchaseTokens,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  }
}

/**
 * Hook to create a marketplace listing
 */
export function useCreateListing() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { address } = useAccount()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const createListing = async (
    agentId: bigint | number,
    price: bigint,
    amount: bigint | number
  ) => {
    const contractAddress = getVirtualAgentAddress()
    if (!contractAddress) {
      throw new Error('Contract not configured')
    }

    if (!address) {
      throw new Error('Wallet not connected')
    }

    // Get gas configuration for Arc Network (EIP-1559)
    const { maxFeePerGas, maxPriorityFeePerGas } = await getGasConfig()

    // Estimate gas limit
    const publicClient = createPublicClient({
      chain: arcTestnet,
      transport: http('https://rpc.testnet.arc.network'),
    })

    let gasLimit: bigint
    try {
      const estimatedGas = await publicClient.estimateGas({
        account: address as `0x${string}`,
        to: contractAddress,
        data: encodeFunctionData({
          abi: VirtualAgentABI,
          functionName: 'createListing',
          args: [BigInt(Number(agentId)), price, BigInt(Number(amount))],
        }),
      })
      gasLimit = (estimatedGas * 120n) / 100n // 20% buffer
    } catch (error) {
      console.warn('Gas estimation failed, using default:', error)
      gasLimit = 200000n // Default for non-payable functions
    }

    writeContract({
      address: contractAddress,
      abi: VirtualAgentABI,
      functionName: 'createListing',
      args: [BigInt(Number(agentId)), price, BigInt(Number(amount))],
      maxFeePerGas,
      maxPriorityFeePerGas,
      gas: gasLimit,
    })
  }

  return {
    createListing,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  }
}

/**
 * Hook to fill a marketplace listing (buy from another user)
 */
export function useFillListing() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const fillListing = async (listingId: bigint | number, amount: bigint | number, value: bigint) => {
    const contractAddress = getVirtualAgentAddress()
    if (!contractAddress) {
      throw new Error('Contract not configured')
    }

    // Get gas configuration for Arc Network (EIP-1559)
    const { maxFeePerGas, maxPriorityFeePerGas } = await getGasConfig()

    writeContract({
      address: contractAddress,
      abi: VirtualAgentABI,
      functionName: 'fillListing',
      args: [BigInt(Number(listingId)), BigInt(Number(amount))],
      value,
      maxFeePerGas,
      maxPriorityFeePerGas,
    })
  }

  return {
    fillListing,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  }
}

/**
 * Hook to get a listing
 */
export function useListing(listingId: bigint | number | undefined) {
  const { isConnected } = useAccount()
  const chainId = useChainId()
  const contractAddress = getVirtualAgentAddress()
  const isCorrectChain = chainId === arcTestnet.id

  return useReadContract({
    address: isConnected && isCorrectChain && contractAddress ? contractAddress : undefined,
    abi: VirtualAgentABI,
    functionName: 'listings',
    args: listingId !== undefined ? [BigInt(Number(listingId))] : undefined,
    query: {
      enabled: isConnected && isCorrectChain && isContractConfigured() && listingId !== undefined,
    },
  })
}

/**
 * Hook to get all listings for an agent
 */
export function useAgentListings(agentId: bigint | number | undefined) {
  const { isConnected } = useAccount()
  const chainId = useChainId()
  const contractAddress = getVirtualAgentAddress()
  const isCorrectChain = chainId === arcTestnet.id
  
  const { data: listingCount } = useReadContract({
    address: isConnected && isCorrectChain && contractAddress ? contractAddress : undefined,
    abi: VirtualAgentABI,
    functionName: 'nextListingId',
    query: {
      enabled: isConnected && isCorrectChain && isContractConfigured() && !!agentId,
    },
  })
  const [listings, setListings] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function loadListings() {
      // Only run on client side
      if (typeof window === 'undefined') {
        return
      }

      if (!listingCount || !agentId || !contractAddress || !isContractConfigured()) {
        setListings([])
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      try {
        const publicClient = createPublicClient({
          chain: arcTestnet,
          transport: http(process.env.NEXT_PUBLIC_ARC_RPC_URL || 'https://rpc.testnet.arc.network'),
        })

        const count = Number(listingCount)
        const listingPromises: Promise<any>[] = []

        for (let i = 0; i < count; i++) {
          listingPromises.push(
            publicClient.readContract({
              address: contractAddress as `0x${string}`,
              abi: VirtualAgentABI,
              functionName: 'listings',
              args: [BigInt(i)],
            }).then((data: any) => ({
              listingId: BigInt(i),
              agentId: data[0] as bigint,
              seller: data[1] as string,
              price: data[2] as bigint,
              amount: data[3] as bigint,
              isActive: data[4] as boolean,
            }))
          )
        }

        const allListings = await Promise.all(listingPromises)
        const agentListings = allListings.filter(
          (l) => l.agentId === BigInt(Number(agentId)) && l.isActive
        )
        setListings(agentListings)
      } catch (err) {
        console.error('Error loading listings:', err)
        setListings([])
      } finally {
        setIsLoading(false)
      }
    }

    loadListings()
  }, [listingCount, agentId, contractAddress])

  return { listings, isLoading }
}

/**
 * Hook to interact with an agent (chat message)
 * Each interaction generates an on-chain transaction with gas fees
 */
export function useInteractWithAgent() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const interactWithAgent = async (agentId: bigint | number, message: string) => {
    const contractAddress = getVirtualAgentAddress()
    if (!contractAddress) {
      throw new Error('Contract not configured')
    }

    if (!message || message.trim().length === 0) {
      throw new Error('Message cannot be empty')
    }

    // Get gas configuration for Arc Network (EIP-1559)
    const { maxFeePerGas, maxPriorityFeePerGas } = await getGasConfig()

    writeContract({
      address: contractAddress,
      abi: VirtualAgentABI,
      functionName: 'interactWithAgent',
      args: [BigInt(Number(agentId)), message],
      maxFeePerGas,
      maxPriorityFeePerGas,
    })
  }

  return {
    interactWithAgent,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  }
}

/**
 * Post Type enum (matches contract)
 */
export enum PostType {
  Document = 0,
  Photo = 1,
  Agent = 2,
  Discussion = 3,
}

export interface ForumPost {
  id: bigint
  author: string
  postType: PostType
  title: string
  content: string
  attachments: string[]
  agentId: bigint
  createdAt: bigint
  likes: bigint
  isActive: boolean
  hasLiked?: boolean
}

/**
 * Hook to create a forum post
 * Each post creation generates an on-chain transaction with gas fees
 */
export function useCreateForumPost() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const createForumPost = async (
    postType: PostType,
    title: string,
    content: string,
    attachments: string[],
    agentId: bigint | number
  ) => {
    if (!isConnected) {
      throw new Error('Wallet not connected')
    }

    if (!address) {
      throw new Error('Wallet address not available')
    }

    if (chainId !== arcTestnet.id) {
      throw new Error(`Wrong network. Please switch to Arc Testnet (Chain ID: ${arcTestnet.id})`)
    }

    const contractAddress = getVirtualAgentAddress()
    if (!contractAddress) {
      throw new Error('Contract not configured')
    }

    if (!title || title.trim().length === 0) {
      throw new Error('Title is required')
    }

    if (!content || content.trim().length === 0) {
      throw new Error('Content is required')
    }

    // Get gas configuration for Arc Network (EIP-1559)
    const { maxFeePerGas, maxPriorityFeePerGas } = await getGasConfig()

    // Estimate gas limit for createForumPost (has arrays and strings)
    const publicClient = createPublicClient({
      chain: arcTestnet,
      transport: http('https://rpc.testnet.arc.network'),
    })

    let gasLimit: bigint
    try {
      const estimatedGas = await publicClient.estimateGas({
        account: address as `0x${string}`,
        to: contractAddress,
        data: encodeFunctionData({
          abi: VirtualAgentABI,
          functionName: 'createForumPost',
          args: [postType, title, content, attachments, BigInt(Number(agentId))],
        }),
      })
      gasLimit = (estimatedGas * 120n) / 100n // 20% buffer
    } catch (error) {
      console.warn('Gas estimation failed, using default:', error)
      gasLimit = 300000n // Default for functions with arrays and strings
    }

    // writeContract doesn't return a promise - it triggers the transaction
    // The hash will be available in the 'hash' state from useWriteContract
    writeContract({
      address: contractAddress,
      abi: VirtualAgentABI,
      functionName: 'createForumPost',
      args: [postType, title, content, attachments, BigInt(Number(agentId))],
      maxFeePerGas,
      maxPriorityFeePerGas,
      gas: gasLimit,
    })
  }

  return {
    createForumPost,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  }
}

/**
 * Hook to like a forum post
 * Each like generates an on-chain transaction with gas fees
 */
export function useLikeForumPost() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const likePost = async (postId: bigint | number) => {
    const contractAddress = getVirtualAgentAddress()
    if (!contractAddress) {
      throw new Error('Contract not configured')
    }

    // Get gas configuration for Arc Network (EIP-1559)
    // Same approach as useCreateAgent - simple and working
    const { maxFeePerGas, maxPriorityFeePerGas } = await getGasConfig()

    writeContract({
      address: contractAddress,
      abi: VirtualAgentABI,
      functionName: 'likeForumPost',
      args: [BigInt(Number(postId))],
      maxFeePerGas,
      maxPriorityFeePerGas,
    })
  }

  return {
    likePost,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  }
}

/**
 * Hook to comment on a forum post
 * Each comment generates an on-chain transaction with gas fees
 */
export function useCommentOnForumPost() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const commentOnPost = async (postId: bigint | number, comment: string) => {
    if (!isConnected) {
      throw new Error('Wallet not connected')
    }

    if (!address) {
      throw new Error('Wallet address not available')
    }

    if (chainId !== arcTestnet.id) {
      throw new Error(`Wrong network. Please switch to Arc Testnet (Chain ID: ${arcTestnet.id})`)
    }

    const contractAddress = getVirtualAgentAddress()
    if (!contractAddress) {
      throw new Error('Contract not configured')
    }

    if (!comment || comment.trim().length === 0) {
      throw new Error('Comment cannot be empty')
    }

    // Get gas configuration for Arc Network (EIP-1559)
    const { maxFeePerGas, maxPriorityFeePerGas } = await getGasConfig()

    // Estimate gas limit for commentOnForumPost (has strings)
    const publicClient = createPublicClient({
      chain: arcTestnet,
      transport: http('https://rpc.testnet.arc.network'),
    })

    let gasLimit: bigint
    try {
      const estimatedGas = await publicClient.estimateGas({
        account: address as `0x${string}`,
        to: contractAddress,
        data: encodeFunctionData({
          abi: VirtualAgentABI,
          functionName: 'commentOnForumPost',
          args: [BigInt(Number(postId)), comment],
        }),
      })
      gasLimit = (estimatedGas * 120n) / 100n // 20% buffer
    } catch (error) {
      console.warn('Gas estimation failed, using default:', error)
      gasLimit = 150000n // Default for functions with strings
    }

    writeContract({
      address: contractAddress,
      abi: VirtualAgentABI,
      functionName: 'commentOnForumPost',
      args: [BigInt(Number(postId)), comment],
      maxFeePerGas,
      maxPriorityFeePerGas,
      gas: gasLimit,
    })
  }

  return {
    commentOnPost,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  }
}

/**
 * Hook to get all forum posts
 */
export function useAllForumPosts() {
  const { isConnected, address } = useAccount()
  const chainId = useChainId()
  const contractAddress = getVirtualAgentAddress()
  const isCorrectChain = chainId === arcTestnet.id
  const [posts, setPosts] = useState<ForumPost[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const { data: postCount } = useReadContract({
    address: isConnected && isCorrectChain && contractAddress ? contractAddress : undefined,
    abi: VirtualAgentABI,
    functionName: 'getForumPostCount',
    query: {
      enabled: isConnected && isCorrectChain && isContractConfigured(),
      refetchInterval: 10000, // Refetch every 10 seconds to get new posts
    },
  })

  async function loadPosts() {
    if (typeof window === 'undefined') {
      return
    }

    if (!postCount || !isConnected || !isCorrectChain || !contractAddress || !isContractConfigured()) {
      setPosts([])
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const publicClient = createPublicClient({
        chain: arcTestnet,
        transport: http(process.env.NEXT_PUBLIC_ARC_RPC_URL || 'https://rpc.testnet.arc.network'),
      })

      const count = Number(postCount)
      const postPromises: Promise<ForumPost>[] = []

      for (let i = 0; i < count; i++) {
        postPromises.push(
          Promise.all([
            publicClient.readContract({
              address: contractAddress as `0x${string}`,
              abi: VirtualAgentABI,
              functionName: 'getForumPost',
              args: [BigInt(i)],
            }),
            publicClient.readContract({
              address: contractAddress as `0x${string}`,
              abi: VirtualAgentABI,
              functionName: 'getForumPostAttachments',
              args: [BigInt(i)],
            }),
            address
              ? publicClient.readContract({
                  address: contractAddress as `0x${string}`,
                  abi: VirtualAgentABI,
                  functionName: 'hasUserLikedPost',
                  args: [BigInt(i), address as `0x${string}`],
                })
              : Promise.resolve(false),
          ]).then(([postData, attachments, hasLiked]: any) => ({
            id: BigInt(i),
            author: postData[1] as string,
            postType: postData[2] as PostType,
            title: postData[3] as string,
            content: postData[4] as string,
            agentId: postData[5] as bigint,
            createdAt: postData[6] as bigint,
            likes: postData[7] as bigint,
            isActive: postData[8] as boolean,
            attachments: attachments as string[],
            hasLiked: hasLiked as boolean,
          }))
        )
      }

      const loadedPosts = await Promise.all(postPromises)
      setPosts(loadedPosts.filter((p) => p.isActive).reverse()) // Most recent first, only active
    } catch (err) {
      console.error('Error loading forum posts:', err)
      setError(err as Error)
      setPosts([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadPosts()
  }, [postCount, isConnected, isCorrectChain, contractAddress, address])

  const refetch = () => {
    loadPosts()
  }

  return { posts, isLoading, error, refetch }
}


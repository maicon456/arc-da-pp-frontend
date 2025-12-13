// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title VirtualAgent
 * @notice Smart contract for AI agents on Arc Network
 * Allows creation, tokenization, and trading of AI agents
 */
contract VirtualAgent {
    // Agent structure
    struct Agent {
        uint256 id;
        address creator;
        string name;
        string avatar;
        string description;
        string personality;
        string[] capabilities;
        uint256 price; // Price in USDC (wei)
        uint256 totalSupply; // Total tokens representing ownership
        uint256 circulatingSupply; // Tokens in circulation
        uint256 createdAt;
        bool isActive;
        mapping(address => uint256) ownership; // Address => token balance
    }

    // Agent data storage
    mapping(uint256 => Agent) public agents;
    uint256 public nextAgentId;
    
    // Ownership tracking
    mapping(uint256 => mapping(address => uint256)) public agentOwnership;
    mapping(uint256 => address[]) public agentOwners;
    
    // Marketplace listings
    struct Listing {
        uint256 agentId;
        address seller;
        uint256 price;
        uint256 amount; // Amount of tokens to sell
        bool isActive;
    }
    
    mapping(uint256 => Listing) public listings;
    uint256 public nextListingId;
    
    // Forum posts
    enum PostType {
        Document,
        Photo,
        Agent,
        Discussion
    }
    
    struct ForumPost {
        uint256 id;
        address author;
        PostType postType;
        string title;
        string content;
        string[] attachments; // URLs/IPFS hashes
        uint256 agentId; // If postType is Agent, reference to agent
        uint256 createdAt;
        uint256 likes;
        bool isActive;
        mapping(address => bool) likedBy; // Track who liked
    }
    
    mapping(uint256 => ForumPost) public forumPosts;
    uint256 public nextPostId;
    
    // Events
    event AgentCreated(
        uint256 indexed agentId,
        address indexed creator,
        string name,
        uint256 price,
        uint256 totalSupply
    );
    
    event AgentPurchased(
        uint256 indexed agentId,
        address indexed buyer,
        uint256 amount,
        uint256 price
    );
    
    event ListingCreated(
        uint256 indexed listingId,
        uint256 indexed agentId,
        address indexed seller,
        uint256 price,
        uint256 amount
    );
    
    event ListingFilled(
        uint256 indexed listingId,
        address indexed buyer,
        uint256 amount
    );
    
    event OwnershipTransferred(
        uint256 indexed agentId,
        address indexed from,
        address indexed to,
        uint256 amount
    );
    
    event AgentInteraction(
        uint256 indexed agentId,
        address indexed user,
        string message,
        uint256 timestamp
    );
    
    event ForumPostCreated(
        uint256 indexed postId,
        address indexed author,
        PostType postType,
        string title,
        uint256 agentId
    );
    
    event ForumPostLiked(
        uint256 indexed postId,
        address indexed user,
        uint256 newLikeCount
    );
    
    event ForumPostCommented(
        uint256 indexed postId,
        address indexed author,
        string comment
    );

    /**
     * @notice Create a new AI agent
     * @param name Agent name
     * @param avatar Avatar URL
     * @param description Agent description
     * @param personality Agent personality traits
     * @param capabilities Array of agent capabilities
     * @param price Initial price per token in USDC (wei)
     * @param totalSupply Total supply of ownership tokens
     */
    function createAgent(
        string memory name,
        string memory avatar,
        string memory description,
        string memory personality,
        string[] memory capabilities,
        uint256 price,
        uint256 totalSupply
    ) external returns (uint256) {
        require(bytes(name).length > 0, "Name required");
        require(price > 0, "Price must be > 0");
        require(totalSupply > 0, "Supply must be > 0");
        
        uint256 agentId = nextAgentId++;
        
        Agent storage agent = agents[agentId];
        agent.id = agentId;
        agent.creator = msg.sender;
        agent.name = name;
        agent.avatar = avatar;
        agent.description = description;
        agent.personality = personality;
        agent.price = price;
        agent.totalSupply = totalSupply;
        agent.circulatingSupply = 0;
        agent.createdAt = block.timestamp;
        agent.isActive = true;
        
        // Store capabilities
        for (uint i = 0; i < capabilities.length; i++) {
            agent.capabilities.push(capabilities[i]);
        }
        
        // Creator gets initial ownership
        agentOwnership[agentId][msg.sender] = totalSupply;
        agentOwners[agentId].push(msg.sender);
        
        emit AgentCreated(agentId, msg.sender, name, price, totalSupply);
        
        return agentId;
    }

    /**
     * @notice Purchase agent tokens (initial mint)
     * @param agentId Agent ID
     * @param amount Amount of tokens to purchase
     */
    function purchaseAgentTokens(
        uint256 agentId,
        uint256 amount
    ) external payable {
        Agent storage agent = agents[agentId];
        require(agent.isActive, "Agent not active");
        require(amount > 0, "Amount must be > 0");
        require(
            agent.circulatingSupply + amount <= agent.totalSupply,
            "Exceeds total supply"
        );
        
        uint256 totalCost = agent.price * amount;
        require(msg.value >= totalCost, "Insufficient payment");
        
        // Update ownership
        if (agentOwnership[agentId][msg.sender] == 0) {
            agentOwners[agentId].push(msg.sender);
        }
        agentOwnership[agentId][msg.sender] += amount;
        agent.circulatingSupply += amount;
        
        // Refund excess
        if (msg.value > totalCost) {
            payable(msg.sender).transfer(msg.value - totalCost);
        }
        
        emit AgentPurchased(agentId, msg.sender, amount, totalCost);
    }

    /**
     * @notice Create a marketplace listing
     * @param agentId Agent ID
     * @param price Price per token
     * @param amount Amount of tokens to sell
     */
    function createListing(
        uint256 agentId,
        uint256 price,
        uint256 amount
    ) external returns (uint256) {
        require(agentOwnership[agentId][msg.sender] >= amount, "Insufficient balance");
        require(price > 0, "Price must be > 0");
        require(amount > 0, "Amount must be > 0");
        
        uint256 listingId = nextListingId++;
        
        listings[listingId] = Listing({
            agentId: agentId,
            seller: msg.sender,
            price: price,
            amount: amount,
            isActive: true
        });
        
        emit ListingCreated(listingId, agentId, msg.sender, price, amount);
        
        return listingId;
    }

    /**
     * @notice Fill a marketplace listing (buy from another user)
     * @param listingId Listing ID
     * @param amount Amount to purchase
     */
    function fillListing(
        uint256 listingId,
        uint256 amount
    ) external payable {
        Listing storage listing = listings[listingId];
        require(listing.isActive, "Listing not active");
        require(amount > 0, "Amount must be > 0");
        require(amount <= listing.amount, "Amount exceeds listing");
        
        uint256 totalCost = listing.price * amount;
        require(msg.value >= totalCost, "Insufficient payment");
        
        // Transfer ownership
        require(
            agentOwnership[listing.agentId][listing.seller] >= amount,
            "Seller insufficient balance"
        );
        
        agentOwnership[listing.agentId][listing.seller] -= amount;
        if (agentOwnership[listing.agentId][listing.seller] == 0) {
            // Remove from owners list (simplified)
        }
        
        if (agentOwnership[listing.agentId][msg.sender] == 0) {
            agentOwners[listing.agentId].push(msg.sender);
        }
        agentOwnership[listing.agentId][msg.sender] += amount;
        
        // Update listing
        listing.amount -= amount;
        if (listing.amount == 0) {
            listing.isActive = false;
        }
        
        // Transfer payment to seller
        payable(listing.seller).transfer(totalCost);
        
        // Refund excess
        if (msg.value > totalCost) {
            payable(msg.sender).transfer(msg.value - totalCost);
        }
        
        emit ListingFilled(listingId, msg.sender, amount);
        emit OwnershipTransferred(
            listing.agentId,
            listing.seller,
            msg.sender,
            amount
        );
    }

    /**
     * @notice Get agent details
     */
    function getAgent(uint256 agentId) external view returns (
        uint256 id,
        address creator,
        string memory name,
        string memory avatar,
        string memory description,
        string memory personality,
        uint256 price,
        uint256 totalSupply,
        uint256 circulatingSupply,
        uint256 createdAt,
        bool isActive
    ) {
        Agent storage agent = agents[agentId];
        return (
            agent.id,
            agent.creator,
            agent.name,
            agent.avatar,
            agent.description,
            agent.personality,
            agent.price,
            agent.totalSupply,
            agent.circulatingSupply,
            agent.createdAt,
            agent.isActive
        );
    }

    /**
     * @notice Get agent capabilities
     */
    function getAgentCapabilities(uint256 agentId) external view returns (string[] memory) {
        return agents[agentId].capabilities;
    }

    /**
     * @notice Get user's ownership of an agent
     */
    function getOwnership(uint256 agentId, address owner) external view returns (uint256) {
        return agentOwnership[agentId][owner];
    }

    /**
     * @notice Get total number of agents
     */
    function getAgentCount() external view returns (uint256) {
        return nextAgentId;
    }
    
    /**
     * @notice Register an interaction with an agent (chat message)
     * @param agentId Agent ID
     * @param message User message
     * @dev This function charges gas fees for each interaction
     */
    function interactWithAgent(
        uint256 agentId,
        string memory message
    ) external {
        Agent storage agent = agents[agentId];
        require(agent.isActive, "Agent not active");
        require(bytes(message).length > 0, "Message cannot be empty");
        
        // Emit event for the interaction
        emit AgentInteraction(
            agentId,
            msg.sender,
            message,
            block.timestamp
        );
    }

    /**
     * @notice Create a forum post (document, photo, agent, or discussion)
     * @param postType Type of post (Document, Photo, Agent, Discussion)
     * @param title Post title
     * @param content Post content
     * @param attachments Array of URLs/IPFS hashes
     * @param agentId Agent ID if postType is Agent
     * @dev Each post creation generates an on-chain transaction with gas fees
     */
    function createForumPost(
        PostType postType,
        string memory title,
        string memory content,
        string[] memory attachments,
        uint256 agentId
    ) external returns (uint256) {
        require(bytes(title).length > 0, "Title required");
        require(bytes(content).length > 0, "Content required");
        
        // If postType is Agent, verify agent exists and is active
        if (postType == PostType.Agent) {
            require(agents[agentId].isActive, "Agent not active");
        }
        
        uint256 postId = nextPostId++;
        
        ForumPost storage post = forumPosts[postId];
        post.id = postId;
        post.author = msg.sender;
        post.postType = postType;
        post.title = title;
        post.content = content;
        post.agentId = agentId;
        post.createdAt = block.timestamp;
        post.likes = 0;
        post.isActive = true;
        
        // Store attachments
        for (uint i = 0; i < attachments.length; i++) {
            post.attachments.push(attachments[i]);
        }
        
        emit ForumPostCreated(postId, msg.sender, postType, title, agentId);
        
        return postId;
    }
    
    /**
     * @notice Like a forum post
     * @param postId Post ID
     * @dev Each like generates an on-chain transaction with gas fees
     */
    function likeForumPost(uint256 postId) external {
        ForumPost storage post = forumPosts[postId];
        require(post.isActive, "Post not active");
        require(!post.likedBy[msg.sender], "Already liked");
        
        post.likedBy[msg.sender] = true;
        post.likes++;
        
        emit ForumPostLiked(postId, msg.sender, post.likes);
    }
    
    /**
     * @notice Comment on a forum post
     * @param postId Post ID
     * @param comment Comment text
     * @dev Each comment generates an on-chain transaction with gas fees
     */
    function commentOnForumPost(
        uint256 postId,
        string memory comment
    ) external {
        ForumPost storage post = forumPosts[postId];
        require(post.isActive, "Post not active");
        require(bytes(comment).length > 0, "Comment cannot be empty");
        
        emit ForumPostCommented(postId, msg.sender, comment);
    }
    
    /**
     * @notice Get forum post details
     */
    function getForumPost(uint256 postId) external view returns (
        uint256 id,
        address author,
        PostType postType,
        string memory title,
        string memory content,
        uint256 agentId,
        uint256 createdAt,
        uint256 likes,
        bool isActive
    ) {
        ForumPost storage post = forumPosts[postId];
        return (
            post.id,
            post.author,
            post.postType,
            post.title,
            post.content,
            post.agentId,
            post.createdAt,
            post.likes,
            post.isActive
        );
    }
    
    /**
     * @notice Get forum post attachments
     */
    function getForumPostAttachments(uint256 postId) external view returns (string[] memory) {
        return forumPosts[postId].attachments;
    }
    
    /**
     * @notice Check if user liked a post
     */
    function hasUserLikedPost(uint256 postId, address user) external view returns (bool) {
        return forumPosts[postId].likedBy[user];
    }
    
    /**
     * @notice Get total number of forum posts
     */
    function getForumPostCount() external view returns (uint256) {
        return nextPostId;
    }
}


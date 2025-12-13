/**
 * Deploy VirtualAgent Contract to Arc Testnet
 * Using ethers.js - No Foundry required!
 */

const { ethers } = require('ethers')
const fs = require('fs')
const path = require('path')

// Configuration
const PRIVATE_KEY = '7037a2d5e0fab06911c4fc98f09ef19d5558194440d7438bd099ae78e234228c'
const RPC_URL = 'https://rpc.testnet.arc.network'
const CHAIN_ID = 5042002

// Contract bytecode (compiled)
// This will be generated from the Solidity contract
const CONTRACT_SOURCE = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract VirtualAgent {
    struct Agent {
        uint256 id;
        address creator;
        string name;
        string avatar;
        string description;
        string personality;
        string[] capabilities;
        uint256 price;
        uint256 totalSupply;
        uint256 circulatingSupply;
        uint256 createdAt;
        bool isActive;
        mapping(address => uint256) ownership;
    }

    mapping(uint256 => Agent) public agents;
    uint256 public nextAgentId;
    mapping(uint256 => mapping(address => uint256)) public agentOwnership;
    mapping(uint256 => address[]) public agentOwners;
    
    struct Listing {
        uint256 agentId;
        address seller;
        uint256 price;
        uint256 amount;
        bool isActive;
    }
    
    mapping(uint256 => Listing) public listings;
    uint256 public nextListingId;
    
    event AgentCreated(uint256 indexed agentId, address indexed creator, string name, uint256 price, uint256 totalSupply);
    event AgentPurchased(uint256 indexed agentId, address indexed buyer, uint256 amount, uint256 price);
    event ListingCreated(uint256 indexed listingId, uint256 indexed agentId, address indexed seller, uint256 price, uint256 amount);
    event ListingFilled(uint256 indexed listingId, address indexed buyer, uint256 amount);
    event OwnershipTransferred(uint256 indexed agentId, address indexed from, address indexed to, uint256 amount);

    function createAgent(string memory name, string memory avatar, string memory description, string memory personality, string[] memory capabilities, uint256 price, uint256 totalSupply) external returns (uint256) {
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
        for (uint i = 0; i < capabilities.length; i++) {
            agent.capabilities.push(capabilities[i]);
        }
        agentOwnership[agentId][msg.sender] = totalSupply;
        agentOwners[agentId].push(msg.sender);
        emit AgentCreated(agentId, msg.sender, name, price, totalSupply);
        return agentId;
    }

    function purchaseAgentTokens(uint256 agentId, uint256 amount) external payable {
        Agent storage agent = agents[agentId];
        require(agent.isActive, "Agent not active");
        require(amount > 0, "Amount must be > 0");
        require(agent.circulatingSupply + amount <= agent.totalSupply, "Exceeds total supply");
        uint256 totalCost = agent.price * amount;
        require(msg.value >= totalCost, "Insufficient payment");
        if (agentOwnership[agentId][msg.sender] == 0) {
            agentOwners[agentId].push(msg.sender);
        }
        agentOwnership[agentId][msg.sender] += amount;
        agent.circulatingSupply += amount;
        if (msg.value > totalCost) {
            payable(msg.sender).transfer(msg.value - totalCost);
        }
        emit AgentPurchased(agentId, msg.sender, amount, totalCost);
    }

    function createListing(uint256 agentId, uint256 price, uint256 amount) external returns (uint256) {
        require(agentOwnership[agentId][msg.sender] >= amount, "Insufficient balance");
        require(price > 0, "Price must be > 0");
        require(amount > 0, "Amount must be > 0");
        uint256 listingId = nextListingId++;
        listings[listingId] = Listing({agentId: agentId, seller: msg.sender, price: price, amount: amount, isActive: true});
        emit ListingCreated(listingId, agentId, msg.sender, price, amount);
        return listingId;
    }

    function fillListing(uint256 listingId, uint256 amount) external payable {
        Listing storage listing = listings[listingId];
        require(listing.isActive, "Listing not active");
        require(amount > 0, "Amount must be > 0");
        require(amount <= listing.amount, "Amount exceeds listing");
        uint256 totalCost = listing.price * amount;
        require(msg.value >= totalCost, "Insufficient payment");
        require(agentOwnership[listing.agentId][listing.seller] >= amount, "Seller insufficient balance");
        agentOwnership[listing.agentId][listing.seller] -= amount;
        if (agentOwnership[listing.agentId][msg.sender] == 0) {
            agentOwners[listing.agentId].push(msg.sender);
        }
        agentOwnership[listing.agentId][msg.sender] += amount;
        listing.amount -= amount;
        if (listing.amount == 0) {
            listing.isActive = false;
        }
        payable(listing.seller).transfer(totalCost);
        if (msg.value > totalCost) {
            payable(msg.sender).transfer(msg.value - totalCost);
        }
        emit ListingFilled(listingId, msg.sender, amount);
        emit OwnershipTransferred(listing.agentId, listing.seller, msg.sender, amount);
    }

    function getAgent(uint256 agentId) external view returns (uint256 id, address creator, string memory name, string memory avatar, string memory description, string memory personality, uint256 price, uint256 totalSupply, uint256 circulatingSupply, uint256 createdAt, bool isActive) {
        Agent storage agent = agents[agentId];
        return (agent.id, agent.creator, agent.name, agent.avatar, agent.description, agent.personality, agent.price, agent.totalSupply, agent.circulatingSupply, agent.createdAt, agent.isActive);
    }

    function getAgentCapabilities(uint256 agentId) external view returns (string[] memory) {
        return agents[agentId].capabilities;
    }

    function getOwnership(uint256 agentId, address owner) external view returns (uint256) {
        return agentOwnership[agentId][owner];
    }

    function getAgentCount() external view returns (uint256) {
        return nextAgentId;
    }
}
`

async function deploy() {
  try {
    console.log('🚀 Iniciando deploy do contrato VirtualAgent...\n')
    
    // Create provider
    const provider = new ethers.JsonRpcProvider(RPC_URL)
    
    // Create wallet
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider)
    
    console.log('👤 Endereço do deployer:', wallet.address)
    console.log('📍 Rede: Arc Testnet (Chain ID:', CHAIN_ID, ')')
    console.log('🔗 RPC:', RPC_URL, '\n')
    
    // Check balance
    const balance = await provider.getBalance(wallet.address)
    const balanceFormatted = ethers.formatEther(balance)
    console.log('💰 Saldo:', balanceFormatted, 'USDC\n')
    
    if (balance === 0n) {
      console.error('❌ Saldo insuficiente!')
      console.log('💡 Obtenha USDC testnet em: https://easyfaucetarc.xyz/')
      console.log('📋 Endereço:', wallet.address)
      process.exit(1)
    }
    
    console.log('⚠️  IMPORTANTE: Este script precisa do bytecode compilado.')
    console.log('💡 Opções:')
    console.log('   1. Use o Remix IDE para compilar e obter o bytecode')
    console.log('   2. Instale o Foundry e compile: forge build')
    console.log('   3. Use o Hardhat para compilar\n')
    
    console.log('📝 Para obter o bytecode:')
    console.log('   1. Compile o contrato no Remix IDE')
    console.log('   2. Na aba "Solidity Compiler", clique em "Compilation Details"')
    console.log('   3. Copie o "bytecode" (object)')
    console.log('   4. Cole no arquivo deploy-with-bytecode.js\n')
    
    console.log('🔗 Alternativa: Use o script deploy-with-bytecode.js após obter o bytecode')
    
  } catch (error) {
    console.error('❌ Erro:', error.message)
    if (error.transaction) {
      console.error('Transaction hash:', error.transaction.hash)
    }
    process.exit(1)
  }
}

deploy()


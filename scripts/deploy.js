/**
 * Deploy script for VirtualAgent contract on Arc Network
 * Uses ethers.js to deploy the contract
 */

const { ethers } = require('ethers')
const fs = require('fs')
const path = require('path')

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '../.env') })

const PRIVATE_KEY = process.env.PRIVATE_KEY || '7037a2d5e0fab06911c4fc98f09ef19d5558194440d7438bd099ae78e234228c'
const RPC_URL = process.env.RPC_URL || 'https://rpc.testnet.arc.network'

// Contract ABI (minimal for deployment)
const CONTRACT_ABI = [
  "constructor()"
]

// Contract bytecode (will be read from compiled contract)
async function deploy() {
  try {
    console.log('🚀 Starting deployment to Arc Testnet...')
    console.log('📍 RPC URL:', RPC_URL)
    
    // Create provider and wallet
    const provider = new ethers.JsonRpcProvider(RPC_URL)
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider)
    
    console.log('👤 Deployer address:', wallet.address)
    
    // Check balance
    const balance = await provider.getBalance(wallet.address)
    console.log('💰 Balance:', ethers.formatEther(balance), 'USDC')
    
    if (balance === 0n) {
      console.error('❌ Insufficient balance! Please get USDC from: https://easyfaucetarc.xyz/')
      process.exit(1)
    }
    
    // Read compiled contract
    const contractPath = path.join(__dirname, '../out/VirtualAgent.sol/VirtualAgent.json')
    
    if (!fs.existsSync(contractPath)) {
      console.error('❌ Contract not compiled! Please run: forge build')
      console.log('💡 Alternative: Install Foundry from https://book.getfoundry.sh/getting-started/installation')
      process.exit(1)
    }
    
    const contractArtifact = JSON.parse(fs.readFileSync(contractPath, 'utf8'))
    const bytecode = contractArtifact.bytecode.object
    const abi = contractArtifact.abi
    
    console.log('📦 Deploying contract...')
    
    // Deploy contract
    const factory = new ethers.ContractFactory(abi, bytecode, wallet)
    const contract = await factory.deploy()
    
    console.log('⏳ Waiting for deployment transaction...')
    await contract.waitForDeployment()
    
    const contractAddress = await contract.getAddress()
    
    console.log('\n✅ Contract deployed successfully!')
    console.log('📍 Contract Address:', contractAddress)
    console.log('🔗 View on ArcScan:', `https://testnet.arcscan.app/address/${contractAddress}`)
    console.log('\n📝 Update your .env.local with:')
    console.log(`NEXT_PUBLIC_VIRTUAL_AGENT_ADDRESS=${contractAddress}`)
    
    // Update .env.local if it exists
    const envLocalPath = path.join(__dirname, '../.env.local')
    if (fs.existsSync(envLocalPath)) {
      let envContent = fs.readFileSync(envLocalPath, 'utf8')
      envContent = envContent.replace(
        /NEXT_PUBLIC_VIRTUAL_AGENT_ADDRESS=.*/,
        `NEXT_PUBLIC_VIRTUAL_AGENT_ADDRESS=${contractAddress}`
      )
      if (!envContent.includes('NEXT_PUBLIC_VIRTUAL_AGENT_ADDRESS')) {
        envContent += `\nNEXT_PUBLIC_VIRTUAL_AGENT_ADDRESS=${contractAddress}`
      }
      fs.writeFileSync(envLocalPath, envContent)
      console.log('\n✅ .env.local updated automatically!')
    }
    
  } catch (error) {
    console.error('❌ Deployment failed:', error.message)
    if (error.transaction) {
      console.error('Transaction hash:', error.transaction.hash)
    }
    process.exit(1)
  }
}

deploy()


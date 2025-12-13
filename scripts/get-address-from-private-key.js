/**
 * Script para obter o endereço da carteira a partir da chave privada
 * Use este script para descobrir qual endereço usar no faucet
 */

const { ethers } = require('ethers')

const PRIVATE_KEY = '7037a2d5e0fab06911c4fc98f09ef19d5558194440d7438bd099ae78e234228c'

try {
  const wallet = new ethers.Wallet(PRIVATE_KEY)
  console.log('\n✅ Endereço da Carteira:')
  console.log(wallet.address)
  console.log('\n📋 Use este endereço para:')
  console.log('   1. Obter USDC testnet em: https://easyfaucetarc.xyz/')
  console.log('   2. Conectar no MetaMask (importar conta com a chave privada)')
  console.log('\n⚠️  NUNCA compartilhe sua chave privada!\n')
} catch (error) {
  console.error('❌ Erro:', error.message)
}


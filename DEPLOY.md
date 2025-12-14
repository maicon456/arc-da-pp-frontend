# 🚀 Deploy Guide - Virtual Agents DApp on Arc Network

Este guia completo mostra como fazer deploy do contrato VirtualAgent na Arc Network Testnet.

## 📋 Pré-requisitos

1. **Foundry instalado**: [https://book.getfoundry.sh/getting-started/installation](https://book.getfoundry.sh/getting-started/installation)
2. **Carteira com USDC na Arc Testnet**: Obtenha em [https://easyfaucetarc.xyz/](https://easyfaucetarc.xyz/)
3. **Chave privada**: Para deploy automático

## 🔧 Configuração

### 1. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
# Chave privada para deploy (sem 0x)
PRIVATE_KEY=your_private_key_here

# RPC URL (opcional, já configurado)
RPC_URL=https://rpc.testnet.arc.network

# ArcScan API Key (opcional, para verificação)
ARCSCAN_API_KEY=your_arcscan_api_key
```

### 2. Configurar Frontend

Crie/atualize `.env.local`:

```bash
# Arc Network RPC
NEXT_PUBLIC_ARC_RPC_URL=https://rpc.testnet.arc.network

# Arc Network Block Explorer
NEXT_PUBLIC_ARC_BLOCK_EXPLORER=https://testnet.arcscan.app

# Virtual Agent Contract Address (será preenchido após deploy)
NEXT_PUBLIC_VIRTUAL_AGENT_ADDRESS=YOUR_CONTRACT_ADDRESS_HERE

# WalletConnect (opcional)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
```

## 📦 Deploy do Contrato

### Opção 1: Deploy com Script Foundry (Recomendado)

```bash
# Compilar o contrato
forge build

# Fazer deploy
forge script script/DeployVirtualAgent.s.sol:DeployVirtualAgent \
  --rpc-url arc_testnet \
  --broadcast \
  --verify \
  -vvvv
```

### Opção 2: Deploy Manual

```bash
# 1. Compilar
forge build

# 2. Deploy interativo
forge create contracts/VirtualAgent.sol:VirtualAgent \
  --rpc-url https://rpc.testnet.arc.network \
  --private-key $PRIVATE_KEY \
  --legacy
```

### 3. Verificar o Contrato (Opcional)

```bash
forge verify-contract \
  <CONTRACT_ADDRESS> \
  contracts/VirtualAgent.sol:VirtualAgent \
  --chain-id 5042002 \
  --etherscan-api-key $ARCSCAN_API_KEY \
  --compiler-version 0.8.20
```

## 🔗 Atualizar Frontend

Após o deploy, copie o endereço do contrato e atualize `.env.local`:

```bash
NEXT_PUBLIC_VIRTUAL_AGENT_ADDRESS=0x... # Endereço do contrato deployado
```

## ✅ Verificação

1. **Verificar no ArcScan**: 
   - Acesse: https://testnet.arcscan.app
   - Cole o endereço do contrato
   - Verifique se o código está verificado

2. **Testar no Frontend**:
   ```bash
   pnpm dev
   ```
   - Acesse: http://localhost:3000/marketplace
   - Conecte sua carteira
   - Tente criar um agente

## 🧪 Testes

Execute os testes do contrato:

```bash
forge test -vvv
```

## 📚 Referências

- [Arc Network Docs](https://docs.arc.network/arc/tutorials/deploy-on-arc)
- [Foundry Book](https://book.getfoundry.sh/)
- [ArcScan Explorer](https://testnet.arcscan.app)

## ⚠️ Notas Importantes

1. **USDC como Gas**: Arc Network usa USDC como moeda nativa (gas)
2. **Chain ID**: 5042002 (Arc Testnet)
3. **RPC URL**: https://rpc.testnet.arc.network
4. **Block Explorer**: https://testnet.arcscan.app

## 🐛 Troubleshooting

### Erro: "insufficient funds"
- Obtenha USDC testnet em: https://easyfaucetarc.xyz/

### Erro: "nonce too low"
- Aguarde alguns segundos e tente novamente

### Erro: "contract verification failed"
- Verifique se o ArcScan API key está correto
- Tente verificar manualmente no ArcScan


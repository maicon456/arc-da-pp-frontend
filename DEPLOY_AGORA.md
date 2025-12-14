# ⚡ DEPLOY AGORA - Instruções Rápidas

## 🎯 Você está no Remix IDE? Siga estes passos:

### 1️⃣ CRIAR ARQUIVO (30 segundos)
- Clique no ícone **"+"** no File Explorer (lado esquerdo)
- Nome: `VirtualAgent.sol`
- Pressione Enter

### 2️⃣ COLAR CÓDIGO (1 minuto)
- Abra o arquivo `VirtualAgent_For_Remix.sol` neste projeto
- Selecione TODO (Ctrl+A) e copie (Ctrl+C)
- Cole no Remix (Ctrl+V)
- Salve (Ctrl+S)

### 3️⃣ COMPILAR (30 segundos)
- Clique em **"Solidity Compiler"** (ícone de compilador)
- Versão: **0.8.20**
- Clique em **"Compile VirtualAgent.sol"**
- ✅ Deve aparecer ✓ verde

### 4️⃣ CONFIGURAR META MASK
**ANTES de fazer deploy, certifique-se:**
- ✅ MetaMask está na rede **Arc Testnet** (Chain ID: 5042002)
- ✅ Você tem USDC testnet (obtenha em: https://easyfaucetarc.xyz/)
- ✅ Endereço: `0xCa47a961A085120F4fcC467C200eF55436CeD803`

### 5️⃣ DEPLOY (2 minutos)
- Clique em **"Deploy & Run Transactions"** (ícone de foguete)
- Environment: **"Injected Provider - MetaMask"**
- Contract: **"VirtualAgent - contracts/VirtualAgent.sol"**
- Clique em **"Deploy"**
- Confirme no MetaMask
- Aguarde confirmação

### 6️⃣ COPIAR ENDEREÇO
- Na seção "Deployed Contracts"
- Expanda o contrato
- **Copie o endereço** (0x...)

### 7️⃣ ATUALIZAR FRONTEND
Edite `.env.local`:
```bash
NEXT_PUBLIC_VIRTUAL_AGENT_ADDRESS=0x... # Cole aqui
```

---

## 🚨 PROBLEMAS?

### "Insufficient funds"
→ Obtenha USDC: https://easyfaucetarc.xyz/

### "Network mismatch"  
→ Mude para Arc Testnet no MetaMask

### MetaMask não conecta
→ Recarregue a página do Remix

---

## 📋 CHECKLIST RÁPIDO

- [ ] Arquivo VirtualAgent.sol criado
- [ ] Código colado e salvo
- [ ] Compilado com sucesso (✓ verde)
- [ ] MetaMask na rede Arc Testnet
- [ ] USDC testnet na carteira
- [ ] Deploy realizado
- [ ] Endereço copiado
- [ ] .env.local atualizado

---

**⏱️ Tempo total: ~5 minutos**


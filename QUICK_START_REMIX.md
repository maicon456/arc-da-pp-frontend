# ⚡ Quick Start - Deploy via Remix IDE

## 🎯 Resumo Rápido

1. **Configurar MetaMask** com Arc Testnet
2. **Obter USDC** testnet
3. **Deploy no Remix IDE**
4. **Atualizar frontend**

---

## 1️⃣ Configurar MetaMask

Adicione a rede Arc Testnet:

```
Nome: Arc Testnet
RPC: https://rpc.testnet.arc.network
Chain ID: 5042002
Símbolo: USDC
Explorer: https://testnet.arcscan.app
```

---

## 2️⃣ Obter USDC Testnet

1. Execute: `node scripts/get-address-from-private-key.js`
2. Copie o endereço mostrado
3. Acesse: https://easyfaucetarc.xyz/
4. Cole o endereço e solicite USDC

---

## 3️⃣ Deploy no Remix

1. **Acesse**: https://remix.ethereum.org/
2. **Crie arquivo**: `VirtualAgent.sol`
3. **Cole o código**: Copie de `VirtualAgent_For_Remix.sol`
4. **Compile**: Solidity 0.8.20
5. **Deploy**: 
   - Environment: "Injected Provider - MetaMask"
   - Contract: "VirtualAgent"
   - Clique em "Deploy"
6. **Copie o endereço** do contrato deployado

---

## 4️⃣ Atualizar Frontend

Edite `.env.local`:

```bash
NEXT_PUBLIC_VIRTUAL_AGENT_ADDRESS=0x... # Cole o endereço aqui
```

Reinicie o servidor:
```bash
pnpm dev
```

---

## ✅ Pronto!

Acesse http://localhost:3000/marketplace e teste!

---

📖 **Guia completo**: Veja `DEPLOY_REMIX.md` para instruções detalhadas


# 🚀 Deploy Alternativo - Sem Remix IDE

## 📋 Opções de Deploy

### Opção 1: Usar Script Node.js com Bytecode do Remix ⭐ (Mais Fácil)

**Passo a passo:**

1. **Compilar no Remix IDE:**
   - Acesse: https://remix.ethereum.org/
   - Compile o contrato VirtualAgent.sol
   - Na aba "Solidity Compiler", clique em **"Compilation Details"**
   - Procure por **"bytecode"** → **"object"**
   - Copie a string completa (começa com `0x` e é muito longa)

2. **Configurar o script:**
   - Abra: `scripts/deploy-with-bytecode.js`
   - Cole o bytecode onde diz `COLE_O_BYTECODE_AQUI`
   - Salve o arquivo

3. **Executar:**
   ```bash
   node scripts/deploy-with-bytecode.js
   ```

4. **Pronto!** O script fará o deploy automaticamente.

---

### Opção 2: Usar Hardhat

1. **Instalar Hardhat:**
   ```bash
   pnpm add -D hardhat @nomicfoundation/hardhat-toolbox
   ```

2. **Inicializar Hardhat:**
   ```bash
   npx hardhat init
   ```

3. **Configurar `hardhat.config.js`:**
   ```javascript
   require("@nomicfoundation/hardhat-toolbox");
   
   module.exports = {
     solidity: "0.8.20",
     networks: {
       arcTestnet: {
         url: "https://rpc.testnet.arc.network",
         chainId: 5042002,
         accounts: ["7037a2d5e0fab06911c4fc98f09ef19d5558194440d7438bd099ae78e234228c"]
       }
     }
   };
   ```

4. **Mover contrato:**
   ```bash
   cp contracts/VirtualAgent.sol hardhat/contracts/
   ```

5. **Compilar e deploy:**
   ```bash
   npx hardhat compile
   npx hardhat run scripts/deploy.js --network arcTestnet
   ```

---

### Opção 3: Usar MetaMask + Remix (Manual)

1. Abra Remix IDE
2. Compile o contrato
3. Na aba "Deploy & Run Transactions"
4. Selecione "Injected Provider - MetaMask"
5. Clique em "Deploy"
6. Confirme no MetaMask

---

### Opção 4: Usar Foundry (Se Instalado)

```bash
# Compilar
forge build

# Deploy
forge script script/DeployVirtualAgent.s.sol:DeployVirtualAgent \
  --rpc-url https://rpc.testnet.arc.network \
  --broadcast \
  -vvvv
```

---

## 🎯 Recomendação

**Use a Opção 1** (Script com bytecode do Remix):
- ✅ Mais rápido
- ✅ Não precisa instalar nada
- ✅ Automático
- ✅ Atualiza .env.local automaticamente

---

## 📝 Checklist

Antes de fazer deploy:

- [ ] USDC testnet na carteira (https://easyfaucetarc.xyz/)
- [ ] Endereço: `0xCa47a961A085120F4fcC467C200eF55436CeD803`
- [ ] Bytecode copiado do Remix (se usar Opção 1)
- [ ] Script configurado corretamente

---

## 🐛 Troubleshooting

### "Insufficient funds"
→ Obtenha USDC: https://easyfaucetarc.xyz/

### "Bytecode inválido"
→ Certifique-se de copiar o bytecode completo do Remix

### "Network error"
→ Verifique se a RPC está funcionando: https://rpc.testnet.arc.network

---

## 📞 Ajuda

- Arc Network Docs: https://docs.arc.network/
- Remix IDE: https://remix.ethereum.org/
- ArcScan: https://testnet.arcscan.app


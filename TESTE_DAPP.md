# 🧪 Guia de Teste do DApp

## ✅ Deploy Concluído!

**Contrato deployado:**
- Endereço: `0x42da6ee7b6F62c9aF2D7D9DDbdF62A92a0F236Cc`
- Transaction: `0x112e8e1e7c081c99a116a29dd70d254be0eab7eb31fb95107e50e5413e46508b`
- Ver no ArcScan: https://testnet.arcscan.app/address/0x42da6ee7b6F62c9aF2D7D9DDbdF62A92a0F236Cc

---

## 🚀 Como Testar

### 1️⃣ Acessar o DApp

1. Certifique-se de que o servidor está rodando:
   ```bash
   pnpm dev
   ```

2. Acesse: **http://localhost:3000/marketplace**

3. Ou acesse a home: **http://localhost:3000**

---

### 2️⃣ Conectar Carteira

1. Clique no botão **"Connect Wallet"** (canto superior direito)
2. Selecione sua carteira (MetaMask, WalletConnect, etc.)
3. Certifique-se de estar na rede **Arc Testnet** (Chain ID: 5042002)
4. Se não estiver, o DApp pedirá para trocar automaticamente

---

### 3️⃣ Testar Funcionalidades

#### ✅ Criar um Agente

1. Clique em **"Create Agent"**
2. Preencha os campos:
   - **Nome**: Ex: "AI Assistant"
   - **Avatar URL**: (opcional) ou deixe vazio para gerar automaticamente
   - **Description**: Ex: "An AI assistant for data analysis"
   - **Personality**: Ex: "Friendly and professional"
   - **Capabilities**: Selecione algumas (Data Analysis, Content Generation, etc.)
   - **Price per Token**: Ex: 0.01 USDC
   - **Total Supply**: Ex: 1000 tokens
3. Clique em **"Create Agent"**
4. Confirme a transação no MetaMask
5. Aguarde a confirmação
6. ✅ O agente aparecerá na lista!

#### ✅ Comprar Tokens

1. Encontre um agente na lista
2. Clique em **"Buy Tokens"**
3. Digite a quantidade de tokens
4. Confirme a transação
5. ✅ Você agora possui tokens do agente!

#### ✅ Criar Listing (Vender Tokens)

1. Se você possui tokens de um agente
2. Clique em **"List for Sale"**
3. Defina:
   - Quantidade de tokens
   - Preço por token
4. Confirme a transação
5. ✅ Seu listing aparecerá no marketplace!

#### ✅ Comprar de Outro Usuário

1. Vá para a página de detalhes do agente
2. Veja os listings disponíveis
3. Clique em **"Buy"** em um listing
4. Defina a quantidade
5. Confirme a transação
6. ✅ Tokens transferidos!

#### ✅ Chat com Agente

1. Clique em **"Chat"** em qualquer agente
2. Digite uma mensagem
3. O agente responderá baseado na personalidade definida

---

## 📋 Checklist de Teste

- [ ] Servidor rodando (http://localhost:3000)
- [ ] Carteira conectada
- [ ] Rede Arc Testnet configurada
- [ ] Criar agente funcionando
- [ ] Comprar tokens funcionando
- [ ] Criar listing funcionando
- [ ] Comprar de listing funcionando
- [ ] Chat funcionando
- [ ] Página de detalhes do agente funcionando

---

## 🐛 Problemas Comuns

### "Contract not configured"
- ✅ Já resolvido! O `.env.local` foi atualizado automaticamente
- Se ainda aparecer, verifique se o arquivo `.env.local` contém:
  ```
  NEXT_PUBLIC_VIRTUAL_AGENT_ADDRESS=0x42da6ee7b6F62c9aF2D7D9DDbdF62A92a0F236Cc
  ```

### "Insufficient funds"
- Obtenha mais USDC: https://easyfaucetarc.xyz/
- Endereço: `0xCa47a961A085120F4fcC467C200eF55436CeD803`

### "Network mismatch"
- O DApp deve pedir para trocar automaticamente
- Ou troque manualmente no MetaMask para Arc Testnet

### "Transaction failed"
- Verifique se tem USDC suficiente
- Verifique se está na rede correta
- Tente novamente após alguns segundos

---

## 🔗 Links Úteis

- **DApp**: http://localhost:3000/marketplace
- **Contrato no ArcScan**: https://testnet.arcscan.app/address/0x42da6ee7b6F62c9aF2D7D9DDbdF62A92a0F236Cc
- **Faucet**: https://easyfaucetarc.xyz/
- **Arc Network Docs**: https://docs.arc.network/

---

## 🎉 Pronto para Testar!

Tudo está configurado e funcionando. Acesse o DApp e comece a criar agentes! 🚀


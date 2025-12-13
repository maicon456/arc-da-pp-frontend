# 🚀 Deploy no Remix IDE - Passo a Passo Detalhado

## 📋 Checklist Pré-Deploy

- [ ] MetaMask instalado
- [ ] USDC testnet obtido (https://easyfaucetarc.xyz/)
- [ ] Rede Arc Testnet configurada no MetaMask
- [ ] Conta importada no MetaMask (opcional)

---

## 🔧 PASSO 1: Configurar MetaMask

### 1.1 Adicionar Rede Arc Testnet

1. Abra o MetaMask
2. Clique no menu de redes (topo, mostra "Ethereum Mainnet" ou similar)
3. Clique em "Add Network" → "Add a network manually"
4. Preencha EXATAMENTE:

```
Network Name: Arc Testnet
New RPC URL: https://rpc.testnet.arc.network
Chain ID: 5042002
Currency Symbol: USDC
Block Explorer URL (optional): https://testnet.arcscan.app
```

5. Clique em "Save"
6. Certifique-se de que está na rede "Arc Testnet" (deve aparecer no topo)

### 1.2 Importar Conta (Opcional mas Recomendado)

1. No MetaMask, clique nos três pontos (menu) → "Import account"
2. Selecione "Private Key"
3. Cole a chave privada: `7037a2d5e0fab06911c4fc98f09ef19d5558194440d7438bd099ae78e234228c`
4. Clique em "Import"
5. ✅ Sua conta será importada com o endereço: `0xCa47a961A085120F4fcC467C200eF55436CeD803`

---

## 💰 PASSO 2: Obter USDC Testnet

1. Acesse: **https://easyfaucetarc.xyz/**
2. Conecte sua carteira MetaMask
3. Certifique-se de estar na rede **Arc Testnet**
4. Cole o endereço: `0xCa47a961A085120F4fcC467C200eF55436CeD803`
5. Clique em "Request" ou similar
6. Aguarde a confirmação (pode levar alguns minutos)
7. Verifique o saldo no MetaMask (deve mostrar USDC)

---

## 🌐 PASSO 3: Abrir Remix IDE

1. Acesse: **https://remix.ethereum.org/**
2. Aguarde o carregamento completo (pode levar alguns segundos)
3. Você verá a interface do Remix com várias abas no lado esquerdo

---

## 📝 PASSO 4: Criar Arquivo do Contrato

1. No Remix, no lado esquerdo, você verá "File Explorer"
2. Clique no ícone **"+"** (criar novo arquivo) no topo do File Explorer
3. Digite o nome: `VirtualAgent.sol` (exatamente assim)
4. Pressione Enter
5. O arquivo será criado e aberto no editor

---

## 📋 PASSO 5: Copiar Código do Contrato

1. Abra o arquivo `VirtualAgent_For_Remix.sol` neste projeto
2. Selecione TODO o conteúdo (Ctrl+A)
3. Copie (Ctrl+C)
4. Volte ao Remix IDE
5. Cole o código no arquivo `VirtualAgent.sol` que você acabou de criar
6. Salve (Ctrl+S ou clique no ícone de salvar)

**OU** copie diretamente do arquivo que está na raiz do projeto.

---

## 🔨 PASSO 6: Compilar o Contrato

1. No Remix, clique na aba **"Solidity Compiler"** (ícone de compilador, segundo ícone no lado esquerdo)
2. Na parte superior, você verá "Compiler"
3. Selecione a versão: **0.8.20** (ou a mais próxima disponível)
4. Certifique-se de que o arquivo `VirtualAgent.sol` está selecionado
5. Clique no botão **"Compile VirtualAgent.sol"** (botão azul)
6. Aguarde a compilação
7. ✅ Você verá um ✓ verde se compilou com sucesso
8. Se houver erros, verifique se copiou o código completo

---

## 🚀 PASSO 7: Fazer Deploy

1. Clique na aba **"Deploy & Run Transactions"** (ícone de foguete, terceiro ícone no lado esquerdo)

2. **Configurar Environment:**
   - Em "Environment", selecione: **"Injected Provider - MetaMask"**
   - O Remix pedirá para conectar o MetaMask
   - Clique em "Connect" no popup do MetaMask
   - ✅ Deve aparecer seu endereço conectado

3. **Verificar Rede:**
   - Certifique-se de que o MetaMask está na rede **Arc Testnet**
   - No Remix, deve aparecer "Custom (5042002)" ou similar

4. **Selecionar Contrato:**
   - Em "Contract", selecione: **"VirtualAgent - contracts/VirtualAgent.sol"**
   - Se não aparecer, volte e compile novamente

5. **Fazer Deploy:**
   - Clique no botão **"Deploy"** (botão laranja)
   - O MetaMask abrirá pedindo confirmação
   - Verifique os detalhes:
     - Rede: Arc Testnet
     - Valor: 0 USDC (deploy não custa, mas precisa de USDC para gas)
   - Clique em **"Confirm"** no MetaMask
   - Aguarde a confirmação (pode levar 10-30 segundos)

6. **Aguardar Confirmação:**
   - Você verá uma mensagem "Transaction pending..."
   - Aguarde até aparecer "Transaction confirmed" ou similar
   - ✅ O contrato aparecerá na seção "Deployed Contracts" abaixo

---

## 📍 PASSO 8: Copiar Endereço do Contrato

1. Na seção "Deployed Contracts" (abaixo do botão Deploy)
2. Você verá algo como: `VIRTUALAGENT AT 0x...`
3. Clique na seta para expandir
4. **Copie o endereço completo** (começa com 0x e tem 42 caracteres)
5. Exemplo: `0x1234567890123456789012345678901234567890`

**⚠️ IMPORTANTE:** Guarde este endereço! Você precisará dele.

---

## ✅ PASSO 9: Verificar no ArcScan

1. Acesse: **https://testnet.arcscan.app**
2. Cole o endereço do contrato na barra de busca
3. Clique em "Search"
4. Você verá:
   - Detalhes do contrato
   - Transações
   - Código (se verificado)

---

## ⚙️ PASSO 10: Atualizar Frontend

1. Abra o arquivo `.env.local` no projeto (ou crie se não existir)

2. Adicione/atualize a linha:
```bash
NEXT_PUBLIC_VIRTUAL_AGENT_ADDRESS=0x... # Cole o endereço do contrato aqui
```

3. Salve o arquivo

4. Reinicie o servidor:
```bash
cd arc-da-pp-frontend
pnpm dev
```

---

## 🧪 PASSO 11: Testar o DApp

1. Acesse: **http://localhost:3000/marketplace**
2. Conecte sua carteira (botão "Connect Wallet")
3. Certifique-se de estar na rede Arc Testnet
4. Tente criar um agente:
   - Clique em "Create Agent"
   - Preencha os campos
   - Clique em "Create Agent"
   - Confirme no MetaMask
5. ✅ Se funcionar, o deploy foi bem-sucedido!

---

## 🐛 Troubleshooting

### Erro: "Insufficient funds"
- **Solução:** Obtenha mais USDC em https://easyfaucetarc.xyz/

### Erro: "Network mismatch"
- **Solução:** Certifique-se de estar na rede Arc Testnet no MetaMask

### Erro: "Transaction failed"
- **Solução:** 
  - Verifique se tem USDC suficiente
  - Tente novamente após alguns segundos
  - Verifique se o contrato compilou corretamente

### Contrato não aparece no Remix após deploy
- **Solução:** 
  - Verifique se a transação foi confirmada
  - Recarregue a página do Remix
  - Verifique no ArcScan se o deploy foi bem-sucedido

### MetaMask não conecta no Remix
- **Solução:**
  - Certifique-se de que o MetaMask está desbloqueado
  - Recarregue a página do Remix
  - Tente desconectar e conectar novamente

---

## 📞 Ajuda Adicional

- **Arc Network Docs:** https://docs.arc.network/
- **Remix IDE Docs:** https://remix-ide.readthedocs.io/
- **ArcScan:** https://testnet.arcscan.app
- **Faucet:** https://easyfaucetarc.xyz/

---

## ✅ Checklist Final

- [ ] MetaMask configurado com Arc Testnet
- [ ] USDC testnet obtido
- [ ] Contrato criado no Remix
- [ ] Contrato compilado com sucesso
- [ ] Deploy realizado
- [ ] Endereço do contrato copiado
- [ ] `.env.local` atualizado
- [ ] DApp testado e funcionando

**🎉 Parabéns! Seu contrato está deployado!**


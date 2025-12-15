# 🚀 Deploy via Remix IDE - Guia Completo

## 📋 Pré-requisitos

1. **MetaMask instalado** no navegador
2. **USDC testnet** na carteira (obtenha em: https://easyfaucetarc.xyz/)
3. **Rede Arc Testnet configurada** no MetaMask

## 🔧 Passo 1: Configurar Arc Testnet no MetaMask

1. Abra o MetaMask
2. Clique em "Networks" → "Add Network" → "Add a network manually"
3. Preencha os seguintes dados:

```
Network Name: Arc Testnet
RPC URL: https://rpc.testnet.arc.network
Chain ID: 5042002
Currency Symbol: USDC
Block Explorer URL: https://testnet.arcscan.app
```

4. Clique em "Save"

## 📝 Passo 2: Obter USDC Testnet

1. Acesse: https://easyfaucetarc.xyz/
2. Conecte sua carteira MetaMask (certifique-se de estar na rede Arc Testnet)
3. Solicite USDC testnet
4. Aguarde a confirmação

## 🌐 Passo 3: Abrir Remix IDE

1. Acesse: https://remix.ethereum.org/
2. Aguarde o carregamento completo

## 📦 Passo 4: Criar Arquivo do Contrato

1. No Remix, clique em "File Explorer" (ícone de pasta no lado esquerdo)
2. Clique no ícone "+" para criar um novo arquivo
3. Nomeie como: `VirtualAgent.sol`
4. Cole o código completo do contrato (veja abaixo ou copie de `contracts/VirtualAgent.sol`)

## 🔨 Passo 5: Compilar o Contrato

1. Clique na aba "Solidity Compiler" (ícone de compilador no lado esquerdo)
2. Selecione a versão do compilador: **0.8.20**
3. Clique em "Compile VirtualAgent.sol"
4. Aguarde a compilação (deve aparecer um ✓ verde)

## 🚀 Passo 6: Fazer Deploy

1. Clique na aba "Deploy & Run Transactions" (ícone de foguete no lado esquerdo)
2. Em "Environment", selecione: **"Injected Provider - MetaMask"**
3. Certifique-se de que o MetaMask está conectado e na rede **Arc Testnet**
4. Em "Contract", selecione: **"VirtualAgent - contracts/VirtualAgent.sol"**
5. Clique em **"Deploy"**
6. Confirme a transação no MetaMask
7. Aguarde a confirmação (pode levar alguns segundos)

## ✅ Passo 7: Copiar Endereço do Contrato

1. Após o deploy, você verá o contrato na seção "Deployed Contracts"
2. Clique na seta para expandir
3. **Copie o endereço do contrato** (começa com 0x...)
4. Exemplo: `0x1234567890123456789012345678901234567890`

## 🔗 Passo 8: Verificar no ArcScan

1. Acesse: https://testnet.arcscan.app
2. Cole o endereço do contrato na busca
3. Verifique se o contrato foi deployado corretamente

## ⚙️ Passo 9: Atualizar Frontend

1. Abra o arquivo `.env.local` no projeto (ou crie se não existir)
2. Adicione/atualize a linha:

```bash
NEXT_PUBLIC_VIRTUAL_AGENT_ADDRESS=0x... # Cole o endereço aqui
```

3. Salve o arquivo
4. Reinicie o servidor de desenvolvimento:

```bash
pnpm dev
```

## 🧪 Passo 10: Testar o DApp

1. Acesse: http://localhost:3000/marketplace
2. Conecte sua carteira
3. Tente criar um agente
4. Verifique se a transação é enviada corretamente

## 📋 Informações Importantes

### Endereço da Carteira (derivado da chave privada)
Para obter USDC testnet, você precisa do endereço da carteira. Você pode:

1. **Usar MetaMask**: O endereço aparece quando você conecta
2. **Calcular do private key**: Use uma ferramenta online ou script

### Chave Privada
Sua chave privada está no arquivo `.env`:
```
PRIVATE_KEY=7037a2d5e0fab06911c4fc98f09ef19d5558194440d7438bd099ae78e234228c
```

⚠️ **IMPORTANTE**: Nunca compartilhe sua chave privada!

## 🐛 Troubleshooting

### Erro: "Insufficient funds"
- Obtenha mais USDC testnet em: https://easyfaucetarc.xyz/

### Erro: "Network mismatch"
- Certifique-se de estar na rede Arc Testnet no MetaMask

### Erro: "Transaction failed"
- Verifique se tem USDC suficiente
- Tente novamente após alguns segundos

### Contrato não aparece no Remix
- Verifique se compilou corretamente
- Certifique-se de que o arquivo está salvo

## 📞 Suporte

- Arc Network Docs: https://docs.arc.network/
- Remix IDE Docs: https://remix-ide.readthedocs.io/
- ArcScan: https://testnet.arcscan.app


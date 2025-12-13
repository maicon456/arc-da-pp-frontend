# 🚀 Instruções de Deploy - VirtualAgent Contract

## ⚠️ Pré-requisito: Instalar Foundry

O Foundry é necessário para compilar o contrato. Instale seguindo:

### Windows (PowerShell)
```powershell
# Instalar via cargo (Rust)
# Primeiro instale Rust: https://rustup.rs/
# Depois:
cargo install --git https://github.com/foundry-rs/foundry foundry-cli anvil cast chisel --bins --locked
```

### Alternativa: Usar WSL ou Linux
```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

## 📝 Passo a Passo

### 1. Configurar Chave Privada

A chave privada já está configurada no arquivo `.env`:
```
PRIVATE_KEY=7037a2d5e0fab06911c4fc98f09ef19d5558194440d7438bd099ae78e234228c
RPC_URL=https://rpc.testnet.arc.network
```

### 2. Obter USDC Testnet

Antes de fazer deploy, você precisa de USDC na carteira:
- Acesse: https://easyfaucetarc.xyz/
- Cole o endereço da sua carteira (derivado da chave privada)
- Solicite USDC testnet

### 3. Compilar o Contrato

```bash
cd arc-da-pp-frontend
forge build
```

### 4. Fazer Deploy

```bash
# Opção 1: Usando script Foundry
forge script script/DeployVirtualAgent.s.sol:DeployVirtualAgent \
  --rpc-url https://rpc.testnet.arc.network \
  --broadcast \
  -vvvv

# Opção 2: Deploy direto
forge create contracts/VirtualAgent.sol:VirtualAgent \
  --rpc-url https://rpc.testnet.arc.network \
  --private-key $PRIVATE_KEY \
  --legacy
```

### 5. Atualizar .env.local

Após o deploy, copie o endereço do contrato e atualize `.env.local`:

```bash
NEXT_PUBLIC_VIRTUAL_AGENT_ADDRESS=0x... # Endereço do contrato
```

## 🔍 Verificar Deploy

1. Acesse: https://testnet.arcscan.app
2. Cole o endereço do contrato
3. Verifique se o contrato foi deployado corretamente

## 🐛 Troubleshooting

### Erro: "forge: command not found"
- Instale o Foundry (veja pré-requisitos acima)

### Erro: "insufficient funds"
- Obtenha USDC testnet em: https://easyfaucetarc.xyz/

### Erro: "nonce too low"
- Aguarde alguns segundos e tente novamente

## 📞 Suporte

- Arc Network Docs: https://docs.arc.network/
- Foundry Docs: https://book.getfoundry.sh/

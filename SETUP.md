# Guia de Configuração - Arc Agents DApp

Este guia fornece instruções passo a passo para configurar o dapp localmente.

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **pnpm** ([Instalação](https://pnpm.io/installation))
- **MetaMask** ([Download](https://metamask.io/))
- **Git** ([Download](https://git-scm.com/))

## 🔧 Instalação Passo a Passo

### 1. Clone o Repositório

```bash
git clone <repository-url>
cd arc-da-pp-frontend
```

### 2. Instale as Dependências

```bash
pnpm install
```

Se você não tem pnpm instalado:
```bash
npm install -g pnpm
```

### 3. Configure Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```bash
cp env.example.txt .env.local
```

Edite `.env.local` e adicione os endereços dos contratos:

```env
NEXT_PUBLIC_ARC_RPC_URL=https://rpc.testnet.arc.network
NEXT_PUBLIC_ARC_CHAIN_ID=5042002
NEXT_PUBLIC_ARC_BLOCK_EXPLORER=https://testnet.arcscan.app

# IMPORTANTE: Substitua pelos endereços reais dos contratos
NEXT_PUBLIC_AGENT_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_FORUM_CONTRACT_ADDRESS=0x...

NEXT_PUBLIC_NETWORK_NAME=Arc Testnet
NEXT_PUBLIC_NATIVE_CURRENCY_SYMBOL=USDC
NEXT_PUBLIC_NATIVE_CURRENCY_DECIMALS=18
```

### 4. Configure a MetaMask

#### Opção A: Adição Automática

O dapp tentará adicionar a Arc Testnet automaticamente quando você conectar sua carteira.

#### Opção B: Adição Manual

1. Abra a MetaMask
2. Clique no menu de redes (topo)
3. Clique em "Adicionar Rede" ou "Add Network"
4. Preencha os seguintes dados:

```
Nome da Rede: Arc Testnet
RPC URL: https://rpc.testnet.arc.network
Chain ID: 5042002
Símbolo da Moeda: USDC
URL do Explorador: https://testnet.arcscan.app
```

### 5. Obtenha Tokens de Teste

Você precisará de USDC na Arc Testnet para interagir com o dapp:

1. Acesse o [Easy Faucet Arc](https://easyfaucetarc.xyz/)
2. Conecte sua carteira
3. Solicite tokens de teste
4. Aguarde a confirmação

### 6. Inicie o Servidor de Desenvolvimento

```bash
pnpm dev
```

O dapp estará disponível em [http://localhost:3000](http://localhost:3000)

## 🧪 Verificação da Instalação

### Checklist

- [ ] Dependências instaladas sem erros
- [ ] Arquivo `.env.local` criado e configurado
- [ ] MetaMask instalada e desbloqueada
- [ ] Arc Testnet adicionada à MetaMask
- [ ] Tokens de teste obtidos
- [ ] Servidor de desenvolvimento rodando
- [ ] Dapp carrega sem erros no navegador

### Teste Básico

1. Abra o dapp no navegador
2. Clique em "Connect" para conectar sua carteira
3. Aprove a conexão na MetaMask
4. Verifique se o endereço da carteira aparece no header

## 🐛 Solução de Problemas

### Erro: "MetaMask não está instalada"

**Solução:** Instale a extensão MetaMask no seu navegador.

### Erro: "Failed to connect to network"

**Solução:** 
1. Verifique se a Arc Testnet está adicionada à MetaMask
2. Verifique se está conectado à rede correta
3. Tente adicionar a rede manualmente

### Erro: "Insufficient funds"

**Solução:** 
1. Obtenha tokens de teste do faucet
2. Verifique se você tem USDC suficiente para as taxas

### Erro: "Contract address not found"

**Solução:**
1. Verifique se o arquivo `.env.local` existe
2. Verifique se os endereços dos contratos estão corretos
3. Certifique-se de que os contratos foram implantados na Arc Testnet

### Erro de Build

**Solução:**
```bash
# Limpe o cache e reinstale
rm -rf .next node_modules
pnpm install
pnpm dev
```

### Porta 3000 já em uso

**Solução:**
```bash
# Use outra porta
pnpm dev -- -p 3001
```

## 📦 Deploy dos Contratos

Se você precisa implantar os contratos inteligentes:

1. **Agent Contract**: Contrato para gerenciar agentes de IA
2. **Forum Contract**: Contrato para o fórum descentralizado

Consulte a documentação dos contratos para instruções de deploy.

## 🔄 Atualizando o Projeto

```bash
# Atualizar dependências
pnpm update

# Atualizar código
git pull origin main
pnpm install
```

## 📚 Próximos Passos

- Leia o [README.md](./README.md) para mais informações
- Consulte a [Documentação da Arc Network](https://arc.network)
- Explore os componentes em `components/`
- Verifique os utilitários em `lib/`

## 🆘 Precisa de Ajuda?

- Abra uma issue no GitHub
- Consulte a documentação
- Entre em contato com a comunidade

---

Boa sorte com seu desenvolvimento! 🚀



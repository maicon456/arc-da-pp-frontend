# 🔐 Variáveis de Ambiente para Vercel

## 📋 Variáveis Necessárias

Configure estas variáveis no Vercel:

### 1. Acesse Configuração

1. Acesse: https://vercel.com/dashboard
2. Selecione seu projeto
3. Vá em **Settings** → **Environment Variables**

### 2. Adicione Estas Variáveis

```
NEXT_PUBLIC_ARC_RPC_URL
Valor: https://rpc.testnet.arc.network
Ambientes: Production, Preview, Development

NEXT_PUBLIC_ARC_BLOCK_EXPLORER
Valor: https://testnet.arcscan.app
Ambientes: Production, Preview, Development

NEXT_PUBLIC_VIRTUAL_AGENT_ADDRESS
Valor: 0x... (seu endereço do contrato)
Ambientes: Production, Preview, Development
```

### 3. Após Adicionar

1. Clique em **Save**
2. Vá em **Deployments**
3. Clique em **Redeploy** no último deployment
4. Aguarde o build

---

## ⚠️ IMPORTANTE

- **Sempre use `NEXT_PUBLIC_`** para variáveis que o frontend precisa
- **Configure para todos os ambientes** (Production, Preview, Development)
- **Faça Redeploy** após adicionar variáveis

---

## 🔍 Verificar se Está Funcionando

Após configurar, verifique:

1. Build deve passar
2. Deploy deve completar
3. Site deve carregar
4. Console do navegador não deve mostrar erros de variáveis

---

**Configure as variáveis e faça redeploy!** 🚀


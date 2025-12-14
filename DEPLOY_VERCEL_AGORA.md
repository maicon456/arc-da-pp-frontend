# 🚀 Deploy no Vercel - Instruções

## 📋 Status Atual

- ✅ **Código local:** Corrigido (ES2020, BigInt(0))
- ❌ **GitHub:** Precisa de push das correções
- ❌ **Vercel:** Build falhando (código desatualizado no GitHub)

## 🎯 Solução: Fazer Push para GitHub

O Vercel está conectado ao GitHub e fará deploy automático quando você fizer push.

### Passo 1: Verificar Repositório

O projeto está conectado ao repositório: **maicon456/arc-da-pp-frontend**

### Passo 2: Fazer Push das Correções

**Opção A: GitHub Desktop (Recomendado)**

1. Abra **GitHub Desktop**
2. **File** → **Add Local Repository**
3. Escolha: `C:\Users\maicon\Desktop\arc-da-pp-frontend`
4. Você verá todas as correções pendentes
5. **Commit message:**
   ```
   fix: update TypeScript to ES2020 and replace BigInt literals
   ```
6. Clique em **"Commit to main"**
7. Clique em **"Push origin"**

**Opção B: Git CLI**

```powershell
cd C:\Users\maicon\Desktop\arc-da-pp-frontend
git add .
git commit -m "fix: update TypeScript to ES2020 and replace BigInt literals"
git push origin main
```

### Passo 3: Aguardar Deploy Automático

Após o push:
1. O Vercel detectará automaticamente as mudanças
2. Fará deploy automaticamente
3. Aguarde 2-5 minutos
4. Verifique em: https://vercel.com/dashboard

---

## 🔧 Deploy Manual via CLI (Alternativa)

Se quiser fazer deploy manual sem push:

```powershell
# Instalar Vercel CLI
npm install -g vercel

# Fazer login
vercel login

# Deploy
cd C:\Users\maicon\Desktop\arc-da-pp-frontend
vercel

# Para produção
vercel --prod
```

---

## ⚙️ Configurar Variáveis de Ambiente

Após o deploy passar, configure no Vercel:

1. Acesse: https://vercel.com/dashboard
2. Selecione: **arc-da-pp-frontend**
3. **Settings** → **Environment Variables**
4. Adicione:
   ```
   NEXT_PUBLIC_ARC_RPC_URL = https://rpc.testnet.arc.network
   NEXT_PUBLIC_ARC_BLOCK_EXPLORER = https://testnet.arcscan.app
   NEXT_PUBLIC_VIRTUAL_AGENT_ADDRESS = 0x... (seu endereço)
   ```
5. Marque: **Production**, **Preview**, **Development**
6. **Save**
7. Faça **Redeploy**

---

## ✅ Verificar Deploy

1. Acesse: https://vercel.com/dashboard
2. Selecione: **arc-da-pp-frontend**
3. Vá em **Deployments**
4. Verifique se o status é **"Ready"** (verde)
5. Clique na URL para acessar o site

---

**Faça push para GitHub e o Vercel fará deploy automaticamente!** 🚀


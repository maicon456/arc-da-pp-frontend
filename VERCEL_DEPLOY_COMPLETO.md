# 🚀 Deploy Completo no Vercel - Passo a Passo

## 📋 Checklist Completo

### ✅ Passo 1: Verificar Repositório no GitHub

1. Acesse: https://github.com/maicon456/Arcnet-AI
2. Verifique se todos os arquivos estão lá
3. Verifique se as correções foram commitadas

**Se faltar arquivos:**
- Use GitHub Desktop para fazer push
- Ou use Git CLI

---

### ✅ Passo 2: Conectar Repositório ao Vercel

1. Acesse: https://vercel.com/new
2. Faça login (se necessário)
3. Clique em **"Import Git Repository"**
4. Selecione: `maicon456/Arcnet-AI` (ou `arc-da-pp-frontend`)
5. Clique em **"Import"**

**Se o projeto já existir:**
1. Acesse: https://vercel.com/dashboard
2. Selecione seu projeto
3. Vá em **Settings** → **Git**
4. Verifique se o repositório está conectado

---

### ✅ Passo 3: Configurar Variáveis de Ambiente

**CRÍTICO:** Sem isso, o deploy não funciona!

1. No dashboard do Vercel, selecione seu projeto
2. Vá em **Settings** → **Environment Variables**
3. Clique em **"Add New"**
4. Adicione estas variáveis:

#### Variável 1:
```
Key: NEXT_PUBLIC_ARC_RPC_URL
Value: https://rpc.testnet.arc.network
Environments: ☑️ Production ☑️ Preview ☑️ Development
```

#### Variável 2:
```
Key: NEXT_PUBLIC_ARC_BLOCK_EXPLORER
Value: https://testnet.arcscan.app
Environments: ☑️ Production ☑️ Preview ☑️ Development
```

#### Variável 3:
```
Key: NEXT_PUBLIC_VIRTUAL_AGENT_ADDRESS
Value: 0x... (seu endereço do contrato)
Environments: ☑️ Production ☑️ Preview ☑️ Development
```

5. Clique em **"Save"** para cada variável

---

### ✅ Passo 4: Configurar Build Settings

1. No dashboard do Vercel, vá em **Settings** → **General**
2. Verifique:
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build` (ou deixe vazio para auto-detect)
   - **Output Directory:** (deixe vazio para auto-detect)
   - **Install Command:** `npm install` (ou deixe vazio para auto-detect)

**Se estiver correto, não precisa mudar nada.**

---

### ✅ Passo 5: Fazer Redeploy

1. No dashboard do Vercel, vá em **Deployments**
2. Encontre o último deployment
3. Clique nos **3 pontos** (⋯) ao lado
4. Selecione **"Redeploy"**
5. Aguarde o build (pode levar 2-5 minutos)

**OU:**

1. Vá em **Deployments**
2. Clique em **"Create Deployment"**
3. Selecione branch: `main`
4. Clique em **"Deploy"**

---

### ✅ Passo 6: Verificar Build Logs

Durante o build:

1. Clique no deployment em andamento
2. Veja a aba **"Build Logs"**
3. Verifique se há erros

**Se houver erros:**
- Anote o erro
- Consulte `DIAGNOSTICO_VERCEL.md`
- Corrija e faça novo deploy

---

### ✅ Passo 7: Verificar Deploy

Após o build completar:

1. Veja o status do deployment
2. Se for **"Ready"** (verde), está funcionando!
3. Clique na **URL** para acessar o site
4. Teste o DApp

---

## 🐛 Se o Deploy Falhar

### Erro: "Build failed"

**Solução:**
1. Veja os Build Logs
2. Identifique o erro
3. Corrija localmente
4. Faça commit e push
5. Faça redeploy

### Erro: "Environment variable not found"

**Solução:**
- Configure variáveis de ambiente (Passo 3)
- Faça redeploy

### Erro: "Module not found"

**Solução:**
```powershell
cd C:\Users\maicon\Desktop\arc-da-pp-frontend
npm install
git add package.json package-lock.json
git commit -m "fix: update dependencies"
git push
```

### Erro: "Repository not found"

**Solução:**
- Conecte o repositório (Passo 2)
- Verifique permissões do GitHub

---

## 📋 Checklist Final

Antes de considerar completo:

- [ ] Repositório conectado ao Vercel
- [ ] Variáveis de ambiente configuradas
- [ ] Build passa sem erros
- [ ] Deploy completo (status "Ready")
- [ ] Site acessível pela URL do Vercel
- [ ] DApp funciona corretamente

---

## 🔗 Links Úteis

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Criar Projeto:** https://vercel.com/new
- **Documentação Vercel:** https://vercel.com/docs

---

**Siga os passos acima para garantir que tudo funcione!** 🚀


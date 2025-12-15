# 📦 Mover Projeto para Diretório do GitHub

## 📍 Diretório do GitHub

O repositório está localizado em:
```
C:\Users\maicon\Documents\GitHub\Arcnet-AI
```

## 🚀 Opções para Copiar Arquivos

### Opção 1: Script Automático (Recomendado)

Execute o script que copia automaticamente todos os arquivos necessários:

```powershell
cd C:\Users\maicon\Desktop\arc-da-pp-frontend
.\COPIAR_PARA_GITHUB.ps1
```

O script:
- ✅ Copia todos os arquivos do projeto
- ✅ Exclui `node_modules`, `.next`, `.git`, etc.
- ✅ Mantém a estrutura de pastas
- ✅ Ignora arquivos sensíveis (`.env.local`)

### Opção 2: Copiar Manualmente

1. **Abra o Explorer:**
   - Origem: `C:\Users\maicon\Desktop\arc-da-pp-frontend`
   - Destino: `C:\Users\maicon\Documents\GitHub\Arcnet-AI`

2. **Copie as pastas e arquivos:**
   - ✅ `app/`
   - ✅ `components/`
   - ✅ `contracts/`
   - ✅ `lib/`
   - ✅ `providers/`
   - ✅ `public/`
   - ✅ `scripts/`
   - ✅ `test/`
   - ✅ Todos os arquivos `.md`
   - ✅ `.gitignore`
   - ✅ `.gitattributes`
   - ✅ `package.json`
   - ✅ `tsconfig.json`
   - ✅ `next.config.mjs`
   - ✅ Outros arquivos de configuração

3. **NÃO copie:**
   - ❌ `node_modules/`
   - ❌ `.next/`
   - ❌ `.git/` (já existe no destino)
   - ❌ `.env.local`
   - ❌ `.env`
   - ❌ `dist/`
   - ❌ `build/`

### Opção 3: Usar Robocopy (Windows)

```powershell
# Criar diretório se não existir
New-Item -ItemType Directory -Path "C:\Users\maicon\Documents\GitHub\Arcnet-AI" -Force

# Copiar arquivos excluindo pastas específicas
robocopy "C:\Users\maicon\Desktop\arc-da-pp-frontend" "C:\Users\maicon\Documents\GitHub\Arcnet-AI" /E /XD node_modules .next .git dist build out coverage /XF .env.local .env *.log /NFL /NDL /NP
```

## ✅ Após Copiar

### 1. Navegar para o Diretório

```powershell
cd "C:\Users\maicon\Documents\GitHub\Arcnet-AI"
```

### 2. Verificar Status

```powershell
git status
```

### 3. Adicionar Arquivos

```powershell
git add .
```

### 4. Criar Commit

```powershell
git commit -m "feat: initial commit - ArcnetAI DApp on Arc Network"
```

### 5. Conectar ao GitHub (se ainda não conectou)

```powershell
git remote add origin https://github.com/SEU-USUARIO/Arcnet-AI.git
```

### 6. Fazer Push

```powershell
git push -u origin main
```

## 🔍 Verificar Estrutura

Após copiar, verifique se os arquivos principais estão presentes:

```powershell
cd "C:\Users\maicon\Documents\GitHub\Arcnet-AI"
Get-ChildItem -Name | Select-Object -First 20
```

Deve mostrar:
- `app/`
- `components/`
- `package.json`
- `README.md`
- `.gitignore`
- etc.

## ⚠️ Importante

- **Não copie** `node_modules/` - será instalado com `pnpm install`
- **Não copie** `.env.local` - crie um novo no destino
- **Não copie** `.git/` do projeto original - use o que já existe no GitHub

## 📝 Instalar Dependências

Após copiar, instale as dependências:

```powershell
cd "C:\Users\maicon\Documents\GitHub\Arcnet-AI"
pnpm install
# ou
npm install
```

---

**Pronto! Seu projeto estará no diretório do GitHub!** 🎉


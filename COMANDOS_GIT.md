# 📝 Comandos Git - Prontos para Executar

## ⚠️ Importante

**O Git precisa estar instalado** antes de executar estes comandos.

Se ainda não instalou:
1. Baixe: https://git-scm.com/download/win
2. Instale com opção "Add to PATH"
3. **Reinicie o terminal**
4. Execute os comandos abaixo

## 🚀 Comandos para Executar

### Opção 1: Script Automático

```powershell
cd "C:\Users\maicon\Documents\GitHub\Arcnet-AI"
.\COMMIT_E_PUSH.ps1
```

### Opção 2: Comandos Manuais

Execute no PowerShell (um por vez):

```powershell
# 1. Navegar para o diretório
cd "C:\Users\maicon\Documents\GitHub\Arcnet-AI"

# 2. Verificar status
git status

# 3. Adicionar todos os arquivos
git add .

# 4. Criar commit
git commit -m "feat: initial commit - ArcnetAI DApp on Arc Network" -m "- Complete AI agent marketplace with tokenization" -m "- On-chain chat and forum functionality" -m "- Modern UI inspired by Arc Network design" -m "- Full Web3 integration with wagmi/viem" -m "- Smart contract for agent management" -m "- Comprehensive documentation"

# 5. Renomear branch
git branch -M main

# 6. Verificar remote
git remote -v

# 7. Se não tiver remote, adicionar (substitua SEU-USUARIO)
git remote add origin https://github.com/SEU-USUARIO/Arcnet-AI.git

# 8. Fazer push
git push -u origin main
```

## 🔐 Autenticação

Se pedir username/password ao fazer push:

- **Username:** seu username do GitHub
- **Password:** use um **Personal Access Token** (não sua senha!)

**Criar Token:**
1. https://github.com/settings/tokens
2. Generate new token (classic)
3. Marque `repo`
4. Generate e copie
5. Use o token como senha

## ✅ Verificação

Após o push, verifique:

```powershell
# Ver histórico
git log --oneline

# Ver status
git status

# Ver remote
git remote -v
```

## 📍 Localização

Todos os arquivos estão em:
```
C:\Users\maicon\Documents\GitHub\Arcnet-AI
```

---

**Execute os comandos quando o Git estiver instalado!** 🎯


# 🚀 Comandos Diretos para Fazer Commit

## ⚠️ Se o Script Não Funcionar

Execute estes comandos diretamente no PowerShell:

## 📋 Passo a Passo

### 1. Navegar para o Diretório

```powershell
cd C:\Users\maicon\Desktop\arc-da-pp-frontend
```

### 2. Verificar Git

```powershell
git --version
```

**Se der erro:** Instale o Git primeiro:
- https://git-scm.com/download/win
- OU use GitHub Desktop: https://desktop.github.com/

### 3. Inicializar Repositório (se necessário)

```powershell
git init
```

### 4. Configurar Usuário (primeira vez)

```powershell
git config user.name "maicon456"
git config user.email "seu-email@example.com"
```

### 5. Adicionar Remote

```powershell
git remote add origin https://github.com/maicon456/Arcnet-AI.git
```

**Se já existir, atualize:**
```powershell
git remote set-url origin https://github.com/maicon456/Arcnet-AI.git
```

### 6. Adicionar Arquivos

```powershell
git add .
```

### 7. Verificar o que será commitado

```powershell
git status
```

### 8. Criar Commit

```powershell
git commit -m "feat: initial commit - ArcnetAI DApp on Arc Network"
```

### 9. Configurar Branch

```powershell
git branch -M main
```

### 10. Fazer Push

```powershell
git push -u origin main
```

**Se pedir autenticação:**
- **Username:** `maicon456`
- **Password:** Personal Access Token (não sua senha)
- **Criar token:** https://github.com/settings/tokens

---

## 🎯 Comandos em Sequência (Copiar e Colar)

```powershell
cd C:\Users\maicon\Desktop\arc-da-pp-frontend
git init
git config user.name "maicon456"
git add .
git commit -m "feat: initial commit - ArcnetAI DApp on Arc Network"
git remote add origin https://github.com/maicon456/Arcnet-AI.git
git branch -M main
git push -u origin main
```

---

## 🖥️ Alternativa: GitHub Desktop

Se os comandos não funcionarem:

1. Baixe: https://desktop.github.com/
2. Instale GitHub Desktop
3. File → Add Local Repository
4. Escolha: `C:\Users\maicon\Desktop\arc-da-pp-frontend`
5. Clique em "Publish repository"
6. Nome: `Arcnet-AI`
7. URL: https://github.com/maicon456/Arcnet-AI

---

**Execute os comandos acima no PowerShell!** 🚀


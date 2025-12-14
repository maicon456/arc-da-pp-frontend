# 🚀 Instruções para Inicializar Git

## ⚠️ Pré-requisito: Instalar Git

Se o Git não estiver instalado, siga estes passos:

### Windows

1. **Baixe o Git:**
   - Acesse: https://git-scm.com/download/win
   - Baixe o instalador

2. **Instale o Git:**
   - Execute o instalador
   - Use as opções padrão (recomendado)
   - Marque "Add Git to PATH" se disponível

3. **Verifique a instalação:**
   ```bash
   git --version
   ```

4. **Reinicie o terminal** após a instalação

## 📋 Opção 1: Usar Script Automático (Recomendado)

### Windows (PowerShell)

1. Abra o PowerShell no diretório do projeto
2. Execute:
   ```powershell
   .\INITIALIZE_GIT.ps1
   ```
3. Siga as instruções na tela

### Windows (CMD)

1. Abra o CMD no diretório do projeto
2. Execute:
   ```cmd
   INITIALIZE_GIT.bat
   ```
3. Siga as instruções na tela

## 📋 Opção 2: Comandos Manuais

Se preferir executar manualmente:

### 1. Inicializar Git

```bash
git init
```

### 2. Configurar Usuário (substitua com seus dados)

```bash
git config user.name "Seu Nome"
git config user.email "seu.email@exemplo.com"
```

### 3. Adicionar Arquivos

```bash
git add .
```

### 4. Verificar Status

```bash
git status
```

### 5. Criar Commit Inicial

```bash
git commit -m "feat: initial commit - ArcnetAI DApp on Arc Network

- Complete AI agent marketplace with tokenization
- On-chain chat and forum functionality
- Modern UI inspired by Arc Network design
- Full Web3 integration with wagmi/viem
- Smart contract for agent management
- Comprehensive documentation"
```

### 6. Renomear Branch

```bash
git branch -M main
```

## 🔗 Conectar ao Repositório Remoto

Após inicializar o Git localmente:

### 1. Criar Repositório no GitHub

1. Acesse https://github.com
2. Clique em "New repository"
3. Nome: `arcnetai`
4. Descrição: "AI Agent Marketplace on Arc Network"
5. **NÃO** inicialize com README (já temos um)
6. Clique em "Create repository"

### 2. Adicionar Remote

```bash
git remote add origin https://github.com/SEU-USUARIO/arcnetai.git
```

Substitua `SEU-USUARIO` pelo seu username do GitHub.

### 3. Fazer Push

```bash
git push -u origin main
```

## ✅ Verificação

Após o push, verifique:

```bash
# Ver remotes
git remote -v

# Ver histórico
git log --oneline

# Ver status
git status
```

## 🆘 Problemas Comuns

### Git não encontrado

**Erro:** `git: command not found`

**Solução:**
1. Instale o Git (veja pré-requisitos acima)
2. Reinicie o terminal
3. Verifique: `git --version`

### Erro de autenticação no push

**Erro:** `Authentication failed`

**Solução:**
1. Use Personal Access Token (GitHub)
2. Ou configure SSH keys
3. Veja: https://docs.github.com/en/authentication

### Arquivos não adicionados

**Problema:** Alguns arquivos não aparecem no `git status`

**Solução:**
- Verifique se estão no `.gitignore`
- Se necessário, force: `git add -f arquivo`

## 📚 Recursos

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)

---

**Precisa de ajuda?** Abra uma issue no repositório!


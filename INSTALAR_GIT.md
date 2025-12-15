# 🔧 Como Instalar e Configurar Git no Windows

## ⚠️ Situação Atual

O Git não está instalado ou não está no PATH do sistema. Siga os passos abaixo para instalar.

## 📥 Passo 1: Baixar o Git

1. Acesse: **https://git-scm.com/download/win**
2. O download começará automaticamente
3. Aguarde o download completar

## 🚀 Passo 2: Instalar o Git

1. **Execute o instalador baixado** (Git-x.x.x-64-bit.exe)

2. **Tela de Boas-vindas:**
   - Clique em "Next"

3. **Selecionar Localização:**
   - Use o padrão: `C:\Program Files\Git`
   - Clique em "Next"

4. **Componentes:**
   - ✅ Marque todas as opções (recomendado)
   - Clique em "Next"

5. **Editor:**
   - Escolha seu editor preferido (ou deixe padrão)
   - Clique em "Next"

6. **Ajustar PATH:**
   - ⚠️ **IMPORTANTE:** Selecione **"Git from the command line and also from 3rd-party software"**
   - Esta opção adiciona Git ao PATH automaticamente
   - Clique em "Next"

7. **HTTPS:**
   - Use a biblioteca OpenSSL padrão
   - Clique em "Next"

8. **Line Ending:**
   - Selecione **"Checkout Windows-style, commit Unix-style line endings"**
   - Clique em "Next"

9. **Terminal:**
   - Use MinTTY (recomendado)
   - Clique em "Next"

10. **Opções Extras:**
    - Deixe as opções padrão marcadas
    - Clique em "Next"

11. **Instalação:**
    - Clique em "Install"
    - Aguarde a instalação completar

12. **Concluir:**
    - ✅ Marque "Launch Git Bash" se quiser testar
    - Clique em "Finish"

## ✅ Passo 3: Verificar Instalação

### Opção A: PowerShell/Terminal Novo

1. **Feche o terminal atual completamente**
2. **Abra um novo terminal** (PowerShell ou CMD)
3. Execute:
   ```powershell
   git --version
   ```
4. Deve mostrar: `git version 2.x.x`

### Opção B: Git Bash

1. Abra o **Git Bash** (menu Iniciar)
2. Execute:
   ```bash
   git --version
   ```

## 🔄 Passo 4: Reiniciar o Terminal

**IMPORTANTE:** Após instalar o Git:

1. Feche **TODOS** os terminais abertos
2. Feche o Cursor/VS Code se estiver aberto
3. Abra novamente o Cursor
4. Abra um novo terminal no Cursor

## 🎯 Passo 5: Inicializar o Repositório

Após instalar e reiniciar o terminal:

```powershell
# Navegar para o projeto
cd C:\Users\maicon\Desktop\arc-da-pp-frontend

# Executar o script
.\INITIALIZE_GIT.ps1
```

Ou manualmente:

```powershell
# Inicializar Git
git init

# Configurar usuário (substitua com seus dados)
git config user.name "Seu Nome"
git config user.email "seu.email@exemplo.com"

# Adicionar arquivos
git add .

# Criar commit
git commit -m "feat: initial commit - ArcnetAI DApp"

# Renomear branch
git branch -M main
```

## 🆘 Problemas Comuns

### Git ainda não funciona após instalar

**Solução:**
1. Reinicie o computador (garante que o PATH seja atualizado)
2. Ou adicione manualmente ao PATH:
   - Abra "Variáveis de Ambiente" no Windows
   - Adicione: `C:\Program Files\Git\bin` ao PATH do sistema

### Erro: "git não é reconhecido"

**Solução:**
1. Verifique se o Git está instalado:
   - Procure "Git Bash" no menu Iniciar
2. Se estiver, reinicie o terminal
3. Se não estiver, reinstale o Git

## 📚 Recursos

- [Documentação Git](https://git-scm.com/doc)
- [Git para Windows](https://git-scm.com/download/win)
- [GitHub Desktop](https://desktop.github.com/) (alternativa com interface gráfica)

---

**Após instalar o Git, execute novamente o script `INITIALIZE_GIT.ps1`!**


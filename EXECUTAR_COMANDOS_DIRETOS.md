# 🚀 Executar Comandos Diretos - Sem Scripts

## ⚠️ Problema Resolvido

Como a execução de scripts está desabilitada, execute estes comandos **diretamente no PowerShell**:

## 📋 Copiar Arquivos e Criar Repositório

Cole e execute **um comando por vez** no PowerShell:

```powershell
# 1. Criar diretório
New-Item -ItemType Directory -Path "C:\Users\maicon\Documents\GitHub\arcAI" -Force

# 2. Definir variáveis
$source = "C:\Users\maicon\Desktop\arc-da-pp-frontend"
$target = "C:\Users\maicon\Documents\GitHub\arcAI"

# 3. Copiar pastas principais
Copy-Item "$source\app" -Destination "$target\app" -Recurse -Force
Copy-Item "$source\components" -Destination "$target\components" -Recurse -Force
Copy-Item "$source\contracts" -Destination "$target\contracts" -Recurse -Force
Copy-Item "$source\lib" -Destination "$target\lib" -Recurse -Force
Copy-Item "$source\providers" -Destination "$target\providers" -Recurse -Force
Copy-Item "$source\public" -Destination "$target\public" -Recurse -Force
Copy-Item "$source\scripts" -Destination "$target\scripts" -Recurse -Force
Copy-Item "$source\test" -Destination "$target\test" -Recurse -Force
Copy-Item "$source\.github" -Destination "$target\.github" -Recurse -Force -ErrorAction SilentlyContinue

# 4. Copiar arquivos de configuração
Copy-Item "$source\package.json" -Destination "$target\" -Force
Copy-Item "$source\tsconfig.json" -Destination "$target\" -Force
Copy-Item "$source\next.config.mjs" -Destination "$target\" -Force
Copy-Item "$source\postcss.config.mjs" -Destination "$target\" -Force
Copy-Item "$source\foundry.toml" -Destination "$target\" -Force
Copy-Item "$source\components.json" -Destination "$target\" -Force
Copy-Item "$source\pnpm-lock.yaml" -Destination "$target\" -Force

# 5. Copiar arquivos Git
Copy-Item "$source\.gitignore" -Destination "$target\" -Force
Copy-Item "$source\.gitattributes" -Destination "$target\" -Force

# 6. Copiar documentação
Copy-Item "$source\*.md" -Destination "$target\" -Force

# 7. Copiar outros arquivos
Copy-Item "$source\*.sol" -Destination "$target\" -Force -ErrorAction SilentlyContinue
Copy-Item "$source\*.txt" -Destination "$target\" -Force -ErrorAction SilentlyContinue

# 8. Navegar para o diretório
cd "C:\Users\maicon\Documents\GitHub\arcAI"

# 9. Inicializar Git
git init

# 10. Configurar usuário
git config user.name "maicon456"
git config user.email "maicon456@users.noreply.github.com"

# 11. Adicionar todos os arquivos
git add .

# 12. Criar commit
git commit -m "feat: initial commit - ArcnetAI DApp on Arc Network"

# 13. Renomear branch
git branch -M main

# 14. Verificar status
git status
```

## 🔗 Conectar ao GitHub

Depois de copiar e commitar:

```powershell
# 1. Criar repositório no GitHub primeiro:
# https://github.com/new
# Nome: arcAI

# 2. Adicionar remote
git remote add origin https://github.com/maicon456/arcAI.git

# 3. Verificar remote
git remote -v

# 4. Fazer push
git push -u origin main
```

## 🔐 Autenticação

Quando pedir username/password:
- **Username:** `maicon456`
- **Password:** Personal Access Token

Criar token: https://github.com/settings/tokens

## ✅ Verificação

Após push:
- Acesse: https://github.com/maicon456/arcAI
- Verifique todos os arquivos

---

**Execute os comandos acima diretamente no PowerShell!** 🎯


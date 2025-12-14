# 📋 Comandos para Copiar Manualmente

## ⚠️ Problema: Execução de Scripts Desabilitada

Se você recebeu o erro "execução de scripts foi desabilitada", use uma das opções abaixo:

## 🔧 Opção 1: Habilitar Execução de Scripts

Execute no PowerShell **como Administrador**:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Depois execute novamente:
```powershell
.\COPIAR_PARA_ARCAI.ps1
```

## 📋 Opção 2: Comandos Manuais (Recomendado)

Execute estes comandos no PowerShell:

```powershell
# 1. Criar diretório
New-Item -ItemType Directory -Path "C:\Users\maicon\Documents\GitHub\arcAI" -Force

# 2. Copiar arquivos (excluindo node_modules, .next, etc.)
$source = "C:\Users\maicon\Desktop\arc-da-pp-frontend"
$target = "C:\Users\maicon\Documents\GitHub\arcAI"

# Copiar pastas principais
Copy-Item "$source\app" -Destination "$target\app" -Recurse -Force
Copy-Item "$source\components" -Destination "$target\components" -Recurse -Force
Copy-Item "$source\contracts" -Destination "$target\contracts" -Recurse -Force
Copy-Item "$source\lib" -Destination "$target\lib" -Recurse -Force
Copy-Item "$source\providers" -Destination "$target\providers" -Recurse -Force
Copy-Item "$source\public" -Destination "$target\public" -Recurse -Force
Copy-Item "$source\scripts" -Destination "$target\scripts" -Recurse -Force
Copy-Item "$source\test" -Destination "$target\test" -Recurse -Force
Copy-Item "$source\.github" -Destination "$target\.github" -Recurse -Force -ErrorAction SilentlyContinue

# Copiar arquivos raiz
Copy-Item "$source\*.json" -Destination "$target\" -Force
Copy-Item "$source\*.md" -Destination "$target\" -Force
Copy-Item "$source\*.txt" -Destination "$target\" -Force
Copy-Item "$source\*.toml" -Destination "$target\" -Force
Copy-Item "$source\*.mjs" -Destination "$target\" -Force
Copy-Item "$source\*.ts" -Destination "$target\" -Force
Copy-Item "$source\*.sol" -Destination "$target\" -Force
Copy-Item "$source\.gitignore" -Destination "$target\" -Force
Copy-Item "$source\.gitattributes" -Destination "$target\" -Force

# 3. Navegar para o diretório
cd "C:\Users\maicon\Documents\GitHub\arcAI"

# 4. Inicializar Git
git init

# 5. Configurar usuário
git config user.name "maicon456"
git config user.email "maicon456@users.noreply.github.com"

# 6. Adicionar arquivos
git add .

# 7. Criar commit
git commit -m "feat: initial commit - ArcnetAI DApp on Arc Network"
```

## 🚀 Opção 3: Usar Robocopy (Windows)

```cmd
robocopy "C:\Users\maicon\Desktop\arc-da-pp-frontend" "C:\Users\maicon\Documents\GitHub\arcAI" /E /XD node_modules .next .git dist build out coverage /XF .env.local .env *.log /NFL /NDL /NP
```

Depois:
```powershell
cd "C:\Users\maicon\Documents\GitHub\arcAI"
git init
git add .
git commit -m "feat: initial commit"
```

## ✅ Após Copiar

1. **Criar repositório no GitHub:**
   - https://github.com/new
   - Nome: `arcAI`

2. **Conectar e fazer push:**
   ```powershell
   cd "C:\Users\maicon\Documents\GitHub\arcAI"
   git remote add origin https://github.com/maicon456/arcAI.git
   git branch -M main
   git push -u origin main
   ```

---

**Use a Opção 2 (Comandos Manuais) se tiver problemas com scripts!** 🎯


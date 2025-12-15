# 🔧 Instalar Git e Copiar Arquivos - Guia Completo

## ⚠️ Problema: Git não está instalado

O Git precisa estar instalado para criar o repositório. Siga os passos abaixo:

## 📥 Passo 1: Instalar Git

### Windows

1. **Baixar Git:**
   - Acesse: https://git-scm.com/download/win
   - Baixe o instalador (Git-x.x.x-64-bit.exe)

2. **Instalar:**
   - Execute o instalador
   - Use opções padrão
   - **⚠️ IMPORTANTE:** Marque "Add Git to PATH"
   - Complete a instalação

3. **Reiniciar Terminal:**
   - Feche todos os terminais PowerShell
   - Abra um novo PowerShell
   - Verifique: `git --version`

## 📋 Passo 2: Copiar Arquivos (SEM Git)

Execute estes comandos **diretamente no PowerShell** (cole e execute):

```powershell
# Definir variáveis
$source = "C:\Users\maicon\Desktop\arc-da-pp-frontend"
$target = "C:\Users\maicon\Documents\GitHub\arcAI"

# Criar diretório
New-Item -ItemType Directory -Path $target -Force

# Copiar pastas principais
Copy-Item "$source\app" -Destination "$target\app" -Recurse -Force
Copy-Item "$source\components" -Destination "$target\components" -Recurse -Force
Copy-Item "$source\contracts" -Destination "$target\contracts" -Recurse -Force
Copy-Item "$source\lib" -Destination "$target\lib" -Recurse -Force
Copy-Item "$source\providers" -Destination "$target\providers" -Recurse -Force
Copy-Item "$source\public" -Destination "$target\public" -Recurse -Force
Copy-Item "$source\scripts" -Destination "$target\scripts" -Recurse -Force
Copy-Item "$source\test" -Destination "$target\test" -Recurse -Force

# Copiar .github se existir
if (Test-Path "$source\.github") {
    Copy-Item "$source\.github" -Destination "$target\.github" -Recurse -Force
}

# Copiar arquivos de configuração
Copy-Item "$source\package.json" -Destination "$target\" -Force
Copy-Item "$source\tsconfig.json" -Destination "$target\" -Force
Copy-Item "$source\next.config.mjs" -Destination "$target\" -Force
Copy-Item "$source\postcss.config.mjs" -Destination "$target\" -Force
Copy-Item "$source\foundry.toml" -Destination "$target\" -Force
Copy-Item "$source\components.json" -Destination "$target\" -Force
Copy-Item "$source\pnpm-lock.yaml" -Destination "$target\" -Force

# Copiar arquivos Git
Copy-Item "$source\.gitignore" -Destination "$target\" -Force
Copy-Item "$source\.gitattributes" -Destination "$target\" -Force

# Copiar documentação
Get-ChildItem "$source\*.md" | Copy-Item -Destination "$target\" -Force

# Copiar outros arquivos
Get-ChildItem "$source\*.json" | Where-Object { $_.Name -ne "package-lock.json" } | Copy-Item -Destination "$target\" -Force
Get-ChildItem "$source\*.mjs" | Copy-Item -Destination "$target\" -Force
Get-ChildItem "$source\*.toml" | Copy-Item -Destination "$target\" -Force
Get-ChildItem "$source\*.sol" | Copy-Item -Destination "$target\" -Force -ErrorAction SilentlyContinue

Write-Host "Arquivos copiados com sucesso!" -ForegroundColor Green
```

## 🚀 Passo 3: Inicializar Git (APÓS INSTALAR)

Após instalar o Git e reiniciar o terminal:

```powershell
# 1. Navegar
cd "C:\Users\maicon\Documents\GitHub\arcAI"

# 2. Verificar Git
git --version

# 3. Inicializar
git init

# 4. Configurar usuário
git config user.name "maicon456"
git config user.email "maicon456@users.noreply.github.com"

# 5. Adicionar arquivos
git add .

# 6. Criar commit
git commit -m "feat: initial commit - ArcnetAI DApp on Arc Network"

# 7. Renomear branch
git branch -M main
```

## 🔗 Passo 4: Conectar ao GitHub

```powershell
# 1. Criar repositório no GitHub: https://github.com/new (nome: arcAI)

# 2. Conectar
git remote add origin https://github.com/maicon456/arcAI.git

# 3. Fazer push
git push -u origin main
```

## ✅ Resumo

1. **Instalar Git** → https://git-scm.com/download/win
2. **Reiniciar terminal**
3. **Copiar arquivos** (comandos acima)
4. **Inicializar Git** (comandos acima)
5. **Criar repositório no GitHub**
6. **Fazer push**

---

**Instale o Git primeiro, depois execute os comandos de cópia!** 🎯


# Script para copiar todos os arquivos para o diretório arcAI
# C:\Users\maicon\Documents\GitHub\arcAI

$sourceDir = "C:\Users\maicon\Desktop\arc-da-pp-frontend"
$targetDir = "C:\Users\maicon\Documents\GitHub\arcAI"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Criando Repositório Completo no GitHub" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Criar diretório se não existir
if (-not (Test-Path $targetDir)) {
    Write-Host "[1/5] Criando diretório..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
    Write-Host "[OK] Diretório criado: $targetDir" -ForegroundColor Green
} else {
    Write-Host "[1/5] Diretório já existe: $targetDir" -ForegroundColor Green
}
Write-Host ""

# Verificar se o diretório de origem existe
if (-not (Test-Path $sourceDir)) {
    Write-Host "[ERRO] Diretório de origem não encontrado: $sourceDir" -ForegroundColor Red
    exit 1
}

Write-Host "[2/5] Copiando arquivos do projeto..." -ForegroundColor Yellow
Write-Host "Origem: $sourceDir" -ForegroundColor Gray
Write-Host "Destino: $targetDir" -ForegroundColor Gray
Write-Host ""

# Lista de arquivos/pastas a excluir
$excludeItems = @(
    "node_modules",
    ".next",
    ".git",
    ".env.local",
    ".env",
    "dist",
    "build",
    "out",
    "coverage",
    ".pnpm-store",
    ".vercel",
    "*.log",
    ".DS_Store"
)

# Função para copiar arquivos excluindo itens específicos
function Copy-ProjectFiles {
    param(
        [string]$Source,
        [string]$Destination,
        [string[]]$Exclude
    )
    
    $items = Get-ChildItem -Path $Source -Force
    
    foreach ($item in $items) {
        $shouldExclude = $false
        
        foreach ($excludePattern in $Exclude) {
            if ($item.Name -like $excludePattern -or $item.Name -eq $excludePattern) {
                $shouldExclude = $true
                break
            }
        }
        
        if (-not $shouldExclude) {
            $destPath = Join-Path $Destination $item.Name
            
            if ($item.PSIsContainer) {
                # É um diretório
                if (-not (Test-Path $destPath)) {
                    New-Item -ItemType Directory -Path $destPath -Force | Out-Null
                }
                Copy-ProjectFiles -Source $item.FullName -Destination $destPath -Exclude $Exclude
            } else {
                # É um arquivo
                Copy-Item -Path $item.FullName -Destination $destPath -Force
            }
        }
    }
}

# Copiar arquivos
$fileCount = 0
$items = Get-ChildItem -Path $sourceDir -Force
foreach ($item in $items) {
    $shouldExclude = $false
    foreach ($excludePattern in $excludeItems) {
        if ($item.Name -like $excludePattern -or $item.Name -eq $excludePattern) {
            $shouldExclude = $true
            break
        }
    }
    if (-not $shouldExclude) {
        $destPath = Join-Path $targetDir $item.Name
        if ($item.PSIsContainer) {
            if (-not (Test-Path $destPath)) {
                New-Item -ItemType Directory -Path $destPath -Force | Out-Null
            }
            Copy-Item -Path $item.FullName -Destination $destPath -Recurse -Force -Exclude $excludeItems
        } else {
            Copy-Item -Path $item.FullName -Destination $destPath -Force
        }
        $fileCount++
    }
}

Write-Host "[OK] Arquivos copiados" -ForegroundColor Green
Write-Host ""

Write-Host "[3/5] Inicializando repositório Git..." -ForegroundColor Yellow
Set-Location $targetDir

# Verificar se Git está instalado
try {
    $gitVersion = git --version 2>&1
    Write-Host "[OK] Git encontrado: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "[AVISO] Git não encontrado. Instale o Git primeiro." -ForegroundColor Yellow
    Write-Host "Baixe em: https://git-scm.com/download/win" -ForegroundColor Cyan
    exit 1
}

# Inicializar Git se não estiver inicializado
if (-not (Test-Path ".git")) {
    git init
    Write-Host "[OK] Repositório Git inicializado" -ForegroundColor Green
} else {
    Write-Host "[OK] Repositório Git já inicializado" -ForegroundColor Green
}
Write-Host ""

Write-Host "[4/5] Configurando Git..." -ForegroundColor Yellow
# Configurar usuário (se não estiver configurado)
$currentUser = git config user.name 2>&1
if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($currentUser)) {
    git config user.name "maicon456"
    git config user.email "maicon456@users.noreply.github.com"
    Write-Host "[OK] Usuário Git configurado" -ForegroundColor Green
} else {
    Write-Host "[OK] Usuário Git já configurado: $currentUser" -ForegroundColor Green
}
Write-Host ""

Write-Host "[5/5] Preparando commit..." -ForegroundColor Yellow
git add .
$stagedCount = (git status --short 2>&1 | Where-Object { $_ -match '^[AM]' }).Count
Write-Host "Arquivos para commit: $stagedCount" -ForegroundColor Gray
Write-Host ""

if ($stagedCount -gt 0) {
    git commit -m "feat: initial commit - ArcnetAI DApp on Arc Network" -m "- Complete AI agent marketplace with tokenization" -m "- On-chain chat and forum functionality" -m "- Modern UI inspired by Arc Network design" -m "- Full Web3 integration with wagmi/viem" -m "- Smart contract for agent management" -m "- Comprehensive documentation"
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[OK] Commit criado com sucesso!" -ForegroundColor Green
    } else {
        Write-Host "[AVISO] Falha ao criar commit" -ForegroundColor Yellow
    }
} else {
    Write-Host "[AVISO] Nenhum arquivo para commitar" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Repositório Preparado!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Próximos passos:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Criar repositório no GitHub:" -ForegroundColor White
Write-Host "   https://github.com/new" -ForegroundColor Cyan
Write-Host "   Nome: arcAI" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Conectar e fazer push:" -ForegroundColor White
Write-Host "   git remote add origin https://github.com/maicon456/arcAI.git" -ForegroundColor Cyan
Write-Host "   git branch -M main" -ForegroundColor Cyan
Write-Host "   git push -u origin main" -ForegroundColor Cyan
Write-Host ""
Write-Host "Ou execute: .\CONECTAR_E_PUSH.ps1" -ForegroundColor Cyan
Write-Host ""
Read-Host "Pressione Enter para sair"


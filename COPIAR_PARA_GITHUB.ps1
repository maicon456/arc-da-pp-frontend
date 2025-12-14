# Script para copiar arquivos do projeto para o diretório do GitHub
# C:\Users\maicon\Documents\GitHub\Arcnet-AI

$sourceDir = "C:\Users\maicon\Desktop\arc-da-pp-frontend"
$targetDir = "C:\Users\maicon\Documents\GitHub\Arcnet-AI"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Copiando arquivos para GitHub" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se o diretório de origem existe
if (-not (Test-Path $sourceDir)) {
    Write-Host "[ERRO] Diretório de origem não encontrado: $sourceDir" -ForegroundColor Red
    exit 1
}

# Verificar se o diretório de destino existe
if (-not (Test-Path $targetDir)) {
    Write-Host "[ERRO] Diretório de destino não encontrado: $targetDir" -ForegroundColor Red
    Write-Host "Criando diretório..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
}

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

Write-Host "[1/3] Copiando arquivos..." -ForegroundColor Yellow

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
                Write-Host "  Copiado: $($item.Name)" -ForegroundColor Gray
            }
        } else {
            Write-Host "  Ignorado: $($item.Name)" -ForegroundColor DarkGray
        }
    }
}

# Copiar arquivos
Copy-ProjectFiles -Source $sourceDir -Destination $targetDir -Exclude $excludeItems

Write-Host "[OK] Arquivos copiados" -ForegroundColor Green
Write-Host ""

Write-Host "[2/3] Verificando estrutura..." -ForegroundColor Yellow
$targetItems = Get-ChildItem -Path $targetDir | Select-Object Name
Write-Host "Arquivos no destino:" -ForegroundColor Gray
$targetItems | ForEach-Object { Write-Host "  - $($_.Name)" -ForegroundColor Gray }
Write-Host ""

Write-Host "[3/3] Próximos passos:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Navegue para o diretório:" -ForegroundColor White
Write-Host "   cd `"$targetDir`"" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Verifique o status do Git:" -ForegroundColor White
Write-Host "   git status" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Adicione os arquivos:" -ForegroundColor White
Write-Host "   git add ." -ForegroundColor Cyan
Write-Host ""
Write-Host "4. Faça commit:" -ForegroundColor White
Write-Host "   git commit -m `"feat: initial commit - ArcnetAI DApp`"" -ForegroundColor Cyan
Write-Host ""
Write-Host "5. Conecte ao GitHub (se ainda não conectou):" -ForegroundColor White
Write-Host "   git remote add origin https://github.com/SEU-USUARIO/Arcnet-AI.git" -ForegroundColor Cyan
Write-Host ""
Write-Host "6. Faça push:" -ForegroundColor White
Write-Host "   git push -u origin main" -ForegroundColor Cyan
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Cópia concluída!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan


# Script para adicionar todos os arquivos faltantes ao Git
# Repositório: https://github.com/maicon456/Arcnet-AI.git

Set-Location "C:\Users\maicon\Desktop\arc-da-pp-frontend"

Write-Host "=== Adicionando Arquivos Faltantes ao Git ===" -ForegroundColor Cyan
Write-Host ""

# Verificar se Git está instalado
Write-Host "=== Verificando Git ===" -ForegroundColor Cyan
try {
    $gitVersion = git --version 2>&1
    Write-Host "✓ Git encontrado: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Git não encontrado!" -ForegroundColor Red
    Write-Host "Por favor, instale o Git primeiro:" -ForegroundColor Yellow
    Write-Host "1. Baixe: https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host "2. OU use GitHub Desktop: https://desktop.github.com/" -ForegroundColor Yellow
    exit 1
}

# Verificar se é repositório Git
Write-Host ""
Write-Host "=== Verificando Repositório ===" -ForegroundColor Cyan
if (-not (Test-Path ".git")) {
    Write-Host "⚠ Repositório Git não inicializado" -ForegroundColor Yellow
    Write-Host "Inicializando..." -ForegroundColor Yellow
    git init
    Write-Host "✓ Repositório inicializado" -ForegroundColor Green
} else {
    Write-Host "✓ Repositório Git encontrado" -ForegroundColor Green
}

# Verificar status atual
Write-Host ""
Write-Host "=== Status Atual do Git ===" -ForegroundColor Cyan
git status --short

# Adicionar todos os arquivos
Write-Host ""
Write-Host "=== Adicionando Todos os Arquivos ===" -ForegroundColor Cyan
Write-Host "Adicionando arquivos não rastreados e modificados..." -ForegroundColor Yellow

# Adicionar todos os arquivos (incluindo não rastreados)
git add .

# Verificar o que foi adicionado
Write-Host ""
Write-Host "=== Arquivos Adicionados ===" -ForegroundColor Cyan
$staged = git diff --cached --name-only
if ($staged) {
    Write-Host "Arquivos que serão commitados:" -ForegroundColor Yellow
    $count = 0
    $staged | ForEach-Object { 
        Write-Host "  ✓ $_" -ForegroundColor Green
        $count++
    }
    Write-Host ""
    Write-Host "Total: $count arquivos" -ForegroundColor Cyan
} else {
    Write-Host "⚠ Nenhum arquivo novo para adicionar" -ForegroundColor Yellow
    Write-Host "Todos os arquivos já estão no Git ou não há mudanças." -ForegroundColor Yellow
}

# Verificar arquivos não rastreados
Write-Host ""
Write-Host "=== Verificando Arquivos Não Rastreados ===" -ForegroundColor Cyan
$untracked = git ls-files --others --exclude-standard
if ($untracked) {
    Write-Host "Arquivos não rastreados encontrados:" -ForegroundColor Yellow
    $untracked | ForEach-Object { 
        Write-Host "  - $_" -ForegroundColor White
    }
    Write-Host ""
    Write-Host "Adicionando arquivos não rastreados..." -ForegroundColor Yellow
    git add -A
    Write-Host "✓ Arquivos não rastreados adicionados" -ForegroundColor Green
} else {
    Write-Host "✓ Nenhum arquivo não rastreado" -ForegroundColor Green
}

# Verificar status final
Write-Host ""
Write-Host "=== Status Final ===" -ForegroundColor Cyan
git status --short

# Mostrar resumo
Write-Host ""
Write-Host "=== Resumo ===" -ForegroundColor Cyan
$statusOutput = git status --porcelain
$addedCount = ($statusOutput | Select-String "^A" | Measure-Object).Count
$modifiedCount = ($statusOutput | Select-String "^M" | Measure-Object).Count
$newCount = ($statusOutput | Select-String "^??" | Measure-Object).Count

Write-Host "Arquivos adicionados: $addedCount" -ForegroundColor Green
Write-Host "Arquivos modificados: $modifiedCount" -ForegroundColor Yellow
Write-Host "Arquivos novos: $newCount" -ForegroundColor Cyan

# Instruções para commit
Write-Host ""
Write-Host "=== Próximos Passos ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "✓ Todos os arquivos foram adicionados ao staging" -ForegroundColor Green
Write-Host ""
Write-Host "Para criar commit, execute:" -ForegroundColor Yellow
Write-Host "  git commit -m 'feat: add all missing files'" -ForegroundColor White
Write-Host ""
Write-Host "Para fazer push:" -ForegroundColor Yellow
Write-Host "  git push -u origin main" -ForegroundColor White
Write-Host ""


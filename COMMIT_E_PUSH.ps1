# Script para fazer commit e push dos arquivos para o GitHub
# Execute este script após instalar o Git e reiniciar o terminal

$repoDir = "C:\Users\maicon\Documents\GitHub\Arcnet-AI"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Commit e Push para GitHub" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se Git está instalado
try {
    $gitVersion = git --version 2>&1
    Write-Host "[OK] Git encontrado: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "[ERRO] Git não está instalado ou não está no PATH." -ForegroundColor Red
    Write-Host ""
    Write-Host "Por favor:" -ForegroundColor Yellow
    Write-Host "1. Instale o Git: https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host "2. Reinicie o terminal" -ForegroundColor Yellow
    Write-Host "3. Execute este script novamente" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Pressione Enter para sair"
    exit 1
}

# Navegar para o diretório
if (-not (Test-Path $repoDir)) {
    Write-Host "[ERRO] Diretório não encontrado: $repoDir" -ForegroundColor Red
    exit 1
}

Set-Location $repoDir
Write-Host "[OK] Diretório: $repoDir" -ForegroundColor Green
Write-Host ""

# Verificar se é um repositório Git
if (-not (Test-Path ".git")) {
    Write-Host "[ERRO] Este diretório não é um repositório Git." -ForegroundColor Red
    Write-Host "Execute: git init" -ForegroundColor Yellow
    exit 1
}

Write-Host "[1/6] Verificando status..." -ForegroundColor Yellow
git status --short | Select-Object -First 10
Write-Host ""

Write-Host "[2/6] Adicionando arquivos ao staging..." -ForegroundColor Yellow
git add .
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERRO] Falha ao adicionar arquivos" -ForegroundColor Red
    exit 1
}
Write-Host "[OK] Arquivos adicionados" -ForegroundColor Green
Write-Host ""

Write-Host "[3/6] Verificando arquivos staged..." -ForegroundColor Yellow
$stagedCount = (git status --short | Where-Object { $_ -match '^[AM]' }).Count
Write-Host "Arquivos para commit: $stagedCount" -ForegroundColor Gray
Write-Host ""

Write-Host "[4/6] Criando commit..." -ForegroundColor Yellow
$commitMessage = @"
feat: initial commit - ArcnetAI DApp on Arc Network

- Complete AI agent marketplace with tokenization
- On-chain chat and forum functionality
- Modern UI inspired by Arc Network design
- Full Web3 integration with wagmi/viem
- Smart contract for agent management
- Comprehensive documentation
"@

git commit -m $commitMessage
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERRO] Falha ao criar commit" -ForegroundColor Red
    Write-Host "Verifique se há mudanças para commitar" -ForegroundColor Yellow
    exit 1
}
Write-Host "[OK] Commit criado com sucesso!" -ForegroundColor Green
Write-Host ""

Write-Host "[5/6] Renomeando branch para main..." -ForegroundColor Yellow
git branch -M main
Write-Host "[OK] Branch renomeada" -ForegroundColor Green
Write-Host ""

Write-Host "[6/6] Verificando remote..." -ForegroundColor Yellow
$remotes = git remote -v
if ($remotes) {
    Write-Host "Remotes configurados:" -ForegroundColor Gray
    $remotes | ForEach-Object { Write-Host "  $_" -ForegroundColor Gray }
    Write-Host ""
    Write-Host "Para fazer push, execute:" -ForegroundColor Yellow
    Write-Host "  git push -u origin main" -ForegroundColor Cyan
} else {
    Write-Host "[AVISO] Nenhum remote configurado." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Para conectar ao GitHub:" -ForegroundColor Yellow
    Write-Host "  git remote add origin https://github.com/SEU-USUARIO/Arcnet-AI.git" -ForegroundColor Cyan
    Write-Host "  git push -u origin main" -ForegroundColor Cyan
}
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Commit concluído com sucesso!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Próximos passos:" -ForegroundColor Yellow
Write-Host "1. Configure o remote (se ainda não fez)" -ForegroundColor White
Write-Host "2. Execute: git push -u origin main" -ForegroundColor White
Write-Host ""
Read-Host "Pressione Enter para sair"


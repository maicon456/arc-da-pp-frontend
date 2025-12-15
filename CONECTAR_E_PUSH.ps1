# Script para conectar ao GitHub e fazer push do repositório arcAI

$repoDir = "C:\Users\maicon\Documents\GitHub\arcAI"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Conectar arcAI ao GitHub" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se Git está instalado
try {
    $gitVersion = git --version 2>&1
    Write-Host "[OK] Git encontrado: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "[ERRO] Git não está instalado." -ForegroundColor Red
    Write-Host "Baixe em: https://git-scm.com/download/win" -ForegroundColor Cyan
    exit 1
}

# Navegar para o diretório
if (-not (Test-Path $repoDir)) {
    Write-Host "[ERRO] Diretório não encontrado: $repoDir" -ForegroundColor Red
    Write-Host "Execute primeiro: .\COPIAR_PARA_ARCAI.ps1" -ForegroundColor Yellow
    exit 1
}

Set-Location $repoDir
Write-Host "[OK] Diretório: $repoDir" -ForegroundColor Green
Write-Host ""

# Verificar se é repositório Git
if (-not (Test-Path ".git")) {
    Write-Host "[ERRO] Este diretório não é um repositório Git." -ForegroundColor Red
    Write-Host "Execute: git init" -ForegroundColor Yellow
    exit 1
}

Write-Host "[1/4] Verificando status..." -ForegroundColor Yellow
git status --short | Select-Object -First 5
Write-Host ""

Write-Host "[2/4] Verificando branch..." -ForegroundColor Yellow
$currentBranch = git branch --show-current
Write-Host "Branch atual: $currentBranch" -ForegroundColor Gray

if ($currentBranch -ne "main") {
    Write-Host "Renomeando branch para main..." -ForegroundColor Yellow
    git branch -M main
    Write-Host "[OK] Branch renomeada para main" -ForegroundColor Green
} else {
    Write-Host "[OK] Já está na branch main" -ForegroundColor Green
}
Write-Host ""

Write-Host "[3/4] Verificando remote..." -ForegroundColor Yellow
$remotes = git remote -v
if ($remotes) {
    Write-Host "Remote já configurado:" -ForegroundColor Gray
    $remotes | ForEach-Object { Write-Host "  $_" -ForegroundColor Gray }
    Write-Host ""
    $useExisting = Read-Host "Usar remote existente? (S/N)"
    if ($useExisting -eq "N" -or $useExisting -eq "n") {
        Write-Host "Removendo remote existente..." -ForegroundColor Yellow
        git remote remove origin
    } else {
        Write-Host "[OK] Usando remote existente" -ForegroundColor Green
        Write-Host ""
        Write-Host "[4/4] Fazendo push..." -ForegroundColor Yellow
        git push -u origin main
        if ($LASTEXITCODE -eq 0) {
            Write-Host "[OK] Push realizado com sucesso!" -ForegroundColor Green
            Write-Host "Acesse: https://github.com/maicon456/arcAI" -ForegroundColor Cyan
        } else {
            Write-Host "[ERRO] Falha no push. Verifique autenticação." -ForegroundColor Red
        }
        exit 0
    }
}

# Adicionar remote
Write-Host "[4/4] Configurando remote..." -ForegroundColor Yellow
Write-Host ""
Write-Host "URL do repositório GitHub:" -ForegroundColor Yellow
Write-Host "Exemplo: https://github.com/maicon456/arcAI.git" -ForegroundColor Gray
$repoUrl = Read-Host "URL do repositório"

if ([string]::IsNullOrWhiteSpace($repoUrl)) {
    # Usar URL padrão
    $repoUrl = "https://github.com/maicon456/arcAI.git"
    Write-Host "Usando URL padrão: $repoUrl" -ForegroundColor Gray
}

Write-Host "Adicionando remote: $repoUrl" -ForegroundColor Gray
git remote add origin $repoUrl

if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERRO] Falha ao adicionar remote" -ForegroundColor Red
    Write-Host "Verifique se o remote já existe ou se a URL está correta" -ForegroundColor Yellow
    exit 1
}

Write-Host "[OK] Remote adicionado" -ForegroundColor Green
Write-Host ""

# Fazer push
Write-Host "Fazendo push para GitHub..." -ForegroundColor Yellow
Write-Host ""
Write-Host "⚠️  Se pedir autenticação:" -ForegroundColor Yellow
Write-Host "   - Username: maicon456" -ForegroundColor White
Write-Host "   - Password: use um Personal Access Token (não sua senha!)" -ForegroundColor White
Write-Host ""
Write-Host "Criar token: https://github.com/settings/tokens" -ForegroundColor Cyan
Write-Host ""

git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "✅ Push realizado com sucesso!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Seu código está no GitHub!" -ForegroundColor Green
    Write-Host "Acesse: $repoUrl" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "[ERRO] Falha no push" -ForegroundColor Red
    Write-Host ""
    Write-Host "Possíveis causas:" -ForegroundColor Yellow
    Write-Host "1. Repositório não existe no GitHub" -ForegroundColor White
    Write-Host "2. Problema de autenticação" -ForegroundColor White
    Write-Host "3. URL do remote incorreta" -ForegroundColor White
    Write-Host ""
    Write-Host "Verifique e tente novamente." -ForegroundColor Yellow
}

Write-Host ""
Read-Host "Pressione Enter para sair"


# ArcnetAI - Git Repository Initialization Script
# PowerShell Script

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "ArcnetAI - Git Repository Initialization" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Git is installed
try {
    $gitVersion = git --version 2>&1
    Write-Host "[OK] Git encontrado: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "[ERRO] Git não está instalado ou não está no PATH." -ForegroundColor Red
    Write-Host ""
    Write-Host "Por favor, instale o Git:" -ForegroundColor Yellow
    Write-Host "1. Baixe em: https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host "2. Instale o Git" -ForegroundColor Yellow
    Write-Host "3. Reinicie o terminal" -ForegroundColor Yellow
    Write-Host "4. Execute este script novamente" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Pressione Enter para sair"
    exit 1
}

# Navigate to project directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

Write-Host "[1/6] Inicializando repositório Git..." -ForegroundColor Yellow
git init
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERRO] Falha ao inicializar Git" -ForegroundColor Red
    Read-Host "Pressione Enter para sair"
    exit 1
}
Write-Host "[OK] Repositório inicializado" -ForegroundColor Green
Write-Host ""

Write-Host "[2/6] Configurando usuário Git..." -ForegroundColor Yellow
$gitName = Read-Host "Por favor, informe seu nome (ou pressione Enter para usar 'ArcnetAI Team')"
if ([string]::IsNullOrWhiteSpace($gitName)) {
    $gitName = "ArcnetAI Team"
}

$gitEmail = Read-Host "Por favor, informe seu email (ou pressione Enter para usar 'team@arcnetai.dev')"
if ([string]::IsNullOrWhiteSpace($gitEmail)) {
    $gitEmail = "team@arcnetai.dev"
}

git config user.name $gitName
git config user.email $gitEmail
Write-Host "[OK] Usuário configurado: $gitName <$gitEmail>" -ForegroundColor Green
Write-Host ""

Write-Host "[3/6] Adicionando arquivos ao staging..." -ForegroundColor Yellow
git add .
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERRO] Falha ao adicionar arquivos" -ForegroundColor Red
    Read-Host "Pressione Enter para sair"
    exit 1
}
Write-Host "[OK] Arquivos adicionados" -ForegroundColor Green
Write-Host ""

Write-Host "[4/6] Verificando status..." -ForegroundColor Yellow
git status --short
Write-Host ""

Write-Host "[5/6] Criando commit inicial..." -ForegroundColor Yellow
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
    Read-Host "Pressione Enter para sair"
    exit 1
}
Write-Host "[OK] Commit criado com sucesso!" -ForegroundColor Green
Write-Host ""

Write-Host "[6/6] Renomeando branch para main..." -ForegroundColor Yellow
git branch -M main
Write-Host "[OK] Branch renomeada para main" -ForegroundColor Green
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Git Repository Inicializado com Sucesso!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Próximos passos:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Crie um repositório no GitHub/GitLab" -ForegroundColor White
Write-Host "2. Execute os seguintes comandos:" -ForegroundColor White
Write-Host ""
Write-Host "   git remote add origin https://github.com/SEU-USUARIO/arcnetai.git" -ForegroundColor Cyan
Write-Host "   git push -u origin main" -ForegroundColor Cyan
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Read-Host "Pressione Enter para sair"


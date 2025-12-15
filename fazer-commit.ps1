# Script para fazer commit de todos os arquivos
# Repositório: https://github.com/maicon456/Arcnet-AI.git

Set-Location "C:\Users\maicon\Desktop\arc-da-pp-frontend"

Write-Host "=== Fazendo Commit do Projeto ===" -ForegroundColor Cyan
Write-Host ""

# Verificar se Git está instalado
Write-Host "=== Verificando Git ===" -ForegroundColor Cyan
try {
    $gitVersion = git --version 2>&1
    Write-Host "✓ Git encontrado: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Git não encontrado!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Por favor, instale o Git primeiro:" -ForegroundColor Yellow
    Write-Host "1. Baixe: https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host "2. OU use GitHub Desktop: https://desktop.github.com/" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Depois execute este script novamente." -ForegroundColor Yellow
    exit 1
}

# Inicializar repositório se não existir
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

# Configurar usuário se necessário
Write-Host ""
Write-Host "=== Configurando Usuário ===" -ForegroundColor Cyan
$userName = git config user.name
$userEmail = git config user.email

if (-not $userName) {
    git config user.name "maicon456"
    Write-Host "✓ Nome configurado: maicon456" -ForegroundColor Green
} else {
    Write-Host "✓ Nome: $userName" -ForegroundColor Green
}

if (-not $userEmail) {
    Write-Host "⚠ Email não configurado" -ForegroundColor Yellow
    $email = Read-Host "Digite seu email do GitHub (ou pressione Enter para pular)"
    if ($email) {
        git config user.email $email
        Write-Host "✓ Email configurado" -ForegroundColor Green
    }
} else {
    Write-Host "✓ Email: $userEmail" -ForegroundColor Green
}

# Adicionar remote se não existir
Write-Host ""
Write-Host "=== Configurando Remote ===" -ForegroundColor Cyan
$remoteUrl = git remote get-url origin 2>$null
if (-not $remoteUrl) {
    Write-Host "Adicionando remote..." -ForegroundColor Yellow
    git remote add origin https://github.com/maicon456/Arcnet-AI.git
    Write-Host "✓ Remote adicionado: https://github.com/maicon456/Arcnet-AI.git" -ForegroundColor Green
} else {
    Write-Host "✓ Remote já configurado: $remoteUrl" -ForegroundColor Green
}

# Verificar status
Write-Host ""
Write-Host "=== Status Atual ===" -ForegroundColor Cyan
git status --short

# Adicionar todos os arquivos
Write-Host ""
Write-Host "=== Adicionando Arquivos ===" -ForegroundColor Cyan
git add .
Write-Host "✓ Todos os arquivos adicionados" -ForegroundColor Green

# Verificar o que será commitado
Write-Host ""
Write-Host "=== Arquivos para Commit ===" -ForegroundColor Cyan
$staged = git diff --cached --name-only
if ($staged) {
    Write-Host "Arquivos que serão commitados:" -ForegroundColor Yellow
    $staged | ForEach-Object { Write-Host "  - $_" -ForegroundColor White }
} else {
    Write-Host "⚠ Nenhum arquivo para commitar" -ForegroundColor Yellow
    Write-Host "Todos os arquivos já estão commitados ou não há mudanças." -ForegroundColor Yellow
    exit 0
}

# Criar commit
Write-Host ""
Write-Host "=== Criando Commit ===" -ForegroundColor Cyan
$commitMessage = "feat: initial commit - ArcnetAI DApp on Arc Network

- AI Agent Marketplace with Web3 integration
- Forum functionality with on-chain posts
- Error handling and custom 404 pages
- Complete documentation
- Wagmi/Viem integration for Arc Network"

git commit -m $commitMessage

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Commit criado com sucesso!" -ForegroundColor Green
} else {
    Write-Host "✗ Erro ao criar commit" -ForegroundColor Red
    exit 1
}

# Verificar branch
Write-Host ""
Write-Host "=== Verificando Branch ===" -ForegroundColor Cyan
$currentBranch = git branch --show-current
if (-not $currentBranch) {
    Write-Host "Criando branch 'main'..." -ForegroundColor Yellow
    git checkout -b main
    Write-Host "✓ Branch 'main' criada" -ForegroundColor Green
} elseif ($currentBranch -ne "main") {
    Write-Host "Renomeando branch para 'main'..." -ForegroundColor Yellow
    git branch -M main
    Write-Host "✓ Branch renomeada para 'main'" -ForegroundColor Green
} else {
    Write-Host "✓ Branch atual: main" -ForegroundColor Green
}

# Mostrar último commit
Write-Host ""
Write-Host "=== Último Commit ===" -ForegroundColor Cyan
git log -1 --oneline

# Instruções para push
Write-Host ""
Write-Host "=== Próximos Passos ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "✓ Commit criado com sucesso!" -ForegroundColor Green
Write-Host ""
Write-Host "Para fazer push para o GitHub, execute:" -ForegroundColor Yellow
Write-Host "  git push -u origin main" -ForegroundColor White
Write-Host ""
Write-Host "Se pedir autenticação:" -ForegroundColor Yellow
Write-Host "  - Username: maicon456" -ForegroundColor White
Write-Host "  - Password: Personal Access Token" -ForegroundColor White
Write-Host "  - Criar token: https://github.com/settings/tokens" -ForegroundColor White
Write-Host ""
Write-Host "Certifique-se de que o repositório existe no GitHub:" -ForegroundColor Yellow
Write-Host "  https://github.com/maicon456/Arcnet-AI" -ForegroundColor White
Write-Host ""


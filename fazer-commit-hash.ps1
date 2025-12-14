# Script para fazer commit e conectar com commit específico
# Commit: e8cae71db8585bb0279b9e677a49a9a747a80aa4

Set-Location "C:\Users\maicon\Desktop\arc-da-pp-frontend"

Write-Host "=== Fazendo Commit e Conectando com Hash ===" -ForegroundColor Cyan
Write-Host "Commit Hash: e8cae71db8585bb0279b9e677a49a9a747a80aa4" -ForegroundColor Yellow
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

# Verificar se o commit existe
Write-Host ""
Write-Host "=== Verificando Commit Hash ===" -ForegroundColor Cyan
$commitHash = "e8cae71db8585bb0279b9e677a49a9a747a80aa4"
$commitExists = git cat-file -e $commitHash 2>$null

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Commit encontrado: $commitHash" -ForegroundColor Green
    Write-Host "Fazendo checkout do commit..." -ForegroundColor Yellow
    git checkout $commitHash
    Write-Host "✓ Checkout realizado" -ForegroundColor Green
} else {
    Write-Host "⚠ Commit não encontrado localmente" -ForegroundColor Yellow
    Write-Host "O commit pode estar no repositório remoto" -ForegroundColor Yellow
    Write-Host "Continuando com novo commit..." -ForegroundColor Yellow
}

# Configurar remote
Write-Host ""
Write-Host "=== Configurando Remote ===" -ForegroundColor Cyan
$remoteUrl = git remote get-url origin 2>$null
if (-not $remoteUrl) {
    Write-Host "Adicionando remote..." -ForegroundColor Yellow
    git remote add origin https://github.com/maicon456/Arcnet-AI.git
    Write-Host "✓ Remote adicionado" -ForegroundColor Green
} else {
    Write-Host "✓ Remote já configurado: $remoteUrl" -ForegroundColor Green
}

# Fazer fetch para buscar o commit se não estiver local
Write-Host ""
Write-Host "=== Buscando do Remoto ===" -ForegroundColor Cyan
git fetch origin 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Fetch realizado" -ForegroundColor Green
} else {
    Write-Host "⚠ Fetch falhou (pode ser normal se não houver conexão)" -ForegroundColor Yellow
}

# Verificar novamente se o commit existe após fetch
$commitExists = git cat-file -e $commitHash 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Commit encontrado após fetch: $commitHash" -ForegroundColor Green
} else {
    Write-Host "⚠ Commit ainda não encontrado" -ForegroundColor Yellow
    Write-Host "Criando novo commit..." -ForegroundColor Yellow
}

# Adicionar arquivos
Write-Host ""
Write-Host "=== Adicionando Arquivos ===" -ForegroundColor Cyan
git add .
Write-Host "✓ Arquivos adicionados" -ForegroundColor Green

# Verificar status
Write-Host ""
Write-Host "=== Status ===" -ForegroundColor Cyan
git status --short

# Criar commit
Write-Host ""
Write-Host "=== Criando Commit ===" -ForegroundColor Cyan
$commitMessage = "feat: add error handling and NOT_FOUND fixes

- Add custom 404 page (app/not-found.tsx)
- Add error boundaries (app/error.tsx, app/global-error.tsx)
- Improve dynamic route validation
- Update next.config.mjs with better error handling
- Add comprehensive documentation
- Add .gitattributes for line normalization"

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
} elseif ($currentBranch -ne "main") {
    Write-Host "Renomeando branch para 'main'..." -ForegroundColor Yellow
    git branch -M main
}

# Mostrar commits
Write-Host ""
Write-Host "=== Últimos Commits ===" -ForegroundColor Cyan
git log --oneline -5

# Instruções
Write-Host ""
Write-Host "=== Próximos Passos ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "✓ Commit criado!" -ForegroundColor Green
Write-Host ""
Write-Host "Para fazer push:" -ForegroundColor Yellow
Write-Host "  git push -u origin main" -ForegroundColor White
Write-Host ""
Write-Host "Se o commit $commitHash existir no remoto e você quiser fazer merge:" -ForegroundColor Yellow
Write-Host "  git pull origin main --allow-unrelated-histories" -ForegroundColor White
Write-Host "  git push -u origin main" -ForegroundColor White
Write-Host ""


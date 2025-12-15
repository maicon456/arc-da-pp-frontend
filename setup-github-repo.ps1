# Script para configurar repositório Git e conectar com GitHub
# Repositório: https://github.com/maicon456/Arcnet-AI.git

Set-Location "C:\Users\maicon\Desktop\arc-da-pp-frontend"

Write-Host "=== Configuração do Repositório GitHub ===" -ForegroundColor Cyan
Write-Host "Repositório: https://github.com/maicon456/Arcnet-AI.git" -ForegroundColor Yellow
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

# Verificar se já é um repositório Git
Write-Host ""
Write-Host "=== Verificando Repositório Git ===" -ForegroundColor Cyan
if (Test-Path ".git") {
    Write-Host "✓ Repositório Git já inicializado" -ForegroundColor Green
    $isInitialized = $true
} else {
    Write-Host "⚠ Repositório Git não inicializado" -ForegroundColor Yellow
    Write-Host "Inicializando repositório..." -ForegroundColor Yellow
    git init
    $isInitialized = $false
}

# Verificar configuração do usuário
Write-Host ""
Write-Host "=== Verificando Configuração do Git ===" -ForegroundColor Cyan
$userName = git config user.name
$userEmail = git config user.email

if (-not $userName) {
    Write-Host "⚠ Nome de usuário não configurado" -ForegroundColor Yellow
    git config user.name "maicon456"
    Write-Host "✓ Nome configurado: maicon456" -ForegroundColor Green
} else {
    Write-Host "✓ Nome: $userName" -ForegroundColor Green
}

if (-not $userEmail) {
    Write-Host "⚠ Email não configurado" -ForegroundColor Yellow
    $email = Read-Host "Digite seu email do GitHub"
    if ($email) {
        git config user.email $email
        Write-Host "✓ Email configurado" -ForegroundColor Green
    }
} else {
    Write-Host "✓ Email: $userEmail" -ForegroundColor Green
}

# Verificar remote
Write-Host ""
Write-Host "=== Verificando Remote ===" -ForegroundColor Cyan
$remoteUrl = git remote get-url origin 2>$null
if ($remoteUrl) {
    Write-Host "✓ Remote já configurado: $remoteUrl" -ForegroundColor Green
        if ($remoteUrl -ne "https://github.com/maicon456/Arcnet-AI.git") {
            Write-Host "⚠ URL diferente do esperado" -ForegroundColor Yellow
            $update = Read-Host "Deseja atualizar para https://github.com/maicon456/Arcnet-AI.git? (s/n)"
            if ($update -eq "s") {
                git remote set-url origin https://github.com/maicon456/Arcnet-AI.git
            Write-Host "✓ Remote atualizado" -ForegroundColor Green
        }
    }
} else {
    Write-Host "⚠ Remote não configurado" -ForegroundColor Yellow
    Write-Host "Adicionando remote..." -ForegroundColor Yellow
    git remote add origin https://github.com/maicon456/Arcnet-AI.git
    Write-Host "✓ Remote adicionado" -ForegroundColor Green
}

# Verificar status
Write-Host ""
Write-Host "=== Status do Repositório ===" -ForegroundColor Cyan
git status --short

# Perguntar se deseja adicionar arquivos
Write-Host ""
$addFiles = Read-Host "Deseja adicionar todos os arquivos ao Git? (s/n)"
if ($addFiles -eq "s") {
    Write-Host "Adicionando arquivos..." -ForegroundColor Yellow
    git add .
    Write-Host "✓ Arquivos adicionados" -ForegroundColor Green
    
    # Verificar se há algo para commitar
    $status = git status --porcelain
    if ($status) {
        Write-Host ""
        $commit = Read-Host "Deseja criar commit? (s/n)"
        if ($commit -eq "s") {
            $message = Read-Host "Digite a mensagem do commit (ou pressione Enter para usar padrão)"
            if (-not $message) {
                $message = "feat: initial commit - ArcnetAI DApp on Arc Network"
            }
            git commit -m $message
            Write-Host "✓ Commit criado" -ForegroundColor Green
        }
    } else {
        Write-Host "⚠ Nenhum arquivo para adicionar" -ForegroundColor Yellow
    }
}

# Verificar branch
Write-Host ""
Write-Host "=== Verificando Branch ===" -ForegroundColor Cyan
$currentBranch = git branch --show-current
Write-Host "Branch atual: $currentBranch" -ForegroundColor Cyan

if ($currentBranch -ne "main") {
    Write-Host "Renomeando branch para 'main'..." -ForegroundColor Yellow
    git branch -M main
    Write-Host "✓ Branch renomeada para 'main'" -ForegroundColor Green
}

# Instruções finais
Write-Host ""
Write-Host "=== Próximos Passos ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Certifique-se de que o repositório existe no GitHub:" -ForegroundColor Yellow
Write-Host "   https://github.com/maicon456/Arcnet-AI" -ForegroundColor White
Write-Host ""
Write-Host "2. Se o repositório não existe, crie no GitHub primeiro" -ForegroundColor Yellow
Write-Host ""
Write-Host "3. Para fazer push, execute:" -ForegroundColor Yellow
Write-Host "   git push -u origin main" -ForegroundColor White
Write-Host ""
Write-Host "4. Se pedir autenticação:" -ForegroundColor Yellow
Write-Host "   - Username: maicon456" -ForegroundColor White
Write-Host "   - Password: Personal Access Token (não sua senha)" -ForegroundColor White
Write-Host "   - Criar token: https://github.com/settings/tokens" -ForegroundColor White
Write-Host ""
Write-Host "=== Configuração Concluída ===" -ForegroundColor Green


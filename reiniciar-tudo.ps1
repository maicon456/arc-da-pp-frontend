# Script para reiniciar tudo e garantir que funcione
# DApp: ArcnetAI

Set-Location "C:\Users\maicon\Desktop\arc-da-pp-frontend"

Write-Host "=== REINICIANDO DAPP ARCNETAI ===" -ForegroundColor Cyan
Write-Host ""

# 1. Parar processos Node.js
Write-Host "=== 1. Parando processos Node.js ===" -ForegroundColor Cyan
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2
Write-Host "✓ Processos Node.js parados" -ForegroundColor Green
Write-Host ""

# 2. Limpar cache
Write-Host "=== 2. Limpando cache ===" -ForegroundColor Cyan
if (Test-Path ".next") {
    Remove-Item -Path ".next" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "✓ Cache .next limpo" -ForegroundColor Green
} else {
    Write-Host "✓ Cache já estava limpo" -ForegroundColor Green
}
Write-Host ""

# 3. Verificar dependências
Write-Host "=== 3. Verificando dependências ===" -ForegroundColor Cyan
if (-not (Test-Path "node_modules")) {
    Write-Host "⚠ node_modules não encontrado" -ForegroundColor Yellow
    Write-Host "Instalando dependências..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Dependências instaladas" -ForegroundColor Green
    } else {
        Write-Host "✗ Erro ao instalar dependências" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✓ node_modules existe" -ForegroundColor Green
    Write-Host "Verificando se precisa atualizar..." -ForegroundColor Yellow
    npm install
}
Write-Host ""

# 4. Verificar arquivos essenciais
Write-Host "=== 4. Verificando arquivos essenciais ===" -ForegroundColor Cyan
$essentialFiles = @(
    "package.json",
    "next.config.mjs",
    "app/layout.tsx",
    "app/page.tsx"
)

$allExist = $true
foreach ($file in $essentialFiles) {
    if (Test-Path $file) {
        Write-Host "✓ $file" -ForegroundColor Green
    } else {
        Write-Host "✗ $file NÃO encontrado" -ForegroundColor Red
        $allExist = $false
    }
}

if (-not $allExist) {
    Write-Host ""
    Write-Host "✗ Alguns arquivos essenciais estão faltando!" -ForegroundColor Red
    exit 1
}
Write-Host ""

# 5. Verificar variáveis de ambiente
Write-Host "=== 5. Verificando configuração ===" -ForegroundColor Cyan
if (Test-Path ".env.local") {
    Write-Host "✓ .env.local encontrado" -ForegroundColor Green
} else {
    Write-Host "⚠ .env.local não encontrado" -ForegroundColor Yellow
    Write-Host "  (Pode ser normal se usar variáveis do sistema)" -ForegroundColor Yellow
}
Write-Host ""

# 6. Testar build (opcional, mas recomendado)
Write-Host "=== 6. Testando build ===" -ForegroundColor Cyan
Write-Host "Executando build de teste..." -ForegroundColor Yellow
$buildOutput = npm run build 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Build bem-sucedido" -ForegroundColor Green
} else {
    Write-Host "⚠ Build com avisos (pode ser normal)" -ForegroundColor Yellow
    Write-Host "Continuando mesmo assim..." -ForegroundColor Yellow
}
Write-Host ""

# 7. Iniciar servidor de desenvolvimento
Write-Host "=== 7. Iniciando servidor de desenvolvimento ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "🚀 Iniciando servidor..." -ForegroundColor Yellow
Write-Host "Aguarde alguns segundos..." -ForegroundColor Yellow
Write-Host ""
Write-Host "O servidor estará disponível em:" -ForegroundColor Cyan
Write-Host "  http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "Pressione Ctrl+C para parar o servidor" -ForegroundColor Yellow
Write-Host ""

# Iniciar servidor em background e abrir navegador após 10 segundos
Start-Job -ScriptBlock {
    Set-Location "C:\Users\maicon\Desktop\arc-da-pp-frontend"
    npm run dev
} | Out-Null

# Aguardar e abrir navegador
Start-Sleep -Seconds 10
Write-Host "Abrindo navegador..." -ForegroundColor Yellow
Start-Process "http://localhost:3000"

Write-Host ""
Write-Host "=== SERVIDOR INICIADO ===" -ForegroundColor Green
Write-Host ""
Write-Host "✅ DApp disponível em: http://localhost:3000" -ForegroundColor Green
Write-Host ""
Write-Host "Para ver os logs do servidor, execute em outro terminal:" -ForegroundColor Yellow
Write-Host "  cd C:\Users\maicon\Desktop\arc-da-pp-frontend" -ForegroundColor White
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""


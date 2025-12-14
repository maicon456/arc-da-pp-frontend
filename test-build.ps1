# Script temporário para testar build
Set-Location "C:\Users\maicon\Desktop\arc-da-pp-frontend"

Write-Host "=== Verificando diretório ===" -ForegroundColor Cyan
Get-Location

Write-Host "`n=== Verificando node_modules ===" -ForegroundColor Cyan
if (Test-Path "node_modules") {
    Write-Host "✓ node_modules existe" -ForegroundColor Green
} else {
    Write-Host "✗ node_modules NÃO encontrado - executando npm install..." -ForegroundColor Yellow
    npm install
}

Write-Host "`n=== Executando npm run build ===" -ForegroundColor Cyan
npm run build

Write-Host "`n=== Build concluído ===" -ForegroundColor Cyan


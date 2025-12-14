# Script para adicionar arquivos novos ao Git
Set-Location "C:\Users\maicon\Desktop\arc-da-pp-frontend"

Write-Host "=== Verificando status do Git ===" -ForegroundColor Cyan
git status --short

Write-Host "`n=== Adicionando arquivos novos ===" -ForegroundColor Cyan

# Arquivos de correção do NOT_FOUND
git add app/not-found.tsx
git add app/error.tsx
git add app/global-error.tsx
git add "app/marketplace/agent/[id]/page.tsx"
git add next.config.mjs

# Documentação
git add VERCEL_NOT_FOUND_SOLUTION.md
git add QUICK_FIX_CHECKLIST.md
git add TESTAR_BUILD.md

# Script temporário (opcional)
if (Test-Path "test-build.ps1") {
    git add test-build.ps1
}

Write-Host "`n=== Verificando arquivos adicionados ===" -ForegroundColor Cyan
git status --short

Write-Host "`n=== Arquivos prontos para commit ===" -ForegroundColor Green
Write-Host "Execute: git commit -m 'fix: add error handling and NOT_FOUND fixes'" -ForegroundColor Yellow


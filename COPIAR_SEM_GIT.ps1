# Copiar arquivos sem depender do Git
# Execute este comando diretamente no PowerShell (não como script)

$source = "C:\Users\maicon\Desktop\arc-da-pp-frontend"
$target = "C:\Users\maicon\Documents\GitHub\arcAI"

Write-Host "Copiando arquivos..." -ForegroundColor Yellow

# Criar diretório
New-Item -ItemType Directory -Path $target -Force | Out-Null

# Copiar pastas
@("app", "components", "contracts", "lib", "providers", "public", "scripts", "test", ".github") | ForEach-Object {
    if (Test-Path "$source\$_") {
        Copy-Item "$source\$_" -Destination "$target\$_" -Recurse -Force
        Write-Host "Copiado: $_" -ForegroundColor Green
    }
}

# Copiar arquivos
@("package.json", "tsconfig.json", ".gitignore", ".gitattributes", "README.md", "LICENSE", "next.config.mjs", "postcss.config.mjs", "foundry.toml", "components.json", "pnpm-lock.yaml") | ForEach-Object {
    if (Test-Path "$source\$_") {
        Copy-Item "$source\$_" -Destination "$target\$_" -Force
    }
}

# Copiar todos os .md
Get-ChildItem "$source\*.md" | Copy-Item -Destination "$target\" -Force

# Copiar outros arquivos
Get-ChildItem "$source\*.json" | Where-Object { $_.Name -ne "package-lock.json" } | Copy-Item -Destination "$target\" -Force
Get-ChildItem "$source\*.mjs" | Copy-Item -Destination "$target\" -Force
Get-ChildItem "$source\*.toml" | Copy-Item -Destination "$target\" -Force
Get-ChildItem "$source\*.sol" | Copy-Item -Destination "$target\" -Force -ErrorAction SilentlyContinue

Write-Host "Arquivos copiados para: $target" -ForegroundColor Green


# 🧪 Testar Build e Dev Server

## 📋 Instruções para Testar

Execute estes comandos no terminal PowerShell:

### 1. Navegar para o Diretório

```powershell
cd C:\Users\maicon\Desktop\arc-da-pp-frontend
```

### 2. Verificar Dependências

```powershell
# Verificar se node_modules existe
if (Test-Path "node_modules") {
    Write-Host "✓ Dependências instaladas"
} else {
    Write-Host "✗ Instalando dependências..."
    npm install
}
```

### 3. Executar Build

```powershell
npm run build
```

**O que esperar:**
- ✅ Build deve completar sem erros
- ✅ Deve criar pasta `.next/`
- ✅ Deve mostrar estatísticas de build

**Se houver erros:**
- Verifique mensagens de erro
- Verifique se todas as dependências estão instaladas
- Verifique se há problemas de TypeScript

### 4. Executar Dev Server

```powershell
npm run dev
```

**O que esperar:**
- ✅ Servidor deve iniciar em `http://localhost:3000`
- ✅ Deve mostrar "Ready" no terminal
- ✅ Navegador deve abrir automaticamente (ou abra manualmente)

### 5. Testar Rotas

Abra o navegador e teste:

1. **Home:** `http://localhost:3000`
   - Deve mostrar a página principal

2. **Marketplace:** `http://localhost:3000/marketplace`
   - Deve mostrar o marketplace

3. **Agent Detail (válido):** `http://localhost:3000/marketplace/agent/0`
   - Deve mostrar o agente ou "Agent not found"

4. **Agent Detail (inválido):** `http://localhost:3000/marketplace/agent/invalid`
   - Deve mostrar erro de validação (não NOT_FOUND)

5. **404:** `http://localhost:3000/pagina-inexistente`
   - Deve mostrar página 404 customizada

## 🔍 Verificações Adicionais

### Verificar TypeScript

```powershell
npx tsc --noEmit
```

**Esperado:** Sem erros

### Verificar Lint

```powershell
npm run lint
```

**Esperado:** Sem erros críticos

### Verificar Estrutura de Arquivos

```powershell
# Verificar se arquivos de erro existem
Test-Path "app\not-found.tsx"
Test-Path "app\error.tsx"
Test-Path "app\global-error.tsx"

# Verificar arquivos de ícones
Test-Path "public\icon.svg"
Test-Path "public\icon-light-32x32.png"
```

## 🐛 Troubleshooting

### Erro: "Cannot find module"

```powershell
# Reinstalar dependências
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### Erro: "Port 3000 already in use"

```powershell
# Usar outra porta
npm run dev -- -p 3001
```

### Erro de Build

1. Verifique logs completos
2. Verifique se há erros de TypeScript
3. Verifique se há imports faltando
4. Verifique variáveis de ambiente

### Build Lento

- Normal em primeira execução
- Pode demorar 1-3 minutos
- Aguarde até ver "Compiled successfully"

## ✅ Checklist de Sucesso

- [ ] `npm run build` completa sem erros
- [ ] `npm run dev` inicia corretamente
- [ ] Página principal carrega (`/`)
- [ ] Marketplace carrega (`/marketplace`)
- [ ] Rota dinâmica valida parâmetros (`/marketplace/agent/[id]`)
- [ ] Página 404 customizada funciona
- [ ] Sem erros no console do navegador
- [ ] Sem erros no terminal

## 📝 Próximos Passos

Após testar localmente:

1. **Se tudo funcionar:**
   - Configure variáveis de ambiente no Vercel
   - Faça deploy: `vercel --prod`

2. **Se houver erros:**
   - Anote os erros específicos
   - Verifique os logs completos
   - Consulte `VERCEL_NOT_FOUND_SOLUTION.md`

---

**Execute os comandos e me informe os resultados!** 🚀


# 🔄 Reiniciar Tudo e Garantir que Funcione

## 🚀 Script Automático (Recomendado)

Execute o script completo:

```powershell
cd C:\Users\maicon\Desktop\arc-da-pp-frontend
powershell -ExecutionPolicy Bypass -File reiniciar-tudo.ps1
```

O script vai:
- ✅ Parar todos os processos Node.js
- ✅ Limpar cache (.next)
- ✅ Verificar e instalar dependências
- ✅ Verificar arquivos essenciais
- ✅ Testar build
- ✅ Iniciar servidor de desenvolvimento
- ✅ Abrir navegador automaticamente

---

## 🔧 Passo a Passo Manual

### 1. Parar Processos

```powershell
# Parar todos os processos Node.js
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force
```

### 2. Limpar Cache

```powershell
cd C:\Users\maicon\Desktop\arc-da-pp-frontend
Remove-Item -Path ".next" -Recurse -Force -ErrorAction SilentlyContinue
```

### 3. Reinstalar Dependências

```powershell
npm install
```

### 4. Verificar Arquivos

```powershell
# Verificar se arquivos essenciais existem
Test-Path "package.json"
Test-Path "app/layout.tsx"
Test-Path "app/page.tsx"
```

### 5. Testar Build

```powershell
npm run build
```

### 6. Iniciar Servidor

```powershell
npm run dev
```

### 7. Abrir Navegador

Acesse: http://localhost:3000

---

## ✅ Checklist de Verificação

### Antes de Iniciar:
- [ ] Processos Node.js parados
- [ ] Cache limpo (.next removido)
- [ ] Dependências instaladas (node_modules existe)
- [ ] Arquivos essenciais presentes

### Após Iniciar:
- [ ] Servidor inicia sem erros
- [ ] Mostra "Ready" no terminal
- [ ] Navegador abre automaticamente
- [ ] Página principal carrega
- [ ] Sem erros no console do navegador

---

## 🐛 Troubleshooting

### Erro: "Port 3000 already in use"

```powershell
# Encontrar processo usando porta 3000
netstat -ano | findstr :3000

# Parar processo (substitua PID pelo número encontrado)
taskkill /PID <PID> /F

# OU usar outra porta
npm run dev -- -p 3001
```

### Erro: "Cannot find module"

```powershell
# Limpar tudo e reinstalar
Remove-Item -Path "node_modules" -Recurse -Force
Remove-Item -Path "package-lock.json" -Force
npm install
```

### Erro: "Build failed"

```powershell
# Limpar cache e rebuild
Remove-Item -Path ".next" -Recurse -Force
npm run build
```

### Servidor não inicia

```powershell
# Verificar logs
npm run dev

# Verificar se há erros de TypeScript
npx tsc --noEmit
```

---

## 🎯 Comandos Rápidos (Resumo)

```powershell
cd C:\Users\maicon\Desktop\arc-da-pp-frontend

# Parar processos
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force

# Limpar e reinstalar
Remove-Item -Path ".next" -Recurse -Force -ErrorAction SilentlyContinue
npm install

# Iniciar
npm run dev
```

---

## 📋 Verificar se Está Funcionando

### 1. Terminal:
- Deve mostrar "Ready"
- Deve mostrar URL: http://localhost:3000

### 2. Navegador:
- Deve abrir automaticamente
- Página principal deve carregar
- Sem erros no console (F12)

### 3. Testar Funcionalidades:
- [ ] Home page carrega
- [ ] Navegação funciona
- [ ] Botão Connect Wallet aparece
- [ ] Marketplace carrega
- [ ] Forum carrega

---

**Execute o script ou os comandos acima para reiniciar tudo!** 🚀


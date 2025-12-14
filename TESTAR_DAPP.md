# 🧪 Testar DApp no Navegador

## 🚀 Iniciar Servidor de Desenvolvimento

### Comando:

```powershell
cd C:\Users\maicon\Desktop\arc-da-pp-frontend
npm run dev
```

### O que esperar:

- ✅ Servidor inicia em alguns segundos
- ✅ Mostra: "Ready" e URL: `http://localhost:3000`
- ✅ Navegador pode abrir automaticamente

## 🌐 Abrir no Navegador

### URL Principal:
```
http://localhost:3000
```

### Páginas para Testar:

1. **Home:**
   - http://localhost:3000
   - Deve mostrar página principal com tabs

2. **Marketplace:**
   - http://localhost:3000/marketplace
   - Deve mostrar marketplace de agentes

3. **Forum:**
   - http://localhost:3000/forum
   - Deve mostrar fórum da comunidade

4. **Agent Detail:**
   - http://localhost:3000/marketplace/agent/0
   - Deve mostrar detalhes do agente ou "Agent not found"

## ✅ Checklist de Teste

### Funcionalidades Básicas:
- [ ] Página principal carrega
- [ ] Navegação entre tabs funciona
- [ ] Botão "Connect Wallet" aparece
- [ ] Marketplace carrega
- [ ] Forum carrega (requer wallet conectada)

### Com Wallet Conectada:
- [ ] Conectar wallet funciona
- [ ] Criar agente funciona
- [ ] Ver agentes criados
- [ ] Criar post no forum funciona
- [ ] Interações on-chain funcionam

## 🔧 Se o Servidor Não Iniciar

### Verificar Dependências:

```powershell
cd C:\Users\maicon\Desktop\arc-da-pp-frontend
npm install
```

### Verificar Porta:

Se a porta 3000 estiver ocupada:

```powershell
npm run dev -- -p 3001
```

Depois acesse: http://localhost:3001

## 🐛 Troubleshooting

### Erro: "Port 3000 already in use"

```powershell
# Usar outra porta
npm run dev -- -p 3001
```

### Erro: "Cannot find module"

```powershell
# Reinstalar dependências
npm install
```

### Erro: "Build failed"

```powershell
# Limpar cache e rebuild
rm -r .next
npm run build
npm run dev
```

## 📋 Variáveis de Ambiente

Certifique-se de ter `.env.local` configurado:

```env
NEXT_PUBLIC_ARC_RPC_URL=https://rpc.testnet.arc.network
NEXT_PUBLIC_VIRTUAL_AGENT_CONTRACT_ADDRESS=0x...
```

## 🎯 Testes Recomendados

1. **Teste de Conexão:**
   - Conecte wallet
   - Verifique se muda para Arc Testnet

2. **Teste de Criação:**
   - Crie um agente
   - Verifique se aparece no marketplace

3. **Teste de Forum:**
   - Crie um post
   - Verifique se aparece no feed

4. **Teste de Erros:**
   - Acesse rota inválida: `/pagina-inexistente`
   - Deve mostrar página 404 customizada

---

**O servidor está iniciando! Aguarde alguns segundos e o navegador abrirá automaticamente.** 🚀


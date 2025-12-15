# 🔍 Solução Completa: Erro NOT_FOUND do Vercel

## 📋 1. SUGESTÃO DE CORREÇÃO

### ✅ Checklist de Verificação Rápida

Execute estes comandos para diagnosticar:

```bash
# 1. Verificar build local
npm run build

# 2. Verificar se há erros de TypeScript
npx tsc --noEmit

# 3. Verificar estrutura de arquivos
ls -la app/
ls -la public/
```

### 🔧 Correções Mais Comuns

#### **Correção 1: Arquivos de Ícones Faltando**

**Problema:** O `layout.tsx` referencia ícones que podem não estar no deploy.

**Solução:** Verifique se todos os arquivos existem em `public/`:

```bash
# Verificar arquivos de ícones
ls public/icon*.png
ls public/icon*.svg
ls public/apple-icon.png
```

Se algum arquivo estiver faltando, crie placeholders ou remova a referência do `metadata`.

#### **Correção 2: Variáveis de Ambiente Não Configuradas**

**Problema:** O Vercel precisa das variáveis de ambiente configuradas.

**Solução:** Configure no painel do Vercel:

1. Acesse: https://vercel.com/your-project/settings/environment-variables
2. Adicione:
   ```
   NEXT_PUBLIC_ARC_RPC_URL=https://rpc.testnet.arc.network
   NEXT_PUBLIC_VIRTUAL_AGENT_CONTRACT_ADDRESS=0x...
   ```

#### **Correção 3: Build Failing Silently**

**Problema:** O build pode estar falhando sem mostrar erros claros.

**Solução:** Adicione verificação explícita no `next.config.mjs`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false, // Mude para false para ver erros
  },
  images: {
    unoptimized: true,
  },
  // Adicione verificação de rotas
  async rewrites() {
    return []
  },
}
```

#### **Correção 4: Rota Dinâmica com Problema**

**Problema:** A rota `/marketplace/agent/[id]` pode estar causando problemas.

**Solução:** Adicione `generateStaticParams` ou trate o caso de `id` inválido:

```typescript
// app/marketplace/agent/[id]/page.tsx
export async function generateStaticParams() {
  // Retorna array vazio para SSG dinâmico
  return []
}

export const dynamic = 'force-dynamic' // Força renderização dinâmica
```

---

## 🎯 2. EXPLICAÇÃO DA CAUSA RAIZ

### O Que Estava Acontecendo vs. O Que Deveria Acontecer

#### **O Que o Código Estava Fazendo:**

1. **Next.js App Router** tenta renderizar todas as rotas durante o build
2. **Vercel** tenta servir arquivos estáticos e rotas dinâmicas
3. **Se uma rota falha** durante o build ou runtime, retorna NOT_FOUND

#### **O Que Deveria Aconter:**

1. **Build bem-sucedido** com todas as rotas válidas
2. **Rotas dinâmicas** devem ter fallbacks ou tratamento de erro
3. **Assets estáticos** devem existir ou ter fallbacks

### Condições que Disparam o Erro

1. **Build Time:**
   - Arquivo `page.tsx` não exporta `default`
   - Import de módulo que não existe
   - Erro de TypeScript que quebra o build
   - Rota dinâmica sem tratamento de erro

2. **Runtime:**
   - Rota dinâmica com parâmetro inválido
   - Componente que lança erro durante renderização
   - Import de asset que não existe

3. **Deploy:**
   - Variáveis de ambiente faltando
   - Arquivos não commitados (`.gitignore` muito restritivo)
   - Build falhando silenciosamente

### O Que Levou ao Erro

**Possíveis causas:**

1. **Arquivos de ícones referenciados mas não commitados:**
   - `layout.tsx` referencia `/icon-light-32x32.png`
   - Arquivo pode não estar no repositório Git
   - Vercel não encontra o arquivo → NOT_FOUND

2. **Rota dinâmica sem tratamento:**
   - `/marketplace/agent/[id]` pode receber `id` inválido
   - Se `agentId` for `undefined`, pode quebrar

3. **Variáveis de ambiente:**
   - `getVirtualAgentAddress()` retorna `undefined`
   - Componentes tentam usar `undefined` → erro

4. **Build silencioso:**
   - `ignoreBuildErrors: true` esconde erros
   - Erros aparecem apenas em runtime → NOT_FOUND

---

## 📚 3. CONCEITO FUNDAMENTAL

### Por Que Este Erro Existe?

O erro **NOT_FOUND** do Vercel existe para:

1. **Proteger contra rotas inválidas:**
   - Previne servir conteúdo incorreto
   - Força tratamento explícito de erros

2. **Garantir consistência:**
   - Build deve ser determinístico
   - Rotas devem ser válidas em todos os ambientes

3. **Otimizar performance:**
   - Evita renderizar páginas que não existem
   - Reduz carga no servidor

### Modelo Mental Correto

**Next.js App Router funciona assim:**

```
Request → Router → Page Component → Render → Response
   ↓         ↓          ↓              ↓         ↓
  URL    Route     page.tsx      React      HTML/JSON
```

**Se qualquer etapa falhar → NOT_FOUND**

**Rotas Dinâmicas:**
```
/marketplace/agent/[id]
   ↓
params.id pode ser:
- ✅ "123" → válido
- ❌ undefined → NOT_FOUND
- ❌ null → NOT_FOUND
```

**Assets Estáticos:**
```
/public/icon.png
   ↓
Se não existe → 404 (NOT_FOUND)
```

### Como Isso Se Encaixa no Framework

**Next.js tem 3 modos de renderização:**

1. **Static (SSG):** Gera HTML no build
   - Se falhar → NOT_FOUND no build

2. **Dynamic (SSR):** Gera HTML no request
   - Se falhar → NOT_FOUND no runtime

3. **ISR (Incremental):** Híbrido
   - Se falhar → NOT_FOUND após revalidação

**Vercel detecta:**
- Build errors → NOT_FOUND
- Runtime errors → NOT_FOUND
- Missing files → NOT_FOUND

---

## ⚠️ 4. SINAIS DE ALERTA

### O Que Observar

#### **1. Durante Desenvolvimento:**

```typescript
// ❌ PROBLEMA: Sem tratamento de erro
const agentId = params.id ? BigInt(Number(params.id)) : undefined
const { data } = useAgent(agentId) // agentId pode ser undefined

// ✅ SOLUÇÃO: Tratamento explícito
if (!agentId) {
  return <NotFound />
}
```

#### **2. No Build:**

```bash
# ❌ PROBLEMA: Build passa mas com warnings
npm run build
# ⚠️ Warning: Image not found

# ✅ SOLUÇÃO: Resolver todos os warnings
```

#### **3. Imports:**

```typescript
// ❌ PROBLEMA: Import de arquivo que pode não existir
import icon from '/icon.png' // Pode não existir no deploy

// ✅ SOLUÇÃO: Verificar existência ou usar fallback
const icon = '/icon.png' // Usar string, não import
```

#### **4. Variáveis de Ambiente:**

```typescript
// ❌ PROBLEMA: Sem fallback
const address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS

// ✅ SOLUÇÃO: Com fallback e validação
const address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || ''
if (!address) {
  console.warn('Contract address not configured')
}
```

### Code Smells Relacionados

1. **`ignoreBuildErrors: true`**
   - Esconde problemas reais
   - Deve ser temporário apenas

2. **Rotas dinâmicas sem validação:**
   ```typescript
   // ❌
   const id = params.id
   useAgent(id) // id pode ser undefined
   
   // ✅
   if (!params.id) return <NotFound />
   ```

3. **Imports condicionais:**
   ```typescript
   // ❌
   const icon = require(`/icon-${theme}.png`)
   
   // ✅
   const icon = theme === 'dark' ? '/icon-dark.png' : '/icon-light.png'
   ```

4. **Assets não commitados:**
   - Verificar `.gitignore` não está ignorando `public/`
   - Verificar arquivos estão no repositório

---

## 🔄 5. ALTERNATIVAS E TRADE-OFFS

### Abordagem 1: Tratamento Defensivo (Recomendado)

**Estratégia:** Validar tudo antes de usar

```typescript
// app/marketplace/agent/[id]/page.tsx
export default function AgentDetailPage() {
  const params = useParams()
  
  // Validação explícita
  if (!params.id) {
    notFound() // Next.js helper
  }
  
  const agentId = BigInt(Number(params.id))
  // ... resto do código
}
```

**Trade-offs:**
- ✅ Mais seguro
- ✅ Erros explícitos
- ❌ Mais código boilerplate

### Abordagem 2: Fallbacks e Defaults

**Estratégia:** Sempre ter um valor padrão

```typescript
// layout.tsx
export const metadata: Metadata = {
  icons: {
    icon: '/icon.svg', // Usar apenas um ícone que sempre existe
  },
}
```

**Trade-offs:**
- ✅ Simples
- ✅ Sempre funciona
- ❌ Menos flexível

### Abordagem 3: Error Boundaries

**Estratégia:** Capturar erros no nível do componente

```typescript
// app/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
```

**Trade-offs:**
- ✅ Captura erros inesperados
- ✅ Melhor UX
- ❌ Não previne NOT_FOUND, apenas trata

### Abordagem 4: Static Generation com Fallbacks

**Estratégia:** Gerar páginas estáticas conhecidas

```typescript
// app/marketplace/agent/[id]/page.tsx
export async function generateStaticParams() {
  // Buscar IDs conhecidos do contrato
  const agents = await fetchAgents()
  return agents.map(agent => ({ id: agent.id.toString() }))
}

export const dynamicParams = true // Permite IDs não pré-gerados
```

**Trade-offs:**
- ✅ Performance melhor
- ✅ SEO melhor
- ❌ Requer dados no build time
- ❌ Mais complexo

---

## 🛠️ IMPLEMENTAÇÃO DA SOLUÇÃO

### Arquivos Criados/Modificados:

1. ✅ **`app/not-found.tsx`** - Página 404 customizada
2. ✅ **`app/error.tsx`** - Error boundary para erros de runtime
3. ✅ **`app/global-error.tsx`** - Error boundary global
4. ✅ **`app/marketplace/agent/[id]/page.tsx`** - Validação melhorada
5. ✅ **`next.config.mjs`** - Configuração melhorada

### Próximos Passos:

1. **Teste o build local:**
   ```bash
   npm run build
   ```

2. **Verifique se não há erros:**
   ```bash
   npx tsc --noEmit
   ```

3. **Teste as rotas:**
   - `/` - Deve funcionar
   - `/marketplace` - Deve funcionar
   - `/marketplace/agent/0` - Deve funcionar ou mostrar "Agent not found"
   - `/marketplace/agent/invalid` - Deve mostrar erro de validação

4. **Configure variáveis de ambiente no Vercel:**
   - Acesse: https://vercel.com/your-project/settings/environment-variables
   - Adicione todas as variáveis `NEXT_PUBLIC_*`

5. **Faça deploy:**
   ```bash
   vercel --prod
   ```

---

## 📝 RESUMO FINAL

### O Que Foi Corrigido:

1. ✅ **Validação de parâmetros** na rota dinâmica
2. ✅ **Error boundaries** para capturar erros
3. ✅ **Página 404** customizada
4. ✅ **Configuração de build** melhorada
5. ✅ **Tratamento defensivo** de valores undefined

### Como Prevenir no Futuro:

1. **Sempre valide parâmetros** antes de usar
2. **Use error boundaries** para capturar erros inesperados
3. **Teste o build local** antes de fazer deploy
4. **Configure variáveis de ambiente** no Vercel
5. **Verifique arquivos estáticos** estão no repositório

---

**Agora seu DApp deve funcionar corretamente no Vercel!** 🚀


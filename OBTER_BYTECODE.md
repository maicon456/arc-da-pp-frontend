# 📋 Como Obter o Bytecode do Remix IDE

## 🎯 Passo a Passo Rápido

### 1️⃣ Compilar no Remix

1. No Remix IDE, certifique-se de que o arquivo `VirtualAgent.sol` está aberto
2. Clique na aba **"Solidity Compiler"** (ícone de compilador)
3. Selecione versão: **0.8.20**
4. Clique em **"Compile VirtualAgent.sol"**
5. Aguarde o ✓ verde aparecer

### 2️⃣ Obter o Bytecode

1. Ainda na aba **"Solidity Compiler"**
2. Procure por um botão ou link chamado **"Compilation Details"** ou **"ABI"**
3. Clique nele - uma nova janela/aba abrirá
4. Procure por **"bytecode"** na lista
5. Expanda **"bytecode"**
6. Procure por **"object"** (não "opcodes")
7. **Copie** a string completa (é muito longa, começa com `0x`)

### 3️⃣ Colar no Script

1. Abra: `scripts/deploy-with-bytecode.js`
2. Encontre a linha: `const BYTECODE = 'COLE_O_BYTECODE_AQUI'`
3. Substitua `'COLE_O_BYTECODE_AQUI'` pelo bytecode copiado
4. Salve o arquivo

### 4️⃣ Executar Deploy

```bash
node scripts/deploy-with-bytecode.js
```

---

## 🔍 Onde Encontrar no Remix

**Caminho visual:**
```
Solidity Compiler
  └─ Compile VirtualAgent.sol (✓ verde)
      └─ Compilation Details (botão/link)
          └─ bytecode
              └─ object ← COPIE ESTE
```

---

## ⚠️ Importante

- O bytecode é uma string **muito longa** (milhares de caracteres)
- Deve começar com `0x`
- Não copie "opcodes", copie "object"
- Certifique-se de copiar **TUDO** (Ctrl+A ajuda)

---

## ✅ Exemplo de Bytecode

O bytecode deve parecer assim (mas muito mais longo):
```
0x608060405234801561001057600080fd5b506...
```

---

## 🚀 Após Colar o Bytecode

Execute:
```bash
node scripts/deploy-with-bytecode.js
```

O script fará o deploy automaticamente! 🎉

